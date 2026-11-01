(function () {
  "use strict";

  var DATA_URL = "data/eclipses.json";

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function pad(n) { return String(n).padStart(2, "0"); }

  function parseDateParts(dateStr) {
    var p = String(dateStr).split("-").map(Number);
    return { y: p[0], m: p[1], d: p[2] };
  }
  function parseTimeParts(timeStr) {
    var p = String(timeStr).split(":").map(Number);
    return { h: p[0] || 0, m: p[1] || 0, s: p[2] || 0 };
  }
  function makeUTC(dateStr, timeStr) {
    var d = parseDateParts(dateStr);
    var t = parseTimeParts(timeStr);
    return new Date(Date.UTC(d.y, d.m - 1, d.d, t.h, t.m, t.s));
  }
  function offsetMinutes(offset) {
    var m = /^([+-])(\d{2}):(\d{2})$/.exec(String(offset || ""));
    if (!m) return 0;
    return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3]));
  }
  function utcFromLocal(dateStr, timeStr, offset) {
    return new Date(makeUTC(dateStr, timeStr).getTime() - offsetMinutes(offset) * 60000);
  }
  function fmtUTC(date) {
    return pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds());
  }
  function fmtBeijing(date) {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
      }).format(date);
    } catch (e) {
      return "—";
    }
  }
  function fmtDuration(seconds) {
    var s = Math.max(0, Number(seconds) || 0);
    var m = Math.floor(s / 60);
    return m + ":" + pad(s % 60);
  }
  function offsetLabel(offset) { return "UTC" + (offset || ""); }
  function eventType(ev) { return ev.type === "annular" ? "日环食" : "日全食"; }
  function eventStatus(ev, primaryId) {
    if (ev.status === "past") return "已过去";
    if (ev.id === primaryId) return "主目标";
    return eventType(ev);
  }

  function renderEvents(data, primaryId) {
    var wrap = $("eclipse-events");
    wrap.innerHTML = data.events.map(function (ev) {
      var cls = "eclipse-event";
      if (ev.status === "past") cls += " is-past";
      if (ev.id === primaryId) cls += " is-primary";
      var meta = [];
      if (ev.greatest) {
        if (ev.greatest.local) meta.push("当地（原文）：" + ev.greatest.local);
        if (ev.greatest.utc) {
          meta.push("UTC：" + ev.greatest.utc);
          var utcDate = makeUTC(ev.id, ev.greatest.utc);
          meta.push("北京：" + fmtBeijing(utcDate));
        }
        if (ev.greatest.duration_seconds != null) {
          meta.push((ev.type === "annular" ? "最长环食：" : "最长全食：") + fmtDuration(ev.greatest.duration_seconds) + "（" + ev.greatest.duration_seconds + " 秒）");
        }
        if (ev.greatest.where) meta.push("最大食位置：" + ev.greatest.where);
      }
      if (ev.spain && ev.spain.note) meta.push(ev.spain.note);
      if (ev.cities && ev.cities.length) {
        meta.push("城市：" + ev.cities.map(function (c) {
          return c.name + (c.duration_seconds != null ? " " + fmtDuration(c.duration_seconds) : "");
        }).join(" / "));
      }
      return '<article class="' + cls + '">' +
        '<div class="eclipse-event-top"><span class="eclipse-event-date">' + esc(ev.id) + '</span>' +
        '<span class="eclipse-event-type">' + esc(eventStatus(ev, primaryId)) + '</span></div>' +
        '<h3>' + esc(ev.title) + '</h3>' +
        '<p>' + esc(ev.path) + '</p>' +
        (meta.length ? '<p class="event-meta">' + meta.map(esc).join("<br>") + "</p>" : "") +
        "</article>";
    }).join("");
  }

  function cityTimes(city, dateStr) {
    var out = {};
    ["partial_start", "totality_start", "maximum", "totality_end", "partial_end"].forEach(function (key) {
      if (city[key]) out[key] = utcFromLocal(dateStr, city[key], city.utc_offset);
    });
    return out;
  }

  function cityDetails(city, dateStr) {
    var t = cityTimes(city, dateStr);
    function range(a, b, fmt) { return fmt(t[a]) + "–" + fmt(t[b]); }
    return '<div class="eclipse-city-detail">' +
      '<p><b>全食</b> ' + esc(city.totality_start) + "–" + esc(city.totality_end) +
      "（当地 " + esc(offsetLabel(city.utc_offset)) + "）</p>" +
      '<p><b>UTC</b> ' + range("totality_start", "totality_end", fmtUTC) + "</p>" +
      '<p><b>北京</b> ' + range("totality_start", "totality_end", fmtBeijing) + "</p>" +
      '<p><b>最大食</b> 当地 ' + esc(city.maximum) + " · UTC " + fmtUTC(t.maximum) + " · 北京 " + fmtBeijing(t.maximum) + "</p>" +
      '<p><b>偏食</b> 当地 ' + esc(city.partial_start) + "–" + esc(city.partial_end) +
      "（UTC " + fmtUTC(t.partial_start) + "–" + fmtUTC(t.partial_end) + "）</p>" +
      "</div>";
  }

  function renderCities(data, primaryId) {
    var cities = data.cities_in_path.slice().sort(function (a, b) {
      return (b.totality_seconds - a.totality_seconds) ||
        a.country.localeCompare(b.country, "zh") ||
        a.name.localeCompare(b.name, "zh");
    });
    var maxSeconds = cities.reduce(function (m, c) { return Math.max(m, c.totality_seconds); }, 1);
    var rank = new Map();
    cities.forEach(function (c, i) { rank.set(c.name, i + 1); });

    var select = $("eclipse-country");
    var countries = [];
    cities.forEach(function (c) { if (countries.indexOf(c.country) < 0) countries.push(c.country); });
    countries.sort(function (a, b) { return a.localeCompare(b, "zh"); });
    countries.forEach(function (country) {
      var opt = document.createElement("option");
      opt.value = country;
      opt.textContent = country;
      select.appendChild(opt);
    });

    function draw() {
      var selected = select.value;
      var list = selected === "all" ? cities : cities.filter(function (c) { return c.country === selected; });
      $("eclipse-city-count").textContent = list.length + " / " + cities.length + " 个带内城市";
      $("eclipse-city-grid").innerHTML = list.map(function (c) {
        var width = Math.max(4, Math.round(c.totality_seconds / maxSeconds * 100));
        return '<details class="eclipse-city">' +
          "<summary>" +
          '<div class="eclipse-city-top"><span class="eclipse-city-rank">#' + pad(rank.get(c.name)) + "</span>" +
          '<span class="eclipse-city-duration">' + fmtDuration(c.totality_seconds) + "</span></div>" +
          '<div class="eclipse-city-name">' + esc(c.name) + '<span class="eclipse-city-country">' + esc(c.country) + "</span></div>" +
          '<div class="eclipse-city-time">全食 ' + esc(c.totality_start) + "–" + esc(c.totality_end) + " · " + esc(offsetLabel(c.utc_offset)) + "</div>" +
          '<div class="eclipse-city-bar"><i style="width:' + width + '%"></i></div>' +
          "</summary>" + cityDetails(c, primaryId) + "</details>";
      }).join("");
    }
    select.addEventListener("change", draw);
    draw();

    $("eclipse-partial-grid").innerHTML = data.cities_partial.map(function (c) {
      return '<article class="eclipse-partial"><b>' + esc(c.name) + "</b>" +
        "<span>" + esc(c.country) + "</span><em>0 秒 · 仅偏食</em></article>";
    }).join("");
  }

  function renderRoutes(data) {
    var s = data.site_strategy;
    function route(title, kicker, obj) {
      var html = '<article class="eclipse-route"><p class="route-kicker">' + esc(kicker) + "</p><h3>" + esc(title) + "</h3>";
      if (obj.best) html += "<p><b>首选</b> " + esc(obj.best) + "</p>";
      if (obj.second) html += "<p><b>次选</b> " + esc(obj.second) + "</p>";
      if (obj.backup) html += "<p><b>备选</b> " + esc(obj.backup) + "</p>";
      if (obj.corridor) html += "<p><b>走廊</b> " + esc(obj.corridor) + "</p>";
      if (obj.risks && obj.risks.length) {
        html += "<ul>" + obj.risks.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ul>";
      }
      return html + "</article>";
    }
    $("eclipse-routes").innerHTML = route("摩洛哥线", "MOROCCO", s.morocco) + route("埃及线", "EGYPT", s.egypt);
    $("eclipse-rule").textContent = s.rule_of_thumb + " ｜ " + s.trap;
  }

  function renderField(data) {
    var labels = { tangier: "丹吉尔", luxor: "卢克索" };
    $("eclipse-sun").innerHTML = Object.keys(data.sun_geometry).map(function (key) {
      var g = data.sun_geometry[key];
      return '<article class="eclipse-sun"><h3>' + esc(labels[key] || key) +
        (g.estimated ? '<span class="estimate">估算</span>' : "") + "</h3>" +
        "<p>方位 " + esc(g.azimuth_deg) + "° · 高度 " + esc(g.altitude_deg) + "°</p>" +
        "<p>" + esc(g.note) + "</p></article>";
    }).join("");

    $("eclipse-safety-list").innerHTML = data.safety.map(function (s) {
      return "<li>" + esc(s) + "</li>";
    }).join("");

    $("eclipse-figures").innerHTML = data.figures.map(function (f) {
      var src = "images/eclipse/" + f.file.split("/").pop();
      return '<figure class="eclipse-figure"><img src="' + esc(src) + '" alt="' + esc(f.desc) + '" loading="lazy">' +
        '<figcaption>' + esc(f.desc) +
        '<span class="fig-warning">示意图：海岸线与街区为简化示意，不可用于导航。</span>' +
        "</figcaption></figure>";
    }).join("");
  }

  function renderSources(data) {
    $("eclipse-sources").innerHTML = data.sources.map(function (s) {
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + "</a></li>";
    }).join("");
  }

  function renderCountdown(data, primary) {
    var label = $("eclipse-countdown");
    var note = $("eclipse-countdown-note");
    var meta = $("eclipse-countdown-meta");
    if (!primary || !primary.greatest || !primary.greatest.utc) {
      label.textContent = "—";
      note.textContent = "数据缺少主事件最大食时刻。";
      return;
    }
    var target = makeUTC(primary.id, primary.greatest.utc);
    var running = true;

    function tick() {
      if (!running) return;
      var diff = target.getTime() - Date.now();
      if (diff <= 0) {
        label.textContent = "已发生";
        note.textContent = "主事件的最大食时刻已经过去。";
        return;
      }
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor(diff % 86400000 / 3600000);
      var mins = Math.floor(diff % 3600000 / 60000);
      var secs = Math.floor(diff % 60000 / 1000);
      label.textContent = days + " 天 " + pad(hours) + ":" + pad(mins) + ":" + pad(secs);
    }
    tick();
    setInterval(tick, 1000);

    var dur = primary.greatest.duration_seconds != null
      ? " · 最长 " + fmtDuration(primary.greatest.duration_seconds) + "（" + primary.greatest.duration_seconds + " 秒）"
      : "";
    note.textContent = primary.greatest.where + " · " + primary.greatest.utc + " UTC" + dur;

    var tangier = data.cities_in_path.find(function (c) { return c.name_en === "Tangier"; });
    var luxor = data.cities_in_path.find(function (c) { return c.name_en === "Luxor"; });
    var lines = [];
    if (tangier) {
      var t = utcFromLocal(primary.id, tangier.totality_start, tangier.utc_offset);
      lines.push("丹吉尔全食开始：当地 " + tangier.totality_start + "（" + offsetLabel(tangier.utc_offset) + "） · UTC " + fmtUTC(t) + " · 北京 " + fmtBeijing(t));
    }
    if (luxor) {
      var l = utcFromLocal(primary.id, luxor.totality_start, luxor.utc_offset);
      lines.push("卢克索全食开始：当地 " + luxor.totality_start + "（" + offsetLabel(luxor.utc_offset) + "） · UTC " + fmtUTC(l) + " · 北京 " + fmtBeijing(l));
    }
    meta.innerHTML = lines.map(esc).join("<br>");
  }

  function init(data) {
    $("eclipse-version").textContent = "数据版本 v" + data.meta.version + " · 更新于 " + data.meta.updated;
    $("eclipse-footer-version").textContent = "数据版本 v" + data.meta.version + " · 更新于 " + data.meta.updated;
    $("eclipse-next").textContent = "下一场 · " + data.meta.primary_event + " · 日全食";
    $("eclipse-city-heading").textContent = data.cities_in_path.length + " 个带内城市：先选城市，再选国家";
    var primary = data.events.find(function (ev) { return ev.id === data.meta.primary_event; });
    if (primary) {
      $("eclipse-primary").textContent = primary.id + " · " + primary.title;
      $("eclipse-path").textContent = primary.path;
    }
    renderCountdown(data, primary);
    renderEvents(data, data.meta.primary_event);
    renderCities(data, data.meta.primary_event);
    renderRoutes(data);
    renderField(data);
    renderSources(data);
  }

  fetch(DATA_URL, { cache: "no-store" })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(init)
    .catch(function (err) {
      var box = $("eclipse-error");
      box.hidden = false;
      box.textContent = "日食数据读取失败：" + err.message + "。请通过本地服务器或线上站点打开本页。";
      $("eclipse-countdown").textContent = "—";
      $("eclipse-countdown-note").textContent = "未能读取 data/eclipses.json。";
    });
})();
