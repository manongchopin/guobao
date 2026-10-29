/* 去过的中国世界遗产（编号）+ 本机记录 */
window.WH_VISITED_SEED = ["439","441","440","438","547","707","778","813","811","880","881","1004","1110","1113","1292","1334","1442","1443","1541","1002","1111"];

(function () {
  "use strict";
  var KEY = "wh-visited-v1";
  var SEED_VERSION = 1;
  var ids = null;

  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var obj = JSON.parse(raw);
      if (obj && Array.isArray(obj.ids)) ids = obj.ids.slice();
      if (obj && obj.v !== SEED_VERSION) {
        (window.WH_VISITED_SEED || []).forEach(function (id) {
          if (ids.indexOf(id) === -1) ids.push(id);
        });
      }
    }
  } catch (e) {}

  if (!ids) ids = (window.WH_VISITED_SEED || []).slice();

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ v: SEED_VERSION, ids: ids })); } catch (e) {}
  }
  function has(id) { return ids.indexOf(id) !== -1; }
  function toggle(id) {
    var i = ids.indexOf(id);
    if (i === -1) { ids.push(id); } else { ids.splice(i, 1); }
    save();
    return i === -1;
  }
  function count(list) { return list.filter(function (p) { return has(p.uid); }).length; }
  function all() { return ids.slice(); }

  window.WHVisited = { has: has, toggle: toggle, count: count, all: all };
})();
