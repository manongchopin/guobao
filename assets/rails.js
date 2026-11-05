(function () {
  "use strict";
  var D = window.TRIPS || {};
  var trains = Array.isArray(D.trains) ? D.trains : [];

  var RAIL = {
    "上海虹桥": [121.3200, 31.1940],
    "上海南": [121.4300, 31.1550],
    "上海": [121.4620, 31.2490],
    "杭州东": [120.2140, 30.2900],
    "义乌": [120.0750, 29.3060],
    "金华": [119.6470, 29.0790],
    "金华南": [119.7000, 29.1000],
    "苏州": [120.5850, 31.2990],
    "苏州北": [120.6420, 31.4210],
    "苏州南": [120.7900, 31.0700],
    "昆山南": [120.9500, 31.3600],
    "昆山": [120.9660, 31.3860],
    "无锡": [120.3030, 31.5870],
    "常州": [119.9740, 31.7860],
    "嘉兴南": [120.7900, 30.7200],
    "福州": [119.3180, 26.1160],
    "南平市": [118.1800, 26.6400],
    "莆田": [119.0100, 25.4300],
    "惠州南": [114.4400, 22.7900],
    "犀浦": [103.9700, 30.7500],
    "离堆公园": [103.6100, 30.9900],
    "珠海": [113.5800, 22.2700],
    "广州南": [113.2700, 22.9900],
    "南宁东": [108.4000, 22.8500],
    "石家庄": [114.4800, 38.0500],
    "绩溪北": [118.5900, 30.0700],
    "台北": [121.5170, 25.0478],
    "台中": [120.6150, 24.1125],
    "昆山": [120.9660, 31.3860],
    "昆山南": [120.9500, 31.3600],
    "无锡": [120.3030, 31.5870],
    "常州": [119.9740, 31.7860],
    "松江": [121.2300, 31.0300],
    "松江南": [121.2300, 30.9900],
    "嘉兴": [120.7500, 30.7500],
    "海宁": [120.6800, 30.5300],
    "海宁西": [120.6000, 30.5200],
    "余杭": [120.3000, 30.4200],
    "诸暨": [120.2400, 29.7200],
    "南京南": [118.7970, 31.9680],
    "合肥南": [117.2980, 31.7960],
    "六安": [116.5000, 31.7500],
    "富阳": [119.9500, 30.0500],
    "桐庐": [119.6800, 29.7900],
    "建德": [119.2800, 29.4800],
    "千岛湖": [119.0400, 29.6100],
    "杭州西": [119.9900, 30.3000],
    "湖州": [120.0900, 30.8900],
    "贵港": [109.6000, 23.1100],
    "梧州南": [111.2800, 23.4800],
    "肇庆东": [112.4700, 23.0800],
    "建瓯西": [118.3200, 27.0300],
    "延平": [118.1800, 26.6400],
    "古田北": [118.7400, 26.5800],
    "闽清北": [118.8600, 26.2300],
    "武夷山北": [118.0300, 27.7600],
    "上饶": [117.9400, 28.4500],
    "衢州": [118.8700, 28.9400],
    "苗栗": [120.8250, 24.6050],
    "新竹": [121.0400, 24.8080],
    "桃园": [121.2140, 25.0130],
    "板桥": [121.4590, 25.0140],
    "中山": [113.3900, 22.5200],
    "汕尾": [115.3700, 22.7800],
    "潮汕": [116.6100, 23.5500],
    "漳州": [117.6500, 24.5100],
    "厦门北": [118.1000, 24.6200],
    "泉州": [118.6800, 24.8700],
    "福清": [119.3800, 25.7200],
    "郫县西": [103.8900, 30.8100],
    "济南西": [116.8900, 36.6700],
    "都江堰": [103.6200, 31.0000],
  };

  var VIA = {
    "上海|常州": ["昆山", "苏州", "无锡"],
    "上海|苏州": ["昆山"],
    "上海虹桥|苏州": ["昆山南"],
    "上海虹桥|嘉兴南": ["松江南"],
    "上海虹桥|杭州东": ["松江南", "嘉兴南", "海宁西", "余杭"],
    "上海南|杭州东": ["松江", "嘉兴", "海宁"],
    "上海虹桥|义乌": ["杭州东", "诸暨"],
    "义乌|杭州东": ["诸暨"],
    "上海虹桥|金华": ["杭州东", "义乌"],
    "上海虹桥|金华南": ["杭州东", "义乌", "金华"],
    "杭州东|金华南": ["义乌", "金华"],
    "上海南|金华南": ["松江", "嘉兴", "杭州东", "诸暨", "义乌", "金华"],
    "上海虹桥|合肥南": ["南京南"],
    "合肥南|武汉": ["六安"],
    "上海虹桥|武汉": ["南京南", "合肥南"],
    "上海虹桥|绩溪北": ["杭州东", "富阳", "桐庐", "建德", "千岛湖"],
    "义乌|苏州南": ["杭州西", "湖州"],
    "南宁东|广州南": ["贵港", "梧州南", "肇庆东"],
    "广州南|珠海": ["中山"],
    "南平市|福州": ["建瓯西", "延平", "古田北", "闽清北"],
    "南平市|金华": ["武夷山北", "上饶", "衢州"],
    "福州|莆田": ["福清"],
    "惠州南|莆田": ["汕尾", "潮汕", "漳州", "厦门北", "泉州"],
    "无锡|昆山南": ["苏州"],
    "犀浦|离堆公园": ["郫县西", "都江堰"],
    "台中|台北": ["苗栗", "新竹", "桃园", "板桥"],
    "杭州东|石家庄": ["南京南", "济南西"]
  };

  var state = { year: "all", q: "" };
  var chart = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function kmTotal(list) { return list.reduce(function (s, f) { return s + (Number(f.km) || 0); }, 0); }
  function yearOf(t) { return String(t.month || "").slice(0, 4); }

  function years() {
    var set = {};
    trains.forEach(function (t) { set[yearOf(t)] = 1; });
    return Object.keys(set).sort().reverse();
  }
  function byYear(list) {
    return list.filter(function (t) { return state.year === "all" || yearOf(t) === state.year; });
  }
  function sorted(list) {
    return list.slice().sort(function (a, b) {
      return String(b.month).localeCompare(String(a.month)) || String(a.train).localeCompare(String(b.train));
    });
  }
  function row(t, full) {
    var m = full ? esc(t.month || "") : esc(String(t.month || "").slice(5)) + ' 月';
    return '<div class="tp-flight-row">' +
      '<span class="tp-month">' + m + '</span>' +
      '<span class="tp-flight-no">' + esc(t.train || "") + '</span>' +
      '<span class="tp-route">' + esc(t.from || "") + ' <b>→</b> ' + esc(t.to || "") + '</span>' +
      '<span class="tp-km">' + fmt(Number(t.km) || 0) + ' km</span>' +
    '</div>';
  }

  function renderStats() {
    var stations = {};
    trains.forEach(function (t) {
      if (t.from) stations[t.from] = 1;
      if (t.to) stations[t.to] = 1;
    });
    var ys = years();
    document.getElementById("lg-count").textContent = trains.length;
    document.getElementById("lg-km").textContent = fmt(kmTotal(trains));
    document.getElementById("lg-stations").textContent = Object.keys(stations).length;
    document.getElementById("lg-span").textContent = ys.length ? ys[ys.length - 1] + "–" + ys[0] : "—";
  }

  function renderYears() {
    var box = document.getElementById("lg-years");
    var items = [{ y: "all", label: "全部" }].concat(years().map(function (y) { return { y: y, label: y }; }));
    box.innerHTML = items.map(function (it) {
      var active = it.y === state.year ? ' class="is-active"' : "";
      return '<button type="button" data-year="' + it.y + '"' + active + '>' + it.label + '</button>';
    }).join("");
    box.onclick = function (e) {
      var b = e.target.closest("button[data-year]");
      if (!b) return;
      state.year = b.getAttribute("data-year");
      renderYears(); render();
    };
  }

  function caption(list) {
    return (state.year === "all" ? "全部 " : state.year + " 年 · ") + list.length + " 段 · " + fmt(kmTotal(list)) + " km";
  }

  function render() {
    var all = byYear(trains);
    var q = state.q.trim().toLowerCase();
    var summary = document.getElementById("lg-summary");
    var boxAll = document.getElementById("lg-all");
    var boxSplit = document.getElementById("lg-split");
    boxAll.innerHTML = ""; boxSplit.innerHTML = "";

    if (!q) {
      summary.textContent = caption(all);
      var by = {};
      sorted(all).forEach(function (t) { (by[yearOf(t)] = by[yearOf(t)] || []).push(t); });
      boxAll.innerHTML = Object.keys(by).sort().reverse().map(function (y) {
        var group = by[y];
        return '<div class="tp-year"><span>' + esc(y) + '</span><em>' +
          group.length + ' 段 · ' + fmt(kmTotal(group)) + ' km</em></div>' + group.map(function (t) { return row(t, false); }).join("");
      }).join("");
      return;
    }

    var outs = sorted(all.filter(function (t) { return (t.from || "").toLowerCase().indexOf(q) >= 0; }));
    var ins = sorted(all.filter(function (t) { return (t.to || "").toLowerCase().indexOf(q) >= 0; }));
    summary.textContent = "搜索「" + state.q.trim() + "」：出发 " + outs.length + " 段 · 到达 " + ins.length + " 段";
    boxSplit.innerHTML =
      '<div class="lg-block"><h3 class="lg-block-title">出发 · ' + outs.length + ' 段</h3>' +
        (outs.length ? '<div class="tp-flights-head"><span>月份</span><span>车次</span><span>区间</span><span class="tp-km">距离</span></div>' + outs.map(function (t) { return row(t, true); }).join("") : '<p class="lg-empty">没有从匹配车站出发的记录。</p>') +
      '</div>' +
      '<div class="lg-block"><h3 class="lg-block-title">到达 · ' + ins.length + ' 段</h3>' +
        (ins.length ? '<div class="tp-flights-head"><span>月份</span><span>车次</span><span>区间</span><span class="tp-km">距离</span></div>' + ins.map(function (t) { return row(t, true); }).join("") : '<p class="lg-empty">没有到达匹配车站的记录。</p>') +
      '</div>';
  }

  function railFit(lines) {
    var lngs = [], lats = [];
    lines.forEach(function (l) { l.coords.forEach(function (c) { lngs.push(c[0]); lats.push(c[1]); }); });
    if (!lngs.length) return { zoom: 5, center: [118, 31] };
    var minLng = Math.min.apply(null, lngs), maxLng = Math.max.apply(null, lngs);
    var minLat = Math.min.apply(null, lats), maxLat = Math.max.apply(null, lats);
    var span = Math.max(maxLng - minLng, maxLat - minLat);
    var zoom = span > 30 ? 2.2 : span > 18 ? 2.8 : span > 12 ? 3.6 : span > 8 ? 4.6 : span > 5 ? 5.8 : span > 3 ? 7 : 8.5;
    return { zoom: zoom, center: [(minLng + maxLng) / 2, (minLat + maxLat) / 2] };
  }

  function initMap() {
    var el = document.getElementById("tp-map-region");
    if (!el || !window.echarts) return;
    var lines = [], seen = {};
    trains.forEach(function (t) {
      var a = RAIL[t.from], b = RAIL[t.to];
      if (!a || !b) return;
      var key = [t.from, t.to].sort().join("|");
      if (seen[key]) return;
      seen[key] = 1;
      var via = (VIA[key] || []).slice();
      if ([t.from, t.to].sort()[0] !== t.from) via.reverse();
      var coords = [a];
      via.forEach(function (n) { if (RAIL[n]) coords.push(RAIL[n]); });
      coords.push(b);
      lines.push({ coords: coords, value: t.from + " → " + t.to });
    });
    var POS = { "上海虹桥": "right", "杭州东": "top", "义乌": "right", "金华": "left",
                "石家庄": "left", "福州": "right", "南宁东": "left", "广州南": "right",
                "珠海": "bottom", "台北": "right", "台中": "bottom" };
    var stations = Object.keys(POS).filter(function (n) { return RAIL[n]; }).map(function (n) {
      return { name: n, value: RAIL[n],
        label: { show: true, position: POS[n], distance: 5, color: "#8a938c", fontSize: 9,
                 formatter: function (p) { return p.name; } } };
    });

    fetch("data/china-provinces.geojson").then(function (r) { return r.json(); }).then(function (china) {
      echarts.registerMap("trips-china", {
        type: "FeatureCollection",
        features: china.features.filter(function (f) { return !(f.properties && f.properties.adcode === "100000_JD"); })
      });
      var fit = railFit(lines);
      chart = echarts.init(el, null, { renderer: "canvas" });
      chart.setOption({
        backgroundColor: "#f5f1e8",
        tooltip: { trigger: "item", backgroundColor: "#fffdf7", borderColor: "#ddd4c4", borderWidth: 1,
          padding: [6, 9], textStyle: { color: "#1d2622", fontSize: 11 },
          formatter: function (p) { return p.data && p.data.value ? p.data.value : ""; } },
        geo: { map: "trips-china", roam: true, zoom: fit.zoom, center: fit.center,
          itemStyle: { areaColor: "#efe8da", borderColor: "#d9cfbd", borderWidth: 0.5 },
          emphasis: { disabled: true }, select: { disabled: true }, scaleLimit: { min: 1, max: 14 } },
        series: [
          { type: "scatter", coordinateSystem: "geo", symbolSize: 4,
            itemStyle: { color: "#1d2622", opacity: 0.8 }, data: stations },
          { type: "lines", coordinateSystem: "geo", polyline: true, silent: true,
            lineStyle: { color: "#1d2622", width: 1.6, opacity: 0.75 }, data: lines }
        ]
      });
      window.addEventListener("resize", function () { if (chart) chart.resize(); });
    }).catch(function () {});
  }

  var params = new URLSearchParams(location.search);
  if (params.get("q")) {
    state.q = params.get("q");
    document.getElementById("lg-search").value = state.q;
  }
  if (params.get("year")) state.year = params.get("year");

  document.getElementById("lg-search").addEventListener("input", function () {
    state.q = this.value;
    render();
  });

  renderStats();
  renderYears();
  render();
  initMap();
})();
