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
    GB_BASEMAP(map);
    var line = L.polyline(path, { color: color, weight: 3, opacity: 0.95, lineJoin: "round" }).addTo(map);
    L.circleMarker(path[0], { radius: 4, color: "#a8402f", weight: 2, fillColor: "#fffdf7", fillOpacity: 1 }).addTo(map).bindTooltip("起点");
    map.fitBounds(line.getBounds(), { padding: [24, 24] });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
  }

  function sortDesc(list) {
    return list.slice().sort(function (a, b) { return String(b.month).localeCompare(String(a.month)); });
  }

  function card(h, i, prefix) {
    var hasPath = !!(h.path && h.path.length > 1);
    var extra = "";
    if (h.gpsKm) extra += '<p class="tp-hike-note">GPS 记录 ' + h.gpsKm + ' km · Apple Watch</p>';
    if (h.note) extra += '<p class="tp-hike-note">' + esc(h.note) + '</p>';
    if (h.pending) extra += '<p class="tp-hike-note">赛事待核实，名称稍后补</p>';
    var map = hasPath
      ? '<div class="tp-hike-map" id="' + prefix + '-map-' + i + '"></div>' +
        '<p class="tp-map-note">GPS 抽稀轨迹 · 底图 © OpenStreetMap contributors</p>'
      : '<p class="tp-map-note">无 GPS 轨迹，仅记录距离与用时。</p>';
    return '<article class="tp-hike">' +
      '<div class="tp-hike-head"><div>' +
        '<h3>' + esc(h.name || "未命名") + '</h3>' +
        '<p class="tp-hike-meta">' + esc(h.month || "") + ' · ' +
          (h.km != null ? h.km + ' km' : "") +
          (h.ascent != null ? ' · 爬升 ' + h.ascent + ' m' : "") +
          (h.duration ? ' · 用时 ' + h.duration : "") +
        '</p>' + extra +
      '</div><p class="tp-hike-points">' + (hasPath ? (h.points || h.path.length) + ' 点' : '') + '</p></div>' +
      map +
    '</article>';
  }

  function renderGroup(list, boxId, prefix, color) {
    var box = document.getElementById(boxId);
    if (!box) return;
    if (!list.length) { box.innerHTML = '<p class="tp-nothing">还没有记录。</p>'; return; }
    var sorted = sortDesc(list);
    box.innerHTML = sorted.map(function (h, i) { return card(h, i, prefix); }).join("");
    if (!window.L) return;
    sorted.forEach(function (h, i) {
      var el = document.getElementById(prefix + "-map-" + i);
      if (el && h.path && h.path.length > 1) activityMap(el, h.path, color);
    });
  }

  var run = sports.filter(function (h) { return h.type === "run"; });
  var ride = sports.filter(function (h) { return h.type === "ride"; });
  var hike = hikes.map(function (h) { return Object.assign({ type: "hike" }, h); })
    .concat(sports.filter(function (h) { return h.type === "hike"; }));
  var walk = sports.filter(function (h) { return h.type === "walk"; });

  renderGroup(run, "tp-run-list", "run", "#a8402f");
  renderGroup(ride, "tp-ride-list", "ride", "#1d2622");
  renderGroup(hike, "tp-hike-list", "hike", "#4a6b52");
  renderGroup(walk, "tp-walk-list", "walk", "#8a938c");
})();
