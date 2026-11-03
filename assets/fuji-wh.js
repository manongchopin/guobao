(function () {
  "use strict";
  var D = window.FUJI_WH;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var catById = {}, stageById = {};
  D.categories.forEach(function (c) { catById[c.id] = c; });
  D.stages.forEach(function (s) { stageById[s.id] = s; });
  var map = null, layer = null, markers = {}, current = "all";

  function popupHtml(p) {
    var c = catById[p.category], s = stageById[p.stage];
    return '<b>' + p.no + ' · ' + esc(p.name) + '</b>' +
      '<div class="fw-pop-meta">' + esc(c ? c.name : "") + ' · ' + esc(s ? s.name : "") + '</div>' +
      '<p>' + esc(p.note) + '</p><p><strong>到达：</strong>' + esc(p.access) + '</p>';
  }
  function itemHtml(p) {
    var c = catById[p.category];
    return '<button class="fw-item" type="button" data-no="' + p.no + '">' +
      '<span class="fw-no" style="color:' + c.color + '">' + p.no + '</span>' +
      '<span><span class="fw-item-name">' + esc(p.name) + '</span>' +
      '<span class="fw-item-meta">' + esc(c.name) + ' · 官方 ' + esc(p.official) + '</span></span></button>';
  }
  function renderList(points) {
    document.getElementById("fw-count").textContent = points.length + " 处";
    document.getElementById("fw-list").innerHTML = points.map(itemHtml).join("");
  }
  function renderMap() {
    if (!map) return;
    layer.clearLayers(); markers = {};
    var pts = current === "all" ? D.points : D.points.filter(function (p) { return p.category === current; });
    pts.forEach(function (p) {
      var c = catById[p.category];
      var icon = L.divIcon({
        className: "fw-pin-wrap",
        html: '<span class="fw-pin" style="--pin:' + c.color + '">' + p.no + '</span>',
        iconSize: [21, 21], iconAnchor: [10, 10]
      });
      var m = L.marker([p.lat, p.lng], { icon: icon, title: p.no + " " + p.name }).addTo(layer);
      m.bindPopup(popupHtml(p), { maxWidth: 280 });
      markers[p.no] = m;
    });
    renderList(pts);
    if (pts.length) {
      map.fitBounds(L.latLngBounds(pts.map(function (p) { return [p.lat, p.lng]; })), { padding: [45, 45], maxZoom: current === "all" ? 10 : 13 });
    }
  }

  document.getElementById("fw-filter").innerHTML =
    '<button type="button" data-cat="all" class="is-active">全部 25</button>' +
    D.categories.map(function (c) { return '<button type="button" data-cat="' + c.id + '">' + esc(c.name) + '</button>'; }).join("");
  document.getElementById("fw-filter").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-cat]");
    if (!b) return;
    current = b.getAttribute("data-cat");
    document.querySelectorAll("#fw-filter button").forEach(function (x) { x.classList.toggle("is-active", x === b); });
    renderMap();
  });
  document.getElementById("fw-list").addEventListener("click", function (e) {
    var b = e.target.closest(".fw-item");
    if (!b) return;
    var p = D.points.filter(function (x) { return x.no === Number(b.getAttribute("data-no")); })[0];
    if (!p || !map) return;
    map.flyTo([p.lat, p.lng], 14, { duration: .7 });
    if (markers[p.no]) markers[p.no].openPopup();
    document.querySelectorAll(".fw-item").forEach(function (x) { x.classList.toggle("is-active", x === b); });
  });

  document.getElementById("fw-assets").innerHTML = D.stages.map(function (s) {
    var pts = D.points.filter(function (p) { return p.stage === s.id; });
    return '<section class="fw-stage-block"><div class="fw-stage-head"><h3>' + esc(s.name) + '</h3><span>' + pts.length + ' 处 · ' + esc(s.days) + '</span></div><div class="fw-cards">' +
      pts.map(function (p) {
        var c = catById[p.category];
        return '<article class="fw-card"><div class="fw-card-top"><span>#' + p.no + ' · 官方 ' + esc(p.official) + '</span><b>' + esc(c.name) + '</b></div>' +
          '<h3>' + esc(p.name) + '</h3><p class="fw-card-meta">' + esc(p.area) + '</p>' +
          '<p>' + esc(p.note) + '</p><p class="access"><b>到达：</b>' + esc(p.access) + '</p></article>';
      }).join("") + '</div></section>';
  }).join("");

  document.getElementById("fw-plan").innerHTML = D.plan.map(function (p) {
    return '<div class="fw-day"><span>' + esc(p.day) + '<br>' + esc(p.area) + '</span><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p><em>包含 ' + p.ids.length + ' 处构成资产</em></div></div>';
  }).join("");

  document.getElementById("fw-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");

  if (window.L) {
    map = L.map("fw-map", { scrollWheelZoom: false }).setView([35.36, 138.73], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
    layer = L.layerGroup().addTo(map);
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    setTimeout(function () { map.invalidateSize(); renderMap(); }, 220);
  } else {
    document.getElementById("fw-map").innerHTML = '<p style="padding:24px;font-size:12px;color:#6b6258">地图库未加载；下方 25 个构成资产仍可阅读。</p>';
    renderList(D.points);
  }
  if (!window.L) renderList(D.points);
})();
