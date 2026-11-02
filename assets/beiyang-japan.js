(function () {
  "use strict";
  var D = window.BEIYANG_JAPAN;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  document.getElementById("by-timeline").innerHTML = D.timeline.map(function (t) {
    return '<div class="by-time"><span>' + esc(t.year) + '</span><p>' + esc(t.text) + '</p></div>';
  }).join("");
  var cities = [];
  D.sites.forEach(function (s) { if (cities.indexOf(s.city) < 0) cities.push(s.city); });
  document.getElementById("by-sites").innerHTML = cities.map(function (city) {
    var items = D.sites.filter(function (s) { return s.city === city; });
    return '<section class="by-city"><div class="by-city-head"><h3>' + esc(city) + '</h3><span>' + items.length + ' 处</span></div><div class="by-site-grid">' +
      items.map(function (s) {
        return '<article class="by-site"><div class="by-site-top"><span>' + esc(s.type) + '</span><em>' + esc(s.status) + '</em></div>' +
          '<h4>' + esc(s.name) + '</h4><p>' + esc(s.note) + '</p></article>';
      }).join("") + '</div></section>';
  }).join("");
  document.getElementById("by-plan").innerHTML = D.plan.map(function (p) {
    return '<div class="by-day"><span>' + esc(p.day) + '</span><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></div></div>';
  }).join("");
  document.getElementById("by-tips").innerHTML = D.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
  document.getElementById("by-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");
})();
