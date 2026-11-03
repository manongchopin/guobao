(function () {
  "use strict";
  var D = window.TRIPS || {};
  var flights = Array.isArray(D.flights) ? D.flights : [];
  var trains = Array.isArray(D.trains) ? D.trains : [];
  var hikes = Array.isArray(D.hikes) ? D.hikes : [];

  var AIR = {
    YIW: [120.0320, 29.3447], CAN: [113.2988, 23.3924], SZX: [113.8107, 22.6393],
    HGH: [120.4344, 30.2295], TSA: [121.5519, 25.0694], HKG: [113.9185, 22.3080],
    XIY: [108.7516, 34.4471], XNN: [102.0430, 36.5275], KTM: [85.3591, 27.6966],
    KUL: [101.7099, 2.7456]
  };
  var RAIL = {
    "上海虹桥": [121.3200, 31.1940],
    "南京南": [118.7970, 31.9680],
    "合肥南": [117.2980, 31.7960],
    "武汉": [114.4210, 30.6090],
    "杭州东": [120.2140, 30.2900]
  };

  var worldChart = null, regionChart = null;
  var currentYear = "all";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function kmTotal(list) {
    return list.reduce(function (s, x) { return s + (Number(x.km) || 0); }, 0);
  }
  function yearOf(x) { return String(x.month || "").slice(0, 4) || "未编年"; }

  function renderStats() {
    var hikeKm = hikes.reduce(function (s, h) { return s + (Number(h.km) || 0); }, 0);
    document.getElementById("tp-flights").textContent = flights.length;
    document.getElementById("tp-trains").textContent = trains.length;
    document.getElementById("tp-hikes").textContent = hikes.length;
    document.getElementById("tp-km").textContent = fmt(Math.round(kmTotal(flights) + kmTotal(trains) + hikeKm));
  }

  function renderLog(list, boxId, totalId, kind) {
    var box = document.getElementById(boxId);
    var totalLine = document.getElementById(totalId);
    if (!list.length) {
      box.innerHTML = '<p class="tp-nothing">还没有' + (kind === "train" ? "铁路" : "飞行") + '记录。</p>';
      totalLine.textContent = "";
      return;
    }
    var byYear = {};
    list.slice().sort(function (a, b) {
      return String(b.month).localeCompare(String(a.month));
    }).forEach(function (x) {
      (byYear[yearOf(x)] = byYear[yearOf(x)] || []).push(x);
    });

    function keyOf(x) { return [x.month, x.flight || x.train, x.from, x.to].join("|"); }
    var counts = {}, seen = {}, CIRC = "①②③④⑤⑥⑦⑧⑨⑩";
    list.forEach(function (x) { counts[keyOf(x)] = (counts[keyOf(x)] || 0) + 1; });

    box.innerHTML = Object.keys(byYear).sort().reverse().map(function (y) {
      var group = byYear[y];
      var head = '<div class="tp-year"><span>' + esc(y) + '</span><em>' +
        group.length + ' 段 · ' + fmt(kmTotal(group)) + ' km</em></div>';
      var rows = group.map(function (x) {
        var route;
        if (kind === "train") {
          route = esc(x.from || "") + ' <b>→</b> ' + esc(x.to || "");
        } else {
          route = esc(x.from || "") + ' <i>' + esc(x.fromCode || "") + '</i> <b>→</b> ' +
            esc(x.to || "") + ' <i>' + esc(x.toCode || "") + '</i>';
        }
        var k = keyOf(x);
        var n = (seen[k] = (seen[k] || 0) + 1);
        var mark = counts[k] > 1 ? '<i class="tp-seq">' + CIRC.charAt(n - 1) + '</i>' : '';
        return '<div class="tp-flight-row">' +
          '<span class="tp-month">' + esc(String(x.month || "").slice(5)) + ' 月' + mark + '</span>' +
          '<span class="tp-flight-no">' + esc(x.flight || x.train || "") + '</span>' +
          '<span class="tp-route">' + route + '</span>' +
          '<span class="tp-km">' + fmt(Number(x.km) || 0) + ' km</span>' +
        '</div>';
      }).join("");
      return head + rows;
    }).join("");

    totalLine.textContent = "合计 " + list.length + " 段 · " + fmt(kmTotal(list)) + " km";
  }

  function hikeFigure(h) {
    var pts = h.path || [];
    if (pts.length < 2) return "";
    var kx = Math.cos(pts[0][0] * Math.PI / 180) * 111320;
    var ky = 110540;
    var xs = pts.map(function (p) { return p[1] * kx; });
    var ys = pts.map(function (p) { return p[0] * ky; });
    var minx = Math.min.apply(null, xs), maxx = Math.max.apply(null, xs);
    var miny = Math.min.apply(null, ys), maxy = Math.max.apply(null, ys);
    var spanX = Math.max(maxx - minx, 1), spanY = Math.max(maxy - miny, 1);
    var W = 1000, H = 520;
    var pad = 44;
    var scale = Math.min((W - 2 * pad) / spanX, (H - 2 * pad) / spanY);
    var ox = (W - spanX * scale) / 2, oy = (H - spanY * scale) / 2;
    function sx(m) { return ox + (m - minx) * scale; }
    function sy(m) { return H - oy - (m - miny) * scale; }
    var d = pts.map(function (p, i) {
      return (i ? "L" : "M") + sx(p[1] * kx).toFixed(1) + "," + sy(p[0] * ky).toFixed(1);
    }).join(" ");
    var sx0 = sx(pts[0][1] * kx), sy0 = sy(pts[0][0] * ky);
    var km = 5, bar = km * 1000 * scale;
    if (bar > W * 0.38) { km = 2; bar = km * 1000 * scale; }
    if (bar > W * 0.38) { km = 1; bar = km * 1000 * scale; }
    var bx = pad, by = H - 26;
    return '<figure class="tp-hike-figure">' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(h.name || "轨迹") + '轨迹示意">' +
        '<path d="' + d + '" fill="none" stroke="#4a6b52" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<circle cx="' + sx0.toFixed(1) + '" cy="' + sy0.toFixed(1) + '" r="5" fill="#a8402f"/>' +
        '<text x="' + (sx0 + 10).toFixed(1) + '" y="' + (sy0 - 8).toFixed(1) + '" class="tp-fig-label">起终点</text>' +
        '<line x1="' + bx + '" y1="' + by + '" x2="' + (bx + bar).toFixed(1) + '" y2="' + by + '" stroke="#8a938c" stroke-width="1.2"/>' +
        '<line x1="' + bx + '" y1="' + (by - 4) + '" x2="' + bx + '" y2="' + (by + 4) + '" stroke="#8a938c" stroke-width="1.2"/>' +
        '<line x1="' + (bx + bar).toFixed(1) + '" y1="' + (by - 4) + '" x2="' + (bx + bar).toFixed(1) + '" y2="' + (by + 4) + '" stroke="#8a938c" stroke-width="1.2"/>' +
        '<text x="' + (bx + bar + 8).toFixed(1) + '" y="' + (by + 4) + '" class="tp-fig-label">' + km + ' km</text>' +
      '</svg>' +
      '<figcaption>按实际比例重绘，无底图</figcaption>' +
    '</figure>';
  }

  function renderHikes() {
    var box = document.getElementById("tp-hike-list");
    if (!hikes.length) {
      box.innerHTML = '<p class="tp-nothing">还没有徒步记录。</p>';
      return;
    }
    box.innerHTML = hikes.map(function (h) {
      return '<article class="tp-hike">' +
        '<div class="tp-hike-head"><div>' +
          '<h3>' + esc(h.name || "未命名线路") + '</h3>' +
          '<p class="tp-hike-meta">' + esc(h.month || "") + ' · ' +
            (h.km != null ? h.km + ' km' : "") +
            (h.ascent != null ? ' · 爬升 ' + h.ascent + ' m' : "") +
            (h.high != null ? ' · 最高 ' + h.high + ' m' : "") +
          '</p>' +
        '</div><p class="tp-hike-points">' + (h.points || (h.path || []).length) + ' 点</p></div>' +
        hikeFigure(h) +
      '</article>';
    }).join("");
  }

  function flightYears() {
    var set = {};
    flights.forEach(function (f) { set[yearOf(f)] = 1; });
    return Object.keys(set).sort().reverse();
  }

  function yearData(y) {
    return flights.filter(function (f) { return y === "all" || yearOf(f) === y; });
  }

  function caption(y) {
    var list = yearData(y);
    return (y === "all" ? "全部 " : y + " 年 · ") + list.length + " 段 · " + fmt(kmTotal(list)) + " km";
  }

  function worldOption() {
    var list = yearData(currentYear);
    var airports = {};
    list.forEach(function (f) {
      if (AIR[f.fromCode]) airports[f.fromCode] = AIR[f.fromCode];
      if (AIR[f.toCode]) airports[f.toCode] = AIR[f.toCode];
    });
    var arcs = list.map(function (f) {
      return {
        coords: [AIR[f.fromCode], AIR[f.toCode]],
        value: f.flight + "  " + f.from + " → " + f.to + "  " + fmt(f.km) + " km"
      };
    });
    var LABELED = { KTM: 1, KUL: 1, XNN: 1, XIY: 1, HKG: 1, TSA: 1 };
    var dots = Object.keys(airports).map(function (code) {
      return {
        name: code, value: airports[code],
        label: { show: !!LABELED[code], position: "right", distance: 3, color: "#8a938c", fontSize: 9, formatter: function (p) { return p.name; } }
      };
    });

    return {
      backgroundColor: "#f5f1e8",
      animationDuration: 500,
      tooltip: {
        trigger: "item",
        backgroundColor: "#fffdf7",
        borderColor: "#ddd4c4",
        borderWidth: 1,
        padding: [6, 9],
        textStyle: { color: "#1d2622", fontSize: 11 },
        formatter: function (p) { return p.data && p.data.value ? p.data.value : ""; }
      },
      geo: {
        map: "trips-world", roam: true, zoom: 4.4, center: [103, 22],
        itemStyle: { areaColor: "#efe8da", borderColor: "#d9cfbd", borderWidth: 0.6 },
        emphasis: { disabled: true }, select: { disabled: true },
        scaleLimit: { min: 1, max: 12 }
      },
      series: [
        {
          type: "scatter", coordinateSystem: "geo", silent: true, symbolSize: 4,
          itemStyle: { color: "#a8402f", opacity: 0.8 }, data: dots
        },
        {
          type: "lines", coordinateSystem: "geo", polyline: false,
          lineStyle: { color: "#a8402f", width: 1.15, opacity: 0.62, curveness: 0.18, type: "dashed" },
          emphasis: { lineStyle: { opacity: 1, width: 1.8 } },
          data: arcs
        }
      ]
    };
  }

  function regionOption() {
    var lines = [
      { coords: [RAIL["上海虹桥"], RAIL["南京南"], RAIL["合肥南"], RAIL["武汉"]], value: "沪—宁—合—汉 铁路" },
      { coords: [RAIL["上海虹桥"], RAIL["杭州东"]], value: "沪—杭 铁路" }
    ];
    var POS = { "上海虹桥": "right", "南京南": "top", "合肥南": "left", "武汉": "left", "杭州东": "top" };
    var stations = ["上海虹桥", "南京南", "合肥南", "武汉", "杭州东"].map(function (n) {
      return {
        name: n, value: RAIL[n],
        label: { show: true, position: POS[n] || "right", distance: 5, color: "#8a938c", fontSize: 9,
                 formatter: function (p) { return p.name; } }
      };
    });
    var hikeDots = hikes.map(function (h) {
      var p = (h.path || [])[0] || [0, 0];
      return {
        name: h.name, value: [p[1], p[0]],
        label: { show: true, position: "right", distance: 6, color: "#4a6b52",
                 fontSize: 9, formatter: function () { return h.name; } }
      };
    });

    return {
      backgroundColor: "#f5f1e8",
      animationDuration: 500,
      tooltip: {
        trigger: "item",
        backgroundColor: "#fffdf7", borderColor: "#ddd4c4", borderWidth: 1,
        padding: [6, 9], textStyle: { color: "#1d2622", fontSize: 11 },
        formatter: function (p) {
          if (p.seriesType === "scatter") return p.name || "";
          return p.data && p.data.value ? p.data.value : "";
        }
      },
      geo: {
        map: "trips-china", roam: true, zoom: 7.2, center: [118.2, 31.0],
        itemStyle: { areaColor: "#efe8da", borderColor: "#d9cfbd", borderWidth: 0.5 },
        emphasis: { disabled: true }, select: { disabled: true },
        scaleLimit: { min: 1, max: 14 }
      },
      series: [
        {
          type: "scatter", coordinateSystem: "geo", symbolSize: 4,
          itemStyle: { color: "#1d2622", opacity: 0.8 },
          data: stations
        },
        {
          type: "lines", coordinateSystem: "geo", polyline: true, silent: true,
          lineStyle: { color: "#1d2622", width: 1.8, opacity: 0.8 },
          data: lines
        },
        {
          type: "scatter", coordinateSystem: "geo", symbolSize: 7,
          itemStyle: { color: "#4a6b52" },
          data: hikeDots
        }
      ]
    };
  }

  function renderTabs() {
    var box = document.getElementById("tp-year-tabs");
    var years = flightYears();
    var items = [{ y: "all", label: "全部" }].concat(years.map(function (y) { return { y: y, label: y }; }));
    box.innerHTML = items.map(function (it) {
      var active = it.y === currentYear ? ' class="is-active"' : "";
      return '<button type="button" data-year="' + it.y + '"' + active + '>' + it.label + '</button>';
    }).join("");
    box.onclick = function (e) {
      var b = e.target.closest("button[data-year]");
      if (!b) return;
      var y = b.getAttribute("data-year");
      if (y === currentYear) return;
      currentYear = y;
      try { history.replaceState(null, "", "#" + y); } catch (err) { location.hash = y; }
      renderTabs();
      if (worldChart) worldChart.setOption(worldOption(), true);
      document.getElementById("tp-map-caption").textContent = caption(currentYear);
    };
  }

  function initMaps() {
    if (!window.echarts) {
      document.getElementById("tp-map-world").innerHTML = '<p class="tp-nothing">地图脚本没有加载，检查网络后刷新。</p>';
      return;
    }
    Promise.all([
      fetch("data/world-echarts.json").then(function (r) { return r.json(); }),
      fetch("data/china-provinces.geojson").then(function (r) { return r.json(); })
    ]).then(function (res) {
      echarts.registerMap("trips-world", res[0]);
      var china = res[1];
      echarts.registerMap("trips-china", {
        type: "FeatureCollection",
        features: china.features.filter(function (f) {
          return !(f.properties && f.properties.adcode === "100000_JD");
        })
      });

      var h = window.location.hash.replace("#", "");
      if (h && (h === "all" || flightYears().indexOf(h) >= 0)) currentYear = h;
      renderTabs();
      document.getElementById("tp-map-caption").textContent = caption(currentYear);

      worldChart = echarts.init(document.getElementById("tp-map-world"), null, { renderer: "canvas" });
      worldChart.setOption(worldOption());

      regionChart = echarts.init(document.getElementById("tp-map-region"), null, { renderer: "canvas" });
      regionChart.setOption(regionOption());

      window.addEventListener("resize", function () {
        if (worldChart) worldChart.resize();
        if (regionChart) regionChart.resize();
      });
      window.addEventListener("hashchange", function () {
        var y = window.location.hash.replace("#", "");
        if (y && (y === "all" || flightYears().indexOf(y) >= 0) && y !== currentYear) {
          currentYear = y;
          renderTabs();
          if (worldChart) worldChart.setOption(worldOption(), true);
          document.getElementById("tp-map-caption").textContent = caption(currentYear);
        }
      });
    }).catch(function () {
      document.getElementById("tp-map-world").innerHTML = '<p class="tp-nothing">地图数据没有加载。</p>';
    });
  }

  renderStats();
  renderLog(flights, "tp-flight-list", "tp-total-line", "flight");
  renderLog(trains, "tp-train-list", "tp-train-total", "train");
  renderHikes();
  initMaps();
})();
