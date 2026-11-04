(function () {
  "use strict";

  var D = window.RYUKYU;
  if (!D) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var whById = {};
  D.wh.forEach(function (w) { whById[w.id] = w; });

  var MAP_CFG = {
    "wh":      { fitPad: [30, 30], maxZoom: 9 },
    "naha":    { fitPad: [35, 35], maxZoom: 15 },
    "yanbaru": { fitPad: [35, 35], maxZoom: 12 }
  };

  var ROUTE_STYLE = {
    walk: { color: "#a8402f", dashArray: "4 5", weight: 2.5 },
    rail: { color: "#4f5878", dashArray: "2 6", weight: 2.5 },
    road: { color: "#8a6338", dashArray: "6 5", weight: 2.5 }
  };

  function colorOf(p) {
    if (p.id === "hotel") return "#a8402f";
    if (p.wh && whById[p.wh]) return whById[p.wh].color;
    return "#5d6a63";
  }

  function popupHtml(p) {
    var w = p.wh ? whById[p.wh] : null;
    var bits = [];
    if (w) bits.push("世界遗产 " + w.no);
    if (p.type) bits.push(p.type);
    if (p.day) bits.push(p.day);
    return '<div class="ry-pop">' +
      '<b>' + (p.no === "H" ? "" : p.no + " · ") + esc(p.name) + '</b>' +
      '<div class="ry-pop-meta">' + esc(bits.join(" · ")) + '</div>' +
      (p.jp ? '<div class="ry-pop-jp">' + esc(p.jp) + '</div>' : "") +
      '<p>' + esc(p.note) + '</p>' +
      (p.access ? '<p class="ry-pop-access"><strong>到达：</strong>' + esc(p.access) + '</p>' : "") +
      '</div>';
  }

  function buildList(key, pts, map, markers) {
    var host = document.getElementById("ry-list-" + key);
    if (!host) return;
    if (!pts.length) { host.innerHTML = ""; return; }
    host.innerHTML = pts.map(function (p) {
      var c = colorOf(p);
      return '<button class="ry-item" type="button" data-id="' + p.id + '">' +
        '<span class="ry-item-no" style="color:' + c + '">' + (p.no === "H" ? "H" : p.no) + '</span>' +
        '<span class="ry-item-main">' +
          '<span class="ry-item-name">' + esc(p.name) + '</span>' +
          '<span class="ry-item-meta">' + esc([p.wh ? whById[p.wh].name : "非遗产点", p.type].filter(Boolean).join(" · ")) + '</span>' +
        '</span>' +
        '<span class="ry-item-day">' + esc(p.day || "") + '</span>' +
      '</button>';
    }).join("");
    host.querySelectorAll(".ry-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var m = markers[btn.getAttribute("data-id")];
        if (!m) return;
        map.setView(m.getLatLng(), Math.max(map.getZoom(), 13), { animate: true });
        m.openPopup();
      });
    });
  }

  function initMap(key) {
    var el = document.getElementById("ry-map-" + key);
    if (!el || !window.L) return;
    var cfg = MAP_CFG[key] || {};
    var map = L.map(el.id, { scrollWheelZoom: false });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var pts = D.points.filter(function (p) { return p.maps && p.maps.indexOf(key) >= 0; });
    var markers = {};

    D.routes.filter(function (r) { return r.map === key; }).forEach(function (r) {
      var st = ROUTE_STYLE[r.kind] || ROUTE_STYLE.road;
      var line = L.polyline(r.line, {
        color: st.color, weight: st.weight, opacity: .7,
        dashArray: st.dashArray, lineCap: "round"
      }).addTo(map);
      line.bindTooltip(r.name + "（示意）", { sticky: true });
    });

    pts.forEach(function (p) {
      var c = colorOf(p);
      var icon = L.divIcon({
        className: "ry-pin-wrap",
        html: '<span class="ry-pin" style="--pin:' + c + '">' + (p.no === "H" ? "宿" : p.no) + '</span>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      var m = L.marker([p.lat, p.lng], { icon: icon, title: p.name }).addTo(map);
      m.bindPopup(popupHtml(p), { maxWidth: 300 });
      markers[p.id] = m;
    });

    if (pts.length) {
      map.fitBounds(L.latLngBounds(pts.map(function (p) { return [p.lat, p.lng]; })), {
        padding: cfg.fitPad || [30, 30],
        maxZoom: cfg.maxZoom || 12
      });
    } else {
      map.setView([26.5, 128], 8);
    }

    buildList(key, pts, map, markers);
  }

  ["wh", "naha", "yanbaru"].forEach(initMap);

  // 世界遗产清单
  var whHost = document.getElementById("ry-wh-list");
  if (whHost) {
    whHost.innerHTML = D.wh.map(function (w) {
      var comps = D.points.filter(function (p) { return p.wh === w.id; });
      return '<div class="ry-wh-card" style="--c:' + w.color + '">' +
        '<div class="ry-wh-head">' +
          '<span class="ry-wh-no">' + esc(w.no) + '</span>' +
          '<span><span class="ry-wh-name">' + esc(w.name) + '</span>' +
          '<span class="ry-wh-jp">' + esc(w.jp) + '</span></span>' +
          '<span class="ry-wh-kind">' + esc(w.kind) + '遗产 · ' + esc(w.year) + ' 年 · ' + esc(w.unit) + '</span>' +
        '</div>' +
        '<p class="ry-wh-note">' + esc(w.note) + '</p>' +
        '<div class="ry-wh-comps">' + comps.map(function (p) {
          return '<span class="ry-comp">' +
            (p.no === "H" ? "" : '<b>' + p.no + '</b>') + esc(p.name) +
            '<em>' + esc(p.day || "") + '</em></span>';
        }).join("") + '</div>' +
      '</div>';
    }).join("");
  }
})();
