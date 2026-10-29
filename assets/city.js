(function () {
  "use strict";

  var groups = window.YIWU_CITY || [];
  var districts = window.YIWU_CITY_DISTRICTS || [];

  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");

  var byDistrict = {};
  districts.forEach(function (d) { byDistrict[d] = []; });
  groups.forEach(function (g) {
    if (!byDistrict[g.district]) byDistrict[g.district] = [];
    byDistrict[g.district].push(g);
  });

  /* ---------- 镇街索引 ---------- */

  var total = groups.length;
  var idx = '<p class="ci-title">镇街索引</p>';
  idx += '<button type="button" class="ci-item is-active" data-d="all" aria-pressed="true">' +
    '<span>全部</span><b>' + total + '</b></button>';
  districts.forEach(function (d) {
    if (!byDistrict[d] || !byDistrict[d].length) return;
    idx += '<button type="button" class="ci-item" data-d="' + d + '" aria-pressed="false">' +
      '<span>' + d + '</span><b>' + byDistrict[d].length + '</b></button>';
  });
  indexEl.innerHTML = idx;

  /* ---------- 列表 ---------- */

  function pad(n) {
    var s = String(n);
    while (s.length < 3) s = "0" + s;
    return s;
  }

  function itemHTML(it) {
    return '<div class="mitem">' +
      '<span class="mi-name">' + it.name + '</span>' +
      '<span class="mi-meta">' + it.era + ' · ' + it.type + '</span>' +
      '<span class="mi-addr">' + it.addr + '</span>' +
    '</div>';
  }

  function groupHTML(g) {
    if (g.items.length === 1) {
      var it = g.items[0];
      return '<article class="entry">' +
        '<div class="entry-head">' +
          '<span class="entry-no">' + pad(g.no) + '</span>' +
          '<h3 class="entry-name">' + g.name + '</h3>' +
          '<span class="entry-meta">' + it.era + ' · ' + it.type + '</span>' +
        '</div>' +
        '<p class="entry-addr">' + it.addr + '</p>' +
      '</article>';
    }
    return '<article class="entry entry-group">' +
      '<div class="entry-head">' +
        '<span class="entry-no">' + pad(g.no) + '</span>' +
        '<h3 class="entry-name">' + g.name + '</h3>' +
        '<span class="entry-count">' + g.items.length + ' 项</span>' +
      '</div>' +
      '<div class="mitems">' + g.items.map(itemHTML).join("") + '</div>' +
    '</article>';
  }

  var html = "";
  districts.forEach(function (d, i) {
    var gs = byDistrict[d];
    if (!gs || !gs.length) return;
    html += '<section class="district-block" data-d="' + d + '" id="d' + i + '">' +
      '<div class="group-head">' +
        '<h2>' + d + '</h2>' +
        '<span class="count">' + gs.length + ' 处</span>' +
      '</div>' +
      '<div class="entries">' + gs.map(groupHTML).join("") + '</div>' +
    '</section>';
  });
  listEl.innerHTML = html;

  /* ---------- 交互 ---------- */

  indexEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".ci-item");
    if (!btn) return;
    var d = btn.getAttribute("data-d");

    Array.prototype.forEach.call(indexEl.querySelectorAll(".ci-item"), function (b) {
      var on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });

    Array.prototype.forEach.call(listEl.querySelectorAll(".district-block"), function (sec) {
      sec.hidden = d !== "all" && sec.getAttribute("data-d") !== d;
    });

    var y = listEl.getBoundingClientRect().top + window.scrollY - 18;
    window.scrollTo({ top: y, behavior: "smooth" });
  });
})();
