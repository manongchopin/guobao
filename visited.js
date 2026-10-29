/* 已走过的国保（公开种子）+ 本机打卡记录
 * 想永久点亮某一处：把它加入 VISITED_SEED，提交即可。
 * 网页上点圆点只写入本机 localStorage，不会改动这个文件。
 */
window.VISITED_SEED = ["5-289"];

(function () {
  "use strict";
  var KEY = "guobao-visited-v1";
  var SEED_VERSION = 1;
  var ids = null;

  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var obj = JSON.parse(raw);
      if (obj && Array.isArray(obj.ids)) ids = obj.ids.slice();
      if (obj && obj.v !== SEED_VERSION) {
        (window.VISITED_SEED || []).forEach(function (id) {
          if (ids.indexOf(id) === -1) ids.push(id);
        });
      }
    }
  } catch (e) {}

  if (!ids) ids = (window.VISITED_SEED || []).slice();

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: SEED_VERSION, ids: ids }));
    } catch (e) {}
  }

  function has(id) { return ids.indexOf(id) !== -1; }

  function toggle(id) {
    var i = ids.indexOf(id);
    if (i === -1) { ids.push(id); } else { ids.splice(i, 1); }
    save();
    return i === -1;
  }

  function count(list) {
    return list.filter(function (p) { return has(p.id); }).length;
  }

  function all() { return ids.slice(); }

  window.Visited = { has: has, toggle: toggle, count: count, all: all };
})();
