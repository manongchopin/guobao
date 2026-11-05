(function () {
  "use strict";
  var D = window.TRIPS || {};
  var flights = Array.isArray(D.flights) ? D.flights : [];

  var state = { year: "all", q: "" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function kmTotal(list) { return list.reduce(function (s, f) { return s + (Number(f.km) || 0); }, 0); }
  function yearOf(f) { return String(f.month || "").slice(0, 4); }

  function years() {
    var set = {};
    flights.forEach(function (f) { set[yearOf(f)] = 1; });
    return Object.keys(set).sort().reverse();
  }

  function byYear(list) {
    return list.filter(function (f) { return state.year === "all" || yearOf(f) === state.year; });
  }

  function sorted(list) {
    return list.slice().sort(function (a, b) {
      return String(b.month).localeCompare(String(a.month)) || String(a.flight).localeCompare(String(b.flight));
    });
  }

  function row(f, full) {
    var m = full ? esc(f.month || "") : esc(String(f.month || "").slice(5)) + ' 月';
    return '<div class="tp-flight-row">' +
      '<span class="tp-month">' + m + '</span>' +
      '<span class="tp-flight-no">' + esc(f.flight || "") + '</span>' +
      '<span class="tp-route">' + esc(f.from || "") + ' <i>' + esc(f.fromCode || "") + '</i> <b>→</b> ' +
        esc(f.to || "") + ' <i>' + esc(f.toCode || "") + '</i></span>' +
      '<span class="tp-km">' + fmt(Number(f.km) || 0) + ' km</span>' +
    '</div>';
  }

  function renderStats() {
    var airports = {};
    flights.forEach(function (f) {
      if (f.fromCode) airports[f.fromCode] = 1;
      if (f.toCode) airports[f.toCode] = 1;
    });
    var ys = years();
    document.getElementById("lg-count").textContent = flights.length;
    document.getElementById("lg-km").textContent = fmt(kmTotal(flights));
    document.getElementById("lg-airports").textContent = Object.keys(airports).length;
    document.getElementById("lg-span").textContent = ys.length ? ys[ys.length - 1] + "–" + ys[0] : "—";
  }

  function renderYears() {
    var box = document.getElementById("lg-years");
    var items = [{ y: "all", label: "全部" }].concat(years().map(function (y) { return { y: y, label: y }; }));
    box.innerHTML = items.map(function (it) {
      var active = it.y === state.year ? ' class="is-active"' : "";
      return '<button type="button" data-year="' + it.y + '"' + active + '>' + it.label + '</button>';
    }).join("");
    box.onclick = function (e) {
      var b = e.target.closest("button[data-year]");
      if (!b) return;
      state.year = b.getAttribute("data-year");
      renderYears(); render();
    };
  }

  function caption(list) {
    return (state.year === "all" ? "全部 " : state.year + " 年 · ") + list.length + " 段 · " + fmt(kmTotal(list)) + " km";
  }

  function match(f, side, q) {
    var name = side === "from" ? f.from : f.to;
    var code = side === "from" ? f.fromCode : f.toCode;
    return ((name || "") + " " + (code || "")).toLowerCase().indexOf(q) >= 0;
  }

  function render() {
    var all = byYear(flights);
    var q = state.q.trim().toLowerCase();
    var summary = document.getElementById("lg-summary");
    var boxAll = document.getElementById("lg-all");
    var boxSplit = document.getElementById("lg-split");
    boxAll.innerHTML = ""; boxSplit.innerHTML = "";

    if (!q) {
      summary.textContent = caption(all);
      var by = {};
      sorted(all).forEach(function (f) { (by[yearOf(f)] = by[yearOf(f)] || []).push(f); });
      boxAll.innerHTML = Object.keys(by).sort().reverse().map(function (y) {
        var group = by[y];
        return '<div class="tp-year"><span>' + esc(y) + '</span><em>' +
          group.length + ' 段 · ' + fmt(kmTotal(group)) + ' km</em></div>' + group.map(function (f) { return row(f, false); }).join("");
      }).join("");
      return;
    }

    var outs = sorted(all.filter(function (f) { return match(f, "from", q); }));
    var ins = sorted(all.filter(function (f) { return match(f, "to", q); }));
    summary.textContent = "搜索「" + state.q.trim() + "」：出港 " + outs.length + " 段 · 进港 " + ins.length + " 段";

    boxSplit.innerHTML =
      '<div class="lg-block"><h3 class="lg-block-title">出港 · ' + outs.length + ' 段</h3>' +
        (outs.length ? '<div class="tp-flights-head"><span>月份</span><span>航班</span><span>航线</span><span class="tp-km">距离</span></div>' + outs.map(function (f) { return row(f, true); }).join("") : '<p class="lg-empty">没有从匹配机场出发的记录。</p>') +
      '</div>' +
      '<div class="lg-block"><h3 class="lg-block-title">进港 · ' + ins.length + ' 段</h3>' +
        (ins.length ? '<div class="tp-flights-head"><span>月份</span><span>航班</span><span>航线</span><span class="tp-km">距离</span></div>' + ins.map(function (f) { return row(f, true); }).join("") : '<p class="lg-empty">没有到达匹配机场的记录。</p>') +
      '</div>';
  }

  var params = new URLSearchParams(location.search);
  if (params.get("q")) {
    state.q = params.get("q");
    document.getElementById("lg-search").value = state.q;
  }
  if (params.get("year")) state.year = params.get("year");

  document.getElementById("lg-search").addEventListener("input", function () {
    state.q = this.value;
    render();
  });

  renderStats();
  renderYears();
  render();
})();
