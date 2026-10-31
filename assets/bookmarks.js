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

  var WCA_FALLBACK = [
    { rank: 1, name: "Xuanyi Geng", nameZh: "耿暄一", result: "2.51", country: "cn" },
    { rank: 2, name: "Yang Pin Xiu", nameZh: "杨品修", result: "2.74", country: "hk" },
    { rank: 3, name: "Teodor Zajder", nameZh: "Teodor Zajder", result: "2.76", country: "pl" },
    { rank: 4, name: "Yiheng Wang", nameZh: "王艺衡", result: "2.77", country: "cn" },
    { rank: 5, name: "Max Park", nameZh: "Max Park", result: "3.13", country: "us" }
  ];
  var wcaPlayers = WCA_FALLBACK;
  var wcaPhotos = {};
  var wcaUpdated = "";

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

  function flagSrc(code) {
    return {
      kr: "images/flags/kr.svg", cn: "images/flags/cn.svg",
      jp: "images/flags/jp.svg", hk: "images/flags/hk.svg",
      pl: "images/flags/pl.svg", us: "images/flags/us.svg"
    }[code] || "";
  }

  function flagAlt(code) {
    return {
      kr: "韩国国旗", cn: "中国国旗", jp: "日本国旗",
      hk: "香港特别行政区区旗", pl: "波兰国旗", us: "美国国旗"
    }[code] || "国旗";
  }

  function flagFallback(code) {
    return String(code || "").toUpperCase();
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

  async function loadWca() {
    try {
      var stamp = "?t=" + Date.now();
      var results = await Promise.all([
        fetch("data/wca-top5.json" + stamp, { cache: "no-store" }),
        fetch("data/wca-players.json" + stamp, { cache: "no-store" })
      ]);
      var r = results[0], p = results[1];
      if (!r.ok) throw new Error("wca " + r.status);
      var d = await r.json();
      if (Array.isArray(d.players) && d.players.length) {
        wcaPlayers = d.players;
        wcaUpdated = d.updated || "";
      }
      if (p.ok) wcaPhotos = await p.json();
    } catch (e) {
      console.warn("WCA fallback:", e.message);
    }
    render();
  }

  function peopleBlock(topLabel, players, photos, updated, scoreKey) {
    var label = players.map(function (p) { return p.rank + " " + (p.nameZh || p.name); }).join("、");
    var date = updatedText(updated);
    var items = players.map(function (p) {
      var db = photos[p.name] || {};
      var name = p.nameZh || db.nameZh || p.name;
      var photo = db.photo || "";
      var face = '<span class="bm-face">' + esc(name.charAt(0)) + '</span>' +
        (photo ? '<img class="bm-photo" src="' + esc(photo) + '" alt="' + esc(name) + '" loading="lazy" onerror="this.remove()">' : '');
      var fsrc = flagSrc(p.country);
      var flag = fsrc
        ? '<img class="bm-flag" src="' + fsrc + '" alt="' + esc(flagAlt(p.country)) + '" loading="lazy">'
        : '<span class="bm-flag is-text">' + esc(flagFallback(p.country)) + '</span>';
      var score = scoreKey && p[scoreKey] ? '<span class="bm-score">' + esc(p[scoreKey]) + '</span>' : '';
      var title = '第 ' + p.rank + ' · ' + name + (p.elo ? ' · ' + p.elo : '') + (scoreKey && p[scoreKey] ? ' · ' + p[scoreKey] : '');
      return '<span class="bm-person" title="' + esc(title) + '">' +
        '<span class="bm-avatar">' + face + flag + '</span>' +
        '<span class="bm-name">' + esc(name) + '</span>' + score +
      '</span>';
    }).join("");
    return '<span class="bm-people' + (scoreKey ? ' is-wca' : '') + '" aria-label="' + esc(label) + '">' +
      '<span class="bm-top5"><b>' + topLabel + '</b>' + (date ? '<em>' + esc(date) + '</em>' : '') + '</span>' +
      items + '</span>';
  }

  function goPeople() {
    return peopleBlock("TOP 5", goPlayers, goPhotos, goUpdated, "");
  }

  function wcaPeople() {
    return peopleBlock("TOP 5", wcaPlayers, wcaPhotos, wcaUpdated, "result");
  }

  function people(it) {
    if (it.dataKey === "go") return goPeople();
    if (it.dataKey === "wca") return wcaPeople();
    return "";
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
  loadWca();
})();
