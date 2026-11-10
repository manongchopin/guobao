/* 圣地巡礼 v0.3 · 作品页
   依赖：seichi-junrei-data.js（window.SEICHI）、Leaflet（地图）
   页面用 <body data-work="byousoku|slamdunk|kimi"> 指定作品。
*/
(function () {
  "use strict";

  var D = window.SEICHI;
  if (!D) return;

  var workId = document.body.getAttribute("data-work");
  var W = D.works.filter(function (x) { return x.id === workId; })[0];
  if (!W) return;

  var CAT = {};
  D.categories.forEach(function (c) { CAT[c.id] = c; });
  var spots = D.spots.filter(function (s) { return s.work === workId; });
  var pending = D.pending.filter(function (p) { return p.work === workId || p.work === "all"; });
  var sources = D.sources.filter(function (s) {
    return !s.works || s.works.indexOf(workId) >= 0 || s.works.indexOf("all") >= 0;
  });

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function loc(s) {
    var c = s.country && s.country !== "JP" ? ((D.countries && D.countries[s.country]) || s.country) + " · " : "";
    return c + s.pref + s.city;
  }
  function catBadge(id) {
    var c = CAT[id];
    return '<span class="sj-badge sj-badge--' + id + '">' + esc(c.short) + "</span>";
  }
  function srcLinks(list) {
    if (!list || !list.length) return "";
    return '<span class="sj-card-src">来源：' + list.map(function (s) {
      return '<a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + "</a>";
    }).join(" · ") + "</span>";
  }

  /* ---------- 概览 ---------- */
  function renderStats() {
    var confirmed = spots.filter(function (s) { return s.cat === "confirmed"; }).length;
    var fan = spots.filter(function (s) { return s.cat === "fan"; }).length;
    var mood = spots.filter(function (s) { return s.cat === "mood"; }).length;
    $("sj-stats").innerHTML = [
      { n: spots.length, l: "点位" },
      { n: confirmed, l: "已确认" },
      { n: fan, l: "粉丝公认" },
      { n: mood, l: "氛围相似" },
      { n: pending.length, l: "待核项" }
    ].map(function (x) {
      return '<div class="sj-stat"><b>' + esc(x.n) + "</b><span>" + esc(x.l) + "</span></div>";
    }).join("");
  }

  function renderWork() {
    $("sj-summary").textContent = W.summary;
    $("sj-travel").innerHTML = W.travel.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    $("sj-etiquette").innerHTML = W.etiquette.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    var v = $("sj-version");
    if (v) v.textContent = "v" + D.version;
    var u = $("sj-updated");
    if (u) u.textContent = D.updated;
    var n = $("sj-work-count");
    if (n) n.textContent = spots.length + " 点";
  }

  /* ---------- 地图 ---------- */
  var map = null, layer = null, markers = {};

  function pinIcon(s) {
    return L.divIcon({
      className: "sj-pin-wrap",
      html: '<span class="sj-pin' + (s.approx ? " is-approx" : "") + '" style="--pin:' + W.color + '">' + esc(s.no) + "</span>",
      iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12]
    });
  }

  function popup(s) {
    return '<div class="sj-pop">' +
      '<p class="sj-pop-kicker">' + esc(W.no + " · " + W.title) + "</p>" +
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
    markers = {};
    var bounds = [];
    spots.forEach(function (s) {
      var m = L.marker([s.lat, s.lng], { icon: pinIcon(s), title: s.name }).addTo(layer);
      m.bindPopup(popup(s), { maxWidth: 300 });
      markers[s.id] = m;
      bounds.push([s.lat, s.lng]);
    });
    if (bounds.length) map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 13 });
    $("sj-map-legend").innerHTML =
      '<span><i class="sj-dot" style="background:' + W.color + '"></i>本作点位</span>' +
      "<span>实线圆点 = 已核对；虚线圆点 = ≈ 约值</span>";
    $("sj-map-count").textContent = spots.length + " 点";
  }

  function initMap() {
    var el = $("sj-map");
    if (!el) return;
    if (!window.L) {
      el.innerHTML = '<p class="sj-map-fallback">地图加载失败（Leaflet 未加载）。下方表格仍可读；联网后刷新重试。</p>';
      return;
    }
    map = L.map(el, { scrollWheelZoom: false, zoomControl: true });
    GB_BASEMAP(map);
    layer = L.layerGroup().addTo(map);
    map.setView([35.4, 136.2], 5);
    renderMap();
  }

  /* ---------- 对照表 ---------- */
  var tableCat = "all";
  function renderTable() {
    var rows = spots.filter(function (s) { return tableCat === "all" || s.cat === tableCat; });
    $("sj-table-count").textContent = rows.length + " 条";
    $("sj-table-body").innerHTML = rows.map(function (s) {
      return '<tr id="row-' + esc(s.id) + '">' +
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
    $("sj-table-cat").innerHTML = [{ id: "all", label: "全部核实等级" }].concat(D.categories.map(function (c) {
      return { id: c.id, label: c.short };
    })).map(function (c) {
      return '<button type="button" data-cat="' + c.id + '"' + (c.id === "all" ? ' class="is-active"' : "") + ">" + esc(c.label) + "</button>";
    }).join("");
    $("sj-table-cat").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-cat]");
      if (!b) return;
      tableCat = b.getAttribute("data-cat");
      Array.prototype.forEach.call(this.querySelectorAll("button"), function (x) { x.classList.toggle("is-active", x === b); });
      renderTable();
    });
    renderTable();
  }

  /* ---------- 点位卡 ---------- */
  function card(s) {
    return '<article class="sj-card" id="spot-' + esc(s.id) + '" style="--work:' + W.color + '">' +
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

  function renderCards() {
    $("sj-cards").innerHTML = spots.map(card).join("");
    $("sj-cards").addEventListener("click", function (e) {
      var b = e.target.closest(".sj-fly");
      if (!b || !map) return;
      var s = spots.filter(function (x) { return x.id === b.getAttribute("data-fly"); })[0];
      if (!s) return;
      map.flyTo([s.lat, s.lng], 14, { duration: 0.6 });
      markers[s.id] && markers[s.id].openPopup();
      $("sj-map").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- 待核与来源 ---------- */
  function renderPending() {
    $("sj-pending").innerHTML = pending.map(function (p, i) {
      return "<li><span>" + (i + 1) + "</span>" + esc(p.text) + "</li>";
    }).join("");
  }
  function renderSources() {
    $("sj-sources").innerHTML = sources.map(function (s) {
      return '<li><a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + "</a></li>";
    }).join("");
  }

  function init() {
    renderStats();
    renderWork();
    initMap();
    initTable();
    renderCards();
    renderPending();
    renderSources();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
