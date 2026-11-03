(function () {
  "use strict";
  var D = window.TRIPS || {};
  var flights = Array.isArray(D.flights) ? D.flights : [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function kmTotal(list) {
    return list.reduce(function (s, f) { return s + (Number(f.km) || 0); }, 0);
  }
  function yearOf(f) { return String(f.month || "").slice(0, 4) || "未编年"; }

  function renderStats() {
    var cities = {}, years = {};
    flights.forEach(function (f) {
      if (f.fromCode) cities[f.fromCode] = 1;
      if (f.toCode) cities[f.toCode] = 1;
      years[yearOf(f)] = 1;
    });
    document.getElementById("tp-flights").textContent = flights.length;
    document.getElementById("tp-km").textContent = fmt(kmTotal(flights));
    document.getElementById("tp-cities").textContent = Object.keys(cities).length;
    document.getElementById("tp-years").textContent = Object.keys(years).length;
  }

  function render() {
    var box = document.getElementById("tp-flight-list");
    var totalLine = document.getElementById("tp-total-line");
    if (!flights.length) {
      box.innerHTML = '<p class="tp-nothing">还没有飞行记录。</p>';
      totalLine.textContent = "";
      return;
    }

    var byYear = {};
    flights.slice().sort(function (a, b) {
      return String(b.month).localeCompare(String(a.month));
    }).forEach(function (f) {
      (byYear[yearOf(f)] = byYear[yearOf(f)] || []).push(f);
    });

    box.innerHTML = Object.keys(byYear).sort().reverse().map(function (y) {
      var list = byYear[y];
      var head = '<div class="tp-year"><span>' + esc(y) + '</span><em>' +
        list.length + ' 段 · ' + fmt(kmTotal(list)) + ' km</em></div>';
      var rows = list.map(function (f) {
        return '<div class="tp-flight-row">' +
          '<span class="tp-month">' + esc(String(f.month || "").slice(5)) + ' 月</span>' +
          '<span class="tp-flight-no">' + esc(f.flight || "") + '</span>' +
          '<span class="tp-route">' + esc(f.from || "") +
            ' <i>' + esc(f.fromCode || "") + '</i> <b>→</b> ' +
            esc(f.to || "") + ' <i>' + esc(f.toCode || "") + '</i></span>' +
          '<span class="tp-km">' + fmt(Number(f.km) || 0) + ' km</span>' +
        '</div>';
      }).join("");
      return head + rows;
    }).join("");

    totalLine.textContent = "合计 " + flights.length + " 段 · " + fmt(kmTotal(flights)) + " km";
  }

  renderStats();
  render();
})();
