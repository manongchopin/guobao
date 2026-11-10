(function () {
  "use strict";
  var D = window.CHINA_FOUR_EXTREMES;
  if (!D) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var byId = {};
  D.points.forEach(function (p) { byId[p.id] = p; });
  var map = null, layer = null, markerById = {}, currentMode = null;

  var LABEL = { administered: "实控", claimed: "主张", tourist: "可到", disputed: "现状", sea: "海域" };

  function popupHtml(p) {
    return '<b>' + esc(p.name) + '</b>' +
      '<div class="cnx-pop-meta">' + esc(p.cardinal) + ' · ' + esc(p.jp) + '</div>' +
      '<p>' + esc(p.note) + '</p>' +
      '<p class="cnx-pop-access"><strong>到达：</strong>' + esc(p.access) + '</p>';
  }

  function itemHtml(p) {
    return '<button class="cnx-item" type="button" data-id="' + esc(p.id) + '">' +
      '<span class="cnx-item-top"><span class="cnx-badge cnx-badge--' + esc(p.status) + '">' + esc(p.cardinal) + '</span>' +
      '<span class="cnx-item-name">' + esc(p.name) + '</span></span>' +
      '<span class="cnx-item-meta">' + esc(LABEL[p.status] || "") + ' · ' + esc(p.reach) + '</span></button>';
  }

  function renderList() {
    document.getElementById("cnx-list").innerHTML = currentMode.ids.map(function (id) { return itemHtml(byId[id]); }).join("");
  }

  function setMode(id) {
    var mode = D.modes.filter(function (m) { return m.id === id; })[0] || D.modes[0];
    currentMode = mode;
    document.querySelectorAll(".cnx-mode").forEach(function (b) {
      var on = b.getAttribute("data-mode") === mode.id;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.getElementById("cnx-panel-kicker").textContent = "FRAME " + ("0" + (D.modes.indexOf(mode) + 1)).slice(-2);
    document.getElementById("cnx-panel-title").textContent = mode.name;
    document.getElementById("cnx-panel-desc").textContent = mode.desc;
    renderList();
    if (!map) return;
    layer.clearLayers();
    markerById = {};
    var pts = mode.ids.map(function (pid) { return byId[pid]; });
    pts.forEach(function (p) {
      var icon = L.divIcon({
        className: "cnx-pin-wrap",
        html: '<span class="cnx-pin cnx-pin--' + p.status + '">' + p.cardinal + '</span>',
        iconSize: [27, 27],
        iconAnchor: [13, 13]
      });
      var m = L.marker([p.lat, p.lng], { icon: icon, riseOnHover: true, title: p.name }).addTo(layer);
      m.bindPopup(popupHtml(p), { maxWidth: 300 });
      markerById[p.id] = m;
    });
    var bounds = L.latLngBounds(pts.map(function (p) { return [p.lat, p.lng]; }));
    map.fitBounds(bounds, { padding: [42, 42], maxZoom: mode.id === "mainland" || mode.id === "tourist" ? 6 : 5 });
  }

  function focusPoint(id) {
    var p = byId[id];
    if (!p || !map) return;
    map.flyTo([p.lat, p.lng], 8, { duration: 0.7 });
    if (markerById[id]) markerById[id].openPopup();
    document.querySelectorAll(".cnx-item").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-id") === id);
    });
  }

  document.getElementById("cnx-modes").innerHTML = D.modes.map(function (m, i) {
    return '<button class="cnx-mode" type="button" role="tab" data-mode="' + m.id + '" aria-selected="false">' +
      '<span>FRAME ' + ("0" + (i + 1)).slice(-2) + '</span><b>' + esc(m.name) + '</b><em>' + esc(m.sub) + '</em></button>';
  }).join("");
  document.getElementById("cnx-modes").addEventListener("click", function (e) {
    var b = e.target.closest(".cnx-mode");
    if (b) setMode(b.getAttribute("data-mode"));
  });
  document.getElementById("cnx-list").addEventListener("click", function (e) {
    var b = e.target.closest(".cnx-item");
    if (b) focusPoint(b.getAttribute("data-id"));
  });

  document.getElementById("cnx-tourist").innerHTML = (D.tourist || []).map(function (t) {
    return '<article class="cnx-tour-card">' +
      '<div class="cnx-tour-no">' + esc(t.no) + '</div>' +
      '<h3>' + esc(t.name) + '</h3>' +
      '<p class="cnx-tour-region">' + esc(t.region) + '</p>' +
      '<p>' + esc(t.how) + '</p>' +
      '<em>' + esc(t.note) + '</em></article>';
  }).join("");

  if (window.L) {
    map = L.map("cnx-map", { scrollWheelZoom: false, worldCopyJump: false }).setView([35, 105], 4);
    GB_BASEMAP(map);
    layer = L.layerGroup().addTo(map);
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    setTimeout(function () {
      map.invalidateSize();
      if (currentMode) setMode(currentMode.id);
    }, 250);
  } else {
    document.getElementById("cnx-map").innerHTML = '<p style="padding:24px;font-size:12px;color:#6b6258">地图库未加载；下方条目仍可阅读。</p>';
  }

  var initial = (location.hash || "").replace(/^#/, "");
  setMode(D.modes.some(function (m) { return m.id === initial; }) ? initial : "legal");
})();
