(function () {
  "use strict";
  var D = window.TRIPS || { trips: [] };
  var trips = Array.isArray(D.trips) ? D.trips : [];
  var modeIcon = { flight: "✈️", train: "🚆", drive: "🚗" };
  var current = "all";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function modesOf(t) { return Array.isArray(t.modes) ? t.modes : []; }
  function countMode(m) {
    var n = 0;
    trips.forEach(function (t) { (t.segments || []).forEach(function (s) { if (s.mode === m) n++; }); });
    return n;
  }
  function sorted() {
    return trips.slice().sort(function (a, b) {
      return String(b.start || "").localeCompare(String(a.start || ""));
    });
  }
  function renderStats() {
    document.getElementById("tp-total").textContent = trips.length;
    document.getElementById("tp-flight").textContent = countMode("flight");
    document.getElementById("tp-train").textContent = countMode("train");
    document.getElementById("tp-drive").textContent = countMode("drive");
  }
  function visible() {
    return sorted().filter(function (t) { return current === "all" || modesOf(t).indexOf(current) >= 0; });
  }
  function emptyState(empty, noneAtAll) {
    empty.hidden = false;
    empty.querySelector(".tp-empty-title").textContent = noneAtAll ? "还没有录入行程" : "这个筛选下没有行程";
    empty.querySelector(".tp-empty-sub").innerHTML = noneAtAll
      ? "这里按年份倒序归档，一条一行。<br>真实行程会在确认后逐条填进来。"
      : "换一个标签，或点「全部」看所有行程。";
  }
  function render() {
    var list = document.getElementById("tp-list");
    var empty = document.getElementById("tp-empty");
    var items = visible();
    document.getElementById("tp-count").textContent = items.length + " 条";
    list.innerHTML = "";
    if (!items.length) {
      emptyState(empty, !trips.length);
      return;
    }
    empty.hidden = true;
    var years = {};
    items.forEach(function (t) {
      var y = (t.start || "").slice(0, 4) || "未编年";
      (years[y] = years[y] || []).push(t);
    });
    list.innerHTML = Object.keys(years).sort().reverse().map(function (y) {
      return '<div class="tp-year">' + esc(y) + '</div>' + years[y].map(function (t) {
        var modes = modesOf(t).map(function (m) { return modeIcon[m] || m; }).join(" ");
        var date = esc(t.start || "") + (t.end && t.end !== t.start ? " — " + esc(t.end) : "");
        var meta = esc((t.countries || []).join(" · "));
        if (t.cities && t.cities.length) meta += (meta ? " · " : "") + esc(t.cities.join(" / "));
        return '<article class="tp-card"><div class="tp-card-date">' + date + '</div>' +
          '<div><h3>' + esc(t.title || "未命名行程") + '</h3><p>' + meta + '</p><p>' + esc(t.summary || "") + '</p></div>' +
          '<div class="tp-modes" title="交通方式">' + modes + '</div></article>';
      }).join("");
    }).join("");
  }
  document.getElementById("tp-filter").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-mode]");
    if (!b) return;
    current = b.getAttribute("data-mode");
    document.querySelectorAll("#tp-filter button").forEach(function (x) { x.classList.toggle("is-active", x === b); });
    render();
  });
  renderStats(); render();
})();
