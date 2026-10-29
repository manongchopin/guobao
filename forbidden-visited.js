/* 禁止出境文物打卡（本机） */
(function () {
  "use strict";
  var KEY = "forbidden-visited-v1";
  var ids = [];
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var obj = JSON.parse(raw);
      if (obj && Array.isArray(obj.ids)) ids = obj.ids;
    }
  } catch (e) {}

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ v: 1, ids: ids })); } catch (e) {}
  }
  function has(id) { return ids.indexOf(id) !== -1; }
  function toggle(id) {
    var i = ids.indexOf(id);
    if (i === -1) { ids.push(id); } else { ids.splice(i, 1); }
    save();
    return i === -1;
  }
  function count() { return ids.length; }
  function all() { return ids.slice(); }

  window.FBVisited = { has: has, toggle: toggle, count: count, all: all };
})();
