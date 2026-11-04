(function () {
  "use strict";

  var items = (window.EXHIBITIONS || []).slice();
  var grid = document.getElementById("exh-grid");
  var countEl = document.getElementById("exh-count");
  var noteEl = document.getElementById("exh-note");
  var modal = document.getElementById("exh-modal");
  var modalCover = document.getElementById("exh-modal-cover");
  var modalKicker = document.getElementById("exh-modal-kicker");
  var modalTitle = document.getElementById("exh-modal-title");
  var modalMeta = document.getElementById("exh-modal-meta");
  var modalDate = document.getElementById("exh-modal-date");
  var modalNote = document.getElementById("exh-modal-note");
  var modalClose = document.getElementById("exh-modal-close");
  var lastFocus = null;

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function fmtDate(s) {
    if (!s) return "";
    var p = String(s).split("-");
    return p.length === 3 ? p[0] + "." + p[1] + "." + p[2] : String(s);
  }

  function fmtRange(it) {
    var start = fmtDate(it.start);
    var end = fmtDate(it.end);
    if (!start) return "";
    if (!end) return start;
    if (it.start && it.end && String(it.start).slice(0, 4) === String(it.end).slice(0, 4)) {
      return start + "—" + String(it.end).slice(5).replace("-", ".");
    }
    return start + "—" + end;
  }

  function yearOf(it) {
    return it.start ? String(it.start).slice(0, 4) : "";
  }

  function metaOf(it) {
    return [it.museum, it.venue].filter(Boolean).join(" · ");
  }

  function sorted() {
    return items.slice().sort(function (a, b) {
      return String(b.start || "").localeCompare(String(a.start || ""));
    });
  }

  function card(it) {
    var count = (it.artifacts || []).length;
    var extra = count ? '<p class="exh-note">相关文物 ' + count + ' 件</p>' : "";
    return '<article class="exh-card" data-exh="' + esc(it.id) + '" tabindex="0" role="button" aria-label="查看' + esc(it.title) + '导览册封面">' +
      '<span class="exh-cover"><img src="' + esc(it.cover) + '" alt="' + esc(it.title) + '导览册封面" loading="lazy"></span>' +
      '<div class="exh-body">' +
        '<span class="exh-tag">' + esc([it.city, yearOf(it)].filter(Boolean).join(" · ")) + '</span>' +
        '<h3 class="exh-title">' + esc(it.title) +
          (it.titleEn ? '<span class="exh-title-en">' + esc(it.titleEn) + '</span>' : "") +
        '</h3>' +
        '<p class="exh-meta">' + esc(metaOf(it)) + '</p>' +
        '<p class="exh-date">' + esc(fmtRange(it)) + '</p>' +
        (it.note ? '<p class="exh-note">' + esc(it.note) + '</p>' : "") +
        extra +
      '</div>' +
    '</article>';
  }

  function render() {
    if (!grid) return;
    var list = sorted();
    grid.classList.toggle("is-single", list.length === 1);
    if (!list.length) {
      grid.innerHTML = '<p class="exh-empty">还没有展览封面。</p>';
    } else {
      grid.innerHTML = list.map(card).join("");
    }
    if (countEl) countEl.textContent = list.length;
    if (noteEl) noteEl.textContent = list.length ? "封面 " + list.length + " 张 · 免费导览册" : "等待第一张封面";
  }

  function find(id) {
    for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
    return null;
  }

  function openModal(it, trigger) {
    if (!modal || !it) return;
    lastFocus = trigger || document.activeElement;
    modalCover.src = it.cover;
    modalCover.alt = it.title + "导览册封面";
    modalKicker.textContent = [it.city, yearOf(it), "EXHIBITION"].filter(Boolean).join(" · ");
    modalTitle.textContent = it.title;
    modalMeta.textContent = metaOf(it);
    modalDate.textContent = fmtRange(it);
    modalNote.textContent = it.note || "免费导览册封面；内页不转载。";
    modal.hidden = false;
    document.body.classList.add("exh-modal-open");
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modalCover.removeAttribute("src");
    modalCover.alt = "";
    document.body.classList.remove("exh-modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (grid) {
    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".exh-card");
      if (!card) return;
      openModal(find(card.getAttribute("data-exh")), card);
    });
    grid.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target.closest(".exh-card");
      if (!card) return;
      e.preventDefault();
      openModal(find(card.getAttribute("data-exh")), card);
    });
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target === modalClose) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (modal.hidden) return;
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Tab") {
        e.preventDefault();
        if (modalClose) modalClose.focus();
      }
    });
  }

  render();
})();
