(function () {
  "use strict";
  var D = window.JAPAN_FOUR_EXTREMES;
  if (!D) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var byId = {};
  D.points.forEach(function (p) { byId[p.id] = p; });

  var STATUS = {
    ordinary: { label: "可到" },
    remote: { label: "远海" },
    rock: { label: "岩礁" },
    restricted: { label: "限制" },
    claimed: { label: "主张" }
  };

  var map = null, layer = null, markerById = {};
  var current = "national";

  function popupHtml(p) {
    return '<b>' + esc(p.name) + '</b>' +
      '<div class="je-pop-meta">' + esc(p.cardinal) + ' · ' + esc(p.island) + ' · ' + esc(p.reach) + '</div>' +
      '<p class="je-pop-note">' + esc(p.note) + '</p>' +
      (p.cert ? '<p class="je-pop-note"><strong>证书：</strong>日本本土四極踏破証明書</p>' : '');
  }

  function itemHtml(p) {
    var s = STATUS[p.status] || { label: "" };
    return '<button class="je-item" data-id="' + esc(p.id) + '" type="button">' +
      '<span class="je-item-top"><span class="je-badge je-badge--' + esc(p.status) + '">' + esc(p.cardinal) + '</span>' +
      '<span class="je-item-name">' + esc(p.name) + '</span></span>' +
      '<span class="je-item-meta">' + esc(s.label) + ' · ' + esc(p.island) +
      (p.cert ? ' · <span class="je-cert">证书</span>' : '') + '</span></button>';
  }

  function setMode(id) {
    var mode = D.modes.filter(function (m) { return m.id === id; })[0] || D.modes[0];
    current = mode.id;
    document.querySelectorAll(".je-mode").forEach(function (b) {
      var on = b.getAttribute("data-mode") === current;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.getElementById("je-panel-kicker").textContent = "MODE " + ("0" + (D.modes.indexOf(mode) + 1)).slice(-2);
    document.getElementById("je-panel-title").textContent = mode.name;
    document.getElementById("je-panel-desc").textContent = mode.desc;
    document.getElementById("je-list").innerHTML = mode.ids.map(function (id) { return itemHtml(byId[id]); }).join("");
    if (!map) return;
    layer.clearLayers();
    markerById = {};
    var pts = mode.ids.map(function (id) { return byId[id]; });
    pts.forEach(function (p) {
      var icon = L.divIcon({
        className: "je-pin-wrap",
        html: '<span class="je-pin je-pin--' + p.status + '">' + p.cardinal + '</span>',
        iconSize: [27, 27],
        iconAnchor: [13, 13]
      });
      var m = L.marker([p.lat, p.lng], { icon: icon, riseOnHover: true, title: p.name }).addTo(layer);
      m.bindPopup(popupHtml(p), { maxWidth: 280 });
      markerById[p.id] = m;
    });
    var bounds = L.latLngBounds(pts.map(function (p) { return [p.lat, p.lng]; }));
    map.fitBounds(bounds, { padding: [42, 42], maxZoom: current === "islands" ? 6 : 5 });
    document.getElementById("je-map-hint").textContent = current === "national"
      ? "国家尺度含远海点，地图会拉得很远；切到“本土四极”可聚焦主岛。"
      : "点地图上的圆点，或右侧条目。";
  }

  function focusPoint(id) {
    var p = byId[id];
    if (!p || !map) return;
    map.flyTo([p.lat, p.lng], 8, { duration: 0.7 });
    if (markerById[id]) markerById[id].openPopup();
    document.querySelectorAll(".je-item").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-id") === id);
    });
  }

  document.getElementById("je-modes").innerHTML = D.modes.map(function (m, i) {
    return '<button class="je-mode" type="button" role="tab" data-mode="' + m.id + '" aria-selected="false">' +
      '<span>MODE ' + ("0" + (i + 1)).slice(-2) + '</span><b>' + esc(m.name) + '</b><em>' + esc(m.sub) + '</em></button>';
  }).join("");
  document.getElementById("je-modes").addEventListener("click", function (e) {
    var b = e.target.closest(".je-mode");
    if (b) setMode(b.getAttribute("data-mode"));
  });
  document.getElementById("je-list").addEventListener("click", function (e) {
    var b = e.target.closest(".je-item");
    if (b) focusPoint(b.getAttribute("data-id"));
  });

  if (window.L) {
    map = L.map("je-map", { scrollWheelZoom: false, worldCopyJump: false }).setView([37, 137], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
    layer = L.layerGroup().addTo(map);
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    setTimeout(function () { map.invalidateSize(); }, 200);
  } else {
    document.getElementById("je-map").innerHTML = '<p style="padding:24px;font-size:12px;color:#6b6258">地图库未加载；下面的条目仍可阅读。</p>';
  }
  var initial = (location.hash || "").replace(/^#/, "");
  setMode(D.modes.some(function (m) { return m.id === initial; }) ? initial : "national");
})();
