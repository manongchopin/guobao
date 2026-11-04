/* 目的地页渲染：从 window.WORLD_IDEAS 里取某个 destination 及其 ideas
 *
 * 页面在 body 上标 data-destination="norway"。
 * 只渲染数据；页面上的「怎么串」「还没查的」仍写在 HTML 里（那是编辑判断，不是数据）。
 */
(function () {
  "use strict";

  var D = window.WORLD_IDEAS || {};
  var root = document.getElementById("wp-stones");
  if (!root) return;

  var destId = document.body.getAttribute("data-destination") || "norway";
  var dest = (D.destinations || []).filter(function (d) { return d.id === destId; })[0];
  var ideas = (D.ideas || []).filter(function (i) { return i.destinationId === destId; });

  var STATUS = { seed: "种子", checked: "查过", want: "想去", executable: "可执行" };

  function node(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
  }

  function num(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function renderStats() {
    var km = 0, ascent = 0;
    ideas.forEach(function (i) {
      km += i.km || 0;
      ascent += i.ascentM || 0;
    });
    var c = document.getElementById("wp-count");
    var k = document.getElementById("wp-km");
    var a = document.getElementById("wp-ascent");
    if (c) c.textContent = ideas.length;
    if (k) k.textContent = "约 " + num(km);
    if (a) a.textContent = "约 " + num(Math.round(ascent / 100) * 100);
  }

  function renderStones() {
    if (!ideas.length) {
      var empty = node("div", "wp-callout");
      empty.appendChild(node("b", "", "这一页还没有条目。"));
      empty.appendChild(document.createTextNode("在 world-ideas-data.js 里加 destinationId 为 " + destId + " 的条目即可。"));
      root.appendChild(empty);
      return;
    }

    ideas.slice().sort(function (a, b) { return (a.priority || 0) - (b.priority || 0); }).forEach(function (idea, idx) {
      var art = node("article", "wp-stone");
      art.id = idea.id;

      var head = node("header", "wp-stone-head");
      head.appendChild(node("span", "wp-no", String(idx + 1).padStart(2, "0")));

      var titles = node("div");
      var h3 = node("h3", "", idea.title || "");
      if (idea.titleEn) {
        h3.appendChild(document.createTextNode(" "));
        h3.appendChild(node("em", "", idea.titleEn));
      }
      titles.appendChild(h3);
      var where = [idea.place, idea.city].filter(Boolean).join(" · ");
      if (where) titles.appendChild(node("p", "wp-where", where));
      head.appendChild(titles);

      var badge = node("span", "wp-badge", STATUS[idea.status] || "种子");
      badge.setAttribute("data-s", idea.status || "seed");
      head.appendChild(badge);
      art.appendChild(head);

      if (idea.facts && idea.facts.length) {
        var facts = node("div", "wp-facts");
        idea.facts.forEach(function (f) {
          var cell = node("div");
          cell.appendChild(node("span", "", f.k));
          cell.appendChild(node("b", "", f.v));
          facts.appendChild(cell);
        });
        art.appendChild(facts);
      }

      if (idea.why) {
        var why = node("p", "wp-why");
        why.appendChild(node("b", "", "为什么记下"));
        why.appendChild(document.createTextNode(idea.why));
        art.appendChild(why);
      }

      if (idea.access) {
        var access = node("div", "wp-block");
        access.appendChild(node("h4", "", "怎么去"));
        access.appendChild(node("p", "", idea.access));
        art.appendChild(access);
      }

      if (idea.notes && idea.notes.length) {
        var notes = node("div", "wp-block");
        notes.appendChild(node("h4", "", "要注意"));
        var ul = node("ul");
        idea.notes.forEach(function (n) { ul.appendChild(node("li", "", n)); });
        notes.appendChild(ul);
        art.appendChild(notes);
      }

      if (idea.sources && idea.sources.length) {
        var src = node("p", "wp-src", "来源：");
        idea.sources.forEach(function (s, i) {
          if (i) src.appendChild(document.createTextNode(" · "));
          var a = node("a", "", s.title);
          a.href = s.url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          src.appendChild(a);
        });
        art.appendChild(src);
      }

      root.appendChild(art);
    });
  }

  function renderSources() {
    var list = document.getElementById("wp-sources");
    if (!list) return;
    var seen = {}, out = [];
    ideas.forEach(function (i) {
      (i.sources || []).forEach(function (s) {
        if (!s.url || seen[s.url]) return;
        seen[s.url] = 1;
        out.push(s);
      });
    });
    if (!out.length) {
      list.appendChild(node("li", "", "暂无来源。"));
      return;
    }
    out.forEach(function (s) {
      var li = node("li");
      var a = node("a", "", s.title);
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function renderMeta() {
    if (D.updated) {
      var el = document.getElementById("wp-updated");
      if (el) el.textContent = D.updated;
    }
    if (dest && dest.title) {
      var t = document.getElementById("wp-dest-title");
      if (t) t.textContent = dest.title;
    }
  }

  renderStats();
  renderStones();
  renderSources();
  renderMeta();
})();
