(function () {
  "use strict";
  // 全站约定：文件链接不在当前页直接下载，而是在新标签页打开。
  document.querySelectorAll('a[download]').forEach(function (link) {
    link.removeAttribute('download');
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  });

  var path = window.location.pathname;
  if (/\/$/.test(path) || /index\.html$/.test(path)) return;
  var back = document.querySelector(".back");
  if (!back || !back.parentNode) return;
  if (document.querySelector(".home-link")) return;

  var a = document.createElement("a");
  a.className = "home-link";
  a.href = "index.html";
  a.textContent = "首页";
  a.setAttribute("aria-label", "回到首页");
  back.parentNode.insertBefore(a, back);
})();
