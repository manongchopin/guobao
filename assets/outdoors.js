(function () {
  "use strict";
  var D = window.TRIPS || {};
  var hikes = Array.isArray(D.hikes) ? D.hikes : [];
  var sports = Array.isArray(D.sports) ? D.sports : [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function activityMap(el, path, color) {
    var map = L.map(el, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
    var line = L.polyline(path, { color: color, weight: 3, opacity: 0.95, lineJoin: "round" }).addTo(map);
    L.circleMarker(path[0], { radius: 4, color: "#a8402f", weight: 2, fillColor: "#fffdf7", fillOpacity: 1 }).addTo(map).bindTooltip("起点");
    map.fitBounds(line.getBounds(), { padding: [24, 24] });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
  }

  function card(h, i, prefix, color, extra) {
    return '<article class="tp-hike">' +
      '<div class="tp-hike-head"><div>' +
        '<h3>' + esc(h.name || "未命名") + '</h3>' +
        '<p class="tp-hike-meta">' + esc(h.month || "") + ' · ' +
          (h.km != null ? h.km + ' km' : "") +
          (h.ascent != null ? ' · 爬升 ' + h.ascent + ' m' : "") +
          (h.duration ? ' · 用时 ' + h.duration : "") +
        '</p>' +
        (extra || '') +
      '</div><p class="tp-hike-points">' + (h.points || (h.path || []).length) + ' 点</p></div>' +
      '<div class="tp-hike-map" id="' + prefix + '-map-' + i + '"></div>' +
      '<p class="tp-map-note">GPS 抽稀轨迹 · 底图 © OpenStreetMap contributors</p>' +
    '</article>';
  }

  function renderHikes() {
    var box = document.getElementById("tp-hike-list");
    if (!box) return;
    if (!hikes.length) { box.innerHTML = '<p class="tp-nothing">还没有徒步记录。</p>'; return; }
    var list = hikes.slice().sort(function (a, b) { return String(b.month).localeCompare(String(a.month)); });
    box.innerHTML = list.map(function (h, i) {
      return card(h, i, "tp-hike", "#4a6b52", h.note ? '<p class="tp-hike-note">' + esc(h.note) + '</p>' : '');
    }).join("");
    if (!window.L) return;
    list.forEach(function (h, i) {
      var el = document.getElementById("tp-hike-map-" + i);
      if (el && h.path && h.path.length > 1) activityMap(el, h.path, "#4a6b52");
    });
  }

  function renderSports() {
    var box = document.getElementById("tp-sport-list");
    if (!box) return;
    if (!sports.length) { box.innerHTML = '<p class="tp-nothing">还没有运动记录。</p>'; return; }
    box.innerHTML = sports.map(function (h, i) {
      var extra = (h.gpsKm ? '<p class="tp-hike-note">GPS 记录 ' + h.gpsKm + ' km · Apple Watch</p>' : '') +
        (h.pending ? '<p class="tp-hike-note">赛事待核实，名称稍后补</p>' : '');
      return card(h, i, "tp-sport", "#a8402f", extra);
    }).join("");
    if (!window.L) return;
    sports.forEach(function (h, i) {
      var el = document.getElementById("tp-sport-map-" + i);
      if (el && h.path && h.path.length > 1) activityMap(el, h.path, "#a8402f");
    });
  }

  renderHikes();
  renderSports();
})();
