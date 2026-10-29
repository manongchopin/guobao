(function () {
  "use strict";

  var items = window.FORBIDDEN || [];
  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");
  var noteEl = document.getElementById("fx-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));

  var toolbarInner = document.querySelector(".toolbar-inner");
  var walkEl = document.createElement("span");
  walkEl.className = "walk-count";
  walkEl.id = "walk-count";
  if (toolbarInner) toolbarInner.appendChild(walkEl);

  var BATCHES = [
    { n: 1, label: "第一批", year: "2002" },
    { n: 2, label: "第二批", year: "2012" },
    { n: 3, label: "第三批", year: "2013" }
  ];

  var PROVINCES = [
    "北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省",
    "上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省",
    "湖北省","湖南省","广东省","广西壮族自治区","海南省","重庆市","四川省","贵州省",
    "云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区",
    "香港特别行政区","澳门特别行政区","台湾省"
  ];

  var VIEW_KEY = "forbidden-view";
  var state = { view: "batch", filter: "all" };

  function batchOf(n) {
    for (var i = 0; i < BATCHES.length; i++) if (BATCHES[i].n === n) return BATCHES[i];
    return { n: n, label: "第" + n + "批", year: "" };
  }

  function placements() {
    var n = 0;
    items.forEach(function (it) { n += it.provinces.length; });
    return n;
  }

  function updateWalk() {
    var got = items.filter(function (it) { return window.FBVisited && FBVisited.has(it.fid); }).length;
    walkEl.innerHTML = "已走 <b>" + got + "</b>/" + items.length;
  }

  /* ---------- 侧栏 ---------- */

  function renderIndex() {
    var title = state.view === "batch" ? "批次索引" : "省份索引";
    var total = state.view === "batch" ? items.length : placements();
    var html = '<p class="ci-title">' + title + '</p>' +
      '<button type="button" class="ci-item' + (state.filter === "all" ? " is-active" : "") +
      '" data-d="all" aria-pressed="' + (state.filter === "all") + '"><span>全部</span><b>' + total + '</b></button>';

    if (state.view === "batch") {
      BATCHES.forEach(function (b) {
        var n = items.filter(function (it) { return it.batch === b.n; }).length;
        html += '<button type="button" class="ci-item' + (state.filter === String(b.n) ? " is-active" : "") +
          '" data-d="' + b.n + '" aria-pressed="' + (state.filter === String(b.n)) + '"><span>' + b.label + '</span><b>' + n + '</b></button>';
      });
    } else {
      PROVINCES.forEach(function (p) {
        var n = items.filter(function (it) { return it.provinces.indexOf(p) !== -1; }).length;
        if (!n) return;
        html += '<button type="button" class="ci-item' + (state.filter === p ? " is-active" : "") +
          '" data-d="' + p + '" aria-pressed="' + (state.filter === p) + '"><span>' + p + '</span><b>' + n + '</b></button>';
      });
    }
    indexEl.innerHTML = html;
  }

  /* ---------- 表格 ---------- */

  function row(it, view, province) {
    var museums = view === "province"
      ? it.places.filter(function (p) { return p.province === province; }).map(function (p) { return p.museum; })
      : it.places.map(function (p) { return p.museum; });
    var place = view === "province" ? batchOf(it.batch).label : it.provinces.join(" / ");
    var v = !!(window.FBVisited && FBVisited.has(it.fid));
    return '<div class="fb-row' + (view === "province" ? " is-province" : "") + (v ? " is-visited" : "") + '">' +
      '<span class="fb-n">' + it.name + '</span>' +
      '<span class="fb-a">' + (it.era || "—") + '</span>' +
      '<span class="fb-b">' + museums.join(" / ") + '</span>' +
      '<span class="fb-c">' + place + '</span>' +
      '<button type="button" class="visit-btn fb-visit" data-id="' + it.fid + '" aria-pressed="' + v + '" title="标记为已去过">' +
        (v ? "✓" : "＋") +
      '</button>' +
    '</div>';
  }

  function table(list, view, province) {
    var head = view === "province"
      ? ["名称", "时代", "博物馆", "批次"]
      : ["名称", "时代", "博物馆", "省份"];
    return '<div class="fb-table" role="table">' +
      '<div class="fb-row fb-head" role="row">' +
        head.map(function (h, i) {
          return '<span class="fb-' + ["n", "a", "b", "c"][i] + '">' + h + '</span>';
        }).join("") +
        '<span class="fb-v"></span>' +
      '</div>' +
      list.map(function (it) { return row(it, view, province); }).join("") +
    '</div>';
  }

  function section(title, sub, list, view, province) {
    return '<section class="district-block">' +
      '<div class="group-head"><h2>' + title + '</h2>' +
        (sub ? '<span class="year">' + sub + '</span>' : '') +
        '<span class="count">' + list.length + ' 件</span></div>' +
      table(list, view, province) +
    '</section>';
  }

  function render() {
    var html = "";
    if (state.view === "batch") {
      var batches = state.filter === "all" ? BATCHES : BATCHES.filter(function (b) { return String(b.n) === state.filter; });
      batches.forEach(function (b) {
        var list = items.filter(function (it) { return it.batch === b.n; });
        if (!list.length) return;
        html += section(b.label, b.year, list, "batch", null);
      });
      toolbarNote.textContent = "195 件 · 三批";
      noteEl.textContent = "按公布批次排列，批次内保持原名单顺序。";
    } else {
      var provs = state.filter === "all" ? PROVINCES : PROVINCES.filter(function (p) { return p === state.filter; });
      provs.forEach(function (p) {
        var list = items.filter(function (it) { return it.provinces.indexOf(p) !== -1; });
        if (!list.length) return;
        html += section(p, "", list, "province", p);
      });
      toolbarNote.textContent = "197 条 · 25 个省级行政区";
      noteEl.textContent = "同一件文物若分藏两省，会在两边各出现一次，所以 197 条大于 195 件。";
    }
    listEl.innerHTML = html;
    updateWalk();
  }

  function setView(view, push) {
    if (view !== "batch" && view !== "province") view = "batch";
    state.view = view;
    state.filter = "all";
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === view));
    });
    try { localStorage.setItem(VIEW_KEY, view); } catch (e) {}
    if (push && ("#" + view) !== window.location.hash) window.location.hash = view;
    renderIndex();
    render();
  }

  indexEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".ci-item");
    if (!btn) return;
    state.filter = btn.getAttribute("data-d");
    renderIndex();
    render();
    var y = listEl.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: y, behavior: "smooth" });
  });

  listEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".fb-visit");
    if (!btn) return;
    if (!window.FBVisited) return;
    var on = FBVisited.toggle(btn.getAttribute("data-id"));
    var row = btn.closest(".fb-row");
    if (row) row.classList.toggle("is-visited", on);
    btn.textContent = on ? "✓" : "＋";
    btn.setAttribute("aria-pressed", String(on));
    updateWalk();
  });

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.getAttribute("aria-pressed") === "true") return;
      setView(b.getAttribute("data-view"), true);
      var y = listEl.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  window.addEventListener("hashchange", function () {
    var h = (window.location.hash || "").replace("#", "");
    if (h === "batch" || h === "province") setView(h, false);
  });

  function initialView() {
    var h = (window.location.hash || "").replace("#", "");
    if (h === "batch" || h === "province") return h;
    try {
      var saved = localStorage.getItem(VIEW_KEY);
      if (saved === "batch" || saved === "province") return saved;
    } catch (e) {}
    return "batch";
  }

  setView(initialView(), false);
})();
