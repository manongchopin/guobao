(function () {
  "use strict";

  var slug = window.JC_COUNTY;
  var items = (window.JINCHENG_PLACES || {})[slug] || [];
  var batches = window.BATCHES || [];
  var listEl = document.getElementById("list");
  var toolbarInner = document.querySelector(".toolbar-inner");
  var walkEl = document.createElement("span");
  walkEl.className = "walk-count";
  walkEl.id = "walk-count";
  if (toolbarInner) toolbarInner.appendChild(walkEl);

  function batchOf(n) {
    for (var i = 0; i < batches.length; i++) if (batches[i].n === n) return batches[i];
    return { n: n, label: "第" + n + "批", year: "" };
  }

  function updateWalk() {
    var got = items.filter(function (it) { return window.Visited && Visited.has(it.id); }).length;
    walkEl.innerHTML = "已走 <b>" + got + "</b>/" + items.length;
  }

  function row(it) {
    var v = !!(window.Visited && Visited.has(it.id));
    var href = "place.html?set=" + slug + "&id=" + encodeURIComponent(it.id);
    return '<div class="sh-row' + (v ? " is-visited" : "") + '">' +
      '<span class="sh-n">' + it.name + '</span>' +
      '<span class="sh-a">' + it.type + '</span>' +
      '<span class="sh-b">' + (it.era || "—") + '</span>' +
      '<button type="button" class="visit-btn sh-visit" data-id="' + it.id + '" aria-pressed="' + v + '" title="标记为已去过">' +
        (v ? "✓" : "＋") +
      '</button>' +
      '<a class="sh-hit" href="' + href + '" aria-label="' + it.name + '"></a>' +
    '</div>';
  }

  function table(list) {
    return '<div class="sh-table no-batch no-status" role="table">' +
      '<div class="sh-row sh-head" role="row">' +
        '<span class="sh-n">名称</span><span class="sh-a">类型</span><span class="sh-b">时代</span><span class="sh-v"></span>' +
      '</div>' +
      list.map(row).join("") +
    '</div>';
  }

  var html = "";
  batches.forEach(function (b) {
    var list = items.filter(function (it) { return it.batch === b.n; })
      .sort(function (a, b2) { return a.order - b2.order; });
    if (!list.length) return;
    html += '<section class="group">' +
      '<div class="group-head"><h2>' + b.label + '</h2>' +
        (b.year ? '<span class="year">' + b.year + '</span>' : '') +
        '<span class="count">' + list.length + ' 处</span></div>' +
      table(list) +
    '</section>';
  });
  listEl.innerHTML = html;
  updateWalk();

  listEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".sh-visit");
    if (!btn) return;
    if (!window.Visited) return;
    var on = Visited.toggle(btn.getAttribute("data-id"));
    var row = btn.closest(".sh-row");
    if (row) row.classList.toggle("is-visited", on);
    btn.textContent = on ? "✓" : "＋";
    btn.setAttribute("aria-pressed", String(on));
    updateWalk();
  });
})();
