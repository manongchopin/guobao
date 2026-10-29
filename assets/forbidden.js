(function () {
  "use strict";

  var items = window.FORBIDDEN || [];
  var listEl = document.getElementById("list");
  var noteEl = document.getElementById("fx-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));

  var PROVINCES = [
    "北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省",
    "上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省",
    "湖北省","湖南省","广东省","广西壮族自治区","海南省","重庆市","四川省","贵州省",
    "云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区",
    "香港特别行政区","澳门特别行政区","台湾省"
  ];

  var BATCHES = [
    { n: 1, label: "第一批", year: "2002" },
    { n: 2, label: "第二批", year: "2012" },
    { n: 3, label: "第三批", year: "2013" }
  ];

  var VIEW_KEY = "forbidden-view";
  var currentView = null;

  function batchOf(n) {
    for (var i = 0; i < BATCHES.length; i++) if (BATCHES[i].n === n) return BATCHES[i];
    return { n: n, label: "第" + n + "批", year: "" };
  }

  function card(it, view, province) {
    var b = batchOf(it.batch);
    var museums, provs;
    if (view === "province") {
      museums = it.places.filter(function (p) { return p.province === province; })
        .map(function (p) { return p.museum; }).join(" / ");
      provs = "";
    } else {
      museums = it.places.map(function (p) { return p.museum; }).join(" / ");
      provs = it.provinces.join(" / ");
    }
    return '' +
      '<article class="fx-card">' +
        (view === "province" ? '<span class="fx-kicker">' + b.label + '</span>' : '') +
        '<h3 class="fx-name">' + it.name + '</h3>' +
        '<p class="fx-meta">' + (it.era || "—") + ' · ' + museums + '</p>' +
        (provs ? '<p class="fx-foot"><span class="fx-prov">' + provs + '</span></p>' : '') +
      '</article>';
  }

  function section(title, sub, list, view, province) {
    return '' +
      '<section class="group">' +
        '<div class="group-head">' +
          '<h2>' + title + '</h2>' +
          (sub ? '<span class="year">' + sub + '</span>' : '') +
          '<span class="count">' + list.length + ' 件</span>' +
        '</div>' +
        '<div class="fx-grid">' + list.map(function (it) { return card(it, view, province); }).join('') + '</div>' +
      '</section>';
  }

  function render(view) {
    var html = "";
    if (view === "province") {
      var placements = 0;
      PROVINCES.forEach(function (p) {
        var list = items.filter(function (it) { return it.provinces.indexOf(p) !== -1; });
        if (!list.length) return;
        placements += list.length;
        html += section(p, "", list, view, p);
      });
      toolbarNote.textContent = placements + " 条 · 25 个省级行政区";
      noteEl.textContent = "同一件文物若分藏两省，会在两边各出现一次，所以 " + placements + " 条大于 195 件。";
    } else {
      BATCHES.forEach(function (b) {
        var list = items.filter(function (it) { return it.batch === b.n; });
        if (!list.length) return;
        html += section(b.label, b.year, list, view, null);
      });
      toolbarNote.textContent = "195 件 · 三批";
      noteEl.textContent = "按公布批次排列，批次内保持原名单顺序。";
    }
    listEl.innerHTML = html;
    listEl.classList.remove("enter");
    void listEl.offsetWidth;
    listEl.classList.add("enter");
  }

  function setView(view, push) {
    if (view !== "batch" && view !== "province") view = "batch";
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
    if (h === "batch" || h === "province") return h;
    try {
      var saved = localStorage.getItem(VIEW_KEY);
      if (saved === "batch" || saved === "province") return saved;
    } catch (e) {}
    return "batch";
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
    if (h === "batch" || h === "province") setView(h, false);
  });

  setView(initialView(), false);
})();
