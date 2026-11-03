(function () {
  "use strict";
  var D = window.TRIPS || {};
  var flights = Array.isArray(D.flights) ? D.flights : [];
  var trains = Array.isArray(D.trains) ? D.trains : [];
  var hikes = Array.isArray(D.hikes) ? D.hikes : [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function kmTotal(list) {
    return list.reduce(function (s, x) { return s + (Number(x.km) || 0); }, 0);
  }
  function yearOf(x) { return String(x.month || "").slice(0, 4) || "未编年"; }

  function renderStats() {
    var hikeKm = hikes.reduce(function (s, h) { return s + (Number(h.km) || 0); }, 0);
    document.getElementById("tp-flights").textContent = flights.length;
    document.getElementById("tp-trains").textContent = trains.length;
    document.getElementById("tp-hikes").textContent = hikes.length;
    document.getElementById("tp-km").textContent = fmt(Math.round(kmTotal(flights) + kmTotal(trains) + hikeKm));
  }

  function renderLog(list, boxId, totalId, kind) {
    var box = document.getElementById(boxId);
    var totalLine = document.getElementById(totalId);
    if (!list.length) {
      box.innerHTML = '<p class="tp-nothing">还没有' + (kind === "train" ? "铁路" : "飞行") + '记录。</p>';
      totalLine.textContent = "";
      return;
    }

    var byYear = {};
    list.slice().sort(function (a, b) {
      return String(b.month).localeCompare(String(a.month));
    }).forEach(function (x) {
      (byYear[yearOf(x)] = byYear[yearOf(x)] || []).push(x);
    });

    function keyOf(x) {
      return [x.month, x.flight || x.train, x.from, x.to].join("|");
    }
    var counts = {};
    list.forEach(function (x) { counts[keyOf(x)] = (counts[keyOf(x)] || 0) + 1; });
    var seen = {};
    var CIRC = "①②③④⑤⑥⑦⑧⑨⑩";

    box.innerHTML = Object.keys(byYear).sort().reverse().map(function (y) {
      var group = byYear[y];
      var head = '<div class="tp-year"><span>' + esc(y) + '</span><em>' +
        group.length + ' 段 · ' + fmt(kmTotal(group)) + ' km</em></div>';
      var rows = group.map(function (x) {
        var route;
        if (kind === "train") {
          route = esc(x.from || "") + ' <b>→</b> ' + esc(x.to || "");
        } else {
          route = esc(x.from || "") + ' <i>' + esc(x.fromCode || "") + '</i> <b>→</b> ' +
            esc(x.to || "") + ' <i>' + esc(x.toCode || "") + '</i>';
        }
        var k = keyOf(x);
        var n = (seen[k] = (seen[k] || 0) + 1);
        var mark = counts[k] > 1 ? '<i class="tp-seq">' + CIRC.charAt(n - 1) + '</i>' : '';
        return '<div class="tp-flight-row">' +
          '<span class="tp-month">' + esc(String(x.month || "").slice(5)) + ' 月' + mark + '</span>' +
          '<span class="tp-flight-no">' + esc(x.flight || x.train || "") + '</span>' +
          '<span class="tp-route">' + route + '</span>' +
          '<span class="tp-km">' + fmt(Number(x.km) || 0) + ' km</span>' +
        '</div>';
      }).join("");
      return head + rows;
    }).join("");

    totalLine.textContent = "合计 " + list.length + " 段 · " + fmt(kmTotal(list)) + " km";
  }

  function renderHikes() {
    var box = document.getElementById("tp-hike-list");
    if (!hikes.length) {
      box.innerHTML = '<p class="tp-nothing">还没有徒步记录。</p>';
      return;
    }
    box.innerHTML = hikes.map(function (h, i) {
      return '<article class="tp-hike">' +
        '<div class="tp-hike-head"><div>' +
          '<h3>' + esc(h.name || "未命名线路") + '</h3>' +
          '<p class="tp-hike-meta">' + esc(h.month || "") + ' · ' +
            (h.km != null ? h.km + ' km' : "") +
            (h.ascent != null ? ' · 爬升 ' + h.ascent + ' m' : "") +
            (h.high != null ? ' · 最高 ' + h.high + ' m' : "") +
          '</p>' +
        '</div><p class="tp-hike-points">' + (h.points || (h.path || []).length) + ' 点</p></div>' +
        '<div class="tp-hike-map" id="tp-hike-map-' + i + '"></div>' +
        '<p class="tp-map-note">轨迹为 GPS 记录抽稀，非实时；底图 © OpenStreetMap contributors。</p>' +
      '</article>';
    }).join("");

    hikes.forEach(function (h, i) {
      var el = document.getElementById("tp-hike-map-" + i);
      if (!el || !window.L || !h.path || h.path.length < 2) return;
      var map = L.map(el, { scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
      }).addTo(map);
      var line = L.polyline(h.path, {
        color: "#a8402f", weight: 3, opacity: 0.92, lineJoin: "round"
      }).addTo(map);
      L.circleMarker(h.path[0], {
        radius: 4, color: "#a8402f", weight: 2, fillColor: "#fffdf7", fillOpacity: 1
      }).addTo(map).bindTooltip("起终点");
      map.fitBounds(line.getBounds(), { padding: [20, 20] });
    });
  }

  renderStats();
  renderLog(flights, "tp-flight-list", "tp-total-line", "flight");
  renderLog(trains, "tp-train-list", "tp-train-total", "train");
  renderHikes();
})();
