/* 我的行程 · 飞行 / 火车 / 自驾
 * 结构先留空，等真实行程录入后再填。
 * 一条行程示例（不要直接启用，等用户确认真实数据）：
 * {
 *   id: "2026-xx",
 *   title: "行程标题",
 *   start: "2026-07",
 *   end: "2026-07",
 *   days: 10,
 *   countries: ["日本"],
 *   cities: ["东京", "富士山"],
 *   modes: ["flight", "train", "drive"],
 *   summary: "一句话摘要",
 *   segments: [
 *     { mode: "flight", from: "上海", to: "东京", date: "2026-07-01", code: "" },
 *     { mode: "train", from: "东京", to: "富士山", date: "2026-07-02", code: "" },
 *     { mode: "drive", from: "田边", to: "本宫", date: "2026-07-05", code: "" }
 *   ]
 * }
 */
window.TRIPS = {
  "updated": "2026-11-03",
  "trips": []
};
