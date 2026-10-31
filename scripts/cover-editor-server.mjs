#!/usr/bin/env node
/**
 * 本机封面排版器：只监听 127.0.0.1，不对外网开放。
 * 用法：node scripts/cover-editor-server.mjs
 * 打开：http://127.0.0.1:8787/cover-editor.html
 */
import http from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 8787;
const OUT = path.join(ROOT, "data", "cover-design.json");
const TEXTS = path.join(ROOT, "data", "cover-texts.json");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".pdf": "application/pdf"
};

const clamp = (n, lo, hi, fallback) => {
  n = Number(n);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : fallback;
};

function styleOf(input) {
  const s = input && typeof input === "object" ? input : {};
  return {
    fontFamily: ["PingFang SC", "Songti SC", "Noto Serif SC", "Hiragino Sans GB"].includes(s.fontFamily)
      ? s.fontFamily : "PingFang SC",
    headingSize: clamp(s.headingSize, 7, 14, 9.5),
    bodySize: clamp(s.bodySize, 6, 12, 8.8),
    lineHeight: clamp(s.lineHeight, 1.3, 2.4, 1.75),
    paragraphGap: clamp(s.paragraphGap, 0, 12, 2.2),
    topGap: clamp(s.topGap, 0, 30, 7),
    bottomPadding: clamp(s.bottomPadding, 8, 40, 16),
    textColor: /^#[0-9a-f]{6}$/i.test(s.textColor || "") ? s.textColor : "#222222"
  };
}

function clean(input) {
  const body = input && typeof input === "object" ? input : {};
  const style = styleOf(body.style || body);
  const documents = {};
  if (body.documents && typeof body.documents === "object") {
    for (const [id, doc] of Object.entries(body.documents)) {
      if (!/^[a-zA-Z0-9-]+$/.test(id)) continue;
      if (!doc || typeof doc !== "object") continue;
      const heading = String(doc.heading ?? "").slice(0, 80);
      const text = String(doc.text ?? "").slice(0, 6000);
      if (heading || text) documents[id] = { heading, text };
    }
  }
  return { style, documents };
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (req.method === "POST" && url.pathname === "/api/save") {
      let body = "";
      for await (const chunk of req) {
        body += chunk;
        if (body.length > 1_000_000) throw new Error("payload too large");
      }
      const data = clean(JSON.parse(body || "{}"));
      data.updatedAt = new Date().toISOString();
      await mkdir(path.dirname(OUT), { recursive: true });
      await writeFile(OUT, JSON.stringify(data, null, 2) + "\n", "utf8");
      res.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
      res.end(JSON.stringify({ ok: true, path: "data/cover-design.json", data }));
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/texts") {
      try {
        const data = await readFile(TEXTS, "utf8");
        res.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
        res.end(data);
      } catch {
        res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ ok: false }));
      }
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/latest") {
      try {
        const data = await readFile(OUT, "utf8");
        res.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
        res.end(data);
      } catch {
        res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ ok: false }));
      }
      return;
    }

    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/cover-editor.html";
    const file = path.resolve(ROOT, "." + pathname);
    if (!file.startsWith(ROOT + path.sep)) {
      res.writeHead(403); res.end("Forbidden"); return;
    }
    const data = await readFile(file);
    res.writeHead(200, {
      "content-type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-store"
    });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("保存失败：" + err.message);
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Cover editor: http://127.0.0.1:${PORT}/cover-editor.html`);
  console.log(`Save file: data/cover-design.json`);
  console.log(`Texts: data/cover-texts.json`);
});
