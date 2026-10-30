(function () {
  "use strict";

  var list = document.getElementById("updates-list");
  if (!list || !window.SITE_UPDATES) return;

  var items = window.SITE_UPDATES.slice().sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date));
  }).slice(0, 10);

  var frag = document.createDocumentFragment();

  items.forEach(function (item) {
    var li = document.createElement("li");

    var a = document.createElement("a");
    a.className = "update-item";
    a.href = item.href;
    if (/^https?:/i.test(item.href)) {
      a.target = "_blank";
      a.rel = "noopener";
    }

    var date = document.createElement("span");
    date.className = "update-date";
    date.textContent = String(item.date).slice(5).replace("-", ".");

    var body = document.createElement("span");
    body.className = "update-body";

    var meta = document.createElement("span");
    meta.className = "update-meta";

    var type = document.createElement("span");
    type.className = "update-type";
    type.textContent = item.type;
    meta.appendChild(type);

    if (item.note) {
      var note = document.createElement("span");
      note.className = "update-note";
      note.textContent = item.note;
      meta.appendChild(note);
    }

    var title = document.createElement("span");
    title.className = "update-title";
    title.textContent = item.title;

    body.appendChild(meta);
    body.appendChild(title);

    var arrow = document.createElement("span");
    arrow.className = "update-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";

    a.appendChild(date);
    a.appendChild(body);
    a.appendChild(arrow);
    li.appendChild(a);
    frag.appendChild(li);
  });

  list.appendChild(frag);
})();
