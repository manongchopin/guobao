(function () {
  "use strict";

  var sites = (window.WH_SITES || []).slice().sort(function (a, b) {
    return a.year - b.year || Number(a.uid) - Number(b.uid);
  });
  var id = new URLSearchParams(window.location.search).get("id") || "";
  var site = null;
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].uid === id) { site = sites[i]; break; }
  }

  if (!site) {
    document.getElementById("name").textContent = "没有找到这一项";
    document.getElementById("sub").textContent = "链接可能不完整，回到清单重新选择即可。";
    document.getElementById("intro").textContent = "";
    document.getElementById("photo-tip").innerHTML = '<a href="heritage.html">← 返回世界遗产清单</a>';
    document.title = "没有找到 · 世界遗产";
    return;
  }

  var typeLabel = site.type === "文化" ? "文化遗产" : site.type === "自然" ? "自然遗产" : "复合遗产";
  var unesco = "https://whc.unesco.org/en/list/" + site.uid + "/";

  document.title = site.name + " · 世界遗产";
  document.getElementById("chips").innerHTML =
    '<span class="chip solid">' + site.year + " 年</span>" +
    '<span class="chip">#' + site.uid + '</span>' +
    '<span class="chip">' + typeLabel + '</span>';
  document.getElementById("name").textContent = site.name;
  document.getElementById("sub").textContent = site.provinces.join("、");
  document.getElementById("intro").textContent = site.intro;
  document.getElementById("footer-code").textContent = site.name + " · #" + site.uid;

  var facts = [
    ["列入年份", site.year + " 年"],
    ["编号", "#" + site.uid],
    ["类型", typeLabel],
    ["省份", site.provinces.join("、")],
    ["标准", site.criteria || "—"]
  ];
  if (site.transnational) facts.push(["备注", "跨国遗产"]);
  facts.push(["UNESCO", '<a href="' + unesco + '" target="_blank" rel="noopener">官方页面 ↗</a>']);

  document.getElementById("facts").innerHTML = facts.map(function (f) {
    return '<div class="fact"><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>';
  }).join("");

  /* 照片 */
  var photosEl = document.getElementById("photos");
  var tipEl = document.getElementById("photo-tip");
  var slots = ["全景", "细节", "现场"];

  function placeholders() {
    var icon = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 15.5l5-5 4 4 3-3 6 6"/><circle cx="8.6" cy="9.4" r="1.3"/></svg>';
    photosEl.innerHTML = slots.map(function (label) {
      return '<div class="slot"><span class="slot-icon">' + icon + '</span><span class="slot-label">' + label + '</span><span>待补充</span></div>';
    }).join("");
    tipEl.innerHTML = '把照片放进 <code>images/wh-' + site.uid + '/</code>，命名为 <code>1.jpg</code>、<code>2.jpg</code>…… 最多 6 张。';
  }

  function show(list) {
    photosEl.innerHTML = list.map(function (p, idx) {
      return '<figure class="photo"><img src="' + p.src + '" alt="' + site.name + ' 照片 ' + (idx + 1) + '" loading="lazy"><figcaption>照片 ' + (idx + 1) + '</figcaption></figure>';
    }).join("");
    tipEl.innerHTML = '照片存放在 <code>images/wh-' + site.uid + '/</code>。';
  }

  var found = [], pending = 6;
  function done() {
    if (--pending > 0) return;
    found.sort(function (a, b) { return a.n - b.n; });
    if (found.length) show(found); else placeholders();
  }
  for (var n = 1; n <= 6; n++) {
    (function (n) {
      var img = new Image();
      img.onload = function () { if (img.naturalWidth > 0) found.push({ src: img.src, n: n }); done(); };
      img.onerror = done;
      img.src = "images/wh-" + site.uid + "/" + n + ".jpg";
    })(n);
  }

  /* 上一处 / 下一处 */
  var pos = sites.indexOf(site);
  var prev = pos > 0 ? sites[pos - 1] : null;
  var next = pos < sites.length - 1 ? sites[pos + 1] : null;
  function link(p, dir, cls) {
    if (!p) return "<span></span>";
    return '<a class="' + cls + '" href="heritage-place.html?id=' + p.uid + '"><span class="dir">' + dir + '</span><span class="who">' + p.name + '</span></a>';
  }
  document.getElementById("pager").innerHTML = link(prev, "← 上一处", "prev") + link(next, "下一处 →", "next");
})();
