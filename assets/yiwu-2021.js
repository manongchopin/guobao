(function () {
  "use strict";
  var D = window.YIWU_2021;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  document.getElementById("yw21-list").innerHTML = D.entries.map(function (e) {
    return '<details class="yw21-card">' +
      '<summary><h3>' + esc(e.name) + '</h3><span class="yw21-id">2021 · ' + e.no + ' / 2019 · ' + esc(e.yiwuNo) + '</span></summary>' +
      '<div class="yw21-inner">' +
      '<div class="yw21-meta"><b>' + esc(e.district) + '</b><span>' + esc(e.era) + '</span><span>' + esc(e.addr) + '</span></div>' +
      '<dl class="yw21-block"><dt>文物本体（摘要）</dt><dd class="body">' + esc(e.body) + '</dd></dl>' +
      '<dl class="yw21-block"><dt>保护范围</dt><dd>' + esc(e.protection) + '</dd></dl>' +
      '<dl class="yw21-block"><dt>建设控制地带</dt><dd>' + esc(e.control) + '</dd></dl>' +
      '</div></details>';
  }).join("");
  var adj = document.getElementById("yw21-adjust");
  if (adj && D.adjustments) {
    adj.innerHTML = D.adjustments.map(function (e) {
      return '<details class="yw21-card yw21-adjust-card">' +
        '<summary><h3>' + esc(e.name) + '</h3><span class="yw21-id">调整 · ' + e.no + ' / 2019 · ' + esc(e.yiwuNo) + '</span></summary>' +
        '<div class="yw21-inner">' +
        '<div class="yw21-meta"><b>' + esc(e.district) + '</b><span>' + esc(e.relation) + '</span><span>' + esc(e.addr) + '</span></div>' +
        '<dl class="yw21-block"><dt>原名 / 关系</dt><dd>' + esc(e.oldName) + '</dd></dl>' +
        '<dl class="yw21-block"><dt>文物本体（摘要）</dt><dd class="body">' + esc(e.body) + '</dd></dl>' +
        '<dl class="yw21-block"><dt>保护范围</dt><dd>' + esc(e.protection) + '</dd></dl>' +
        '<dl class="yw21-block"><dt>建设控制地带</dt><dd>' + esc(e.control) + '</dd></dl>' +
        '</div></details>';
    }).join("");
  }
})();
