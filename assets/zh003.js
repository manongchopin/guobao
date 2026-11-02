(function () {
  "use strict";

  var DATA = window.ZH003_SITES;
  if (!DATA || !DATA.sites) return;

  var sites = DATA.sites;
  var DISPLAY = window.ZH003_DISPLAY || {};
  var grid = document.getElementById("zh-grid");
  var dialog = document.getElementById("zh-dialog");
  var closeBtn = document.getElementById("zh-dialog-close");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function slug(site) { return site.slug || "zh003-" + site.no; }
  function displayFor(site) {
    return DISPLAY[String(site.no)] || { tier: "C", src: "", credit: "" };
  }
  function imagePath(site) {
    var d = displayFor(site);
    return d.tier !== "C" ? (d.src || "") : "";
  }
  function tierLabel(tier) {
    return { A: "Sentinel 示意", B: "OSM 位置图", C: "文字 / 坐标", E: "商业高清图" }[tier] || tier;
  }
  function noText(n) { return String(n).padStart(2, "0"); }
  function stanceClass(s) { return s === "存疑" ? " is-doubt" : ""; }

  function renderHeader() {
    document.getElementById("zh-total").textContent = DATA.stats.total;
    document.getElementById("zh-coords").textContent = DATA.stats.with_coords;
    document.getElementById("zh-countries").textContent = DATA.stats.countries;
    document.getElementById("zh-subtitle").textContent = "境外中式古城 " + DATA.stats.total + " 处 · " + DATA.subtitle;
    document.getElementById("zh-doubt-count").textContent = sites.filter(function (s) { return s.stance === "存疑"; }).length;
  }

  function renderCaveats() {
    document.getElementById("zh-caveats").innerHTML = DATA.caveats.map(function (c) {
      return "<li>" + esc(c) + "</li>";
    }).join("");
  }

  function renderStats() {
    var era = DATA.stats.by_era || {};
    var parts = Object.keys(era).map(function (k) { return esc(k) + " " + era[k]; });
    document.getElementById("zh-stats").innerHTML =
      "<span><b>" + DATA.stats.total + "</b> 处</span>" +
      "<span><b>" + DATA.stats.with_coords + "</b> 处有坐标</span>" +
      "<span><b>" + DATA.stats.countries + "</b> 个国家</span>" +
      '<span class="zh-era-stats">' + parts.join(" · ") + "</span>";
  }

  function renderSource() {
    var s = DATA.source;
    document.getElementById("zh-source-body").innerHTML =
      '<p>来源：' + esc(s.platform) + "问题「" + esc(s.question) + "」，答主 <b>" + esc(s.author) + "</b> · 抓取于 " + esc(DATA.captured) + "。</p>" +
      '<p><a href="' + esc(s.url) + '" target="_blank" rel="noopener">打开原始回答 ↗</a></p>' +
      "<p>第 01、02 条为 Google Maps 截图；其余点位为 Esri / Maxar / Earthstar 800px 商业影像。影像与 14 页 PDF 均未获公开再分发授权，属「未授权公开（风险已记录）」；权利人可联系下架。</p>" +
      "<p>完整署名：第 01、02 条 <code>Google Maps</code>；其余 <code>Esri / Maxar / Earthstar Geographics</code>。早先的 A/B/C 开放底图配置保留作备用，但当前默认不显示。</p>" +
      '<p>第 32 条疾陵城的国别按 <code>sites.json</code> 的 <code>country</code> 字段显示；若上游修改，本页随之变化，不在代码里写死。</p>';
  }

  function options(select, values) {
    values.forEach(function (v) {
      var o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      select.appendChild(o);
    });
  }

  function unique(key) {
    var out = [];
    sites.forEach(function (s) {
      if (s[key] != null && s[key] !== "" && out.indexOf(s[key]) < 0) out.push(s[key]);
    });
    return out;
  }

  function renderFilters() {
    options(document.getElementById("zh-era"), unique("era"));
    options(document.getElementById("zh-country"), unique("country"));
    options(document.getElementById("zh-stance"), unique("stance"));
  }

  function card(site) {
    var d = displayFor(site);
    var img = imagePath(site);
    var alt = d.tier === "A" ? "Sentinel-2 10m 示意" : (d.tier === "B" ? "OSM 位置图" : (d.tier === "E" ? "商业卫星影像" : ""));
    var thumb;
    if (img) {
      thumb = '<div class="zh-thumb"><img src="' + esc(img) + '" alt="' + esc(site.name + alt) + '" loading="lazy"><span class="zh-no">No. ' + noText(site.no) + "</span></div>";
    } else {
      thumb = '<div class="zh-thumb"><div class="zh-no-image">公开版无影像<br><small>文字 / 坐标</small></div><span class="zh-no">No. ' + noText(site.no) + "</span></div>";
    }
    return '<button class="zh-card" type="button" data-slug="' + esc(slug(site)) + '" data-tier="' + esc(d.tier) + '" aria-label="查看 ' + esc(site.name) + '">' +
      thumb +
      '<div class="zh-card-body">' +
      '<div class="zh-card-meta"><span>' + esc(site.era) + " · " + esc(site.kind) + '</span><span class="zh-stance' + stanceClass(site.stance) + '">' + esc(site.stance) + '</span><span class="zh-tier">' + esc(tierLabel(d.tier)) + "</span></div>" +
      "<h3>" + esc(site.name) + "</h3>" +
      '<div class="zh-place">' + esc(site.place) + "</div>" +
      "</div></button>";
  }

  function draw() {
    var era = document.getElementById("zh-era").value;
    var country = document.getElementById("zh-country").value;
    var stance = document.getElementById("zh-stance").value;
    var tier = document.getElementById("zh-tier").value;
    var list = sites.filter(function (s) {
      return (era === "全部" || s.era === era) &&
        (country === "全部" || s.country === country) &&
        (stance === "全部" || s.stance === stance) &&
        (tier === "全部" || displayFor(s).tier === tier);
    });
    document.getElementById("zh-count").textContent = "显示 " + list.length + " / " + sites.length + " 条";
    grid.innerHTML = list.map(card).join("");
  }

  function coordRows(site) {
    if (site.lat == null || site.lon == null) {
      return '<div><dt>坐标</dt><dd>原文未给坐标</dd></div>';
    }
    return '<div><dt>纬度 DMS</dt><dd>' + esc(site.lat_dms) + "</dd></div>" +
      '<div><dt>经度 DMS</dt><dd>' + esc(site.lon_dms) + "</dd></div>" +
      '<div><dt>十进制</dt><dd>' + esc(site.lat) + ", " + esc(site.lon) + "</dd></div>";
  }

  function openDetail(site) {
    var d = displayFor(site);
    document.getElementById("zh-dialog-no").textContent = "No. " + noText(site.no) + " / " + DATA.stats.total;
    var st = document.getElementById("zh-dialog-stance");
    st.textContent = site.stance;
    st.className = "zh-stance" + stanceClass(site.stance);
    document.getElementById("zh-dialog-title").textContent = site.name;
    document.getElementById("zh-dialog-place").textContent = site.place;
    document.getElementById("zh-dialog-kind").textContent = site.era + " · " + site.kind + " · " + tierLabel(d.tier);

    var img = document.getElementById("zh-dialog-img");
    var none = document.getElementById("zh-dialog-noimg");
    var path = imagePath(site);
    if (path) {
      img.src = path;
      img.alt = site.name + (d.tier === "A" ? "Sentinel-2 10m 示意" : (d.tier === "B" ? "OSM 位置图" : "商业卫星影像"));
      img.hidden = false;
      img.style.aspectRatio = d.ratio || "1 / 1";
      img.style.objectFit = d.fit || "cover";
      none.hidden = true;
    } else {
      img.hidden = true;
      img.removeAttribute("src");
      img.style.aspectRatio = "1 / 1";
      img.style.objectFit = "cover";
      none.hidden = false;
      none.innerHTML = "公开版无影像<br><small>仅保留文字与坐标</small>";
    }
    document.getElementById("zh-dialog-caption").textContent = path
      ? (d.tier === "A" ? "Sentinel-2 10m 示意 · 600 米见方" : (d.tier === "B" ? "OSM 位置/范围图 · 600 米见方" : "Esri / Maxar 商业影像 · 800px"))
      : "公开版不提供影像";
    document.getElementById("zh-dialog-quote").textContent = site.quote;

    var editorWrap = document.getElementById("zh-dialog-editor-wrap");
    var editor = document.getElementById("zh-dialog-editor");
    if (site.editor) {
      editorWrap.hidden = false;
      editor.textContent = site.editor;
    } else {
      editorWrap.hidden = true;
      editor.textContent = "";
    }

    document.getElementById("zh-dialog-coords").innerHTML = coordRows(site);
    var creditEl = document.getElementById("zh-dialog-credit");
    creditEl.hidden = !path;
    creditEl.textContent = "影像署名：" + (d.credit || "");
    document.getElementById("zh-dialog-note").textContent = path
      ? (d.tier === "A"
        ? "Sentinel-2 10m 仅作位置/轮廓示意，不是高清遗址影像。底图数据：Contains modified Copernicus Sentinel data 2025。"
        : (d.tier === "B"
          ? "OSM 仅作位置/范围示意，不是遗址影像。底图：© OpenStreetMap contributors，ODbL。"
          : "Esri / Maxar / Earthstar 商业影像；未获公开再分发授权，已记录风险。权利人可联系下架。"))
      : "公开版只保留文字与坐标；Esri / Maxar 原图保存在私人档案，不公开。";

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  document.getElementById("zh-era").addEventListener("change", draw);
  document.getElementById("zh-country").addEventListener("change", draw);
  document.getElementById("zh-stance").addEventListener("change", draw);
  document.getElementById("zh-tier").addEventListener("change", draw);
  grid.addEventListener("click", function (e) {
    var btn = e.target.closest(".zh-card");
    if (!btn) return;
    var site = sites.find(function (s) { return slug(s) === btn.dataset.slug; });
    if (site) openDetail(site);
  });
  closeBtn.addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });

  renderHeader();
  renderCaveats();
  renderStats();
  renderSource();
  renderFilters();
  draw();

  document.getElementById("zh-total").textContent = DATA.stats.total;
})();
