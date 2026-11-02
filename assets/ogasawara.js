(function () {
  "use strict";
  var D = window.OGASAWARA;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  document.getElementById("oga-islands").innerHTML = D.islands.map(function (i) {
    return '<article class="oga-island" id="island-' + esc(i.id) + '">' +
      '<div class="oga-island-top"><span>' + esc(i.en) + '</span><em>' + esc(i.role) + '</em></div>' +
      '<h3>' + esc(i.name) + '</h3><p class="oga-summary">' + esc(i.summary) + '</p>' +
      '<div class="oga-tags">' + i.highlights.map(function (h) { return '<b>' + esc(h) + '</b>'; }).join("") + '</div>' +
      '<p class="oga-note">' + esc(i.note) + '</p></article>';
  }).join("");
  document.getElementById("oga-itinerary").innerHTML = D.itinerary.map(function (d) {
    return '<div class="oga-day"><span>' + esc(d.day) + '</span><div><h3>' + esc(d.title) + '</h3><p>' + esc(d.text) + '</p></div></div>';
  }).join("");
  document.getElementById("oga-bookings").innerHTML = D.bookings.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join("");
  document.getElementById("oga-season").innerHTML = D.season.map(function (s) {
    return '<tr><td>' + esc(s.period) + '</td><td><b>' + esc(s.label) + '</b></td><td>' + esc(s.text) + '</td></tr>';
  }).join("");
  document.getElementById("oga-tips").innerHTML = D.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
  document.getElementById("oga-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");
})();
