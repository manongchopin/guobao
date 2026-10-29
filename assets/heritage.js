(function () {
  "use strict";

  var sites = window.WH_SITES || [];
  var listEl = document.getElementById("list");
  var noteEl = document.getElementById("wh-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));

  var PROVINCES = [
    "北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省",
    "上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省",
    "湖北省","湖南省","广东省","广西壮族自治区","海南省","重庆市","四川省","贵州省",
    "云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区",
    "香港特别行政区","澳门特别行政区","台湾省"
  ];

  var VIEW_KEY = "wh-view";
  var currentView = null;

  function typeClass(t) {
    return t === "文化" ? "t-culture" : t === "自然" ? "t-nature" : "t-mixed";
  }

  function card(s, view, province) {
    var meta;
    if (view === "province") {
      meta = s.year + " 年 · " + (s.provinces.length > 1 ? "跨省 " + s.provinces.length + " 省" : s.provinces[0]);
    } else {
      meta = s.year + " 年 · " + s.provinces.join("、");
    }
    return '' +
      '<a class="wh-card" href="https://whc.unesco.org/en/list/' + s.uid + '" target="_blank" rel="noopener">' +
        '<span class="wh-top">' +
          '<span class="wh-uid">#' + s.uid + '</span>' +
          '<span class="wh-badge ' + typeClass(s.type) + '">' + s.type + '</span>' +
          (s.transnational ? '<span class="wh-badge t-trans">跨国</span>' : '') +
          '<span class="wh-ext" aria-hidden="true">↗</span>' +
        '</span>' +
        '<span class="wh-name">' + s.name + '</span>' +
        '<span class="wh-meta">' + meta + '</span>' +
      '</a>';
  }

  function section(title, sub, items, view, province) {
    return '' +
      '<section class="group">' +
        '<div class="group-head">' +
          '<h2>' + title + '</h2>' +
          (sub ? '<span class="year">' + sub + '</span>' : '') +
          '<span class="count">' + items.length + ' 项</span>' +
        '</div>' +
        '<div class="grid">' + items.map(function (s) { return card(s, view, province); }).join('') + '</div>' +
      '</section>';
  }

  function render(view) {
    var html = "";
    var sorted = sites.slice().sort(function (a, b) {
      return a.year - b.year || Number(a.uid) - Number(b.uid);
    });

    if (view === "province") {
      var placements = 0;
      PROVINCES.forEach(function (p) {
        var items = sorted.filter(function (s) { return s.provinces.indexOf(p) !== -1; });
        if (!items.length) return;
        placements += items.length;
        html += section(p, "", items, view, p);
      });
      toolbarNote.textContent = placements + " 条 · 30 个省级行政区";
      noteEl.textContent = "跨省项目会在每个相关省份下各出现一次，所以省份计数之和是 " +
        placements + "，大于 61。";
    } else {
      var years = [];
      sorted.forEach(function (s) { if (years.indexOf(s.year) === -1) years.push(s.year); });
      years.forEach(function (y) {
        var items = sorted.filter(function (s) { return s.year === y; });
        html += section(y + " 年", "", items, view, null);
      });
      toolbarNote.textContent = "61 项 · 1987—2026";
      noteEl.textContent = "同年列入的，按世界遗产编号先后排列。";
    }

    listEl.innerHTML = html;
    listEl.classList.remove("enter");
    void listEl.offsetWidth;
    listEl.classList.add("enter");
  }

  function setView(view, push) {
    if (view !== "year" && view !== "province") view = "year";
    var changed = currentView !== view;
    currentView = view;

    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === view));
    });
    try { localStorage.setItem(VIEW_KEY, view); } catch (e) {}
    if (push && ("#" + view) !== window.location.hash) window.location.hash = view;
    if (changed) render(view);
  }

  function initialView() {
    var h = (window.location.hash || "").replace("#", "");
    if (h === "year" || h === "province") return h;
    try {
      var saved = localStorage.getItem(VIEW_KEY);
      if (saved === "year" || saved === "province") return saved;
    } catch (e) {}
    return "year";
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var changed = b.getAttribute("aria-pressed") !== "true";
      setView(b.getAttribute("data-view"), true);
      if (changed) {
        var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      }
    });
  });

  window.addEventListener("hashchange", function () {
    var h = (window.location.hash || "").replace("#", "");
    if (h === "year" || h === "province") setView(h, false);
  });

  setView(initialView(), false);
})();
