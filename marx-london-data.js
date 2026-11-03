/* 跟随马克思在伦敦漫步 · 数据 v0.2（资料版） */
window.MARX_LONDON = {
  meta: {
    version: "0.2",
    date: "2026-11-03",
    checked: "2026-11-03",
    title: "跟随马克思在伦敦漫步",
    note: "按区归档的史料版：9 个点，路线顺序未定"
  },

  statuses: [
    { id: "standing",   label: "原建筑还在",     color: "#2f5d46", note: "建筑本体可指认" },
    { id: "demolished", label: "已拆，只剩址",   color: "#8a6a4f", note: "原建筑不在了" },
    { id: "burial",     label: "墓与墓园",       color: "#4a4a52", note: "实地可拜" },
    { id: "memorial",   label: "后来立的纪念物", color: "#9c3b2e", note: "碑、牌、雕塑" },
    { id: "unverified", label: "文献待考",       color: "#7a7a72", note: "有记载，位置未定" }
  ],

  areas: [
    {
      id: "soho",
      name: "Soho · Piccadilly",
      kicker: "第一段 · 跟团所在地",
      lat: 51.5126, lng: -0.1334, zoom: 16,
      desc: "马克思 1851–1856 年的住处与共产主义者同盟的开会地点。这一段和 Marx Walks 的周日团几乎重合。"
    },
    {
      id: "bloomsbury",
      name: "Bloomsbury · 大英博物馆",
      kicker: "第二段 · 单点",
      lat: 51.5193, lng: -0.1267, zoom: 16,
      desc: "《资本论》的资料来源地。离 Soho 步行 15 分钟，可以顺路，也可以单列。"
    },
    {
      id: "clerkenwell",
      name: "Clerkenwell · 马克思纪念图书馆",
      kicker: "第三段 · 单点",
      lat: 51.5230, lng: -0.1057, zoom: 16,
      desc: "常被误当成「马克思来过的地方」。实际上他没来过；这里是 1933 年建的纪念机构，列宁在此编过《火星报》。"
    },
    {
      id: "north-london",
      name: "Kentish Town · Maitland Park",
      kicker: "第四段 · 北伦敦",
      lat: 51.5485, lng: -0.1554, zoom: 15,
      desc: "1856 年后的三处住处：Grafton Terrace 还在，Maitland Park Road 的两处都已拆。"
    },
    {
      id: "highgate",
      name: "Highgate · 墓园",
      kicker: "第五段 · 墓园",
      lat: 51.5678, lng: -0.1486, zoom: 15,
      desc: "马克思墓。离北伦敦段约 2 公里，公交或步行都可接。"
    },
    {
      id: "primrose-hill",
      name: "Primrose Hill · 恩格斯",
      kicker: "可选 · 主题待定",
      lat: 51.5419, lng: -0.1569, zoom: 15,
      desc: "恩格斯 1870 年后的住处。是否纳入主线，取决于主题范围怎么定。"
    }
  ],

  points: [
    {
      id: "great-windmill",
      n: 1,
      zh: "20 Great Windmill Street · 红狮酒馆旧址",
      en: "20 Great Windmill Street (former Red Lion)",
      kind: "集会地",
      area: "soho",
      status: "standing",
      plaque: "unknown",
      address: "20 Great Windmill Street, Soho, W1D 7LA",
      lat: 51.511401, lng: -0.134337, approx: true,
      years: "1847 年 11–12 月",
      access: "enter",
      visit: "现为 Be At One 酒吧。营业时间随店家，未核。",
      note: "1793 年建成的红狮酒馆，在 Archer Street 转角。1847 年 11–12 月，共产主义者同盟第二次代表大会在楼上房间举行，马克思与恩格斯在此受托起草《共产党宣言》。这里也是德国工人教育协会在伦敦的据点。酒馆约 2005 年停业，2013 年起是 Be At One 鸡尾酒吧，室内已无当年格局，只能凭街面和楼层想象。",
      sources: ["Wikipedia: Great Windmill Street", "marxwalks.com"]
    },
    {
      id: "dean-street",
      n: 2,
      zh: "28 Dean Street",
      en: "28 Dean Street",
      kind: "住处",
      area: "soho",
      status: "standing",
      plaque: "yes",
      address: "28 Dean Street, Soho, W1D 3RY",
      lat: 51.513905, lng: -0.132645, approx: true,
      years: "1851–1856",
      access: "exterior-only",
      visit: "地面层是 Quo Vadis 餐厅。蓝牌在建筑外墙上，站在街上可看。",
      note: "马克思一家 1851–1856 年住这里，之前短暂住在同街 64 号（已拆）。最初只有二楼两间房，后来加租一间当书房。两个孩子在此时夭折，女儿 Eleanor 1855 年在此出生。马克思在这一时期写作《资本论》第一卷（1867 年出版），并长期去大英博物馆查资料。1967 年由大伦敦议会设蓝牌，铭文只有姓名、生卒年和「lived here 1851-56」——没有写他做了什么。",
      sources: ["English Heritage 蓝牌页", "English Heritage 博客"]
    },
    {
      id: "british-museum",
      n: 3,
      zh: "大英博物馆 · 圆形阅览室",
      en: "British Museum Round Reading Room",
      kind: "写作地",
      area: "bloomsbury",
      status: "standing",
      plaque: "no",
      address: "Great Russell Street, Bloomsbury, WC1B 3DG",
      lat: 51.519312, lng: -0.126705, approx: false,
      years: "1850 年代起",
      access: "enter",
      visit: "2024 年 7 月起对一般观众开放。时段随博物馆安排，未在官网二次确认。",
      note: "马克思 1850 年代取得大英博物馆读者证，在此为《资本论》做笔记和引证。要注意时序：圆形阅览室 1857 年 5 月才启用，他此前用的是博物馆更早的阅览空间，不是这座圆顶大厅。现在进馆免费，但阅览室是否当日常开放，要当天看博物馆的指引。",
      sources: ["Wikipedia: British Museum Reading Room", "English Heritage 博客"]
    },
    {
      id: "mml",
      n: 4,
      zh: "马克思纪念图书馆",
      en: "Marx Memorial Library & Workers' School",
      kind: "机构",
      area: "clerkenwell",
      status: "standing",
      plaque: "unknown",
      address: "37a Clerkenwell Green, EC1R 0DU",
      lat: 51.523004, lng: -0.105740, approx: false,
      years: "1933 年建馆",
      access: "enter",
      visit: "导览：周一 12:00、周四 16:00，£10 / £5。阅览室：周二至周四 11:00–16:00，须预约。周五至周日闭馆。",
      note: "1933 年建馆，收马克思主义、社会主义与工人运动的文献和档案。建筑本身 1738 年是威尔士慈善学校，后来成为 20 世纪出版社，列宁 1902–1903 年流亡伦敦时在此编辑《火星报》。关键一句：马克思本人没有到过这里。英国遗产的说法是「据我们所知，他从未踏足」。v0.1 页面写的「马克思曾在此相关建筑活动」是错的，这一版已删。",
      sources: ["MML 官网 Visit / About / Marx House", "English Heritage 博客"]
    },
    {
      id: "highgate",
      n: 5,
      zh: "Highgate Cemetery · 马克思墓",
      en: "Karl Marx grave, Highgate Cemetery",
      kind: "墓",
      area: "highgate",
      status: "burial",
      plaque: "no",
      address: "Swain's Lane, Highgate, N6 6PJ",
      lat: 51.567776, lng: -0.148594, approx: false,
      years: "1883 年 3 月去世后葬此",
      access: "enter",
      visit: "3–10 月 10:00–17:00（16:30 停止入场）；11–2 月 10:00–16:00（15:30 停止入场）。门票含东西两侧，票价以官网为准，导览成人 £18。",
      note: "墓在东墓区，从 East 入口进最近。东侧坡缓、无台阶，比西侧好走。现有墓碑和胸像是后来立的，具体年份和作者待核，先不写死。墓园仍在运营，也是慈善机构，收入靠门票；园内禁止饮食、禁止攀爬墓碑，拍照仅限手持相机。",
      sources: ["Highgate Cemetery 官网 Visit", "English Heritage 博客"]
    },
    {
      id: "grafton-terrace",
      n: 6,
      zh: "46 Grafton Terrace（旧 9 号）",
      en: "46 Grafton Terrace (formerly 9)",
      kind: "住处",
      area: "north-london",
      status: "standing",
      plaque: "no",
      address: "46 Grafton Terrace, Kentish Town, NW5",
      lat: 51.549772, lng: -0.155105, approx: true,
      years: "1856 年 10 月 – 1864 年 3 月",
      access: "exterior-only",
      visit: "仍是民居，只能看外观。没有任何牌。",
      note: "马克思一家 1856 年 10 月搬来，1864 年 3 月离开。所在这一侧街面基本保持 1860 年代的样子，是他在伦敦住过的地方里保存最完整的一处。但至今没有蓝牌也没有区牌——Camden 和 English Heritage 都没设。旧门牌是 9 号，现在是 46 号，找的时候认新号。",
      sources: ["Marxists.org 图像库", "English Heritage 博客"]
    },
    {
      id: "modena-villas",
      n: 7,
      zh: "1 Modena Villas（今 Maitland Park Road 1 号旧址）",
      en: "1 Modena Villas / 1 Maitland Park Road",
      kind: "住处",
      area: "north-london",
      status: "demolished",
      plaque: "no",
      address: "Maitland Park Road, NW3（今 The Grange 公寓一带）",
      lat: 51.547813, lng: -0.155650, approx: true,
      years: "1864–1875（待核）",
      access: "not-visible",
      visit: "原建筑已拆。现址是约 1900 年建的 The Grange 公寓，无任何标识。",
      note: "离开 Grafton Terrace 后马克思搬到这里，当时叫 1 Modena Villas，后来门牌重编为 1 Maitland Park Road。原房已拆，现在是约 1900 年建的公寓楼 The Grange，没有任何纪念标识。这一段只能讲「地址」，看不到东西。",
      sources: ["Marxists.org 图像库"]
    },
    {
      id: "maitland-41",
      n: 8,
      zh: "41 Maitland Park Road（旧址）",
      en: "41 Maitland Park Road (site)",
      kind: "住处",
      area: "north-london",
      status: "demolished",
      plaque: "yes",
      address: "Maitland Park estate, NW3",
      lat: 51.5478, lng: -0.1550, approx: true,
      years: "1875–1883",
      access: "exterior-only",
      visit: "原址是 Camden 的 Maitland Park 住宅区。墙上有 Camden 议会牌，街上可看。",
      note: "马克思 1875 年搬来，1883 年 3 月在此去世。二战轰炸后整片拆除，1950 年代末建成 Maitland Park 住宅区。1935 年这里设过第一块蓝牌，被破坏；补设的又被破坏，房主拒绝再设第三块。现在墙上的是 Camden 议会后来立的牌，铭文写「lived and died in a house on this site, 1875–1883」。",
      sources: ["English Heritage 蓝牌页", "London Remembers", "Marxists.org 图像库"]
    },
    {
      id: "regents-park-122",
      n: 9,
      zh: "122 Regent's Park Road（恩格斯住处）",
      en: "122 Regent's Park Road",
      kind: "住处",
      area: "primrose-hill",
      status: "standing",
      plaque: "yes",
      address: "122 Regent's Park Road, NW1",
      lat: 51.541854, lng: -0.156911, approx: true,
      years: "1870–1895（待核）",
      access: "exterior-only",
      visit: "民居，蓝牌在墙上，只能看外观。",
      note: "恩格斯 1870 年搬来，1895 年在此去世。房子基本没变，墙上有 GLC 蓝牌。起止年份两处来源略有出入（Marxists.org 记 1870–94），待核。是否纳入主线，取决于「只做马克思还是加上恩格斯」。",
      sources: ["Marxists.org 图像库", "English Heritage 博客"]
    }
  ],

  tour: {
    name: "Karl Marx Walking Tour",
    org: "Marx Walks",
    site: "https://www.marxwalks.com/",
    weekly: "每周日 11:00–13:30（约 2.5 小时）",
    price: "£20，低收入优惠 £10（另加 Eventbrite 手续费）",
    meet: "Piccadilly Circus，Criterion Theatre / Eros 雕像前",
    firstStop: "Be At One 酒吧，20 Great Windmill Street W1D 7LA，约 11:30 离开",
    scope: "范围在 Soho 与 Piccadilly 一带：马克思居住和工作过的地方，外加 1848 年革命与 1871 年巴黎公社的讲解。不含 Clerkenwell、北伦敦、Highgate。",
    camden: "另有「Marx and Engels in Camden」团，一般每月第一个周六 11:00，Chalk Farm 站出口集合。",
    guide: "Heiko Khoo、Mark Bygrave；Heiko Khoo 是 2018 年《Karl Marx in London》指南的作者之一。",
    note: "这条商业团只覆盖本页的第一段（Soho）。其余四段要自己走。"
  },

  sources: [
    { label: "Marx Walks 官网", url: "https://www.marxwalks.com/" },
    { label: "Marx Walks · Camden 团", url: "https://www.marxwalks.com/camden.html" },
    { label: "English Heritage · Karl Marx 蓝牌", url: "https://www.english-heritage.org.uk/visit/blue-plaques/karl-marx/" },
    { label: "English Heritage · Karl Marx: the London connections", url: "https://www.english-heritage.org.uk/visit/inspire-me/blog/blog-posts/karl-marx-london-connections/" },
    { label: "Marx Memorial Library · Visit", url: "https://www.marx-memorial-library.org.uk/" },
    { label: "Marx Memorial Library · Marx House", url: "https://www.marx-memorial-library.org.uk/about/building-marx-house" },
    { label: "Highgate Cemetery · Visitor information", url: "https://highgatecemetery.org/visit" },
    { label: "Wikipedia · British Museum Reading Room", url: "https://en.wikipedia.org/wiki/British_Museum_Reading_Room" },
    { label: "Wikipedia · Great Windmill Street", url: "https://en.wikipedia.org/wiki/Great_Windmill_Street" },
    { label: "Marxists.org · Marx/Engels Places Image Library: London", url: "https://www.marxists.info/archive/marx/photo/london/index.htm" },
    { label: "London Remembers · Karl Marx - NW3", url: "https://www.londonremembers.com/memorials/karl-marx-nw3" }
  ],

  todo: [
    "Highgate：墓碑与胸像的设立年份、作者；1956 年迁葬的说法待核。",
    "Highgate：单人门票价格（官网只列了导览 £18）。",
    "大英博物馆：圆形阅览室当前的开放时段与是否需预约。",
    "Marx Memorial Library：2026 年 11 月 30 日之后导览是否暂停、2027 年安排。",
    "Modena Villas / Maitland Park Road 41：确切居住起止年份。",
    "Grafton Terrace：门牌新旧编号的对应关系再确认一次。",
    "20 Great Windmill Street：是否有官方 plaque（区牌或蓝牌）。",
    "恩格斯 122 Regent's Park Road：起止年份（1870–94 还是 1870–95）。"
  ]
};
