(function () {
  "use strict";

  var data = window.ZJ_PROV_DATA || [];
  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");
  var noteEl = document.getElementById("zj-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));
  var layoutEl = document.querySelector(".zj-layout");

  var BATCHES = {
    1: { label: "第一批", year: "1961" },
    2: { label: "第二批", year: "1963" },
    3: { label: "第三批", year: "1989" },
    4: { label: "第四批", year: "1997" },
    5: { label: "第五批", year: "2005" },
    6: { label: "第六批", year: "2011" },
    7: { label: "第七批", year: "2017" },
    8: { label: "第八批", year: "2023" }
  };
  var CITIES = ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市"];
  var VIEW_KEY = "zj-prov-view";
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
  var byCity = counts("city");

  function sorted(list) {
    return list.slice().sort(function (a, b) {
      return a.batch - b.batch || parseInt(a.id.split("-")[1], 10) - parseInt(b.id.split("-")[1], 10);
    });
  }

  function table(list, meta) {
    var head = meta === "city" ? ["编号", "名称", "辖区"] : ["编号", "名称", "批次"];
    var rows = sorted(list).map(function (it) {
      var m = meta === "city" ? it.city : BATCHES[it.batch].label;
      return '<div class="zj-row" role="row">' +
        '<span class="zj-c">' + esc(it.id) + '</span>' +
        '<span class="zj-n">' + esc(it.name) + '</span>' +
        '<span class="zj-m">' + esc(m) + '</span>' +
      '</div>';
    }).join("");
    return '<div class="zj-table" role="table">' +
      '<div class="zj-row zj-head" role="row">' +
        head.map(function (h, i) {
          return '<span class="zj-' + ["c", "n", "m"][i] + '">' + h + '</span>';
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
    var groups = isBatch ? [1, 2, 3, 4, 5, 6, 7, 8] : CITIES;
    var html = '<p class="ci-title">' + (isBatch ? "批次索引" : "辖区索引") + '</p>' +
      '<button type="button" class="ci-item' + (state.filter === "all" ? " is-active" : "") +
      '" data-g="all" aria-pressed="' + (state.filter === "all") + '"><span>全部</span><b>' + data.length + '</b></button>';
    groups.forEach(function (g) {
      var n = isBatch ? (byBatch[g] || 0) : (byCity[g] || 0);
      if (!n) return;
      var label = isBatch ? BATCHES[g].label : g;
      html += '<button type="button" class="ci-item' + (state.filter === String(g) ? " is-active" : "") +
        '" data-g="' + esc(g) + '" aria-pressed="' + (state.filter === String(g)) + '"><span>' + esc(label) + '</span><b>' + n + '</b></button>';
    });
    indexEl.innerHTML = html;
  }

  function render() {
    var isBatch = state.view === "batch";
    var groups = isBatch ? [1, 2, 3, 4, 5, 6, 7, 8] : CITIES;
    var html = "";
    groups.forEach(function (g) {
      if (state.filter !== "all" && state.filter !== String(g)) return;
      var list = isBatch ? data.filter(function (it) { return it.batch === g; }) : data.filter(function (it) { return it.city === g; });
      if (!list.length) return;
      html += '<section class="district-block">' +
        groupHead(isBatch ? BATCHES[g].label : g, isBatch ? BATCHES[g].year : "", list.length) +
        table(list, isBatch ? "city" : "batch") +
      '</section>';
    });
    listEl.innerHTML = html;
    toolbarNote.textContent = isBatch ? data.length + " 处 · 8 批" : data.length + " 处 · 11 个辖区";
    noteEl.textContent = isBatch
      ? "按公布批次排列；已升为国保的条目不再列入，因此各批数量少于当年公布数。"
      : "按 11 个地级市排列；同一批次内按原编号顺序。";
  }

  function setView(view, push) {
    if (view !== "batch" && view !== "city") view = "batch";
    state.view = view;
    state.filter = "all";
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === view));
    });
    if (layoutEl) layoutEl.classList.toggle("is-city", view === "city");
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
    if (h === "batch" || h === "city") setView(h, false);
  });

  var initial = "batch";
  var hash = (window.location.hash || "").replace("#", "");
  if (hash === "batch" || hash === "city") initial = hash;
  setView(initial, false);
})();
