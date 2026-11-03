/* 体育排名：榜单数据
   页面：sports-rankings.html

   一个 panel 下可以有多个 section，一个 section = 一张表。
   section.wide = true 时占满整行，否则两表并排。

   section.columns 决定表头和列样式：
     c = "rank"    名次（窄，朱砂红衬线）
     c = "player"  球员（中文名，外籍球员下面附外文名）
     c = "country" 国家 / 地区（窄屏收起，改显示在球员名下方）
     c = "span"    年份区间等次要信息（窄屏保留）
     c = "points"  数值，右对齐

   rows 里：
     name  显示名（中文）
     en    外文原名（中国球员留空）
     titles  （仅中国球员）该球员的排名赛冠军列表，点击名字展开
     region  （仅中国香港）地区标注

   panel.status = "pending" 时不显示表格，只显示 note。
   fetchedAt 是本地抓取时间；榜单"截至"时点写在各自 section.note 里。 */
window.SPORTS_RANKINGS = {
  "fetchedAt": "2026-11-03T19:12:00+08:00",
  "panels": {
    "snooker": {
      "id": "snooker",
      "title": "斯诺克",
      "status": "ok",
      "sections": [
        {
          "key": "world",
          "title": "世界排名",
          "sub": "2026/27 赛季 · 前 16",
          "wide": false,
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
              "name": "赵心童",
              "country": "中国",
              "points": "1,265,550"
            },
            {
              "rank": 2,
              "name": "吴宜泽",
              "country": "中国",
              "points": "1,238,900"
            },
            {
              "rank": 3,
              "name": "尼尔·罗伯逊",
              "en": "Neil Robertson",
              "country": "澳大利亚",
              "points": "1,087,000"
            },
            {
              "rank": 4,
              "name": "马克·塞尔比",
              "en": "Mark Selby",
              "country": "英格兰",
              "points": "1,070,500"
            },
            {
              "rank": 5,
              "name": "贾德·特鲁姆普",
              "en": "Judd Trump",
              "country": "英格兰",
              "points": "1,069,050"
            },
            {
              "rank": 6,
              "name": "约翰·希金斯",
              "en": "John Higgins",
              "country": "苏格兰",
              "points": "905,000"
            },
            {
              "rank": 7,
              "name": "肖恩·墨菲",
              "en": "Shaun Murphy",
              "country": "英格兰",
              "points": "884,150"
            },
            {
              "rank": 8,
              "name": "马克·威廉姆斯",
              "en": "Mark J Williams",
              "country": "威尔士",
              "points": "755,200"
            },
            {
              "rank": 9,
              "name": "凯伦·威尔逊",
              "en": "Kyren Wilson",
              "country": "英格兰",
              "points": "716,800"
            },
            {
              "rank": 10,
              "name": "巴里·霍金斯",
              "en": "Barry Hawkins",
              "country": "英格兰",
              "points": "661,050"
            },
            {
              "rank": 11,
              "name": "克里斯·沃克林",
              "en": "Chris Wakelin",
              "country": "英格兰",
              "points": "571,150"
            },
            {
              "rank": 12,
              "name": "马克·艾伦",
              "en": "Mark Allen",
              "country": "北爱尔兰",
              "points": "530,650"
            },
            {
              "rank": 13,
              "name": "罗尼·奥沙利文",
              "en": "Ronnie O'Sullivan",
              "country": "英格兰",
              "points": "513,750"
            },
            {
              "rank": 14,
              "name": "肖国栋",
              "country": "中国",
              "points": "503,900"
            },
            {
              "rank": 15,
              "name": "丁俊晖",
              "country": "中国",
              "points": "479,850"
            },
            {
              "rank": 16,
              "name": "阿里·卡特",
              "en": "Ali Carter",
              "country": "英格兰",
              "points": "414,400"
            }
          ]
        },
        {
          "key": "centuries",
          "title": "历史单杆过百",
          "sub": "累计杆数 · 前 16",
          "wide": false,
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
              "name": "罗尼·奥沙利文",
              "en": "Ronnie O'Sullivan",
              "total": "1,339"
            },
            {
              "rank": 2,
              "name": "贾德·特鲁姆普",
              "en": "Judd Trump",
              "total": "1,169"
            },
            {
              "rank": 3,
              "name": "约翰·希金斯",
              "en": "John Higgins",
              "total": "1,073"
            },
            {
              "rank": 4,
              "name": "尼尔·罗伯逊",
              "en": "Neil Robertson",
              "total": "1,053"
            },
            {
              "rank": 5,
              "name": "马克·塞尔比",
              "en": "Mark Selby",
              "total": "981"
            },
            {
              "rank": 6,
              "name": "肖恩·墨菲",
              "en": "Shaun Murphy",
              "total": "795"
            },
            {
              "rank": 7,
              "name": "斯蒂芬·亨德利",
              "en": "Stephen Hendry",
              "total": "777"
            },
            {
              "rank": 8,
              "name": "丁俊晖",
              "total": "736"
            },
            {
              "rank": 9,
              "name": "马克·威廉姆斯",
              "en": "Mark J Williams",
              "total": "710"
            },
            {
              "rank": 10,
              "name": "马克·艾伦",
              "en": "Mark Allen",
              "total": "704"
            },
            {
              "rank": 11,
              "name": "斯图尔特·宾汉姆",
              "en": "Stuart Bingham",
              "total": "631"
            },
            {
              "rank": 12,
              "name": "凯伦·威尔逊",
              "en": "Kyren Wilson",
              "total": "579"
            },
            {
              "rank": 13,
              "name": "傅家俊",
              "total": "572"
            },
            {
              "rank": 14,
              "name": "斯蒂芬·马奎尔",
              "en": "Stephen Maguire",
              "total": "549"
            },
            {
              "rank": 15,
              "name": "巴里·霍金斯",
              "en": "Barry Hawkins",
              "total": "534"
            },
            {
              "rank": 16,
              "name": "瑞恩·戴",
              "en": "Ryan Day",
              "total": "493"
            }
          ]
        },
        {
          "key": "maxes",
          "title": "147 满分杆",
          "sub": "累计杆数 · 前 16",
          "wide": false,
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
              "name": "罗尼·奥沙利文",
              "en": "Ronnie O'Sullivan",
              "c147": 17
            },
            {
              "rank": 2,
              "name": "约翰·希金斯",
              "en": "John Higgins",
              "c147": 13
            },
            {
              "rank": 3,
              "name": "斯蒂芬·亨德利",
              "en": "Stephen Hendry",
              "c147": 11
            },
            {
              "rank": 4,
              "name": "肖恩·墨菲",
              "en": "Shaun Murphy",
              "c147": 10
            },
            {
              "rank": 5,
              "name": "贾德·特鲁姆普",
              "en": "Judd Trump",
              "c147": 9
            },
            {
              "rank": 6,
              "name": "斯图尔特·宾汉姆",
              "en": "Stuart Bingham",
              "c147": 9
            },
            {
              "rank": 7,
              "name": "塔猜亚·乌诺",
              "en": "Thepchaiya Un-Nooh",
              "c147": 8
            },
            {
              "rank": 8,
              "name": "丁俊晖",
              "c147": 7
            },
            {
              "rank": 9,
              "name": "马克·塞尔比",
              "en": "Mark Selby",
              "c147": 6
            },
            {
              "rank": 10,
              "name": "加里·威尔逊",
              "en": "Gary Wilson",
              "c147": 6
            },
            {
              "rank": 11,
              "name": "尼尔·罗伯逊",
              "en": "Neil Robertson",
              "c147": 5
            },
            {
              "rank": 12,
              "name": "马克·艾伦",
              "en": "Mark Allen",
              "c147": 5
            },
            {
              "rank": 13,
              "name": "凯伦·威尔逊",
              "en": "Kyren Wilson",
              "c147": 5
            },
            {
              "rank": 14,
              "name": "傅家俊",
              "c147": 5
            },
            {
              "rank": 15,
              "name": "汤姆·福德",
              "en": "Tom Ford",
              "c147": 5
            },
            {
              "rank": 16,
              "name": "张安达",
              "c147": 5
            }
          ]
        },
        {
          "key": "champ",
          "title": "排名赛冠军 · 世界",
          "sub": "历史累计 · 前 16",
          "wide": false,
          "source": "https://snookerinfo.co.uk/ranking-winners/",
          "sourceLabel": "SnookerInfo · Ranking Winners",
          "note": "按排名赛冠军总数排序，含现役与退役球员。",
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
              "label": "冠军数",
              "c": "points"
            }
          ],
          "rows": [
            {
              "rank": 1,
              "name": "罗尼·奥沙利文",
              "en": "Ronnie O'Sullivan",
              "span": "1993-2024",
              "wins": "41"
            },
            {
              "rank": 2,
              "name": "斯蒂芬·亨德利",
              "en": "Stephen Hendry",
              "span": "1987-2005",
              "wins": "36"
            },
            {
              "rank": 3,
              "name": "约翰·希金斯",
              "en": "John Higgins",
              "span": "1994-2025",
              "wins": "33"
            },
            {
              "rank": 4,
              "name": "贾德·特鲁姆普",
              "en": "Judd Trump",
              "span": "2011-2026",
              "wins": "31"
            },
            {
              "rank": 5,
              "name": "史蒂夫·戴维斯",
              "en": "Steve Davis",
              "span": "1981-1995",
              "wins": "28"
            },
            {
              "rank": 6,
              "name": "马克·威廉姆斯",
              "en": "Mark J Williams",
              "span": "1996-2025",
              "wins": "27"
            },
            {
              "rank": 7,
              "name": "尼尔·罗伯逊",
              "en": "Neil Robertson",
              "span": "2006-2025",
              "wins": "26"
            },
            {
              "rank": 8,
              "name": "马克·塞尔比",
              "en": "Mark Selby",
              "span": "2008-2026",
              "wins": "26"
            },
            {
              "rank": 9,
              "name": "丁俊晖",
              "span": "2005-2024",
              "wins": "15"
            },
            {
              "rank": 10,
              "name": "肖恩·墨菲",
              "en": "Shaun Murphy",
              "span": "2005-2025",
              "wins": "13"
            },
            {
              "rank": 11,
              "name": "马克·艾伦",
              "en": "Mark Allen",
              "span": "2012-2025",
              "wins": "12"
            },
            {
              "rank": 12,
              "name": "凯伦·威尔逊",
              "en": "Kyren Wilson",
              "span": "2015-2026",
              "wins": "11"
            },
            {
              "rank": 13,
              "name": "吉米·怀特",
              "en": "Jimmy White",
              "span": "1986-2004",
              "wins": "10"
            },
            {
              "rank": 14,
              "name": "彼得·艾伯顿",
              "en": "Peter Ebdon",
              "span": "1993-2012",
              "wins": "9"
            },
            {
              "rank": 15,
              "name": "约翰·帕罗特",
              "en": "John Parrott",
              "span": "1989-1996",
              "wins": "9"
            },
            {
              "rank": 16,
              "name": "阿里·卡特",
              "en": "Allister Carter",
              "span": "2009-2026",
              "wins": "7"
            }
          ]
        },
        {
          "key": "china",
          "title": "中国球员 · 排名赛冠军",
          "sub": "全部球员 · 点名字看明细",
          "wide": true,
          "source": "https://snookerinfo.co.uk/ranking-winners/",
          "sourceLabel": "SnookerInfo · Ranking Winners",
          "note": "合计 34 个排名赛冠军。点击球员名可展开其全部冠军（年份 + 赛事）。",
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
              "label": "冠军数",
              "c": "points"
            }
          ],
          "rows": [
            {
              "rank": 1,
              "name": "丁俊晖",
              "span": "2005-2024",
              "wins": 15,
              "region": "",
              "titles": [
                {
                  "y": "2005",
                  "e": "China Open"
                },
                {
                  "y": "2005",
                  "e": "UK Championship"
                },
                {
                  "y": "2006",
                  "e": "Northern Ireland Trophy"
                },
                {
                  "y": "2009",
                  "e": "UK Championship (2)"
                },
                {
                  "y": "2012",
                  "e": "Welsh Open"
                },
                {
                  "y": "2013",
                  "e": "Players Tour Championship Finals"
                },
                {
                  "y": "2013",
                  "e": "Shanghai Masters"
                },
                {
                  "y": "2013",
                  "e": "Indian Open"
                },
                {
                  "y": "2013",
                  "e": "International Championship"
                },
                {
                  "y": "2014",
                  "e": "German Masters"
                },
                {
                  "y": "2014",
                  "e": "China Open (2)"
                },
                {
                  "y": "2016",
                  "e": "Shanghai Masters (2)"
                },
                {
                  "y": "2017",
                  "e": "World Open"
                },
                {
                  "y": "2019",
                  "e": "UK Championship (3)"
                },
                {
                  "y": "2024",
                  "e": "International Championship (2)"
                }
              ]
            },
            {
              "rank": 2,
              "name": "赵心童",
              "span": "2021-2026",
              "wins": 6,
              "region": "",
              "titles": [
                {
                  "y": "2021",
                  "e": "UK Championship"
                },
                {
                  "y": "2022",
                  "e": "German Masters"
                },
                {
                  "y": "2025",
                  "e": "World Snooker Championship"
                },
                {
                  "y": "2026",
                  "e": "World Grand Prix"
                },
                {
                  "y": "2026",
                  "e": "Players Championship"
                },
                {
                  "y": "2026",
                  "e": "Tour Championship"
                }
              ]
            },
            {
              "rank": 3,
              "name": "傅家俊",
              "span": "2007-2016",
              "wins": 3,
              "region": "中国香港",
              "titles": [
                {
                  "y": "2007",
                  "e": "Grand Prix"
                },
                {
                  "y": "2013",
                  "e": "Australian Goldfields Open"
                },
                {
                  "y": "2016",
                  "e": "Scottish Open"
                }
              ]
            },
            {
              "rank": 4,
              "name": "吴宜泽",
              "span": "2025-2026",
              "wins": 3,
              "region": "",
              "titles": [
                {
                  "y": "2025",
                  "e": "International Championship"
                },
                {
                  "y": "2026",
                  "e": "World Snooker Championship"
                },
                {
                  "y": "2026",
                  "e": "Shenzhen Open"
                }
              ]
            },
            {
              "rank": 5,
              "name": "肖国栋",
              "span": "2024-2025",
              "wins": 2,
              "region": "",
              "titles": [
                {
                  "y": "2024",
                  "e": "Wuhan Open"
                },
                {
                  "y": "2025",
                  "e": "Wuhan Open (2)"
                }
              ]
            },
            {
              "rank": 6,
              "name": "范争一",
              "span": "2022",
              "wins": 1,
              "region": "",
              "titles": [
                {
                  "y": "2022",
                  "e": "European Masters"
                }
              ]
            },
            {
              "rank": 7,
              "name": "雷佩凡",
              "span": "2024",
              "wins": 1,
              "region": "",
              "titles": [
                {
                  "y": "2024",
                  "e": "Scottish Open"
                }
              ]
            },
            {
              "rank": 8,
              "name": "梁文博",
              "span": "2016",
              "wins": 1,
              "region": "",
              "titles": [
                {
                  "y": "2016",
                  "e": "English Open"
                }
              ]
            },
            {
              "rank": 9,
              "name": "颜丙涛",
              "span": "2019",
              "wins": 1,
              "region": "",
              "titles": [
                {
                  "y": "2019",
                  "e": "Riga Masters"
                }
              ]
            },
            {
              "rank": 10,
              "name": "张安达",
              "span": "2023",
              "wins": 1,
              "region": "",
              "titles": [
                {
                  "y": "2023",
                  "e": "International Championship"
                }
              ]
            }
          ]
        }
      ]
    },
    "atp": {
      "id": "atp",
      "title": "ATP",
      "sub": "单打排名 · 前 16",
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
          "title": "WTA 单打",
          "sub": "前 16",
          "wide": true,
          "source": "https://www.wtatennis.com/rankings/singles",
          "sourceLabel": "WTA 官方单打排名",
          "note": "中文译名为常用译法，个别球员暂无统一译名。",
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
              "name": "莱巴金娜",
              "en": "Elena Rybakina",
              "country": "哈萨克斯坦",
              "points": "8,099"
            },
            {
              "rank": "2",
              "name": "萨巴伦卡",
              "en": "Aryna Sabalenka",
              "country": "白俄罗斯",
              "points": "6,485"
            },
            {
              "rank": "3",
              "name": "安德烈耶娃",
              "en": "Mirra Andreeva",
              "country": "俄罗斯",
              "points": "6,306"
            },
            {
              "rank": "4",
              "name": "高芙",
              "en": "Coco Gauff",
              "country": "美国",
              "points": "5,763"
            },
            {
              "rank": "5",
              "name": "佩古拉",
              "en": "Jessica Pegula",
              "country": "美国",
              "points": "5,760"
            },
            {
              "rank": "6",
              "name": "斯维托丽娜",
              "en": "Elina Svitolina",
              "country": "乌克兰",
              "points": "5,121"
            },
            {
              "rank": "7",
              "name": "穆霍娃",
              "en": "Karolina Muchova",
              "country": "捷克",
              "points": "4,665"
            },
            {
              "rank": "8",
              "name": "诺斯科娃",
              "en": "Linda Noskova",
              "country": "捷克",
              "points": "4,343"
            },
            {
              "rank": "9",
              "name": "斯瓦泰克",
              "en": "Iga Swiatek",
              "country": "波兰",
              "points": "4,188"
            },
            {
              "rank": "10",
              "name": "科斯秋克",
              "en": "Marta Kostyuk",
              "country": "乌克兰",
              "points": "3,910"
            },
            {
              "rank": "11",
              "name": "施奈德",
              "en": "Diana Shnaider",
              "country": "俄罗斯",
              "points": "3,238"
            },
            {
              "rank": "12",
              "name": "赫瓦林斯卡",
              "en": "Maja Chwalinska",
              "country": "波兰",
              "points": "3,016"
            },
            {
              "rank": "13",
              "name": "约维奇",
              "en": "Iva Jovic",
              "country": "美国",
              "points": "2,941"
            },
            {
              "rank": "14",
              "name": "梅尔滕斯",
              "en": "Elise Mertens",
              "country": "比利时",
              "points": "2,540"
            },
            {
              "rank": "15",
              "name": "奇尔斯特亚",
              "en": "Sorana Cirstea",
              "country": "罗马尼亚",
              "points": "2,386"
            },
            {
              "rank": "16",
              "name": "大坂直美",
              "en": "Naomi Osaka",
              "country": "日本",
              "points": "2,315"
            }
          ]
        }
      ]
    }
  }
};
