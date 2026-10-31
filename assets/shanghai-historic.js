(function () {
  "use strict";

  var data = window.SH_HISTORIC_DATA || [];
  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");
  var noteEl = document.getElementById("sh-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));

  var BATCHES = {
    1: { label: "第一批", year: "1989" },
    2: { label: "第二批", year: "1994" },
    3: { label: "第三批", year: "1999" },
    4: { label: "第四批", year: "2005" },
    5: { label: "第五批", year: "2015" }
  };
  var DISTRICTS = ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明区"];
  var VIEW_KEY = "sh-historic-view";
  var state = { view: "batch", filter: "all" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function counts(key) {
    var by = {};
    data.forEach(function (it) { by[it[key]] = (by[it[key]] || 0) + 1; });
    return by;
  }
  var byBatch = counts("batch");
  var byDistrict = counts("district");

  function sorted(list) {
    return list.slice().sort(function (a, b) { return a.batch - b.batch || a.num - b.num; });
  }

  function table(list, meta) {
    var head = meta === "district" ? ["编号", "名称", "地址", "辖区"] : ["编号", "名称", "地址", "批次"];
    var rows = sorted(list).map(function (it) {
      var m = meta === "district" ? it.district : BATCHES[it.batch].label;
      return '<div class="shb-row" role="row">' +
        '<span class="shb-c">' + esc(it.id) + '</span>' +
        '<span class="shb-n">' + esc(it.name) + '</span>' +
        '<span class="shb-a">' + esc(it.addr) + '</span>' +
        '<span class="shb-m">' + esc(m) + '</span>' +
      '</div>';
    }).join("");
    return '<div class="shb-table" role="table">' +
      '<div class="shb-row shb-head" role="row">' +
        head.map(function (h, i) {
          return '<span class="shb-' + ["c", "n", "a", "m"][i] + '">' + h + '</span>';
        }).join("") +
      '</div>' + rows + '</div>';
  }

  function groupHead(title, year, count) {
    return '<div class="group-head"><h2>' + esc(title) +
      (year ? ' <span class="year">' + esc(year) + '</span>' : '') +
      '</h2><span class="count">' + count + ' 处</span></div>';
  }

  function renderIndex() {
    var isBatch = state.view === "batch";
    var groups = isBatch ? [1, 2, 3, 4, 5] : DISTRICTS;
    var html = '<p class="ci-title">' + (isBatch ? "批次索引" : "辖区索引") + '</p>' +
      '<button type="button" class="ci-item' + (state.filter === "all" ? " is-active" : "") +
      '" data-g="all" aria-pressed="' + (state.filter === "all") + '"><span>全部</span><b>' + data.length + '</b></button>';
    groups.forEach(function (g) {
      var n = isBatch ? (byBatch[g] || 0) : (byDistrict[g] || 0);
      if (!n) return;
      var label = isBatch ? BATCHES[g].label : g;
      html += '<button type="button" class="ci-item' + (state.filter === String(g) ? " is-active" : "") +
        '" data-g="' + esc(g) + '" aria-pressed="' + (state.filter === String(g)) + '"><span>' + esc(label) + '</span><b>' + n + '</b></button>';
    });
    indexEl.innerHTML = html;
  }

  function render() {
    var isBatch = state.view === "batch";
    var groups = isBatch ? [1, 2, 3, 4, 5] : DISTRICTS;
    var html = "";
    groups.forEach(function (g) {
      if (state.filter !== "all" && state.filter !== String(g)) return;
      var list = isBatch ? data.filter(function (it) { return it.batch === g; }) : data.filter(function (it) { return it.district === g; });
      if (!list.length) return;
      html += '<section class="district-block">' +
        groupHead(isBatch ? BATCHES[g].label : g, isBatch ? BATCHES[g].year : "", list.length) +
        table(list, isBatch ? "district" : "batch") +
      '</section>';
    });
    listEl.innerHTML = html;
    toolbarNote.textContent = isBatch ? data.length + " 处 · 5 批" : data.length + " 处 · 16 个区";
    noteEl.textContent = isBatch
      ? "按公布批次排列；同批内按原编号顺序，第五批按区排列。"
      : "按 16 个区排列；原闸北并入静安，原卢湾、南市并入黄浦。";
  }

  function setView(view, push) {
    if (view !== "batch" && view !== "district") view = "batch";
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
    if (h === "batch" || h === "district") setView(h, false);
  });

  var initial = "batch";
  var hash = (window.location.hash || "").replace("#", "");
  if (hash === "batch" || hash === "district") initial = hash;
  setView(initial, false);
})();
