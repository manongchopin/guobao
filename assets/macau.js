(function () {
  "use strict";

  var items = window.MACAU_PLACES || [];
  var listEl = document.getElementById("list");
  var noteEl = document.getElementById("mo-note");
  var toolbarNote = document.getElementById("toolbar-note");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".switch button"));

  var toolbarInner = document.querySelector(".toolbar-inner");
  var walkEl = document.createElement("span");
  walkEl.className = "walk-count";
  walkEl.id = "walk-count";
  if (toolbarInner) toolbarInner.appendChild(walkEl);

  var KEY = "macau-region";
  var region = "all";

  function updateWalk() {
    var got = items.filter(function (it) { return window.MOVisited && MOVisited.has(it.code); }).length;
    walkEl.innerHTML = "已走 <b>" + got + "</b>/" + items.length;
  }

  function row(it) {
    var v = !!(window.MOVisited && MOVisited.has(it.code));
    return '<div class="mo-row' + (v ? " is-visited" : "") + '">' +
      '<span class="mo-c">' + it.code + '</span>' +
      '<span class="mo-n">' + it.name + '</span>' +
      '<span class="mo-a">' + it.category + '</span>' +
      '<span class="mo-b">' + it.region + '</span>' +
      '<button type="button" class="visit-btn mo-visit" data-id="' + it.code + '" aria-pressed="' + v + '" title="标记为已去过">' +
        (v ? "✓" : "＋") +
      '</button>' +
    '</div>';
  }

  function render() {
    var list = region === "all" ? items : items.filter(function (it) { return it.region === region; });
    var head = ["编号", "名称", "类别", "区域"];
    listEl.innerHTML = '<div class="mo-table" role="table">' +
      '<div class="mo-row mo-head" role="row">' +
        head.map(function (h, i) {
          return '<span class="mo-' + ["c", "n", "a", "b"][i] + '">' + h + '</span>';
        }).join("") +
        '<span class="mo-v"></span>' +
      '</div>' +
      list.map(row).join("") +
    '</div>';
    toolbarNote.textContent = (region === "all" ? "165 项 · 3 个区域" : region + " · " + list.length + " 项");
    noteEl.textContent = "编号首字母 M/A/C/S 对应纪念物、建筑物、建筑群、地点；第二位 M/T/C 对应澳门半岛、氹仔、路环。";
    updateWalk();
  }

  function setRegion(r, push) {
    region = r;
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-region") === r));
    });
    try { localStorage.setItem(KEY, r); } catch (e) {}
    render();
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.getAttribute("aria-pressed") === "true") return;
      setRegion(b.getAttribute("data-region"), true);
      var y = listEl.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  listEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".mo-visit");
    if (!btn) return;
    if (!window.MOVisited) return;
    var on = MOVisited.toggle(btn.getAttribute("data-id"));
    var row = btn.closest(".mo-row");
    if (row) row.classList.toggle("is-visited", on);
    btn.textContent = on ? "✓" : "＋";
    btn.setAttribute("aria-pressed", String(on));
    updateWalk();
  });

  var saved = "all";
  try { saved = localStorage.getItem(KEY) || "all"; } catch (e) {}
  setRegion(["all", "澳门半岛", "氹仔", "路环"].indexOf(saved) === -1 ? "all" : saved, false);
})();
