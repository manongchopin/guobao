/* 体育排名：榜单数据
   页面：sports-rankings.html

   每个榜单独占一个 panel。约定：
   - status: "ok"      已接入真实数据，rows 非空
   - status: "pending" 数据源尚未接通，rows 为空，页面显示「待接入」
   rows 里一条记录：
   { rank: 名次, name: 外文原名, nameZh: 中文译名(可空), country: 三字代码, countryZh: 中文国名, points: 积分 }

   fetchedAt 是本地抓取时间，不是官方"榜单截至日"——官方页面没给明确日期时，
   只写抓取时间，不要编一个"截至日"。

   数据来源见每个 panel 的 source / sourceLabel，页面底部会原样展示。 */
window.SPORTS_RANKINGS = {
  fetchedAt: "2026-11-03T18:41:44+08:00",
  panels: {
    snooker: {
      id: "snooker",
      title: "斯诺克",
      sub: "世界排名 · 前 32",
      status: "pending",
      source: "https://www.wst.tv/rankings/",
      sourceLabel: "WST 官方世界排名",
      note: "WST 官网的榜单由前端脚本渲染，HTML 里没有排名数据，直接抓取拿不到表。待确定数据源后再接入。",
      rows: []
    },
    atp: {
      id: "atp",
      title: "ATP",
      sub: "单打排名 · 前 32",
      status: "pending",
      source: "https://www.atptour.com/en/rankings/singles",
      sourceLabel: "ATP 官方单打排名",
      note: "ATP 官网对抓取返回 403（Cloudflare 拦截），需要换源或改用手动快照。",
      rows: []
    },
    wta: {
      id: "wta",
      title: "WTA",
      sub: "单打排名 · 前 32",
      status: "ok",
      source: "https://www.wtatennis.com/rankings/singles",
      sourceLabel: "WTA 官方单打排名",
      note: "中文译名待统一校订，暂时只显示外文原名；国家用中文名。",
      rows: [
        { rank: 1,  name: "Elena Rybakina",      nameZh: "", country: "KAZ", countryZh: "哈萨克斯坦", points: "8,099" },
        { rank: 2,  name: "Aryna Sabalenka",     nameZh: "", country: "BLR", countryZh: "白俄罗斯",   points: "6,485" },
        { rank: 3,  name: "Mirra Andreeva",      nameZh: "", country: "RUS", countryZh: "俄罗斯",     points: "6,306" },
        { rank: 4,  name: "Coco Gauff",          nameZh: "", country: "USA", countryZh: "美国",       points: "5,763" },
        { rank: 5,  name: "Jessica Pegula",      nameZh: "", country: "USA", countryZh: "美国",       points: "5,760" },
        { rank: 6,  name: "Elina Svitolina",     nameZh: "", country: "UKR", countryZh: "乌克兰",     points: "5,121" },
        { rank: 7,  name: "Karolina Muchova",    nameZh: "", country: "CZE", countryZh: "捷克",       points: "4,665" },
        { rank: 8,  name: "Linda Noskova",       nameZh: "", country: "CZE", countryZh: "捷克",       points: "4,343" },
        { rank: 9,  name: "Iga Swiatek",         nameZh: "", country: "POL", countryZh: "波兰",       points: "4,188" },
        { rank: 10, name: "Marta Kostyuk",       nameZh: "", country: "UKR", countryZh: "乌克兰",     points: "3,910" },
        { rank: 11, name: "Diana Shnaider",      nameZh: "", country: "RUS", countryZh: "俄罗斯",     points: "3,238" },
        { rank: 12, name: "Maja Chwalinska",     nameZh: "", country: "POL", countryZh: "波兰",       points: "3,016" },
        { rank: 13, name: "Iva Jovic",           nameZh: "", country: "USA", countryZh: "美国",       points: "2,941" },
        { rank: 14, name: "Elise Mertens",       nameZh: "", country: "BEL", countryZh: "比利时",     points: "2,540" },
        { rank: 15, name: "Sorana Cirstea",      nameZh: "", country: "ROU", countryZh: "罗马尼亚",   points: "2,386" },
        { rank: 16, name: "Naomi Osaka",         nameZh: "", country: "JPN", countryZh: "日本",       points: "2,315" },
        { rank: 17, name: "Alexandra Eala",      nameZh: "", country: "PHI", countryZh: "菲律宾",     points: "2,289" },
        { rank: 18, name: "Leylah Fernandez",    nameZh: "", country: "CAN", countryZh: "加拿大",     points: "2,201" },
        { rank: 19, name: "Belinda Bencic",      nameZh: "", country: "SUI", countryZh: "瑞士",       points: "2,168" },
        { rank: 20, name: "Victoria Mboko",      nameZh: "", country: "CAN", countryZh: "加拿大",     points: "2,143" },
        { rank: 21, name: "Qinwen Zheng",        nameZh: "", country: "CHN", countryZh: "中国",       points: "2,017" },
        { rank: 22, name: "Amanda Anisimova",    nameZh: "", country: "USA", countryZh: "美国",       points: "1,963" },
        { rank: 23, name: "Marie Bouzkova",      nameZh: "", country: "CZE", countryZh: "捷克",       points: "1,959" },
        { rank: 24, name: "Madison Keys",        nameZh: "", country: "USA", countryZh: "美国",       points: "1,921" },
        { rank: 25, name: "Jelena Ostapenko",    nameZh: "", country: "LAT", countryZh: "拉脱维亚",   points: "1,916" },
        { rank: 26, name: "Anna Kalinskaya",     nameZh: "", country: "RUS", countryZh: "俄罗斯",     points: "1,913" },
        { rank: 27, name: "Anastasia Potapova",  nameZh: "", country: "AUT", countryZh: "奥地利",     points: "1,814" },
        { rank: 28, name: "Emma Navarro",        nameZh: "", country: "USA", countryZh: "美国",       points: "1,794" },
        { rank: 29, name: "Nikola Bartunkova",   nameZh: "", country: "CZE", countryZh: "捷克",       points: "1,711" },
        { rank: 30, name: "Maria Sakkari",       nameZh: "", country: "GRE", countryZh: "希腊",       points: "1,682" },
        { rank: 31, name: "Ann Li",              nameZh: "", country: "USA", countryZh: "美国",       points: "1,681" },
        { rank: 32, name: "Ekaterina Alexandrova", nameZh: "", country: "RUS", countryZh: "俄罗斯",   points: "1,641" }
      ]
    }
  }
};
