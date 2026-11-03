(function () {
  "use strict";
  var D = window.VIETNAM_TREASURES;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function norm(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  }
  function dash(s) { return s ? esc(s) : "—"; }
  var batchById = {};
  D.batches.forEach(function (b) { batchById[b.batch] = b; });

  document.getElementById("vt-batch-nav").innerHTML = D.batches.map(function (b) {
    return '<a href="#vt-batch-' + b.batch + '">第 ' + b.batch + ' 批 · ' + b.count + '</a>';
  }).join("");

  document.getElementById("vt-list").innerHTML = D.batches.map(function (b) {
    return '<section class="vt-batch" id="vt-batch-' + b.batch + '" data-batch="' + b.batch + '">' +
      '<div class="vt-batch-head"><h3>第 ' + b.batch + ' 批 · Bảo vật quốc gia</h3>' +
      '<span>签署 ' + b.date + ' · ' + b.count + ' 件（组）' + (b.decision ? ' · ' + esc(b.decision) : '') + '</span></div>' +
      '<div class="vt-table-wrap"><table class="vt-table"><thead><tr><th>#</th><th>名称（越南文原表）</th><th>年代 / 文化</th><th>收藏 / 管理单位</th><th>所在地</th></tr></thead><tbody>' +
      b.items.map(function (it) {
        return '<tr data-batch="' + b.batch + '" data-search="' + esc(norm([it.name, it.period, it.owner, it.location].join(" "))) + '">' +
          '<td class="n">' + it.no + '</td><td class="name">' + esc(it.name) + '</td><td>' + dash(it.period) + '</td><td class="owner">' + dash(it.owner) + '</td><td class="loc">' + dash(it.location) + '</td></tr>';
      }).join("") + '</tbody></table></div></section>';
  }).join("");

  var input = document.getElementById("vt-search");
  var result = document.getElementById("vt-result-note");
  function update() {
    var q = norm(input.value.trim());
    var shown = 0;
    document.querySelectorAll("#vt-list .vt-batch").forEach(function (sec) {
      var rows = sec.querySelectorAll("tbody tr");
      var visible = 0;
      rows.forEach(function (tr) {
        var hit = !q || tr.getAttribute("data-search").indexOf(q) >= 0;
        tr.style.display = hit ? "" : "none";
        if (hit) visible++;
      });
      sec.style.display = visible ? "" : "none";
      shown += visible;
    });
    result.textContent = q ? "匹配 " + shown + " / " + D.total + " 件" : "共 " + D.total + " 件，13 批";
  }
  input.addEventListener("input", update);
  update();

  document.getElementById("vt-sources").innerHTML = [
    { name: "越南文维基：Bảo vật quốc gia (Việt Nam)（13 批表格，主数据）", url: "https://vi.wikipedia.org/wiki/B%E1%BA%A3o_v%E1%BA%ADt_qu%E1%BB%91c_gia_(Vi%E1%BB%87t_Nam)" },
    { name: "中文维基：國家寶物 (越南)（13 批、327 件）", url: "https://zh.wikipedia.org/wiki/%E5%9C%8B%E5%AE%B6%E5%AF%B6%E7%89%A9_(%E8%B6%8A%E5%8D%97)" },
    { name: "英文维基：National Treasure (Vietnam)（只到第 12 批 294 件，作辅助）", url: "https://en.wikipedia.org/wiki/National_Treasure_(Vietnam)" }
  ].map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>'; }).join("");
})();
