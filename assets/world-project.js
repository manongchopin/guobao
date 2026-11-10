/* 企划页渲染：从 window.WORLD_IDEAS.projects 读一条，按组列清单
 * 页面在 body 上标 data-project="world-drive"。
 */
(function () {
  "use strict";

  var D = window.WORLD_IDEAS || {};
  var root = document.getElementById("wp-groups");
  if (!root) return;

  var id = document.body.getAttribute("data-project");
  var proj = (D.projects || []).filter(function (p) { return p.id === id; })[0];

  function node(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
  }

  if (!proj || !Array.isArray(proj.groups)) {
    root.appendChild(node("p", "wp-callout", "这一页还没有清单数据。"));
    return;
  }

  var total = 0;
  proj.groups.forEach(function (g) { total += (g.items || []).length; });

  var c = document.getElementById("wp-count");
  if (c) c.textContent = total;
  var gEl = document.getElementById("wp-groups-count");
  if (gEl) gEl.textContent = proj.groups.length;

  var n = 0;
  proj.groups.forEach(function (g) {
    var sec = node("section", "wp-proj-group");

    var head = node("div", "wp-proj-head");
    head.appendChild(node("h3", "", g.title || ""));
    head.appendChild(node("span", "", (g.items || []).length + " 条"));
    sec.appendChild(head);

    if (g.lead) sec.appendChild(node("p", "wp-proj-lead", g.lead));

    var ol = node("ol", "wp-plist");
    (g.items || []).forEach(function (it) {
      n++;
      var li = node("li");
      li.appendChild(node("span", "wp-pno", String(n).padStart(2, "0")));

      var body = node("div", "wp-pbody");
      var line = node("p", "wp-ptext");

      if (it.href) {
        var a = node("a", "wp-plink", it.text);
        a.href = it.href;
        if (/^https?:/i.test(it.href)) { a.target = "_blank"; a.rel = "noopener"; }
        line.appendChild(a);
      } else {
        line.appendChild(node("span", "", it.text));
      }

      if (it.tag) line.appendChild(node("span", "wp-ptag" + (it.tag === "补" ? " is-add" : ""), it.tag));
      body.appendChild(line);

      if (it.note) body.appendChild(node("p", "wp-pnote", it.note));
      li.appendChild(body);

      ol.appendChild(li);
    });
    sec.appendChild(ol);
    root.appendChild(sec);
  });

  var up = document.getElementById("wp-updated");
  if (up && D.updated) up.textContent = D.updated;
})();
