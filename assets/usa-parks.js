(function () {
  "use strict";

  var data = window.US_PARKS || [];
  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");
  var noteEl = document.getElementById("pk-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));
  var state = { view: "state", filter: "all" };
  var visitorsYear = 2025;
  var visitorsMap = {};

  var STATE_ZH = {
    "Alaska": "阿拉斯加", "American Samoa": "美属萨摩亚", "Arizona": "亚利桑那",
    "Arkansas": "阿肯色", "California": "加利福尼亚", "Colorado": "科罗拉多",
    "Florida": "佛罗里达", "Hawaii": "夏威夷", "Idaho": "爱达荷",
    "Indiana": "印第安纳", "Kentucky": "肯塔基", "Maine": "缅因",
    "Michigan": "密歇根", "Minnesota": "明尼苏达", "Missouri": "密苏里",
    "Montana": "蒙大拿", "Nevada": "内华达", "New Mexico": "新墨西哥",
    "North Carolina": "北卡罗来纳", "North Dakota": "北达科他", "Ohio": "俄亥俄",
    "Oregon": "俄勒冈", "South Carolina": "南卡罗来纳", "South Dakota": "南达科他",
    "Tennessee": "田纳西", "Texas": "得克萨斯", "U.S. Virgin Islands": "美属维尔京群岛",
    "Utah": "犹他", "Virginia": "弗吉尼亚", "Washington": "华盛顿",
    "West Virginia": "西弗吉尼亚", "Wyoming": "怀俄明"
  };

  function zhState(s) { return STATE_ZH[s] || s; }
  function stateList(it) { return it.states.map(zhState).join(" / "); }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function decade(it) { return it.est ? it.est.slice(0, 3) + "0" : ""; }

  var byState = {};
  data.forEach(function (it) {
    it.states.forEach(function (s) { byState[s] = (byState[s] || 0) + 1; });
  });
  var STATES = Object.keys(byState).sort(function (a, b) {
    return byState[b] - byState[a] || zhState(a).localeCompare(zhState(b), "zh");
  });
  var DECADES = [];
  for (var y = 1870; y <= 2020; y += 10) DECADES.push(String(y));
  var byDecade = {};
  data.forEach(function (it) {
    if (it.est) byDecade[decade(it)] = (byDecade[decade(it)] || 0) + 1;
  });

  var minYear = Math.min.apply(null, data.map(function (it) { return Number(it.est.slice(0, 4)); }));
  var maxYear = Math.max.apply(null, data.map(function (it) { return Number(it.est.slice(0, 4)); }));
  var countEl = document.getElementById("pk-count");
  if (countEl) countEl.textContent = data.length;
  var hp = document.querySelector(".hp-num");
  if (hp) hp.textContent = data.length;
  var hnote = document.querySelector(".hp-note");
  if (hnote) hnote.textContent = STATES.length + " 个州与属地 · " + minYear + "—" + maxYear;

  function unesco(v) {
    return v === "whs" ? "世界遗产" : v === "br" ? "生物圈" : v === "both" ? "世界遗产 + 生物圈" : "—";
  }

  function table(list, mode) {
    var head = ["名称", "所在州", "设立", "UNESCO", visitorsYear + " 访客"];
    var rows = list.slice().sort(mode === "year"
      ? function (a, b) { return (a.est || "").localeCompare(b.est || ""); }
      : function (a, b) { return a.name.localeCompare(b.name); }
    ).map(function (it) {
      return '<div class="pk-row" role="row">' +
        '<span class="pk-n"><span class="pk-zh">' + esc(it.nameZh || it.name) + '</span><span class="pk-en">' + esc(it.name) + '</span></span>' +
        '<span class="pk-s">' + esc(stateList(it)) + '</span>' +
        '<span class="pk-e" title="' + esc(it.est) + '">' + esc((it.est || "").slice(0, 4)) + '</span>' +
        '<span class="pk-u">' + esc(unesco(it.unseco)) + '</span>' +
        '<span class="pk-v">' + ((visitorsMap[it.name] || it.visitors) ? Number(visitorsMap[it.name] || it.visitors).toLocaleString("en-US") : "—") + '</span>' +
      '</div>';
    }).join("");
    return '<div class="pk-table" role="table">' +
      '<div class="pk-row pk-head" role="row">' +
        head.map(function (h, i) {
          return '<span class="pk-' + ["n", "s", "e", "u", "v"][i] + '">' + h + '</span>';
        }).join("") +
      '</div>' + rows + '</div>';
  }

  function renderIndex() {
    var isState = state.view === "state";
    var groups = isState ? STATES : DECADES;
    var html = '<p class="ci-title">' + (isState ? "州索引" : "年代索引") + '</p>' +
      '<button type="button" class="ci-item' + (state.filter === "all" ? " is-active" : "") +
      '" data-g="all" aria-pressed="' + (state.filter === "all") + '"><span>全部</span><b>' + data.length + '</b></button>';
    groups.forEach(function (g) {
      var n = isState ? (byState[g] || 0) : (byDecade[g] || 0);
      if (!n) return;
      var label = isState ? zhState(g) : g + " 年代";
      html += '<button type="button" class="ci-item' + (state.filter === String(g) ? " is-active" : "") +
        '" data-g="' + esc(g) + '" aria-pressed="' + (state.filter === String(g)) + '"><span>' + esc(label) + '</span><b>' + n + '</b></button>';
    });
    indexEl.innerHTML = html;
  }

  async function loadVisitors() {
    try {
      var res = await fetch("data/usa-parks-visitors.json?t=" + Date.now(), { cache: "no-store" });
      if (!res.ok) throw new Error("visitors " + res.status);
      var d = await res.json();
      if (d.visitors) visitorsMap = d.visitors;
      if (d.year) visitorsYear = d.year;
      var yEl = document.getElementById("pk-vis-year");
      if (yEl) yEl.textContent = visitorsYear;
      render();
    } catch (e) {
      console.warn("US parks visitors fallback:", e.message);
    }
  }

  function render() {
    var isState = state.view === "state";
    var groups = isState ? STATES : DECADES;
    var html = "";
    groups.forEach(function (g) {
      if (state.filter !== "all" && state.filter !== String(g)) return;
      var list = isState
        ? data.filter(function (it) { return it.states.indexOf(g) >= 0; })
        : data.filter(function (it) { return decade(it) === g; });
      if (!list.length) return;
      var title = isState ? zhState(g) : g + " 年代";
      html += '<section class="district-block">' +
        '<div class="group-head"><h2>' + esc(title) + '</h2><span class="count">' + list.length + ' 座</span></div>' +
        table(list, isState ? "state" : "year") +
      '</section>';
    });
    listEl.innerHTML = html;
    toolbarNote.textContent = isState ? data.length + " 座 · " + STATES.length + " 个州与属地" : data.length + " 座 · 按设立年份";
    noteEl.textContent = isState
      ? "按州分组；跨州公园会在每个所属州重复出现，因此分组计数之和大于 64。"
      : "按设立年份排列；同一年内按具体日期先后。";
  }

  function setView(view, push) {
    if (view !== "state" && view !== "year") view = "state";
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
    if (h === "state" || h === "year") setView(h, false);
  });

  var initial = "state";
  var hash = (window.location.hash || "").replace("#", "");
  if (hash === "state" || hash === "year") initial = hash;
  setView(initial, false);
  loadVisitors();
})();
