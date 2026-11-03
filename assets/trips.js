(function () {
  "use strict";
  var D = window.TRIPS || {};
  var flights = Array.isArray(D.flights) ? D.flights : [];
  var trains = Array.isArray(D.trains) ? D.trains : [];

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
    var years = {};
    flights.concat(trains).forEach(function (x) { years[yearOf(x)] = 1; });
    document.getElementById("tp-flights").textContent = flights.length;
    document.getElementById("tp-trains").textContent = trains.length;
    document.getElementById("tp-km").textContent = fmt(kmTotal(flights) + kmTotal(trains));
    document.getElementById("tp-years").textContent = Object.keys(years).length;
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

  renderStats();
  renderLog(flights, "tp-flight-list", "tp-total-line", "flight");
  renderLog(trains, "tp-train-list", "tp-train-total", "train");
})();
