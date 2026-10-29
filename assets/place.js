(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var set = params.get("set") || "shanghai";

  var JH = window.JINHUA_PLACES || {};
  var JHM = window.JINHUA_META || {};

  var source, backHref, backLabel;
  if (set === "yiwu") {
    source = window.YIWU_PLACES || [];
    backHref = "yiwu.html";
    backLabel = "← 义乌清单";
  } else if (JH[set]) {
    source = JH[set];
    backHref = JHM[set].page;
    backLabel = "← " + JHM[set].name + "清单";
  } else {
    source = window.PLACES || [];
    backHref = "shanghai.html";
    backLabel = "← 上海清单";
  }

  var places = source.slice().sort(function (a, b) { return a.order - b.order; });
  var batches = window.BATCHES || [];

  var id = params.get("id") || params.get("p") || "";

  var backEl = document.getElementById("back");
  backEl.href = backHref;
  backEl.textContent = backLabel;

  var item = null;
  for (var i = 0; i < places.length; i++) {
    if (places[i].id === id || places[i].code === id) { item = places[i]; break; }
  }

  if (!item) {
    document.getElementById("name").textContent = "没有找到这一处";
    document.getElementById("sub").textContent = "链接可能不完整，回到清单重新选择即可。";
    document.getElementById("intro").textContent = "";
    document.getElementById("photo-tip").innerHTML = '<a href="' + backEl.getAttribute("href") + '">返回清单</a>';
    document.title = "没有找到 · 国保";
    return;
  }

  function batchOf(n) {
    for (var k = 0; k < batches.length; k++) {
      if (batches[k].n === n) return batches[k];
    }
    return { n: n, label: "第" + n + "批", year: "" };
  }

  var b = batchOf(item.batch);
  var county = (JH[set] && JHM[set]) ? JHM[set].name : "";

  document.title = item.name + " · " + (county || item.district);

  document.getElementById("chips").innerHTML = '' +
    '<span class="chip solid">' + b.label + (b.year ? " · " + b.year : "") + '</span>' +
    '<span class="chip">' + item.code + '</span>' +
    '<span class="chip">' + (county || item.district) + '</span>';

  document.getElementById("name").textContent = item.name;
  document.getElementById("sub").textContent = item.type + " · " + item.era;

  var noteEl = document.getElementById("note");
  if (item.note) {
    noteEl.textContent = item.note;
    noteEl.hidden = false;
  }

  document.getElementById("intro").textContent = item.intro;

  var mapUrl = "https://www.amap.com/search?query=" +
    encodeURIComponent(item.name + " " + item.address);

  var facts = [
    ["批次", b.label + (b.year ? " · " + b.year : "")],
    ["编号", item.code],
    ["所在", (county ? county + " · " : "") + item.district + (item.district2 ? " / " + item.district2 : "")],
    ["类型", item.type],
    ["年代", item.era],
    ["状态", '<span class="dot ' + item.status + '" style="display:inline-block;margin-right:6px;vertical-align:1px;"></span>' + item.statusText],
    ["地址", '<a href="' + mapUrl + '" target="_blank" rel="noopener">' + item.address + ' ↗</a>']
  ];

  if (item.route) facts.push(["线路", item.route]);

  document.getElementById("facts").innerHTML = facts.map(function (f) {
    return '<div class="fact"><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>';
  }).join("");

  document.getElementById("footer-code").textContent = item.name + " · " + item.code;

  var visitBtn = document.getElementById("visit-btn");
  var walkHint = document.getElementById("walk-hint");

  function syncVisit() {
    var on = !!(window.Visited && Visited.has(item.id));
    visitBtn.textContent = on ? "已去过 · 点击取消" : "标记为已去过";
    visitBtn.classList.toggle("is-on", on);
    visitBtn.setAttribute("aria-pressed", String(on));
    if (window.Visited) {
      var got = places.filter(function (p) { return Visited.has(p.id); }).length;
      walkHint.textContent = "本清单已走 " + got + " / " + places.length;
    }
  }

  visitBtn.addEventListener("click", function () {
    if (!window.Visited) return;
    Visited.toggle(item.id);
    syncVisit();
  });
  syncVisit();

  /* ---------- 照片 ---------- */

  var photosEl = document.getElementById("photos");
  var tipEl = document.getElementById("photo-tip");
  var slots = ["文保碑", "建筑本体", "环境与细节"];

  function renderPlaceholders() {
    var icon = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="3" y="5" width="18" height="14" rx="1.5"/>' +
      '<path d="M3 15.5l5-5 4 4 3-3 6 6"/>' +
      '<circle cx="8.6" cy="9.4" r="1.3"/>' +
      '</svg>';

    photosEl.innerHTML = slots.map(function (label) {
      return '' +
        '<div class="slot">' +
          '<span class="slot-icon">' + icon + '</span>' +
          '<span class="slot-label">' + label + '</span>' +
          '<span>待补充</span>' +
        '</div>';
    }).join("");
    tipEl.innerHTML = '把照片放进 <code>images/' + item.id + '/</code> 文件夹，命名为 ' +
      '<code>1.jpg</code>、<code>2.jpg</code>…… 最多 6 张，刷新本页即可自动出现。';
  }

  function renderPhotos(list) {
    photosEl.innerHTML = list.map(function (p, idx) {
      return '' +
        '<figure class="photo">' +
          '<img src="' + p.src + '" alt="' + item.name + ' 照片 ' + (idx + 1) + '" loading="lazy">' +
          '<figcaption>照片 ' + (idx + 1) + '</figcaption>' +
        '</figure>';
    }).join("");
    tipEl.innerHTML = '照片存放在 <code>images/' + item.id + '/</code>。想再加，按序号继续放进去即可。';
  }

  if (Array.isArray(item.photos) && item.photos.length) {
    renderPhotos(item.photos.map(function (src) { return { src: src }; }));
  } else {
    // 不用声明，自动探测 images/<id>/1.jpg … 6.jpg
    var found = [];
    var pending = 6;

    function done() {
      if (--pending > 0) return;
      found.sort(function (a, c) { return a.n - c.n; });
      if (found.length) renderPhotos(found);
      else renderPlaceholders();
    }

    for (var n = 1; n <= 6; n++) {
      (function (n) {
        var img = new Image();
        img.onload = function () {
          if (img.naturalWidth > 0) found.push({ src: img.src, n: n });
          done();
        };
        img.onerror = done;
        img.src = "images/" + item.id + "/" + n + ".jpg";
      })(n);
    }
  }

  /* ---------- 游记 ---------- */

  var notesEl = document.getElementById("notes");
  if (item.travel && item.travel.trim()) {
    notesEl.className = "travel";
    notesEl.textContent = "";
    item.travel.split(/\n{2,}/).forEach(function (para) {
      var p = document.createElement("p");
      p.textContent = para;
      notesEl.appendChild(p);
    });
  }

  /* ---------- 上一处 / 下一处 ---------- */

  function urlFor(p) {
    return "place.html?" + (set === "shanghai" ? "" : "set=" + set + "&") +
      "id=" + encodeURIComponent(p.id);
  }

  var pos = places.indexOf(item);
  var prev = pos > 0 ? places[pos - 1] : null;
  var next = pos < places.length - 1 ? places[pos + 1] : null;

  function link(p, dir, cls) {
    if (!p) return "<span></span>";
    return '' +
      '<a class="' + cls + '" href="' + urlFor(p) + '">' +
        '<span class="dir">' + dir + '</span>' +
        '<span class="who">' + p.name + '</span>' +
      '</a>';
  }

  document.getElementById("pager").innerHTML =
    link(prev, "← 上一处", "prev") + link(next, "下一处 →", "next");
})();
