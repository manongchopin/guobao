(function () {
  "use strict";

  var data = window.BOOKMARKS || [];
  var grid = document.getElementById("bm-grid");
  var chips = document.getElementById("bm-chips");
  var search = document.getElementById("bm-search");
  var empty = document.getElementById("bm-empty");
  var total = document.getElementById("bm-total");
  var note = document.getElementById("bm-note");
  var state = { cat: "全部", q: "" };

  var cats = ["全部"];
  data.forEach(function (it) {
    if (cats.indexOf(it.cat) < 0) cats.push(it.cat);
  });

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function domain(url) {
    try {
      var u = new URL(url, window.location.href);
      return u.hostname.replace(/^www\./, "") || "本站";
    } catch (e) {
      return "本站";
    }
  }

  function monogram(it) {
    if (it.cat === "本站") return "站";
    var m = String(it.title).match(/[\u4e00-\u9fa5]/);
    if (m) return m[0];
    var d = domain(it.url);
    return (d.charAt(0) || "·").toUpperCase();
  }

  function match(it) {
    if (state.cat !== "全部" && it.cat !== state.cat) return false;
    if (!state.q) return true;
    var hay = [it.title, it.desc, it.url, it.cat, (it.tags || []).join(" ")].join(" ").toLowerCase();
    return hay.indexOf(state.q.toLowerCase()) >= 0;
  }

  function renderChips() {
    chips.innerHTML = cats.map(function (c) {
      var n = c === "全部" ? data.length : data.filter(function (it) { return it.cat === c; }).length;
      return '<button type="button" class="bm-chip' + (state.cat === c ? " is-active" : "") +
        '" data-cat="' + esc(c) + '" aria-pressed="' + (state.cat === c) + '">' +
        esc(c) + '<b>' + n + '</b></button>';
    }).join("");
  }

  function render() {
    var list = data.filter(match);
    grid.innerHTML = list.map(function (it) {
      return '<a class="bm-card" href="' + esc(it.url) + '" target="_blank" rel="noopener">' +
        '<span class="bm-top"><span class="bm-mark">' + esc(monogram(it)) + '</span>' +
        '<span class="bm-cat">' + esc(it.cat) + '</span></span>' +
        '<span class="bm-title">' + esc(it.title) + '</span>' +
        '<span class="bm-desc">' + esc(it.desc) + '</span>' +
        '<span class="bm-foot"><span class="bm-domain">' + esc(domain(it.url)) + '</span><span class="bm-arrow">↗</span></span>' +
      '</a>';
    }).join("");
    empty.hidden = list.length > 0;
    total.textContent = data.length;
    note.textContent = state.cat === "全部" && !state.q
      ? "本站 / 官方 / 资料 / 工具"
      : "筛出 " + list.length + " 个站点";
  }

  chips.addEventListener("click", function (e) {
    var btn = e.target.closest(".bm-chip");
    if (!btn) return;
    state.cat = btn.getAttribute("data-cat");
    renderChips();
    render();
  });

  search.addEventListener("input", function () {
    state.q = search.value.trim();
    render();
  });

  renderChips();
  render();
})();
