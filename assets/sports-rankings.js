(function () {
  "use strict";

  var data = window.SPORTS_RANKINGS || { panels: {} };
  var panels = data.panels || {};
  var tabsEl = document.getElementById("sr-tabs");
  var panelEl = document.getElementById("sr-panel");
  var updatedEl = document.getElementById("sr-updated");

  var SPORTS = [
    { id: "snooker", label: "斯诺克" },
    { id: "tennis", label: "网球" }
  ];
  var state = { sport: "snooker" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function currentPanelId() {
    return state.sport;
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

  function pendingBlock(p) {
    return '<div class="sr-pending">' +
      '<p class="sr-pending-title">' + esc(p.sub || p.title) + "</p>" +
      '<p class="sr-pending-note">' + esc(p.note || "数据源尚未接通。") + "</p>" +
      '<p class="sr-pending-src">来源：<a href="' + esc(p.source) + '" target="_blank" rel="noopener">' +
        esc(p.sourceLabel || p.source) + " ↗</a></p>" +
    "</div>";
  }

  // 中国球员的夺冠明细，点名字展开
  function titlesBlock(row, colspan) {
    var items = row.titles.map(function (t) {
      return '<li><span class="sr-title-year">' + esc(t.y) + "</span>" +
        '<span class="sr-title-event">' + esc(t.e) + "</span></li>";
    }).join("");
    return '<tr class="sr-detail" hidden><td colspan="' + colspan + '">' +
      '<ul class="sr-title-list">' + items + "</ul>" +
    "</td></tr>";
  }

  function nameCell(row) {
    var inner =
      '<span class="sr-name">' + esc(row.name) +
        (row.region ? '<span class="sr-region">' + esc(row.region) + "</span>" : "") +
      "</span>" +
      (row.en ? '<span class="sr-name-en">' + esc(row.en) + "</span>" : "") +
      // 窄屏会把「国家」整列收起，这时把国家补到球员名下面
      (row.country ? '<span class="sr-inline-country">' + esc(row.country) + "</span>" : "");

    if (row.titles && row.titles.length) {
      return '<button type="button" class="sr-name-btn" aria-expanded="false">' + inner + "</button>";
    }
    return '<span class="sr-name-plain">' + inner + "</span>";
  }

  function sectionBlock(s) {
    var cols = s.columns || [];

    var head = cols.map(function (col) {
      return '<th class="sr-' + esc(col.c || "player") + '">' + esc(col.label) + "</th>";
    }).join("");

    var body = s.rows.map(function (row) {
      var cells = cols.map(function (col) {
        if (col.k === "name") {
          return '<td class="sr-player">' + nameCell(row) + "</td>";
        }
        var v = row[col.k] == null ? "" : row[col.k];
        return '<td class="sr-' + esc(col.c || "player") + '">' + esc(v) + "</td>";
      }).join("");

      var out = "<tr>" + cells + "</tr>";
      if (row.titles && row.titles.length) out += titlesBlock(row, cols.length);
      return out;
    }).join("");

    return '<section class="sr-section' + (s.wide ? " is-wide" : "") + '">' +
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
    panelEl.innerHTML = ok
      ? '<div class="sr-grid">' + p.sections.map(sectionBlock).join("") + "</div>"
      : pendingBlock(p);
  }

  function render() {
    var stamp = fmtStamp(data.fetchedAt);
    updatedEl.textContent = stamp ? "数据更新于 " + stamp : "尚未抓取数据";
    renderTabs();
    renderPanel();
    try { history.replaceState(null, "", "#" + currentPanelId()); } catch (e) {}
  }

  // 展开 / 收起中国球员的夺冠明细
  panelEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".sr-name-btn");
    if (!btn) return;
    var tr = btn.closest("tr");
    var detail = tr && tr.nextElementSibling;
    if (!detail || !detail.classList.contains("sr-detail")) return;
    detail.hidden = !detail.hidden;
    btn.setAttribute("aria-expanded", String(!detail.hidden));
    btn.classList.toggle("is-open", !detail.hidden);
  });

  tabsEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".sr-tab");
    if (!btn) return;
    state.sport = btn.getAttribute("data-sport");
    render();
  });

  // 支持直接打开 #snooker / #tennis（#atp、#wta 也指向网球页）
  (function initFromHash() {
    var h = (location.hash || "").replace("#", "");
    if (h === "snooker") {
      state.sport = "snooker";
    } else if (h === "tennis" || h === "atp" || h === "wta") {
      state.sport = "tennis";
    }
  })();

  render();
})();
