/* 发散的全世界 · 旅行灵感数据
 *
 * 两层：
 *   destinations  目的地（一个国家 / 一个省），有页面就写 page，点进去是一页资料
 *   ideas         一条条灵感，用 destinationId 挂在目的地下面
 *
 * 页面：
 *   world-ideas.html      索引，按 国内篇 / 国外篇 列目的地卡
 *   ideas-norway.html     挪威页，读 destinationId === "norway" 的条目
 *
 * 本机添加的条目存在 localStorage 的 world-ideas-v1，标「本机草稿」，不在这里。
 * 这里的条目标「已收录」，改一次全站可见。
 *
 * 数据纪律：
 *   - 查不到的不写；写法待核的写进条目的 notes
 *   - 坐标来自维基百科/Wikidata，不是导航级精度，只作定位用
 *   - 费用、班次、季节窗口一律标年份或「待核」，不当成长期有效
 */

window.WORLD_IDEAS = {
  updated: "2026-11-04",

  destinations: [
    {
      id: "norway",
      scope: "world",
      title: "挪威",
      subtitle: "NORGE · 三块石头",
      country: "挪威",
      countryEn: "Norge",
      continent: "欧洲",
      summary: "布道石、奇迹石、恶魔之舌。三块石头分在吕瑟峡湾和哈当厄尔峡湾，彼此不近，一趟走完至少七天。",
      page: "ideas-norway.html",
      added: "2026-11-03",
      status: "checked"
    }
  ],

  ideas: [
    {
      id: "no-preikestolen",
      destinationId: "norway",
      scope: "world",
      country: "挪威",
      province: "",
      city: "斯塔万格 · 吕瑟峡湾",
      place: "Strand, Rogaland",
      title: "布道石",
      titleEn: "Preikestolen",
      type: "徒步",
      why: "三块石头里最容易到的一块，先拿它试水。",
      status: "checked",
      added: "2026-11-03",
      priority: 1,
      lat: 58.9867,
      lon: 6.1875,
      km: 8,
      ascentM: 330,
      hours: 4,
      facts: [
        { k: "海拔", v: "604 m，平台约 25 × 25 m" },
        { k: "往返", v: "约 8 km（单程 3.8 km）" },
        { k: "爬升", v: "约 330 m（UT.no 记全程累计 369 m）" },
        { k: "用时", v: "3–4 小时；带小孩 4–5 小时" },
        { k: "难度", v: "中等（UT.no: Middels krevende）" },
        { k: "季节", v: "全年；冬季结冰要冰爪" }
      ],
      access: "斯塔万格出发约 40 分钟车程，走 2020 年通车的 Ryfast 海底隧道；也可从吕瑟峡湾南侧坐渡轮到 Oanes。夏季有 Preikestolen Express 直达巴士。",
      notes: [
        "停车场在 Preikestolhytta，约 1000 个车位，收费；具体价格待核。",
        "每年约 30–35 万人上山。6–9 月中午最挤，15:00 之后和 09:00 之前人少。",
        "崖顶没有护栏，平台三面是 604 m 直落。"
      ],
      sources: [
        { title: "UT.no · Preikestolen（距离/爬升/季节）", url: "https://ut.no/turforslag/1111875" },
        { title: "Wikipedia · Preikestolen（海拔/交通/游客量）", url: "https://en.wikipedia.org/wiki/Preikestolen" }
      ]
    },

    {
      id: "no-kjeragbolten",
      destinationId: "norway",
      scope: "world",
      country: "挪威",
      province: "",
      city: "吕瑟峡湾 · 吕瑟博滕",
      place: "Sandnes, Rogaland",
      title: "奇迹石",
      titleEn: "Kjeragbolten",
      type: "徒步",
      why: "三块石头里最像「一张照片」的一块：卡在岩缝里的圆石。",
      status: "checked",
      added: "2026-11-03",
      priority: 2,
      lat: 59.0337,
      lon: 6.5933,
      km: 11,
      ascentM: 760,
      hours: 6,
      facts: [
        { k: "海拔", v: "石头卡在约 1,000 m 的岩缝；Kjerag 山顶 1,110 m" },
        { k: "往返", v: "约 11 km" },
        { k: "爬升", v: "约 750–760 m，三段陡坡" },
        { k: "用时", v: "约 6 小时（看天气和体力）" },
        { k: "难度", v: "困难（Fjord Norway 标「红」）" },
        { k: "季节", v: "5–10 月；冬季不建议" }
      ],
      access: "两种走法：一是从斯塔万格坐夏季直达巴士到 Øygardstølen 停车场；二是开到吕瑟博滕（Lysebotn），再走 27 道发夹弯上山，或从斯塔万格坐渡轮到吕瑟博滕转接驳车。",
      notes: [
        "停车场在 Øygardstølen，收费，有游客中心（5–10 月有人）；停车价格待核。",
        "通往吕瑟博滕的 Rv500 通常 5 月中开山，10/11 月第一场雪后封路；封路时铁链也会拆走。",
        "石头下方是 984 m 深谷。两侧有铁链，雨天湿滑，恐高的话下坡会比上坡慢。",
        "石头在 Nesatindane 石堆以南约 300 m，平台上有指路石堆。"
      ],
      sources: [
        { title: "Fjord Norway · Kjerag（距离/爬升/季节/交通）", url: "https://www.fjordnorway.com/no/se-og-gjore/kjerag" },
        { title: "Wikipedia · Kjeragbolten（海拔/坐标/地质）", url: "https://en.wikipedia.org/wiki/Kjeragbolten" }
      ]
    },

    {
      id: "no-trolltunga",
      destinationId: "norway",
      scope: "world",
      country: "挪威",
      province: "",
      city: "奥达 · 哈当厄尔峡湾",
      place: "Ullensvang, Vestland",
      title: "恶魔之舌",
      titleEn: "Trolltunga",
      type: "徒步",
      why: "三块里最难的一块，得单独留一整天，也是最有理由专门去挪威的一块。",
      status: "checked",
      added: "2026-11-03",
      priority: 3,
      lat: 60.1332,
      lon: 6.7547,
      km: 27,
      ascentM: 1100,
      hours: 10,
      facts: [
        { k: "海拔", v: "1,126 m，悬在 Ringedalsvatnet 湖面上方约 700 m" },
        { k: "往返", v: "P2 Skjeggedal 27 km；P3 Mågelitopp 20 km；P1 Tyssedal 38 km" },
        { k: "爬升", v: "约 1,100 m（P2 起）" },
        { k: "用时", v: "P2 8–12 小时；P3 7–10 小时" },
        { k: "难度", v: "很高（官方 Very Demanding）" },
        { k: "季节", v: "6 月 1 日–9 月 30 日可自行前往" }
      ],
      access: "从奥达（Odda）走 Rv13 到 Tyssedal，再按路牌到 P2 Skjeggedal 停车场；P2 有接驳车到 P3 Mågelitopp，省掉最前面 4.3 km、400 m 爬升。奥达镇上有接驳巴士。",
      notes: [
        "停车：P2 约 500 kr/天，P3 约 600 kr 且每天限 30 车、要提前订；P2→P3 接驳约 130 kr。都是 2024 年前后的价格，行前再核。",
        "6–9 月可自行前往；其余时间官方建议跟向导。夏季也要 10:00 前出发，9 月最晚 8:00。",
        "沿途有 3 个应急小屋：Floren、Endåen、Tyssehøl。每年约 40 次救援，多数是因为体力不支或起雾迷路，不是坠崖。",
        "每年约 8 万人。12:00–15:00 拍照排队 30–90 分钟，清晨和傍晚几乎不用等。"
      ],
      sources: [
        { title: "Trolltunga 官网 · 徒步信息（距离/用时/季节/排队）", url: "https://www.trolltunga.com/en/plan-your-hike/the-hike-to-trolltunga" },
        { title: "Wikipedia · Trolltunga（海拔/停车/救援）", url: "https://en.wikipedia.org/wiki/Trolltunga" }
      ]
    }
  ]
};
