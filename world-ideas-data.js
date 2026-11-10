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
    },
    {
      id: "usa-west",
      scope: "world",
      title: "美国西部",
      subtitle: "USA · WESTERN LOOP",
      country: "美国",
      countryEn: "United States",
      continent: "北美洲",
      summary: "洛杉矶落地，66 号公路进亚利桑那，大峡谷、纪念碑谷，北上百万美元公路，最后到黄石。五个州（路上会穿过犹他），一条走完至少三周。",
      page: "ideas-usa-west.html",
      layout: "grid",
      regions: [
        { id: "ca", title: "加州", subtitle: "CALIFORNIA · 海岸、沙漠与边境" },
        { id: "nv", title: "内华达", subtitle: "NEVADA · 拉斯维加斯与胡佛水坝" },
        { id: "az", title: "亚利桑那 / 犹他", subtitle: "ARIZONA · 66 号公路、大峡谷、纪念碑谷" },
        { id: "co", title: "科罗拉多", subtitle: "COLORADO · 百万美元公路" },
        { id: "wy", title: "怀俄明", subtitle: "WYOMING · 黄石" }
      ],
      added: "2026-11-04",
      status: "seed"
    },
    {
      id: "austria",
      scope: "world",
      title: "奥地利",
      subtitle: "ÖSTERREICH · 目前只有萨尔茨堡",
      country: "奥地利",
      countryEn: "Österreich",
      continent: "欧洲",
      summary: "莫扎特的两处故居、一条能通到德国的盐矿坑道，还有下雪后安静下来的老城。目前只记了萨尔茨堡一个城市。",
      page: "ideas-austria.html",
      layout: "grid",
      regions: [
        { id: "salzburg", title: "萨尔茨堡", subtitle: "莫扎特与盐 · 一条坑道通到德国" }
      ],
      added: "2026-11-10",
      status: "checked"
    },
    {
      id: "yunnan",
      scope: "cn",
      title: "云南",
      subtitle: "YUNNAN · 目前只有大理",
      country: "中国",
      province: "云南",
      summary: "朋友给的一条洱海环湖路线：住大理古城，从古城出发顺时针绕一圈，18 个点，一天走完。",
      page: "ideas-yunnan.html",
      layout: "route",
      regions: [
        { id: "dali", title: "大理", subtitle: "DALI · 洱海环湖" }
      ],
      added: "2026-11-10",
      status: "seed"
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
    },

    /* ---------- 美国西部 · 加州 ---------- */
    {
      id: "us-ca-santa-monica", destinationId: "usa-west", regionId: "ca",
      scope: "world", country: "美国", province: "加州", city: "洛杉矶 · 圣莫尼卡",
      place: "Santa Monica, CA", title: "圣莫尼卡海滩 · 66 号公路终点", titleEn: "Santa Monica Pier",
      type: "其他", why: "66 号公路的西端终点，从东往西开到这里算收尾。",
      status: "seed", added: "2026-11-04", priority: 1
    },
    {
      id: "us-ca-hollywood-walk", destinationId: "usa-west", regionId: "ca",
      scope: "world", country: "美国", province: "加州", city: "洛杉矶 · 好莱坞",
      place: "Hollywood, Los Angeles", title: "好莱坞星光大道", titleEn: "Hollywood Walk of Fame",
      type: "其他", why: "落地洛杉矶第一晚顺路走一遍，不长留。",
      status: "seed", added: "2026-11-04", priority: 2
    },
    {
      id: "us-ca-hollywood-sign", destinationId: "usa-west", regionId: "ca",
      scope: "world", country: "美国", province: "加州", city: "洛杉矶 · 好莱坞山",
      place: "Hollywood Hills", title: "好莱坞山 · 标志牌", titleEn: "Hollywood Sign",
      type: "其他", why: "想找个能拍到标志牌全景的观景点，不一定非要爬山。",
      status: "seed", added: "2026-11-04", priority: 3
    },
    {
      id: "us-ca-griffith", destinationId: "usa-west", regionId: "ca",
      scope: "world", country: "美国", province: "加州", city: "洛杉矶 · 格里菲斯公园",
      place: "Griffith Park", title: "格里菲斯天文台", titleEn: "Griffith Observatory",
      type: "博物馆", why: "免费开放，能看洛杉矶天际线，也能顺带看展。",
      status: "seed", added: "2026-11-04", priority: 4
    },
    {
      id: "us-ca-highway-1", destinationId: "usa-west", regionId: "ca",
      scope: "world", country: "美国", province: "加州", city: "大苏尔 · 1 号公路",
      place: "Big Sur, CA", title: "加州 1 号公路", titleEn: "Highway 1 / Big Sur",
      type: "自驾", why: "海岸线那一段，想慢慢开，不想赶。",
      status: "seed", added: "2026-11-04", priority: 5
    },
    {
      id: "us-ca-midway", destinationId: "usa-west", regionId: "ca",
      scope: "world", country: "美国", province: "加州", city: "圣地亚哥 · 港区",
      place: "San Diego Bay", title: "中途岛号航空母舰博物馆", titleEn: "USS Midway Museum",
      type: "博物馆", why: "停在港边的航母，上去看甲板和机库。",
      status: "seed", added: "2026-11-04", priority: 6
    },
    {
      id: "us-ca-border-field", destinationId: "usa-west", regionId: "ca",
      scope: "world", country: "美国", province: "加州", city: "圣地亚哥 · 边境",
      place: "Border Field State Park", title: "边境线公园（美墨边境）", titleEn: "Border Field State Park",
      type: "其他", why: "美国本土最西南角，铁丝网那边就是墨西哥。",
      status: "seed", added: "2026-11-04", priority: 7
    },
    {
      id: "us-ca-mojave", destinationId: "usa-west", regionId: "ca",
      scope: "world", country: "美国", province: "加州", city: "莫哈维",
      place: "Mojave National Preserve", title: "莫哈维国家保护区", titleEn: "Mojave National Preserve",
      type: "国家公园", why: "洛杉矶到 66 号公路之间的大片荒漠，顺路穿过去。",
      status: "seed", added: "2026-11-04", priority: 8
    },
    {
      id: "us-ca-salvation-mountain", destinationId: "usa-west", regionId: "ca",
      scope: "world", country: "美国", province: "加州", city: "尼兰",
      place: "Niland, CA", title: "救赎山（彩虹山）", titleEn: "Salvation Mountain",
      type: "其他", why: "一个人用颜料堆出来的山，照片很扎眼。",
      status: "seed", added: "2026-11-04", priority: 9
    },
    {
      id: "us-ca-slab-city", destinationId: "usa-west", regionId: "ca",
      scope: "world", country: "美国", province: "加州", city: "尼兰",
      place: "Niland, CA", title: "Slab City", titleEn: "Slab City",
      type: "其他", why: "废弃军营变成的聚居地，和救赎山挨着，可以一起看。",
      status: "seed", added: "2026-11-04", priority: 10
    },

    /* ---------- 内华达 ---------- */
    {
      id: "us-nv-las-vegas", destinationId: "usa-west", regionId: "nv",
      scope: "world", country: "美国", province: "内华达", city: "拉斯维加斯",
      place: "Las Vegas, NV", title: "拉斯维加斯", titleEn: "Las Vegas",
      type: "其他", why: "路线中间歇脚，也是补给点。",
      status: "seed", added: "2026-11-04", priority: 11
    },
    {
      id: "us-nv-hoover-dam", destinationId: "usa-west", regionId: "nv",
      scope: "world", country: "美国", province: "内华达", city: "胡佛水坝",
      place: "Hoover Dam, NV/AZ", title: "胡佛水坝", titleEn: "Hoover Dam",
      type: "其他", why: "拉斯维加斯往东南半小时，顺路看一眼。",
      note: "1936 年建成，坝顶就是内华达与亚利桑那的州界。",
      status: "seed", added: "2026-11-04", priority: 12
    },

    /* ---------- 亚利桑那 / 犹他 ---------- */
    {
      id: "us-az-route66", destinationId: "usa-west", regionId: "az",
      scope: "world", country: "美国", province: "亚利桑那", city: "金曼 → 塞利格曼",
      place: "Kingman–Seligman, AZ", title: "66 号公路（金曼—塞利格曼段）", titleEn: "Route 66",
      type: "自驾", why: "想开一段还在的老 66，而不是只在博物馆里看。",
      note: "66 号公路 1926 年通车、1985 年撤销国道编号；金曼到塞利格曼这段常被当作自驾段。",
      status: "checked", added: "2026-11-04", priority: 13
    },
    {
      id: "us-az-kingman", destinationId: "usa-west", regionId: "az",
      scope: "world", country: "美国", province: "亚利桑那", city: "金曼",
      place: "Kingman, AZ", title: "金曼 66 号公路博物馆", titleEn: "Route 66 Museum, Kingman",
      type: "博物馆", why: "开 66 之前先看一遍背景，半小时到一小时。",
      status: "seed", added: "2026-11-04", priority: 14
    },
    {
      id: "us-az-grand-canyon-south", destinationId: "usa-west", regionId: "az",
      scope: "world", country: "美国", province: "亚利桑那", city: "大峡谷 · 南缘",
      place: "Grand Canyon South Rim, AZ", title: "大峡谷南缘", titleEn: "Grand Canyon South Rim",
      type: "世界遗产", why: "整条线最主要的一站，南缘全年开放、设施最全。",
      note: "大峡谷 1979 年列入世界遗产；南缘海拔约 2,100 m，比谷底凉得多。",
      status: "checked", added: "2026-11-04", priority: 15
    },
    {
      id: "us-az-yavapai", destinationId: "usa-west", regionId: "az",
      scope: "world", country: "美国", province: "亚利桑那", city: "大峡谷 · 南缘",
      place: "Yavapai Point, AZ", title: "亚瓦帕伊观景点", titleEn: "Yavapai Point",
      type: "其他", why: "南缘看峡谷最开阔的几个点之一，旁边有地质博物馆。",
      status: "seed", added: "2026-11-04", priority: 16
    },
    {
      id: "us-az-helicopter", destinationId: "usa-west", regionId: "az",
      scope: "world", country: "美国", province: "亚利桑那", city: "大峡谷 · 图萨扬",
      place: "Tusayan, AZ", title: "大峡谷直升机", titleEn: "Grand Canyon Helicopter",
      type: "其他", why: "从空中看一次峡谷，起飞点在图萨扬一带。",
      note: "运营商和价格待核；旺季要提前订。",
      status: "seed", added: "2026-11-04", priority: 17
    },
    {
      id: "us-az-monument-valley", destinationId: "usa-west", regionId: "az",
      scope: "world", country: "美国", province: "亚利桑那", city: "纪念碑谷",
      place: "Monument Valley, AZ/UT", title: "纪念碑谷", titleEn: "Monument Valley",
      type: "其他", why: "纳瓦霍保留地里的红岩台地，有一条园内自驾环线。",
      note: "属纳瓦霍部落公园，不是国家公园；America the Beautiful 年票在这里不通用。门票待核。",
      status: "checked", added: "2026-11-04", priority: 18
    },
    {
      id: "us-az-forrest-gump", destinationId: "usa-west", regionId: "az",
      scope: "world", country: "美国", province: "亚利桑那", city: "US-163 · 13 英里处",
      place: "US-163, Monument Valley", title: "阿甘点", titleEn: "Forrest Gump Point",
      type: "其他", why: "《阿甘正传》跑步那段的取景位置，路边就能停。",
      status: "seed", added: "2026-11-04", priority: 19
    },
    {
      id: "us-az-algodones", destinationId: "usa-west", regionId: "az",
      scope: "world", country: "美国", province: "亚利桑那", city: "尤马 · 边境",
      place: "Los Algodones, Baja California", title: "阿尔戈多内斯", titleEn: "Los Algodones",
      type: "其他", why: "从 Andrade 口岸过境的小镇，可以当天往返。",
      note: "要带护照；回程排队时间待核。",
      status: "seed", added: "2026-11-04", priority: 20
    },

    /* ---------- 科罗拉多 ---------- */
    {
      id: "us-co-million-dollar", destinationId: "usa-west", regionId: "co",
      scope: "world", country: "美国", province: "科罗拉多", city: "奥雷 → 西尔弗顿",
      place: "US-550, Ouray–Silverton", title: "百万美元公路", titleEn: "Million Dollar Highway",
      type: "自驾", why: "US-550 最险的一段，山崖一侧基本没有护栏。",
      note: "奥雷到西尔弗顿约 40 km，弯多坡陡，冬天会封路。",
      status: "checked", added: "2026-11-04", priority: 21
    },

    /* ---------- 怀俄明 ---------- */
    {
      id: "us-wy-yellowstone", destinationId: "usa-west", regionId: "wy",
      scope: "world", country: "美国", province: "怀俄明", city: "黄石",
      place: "Yellowstone, WY", title: "黄石国家公园", titleEn: "Yellowstone National Park",
      type: "世界遗产", why: "整条线的北端，园区大到要住两三晚才走得完。",
      note: "1872 年设立，是世界第一个国家公园；1978 年列入世界遗产。",
      status: "checked", added: "2026-11-04", priority: 22
    },
    {
      id: "us-wy-mammoth", destinationId: "usa-west", regionId: "wy",
      scope: "world", country: "美国", province: "怀俄明", city: "黄石 · 猛犸",
      place: "Mammoth Hot Springs, WY", title: "猛犸温泉", titleEn: "Mammoth Hot Springs",
      type: "其他", why: "层层叠叠的钙华台地，从北门进园最先遇到。",
      status: "seed", added: "2026-11-04", priority: 23
    },

    /* ---------- 奥地利 · 萨尔茨堡 ---------- */
    {
      id: "at-mozart-birthplace", destinationId: "austria", regionId: "salzburg",
      scope: "world", country: "奥地利", province: "萨尔茨堡", city: "老城 · Getreidegasse",
      place: "Getreidegasse 9, Salzburg", title: "莫扎特出生地", titleEn: "Mozarts Geburtshaus",
      type: "博物馆", why: "莫扎特就生在这栋楼里，就在老城步行街上，顺路就能进。",
      note: "2026 年每天 9:00–17:30（7–8 月 8:30–19:00），关门前 30 分钟停止入场；和故居的联票当地价 €23（5–6 月）/ €25（7–12 月）。",
      sourceType: "friend", sourceTitle: "朋友的一段话",
      status: "checked", added: "2026-11-10", priority: 1,
      sources: [
        { title: "Mozarteum · Mozarts Geburtshaus", url: "https://mozarteum.at/en/mozart-museums/mozarts-birthplace" },
        { title: "ÖBB Plus · Mozart Museums（2026 开放时间与联票）", url: "https://www.oebb.at/en/tickets-kundenkarten/freizeit-urlaub/oebb-plus/salzburg/mozart-museen.html" }
      ]
    },
    {
      id: "at-mozart-residence", destinationId: "austria", regionId: "salzburg",
      scope: "world", country: "奥地利", province: "萨尔茨堡", city: "Makartplatz",
      place: "Makartplatz 8, Salzburg", title: "莫扎特故居", titleEn: "Mozart-Wohnhaus",
      type: "博物馆", why: "和出生地一张联票，过河就到；院子里还有那座「魔笛小屋」。",
      note: "和出生地同一张联票；个别日期会提前闭馆，行前查一眼官网。",
      sourceType: "friend", sourceTitle: "朋友的一段话",
      status: "checked", added: "2026-11-10", priority: 2,
      sources: [
        { title: "ÖBB Plus · Mozart Museums（两馆联票）", url: "https://www.oebb.at/en/tickets-kundenkarten/freizeit-urlaub/oebb-plus/salzburg/mozart-museen.html" }
      ]
    },
    {
      id: "at-salzburg-salt-mine", destinationId: "austria", regionId: "salzburg",
      scope: "world", country: "奥地利", province: "萨尔茨堡", city: "巴德迪恩贝格 · 哈莱因",
      place: "Ramsaustrasse 3, Bad Dürrnberg", title: "萨尔茨堡盐矿", titleEn: "Salzwelten Salzburg",
      type: "其他", why: "坑道在地下越过奥地利边界，一直伸进德国巴伐利亚——这点你记对了，是盐矿不是煤矿。",
      note: "萨尔茨堡以南约 18 km，坐缆车上山；游览约 90 分钟，含 400 m 矿车、两段 42 m 木滑梯、地下盐湖坐船。矿道跨国境这事有据：两国 1829 年为此签过使用协议。开放时间与票价待核。",
      sourceType: "friend", sourceTitle: "朋友的一段话",
      status: "checked", added: "2026-11-10", priority: 3,
      sources: [
        { title: "ERIH · Salzbergwerk Hallein（跨国境、1829 年协议、坑道设施）", url: "https://www.erih.de/da-will-ich-hin/site/salzbergwerk-hallein" }
      ]
    },
    {
      id: "at-salzburg-snow-night", destinationId: "austria", regionId: "salzburg",
      scope: "world", country: "奥地利", province: "萨尔茨堡", city: "老城",
      place: "Altstadt, Salzburg", title: "老城雪夜", titleEn: "Altstadt im Schnee",
      type: "其他", why: "朋友说下大雪之后街上完全安静，暗黄路灯下，不浪漫的人也会想恋爱。",
      note: "12–2 月下雪的晚上，老城 Getreidegasse、Residenzplatz 一带。这不是单一景点，只做街区级记录，不给精确坐标。",
      sourceType: "friend", sourceTitle: "朋友的一段话",
      status: "seed", added: "2026-11-10", priority: 4
    },
    {
      id: "at-mozartkugel-workshop", destinationId: "austria", regionId: "salzburg",
      scope: "world", country: "奥地利", province: "萨尔茨堡", city: "",
      place: "Salzburg", title: "莫扎特巧克力工作坊", titleEn: "Mozartkugel-Workshop",
      type: "美食", why: "白天可以去做莫扎特球，朋友说做成了还能领一张证书。",
      note: "确实有这类手工课，但「发证书」这点没查到官方说明，看到的都是第三方售卖页。店家、价格、是否要预约、证书，全部待核。",
      sourceType: "friend", sourceTitle: "朋友的一段话",
      status: "seed", added: "2026-11-10", priority: 5
    },

    /* ---------- 云南 · 大理 ---------- */
    {
      id: "yn-erhai-loop", destinationId: "yunnan", regionId: "dali",
      scope: "cn", country: "中国", province: "云南", city: "大理",
      place: "洱海环湖", title: "洱海环湖 · 顺时针", titleEn: "Erhai Loop",
      type: "自驾", why: "朋友给的一条现成路线：住大理古城，从古城出发顺时针绕一圈，顺序不用自己排。",
      note: "一圈约 130 km（待核）。18 个点分四段；「环海路」「滨海大道」是路段，并进段落说明，不单独编号。原文建议住古城、以古城为起点；一天走完要早出发。",
      sourceType: "friend", sourceTitle: "朋友的一段话",
      status: "seed", added: "2026-11-10", priority: 1,
      km: 130,
      route: {
        direction: "顺时针",
        base: "大理古城",
        distanceKm: 130,
        days: 1,
        segments: [
          {
            id: "west", title: "第 1 段 · 西岸", note: "古城出发，沿西岸一路向北",
            stops: [
              { name: "大理古城", kind: "起点 · 住宿", note: "原文建议住这里", lat: 25.698269, lon: 100.162485 },
              { name: "才村", kind: "湖滨", lat: 25.7225534, lon: 100.1901087 },
              { name: "喜洲古镇", kind: "古镇", lat: 25.853639, lon: 100.1304383 },
              { name: "海舌公园", kind: "湿地", note: "原文写作「海舍公园」，已校正", lat: 25.8752792, lon: 100.1558144 },
              { name: "周城", kind: "村寨 · 扎染", lat: 25.8890137, lon: 100.119332 },
              { name: "蝴蝶泉", kind: "景点", lat: 25.9093345, lon: 100.0946438 },
              { name: "桃源码头", kind: "码头", note: "原文写作「桃园码头」，已校正", lat: 25.909002, lon: 100.1179531 },
              { name: "上关镇", kind: "镇", lat: 25.9600564, lon: 100.1267283 }
            ]
          },
          {
            id: "north", title: "第 2 段 · 北岸", note: "过江尾，走环海路到双廊",
            stops: [
              { name: "江尾", kind: "村", lat: 25.9631748, lon: 100.1215778 },
              { name: "双廊", kind: "古镇", lat: 25.9150353, lon: 100.192751 },
              { name: "南诏风情岛", kind: "岛", lat: 25.9050894, lon: 100.1897719 }
            ]
          },
          {
            id: "east", title: "第 3 段 · 东岸", note: "沿东岸南下，经挖色到海东",
            stops: [
              { name: "挖色", kind: "镇", lat: 25.8309, lon: 100.223 },
              { name: "小普陀", kind: "岛", lat: 25.8106403, lon: 100.2219074 },
              { name: "海东", kind: "镇", lat: 25.7170874, lon: 100.2545425 },
              { name: "天镜阁", kind: "景点", lat: 25.7085168, lon: 100.2363 },
              { name: "银梭岛", kind: "岛", note: "位置待核", lat: 25.6859878, lon: 100.2694329 }
            ]
          },
          {
            id: "south", title: "第 4 段 · 南岸", note: "走滨海大道，回到古城",
            stops: [
              { name: "海心亭", kind: "湖滨", note: "OSM 上同名点在西岸 25.864，与路线顺序不符；位置待核，未画在图上" },
              { name: "洱海月湿地公园", kind: "湿地", lat: 25.6134553, lon: 100.2302437 }
            ]
          }
        ]
      }
    }
  ],

  /* 企划：不是目的地，是一份长期准备清单 */
  projects: [
    {
      id: "world-drive",
      title: "自驾环游世界",
      subtitle: "ROUND THE WORLD BY CAR",
      summary: "手续、本事、家伙、路、场、仪式。34 条准备事项，还没有日期——先当清单，不当行程。",
      page: "ideas-world-drive.html",
      added: "2026-11-10",
      status: "seed",
      note: "路这一组只列必开的路段，没有排全球环线；等有出发年份再排。",
      groups: [
        {
          id: "docs", title: "手续", lead: "门槛，办不下来就走不成。",
          items: [
            { text: "济州岛考驾照 + IDP", note: "原文：4–5 天考完，有效期 10 年。政策会变，待核。" },
            { text: "签证：十年美签、十年加签、五年申根、巴西、澳大利亚、新西兰", note: "逐国核有效期和申请地限制，待核。" },
            { text: "Carnet de Passage（车辆出境单证册）", note: "补的一条：车要「护照」，很多国家入境要看；押金/保费按车值算。", tag: "补" },
            { text: "车辆保险与救援（跨洲）", note: "补的一条：洲际拖车、第三方责任险；iOverlander 上有各国的经验帖。", tag: "补" }
          ]
        },
        {
          id: "skills", title: "本事", lead: "能自己搞定一半，路就长一倍。",
          items: [
            { text: "换轮胎", tag: "必须" },
            { text: "基本汽修", tag: "必须" },
            { text: "游泳", tag: "必须" },
            { text: "汽车机械知识" },
            { text: "潜水：OW / AOW / 自由潜" },
            { text: "摄影" },
            { text: "剪辑" },
            { text: "研究 BGM 配乐" },
            { text: "西班牙语 + 法语" },
            { text: "简单俄语 + 德语" },
            { text: "拍星轨" }
          ]
        },
        {
          id: "gear", title: "家伙", lead: "车、拍摄、钓鱼、安全。",
          items: [
            { text: "汽油添加剂 + 备用油桶", note: "为乌兹别克斯坦那种补给稀的路段准备。" },
            { text: "辛烷值增强剂" },
            { text: "反光背心", note: "车上必备，欧洲多国强制。" },
            { text: "钓鱼工具", note: "在美国钓鱼要先查各州执照。" },
            { text: "无人机" },
            { text: "GoPro 或 DJI Action" }
          ]
        },
        {
          id: "roads", title: "路", lead: "只列必开的路段，不排全球环线。",
          items: [
            { text: "乌兹别克斯坦", note: "缺油、补给稀，和油桶/添加剂是一套。" },
            { text: "加拿大方向进北冰洋" },
            { text: "阿拉斯加 · 道顿公路", note: "Dalton Highway；多数租车公司禁行，季节也要挑。" },
            { text: "美国大陆最南端 · Key West", note: "迈阿密往南，一路到 1 号公路零英里。" },
            { text: "泛美公路", note: "阿拉斯加 → 巴塔哥尼亚；站里已有单独的计划页。", href: "panamerican.html" }
          ]
        },
        {
          id: "venues", title: "场", lead: "值得专程去看一场比赛、下一次水。",
          items: [
            { text: "NBA" },
            { text: "足球：巴萨、皇马、拜仁（安联）、曼联（老特拉福德）、切尔西（斯坦福桥）" },
            { text: "伯利兹蓝洞", note: "潜水；资质要求和船宿安排待核。" }
          ]
        },
        {
          id: "rituals", title: "仪式", lead: "路上的小规矩，让这趟车有点自己的样子。",
          items: [
            { text: "啤酒瓶盖：开瓶时垫一枚硬币，盖就不翘；用厚一点的磁铁吸住收纳。" },
            { text: "每个国家配一首 BGM + 一位文学家的一句诗" },
            { text: "每个国家的国旗贴纸" }
          ]
        },
        {
          id: "tools", title: "工具", lead: "查路、算单位、找补给。",
          items: [
            { text: "英里–公里换算表" },
            { text: "iOverlander", note: "营地、边境、修车点的众包地图。", href: "https://ioverlander.com" }
          ]
        }
      ]
    }
  ]
};
