/* 釜山—对马—壹歧—福冈 · 点位数据
   坐标来自 OpenStreetMap / Nominatim 查询（2026-11-04）。
   approx: true 表示坐标按地址或相对位置估算，未逐点核对。 */
window.BTK_DATA = {
  maps: {
    tsushima: { center: [34.33, 129.30], zoom: 10 },
    fukuoka:  { center: [33.611, 130.39], zoom: 12 },
    busan:    { center: [35.17, 129.09], zoom: 11 }
  },
  kinds: {
    hotel:   { label: "住宿",   color: "#a94738" },
    port:    { label: "港口",   color: "#6b6258" },
    game:    { label: "游戏圣地", color: "#3f6b7d" },
    history: { label: "历史遗址", color: "#7a5c2e" },
    museum:  { label: "博物馆", color: "#4a4a6a" }
  },
  spots: [
    { map: "tsushima", kind: "hotel", name: "东横INN 对马比田胜", sub: "Toyoko Inn Tsushima Hitakatsu", lat: 34.6565, lng: 129.4735, approx: true, note: "上对马町西泊 1217-5；距比田胜港约 5 分车程" },
    { map: "tsushima", kind: "hotel", name: "东横INN 对马厳原", sub: "Toyoko Inn Tsushima Izuhara", lat: 34.2005, lng: 129.2885, approx: true, note: "厳原町今屋敷 771-1；距厳原港步行约 10 分" },
    { map: "tsushima", kind: "port", name: "比田勝港", sub: "Hitakatsu Port", lat: 34.6557, lng: 129.4692, note: "釜山航线的北侧入口；国际航站楼" },
    { map: "tsushima", kind: "port", name: "厳原港", sub: "Izuhara Port", lat: 34.1975, lng: 129.2920, note: "南侧入口；往壹歧和博多的船从这里开" },
    { map: "tsushima", kind: "port", name: "対馬やまねこ空港", sub: "Tsushima Airport", lat: 34.2846, lng: 129.3314, note: "ORC 往福冈／长崎；岛内巴士纵贯线的换乘点" },

    { map: "tsushima", kind: "game", name: "金田城跡", sub: "Kaneda Castle", lat: 34.3002, lng: 129.2754, note: "663 年白村江之战后筑的古代山城；游戏里「金田城」的原型。登山往返约 120 分" },
    { map: "tsushima", kind: "game", name: "小茂田浜神社", sub: "Komodahama Shrine", lat: 34.2343, lng: 129.1920, note: "1274 年元军登陆处；宗助国率约 80 骑迎战战死。游戏开场战场" },
    { map: "tsushima", kind: "game", name: "万松院", sub: "Mansho-in", lat: 34.2044, lng: 129.2842, note: "宗家菩提寺，132 段石阶；游戏里「黄金寺」意象的候选地" },
    { map: "tsushima", kind: "game", name: "和多都美神社", sub: "Watatsumi Shrine", lat: 34.3791, lng: 129.3119, note: "海上鸟居。2025 年起限制参拜，仅接待崇敬者，不要当打卡点" },
    { map: "tsushima", kind: "game", name: "烏帽子岳展望台", sub: "Eboshi-dake", lat: 34.3719, lng: 129.3144, note: "浅茅湾展望；直行巴士与包车都可停" },
    { map: "tsushima", kind: "history", name: "海神神社", sub: "Kaijin Shrine", lat: 34.4642, lng: 129.2833, note: "对马一宫，古代对外交流的神社；在峰町，南北纵贯线中途" },

    { map: "tsushima", kind: "history", name: "金石城跡", sub: "Kaneishi Castle", lat: 34.2035, lng: 129.2870, note: "宗氏居城（厳原陣屋）；城门前即对马博物馆" },
    { map: "tsushima", kind: "museum", name: "対馬博物館", sub: "Tsushima Museum", lat: 34.2035, lng: 129.2880, note: "2022 年开馆；宗家文书、元寇与朝鲜通信使相关藏品" },
    { map: "tsushima", kind: "history", name: "清水山城跡", sub: "Shimizuyama Castle", lat: 34.2078, lng: 129.2890, approx: true, note: "1591 年丰臣秀吉下令筑，朝鲜出兵的前线基地；国指定史迹。在金石城背后山上" },

    { map: "fukuoka", kind: "museum", name: "元寇史料館", sub: "Genko Historical Museum", lat: 33.6072, lng: 130.4204, note: "博多区东公园内；10:00—16:00，无休，300 円" },
    { map: "fukuoka", kind: "history", name: "筥崎宮", sub: "Hakozaki-gu", lat: 33.6175, lng: 130.4154, note: "文永之役中遭兵火；「敌国降伏」的由来之地" },
    { map: "fukuoka", kind: "history", name: "元寇防塁（生の松原）", sub: "Genko Borui", lat: 33.6101, lng: 130.2528, note: "1281 年为防再次来袭所筑的石垒，今津一带有现存段" },
    { map: "fukuoka", kind: "port", name: "博多港", sub: "Hakata Port", lat: 33.6283, lng: 130.3569, note: "壹歧、对马航线的福冈侧码头；离元寇史料館不远" },

    { map: "busan", kind: "history", name: "東莱邑城", sub: "동래읍성 / Dongnae Eupseong", lat: 35.2092, lng: 129.0878, note: "1592 年壬辰倭乱，东莱府使宋象贤死守之城" },
    { map: "busan", kind: "history", name: "子城台（釜山鎮城）", sub: "자성대 / Jaseongdae", lat: 35.1360, lng: 129.0629, note: "1592 年釜山鎮之战的发生地；后为倭城" },
    { map: "busan", kind: "history", name: "忠烈祠", sub: "충렬사 / Chungnyeolsa", lat: 35.1997, lng: 129.0977, note: "供奉壬辰倭乱釜山战死者；釜山最直接的战争记忆场所" }
  ]
};
