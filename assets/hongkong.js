(function () {
  "use strict";

  var items = window.HK_PLACES || [];
  var listEl = document.getElementById("list");
  var noteEl = document.getElementById("hk-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));

  var REGIONS = [
    { name: "香港岛", districts: ["中西区", "湾仔区", "东区", "南区"] },
    { name: "九龙", districts: ["油尖旺区", "深水埗区", "九龙城区", "黄大仙区", "观塘区"] },
    { name: "新界", districts: ["葵青区", "荃湾区", "屯门区", "元朗区", "北区", "大埔区", "沙田区", "西贡区", "离岛区"] }
  ];

  var VIEW_KEY = "hk-view";
  var currentView = null;

  function yearText(s) {
    if (!s) return "";
    return s.replace(/年至/g, "—").replace(/年$/, "");
  }

  function card(it, view) {
    var meta = view === "number"
      ? [it.district, yearText(it.built)].filter(Boolean).join(" · ")
      : [yearText(it.built), it.address].filter(Boolean).join(" · ");
    return '' +
      '<a class="card" href="hk-place.html?id=' + encodeURIComponent(it.id) + '">' +
        '<div class="card-name">' + it.name + ' <span class="hk-id">' + it.id + '</span></div>' +
        '<div class="card-meta">' + meta + '</div>' +
        '<div class="card-foot">' +
          '<span class="dot open"></span>' +
          '<span>法定古迹</span>' +
          '<span class="card-arrow" aria-hidden="true">→</span>' +
        '</div>' +
      '</a>';
  }

  function grid(list, view) {
    return '<div class="grid">' + list.map(function (it) { return card(it, view); }).join("") + '</div>';
  }

  function districtView() {
    var html = "";
    REGIONS.forEach(function (r) {
      html += '<section class="hk-region"><h2>' + r.name + '</h2>';
      r.districts.forEach(function (d) {
        var list = items.filter(function (it) { return it.district === d; });
        html += '<div class="hk-district">' +
          '<div class="hk-district-head"><h3>' + d + '</h3><span class="count">' + list.length + ' 项</span></div>' +
          (list.length ? grid(list, "district") : '<p class="hk-empty">暂无法定古迹</p>') +
        '</div>';
      });
      html += '</section>';
    });
    return html;
  }

  function numberView() {
    return '<section class="group">' +
      '<div class="group-head"><h2>法定古迹编号</h2><span class="count">' + items.length + ' 项</span></div>' +
      grid(items, "number") +
    '</section>';
  }

  function render(view) {
    listEl.innerHTML = view === "number" ? numberView() : districtView();
    if (view === "number") {
      toolbarNote.textContent = "编号 M0001—M0138";
      noteEl.textContent = "按法定古迹编号升序排列。";
    } else {
      toolbarNote.textContent = "138 项 · 17 个辖区";
      noteEl.textContent = "按香港岛、九龙、新界三个区域，再按辖区排列。";
    }
    listEl.classList.remove("enter");
    void listEl.offsetWidth;
    listEl.classList.add("enter");
  }

  function setView(view, push) {
    if (view !== "district" && view !== "number") view = "district";
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
    if (h === "district" || h === "number") return h;
    try {
      var saved = localStorage.getItem(VIEW_KEY);
      if (saved === "district" || saved === "number") return saved;
    } catch (e) {}
    return "district";
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
    if (h === "district" || h === "number") setView(h, false);
  });

  setView(initialView(), false);
})();
