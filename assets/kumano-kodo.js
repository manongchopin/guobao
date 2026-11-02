(function () {
  "use strict";
  var D = window.KUMANO_KODO;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  document.getElementById("kumano-routes").innerHTML = D.routes.map(function (r) {
    return '<article class="kumano-route" id="route-' + esc(r.id) + '">' +
      '<div class="kumano-route-head"><span>' + esc(r.jp) + '</span><em>' + esc(r.difficulty) + '</em></div>' +
      '<h3>' + esc(r.name) + '</h3>' +
      '<p class="kumano-days">' + esc(r.days) + ' · ' + esc(r.start) + ' → ' + esc(r.end) + '</p>' +
      '<p><b>地形：</b>' + esc(r.terrain) + '</p><p><b>住宿带：</b>' + esc(r.lodging) + '</p>' +
      '<p><b>适合：</b>' + esc(r.bestFor) + '</p><p>' + esc(r.notes) + '</p></article>';
  }).join("");
  function plan(id, data) {
    document.getElementById(id).innerHTML = data.map(function (p) {
      return '<div class="kumano-day"><span>' + esc(p.day) + '</span><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></div></div>';
    }).join("");
  }
  plan("kumano-plan3", D.plan3);
  plan("kumano-plan4", D.plan4);
  document.getElementById("kumano-tips").innerHTML = D.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
  document.getElementById("kumano-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");
})();
