(function () {
  "use strict";
  var D = window.TRIPS || {};
  var flights = Array.isArray(D.flights) ? D.flights : [];
  var trains = Array.isArray(D.trains) ? D.trains : [];
  var hikes = Array.isArray(D.hikes) ? D.hikes : [];
  var placesByYear = (D.placesByYear && typeof D.placesByYear === "object") ? D.placesByYear : {};

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
    "杭州东": [120.2140, 30.2900],
    "台北": [121.5170, 25.0478],
    "板桥": [121.4590, 25.0140],
    "桃园": [121.2140, 25.0130],
    "新竹": [121.0400, 24.8080],
    "苗栗": [120.8250, 24.6050],
    "台中": [120.6150, 24.1125]
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
    document.getElementById("tp-years").textContent = placeYears().length;
    document.getElementById("tp-places").textContent = uniquePlaces();
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

  function renderHikes() {
    var box = document.getElementById("tp-hike-list");
    if (!hikes.length) {
      box.innerHTML = '<p class="tp-nothing">还没有徒步记录。</p>';
      return;
    }
    var list = hikes.slice().sort(function (a, b) {
      return String(b.month).localeCompare(String(a.month));
    });
    box.innerHTML = list.map(function (h, i) {
      return '<article class="tp-hike">' +
        '<div class="tp-hike-head"><div>' +
          '<h3>' + esc(h.name || "未命名线路") + '</h3>' +
          '<p class="tp-hike-meta">' + esc(h.month || "") + ' · ' +
            (h.km != null ? h.km + ' km' : "") +
            (h.ascent != null ? ' · 爬升 ' + h.ascent + ' m' : "") +
            (h.high != null ? ' · 最高 ' + h.high + ' m' : "") +
          '</p>' +
          (h.note ? '<p class="tp-hike-note">' + esc(h.note) + '</p>' : '') +
        '</div><p class="tp-hike-points">' + (h.points || (h.path || []).length) + ' 点</p></div>' +
        '<div class="tp-hike-map" id="tp-hike-map-' + i + '"></div>' +
        '<p class="tp-map-note">GPS 抽稀轨迹 · 底图 © OpenStreetMap contributors</p>' +
      '</article>';
    }).join("");

    if (!window.L) return;
    list.forEach(function (h, i) {
      var el = document.getElementById("tp-hike-map-" + i);
      if (!el || !h.path || h.path.length < 2) return;
      var map = L.map(el, { scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
      }).addTo(map);
      var line = L.polyline(h.path, { color: "#4a6b52", weight: 3, opacity: 0.95, lineJoin: "round" }).addTo(map);
      L.circleMarker(h.path[0], { radius: 4, color: "#a8402f", weight: 2, fillColor: "#fffdf7", fillOpacity: 1 }).addTo(map).bindTooltip("起终点");
      map.fitBounds(line.getBounds(), { padding: [24, 24] });
      L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    });
  }

  function placeYears() { return Object.keys(placesByYear).sort(); }

  function uniquePlaces() {
    var seen = {}, n = 0;
    placeYears().forEach(function (y) {
      (placesByYear[y] || []).forEach(function (p) {
        if (!seen[p]) { seen[p] = 1; n++; }
      });
    });
    return n;
  }

  function renderPlaces() {
    var box = document.getElementById("tp-places-list");
    var years = placeYears().reverse();
    var first = {};
    placeYears().forEach(function (y) {
      (placesByYear[y] || []).forEach(function (p) { if (!(p in first)) first[p] = y; });
    });
    var records = 0;
    box.innerHTML = years.map(function (y) {
      var list = placesByYear[y] || [];
      records += list.length;
      return '<div class="tp-place-year"><b>' + esc(y) + '</b>' +
        '<div class="tp-place-chips">' + list.map(function (p) {
          return '<span class="tp-place' + (first[p] === y ? ' is-new' : '') + '">' + esc(p) + '</span>';
        }).join("") + '</div>' +
        '<span class="tp-place-count">' + list.length + '</span></div>';
    }).join("");
    document.getElementById("tp-places-total").textContent =
      years.length + " 个年份 · " + uniquePlaces() + " 个国家与地区 · " + records + " 条年度记录";
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

  function railFit(lines) {
    var lngs = [], lats = [];
    lines.forEach(function (l) {
      l.coords.forEach(function (c) { lngs.push(c[0]); lats.push(c[1]); });
    });
    var minLng = Math.min.apply(null, lngs), maxLng = Math.max.apply(null, lngs);
    var minLat = Math.min.apply(null, lats), maxLat = Math.max.apply(null, lats);
    var span = Math.max(maxLng - minLng, maxLat - minLat);
    var zoom = span > 30 ? 2.2 : span > 18 ? 2.8 : span > 12 ? 3.6 : span > 8 ? 4.6 : span > 5 ? 5.8 : span > 3 ? 7 : 8.5;
    return { zoom: zoom, center: [(minLng + maxLng) / 2, (minLat + maxLat) / 2] };
  }

  function regionOption() {
    var lines = [
      { coords: [RAIL["上海虹桥"], RAIL["南京南"], RAIL["合肥南"], RAIL["武汉"]], value: "沪—宁—合—汉 铁路" },
      { coords: [RAIL["上海虹桥"], RAIL["杭州东"]], value: "沪—杭 铁路" },
      { coords: [RAIL["台北"], RAIL["板桥"], RAIL["桃园"], RAIL["新竹"], RAIL["苗栗"], RAIL["台中"]], value: "台北—台中 高铁" }
    ];
    var POS = { "上海虹桥": "right", "南京南": "top", "合肥南": "left", "武汉": "left", "杭州东": "top",
                "台北": "right", "台中": "bottom" };
    var stations = ["上海虹桥", "南京南", "合肥南", "武汉", "杭州东", "台北", "台中"].map(function (n) {
      return {
        name: n, value: RAIL[n],
        label: { show: true, position: POS[n] || "right", distance: 5, color: "#8a938c", fontSize: 9,
                 formatter: function (p) { return p.name; } }
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
        map: "trips-china", roam: true, zoom: railFit(lines).zoom, center: railFit(lines).center,
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
  renderPlaces();
  initMaps();
})();
