(function () {
  "use strict";
  var D = window.TRIPS || {};
  var drives = Array.isArray(D.drives) ? D.drives : [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

  var COLORS = ["#a8402f", "#8a5a2b", "#556b7a", "#4a6b52", "#7a5a7a"];

  function activityMap(el, path, color) {
    var map = L.map(el, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
    var line = L.polyline(path, { color: color || "#1d2622", weight: 2.6, opacity: 0.9, lineJoin: "round" }).addTo(map);
    L.circleMarker(path[0], { radius: 4, color: "#a8402f", weight: 2, fillColor: "#fffdf7", fillOpacity: 1 }).addTo(map).bindTooltip("起终点");
    map.fitBounds(line.getBounds(), { padding: [24, 24] });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
  }

  function renderStats() {
    var km = drives.reduce(function (s, d) { return s + (Number(d.km) || 0); }, 0);
    var cities = {};
    drives.forEach(function (d) {
      if (d.from) cities[d.from] = 1;
      if (d.to) cities[d.to] = 1;
      (d.via || []).forEach(function (c) { cities[c] = 1; });
    });
    document.getElementById("lg-count").textContent = drives.length;
    document.getElementById("lg-km").textContent = fmt(Math.round(km));
    document.getElementById("lg-cities").textContent = Object.keys(cities).length;
  }

  function renderOverview() {
    var el = document.getElementById("tp-drive-overview");
    var legend = document.getElementById("tp-drive-legend");
    if (!el || !window.L || !drives.length) return;
    var map = L.map(el, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
    var bounds = L.latLngBounds([]);
    drives.forEach(function (d, i) {
      if (!d.path || d.path.length < 2) return;
      var color = COLORS[i % COLORS.length];
      var line = L.polyline(d.path, { color: color, weight: 2.4, opacity: 0.85, lineJoin: "round" }).addTo(map);
      line.bindTooltip(d.name + " · " + fmt(d.km) + " km");
      bounds.extend(line.getBounds());
    });
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [24, 24] });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    legend.innerHTML = drives.map(function (d, i) {
      return '<span><i style="background:' + COLORS[i % COLORS.length] + '"></i>' +
        esc(d.name) + ' · ' + fmt(d.km) + ' km</span>';
    }).join("");
  }

  function render() {
    var box = document.getElementById("tp-drive-list");
    if (!drives.length) { box.innerHTML = '<p class="tp-nothing">还没有自驾记录。</p>'; return; }
    box.innerHTML = drives.map(function (d, i) {
      var cities = [d.from].concat(d.via || []).concat([d.to]).filter(Boolean);
      return '<article class="tp-hike">' +
        '<div class="tp-hike-head"><div>' +
          '<h3>' + esc(d.name || "未命名自驾") + '</h3>' +
          '<p class="tp-hike-meta">' +
            (d.month ? esc(d.month) + ' · ' : '时间待补 · ') +
            '环线 · ' + cities.length + ' 站 · ' + fmt(d.km || 0) + ' km' +
          '</p>' +
          (d.note ? '<p class="tp-hike-note">' + esc(d.note) + '</p>' : '') +
        '</div><p class="tp-hike-points">' + (d.points || (d.path || []).length) + ' 点</p></div>' +
        '<div class="tp-hike-map" id="tp-drive-map-' + i + '"></div>' +
        '<p class="tp-map-note">OSRM 公路路径 · 底图 © OpenStreetMap contributors</p>' +
      '</article>';
    }).join("");
    if (!window.L) return;
    drives.forEach(function (d, i) {
      var el = document.getElementById("tp-drive-map-" + i);
      if (el && d.path && d.path.length > 1) activityMap(el, d.path, COLORS[i % COLORS.length]);
    });
  }

  renderStats();
  renderOverview();
  render();
})();
