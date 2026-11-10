/* 目的地页渲染：从 window.WORLD_IDEAS 里取某个 destination 及其 ideas
 *
 * 页面在 body 上标 data-destination="norway"。
 * 只渲染数据；页面上的「怎么串」「还没查的」仍写在 HTML 里（那是编辑判断，不是数据）。
 */
(function () {
  "use strict";

  var D = window.WORLD_IDEAS || {};
  var root = document.getElementById("wp-stones");
  if (!root) return;

  var destId = document.body.getAttribute("data-destination") || "norway";
  var dest = (D.destinations || []).filter(function (d) { return d.id === destId; })[0];
  var ideas = (D.ideas || []).filter(function (i) { return i.destinationId === destId; });

  var STATUS = { seed: "种子", checked: "查过", want: "想去", executable: "可执行" };
  var layout = "sections";
  if (dest && dest.layout === "grid") layout = "grid";
  if (dest && dest.layout === "route") layout = "route";

  var route = null;
  ideas.forEach(function (i) { if (i.route && i.route.segments) route = i.route; });

  function node(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
  }

  function num(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function renderStats() {
    var km = 0, ascent = 0;
    ideas.forEach(function (i) {
      km += i.km || 0;
      ascent += i.ascentM || 0;
    });
    var c = document.getElementById("wp-count");
    var k = document.getElementById("wp-km");
    var a = document.getElementById("wp-ascent");
    var s = document.getElementById("wp-states");
    if (c) c.textContent = ideas.length;
    if (k) k.textContent = "约 " + num(km);
    if (a) a.textContent = "约 " + num(Math.round(ascent / 100) * 100);
    if (s) {
      var set = {};
      ideas.forEach(function (i) { if (i.province) set[i.province] = 1; });
      s.textContent = Object.keys(set).length;
    }

    var stopsEl = document.getElementById("wp-stops");
    var segsEl = document.getElementById("wp-segments");
    if (route && (stopsEl || segsEl)) {
      var total = 0;
      route.segments.forEach(function (seg) { total += (seg.stops || []).length; });
      if (stopsEl) stopsEl.textContent = total;
      if (segsEl) segsEl.textContent = route.segments.length;
    }
  }

  /* 紧凑模式：按区域分块，每块一张卡片网格（条目多时用） */

  var seq = { n: 0 };

  function byPriority(a, b) { return (a.priority || 0) - (b.priority || 0); }

  function itemNode(idea) {
    seq.n++;
    var art = node("article", "wp-item");
    art.id = idea.id;
    art.setAttribute("data-s", idea.status || "seed");

    var top = node("div", "wp-item-top");
    top.appendChild(node("span", "wp-item-no", String(seq.n).padStart(2, "0")));
    top.appendChild(node("span", "wp-item-type", idea.type || "其他"));
    top.appendChild(node("span", "wp-item-state", STATUS[idea.status] || "种子"));
    art.appendChild(top);

    var h = node("h4", "wp-item-title", idea.title || "");
    if (idea.titleEn) {
      h.appendChild(document.createTextNode(" "));
      h.appendChild(node("em", "", idea.titleEn));
    }
    art.appendChild(h);

    var meta = [idea.province, idea.city].filter(Boolean).join(" · ");
    if (meta) art.appendChild(node("p", "wp-item-meta", meta));
    if (idea.why) art.appendChild(node("p", "wp-item-why", idea.why));
    if (idea.note) art.appendChild(node("p", "wp-item-note", idea.note));

    return art;
  }

  function regionBlock(title, subtitle, list) {
    var sec = node("section", "wp-region");
    var head = node("div", "wp-region-head");
    var left = node("div");
    if (subtitle) left.appendChild(node("p", "wp-region-kicker", subtitle));
    left.appendChild(node("h3", "", title));
    head.appendChild(left);
    head.appendChild(node("span", "wp-region-count", list.length + " 条"));
    sec.appendChild(head);

    var grid = node("div", "wp-items");
    list.forEach(function (i) { grid.appendChild(itemNode(i)); });
    sec.appendChild(grid);
    return sec;
  }

  function renderGrid() {
    var regions = (dest && Array.isArray(dest.regions)) ? dest.regions : [];
    var used = {};
    regions.forEach(function (r) {
      var list = ideas.filter(function (i) { return i.regionId === r.id; }).sort(byPriority);
      if (!list.length) return;
      list.forEach(function (i) { used[i.id] = 1; });
      root.appendChild(regionBlock(r.title, r.subtitle, list));
    });
    var rest = ideas.filter(function (i) { return !used[i.id]; }).sort(byPriority);
    if (rest.length) root.appendChild(regionBlock("其他", "还没归入区域", rest));
  }

  /* 路线模式：按段落列有序点位 */

  function statChip(text, cls) {
    var el = node("span", cls || "", text);
    return el;
  }

  function renderRoute() {
    if (!route) {
      var none = node("div", "wp-callout");
      none.appendChild(node("b", "", "这一页还没有路线数据。"));
      root.appendChild(none);
      return;
    }

    var meta = node("div", "wp-route-meta");
    if (route.direction) meta.appendChild(statChip(route.direction, "wp-route-dir"));
    if (route.base) meta.appendChild(statChip("起点 " + route.base));
    if (route.distanceKm) meta.appendChild(statChip("一圈约 " + route.distanceKm + " km（待核）"));
    if (route.days) meta.appendChild(statChip(route.days + " 天"));
    root.appendChild(meta);

    var n = 0;
    route.segments.forEach(function (seg) {
      var sec = node("section", "wp-seg");
      var head = node("div", "wp-seg-head");
      head.appendChild(node("h3", "", seg.title || ""));
      head.appendChild(node("span", "", (seg.stops || []).length + " 站"));
      sec.appendChild(head);
      if (seg.note) sec.appendChild(node("p", "wp-seg-note", seg.note));

      var ol = node("ol", "wp-stops");
      (seg.stops || []).forEach(function (stop) {
        n++;
        var li = node("li", "wp-stop");
        li.appendChild(node("span", "wp-stop-no", String(n).padStart(2, "0")));

        var body = node("div", "wp-stop-body");
        var line = node("p", "wp-stop-line");
        line.appendChild(node("b", "", stop.name || ""));
        if (stop.kind) line.appendChild(node("span", "wp-stop-kind", stop.kind));
        body.appendChild(line);
        if (stop.note) body.appendChild(node("p", "wp-stop-note", stop.note));
        li.appendChild(body);

        ol.appendChild(li);
      });
      sec.appendChild(ol);
      root.appendChild(sec);
    });
  }

  function renderStones() {
    if (!ideas.length) {
      var empty = node("div", "wp-callout");
      empty.appendChild(node("b", "", "这一页还没有条目。"));
      empty.appendChild(document.createTextNode("在 world-ideas-data.js 里加 destinationId 为 " + destId + " 的条目即可。"));
      root.appendChild(empty);
      return;
    }

    if (layout === "grid") { renderGrid(); return; }
    if (layout === "route") { renderRoute(); return; }

    ideas.slice().sort(function (a, b) { return (a.priority || 0) - (b.priority || 0); }).forEach(function (idea, idx) {
      var art = node("article", "wp-stone");
      art.id = idea.id;

      var head = node("header", "wp-stone-head");
      head.appendChild(node("span", "wp-no", String(idx + 1).padStart(2, "0")));

      var titles = node("div");
      var h3 = node("h3", "", idea.title || "");
      if (idea.titleEn) {
        h3.appendChild(document.createTextNode(" "));
        h3.appendChild(node("em", "", idea.titleEn));
      }
      titles.appendChild(h3);
      var where = [idea.place, idea.city].filter(Boolean).join(" · ");
      if (where) titles.appendChild(node("p", "wp-where", where));
      head.appendChild(titles);

      var badge = node("span", "wp-badge", STATUS[idea.status] || "种子");
      badge.setAttribute("data-s", idea.status || "seed");
      head.appendChild(badge);
      art.appendChild(head);

      if (idea.facts && idea.facts.length) {
        var facts = node("div", "wp-facts");
        idea.facts.forEach(function (f) {
          var cell = node("div");
          cell.appendChild(node("span", "", f.k));
          cell.appendChild(node("b", "", f.v));
          facts.appendChild(cell);
        });
        art.appendChild(facts);
      }

      if (idea.why) {
        var why = node("p", "wp-why");
        why.appendChild(node("b", "", "为什么记下"));
        why.appendChild(document.createTextNode(idea.why));
        art.appendChild(why);
      }

      if (idea.access) {
        var access = node("div", "wp-block");
        access.appendChild(node("h4", "", "怎么去"));
        access.appendChild(node("p", "", idea.access));
        art.appendChild(access);
      }

      if (idea.notes && idea.notes.length) {
        var notes = node("div", "wp-block");
        notes.appendChild(node("h4", "", "要注意"));
        var ul = node("ul");
        idea.notes.forEach(function (n) { ul.appendChild(node("li", "", n)); });
        notes.appendChild(ul);
        art.appendChild(notes);
      }

      if (idea.sources && idea.sources.length) {
        var src = node("p", "wp-src", "来源：");
        idea.sources.forEach(function (s, i) {
          if (i) src.appendChild(document.createTextNode(" · "));
          var a = node("a", "", s.title);
          a.href = s.url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          src.appendChild(a);
        });
        art.appendChild(src);
      }

      root.appendChild(art);
    });
  }

  function renderSources() {
    var list = document.getElementById("wp-sources");
    if (!list) return;
    var seen = {}, out = [];
    ideas.forEach(function (i) {
      (i.sources || []).forEach(function (s) {
        if (!s.url || seen[s.url]) return;
        seen[s.url] = 1;
        out.push(s);
      });
    });
    if (!out.length) {
      list.appendChild(node("li", "", "暂无来源。"));
      return;
    }
    out.forEach(function (s) {
      var li = node("li");
      var a = node("a", "", s.title);
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function renderMeta() {
    if (D.updated) {
      var el = document.getElementById("wp-updated");
      if (el) el.textContent = D.updated;
    }
    if (dest && dest.title) {
      var t = document.getElementById("wp-dest-title");
      if (t) t.textContent = dest.title;
    }
  }

  /* 路线图：用条目自带的经纬度在页面内画 SVG，不依赖外部底图 */

  function routeStops() {
    var out = [];
    if (!route) return out;
    route.segments.forEach(function (seg) {
      (seg.stops || []).forEach(function (st) { out.push(st); });
    });
    return out;
  }

  function svgEl(tag, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }

  function renderMap() {
    var host = document.getElementById("wp-map");
    if (!host || !route) return;

    var stops = routeStops();
    var pts = stops.filter(function (s) {
      return typeof s.lat === "number" && typeof s.lon === "number";
    });
    if (pts.length < 3) return;

    var H = 760, padX = 88, padY = 44, Wmax = 560;
    var lats = pts.map(function (p) { return p.lat; });
    var lons = pts.map(function (p) { return p.lon; });
    var minLat = Math.min.apply(null, lats), maxLat = Math.max.apply(null, lats);
    var minLon = Math.min.apply(null, lons), maxLon = Math.max.apply(null, lons);
    var midLat = (minLat + maxLat) / 2;
    var kx = Math.cos(midLat * Math.PI / 180);

    var spanX = (maxLon - minLon) * kx || 0.0001;
    var spanY = (maxLat - minLat) || 0.0001;
    var scale = Math.min((Wmax - padX * 2) / spanX, (H - padY * 2) / spanY);
    var W = Math.round(spanX * scale + padX * 2);
    var cx = (minLon + maxLon) / 2, cy = midLat;

    function xy(p) {
      return [
        W / 2 + (p.lon - cx) * kx * scale,
        H / 2 - (p.lat - cy) * scale
      ];
    }

    var svg = svgEl("svg", {
      viewBox: "0 0 " + W + " " + H,
      role: "img",
      "aria-label": "洱海环湖路线示意图，共 " + pts.length + " 个定位点"
    });
    svg.setAttribute("class", "wp-map-svg");

    var ring = pts.map(function (p) {
      var c = xy(p);
      return c[0].toFixed(1) + "," + c[1].toFixed(1);
    }).join(" ");

    /* 环线围合出的近似湖面 */
    svg.appendChild(svgEl("polygon", { points: ring, class: "wp-map-lake" }));

    /* 顺时针方向箭头：在几段上各放一个小三角 */
    [2, 6, 10, 14].forEach(function (i) {
      var a = xy(pts[i]), b = xy(pts[(i + 1) % pts.length]);
      var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      var ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
      svg.appendChild(svgEl("path", {
        d: "M -6 -5 L 6 0 L -6 5 Z",
        class: "wp-map-arrow",
        transform: "translate(" + mx.toFixed(1) + "," + my.toFixed(1) + ") rotate(" + ang.toFixed(1) + ")"
      }));
    });

    svg.appendChild(svgEl("polyline", { points: ring + " " + ring.split(" ")[0], class: "wp-map-route" }));

    /* 湖名 */
    var center = xy({ lat: midLat, lon: (minLon + maxLon) / 2 });
    var lakeName = svgEl("text", { x: center[0], y: center[1] + 6, class: "wp-map-lakename" });
    lakeName.textContent = "洱 海";
    svg.appendChild(lakeName);

    pts.forEach(function (s) {
      var idx = stops.indexOf(s) + 1;
      var c = xy(s);
      var g = svgEl("g", { class: "wp-map-stop" + (idx === 1 ? " is-start" : "") });
      g.appendChild(svgEl("circle", { cx: c[0], cy: c[1], r: 10.5 }));
      var t = svgEl("text", { x: c[0], y: c[1] + 3.2, "text-anchor": "middle" });
      t.textContent = String(idx);
      g.appendChild(t);
      var title = svgEl("title");
      title.textContent = idx + " " + s.name + (s.kind ? " · " + s.kind : "");
      g.appendChild(title);
      svg.appendChild(g);
    });

    /* 北箭头 */
    var n = svgEl("g", { class: "wp-map-north", transform: "translate(" + (W - 34) + ",40)" });
    n.appendChild(svgEl("path", { d: "M0,-16 L7,8 L0,2 L-7,8 Z" }));
    var nt = svgEl("text", { x: 0, y: 24, "text-anchor": "middle" });
    nt.textContent = "N";
    n.appendChild(nt);
    svg.appendChild(n);

    /* 比例尺：按纬度换算，1° ≈ 111 km */
    var kmPerPx = 111 / scale;
    var barKm = 10;
    var barPx = barKm / kmPerPx;
    var sx = 46, sy = H - 34;
    var sb = svgEl("g", { class: "wp-map-scale" });
    sb.appendChild(svgEl("line", { x1: sx, y1: sy, x2: sx + barPx, y2: sy }));
    sb.appendChild(svgEl("line", { x1: sx, y1: sy - 5, x2: sx, y2: sy + 5 }));
    sb.appendChild(svgEl("line", { x1: sx + barPx, y1: sy - 5, x2: sx + barPx, y2: sy + 5 }));
    var st = svgEl("text", { x: sx + barPx / 2, y: sy - 9, "text-anchor": "middle" });
    st.textContent = barKm + " km（≈）";
    sb.appendChild(st);
    svg.appendChild(sb);

    host.textContent = "";
    host.appendChild(svg);
  }

  renderStats();
  renderStones();
  renderSources();
  renderMeta();
  renderMap();
})();
