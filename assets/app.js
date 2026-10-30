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

  var toolbarInner = document.querySelector(".toolbar-inner");
  var walkEl = document.createElement("span");
  walkEl.className = "walk-count";
  walkEl.id = "walk-count";
  if (toolbarInner) toolbarInner.appendChild(walkEl);

  function updateWalk() {
    if (!walkEl) return;
    var got = places.filter(function (p) {
      return window.Visited && Visited.has(p.id);
    }).length;
    walkEl.innerHTML = "已走 <b>" + got + "</b>/" + places.length;
  }

  var VIEW_KEY = cfg.storageKey || "sh-guobao-view";
  var currentView = null;
  var districtTable = cfg.districtTable === true;
  var batchTable = cfg.batchTable === true;
  var districtFilter = "all";
  var countyFilter = null;
  var cityGroups = cfg.cityGroups || null;
  var urlCounty = null;
  try { urlCounty = new URLSearchParams(window.location.search).get("county"); } catch (e) {}
  if (urlCounty) {
    if (cityGroups) {
      cityGroups.forEach(function (g) {
        if (g.counties.indexOf(urlCounty) !== -1) { districtFilter = g.name; countyFilter = urlCounty; }
      });
    } else if (districts.indexOf(urlCounty) !== -1) {
      districtFilter = urlCounty;
    }
  }
  var indexTitle = cfg.indexTitle || "辖区索引";
  var col4Label = cfg.col4Label || "地址";
  var hideStatus = cfg.hideStatus === true;
  var countUnit = cfg.countUnit || "个点位";

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

    var visited = !!(window.Visited && Visited.has(item.id));

    return '' +
      '<div class="card-wrap' + (visited ? ' is-visited' : '') + '">' +
        '<a class="card" href="' + detailBase + encodeURIComponent(item.id) + '">' +
          '<div class="card-name">' + item.name + badge + '</div>' +
          '<div class="card-meta">' + meta + ' · ' + item.type + '</div>' +
          '<div class="card-foot">' +
            '<span class="dot ' + item.status + '"></span>' +
            '<span>' + item.statusText + '</span>' +
            '<span class="card-arrow" aria-hidden="true">→</span>' +
          '</div>' +
        '</a>' +
        '<button type="button" class="visit-btn" data-id="' + item.id + '" aria-pressed="' + visited + '" title="标记为已去过">' +
          (visited ? '✓' : '＋') +
        '</button>' +
      '</div>';
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
          '<span class="count">' + cards.length + ' ' + countUnit + '</span>' +
        '</div>' +
        '<div class="grid">' + cards.map(function (it) { return cardHTML(it, view); }).join('') + '</div>' +
      '</section>';
  }

  function shRow(it, view) {
    var b = batchOf(it.batch);
    var v = !!(window.Visited && Visited.has(it.id));
    var href = detailBase + encodeURIComponent(it.id);
    var showBatch = view !== "batchTable";
    return '<div class="sh-row' + (v ? ' is-visited' : '') + '">' +
      (showBatch ? '<span class="sh-c">' + b.label + '</span>' : '') +
      '<span class="sh-n">' + it.name + '</span>' +
      '<span class="sh-a">' + it.type + '</span>' +
      '<span class="sh-b">' + (it.address || it.era || "—") + '</span>' +
      (hideStatus ? '' : '<span class="sh-e"><span class="dot ' + it.status + '"></span>' + it.statusText + '</span>') +
      '<button type="button" class="visit-btn sh-visit" data-id="' + it.id + '" aria-pressed="' + v + '" title="标记为已去过">' +
        (v ? '✓' : '＋') +
      '</button>' +
      '<a class="sh-hit" href="' + href + '" aria-label="' + it.name + '"></a>' +
    '</div>';
  }

  function shTable(list, view) {
    var showBatch = view !== "batchTable";
    var cols = [];
    if (showBatch) cols.push(["批次", "c"]);
    cols.push(["名称", "n"], ["类型", "a"], [col4Label, "b"]);
    if (!hideStatus) cols.push(["状态", "e"]);

    var rows = list.slice().sort(function (a, b) {
      if (view === "batchTable") {
        var sa = a.note && a.note.indexOf("子项") === 0 ? 1 : 0;
        var sb = b.note && b.note.indexOf("子项") === 0 ? 1 : 0;
        if (sa !== sb) return sa - sb;
      }
      return a.order - b.order;
    });

    return '<div class="sh-table' + (hideStatus ? ' no-status' : '') + (showBatch ? '' : ' no-batch') + '" role="table">' +
      '<div class="sh-row sh-head" role="row">' +
        cols.map(function (c) {
          return '<span class="sh-' + c[1] + '">' + c[0] + '</span>';
        }).join("") +
        '<span class="sh-v"></span>' +
      '</div>' +
      rows.map(function (it) { return shRow(it, view); }).join("") +
    '</div>';
  }

  function districtTableHTML() {
    if (cityGroups) {
      var cidx = '<p class="ci-title">' + indexTitle + '</p>' +
        '<button type="button" class="ci-item' + (districtFilter === "all" ? " is-active" : "") +
        '" data-d="all" aria-pressed="' + (districtFilter === "all") + '"><span>全部</span><b>' + places.length + '</b></button>';
      cityGroups.forEach(function (g) {
        var n = places.filter(function (p) { return g.counties.indexOf(p.district) !== -1; }).length;
        if (!n) return;
        cidx += '<button type="button" class="ci-item' + (districtFilter === g.name ? " is-active" : "") +
          '" data-d="' + g.name + '" aria-pressed="' + (districtFilter === g.name) + '"><span>' + g.name + '</span><b>' + n + '</b></button>';
      });

      var showGroups = districtFilter === "all" ? cityGroups : cityGroups.filter(function (g) { return g.name === districtFilter; });
      var chtml = '<div class="city-layout sh-layout"><aside class="city-index" aria-label="地级市索引">' + cidx + '</aside><div class="city-content">';
      showGroups.forEach(function (g) {
        var cityItems = places.filter(function (p) { return g.counties.indexOf(p.district) !== -1; });
        if (!cityItems.length) return;
        chtml += '<section class="group"><div class="group-head"><h2>' + g.name + '</h2><span class="count">' + cityItems.length + ' ' + countUnit + '</span></div>';
        g.counties.forEach(function (c) {
          if (countyFilter && c !== countyFilter) return;
          var list = places.filter(function (p) { return p.district === c; });
          if (!list.length) return;
          chtml += '<div class="hk-district"><div class="hk-district-head"><h3>' + c + '</h3><span class="count">' + list.length + ' ' + countUnit + '</span></div>' +
            shTable(list, "district") + '</div>';
        });
        chtml += '</section>';
      });
      return chtml + '</div></div>';
    }

    var idx = '<p class="ci-title">' + indexTitle + '</p>' +
      '<button type="button" class="ci-item' + (districtFilter === "all" ? " is-active" : "") +
      '" data-d="all" aria-pressed="' + (districtFilter === "all") + '"><span>全部</span><b>' + places.length + '</b></button>';
    districts.forEach(function (d) {
      var n = places.filter(function (p) { return p.district === d; }).length;
      if (!n) return;
      idx += '<button type="button" class="ci-item' + (districtFilter === d ? " is-active" : "") +
        '" data-d="' + d + '" aria-pressed="' + (districtFilter === d) + '"><span>' + d + '</span><b>' + n + '</b></button>';
    });

    var html = '<div class="city-layout sh-layout"><aside class="city-index" aria-label="辖区索引">' + idx + '</aside><div class="city-content">';
    var show = districtFilter === "all" ? districts : [districtFilter];
    show.forEach(function (d) {
      var list = places.filter(function (p) { return p.district === d; });
      if (!list.length) return;
      html += '<section class="district-block" data-d="' + d + '">' +
        '<div class="group-head"><h2>' + d + '</h2><span class="count">' + list.length + ' ' + countUnit + '</span></div>' +
        shTable(list, "district") +
      '</section>';
    });
    return html + '</div></div>';
  }

  function render(view) {
    var html = "";

    if (view === "district" && districtTable) {
      html = districtTableHTML();
      noteEl.textContent = noteDistrict;
    } else if (view === "batch" && batchTable) {
      batches.forEach(function (b) {
        var items = places.filter(function (p) { return p.batch === b.n; });
        if (!items.length) return;
        html += '<section class="group">' +
          '<div class="group-head"><h2>' + b.label + '</h2>' +
            (b.year ? '<span class="year">' + b.year + '</span>' : '') +
            '<span class="count">' + items.length + ' ' + countUnit + '</span></div>' +
          shTable(items, "batchTable") +
        '</section>';
      });
      noteEl.textContent = noteBatch;
    } else if (view === "district") {
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
    updateWalk();
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
    if (urlCounty && districtTable) return "district";
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

  if (listEl) {
    listEl.addEventListener("click", function (e) {
      var item = e.target.closest(".ci-item");
      if (item && districtTable) {
        districtFilter = item.getAttribute("data-d");
        countyFilter = null;
        render("district");
        var y = listEl.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: "smooth" });
        return;
      }
      var btn = e.target.closest(".visit-btn");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      if (!window.Visited) return;
      var on = Visited.toggle(btn.getAttribute("data-id"));
      var wrap = btn.closest(".card-wrap");
      var row = btn.closest(".sh-row");
      if (wrap) wrap.classList.toggle("is-visited", on);
      if (row) row.classList.toggle("is-visited", on);
      btn.textContent = on ? "✓" : "＋";
      btn.setAttribute("aria-pressed", String(on));
      updateWalk();
    });
  }

  window.addEventListener("hashchange", function () {
    var h = (window.location.hash || "").replace("#", "");
    if (h === "district" || h === "batch") setView(h, false);
  });

  setView(initialView(), false);
})();
