(function () {
  "use strict";

  var chinaAll = window.WH_SITES || [];
  var foreign = window.VISITED_WH_FOREIGN || [];
  var listEl = document.getElementById("list");

  var CN_EN = {
    "438": "The Great Wall",
    "439": "Imperial Palaces of the Ming and Qing Dynasties",
    "440": "Mogao Caves",
    "441": "Mausoleum of the First Qin Emperor",
    "547": "Mount Huangshan",
    "707": "Historic Ensemble of the Potala Palace",
    "778": "Lushan National Park",
    "813": "Classical Gardens of Suzhou",
    "811": "Old Town of Lijiang",
    "880": "Summer Palace",
    "881": "Temple of Heaven",
    "1004": "Imperial Tombs of the Ming and Qing Dynasties",
    "1110": "Historic Centre of Macau",
    "1113": "Fujian Tulou",
    "1292": "Sanqingshan",
    "1334": "West Lake Cultural Landscape of Hangzhou",
    "1442": "Silk Roads: the Routes Network of Chang'an-Tianshan Corridor",
    "1443": "Grand Canal",
    "1541": "Kulangsu, a Historic International Settlement",
    "1002": "Ancient Villages in Southern Anhui — Xidi and Hongcun",
    "1111": "Cultural Landscape of Honghe Hani Rice Terraces"
  };

  var china = chinaAll.filter(function (s) { return window.WHVisited && WHVisited.has(s.uid); })
    .sort(function (a, b) { return a.year - b.year || Number(a.uid) - Number(b.uid); });

  var total = china.length + foreign.length;

  var countries = {};
  china.forEach(function (s) { countries["中国"] = (countries["中国"] || 0) + 1; });
  foreign.forEach(function (s) { countries[s.country] = (countries[s.country] || 0) + 1; });

  var numEl = document.querySelector(".hp-num");
  var noteEl = document.querySelector(".hp-note");
  var totalEl = document.getElementById("vh-total");
  var countEl = document.getElementById("vh-countries");
  if (numEl) numEl.textContent = total;
  if (noteEl) noteEl.textContent = Object.keys(countries).length + " 个国家 · 亚洲 / 欧洲";
  if (totalEl) totalEl.textContent = total;
  if (countEl) countEl.textContent = Object.keys(countries).length;
  var foot = document.querySelector(".footer-inner span");
  if (foot) foot.textContent = "我去过的世界遗产 · " + total + " 项";

  function countryOrder(list) {
    var seen = {};
    list.forEach(function (s) { seen[s.country] = s.countryEn; });
    return Object.keys(seen).sort(function (a, b) {
      if (a === "中国") return -1;
      if (b === "中国") return 1;
      return seen[a].localeCompare(seen[b]);
    });
  }

  function head() {
    return '<div class="vh-head">' +
      '<span class="vh-n">名称</span>' +
      '<span class="vh-e">英文名</span>' +
      '<span class="vh-y">年份</span>' +
    '</div>';
  }

  function row(item, isChina) {
    return '<div class="vh-row">' +
      '<span class="vh-n">' + (isChina ? '<a href="heritage-place.html?id=' + item.uid + '">' + item.name + '</a>' : item.zh) + '</span>' +
      '<span class="vh-e">' + (isChina ? (CN_EN[item.uid] || "—") : item.en) + '</span>' +
      '<span class="vh-y">' + (item.year || "—") + '</span>' +
    '</div>';
  }

  function countryBlock(country, countryEn, list, isChina) {
    return '<div class="vh-country">' +
      '<div class="vh-country-head">' +
        '<h3>' + country + '</h3>' +
        '<span class="en">' + countryEn + '</span>' +
        '<span class="count">' + list.length + ' 项</span>' +
      '</div>' +
      list.map(function (s) { return row(s, isChina); }).join("") +
    '</div>';
  }

  function continentBlock(title, blocks) {
    return '<section class="vh-continent">' +
      '<h2>' + title + '</h2>' +
      head() +
      blocks.join("") +
    '</section>';
  }

  var asia = [];
  asia.push(countryBlock("中国", "China", china, true));
  countryOrder(foreign.filter(function (s) { return s.continent === "亚洲"; })).forEach(function (c) {
    if (c === "中国") return;
    var list = foreign.filter(function (s) { return s.country === c; });
    asia.push(countryBlock(c, list[0].countryEn, list, false));
  });

  var europe = [];
  countryOrder(foreign.filter(function (s) { return s.continent === "欧洲"; })).forEach(function (c) {
    var list = foreign.filter(function (s) { return s.country === c; });
    europe.push(countryBlock(c, list[0].countryEn, list, false));
  });

  listEl.innerHTML =
    continentBlock("亚洲", asia) +
    continentBlock("欧洲", europe) +
    '<p class="vh-note">俄罗斯横跨欧亚，这里归入欧洲；土耳其、格鲁吉亚、阿塞拜疆归入亚洲。</p>';
})();
