(function () {
  "use strict";
  var D = window.RAIL_NORTH_SOUTH || window.RAIL_EAST_WEST;
  if (!D) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var endpoints = document.getElementById("rail-endpoints");
  endpoints.innerHTML = D.endpoints.map(function (e) {
    return '<article class="rail-endpoint">' +
      '<div class="rail-endpoint-top"><span>' + esc(e.label) + '</span><em>' + esc(e.status) + '</em></div>' +
      '<h3>' + esc(e.name) + '</h3>' +
      '<p class="rail-place">' + esc(e.place) + '</p>' +
      '<p>' + esc(e.note) + '</p></article>';
  }).join("");

  var stages = document.getElementById("rail-stages");
  stages.innerHTML = D.stages.map(function (s) {
    return '<section class="rail-stage" id="' + esc(s.id) + '">' +
      '<div class="rail-stage-head"><p class="rail-kicker">' + esc(s.kicker) + '</p><h2>' + esc(s.title) + '</h2><p>' + esc(s.summary) + '</p></div>' +
      '<div class="rail-stop-grid">' + s.stops.map(function (p) {
        return '<article class="rail-stop"><div class="rail-stop-top"><span>' + esc(p.place) + '</span><span class="rail-tags">' + (p.tags || []).map(function (t) { return '<b>' + esc(t) + '</b>'; }).join("") + '</span></div>' +
          '<h3>' + esc(p.name) + '</h3><p>' + esc(p.note) + '</p></article>';
      }).join("") + '</div></section>';
  }).join("");

  document.getElementById("rail-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");
})();
