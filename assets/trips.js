(function () {
  "use strict";
  var D = window.TRIPS || {};
  var flights = Array.isArray(D.flights) ? D.flights : [];
  var trains = Array.isArray(D.trains) ? D.trains : [];
  var hikes = Array.isArray(D.hikes) ? D.hikes : [];
  var sports = Array.isArray(D.sports) ? D.sports : [];
  var placesByYear = (D.placesByYear && typeof D.placesByYear === "object") ? D.placesByYear : {};

  var AIR = {
    YIW: [120.0320, 29.3447], CAN: [113.2988, 23.3924], SZX: [113.8107, 22.6393],
    HGH: [120.4344, 30.2295], TSA: [121.5519, 25.0694], HKG: [113.9185, 22.3080],
    XIY: [108.7516, 34.4471], XNN: [102.0430, 36.5275], KTM: [85.3591, 27.6966],
    KUL: [101.7099, 2.7456], PVG: [121.8083, 31.1443], SHA: [121.3363, 31.1979],
    TPE: [121.2328, 25.0777], XMN: [118.1277, 24.5440], CMB: [79.8841, 7.1808],
    HRB: [126.2500, 45.6234], KIX: [135.2441, 34.4347],
    AUH: [54.6511, 24.4330], BEG: [20.3091, 44.8184], IST: [28.7519, 41.2753],
    SJJ: [18.3315, 43.8246], KYA: [32.5619, 37.9790], EVN: [44.3959, 40.1473],
    GYD: [50.0467, 40.4675], TBS: [44.9547, 41.6692], ALA: [77.0405, 43.3521],
    DPS: [115.1667, -8.7482], DIL: [125.5261, -8.5466], YIA: [110.0575, -7.9006],
    SVO: [37.4146, 55.9726], LED: [30.2625, 59.8003], KGD: [20.5926, 54.8900],
    KZN: [49.2787, 55.6062], PEK: [116.5975, 40.0799], OKA: [127.6459, 26.1958],
    DIG: [100.0603, 27.7933], KMG: [102.9292, 24.9924],
    ICN: [126.4407, 37.4602], PUS: [128.9382, 35.1795], FUK: [130.4507, 33.5859],
    WUH: [114.2081, 30.7838], HET: [111.8241, 40.8514], ERL: [112.0967, 43.4225],
    NZH: [117.3297, 49.5667], HNL: [-157.9224, 21.3187], NNG: [108.1722, 22.6083],
    SHE: [123.4833, 41.6398], CGQ: [125.6853, 43.9962], FOC: [119.6633, 25.9351],
    MFM: [113.5915, 22.1496], HAN: [105.8042, 21.2187], SGN: [106.6520, 10.8188],
    SYD: [151.1753, -33.9399], CNS: [145.7553, -16.8858], ZUH: [113.3764, 22.0064],
    SJW: [114.6963, 38.2807], BKK: [100.7501, 13.6900], LHW: [103.6205, 36.5152],
    NRT: [140.3929, 35.7720], HND: [139.7798, 35.5494], TFU: [104.4413, 30.3125],
    NKG: [118.8620, 31.7420], PKX: [116.4106, 39.5098], URC: [87.4742, 43.9071]
  };

  var worldChart = null;
  var currentYear = "all";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function kmTotal(list) { return list.reduce(function (s, x) { return s + (Number(x.km) || 0); }, 0); }
  function yearOf(x) { return String(x.month || "").slice(0, 4); }

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

  function renderStats() {
    var hikeKm = hikes.reduce(function (s, h) { return s + (Number(h.km) || 0); }, 0);
    var sportKm = sports.reduce(function (s, h) { return s + (Number(h.km) || 0); }, 0);
    document.getElementById("tp-flights").textContent = flights.length;
    document.getElementById("tp-trains").textContent = trains.length;
    document.getElementById("tp-hikes").textContent = hikes.length;
    document.getElementById("tp-sports").textContent = sports.length;
    document.getElementById("tp-km").textContent = fmt(Math.round(kmTotal(flights) + kmTotal(trains) + hikeKm + sportKm));
    document.getElementById("tp-places").textContent = uniquePlaces();

    document.getElementById("card-flights").textContent = flights.length;
    document.getElementById("card-flights-km").textContent = fmt(kmTotal(flights));
    document.getElementById("card-rails").textContent = trains.length;
    document.getElementById("card-rails-km").textContent = fmt(kmTotal(trains));
    document.getElementById("card-outdoors").textContent = hikes.length + sports.length;
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

  function shiftGeom(geom, d) {
    function walk(c) {
      if (typeof c[0] === "number") return [c[0] + d, c[1]];
      return c.map(walk);
    }
    return { type: geom.type, coordinates: walk(geom.coordinates) };
  }

  function gcPath(a, b) {
    var R = Math.PI / 180, Dg = 180 / Math.PI;
    var f1 = a[1] * R, l1 = a[0] * R, f2 = b[1] * R, l2 = b[0] * R;
    var df = f2 - f1, dl = l2 - l1;
    var hav = Math.sin(df / 2) * Math.sin(df / 2) +
      Math.cos(f1) * Math.cos(f2) * Math.sin(dl / 2) * Math.sin(dl / 2);
    var d = 2 * Math.asin(Math.sqrt(Math.max(0, Math.min(1, hav))));
    if (!isFinite(d) || d < 1e-9) return [[a[0], a[1]], [b[0], b[1]]];
    var n = Math.max(8, Math.min(64, Math.round(d * Dg / 3)));
    var pts = [];
    for (var i = 0; i <= n; i++) {
      var f = i / n;
      var A = Math.sin((1 - f) * d) / Math.sin(d), B = Math.sin(f * d) / Math.sin(d);
      var x = A * Math.cos(f1) * Math.cos(l1) + B * Math.cos(f2) * Math.cos(l2);
      var y = A * Math.cos(f1) * Math.sin(l1) + B * Math.cos(f2) * Math.sin(l2);
      var z = A * Math.sin(f1) + B * Math.sin(f2);
      pts.push([Math.atan2(y, x) * Dg, Math.atan2(z, Math.sqrt(x * x + y * y)) * Dg]);
    }
    for (var j = 1; j < pts.length; j++) {
      while (pts[j][0] - pts[j - 1][0] > 180) pts[j][0] -= 360;
      while (pts[j][0] - pts[j - 1][0] < -180) pts[j][0] += 360;
    }
    var mean = pts.reduce(function (s, p) { return s + p[0]; }, 0) / pts.length;
    var off = 0;
    while (mean + off < 0) off += 360;
    while (mean + off >= 360) off -= 360;
    pts.forEach(function (p) { p[0] += off; });
    return pts;
  }

  function to0(lon) { var x = lon % 360; return x < 0 ? x + 360 : x; }

  function worldOption() {
    var list = yearData(currentYear);
    var airports = {};
    list.forEach(function (f) {
      if (AIR[f.fromCode]) airports[f.fromCode] = AIR[f.fromCode];
      if (AIR[f.toCode]) airports[f.toCode] = AIR[f.toCode];
    });
    var arcs = list.map(function (f) {
      return {
        coords: gcPath(AIR[f.fromCode], AIR[f.toCode]),
        value: f.flight + "  " + f.from + " → " + f.to + "  " + fmt(f.km) + " km"
      };
    });
    var LABELED = { KTM: 1, KUL: 1, XNN: 1, XIY: 1, HKG: 1, TSA: 1, HNL: 1, SYD: 1 };
    var lngs = [], lats = [];
    arcs.forEach(function (a) {
      a.coords.forEach(function (c) { lngs.push(c[0]); lats.push(c[1]); });
    });
    var minLng = Math.min.apply(null, lngs), maxLng = Math.max.apply(null, lngs);
    var minLat = Math.min.apply(null, lats), maxLat = Math.max.apply(null, lats);
    if (!isFinite(minLng) || !isFinite(maxLng)) {
      minLng = -20; maxLng = 200; minLat = -10; maxLat = 60;
    }
    var padLng = Math.max((maxLng - minLng) * 0.18, 1.2);
    var padLat = Math.max((maxLat - minLat) * 0.18, 1.2);
    var bounds = [[minLng - padLng, maxLat + padLat], [maxLng + padLng, minLat - padLat]];
    var dots = Object.keys(airports).map(function (code) {
      return {
        name: code, value: [to0(airports[code][0]), airports[code][1]],
        label: { show: !!LABELED[code], position: "right", distance: 3, color: "#8a938c", fontSize: 9,
                 formatter: function (p) { return p.name; } }
      };
    });

    return {
      backgroundColor: "#f5f1e8",
      animationDuration: 500,
      tooltip: {
        trigger: "item", backgroundColor: "#fffdf7", borderColor: "#ddd4c4", borderWidth: 1,
        padding: [6, 9], textStyle: { color: "#1d2622", fontSize: 11 },
        formatter: function (p) { return p.data && p.data.value ? p.data.value : ""; }
      },
      geo: {
        map: "trips-world", roam: true, boundingCoords: bounds,
        itemStyle: { areaColor: "#efe8da", borderColor: "#d9cfbd", borderWidth: 0.6 },
        emphasis: { disabled: true }, select: { disabled: true },
        scaleLimit: { min: 1, max: 30 }
      },
      series: [
        { type: "scatter", coordinateSystem: "geo", silent: true, symbolSize: 4,
          itemStyle: { color: "#a8402f", opacity: 0.8 }, data: dots },
        { type: "lines", coordinateSystem: "geo", polyline: true,
          lineStyle: { color: "#a8402f", width: 1.15, opacity: 0.62, type: "dashed" },
          emphasis: { lineStyle: { opacity: 1, width: 1.8 } }, data: arcs }
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

  function initMap() {
    if (!window.echarts) return;
    fetch("data/world-echarts.json").then(function (r) { return r.json(); }).then(function (world) {
      var feats = [];
      [-360, 0, 360].forEach(function (d) {
        world.features.forEach(function (f) {
          feats.push({ type: "Feature", properties: f.properties, geometry: shiftGeom(f.geometry, d) });
        });
      });
      echarts.registerMap("trips-world", { type: "FeatureCollection", features: feats });
      var h = window.location.hash.replace("#", "");
      if (h && (h === "all" || flightYears().indexOf(h) >= 0)) currentYear = h;
      renderTabs();
      document.getElementById("tp-map-caption").textContent = caption(currentYear);
      worldChart = echarts.init(document.getElementById("tp-map-world"), null, { renderer: "canvas" });
      worldChart.setOption(worldOption());
      window.addEventListener("resize", function () { if (worldChart) worldChart.resize(); });
    }).catch(function () {});
  }

  renderStats();
  renderPlaces();
  initMap();
})();
