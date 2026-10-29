(function () {
  "use strict";

  var sites = window.WH_SITES || [];
  var listEl = document.getElementById("list");
  var noteEl = document.getElementById("wh-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));

  var toolbarInner = document.querySelector(".toolbar-inner");
  var walkEl = document.createElement("span");
  walkEl.className = "walk-count";
  walkEl.id = "walk-count";
  if (toolbarInner) toolbarInner.appendChild(walkEl);

  var PROVINCES = [
    "北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省",
    "上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省",
    "湖北省","湖南省","广东省","广西壮族自治区","海南省","重庆市","四川省","贵州省",
    "云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区",
    "香港特别行政区","澳门特别行政区","台湾省"
  ];

  var VIEW_KEY = "wh-view";
  var state = { view: "year", filter: "all" };

  function typeClass(t) {
    return t === "文化" ? "t-culture" : t === "自然" ? "t-nature" : "t-mixed";
  }

  function updateWalk() {
    if (!walkEl) return;
    var got = sites.filter(function (s) { return window.WHVisited && WHVisited.has(s.uid); }).length;
    walkEl.innerHTML = "已走 <b>" + got + "</b>/" + sites.length;
  }

  function row(s, view) {
    var v = !!(window.WHVisited && WHVisited.has(s.uid));
    return '<div class="wht-row' + (v ? " is-visited" : "") + '" data-uid="' + s.uid + '">' +
      '<span class="wht-c">#' + s.uid + '</span>' +
      '<span class="wht-n">' + s.name + '</span>' +
      '<span class="wht-t ' + typeClass(s.type) + '">' + s.type + '</span>' +
      '<span class="wht-p">' + (view === "year" ? s.provinces.join("、") : s.year) + '</span>' +
      '<button type="button" class="visit-btn wht-visit" data-id="' + s.uid + '" aria-pressed="' + v + '" title="标记为已去过">' +
        (v ? "✓" : "＋") +
      '</button>' +
      '<a class="wht-hit" href="heritage-place.html?id=' + s.uid + '" aria-label="' + s.name + '"></a>' +
    '</div>';
  }

  function table(list, view) {
    var head = view === "year"
      ? ["编号", "名称", "类型", "省份"]
      : ["编号", "名称", "类型", "年份"];
    return '<div class="wht-table" role="table">' +
      '<div class="wht-row wht-head" role="row">' +
        head.map(function (h, i) {
          return '<span class="wht-' + ["c", "n", "t", "p"][i] + '">' + h + '</span>';
        }).join("") +
        '<span class="wht-v"></span>' +
      '</div>' +
      list.map(function (s) { return row(s, view); }).join("") +
    '</div>';
  }

  function yearView() {
    var sorted = sites.slice().sort(function (a, b) {
      return a.year - b.year || Number(a.uid) - Number(b.uid);
    });
    var years = [];
    sorted.forEach(function (s) { if (years.indexOf(s.year) === -1) years.push(s.year); });
    var html = "";
    years.forEach(function (y) {
      var list = sorted.filter(function (s) { return s.year === y; });
      html += '<section class="group">' +
        '<div class="group-head"><h2>' + y + ' 年</h2><span class="count">' + list.length + ' 项</span></div>' +
        table(list, "year") +
      '</section>';
    });
    return html;
  }

  function provinceView() {
    var placements = 0;
    sites.forEach(function (s) { placements += s.provinces.length; });
    var idx = '<p class="ci-title">省份索引</p>' +
      '<button type="button" class="ci-item' + (state.filter === "all" ? " is-active" : "") +
      '" data-d="all" aria-pressed="' + (state.filter === "all") + '"><span>全部</span><b>' + placements + '</b></button>';
    PROVINCES.forEach(function (p) {
      var n = sites.filter(function (s) { return s.provinces.indexOf(p) !== -1; }).length;
      if (!n) return;
      idx += '<button type="button" class="ci-item' + (state.filter === p ? " is-active" : "") +
        '" data-d="' + p + '" aria-pressed="' + (state.filter === p) + '"><span>' + p + '</span><b>' + n + '</b></button>';
    });

    var html = '<div class="city-layout hk-layout"><aside class="city-index">' + idx + '</aside><div class="city-content">';
    var show = state.filter === "all" ? PROVINCES : [state.filter];
    show.forEach(function (p) {
      var list = sites.filter(function (s) { return s.provinces.indexOf(p) !== -1; });
      if (!list.length) return;
      html += '<section class="district-block"><div class="group-head"><h2>' + p + '</h2><span class="count">' + list.length + ' 项</span></div>' +
        table(list, "province") +
      '</section>';
    });
    return html + '</div></div>';
  }

  function render() {
    if (state.view === "province") {
      listEl.innerHTML = provinceView();
      toolbarNote.textContent = "95 条 · 30 个省级行政区";
      noteEl.textContent = "跨省项目会在每个相关省份下各出现一次，所以省份计数之和是 95，大于 61。";
    } else {
      listEl.innerHTML = yearView();
      toolbarNote.textContent = "61 项 · 1987—2026";
      noteEl.textContent = "同年列入的，按世界遗产编号先后排列。";
    }
    updateWalk();
  }

  function setView(view, push) {
    if (view !== "year" && view !== "province") view = "year";
    state.view = view;
    if (view === "province") state.filter = "all";
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === view));
    });
    try { localStorage.setItem(VIEW_KEY, view); } catch (e) {}
    if (push && ("#" + view) !== window.location.hash) window.location.hash = view;
    render();
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.getAttribute("aria-pressed") === "true") return;
      setView(b.getAttribute("data-view"), true);
      var y = listEl.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  listEl.addEventListener("click", function (e) {
    var idx = e.target.closest(".ci-item");
    if (idx) {
      state.filter = idx.getAttribute("data-d");
      render();
      var y = listEl.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    var btn = e.target.closest(".wht-visit");
    if (!btn) return;
    if (!window.WHVisited) return;
    var uid = btn.getAttribute("data-id");
    var on = WHVisited.toggle(uid);
    Array.prototype.forEach.call(document.querySelectorAll('.wht-row[data-uid="' + uid + '"]'), function (r) {
      r.classList.toggle("is-visited", on);
      var b = r.querySelector(".wht-visit");
      if (b) { b.textContent = on ? "✓" : "＋"; b.setAttribute("aria-pressed", String(on)); }
    });
    updateWalk();
  });

  window.addEventListener("hashchange", function () {
    var h = (window.location.hash || "").replace("#", "");
    if (h === "year" || h === "province") setView(h, false);
  });

  function initialView() {
    var h = (window.location.hash || "").replace("#", "");
    if (h === "year" || h === "province") return h;
    try {
      var saved = localStorage.getItem(VIEW_KEY);
      if (saved === "year" || saved === "province") return saved;
    } catch (e) {}
    return "year";
  }

  setView(initialView(), false);
})();
