/* 体育排名：榜单数据
   页面：sports-rankings.html

   每个面板（panel）下可以有多个 section，一个 section 就是一张表。
   section.columns 决定表头和列样式：
     c = "rank"    名次（窄，朱砂红衬线）
     c = "player"  球员（主列）
     c = "country" 国家 / 年份（次列）
     c = "points"  数值，右对齐
   section.rows 里字段名要和 columns 的 k 对上。

   panel.status = "pending" 时不显示表格，只显示 note 说明为什么没数据。

   fetchedAt 是本地抓取时间。榜单本身的"截至"时点写在各自 section.note 里，
   不要拿抓取时间冒充榜单日期。 */
window.SPORTS_RANKINGS = {
  "fetchedAt": "2026-11-03T18:55:36+08:00",
  "panels": {
    "snooker": {
      "id": "snooker",
      "title": "斯诺克",
      "status": "ok",
      "sections": [
        {
          "key": "world",
          "title": "世界排名",
          "sub": "2026/27 赛季 · 前 32",
          "source": "https://www.snooker.org/res/index.asp?template=31&season=2026",
          "sourceLabel": "snooker.org · 世界排名",
          "note": "官方积分表，截至北爱尔兰公开赛后。",
          "columns": [
            {
              "k": "rank",
              "label": "名次",
              "c": "rank"
            },
            {
              "k": "name",
              "label": "球员",
              "c": "player"
            },
            {
              "k": "country",
              "label": "国家",
              "c": "country"
            },
            {
              "k": "points",
              "label": "积分",
              "c": "points"
            }
          ],
          "rows": [
            {
              "rank": 1,
              "name": "Zhao Xintong",
              "country": "中国",
              "points": "1,265,550",
              "pts": 1265550
            },
            {
              "rank": 2,
              "name": "Wu Yize",
              "country": "中国",
              "points": "1,238,900",
              "pts": 1238900
            },
            {
              "rank": 3,
              "name": "Neil Robertson",
              "country": "澳大利亚",
              "points": "1,087,000",
              "pts": 1087000
            },
            {
              "rank": 4,
              "name": "Mark Selby",
              "country": "英格兰",
              "points": "1,070,500",
              "pts": 1070500
            },
            {
              "rank": 5,
              "name": "Judd Trump",
              "country": "英格兰",
              "points": "1,069,050",
              "pts": 1069050
            },
            {
              "rank": 6,
              "name": "John Higgins",
              "country": "苏格兰",
              "points": "905,000",
              "pts": 905000
            },
            {
              "rank": 7,
              "name": "Shaun Murphy",
              "country": "英格兰",
              "points": "884,150",
              "pts": 884150
            },
            {
              "rank": 8,
              "name": "Mark J Williams",
              "country": "威尔士",
              "points": "755,200",
              "pts": 755200
            },
            {
              "rank": 9,
              "name": "Kyren Wilson",
              "country": "英格兰",
              "points": "716,800",
              "pts": 716800
            },
            {
              "rank": 10,
              "name": "Barry Hawkins",
              "country": "英格兰",
              "points": "661,050",
              "pts": 661050
            },
            {
              "rank": 11,
              "name": "Chris Wakelin",
              "country": "英格兰",
              "points": "571,150",
              "pts": 571150
            },
            {
              "rank": 12,
              "name": "Mark Allen",
              "country": "北爱尔兰",
              "points": "530,650",
              "pts": 530650
            },
            {
              "rank": 13,
              "name": "Ronnie O'Sullivan",
              "country": "英格兰",
              "points": "513,750",
              "pts": 513750
            },
            {
              "rank": 14,
              "name": "Xiao Guodong",
              "country": "中国",
              "points": "503,900",
              "pts": 503900
            },
            {
              "rank": 15,
              "name": "Ding Junhui",
              "country": "中国",
              "points": "479,850",
              "pts": 479850
            },
            {
              "rank": 16,
              "name": "Ali Carter",
              "country": "英格兰",
              "points": "414,400",
              "pts": 414400
            },
            {
              "rank": 17,
              "name": "Jack Lisowski",
              "country": "英格兰",
              "points": "363,500",
              "pts": 363500
            },
            {
              "rank": 18,
              "name": "Jak Jones",
              "country": "威尔士",
              "points": "358,900",
              "pts": 358900
            },
            {
              "rank": 19,
              "name": "Zhou Yuelong",
              "country": "中国",
              "points": "353,700",
              "pts": 353700
            },
            {
              "rank": 20,
              "name": "Chang Bingyu",
              "country": "中国",
              "points": "350,200",
              "pts": 350200
            },
            {
              "rank": 21,
              "name": "Stuart Bingham",
              "country": "英格兰",
              "points": "346,950",
              "pts": 346950
            },
            {
              "rank": 22,
              "name": "Zhang Anda",
              "country": "中国",
              "points": "338,000",
              "pts": 338000
            },
            {
              "rank": 23,
              "name": "Thepchaiya Un-Nooh",
              "country": "泰国",
              "points": "331,650",
              "pts": 331650
            },
            {
              "rank": 24,
              "name": "Elliot Slessor",
              "country": "英格兰",
              "points": "321,400",
              "pts": 321400
            },
            {
              "rank": 25,
              "name": "Si Jiahui",
              "country": "中国",
              "points": "292,500",
              "pts": 292500
            },
            {
              "rank": 26,
              "name": "Gary Wilson",
              "country": "英格兰",
              "points": "286,550",
              "pts": 286550
            },
            {
              "rank": 27,
              "name": "Yuan Sijun",
              "country": "中国",
              "points": "284,800",
              "pts": 284800
            },
            {
              "rank": 28,
              "name": "Lei Peifan",
              "country": "中国",
              "points": "270,050",
              "pts": 270050
            },
            {
              "rank": 29,
              "name": "Pang Junxu",
              "country": "中国",
              "points": "260,750",
              "pts": 260750
            },
            {
              "rank": 30,
              "name": "Joe O'Connor",
              "country": "英格兰",
              "points": "250,850",
              "pts": 250850
            },
            {
              "rank": 31,
              "name": "Noppon Saengkham",
              "country": "泰国",
              "points": "242,500",
              "pts": 242500
            },
            {
              "rank": 32,
              "name": "Hossein Vafaei",
              "country": "伊朗",
              "points": "242,450",
              "pts": 242450
            }
          ]
        },
        {
          "key": "centuries",
          "title": "历史单杆过百",
          "sub": "累计杆数 · 前 20",
          "source": "https://snookerinfo.co.uk/",
          "sourceLabel": "SnookerInfo · 100+ Centuries",
          "note": "收录职业生涯过百数达 100 杆以上的球员。",
          "columns": [
            {
              "k": "rank",
              "label": "名次",
              "c": "rank"
            },
            {
              "k": "name",
              "label": "球员",
              "c": "player"
            },
            {
              "k": "total",
              "label": "过百总数",
              "c": "points"
            }
          ],
          "rows": [
            {
              "rank": 1,
              "name": "Ronnie O'Sullivan",
              "total": "1,339"
            },
            {
              "rank": 2,
              "name": "Judd Trump",
              "total": "1,169"
            },
            {
              "rank": 3,
              "name": "John Higgins",
              "total": "1,073"
            },
            {
              "rank": 4,
              "name": "Neil Robertson",
              "total": "1,053"
            },
            {
              "rank": 5,
              "name": "Mark Selby",
              "total": "981"
            },
            {
              "rank": 6,
              "name": "Shaun Murphy",
              "total": "795"
            },
            {
              "rank": 7,
              "name": "Stephen Hendry",
              "total": "777"
            },
            {
              "rank": 8,
              "name": "Ding Junhui",
              "total": "736"
            },
            {
              "rank": 9,
              "name": "Mark J Williams",
              "total": "710"
            },
            {
              "rank": 10,
              "name": "Mark Allen",
              "total": "704"
            },
            {
              "rank": 11,
              "name": "Stuart Bingham",
              "total": "631"
            },
            {
              "rank": 12,
              "name": "Kyren Wilson",
              "total": "579"
            },
            {
              "rank": 13,
              "name": "Marco Fu",
              "total": "572"
            },
            {
              "rank": 14,
              "name": "Stephen Maguire",
              "total": "549"
            },
            {
              "rank": 15,
              "name": "Barry Hawkins",
              "total": "534"
            },
            {
              "rank": 16,
              "name": "Ryan Day",
              "total": "493"
            },
            {
              "rank": 17,
              "name": "Ali Carter",
              "total": "476"
            },
            {
              "rank": 18,
              "name": "David B Gilbert",
              "total": "466"
            },
            {
              "rank": 19,
              "name": "Ricky Walden",
              "total": "405"
            },
            {
              "rank": 20,
              "name": "Jack Lisowski",
              "total": "392"
            }
          ]
        },
        {
          "key": "maxes",
          "title": "147 满分杆",
          "sub": "累计杆数 · 前 20",
          "source": "https://snookerinfo.co.uk/",
          "sourceLabel": "SnookerInfo · 过百榜 147 列",
          "note": "取自同一张过百榜的 147 列，因此只覆盖过百 100 杆以上的球员；过百不足 100 杆的球员不在其内。",
          "columns": [
            {
              "k": "rank",
              "label": "名次",
              "c": "rank"
            },
            {
              "k": "name",
              "label": "球员",
              "c": "player"
            },
            {
              "k": "c147",
              "label": "147 杆数",
              "c": "points"
            }
          ],
          "rows": [
            {
              "rank": 1,
              "name": "Ronnie O'Sullivan",
              "c147": 17
            },
            {
              "rank": 2,
              "name": "John Higgins",
              "c147": 13
            },
            {
              "rank": 3,
              "name": "Stephen Hendry",
              "c147": 11
            },
            {
              "rank": 4,
              "name": "Shaun Murphy",
              "c147": 10
            },
            {
              "rank": 5,
              "name": "Judd Trump",
              "c147": 9
            },
            {
              "rank": 6,
              "name": "Stuart Bingham",
              "c147": 9
            },
            {
              "rank": 7,
              "name": "Thepchaiya Un-Nooh",
              "c147": 8
            },
            {
              "rank": 8,
              "name": "Ding Junhui",
              "c147": 7
            },
            {
              "rank": 9,
              "name": "Mark Selby",
              "c147": 6
            },
            {
              "rank": 10,
              "name": "Gary Wilson",
              "c147": 6
            },
            {
              "rank": 11,
              "name": "Neil Robertson",
              "c147": 5
            },
            {
              "rank": 12,
              "name": "Mark Allen",
              "c147": 5
            },
            {
              "rank": 13,
              "name": "Kyren Wilson",
              "c147": 5
            },
            {
              "rank": 14,
              "name": "Marco Fu",
              "c147": 5
            },
            {
              "rank": 15,
              "name": "Tom Ford",
              "c147": 5
            },
            {
              "rank": 16,
              "name": "Zhang Anda",
              "c147": 5
            },
            {
              "rank": 17,
              "name": "Ryan Day",
              "c147": 4
            },
            {
              "rank": 18,
              "name": "Ali Carter",
              "c147": 4
            },
            {
              "rank": 19,
              "name": "Xiao Guodong",
              "c147": 4
            },
            {
              "rank": 20,
              "name": "Mark J Williams",
              "c147": 3
            }
          ]
        },
        {
          "key": "china",
          "title": "中国球员 · 排名赛冠军",
          "sub": "按冠军数排序",
          "source": "https://snookerinfo.co.uk/ranking-winners/",
          "sourceLabel": "SnookerInfo · Ranking Winners",
          "note": "上表 9 人合计 31 个排名赛冠军。另有傅家俊（中国香港）3 冠，未计入。",
          "columns": [
            {
              "k": "rank",
              "label": "名次",
              "c": "rank"
            },
            {
              "k": "name",
              "label": "球员",
              "c": "player"
            },
            {
              "k": "span",
              "label": "首冠—末冠",
              "c": "span"
            },
            {
              "k": "wins",
              "label": "排名赛冠军",
              "c": "points"
            }
          ],
          "rows": [
            {
              "rank": 1,
              "name": "Ding Junhui",
              "span": "2005-2024",
              "wins": "15"
            },
            {
              "rank": 2,
              "name": "Zhao Xintong",
              "span": "2021-2026",
              "wins": "6"
            },
            {
              "rank": 3,
              "name": "Wu Yize",
              "span": "2025-2026",
              "wins": "3"
            },
            {
              "rank": 4,
              "name": "Xiao Guodong",
              "span": "2024-2025",
              "wins": "2"
            },
            {
              "rank": 5,
              "name": "Fan Zhengyi",
              "span": "2022",
              "wins": "1"
            },
            {
              "rank": 6,
              "name": "Lei Peifan",
              "span": "2024",
              "wins": "1"
            },
            {
              "rank": 7,
              "name": "Liang Wenbo",
              "span": "2016",
              "wins": "1"
            },
            {
              "rank": 8,
              "name": "Yan Bingtao",
              "span": "2019",
              "wins": "1"
            },
            {
              "rank": 9,
              "name": "Zhang Anda",
              "span": "2023",
              "wins": "1"
            }
          ]
        }
      ]
    },
    "atp": {
      "id": "atp",
      "title": "ATP",
      "sub": "单打排名 · 前 32",
      "status": "pending",
      "source": "https://www.atptour.com/en/rankings/singles",
      "sourceLabel": "ATP 官方单打排名",
      "note": "ATP 官网对抓取返回 403（Cloudflare 拦截），需要换源或改用手动快照。"
    },
    "wta": {
      "id": "wta",
      "title": "WTA",
      "status": "ok",
      "sections": [
        {
          "key": "wta",
          "title": "WTA",
          "sub": "单打排名 · 前 32",
          "source": "https://www.wtatennis.com/rankings/singles",
          "sourceLabel": "WTA 官方单打排名",
          "note": "中文译名待统一校订，暂时只显示外文原名。",
          "columns": [
            {
              "k": "rank",
              "label": "名次",
              "c": "rank"
            },
            {
              "k": "name",
              "label": "球员",
              "c": "player"
            },
            {
              "k": "country",
              "label": "国家",
              "c": "country"
            },
            {
              "k": "points",
              "label": "积分",
              "c": "points"
            }
          ],
          "rows": [
            {
              "rank": "1",
              "name": "Elena Rybakina",
              "country": "哈萨克斯坦",
              "points": "8,099"
            },
            {
              "rank": "2",
              "name": "Aryna Sabalenka",
              "country": "白俄罗斯",
              "points": "6,485"
            },
            {
              "rank": "3",
              "name": "Mirra Andreeva",
              "country": "俄罗斯",
              "points": "6,306"
            },
            {
              "rank": "4",
              "name": "Coco Gauff",
              "country": "美国",
              "points": "5,763"
            },
            {
              "rank": "5",
              "name": "Jessica Pegula",
              "country": "美国",
              "points": "5,760"
            },
            {
              "rank": "6",
              "name": "Elina Svitolina",
              "country": "乌克兰",
              "points": "5,121"
            },
            {
              "rank": "7",
              "name": "Karolina Muchova",
              "country": "捷克",
              "points": "4,665"
            },
            {
              "rank": "8",
              "name": "Linda Noskova",
              "country": "捷克",
              "points": "4,343"
            },
            {
              "rank": "9",
              "name": "Iga Swiatek",
              "country": "波兰",
              "points": "4,188"
            },
            {
              "rank": "10",
              "name": "Marta Kostyuk",
              "country": "乌克兰",
              "points": "3,910"
            },
            {
              "rank": "11",
              "name": "Diana Shnaider",
              "country": "俄罗斯",
              "points": "3,238"
            },
            {
              "rank": "12",
              "name": "Maja Chwalinska",
              "country": "波兰",
              "points": "3,016"
            },
            {
              "rank": "13",
              "name": "Iva Jovic",
              "country": "美国",
              "points": "2,941"
            },
            {
              "rank": "14",
              "name": "Elise Mertens",
              "country": "比利时",
              "points": "2,540"
            },
            {
              "rank": "15",
              "name": "Sorana Cirstea",
              "country": "罗马尼亚",
              "points": "2,386"
            },
            {
              "rank": "16",
              "name": "Naomi Osaka",
              "country": "日本",
              "points": "2,315"
            },
            {
              "rank": "17",
              "name": "Alexandra Eala",
              "country": "菲律宾",
              "points": "2,289"
            },
            {
              "rank": "18",
              "name": "Leylah Fernandez",
              "country": "加拿大",
              "points": "2,201"
            },
            {
              "rank": "19",
              "name": "Belinda Bencic",
              "country": "瑞士",
              "points": "2,168"
            },
            {
              "rank": "20",
              "name": "Victoria Mboko",
              "country": "加拿大",
              "points": "2,143"
            },
            {
              "rank": "21",
              "name": "Qinwen Zheng",
              "country": "中国",
              "points": "2,017"
            },
            {
              "rank": "22",
              "name": "Amanda Anisimova",
              "country": "美国",
              "points": "1,963"
            },
            {
              "rank": "23",
              "name": "Marie Bouzkova",
              "country": "捷克",
              "points": "1,959"
            },
            {
              "rank": "24",
              "name": "Madison Keys",
              "country": "美国",
              "points": "1,921"
            },
            {
              "rank": "25",
              "name": "Jelena Ostapenko",
              "country": "拉脱维亚",
              "points": "1,916"
            },
            {
              "rank": "26",
              "name": "Anna Kalinskaya",
              "country": "俄罗斯",
              "points": "1,913"
            },
            {
              "rank": "27",
              "name": "Anastasia Potapova",
              "country": "奥地利",
              "points": "1,814"
            },
            {
              "rank": "28",
              "name": "Emma Navarro",
              "country": "美国",
              "points": "1,794"
            },
            {
              "rank": "29",
              "name": "Nikola Bartunkova",
              "country": "捷克",
              "points": "1,711"
            },
            {
              "rank": "30",
              "name": "Maria Sakkari",
              "country": "希腊",
              "points": "1,682"
            },
            {
              "rank": "31",
              "name": "Ann Li",
              "country": "美国",
              "points": "1,681"
            },
            {
              "rank": "32",
              "name": "Ekaterina Alexandrova",
              "country": "俄罗斯",
              "points": "1,641"
            }
          ]
        }
      ]
    }
  }
};
