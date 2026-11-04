/* 圣地巡礼 v0.2 · 渲染
   依赖：seichi-junrei-data.js（window.SEICHI）、Leaflet（可选）
*/
(function () {
  "use strict";

  var D = window.SEICHI;
  if (!D) return;

  var CAT = {};
  D.categories.forEach(function (c) { CAT[c.id] = c; });
  var WORK = {};
  D.works.forEach(function (w) { WORK[w.id] = w; });

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function byWork(id) { return D.spots.filter(function (s) { return s.work === id; }); }
  function catBadge(id) {
    var c = CAT[id];
    return '<span class="sj-badge sj-badge--' + id + '">' + esc(c.short) + "</span>";
  }
  function loc(s) {
    var c = s.country && s.country !== "JP" ? ((D.countries && D.countries[s.country]) || s.country) + " · " : "";
    return c + s.pref + s.city;
  }
  function srcLinks(list) {
    if (!list || !list.length) return "";
    return '<span class="sj-card-src">来源：' + list.map(function (s) {
      return '<a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + "</a>";
    }).join(" · ") + "</span>";
  }

  /* ---------- 概览 ---------- */
  function renderStats() {
    var n = D.spots.length;
    var confirmed = D.spots.filter(function (s) { return s.cat === "confirmed"; }).length;
    var fan = D.spots.filter(function (s) { return s.cat === "fan"; }).length;
    var mood = D.spots.filter(function (s) { return s.cat === "mood"; }).length;
    $("sj-stats").innerHTML = [
      { n: "3", l: "作品" },
      { n: n, l: "点位" },
      { n: confirmed, l: "已确认" },
      { n: fan + mood, l: "原型 / 氛围" },
      { n: D.pending.length, l: "待核项" }
    ].map(function (x) {
      return '<div class="sj-stat"><b>' + esc(x.n) + "</b><span>" + esc(x.l) + "</span></div>";
    }).join("");
  }

  /* ---------- 三条横栏 ---------- */
  function renderBands() {
    $("sj-works").innerHTML = D.works.map(function (w, i) {
      var spots = byWork(w.id);
      return '<a class="sj-band" href="#work-' + (i + 1) + '" style="--work:' + w.color + '">' +
        '<span class="sj-no">' + esc(w.no) + "</span>" +
        '<span class="sj-band-main">' +
          '<span class="sj-band-kicker">' + esc(w.en) + "</span>" +
          '<span class="sj-band-title">' + esc(w.title) + "</span>" +
          '<span class="sj-band-desc">' + esc(w.short) + "</span>" +
        "</span>" +
        '<span class="sj-band-side">' + esc(w.direction) + "<br>" + esc(w.shape) + " · " + spots.length + " 点</span>" +
        '<span class="sj-band-arrow">→</span>' +
      "</a>";
    }).join("");
  }

  /* ---------- 地图 ---------- */
  var map = null, layer = null, markers = {}, mapFilter = "all";
  var colors = { byousoku: "#a8402f", slamdunk: "#2f5d50", kimi: "#557486" };

  function pinIcon(s) {
    var w = WORK[s.work];
    var approx = s.approx ? " is-approx" : "";
    return L.divIcon({
      className: "sj-pin-wrap",
      html: '<span class="sj-pin' + approx + '" style="--pin:' + w.color + '">' + esc(s.no) + "</span>",
      iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12]
    });
  }

  function popup(s) {
    var w = WORK[s.work];
    return '<div class="sj-pop">' +
      '<p class="sj-pop-kicker">' + esc(w.no + " · " + w.title) + "</p>" +
      "<b>" + esc(s.name) + "</b>" +
      '<p class="sj-pop-ja">' + esc(s.ja) + "</p>" +
      "<p>" + catBadge(s.cat) + (s.approx ? ' <span class="sj-approx">≈ 坐标约值</span>' : "") + "</p>" +
      "<p>" + esc(s.sceneShort) + "</p>" +
      '<p class="sj-pop-meta">' + esc(s.access) + "</p>" +
      '<a class="sj-pop-link" href="#spot-' + esc(s.id) + '">看条目 →</a>' +
    "</div>";
  }

  function renderMap() {
    if (!map || !layer) return;
    layer.clearLayers();
    var pts = mapFilter === "all" ? D.spots : byWork(mapFilter);
    var bounds = [];
    pts.forEach(function (s) {
      var m = L.marker([s.lat, s.lng], { icon: pinIcon(s), title: s.name }).addTo(layer);
      m.bindPopup(popup(s), { maxWidth: 300 });
      markers[s.id] = m;
      bounds.push([s.lat, s.lng]);
    });
    if (bounds.length) map.fitBounds(L.latLngBounds(bounds), { padding: [36, 36], maxZoom: mapFilter === "all" ? 6 : 12 });
    $("sj-map-count").textContent = pts.length + " 点";
  }

  function initMap() {
    var el = $("sj-map");
    if (!el) return;
    if (!window.L) {
      el.innerHTML = '<p class="sj-map-fallback">地图加载失败（Leaflet 未加载）。下方表格仍可读；联网后刷新重试。</p>';
      return;
    }
    map = L.map(el, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
    layer = L.layerGroup().addTo(map);
    map.setView([35.4, 136.2], 5);

    var chips = [{ id: "all", label: "全部" }].concat(D.works.map(function (w) {
      return { id: w.id, label: w.no + " · " + w.title };
    }));
    $("sj-map-filter").innerHTML = chips.map(function (c) {
      return '<button type="button" data-map="' + c.id + '"' + (c.id === "all" ? ' class="is-active"' : "") + ">" + esc(c.label) + "</button>";
    }).join("");
    $("sj-map-filter").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-map]");
      if (!b) return;
      mapFilter = b.getAttribute("data-map");
      Array.prototype.forEach.call(this.querySelectorAll("button"), function (x) {
        x.classList.toggle("is-active", x === b);
      });
      renderMap();
    });
    renderMap();
  }

  /* ---------- 对照表 ---------- */
  var tableWork = "all", tableCat = "all";
  function renderTable() {
    var rows = D.spots.filter(function (s) {
      return (tableWork === "all" || s.work === tableWork) && (tableCat === "all" || s.cat === tableCat);
    });
    $("sj-table-count").textContent = rows.length + " 条";
    $("sj-table-body").innerHTML = rows.map(function (s) {
      var w = WORK[s.work];
      return "<tr id=\"row-" + esc(s.id) + "\">" +
        '<td><span class="sj-work-dot" style="--work:' + w.color + '"></span>' + esc(w.title) + "</td>" +
        "<td>" + esc(s.sceneShort) + "</td>" +
        '<td><b>' + esc(s.name) + "</b><br><span class=\"sj-ja\">" + esc(s.ja) + "</span>" +
          (s.approx ? ' <span class="sj-approx">≈</span>' : "") + "</td>" +
        "<td>" + catBadge(s.cat) + "</td>" +
        "<td>" + esc(s.access) + "</td>" +
        "<td>" + esc(s.hours) + "</td>" +
      "</tr>";
    }).join("");
  }

  function initTable() {
    var wchips = [{ id: "all", label: "全部作品" }].concat(D.works.map(function (w) {
      return { id: w.id, label: w.no + " · " + w.title };
    }));
    $("sj-table-work").innerHTML = wchips.map(function (c) {
      return '<button type="button" data-work="' + c.id + '"' + (c.id === "all" ? ' class="is-active"' : "") + ">" + esc(c.label) + "</button>";
    }).join("");
    $("sj-table-cat").innerHTML = [{ id: "all", label: "全部核实等级" }].concat(D.categories.map(function (c) {
      return { id: c.id, label: c.short };
    })).map(function (c) {
      return '<button type="button" data-cat="' + c.id + '"' + (c.id === "all" ? ' class="is-active"' : "") + ">" + esc(c.label) + "</button>";
    }).join("");

    $("sj-table-work").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-work]");
      if (!b) return;
      tableWork = b.getAttribute("data-work");
      Array.prototype.forEach.call(this.querySelectorAll("button"), function (x) { x.classList.toggle("is-active", x === b); });
      renderTable();
    });
    $("sj-table-cat").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-cat]");
      if (!b) return;
      tableCat = b.getAttribute("data-cat");
      Array.prototype.forEach.call(this.querySelectorAll("button"), function (x) { x.classList.toggle("is-active", x === b); });
      renderTable();
    });
    renderTable();
  }

  /* ---------- 作品逐条 ---------- */
  function card(s) {
    var w = WORK[s.work];
    return '<article class="sj-card" id="spot-' + esc(s.id) + '" style="--work:' + w.color + '">' +
      '<div class="sj-card-head">' +
        '<span class="sj-card-no">' + esc(s.no) + "</span>" +
        "<div><h3>" + esc(s.name) + "</h3>" +
        '<p class="sj-ja">' + esc(s.ja) + " · " + esc(loc(s)) + "</p></div>" +
        "<div>" + catBadge(s.cat) + "</div>" +
      "</div>" +
      '<p class="sj-card-scene">' + esc(s.scene) + "</p>" +
      '<dl class="sj-card-meta">' +
        "<div><dt>怎么去</dt><dd>" + esc(s.access) + "</dd></div>" +
        "<div><dt>时间 / 限制</dt><dd>" + esc(s.hours) + "</dd></div>" +
        "<div><dt>拍摄对比（文字）</dt><dd>" + esc(s.photo) + "</dd></div>" +
        "<div><dt>注意</dt><dd>" + esc(s.note) + "</dd></div>" +
      "</dl>" +
      '<div class="sj-card-foot">' +
        '<button type="button" class="sj-fly" data-fly="' + esc(s.id) + '">地图上定位</button>' +
        srcLinks(s.src) +
      "</div>" +
    "</article>";
  }

  function renderWorks() {
    $("sj-work-sections").innerHTML = D.works.map(function (w, i) {
      var spots = byWork(w.id);
      return '<section class="wh-section" id="work-' + (i + 1) + '">' +
        '<div class="sj-head">' +
          "<div>" +
            '<p class="sj-kicker">' + esc(w.en) + "</p>" +
            "<h2>" + esc(w.no + " " + w.title) + "</h2>" +
          "</div>" +
          "<p>" + esc(w.days) + "<br>" + esc(w.direction) + " · " + spots.length + " 点</p>" +
        "</div>" +
        '<p class="sj-work-summary">' + esc(w.summary) + "</p>" +
        '<div class="sj-work-grid">' +
          "<div>" +
            '<h3 class="sj-sub">进出交通</h3>' +
            '<ul class="sj-list">' + w.travel.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
          "</div>" +
          "<div>" +
            '<h3 class="sj-sub">礼仪 / 风险</h3>' +
            '<ul class="sj-list sj-list--warn">' + w.etiquette.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
          "</div>" +
        "</div>" +
        '<div class="sj-cards">' + spots.map(card).join("") + "</div>" +
        '<div class="sj-note-box"><b>本线待核：</b>' + w.cautions.map(esc).join("；") + "。</div>" +
      "</section>";
    }).join("");

    $("sj-work-sections").addEventListener("click", function (e) {
      var b = e.target.closest(".sj-fly");
      if (!b) return;
      var s = D.spots.filter(function (x) { return x.id === b.getAttribute("data-fly"); })[0];
      if (!s || !map) return;
      mapFilter = s.work;
      Array.prototype.forEach.call(document.querySelectorAll("#sj-map-filter button"), function (x) {
        x.classList.toggle("is-active", x.getAttribute("data-map") === s.work);
      });
      renderMap();
      map.flyTo([s.lat, s.lng], 14, { duration: 0.6 });
      markers[s.id] && markers[s.id].openPopup();
      $("sj-map").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- 待核与来源 ---------- */
  function renderPending() {
    $("sj-pending").innerHTML = D.pending.map(function (t, i) {
      return "<li><span>" + (i + 1) + "</span>" + esc(t) + "</li>";
    }).join("");
  }
  function renderSources() {
    $("sj-sources").innerHTML = D.sources.map(function (s) {
      return '<li><a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + "</a></li>";
    }).join("");
  }

  function init() {
    renderStats();
    renderBands();
    initMap();
    initTable();
    renderWorks();
    renderPending();
    renderSources();
    $("sj-version").textContent = "v" + D.version;
    $("sj-updated").textContent = D.updated;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
