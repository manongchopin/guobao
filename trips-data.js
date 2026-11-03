/* 我的行程 · 飞行 / 火车 / 自驾
 * 飞行：飞常准「乘机行程」截图（2010–2013 最早的一批），OCR 后人工校对。
 * 火车：12306「本人车票」截图（2026-10），OCR 后人工校对。
 * 日期只公开到月份；机型未记录；距离为直线/大圆距离估算。
 * 2013-01 的 CZ3555 同月飞了两次，保留两条，页面以 ①② 标注。
 */
window.TRIPS = {
  "updated": "2026-11-03",
  "source": "飞常准 乘机行程 / 12306 本人车票",
  "flights": [
    { month: "2010-02", flight: "CZ3728", from: "义乌", fromCode: "YIW", to: "广州", toCode: "CAN", km: 942 },
    { month: "2010-06", flight: "CZ3795", from: "广州", fromCode: "CAN", to: "义乌", toCode: "YIW", km: 942 },
    { month: "2010-08", flight: "CZ6412", from: "深圳", fromCode: "SZX", to: "义乌", toCode: "YIW", km: 970 },
    { month: "2010-09", flight: "CA1721", from: "杭州", fromCode: "HGH", to: "广州", toCode: "CAN", km: 1038 },
    { month: "2011-02", flight: "CZ3885", from: "义乌", fromCode: "YIW", to: "广州", toCode: "CAN", km: 942 },
    { month: "2011-04", flight: "CZ3884", from: "义乌", fromCode: "YIW", to: "广州", toCode: "CAN", km: 942 },
    { month: "2011-04", flight: "CZ6271", from: "广州", fromCode: "CAN", to: "义乌", toCode: "YIW", km: 942 },
    { month: "2012-12", flight: "CI0923", from: "台北松山", fromCode: "TSA", to: "香港", toCode: "HKG", km: 836 },
    { month: "2013-01", flight: "CZ3555", from: "深圳", fromCode: "SZX", to: "杭州", toCode: "HGH", km: 1071 },
    { month: "2013-01", flight: "CZ3555", from: "深圳", fromCode: "SZX", to: "杭州", toCode: "HGH", km: 1071 },
    { month: "2013-02", flight: "CZ3875", from: "义乌", fromCode: "YIW", to: "深圳", toCode: "SZX", km: 970 },
    { month: "2013-02", flight: "CZ6398", from: "深圳", fromCode: "SZX", to: "义乌", toCode: "YIW", km: 970 },
    { month: "2013-06", flight: "CZ3555", from: "深圳", fromCode: "SZX", to: "杭州", toCode: "HGH", km: 1071 },
    { month: "2013-07", flight: "CZ3876", from: "深圳", fromCode: "SZX", to: "义乌", toCode: "YIW", km: 970 },
    { month: "2013-07", flight: "D7193", from: "加德满都", fromCode: "KTM", to: "吉隆坡", toCode: "KUL", km: 3273 },
    { month: "2013-07", flight: "D7302", from: "吉隆坡", fromCode: "KUL", to: "杭州", toCode: "HGH", km: 3637 },
    { month: "2013-07", flight: "SC4697", from: "西安", fromCode: "XIY", to: "西宁", toCode: "XNN", km: 650 },
    { month: "2013-08", flight: "CZ3797", from: "深圳", fromCode: "SZX", to: "杭州", toCode: "HGH", km: 1071 },
    { month: "2013-08", flight: "CZ5901", from: "杭州", fromCode: "HGH", to: "深圳", toCode: "SZX", km: 1071 },
    { month: "2013-09", flight: "CZ6397", from: "义乌", fromCode: "YIW", to: "深圳", toCode: "SZX", km: 970 }
  ],
  "trains": [
    { month: "2026-10", train: "G456", from: "上海虹桥", to: "武汉", km: 661 },
    { month: "2026-10", train: "G1792", from: "武汉", to: "合肥南", km: 304 },
    { month: "2026-10", train: "G7388", from: "合肥南", to: "上海虹桥", km: 387 },
    { month: "2026-10", train: "G201", from: "上海虹桥", to: "杭州东", km: 146 }
  ],
  "trips": []
};
