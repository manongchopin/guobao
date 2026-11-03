/* 跟随马克思在伦敦漫步 · 渲染 v0.2 */
(function () {
  var D = window.MARX_LONDON;
  if (!D) return;

  var map = null, layer = null, active = "all";
  var statusById = {};
  D.statuses.forEach(function (s) { statusById[s.id] = s; });

  function esc(v) {
    return String(v === undefined || v === null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function statusOf(id) { return statusById[id] || statusById.unverified; }

  function badge(id) {
    var s = statusOf(id);
    return '<span class="ml-badge" style="--c:' + s.color + '">' + esc(s.label) + "</span>";
  }

  function countBy(id) {
    var n = 0;
    D.points.forEach(function (p) { if (p.status === id) n += 1; });
    return n;
  }

  /* ---------- 图例 ---------- */
  function renderLegend() {
    var box = document.getElementById("ml-legend");
    if (!box) return;
    var html = '<button type="button" class="ml-chip' + (active === "all" ? " on" : "") +
      '" data-status="all">全部 <b>' + D.points.length + "</b></button>";
    D.statuses.forEach(function (s) {
      var n = countBy(s.id);
      if (!n) return;
      html += '<button type="button" class="ml-chip' + (active === s.id ? " on" : "") +
        '" data-status="' + s.id + '" style="--c:' + s.color + '">' +
        '<i class="ml-dot"></i>' + esc(s.label) + " <b>" + n + "</b></button>";
    });
    box.innerHTML = html;
    box.onclick = function (e) {
      var b = e.target.closest(".ml-chip");
      if (!b) return;
      active = b.getAttribute("data-status");
      renderLegend();
      drawMarkers();
    };
  }

  /* ---------- 地图 ---------- */
  function popupHtml(p) {
    var st = statusOf(p.status);
    return '<div class="ml-pop">' +
      '<span class="ml-pop-no">' + (p.n < 10 ? "0" : "") + p.n + " · " + esc(p.kind) + "</span>" +
      "<b>" + esc(p.zh) + "</b>" +
      "<em>" + esc(p.en) + "</em>" +
      '<span class="ml-pop-meta">' + esc(st.label) + " · " + esc(p.years || "—") + "</span>" +
      '<span class="ml-pop-meta">' + esc(p.address) + (p.approx ? " ≈" : "") + "</span>" +
      "</div>";
  }

  function initMap() {
    var el = document.getElementById("ml-map");
    if (!el || typeof L === "undefined") return;
    map = L.map(el, { scrollWheelZoom: false }).setView([51.527, -0.140], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
    layer = L.layerGroup().addTo(map);
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    drawMarkers();
  }

  function drawMarkers() {
    if (!layer) return;
    layer.clearLayers();
    var pts = [];
    D.points.forEach(function (p) {
      if (active !== "all" && p.status !== active) return;
      var s = statusOf(p.status);
      var m = L.circleMarker([p.lat, p.lng], {
        radius: 7,
        color: "#fffdf7",
        weight: 1.6,
        fillColor: s.color,
        fillOpacity: 0.95
      }).addTo(layer);
      m.bindPopup(popupHtml(p), { maxWidth: 280 });
      m.bindTooltip((p.n < 10 ? "0" : "") + p.n + " · " + p.zh, { direction: "top", offset: [0, -4] });
      pts.push([p.lat, p.lng]);
    });
    if (pts.length) map.fitBounds(pts, { padding: [40, 40], maxZoom: 15 });
  }

  /* ---------- 分段 ---------- */
  function renderAreas() {
    var box = document.getElementById("ml-areas");
    if (!box) return;
    var html = "";
    D.areas.forEach(function (a) {
      var list = "";
      D.points.forEach(function (p) {
        if (p.area !== a.id) return;
        list += '<li><span class="n">' + (p.n < 10 ? "0" : "") + p.n + "</span>" +
          '<span class="t">' + esc(p.zh) + "</span>" + badge(p.status) + "</li>";
      });
      if (!list) return;
      html += '<div class="ml-area">' +
        '<p class="ml-area-kicker">' + esc(a.kicker) + "</p>" +
        "<h3>" + esc(a.name) + "</h3>" +
        '<p class="ml-area-desc">' + esc(a.desc) + "</p>" +
        '<ul class="ml-area-list">' + list + "</ul>" +
        "</div>";
    });
    box.innerHTML = html;
  }

  /* ---------- 单点档案 ---------- */
  function accessLabel(v) {
    return { enter: "可以进去", "exterior-only": "只能看外观", "not-visible": "看不到实体" }[v] || esc(v);
  }

  function roleLabel(v) {
    return { yes: "有标识", no: "无标识", unknown: "待核" }[v] || "—";
  }

  function renderPoints() {
    var box = document.getElementById("ml-points");
    if (!box) return;
    var html = "";
    D.points.forEach(function (p) {
      var srcs = (p.sources || []).map(function (s) {
        return '<span class="ml-src">' + esc(s) + "</span>";
      }).join("");
      html += '<article class="ml-point" id="p-' + p.id + '">' +
        '<header class="ml-point-head">' +
        '<span class="ml-point-n">' + (p.n < 10 ? "0" : "") + p.n + "</span>" +
        '<div><h3>' + esc(p.zh) + "</h3>" +
        '<p class="ml-point-en">' + esc(p.en) + "</p></div>" +
        badge(p.status) +
        "</header>" +
        '<dl class="ml-point-facts">' +
        "<div><dt>地址</dt><dd>" + esc(p.address) +
        (p.approx ? ' <span class="ml-approx">≈ 街道级坐标</span>' : "") + "</dd></div>" +
        "<div><dt>年份</dt><dd>" + esc(p.years || "—") + "</dd></div>" +
        "<div><dt>标识</dt><dd>" + roleLabel(p.plaque) + "</dd></div>" +
        "<div><dt>可看性</dt><dd>" + accessLabel(p.access) + "</dd></div>" +
        "</dl>" +
        '<p class="ml-point-note">' + esc(p.note) + "</p>" +
        (p.visit ? '<p class="ml-point-visit"><b>现在：</b>' + esc(p.visit) + "</p>" : "") +
        '<p class="ml-point-src">' + srcs + "</p>" +
        "</article>";
    });
    box.innerHTML = html;
  }

  /* ---------- 待核 ---------- */
  function renderTodo() {
    var box = document.getElementById("ml-todo");
    if (!box || !D.todo) return;
    box.innerHTML = D.todo.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  }

  /* ---------- 来源 ---------- */
  function renderSources() {
    var box = document.getElementById("ml-sources");
    if (!box) return;
    box.innerHTML = D.sources.map(function (s) {
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
        esc(s.label) + "</a></li>";
    }).join("");
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    renderLegend();
    renderAreas();
    renderPoints();
    renderTodo();
    renderSources();
    initMap();
  });
})();
