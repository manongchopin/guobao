(function () {
  "use strict";

  var chinaAll = window.WH_SITES || [];
  var foreign = window.VISITED_WH_FOREIGN || [];
  var listEl = document.getElementById("list");

  var china = chinaAll.filter(function (s) { return window.WHVisited && WHVisited.has(s.uid); })
    .sort(function (a, b) { return a.year - b.year || Number(a.uid) - Number(b.uid); });

  var total = china.length + foreign.length;

  /* 统计条 */
  var num = document.querySelector(".hp-num");
  var note = document.querySelector(".hp-note");
  if (num) num.textContent = total;
  if (note) {
    var countries = {};
    china.forEach(function (s) { countries["中国"] = 1; });
    foreign.forEach(function (s) { countries[s.country] = 1; });
    note.textContent = Object.keys(countries).length + " 个国家 · 亚洲 / 欧洲";
  }
  document.querySelector(".footer-inner span").textContent = "我去过的世界遗产 · " + total + " 项";

  /* 国家顺序 */
  function countryOrder(list) {
    var seen = {};
    list.forEach(function (s) { seen[s.country] = s.countryEn; });
    return Object.keys(seen).sort(function (a, b) {
      if (a === "中国") return -1;
      if (b === "中国") return 1;
      return seen[a].localeCompare(seen[b]);
    });
  }

  function cardChina(s) {
    return '<a class="vwh-card" href="heritage-place.html?id=' + s.uid + '">' +
      '<span class="vwh-name">' + s.name + '</span>' +
      '<span class="vwh-meta">' + s.year + ' 年 · ' + s.provinces.join("、") + '</span>' +
    '</a>';
  }

  function cardForeign(s) {
    return '<article class="vwh-card">' +
      '<span class="vwh-name">' + s.zh + '</span>' +
      '<span class="vwh-en">' + s.en + '</span>' +
    '</article>';
  }

  function countryBlock(country, countryEn, list) {
    return '<section class="vwh-country">' +
      '<div class="vwh-country-head">' +
        '<h3>' + country + '</h3>' +
        '<span class="en">' + countryEn + '</span>' +
        '<span class="count">' + list.length + ' 项</span>' +
      '</div>' +
      '<div class="vwh-grid">' +
        list.map(function (s) { return s.uid ? cardChina(s) : cardForeign(s); }).join("") +
      '</div>' +
    '</section>';
  }

  var html = "";
  html += '<section class="vwh-continent"><h2>亚洲</h2>';
  html += countryBlock("中国", "China", china);
  countryOrder(foreign.filter(function (s) { return s.continent === "亚洲"; })).forEach(function (c) {
    if (c === "中国") return;
    var list = foreign.filter(function (s) { return s.country === c; });
    html += countryBlock(c, list[0].countryEn, list);
  });
  html += '</section>';

  html += '<section class="vwh-continent"><h2>欧洲</h2>';
  countryOrder(foreign.filter(function (s) { return s.continent === "欧洲"; })).forEach(function (c) {
    var list = foreign.filter(function (s) { return s.country === c; });
    html += countryBlock(c, list[0].countryEn, list);
  });
  html += '</section>';

  html += '<p class="vwh-note">俄罗斯横跨欧亚，这里归入欧洲；土耳其、格鲁吉亚、阿塞拜疆归入亚洲。</p>';

  listEl.innerHTML = html;
})();
