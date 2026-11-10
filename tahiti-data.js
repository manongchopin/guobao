/* 大溪地 · 五段行程数据
   版本：v0.3（2026-11-10）
   说明：
   1. 事实性条目尽量给来源；不能确认的写「待核」，不要改成肯定语气。
   2. 带 src 字段的条目，来自微博用户「黛西杨」2025-11/12 的法属波利尼西亚记录；
      该记录为二手转述，本页只改写事实并署名，不转载原文。
*/
window.TAHITI = {
  version: "0.3",
  updated: "2026-11-10",

  stats: [
    { n: "5", l: "段行程" },
    { n: "2", l: "世界遗产" },
    { n: "4", l: "岛" },
    { n: "11", l: "待核项" }
  ],

  intro:
    "五段顺序：Tahiti 本岛 → Raiatea → Bora Bora → Hiva Oa（马克萨斯）→ 回 Tahiti。" +
    "法属波利尼西亚不是一个岛，是五个群岛；这次只走社会群岛的两座和马克萨斯的一座，" +
    "中间靠 Air Tahiti 国内航班连接。",

  callout:
    "段落顺序、岛屿组合、住宿选择和两处世界遗产已经定下来，" +
    "但每天几点去哪、航班号、房价、租车行都还没落实。标「待核」的地方我没有编，等下一版逐条查。",

  ref:
    "v0.3 起补进一份外部现场参考：微博用户「黛西杨」2025-11-15 至 12-12 在法属波利尼西亚的 28 天记录，" +
    "她是坐 Aranui 客货船走的，走法和我们完全不同。所以只用它补「到了看什么」，不用它排交通——" +
    "她没上 Raiatea，也没去 Puamau 和 Ta'aoa。凡是从这份记录来的条目，后面都标了出处；原文版权属原作者，本页只改写事实。",

  /* 地图点位 */
  places: [
    { id: "ppt", name: "帕皮提 · Faa'a 机场", zh: "Papeete / PPT", lat: -17.5537, lng: -149.6114, kind: "hub", group: "society", note: "国际航班进出点，五段都从这里起落。" },
    { id: "papeete", name: "帕皮提市区", zh: "Papeete", lat: -17.5350, lng: -149.5696, kind: "town", group: "society", note: "唐人街、关帝庙、帕皮提市场、Robert Wan 珍珠博物馆都在这一带。" },
    { id: "venus", name: "Point Vénus", zh: "库克 1769 金星凌日点", lat: -17.4956, lng: -149.4894, kind: "hist", group: "society", note: "Matavai 湾北端。库克 1769 年在此观测金星凌日；后来 Bounty 与 Beagle 也停过这一带。" },
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
      purpose: "自驾环岛、博物馆、华人史迹、库克登陆点、奥运冲浪点",
      transport: "国际航班抵达帕皮提 Faa'a（PPT），机场取车",
      drive: "环岛公路一圈约 110 余公里（待核）；去 Teahupo'o 走东南岸，单程约 1.5 小时（待核）。注意：当地租的「自动挡」可能是半自动，不用踩离合但仍要手动换挡",
      stay: "InterContinental Tahiti Resort & Spa（Faa'a，近机场）",
      caveat: "",
      points: [
        {
          t: "博物馆",
          name: "Musée de Tahiti et des Îles – Te Fare Manaha",
          note: "Punaauia，本岛西岸。除了波利尼西亚考古与自然史，馆里有几件值得专门找：库克第二次远征副舰 Adventure 号丢失的锚、当地人用火山石做的锚、Ma'i 被带去伦敦时随身带的酋长凳，以及从大英博物馆借回展出的 tiki 与 tapa 衣物。展品会轮换，出发前查当期。"
        },
        {
          t: "历史",
          name: "Point Vénus / Matavai 湾",
          note: "本岛北岸。1769 年库克在此观测金星凌日，是那次远征的主要科学目标之一；此后 Matavai 湾还停过 HMS Bounty 与 HMS Beagle。环岛北线顺路，适合和博物馆放在同一天。",
          src: "现场记录 2025-11"
        },
        {
          t: "博物馆",
          name: "Musée de la Perle Robert Wan",
          note: "Papeete 市区。黑珍珠专题，第五段买珠之前先来看一次，建立价格感。"
        },
        {
          t: "故居",
          name: "Maison James Norman Hall",
          note: "Arue，北岸。《叛舰喋血记》作者故居，环岛北段可停。"
        },
        {
          t: "高更",
          name: "原 Musée Paul Gauguin（Papeari 植物园）",
          note: "长期关闭，正在改建成 Espace Gauguin；开馆时间待核，去之前先打电话。"
        },
        {
          t: "华人",
          name: "唐人街 Quartier Chinois",
          note: "Papeete 市中心，紧贴帕皮提市场。1865 年起客家契约劳工的后代社区，今天仍是商业街。"
        },
        {
          t: "华人",
          name: "关帝庙 Temple Kanti",
          note: "Papeete 市区。华人社区仍在使用的庙，节庆时最热闹。"
        },
        {
          t: "华人",
          name: "华人墓园与老商号",
          note: "待核。华人墓园位置、仍营业的老字号、社团会馆名单，逐条核实后再上图。"
        },
        {
          t: "冲浪",
          name: "Teahupo'o",
          note: "2024 巴黎奥运冲浪赛场，距巴黎约 15,700 公里，是奥运史上最远的赛场。村里只有一条单车道。"
        },
        {
          t: "自驾",
          name: "环岛路线",
          note: "Tahiti Nui 一圈 + 南下 Tahiti Iti 到 Teahupo'o。山路多弯，别按国内高速估时间。"
        }
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
      caveat: "这份外部记录没有上 Raiatea，只是在 Bora Bora 往东南远远看到了它。所以本段的交通与岛内信息，一句都没有第一手印证，全部维持待核。",
      points: [
        {
          t: "世界遗产",
          name: "Taputapuātea",
          note: "编号 1529，2017 年列入。Opoa 的 marae 建筑群，见下方专段。当地把 Raiatea 认作 Hava'i——波利尼西亚人共同的源头，marae 就是航海者出发前祭仪的地方。"
        },
        {
          t: "自驾",
          name: "环岛一圈",
          note: "Raiatea 与 Taha'a 共用一个潟湖，环岛公路贴海岸走；具体里程待核。"
        },
        {
          t: "加一天",
          name: "Taha'a",
          note: "香草岛，可坐船过去。要不要加，看你在 Raiatea 留几天。"
        }
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
      caveat: "",
      points: [
        {
          t: "住宿",
          name: "InterContinental Bora Bora Resort & Thalasso Spa",
          note: "环礁东侧的 motu 上，面朝 Otemanu，以深海水疗出名。水上屋为主。"
        },
        {
          t: "住宿",
          name: "The St. Regis Bora Bora",
          note: "潟湖东北侧，度假村区内另有一块填海小岛。房型与水上屋数量最多的一档。"
        },
        {
          t: "住宿",
          name: "InterContinental Le Moana",
          note: "本岛南端 Matira 角，沙滩边，不是水上屋为主的那种。若想两晚住陆地，用它替换。"
        },
        {
          t: "选址",
          name: "为什么两家都在东侧 motu",
          note: "据当地导游向 2025-11 的记录者口述：十几年前那次气旋从西北来，主岛南侧的沙滩被吹走，Sheraton 整座没了，而东侧 motu 上的 St. Regis、Westin 与 IC 基本没事，四季只有一个水屋被掀顶；Sofitel 与 Club Med 后来因疫情与收购先后关闭。口述，未经核实。",
          src: "口述转述 2025-11"
        },
        {
          t: "地名",
          name: "Pora Pora = first born",
          note: "Bora Bora 的当地名 pora pora 意为「first born」。地貌上是火山岛 + 一圈潟湖 + 一圈 motu 堡礁，等于把马克萨斯的火山与图阿莫图的环礁叠在一起。"
        },
        {
          t: "海",
          name: "潟湖里能遇到什么",
          note: "清晨常有 spinner 海豚跟着船走；潟湖里有 manta ray、黑鳍礁鲨与珊瑚花园。鲨鱼多，浮潜时保持距离，不投喂。"
        },
        {
          t: "预期",
          name: "珊瑚不如从前",
          note: "2014–2017 与 2023 年至今两轮全球白化之后，这一带珊瑚的颜色明显不如十几年前。把期待放在鱼群、鳐鱼和潟湖颜色上，别指望大片彩色珊瑚。",
          src: "现场记录 2025-11"
        },
        {
          t: "注意",
          name: "换酒店要坐船",
          note: "两家都在 motu 上，之间没有陆路。换酒店当天要预留船程与行李搬运时间，具体班次待核。"
        }
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
      caveat: "同一份外部记录在 Hiva Oa 只写了高更与 Brel，没有去 Puamau 和 Ta'aoa。所以本段的遗址点位仍然缺第一手印证，别把页面上的描述当成现场确认。",
      points: [
        {
          t: "世界遗产",
          name: "Te Henua Enata 的 Hiva Oa 构成点",
          note: "「Ensemble mixte de Hiva Oa–Tahuata」，97,865 公顷，见下方专段。"
        },
        {
          t: "地名",
          name: "Hiva Oa = 顶梁",
          note: "马克萨斯六座居民岛的名字取自一座房子的构件：两根柱子 Ua Pou、顶梁 Hiva Oa、椽木 Nuku Hiva、房顶 Fatu Hiva、其它材料 Ua Huka、早上的阳光 Tahuata。神在天黑前把房子造完，第二天早上的阳光照进来。"
        },
        {
          t: "语言",
          name: "Ka-o-ha，不是 Aloha",
          note: "马克萨斯语打招呼是 Ka-o-ha。当地人不认为它与夏威夷语是同一种语言，别开口就用 Aloha 套近乎。"
        },
        {
          t: "遗址",
          name: "Me'ae Iipona（Puamau）",
          note: "马克萨斯最重要的遗址之一。Tiki Takai'i 高 2.43 米；另有 Maki'i Taua Pepe 石雕。"
        },
        {
          t: "遗址",
          name: "Ta'aoa 谷",
          note: "Atuona 西侧，马克萨斯最大的 tohua（仪式广场）所在，多数未发掘。"
        },
        {
          t: "遗址",
          name: "Eiaone 谷岩刻",
          note: "Puamau 以西，半浮雕岩刻；多数被植被盖住，找向导。"
        },
        {
          t: "墓地",
          name: "Calvaire 墓园",
          note: "Atuona 上方。高更（1903）葬在这里，墓上有他最后的雕塑；Jacques Brel（1978）也葬在同一片墓园，墓碑上留着歌迷的献词。两人墓相距不远。",
          src: "现场记录 2025-11"
        },
        {
          t: "博物馆",
          name: "Espace Jacques Brel",
          note: "Atuona。Brel 的 Beechcraft「Jojo」停在专用棚里，另有照片与手稿。"
        },
        {
          t: "博物馆",
          name: "Centre Culturel Paul Gauguin",
          note: "Atuona。只展复制品，但藏有他与妻子的往返书信，信里反复商量怎么卖画换钱——比画本身更能说明他在马克萨斯的日子。",
          src: "现场记录 2025-11"
        }
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
      caveat: "",
      points: [
        {
          t: "准备",
          name: "先看博物馆再进店",
          note: "Robert Wan 珍珠博物馆看完，再去市场二楼和 Vaima 的店，价格感会准很多。"
        },
        {
          t: "原则",
          name: "四项定级",
          note: "光泽、表面、形状、尺寸；同样预算优先买光泽好的小一号，不要买大而闷的。"
        }
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
        "Raiatea 在当地传统里就是 Hava'i——波利尼西亚人共同的源头。这也是这座 marae 为什么重要的原因：它不是一座孤立的石台，是出发地。",
        "遗产范围含陆地与潟湖，不只是一座石台。",
        "核心是 marae Taputapuātea 建筑群；周边山谷与海岸同属保护范围。",
        "marae 是圣地，不要攀爬或踩踏石结构；进入前看现场标识。"
      ],
      components: [],
      todo: "单体 marae 的完整清单与边界图，以 UNESCO 档案与现场标识为准，下一版补。"
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
        "岛名来自房子构件：Hiva Oa 是顶梁，Nuku Hiva 是椽木，Ua Pou 是两根柱子，Fatu Hiva 是房顶，Ua Huka 是其它材料，Tahuata 是早上的阳光。",
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

  /* 行前读物 */
  books: [
    {
      t: "Sea People: The Puzzle of Polynesia",
      a: "Christina Thompson",
      why: "波利尼西亚人是谁、从哪来、怎么在没有仪器的条件下散到三角上的三个角。看完再看 marae、tiki 与 pae-pae，感受完全不一样。",
      leg: "全篇"
    },
    {
      t: "Typee",
      a: "Herman Melville",
      why: "《白鲸》作者根据自己在马克萨斯的经历写的小说，写的就是 Nuku Hiva 的 Taipival 谷。",
      leg: "04 Hiva Oa"
    },
    {
      t: "Fatu Hiva",
      a: "Thor Heyerdahl",
      why: "1936 年他在法图希瓦住了一年。马克萨斯的山谷、蚊虫、水果与「回到自然」的幻觉，这本最直接，也最不浪漫。",
      leg: "04 Hiva Oa"
    },
    {
      t: "月亮与六便士",
      a: "W. Somerset Maugham",
      why: "以高更为原型的虚构传记。读完再站到 Calvaire 那座墓前，会多一层。",
      leg: "04 Hiva Oa"
    },
    {
      t: "小猎犬号航海记",
      a: "Charles Darwin",
      why: "达尔文 1835 年到过塔希提，只挑那一章读就够。",
      leg: "01 Tahiti"
    },
    {
      t: "Moana",
      a: "Disney, 2016",
      why: "细节比想象中准：猪鸡狗鼠的组合、Maui 的鱼钩、用手比星空测洋流、high island 与 low island 的区别。",
      leg: "全篇"
    }
  ],

  /* 黑珍珠 */
  pearl: {
    lede:
      "大溪地黑珍珠不是「黑色珍珠」，是黑唇贝 Pinctada margaritifera 养出来的，" +
      "颜色从银灰、孔雀绿到茄紫都有。真正决定价格的是光泽和珠层，不是颜色深浅。",
    points: [
      { t: "在哪买", b: "帕皮提市场（Mapuru a Paraita）二楼、Vaima 购物中心、Robert Wan 等品牌店。市场便宜但等级混杂，品牌店贵但可追溯。" },
      { t: "产地价差", b: "图阿莫图与甘比尔的环礁是产地，有养殖场做「现场开蚌 + 现场镶嵌」，同等级通常比帕皮提便宜。我们这趟不去产地，所以只能拿帕皮提的几家的报价互相比，别把产地价当基准。" },
      { t: "先看四项", b: "光泽（最重要）、表面瑕疵、形状（正圆最贵）、尺寸（毫米）。同样预算，优先高光泽的小一号。" },
      { t: "别在情绪高点买", b: "外部记录的作者在产地看中没买，半个月后在帕皮提二刷才下手，事后承认那家店并不划算。看中的珠子隔一天再回去：价格没变就买，涨了就换店。" },
      { t: "证书与发票", b: "要求写明「perle de Tahiti」、尺寸、形状、等级；发票留好，离境与保修都要用。" },
      { t: "别在酒店大堂买", b: "度假村柜台加价最高。真要买，回帕皮提再买。" },
      { t: "配对", b: "耳环要配对，一对的价格不是单颗乘二；配对好的会明显更贵，先问清楚是不是同一批。" },
      { t: "价格", b: "本页不写价格区间 —— 差价太大，写了就是误导。到店按当日报价比三家。" }
    ]
  },

  todos: [
    "中国驾照在法属波利尼西亚能否直接租车、是否需要国际驾照 —— 待核",
    "Tahiti 环岛里程与各段实际车程 —— 待核",
    "Point Vénus / Matavai 湾的具体位置、开放与停车 —— 待核",
    "Espace Gauguin（Papeari）开馆时间与是否已开放 —— 待核",
    "大溪地博物馆当期借展（A'a、tiki、tapa）是否仍在展 —— 待核",
    "华人相关建筑完整清单：华人墓园、老商号、社团会馆 —— 待核",
    "Air Tahiti 各班次时刻、行李限重、跳岛联程规则 —— 待核",
    "Bora Bora 两家酒店之间以及机场的船只接驳班次 —— 待核",
    "帕皮提 → Hiva Oa 航班是否经停、经停哪座岛 —— 待核",
    "Bora Bora 气旋史与酒店受损情况为导游口述，需另找来源核实 —— 待核",
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
    { label: "Tahiti Heritage · 波利尼西亚遗产百科", url: "https://www.tahitiheritage.pf/" },
    { label: "微博「黛西杨」（UID 1714290354）· 2025-11/12 法属波利尼西亚记录（本页改写引用，原文版权属原作者）", url: "https://weibo.com/u/1714290354" }
  ]
};
