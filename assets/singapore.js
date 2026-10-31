(function () {
  "use strict";

  var data = window.SG_MONUMENTS || [];
  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");
  var noteEl = document.getElementById("sg-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));
  var state = { view: "time", filter: "all" };

  var TYPES = ["宗教", "公共建筑", "文化场馆", "商业与酒店", "交通与桥梁", "纪念物", "住宅", "会馆"];
  var DECADES = ["2020", "2010", "2000", "1990", "1980", "1970"];
  var REGIONS = ["中区", "东区", "北区", "东北区", "西区"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function decade(it) {
    return it.date ? it.date.slice(0, 3) + "0" : "unknown";
  }

  function counts(key) {
    var by = {};
    data.forEach(function (it) { by[key(it)] = (by[key(it)] || 0) + 1; });
    return by;
  }
  var byDecade = counts(decade);
  var byType = counts(function (it) { return it.cat; });
  var byRegion = counts(function (it) { return it.region; });

  var years = data.map(function (it) { return it.date ? Number(it.date.slice(0, 4)) : 0; }).filter(Boolean);
  var minYear = Math.min.apply(null, years);
  var maxYear = Math.max.apply(null, years);
  var countEl = document.getElementById("sg-count");
  if (countEl) countEl.textContent = data.length;
  var hp = document.querySelector(".hp-num");
  if (hp) hp.textContent = data.length;
  var hnote = document.querySelector(".hp-note");
  if (hnote) hnote.textContent = minYear + "—" + maxYear + " · 5 个区域";

  function sorted(list) {
    return list.slice().sort(function (a, b) {
      return (b.date || "").localeCompare(a.date || "");
    });
  }

  function table(list) {
    var head = ["名称", "现用途", "地点", "建成", "刊宪"];
    var rows = sorted(list).map(function (it) {
      return '<div class="sg-row" role="row">' +
        '<span class="sg-n">' + esc(it.name) + '</span>' +
        '<span class="sg-u">' + esc(it.use || "—") + '</span>' +
        '<span class="sg-l">' + esc(it.loc || "—") + '</span>' +
        '<span class="sg-b">' + esc(it.built || "—") + '</span>' +
        '<span class="sg-g">' + esc(it.gazette || "—") + '</span>' +
      '</div>';
    }).join("");
    return '<div class="sg-table" role="table">' +
      '<div class="sg-row sg-head" role="row">' +
        head.map(function (h, i) {
          return '<span class="sg-' + ["n", "u", "l", "b", "g"][i] + '">' + h + '</span>';
        }).join("") +
      '</div>' + rows + '</div>';
  }

  function groupsFor(view) {
    return view === "type" ? TYPES : view === "region" ? REGIONS : DECADES;
  }

  function renderIndex() {
    var groups = groupsFor(state.view);
    var title = state.view === "type" ? "类型索引" : state.view === "region" ? "区域索引" : "年代索引";
    var html = '<p class="ci-title">' + title + '</p>' +
      '<button type="button" class="ci-item' + (state.filter === "all" ? " is-active" : "") +
      '" data-g="all" aria-pressed="' + (state.filter === "all") + '"><span>全部</span><b>' + data.length + '</b></button>';
    groups.forEach(function (g) {
      var n = state.view === "type" ? (byType[g] || 0) : state.view === "region" ? (byRegion[g] || 0) : (byDecade[g] || 0);
      if (!n) return;
      var label = state.view === "time" ? g + " 年代" : g;
      html += '<button type="button" class="ci-item' + (state.filter === String(g) ? " is-active" : "") +
        '" data-g="' + esc(g) + '" aria-pressed="' + (state.filter === String(g)) + '"><span>' + esc(label) + '</span><b>' + n + '</b></button>';
    });
    indexEl.innerHTML = html;
  }

  function renderFlat(groups) {
    var html = "";
    groups.forEach(function (g) {
      if (state.filter !== "all" && state.filter !== String(g)) return;
      var list = state.view === "type"
        ? data.filter(function (it) { return it.cat === g; })
        : data.filter(function (it) { return decade(it) === g; });
      if (!list.length) return;
      var title = state.view === "time" ? g + " 年代" : g;
      html += '<section class="district-block">' +
        '<div class="group-head"><h2>' + esc(title) + '</h2><span class="count">' + list.length + ' 项</span></div>' +
        table(list) +
      '</section>';
    });
    return html;
  }

  function renderRegion() {
    var html = "";
    REGIONS.forEach(function (region) {
      if (state.filter !== "all" && state.filter !== String(region)) return;
      var list = data.filter(function (it) { return it.region === region; });
      if (!list.length) return;
      html += '<section class="district-block">' +
        '<div class="group-head"><h2>' + esc(region) + '</h2><span class="count">' + list.length + ' 项</span></div>';
      var planMap = {};
      list.forEach(function (it) {
        var p = it.planning || "未定";
        (planMap[p] = planMap[p] || []).push(it);
      });
      Object.keys(planMap).sort(function (a, b) {
        return planMap[b].length - planMap[a].length || a.localeCompare(b, "zh");
      }).forEach(function (p) {
        html += '<h3 class="sg-subhead">' + esc(p) + ' <span>' + planMap[p].length + ' 项</span></h3>' +
          table(planMap[p]);
      });
      html += '</section>';
    });
    return html;
  }

  function render() {
    if (state.view === "region") {
      listEl.innerHTML = renderRegion();
      toolbarNote.textContent = data.length + " 项 · 5 个区域";
      noteEl.textContent = "按 5 个规划区域排列，规划区作二级小标题；同组内按刊宪时间倒序。";
    } else {
      listEl.innerHTML = renderFlat(groupsFor(state.view));
      toolbarNote.textContent = state.view === "type" ? data.length + " 项 · " + TYPES.length + " 类" : data.length + " 项 · 按刊宪时间";
      noteEl.textContent = state.view === "type"
        ? "按类型归档，同一类型内按刊宪时间倒序。"
        : "按刊宪时间倒序排列；同一年内按日期先后。";
    }
  }

  function setView(view, push) {
    if (view !== "time" && view !== "type" && view !== "region") view = "time";
    state.view = view;
    state.filter = "all";
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === view));
    });
    if (push && ("#" + view) !== window.location.hash) window.location.hash = view;
    renderIndex();
    render();
  }

  indexEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".ci-item");
    if (!btn) return;
    state.filter = btn.getAttribute("data-g");
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
    if (h === "time" || h === "type" || h === "region") setView(h, false);
  });

  var initial = "time";
  var hash = (window.location.hash || "").replace("#", "");
  if (hash === "time" || hash === "type" || hash === "region") initial = hash;
  setView(initial, false);
})();
