#!/usr/bin/env node
/**
 * 抓取 Go Ratings 首页前五名，写入 data/go-ratings-top5.json
 * 只依赖 Node 内置模块；解析失败时以非零状态退出，避免把空数据提交上线。
 */
import { readFile, writeFile } from "node:fs/promises";

const SOURCE = "https://www.goratings.org/en/";
const OUT = new URL("../data/go-ratings-top5.json", import.meta.url);
const UA = "Mozilla/5.0 (compatible; guobao-site/1.0; +https://manongchopin.github.io/guobao/)";

const res = await fetch(SOURCE, { headers: { "User-Agent": UA } });
if (!res.ok) throw new Error(`Go Ratings HTTP ${res.status}`);
const html = await res.text();

const rowRe = /<tr><td class="r">(\d+)<\/td><td><a [^>]*>([^<]+)<\/a><\/td><td[^>]*>[\s\S]*?<\/td><td[^>]*><img alt="([a-z]{2}) flag"[^>]*\/><\/td><td>(\d+)<\/td>\s*<\/tr>/g;
const rows = [];
for (const m of html.matchAll(rowRe)) {
  rows.push({ rank: Number(m[1]), name: m[2].trim(), country: m[3], elo: Number(m[4]) });
}
rows.sort((a, b) => a.rank - b.rank);
if (rows.length < 5) throw new Error(`Only parsed ${rows.length} rows`);

let playersDb = {};
try {
  playersDb = JSON.parse(await readFile(new URL("../data/go-players.json", import.meta.url), "utf8"));
} catch (e) {
  console.warn("go-players.json not found, using English names");
}

const players = rows.slice(0, 5).map((p) => ({
  ...p,
  nameZh: (playersDb[p.name] && playersDb[p.name].nameZh) || p.name
}));
const data = {
  updated: new Date().toISOString(),
  source: SOURCE,
  players
};

await writeFile(OUT, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(players.map((p) => `${p.rank}. ${p.name} (${p.country}) ${p.elo}`).join("\n"));
