(function () {
  "use strict";
  var D = window.FUJI_CLIMB;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  document.getElementById("fuji-routes").innerHTML = D.routes.map(function (r) {
    return '<article class="fuji-route" id="route-' + esc(r.id) + '">' +
      '<div class="fuji-route-head"><span>' + esc(r.side) + '</span><em>' + esc(r.bestFor) + '</em></div>' +
      '<h3>' + esc(r.name) + '</h3>' +
      '<p class="fuji-trailhead">' + esc(r.trailhead) + ' · ' + esc(r.elevation) + '</p>' +
      '<div class="fuji-stats"><div><b>' + esc(r.up) + '</b><span>上山</span></div><div><b>' + esc(r.down) + '</b><span>下山</span></div><div><b>' + esc(r.timeUp) + '</b><span>上行时间</span></div><div><b>' + esc(r.timeDown) + '</b><span>下行时间</span></div></div>' +
      '<p><b>地形：</b>' + esc(r.terrain) + '</p><p><b>山小屋：</b>' + esc(r.huts) + '</p><p>' + esc(r.notes) + '</p></article>';
  }).join("");
  document.getElementById("fuji-rules").innerHTML = D.seasonRules.map(function (r) {
    return '<tr><td>' + esc(r.route) + '</td><td>' + esc(r.dates) + '</td><td>' + esc(r.fee) + '</td><td>' + esc(r.rules) + '</td></tr>';
  }).join("");
  document.getElementById("fuji-plan").innerHTML = D.plan.map(function (p) {
    return '<div class="fuji-day"><span>' + esc(p.day) + '</span><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></div></div>';
  }).join("");
  document.getElementById("fuji-checklist").innerHTML = D.checklist.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join("");
  document.getElementById("fuji-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");
})();
