(function () {
  "use strict";
  var D = window.YIWU_2021;
  if (!D) return;

  var ORDER = ["福田街道", "江东街道", "稠江街道", "北苑街道", "后宅街道", "廿三里街道", "城西街道", "佛堂镇", "赤岸镇", "上溪镇", "义亭镇", "苏溪镇", "大陈镇"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function slug(name) { return "d-" + name.replace(/\s+/g, "-"); }

  var groups = {};
  D.entries.forEach(function (e) {
    if (!groups[e.district]) groups[e.district] = [];
    groups[e.district].push(e);
  });
  var districts = ORDER.filter(function (d) { return groups[d]; });

  document.getElementById("yw21-index").innerHTML =
    '<a class="yw21-nav-item" href="#top"><span>全部</span><b>' + D.entries.length + '</b></a>' +
    districts.map(function (d) {
      return '<a class="yw21-nav-item" href="#' + slug(d) + '"><span>' + esc(d) + '</span><b>' + groups[d].length + '</b></a>';
    }).join("");

  function entryCard(e) {
    return '<details class="yw21-card">' +
      '<summary><span class="yw21-name">' + esc(e.name) + '</span>' +
      '<span class="yw21-sum">' + e.no + ' · 2019/' + esc(e.yiwuNo) + '</span></summary>' +
      '<div class="yw21-inner">' +
      '<div class="yw21-meta"><b>' + esc(e.era) + '</b><span>' + esc(e.addr) + '</span></div>' +
      '<dl class="yw21-block"><dt>文物本体（摘要）</dt><dd class="body">' + esc(e.body) + '</dd></dl>' +
      '<dl class="yw21-block"><dt>保护范围</dt><dd>' + esc(e.protection) + '</dd></dl>' +
      '<dl class="yw21-block"><dt>建设控制地带</dt><dd>' + esc(e.control) + '</dd></dl>' +
      '</div></details>';
  }

  document.getElementById("yw21-groups").innerHTML = districts.map(function (d) {
    return '<section class="yw21-group" id="' + slug(d) + '">' +
      '<div class="yw21-group-head"><h2>' + esc(d) + '</h2><span>' + groups[d].length + ' 条</span></div>' +
      '<div class="yw21-grid">' + groups[d].map(entryCard).join("") + '</div></section>';
  }).join("");

  var adj = document.getElementById("yw21-adjust");
  if (adj && D.adjustments) {
    adj.innerHTML = D.adjustments.map(function (e) {
      return '<details class="yw21-card yw21-adjust-card">' +
        '<summary><span class="yw21-name">' + esc(e.name) + '</span><span class="yw21-sum">调整 · ' + e.no + '</span></summary>' +
        '<div class="yw21-inner">' +
        '<div class="yw21-meta"><b>' + esc(e.district) + '</b><span>' + esc(e.relation) + '</span></div>' +
        '<dl class="yw21-block"><dt>原名 / 关系</dt><dd>' + esc(e.oldName) + '</dd></dl>' +
        '<dl class="yw21-block"><dt>文物本体（摘要）</dt><dd class="body">' + esc(e.body) + '</dd></dl>' +
        '<dl class="yw21-block"><dt>保护范围</dt><dd>' + esc(e.protection) + '</dd></dl>' +
        '<dl class="yw21-block"><dt>建设控制地带</dt><dd>' + esc(e.control) + '</dd></dl>' +
        '</div></details>';
    }).join("");
  }
})();
