#!/usr/bin/env node
/**
 * 抓取英文维基「List of national parks of the United States」表格中
 * 最新的 Recreation visitors (YYYY) 列，写入 data/usa-parks-visitors.json
 */
import { readFile, writeFile } from "node:fs/promises";

const PAGE = "List of national parks of the United States";
const API = "https://en.wikipedia.org/w/api.php?action=parse&prop=text&format=json&formatversion=2&page=" + encodeURIComponent(PAGE);
const OUT = new URL("../data/usa-parks-visitors.json", import.meta.url);
const UA = "Mozilla/5.0 (compatible; guobao-site/1.0; +https://manongchopin.github.io/guobao/)";

const res = await fetch(API, { headers: { "User-Agent": UA } });
if (!res.ok) throw new Error(`Wikipedia HTTP ${res.status}`);
const json = await res.json();
const html = json.parse.text;

const tableMatch = html.match(/<table[^>]*class="[^"]*wikitable[^"]*"[^>]*>([\s\S]*?)<\/table>/i);
if (!tableMatch) throw new Error("wikitable not found");

const rows = [...tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) => m[1]);
if (rows.length < 60) throw new Error(`only ${rows.length} rows`);

function cellText(cell) {
  return cell
    .replace(/<sup[\s\S]*?<\/sup>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#160;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const header = [...rows[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((m) => cellText(m[1]));
const vIndex = header.findIndex((h) => /Recreation visitors\s*\((\d{4})\)/i.test(h));
if (vIndex < 0) throw new Error("visitor column not found");
const year = Number(header[vIndex].match(/\((\d{4})\)/)[1]);

const visitors = {};
for (const row of rows.slice(1)) {
  const cells = [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((m) => cellText(m[1]));
  if (cells.length < vIndex + 1) continue;
  const name = cells[0].replace(/[*†‡]/g, "").trim();
  const value = Number(cells[vIndex].replace(/[^\d]/g, ""));
  if (name && value) visitors[name] = value;
}
if (Object.keys(visitors).length < 60) throw new Error(`only ${Object.keys(visitors).length} visitors`);

let old = {};
try { old = JSON.parse(await readFile(OUT, "utf8")); } catch (e) {}
const data = {
  year,
  source: "https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States",
  updated: old.year === year && old.updated ? old.updated : new Date().toISOString(),
  visitors
};
await writeFile(OUT, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`updated ${year}: ${Object.keys(visitors).length} parks`);
