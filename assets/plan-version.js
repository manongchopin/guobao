(function () {
  "use strict";
  var R = window.PLAN_VERSIONS;
  if (!R) return;
  function keyOf(href) {
    return String(href || "").split("#")[0].replace(/^.*\//, "").replace(/\.html$/, "");
  }
  function planKeyFromPath() {
    return keyOf(location.pathname);
  }

  // 计划列表：在状态后加版本徽标
  document.querySelectorAll(".plan-shelf").forEach(function (card) {
    var key = keyOf(card.getAttribute("href"));
    var p = R.plans[key];
    if (!p || card.querySelector(".plan-version-badge")) return;
    var b = document.createElement("span");
    b.className = "plan-version-badge";
    b.textContent = "v" + p.version;
    b.title = "更新于 " + p.date + "：" + p.note;
    var top = card.querySelector(".hs-top");
    if (top) top.appendChild(b); else card.appendChild(b);
  });

  // 单条计划页：页脚显示当前版本
  var key = planKeyFromPath();
  var info = R.plans[key];
  if (info && !document.querySelector(".plan-version-footer")) {
    var footer = document.querySelector(".footer-inner");
    if (footer) {
      var s = document.createElement("span");
      s.className = "plan-version-footer";
      s.textContent = "v" + info.version + " · " + info.date;
      s.title = info.note;
      var rights = footer.querySelector(".footer-rights");
      if (rights) footer.insertBefore(s, rights); else footer.appendChild(s);
    }
  }

  // 计划页的版本记录
  var log = document.getElementById("plan-version-log");
  if (log) {
    log.innerHTML = Object.keys(R.plans).map(function (k) {
      var p = R.plans[k];
      var history = (p.history || []).map(function (h) {
        return '<li><b>v' + h.v + '</b><span>' + h.date + '</span>' + h.note + '</li>';
      }).join("");
      return '<details class="plan-version-row"><summary><span class="pvr-title">' + p.title + '</span><em>v' + p.version + '</em><span class="pvr-date">' + p.date + '</span><span class="pvr-note">' + p.note + '</span></summary><ul>' + history + '</ul></details>';
    }).join("");
  }
})();
