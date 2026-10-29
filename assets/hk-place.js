(function () {
  "use strict";

  var items = window.HK_PLACES || [];
  var id = new URLSearchParams(window.location.search).get("id") || "";
  var it = null;
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) { it = items[i]; break; }
  }

  if (!it) {
    document.getElementById("name").textContent = "没有找到这一处";
    document.getElementById("sub").textContent = "链接可能不完整，回到清单重新选择即可。";
    document.getElementById("intro").textContent = "";
    document.getElementById("photo-tip").innerHTML = '<a href="hongkong.html">← 返回香港法定古迹</a>';
    document.title = "没有找到 · 香港法定古迹";
    return;
  }

  function yearText(s) {
    if (!s) return "";
    return s.replace(/年至/g, "—").replace(/年$/, "");
  }

  document.title = it.name + " · 香港法定古迹";
  document.getElementById("chips").innerHTML =
    '<span class="chip solid">' + it.id + "</span>" +
    '<span class="chip">' + it.district + "</span>" +
    (it.built ? '<span class="chip">' + yearText(it.built) + "</span>" : "");
  document.getElementById("name").textContent = it.name;
  document.getElementById("sub").textContent = it.address;
  document.getElementById("intro").textContent = it.note || "暂无简介。";
  document.getElementById("footer-code").textContent = it.name + " · " + it.id;

  var facts = [
    ["编号", it.id],
    ["辖区", it.region + " · " + it.district],
    ["地址", it.address],
    ["建筑年份", yearText(it.built) || "—"],
    ["宣布年份", it.declared ? it.declared + " 年" : "—"]
  ];
  if (it.lat && it.lng) {
    var osm = "https://www.openstreetmap.org/?mlat=" + it.lat + "&mlon=" + it.lng +
      "#map=18/" + it.lat + "/" + it.lng;
    facts.push(["位置", '<a href="' + osm + '" target="_blank" rel="noopener">在地图上查看 ↗</a>']);
  }
  document.getElementById("facts").innerHTML = facts.map(function (f) {
    return '<div class="fact"><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>';
  }).join("");

  /* 照片 */
  var photosEl = document.getElementById("photos");
  var tipEl = document.getElementById("photo-tip");
  var slots = ["外观", "细节", "周边"];

  function placeholders() {
    var icon = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 15.5l5-5 4 4 3-3 6 6"/><circle cx="8.6" cy="9.4" r="1.3"/></svg>';
    photosEl.innerHTML = slots.map(function (label) {
      return '<div class="slot"><span class="slot-icon">' + icon + '</span><span class="slot-label">' + label + '</span><span>待补充</span></div>';
    }).join("");
    tipEl.innerHTML = '把照片放进 <code>images/hk-' + it.id + '/</code>，命名为 <code>1.jpg</code>、<code>2.jpg</code>…… 最多 6 张。';
  }

  function show(list) {
    photosEl.innerHTML = list.map(function (p, idx) {
      return '<figure class="photo"><img src="' + p.src + '" alt="' + it.name + ' 照片 ' + (idx + 1) + '" loading="lazy"><figcaption>照片 ' + (idx + 1) + '</figcaption></figure>';
    }).join("");
    tipEl.innerHTML = '照片存放在 <code>images/hk-' + it.id + '/</code>。';
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
      img.src = "images/hk-" + it.id + "/" + n + ".jpg";
    })(n);
  }

  /* 上一处 / 下一处 */
  var pos = items.indexOf(it);
  var prev = pos > 0 ? items[pos - 1] : null;
  var next = pos < items.length - 1 ? items[pos + 1] : null;
  function link(p, dir, cls) {
    if (!p) return "<span></span>";
    return '<a class="' + cls + '" href="hk-place.html?id=' + encodeURIComponent(p.id) + '"><span class="dir">' + dir + '</span><span class="who">' + p.name + '</span></a>';
  }
  document.getElementById("pager").innerHTML = link(prev, "← 上一处", "prev") + link(next, "下一处 →", "next");
})();
