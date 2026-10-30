(function () {
  "use strict";
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
