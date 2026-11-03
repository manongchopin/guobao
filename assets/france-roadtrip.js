/* 法国自驾 · 世界遗产分区图 */
(function () {
  var D = window.FRANCE_WH;
  if (!D) return;

  var map = null;
  var layer = null;
  var active = "all";
  var colors = {};
  var counts = {};

  D.trips.forEach(function (t) {
    colors[t.id] = t.color;
    counts[t.id] = 0;
  });
  D.sites.forEach(function (s) {
    if (s.trip > 0) counts[s.trip] += 1;
  });

  function esc(v) {
    return String(v === undefined || v === null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function tripName(id) {
    for (var i = 0; i < D.trips.length; i++) {
      if (D.trips[i].id === id) return D.trips[i].name;
    }
    return "海外";
  }

  function popupHtml(s) {
    var head = s.trip > 0 ? "NO. " + s.no + " · 第 " + s.trip + " 次" : "NO. " + s.no + " · 海外";
    var body =
      '<div class="fr-pop">' +
      '<span class="fr-pop-no">' + esc(head) + "</span>" +
      "<b>" + esc(s.zh) + "</b>" +
      '<em>' + esc(s.en) + "</em>" +
      '<span class="fr-pop-meta">' + esc(s.type) + " · " + esc(s.year) + " · " + esc(s.region) + "</span>" +
      '<span class="fr-pop-meta">最近城市：' + esc(s.city) + "</span>" +
      (s.note ? '<span class="fr-pop-note">' + esc(s.note) + "</span>" : "") +
      "</div>";
    return body;
  }

  function initMap() {
    var el = document.getElementById("fr-map");
    if (!el || typeof L === "undefined") return;
    map = L.map(el, { scrollWheelZoom: false }).setView([46.7, 2.4], 5);
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
    D.sites.forEach(function (s) {
      if (s.trip <= 0) return;
      if (active !== "all" && s.trip !== active) return;
      var m = L.circleMarker([s.lat, s.lng], {
        radius: 6.5,
        color: "#fffdf7",
        weight: 1.6,
        fillColor: colors[s.trip],
        fillOpacity: 0.95
      }).addTo(layer);
      m.bindPopup(popupHtml(s), { maxWidth: 280 });
      m.bindTooltip(s.no + " · " + s.zh, { direction: "top", offset: [0, -4] });
      pts.push([s.lat, s.lng]);
    });
    if (pts.length && active !== "all") {
      map.fitBounds(pts, { padding: [40, 40], maxZoom: 8 });
    } else if (pts.length) {
      map.fitBounds(pts, { padding: [20, 20] });
    }
  }

  function renderLegend() {
    var box = document.getElementById("fr-legend");
    if (!box) return;
    var html = '<button type="button" class="fr-chip' + (active === "all" ? " on" : "") + '" data-trip="all">' +
      '<span class="fr-dot" style="background:#1d2622"></span>全部 ' + D.metropolitan + "</button>";
    D.trips.forEach(function (t) {
      html += '<button type="button" class="fr-chip' + (active === t.id ? " on" : "") + '" data-trip="' + t.id + '">' +
        '<span class="fr-dot" style="background:' + t.color + '"></span>' +
        "第 " + t.id + " 次 · " + esc(t.short || t.name) +
        '<b class="fr-chip-n">' + counts[t.id] + "</b></button>";
    });
    box.innerHTML = html;
    box.onclick = function (e) {
      var b = e.target.closest(".fr-chip");
      if (!b) return;
      var v = b.getAttribute("data-trip");
      active = v === "all" ? "all" : parseInt(v, 10);
      renderLegend();
      drawMarkers();
      highlightTrip();
    };
  }

  function renderTrips() {
    var box = document.getElementById("fr-trips");
    if (!box) return;
    var html = "";
    D.trips.forEach(function (t) {
      var list = "";
      D.sites.forEach(function (s) {
        if (s.trip !== t.id) return;
        list += "<li><span class=\"n\">" + s.no + "</span>" +
          "<span class=\"zh\">" + esc(s.zh) + "</span>" +
          "<span class=\"tag\">" + esc(s.year) + (s.approx ? " ≈" : "") + "</span></li>";
      });
      html += '<div class="fr-trip" data-trip="' + t.id + '" style="--c:' + t.color + '">' +
        '<p class="fr-trip-kicker">' + esc(t.kicker) + "</p>" +
        "<h3><span class=\"no\">" + t.id + "</span>" + esc(t.name) + "</h3>" +
        '<dl><dt>天数</dt><dd>' + esc(t.days) + "</dd>" +
        "<dt>季节</dt><dd>" + esc(t.season) + "</dd>" +
        "<dt>进出</dt><dd>" + esc(t.gateway) + "</dd>" +
        "<dt>项数</dt><dd>" + counts[t.id] + " 项</dd></dl>" +
        '<p class="fr-trip-focus">' + esc(t.focus) + "</p>" +
        '<ul class="fr-list">' + list + "</ul>" +
        '<p class="fr-trip-extra">' + esc(t.extra) + "</p>" +
        '<p class="fr-trip-note">' + esc(t.note) + "</p>" +
        "</div>";
    });
    box.innerHTML = html;
    box.onclick = function (e) {
      var card = e.target.closest(".fr-trip");
      if (!card) return;
      var id = parseInt(card.getAttribute("data-trip"), 10);
      active = active === id ? "all" : id;
      renderLegend();
      drawMarkers();
      highlightTrip();
      if (map) document.getElementById("fr-map").scrollIntoView({ behavior: "smooth", block: "center" });
    };
  }

  function highlightTrip() {
    var cards = document.querySelectorAll(".fr-trip");
    for (var i = 0; i < cards.length; i++) {
      var id = parseInt(cards[i].getAttribute("data-trip"), 10);
      cards[i].classList.toggle("on", active !== "all" && id === active);
    }
  }

  function renderTable() {
    var box = document.getElementById("fr-table-body");
    if (!box) return;
    var rows = "";
    D.sites.forEach(function (s) {
      var tripLabel = s.trip > 0 ? "第 " + s.trip + " 次" : "海外";
      rows += "<tr><td class=\"num\">" + s.no + "</td>" +
        "<td>" + esc(s.zh) + (s.approx ? ' <span class="approx">≈</span>' : "") + "</td>" +
        "<td class=\"dim\">" + esc(s.en) + "</td>" +
        "<td class=\"dim\">" + esc(s.type) + "</td>" +
        "<td class=\"num\">" + s.year + "</td>" +
        "<td class=\"dim\">" + esc(s.region) + "</td>" +
        "<td class=\"dim\">" + esc(s.city) + "</td>" +
        "<td class=\"num\">" + esc(tripLabel) + "</td></tr>";
    });
    box.innerHTML = rows;
  }

  function renderOverseas() {
    var box = document.getElementById("fr-overseas-body");
    if (!box) return;
    var rows = "";
    D.sites.forEach(function (s) {
      if (s.trip !== 0) return;
      rows += "<tr><td class=\"num\">" + s.no + "</td>" +
        "<td>" + esc(s.zh) + "</td>" +
        "<td class=\"dim\">" + esc(s.en) + "</td>" +
        "<td class=\"dim\">" + esc(s.type) + "</td>" +
        "<td class=\"num\">" + s.year + "</td>" +
        "<td class=\"dim\">" + esc(s.region) + "</td>" +
        "<td class=\"dim\">" + esc(s.note) + "</td></tr>";
    });
    box.innerHTML = rows;
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    renderLegend();
    renderTrips();
    renderTable();
    renderOverseas();
    initMap();
    highlightTrip();
  });
})();
