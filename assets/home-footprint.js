(function () {
  "use strict";
  var CN_KEY = "china-capitals-v1", WORLD_KEY = "world-countries-v1";
  var loaded = false, loading = false, chinaChart = null, worldChart = null;
  var color = { on: "#a94738", off: "#e8ddcb", other: "#d8d0c2", border: "#f7f1e5" };
  var chinaGeo = null, worldGeo = null;

  function read(key) {
    try {
      var raw = JSON.parse(localStorage.getItem(key) || "[]");
      var arr = Array.isArray(raw) ? raw : (raw && raw.visited ? raw.visited : []);
      return new Set(arr);
    } catch (e) { return new Set(); }
  }
  function setCount(id, n, total) {
    var el = document.getElementById(id);
    if (el) el.textContent = n + " / " + total;
  }
  function updateCounts() {
    var cn = read(CN_KEY);
    var world = read(WORLD_KEY);
    setCount("hf-cn-count", cn.size, 34);
    setCount("hf-world-count", world.size, 193);
  }
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src; s.async = false;
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  function ensureScripts() {
    var jobs = [];
    if (!window.echarts) jobs.push(loadScript("https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"));
    if (!window.CHINA_CAPITALS) jobs.push(loadScript("province-capitals-data.js"));
    if (!window.WORLD_COUNTRIES) jobs.push(loadScript("world-countries-data.js"));
    return Promise.all(jobs);
  }
  function chinaData() {
    if (!window.CHINA_CAPITALS) return [];
    var visited = read(CN_KEY);
    return window.CHINA_CAPITALS.provinces.map(function (p) {
      var on = visited.has(p.id);
      return { name: p.mapName, value: on ? 1 : 0, itemStyle: { areaColor: on ? color.on : color.off } };
    });
  }
  function worldData() {
    if (!window.WORLD_COUNTRIES) return [];
    var visited = read(WORLD_KEY);
    return window.WORLD_COUNTRIES.countries.filter(function (c) { return c.map; }).map(function (c) {
      var on = visited.has(c.id);
      return { name: c.mapName, value: on ? 1 : 0, itemStyle: { areaColor: on ? color.on : color.off } };
    });
  }
  function initChina() {
    chinaChart = echarts.init(document.getElementById("hf-china-map"), null, { renderer: "canvas" });
    echarts.registerMap("hf-china", { type: "FeatureCollection", features: chinaGeo.features.filter(function (f) {
      return !(f.properties && f.properties.adcode === "100000_JD");
    }) });
    chinaChart.setOption({
      backgroundColor: "transparent",
      tooltip: { show: false },
      series: [{
        type: "map", map: "hf-china", roam: false, selectedMode: false,
        layoutCenter: ["50%", "52%"], layoutSize: "96%",
        itemStyle: { areaColor: color.off, borderColor: color.border, borderWidth: .5 },
        label: { show: false }, data: chinaData()
      }]
    });
    chinaChart.on("click", function () { window.location.href = "province-capitals.html"; });
  }
  function initWorld() {
    worldChart = echarts.init(document.getElementById("hf-world-map"), null, { renderer: "canvas" });
    var inMap = {};
    window.WORLD_COUNTRIES.countries.forEach(function (c) { if (c.map) inMap[c.mapName] = true; });
    var others = worldGeo.features.map(function (f) { return f.properties.name; }).filter(function (n) { return n && !inMap[n]; });
    echarts.registerMap("hf-world", worldGeo);
    worldChart.setOption({
      backgroundColor: "transparent",
      tooltip: { show: false },
      series: [{
        type: "map", map: "hf-world", roam: false, selectedMode: false,
        layoutCenter: ["50%", "52%"], layoutSize: "96%",
        itemStyle: { areaColor: color.off, borderColor: color.border, borderWidth: .4 },
        label: { show: false },
        regions: others.map(function (n) { return { name: n, itemStyle: { areaColor: color.other } }; }),
        data: worldData()
      }]
    });
    worldChart.on("click", function () { window.location.href = "world-countries.html"; });
  }
  function updateCharts() {
    updateCounts();
    if (chinaChart) chinaChart.setOption({ series: [{ data: chinaData() }] });
    if (worldChart) worldChart.setOption({ series: [{ data: worldData() }] });
  }
  function init() {
    if (loaded || loading) return;
    loading = true;
    ensureScripts().then(function () {
      return Promise.all([
        fetch("data/china-provinces.geojson").then(function (r) { return r.json(); }),
        fetch("data/world-echarts.json").then(function (r) { return r.json(); })
      ]);
    }).then(function (res) {
      chinaGeo = res[0];
      worldGeo = res[1];
      worldGeo.features = worldGeo.features.filter(function (f) { return f.properties.name !== "Antarctica"; });
      initChina(); initWorld();
      loaded = true; loading = false; updateCharts();
      window.addEventListener("resize", function () {
        if (chinaChart) chinaChart.resize();
        if (worldChart) worldChart.resize();
      });
    }).catch(function (err) {
      loading = false;
      document.getElementById("hf-china-map").innerHTML = '<span class="hf-map-fallback">地图加载失败</span>';
      document.getElementById("hf-world-map").innerHTML = '<span class="hf-map-fallback">地图加载失败</span>';
      console.error(err);
    });
  }

  updateCounts();
  var target = document.getElementById("home-footprint");
  if (target && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); init(); }
    }, { rootMargin: "250px 0px" });
    io.observe(target);
  } else { init(); }

  window.addEventListener("storage", function (e) {
    if (e.key === CN_KEY || e.key === WORLD_KEY) updateCharts();
  });
  window.addEventListener("pageshow", updateCharts);
  window.addEventListener("focus", updateCharts);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) updateCharts(); });
})();
