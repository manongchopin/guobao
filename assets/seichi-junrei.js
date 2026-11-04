/* 圣地巡礼 v0.3 · 索引页
   只渲染三个作品横栏；具体内容在各作品页（assets/seichi-work.js）。
*/
(function () {
  "use strict";

  var D = window.SEICHI;
  if (!D) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function byWork(id) {
    return D.spots.filter(function (s) { return s.work === id; });
  }

  var host = document.getElementById("sj-works");
  if (!host) return;

  host.innerHTML = D.works.map(function (w) {
    var spots = byWork(w.id);
    return '<a class="sj-band" href="' + esc(w.page) + '" style="--work:' + w.color + '">' +
      '<span class="sj-no">' + esc(w.no) + "</span>" +
      '<span class="sj-band-main">' +
        '<span class="sj-band-kicker">' + esc(w.en) + "</span>" +
        '<span class="sj-band-title">' + esc(w.title) + "</span>" +
        '<span class="sj-band-desc">' + esc(w.short) + "</span>" +
      "</span>" +
      '<span class="sj-band-side">' + esc(w.days) + "<br>" + esc(w.shape) + " · " + spots.length + " 点</span>" +
      '<span class="sj-band-arrow">→</span>' +
    "</a>";
  }).join("");

  var v = document.getElementById("sj-version");
  if (v) v.textContent = "v" + D.version;
})();
