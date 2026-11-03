/* 发散的全世界 · 旅行灵感收件箱
 *
 * 这个文件是「已收录」的公共数据：写进这里的条目，全站可见，卡片上标「已收录」。
 * 本机添加的条目存在 localStorage 的 world-ideas-v1 里，标「本机草稿」，不会自动发布。
 *
 * 第一版刻意留空：宁可空着，也不编造没确认过的地点。
 * 等有真实灵感（文章 / 视频 / 书 / 朋友 / 自己发现）再逐条往里填。
 *
 * 字段（一条）：
 *   id          唯一标识，建议 cn-省份-短名 / world-国家-短名
 *   scope       "cn"（国内篇）| "world"（国外篇）
 *   title       标题
 *   country     国家；国内统一写「中国」
 *   province    省份（仅国内用）
 *   city        城市
 *   place       地点补充说明，可空；空则页面用 省份/城市 或 国家/城市 拼
 *   type        世界遗产 | 国家公园 | 古城 | 博物馆 | 徒步 | 自驾 | 铁路 | 美食 | 其他
 *   tags        自由标签数组，可空
 *   why         一句话：为什么想去
 *   sourceType  article | video | book | friend | self
 *   sourceTitle 来源标题
 *   sourceUrl   来源链接，可空
 *   status      seed（种子）| checked（查过）| want（想去）| executable（可执行）
 *   added       收藏日期 YYYY-MM-DD
 *   priority    0 起，暂未参与排序，先留着
 *
 * 国外条目可选加 continent（大洲）。不写时页面按内置的「国家 → 大洲」表推断，
 * 推断不出就归到「待归类」，不会瞎猜。
 */
window.WORLD_IDEAS = {
  updated: "2026-11-03",
  ideas: []
};
