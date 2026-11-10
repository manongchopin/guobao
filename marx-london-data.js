/* 跟随马克思在伦敦漫步 · 数据 v0.3（两天路线版） */
window.MARX_LONDON = {
  meta: {
    version: "0.3",
    date: "2026-11-10",
    checked: "2026-11-10",
    title: "跟随马克思在伦敦漫步",
    note: "11 个点 · 两天路线 · 每天街面 2–4 公里"
  },

  statuses: [
    { id: "standing",   label: "原建筑还在",     color: "#2f5d46", note: "建筑本体可指认" },
    { id: "demolished", label: "已拆，只剩址",   color: "#8a6a4f", note: "原建筑不在了" },
    { id: "burial",     label: "墓与墓园",       color: "#4a4a52", note: "实地可拜" },
    { id: "memorial",   label: "后来立的纪念物", color: "#9c3b2e", note: "牌、壁画、雕塑" },
    { id: "unverified", label: "文献待考",       color: "#7a7a72", note: "有记载，现状未核" }
  ],

  areas: [
    {
      id: "chelsea",
      name: "Chelsea · Anderson Street",
      kicker: "序章 · 可选",
      lat: 51.4906, lng: -0.1627, zoom: 16,
      desc: "1849 年马克思一家到伦敦的第一处住处。离 Soho 四公里，不顺路，单独走半小时。"
    },
    {
      id: "soho",
      name: "Soho · Piccadilly",
      kicker: "第一天 · 跟团所在地",
      lat: 51.5126, lng: -0.1334, zoom: 16,
      desc: "住处、集会地和一幅壁画：1851–1856 年的 Dean Street、共产主义者同盟开会的红狮，以及 1991 年的 Spirit of Soho。"
    },
    {
      id: "bloomsbury",
      name: "Bloomsbury · 大英博物馆",
      kicker: "第一天 · 单点",
      lat: 51.5193, lng: -0.1267, zoom: 16,
      desc: "《资本论》的资料来源地。离 Soho 步行一公里，顺路。"
    },
    {
      id: "clerkenwell",
      name: "Clerkenwell · 马克思纪念图书馆",
      kicker: "第一天 · 单点",
      lat: 51.5230, lng: -0.1057, zoom: 16,
      desc: "常被误当成「马克思来过的地方」。实际上他没来过；这里是 1933 年建的纪念机构，列宁在此编过《火星报》。"
    },
    {
      id: "north-london",
      name: "Kentish Town · Maitland Park",
      kicker: "第二天 · 北伦敦",
      lat: 51.5485, lng: -0.1554, zoom: 15,
      desc: "1856 年后的三处住处：Grafton Terrace 还在，Maitland Park Road 的两处都已拆。"
    },
    {
      id: "highgate",
      name: "Highgate · 墓园",
      kicker: "第二天 · 墓园",
      lat: 51.5678, lng: -0.1486, zoom: 15,
      desc: "马克思墓。从北伦敦坐两站地铁，再上坡走一刻钟。"
    },
    {
      id: "primrose-hill",
      name: "Primrose Hill · 恩格斯",
      kicker: "可选 · 主题待定",
      lat: 51.5419, lng: -0.1569, zoom: 15,
      desc: "恩格斯 1870 年后的住处。可加进第二天上午。"
    }
  ],

  points: [
    {
      id: "anderson",
      n: 1,
      zh: "4 Anderson Street（切尔西）",
      en: "4 Anderson Street, Chelsea",
      kind: "住处",
      area: "chelsea",
      status: "unverified",
      plaque: "no",
      address: "4 Anderson Street, Chelsea, SW3 3LU",
      lat: 51.490605, lng: -0.162657, approx: true,
      years: "1849–1850（待核）",
      access: "exterior-only",
      visit: "普通住宅街，没有牌。地址还在，具体哪栋是当年那栋没核。",
      note: "马克思一家 1849 年 8 月到伦敦后的第一处住处。第四个儿子 Henry Edward Guy 1849 年 11 月 5 日在这里出生，家里叫他 Guido，次年夭折。之后短暂住过 Leicester Square 附近的德国旅馆，才搬到 Dean Street。这条街现在都是住宅，没有纪念标识。",
      sources: ["Penguin: Take a tour of Karl Marx's London", "London Remembers（转引 IFS）"]
    },
    {
      id: "great-windmill",
      n: 2,
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
      id: "spirit-of-soho",
      n: 3,
      zh: "Spirit of Soho 壁画",
      en: "Spirit of Soho Mural",
      kind: "纪念物",
      area: "soho",
      status: "memorial",
      plaque: "no",
      address: "Broadwick Street 西端，Carnaby Street 转角，W1F 9PE",
      lat: 51.512738, lng: -0.138219, approx: false,
      years: "1991 年完成",
      access: "exterior-only",
      visit: "在街上就能看，全天可见。整点留意钟：马克思会喝一口可乐。",
      note: "Soho 社区的公共艺术项目，1989–1991 年做成，Free Form Arts Trust 设计制作，Wereldhave 出资，1991 年完成。圣安妮的裙摆画成 Soho 地图，底部一排 Soho 名人里有马克思——他在这里是「Soho 的一张面孔」，不是居民纪念。2006 年由 Shaftesbury 和 Soho Society 修复、时钟重启，2026 年又修了一次。",
      sources: ["Shaftesbury Capital（2026-07-27）", "London Remembers", "Street Art Cities"]
    },
    {
      id: "dean-street",
      n: 4,
      zh: "28 Dean Street（Quo Vadis）",
      en: "28 Dean Street / Quo Vadis",
      kind: "住处",
      area: "soho",
      status: "standing",
      plaque: "yes",
      address: "28 Dean Street, Soho, W1D 3RY",
      lat: 51.513905, lng: -0.132645, approx: true,
      years: "1851–1856",
      access: "exterior-only",
      visit: "地面层是 Quo Vadis 餐厅，蓝牌在外墙上，街上可看。餐厅有可预订的 Marx Room，属于商业说法，不是故居陈列。",
      note: "马克思一家 1851–1856 年住这里，之前短暂住在同街 64 号（已拆）。最初只有二楼两间房，后来加租一间当书房。两个孩子在此时夭折，女儿 Eleanor 1855 年在此出生。马克思在这一时期写作《资本论》第一卷（1867 年出版），并长期去大英博物馆查资料。1967 年由大伦敦议会设蓝牌，铭文只有姓名、生卒年和「lived here 1851-56」。",
      sources: ["English Heritage 蓝牌页", "English Heritage 博客", "Penguin"]
    },
    {
      id: "british-museum",
      n: 5,
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
      note: "马克思 1850 年代取得大英博物馆读者证，在此为《资本论》做笔记和引证。要注意时序：圆形阅览室 1857 年 5 月才启用，他此前用的是博物馆更早的阅览空间，不是这座圆顶大厅。常被引用的「固定座位 G7」来自 IFS 的转述，未见馆方确认，当逸闻听。",
      sources: ["Wikipedia: British Museum Reading Room", "English Heritage 博客", "London Remembers（转引 IFS）"]
    },
    {
      id: "mml",
      n: 6,
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
      note: "1933 年建馆，收马克思主义、社会主义与工人运动的文献和档案。建筑本身 1738 年是威尔士慈善学校，后来成为 20 世纪出版社，列宁 1902–1903 年流亡伦敦时在此编辑《火星报》。关键一句：马克思本人没有到过这里。英国遗产的说法是「据我们所知，他从未踏足」。",
      sources: ["MML 官网 Visit / About / Marx House", "English Heritage 博客"]
    },
    {
      id: "grafton-terrace",
      n: 7,
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
      note: "马克思一家 1856 年 10 月搬来，1864 年 3 月离开。所在这一侧街面基本保持 1860 年代的样子，是他在伦敦住过的地方里保存最完整的一处。但至今没有蓝牌也没有区牌——Camden 和 English Heritage 都没设。旧门牌是 9 号，现在是 46 号，找的时候认新号。恩格斯在曼彻斯特时每年资助约 £350。",
      sources: ["Marxists.org 图像库", "English Heritage 博客", "Penguin"]
    },
    {
      id: "modena-villas",
      n: 8,
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
      sources: ["Marxists.org 图像库", "Penguin"]
    },
    {
      id: "maitland-41",
      n: 9,
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
      id: "highgate",
      n: 10,
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
      id: "regents-park-122",
      n: 11,
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

  route: {
    intro: "两天，由南往北：第一天中心区，第二天北边。街面步行第一天约 4 公里、第二天约 2 公里，留够吃饭和进馆的时间；不是打卡速度。",
    days: [
      {
        id: "d1",
        no: "第一天",
        title: "Soho → 大英博物馆 → Clerkenwell",
        km: "街面 3.8 km（步行路由实测），约 1 小时",
        span: "09:50–15:30",
        color: "#a8402f",
        lines: [[[51.51015,-0.13394],[51.51019,-0.13426],[51.51061,-0.13394],[51.51069,-0.13409],[51.51084,-0.13401],[51.51139,-0.13433],[51.51292,-0.13623],[51.51254,-0.13728],[51.51299,-0.13770],[51.51273,-0.13821],[51.51310,-0.13768],[51.51407,-0.13447],[51.51422,-0.13454],[51.51466,-0.13311],[51.51391,-0.13265],[51.51495,-0.13330],[51.51579,-0.13029],[51.51633,-0.13050],[51.51650,-0.13028],[51.51669,-0.13032],[51.51707,-0.13063],[51.51775,-0.12772],[51.51847,-0.12573],[51.51988,-0.12201],[51.51937,-0.12144],[51.51919,-0.12096],[51.52003,-0.11942],[51.52159,-0.11347],[51.52207,-0.11092],[51.52222,-0.10751],[51.52289,-0.10562],[51.52300,-0.10574]]],
        stops: [
          { t: "09:50", at: "Piccadilly Circus", note: "Criterion Theatre 前，Marx Walks 团的集合点，不是马克思的地址" },
          { t: "10:00", pid: "great-windmill", note: "红狮旧址，街上看看，酒吧上午没开" },
          { t: "10:25", pid: "spirit-of-soho", note: "沿 Great Windmill 北上，400 m" },
          { t: "10:55", pid: "dean-street", note: "550 m，蓝牌在 Quo Vadis 外墙上" },
          { t: "11:20", pid: "british-museum", note: "1 km，约 12 分钟" },
          { t: "13:00", at: "Bloomsbury 午餐", note: "博物馆一带，选离馆近的" },
          { t: "14:15", pid: "mml", note: "2 km，约 25 分钟；或地铁到 Farringdon" },
          { t: "15:30", at: "Farringdon", note: "结束，Circle / Metropolitan / Elizabeth 线" }
        ],
        note: "要把 MML 导览排进去，得按星期调整：周一的导览 12:00，就上午先去 Clerkenwell、下午回 Soho 和博物馆；周四是 16:00，则先走 Soho 和博物馆，15:45 到 Clerkenwell。阅览室周二至周四 11:00–16:00，须提前邮件预约。"
      },
      {
        id: "d2",
        no: "第二天",
        title: "Kentish Town → Maitland Park → Highgate",
        km: "街面 3.7 km + 墓园内约 1 km；中间两站地铁",
        span: "09:50–15:00",
        color: "#1d2622",
        lines: [[[51.55046,-0.14073],[51.54918,-0.14098],[51.54982,-0.14412],[51.54941,-0.14529],[51.54860,-0.14678],[51.54890,-0.14750],[51.54851,-0.14971],[51.54860,-0.15049],[51.55035,-0.15206],[51.54990,-0.15345],[51.54960,-0.15659],[51.54941,-0.15662],[51.54928,-0.15610],[51.54880,-0.15593],[51.54852,-0.15543],[51.54749,-0.15580],[51.54693,-0.15626],[51.54630,-0.15584],[51.54579,-0.15573],[51.54587,-0.15471],[51.54783,-0.15418],[51.54796,-0.15493],[51.54780,-0.15500]],
          [[51.56536,-0.13417],[51.56668,-0.13730],[51.56816,-0.13989],[51.56903,-0.14200],[51.56991,-0.14357],[51.57024,-0.14461],[51.57032,-0.14541],[51.57021,-0.14547],[51.57040,-0.14630],[51.56970,-0.14825],[51.56826,-0.14700],[51.56778,-0.14859]]],
        gap: [[51.54780,-0.15500],[51.56536,-0.13417]],
        stops: [
          { t: "09:50", at: "Kentish Town 站", note: "Northern 线，出站往西" },
          { t: "10:05", pid: "grafton-terrace", note: "1.2 km，认 46 号" },
          { t: "10:35", pid: "modena-villas", note: "650 m，The Grange 公寓" },
          { t: "10:55", pid: "maitland-41", note: "就在旁边，墙上有 Camden 牌" },
          { t: "11:30", at: "Kentish Town 午餐", note: "往回走，或就近咖啡" },
          { t: "12:40", at: "地铁两站", note: "Kentish Town → Archway，约 4 分钟" },
          { t: "13:00", at: "Swain's Lane 上坡", note: "Archway 出站步行 1.3 km，约 15–18 分钟，全程上坡" },
          { t: "13:20", pid: "highgate", note: "东墓区入口，先看马克思墓" },
          { t: "14:45", at: "出园", note: "时间够的话去西墓区；票含两侧" }
        ],
        note: "第二天步行少，但有一段上坡。墓园每天开；两天顺序可以按自己的星期调换，只有 MML 的导览受周一、周四限制。"
      }
    ],
    optional: [
      {
        pid: "anderson",
        title: "切尔西序章",
        note: "4 Anderson Street 离 Piccadilly Circus 4 km，不顺路。放在第一天之前，或单独半小时；现场只有普通住宅街，没有牌，适合「只为站一下」的人。"
      },
      {
        pid: "regents-park-122",
        title: "恩格斯一处",
        note: "122 Regent's Park Road 在 Primrose Hill，从 Grafton Terrace 步行约 2 km。第二天上午加 30 分钟。"
      }
    ]
  },

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
    note: "这条商业团只覆盖第一天上午。第二天完全自己走。"
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
    { label: "London Remembers · Karl Marx", url: "https://www.londonremembers.com/subjects/karl-marx" },
    { label: "London Remembers · Spirit of Soho Mural", url: "https://www.londonremembers.com/memorials/spirit-of-soho-mural" },
    { label: "Penguin · Take a tour of Karl Marx's London（2018）", url: "https://www.penguin.co.uk/discover/articles/karl-marx-london-map" },
    { label: "Shaftesbury Capital · Spirit of Soho 修复（2026-07-27）", url: "https://www.shaftesburycapital.com/news-insights/2026/beloved-spirit-of-soho-mural-to-be-celebrated-after-restoration" },
    { label: "Street Art Cities · Spirit of Soho Mural", url: "https://streetartcities.com/markers/5423c35a-fe29-4151-a8d1-a09b3d64fafd" }
  ],

  todo: [
    "4 Anderson Street：确认具体哪栋、是否 1849 年原建筑；现无任何标识。",
    "Highgate：墓碑与胸像的设立年份、作者；1956 年迁葬的说法待核。",
    "Highgate：单人门票价格（官网只列了导览 £18）。",
    "大英博物馆：圆形阅览室当前的开放时段与是否需预约。",
    "Marx Memorial Library：2026 年 11 月 30 日之后导览是否暂停、2027 年安排。",
    "Modena Villas / 41 Maitland Park：确切居住起止年份。",
    "恩格斯 122 Regent's Park Road：起止年份（1870–94 还是 1870–95）。",
    "路线：第一天 4.2 km 是直线×1.35 估算，实际街面要等走过一次再定。"
  ]
};
