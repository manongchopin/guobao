/* 虚构人物档案 · 卡片墙 + 页内灯箱
 * - 数据来自 fictional-characters-data.js（window.FICTIONAL_CHARACTERS）
 * - 点小图在本页浮起大图，不跳转、不新开标签页
 * - Esc 关闭，← → 切上一位 / 下一位，点背景关闭
 * - 所有文字一律 textContent，不用 innerHTML
 */
(function () {
  "use strict";

  var D = window.FICTIONAL_CHARACTERS;
  var wall = document.getElementById("fc-wall");
  if (!wall) return;

  var lb = document.getElementById("fc-lb");
  var lbImg = document.getElementById("fc-lb-img");
  var lbKicker = document.getElementById("fc-lb-kicker");
  var lbName = document.getElementById("fc-lb-name");
  var lbRole = document.getElementById("fc-lb-role");
  var lbSummary = document.getElementById("fc-lb-summary");
  var lbFacts = document.getElementById("fc-lb-facts");
  var lbIndex = document.getElementById("fc-lb-index");
  var lbPrev = document.getElementById("fc-lb-prev");
  var lbNext = document.getElementById("fc-lb-next");
  var lbClose = document.getElementById("fc-lb-close");
  var emptyEl = document.getElementById("fc-empty");

  var list = [];
  if (D && Object.prototype.toString.call(D.characters) === "[object Array]") {
    list = D.characters.slice().sort(function (a, b) {
      return String(a.id) < String(b.id) ? -1 : 1;
    });
  }

  var universes = {};
  if (D && Object.prototype.toString.call(D.universes) === "[object Array]") {
    D.universes.forEach(function (u) { universes[u.id] = u; });
  }

  /* 一张卡片 = 一张定妆照；同一人物的额外定妆照（portraitVariants）
     紧跟在本人主照后面，共用同一份人物资料。 */
  var entries = [];
  list.forEach(function (c) {
    entries.push({
      char: c,
      src: c.portrait || "",
      label: "",
      alt: c.name + " 定妆照（虚构人物）"
    });
    if (Object.prototype.toString.call(c.portraitVariants) === "[object Array]") {
      c.portraitVariants.forEach(function (v) {
        entries.push({
          char: c,
          src: v.file || "",
          label: v.label || "另一版",
          alt: c.name + " " + (v.label || "") + " 定妆照（虚构人物）"
        });
      });
    }
  });

  function text(el, value) {
    if (!el) return;
    el.textContent = value === undefined || value === null ? "" : String(value);
  }

  function universeTitle(id) {
    return universes[id] ? universes[id].title : "";
  }

  function charName(id) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i].name;
    }
    return "";
  }

  function relationCount() {
    var seen = {};
    var n = 0;
    list.forEach(function (c) {
      (c.relationships || []).forEach(function (r) {
        var a = String(c.id);
        var b = String(r.targetId);
        var key = a < b ? a + "|" + b : b + "|" + a;
        if (!seen[key]) { seen[key] = true; n++; }
      });
    });
    return n;
  }

  /* ---------- 统计 ---------- */
  text(document.getElementById("fc-stat-characters"), list.length);
  text(document.getElementById("fc-stat-universes"), Object.keys(universes).length);
  text(document.getElementById("fc-stat-relations"), relationCount());
  text(document.getElementById("fc-stat-version"), D && D.version ? D.version : "0.2");
  text(document.getElementById("fc-count"), list.length ? list.length + " 人 · " + entries.length + " 张" : "");
  text(document.getElementById("fc-foot-count"), list.length);

  /* ---------- 卡片墙 ---------- */
  var frag = document.createDocumentFragment();

  entries.forEach(function (entry, i) {
    var c = entry.char;

    var card = document.createElement("button");
    card.type = "button";
    card.className = entry.label ? "fc-card fc-card--variant" : "fc-card";
    card.setAttribute("aria-label", "查看 " + c.name + (entry.label ? " " + entry.label : "") + " 的定妆照");

    var media = document.createElement("span");
    media.className = "fc-card-media";
    if (entry.label) media.setAttribute("data-label", entry.label);

    var img = document.createElement("img");
    img.src = entry.src;
    img.alt = entry.alt;
    img.width = 1024;
    img.height = 1792;
    img.loading = "lazy";
    img.decoding = "async";
    media.appendChild(img);

    var body = document.createElement("span");
    body.className = "fc-card-body";

    var name = document.createElement("b");
    name.textContent = c.name;

    var sub = document.createElement("span");
    sub.textContent = entry.label ? entry.label + " · " + (c.role || "") : (c.role || universeTitle(c.universeId));

    body.appendChild(name);
    body.appendChild(sub);

    card.appendChild(media);
    card.appendChild(body);

    card.addEventListener("click", function () { openAt(i); });
    frag.appendChild(card);
  });

  wall.appendChild(frag);

  if (!list.length) {
    if (emptyEl) emptyEl.hidden = false;
    wall.hidden = true;
    return;
  }

  /* ---------- 灯箱 ---------- */
  var current = -1;
  var lastFocus = null;
  var preloaded = {};

  function preload(i) {
    if (i < 0 || i >= entries.length) return;
    var src = entries[i].src;
    if (!src || preloaded[src]) return;
    preloaded[src] = true;
    var im = new Image();
    im.src = src;
  }

  function factRow(label, value) {
    if (!value) return null;
    var dt = document.createElement("dt");
    dt.textContent = label;
    var dd = document.createElement("dd");
    dd.textContent = value;
    return { dt: dt, dd: dd };
  }

  function renderFacts(c, entry) {
    if (!lbFacts) return;
    lbFacts.textContent = "";

    var rels = (c.relationships || []).map(function (r) {
      var who = charName(r.targetId) || r.targetId;
      return r.type ? who + " · " + r.type : who;
    }).filter(function (s) { return s; });

    var rows = [
      factRow("年龄", c.age),
      factRow("性别", c.gender),
      factRow("身份", c.role),
      factRow("所属", c.affiliation || universeTitle(c.universeId)),
      factRow("别名", (c.aliases || []).join("、")),
      factRow("版本", entry && entry.label ? entry.label : ""),
      factRow("关系", rels.join("；")),
      factRow("标签", (c.tags || []).join(" · ")),
      factRow("定妆照", c.portraitCredit)
    ];

    rows.forEach(function (row) {
      if (!row) return;
      lbFacts.appendChild(row.dt);
      lbFacts.appendChild(row.dd);
    });
  }

  function show(i) {
    if (!lb || i < 0 || i >= entries.length) return;
    current = i;
    var entry = entries[i];
    var c = entry.char;

    if (lbImg) {
      lbImg.src = entry.src;
      lbImg.alt = entry.alt;
    }

    text(lbKicker, (c.status === "published" ? "PUBLISHED" : "DRAFT") +
      (universeTitle(c.universeId) ? " · " + universeTitle(c.universeId) : ""));
    text(lbName, c.name);
    text(lbRole, entry.label ? entry.label + (c.role ? " · " + c.role : "") : (c.role || ""));
    text(lbSummary, c.summary || "");
    text(lbIndex, (i + 1) + " / " + entries.length);
    renderFacts(c, entry);

    preload(i + 1);
    preload(i - 1);
  }

  function openAt(i) {
    if (!lb) return;
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.classList.add("fc-lb-open");
    if (lbClose) lbClose.focus();
  }

  function close() {
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    document.body.classList.remove("fc-lb-open");
    if (lbImg) {
      lbImg.removeAttribute("src");
      lbImg.alt = "";
    }
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    lastFocus = null;
    current = -1;
  }

  function step(delta) {
    if (lb.hidden || current < 0) return;
    var next = current + delta;
    if (next < 0) next = entries.length - 1;
    if (next >= entries.length) next = 0;
    show(next);
  }

  if (lbClose) lbClose.addEventListener("click", close);
  if (lbPrev) lbPrev.addEventListener("click", function () { step(-1); });
  if (lbNext) lbNext.addEventListener("click", function () { step(1); });

  if (lb) {
    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });

    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
        return;
      }
      if (e.key === "Tab") {
        var focusables = [lbClose, lbPrev, lbNext].filter(Boolean);
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }
})();
