#!/usr/bin/env node
/**
 * 抓取体育排名各榜单，重写 sports-rankings-data.js
 *
 * 设计要点：
 * 1. 每个榜单独立抓取。某一张失败不影响其他，失败的那张保留上一次的数据并打上
 *    stale 标记，页面会显示「未更新」；全部失败才以非零状态退出。
 * 2. 抓到的结果先做行数/字段校验，不合格当作失败，避免把残数据写上线。
 * 3. 中文名统一从 scripts/sports-names.json 取；没有译名的球员回落到外文原名，
 *    并在日志末尾列出，方便人工补。
 *
 * 只依赖 Node 内置模块。赛季奖金那张由 scripts/fetch-wta-prize.py 先解析成 JSON，
 * 这里只负责读。
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const DATA_FILE = join(ROOT, "sports-rankings-data.js");
const NAMES_FILE = join(HERE, "sports-names.json");
const PRIZE_JSON = process.env.WTA_PRIZE_JSON || "/tmp/wta-prize.json";

const UA = "Mozilla/5.0 (compatible; guobao-site/1.0; +https://manongchopin.github.io/guobao/)";

/* ---------------- 通用 ---------------- */

async function get(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.text();
}

function decode(s) {
  return String(s)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(s) {
  return decode(String(s).replace(/<[^>]+>/g, " "));
}

function tables(html) {
  return [...html.matchAll(/<table[^>]*>[\s\S]*?<\/table>/gi)].map((m) => m[0]);
}

function rowsOf(tableHtml) {
  return [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((tr) =>
    [...tr[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((td) => stripTags(td[1]))
  );
}

function money(n) {
  return "$" + Number(n).toLocaleString("en-US");
}

/* ---------------- 中文名 ---------------- */

const names = JSON.parse(await readFile(NAMES_FILE, "utf8"));
const ZH = names.zh || {};
const CN = new Set(names.cnPlayers || []);
const missingNames = new Set();

/* 各站的人名顺序不统一：tennisexplorer 用「姓 名」，WTA 官网用「名 姓」，
   还有 "Yuan Yue (1998)" 这种带年份的。逐个候选形式去映射表里找。 */
function nameCandidates(en) {
  const s = String(en).replace(/\s*\(\d{4}\)\s*$/, "").trim();
  const parts = s.split(/\s+/).filter(Boolean);
  const out = [s];
  if (parts.length === 2) out.push(`${parts[1]} ${parts[0]}`);
  if (parts.length > 2) out.push(`${parts[parts.length - 1]} ${parts.slice(0, -1).join(" ")}`);
  return out;
}

function displayName(en) {
  for (const c of nameCandidates(en)) {
    if (ZH[c]) return { name: ZH[c], en: c };
  }
  missingNames.add(en);
  return { name: String(en).replace(/\s*\(\d{4}\)\s*$/, "") };
}

const COUNTRY = {
  "China": "中国", "Chinese Taipei": "中国台北", "Hong Kong": "中国香港",
  "Australia": "澳大利亚", "England": "英格兰", "Scotland": "苏格兰", "Wales": "威尔士",
  "N.Ireland": "北爱尔兰", "Ireland": "爱尔兰", "Thailand": "泰国", "Iran": "伊朗",
  "Belgium": "比利时", "India": "印度", "Malta": "马耳他", "Poland": "波兰",
  "Ukraine": "乌克兰", "Egypt": "埃及", "Malaysia": "马来西亚", "Latvia": "拉脱维亚",
  "Germany": "德国", "Switzerland": "瑞士", "France": "法国", "Spain": "西班牙",
  "Italy": "意大利", "Serbia": "塞尔维亚", "USA": "美国", "Russia": "俄罗斯",
  "Kazakhstan": "哈萨克斯坦", "Belarus": "白俄罗斯", "Czechia": "捷克",
  "Czech Republic": "捷克", "Greece": "希腊", "Romania": "罗马尼亚", "Canada": "加拿大",
  "Japan": "日本", "Philippines": "菲律宾", "Austria": "奥地利", "Brazil": "巴西",
  "Argentina": "阿根廷", "Croatia": "克罗地亚", "Denmark": "丹麦", "Finland": "芬兰",
  "Norway": "挪威", "Sweden": "瑞典", "Netherlands": "荷兰", "Portugal": "葡萄牙",
  "Slovakia": "斯洛伐克", "Slovenia": "斯洛文尼亚", "Hungary": "匈牙利",
  "Bulgaria": "保加利亚", "Israel": "以色列", "Pakistan": "巴基斯坦",
  "Cyprus": "塞浦路斯", "Iceland": "冰岛", "Lithuania": "立陶宛", "Estonia": "爱沙尼亚"
};

const COUNTRY_CODE = {
  KAZ: "哈萨克斯坦", BLR: "白俄罗斯", RUS: "俄罗斯", USA: "美国", UKR: "乌克兰",
  CZE: "捷克", POL: "波兰", BEL: "比利时", ROU: "罗马尼亚", JPN: "日本",
  PHI: "菲律宾", CAN: "加拿大", SUI: "瑞士", CHN: "中国", LAT: "拉脱维亚",
  AUT: "奥地利", GRE: "希腊", FRA: "法国", ITA: "意大利", ESP: "西班牙",
  GER: "德国", SRB: "塞尔维亚", AUS: "澳大利亚", GBR: "英国", DEN: "丹麦",
  NOR: "挪威", SWE: "瑞典", NED: "荷兰", BRA: "巴西", ARG: "阿根廷",
  CRO: "克罗地亚", SVK: "斯洛伐克", SLO: "斯洛文尼亚", HUN: "匈牙利",
  BUL: "保加利亚", ISR: "以色列", IND: "印度", THA: "泰国", IRI: "伊朗",
  EGY: "埃及", MAS: "马来西亚", TPE: "中国台北", HKG: "中国香港"
};

const cn = (s) => COUNTRY[s] || COUNTRY_CODE[s] || s;

/* ---------------- 斯诺克 ---------------- */

function snookerSeason() {
  const d = new Date();
  const y = d.getUTCFullYear();
  return d.getUTCMonth() + 1 >= 6 ? y : y - 1;
}

async function snookerWorld() {
  const season = snookerSeason();
  const html = await get(`https://www.snooker.org/res/index.asp?template=31&season=${season}`);
  const t = tables(html)[1];
  if (!t) throw new Error("未找到排名表");
  const rows = rowsOf(t).slice(1)
    .map((c) => {
      const rank = parseInt(String(c[0]).replace(/[^\d]/g, ""), 10);
      const pts = parseInt(String(c[12] || "").replace(/[^\d]/g, ""), 10);
      return { rank, name: c[9], country: c[10], pts };
    })
    .filter((r) => r.rank > 0 && r.name && r.pts > 0)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 16);
  if (rows.length < 16) throw new Error(`只解析出 ${rows.length} 行`);
  return rows.map((r) => {
    const n = displayName(r.name);
    const out = { rank: r.rank, name: n.name };
    if (n.en) out.en = n.en;
    out.country = cn(r.country);
    out.points = r.pts.toLocaleString("en-US");
    return out;
  });
}

async function snookerInfo() {
  const html = await get("https://snookerinfo.co.uk/");
  const t = tables(html)[0];
  if (!t) throw new Error("未找到过百表");
  const num = (x) => parseInt(String(x).replace(/[^\d]/g, ""), 10) || 0;
  const list = rowsOf(t).slice(1)
    .map((c) => ({ rank: num(c[0]), name: c[1], total: num(c[2]), c147: num(c[6]) }))
    .filter((r) => r.rank > 0 && r.name && r.total > 0)
    .sort((a, b) => a.rank - b.rank);
  if (list.length < 16) throw new Error(`过百表只解析出 ${list.length} 行`);
  return list;
}

function centuriesFrom(list) {
  return list.slice(0, 16).map((r) => {
    const n = displayName(r.name);
    const out = { rank: r.rank, name: n.name };
    if (n.en) out.en = n.en;
    out.total = r.total.toLocaleString("en-US");
    return out;
  });
}

function maxesFrom(list) {
  return list.filter((r) => r.c147 > 0)
    .sort((a, b) => b.c147 - a.c147 || b.total - a.total)
    .slice(0, 16)
    .map((r, i) => {
      const n = displayName(r.name);
      const out = { rank: i + 1, name: n.name };
      if (n.en) out.en = n.en;
      out.c147 = r.c147;
      return out;
    });
}

async function rankingWinners() {
  const html = await get("https://snookerinfo.co.uk/ranking-winners/");
  const t = tables(html)[0];
  if (!t) throw new Error("未找到冠军表");
  const list = rowsOf(t).slice(1)
    .map((c) => ({ name: c[1], wins: parseInt(c[2], 10), span: c[5] }))
    .filter((r) => r.name && r.wins > 0);
  if (list.length < 16) throw new Error(`冠军表只解析出 ${list.length} 行`);
  return list;
}

function championsFrom(list) {
  return list.slice(0, 16).map((r, i) => {
    const n = displayName(r.name);
    const out = { rank: i + 1, name: n.name };
    if (n.en) out.en = n.en;
    out.span = r.span;
    out.wins = r.wins;
    return out;
  });
}

/* 维基：某球员的排名赛夺冠明细 */
async function wikiTitles(wiki) {
  const html = await get(`https://en.wikipedia.org/wiki/${wiki}`);
  const m = html.match(/<h[23][^>]*id="Ranking_finals[^"]*"[^>]*>[\s\S]*?<\/h[23]>/);
  if (!m) throw new Error("找不到 Ranking finals 小节");
  const seg = html.slice(m.index + m[0].length);
  for (const t of tables(seg)) {
    const head = stripTags(t.slice(0, 2000));
    if (!/Championship/.test(head) || !/Opponent/.test(head) || !/Score/.test(head)) continue;
    return rowsOf(t).slice(1)
      .filter((c) => c.length >= 6 && String(c[0]).toLowerCase() === "winner")
      .map((c) => ({ y: c[2], e: c[3] }));
  }
  throw new Error("找不到夺冠表");
}

async function chinaPlayers(list) {
  const mine = list.filter((r) => CN.has(r.name));
  if (!mine.length) throw new Error("冠军表里没有中国球员");
  const out = [];
  for (const r of mine) {
    const n = displayName(r.name);
    const row = {
      rank: 0,
      name: n.name,
      ...(r.name === "Marco Fu" ? { region: "中国香港" } : {}),
      span: r.span,
      wins: r.wins
    };
    try {
      row.titles = await wikiTitles(names.wikiTitles[r.name] || r.name.replace(/ /g, "_"));
    } catch (e) {
      console.warn(`  · ${r.name} 夺冠明细抓取失败：${e.message}`);
    }
    out.push(row);
  }
  out.sort((a, b) => b.wins - a.wins);
  out.forEach((r, i) => { r.rank = i + 1; });
  if (out.some((r) => !r.titles)) throw new Error("有球员缺夺冠明细");
  return out;
}

/* ---------------- 网球 ---------------- */

function teRows(html) {
  return [...html.matchAll(/<tr class="[^"]*"[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((tr) => {
      const r = tr[1];
      const rank = r.match(/<td class="rank[^"]*">(\d+)\.<\/td>/);
      const name = r.match(/<td class="t-name"><a[^>]*>([^<]+)<\/a>/);
      const pts = r.match(/<td class="long-point">([\d]+)<\/td>/);
      const cc = r.match(/<span class="fl fl-([a-z]{2})">/);
      // 国家名在国旗 span 之后的链接文字里，比两位代码可靠
      const ctry = r.match(/<td class="tl">[\s\S]*?<\/span>\s*([^<]*)<\/a>/);
      return rank && name
        ? {
            rank: +rank[1], en: decode(name[1]), pts: pts ? +pts[1] : 0,
            cc: cc ? cc[1].toUpperCase() : "",
            countryName: ctry ? decode(ctry[1]) : ""
          }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.rank - b.rank);
}

async function tennisTop10(which) {
  const url = which === "atp"
    ? "https://www.tennisexplorer.com/ranking/atp-men/"
    : "https://www.tennisexplorer.com/ranking/wta-women/";
  const rows = teRows(await get(url)).slice(0, 10);
  if (rows.length < 10) throw new Error(`只解析出 ${rows.length} 行`);
  return rows.map((r) => {
    const n = displayName(r.en);
    const out = { rank: r.rank, name: n.name };
    if (n.en) out.en = n.en;
    out.country = cn(r.countryName || r.cc);
    out.points = r.pts.toLocaleString("en-US");
    return out;
  });
}

async function chineseRanking(which, n = 10) {
  const url = which === "atp"
    ? "https://www.tennisexplorer.com/ranking/atp-men/?country=china"
    : "https://www.tennisexplorer.com/ranking/wta-women/?country=china";
  const rows = teRows(await get(url)).slice(0, n);
  if (rows.length < n) throw new Error(`只解析出 ${rows.length} 行`);
  return rows.map((r) => {
    const d = displayName(r.en);
    return { rank: r.rank, name: d.name, points: r.pts.toLocaleString("en-US") };
  });
}

/* WTA 官方：前十。页面每条球员是一个 data-player-id 块，
   块内 <td> 依次是 名次 / 姓名+国籍 / 年龄 / 参赛 / 积分。 */
async function wtaTop10() {
  const html = await get("https://www.wtatennis.com/rankings/singles");
  const marks = [...html.matchAll(/data-player-id="(\d+)"\s+data-player-name="([^"]+)"/g)];
  const rows = [];
  const seen = new Set();
  for (let i = 0; i < marks.length; i++) {
    const id = marks[i][1];
    if (seen.has(id)) continue;
    seen.add(id);
    const start = marks[i].index;
    const end = i + 1 < marks.length ? marks[i + 1].index : start + 4000;
    const block = html.slice(start, end);
    if (!/class="[^"]*player-row/.test(block)) continue;
    const cells = [...block.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => stripTags(m[1]));
    const rank = parseInt(cells[0], 10);
    if (!rank) continue;
    const cc = (cells[1] || "").match(/\b([A-Z]{3})\b/);
    const pointCell = cells.find((c, k) => k > 1 && /^[\d,]+$/.test(c) && c.replace(/[^\d]/g, "").length >= 3);
    rows.push({ rank, en: decode(marks[i][2]), cc: cc ? cc[1] : "", pts: pointCell || "0" });
  }
  rows.sort((a, b) => a.rank - b.rank);
  const top = rows.slice(0, 10);
  if (top.length < 10) throw new Error(`只解析出 ${top.length} 行`);
  return top.map((r) => {
    const n = displayName(r.en);
    const out = { rank: r.rank, name: n.name };
    if (n.en) out.en = n.en;
    out.country = cn(r.cc);
    out.points = String(r.pts).replace(/\s/g, "");
    return out;
  });
}

/* 维基：生涯奖金 */
function prizeOf(html) {
  const m = html.match(/Prize money([\s\S]{0,300})/);
  if (!m) return null;
  const t = stripTags(m[1]);
  const v = t.match(/\$\s*([\d,]+)/);
  return v ? +v[1].replace(/,/g, "") : null;
}

async function career() {
  const out = [];
  for (const p of names.career || []) {
    try {
      const html = await get(`https://en.wikipedia.org/wiki/${p.wiki}`);
      const v = prizeOf(html);
      if (v) out.push({ zh: p.zh, money: v });
    } catch (e) {
      console.warn(`  · ${p.zh} 生涯奖金抓取失败：${e.message}`);
    }
  }
  if (out.length < 10) throw new Error(`只拿到 ${out.length} 位球员`);
  out.sort((a, b) => b.money - a.money);
  return out.slice(0, 10).map((r, i) => ({ rank: i + 1, name: r.zh, points: money(r.money) }));
}

/* 赛季奖金：读 Python 解析出来的 JSON */
async function season() {
  const raw = JSON.parse(await readFile(PRIZE_JSON, "utf8"));
  if (!Array.isArray(raw) || raw.length < 10) throw new Error("赛季奖金数据不足");
  return raw.slice(0, 10).map((r, i) => ({
    rank: i + 1,
    name: names.season?.[r.name] || titleCase(r.name),
    points: money(r.total)
  }));
}

function titleCase(pdfName) {
  const [last, first] = String(pdfName).split(",").map((s) => s.trim());
  if (!first) return last;
  const f = first.toLowerCase().replace(/(^|\s|-)([a-z])/g, (_, a, b) => a + b.toUpperCase());
  const l = last.toLowerCase().replace(/(^|\s|-)([a-z])/g, (_, a, b) => a + b.toUpperCase());
  return `${f} ${l}`;
}

/* ---------------- 结构 ---------------- */

const COLS = {
  rank: [{ k: "rank", label: "名次", c: "rank" }, { k: "name", label: "球员", c: "player" },
         { k: "country", label: "国家", c: "country" }, { k: "points", label: "积分", c: "points" }],
  snkRank: [{ k: "rank", label: "排名", c: "rank" }, { k: "name", label: "球员", c: "player" },
            { k: "points", label: "积分", c: "points" }],
  centuries: [{ k: "rank", label: "名次", c: "rank" }, { k: "name", label: "球员", c: "player" },
              { k: "total", label: "过百总数", c: "points" }],
  maxes: [{ k: "rank", label: "名次", c: "rank" }, { k: "name", label: "球员", c: "player" },
          { k: "c147", label: "147 杆数", c: "points" }],
  champ: [{ k: "rank", label: "名次", c: "rank" }, { k: "name", label: "球员", c: "player" },
          { k: "span", label: "首冠—末冠", c: "span" }, { k: "wins", label: "冠军数", c: "points" }],
  prize: [{ k: "rank", label: "名次", c: "rank" }, { k: "name", label: "球员", c: "player" },
          { k: "points", label: "奖金", c: "points" }]
};

const SPEC = [
  ["snooker", "world", {
    title: "世界排名", sub: "2026/27 赛季 · 前 16", wide: false, columns: COLS.rank,
    source: "https://www.snooker.org/res/index.asp?template=31&season=2026",
    sourceLabel: "snooker.org · 世界排名", note: "官方积分表，截至北爱尔兰公开赛后。"
  }, snookerWorld],

  ["snooker", "centuries", {
    title: "历史单杆过百", sub: "累计杆数 · 前 16", wide: false, columns: COLS.centuries,
    source: "https://snookerinfo.co.uk/", sourceLabel: "SnookerInfo · 100+ Centuries",
    note: "收录职业生涯过百数达 100 杆以上的球员。"
  }, async () => centuriesFrom(await snookerInfo())],

  ["snooker", "maxes", {
    title: "147 满分杆", sub: "累计杆数 · 前 16", wide: false, columns: COLS.maxes,
    source: "https://snookerinfo.co.uk/", sourceLabel: "SnookerInfo · 过百榜 147 列",
    note: "取自同一张过百榜的 147 列，因此只覆盖过百 100 杆以上的球员；过百不足 100 杆的球员不在其内。"
  }, async () => maxesFrom(await snookerInfo())],

  ["snooker", "champ", {
    title: "排名赛冠军 · 世界", sub: "历史累计 · 前 16", wide: false, columns: COLS.champ,
    source: "https://snookerinfo.co.uk/ranking-winners/", sourceLabel: "SnookerInfo · Ranking Winners",
    note: "按排名赛冠军总数排序，含现役与退役球员。"
  }, async () => championsFrom(await rankingWinners())],

  ["snooker", "china", {
    title: "中国球员 · 排名赛冠军", sub: "全部球员 · 点名字看明细", wide: true, columns: COLS.champ,
    source: "https://snookerinfo.co.uk/ranking-winners/", sourceLabel: "SnookerInfo · Ranking Winners",
    note: "点击球员名可展开其全部冠军（年份 + 赛事）。"
  }, async () => chinaPlayers(await rankingWinners())],

  ["tennis", "atp", {
    title: "ATP 单打", sub: "前 10", wide: false, columns: COLS.rank,
    source: "https://www.tennisexplorer.com/ranking/atp-men/", sourceLabel: "tennisexplorer · ATP 排名",
    note: "ATP 官网对抓取返回 403，这里用 tennisexplorer 的排名镜像，积分口径与 ATP 一致。"
  }, () => tennisTop10("atp")],

  ["tennis", "wta", {
    title: "WTA 单打", sub: "前 10", wide: false, columns: COLS.rank,
    source: "https://www.wtatennis.com/rankings/singles", sourceLabel: "WTA 官方单打排名",
    note: "直接取自 WTA 官网榜单。"
  }, wtaTop10],

  ["tennis", "chn-atp", {
    title: "中国男子 · ATP 排名", sub: "世界排名前 10 位中国球员", wide: false, columns: COLS.snkRank,
    source: "https://www.tennisexplorer.com/ranking/atp-men/?country=china",
    sourceLabel: "tennisexplorer · ATP 中国球员",
    note: "按世界排名取中国球员前 10 位。ATP 官网对抓取返回 403，此处用 tennisexplorer 镜像。"
  }, () => chineseRanking("atp")],

  ["tennis", "chn-wta", {
    title: "中国女子 · WTA 排名", sub: "世界排名前 10 位中国球员", wide: false, columns: COLS.snkRank,
    source: "https://www.tennisexplorer.com/ranking/wta-women/?country=china",
    sourceLabel: "tennisexplorer · WTA 中国球员",
    note: "按世界排名取中国球员前 10 位。部分低排名球员暂无可靠中文译名，暂用拼音。"
  }, () => chineseRanking("wta")],

  ["tennis", "chn-career", {
    title: "中国球员 · 生涯奖金", sub: "男女合并 · 前 10", wide: false, columns: COLS.prize,
    source: "https://en.wikipedia.org/wiki/Li_Na", sourceLabel: "维基百科各球员页信息框",
    note: "生涯总奖金，含现役与退役球员。数字由维基编辑手动维护，可能略滞后于官方；晏紫、李婷无维基条目，未收入。"
  }, career],

  ["tennis", "chn-season", {
    title: "中国球员 · 赛季奖金", sub: "女子 · 2026 · 前 10", wide: false, columns: COLS.prize,
    source: "https://wtafiles.wtatennis.com/pdf/rankings/All_YTD_Prize_Money.pdf",
    sourceLabel: "WTA · All YTD Prize Money",
    note: "赛季累计奖金，单打+双打+混双合计。男子部分因 ATP 官网封锁、无可用来源，本表只列女子。部分球员暂无可靠中文译名，暂用拼音。"
  }, season]
];

/* ---------------- 合并 ---------------- */

async function loadPrev() {
  try {
    const src = await readFile(DATA_FILE, "utf8");
    const m = src.match(/^([\s\S]*?window\.SPORTS_RANKINGS = )([\s\S]*?)(;\s*)$/);
    if (!m) return { header: null, data: null };
    return { header: m[1], data: JSON.parse(m[2]) };
  } catch {
    return { header: null, data: null };
  }
}

const DEFAULT_HEADER = `/* 体育排名：榜单数据（由 scripts/update-sports-rankings.mjs 每周自动生成，勿手改）
   页面：sports-rankings.html

   section.wide = true 占满整行，否则两表并排。
   columns 的 c 决定列样式：rank / player / country / span / points
   rows.name 是显示名（中文），rows.en 是外文原名，rows.titles 是夺冠明细。
   fetchedAt 是本地抓取时间；榜单"截至"时点写在各 section.note 里。 */

`;

const prev = await loadPrev();
const prevData = prev.data || { fetchedAt: "", panels: {} };
const fresh = { snooker: [], tennis: [] };
const failed = [];

console.log("开始抓取……");
for (const [panel, key, meta, fn] of SPEC) {
  try {
    const rows = await fn();
    if (!Array.isArray(rows) || !rows.length) throw new Error("返回空数据");
    fresh[panel].push({ key, ...meta, ...(key === "china" ? { note: `合计 ${rows.reduce((s, r) => s + (r.wins || 0), 0)} 个排名赛冠军。点击球员名可展开其全部冠军（年份 + 赛事）。` } : {}), rows });
    console.log(`  ✓ ${key}  ${rows.length} 行`);
  } catch (e) {
    failed.push({ panel, key, msg: e.message });
    console.log(`  ✗ ${key}  ${e.message}`);
  }
}

// 失败的表沿用上一次的数据并标记 stale
for (const f of failed) {
  const old = (prevData.panels?.[f.panel]?.sections || []).find((s) => s.key === f.key);
  if (old) fresh[f.panel].push({ ...old, stale: true });
}

const order = SPEC.map(([p, k]) => `${p}:${k}`);
for (const panel of ["snooker", "tennis"]) {
  fresh[panel].sort((a, b) => order.indexOf(`${panel}:${a.key}`) - order.indexOf(`${panel}:${b.key}`));
}

const out = {
  fetchedAt: new Date().toISOString(),
  panels: {
    snooker: { id: "snooker", title: "斯诺克", status: "ok", sections: fresh.snooker },
    tennis: { id: "tennis", title: "网球", status: "ok", sections: fresh.tennis }
  }
};

await writeFile(DATA_FILE, (prev.header || DEFAULT_HEADER) + JSON.stringify(out, null, 2) + ";\n", "utf8");

if (missingNames.size) {
  console.log("\n⚠ 以下球员还没有中文译名，已回落为外文原名，请补进 scripts/sports-names.json：");
  for (const n of missingNames) console.log("   - " + n);
}
if (failed.length) {
  console.log(`\n⚠ ${failed.length} 张表抓取失败，已保留上次数据并标记「未更新」：`);
  for (const f of failed) console.log(`   - ${f.key}: ${f.msg}`);
}

const ok = SPEC.length - failed.length;
console.log(`\n完成：${ok}/${SPEC.length} 张表更新成功。`);
if (ok === 0) {
  console.error("全部失败，退出码 1");
  process.exit(1);
}
