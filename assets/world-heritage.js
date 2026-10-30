(function () {
  "use strict";

  var regions = window.WH_REGIONS || [];
  var listEl = document.getElementById("list");
  var off = window.WH_OFFICIAL || {};
  var total = off.total || 0, countries = off.countries || 0;
  var cult = off.cultural || 0, nat = off.natural || 0, mix = off.mixed || 0;

  var t = document.getElementById("wh-total");
  if (t) t.textContent = total.toLocaleString("en-US");
  var c = document.getElementById("wh-countries");
  if (c) c.textContent = countries;
  var n = document.getElementById("wh-num");
  if (n) n.textContent = total.toLocaleString("en-US");
  var note = document.querySelector(".hub-progress .hp-note");
  if (note) note.textContent = "五大区域 · " + countries + " 个国家";

  var head = ["区域", "文化", "自然", "复合", "合计", "占比", "国家"];
  var html = '<div class="wr-table" role="table">' +
    '<div class="wr-row wr-head" role="row">' +
      head.map(function (h, i) {
        return '<span class="wr-' + ["n", "c", "a", "m", "t", "p", "k"][i] + '">' + h + '</span>';
      }).join("") +
      '<span class="wr-arrow"></span>' +
    '</div>';

  regions.forEach(function (r) {
    var o = (off.regions || {})[r.id] || { total: r.unique, cultural: r.cultural, natural: r.natural, mixed: r.mixed, countries: r.countryCount, pct: "—" };
    html += '<a class="wr-row" href="wh-' + r.id + '.html">' +
      '<span class="wr-n">' + r.name + '<em>' + r.en + '</em></span>' +
      '<span class="wr-c">' + o.cultural + '</span>' +
      '<span class="wr-a">' + o.natural + '</span>' +
      '<span class="wr-m">' + o.mixed + '</span>' +
      '<span class="wr-t">' + o.total + '</span>' +
      '<span class="wr-p">' + o.pct + '</span>' +
      '<span class="wr-k">' + o.countries + '</span>' +
      '<span class="wr-arrow" aria-hidden="true">→</span>' +
    '</a>';
  });

  html += '<div class="wr-row wr-total">' +
    '<span class="wr-n">总计</span>' +
    '<span class="wr-c">' + cult + '</span>' +
    '<span class="wr-a">' + nat + '</span>' +
    '<span class="wr-m">' + mix + '</span>' +
    '<span class="wr-t">' + total.toLocaleString("en-US") + '</span>' +
    '<span class="wr-p">100%</span>' +
    '<span class="wr-k">' + countries + '</span>' +
    '<span class="wr-arrow"></span>' +
  '</div></div>';

  listEl.innerHTML = html;
})();
