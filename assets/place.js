(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var set = params.get("set") || "shanghai";

  var JH = window.JINHUA_PLACES || {};
  var JHM = window.JINHUA_META || {};
  var JC = window.JINCHENG_PLACES || {};
  var JCM = window.JINCHENG_META || {};
  var HN = window.HAINAN_PLACES || [];
  var NX = window.NINGXIA_PLACES || [];
  var TJ = window.TIANJIN_PLACES || [];
  var HLJ = window.HEILONGJIANG_PLACES || [];
  var GZ = window.GUIZHOU_PLACES || [];
  var ZJ = window.ZHEJIANG_PLACES || [];
  var SX = window.SHANXI_PLACES || [];
  var SN = window.SN_PLACES || [];
  var GS = window.GS_PLACES || [];
  var QH = window.QH_PLACES || [];
  var XJ = window.XJ_PLACES || [];
  var GD = window.GD_PLACES || [];
  var GX = window.GX_PLACES || [];
  var HEB = window.HEB_PLACES || [];
  var JS = window.JS_PLACES || [];
  var NMG = window.NMG_PLACES || [];
  var LN = window.LN_PLACES || [];
  var JL = window.JL_PLACES || [];
  var AH = window.AH_PLACES || [];
  var JX = window.JX_PLACES || [];
  var FJ = window.FJ_PLACES || [];
  var SD = window.SD_PLACES || [];
  var HN = window.HN_PLACES || [];
  var HB = window.HB_PLACES || [];
  var HN2 = window.HN2_PLACES || [];
  var CQ = window.CQ_PLACES || [];
  var SC = window.SC_PLACES || [];

  var source, backHref, backLabel;
  if (set === "beijing") {
    source = window.BEIJING_PLACES || [];
    backHref = "beijing.html";
    backLabel = "← 北京清单";
  } else if (set === "yiwu") {
    source = window.YIWU_PLACES || [];
    backHref = "yiwu.html";
    backLabel = "← 义乌清单";
  } else if (JH[set]) {
    source = JH[set];
    backHref = JHM[set].page;
    backLabel = "← " + JHM[set].name + "清单";
  } else if (JC[set]) {
    source = JC[set];
    backHref = JCM[set].page;
    backLabel = "← " + JCM[set].name + "清单";
  } else if (set === "hainan") {
    source = HN;
    backHref = "hainan-guobao.html";
    backLabel = "← 海南清单";
  } else if (set === "ningxia") {
    source = NX;
    backHref = "ningxia-guobao.html";
    backLabel = "← 宁夏清单";
  } else if (set === "tianjin") {
    source = TJ;
    backHref = "tianjin-guobao.html";
    backLabel = "← 天津清单";
  } else if (set === "heilongjiang") {
    source = HLJ;
    backHref = "heilongjiang-guobao.html";
    backLabel = "← 黑龙江清单";
  } else if (set === "guizhou") {
    source = GZ;
    backHref = "guizhou-guobao.html";
    backLabel = "← 贵州清单";
  } else if (set === "zhejiang") {
    source = ZJ;
    backHref = "zhejiang.html";
    backLabel = "← 浙江";
  } else if (set === "shanxi") {
    source = SX;
    backHref = "shanxi-guobao.html";
    backLabel = "← 山西清单";
  } else if (set === "shaanxi") { source = SN; backHref = "shaanxi-guobao.html"; backLabel = "← 陕西清单"; }
  else if (set === "gansu") { source = GS; backHref = "gansu-guobao.html"; backLabel = "← 甘肃清单"; }
  else if (set === "qinghai") { source = QH; backHref = "qinghai-guobao.html"; backLabel = "← 青海清单"; }
  else if (set === "xinjiang") { source = XJ; backHref = "xinjiang-guobao.html"; backLabel = "← 新疆清单"; }
  else if (set === "guangdong") { source = GD; backHref = "guangdong-guobao.html"; backLabel = "← 广东清单"; }
  else if (set === "guangxi") { source = GX; backHref = "guangxi-guobao.html"; backLabel = "← 广西清单"; }
  else if (set === "hebei") { source = HEB; backHref = "hebei-guobao.html"; backLabel = "← 河北清单"; }
  else if (set === "jiangsu") { source = JS; backHref = "jiangsu-guobao.html"; backLabel = "← 江苏清单"; }
  else if (set === "neimenggu") { source = NMG; backHref = "neimenggu-guobao.html"; backLabel = "← 内蒙古清单"; }
  else if (set === "liaoning") { source = LN; backHref = "liaoning-guobao.html"; backLabel = "← 辽宁清单"; }
  else if (set === "jilin") { source = JL; backHref = "jilin-guobao.html"; backLabel = "← 吉林清单"; }
  else if (set === "anhui") { source = AH; backHref = "anhui-guobao.html"; backLabel = "← 安徽清单"; }
  else if (set === "jiangxi") { source = JX; backHref = "jiangxi-guobao.html"; backLabel = "← 江西清单"; }
  else if (set === "fujian") { source = FJ; backHref = "fujian-guobao.html"; backLabel = "← 福建清单"; }
  else if (set === "shandong") { source = SD; backHref = "shandong-guobao.html"; backLabel = "← 山东清单"; }
  else if (set === "henan") { source = HN; backHref = "henan-guobao.html"; backLabel = "← 河南清单"; }
  else if (set === "hubei") { source = HB; backHref = "hubei-guobao.html"; backLabel = "← 湖北清单"; }
  else if (set === "hunan") { source = HN2; backHref = "hunan-guobao.html"; backLabel = "← 湖南清单"; }
  else if (set === "chongqing") { source = CQ; backHref = "chongqing-guobao.html"; backLabel = "← 重庆清单"; }
  else if (set === "sichuan") { source = SC; backHref = "sichuan-guobao.html"; backLabel = "← 四川清单"; }
  else {
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
  var county = (JH[set] && JHM[set]) ? JHM[set].name : ((JC[set] && JCM[set]) ? JCM[set].name : "");

  document.title = item.name + " · " + (county || item.district);

  document.getElementById("chips").innerHTML = '' +
    '<span class="chip solid">' + b.label + (b.year ? " · " + b.year : "") + '</span>' +
    '<span class="chip">' + item.code + '</span>' +
    '<span class="chip">' + (county || item.district) + '</span>';

  document.getElementById("name").textContent = item.name;
  document.getElementById("sub").textContent = item.type + (item.era && item.era !== "—" ? " · " + item.era : "");

  var noteEl = document.getElementById("note");
  if (item.note) {
    noteEl.textContent = item.note;
    noteEl.hidden = false;
  }

  document.getElementById("intro").textContent = item.intro;

  var facts = [
    ["批次", b.label + (b.year ? " · " + b.year : "")],
    ["编号", item.code],
    ["所在", (county ? (county === item.district ? county : county + " · " + item.district) : item.district) + (item.district2 ? " / " + item.district2 : "")],
    ["类型", item.type]
  ];

  if (item.era && item.era !== "—") facts.push(["年代", item.era]);

  if (item.statusText) {
    facts.push(["状态", '<span class="dot ' + item.status + '" style="display:inline-block;margin-right:6px;vertical-align:1px;"></span>' + item.statusText]);
  }
  if (item.address) {
    var mapUrl = "https://www.amap.com/search?query=" + encodeURIComponent(item.name + " " + item.address);
    facts.push(["地址", '<a href="' + mapUrl + '" target="_blank" rel="noopener">' + item.address + ' ↗</a>']);
  }

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
