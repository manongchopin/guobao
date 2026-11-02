(function () {
  "use strict";
  var D = window.LU_XUN_JAPAN;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  document.getElementById("lx-timeline").innerHTML = D.timeline.map(function (t) {
    return '<div class="lx-time"><span>' + esc(t.year) + '</span><div><b>' + esc(t.place) + '</b><p>' + esc(t.text) + '</p></div></div>';
  }).join("");
  var cities = [];
  D.sites.forEach(function (s) { if (cities.indexOf(s.city) < 0) cities.push(s.city); });
  document.getElementById("lx-sites").innerHTML = cities.map(function (city) {
    var items = D.sites.filter(function (s) { return s.city === city; });
    return '<section class="lx-city"><div class="lx-city-head"><h3>' + esc(city) + '</h3><span>' + items.length + ' 处</span></div><div class="lx-site-grid">' +
      items.map(function (s) {
        return '<article class="lx-site"><div class="lx-site-top"><span>' + esc(s.type) + '</span><em>' + esc(s.status) + '</em></div>' +
          '<h4>' + esc(s.name) + '</h4><p>' + esc(s.note) + '</p></article>';
      }).join("") + '</div></section>';
  }).join("");
  document.getElementById("lx-afterstory").innerHTML = D.afterstory.map(function (t) {
    return '<div class="lx-after"><span>' + esc(t.year) + '</span><p>' + esc(t.text) + '</p></div>';
  }).join("");
  document.getElementById("lx-access").innerHTML = '<h3>' + esc(D.access.title) + '</h3><ul>' +
    D.access.lines.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join("") + '</ul>';
  document.getElementById("lx-plan").innerHTML = D.plan.map(function (p) {
    return '<div class="lx-day"><span>' + esc(p.day) + '</span><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></div></div>';
  }).join("");
  document.getElementById("lx-tips").innerHTML = D.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
  document.getElementById("lx-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");
})();
