#!/usr/bin/env node
/**
 * 抓取 WCA 3×3 单次世界排名前五，写入 data/wca-top5.json
 * WCA API 对普通请求会返回 403，需要带浏览器请求头。
 */
import { readFile, writeFile } from "node:fs/promises";

const SOURCE = "https://www.worldcubeassociation.org/results/rankings/333/single?";
const API = "https://www.worldcubeassociation.org/api/v0/results/rankings/333/single";
const OUT = new URL("../data/wca-top5.json", import.meta.url);
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const COUNTRY = {
  China: "cn",
  "Hong Kong": "hk",
  Poland: "pl",
  USA: "us",
  "United States": "us",
  Japan: "jp",
  Korea: "kr"
};

function splitName(full) {
  const m = String(full).match(/^(.*?)\s*[（(]([^）)]+)[）)]\s*$/);
  return m ? { name: m[1].trim(), nameZh: m[2].trim() } : { name: String(full).trim(), nameZh: String(full).trim() };
}

const res = await fetch(API, {
  headers: {
    "User-Agent": UA,
    "Accept": "application/json",
    "Referer": SOURCE
  }
});
if (!res.ok) throw new Error(`WCA HTTP ${res.status}`);
const json = await res.json();
const rows = (json.rankings || []).slice(0, 5);
if (rows.length < 5) throw new Error(`Only ${rows.length} rankings`);

let playersDb = {};
try {
  playersDb = JSON.parse(await readFile(new URL("../data/wca-players.json", import.meta.url), "utf8"));
} catch (e) {
  console.warn("wca-players.json not found, using names from API");
}

const players = rows.map((p, i) => {
  const n = splitName(p.person_name);
  const db = playersDb[n.name] || {};
  return {
    rank: i + 1,
    name: n.name,
    nameZh: db.nameZh || n.nameZh,
    result: (p.best / 100).toFixed(2),
    country: COUNTRY[p.country_id] || String(p.country_id || "").toLowerCase(),
    personId: p.person_id
  };
});

const data = {
  updated: new Date().toISOString(),
  source: SOURCE,
  players
};
await writeFile(OUT, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(players.map((p) => `${p.rank}. ${p.nameZh} ${p.result} (${p.country})`).join("\n"));
