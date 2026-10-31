(function () {
  "use strict";

  var data = window.BOOKMARKS || [];
  var grid = document.getElementById("bm-grid");
  var chips = document.getElementById("bm-chips");
  var search = document.getElementById("bm-search");
  var empty = document.getElementById("bm-empty");
  var total = document.getElementById("bm-total");
  var note = document.getElementById("bm-note");
  var state = { cat: "全部", q: "" };
  var toolbar = document.querySelector(".bm-toolbar");
  if (!data.length && toolbar) toolbar.hidden = true;

  var GO_FALLBACK = [
    { rank: 1, name: "Shin Jinseo", nameZh: "申真谞", elo: 3907, country: "kr" },
    { rank: 2, name: "Xu Jiayang", nameZh: "许嘉阳", elo: 3764, country: "cn" },
    { rank: 3, name: "Ding Hao", nameZh: "丁浩", elo: 3737, country: "cn" },
    { rank: 4, name: "Wang Xinghao", nameZh: "王星昊", elo: 3709, country: "cn" },
    { rank: 5, name: "Ke Jie", nameZh: "柯洁", elo: 3705, country: "cn" }
  ];
  var goPlayers = GO_FALLBACK;
  var goPhotos = {};
  var goUpdated = "";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function domain(url) {
    try {
      var u = new URL(url, window.location.href);
      return u.hostname.replace(/^www\./, "") || "本站";
    } catch (e) {
      return "本站";
    }
  }

  function flagChar(code) {
    return { kr: "韩", cn: "中", jp: "日", tw: "台" }[code] || String(code || "").toUpperCase();
  }

  function flagClass(code) {
    return code === "kr" ? "is-kr" : code === "cn" ? "is-cn" : code === "jp" ? "is-jp" : "";
  }

  function updatedText(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    try {
      return new Intl.DateTimeFormat("zh-CN", {
        timeZone: "Asia/Shanghai", month: "2-digit", day: "2-digit"
      }).format(d).replace("/", "-");
    } catch (e) {
      return "";
    }
  }

  async function loadGo() {
    try {
      var stamp = "?t=" + Date.now();
      var results = await Promise.all([
        fetch("data/go-ratings-top5.json" + stamp, { cache: "no-store" }),
        fetch("data/go-players.json" + stamp, { cache: "no-store" })
      ]);
      var r = results[0], p = results[1];
      if (!r.ok) throw new Error("ratings " + r.status);
      var d = await r.json();
      if (Array.isArray(d.players) && d.players.length) {
        goPlayers = d.players;
        goUpdated = d.updated || "";
      }
      if (p.ok) goPhotos = await p.json();
    } catch (e) {
      console.warn("Go Ratings fallback:", e.message);
    }
    render();
  }

  function goPeople() {
    var label = goPlayers.map(function (p) { return p.rank + " " + (p.nameZh || p.name); }).join("、");
    var date = updatedText(goUpdated);
    return '<span class="bm-people" aria-label="当前等级分前五：' + esc(label) + '">' +
      '<span class="bm-top5"><b>TOP 5</b>' + (date ? '<em>' + esc(date) + '</em>' : '') + '</span>' +
      goPlayers.map(function (p) {
        var db = goPhotos[p.name] || {};
        var name = p.nameZh || db.nameZh || p.name;
        var photo = db.photo || "";
        var face = '<span class="bm-face">' + esc(name.charAt(0)) + '</span>' +
          (photo ? '<img class="bm-photo" src="' + esc(photo) + '" alt="' + esc(name) + '" loading="lazy" onerror="this.remove()">' : '');
        return '<span class="bm-person" title="第 ' + p.rank + ' · ' + esc(name) + ' · ' + p.elo + '">' +
          '<span class="bm-avatar">' + face +
            '<span class="bm-flag ' + flagClass(p.country) + '">' + esc(flagChar(p.country)) + '</span>' +
          '</span>' +
          '<span class="bm-name">' + esc(name) + '</span>' +
        '</span>';
      }).join("") + '</span>';
  }

  function people(it) {
    return it.dataKey === "go" ? goPeople() : "";
  }

  var cats = ["全部"];
  data.forEach(function (it) {
    if (cats.indexOf(it.cat) < 0) cats.push(it.cat);
  });

  function match(it) {
    if (state.cat !== "全部" && it.cat !== state.cat) return false;
    if (!state.q) return true;
    var hay = [it.title, it.desc, it.url, it.cat, (it.tags || []).join(" ")].join(" ").toLowerCase();
    return hay.indexOf(state.q.toLowerCase()) >= 0;
  }

  function renderChips() {
    chips.innerHTML = cats.map(function (c) {
      var n = c === "全部" ? data.length : data.filter(function (it) { return it.cat === c; }).length;
      return '<button type="button" class="bm-chip' + (state.cat === c ? " is-active" : "") +
        '" data-cat="' + esc(c) + '" aria-pressed="' + (state.cat === c) + '">' +
        esc(c) + '<b>' + n + '</b></button>';
    }).join("");
  }

  function render() {
    var list = data.filter(match);
    grid.innerHTML = list.map(function (it) {
      var n = String(data.indexOf(it) + 1).padStart(2, "0");
      return '<a class="bm-row" href="' + esc(it.url) + '" target="_blank" rel="noopener">' +
        '<span class="bm-no">' + n + '</span>' +
        '<span class="bm-text"><span class="bm-title">' + esc(it.title) + '</span>' +
        '<span class="bm-desc">' + esc(it.desc) + '</span></span>' +
        '<span class="bm-side">' + people(it) +
        '<span class="bm-domain">' + esc(domain(it.url)) + '</span>' +
        '<span class="bm-arrow">↗</span></span>' +
      '</a>';
    }).join("");
    if (!data.length) {
      empty.hidden = false;
      empty.innerHTML = '<b>收藏夹还是空的</b><span>把要放的网站发给我，我再逐条加进来。</span>';
    } else {
      empty.hidden = list.length > 0;
    }
    total.textContent = data.length;
    note.textContent = !data.length
      ? "还没有添加站点"
      : (state.cat === "全部" && !state.q ? "按分类筛选，或直接搜索" : "筛出 " + list.length + " 个站点");
  }

  chips.addEventListener("click", function (e) {
    var btn = e.target.closest(".bm-chip");
    if (!btn) return;
    state.cat = btn.getAttribute("data-cat");
    renderChips();
    render();
  });

  search.addEventListener("input", function () {
    state.q = search.value.trim();
    render();
  });

  renderChips();
  render();
  loadGo();
})();
