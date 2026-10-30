(function () {
  "use strict";

  var id = window.WH_REGION_ID;
  var region = null;
  (window.WH_REGIONS || []).forEach(function (r) { if (r.id === id) region = r; });
  if (!region) return;

  var countries = region.countries || [];
  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");
  var noteEl = document.getElementById("whr-note");
  var toolbarNote = document.querySelector(".toolbar-note");
  var filter = "all";
  var DETAIL = { "日本北部的绳纹史前遗址群": "jomon.html" };

  var listed = 0;
  countries.forEach(function (c) { listed += c.items.length; });

  function typeClass(t) {
    return t === "文化" ? "t-culture" : t === "自然" ? "t-nature" : "t-mixed";
  }

  function renderIndex() {
    var html = '<p class="ci-title">国家索引</p>' +
      '<button type="button" class="ci-item' + (filter === "all" ? " is-active" : "") +
      '" data-d="all" aria-pressed="' + (filter === "all") + '"><span>全部</span><b>' + listed + '</b></button>';
    countries.forEach(function (c) {
      html += '<button type="button" class="ci-item' + (filter === c.name ? " is-active" : "") +
        '" data-d="' + c.name + '" aria-pressed="' + (filter === c.name) + '"><span>' + c.name + '</span><b>' + c.items.length + '</b></button>';
    });
    indexEl.innerHTML = html;
  }

  function table() {
    return '<div class="whr-head"><span class="whr-n">名称</span><span class="whr-t">类型</span><span class="whr-y">年份</span></div>';
  }

  function render() {
    var show = filter === "all" ? countries : countries.filter(function (c) { return c.name === filter; });
    var html = table();
    show.forEach(function (c) {
      html += '<section class="district-block"><div class="group-head"><h2>' + c.name + '</h2><span class="count">' + c.items.length + ' 项</span></div>';
      html += '<div class="whr-table">';
      c.items.slice().sort(function (a, b) { return a.year - b.year || a.name.localeCompare(b.name, "zh"); }).forEach(function (it) {
        html += '<div class="whr-row">' +
          '<span class="whr-n">' + (DETAIL[it.name] ? '<a class="whr-link" href="' + DETAIL[it.name] + '">' + it.name + '</a>' : it.name) + '</span>' +
          '<span class="whr-t ' + typeClass(it.type) + '">' + it.type + '</span>' +
          '<span class="whr-y">' + it.year + '</span>' +
        '</div>';
      });
      html += '</div></section>';
    });
    listEl.innerHTML = html;
    if (toolbarNote) toolbarNote.textContent = (filter === "all" ? region.countryCount + " 国" : filter) + " · " + listed + " 条";
    var off = ((window.WH_OFFICIAL || {}).regions || {})[region.id];
    var offTotal = off ? off.total : region.unique;
    noteEl.textContent = "UNESCO 名录 " + offTotal + " 项；站内已列 " + region.unique + " 项（" + listed + " 条，含跨境重复），各国内按入选年份排列。";
  }

  indexEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".ci-item");
    if (!btn) return;
    filter = btn.getAttribute("data-d");
    renderIndex();
    render();
    var y = listEl.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: y, behavior: "smooth" });
  });

  renderIndex();
  render();
})();
