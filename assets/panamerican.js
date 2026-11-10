(function () {
  "use strict";
  var D = window.PANAMERICAN;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v || ""; }
  var colors = { us: "#8f3f31", mx: "#a85a3f", bz: "#8a6338", gt: "#6e6048", sv: "#7a6a3f", hn: "#5f6b4f", cr: "#3f6655", pa: "#2f5d55", co: "#4f5878", ec: "#5f5a7a", pe: "#7a4f5f", bo: "#8a6a4f", cl: "#3e5f63", ar: "#7b5b6b", pat: "#5d5f8a" };
  var map, layer, allMarkers = [], current = "all", maps = [];

  function addTiles(m) {
    GB_BASEMAP(m);
  }
  function colorOf(c) { return colors[c.id] || "#8f3f31"; }
  function popup(p, c) {
    var tag = p.mode === "air" ? "航段 · 人飞抵，无公路" : "原文路线";
    return '<b>' + esc(p.name) + '</b><div style="font-size:9px;color:#6b6258">' + esc(c.name) + ' · ' + tag + '</div>';
  }
  // 把一条国家路线拆成公路段 + 航段；mode:"air" 的点表示飞到该点
  function segmentsOf(c) {
    var segs = [], cur = [];
    c.route.forEach(function (p, i) {
      if (i > 0 && p.mode === "air") {
        var prev = c.route[i - 1];
        if (cur.length > 1) segs.push({ pts: cur, air: false });
        cur = [];
        segs.push({ pts: [[prev.lat, prev.lng], [p.lat, p.lng]], air: true });
        return;
      }
      cur.push([p.lat, p.lng]);
    });
    if (cur.length > 1) segs.push({ pts: cur, air: false });
    return segs;
  }
  function drawRoutes(target, c, weight, opacity) {
    segmentsOf(c).forEach(function (s) {
      if (s.air) {
        L.polyline(s.pts, { color: "#8a7f72", weight: 2, opacity: .75, dashArray: "4 8" })
          .addTo(target).bindTooltip("航段：没有公路连接，人是飞过去的");
      } else {
        L.polyline(s.pts, { color: colorOf(c), weight: weight, opacity: opacity, lineCap: "round" }).addTo(target);
      }
    });
  }
  function drawAll() {
    layer.clearLayers(); allMarkers = [];
    var bounds = [];
    D.countries.forEach(function (c) {
      if (!c.route.length) return;
      if (c.route.length > 1) drawRoutes(layer, c, 3, .8);
      c.route.forEach(function (p) {
        var m = L.circleMarker([p.lat, p.lng], { radius: 5, color: "#fff", weight: 1.5, fillColor: colorOf(c), fillOpacity: 1 })
          .addTo(layer).bindPopup(popup(p, c), { maxWidth: 220 });
        allMarkers.push(m); bounds.push([p.lat, p.lng]);
      });
    });
    // Darién Gap 仅画一条虚线提示，不是公路
    var pa = D.countries.filter(function (c) { return c.id === "pa"; })[0];
    var co = D.countries.filter(function (c) { return c.id === "co"; })[0];
    if (pa && co && pa.route.length && co.route.length) {
      L.polyline([[pa.route[pa.route.length - 1].lat, pa.route[pa.route.length - 1].lng], [co.route[0].lat, co.route[0].lng]], {
        color: "#a94738", weight: 2, opacity: .65, dashArray: "3 7"
      }).addTo(layer).bindTooltip("Darién Gap：海运，不是公路");
    }
    if (bounds.length) map.fitBounds(L.latLngBounds(bounds), { padding: [30, 30] });
    document.getElementById("pa-map-note").textContent = "已核实路段 · 洛杉矶 → Puerto Williams（虚线为航段）";
  }
  function drawCountry(c) {
    layer.clearLayers();
    if (!c.route.length) return;
    drawRoutes(layer, c, 4, .9);
    c.route.forEach(function (p) {
      L.circleMarker([p.lat, p.lng], { radius: 6, color: "#fff", weight: 1.5, fillColor: colorOf(c), fillOpacity: 1 })
        .addTo(layer).bindPopup(popup(p, c), { maxWidth: 220 });
    });
    map.fitBounds(L.latLngBounds(pointsOf(c)), { padding: [35, 35], maxZoom: 9 });
    document.getElementById("pa-map-note").textContent = c.name + " · " + c.routeText;
  }
  function selectCountry(id) {
    current = id;
    document.querySelectorAll("#pa-filter button").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-country") === id); });
    if (id === "all") drawAll(); else {
      var c = D.countries.filter(function (x) { return x.id === id; })[0];
      if (c) drawCountry(c);
    }
  }

  if (D.overview) {
    var leadEl = document.getElementById("pa-overview-lead");
    if (leadEl) leadEl.textContent = D.overview.lead || "";
    var ovEl = document.getElementById("pa-overview");
    if (ovEl) ovEl.innerHTML = (D.overview.facts || []).map(function (f) {
      return '<div><span>' + esc(f.k) + '</span><b>' + esc(f.v) + '</b>' +
        (f.note ? '<em>' + esc(f.note) + '</em>' : '') + '</div>';
    }).join("");
    var ovNote = document.getElementById("pa-overview-note");
    if (ovNote) ovNote.textContent = D.overview.note || "";
  }

  if (D.north) {
    var nIntro = document.getElementById("pa-north-intro");
    if (nIntro) nIntro.textContent = D.north.intro || "";
    var nEl = document.getElementById("pa-north");
    if (nEl) nEl.innerHTML = (D.north.segments || []).map(function (s) {
      return '<article class="pa-north-card" id="pa-north-' + esc(s.id) + '">' +
        '<div class="pa-north-top"><span>' + esc(s.where) + '</span><b>' + esc(s.status) + '</b></div>' +
        '<h3>' + esc(s.name) + '</h3>' +
        '<p class="pa-north-route">' + esc(s.route) + '</p>' +
        '<p class="pa-north-note">' + esc(s.note) + '</p></article>';
    }).join("");
  }

  function legsHtml(legs) {
    return (legs || []).map(function (l) {
      return '<tr><td><b>' + esc(l.from) + '</b> → ' + esc(l.to) + '</td><td>' + esc(l.km) + '</td><td>' + esc(l.time) + '</td><td>' + esc(l.note) + '</td></tr>';
    }).join("");
  }

  if (D.north && D.north.route) {
    var NR = D.north.route;
    setText("pa-route-lead", NR.lead);
    setText("pa-route-total", NR.total);
    setText("pa-route-note", NR.note);
    setText("pa-route-mapnote", NR.mapNote);
    var rLegs = document.getElementById("pa-route-legs");
    if (rLegs) rLegs.innerHTML = legsHtml(NR.legs);
    var rStops = document.getElementById("pa-route-stops");
    if (rStops) rStops.innerHTML = (NR.stops || []).map(function (s) {
      return '<div class="pa-stop"><h4>' + esc(s.name) + '</h4><p>' + esc(s.note) + '</p></div>';
    }).join("");
    var rCamp = document.getElementById("pa-route-camp");
    if (rCamp) rCamp.innerHTML = (NR.camp || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
    var rEl = document.getElementById("pa-route-map");
    if (rEl && window.L && NR.points && NR.points.length) {
      var rm = L.map(rEl, { scrollWheelZoom: false }).setView([NR.points[0].lat, NR.points[0].lng], 4);
      if (typeof GB_BASEMAP === "function") GB_BASEMAP(rm);
      else L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", { maxZoom: 17 }).addTo(rm);
      var rPts = NR.points.map(function (p) { return [p.lat, p.lng]; });
      L.polyline(rPts, { color: "#8f3f31", weight: 3, opacity: .9, lineCap: "round" }).addTo(rm);
      NR.points.forEach(function (p) {
        L.circleMarker([p.lat, p.lng], { radius: 5, color: "#fff", weight: 1.5, fillColor: "#8f3f31", fillOpacity: 1 })
          .addTo(rm).bindTooltip(p.name);
      });
      (NR.side || []).forEach(function (p) {
        L.circleMarker([p.lat, p.lng], { radius: 5, color: "#8f3f31", weight: 1.5, fillColor: "#fff", fillOpacity: 1 })
          .addTo(rm).bindTooltip(p.name + "（支线）");
      });
      var allPts = rPts.concat((NR.side || []).map(function (p) { return [p.lat, p.lng]; }));
      rm.fitBounds(L.latLngBounds(allPts), { padding: [24, 24] });
      maps.push(rm);
    }
  }

  if (D.north && D.north.dempster) {
    var DM = D.north.dempster;
    setText("pa-dempster-lead", DM.lead);
    setText("pa-dempster-total", DM.total);
    setText("pa-dempster-note", DM.note);
    setText("pa-dempster-mapnote", DM.mapNote);
    var legsEl = document.getElementById("pa-dempster-legs");
    if (legsEl) legsEl.innerHTML = (DM.legs || []).map(function (l) {
      return '<tr><td><b>' + esc(l.from) + '</b> → ' + esc(l.to) + '</td><td>' + esc(l.km) + '</td><td>' + esc(l.time) + '</td><td>' + esc(l.note) + '</td></tr>';
    }).join("");
    var dFacts = document.getElementById("pa-dempster-facts");
    if (dFacts) dFacts.innerHTML = (DM.facilities || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
    var dCaut = document.getElementById("pa-dempster-cautions");
    if (dCaut) dCaut.innerHTML = (DM.cautions || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
    var dEl = document.getElementById("pa-dempster-map");
    if (dEl && window.L && DM.points && DM.points.length) {
      var dm = L.map(dEl, { scrollWheelZoom: false }).setView([DM.points[0].lat, DM.points[0].lng], 5);
      if (typeof GB_BASEMAP === "function") GB_BASEMAP(dm);
      else L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", { maxZoom: 17 }).addTo(dm);
      var dPts = DM.points.map(function (p) { return [p.lat, p.lng]; });
      L.polyline(dPts, { color: "#8f3f31", weight: 3, opacity: .9, lineCap: "round" }).addTo(dm);
      DM.points.forEach(function (p) {
        L.circleMarker([p.lat, p.lng], { radius: 5, color: "#fff", weight: 1.5, fillColor: "#8f3f31", fillOpacity: 1 })
          .addTo(dm).bindTooltip(p.name);
      });
      dm.fitBounds(L.latLngBounds(dPts), { padding: [24, 24] });
      maps.push(dm);
    }
  }

  document.getElementById("pa-stages").innerHTML = D.stages.map(function (s) {
    return '<div class="pa-stage"><div class="pa-stage-top"><span>' + esc(s.days) + '</span><b>' + esc(s.km) + '</b></div><h3>' + esc(s.name) + '</h3><p>' + esc(s.text) + '</p></div>';
  }).join("");

  if (D.ending) {
    var endEl = document.getElementById("pa-ending");
    if (endEl) endEl.innerHTML = '<b>' + esc(D.ending.title) + '：</b>' + esc(D.ending.text) +
      (D.ending.note ? '<span class="pa-ending-note">' + esc(D.ending.note) + '</span>' : '');
  }

  document.getElementById("pa-countries").innerHTML = D.countries.map(function (c) {
    var extracted = c.status === "extracted";
    return '<section class="pa-country-block" id="pa-' + c.id + '"><div class="pa-country-head"><h3>' + esc(c.name) + ' · ' + esc(c.en) + '</h3>' +
      '<span>' + esc(c.dates) + ' · ' + esc(c.km) + (extracted ? ' · <button class="pa-view-map" data-country="' + c.id + '">在地图看这段</button>' : ' · <em>待补</em>') + '</span></div>' +
      (extracted ? '<div class="pa-country-map" id="pa-mini-' + c.id + '"></div><div class="pa-country-body"><div><p class="pa-route-line"><b>路线：</b>' + esc(c.routeText) + '</p><div class="pa-highlights">' +
        c.highlights.map(function (h) { return '<div class="pa-highlight"><h4>' + esc(h.name) + '</h4><p>' + esc(h.note) + '</p></div>'; }).join("") + '</div></div>' +
        '<div class="pa-tips"><b>原文经验摘要</b><ul>' + c.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul></div></div>' :
        '<div class="pa-missing">' + esc(c.routeText) + '。这一国在 PDF 中没有对应章节，暂不填写景点和经验。</div>') + '</section>';
  }).join("");

  D.countries.forEach(function (c) {
    if (c.status !== "extracted") return;
    var el = document.getElementById("pa-mini-" + c.id);
    if (!el) return;
    var mini = L.map(el, { scrollWheelZoom: false, attributionControl: false }).setView([c.route[0].lat, c.route[0].lng], 7);
    GB_BASEMAP(mini);
    var pts = c.route.map(function (p) { return [p.lat, p.lng]; });
    drawRoutes(mini, c, 3, .9);
    c.route.forEach(function (p) {
      L.circleMarker([p.lat, p.lng], { radius: 4, color: "#fff", weight: 1.3, fillColor: colorOf(c), fillOpacity: 1 })
        .addTo(mini).bindTooltip(p.name);
    });
    if (pts.length > 1) mini.fitBounds(L.latLngBounds(pts), { padding: [15, 15], maxZoom: 8 });
    maps.push(mini);
  });

  document.getElementById("pa-filter").innerHTML = '<button type="button" data-country="all" class="is-active">总路线</button>' +
    D.countries.filter(function (c) { return c.status === "extracted"; }).map(function (c) {
      return '<button type="button" data-country="' + c.id + '">' + esc(c.name) + '</button>';
    }).join("");
  document.getElementById("pa-filter").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-country]"); if (b) selectCountry(b.getAttribute("data-country"));
  });
  document.getElementById("pa-countries").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-country]"); if (b) {
      selectCountry(b.getAttribute("data-country"));
      document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  document.getElementById("pa-gap-text").textContent = D.darien.text;
  document.getElementById("pa-gap-steps").innerHTML = D.darien.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("");
  document.getElementById("pa-sources").innerHTML = D.sources.map(function (s) { return '<li>' + (s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a>' : esc(s.name)) + '</li>'; }).join("");

  map = L.map("pa-map", { scrollWheelZoom: false }).setView([10, -75], 4);
  addTiles(map); layer = L.layerGroup().addTo(map);
  drawAll();
  window.addEventListener("resize", function () { maps.forEach(function (m) { m.invalidateSize(); }); });
})();
