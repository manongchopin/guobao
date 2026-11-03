(function () {
  "use strict";
  var D = window.WORLD_COUNTRIES;
  if (!D) return;
  var KEY = "world-countries-v1";
  var COLOR = { on: "#a94738", off: "#e8ddcb", other: "#d8d0c2", border: "#f7f1e5", hover: "#bf5b4a" };
  var byId = {}, byMap = {}, regById = {};
  D.countries.forEach(function (c) { byId[c.id] = c; byMap[c.mapName] = c; });
  D.regions.forEach(function (r) { regById[r.id] = r; });

  var visited = new Set();
  try {
    var raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    var arr = Array.isArray(raw) ? raw : (raw && raw.visited ? raw.visited : []);
    arr.forEach(function (id) { if (byId[id]) visited.add(id); });
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(Array.from(visited))); } catch (e) {} }

  var chart = null, mapReady = false, current = "all", query = "";

  function mapData() {
    return D.countries.filter(function (c) { return c.map; }).map(function (c) {
      var on = visited.has(c.id);
      return { name: c.mapName, value: on ? 1 : 0, itemStyle: { areaColor: on ? COLOR.on : COLOR.off } };
    });
  }
  function tooltip(p) {
    var c = byMap[p.name];
    if (!c) return '<b>' + (p.name || "地区") + '</b><br><span style="font-size:10px;color:#8c8174">非 193 会员国 / 地区，不参与统计</span>';
    return '<b>' + c.name + ' · ' + c.en + '</b><br>' + (regById[c.continent] ? regById[c.continent].name : "") +
      ' · ' + (visited.has(c.id) ? "已到" : "未到");
  }
  function updateMap() {
    if (!mapReady) return;
    chart.setOption({ series: [{ data: mapData() }] });
  }
  function renderSide() {
    var n = visited.size;
    document.getElementById("wc-count").textContent = n;
    document.getElementById("wc-count2").textContent = n;
    document.getElementById("wc-bar").style.width = (n / 193 * 100) + "%";
    document.getElementById("wc-region-list").innerHTML = D.regions.map(function (r) {
      var cs = D.countries.filter(function (c) { return c.continent === r.id; });
      var done = cs.filter(function (c) { return visited.has(c.id); }).length;
      return '<div class="wc-region-row"><span>' + r.name + '</span><b>' + done + ' / ' + cs.length + '</b><em>' + Math.round(done / cs.length * 100) + '%</em></div>';
    }).join("");
  }
  function renderTable() {
    var q = query.trim().toLowerCase();
    document.getElementById("wc-table").innerHTML = D.regions.map(function (r) {
      if (current !== "all" && current !== r.id) return "";
      var cs = D.countries.filter(function (c) {
        if (c.continent !== r.id) return false;
        if (!q) return true;
        return c.name.toLowerCase().indexOf(q) >= 0 || c.en.toLowerCase().indexOf(q) >= 0;
      });
      if (!cs.length) return "";
      var all = D.countries.filter(function (c) { return c.continent === r.id; });
      var done = all.filter(function (c) { return visited.has(c.id); }).length;
      return '<section class="wc-region-block"><div class="wc-region-head"><h3>' + r.name + '</h3><span>' + done + ' / ' + all.length + '</span></div><div class="wc-rows">' +
        cs.map(function (c) {
          var on = visited.has(c.id);
          return '<div class="wc-row' + (on ? " is-on" : "") + '" data-id="' + c.id + '" role="button" tabindex="0" aria-pressed="' + on + '">' +
            '<span class="wc-check">✓</span><span><span class="wc-name">' + c.name + '</span><span class="wc-en">' + c.en + '</span></span>' +
            '<span class="wc-status">' + (on ? "已到" : "") + '</span></div>';
        }).join("") + '</div></section>';
    }).join("") || '<p style="padding:20px;font-size:11px;color:var(--ink-3)">没有匹配的国家。</p>';
  }
  function render() { renderSide(); renderTable(); updateMap(); }
  function toggle(id) {
    if (!byId[id]) return;
    if (visited.has(id)) visited.delete(id); else visited.add(id);
    save(); render();
  }

  document.getElementById("wc-table").addEventListener("click", function (e) {
    var row = e.target.closest(".wc-row");
    if (row) toggle(row.getAttribute("data-id"));
  });
  document.getElementById("wc-table").addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var row = e.target.closest(".wc-row");
    if (row) { e.preventDefault(); toggle(row.getAttribute("data-id")); }
  });
  document.getElementById("wc-search").addEventListener("input", function (e) { query = e.target.value; renderTable(); });

  document.getElementById("wc-filter").innerHTML = '<button type="button" data-region="all" class="is-active">全部 193</button>' +
    D.regions.map(function (r) { return '<button type="button" data-region="' + r.id + '">' + r.name + '</button>'; }).join("");
  document.getElementById("wc-filter").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-region]");
    if (!b) return;
    current = b.getAttribute("data-region");
    document.querySelectorAll("#wc-filter button").forEach(function (x) { x.classList.toggle("is-active", x === b); });
    renderTable();
  });

  document.getElementById("wc-export").addEventListener("click", function () {
    var out = { version: 1, exportedAt: new Date().toISOString(), standard: D.standard, visited: Array.from(visited) };
    var blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "world-countries-" + new Date().toISOString().slice(0, 10) + ".json";
    a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  document.getElementById("wc-import").addEventListener("change", function (e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      try {
        var obj = JSON.parse(rd.result);
        var arr = Array.isArray(obj) ? obj : (obj.visited || []);
        visited = new Set(arr.filter(function (id) { return !!byId[id]; }));
        save(); render();
      } catch (err) { alert("JSON 读取失败，请检查文件。"); }
    };
    rd.readAsText(f); e.target.value = "";
  });
  document.getElementById("wc-reset").addEventListener("click", function () {
    if (!confirm("确定清空全部国家记录？建议先导出 JSON。")) return;
    visited = new Set(); save(); render();
  });

  fetch("data/world-50m.json").then(function (r) { return r.json(); }).then(function (topo) {
    var geo = topojson.feature(topo, topo.objects.countries);
    geo.features = geo.features.filter(function (f) { return f.properties.name !== "Antarctica"; });
    echarts.registerMap("world", geo);
    chart = echarts.init(document.getElementById("wc-map"), null, { renderer: "canvas" });
    var inMap = {};
    D.countries.forEach(function (c) { if (c.map) inMap[c.mapName] = true; });
    var others = geo.features.map(function (f) { return f.properties.name; }).filter(function (n) { return n && !inMap[n]; });
    chart.setOption({
      backgroundColor: "transparent",
      tooltip: { trigger: "item", formatter: tooltip },
      series: [{
        type: "map", map: "world", roam: true, scaleLimit: { min: 1, max: 8 },
        selectedMode: false, layoutCenter: ["50%", "52%"], layoutSize: "96%",
        itemStyle: { areaColor: COLOR.off, borderColor: COLOR.border, borderWidth: .6 },
        label: { show: false },
        emphasis: { itemStyle: { areaColor: COLOR.hover }, label: { show: false } },
        regions: others.map(function (n) { return { name: n, itemStyle: { areaColor: COLOR.other } }; }),
        data: mapData()
      }]
    });
    chart.on("click", function (p) {
      var c = byMap[p.name];
      if (c) toggle(c.id);
    });
    mapReady = true; updateMap();
    window.addEventListener("resize", function () { chart.resize(); });
  }).catch(function (err) {
    document.getElementById("wc-map").innerHTML = '<p style="padding:24px;font-size:12px;color:#6b6258">世界地图加载失败；193 国表格仍可使用。</p>';
    console.error(err);
  });

  render();
})();
