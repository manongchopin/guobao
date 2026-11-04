/* 圣地巡礼 · 三个作品（v0.2）
   版本：0.2（2026-11-04）
   说明：只写能指出来源的地点。坐标尽量取 OSM / 官方地址；不能确认的标 approx 或「待核」。
   图片：本版不使用动画截图、实景对比图；「拍摄对比」一栏写的是构图/机位文字。
*/
window.SEICHI = {
  version: "0.2",
  updated: "2026-11-04",

  intro:
    "三个作品，三条完全不同的线：秒速五厘米要上离岛，灌篮高手是一条镰仓—湘南的城市线，" +
    "你的名字横跨东京、飞驒和诹访。这里先把“作品里的场景”逐条对到现实地点，" +
    "并标清哪些是作品明确出现、哪些只是粉丝比对出来的原型。" +
    "路线、班次、住宿留到下一版，不在这里冒充可执行行程。" +
    "目前 26 个点全在日本；数据结构保留了 country 字段，以后加中国或欧洲的作品不用重做。",

  callout:
    "这是 v0.2 取景地清单，不是行程。26 个点位里，20 个有公开来源支持“作品明确出现”，" +
    "5 个是粉丝比对出的原型，1 个只是“能看到同一片湖”的视角。" +
    "没查到的开放时间、巴士班次、店内规则，统一写「待核」，没有编。",

  categories: [
    { id: "confirmed", label: "作品明确出现", short: "已确认", desc: "有官方取材协力、作品画面比对或可靠媒体报道支持。" },
    { id: "fan", label: "粉丝公认的原型", short: "粉丝公认", desc: "社区普遍比对为某场景的原型，但没有官方认定；去之前按“可能只是相似”处理。" },
    { id: "mood", label: "只是氛围/视角相似", short: "氛围相似", desc: "作品里没有这个地点，只是能看到同一片风景，或气质接近。" }
  ],

  /* 目前全部在日本；保留 country 字段，以后加中国/欧洲作品时不用改结构 */
  countries: { JP: "日本" },

  works: [
    {
      id: "byousoku",
      no: "01",
      color: "#a8402f",
      title: "秒速五厘米",
      ja: "秒速5センチメートル",
      en: "5 CENTIMETERS PER SECOND",
      short: "东京的雪夜列车、种子岛的火箭与海岸；离岛线，至少住两晚。",
      direction: "东京 · 种子岛",
      days: "种子岛 2–3 天 + 东京半天",
      shape: "离岛线",
      summary:
        "三话 63 分钟。第 1 话《樱花抄》是东京到栃木的雪夜列车；第 2 话《宇航员》在种子岛，" +
        "花苗看着贵树，也看着火箭；第 3 话回到东京，贵树和明里在踏切擦肩，然后各自走开。" +
        "种子岛不是“一天能打完”的外景地——它本身就是一个要住两晚的离岛。",
      travel: [
        "东京—鹿儿岛：飞机到鹿儿岛机场，或新干线到鹿儿岛中央。",
        "鹿儿岛—种子岛：鹿儿岛港有渡轮/高速船到西之表港；鹿儿岛机场有航班到种子岛机场。班次少，先订（待核）。",
        "岛内：租车最实际。点位分散在中种子町和南种子町，巴士班次少，靠公共交通很难一天串完。",
        "火箭发射前后：住宿、租车、道路管制都会变，不要把行程卡在发射日。"
      ],
      etiquette: [
        "学校、酒店、邮局、超市都是现役设施，拍外观前先确认不挡人、不拍人。",
        "旧种子岛机场用地立入禁止，只能在用地外远望。",
        "中山海岸是冲浪点，不要挡冲浪者进出路线，也不要留下垃圾。",
        "花苗家前的道路是居民区，动画里出现过，但不建议去堵门拍照。"
      ],
      cautions: [
        "种子岛中央高校：上课日不能进校，校门附近也不要长时间停留。",
        "グリーンホテルさかえ 205 号室是粉丝比对出的房间，不是参观设施；只有住客能进。",
        "旧空港：围栏外拍摄即可，不要翻越。",
        "宇宙センター周一休馆；设施巴士团要预约。"
      ]
    },
    {
      id: "slamdunk",
      no: "02",
      color: "#2f5d50",
      title: "灌篮高手",
      ja: "SLAM DUNK",
      en: "SLAM DUNK · KAMAKURA / SHONAN",
      short: "踏切只是入口；镰仓—江之岛—湘南海岸，再加平塚与武藏野的原型。",
      direction: "镰仓 · 江之岛 · 湘南",
      days: "1 天（镰仓—湘南）+ 可选半天",
      shape: "城市线",
      summary:
        "片头那个踏切只是入口。真正可走的是一条镰仓—江之岛—湘南海岸的线：踏切、江之电、" +
        "海岸、学校外观，再往外是平塚的县决赛场馆原型和武藏野北高校。" +
        "2025 年 9 月起，镰仓市在踏切旁公园设了拍照点并派人引导——“站在马路上拍”的时代已经结束。",
      travel: [
        "东京—镰仓：JR 湘南新宿线/横须贺线到镰仓，或小田急到藤泽转江之电。",
        "镰仓—江之岛：江之电沿线；一日券可以在踏切、七里ヶ浜、江之岛之间反复上下。",
        "平塚総合体育館：JR 平塚站北口转巴士；班次与下车站待核。",
        "武蔵野北高校：西武新宿线 西武柳沢站步行约 17 分（粉丝站点数据，待核）。"
      ],
      etiquette: [
        "踏切：严禁进入轨道；不要站在国道 134 号车道上；按现场警卫和拍照区指示排队。",
        "2025-09-13 起，踏切旁公园设临时拍照点，工作人员持中英日韩标语引导；“公园外停留拍摄”被明确劝阻。试办结束后规则可能再变。",
        "镰仓高校、武藏野北高校都是在用学校：只在校外道路看外观，不进校、不拍学生。",
        "江之岛/七里ヶ浜：海滩可以走，但不要为了复刻构图走到车道上。"
      ],
      cautions: [
        "踏切人潮集中在白天；清晨或傍晚更安静，但不要为了空景违反交通规则。",
        "平塚総合体育館周一休馆（待核），入口展示是否开放以现场为准。",
        "鹄沼海岸对应的是原作结局，不是 TV 片头；别把两个场景混成一处。"
      ]
    },
    {
      id: "kimi",
      no: "03",
      color: "#557486",
      title: "你的名字",
      ja: "君の名は。",
      en: "YOUR NAME · HIDA / TOKYO / SUWA",
      short: "东京结局、飞驒古川取景、诹访湖参考；跨县，3–5 天。",
      direction: "东京 · 飞驒古川 · 诹访湖",
      days: "3–5 天",
      shape: "跨县线",
      summary:
        "故事横跨东京、飞驒古川和诹访湖。东京是瀧的日常与结局（新宿南口—千駄ヶ谷—须贺神社），" +
        "飞驒古川是糸守町的现实取景（车站、气多若宫神社、市图书馆、落合巴士站），" +
        "诹访湖是糸守湖的参考。三地不在一条线上，3–5 天是合理下限。",
      travel: [
        "东京—飞驒古川：北陆新干线到富山，或特急到高山，再转 JR 高山本线。",
        "飞驒古川—诹访湖：经高山—松本—盐尻—上诹访，跨县，车程长；不要排成一日往返。",
        "东京—上诹访：JR 中央线特急梓号直达。",
        "东京市区：新宿—千駄ヶ谷—四谷之间用 JR/地铁；须贺神社从四谷站步行。"
      ],
      etiquette: [
        "气多若宫神社是现役神社：参拜礼仪、手水、不要大声；鸟居和台阶上不要长时间占位。",
        "飞驒市图书馆是现役图书馆：不要拍读者，不要用快门声，先问柜台能不能拍建筑。",
        "落合巴士站是现役巴士站：不要挡住等车的人。",
        "须贺神社前的台阶在住宅区：排队、让路，不要堵住车道和住户出入口。"
      ],
      cautions: [
        "飞驒市图书馆开馆时间：官网抓取失败，出发前再查（待核）。",
        "落合巴士站坐标是约值（≈），现场以巴士站牌为准。",
        "诹访湖不是“取景地”，是糸守湖的参考；立石公园是俯瞰视角，不是剧中场景。",
        "国立新美术馆周二休馆，展览另收费。"
      ]
    }
  ],

  spots: [
    /* ---------- 秒速五厘米 ---------- */
    {
      id: "byo-sangubashi", work: "byousoku", no: "01",
      name: "参宫桥站与 1 号踏切", ja: "参宮橋駅・参宮橋1号踏切",
      cat: "confirmed", country: "JP", pref: "东京都", city: "涩谷区",
      lat: 35.68018, lng: 139.69363,
      sceneShort: "第 1 话：雪夜等车、走过的踏切",
      scene:
        "第 1 话《樱花抄》，贵树从参宫桥一带出发去见明里；站台、1 号踏切和周边小路是这一段的东京背景。雪夜等车的候车室在栃木县岩舟站，不在参宫桥——两处不要混成一处。",
      access: "小田急线 参宫桥站，出站即到；1 号踏切在站旁。",
      hours: "踏切与道路全天；车站以运营时间为准。",
      photo: "站台向踏切方向取景，冬天傍晚的逆光和积雪最难复刻；不要站在轨道上等车。",
      note: "住宅区，站前道路窄；拍完就走，不要架三脚架堵路。雪夜候车室在岩舟站，本页暂未单列。",
      src: [
        { t: "とある大人の備忘録 · 参宮橋・豪徳寺・代々木編", u: "https://deep-adultweet.blog.jp/archives/6414372.html" }
      ]
    },
    {
      id: "byo-shinjuku", work: "byousoku", no: "02",
      name: "新宿站西口・住友大厦一带", ja: "新宿駅西口・新宿住友ビル付近",
      cat: "confirmed", country: "JP", pref: "东京都", city: "新宿区",
      lat: 35.68962, lng: 139.69865,
      sceneShort: "第 3 话：贵树成年后的东京街景",
      scene:
        "第 3 话《秒速5センチメートル》，成年后的贵树在东京上班、打电话、走过高层楼群；新宿西口的楼群和路口是这一段的主要背景。",
      access: "JR 新宿站西口，步行即到。",
      hours: "公共街道全天。",
      photo: "高层建筑之间的仰角与逆光；上班高峰人流量大，不要为了空景站到车道。",
      note: "办公区，工作日中午和傍晚人最多；周末反而安静。",
      src: [
        { t: "とある大人の備忘録 · 新宿編", u: "https://deep-adultweet.blog.jp/archives/10567820.html" }
      ]
    },
    {
      id: "byo-tanegashima-chuo", work: "byousoku", no: "03",
      name: "鹿儿岛县立种子岛中央高校", ja: "鹿児島県立種子島中央高等学校",
      cat: "confirmed", country: "JP", pref: "鹿儿岛县", city: "中种子町",
      lat: 30.54249, lng: 130.96245,
      sceneShort: "第 2 话：花苗的学校",
      scene:
        "第 2 话《宇航员》，花苗和同学每天上学、放学，校舍和操场是种子岛日常的主要舞台。",
      access: "种子岛机场驾车约 10 分钟；中种子町中心步行可达。",
      hours: "仅校外道路；上课日不能进校。",
      photo: "从校门外道路取景即可；不要拍学生，不要翻墙。",
      note: "现役县立高中。学校地址：中种子町野间 4258-1。",
      src: [
        { t: "鹿児島県立種子島中央高等学校", u: "http://www.edu.pref.kagoshima.jp/sh/tanechuo/" },
        { t: "とある大人の備忘録 · 中種子・西之表編", u: "https://deep-adultweet.blog.jp/archives/29390035.html" }
      ]
    },
    {
      id: "byo-nakayama", work: "byousoku", no: "04",
      name: "中山海岸", ja: "中山海岸",
      cat: "confirmed", country: "JP", pref: "鹿儿岛县", city: "中种子町",
      lat: 30.53512, lng: 130.94859,
      sceneShort: "第 2 话：花苗冲浪、看火箭升空",
      scene:
        "第 2 话，花苗在海边冲浪，远处火箭升空；她后来在海堤上看着贵树的方向。海岸、防波堤和岛影是这一话最开阔的场景。",
      access: "中种子町中山地区，自驾；巴士路线待核。",
      hours: "海岸全天；冲浪旺季清晨人最多。",
      photo: "从沙滩回望海岸线，或者从海堤拍火箭方向；火箭发射日不要占住堤上通道。",
      note: "现役冲浪点，不是景区；没有更衣室和垃圾桶，自己带走垃圾。",
      src: [
        { t: "ふるさと種子島 · 中山海岸", u: "https://www.furusato-tanegashima.net/surfin/nakayama.html" },
        { t: "ロケ地DB · 中山海岸", u: "https://junreidb.com/spot/c61xixy2" }
      ]
    },
    {
      id: "byo-greenhotel", work: "byousoku", no: "05",
      name: "グリーンホテルさかえ（205 号室）", ja: "グリーンホテルさかえ",
      cat: "fan", country: "JP", pref: "鹿儿岛县", city: "中种子町",
      lat: 30.53026, lng: 130.95743,
      sceneShort: "第 2 话：粉丝比对的客房窗景",
      scene:
        "粉丝按画面比对，认为剧中出现的客房对应这家酒店的 205 号室；不是官方公布的取景设定，窗外能看到中种子町的街与山。",
      access: "种子岛机场驾车约 10 分钟；中种子町中心。",
      hours: "现役酒店，仅住客可进入。",
      photo: "只有入住才能拍窗景；不要为了拍照向前台要求参观房间。",
      note: "粉丝比对，非官方认定。酒店仍在营业，预订前先确认房型。",
      src: [
        { t: "とある大人の備忘録 · 中種子・西之表編", u: "https://deep-adultweet.blog.jp/archives/29390035.html" }
      ]
    },
    {
      id: "byo-sams", work: "byousoku", no: "06",
      name: "サムズ中种子店附近", ja: "サムズ中種子店付近",
      cat: "confirmed", country: "JP", pref: "鹿儿岛县", city: "中种子町",
      lat: 30.53718, lng: 130.95935,
      sceneShort: "第 2 话：中种子町中心街景",
      scene:
        "第 2 话的街景cut：从町中心南北向道路看过去，超市招牌和低层建筑构成种子岛的日常背景。",
      access: "中种子町中心，国道 58 号沿线；自驾或町内步行。",
      hours: "超市营业时间内；店外道路全天。",
      photo: "在超市对面人行道取景；不要站在国道 58 号车道上。",
      note: "现役超市，拍外观就好，不要影响顾客进出。",
      src: [
        { t: "とある大人の備忘録 · 中種子・西之表編", u: "https://deep-adultweet.blog.jp/archives/29390035.html" }
      ]
    },
    {
      id: "byo-oldairport", work: "byousoku", no: "07",
      name: "旧种子岛机场迹地", ja: "旧種子島空港跡地",
      cat: "confirmed", country: "JP", pref: "鹿儿岛县", city: "中种子町",
      lat: 30.54583, lng: 130.95084,
      sceneShort: "第 3 话：旧机场与跑道",
      scene:
        "第 3 话出现的种子岛机场是“旧空港”。现在的种子岛机场是后来启用的，旧航站楼还留在原址，但用地封闭。",
      access: "种子岛机场附近，自驾；具体入口待核。",
      hours: "立入禁止；只能从用地外道路远望。",
      photo: "围栏外长焦拍建筑；不要翻越围栏，也不要走进跑道。",
      note: "旧航站楼仍在，但已封闭管理；以现场标识为准。",
      src: [
        { t: "とある大人の備忘録 · 中種子・西之表編", u: "https://deep-adultweet.blog.jp/archives/29390035.html" }
      ]
    },
    {
      id: "byo-nakawari", work: "byousoku", no: "08",
      name: "中割简易邮便局", ja: "中割簡易郵便局",
      cat: "confirmed", country: "JP", pref: "鹿儿岛县", city: "西之表市",
      lat: 30.60896, lng: 130.99851,
      sceneShort: "第 3 话：种子岛机场附近的邮局",
      scene:
        "第 3 话里，贵树在种子岛机场附近经过的邮局；这是中种子町与西之表市交界一带少见的西之表市侧场景。",
      access: "种子岛机场驾车数分钟；县道沿线。",
      hours: "现役邮局，营业日以日本邮便公告为准。",
      photo: "从道路对面拍外观；不要堵住邮局门口和停车位。",
      note: "现役简易邮局，窗口时间短；拍外观不需要进去。",
      src: [
        { t: "とある大人の備忘録 · 中種子・西之表編", u: "https://deep-adultweet.blog.jp/archives/29390035.html" }
      ]
    },
    {
      id: "byo-tnsc", work: "byousoku", no: "09",
      name: "种子岛宇宙中心", ja: "種子島宇宙センター",
      cat: "confirmed", country: "JP", pref: "鹿儿岛县", city: "南种子町",
      lat: 30.39434, lng: 130.95779,
      sceneShort: "第 2 话：火箭发射场的原型",
      scene:
        "第 2 话的火箭从种子岛升空，花苗在海边看见。现实中的发射场就是 JAXA 种子岛宇宙中心；剧中角色没有走进设施，但这是“火箭”这条线的现实落点。",
      access: "种子岛机场驾车约 1 小时；南种子町茎永。",
      hours: "宇宙科学技术馆 9:30–16:30；周一休（逢假日改周二，8 月无休）；免费；设施巴士团需预约。",
      photo: "从宇宙ヶ丘公园或展望点看发射场；发射日道路管制，普通游客不能靠近。",
      note: "发射场不是随时能进；见学范围、巴士团和发射日规则都以 JAXA 公告为准。",
      src: [
        { t: "JAXA · 種子島宇宙センター", u: "https://fanfun.jaxa.jp/visit/tanegashima/" }
      ]
    },

    /* ---------- 灌篮高手 ---------- */
    {
      id: "sd-crossing", work: "slamdunk", no: "01",
      name: "镰仓高校前 踏切与车站", ja: "鎌倉高校前駅・踏切",
      cat: "confirmed", country: "JP", pref: "神奈川县", city: "镰仓市",
      lat: 35.30672, lng: 139.50071,
      sceneShort: "片头：樱木与晴子隔着铁轨",
      scene:
        "TV 动画片头里，樱木花道和赤木晴子隔着江之电的踏切打招呼，背景是湘南海岸和江之岛。这个画面成了整部作品最著名的“入口”。",
      access: "江之电 镰仓高校前站，出站步行 1 分钟；踏切在车站东侧。",
      hours: "道路与踏切全天；江之电以时刻表为准。",
      photo: "从车站东侧平交道口向海侧取景，江之岛在右后方；动画是低机位广角。现在只能站在指定拍照区/人行道，不要复刻马路中央机位。",
      note: "2025-09-13 起，镰仓市在踏切旁公园设临时拍照点并派员引导；严禁进入轨道，禁止在公园外停留拍摄。",
      src: [
        { t: "圣地地图 · 灌篮高手", u: "https://screenpilgrimage.com/zh-Hans/title/slam-dunk/" },
        { t: "ETtoday 2025-09-15 · 镰仓市设拍照区", u: "https://www.ettoday.net/news/20250915/3033834.htm" },
        { t: "Wikipedia · 鎌倉高校前駅", u: "https://ja.wikipedia.org/wiki/%E9%8E%8C%E5%80%89%E9%AB%98%E6%A0%A1%E5%89%8D%E9%A7%85" }
      ]
    },
    {
      id: "sd-kamakura-hs", work: "slamdunk", no: "02",
      name: "神奈川县立镰仓高校（外观）", ja: "神奈川県立鎌倉高等学校",
      cat: "fan", country: "JP", pref: "神奈川县", city: "镰仓市",
      lat: 35.30840, lng: 139.50341,
      sceneShort: "陵南高校的原型（粉丝比对）",
      scene:
        "粉丝普遍把镰仓高校比对为陵南高校的原型：靠海、在坡上、就在踏切上方。作品没有官方认定，校内也不开放。",
      access: "江之电 镰仓高校前站步行约 10 分钟，上坡。",
      hours: "仅校外道路；上课日不能进校。",
      photo: "从坡下道路仰拍校舍与海；不要拍学生，不要进入校园或私人用地。",
      note: "现役县立高中。粉丝推测，非官方认定。",
      src: [
        { t: "圣地地图 · 灌篮高手", u: "https://screenpilgrimage.com/zh-Hans/title/slam-dunk/" },
        { t: "Wikipedia · 神奈川県立鎌倉高等学校", u: "https://ja.wikipedia.org/wiki/%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E7%AB%8B%E9%8E%8C%E5%80%89%E9%AB%98%E7%AD%89%E5%AD%A6%E6%A0%A1" }
      ]
    },
    {
      id: "sd-shichiri", work: "slamdunk", no: "03",
      name: "七里ヶ浜・湘南海岸", ja: "七里ヶ浜・湘南海岸",
      cat: "confirmed", country: "JP", pref: "神奈川县", city: "镰仓市",
      lat: 35.30399, lng: 139.51407,
      sceneShort: "片头：海岸线与江之电",
      scene:
        "片头和过场里的海岸线、江之电沿着湘南海岸行驶的画面；从七里ヶ浜到镰仓高校前这一段，是作品里“海”的主要来源。",
      access: "江之电 七里ヶ浜站步行数分钟到海边。",
      hours: "海岸全天；海水浴场季节有救生员。",
      photo: "从沙滩或人行道拍江之电与海；不要站在 134 号国道车道上。",
      note: "海滩是公共空间，但夏季人多；不要为了拍照挡住通道。",
      src: [
        { t: "圣地地图 · 灌篮高手", u: "https://screenpilgrimage.com/zh-Hans/title/slam-dunk/" }
      ]
    },
    {
      id: "sd-enoshima", work: "slamdunk", no: "04",
      name: "江之岛", ja: "江の島",
      cat: "confirmed", country: "JP", pref: "神奈川县", city: "藤泽市",
      lat: 35.30011, lng: 139.48064,
      sceneShort: "片头：踏切背景里的岛",
      scene:
        "片头踏切画面的背景就是江之岛。岛本身在作品里更多是远景，不是角色登岛的情节。",
      access: "江之电 江之岛站步行约 15 分钟到弁天桥；或小田急片濑江之岛站。",
      hours: "岛上公共区域全天；设施各自营业时间不同。",
      photo: "从弁天桥或片濑海岸拍岛影；傍晚逆光最接近动画色调。",
      note: "岛上是景区，周末拥挤；不要把“背景里的岛”当成必须登岛的理由。",
      src: [
        { t: "Wikipedia · 江の島", u: "https://ja.wikipedia.org/wiki/%E6%B1%9F%E3%81%AE%E5%B3%B6" }
      ]
    },
    {
      id: "sd-kugenuma", work: "slamdunk", no: "05",
      name: "鹄沼海岸（片濑西滨）", ja: "鵠沼海岸",
      cat: "confirmed", country: "JP", pref: "神奈川县", city: "藤泽市",
      lat: 35.31168, lng: 139.47460,
      sceneShort: "原作结局：樱木与流川的海滩",
      scene:
        "原作漫画最后一幕的海滩，樱木和流川在这里有短暂互动；对应的是原作结局，不是 TV 片头那个踏切。",
      access: "小田急江之岛线 鹄沼海岸站步行约 15 分钟。",
      hours: "海岸全天。",
      photo: "从沙滩向江之岛方向取景；不要把动画截图和现实硬拼成“同一机位”。",
      note: "与踏切相距约 3 公里，安排在同一天时注意脚程。",
      src: [
        { t: "圣地地图 · 灌篮高手", u: "https://screenpilgrimage.com/zh-Hans/title/slam-dunk/" },
        { t: "Wikipedia · 鵠沼海岸", u: "https://ja.wikipedia.org/wiki/%E9%B5%A0%E6%B2%BC%E6%B5%B7%E5%B2%B8" }
      ]
    },
    {
      id: "sd-hiratsuka", work: "slamdunk", no: "06",
      name: "平塚综合体育馆", ja: "平塚総合体育館",
      cat: "fan", country: "JP", pref: "神奈川县", city: "平塚市",
      lat: 35.36195, lng: 139.27180,
      sceneShort: "县决赛会场的原型（粉丝比对）",
      scene:
        "湘北与陵南在县决赛交手，粉丝把平塚综合体育馆比对为这场比赛的场馆原型；入口处有井上雄彦的签名和展示。",
      access: "JR 平塚站北口转巴士；班次与下车站待核。",
      hours: "以设施公告为准；周一休馆（待核）。",
      photo: "入口与体育馆外观；馆内是否可拍以现场为准。",
      note: "现役市立体育馆。粉丝比对，非官方认定；free 参观范围以现场为准。",
      src: [
        { t: "圣地地图 · 灌篮高手", u: "https://screenpilgrimage.com/zh-Hans/title/slam-dunk/" },
        { t: "Wikipedia · 平塚総合体育館", u: "https://ja.wikipedia.org/wiki/%E5%B9%B3%E5%A1%9A%E7%B7%8F%E5%90%88%E4%BD%93%E8%82%B2%E9%A4%A8" }
      ]
    },
    {
      id: "sd-musashino", work: "slamdunk", no: "07",
      name: "东京都立武藏野北高校（外观）", ja: "東京都立武蔵野北高等学校",
      cat: "fan", country: "JP", pref: "东京都", city: "武藏野市",
      lat: 35.71996, lng: 139.55735,
      sceneShort: "湘北高校的原型（粉丝比对）",
      scene:
        "作品把湘北高中设定在神奈川，但校舍外观取自东京都立武藏野北高校——这是粉丝长期比对出的结果，学校没有官方认定。",
      access: "西武新宿线 西武柳沢站步行约 17 分（待核）。",
      hours: "仅校外道路；上课日不能进校。",
      photo: "从校外道路拍校门与校舍；不要拍学生，不要进入校园。",
      note: "现役都立高中，住宅区包围；安静看完就走。",
      src: [
        { t: "圣地地图 · 灌篮高手", u: "https://screenpilgrimage.com/zh-Hans/title/slam-dunk/" },
        { t: "Wikipedia · 東京都立武蔵野北高等学校", u: "https://ja.wikipedia.org/wiki/%E6%9D%B1%E4%BA%AC%E9%83%BD%E7%AB%8B%E6%AD%A6%E8%94%B5%E9%87%8E%E5%8C%97%E9%AB%98%E7%AD%89%E5%AD%A6%E6%A0%A1" }
      ]
    },

    /* ---------- 你的名字 ---------- */
    {
      id: "kimi-suga", work: "kimi", no: "01",
      name: "须贺神社（四谷）", ja: "須賀神社",
      cat: "confirmed", country: "JP", pref: "东京都", city: "新宿区",
      lat: 35.68533, lng: 139.72253,
      sceneShort: "结局：两人在台阶上重逢",
      scene:
        "结尾，瀧和三葉在四谷的须贺神社前台阶上擦肩，然后同时回头问出“你的名字”。这段台阶是全片最后一镜。",
      access: "JR/地铁 四谷站步行约 8–10 分钟；新宿站南口步行约 38 分钟（柳田理科雄的推算）。",
      hours: "境内自由；社务所时间以现场为准。",
      photo: "台阶下向上仰拍，或从台阶上向下拍；动画里两人是错身而过的机位。",
      note: "住宅区，台阶窄；排队时不要堵住参道和住户出入口。",
      src: [
        { t: "Wikipedia · 你的名字。", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" },
        { t: "Wikipedia · 須賀神社 (新宿区)", u: "https://ja.wikipedia.org/wiki/%E9%A0%88%E8%B3%80%E7%A5%9E%E7%A4%BE_(%E6%96%B0%E5%AE%BF%E5%8C%BA)" }
      ]
    },
    {
      id: "kimi-shinjuku-s", work: "kimi", no: "02",
      name: "新宿站南口", ja: "新宿駅南口",
      cat: "confirmed", country: "JP", pref: "东京都", city: "新宿区",
      lat: 35.68918, lng: 139.70034,
      sceneShort: "结局：瀧下车后跑向须贺神社",
      scene:
        "结局前，瀧在中央线列车上看到三葉，随后从新宿站南口下车，穿过四谷一带跑向须贺神社。",
      access: "JR 新宿站南口；出站后向四谷方向步行。",
      hours: "公共街道全天。",
      photo: "南口站前的人流与楼群；动画里是跑动镜头，现实里不要在马路上跑。",
      note: "站前极拥挤；拍摄时靠边，不要挡住通勤人流。",
      src: [
        { t: "Wikipedia · 你的名字。", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" }
      ]
    },
    {
      id: "kimi-sendagaya", work: "kimi", no: "03",
      name: "千駄谷站", ja: "千駄ヶ谷駅",
      cat: "confirmed", country: "JP", pref: "东京都", city: "涩谷区",
      lat: 35.68108, lng: 139.71112,
      sceneShort: "结局：三葉下车的那一站",
      scene:
        "同一段结局里，三葉坐总武线在千駄谷站下车，向四谷方向走；两人才会在须贺神社撞见。",
      access: "JR 总武线 千駄谷站；步行到须贺神社约 22 分钟（推算）。",
      hours: "公共街道全天；车站以运营时间为准。",
      photo: "站前街道；动画里的跑动路线经过住宅与办公楼之间。",
      note: "与须贺神社之间是上坡和住宅区，按人行道走。",
      src: [
        { t: "Wikipedia · 你的名字。", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" }
      ]
    },
    {
      id: "kimi-nact", work: "kimi", no: "04",
      name: "国立新美术馆", ja: "国立新美術館",
      cat: "confirmed", country: "JP", pref: "东京都", city: "港区",
      lat: 35.66534, lng: 139.72644,
      sceneShort: "瀧与奥寺前辈看展的美术馆",
      scene:
        "瀧和打工前辈奥寺约会时去的美术馆；片尾制作名单的“取材协力”里列了国立新美术馆。",
      access: "东京地铁 乃木坂站直结；六本木站步行约 7 分钟。",
      hours: "10:00–18:00（入场至闭馆前 30 分钟）；周二休，逢祝日开馆、翌平日休；展览另收费。",
      photo: "馆内展览通常禁止拍摄，以现场标识为准；建筑外观和公共区域可以拍。",
      note: "现役美术馆，不是“免费景点”；看展要买票。",
      src: [
        { t: "国立新美術館", u: "https://www.nact.jp/" },
        { t: "Wikipedia · 你的名字。", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" }
      ]
    },
    {
      id: "kimi-furukawa", work: "kimi", no: "05",
      name: "飞驒古川站", ja: "飛騨古川駅",
      cat: "confirmed", country: "JP", pref: "岐阜县", city: "飞驒市",
      lat: 36.23673, lng: 137.18961,
      sceneShort: "瀧一行人抵达糸守町的车站",
      scene:
        "瀧、司和奥寺前辈坐火车到飞驒古川，在站台上问路，开始寻找糸守町；车站和站前街道是飞驒段的入口。",
      access: "JR 高山本线 飞驒古川站；从高山站一站。",
      hours: "车站以运营时间为准；站前全天。",
      photo: "站台与站舍；动画里是雪后的站台，现实里冬天才有那种光线。",
      note: "现役车站；站前有观光案内，可以先拿地图。",
      src: [
        { t: "Wikipedia · 你的名字。", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" },
        { t: "飛騨市図書館", u: "https://www.hida-lib.jp/" }
      ]
    },
    {
      id: "kimi-keta", work: "kimi", no: "06",
      name: "气多若宫神社", ja: "気多若宮神社",
      cat: "confirmed", country: "JP", pref: "岐阜县", city: "飞驒市",
      lat: 36.23925, lng: 137.19763,
      sceneShort: "飞驒古川站后站的神社与台阶",
      scene:
        "从飞驒古川站后站过去的气多若宫神社，是瀧一行人在镇上找线索时经过的地方；紫色鸟居和石阶是粉丝最常拍的一处。",
      access: "飞驒古川站步行约 10 分钟，站后侧。",
      hours: "境内自由；社务所时间以现场为准。",
      photo: "石阶下向上拍鸟居；不要站到马路中央，也不要在台阶上久坐。",
      note: "现役神社；参拜前先在手水舍净手。",
      src: [
        { t: "Wikipedia · 你的名字。", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" }
      ]
    },
    {
      id: "kimi-library", work: "kimi", no: "07",
      name: "飞驒市图书馆", ja: "飛騨市図書館",
      cat: "confirmed", country: "JP", pref: "岐阜县", city: "飞驒市",
      lat: 36.23812, lng: 137.18547,
      sceneShort: "飞驒古川站前站的图书馆",
      scene:
        "飞驒古川站前站的市立图书馆，是瀧一行人查糸守町资料的地方；建筑和阶梯在片中很清楚。",
      access: "飞驒古川站步行约 5 分钟（约 400 米）。",
      hours: "开馆时间待核（官网抓取失败）；出发前查官网或电话确认。",
      photo: "建筑外观和公共阶梯可以拍；馆内不要拍读者，先问柜台。",
      note: "现役图书馆，安静优先；不要为了复刻镜头在馆内走动拍摄。",
      src: [
        { t: "飛騨市図書館", u: "https://www.hida-lib.jp/" },
        { t: "Wikipedia · 你的名字。", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" }
      ]
    },
    {
      id: "kimi-ochiai", work: "kimi", no: "08",
      name: "落合巴士站", ja: "落合バス停",
      cat: "confirmed", country: "JP", pref: "岐阜县", city: "飞驒市",
      lat: 36.30930, lng: 137.11940, approx: true,
      sceneShort: "瀧在雨中等的巴士站",
      scene:
        "瀧在飞驒找糸守町时，在雨中等的那个巴士站；位置在飞驒古川站以北、靠近角川站的方向。",
      access: "JR 高山本线 角川站附近，自驾或巴士；具体站牌位置待核。",
      hours: "现役巴士站，全天；班次待核。",
      photo: "从道路内侧拍站牌与山景；不要站到车道上等车。",
      note: "坐标是约值（≈）；现场以巴士站牌和当地地图为准。",
      src: [
        { t: "Wikipedia · 你的名字。", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" }
      ]
    },
    {
      id: "kimi-suwa", work: "kimi", no: "09",
      name: "诹访湖", ja: "諏訪湖",
      cat: "fan", country: "JP", pref: "长野县", city: "诹访市",
      lat: 36.04795, lng: 138.08328,
      sceneShort: "糸守湖的参考（设定）",
      scene:
        "糸守湖是虚构的，但新海诚在采访里说，湖的参考是诹访湖；糸守湖最初的灵感还来自他出生地小海町的松原湖。",
      access: "JR 上诹访站步行约 10 分钟到湖边。",
      hours: "湖岸公共区域全天。",
      photo: "从湖岸拍湖面与四周山；不要把“参考”写成“取景地”。",
      note: "粉丝/设定参考，不是片中实拍地点。",
      src: [
        { t: "Wikipedia · 你的名字。", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" }
      ]
    },
    {
      id: "kimi-tateishi", work: "kimi", no: "10",
      name: "立石公园", ja: "立石公園",
      cat: "mood", country: "JP", pref: "长野县", city: "诹访市",
      lat: 36.05338, lng: 138.12250,
      sceneShort: "俯瞰“糸守湖”的视角",
      scene:
        "公园在诹访湖北侧高处，能看到湖面和盆地。作品里没有这个公园；它只是“从高处看糸守湖”的视角，和片中俯瞰镜头气氛相近。",
      access: "JR 上诹访站打车或自驾上山；步行坡道较长。",
      hours: "公园全天；夜间没有照明。",
      photo: "傍晚到入夜的湖面最好；冬天路面可能结冰，自驾注意。",
      note: "氛围/视角相似，不是取景地；不要把它写成“糸守湖原型”。",
      src: [
        { t: "Wikipedia · 你的名字。", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" }
      ]
    }
  ],

  /* 仍需逐条核实的项目 */
  pending: [
    "鹿儿岛—种子岛渡轮/高速船/航班的班次、耗时与旺季订位规则。",
    "种子岛岛内巴士路线与班次；没有租车时的替代方案。",
    "飞驒市图书馆开馆时间与馆内拍摄规则（官网抓取失败）。",
    "落合巴士站的确切站牌位置与巴士班次（坐标目前是约值）。",
    "平塚综合体育馆的开放时间、周一休馆与入口展示是否可参观。",
    "镰仓 2025-09 拍照点试办结束后的长期规则。",
    "各神社/寺院的参拜时间与禁止拍摄区域。",
    "每个点位的“拍摄对比”仍需现场核对机位，本版只写文字提示，不用截图。"
  ],

  /* 页面级来源 */
  sources: [
    { t: "圣地地图 · 灌篮高手（8 处，含坐标与礼仪）", u: "https://screenpilgrimage.com/zh-Hans/title/slam-dunk/" },
    { t: "ETtoday 2025-09-15 · 镰仓市在踏切旁设拍照区", u: "https://www.ettoday.net/news/20250915/3033834.htm" },
    { t: "とある大人の備忘録 · 秒速5センチメートル 中種子・西之表編", u: "https://deep-adultweet.blog.jp/archives/29390035.html" },
    { t: "とある大人の備忘録 · 参宮橋・豪徳寺・代々木編", u: "https://deep-adultweet.blog.jp/archives/6414372.html" },
    { t: "JAXA · 種子島宇宙センター（开馆时间/休馆日）", u: "https://fanfun.jaxa.jp/visit/tanegashima/" },
    { t: "鹿児島県立種子島中央高等学校（地址）", u: "http://www.edu.pref.kagoshima.jp/sh/tanechuo/" },
    { t: "Wikipedia · 你的名字。（取景与设定参考）", u: "https://zh.wikipedia.org/wiki/%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97%E3%80%82" },
    { t: "国立新美術館（开馆时间/休馆日）", u: "https://www.nact.jp/" },
    { t: "飛騨市図書館（官网，开馆时间待核）", u: "https://www.hida-lib.jp/" },
    { t: "OpenStreetMap（底图与部分坐标核对）", u: "https://www.openstreetmap.org/copyright" }
  ]
};
