(function () {
  "use strict";

  var D = window.ZH002_DATA;
  if (!D || !D.records) return;

  var records = D.records;
  var dialog = document.getElementById("zh2-dialog");
  var closeBtn = document.getElementById("zh2-dialog-close");

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function dirLabel(dr) { return { S: "南至", N: "北至", W: "西至", E: "东至" }[dr] || dr; }
  function dirShort(dr) { return { S: "南", N: "北", W: "西", E: "东" }[dr] || dr; }
  function kindClass(k) { return "k-" + String(k || ""); }
  function gradeClass(g) { return "g-" + String(g || ""); }
  function coord(lon, lat, digits) {
    var d = digits == null ? 2 : digits;
    var ns = lat >= 0 ? "N" : "S";
    var ew = lon >= 0 ? "E" : "W";
    return Math.abs(lon).toFixed(d) + "°" + ew + ", " + Math.abs(lat).toFixed(d) + "°" + ns;
  }
  function coordDMS(lon, lat) {
    function dms(v, pos, neg) {
      var abs = Math.abs(v);
      var d = Math.floor(abs);
      var mFloat = (abs - d) * 60;
      var m = Math.floor(mFloat);
      var s = ((mFloat - m) * 60).toFixed(1);
      return d + "°" + m + "′" + s + "″" + (v >= 0 ? pos : neg);
    }
    return dms(lat, "N", "S") + " " + dms(lon, "E", "W");
  }

  function extreme(dr) {
    var subset = records.filter(function (r) { return r.dr === dr; });
    if (!subset.length) return null;
    var pick = subset[0];
    subset.forEach(function (r) {
      if (dr === "E" && r.lon > pick.lon) pick = r;
      if (dr === "W" && r.lon < pick.lon) pick = r;
      if (dr === "N" && r.lat > pick.lat) pick = r;
      if (dr === "S" && r.lat < pick.lat) pick = r;
    });
    var ties = subset.filter(function (r) {
      return (dr === "E" || dr === "W") ? r.lon === pick.lon : r.lat === pick.lat;
    });
    return { primary: pick, ties: ties.length };
  }

  function renderExtremes() {
    var order = ["N", "S", "E", "W"];
    $("zh2-extremes").innerHTML = order.map(function (dr) {
      var e = extreme(dr);
      if (!e) return "";
      var r = e.primary;
      return '<article class="zh2-extreme">' +
        '<p class="dir">' + esc(dirLabel(dr)) + " · EXTREME</p>" +
        "<h3>" + esc(coord(r.lon, r.lat, 2)) + "</h3>" +
        '<p class="ext-name">' + esc(r.dyn) + " · " + esc(r.name) + "</p>" +
        '<p class="ext-place">' + esc(r.modern) + " · " + esc(r.country) + "</p>" +
        '<div class="ext-foot"><span class="zh2-kind ' + kindClass(r.kind) + '">' + esc(r.kind) + "</span>" +
        '<span class="zh2-grade ' + gradeClass(r.grade) + '">可探访 ' + esc(r.grade || "—") + "</span>" +
        (e.ties > 1 ? "<span>同值 " + e.ties + " 处</span>" : "") + "</div>" +
        "</article>";
    }).join("");
  }

  function renderStats() {
    var g = D.stats.by_grade || {};
    $("zh2-stats").innerHTML =
      "<span><b>" + D.stats.total + "</b> 个点</span>" +
      "<span><b>" + D.stats.countries + "</b> 个国家</span>" +
      "<span><b>" + D.stats.by_direction.W + "</b> 西至 · " + D.stats.by_direction.N + " 北至 · " +
      D.stats.by_direction.S + " 南至 · " + D.stats.by_direction.E + " 东至</span>" +
      '<span style="margin-left:auto">可探访 A ' + (g.A || 0) + " · B " + (g.B || 0) + " · C " + (g.C || 0) + " · D " + (g.D || 0) + "</span>";
  }

  function renderSource() {
    var s = D.source;
    $("zh2-source").innerHTML =
      "<p>来源：" + esc(s.platform) + "问题「" + esc(s.question) + "」，答主 <b>" + esc(s.author) + "</b> · 抓取于 " + esc(D.captured) + "。</p>" +
      '<p><a href="' + esc(s.url) + '" target="_blank" rel="noopener">打开原始回答 ↗</a></p>' +
      "<p>地图底图：<b>" + esc(D.image_credit) + "</b></p>" +
      "<p>" + D.notes.map(esc).join("</p><p>") + "</p>";
  }

  function option(select, value, label) {
    var o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    select.appendChild(o);
  }
  function unique(key) {
    var out = [];
    records.forEach(function (r) {
      if (r[key] != null && r[key] !== "" && out.indexOf(r[key]) < 0) out.push(r[key]);
    });
    return out;
  }

  function renderFilters() {
    unique("dyn").forEach(function (v) { option($("zh2-dyn"), v, v); });
    unique("country").forEach(function (v) { option($("zh2-country"), v, v); });
    unique("kind").forEach(function (v) { option($("zh2-kind"), v, v); });
    unique("grade").forEach(function (v) { option($("zh2-grade"), v, v); });
  }

  function filtered() {
    var dr = $("zh2-dr").value;
    var dyn = $("zh2-dyn").value;
    var country = $("zh2-country").value;
    var kind = $("zh2-kind").value;
    var grade = $("zh2-grade").value;
    return records.filter(function (r) {
      return (dr === "全部" || r.dr === dr) &&
        (dyn === "全部" || r.dyn === dyn) &&
        (country === "全部" || r.country === country) &&
        (kind === "全部" || r.kind === kind) &&
        (grade === "全部" || r.grade === grade);
    });
  }

  function drawTable() {
    var list = filtered();
    $("zh2-count").textContent = "显示 " + list.length + " / " + records.length + " 条";
    if (!list.length) {
      $("zh2-tbody").innerHTML = '<tr><td colspan="8" class="zh2-empty">没有符合条件的点。</td></tr>';
      return;
    }
    $("zh2-tbody").innerHTML = list.map(function (r) {
      return "<tr>" +
        '<td class="num">' + String(r.no).padStart(3, "0") + "</td>" +
        '<td class="dir-' + r.dr.toLowerCase() + '">' + esc(dirShort(r.dr)) + "</td>" +
        "<td>" + esc(r.dyn) + "</td>" +
        '<td><button class="zh2-name-btn" type="button" data-no="' + r.no + '">' + esc(r.name) + "</button></td>" +
        "<td>" + esc(r.modern) + "</td>" +
        "<td>" + esc(r.kind) + "</td>" +
        '<td><span class="zh2-grade ' + gradeClass(r.grade) + '">' + esc(r.grade || "—") + "</span></td>" +
        '<td class="coord">' + esc(coord(r.lon, r.lat, 2)) + "</td>" +
        "</tr>";
    }).join("");
  }

  function openDetail(no) {
    var r = records.find(function (x) { return x.no === Number(no); });
    if (!r) return;
    $("zh2-dialog-no").textContent = "No. " + String(r.no).padStart(3, "0") + " / " + D.stats.total;
    $("zh2-dialog-dir").textContent = dirLabel(r.dr);
    $("zh2-dialog-kind").textContent = r.kind;
    $("zh2-dialog-tier").textContent = "可探访 " + (r.grade || "未分级");
    $("zh2-dialog-title").textContent = r.name;
    $("zh2-dialog-place").textContent = r.modern + " · " + r.country;
    $("zh2-dialog-meta").textContent = r.dyn + " · " + dirShort(r.dr) + "至 · " + r.kind;
    $("zh2-dialog-coords").innerHTML =
      "<div><dt>十进制</dt><dd>" + esc(r.lon) + ", " + esc(r.lat) + "</dd></div>" +
      "<div><dt>度分秒</dt><dd>" + esc(coordDMS(r.lon, r.lat)) + "</dd></div>" +
      "<div><dt>坐标依据</dt><dd>" + esc(r.src) + "</dd></div>";
    $("zh2-dialog-note").textContent = r.note || "无备注。";
    $("zh2-dialog-visit").textContent = r.visit || "暂无探访提示。";
    $("zh2-dialog-src").textContent = "数据版本 " + D.version + " · 更新于 " + D.updated;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  ["zh2-dr", "zh2-dyn", "zh2-country", "zh2-kind", "zh2-grade"].forEach(function (id) {
    $(id).addEventListener("change", drawTable);
  });
  $("zh2-tbody").addEventListener("click", function (e) {
    var btn = e.target.closest(".zh2-name-btn");
    if (btn) openDetail(btn.dataset.no);
  });
  closeBtn.addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });

  renderExtremes();
  renderStats();
  renderSource();
  renderFilters();
  drawTable();

  $("zh2-version").textContent = "ZH-002 · 数据版本 " + D.version + " · 更新于 " + D.updated;
  $("zh2-footer-version").textContent = "ZH-002 · " + D.version + " · " + D.updated;
})();
