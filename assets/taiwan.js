(function () {
  "use strict";
  var places = window.TW_PLACES || [];
  var units = window.TW_UNITS || [];
  var listEl = document.getElementById("list");
  var indexEl = document.getElementById("index");
  var filter = "all";

  function count(u) { return places.filter(function (p) { return p.district === u; }).length; }

  function renderIndex() {
    var html = '<p class="ci-title">县市索引</p>' +
      '<button type="button" class="ci-item' + (filter === "all" ? " is-active" : "") +
      '" data-d="all" aria-pressed="' + (filter === "all") + '"><span>全部</span><b>' + places.length + '</b></button>';
    units.forEach(function (u) {
      var n = count(u);
      if (!n) return;
      html += '<button type="button" class="ci-item' + (filter === u ? " is-active" : "") +
        '" data-d="' + u + '" aria-pressed="' + (filter === u) + '"><span>' + u + '</span><b>' + n + '</b></button>';
    });
    indexEl.innerHTML = html;
  }

  function render() {
    var show = filter === "all" ? units : [filter];
    var html = "";
    show.forEach(function (u) {
      var list = places.filter(function (p) { return p.district === u; });
      if (!list.length) return;
      html += '<section class="group"><div class="group-head"><h2>' + u + '</h2><span class="count">' + list.length + ' 处</span></div>';
      html += '<div class="tw-table"><div class="tw-head"><span>公告时间</span><span>名称</span><span>类型</span><span>年代</span><span></span></div>';
      list.forEach(function (p) {
        var on = window.Visited && Visited.has(p.id);
        html += '<div class="tw-row">' +
          '<span class="tw-d">' + p.date + '</span>' +
          '<a class="tw-n" href="place.html?set=taiwan&id=' + p.id + '">' + p.name + '</a>' +
          '<span class="tw-t">' + p.type + '</span>' +
          '<span class="tw-y">' + (p.era || "—") + '</span>' +
          '<button type="button" class="ct-v' + (on ? " is-on" : "") + '" data-id="' + p.id + '">' + (on ? "已去" : "打卡") + '</button>' +
        '</div>';
      });
      html += '</div></section>';
    });
    listEl.innerHTML = html || '<p class="wh-note">没有找到古迹。</p>';
  }

  indexEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".ci-item");
    if (!btn) return;
    filter = btn.getAttribute("data-d");
    renderIndex(); render();
    var y = listEl.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: y, behavior: "smooth" });
  });

  listEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".ct-v");
    if (!btn) return;
    e.preventDefault();
    var id = btn.getAttribute("data-id");
    Visited.toggle(id);
    var on = Visited.has(id);
    btn.classList.toggle("is-on", on);
    btn.textContent = on ? "已去" : "打卡";
  });

  renderIndex(); render();
})();
