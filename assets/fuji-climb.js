(function () {
  "use strict";
  var D = window.FUJI_CLIMB;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var main = document.getElementById("fuji-route-main");
  var other = document.getElementById("fuji-other-routes");
  if (main && D.routes && D.routes[0]) {
    var r = D.routes[0];
    main.innerHTML = '<article class="fuji-main-route" id="route-' + esc(r.id) + '">' +
      '<div class="fuji-main-top"><span>' + esc(r.side) + ' · ' + esc(r.trailhead) + '</span><em>' + esc(r.bestFor) + '</em></div>' +
      '<h3>' + esc(r.name) + '</h3>' +
      '<p class="fuji-trailhead">' + esc(r.elevation) + ' 起点 · 上山 ' + esc(r.up) + ' / 下山 ' + esc(r.down) + '</p>' +
      '<div class="fuji-stats"><div><b>' + esc(r.timeUp) + '</b><span>上行</span></div><div><b>' + esc(r.timeDown) + '</b><span>下行</span></div><div><b>' + esc(r.huts) + '</b><span>山小屋</span></div></div>' +
      '<p><b>地形：</b>' + esc(r.terrain) + '</p><p>' + esc(r.notes) + '</p></article>';
  }
  if (other && D.routes) {
    other.innerHTML = D.routes.slice(1).map(function (r) {
      return '<article class="fuji-route fuji-route--small" id="route-' + esc(r.id) + '">' +
        '<div class="fuji-route-head"><span>' + esc(r.side) + '</span><em>' + esc(r.difficulty) + '</em></div>' +
        '<h3>' + esc(r.name) + '</h3>' +
        '<p class="fuji-trailhead">' + esc(r.trailhead) + ' · ' + esc(r.elevation) + '</p>' +
        '<p>' + esc(r.notes) + '</p></article>';
    }).join("");
  }

  var rules = document.getElementById("fuji-rules");
  if (rules) {
    rules.innerHTML = D.seasonRules.slice(0, 1).map(function (r) {
      return '<tr><td>' + esc(r.route) + '</td><td>' + esc(r.dates) + '</td><td>' + esc(r.fee) + '</td><td>' + esc(r.rules) + '</td></tr>';
    }).join("");
  }

  var stampList = document.getElementById("fuji-stamp-list");
  if (stampList && D.stampPoints) {
    stampList.innerHTML = '<div class="fuji-stamp-row fuji-stamp-row--head"><span>#</span><span>地点</span><span>海拔</span><span>位置</span><span>枚</span><span>时间</span><span>备注</span></div>' +
      D.stampPoints.map(function (p) {
        return '<div class="fuji-stamp-row"><span class="n">' + p.order + '</span><span class="nm">' + esc(p.name) + '</span><span class="el">' + esc(p.elevation) + '</span><span class="ar">' + esc(p.area) + '</span><span class="ct">' + p.count + '</span><span class="tm">' + esc(p.time) + '</span><span class="nt">' + esc(p.note) + '</span></div>';
      }).join("");
  }

  document.getElementById("fuji-plan").innerHTML = D.plan.map(function (p) {
    return '<div class="fuji-day"><span>' + esc(p.day) + '</span><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></div></div>';
  }).join("");
  document.getElementById("fuji-checklist").innerHTML = D.checklist.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join("");
  document.getElementById("fuji-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");
})();
