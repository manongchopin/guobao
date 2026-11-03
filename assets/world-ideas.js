/* 发散的全世界 · 旅行灵感收件箱
 *
 * 数据来源：
 *   window.WORLD_IDEAS.ideas（world-ideas-data.js）→「已收录」
 *   localStorage["world-ideas-v1"].ideas          →「本机草稿」
 * 本机草稿只存在浏览器里，不会上传，也不会自动变成公共条目。
 * 页面不用 innerHTML 拼用户数据，全部用 textContent。
 */
(function () {
  "use strict";

  var KEY = "world-ideas-v1";
  var D = window.WORLD_IDEAS || { ideas: [] };
  var PUBLIC = (D && Array.isArray(D.ideas)) ? D.ideas : [];

  var TYPES = ["世界遗产", "国家公园", "古城", "博物馆", "徒步", "自驾", "铁路", "美食", "其他"];
  var STATUS = { seed: "种子", checked: "查过", want: "想去", executable: "可执行" };
  var SOURCE_TYPES = { article: "文章", video: "视频", book: "书", friend: "朋友", self: "自己发现" };

  /* 大洲顺序；推断不出的归到「待归类」，不硬猜 */
  var CONTINENT_ORDER = ["亚洲", "欧洲", "非洲", "北美洲", "南美洲", "大洋洲", "南极洲", "待归类"];
  var CONTINENT = {
    "中国": "亚洲", "日本": "亚洲", "韩国": "亚洲", "朝鲜": "亚洲", "蒙古": "亚洲",
    "越南": "亚洲", "老挝": "亚洲", "柬埔寨": "亚洲", "泰国": "亚洲", "缅甸": "亚洲",
    "马来西亚": "亚洲", "新加坡": "亚洲", "印度尼西亚": "亚洲", "菲律宾": "亚洲",
    "文莱": "亚洲", "东帝汶": "亚洲", "印度": "亚洲", "巴基斯坦": "亚洲",
    "孟加拉国": "亚洲", "斯里兰卡": "亚洲", "尼泊尔": "亚洲", "不丹": "亚洲",
    "马尔代夫": "亚洲", "阿富汗": "亚洲", "伊朗": "亚洲", "伊拉克": "亚洲",
    "叙利亚": "亚洲", "黎巴嫩": "亚洲", "约旦": "亚洲", "以色列": "亚洲",
    "巴勒斯坦": "亚洲", "沙特阿拉伯": "亚洲", "阿联酋": "亚洲", "卡塔尔": "亚洲",
    "巴林": "亚洲", "科威特": "亚洲", "阿曼": "亚洲", "也门": "亚洲",
    "土耳其": "亚洲", "格鲁吉亚": "亚洲", "亚美尼亚": "亚洲", "阿塞拜疆": "亚洲",
    "哈萨克斯坦": "亚洲", "乌兹别克斯坦": "亚洲", "吉尔吉斯斯坦": "亚洲",
    "塔吉克斯坦": "亚洲", "土库曼斯坦": "亚洲", "塞浦路斯": "亚洲",
    "英国": "欧洲", "爱尔兰": "欧洲", "法国": "欧洲", "德国": "欧洲", "意大利": "欧洲",
    "西班牙": "欧洲", "葡萄牙": "欧洲", "荷兰": "欧洲", "比利时": "欧洲",
    "卢森堡": "欧洲", "瑞士": "欧洲", "奥地利": "欧洲", "列支敦士登": "欧洲",
    "丹麦": "欧洲", "挪威": "欧洲", "瑞典": "欧洲", "芬兰": "欧洲", "冰岛": "欧洲",
    "波兰": "欧洲", "捷克": "欧洲", "斯洛伐克": "欧洲", "匈牙利": "欧洲",
    "罗马尼亚": "欧洲", "保加利亚": "欧洲", "希腊": "欧洲", "阿尔巴尼亚": "欧洲",
    "北马其顿": "欧洲", "塞尔维亚": "欧洲", "黑山": "欧洲", "波黑": "欧洲",
    "克罗地亚": "欧洲", "斯洛文尼亚": "欧洲", "爱沙尼亚": "欧洲", "拉脱维亚": "欧洲",
    "立陶宛": "欧洲", "白俄罗斯": "欧洲", "乌克兰": "欧洲", "摩尔多瓦": "欧洲",
    "俄罗斯": "欧洲", "马耳他": "欧洲", "摩纳哥": "欧洲", "梵蒂冈": "欧洲",
    "圣马力诺": "欧洲", "安道尔": "欧洲",
    "埃及": "非洲", "摩洛哥": "非洲", "阿尔及利亚": "非洲", "突尼斯": "非洲",
    "利比亚": "非洲", "苏丹": "非洲", "南苏丹": "非洲", "埃塞俄比亚": "非洲",
    "厄立特里亚": "非洲", "吉布提": "非洲", "索马里": "非洲", "肯尼亚": "非洲",
    "坦桑尼亚": "非洲", "乌干达": "非洲", "卢旺达": "非洲", "布隆迪": "非洲",
    "刚果（金）": "非洲", "刚果（布）": "非洲", "中非": "非洲", "喀麦隆": "非洲",
    "乍得": "非洲", "尼日尔": "非洲", "尼日利亚": "非洲", "贝宁": "非洲",
    "多哥": "非洲", "加纳": "非洲", "科特迪瓦": "非洲", "利比里亚": "非洲",
    "塞拉利昂": "非洲", "几内亚": "非洲", "塞内加尔": "非洲", "冈比亚": "非洲",
    "毛里塔尼亚": "非洲", "马里": "非洲", "布基纳法索": "非洲", "佛得角": "非洲",
    "圣多美和普林西比": "非洲", "赤道几内亚": "非洲", "加蓬": "非洲", "安哥拉": "非洲",
    "赞比亚": "非洲", "马拉维": "非洲", "莫桑比克": "非洲", "津巴布韦": "非洲",
    "博茨瓦纳": "非洲", "纳米比亚": "非洲", "南非": "非洲", "莱索托": "非洲",
    "斯威士兰": "非洲", "马达加斯加": "非洲", "毛里求斯": "非洲", "塞舌尔": "非洲",
    "科摩罗": "非洲",
    "美国": "北美洲", "加拿大": "北美洲", "墨西哥": "北美洲", "危地马拉": "北美洲",
    "伯利兹": "北美洲", "洪都拉斯": "北美洲", "萨尔瓦多": "北美洲",
    "尼加拉瓜": "北美洲", "哥斯达黎加": "北美洲", "巴拿马": "北美洲",
    "古巴": "北美洲", "牙买加": "北美洲", "海地": "北美洲", "多米尼加": "北美洲",
    "巴哈马": "北美洲", "特立尼达和多巴哥": "北美洲", "巴巴多斯": "北美洲",
    "格林纳达": "北美洲", "圣卢西亚": "北美洲", "安提瓜和巴布达": "北美洲",
    "圣文森特和格林纳丁斯": "北美洲", "圣基茨和尼维斯": "北美洲", "多米尼克": "北美洲",
    "巴西": "南美洲", "阿根廷": "南美洲", "智利": "南美洲", "秘鲁": "南美洲",
    "玻利维亚": "南美洲", "哥伦比亚": "南美洲", "厄瓜多尔": "南美洲",
    "委内瑞拉": "南美洲", "圭亚那": "南美洲", "苏里南": "南美洲",
    "乌拉圭": "南美洲", "巴拉圭": "南美洲",
    "澳大利亚": "大洋洲", "新西兰": "大洋洲", "巴布亚新几内亚": "大洋洲",
    "斐济": "大洋洲", "瓦努阿图": "大洋洲", "所罗门群岛": "大洋洲",
    "萨摩亚": "大洋洲", "汤加": "大洋洲", "基里巴斯": "大洋洲",
    "密克罗尼西亚": "大洋洲", "马绍尔群岛": "大洋洲", "帕劳": "大洋洲",
    "瑙鲁": "大洋洲", "图瓦卢": "大洋洲",
    "南极洲": "南极洲"
  };

  var state = { scope: "all", type: "all" };
  var localIdeas = loadLocal();
  var F = {};

  /* ---------- 基础工具 ---------- */

  function $(id) { return document.getElementById(id); }

  function today() { return new Date().toISOString().slice(0, 10); }

  function newId() {
    return "local-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
  }

  function str(v) { return typeof v === "string" ? v.trim() : ""; }

  function oneOf(v, list, fallback) { return list.indexOf(v) >= 0 ? v : fallback; }

  function fmtDate(d) { return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d.replace(/-/g, ".") : "日期未记"; }

  function continentOf(idea) {
    if (idea.continent && CONTINENT_ORDER.indexOf(idea.continent) >= 0) return idea.continent;
    return CONTINENT[idea.country] || "待归类";
  }

  function normalize(raw) {
    var o = (raw && typeof raw === "object") ? raw : {};
    var scope = o.scope === "world" ? "world" : "cn";
    var country = str(o.country) || (scope === "cn" ? "中国" : "");
    var status = STATUS[String(o.status)] ? String(o.status) : "seed";
    var sourceType = SOURCE_TYPES[String(o.sourceType)] ? String(o.sourceType) : "self";
    var added = str(o.added);
    return {
      id: str(o.id) || newId(),
      scope: scope,
      title: str(o.title),
      country: country,
      province: str(o.province),
      city: str(o.city),
      place: str(o.place),
      continent: str(o.continent),
      type: oneOf(str(o.type), TYPES, "其他"),
      tags: Array.isArray(o.tags) ? o.tags.map(str).filter(Boolean) : [],
      why: str(o.why),
      sourceType: sourceType,
      sourceTitle: str(o.sourceTitle),
      sourceUrl: str(o.sourceUrl),
      status: status,
      added: /^\d{4}-\d{2}-\d{2}$/.test(added) ? added : today(),
      priority: (typeof o.priority === "number" && isFinite(o.priority)) ? o.priority : 0
    };
  }

  function plain(o) {
    var out = {
      id: o.id, scope: o.scope, title: o.title, country: o.country,
      province: o.province, city: o.city, place: o.place, type: o.type,
      tags: o.tags.slice(), why: o.why, sourceType: o.sourceType,
      sourceTitle: o.sourceTitle, sourceUrl: o.sourceUrl, status: o.status,
      added: o.added, priority: o.priority
    };
    if (o.continent) out.continent = o.continent;
    return out;
  }

  function setMsg(text, isError) {
    var el = $("wi-msg");
    if (!el) return;
    el.textContent = text || "";
    el.className = "wi-msg" + (isError ? " is-error" : "");
  }

  /* ---------- 存储 ---------- */

  function loadLocal() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      var arr = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.ideas) ? raw.ideas : []);
      return arr.map(normalize).filter(function (x) { return !!x.title; });
    } catch (e) {
      return [];
    }
  }

  function saveLocal(arr) {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        version: 1,
        updated: new Date().toISOString(),
        ideas: arr.map(plain)
      }));
      return true;
    } catch (e) {
      setMsg("本机存储写入失败：可能是隐私模式，或空间已满。", true);
      return false;
    }
  }

  /* ---------- 合并与分组 ---------- */

  function allIdeas() {
    var out = PUBLIC.map(function (x) { var o = normalize(x); o.origin = "public"; return o; });
    localIdeas.forEach(function (x) { var o = normalize(x); o.origin = "local"; out.push(o); });
    return out;
  }

  function groupBy(items, keyFn) {
    var order = [], map = {};
    items.forEach(function (it) {
      var k = keyFn(it);
      if (!Object.prototype.hasOwnProperty.call(map, k)) { map[k] = []; order.push(k); }
      map[k].push(it);
    });
    return order.map(function (k) { return { key: k, items: map[k] }; });
  }

  function groupByProvince(items) {
    return groupBy(items, function (i) { return i.province || "省份未记"; });
  }

  function groupByWorld(items) {
    var groups = groupBy(items, continentOf);
    groups.sort(function (a, b) { return CONTINENT_ORDER.indexOf(a.key) - CONTINENT_ORDER.indexOf(b.key); });
    return groups.map(function (g) {
      return {
        key: g.key,
        items: g.items,
        countries: groupBy(g.items, function (i) { return i.country || "国家待记"; })
      };
    });
  }

  function placeText(i) {
    if (i.place) return i.place;
    var bits = [];
    if (i.scope === "cn") {
      if (i.province) bits.push(i.province);
      if (i.city) bits.push(i.city);
      if (!bits.length && i.country) bits.push(i.country);
    } else {
      if (i.country) bits.push(i.country);
      if (i.city) bits.push(i.city);
    }
    return bits.join(" · ");
  }

  /* ---------- 渲染：统计 ---------- */

  function renderStats(all) {
    var cn = 0, world = 0, countries = {};
    all.forEach(function (i) {
      if (i.scope === "cn") {
        cn++;
        countries["中国"] = 1;
      } else {
        world++;
        if (i.country) countries[i.country] = 1;
      }
    });
    $("wi-stat-total").textContent = all.length;
    $("wi-stat-cn").textContent = cn;
    $("wi-stat-world").textContent = world;
    $("wi-stat-country").textContent = Object.keys(countries).length;
  }

  /* ---------- 渲染：卡片 ---------- */

  function node(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
  }

  function cardNode(idea) {
    var card = node("article", "wi-card");
    card.setAttribute("data-id", idea.id);

    card.appendChild(node("h4", "wi-title", idea.title));

    var sub = node("p", "wi-sub");
    var place = placeText(idea);
    if (place) sub.appendChild(node("span", "wi-place", place));
    sub.appendChild(node("span", "wi-tag", idea.type));
    var st = node("span", "wi-status", STATUS[idea.status] || "种子");
    st.setAttribute("data-s", idea.status);
    sub.appendChild(st);
    sub.appendChild(node("span", idea.origin === "local" ? "wi-tag wi-draft" : "wi-tag wi-collected",
      idea.origin === "local" ? "本机草稿" : "已收录"));
    card.appendChild(sub);

    var why = node("p", "wi-why", idea.why || "还没写「为什么想去」。");
    if (!idea.why) why.className = "wi-why is-empty";
    card.appendChild(why);

    var foot = node("p", "wi-foot");

    var src = node("span", "wi-src");
    var label = SOURCE_TYPES[idea.sourceType] || "来源未记";
    src.appendChild(document.createTextNode("来源："));
    src.appendChild(node("b", "", label));
    if (idea.sourceTitle) {
      src.appendChild(document.createTextNode(" · " + idea.sourceTitle));
    }
    foot.appendChild(src);

    if (idea.sourceUrl) {
      var a = node("a", "wi-link", "打开来源 ↗");
      a.href = idea.sourceUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      foot.appendChild(a);
    }

    foot.appendChild(node("span", "wi-date", "收藏 " + fmtDate(idea.added)));

    if (idea.origin === "local") {
      var del = node("button", "wi-del", "删除");
      del.type = "button";
      del.setAttribute("data-del", idea.id);
      del.setAttribute("aria-label", "删除本机草稿：" + idea.title);
      foot.appendChild(del);
    }

    card.appendChild(foot);
    return card;
  }

  /* ---------- 渲染：分组与篇章 ---------- */

  function cardsNode(items) {
    var wrap = node("div", "wi-cards");
    items.forEach(function (it) { wrap.appendChild(cardNode(it)); });
    return wrap;
  }

  function groupNode(title, items, extra) {
    var group = node("section", "wi-group" + (extra ? " " + extra : ""));
    var head = node("div", "wi-group-head");
    head.appendChild(node("h3", "", title));
    head.appendChild(node("em", "", items.length + " 条"));
    group.appendChild(head);
    return group;
  }

  function chapterNode(title, kicker, items) {
    var chapter = node("section", "wi-chapter");
    var head = node("div", "wi-chapter-head");
    head.appendChild(node("h2", "", title));
    head.appendChild(node("span", "", kicker));
    head.appendChild(node("em", "", items.length + " 条"));
    chapter.appendChild(head);
    return chapter;
  }

  function emptyBlock(isGlobal) {
    var box = node("div", "wi-empty");
    box.appendChild(node("b", "", isGlobal ? "收件箱还空着" : "这个筛选下还没有条目"));
    box.appendChild(node("p", "", isGlobal
      ? "公共数据文件 world-ideas-data.js 现在是空的，没有编造的条目。下面的「添加一条」可以先丢一条进来，只存在这台浏览器。"
      : "换个类型看看，或者切回「全部」。"));
    if (!isGlobal) {
      var reset = node("button", "wi-empty-reset", "重置筛选");
      reset.type = "button";
      reset.addEventListener("click", function () {
        state.scope = "all";
        state.type = "all";
        syncPressed();
        render();
      });
      box.appendChild(reset);
    }
    return box;
  }

  /* ---------- 渲染：主流程 ---------- */

  function renderList(all) {
    var listEl = $("wi-list");
    listEl.textContent = "";

    var shown = all.filter(function (i) {
      if (state.scope !== "all" && i.scope !== state.scope) return false;
      if (state.type !== "all" && i.type !== state.type) return false;
      return true;
    });

    $("wi-filter-note").textContent = all.length === 0
      ? "暂无条目"
      : "显示 " + shown.length + " 条 / 共 " + all.length + " 条";

    if (all.length === 0) { listEl.appendChild(emptyBlock(true)); return; }
    if (shown.length === 0) { listEl.appendChild(emptyBlock(false)); return; }

    if (state.scope !== "world") {
      var cnItems = shown.filter(function (i) { return i.scope === "cn"; });
      if (cnItems.length) {
        var cnChapter = chapterNode("国内篇", "CHINA · BY PROVINCE", cnItems);
        groupByProvince(cnItems).forEach(function (g) {
          var block = groupNode(g.key, g.items);
          block.appendChild(cardsNode(g.items));
          cnChapter.appendChild(block);
        });
        listEl.appendChild(cnChapter);
      }
    }

    if (state.scope !== "cn") {
      var worldItems = shown.filter(function (i) { return i.scope === "world"; });
      if (worldItems.length) {
        var wChapter = chapterNode("国外篇", "WORLD · BY CONTINENT", worldItems);
        groupByWorld(worldItems).forEach(function (c) {
          var block = groupNode(c.key, c.items);
          c.countries.forEach(function (co) {
            var country = node("div", "wi-country");
            var chead = node("div", "wi-country-head");
            chead.appendChild(node("b", "", co.key));
            chead.appendChild(node("em", "", co.items.length + " 条"));
            country.appendChild(chead);
            country.appendChild(cardsNode(co.items));
            block.appendChild(country);
          });
          wChapter.appendChild(block);
        });
        listEl.appendChild(wChapter);
      }
    }
  }

  function syncPressed() {
    var scopeBtns = document.querySelectorAll("#wi-scope button");
    Array.prototype.forEach.call(scopeBtns, function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-scope") === state.scope ? "true" : "false");
    });
    var typeBtns = document.querySelectorAll("#wi-types button");
    Array.prototype.forEach.call(typeBtns, function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-type") === state.type ? "true" : "false");
    });
  }

  function render() {
    var all = allIdeas();
    renderStats(all);
    renderList(all);
  }

  /* ---------- 类型筛选按钮 ---------- */

  function buildTypeButtons() {
    var wrap = $("wi-types");
    wrap.textContent = "";
    [["all", "全部类型"]].concat(TYPES.map(function (t) { return [t, t]; })).forEach(function (pair) {
      var b = node("button", "wi-type-btn", pair[1]);
      b.type = "button";
      b.setAttribute("data-type", pair[0]);
      b.setAttribute("aria-pressed", "false");
      wrap.appendChild(b);
    });
    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-type]");
      if (!btn) return;
      state.type = btn.getAttribute("data-type");
      syncPressed();
      render();
    });
  }

  /* ---------- 表单 ---------- */

  function syncScopeFields() {
    var v = F.scope.value;
    $("wi-province-field").classList.toggle("is-hidden", v !== "cn");
    $("wi-country-field").classList.toggle("is-hidden", v !== "world");
  }

  function cleanUrl(v) {
    var u = str(v);
    if (!u) return "";
    if (!/^https?:\/\//i.test(u) && !/^mailto:/i.test(u)) return "https://" + u;
    return u;
  }

  function handleSubmit(e) {
    e.preventDefault();
    var title = F.title.value.trim();
    if (!title) {
      setMsg("先写个标题，再收进收件箱。", true);
      F.title.focus();
      return;
    }

    var scope = F.scope.value === "world" ? "world" : "cn";
    var province = scope === "cn" ? F.province.value.trim() : "";
    var country = scope === "cn" ? "中国" : F.country.value.trim();
    var city = F.city.value.trim();
    var type = oneOf(F.type.value, TYPES, "其他");
    var place;
    if (scope === "cn") {
      place = [province, city].filter(Boolean).join(" · ");
    } else {
      place = [country, city].filter(Boolean).join(" · ");
    }

    var idea = normalize({
      id: newId(),
      scope: scope,
      title: title,
      country: country,
      province: province,
      city: city,
      place: place,
      type: type,
      tags: [],
      why: F.why.value.trim(),
      sourceType: F.sourceType.value,
      sourceTitle: F.sourceTitle.value.trim(),
      sourceUrl: cleanUrl(F.sourceUrl.value),
      status: F.status.value,
      added: today(),
      priority: 0
    });

    localIdeas.push(plain(idea));
    if (!saveLocal(localIdeas)) return;

    F.form.reset();
    syncScopeFields();
    setMsg("已存到本机草稿（world-ideas-v1）。它不会自动发布，也不会出现在别人的浏览器里。", false);
    render();

    var firstCard = $("wi-list").querySelector('.wi-card[data-id="' + idea.id + '"]');
    if (firstCard && firstCard.scrollIntoView) {
      firstCard.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  /* ---------- 导入 / 导出 / 删除 ---------- */

  function handleExport() {
    var out = {
      version: 1,
      exportedAt: new Date().toISOString(),
      key: KEY,
      note: "发散的全世界 · 本机草稿。导入到另一台设备的同一页面即可恢复。",
      ideas: localIdeas.map(plain)
    };
    var blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "world-ideas-" + today() + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    setMsg("已导出本机草稿 " + localIdeas.length + " 条。", false);
  }

  function handleImport(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var arr = null;
      try {
        var obj = JSON.parse(reader.result);
        arr = Array.isArray(obj) ? obj : (obj && Array.isArray(obj.ideas) ? obj.ideas : null);
      } catch (err) {
        arr = null;
      }
      if (!arr) {
        setMsg("JSON 读取失败：需要数组，或带 ideas 数组的对象。", true);
        e.target.value = "";
        return;
      }

      var ids = {};
      PUBLIC.forEach(function (x) { if (x && x.id) ids[x.id] = 1; });
      localIdeas.forEach(function (x) { ids[x.id] = 1; });

      var added = 0, skipped = 0;
      arr.forEach(function (raw) {
        if (!raw || typeof raw !== "object") { skipped++; return; }
        var it = normalize(raw);
        if (!it.title) { skipped++; return; }
        if (ids[it.id]) { skipped++; return; }
        ids[it.id] = 1;
        localIdeas.push(plain(it));
        added++;
      });

      if (saveLocal(localIdeas)) {
        render();
        setMsg("导入完成：新增 " + added + " 条，跳过 " + skipped + " 条（重复、无标题或格式不对）。", false);
      }
      e.target.value = "";
    };
    reader.onerror = function () {
      setMsg("文件读不出来，换一个 JSON 试试。", true);
      e.target.value = "";
    };
    reader.readAsText(file);
  }

  function handleListClick(e) {
    var btn = e.target.closest("button[data-del]");
    if (!btn) return;
    var id = btn.getAttribute("data-del");
    var target = localIdeas.filter(function (x) { return x.id === id; })[0];
    if (!target) return;
    if (!window.confirm("删除这条本机草稿？\n\n" + target.title + "\n\n公共数据里的条目不受影响。")) return;
    localIdeas = localIdeas.filter(function (x) { return x.id !== id; });
    if (saveLocal(localIdeas)) {
      render();
      setMsg("已删除 1 条本机草稿。", false);
    }
  }

  /* ---------- 启动 ---------- */

  function init() {
    F.form = $("wi-form");
    F.title = $("wi-f-title");
    F.scope = $("wi-f-scope");
    F.province = $("wi-f-province");
    F.country = $("wi-f-country");
    F.city = $("wi-f-city");
    F.type = $("wi-f-type");
    F.why = $("wi-f-why");
    F.sourceType = $("wi-f-src-type");
    F.sourceTitle = $("wi-f-src-title");
    F.sourceUrl = $("wi-f-src-url");
    F.status = $("wi-f-status");

    TYPES.forEach(function (t) {
      var opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      F.type.appendChild(opt);
    });

    buildTypeButtons();
    syncPressed();
    syncScopeFields();

    $("wi-scope").addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-scope]");
      if (!btn) return;
      state.scope = btn.getAttribute("data-scope");
      syncPressed();
      render();
    });

    F.scope.addEventListener("change", function () {
      syncScopeFields();
      setMsg("", false);
    });

    F.form.addEventListener("submit", handleSubmit);
    $("wi-list").addEventListener("click", handleListClick);
    $("wi-export").addEventListener("click", handleExport);
    $("wi-import").addEventListener("change", handleImport);

    if (!window.WORLD_IDEAS) {
      setMsg("world-ideas-data.js 没有加载，公共条目为空；本机草稿仍然可用。", true);
    } else if (D.updated) {
      var up = $("wi-updated");
      if (up) up.textContent = D.updated;
    }

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
