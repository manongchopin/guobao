(function () {
  "use strict";
  var D = window.SEA_DRIVE;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var maps = [];
  var color = { "文化": "#8f3f31", "自然": "#3f6655" };
  var allSites = [];
  D.countries.forEach(function (c) { c.sites.forEach(function (s) { s.country = c.name; allSites.push(s); }); });
  function sitePopup(s) {
    return '<b>' + esc(s.name) + '</b><div class="sd-pop-meta">' + esc(s.country) + ' · ' + esc(s.place) + ' · ' + s.year + ' · ' + esc(s.type) + (s.id === "la-hinnamno" ? ' · 与越南共享' : '') + '</div><p>' + esc(s.note) + '</p><p style="font-size:9px;color:#6b6258">UNESCO ' + esc(s.unesco) + '</p>';
  }
  function siteIcon(s) {
    return L.divIcon({
      className: "sd-pin-wrap",
      html: '<span class="sd-pin" style="--pin:' + (color[s.type] || "#8f3f31") + '">' + esc(s.unesco.slice(-2)) + '</span>',
      iconSize: [23, 23], iconAnchor: [11, 11]
    });
  }
  function starIcon() {
    return L.divIcon({ className: "sd-pin-wrap", html: '<span class="sd-star">★</span>', iconSize: [22, 22], iconAnchor: [11, 11] });
  }
  function addTiles(map) {
    GB_BASEMAP(map);
  }
  function routeLine(map) {
    return L.polyline(D.route.map(function (p) { return [p.lat, p.lng]; }), {
      color: "#8a6338", weight: 2.5, opacity: .8, dashArray: "6 6", lineCap: "round"
    }).addTo(map);
  }

  (function initAll() {
    var map = L.map("sd-all-map", { scrollWheelZoom: false }).setView([13.0, 103.0], 5);
    addTiles(map); routeLine(map);
    var bounds = [];
    allSites.forEach(function (s) {
      L.marker([s.lat, s.lng], { icon: siteIcon(s) }).addTo(map).bindPopup(sitePopup(s), { maxWidth: 285 });
      bounds.push([s.lat, s.lng]);
    });
    D.chinaLinks.forEach(function (x) {
      L.marker([x.lat, x.lng], { icon: starIcon() }).addTo(map).bindPopup('<b>★ ' + esc(x.name) + '</b><div class="sd-pop-meta">' + esc(x.level) + ' · ' + esc(x.where) + '</div><p>' + esc(x.why) + '</p>', { maxWidth: 300 });
      bounds.push([x.lat, x.lng]);
    });
    D.route.forEach(function (p) {
      if (p.kind === "border") {
        L.circleMarker([p.lat, p.lng], { radius: 5, color: "#a94738", fillColor: "#f5f1e8", fillOpacity: 1, weight: 2 }).addTo(map).bindPopup('<b>' + esc(p.name) + '</b>');
      }
      bounds.push([p.lat, p.lng]);
    });
    map.fitBounds(L.latLngBounds(bounds), { padding: [35, 35] });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    maps.push(map);
  })();

  document.getElementById("sd-route-strip").innerHTML = D.route.map(function (p, i) {
    return '<span>' + (i ? '<i>→</i> ' : '') + '<b>' + esc(p.name) + '</b></span>';
  }).join("");

  document.getElementById("sd-borders").innerHTML = '<div class="sd-border-row head"><span>从</span><span>到</span><span>建议口岸/方向</span><em>状态</em></div>' +
    D.borders.map(function (b) {
      return '<div class="sd-border-row"><span>' + esc(b.from) + '</span><span>' + esc(b.to) + '</span><b>' + esc(b.crossing) + '</b><em>' + esc(b.status) + '</em></div>';
    }).join("");

  document.getElementById("sd-countries").innerHTML = D.countries.map(function (c) {
    return '<section class="sd-country-block"><div class="sd-country-head"><h3>' + esc(c.name) + ' · ' + esc(c.en) + '</h3><span>' + c.sites.length + ' 项世界遗产</span></div>' +
      '<div class="sd-country-body"><div class="sd-country-map" id="sd-map-' + c.id + '"></div><div class="sd-country-sites">' +
      c.sites.map(function (s) {
        return '<div class="sd-site"><div class="sd-site-top"><span>' + s.year + ' · ' + esc(s.type) + (s.id === "la-hinnamno" ? '<span class="sd-badge">跨国</span>' : '') + '</span><b>' + esc(s.place) + '</b></div>' +
          '<h4>' + esc(s.name) + '</h4><p class="en">' + esc(s.en) + '</p><p>' + esc(s.note) + '</p></div>';
      }).join("") + '</div></div></section>';
  }).join("");
  D.countries.forEach(function (c) {
    var map = L.map(document.getElementById("sd-map-" + c.id), { scrollWheelZoom: false }).setView(c.center, c.zoom);
    addTiles(map);
    var b = [];
    c.sites.forEach(function (s) {
      L.marker([s.lat, s.lng], { icon: siteIcon(s) }).addTo(map).bindPopup(sitePopup(s), { maxWidth: 285 });
      b.push([s.lat, s.lng]);
    });
    if (b.length) map.fitBounds(L.latLngBounds(b), { padding: [28, 28], maxZoom: c.zoom + 1 });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    maps.push(map);
  });

  document.getElementById("sd-ming").innerHTML = D.mingModes.map(function (m) {
    return '<article class="sd-ming-card"><span>' + esc(m.mode) + '</span><h3>' + esc(m.where) + '</h3><p>' + esc(m.text) + '</p></article>';
  }).join("");

  document.getElementById("sd-china-links").innerHTML = D.chinaLinks.map(function (x) {
    return '<article class="sd-china-card"><div class="sd-china-card-top"><span>' + esc(x.level) + ' 级</span><b>' + esc(x.where) + '</b></div>' +
      '<h3>★ ' + esc(x.name) + '</h3><p class="where">' + esc(x.why) + '</p><p class="access"><b>到达：</b>' + esc(x.access) + '</p></article>';
  }).join("");

  document.getElementById("sd-zh003").innerHTML = D.zh003.map(function (x) {
    return '<article class="sd-zh-card"><span>ZH-003 · ' + esc(x.country) + '</span><h3>' + esc(x.name) + '</h3><p>' + esc(x.note) + '</p></article>';
  }).join("");

  document.getElementById("sd-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");

  window.addEventListener("resize", function () { maps.forEach(function (m) { m.invalidateSize(); }); });
})();
