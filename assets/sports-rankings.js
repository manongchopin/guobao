(function () {
  "use strict";

  var data = window.SPORTS_RANKINGS || { panels: {} };
  var panels = data.panels || {};
  var tabsEl = document.getElementById("sr-tabs");
  var subEl = document.getElementById("sr-subtabs");
  var panelEl = document.getElementById("sr-panel");
  var updatedEl = document.getElementById("sr-updated");

  var SPORTS = [
    { id: "snooker", label: "斯诺克" },
    { id: "tennis", label: "网球" }
  ];
  var TOURS = [
    { id: "atp", label: "ATP" },
    { id: "wta", label: "WTA" }
  ];

  var state = { sport: "snooker", tour: "wta" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function currentPanelId() {
    return state.sport === "tennis" ? state.tour : "snooker";
  }

  function fmtStamp(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    try {
      return new Intl.DateTimeFormat("zh-CN", {
        timeZone: "Asia/Shanghai",
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hour12: false
      }).format(d).replace(/\//g, "-");
    } catch (e) {
      return "";
    }
  }

  function renderTabs() {
    tabsEl.innerHTML = SPORTS.map(function (s) {
      var on = state.sport === s.id;
      return '<button type="button" role="tab" class="sr-tab' + (on ? " is-active" : "") +
        '" data-sport="' + esc(s.id) + '" aria-selected="' + on + '">' + esc(s.label) + "</button>";
    }).join("");
  }

  function renderSubtabs() {
    if (state.sport !== "tennis") {
      subEl.hidden = true;
      subEl.innerHTML = "";
      return;
    }
    subEl.hidden = false;
    subEl.innerHTML = TOURS.map(function (t) {
      var on = state.tour === t.id;
      return '<button type="button" role="tab" class="sr-subtab' + (on ? " is-active" : "") +
        '" data-tour="' + esc(t.id) + '" aria-selected="' + on + '">' + esc(t.label) + "</button>";
    }).join("");
  }

  function pendingBlock(p) {
    return '<div class="sr-pending">' +
      '<p class="sr-pending-title">' + esc(p.sub || p.title) + "</p>" +
      '<p class="sr-pending-note">' + esc(p.note || "数据源尚未接通。") + "</p>" +
      '<p class="sr-pending-src">来源：<a href="' + esc(p.source) + '" target="_blank" rel="noopener">' +
        esc(p.sourceLabel || p.source) + " ↗</a></p>" +
    "</div>";
  }

  function sectionBlock(s) {
    var cols = s.columns || [];

    var head = cols.map(function (col) {
      return '<th class="sr-' + esc(col.c || "player") + '">' + esc(col.label) + "</th>";
    }).join("");

    var body = s.rows.map(function (row) {
      return "<tr>" + cols.map(function (col) {
        var v = row[col.k] == null ? "" : row[col.k];
        var inner = esc(v);
        // 窄屏会把「国家」整列收起，这时把国家补到球员名下面
        if (col.k === "name" && row.country) {
          inner += '<span class="sr-inline-country">' + esc(row.country) + "</span>";
        }
        return '<td class="sr-' + esc(col.c || "player") + '">' + inner + "</td>";
      }).join("") + "</tr>";
    }).join("");

    return '<section class="sr-section">' +
      '<div class="sr-head">' +
        '<h2 class="sr-title">' + esc(s.title) + "</h2>" +
        (s.sub ? '<span class="sr-sub">' + esc(s.sub) + "</span>" : "") +
        '<span class="sr-count">' + s.rows.length + " 条</span>" +
      "</div>" +
      '<div class="sr-table-wrap"><table class="sr-table">' +
        "<thead><tr>" + head + "</tr></thead>" +
        "<tbody>" + body + "</tbody>" +
      "</table></div>" +
      '<p class="sr-src">来源：<a href="' + esc(s.source) + '" target="_blank" rel="noopener">' +
        esc(s.sourceLabel || s.source) + " ↗</a>" +
        (s.note ? '<span class="sr-src-note">' + esc(s.note) + "</span>" : "") +
      "</p>" +
    "</section>";
  }

  function renderPanel() {
    var p = panels[currentPanelId()];
    if (!p) {
      panelEl.innerHTML = '<p class="sr-missing">这个榜单还没有数据。</p>';
      return;
    }
    var ok = p.status === "ok" && p.sections && p.sections.length;
    panelEl.innerHTML = ok ? p.sections.map(sectionBlock).join("") : pendingBlock(p);
  }

  function render() {
    var stamp = fmtStamp(data.fetchedAt);
    updatedEl.textContent = stamp ? "数据更新于 " + stamp : "尚未抓取数据";
    renderTabs();
    renderSubtabs();
    renderPanel();
    try { history.replaceState(null, "", "#" + currentPanelId()); } catch (e) {}
  }

  tabsEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".sr-tab");
    if (!btn) return;
    state.sport = btn.getAttribute("data-sport");
    render();
  });

  subEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".sr-subtab");
    if (!btn) return;
    state.tour = btn.getAttribute("data-tour");
    render();
  });

  // 支持直接打开 #snooker / #atp / #wta
  (function initFromHash() {
    var h = (location.hash || "").replace("#", "");
    if (h === "snooker") {
      state.sport = "snooker";
    } else if (h === "atp" || h === "wta") {
      state.sport = "tennis";
      state.tour = h;
    }
  })();

  render();
})();
