(function () {
  "use strict";
  var params = new URLSearchParams(window.location.search);
  var set = params.get("set");
  var county = params.get("county");
  var city = params.get("city");
  var CONF = {
    heilongjiang: { places: window.HEILONGJIANG_PLACES || [], page: "heilongjiang.html", name: "黑龙江", seal: "黑" },
    guizhou: { places: window.GUIZHOU_PLACES || [], page: "guizhou.html", name: "贵州", seal: "贵" },
    zhejiang: { places: window.ZHEJIANG_PLACES || [], page: "zhejiang.html", name: "浙江", seal: "浙" }
  };
  var conf = CONF[set];
  if (!conf || !county) { document.getElementById("list").innerHTML = '<p class="wh-note">没有找到这个县区。</p>'; return; }

  var items = conf.places.filter(function (p) {
    return p.county === county && (!city || p.district === city);
  });
  items.sort(function (a, b) { return (a.batch || 99) - (b.batch || 99) || (a.order || 0) - (b.order || 0); });

  var YEAR = { 1: "1961", 2: "1982", 3: "1988", 4: "1996", 5: "2001", 6: "2006", 7: "2013", 8: "2019" };
  var CN = { 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六", 7: "七", 8: "八" };

  document.title = county + " · " + conf.name + " · 全国重点文物保护单位";
  document.getElementById("back").href = conf.page;
  document.getElementById("back").textContent = "← " + conf.name;
  document.getElementById("kicker").textContent = conf.name + (city ? " · " + city : "") + " · 全国重点文物保护单位";
  document.getElementById("title").textContent = county;
  document.getElementById("count").textContent = items.length;
  document.getElementById("seal").textContent = conf.seal;
  document.getElementById("footer-name").textContent = county + " · " + items.length + " 处全国重点文物保护单位";

  var vcount = document.getElementById("count");
  function updateCount() { vcount.textContent = items.length; }

  var groups = {};
  items.forEach(function (it) { (groups[it.batch] = groups[it.batch] || []).push(it); });

  var html = "";
  Object.keys(groups).sort(function (a, b) { return a - b; }).forEach(function (b) {
    html += '<section class="group"><div class="group-head"><h2>第' + CN[b] + '批</h2><span class="count">' + YEAR[b] + ' · ' + groups[b].length + ' 处</span></div>';
    html += '<div class="ct-table"><div class="ct-head"><span>批次</span><span>名称</span><span>类型</span><span>年代</span><span></span></div>';
    groups[b].forEach(function (it) {
      html += '<div class="ct-row">' +
        '<span class="ct-b">第' + CN[it.batch] + '批</span>' +
        '<a class="ct-n" href="place.html?set=' + set + '&id=' + it.id + '">' + it.name + '</a>' +
        '<span class="ct-t">' + it.type + '</span>' +
        '<span class="ct-y">' + (it.era || "—") + '</span>' +
        '<button type="button" class="ct-v' + (window.Visited && Visited.has(it.id) ? " is-on" : "") + '" data-id="' + it.id + '">' + (window.Visited && Visited.has(it.id) ? "已去" : "打卡") + '</button>' +
      '</div>';
    });
    html += '</div></section>';
  });
  document.getElementById("list").innerHTML = html || '<p class="wh-note">这个县区暂时没有收录国保。</p>';

  document.getElementById("list").addEventListener("click", function (e) {
    var btn = e.target.closest(".ct-v");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    Visited.toggle(id);
    var on = Visited.has(id);
    btn.classList.toggle("is-on", on);
    btn.textContent = on ? "已去" : "打卡";
    updateCount();
  });
})();
