(function () {
  "use strict";

  var data = window.BJ_MUNICIPAL || [];
  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");
  var noteEl = document.getElementById("bjm-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));
  var state = { view: "batch", filter: "all" };
  var BATCH = { 1: "第一批", 2: "第二批", 3: "第三批", 4: "第四批", 5: "第五批", 6: "第六批", 7: "第七批", 8: "第八批", 9: "第九批" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var byBatch = {};
  var byGroup = {};
  data.forEach(function (it) {
    byBatch[it.batch] = (byBatch[it.batch] || 0) + 1;
    byGroup[it.group] = (byGroup[it.group] || 0) + 1;
  });
  var GROUPS = Object.keys(byGroup).filter(function (g) { return g !== "跨区"; }).sort(function (a, b) {
    return byGroup[b] - byGroup[a] || a.localeCompare(b, "zh");
  });
  if (byGroup["跨区"]) GROUPS.push("跨区");

  var countEl = document.getElementById("bjm-count");
  if (countEl) countEl.textContent = data.length;
  var hp = document.querySelector(".hp-num");
  if (hp) hp.textContent = data.length;
  var hnote = document.querySelector(".hp-note");
  if (hnote) hnote.textContent = "9 批 · " + (GROUPS.length - (byGroup["跨区"] ? 1 : 0)) + " 个区 + 跨区";

  function sorted(list) {
    return list.slice().sort(function (a, b) {
      return a.batch - b.batch || Number(a.num) - Number(b.num);
    });
  }

  function table(list) {
    var head = ["名称", "所在区", "年代", "批次"];
    var rows = sorted(list).map(function (it) {
      return '<div class="bjm-row" role="row">' +
        '<span class="bjm-n">' + esc(it.name) + '</span>' +
        '<span class="bjm-d">' + esc(it.district || "—") + '</span>' +
        '<span class="bjm-e">' + esc(it.era || "—") + '</span>' +
        '<span class="bjm-b">' + esc(BATCH[it.batch] || "—") + '</span>' +
      '</div>';
    }).join("");
    return '<div class="bjm-table" role="table">' +
      '<div class="bjm-row bjm-head" role="row">' +
        head.map(function (h, i) {
          return '<span class="bjm-' + ["n", "d", "e", "b"][i] + '">' + h + '</span>';
        }).join("") +
      '</div>' + rows + '</div>';
  }

  function renderIndex() {
    var isBatch = state.view === "batch";
    var groups = isBatch ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : GROUPS;
    var html = '<p class="ci-title">' + (isBatch ? "批次索引" : "辖区索引") + '</p>' +
      '<button type="button" class="ci-item' + (state.filter === "all" ? " is-active" : "") +
      '" data-g="all" aria-pressed="' + (state.filter === "all") + '"><span>全部</span><b>' + data.length + '</b></button>';
    groups.forEach(function (g) {
      var n = isBatch ? (byBatch[g] || 0) : (byGroup[g] || 0);
      if (!n) return;
      var label = isBatch ? BATCH[g] : g;
      html += '<button type="button" class="ci-item' + (state.filter === String(g) ? " is-active" : "") +
        '" data-g="' + esc(g) + '" aria-pressed="' + (state.filter === String(g)) + '"><span>' + esc(label) + '</span><b>' + n + '</b></button>';
    });
    indexEl.innerHTML = html;
  }

  function render() {
    var isBatch = state.view === "batch";
    var groups = isBatch ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : GROUPS;
    var html = "";
    groups.forEach(function (g) {
      if (state.filter !== "all" && state.filter !== String(g)) return;
      var list = isBatch ? data.filter(function (it) { return it.batch === g; }) : data.filter(function (it) { return it.group === g; });
      if (!list.length) return;
      var title = isBatch ? BATCH[g] : g;
      html += '<section class="district-block">' +
        '<div class="group-head"><h2>' + esc(title) + '</h2><span class="count">' + list.length + ' 项</span></div>' +
        table(list) +
      '</section>';
    });
    listEl.innerHTML = html;
    toolbarNote.textContent = isBatch ? data.length + " 项 · 9 批" : data.length + " 项 · " + (GROUPS.length - (byGroup["跨区"] ? 1 : 0)) + " 个区 + 跨区";
    noteEl.textContent = isBatch
      ? "按九批公布顺序排列；同批内按原序号。"
      : "按所在区排列；跨多个区的项目单列在「跨区」，行内保留全部区属。";
  }

  function setView(view, push) {
    if (view !== "batch" && view !== "district") view = "batch";
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
    if (h === "batch" || h === "district") setView(h, false);
  });

  var initial = "batch";
  var hash = (window.location.hash || "").replace("#", "");
  if (hash === "batch" || hash === "district") initial = hash;
  setView(initial, false);
})();
