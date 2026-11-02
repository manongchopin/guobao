(function () {
  "use strict";

  var DATA = window.JAPAN_PLACES;
  if (!DATA || !DATA.entries) return;

  var grid = document.getElementById("jp-grid");
  var select = document.getElementById("jp-filter");
  var count = document.getElementById("jp-count");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var tags = [];
  DATA.entries.forEach(function (e) {
    (e.tags || []).forEach(function (t) { if (tags.indexOf(t) < 0) tags.push(t); });
  });
  tags.forEach(function (t) {
    var o = document.createElement("option");
    o.value = t; o.textContent = t; select.appendChild(o);
  });

  function card(entry) {
    var meta = (entry.meta || []).map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("");
    return '<a class="jp-card" href="' + esc(entry.href) + '">' +
      '<div class="jp-card-top"><span class="jp-no">' + esc(entry.kicker) + '</span><span class="jp-status">' + esc(entry.status) + '</span></div>' +
      '<div class="jp-card-body"><h3>' + esc(entry.title) + '</h3>' +
      (entry.subtitle ? '<p class="jp-sub">' + esc(entry.subtitle) + '</p>' : "") +
      '<p class="jp-summary">' + esc(entry.summary) + '</p>' +
      '<div class="jp-meta">' + meta + '</div></div>' +
      '<span class="jp-arrow">打开条目 ↗</span></a>';
  }

  function draw() {
    var tag = select.value;
    var list = DATA.entries.filter(function (e) {
      return tag === "全部" || (e.tags || []).indexOf(tag) >= 0;
    });
    count.textContent = list.length + " / " + DATA.entries.length + " 条";
    grid.innerHTML = list.map(card).join("");
  }

  select.addEventListener("change", draw);
  draw();
})();
