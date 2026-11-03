(function () {
  "use strict";

  var data = window.SPORTS_RANKINGS || { panels: {} };
  var panels = data.panels || {};
  var tabsEl = document.getElementById("sr-tabs");
  var subEl = document.getElementById("sr-subtabs");
  var panelEl = document.getElementById("sr-panel");
  var updatedEl = document.getElementById("sr-updated");

  var SPORTS = [
    { id: "snooker", label: "斯诺克", panel: "snooker" },
    { id: "tennis", label: "网球", panel: null }
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
      '<p class="sr-pending-title">' + esc(p.sub) + "</p>" +
      '<p class="sr-pending-note">' + esc(p.note || "数据源尚未接通。") + "</p>" +
      '<p class="sr-pending-src">来源：<a href="' + esc(p.source) + '" target="_blank" rel="noopener">' +
        esc(p.sourceLabel || p.source) + " ↗</a></p>" +
    "</div>";
  }

  function tableBlock(p) {
    var rows = p.rows.map(function (r) {
      var name = r.nameZh || r.name;
      var sub = r.nameZh ? '<span class="sr-name-en">' + esc(r.name) + "</span>" : "";
      var cn = r.countryZh || "";
      var code = r.country || "";
      // 窄屏时 .sr-country 整列隐藏，国家信息从这里补回来
      var inline = (cn || code)
        ? '<span class="sr-inline-country">' + esc(cn) +
          (cn && code ? " · " : "") + esc(code) + "</span>"
        : "";
      return "<tr>" +
        '<td class="sr-rank">' + esc(r.rank) + "</td>" +
        '<td class="sr-player"><span class="sr-name">' + esc(name) + "</span>" + sub + inline + "</td>" +
        '<td class="sr-country">' + esc(cn) +
          (code ? '<span class="sr-code">' + esc(code) + "</span>" : "") + "</td>" +
        '<td class="sr-points">' + esc(r.points) + "</td>" +
      "</tr>";
    }).join("");

    return '<div class="sr-head">' +
        '<h2 class="sr-title">' + esc(p.title) + "</h2>" +
        '<span class="sr-sub">' + esc(p.sub) + "</span>" +
        '<span class="sr-count">' + p.rows.length + " 条</span>" +
      "</div>" +
      '<div class="sr-table-wrap"><table class="sr-table">' +
        "<thead><tr>" +
          '<th class="sr-rank">名次</th>' +
          "<th>球员</th>" +
          '<th class="sr-country">国家</th>' +
          '<th class="sr-points">积分</th>' +
        "</tr></thead>" +
        "<tbody>" + rows + "</tbody>" +
      "</table></div>" +
      '<p class="sr-src">来源：<a href="' + esc(p.source) + '" target="_blank" rel="noopener">' +
        esc(p.sourceLabel || p.source) + " ↗</a>" +
        (p.note ? '<span class="sr-src-note">' + esc(p.note) + "</span>" : "") +
      "</p>";
  }

  function renderPanel() {
    var p = panels[currentPanelId()];
    if (!p) {
      panelEl.innerHTML = '<p class="sr-missing">这个榜单还没有数据。</p>';
      return;
    }
    var ok = p.status === "ok" && p.rows && p.rows.length;
    panelEl.innerHTML = ok ? tableBlock(p) : pendingBlock(p);
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

  // 支持直接打开 #wta / #atp / #snooker
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
