(function () {
  "use strict";

  var items = window.HK_PLACES || [];
  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");
  var layoutEl = document.querySelector(".hk-layout");
  var noteEl = document.getElementById("hk-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));

  var REGIONS = [
    { name: "香港岛", districts: ["中西区", "湾仔区", "东区", "南区"] },
    { name: "九龙", districts: ["油尖旺区", "深水埗区", "九龙城区", "黄大仙区", "观塘区"] },
    { name: "新界", districts: ["葵青区", "荃湾区", "屯门区", "元朗区", "北区", "大埔区", "沙田区", "西贡区", "离岛区"] }
  ];

  var VIEW_KEY = "hk-view";
  var state = { view: "district", district: "all" };

  function yearText(s) {
    if (!s) return "";
    return s.replace(/年至/g, "—").replace(/年$/, "");
  }

  function byDistrict() {
    var map = {};
    items.forEach(function (it) {
      if (!map[it.district]) map[it.district] = [];
      map[it.district].push(it);
    });
    return map;
  }

  var groups = byDistrict();

  /* ---------- 侧栏 ---------- */

  function renderIndex() {
    var html = '<p class="ci-title">辖区索引</p>' +
      '<button type="button" class="ci-item' + (state.district === "all" ? " is-active" : "") +
      '" data-d="all" aria-pressed="' + (state.district === "all") + '"><span>全部</span><b>' + items.length + '</b></button>';
    REGIONS.forEach(function (r) {
      html += '<p class="ci-region">' + r.name + '</p>';
      r.districts.forEach(function (d) {
        var n = groups[d] ? groups[d].length : 0;
        if (!n) return;
        html += '<button type="button" class="ci-item' + (state.district === d ? " is-active" : "") +
          '" data-d="' + d + '" aria-pressed="' + (state.district === d) + '"><span>' + d + '</span><b>' + n + '</b></button>';
      });
    });
    indexEl.innerHTML = html;
  }

  /* ---------- 表格 ---------- */

  function row(it, view) {
    var cells = view === "number"
      ? [it.id, it.name, it.district, yearText(it.built), it.address]
      : [it.id, it.name, yearText(it.built), it.address, it.declared || "—"];
    return '<a class="hk-row" href="hk-place.html?id=' + encodeURIComponent(it.id) + '">' +
      cells.map(function (v, i) {
        return '<span class="hk-' + ["c", "n", "a", "b", "e"][i] + '">' + (v || "—") + '</span>';
      }).join("") +
    '</a>';
  }

  function table(list, view) {
    var head = view === "number"
      ? ["编号", "名称", "辖区", "建筑年份", "地址"]
      : ["编号", "名称", "建筑年份", "地址", "宣布"];
    return '<div class="hk-table' + (view === "number" ? " is-number" : "") + '" role="table">' +
      '<div class="hk-row hk-head" role="row">' +
        head.map(function (h, i) {
          return '<span class="hk-' + ["c", "n", "a", "b", "e"][i] + '">' + h + '</span>';
        }).join("") +
      '</div>' +
      list.map(function (it) { return row(it, view); }).join("") +
    '</div>';
  }

  function render() {
    var html = "";
    if (state.view === "number") {
      var list = state.district === "all" ? items : (groups[state.district] || []);
      var title = state.district === "all" ? "法定古迹编号" : state.district;
      html = '<section class="district-block">' +
        '<div class="group-head"><h2>' + title + '</h2><span class="count">' + list.length + ' 项</span></div>' +
        table(list, "number") +
      '</section>';
      toolbarNote.textContent = "编号 M0001—M0138";
      noteEl.textContent = "按法定古迹编号升序排列。";
    } else {
      var show = state.district === "all" ? null : state.district;
      REGIONS.forEach(function (r) {
        r.districts.forEach(function (d) {
          if (show && d !== show) return;
          var list = groups[d] || [];
          if (!list.length) return;
          html += '<section class="district-block" data-d="' + d + '">' +
            '<div class="group-head"><h2>' + d + '</h2><span class="count">' + list.length + ' 项</span></div>' +
            table(list, "district") +
          '</section>';
        });
      });
      toolbarNote.textContent = "138 项 · 17 个辖区";
      noteEl.textContent = "按香港岛、九龙、新界三个区域，再按辖区排列。";
    }
    listEl.innerHTML = html;
  }

  function setView(view, push) {
    if (view !== "district" && view !== "number") view = "district";
    state.view = view;
    if (view === "number" && state.district !== "all") {
      state.district = "all";
      renderIndex();
    }
    if (layoutEl) layoutEl.classList.toggle("is-number", view === "number");
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === view));
    });
    try { localStorage.setItem(VIEW_KEY, view); } catch (e) {}
    if (push && ("#" + view) !== window.location.hash) window.location.hash = view;
    render();
  }

  function setDistrict(d) {
    state.district = d;
    renderIndex();
    render();
  }

  indexEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".ci-item");
    if (!btn) return;
    setDistrict(btn.getAttribute("data-d"));
    var y = listEl.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: y, behavior: "smooth" });
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
    if (h === "district" || h === "number") setView(h, false);
  });

  function initialView() {
    var h = (window.location.hash || "").replace("#", "");
    if (h === "district" || h === "number") return h;
    try {
      var saved = localStorage.getItem(VIEW_KEY);
      if (saved === "district" || saved === "number") return saved;
    } catch (e) {}
    return "district";
  }

  renderIndex();
  setView(initialView(), false);
})();
