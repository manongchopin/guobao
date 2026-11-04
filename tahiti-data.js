/* 大溪地 · 五段行程数据
   版本：v0.2（2026-11-04）
   说明：事实性条目尽量给来源；不能确认的写「待核」，不要改成肯定语气。
*/
window.TAHITI = {
  version: "0.2",
  updated: "2026-11-04",

  stats: [
    { n: "5", l: "段行程" },
    { n: "2", l: "世界遗产" },
    { n: "4", l: "岛" },
    { n: "8", l: "待核项" }
  ],

  intro:
    "五段顺序：Tahiti 本岛 → Raiatea → Bora Bora → Hiva Oa（马克萨斯）→ 回 Tahiti。" +
    "法属波利尼西亚不是一个岛，是五个群岛；这次只走社会群岛的两座和马克萨斯的一座，" +
    "中间靠 Air Tahiti 国内航班连接。",

  callout:
    "段落顺序、岛屿组合、住宿选择和两处世界遗产已经定下来，" +
    "但每天几点去哪、航班号、房价、租车行都还没落实。标「待核」的地方我没有编，等下一版逐条查。",

  /* 地图点位 */
  places: [
    { id: "ppt", name: "帕皮提 · Faa'a 机场", zh: "Papeete / PPT", lat: -17.5537, lng: -149.6114, kind: "hub", group: "society", note: "国际航班进出点，五段都从这里起落。" },
    { id: "papeete", name: "帕皮提市区", zh: "Papeete", lat: -17.5350, lng: -149.5696, kind: "town", group: "society", note: "唐人街、关帝庙、帕皮提市场、Robert Wan 珍珠博物馆都在这一带。" },
    { id: "teahupoo", name: "Teahupo'o", zh: "2024 奥运冲浪赛场", lat: -17.8472, lng: -149.2672, kind: "sport", group: "society", note: "本岛东南岸，Taiarapu-Ouest 乡。看浪点，不是下水的点。" },
    { id: "uturoa", name: "Uturoa", zh: "Raiatea 主镇", lat: -16.7294, lng: -151.4436, kind: "town", group: "society", note: "Raiatea 的机场与码头都在附近，环岛自驾从这里出发。" },
    { id: "taputapuatea", name: "Taputapuātea", zh: "世界遗产 1529", lat: -16.8414, lng: -151.3724, kind: "wh", group: "society", note: "Opoa 的 marae 建筑群，东波利尼西亚约千年的宗教中心。" },
    { id: "bob", name: "Bora Bora", zh: "Vaitape / Motu Mute", lat: -16.5064, lng: -151.7494, kind: "resort", group: "society", note: "机场在 Motu Mute，酒店都在 motu 上，落地后要坐船。" },
    { id: "nukuhiva", name: "Nuku Hiva · Taiohae", zh: "马克萨斯行政中心", lat: -8.9100, lng: -140.1000, kind: "town", group: "marquesas", note: "部分帕皮提–Hiva Oa 航班经停这里；本次不安排停留。" },
    { id: "atuona", name: "Atuona", zh: "Hiva Oa 主村", lat: -9.8036, lng: -139.0333, kind: "town", group: "marquesas", note: "高更与 Brel 都葬在村上方的 Calvaire 墓园。" },
    { id: "puamau", name: "Puamau · Me'ae Iipona", zh: "Hiva Oa 东北岸", lat: -9.7833, lng: -138.8333, kind: "wh", group: "marquesas", note: "马克萨斯最重要的遗址之一，Tiki Takai'i 在这里。" }
  ],

  /* 航线（示意，不是航路） */
  routeSociety: ["ppt", "uturoa", "bob", "ppt"],
  routeMarquesas: ["nukuhiva", "atuona"],

  legs: [
    {
      no: "01",
      island: "Tahiti",
      zh: "大溪地本岛",
      days: "约 4–5 天（待定）",
      purpose: "自驾环岛、博物馆、华人史迹、奥运冲浪点",
      transport: "国际航班抵达帕皮提 Faa'a（PPT），机场取车",
      drive: "环岛公路一圈约 110 余公里（待核）；去 Teahupo'o 走东南岸，单程约 1.5 小时（待核）",
      stay: "InterContinental Tahiti Resort & Spa（Faa'a，近机场）",
      points: [
        { t: "博物馆", name: "Musée de Tahiti et des Îles – Te Fare Manaha", note: "Punaauia，本岛西岸。波利尼西亚考古、自然史与艺术，环岛时顺路。" },
        { t: "博物馆", name: "Musée de la Perle Robert Wan", note: "Papeete 市区。黑珍珠专题，第五段买珠之前先来看一次，建立价格感。" },
        { t: "故居", name: "Maison James Norman Hall", note: "Arue，北岸。《叛舰喋血记》作者故居，环岛北段可停。" },
        { t: "高更", name: "原 Musée Paul Gauguin（Papeari 植物园）", note: "长期关闭，正在改建成 Espace Gauguin；开馆时间待核，去之前先打电话。" },
        { t: "华人", name: "唐人街 Quartier Chinois", note: "Papeete 市中心，紧贴帕皮提市场。1865 年起客家契约劳工的后代社区，今天仍是商业街。" },
        { t: "华人", name: "关帝庙 Temple Kanti", note: "Papeete 市区。华人社区仍在使用的庙，节庆时最热闹。" },
        { t: "华人", name: "华人墓园与老商号", note: "待核。华人墓园位置、仍营业的老字号、社团会馆名单，v0.3 前逐条核实后再上图。" },
        { t: "冲浪", name: "Teahupo'o", note: "2024 巴黎奥运冲浪赛场，距巴黎约 15,700 公里，是奥运史上最远的赛场。村里只有一条单车道。" },
        { t: "自驾", name: "环岛路线", note: "Tahiti Nui 一圈 + 南下 Tahiti Iti 到 Teahupo'o。山路多弯，别按国内高速估时间。" }
      ]
    },
    {
      no: "02",
      island: "Raiatea",
      zh: "拉伊阿泰阿",
      days: "2 天（待定）",
      purpose: "世界遗产 Taputapuātea、环岛自驾",
      transport: "Air Tahiti：帕皮提 → Raiatea（RAI），约 45 分钟（待核）",
      drive: "Uturoa 取车，环岛一圈；遗产在岛南 Opoa",
      stay: "待定（Uturoa 一带或 Opoa 附近）",
      points: [
        { t: "世界遗产", name: "Taputapuātea", note: "编号 1529，2017 年列入。Opoa 的 marae 建筑群，见下方专段。" },
        { t: "自驾", name: "环岛一圈", note: "Raiatea 与 Taha'a 共用一个潟湖，环岛公路贴海岸走；具体里程待核。" },
        { t: "加一天", name: "Taha'a", note: "香草岛，可坐船过去。要不要加，看你在 Raiatea 留几天。" }
      ]
    },
    {
      no: "03",
      island: "Bora Bora",
      zh: "波拉波拉",
      days: "5 天（已定）",
      purpose: "度假、潟湖、水上屋",
      transport: "Air Tahiti：帕皮提 → Bora Bora（BOB），约 50 分钟；机场在 Motu Mute，落地后坐船去酒店",
      drive: "本岛可租车或租小电动车；主要时间在潟湖，不必环岛",
      stay: "InterContinental Bora Bora Resort & Thalasso Spa + The St. Regis Bora Bora（InterContinental Le Moana 可作替代）",
      points: [
        { t: "住宿", name: "InterContinental Bora Bora Resort & Thalasso Spa", note: "环礁东侧的 motu 上，面朝 Otemanu，以深海水疗出名。水上屋为主。" },
        { t: "住宿", name: "The St. Regis Bora Bora", note: "潟湖东北侧，度假村区内另有一块填海小岛。房型与水上屋数量最多的一档。" },
        { t: "住宿", name: "InterContinental Le Moana", note: "本岛南端 Matira 角，沙滩边，不是水上屋为主的那种。若想两晚住陆地，用它替换。" },
        { t: "注意", name: "换酒店要坐船", note: "两家都在 motu 上，之间没有陆路。换酒店当天要预留船程与行李搬运时间，具体班次待核。" }
      ]
    },
    {
      no: "04",
      island: "Hiva Oa",
      zh: "希瓦瓦 · 马克萨斯",
      days: "3–4 天（待定）",
      purpose: "世界遗产构成点、高更墓、Brel 墓、租车",
      transport: "Air Tahiti：帕皮提 → Hiva Oa（HIX / Atuona），约 3.5 小时，常经停（待核）",
      drive: "Atuona 取车；Atuona → Puamau 约 45 公里山路，单程约 2.5 小时",
      stay: "待定（Atuona 一带，岛上住宿很少）",
      points: [
        { t: "世界遗产", name: "Te Henua Enata 的 Hiva Oa 构成点", note: "「Ensemble mixte de Hiva Oa–Tahuata」，97,865 公顷，见下方专段。" },
        { t: "遗址", name: "Me'ae Iipona（Puamau）", note: "马克萨斯最重要的遗址之一。Tiki Takai'i 高 2.43 米；另有 Maki'i Taua Pepe 石雕。" },
        { t: "遗址", name: "Ta'aoa 谷", note: "Atuona 西侧，马克萨斯最大的 tohua（仪式广场）所在，多数未发掘。" },
        { t: "遗址", name: "Eiaone 谷岩刻", note: "Puamau 以西，半浮雕岩刻；多数被植被盖住，找向导。" },
        { t: "墓地", name: "Calvaire 墓园", note: "Atuona 上方。高更（1903）与 Jacques Brel（1978）都葬在这里，两个墓相距不远。" },
        { t: "博物馆", name: "Espace Jacques Brel", note: "Atuona。Brel 的 Beechcraft「Jojo」停在专用棚里，另有照片与手稿。" },
        { t: "博物馆", name: "Centre Culturel Paul Gauguin", note: "Atuona。只展复制品，但把他在马克萨斯的最后几年讲清楚了。" }
      ]
    },
    {
      no: "05",
      island: "Tahiti",
      zh: "回本岛 · 黑珍珠",
      days: "1–2 天",
      purpose: "买黑珍珠、退税与打包",
      transport: "Air Tahiti：Hiva Oa → 帕皮提，回程",
      drive: "帕皮提市区步行即可，不建议为买珠子再租车",
      stay: "InterContinental Tahiti Resort & Spa 或机场附近",
      points: [
        { t: "准备", name: "先看博物馆再进店", note: "Robert Wan 珍珠博物馆看完，再去市场二楼和 Vaima 的店，价格感会准很多。" },
        { t: "原则", name: "四项定级", note: "光泽、表面、形状、尺寸；同样预算优先买光泽好的小一号，不要买大而闷的。" }
      ]
    }
  ],

  /* 世界遗产专段 */
  wh: [
    {
      code: "1529",
      name: "Taputapuātea",
      zh: "塔普塔普阿泰",
      island: "Raiatea · Opoa",
      year: "2017",
      type: "文化遗产",
      criteria: "(iii)(iv)(vi)",
      area: "2,124 公顷（缓冲区 3,363 公顷）",
      lede:
        "在 Raiatea 岛南部的 Opoa，是东波利尼西亚约一千年间的宗教中心。" +
        "波利尼西亚的航海者从这里的 marae 出发，把祭仪带到夏威夷、新西兰、复活节岛。",
      facts: [
        "遗产范围含陆地与潟湖，不只是一座石台。",
        "核心是 marae Taputapuātea 建筑群；周边山谷与海岸同属保护范围。",
        "marae 是圣地，不要攀爬或踩踏石结构；进入前看现场标识。"
      ],
      components: [],
      todo: "单体 marae 的完整清单与边界图，以 UNESCO 档案与现场标识为准，v0.3 补。"
    },
    {
      code: "1707",
      name: "Te Henua Enata – Les îles Marquises",
      zh: "马克萨斯群岛",
      island: "马克萨斯 · 7 个构成点",
      year: "2024",
      type: "混合遗产（文化 + 自然）",
      criteria: "(iii)(vi)(vii)(ix)(x)",
      area: "345,749 公顷（缓冲区 6,841 公顷）",
      lede:
        "2024 年 7 月 26 日列入，是法国最新的世界遗产，也是少见的混合遗产。" +
        "七个构成点分散在六个岛，本次只到 Hiva Oa 那一个。",
      facts: [
        "Hiva Oa 对应构成点只有一个：「Ensemble mixte de Hiva Oa–Tahuata」，97,865 公顷，跨 Hiva Oa 与 Tahuata 两岛。",
        "该构成点中心坐标约 9°49′58.59″S 139°0′56.64″W。",
        "岛上的文化点位：Me'ae Iipona（Puamau）、Ta'aoa 谷、Eiaone 岩刻 —— 是否都落在申报边界内，待核。",
        "编号是 1707；网上流传的 1632 是别的项目，别混。"
      ],
      components: [
        { name: "Eiao–Hatutu", area: 46356 },
        { name: "Nuku Hiva", area: 76227 },
        { name: "Ua Pou", area: 40929 },
        { name: "Ua Huka", area: 34516 },
        { name: "Hiva Oa–Tahuata", area: 97865, here: true },
        { name: "Fatu Uku", area: 12225 },
        { name: "Fatu Iva", area: 37631 }
      ],
      todo: "Puamau、Ta'aoa、Eiaone 三处是否全部落在申报边界内，待核；不要把「在岛上」直接写成「在遗产范围内」。"
    }
  ],

  /* 岛内日程草案 */
  days: [
    {
      id: "bora",
      title: "Bora Bora · 五天怎么分",
      note: "两家酒店 2+3 或 3+2。先住潟湖外侧的 Thalasso，再换到 St. Regis；换酒店当天不安排下水。",
      rows: [
        { d: "D1", t: "落地 + 入住", b: "BOB 落地，坐船去 Thalasso。下午潟湖边走一圈，傍晚在栈桥看 Otemanu。", tag: "轻" },
        { d: "D2", t: "潟湖一日", b: "魔鬼鱼点、珊瑚花园、鲨鱼点；包船或跟酒店出海。防晒衣比防晒霜有用。", tag: "海" },
        { d: "D3", t: "换酒店 + 本岛", b: "上午退房转 St. Regis；下午租车或电动车上本岛：Matira 海滩、Faanui 湾的 Marae Fare Opu。", tag: "转" },
        { d: "D4", t: "深潜或徒步", b: "要么一次外礁深潜，要么跟向导走 Pahia 山脊。Otemanu 一般不作攀登路线。", tag: "选一" },
        { d: "D5", t: "上午留白 + 返程", b: "上午只安排水上屋和潟湖，下午飞回帕皮提。行李提前一晚收。", tag: "返" }
      ]
    },
    {
      id: "hiva",
      title: "Hiva Oa · 三天骨架",
      note: "岛上车少、路弯、雨说来就来。三天是下限；想把 Puamau 和 Ta'aoa 都走透，给四天。",
      rows: [
        { d: "D1", t: "Atuona 半天", b: "落地取车。Calvaire 墓园看高更与 Brel，下山看 Espace Brel 与 Gauguin 文化中心。", tag: "近" },
        { d: "D2", t: "Puamau 一日", b: "早出发走山路去 Puamau，Me'ae Iipona 看 Tiki Takai'i；回程若时间够，拐 Eiaone 看岩刻。", tag: "远" },
        { d: "D3", t: "Ta'aoa + 返程", b: "上午 Ta'aoa 谷的 tohua；下午还车、飞回帕皮提。", tag: "返" }
      ]
    }
  ],

  /* 黑珍珠 */
  pearl: {
    lede:
      "大溪地黑珍珠不是「黑色珍珠」，是黑唇贝 Pinctada margaritifera 养出来的，" +
      "颜色从银灰、孔雀绿到茄紫都有。真正决定价格的是光泽和珠层，不是颜色深浅。",
    points: [
      { t: "在哪买", b: "帕皮提市场（Mapuru a Paraita）二楼、Vaima 购物中心、Robert Wan 等品牌店。市场便宜但等级混杂，品牌店贵但可追溯。" },
      { t: "先看四项", b: "光泽（最重要）、表面瑕疵、形状（正圆最贵）、尺寸（毫米）。同样预算，优先高光泽的小一号。" },
      { t: "证书与发票", b: "要求写明「perle de Tahiti」、尺寸、形状、等级；发票留好，离境与保修都要用。" },
      { t: "别在酒店大堂买", b: "度假村柜台加价最高。真要买，回帕皮提再买。" },
      { t: "配对", b: "耳环要配对，一对的价格不是单颗乘二；配对好的会明显更贵，先问清楚是不是同一批。" },
      { t: "价格", b: "本页不写价格区间 —— 差价太大，写了就是误导。到店按当日报价比三家。" }
    ]
  },

  todos: [
    "中国驾照在法属波利尼西亚能否直接租车、是否需要国际驾照 —— 待核",
    "Tahiti 环岛里程与各段实际车程 —— 待核",
    "Espace Gauguin（Papeari）开馆时间与是否已开放 —— 待核",
    "华人相关建筑完整清单：华人墓园、老商号、社团会馆 —— 待核",
    "Air Tahiti 各班次时刻、行李限重、跳岛联程规则 —— 待核",
    "Bora Bora 两家酒店之间以及机场的船只接驳班次 —— 待核",
    "帕皮提 → Hiva Oa 航班是否经停、经停哪座岛 —— 待核",
    "黑珍珠店铺的具体退换与证书政策 —— 待核"
  ],

  sources: [
    { label: "UNESCO 1529 · Taputapuātea", url: "https://whc.unesco.org/en/list/1529/" },
    { label: "UNESCO 1707 · Te Henua Enata – Les îles Marquises", url: "https://whc.unesco.org/en/list/1707/" },
    { label: "Tahiti Tourisme · 官方旅游机构", url: "https://www.tahititourisme.com/" },
    { label: "Air Tahiti · 国内航班", url: "https://www.airtahiti.com/" },
    { label: "维基百科 · Taputapuatea", url: "https://en.wikipedia.org/wiki/Taputapuatea" },
    { label: "维基百科 · Hiva Oa", url: "https://en.wikipedia.org/wiki/Hiva_Oa" },
    { label: "维基百科 · Bora Bora", url: "https://en.wikipedia.org/wiki/Bora_Bora" },
    { label: "维基百科 · Teahupoʻo", url: "https://en.wikipedia.org/wiki/Teahupo%CA%BBo" },
    { label: "维基百科（法）· Îles Marquises", url: "https://fr.wikipedia.org/wiki/%C3%8Eles_Marquises" },
    { label: "Tahiti Heritage · 波利尼西亚遗产百科", url: "https://www.tahitiheritage.pf/" }
  ]
};
