(function () {
  "use strict";
  var D = window.CHINA_CAPITALS;
  if (!D) return;
  var KEY = "china-capitals-v1";
  var COLOR = { on: "#a94738", off: "#e8ddcb", hover: "#bf5b4a", border: "#f7f1e5" };
  var byId = {}, byMap = {}, regionById = {};
  D.provinces.forEach(function (p) { byId[p.id] = p; byMap[p.mapName] = p; });
  D.regions.forEach(function (r) { regionById[r.id] = r; });

  var visited = new Set();
  try {
    var raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (Array.isArray(raw)) raw.forEach(function (id) { if (byId[id]) visited.add(id); });
    else if (raw && Array.isArray(raw.visited)) raw.visited.forEach(function (id) { if (byId[id]) visited.add(id); });
  } catch (e) {}
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(Array.from(visited))); } catch (e) {}
  }

  var mainChart = null, southChart = null;
  var mapReady = false;

  function tooltip(p) {
    var it = byMap[p.name];
    if (!it) return p.name || "";
    return '<b>' + it.name + ' · ' + it.capital + '</b><br>' +
      it.type + ' · ' + (visited.has(it.id) ? '已到' : '未到') +
      (it.note ? '<br><span style="font-size:10px;color:#8c8174">' + it.note + '</span>' : '');
  }

  function mainData() {
    return D.provinces.map(function (p) {
      var on = visited.has(p.id);
      return {
        name: p.mapName,
        value: on ? 1 : 0,
        itemStyle: { areaColor: on ? COLOR.on : COLOR.off },
        label: { color: on ? "#fff" : "#5f574d" }
      };
    });
  }
  function southData() {
    var ids = ["460000", "710000", "440000", "450000", "810000", "820000"];
    var arr = [];
    D.provinces.forEach(function (p) {
      if (ids.indexOf(p.adcode) >= 0) {
        var on = visited.has(p.id);
        arr.push({ name: p.mapName, value: on ? 1 : 0, itemStyle: { areaColor: on ? COLOR.on : COLOR.off } });
      }
    });
    arr.push({ name: "南海诸岛", value: 0, itemStyle: { areaColor: "transparent", borderColor: COLOR.on, borderWidth: .8 } });
    return arr;
  }

  function updateMaps() {
    if (!mapReady) return;
    mainChart.setOption({
      series: [{
        data: mainData(),
        label: { show: true, fontSize: 8, color: "#5f574d", formatter: function (p) { var x = byMap[p.name]; return x ? x.name : ""; } },
        labelLayout: { hideOverlap: true }
      }]
    });
    southChart.setOption({ series: [{ data: southData() }] });
  }

  function renderSide() {
    var n = visited.size;
    document.getElementById("pc-count").textContent = n;
    document.getElementById("pc-count2").textContent = n;
    document.getElementById("pc-bar").style.width = (n / 34 * 100) + "%";
    document.getElementById("pc-region-list").innerHTML = D.regions.map(function (r) {
      var ps = r.provinces.map(function (id) { return byId[id]; }).filter(Boolean);
      var done = ps.filter(function (p) { return visited.has(p.id); }).length;
      return '<div class="pc-region-row"><span>' + r.name + '</span><b>' + done + ' / ' + ps.length + '</b><em>' + Math.round(done / ps.length * 100) + '%</em></div>';
    }).join("");
  }

  function renderTable() {
    document.getElementById("pc-table").innerHTML = D.regions.map(function (r) {
      var ps = r.provinces.map(function (id) { return byId[id]; }).filter(Boolean);
      var done = ps.filter(function (p) { return visited.has(p.id); }).length;
      return '<section class="pc-region-block"><div class="pc-region-head"><h3>' + r.name + '</h3><span>' + done + ' / ' + ps.length + '</span></div>' +
        ps.map(function (p) {
          var on = visited.has(p.id);
          return '<div class="pc-row' + (on ? " is-on" : "") + '" data-id="' + p.id + '" role="button" tabindex="0" aria-pressed="' + on + '">' +
            '<span class="pc-check">✓</span><span class="pc-name">' + p.name + '</span><span class="pc-cap">' + p.capital + '</span>' +
            '<span class="pc-type">' + p.type + '</span><span class="pc-date">' + (on ? "已到" : "") + '</span></div>';
        }).join("") + '</section>';
    }).join("");
  }

  function render() {
    renderSide();
    renderTable();
    updateMaps();
  }

  function toggle(id) {
    if (!byId[id]) return;
    if (visited.has(id)) visited.delete(id); else visited.add(id);
    save(); render();
  }

  document.getElementById("pc-table").addEventListener("click", function (e) {
    var row = e.target.closest(".pc-row");
    if (row) toggle(row.getAttribute("data-id"));
  });
  document.getElementById("pc-table").addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var row = e.target.closest(".pc-row");
    if (row) { e.preventDefault(); toggle(row.getAttribute("data-id")); }
  });

  document.getElementById("pc-export").addEventListener("click", function () {
    var out = { version: 1, exportedAt: new Date().toISOString(), definition: D.definition, visited: Array.from(visited) };
    var blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "china-capitals-" + new Date().toISOString().slice(0, 10) + ".json";
    a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  document.getElementById("pc-import").addEventListener("change", function (e) {
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
    rd.readAsText(f);
    e.target.value = "";
  });
  document.getElementById("pc-reset").addEventListener("click", function () {
    if (!confirm("确定清空全部 34 条记录？建议先导出 JSON。")) return;
    visited = new Set(); save(); render();
  });

  fetch("data/china-provinces.geojson").then(function (r) { return r.json(); }).then(function (geo) {
    var features = geo.features || [];
    var jd = features.filter(function (f) { return f.properties && f.properties.adcode === "100000_JD"; })[0];
    var main = { type: "FeatureCollection", features: features.filter(function (f) { return f !== jd; }) };
    var southIds = ["460000", "710000", "440000", "450000", "810000", "820000"];
    var south = { type: "FeatureCollection", features: features.filter(function (f) {
      return f.properties && southIds.indexOf(String(f.properties.adcode)) >= 0;
    }) };
    if (jd) {
      jd = JSON.parse(JSON.stringify(jd));
      jd.properties.name = "南海诸岛";
      south.features.push(jd);
    }
    echarts.registerMap("pc-main", main);
    echarts.registerMap("pc-south", south);

    mainChart = echarts.init(document.getElementById("pc-map"), null, { renderer: "canvas" });
    southChart = echarts.init(document.getElementById("pc-south"), null, { renderer: "canvas" });
    var baseMap = {
      map: "pc-main", roam: false, selectedMode: false, layoutCenter: ["50%", "50%"], layoutSize: "98%",
      itemStyle: { areaColor: COLOR.off, borderColor: COLOR.border, borderWidth: .8 },
      emphasis: { itemStyle: { areaColor: COLOR.hover }, label: { show: true, color: "#fff", fontSize: 10 } },
      label: { show: true, fontSize: 8, color: "#5f574d" }
    };
    mainChart.setOption({
      backgroundColor: "transparent",
      tooltip: { trigger: "item", formatter: tooltip },
      series: [Object.assign({}, baseMap, { type: "map", data: mainData() })]
    });
    southChart.setOption({
      backgroundColor: "transparent",
      silent: true,
      series: [{
        type: "map", map: "pc-south", roam: false, selectedMode: false, layoutCenter: ["50%", "50%"], layoutSize: "96%",
        itemStyle: { areaColor: COLOR.off, borderColor: COLOR.border, borderWidth: .5 },
        label: { show: false }, data: southData()
      }]
    });
    mainChart.on("click", function (p) {
      var it = byMap[p.name];
      if (it) toggle(it.id);
    });
    mapReady = true;
    updateMaps();
    window.addEventListener("resize", function () { mainChart.resize(); southChart.resize(); });
  }).catch(function (err) {
    document.getElementById("pc-map").innerHTML = '<div class="pc-error">地图数据加载失败。表格仍可使用；请检查网络或 data/china-provinces.geojson。</div>';
    console.error(err);
  });

  render();
})();
