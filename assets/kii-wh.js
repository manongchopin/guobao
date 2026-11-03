(function () {
  "use strict";
  var D = window.KII_WH;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var areaById = {};
  D.areas.forEach(function (a) { areaById[a.id] = a; });
  var map = null, markerLayer = null, routeLayer = null, markers = {}, routeLines = {}, current = "all";

  function popupHtml(p) {
    var a = areaById[p.area];
    return '<b>' + p.no + ' · ' + esc(p.name) + '</b>' +
      '<div class="kw-pop-meta">' + esc(a ? a.name : "") + ' · ' + esc(p.type) + '</div>' +
      '<p>' + esc(p.note) + '</p><p><strong>到达：</strong>' + esc(p.access) + '</p>';
  }
  function itemHtml(p) {
    var a = areaById[p.area];
    return '<button class="kw-item" type="button" data-no="' + p.no + '">' +
      '<span class="kw-no" style="color:' + a.color + '">' + p.no + '</span>' +
      '<span><span class="kw-item-name">' + esc(p.name) + '</span>' +
      '<span class="kw-item-meta">' + esc(a.name) + ' · ' + esc(p.type) + '</span></span></button>';
  }
  function renderList(points) {
    document.getElementById("kw-count").textContent = points.length + " 处";
    document.getElementById("kw-list").innerHTML = points.map(itemHtml).join("");
  }
  function drawRoutes() {
    if (!routeLayer) return;
    routeLayer.clearLayers(); routeLines = {};
    D.routes.forEach(function (r) {
      var line = L.polyline(r.line, {
        color: "#8a6338", weight: 2, opacity: .55, dashArray: "5 5", lineCap: "round"
      }).addTo(routeLayer);
      line.bindTooltip(r.name, { sticky: true });
      line.on("click", function () { selectRoute(r.id, false); });
      routeLines[r.id] = line;
    });
  }
  function renderMap() {
    if (!map) return;
    markerLayer.clearLayers(); markers = {};
    var pts = current === "all" ? D.points : D.points.filter(function (p) { return p.area === current; });
    pts.forEach(function (p) {
      var a = areaById[p.area];
      var icon = L.divIcon({
        className: "kw-pin-wrap",
        html: '<span class="kw-pin" style="--pin:' + a.color + '">' + p.no + '</span>',
        iconSize: [21, 21], iconAnchor: [10, 10]
      });
      var m = L.marker([p.lat, p.lng], { icon: icon, title: p.no + " " + p.name }).addTo(markerLayer);
      m.bindPopup(popupHtml(p), { maxWidth: 280 });
      markers[p.no] = m;
    });
    renderList(pts);
    if (pts.length) map.fitBounds(L.latLngBounds(pts.map(function (p) { return [p.lat, p.lng]; })), { padding: [40, 40], maxZoom: current === "all" ? 9 : 12 });
  }
  function selectRoute(id, fit) {
    D.routes.forEach(function (r) {
      var line = routeLines[r.id];
      if (!line) return;
      var on = r.id === id;
      line.setStyle({ color: on ? "#a94738" : "#8a6338", weight: on ? 4 : 2, opacity: on ? .95 : .55 });
      if (on && fit) map.fitBounds(line.getBounds(), { padding: [35, 35] });
    });
    document.querySelectorAll(".kw-route").forEach(function (x) { x.classList.toggle("is-active", x.getAttribute("data-route") === id); });
  }

  document.getElementById("kw-filter").innerHTML =
    '<button type="button" data-area="all" class="is-active">全部 17</button>' +
    D.areas.map(function (a) { return '<button type="button" data-area="' + a.id + '">' + esc(a.name) + '</button>'; }).join("");
  document.getElementById("kw-filter").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-area]");
    if (!b) return;
    current = b.getAttribute("data-area");
    document.querySelectorAll("#kw-filter button").forEach(function (x) { x.classList.toggle("is-active", x === b); });
    renderMap();
  });
  document.getElementById("kw-list").addEventListener("click", function (e) {
    var b = e.target.closest(".kw-item");
    if (!b) return;
    var p = D.points.filter(function (x) { return x.no === Number(b.getAttribute("data-no")); })[0];
    if (!p || !map) return;
    map.flyTo([p.lat, p.lng], 13, { duration: .7 });
    if (markers[p.no]) markers[p.no].openPopup();
    document.querySelectorAll(".kw-item").forEach(function (x) { x.classList.toggle("is-active", x === b); });
  });

  document.getElementById("kw-assets").innerHTML = D.areas.map(function (a) {
    var pts = D.points.filter(function (p) { return p.area === a.id; });
    return '<section class="kw-area-block"><div class="kw-area-head"><h3>' + esc(a.name) + '</h3><span>' + pts.length + ' 处 · ' + esc(a.en) + '</span></div><div class="kw-cards">' +
      pts.map(function (p) {
        return '<article class="kw-card"><div class="kw-card-top"><span>#' + p.no + '</span><b>' + esc(p.type) + '</b></div>' +
          '<h3>' + esc(p.name) + '</h3><p class="kw-card-meta">' + esc(a.name) + '</p>' +
          '<p>' + esc(p.note) + '</p><p class="access"><b>到达：</b>' + esc(p.access) + '</p></article>';
      }).join("") + '</div></section>';
  }).join("");

  document.getElementById("kw-routes").innerHTML = D.routes.map(function (r) {
    return '<article class="kw-route" data-route="' + r.id + '" tabindex="0" role="button">' +
      '<div class="kw-route-top"><span>' + esc(r.start) + ' → ' + esc(r.end) + '</span><b>' + esc(r.level) + '</b></div>' +
      '<h3>' + esc(r.name) + '</h3><p class="kw-route-jp">' + esc(r.jp) + '</p><p>' + esc(r.note) + '</p>' +
      '<div class="kw-route-meta"><span>天数：' + esc(r.days) + '</span><span>' + esc(r.level) + '</span></div></article>';
  }).join("");
  document.getElementById("kw-routes").addEventListener("click", function (e) {
    var b = e.target.closest(".kw-route");
    if (b) selectRoute(b.getAttribute("data-route"), true);
  });
  document.getElementById("kw-routes").addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var b = e.target.closest(".kw-route");
    if (b) { e.preventDefault(); selectRoute(b.getAttribute("data-route"), true); }
  });

  document.getElementById("kw-plan").innerHTML = D.plan.map(function (p) {
    return '<div class="kw-day"><span>' + esc(p.day) + '<br>' + esc(p.area) + '</span><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></div></div>';
  }).join("");
  document.getElementById("kw-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");

  if (window.L) {
    map = L.map("kw-map", { scrollWheelZoom: false }).setView([34.1, 135.8], 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
    routeLayer = L.layerGroup().addTo(map);
    markerLayer = L.layerGroup().addTo(map);
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    drawRoutes();
    setTimeout(function () { map.invalidateSize(); renderMap(); }, 220);
  } else {
    document.getElementById("kw-map").innerHTML = '<p style="padding:24px;font-size:12px;color:#6b6258">地图库未加载；下方 17 个点位仍可阅读。</p>';
    renderList(D.points);
  }
  if (!window.L) renderList(D.points);
})();
