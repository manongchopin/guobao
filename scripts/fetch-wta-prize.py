#!/usr/bin/env python3
"""解析 WTA 官方奖金 PDF，输出中国球员的 JSON。

用法：fetch-wta-prize.py <kind> <pdf 路径>
  kind = ytd     赛季累计（All_YTD_Prize_Money.pdf）
  kind = career  生涯累计（All_Career_Prize_Money.pdf）
（下载由外部完成——CI 里用 curl。Python 只负责解析，避免各自维护 TLS 链。）

两类 PDF 的列不同：
  ytd     排名 / 姓名 / 国籍 / 单打 / 双打 / 混双 / 合计
  career  排名 / 姓名 / 国籍 / 生涯合计
pypdf 抽出来的文本是逐行散开的，所以以 "CHN" 行定位（上一行是姓名），
再把后面的连续数字收起来：最后一个是下一位球员的名次号，要去掉；
  ytd    去掉末位后取最大值（合计 ≥ 各分项）
  career 去掉末位后取第一个（只有合计一项）

输出：[{ "name": "ZHENG, QINWEN", "total": 2490893 }, ...] 按金额降序。
"""
import json
import os
import re
import sys

MIN_ROWS = 10


def collect(lines, kind):
    num = re.compile(r"^[\d,]+$")
    recs = []
    for i, line in enumerate(lines):
        if line != "CHN" or i < 2:
            continue
        name = lines[i - 1]
        if not re.search(r"[A-Z]{2,}", name):
            continue
        vals = []
        j = i + 1
        while j < len(lines) and num.match(lines[j]):
            vals.append(int(lines[j].replace(",", "")))
            j += 1
        if not vals:
            continue
        # 末位是下一位球员的名次号
        body = vals[:-1] if len(vals) > 1 else vals
        total = max(body) if kind == "ytd" else body[0]
        recs.append({"name": name, "total": total})
    return recs


def main(argv) -> int:
    if len(argv) < 3:
        print("用法: fetch-wta-prize.py <ytd|career> <pdf 路径>", file=sys.stderr)
        return 2
    kind, path = argv[1], argv[2]
    if kind not in ("ytd", "career"):
        print(f"未知类型: {kind}", file=sys.stderr)
        return 2
    if not os.path.exists(path):
        print(f"找不到 PDF: {path}", file=sys.stderr)
        return 2

    from pypdf import PdfReader  # 延迟导入，缺依赖时报错更清楚

    lines = []
    for page in PdfReader(path).pages:
        lines.extend((page.extract_text() or "").splitlines())
    lines = [l.strip() for l in lines if l.strip()]

    recs = collect(lines, kind)
    if len(recs) < MIN_ROWS:
        print(f"只解析出 {len(recs)} 条，放弃", file=sys.stderr)
        return 1

    recs.sort(key=lambda d: -d["total"])
    out = os.environ.get("WTA_PRIZE_JSON", f"/tmp/wta-{kind}.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(recs, f, ensure_ascii=False)

    print(f"[{kind}] 解析 {len(recs)} 位中国球员 -> {out}")
    print(f"[{kind}] 第 1 位：{recs[0]['name']} ${recs[0]['total']:,}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
