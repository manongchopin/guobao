/* 釜山—对马—壹歧—福冈 · 地图渲染
   三张小图：对马、福冈、釜山。无 Leaflet 时保留表格阅读。 */
(function () {
  "use strict";
  var D = window.BTK_DATA;
  if (!D) return;

  var OSM = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  var ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';
  var maps = {};

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function boot() {
    if (!window.L) {
      Array.prototype.forEach.call(document.querySelectorAll(".bf-map"), function (el) {
        el.innerHTML = '<p style="padding:24px;font-size:12px;line-height:1.8;color:#6b6258">地图库未加载（需要联网取 Leaflet）。点位信息见上方表格，不受影响。</p>';
      });
      return;
    }
    Object.keys(D.maps).forEach(function (key) {
      var host = document.getElementById("btk-map-" + key);
      if (!host) return;
      var cfg = D.maps[key];
      var map = L.map(host, { scrollWheelZoom: false, attributionControl: true })
        .setView(cfg.center, cfg.zoom);
      L.tileLayer(OSM, { maxZoom: 18, attribution: ATTR }).addTo(map);
      L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);

      var group = D.spots.filter(function (s) { return s.map === key; });
      var bounds = [];
      group.forEach(function (s) {
        var kind = D.kinds[s.kind] || { color: "#6b6258" };
        bounds.push([s.lat, s.lng]);
        L.circleMarker([s.lat, s.lng], {
          radius: 6, color: kind.color, weight: 2,
          fillColor: "#f5f1e8", fillOpacity: 1
        }).addTo(map).bindPopup(
          '<b>' + esc(s.name) + "</b>" +
          (s.sub ? '<br><span style="font-size:10px;color:#6b6258">' + esc(s.sub) + "</span>" : "") +
          (s.note ? '<br><span style="font-size:11px">' + esc(s.note) + "</span>" : "") +
          (s.approx ? '<br><span style="font-size:10px;color:#8a7a6a">坐标≈ 按位置估算</span>' : "")
        );
      });
      if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [30, 30], maxZoom: 11 });
      }
      maps[key] = map;
    });

    // 图例
    var legend = document.getElementById("btk-legend");
    if (legend) {
      legend.innerHTML = Object.keys(D.kinds).map(function (k) {
        var v = D.kinds[k];
        return '<span class="bf-lg"><i style="background:' + v.color + '"></i>' + esc(v.label) + "</span>";
      }).join("");
    }
  }

  function resize() {
    Object.keys(maps).forEach(function (k) { maps[k].invalidateSize(); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(boot, 120); });
  } else {
    setTimeout(boot, 120);
  }
  window.addEventListener("resize", resize);
})();
