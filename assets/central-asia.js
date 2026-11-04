(function () {
  "use strict";
  var D = window.CENTRAL_ASIA;
  if (!D) return;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var maps = [];
  var color = { "文化": "#8f3f31", "自然": "#3f6655" };
  var allSites = [];
  D.countries.forEach(function (c) {
    c.sites.forEach(function (s) { s.country = c.name; allSites.push(s); });
  });
  function shared(s) {
    return /丝绸之路|西天山|图兰/.test(s.name);
  }
  function sitePopup(s) {
    return '<b>' + esc(s.name) + '</b><div class="ca-pop-meta">' + esc(s.country) + ' · ' + esc(s.place) + ' · ' + s.year + ' · ' + esc(s.type) + (shared(s) ? ' · 跨国' : '') + '</div><p>' + esc(s.note) + '</p><p style="font-size:9px;color:#6b6258">UNESCO ' + esc(s.unesco) + '</p>';
  }
  function siteIcon(s) {
    return L.divIcon({
      className: "ca-pin-wrap",
      html: '<span class="ca-pin" style="--pin:' + (color[s.type] || "#8f3f31") + '">' + esc(s.unesco.slice(-2)) + '</span>',
      iconSize: [23, 23], iconAnchor: [11, 11]
    });
  }
  function starIcon() {
    return L.divIcon({ className: "ca-pin-wrap", html: '<span class="ca-star">★</span>', iconSize: [22, 22], iconAnchor: [11, 11] });
  }
  function addTiles(map) {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
  }
  function routeLine(map, weight, opacity) {
    var pts = D.route.map(function (p) { return [p.lat, p.lng]; });
    return L.polyline(pts, { color: "#8a6338", weight: weight || 2.5, opacity: opacity || .8, dashArray: "6 6", lineCap: "round" }).addTo(map);
  }

  // 总图：路线 + 全部遗产 + 中国关联点
  (function initAll() {
    var map = L.map("ca-all-map", { scrollWheelZoom: false }).setView([42.0, 69.0], 5);
    addTiles(map); routeLine(map);
    var bounds = [];
    allSites.forEach(function (s) {
      var m = L.marker([s.lat, s.lng], { icon: siteIcon(s) }).addTo(map);
      m.bindPopup(sitePopup(s), { maxWidth: 280 }); bounds.push([s.lat, s.lng]);
    });
    D.chinaLinks.forEach(function (x) {
      var m = L.marker([x.lat, x.lng], { icon: starIcon() }).addTo(map);
      m.bindPopup('<b>★ ' + esc(x.name) + '</b><div class="ca-pop-meta">' + esc(x.level) + ' · ' + esc(x.where) + '</div><p>' + esc(x.why) + '</p>', { maxWidth: 300 });
      bounds.push([x.lat, x.lng]);
    });
    D.route.forEach(function (p) {
      if (p.kind === "border") {
        L.circleMarker([p.lat, p.lng], { radius: 5, color: "#a94738", fillColor: "#f5f1e8", fillOpacity: 1, weight: 2 }).addTo(map).bindPopup('<b>' + esc(p.name) + '</b>');
      }
      bounds.push([p.lat, p.lng]);
    });
    map.fitBounds(L.latLngBounds(bounds), { padding: [35, 35] });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    maps.push(map);
  })();

  // 路线条
  document.getElementById("ca-route-strip").innerHTML = D.route.map(function (p, i) {
    return '<span>' + (i ? '<i>→</i> ' : '') + '<b>' + esc(p.name) + '</b></span>';
  }).join("");

  // 口岸表
  document.getElementById("ca-borders").innerHTML = '<div class="ca-border-row head"><span>从</span><span>到</span><span>建议口岸/方向</span><em>状态</em></div>' +
    D.borders.map(function (b) {
      return '<div class="ca-border-row"><span>' + esc(b.from) + '</span><span>' + esc(b.to) + '</span><b>' + esc(b.crossing) + '</b><em>' + esc(b.status) + '</em></div>';
    }).join("");

  // 五国分图
  document.getElementById("ca-countries").innerHTML = D.countries.map(function (c, ci) {
    return '<section class="ca-country-block"><div class="ca-country-head"><h3>' + esc(c.name) + ' · ' + esc(c.en) + '</h3><span>' + c.sites.length + ' 项世界遗产</span></div>' +
      '<div class="ca-country-body"><div class="ca-country-map" id="ca-map-' + c.id + '"></div><div class="ca-country-sites">' +
      c.sites.map(function (s) {
        return '<div class="ca-site"><div class="ca-site-top"><span>' + s.year + ' · ' + esc(s.type) + (shared(s) ? '<span class="ca-badge">跨国</span>' : '') + '</span><b>' + esc(s.place) + '</b></div>' +
          '<h4>' + esc(s.name) + '</h4><p class="en">' + esc(s.en) + '</p><p>' + esc(s.note) + '</p></div>';
      }).join("") + '</div></div></section>';
  }).join("");
  D.countries.forEach(function (c) {
    var el = document.getElementById("ca-map-" + c.id);
    var map = L.map(el, { scrollWheelZoom: false }).setView(c.center, c.zoom);
    addTiles(map);
    var b = [];
    c.sites.forEach(function (s) {
      L.marker([s.lat, s.lng], { icon: siteIcon(s) }).addTo(map).bindPopup(sitePopup(s), { maxWidth: 280 });
      b.push([s.lat, s.lng]);
    });
    if (b.length) map.fitBounds(L.latLngBounds(b), { padding: [28, 28], maxZoom: c.zoom + 1 });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    maps.push(map);
  });

  // 中国关联点
  var levelName = {};
  D.levels.forEach(function (l) { levelName[l.id] = l.name; });
  document.getElementById("ca-china-links").innerHTML = D.chinaLinks.map(function (x) {
    return '<article class="ca-china-card"><div class="ca-china-card-top"><span>' + esc(levelName[x.level] || x.level) + '</span><b>' + esc(x.where) + '</b></div>' +
      '<h3>★ ' + esc(x.name) + '</h3><p class="where">' + esc(x.en) + '</p><p>' + esc(x.why) + '</p><p class="access"><b>到达：</b>' + esc(x.access) + '</p></article>';
  }).join("");

  var zh = document.getElementById("ca-zh003");
  if (zh && D.zh003) zh.innerHTML = D.zh003.map(function (x) {
    return '<article class="ca-zh-card"><span>ZH-003 · ' + esc(x.country) + '</span><h3>' + esc(x.name) + '</h3><p>' + esc(x.note) + '</p></article>';
  }).join("");

  // 人物节
  var P = D.person;
  if (P && document.getElementById("ca-xian-timeline")) {
    document.getElementById("ca-xian-kicker").innerHTML = esc(P.kicker);
    document.getElementById("ca-xian-title").textContent = P.title;
    document.getElementById("ca-xian-side").innerHTML = P.side || "";
    document.getElementById("ca-xian-lede").textContent = P.lede;
    document.getElementById("ca-xian-timeline").innerHTML = P.timeline.map(function (t) {
      return '<li><time>' + esc(t.date) + '</time><p>' + esc(t.text) + '</p></li>';
    }).join("");
    document.getElementById("ca-xian-note").textContent = P.note;
    document.getElementById("ca-xian-note2").textContent = P.note2;
    document.getElementById("ca-xian-source").textContent = P.source;
  }

  document.getElementById("ca-sources").innerHTML = D.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
  }).join("");

  window.addEventListener("resize", function () { maps.forEach(function (m) { m.invalidateSize(); }); });
})();
