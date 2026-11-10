/* 大溪地 · 渲染逻辑 v0.2 */
(function () {
  "use strict";
  var D = window.TAHITI;
  if (!D) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------- 概览 ---------- */

  var statsEl = document.getElementById("th-stats");
  if (statsEl) {
    statsEl.innerHTML = D.stats.map(function (s) {
      return "<div><b>" + esc(s.n) + "</b><span>" + esc(s.l) + "</span></div>";
    }).join("");
  }

  var calloutEl = document.getElementById("th-callout");
  if (calloutEl && D.callout) calloutEl.innerHTML = "<b>这是 v" + esc(D.version) + "：</b>" + esc(D.callout);

  var introEl = document.getElementById("th-intro");
  if (introEl && D.intro) introEl.textContent = D.intro;

  var refEl = document.getElementById("th-ref");
  if (refEl && D.ref) refEl.textContent = D.ref;

  /* ---------- 总图 ---------- */

  var KIND = { wh: "#a8402f", town: "#2f5d50", hub: "#1d2622", sport: "#b0812c", resort: "#557486", hist: "#8a6338" };
  var GLYPH = { wh: "遗", town: "镇", hub: "机", sport: "浪", resort: "宿", hist: "史" };

  function pin(color, glyph) {
    return L.divIcon({
      className: "th-pin-wrap",
      html: '<span class="th-pin" style="--pin:' + color + '">' + glyph + "</span>",
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });
  }

  var mapEl = document.getElementById("th-map-society");
  var mapEl2 = document.getElementById("th-map-marquesas");
  var byId = {};
  D.places.forEach(function (p) { byId[p.id] = p; });

  function buildMap(el, group, routeIds) {
    if (!el || !window.L) return;
    var map = L.map(el, { scrollWheelZoom: false });
    GB_BASEMAP(map);

    var pts = (routeIds || []).map(function (id) {
      var p = byId[id];
      return p ? [p.lat, p.lng] : null;
    }).filter(Boolean);

    if (pts.length > 1) {
      L.polyline(pts, {
        color: "#8a6338",
        weight: 2,
        opacity: .8,
        dashArray: "5 6",
        lineCap: "round"
      }).addTo(map);
    }

    var bounds = [];
    D.places.filter(function (p) { return p.group === group; }).forEach(function (p) {
      var m = L.marker([p.lat, p.lng], { icon: pin(KIND[p.kind] || "#a8402f", GLYPH[p.kind] || "·") }).addTo(map);
      m.bindPopup(
        "<b>" + esc(p.name) + "</b>" +
        '<div class="th-pop-meta">' + esc(p.zh) + "</div><p>" + esc(p.note) + "</p>",
        { maxWidth: 260 }
      );
      bounds.push([p.lat, p.lng]);
    });

    if (bounds.length) map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 });
  }

  buildMap(mapEl, "society", D.routeSociety);
  buildMap(mapEl2, "marquesas", D.routeMarquesas);

  /* ---------- 本岛环岛图 ---------- */

  var driveEl = document.getElementById("th-map-drive");
  if (driveEl && window.L && D.drive && D.driveRoute) {
    var dmap = L.map(driveEl, { scrollWheelZoom: false });
    GB_BASEMAP(dmap);

    var line = L.polyline(D.driveRoute, {
      color: "#a8402f",
      weight: 3,
      opacity: .85,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(dmap);

    var dbounds = [];
    D.drive.stops.forEach(function (s) {
      var icon = L.divIcon({
        className: "th-num-wrap",
        html: '<span class="th-num">' + s.n + "</span>",
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      L.marker([s.lat, s.lng], { icon: icon }).addTo(dmap)
        .bindPopup("<b>" + esc(s.n) + ". " + esc(s.name) + "</b>" +
          '<div class="th-pop-meta">' + esc(s.tag) + "</div><p>" + esc(s.note) + "</p>",
          { maxWidth: 260 });
      dbounds.push([s.lat, s.lng]);
    });

    function fitDrive() {
      dmap.invalidateSize();
      dmap.fitBounds(line.getBounds(), { padding: [16, 16] });
    }
    fitDrive();
    window.addEventListener("load", fitDrive);
    setTimeout(fitDrive, 600);

    var sumEl = document.getElementById("th-drive-sum");
    if (sumEl) {
      sumEl.textContent = "全程约 " + D.drive.km + " 公里，" + D.drive.hours + "。停靠点按顺时针编号：机场 → 帕皮提 → 北岸 → 东岸 → Taravao → Teahupo'o → 西岸 → 回机场。";
    }

    var stopsEl = document.getElementById("th-drive-stops");
    if (stopsEl) {
      stopsEl.innerHTML = D.drive.stops.map(function (s) {
        return '<li class="th-stop">' +
          '<span class="th-stop-n">' + s.n + "</span>" +
          "<div><b>" + esc(s.name) + '<em>' + esc(s.tag) + "</em></b>" +
          "<p>" + esc(s.note) + "</p></div></li>";
      }).join("");
    }
  }

  /* ---------- 五段 ---------- */

  var stripEl = document.getElementById("th-legstrip");
  if (stripEl) {
    stripEl.innerHTML = D.legs.map(function (l, i) {
      var sep = i ? ' <i>→</i> ' : "";
      return sep + "<b>" + esc(l.zh) + "</b>";
    }).join("") + ' <span style="margin-left:6px">（第三段与第四段之间须回帕皮提转机）</span>';
  }

  var legsEl = document.getElementById("th-legs");
  if (legsEl) {
    legsEl.innerHTML = D.legs.map(function (l) {
      var points = (l.points || []).map(function (p) {
        return '<div class="th-point">' +
          '<span class="th-point-t">' + esc(p.t) + "</span>" +
          "<div><b>" + esc(p.name) +
          (p.src ? '<span class="th-src">' + esc(p.src) + "</span>" : "") +
          "</b><p>" + esc(p.note) + "</p></div>" +
          "</div>";
      }).join("");
      return '<article class="th-leg">' +
        '<div class="th-leg-head">' +
        '<span class="th-leg-no">' + esc(l.no) + "</span>" +
        "<h3>" + esc(l.island) + "<em>" + esc(l.zh) + "</em></h3>" +
        '<span class="th-leg-days">' + esc(l.days) + "</span>" +
        "</div>" +
        '<div class="th-leg-meta">' +
        "<div><span>为什么去</span><p>" + esc(l.purpose) + "</p></div>" +
        "<div><span>怎么到</span><p>" + esc(l.transport) + "</p></div>" +
        "<div><span>住 / 车</span><p>" + esc(l.stay) + "<br>" + esc(l.drive) + "</p></div>" +
        "</div>" +
        '<div class="th-points">' + points + "</div>" +
        (l.caveat ? '<p class="th-leg-caveat">' + esc(l.caveat) + "</p>" : "") +
        "</article>";
    }).join("");
  }

  /* ---------- 驾照与取车 ---------- */

  var lic = D.licence;
  if (lic) {
    var setText = function (id, txt) {
      var el = document.getElementById(id);
      if (el && txt) el.textContent = txt;
    };
    setText("th-lic-kicker", lic.kicker);
    setText("th-lic-title", lic.title);

    var verdictEl = document.getElementById("th-lic-verdict");
    if (verdictEl) verdictEl.innerHTML = "<b>结论：</b>" + esc(lic.verdict);

    var licFacts = document.getElementById("th-lic-facts");
    if (licFacts) {
      licFacts.innerHTML = lic.facts.map(function (f) {
        return '<div class="th-lic-fact"><span>' + esc(f.t) + "</span><p>" + esc(f.b) + "</p></div>";
      }).join("");
    }

    var licIsl = document.getElementById("th-lic-islands");
    if (licIsl) {
      licIsl.innerHTML = lic.islands.map(function (i) {
        return '<div class="th-lic-island">' +
          "<b>" + esc(i.name) + "</b>" +
          '<em class="risk' + (i.risk === "高" ? " risk--high" : i.risk === "中" ? " risk--mid" : "") + '">' + esc(i.risk) + "</em>" +
          "<p>" + esc(i.note) + "</p></div>";
      }).join("");
    }

    var licCheck = document.getElementById("th-lic-check");
    if (licCheck) {
      licCheck.innerHTML = lic.checklist.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");
    }

    setText("th-lic-warn", lic.warn);
  }

  /* ---------- 世界遗产 ---------- */

  var whEl = document.getElementById("th-wh");
  if (whEl) {
    whEl.innerHTML = D.wh.map(function (w) {
      var facts = w.facts.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");
      return '<article class="th-wh-card">' +
        '<div class="th-wh-top"><b>UNESCO ' + esc(w.code) + "</b><span>" + esc(w.year) + " · " + esc(w.type) + "</span></div>" +
        "<h3>" + esc(w.name) + "</h3>" +
        '<p class="where">' + esc(w.zh) + " · " + esc(w.island) + "</p>" +
        '<p class="lede">' + esc(w.lede) + "</p>" +
        '<div class="th-wh-facts">' +
        "<div><span>标准</span><b style=\"font-weight:400\">" + esc(w.criteria) + "</b></div>" +
        "<div><span>面积</span><b style=\"font-weight:400\">" + esc(w.area) + "</b></div>" +
        "</div>" +
        "<ul>" + facts + "</ul>" +
        (w.components && w.components.length ?
          '<div class="th-wh-comp">' +
          '<div class="th-comp-row th-comp-head"><span>构成点</span><b>公顷</b></div>' +
          w.components.map(function (c) {
            return '<div class="th-comp-row' + (c.here ? " is-here" : "") + '">' +
              "<span>" + esc(c.name) + (c.here ? " ← 本次到这儿" : "") + "</span>" +
              "<b>" + c.area.toLocaleString("en-US") + "</b></div>";
          }).join("") +
          "</div>" : "") +
        '<p class="th-wh-todo">待核：' + esc(w.todo) + "</p>" +
        "</article>";
    }).join("");
  }

  /* ---------- 日程 ---------- */

  var daysEl = document.getElementById("th-days");
  if (daysEl) {
    daysEl.innerHTML = D.days.map(function (block) {
      var rows = block.rows.map(function (r) {
        return '<div class="th-day-row">' +
          '<span class="d">' + esc(r.d) + "</span>" +
          "<div><b>" + esc(r.t) + '<span class="tag">' + esc(r.tag) + "</span></b>" +
          "<p>" + esc(r.b) + "</p></div>" +
          "</div>";
      }).join("");
      return '<article class="th-day-block">' +
        "<h3>" + esc(block.title) + "</h3>" +
        "<p>" + esc(block.note) + "</p>" + rows +
        "</article>";
    }).join("");
  }

  /* ---------- 黑珍珠 ---------- */

  var pearlEl = document.getElementById("th-pearl");
  if (pearlEl) {
    var rows = D.pearl.points.map(function (p) {
      return '<div class="th-pearl-row"><b>' + esc(p.t) + "</b><p>" + esc(p.b) + "</p></div>";
    }).join("");
    pearlEl.innerHTML =
      '<p style="margin:0 0 10px;font-size:11.5px;line-height:1.9;color:var(--ink-2)">' + esc(D.pearl.lede) + "</p>" + rows;
  }

  /* ---------- 行前读物 ---------- */

  var booksEl = document.getElementById("th-books");
  if (booksEl && D.books) {
    booksEl.innerHTML = D.books.map(function (b) {
      return '<article class="th-book">' +
        '<span class="th-book-leg">' + esc(b.leg) + "</span>" +
        "<h3>" + esc(b.t) + "</h3>" +
        '<p class="th-book-a">' + esc(b.a) + "</p>" +
        "<p>" + esc(b.why) + "</p>" +
        "</article>";
    }).join("");
  }

  /* ---------- 待核与来源 ---------- */

  var todoN = document.getElementById("th-todo-n");
  if (todoN) todoN.textContent = String(D.todos.length);

  var todoEl = document.getElementById("th-todo");
  if (todoEl) {
    todoEl.innerHTML = D.todos.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  }

  var srcEl = document.getElementById("th-sources");
  if (srcEl) {
    srcEl.innerHTML = D.sources.map(function (s) {
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>";
    }).join("");
  }

  /* ---------- 页脚版本 ---------- */

  var foot = document.querySelector(".footer-inner");
  if (foot && !document.querySelector(".th-updated")) {
    var s = document.createElement("span");
    s.className = "th-updated";
    s.textContent = "资料截至 " + D.updated;
    var rights = foot.querySelector(".footer-rights");
    if (rights) foot.insertBefore(s, rights); else foot.appendChild(s);
  }
})();
