(function () {
  "use strict";

  var grade = window.HK_GRADE || 1;
  var data = (window.HK_GRADE_DATA || {})[grade] || [];
  var LABEL = { 1: "一级", 2: "二级", 3: "三级" };
  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");
  var noteEl = document.getElementById("hg-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));
  var layoutEl = document.querySelector(".hk-layout");

  var REGIONS = [
    { name: "香港岛", districts: ["中西区", "湾仔区", "东区", "南区"] },
    { name: "九龙", districts: ["油尖旺区", "深水埗区", "九龙城区", "黄大仙区", "观塘区"] },
    { name: "新界", districts: ["葵青区", "荃湾区", "屯门区", "元朗区", "北区", "大埔区", "沙田区", "西贡区", "离岛区"] }
  ];

  var VIEW_KEY = "hk-grade-view-" + grade;
  var state = { view: "district", filter: "all" };

  function sortKey(it) {
    var m = it.id.match(/^([HN])(\d+)/);
    return [(m && m[1] === "H") ? 0 : 1, m ? parseInt(m[2], 10) : 9999];
  }

  function idText(id) {
    var parts = id.match(/[HN]\d{4}/g);
    if (parts && parts.length > 1) return parts[0] + "–" + parts[parts.length - 1];
    return id;
  }

  function sorted(list) {
    return list.slice().sort(function (a, b) {
      var ka = sortKey(a), kb = sortKey(b);
      return ka[0] - kb[0] || ka[1] - kb[1];
    });
  }

  function counts() {
    var by = {};
    data.forEach(function (it) { by[it.district] = (by[it.district] || 0) + 1; });
    return by;
  }
  var byDistrict = counts();

  /* ---------- 页面头部 ---------- */
  document.title = "香港" + LABEL[grade] + "历史建筑";
  var nameEl = document.getElementById("name");
  if (nameEl) nameEl.textContent = "香港" + LABEL[grade] + "历史建筑";
  var kickerEl = document.getElementById("kicker");
  if (kickerEl) kickerEl.textContent = "Hong Kong · Grade " + ["I", "II", "III"][grade - 1];
  var cEl = document.getElementById("hg-count");
  if (cEl) cEl.textContent = data.length;
  var dEl = document.getElementById("hg-districts");
  if (dEl) dEl.textContent = Object.keys(byDistrict).length;
  var numEl = document.querySelector(".hp-num");
  if (numEl) numEl.textContent = data.length;
  var hnote = document.querySelector(".hp-note");
  if (hnote) hnote.textContent = Object.keys(byDistrict).length + " 个辖区 · 香港岛 / 九龙 / 新界";
  var foot = document.querySelector(".footer-inner span");
  if (foot) foot.textContent = "香港" + LABEL[grade] + "历史建筑 · " + data.length + " 项";

  /* ---------- 侧栏 ---------- */
  function renderIndex() {
    var html = '<p class="ci-title">辖区索引</p>' +
      '<button type="button" class="ci-item' + (state.filter === "all" ? " is-active" : "") +
      '" data-d="all" aria-pressed="' + (state.filter === "all") + '"><span>全部</span><b>' + data.length + '</b></button>';
    REGIONS.forEach(function (r) {
      html += '<p class="ci-region">' + r.name + '</p>';
      r.districts.forEach(function (d) {
        var n = byDistrict[d] || 0;
        if (!n) return;
        html += '<button type="button" class="ci-item' + (state.filter === d ? " is-active" : "") +
          '" data-d="' + d + '" aria-pressed="' + (state.filter === d) + '"><span>' + d + '</span><b>' + n + '</b></button>';
      });
    });
    indexEl.innerHTML = html;
  }

  /* ---------- 表格 ---------- */
  function table(list) {
    var head = ["编号", "名称", "建筑年份", "地址"];
    var rows = sorted(list).map(function (it) {
      return '<div class="hg-row">' +
        '<span class="hg-c" title="' + it.id + '">' + idText(it.id) + '</span>' +
        '<span class="hg-n">' + it.name + '</span>' +
        '<span class="hg-y">' + (it.built || "—") + '</span>' +
        '<span class="hg-a">' + (it.address || "—") + '</span>' +
      '</div>';
    }).join("");
    return '<div class="hg-table" role="table">' +
      '<div class="hg-row hg-head" role="row">' +
        head.map(function (h, i) {
          return '<span class="hg-' + ["c", "n", "y", "a"][i] + '">' + h + '</span>';
        }).join("") +
      '</div>' + rows +
    '</div>';
  }

  function render() {
    var html = "";
    if (state.view === "number") {
      html = '<section class="district-block">' +
        '<div class="group-head"><h2>历史建筑编号</h2><span class="count">' + data.length + ' 项</span></div>' +
        table(data) +
      '</section>';
      toolbarNote.textContent = "按 H / N 编号排序";
      noteEl.textContent = "按编号升序排列；H、N 为两套连续编号。";
    } else {
      var show = state.filter === "all" ? null : state.filter;
      REGIONS.forEach(function (r) {
        r.districts.forEach(function (d) {
          if (show && d !== show) return;
          var list = data.filter(function (it) { return it.district === d; });
          if (!list.length) return;
          html += '<div class="hk-district">' +
            '<div class="hk-district-head"><h3>' + d + '</h3><span class="count">' + list.length + ' 项</span></div>' +
            table(list) +
          '</div>';
        });
      });
      // 包一层区域标题
      var grouped = "";
      var idx = 0;
      REGIONS.forEach(function (r) {
        var inner = "";
        r.districts.forEach(function (d) {
          if (show && d !== show) return;
          var list = data.filter(function (it) { return it.district === d; });
          if (!list.length) return;
          inner += '<div class="hk-district">' +
            '<div class="hk-district-head"><h3>' + d + '</h3><span class="count">' + list.length + ' 项</span></div>' +
            table(list) +
          '</div>';
        });
        if (inner) grouped += '<section class="hk-region"><h2>' + r.name + '</h2>' + inner + '</section>';
      });
      html = grouped;
      toolbarNote.textContent = data.length + " 项 · " + Object.keys(byDistrict).length + " 个辖区";
      noteEl.textContent = "按香港岛、九龙、新界三个区域，再按辖区排列。";
    }
    listEl.innerHTML = html;
  }

  function setView(view, push) {
    if (view !== "district" && view !== "number") view = "district";
    state.view = view;
    if (view === "number") state.filter = "all";
    if (layoutEl) layoutEl.classList.toggle("is-number", view === "number");
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

  var initial = "district";
  var hash = (window.location.hash || "").replace("#", "");
  if (hash === "district" || hash === "number") initial = hash;
  setView(initial, false);
})();
