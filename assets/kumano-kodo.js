(function () {
  "use strict";
  var D = window.KUMANO_KODO;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var main = document.getElementById("kumano-main-route");
  if (main && D.routes && D.routes[0]) {
    var r = D.routes[0];
    main.innerHTML = '<article class="kumano-main-card" id="route-' + esc(r.id) + '">' +
      '<div class="kumano-main-top"><span>' + esc(r.jp) + '</span><em>' + esc(r.difficulty) + '</em></div>' +
      '<h3>' + esc(r.name) + '</h3>' +
      '<p class="kumano-main-days">' + esc(r.days) + ' · ' + esc(r.start) + ' → ' + esc(r.end) + '</p>' +
      '<p>' + esc(r.notes) + '</p>' +
      '<dl><dt>地形</dt><dd>' + esc(r.terrain) + '</dd><dt>住宿带</dt><dd>' + esc(r.lodging) + '</dd><dt>适合</dt><dd>' + esc(r.bestFor) + '</dd></dl>' +
      '</article>';
  }

  var other = document.getElementById("kumano-other-routes");
  if (other && D.routes) {
    other.innerHTML = D.routes.slice(1).map(function (r) {
      return '<article class="kumano-other-card" id="route-' + esc(r.id) + '">' +
        '<h3>' + esc(r.name) + '<em>' + esc(r.jp) + '</em></h3>' +
        '<p>' + esc(r.days) + ' · ' + esc(r.start) + ' → ' + esc(r.end) + '</p>' +
        '<span>' + esc(r.notes) + '</span></article>';
    }).join("");
  }

  function plan(id, data) {
    var el = document.getElementById(id);
    if (!el || !data) return;
    el.innerHTML = data.map(function (p) {
      return '<div class="kumano-day"><span>' + esc(p.day) + '</span><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></div></div>';
    }).join("");
  }
  plan("kumano-plan3", D.plan3);
  plan("kumano-plan4", D.plan4);
  plan("kumano-plan6", D.plan6);

  var tips = document.getElementById("kumano-tips");
  if (tips) tips.innerHTML = D.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");

  var sources = document.getElementById("kumano-sources");
  if (sources) sources.innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");
})();
