#!/usr/bin/env python3
"""解析 WTA 官方赛季奖金 PDF（All_YTD_Prize_Money.pdf），输出中国球员的 JSON。

用法：fetch-wta-prize.py <本地 PDF 路径>
（下载由外部完成——CI 里用 curl，本地同理。Python 只负责解析，避免各自维护 TLS 链。）

PDF 里每页是一张表：排名 / 姓名 / 国籍 / 单打 / 双打 / 混双 / 合计。
pypdf 抽出来的文本是逐行散开的，所以用两个锚点重建：
  1. 以 "CHN" 这一行定位，它上一行是姓名；
  2. 姓名之后的连续数字就是各分项与合计，合计必然是其中最大的那个。

输出：[{ "name": "ZHENG, QINWEN", "total": 2490893 }, ...] 按合计降序。
"""
import json
import os
import re
import sys

OUT = os.environ.get("WTA_PRIZE_JSON", "/tmp/wta-prize.json")
MIN_ROWS = 10


def main(argv) -> int:
    if len(argv) < 2:
        print("用法: fetch-wta-prize.py <pdf 路径>", file=sys.stderr)
        return 2
    path = argv[1]
    if not os.path.exists(path):
        print(f"找不到 PDF: {path}", file=sys.stderr)
        return 2

    from pypdf import PdfReader  # 延迟导入，缺依赖时报错更清楚

    lines = []
    for page in PdfReader(path).pages:
        lines.extend((page.extract_text() or "").splitlines())
    lines = [l.strip() for l in lines if l.strip()]

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
        if vals:
            recs.append({"name": name, "total": max(vals)})

    if len(recs) < MIN_ROWS:
        print(f"只解析出 {len(recs)} 条，放弃", file=sys.stderr)
        return 1

    recs.sort(key=lambda d: -d["total"])
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(recs, f, ensure_ascii=False)

    print(f"解析 {len(recs)} 位中国球员 -> {OUT}")
    print(f"第 1 位：{recs[0]['name']} ${recs[0]['total']:,}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
