(function () {
  "use strict";
  var D = window.KUMANO_STAMPS;
  var K = window.KUMANO_KODO || {};
  if (!D) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var stageById = {};
  D.stages.forEach(function (s) { stageById[s.id] = s; });
  var COLORS = { a: "#8a6338", b: "#3f6655", c: "#2f4d5b", d: "#9b3b32", e: "#6a5a8c", f: "#7a6a3f" };
  var map = null, layer = null, markers = {}, current = "all";

  function popupHtml(p) {
    var s = stageById[p.stage];
    return '<b>' + p.no + ' · ' + esc(p.name) + '</b>' +
      '<div class="ks-pop-meta">' + esc(s ? s.name : "") + ' · ' + (p.approx ? "坐标约值" : "坐标") + '</div>' +
      '<p>' + esc(p.note) + '</p>' +
      '<p>' + p.lat.toFixed(4) + ', ' + p.lng.toFixed(4) + '</p>';
  }

  function itemHtml(p) {
    var s = stageById[p.stage];
    return '<button class="ks-item" type="button" data-no="' + p.no + '">' +
      '<span class="ks-no" style="color:' + COLORS[p.stage] + '">' + p.no + '</span>' +
      '<span><span class="ks-item-name">' + esc(p.name) + '</span>' +
      '<span class="ks-item-meta">' + esc(s ? s.name : "") + (p.approx ? ' · ≈' : '') + '</span></span></button>';
  }

  function renderList(points) {
    document.getElementById("ks-count").textContent = points.length + " 处";
    document.getElementById("ks-list").innerHTML = points.map(itemHtml).join("");
  }

  function renderMap() {
    if (!map) return;
    layer.clearLayers();
    markers = {};
    var pts = current === "all" ? D.points : D.points.filter(function (p) { return p.stage === current; });
    // stage lines
    var stages = current === "all" ? D.stages : D.stages.filter(function (s) { return s.id === current; });
    stages.forEach(function (s) {
      var linePts = D.points.filter(function (p) { return p.stage === s.id; }).map(function (p) { return [p.lat, p.lng]; });
      if (linePts.length > 1) L.polyline(linePts, { color: COLORS[s.id], weight: 2, opacity: .55, dashArray: "4 5" }).addTo(layer);
    });
    pts.forEach(function (p) {
      var icon = L.divIcon({
        className: "ks-pin-wrap",
        html: '<span class="ks-pin" style="--pin:' + COLORS[p.stage] + '">' + p.no + '</span>',
        iconSize: [21, 21], iconAnchor: [10, 10]
      });
      var m = L.marker([p.lat, p.lng], { icon: icon, title: p.no + " " + p.name }).addTo(layer);
      m.bindPopup(popupHtml(p), { maxWidth: 280 });
      markers[p.no] = m;
    });
    if (pts.length) {
      map.fitBounds(L.latLngBounds(pts.map(function (p) { return [p.lat, p.lng]; })), { padding: [45, 45], maxZoom: current === "all" ? 11 : 13 });
    }
    renderList(pts);
  }

  document.getElementById("ks-filter").innerHTML =
    '<button type="button" data-stage="all" class="is-active">全部 41</button>' +
    D.stages.map(function (s) { return '<button type="button" data-stage="' + s.id + '">' + esc(s.no) + ' · ' + esc(s.name) + '</button>'; }).join("");
  document.getElementById("ks-filter").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-stage]");
    if (!b) return;
    current = b.getAttribute("data-stage");
    document.querySelectorAll("#ks-filter button").forEach(function (x) { x.classList.toggle("is-active", x === b); });
    renderMap();
  });
  document.getElementById("ks-list").addEventListener("click", function (e) {
    var b = e.target.closest(".ks-item");
    if (!b) return;
    var p = D.points.filter(function (x) { return x.no === Number(b.getAttribute("data-no")); })[0];
    if (!p || !map) return;
    map.flyTo([p.lat, p.lng], 14, { duration: .7 });
    if (markers[p.no]) markers[p.no].openPopup();
    document.querySelectorAll(".ks-item").forEach(function (x) { x.classList.toggle("is-active", x === b); });
  });

  // table
  var table = document.getElementById("ks-table");
  table.innerHTML = '<div class="ks-row head"><span>#</span><span>名称</span><span>分段</span><span>坐标</span><span>备注</span></div>' +
    D.stages.map(function (s) {
      return D.points.filter(function (p) { return p.stage === s.id; }).map(function (p) {
        return '<div class="ks-row"><span class="n">' + p.no + '</span>' +
          '<span class="nm">' + esc(p.name) + (p.approx ? ' <span class="approx">≈</span>' : '') + '</span>' +
          '<span class="st">' + esc(s.no) + '</span>' +
          '<span class="coord">' + p.lat.toFixed(3) + ', ' + p.lng.toFixed(3) + '</span>' +
          '<span class="note">' + esc(p.note) + '</span></div>';
      }).join("");
    }).join("");

  var approx = D.points.filter(function (p) { return p.approx; });
  var approxEl = document.getElementById("ks-approx-note");
  if (approxEl) {
    approxEl.innerHTML = approx.length
      ? '<b>仍有 ' + approx.length + ' 个点标 ≈：</b>' + approx.map(function (p) { return p.no + ' ' + esc(p.name); }).join("、") + '。这些多是山路、茶屋迹或没有公开精确节点的点，按官方 41 处示意图和邻近道路定位；到现场请以押印台/路标为准。'
      : '41 个点均已用公开节点或官方图核对。';
  }

  document.getElementById("ks-sources").innerHTML = [
    { name: "和歌山县世界遗产中心：中边路押印帐与完全踏破证明书", url: "https://www.sekaiisan-wakayama.jp/walk/ouinchou.html" },
    { name: "和歌山县官方观光：中边路 41 处押印点一覧（PDF）", url: "https://www.wakayama-kanko.or.jp/lsc/upfile/articleDetail/0000/2510/2510_d003_file.pdf" },
    { name: "田边市熊野观光局：押印设置场所", url: "https://www.tb-kumano.jp/kumano-kodo/dual-pilgrim/stamp-lists/" },
    { name: "UNESCO：纪伊山地的灵场和参拜道", url: "https://whc.unesco.org/en/list/1142/" }
  ].map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>'; }).join("");

  // local stamp gallery
  var KEY = "kumano41-stamps-v1";
  var state = { images: {}, done: {} };
  try { state = Object.assign(state, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { alert("浏览器本地空间不足，图片没有保存。请先清除几张再试。"); }
  }
  function compress(file, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 480, scale = Math.min(1, max / Math.max(img.width, img.height));
        var c = document.createElement("canvas");
        c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        cb(c.toDataURL("image/jpeg", 0.68));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
  function renderGrid() {
    var done = Object.keys(state.done).filter(function (k) { return state.done[k]; }).length;
    var siteDone = 0;
    D.points.forEach(function (p) {
      var rec = state.images[p.no];
      if (rec && typeof rec === "object" && rec.site) siteDone++;
    });
    document.getElementById("ks-done").textContent = done;
    var siteEl = document.getElementById("ks-site-done");
    if (siteEl) siteEl.textContent = siteDone;
    document.getElementById("ks-grid").innerHTML = D.points.map(function (p) {
      var rec = state.images[p.no];
      var site = rec && typeof rec === "object" ? rec.site : "";
      var stamp = rec && typeof rec === "object" ? rec.stamp : (typeof rec === "string" ? rec : "");
      var on = !!state.done[p.no] || !!stamp;
      return '<div class="ks-slot' + (on ? " is-done" : "") + '" data-no="' + p.no + '">' +
        '<div class="ks-slot-head"><span>' + p.no + '</span><b>' + esc(p.name) + '</b></div>' +
        '<div class="ks-thumb-pair">' +
        '<div class="ks-thumb"><span class="ks-thumb-label">地点</span>' + (site ? '<img src="' + site + '" alt="' + esc(p.name) + ' 的地点照片">' : '<span>待上传</span>') + '</div>' +
        '<div class="ks-thumb"><span class="ks-thumb-label">章</span>' + (stamp ? '<img src="' + stamp + '" alt="' + esc(p.name) + ' 的章面照片">' : '<span>待上传</span>') + '</div>' +
        '</div>' +
        '<div class="ks-slot-actions">' +
        '<label class="ks-upload">地点<input type="file" accept="image/*" data-upload="' + p.no + '" data-kind="site"></label>' +
        '<label class="ks-upload">章<input type="file" accept="image/*" data-upload="' + p.no + '" data-kind="stamp"></label>' +
        '<button type="button" class="' + (on ? "is-on" : "") + '" data-done="' + p.no + '">' + (on ? "✓ 已盖" : "标记已盖") + '</button>' +
        (site || stamp ? '<button type="button" data-clear="' + p.no + '">清除</button>' : '') +
        '</div></div>';
    }).join("");
  }
  document.getElementById("ks-grid").addEventListener("change", function (e) {
    var input = e.target.closest("input[data-upload]");
    if (!input || !input.files || !input.files[0]) return;
    var no = Number(input.getAttribute("data-upload"));
    var kind = input.getAttribute("data-kind");
    var rec = state.images[no];
    if (!rec || typeof rec !== "object") rec = { stamp: typeof rec === "string" ? rec : "" };
    compress(input.files[0], function (data) {
      rec[kind] = data;
      state.images[no] = rec;
      if (kind === "stamp") state.done[no] = true;
      save(); renderGrid();
    });
  });
  document.getElementById("ks-grid").addEventListener("click", function (e) {
    var d = e.target.closest("button[data-done]");
    if (d) {
      var no = Number(d.getAttribute("data-done"));
      state.done[no] = !state.done[no]; save(); renderGrid(); return;
    }
    var c = e.target.closest("button[data-clear]");
    if (c) {
      var n = Number(c.getAttribute("data-clear"));
      delete state.images[n]; delete state.done[n]; save(); renderGrid();
    }
  });
  renderGrid();

  if (window.L) {
    map = L.map("ks-map", { scrollWheelZoom: false }).setView([33.75, 135.75], 10);
    GB_BASEMAP(map);
    layer = L.layerGroup().addTo(map);
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    setTimeout(function () { map.invalidateSize(); renderMap(); }, 220);
  } else {
    document.getElementById("ks-map").innerHTML = '<p style="padding:24px;font-size:12px;color:#6b6258">地图库未加载；下方 41 行表格仍可查看。</p>';
    renderList(D.points);
  }
  if (!window.L) renderList(D.points);
})();
