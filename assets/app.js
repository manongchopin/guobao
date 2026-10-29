(function () {
  "use strict";

  var cfg = window.LIST_CONFIG || {};
  var places = cfg.places || window.PLACES || [];
  var batches = window.BATCHES || [];
  var districts = cfg.districts || window.DISTRICTS || [];
  var detailBase = cfg.detailBase || "place.html?id=";
  var noteBatch = cfg.noteBatch || "8 批 · 41 个点位";
  var noteDistrict = cfg.noteDistrict || "13 个区 · 41 个点位";

  var listEl = document.getElementById("list");
  var noteEl = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));

  var VIEW_KEY = cfg.storageKey || "sh-guobao-view";
  var currentView = null;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function batchOf(n) {
    for (var i = 0; i < batches.length; i++) {
      if (batches[i].n === n) return batches[i];
    }
    return { n: n, label: "第" + n + "批", year: "" };
  }

  function cardHTML(item, view) {
    var meta = view === "batch"
      ? item.district + (item.district2 ? " / " + item.district2 : "")
      : (function () {
          var b = batchOf(item.batch);
          return b.label + (b.year ? " · " + b.year : "");
        })();

    var badge = item.note && item.note.indexOf("子项") === 0
      ? ' <span class="card-sub">子项</span>'
      : "";

    return '' +
      '<a class="card" href="' + detailBase + encodeURIComponent(item.id) + '">' +
        '<div class="card-name">' + item.name + badge + '</div>' +
        '<div class="card-meta">' + meta + ' · ' + item.type + '</div>' +
        '<div class="card-foot">' +
          '<span class="dot ' + item.status + '"></span>' +
          '<span>' + item.statusText + '</span>' +
          '<span class="card-arrow" aria-hidden="true">→</span>' +
        '</div>' +
      '</a>';
  }

  function groupHTML(title, sub, items, view) {
    var cards = items.slice().sort(function (a, b) {
      if (view === "batch") {
        var sa = a.note && a.note.indexOf("子项") === 0 ? 1 : 0;
        var sb = b.note && b.note.indexOf("子项") === 0 ? 1 : 0;
        if (sa !== sb) return sa - sb;
      }
      return a.order - b.order;
    });
    return '' +
      '<section class="group">' +
        '<div class="group-head">' +
          '<h2>' + title + '</h2>' +
          (sub ? '<span class="year">' + sub + '</span>' : '') +
          '<span class="count">' + cards.length + ' 个点位</span>' +
        '</div>' +
        '<div class="grid">' + cards.map(function (it) { return cardHTML(it, view); }).join('') + '</div>' +
      '</section>';
  }

  function render(view) {
    var html = "";

    if (view === "district") {
      districts.forEach(function (d) {
        var items = places.filter(function (p) { return p.district === d; });
        if (!items.length) return;
        html += groupHTML(d, "", items, view);
      });
      // 防御：万一有区不在 DISTRICTS 里
      places.forEach(function (p) {
        if (districts.indexOf(p.district) === -1) {
          html += groupHTML(p.district, "", places.filter(function (q) { return q.district === p.district; }), view);
        }
      });
      noteEl.textContent = noteDistrict;
    } else {
      batches.forEach(function (b) {
        var items = places.filter(function (p) { return p.batch === b.n; });
        if (!items.length) return;
        html += groupHTML(b.label, b.year, items, view);
      });
      noteEl.textContent = noteBatch;
    }

    listEl.innerHTML = html;
    listEl.classList.remove("enter");
    // 强制重排，让切换时有一次轻微的淡入
    void listEl.offsetWidth;
    listEl.classList.add("enter");
  }

  function setView(view, push) {
    if (view !== "batch" && view !== "district") view = "batch";

    var changed = currentView !== view;
    currentView = view;

    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === view));
    });

    try { localStorage.setItem(VIEW_KEY, view); } catch (e) {}

    if (push && ("#" + view) !== window.location.hash) {
      window.location.hash = view;
    }

    if (changed) render(view);
  }

  function initialView() {
    var h = (window.location.hash || "").replace("#", "");
    if (h === "district" || h === "batch") return h;
    try {
      var saved = localStorage.getItem(VIEW_KEY);
      if (saved === "district" || saved === "batch") return saved;
    } catch (e) {}
    return "batch";
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var changed = b.getAttribute("aria-pressed") !== "true";
      setView(b.getAttribute("data-view"), true);
      if (changed) {
        var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      }
    });
  });

  window.addEventListener("hashchange", function () {
    var h = (window.location.hash || "").replace("#", "");
    if (h === "district" || h === "batch") setView(h, false);
  });

  setView(initialView(), false);
})();
