/* 体育排名：榜单数据
   页面：sports-rankings.html

   一个 panel 下可以有多个 section，一个 section = 一张表。
   section.wide = true 时占满整行，否则两表并排（左 ATP / 右 WTA 就是这样排的）。

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

   fetchedAt 是本地抓取时间；榜单"截至"时点写在各自 section.note 里。 */
window.SPORTS_RANKINGS = {
  "fetchedAt": "2026-11-04T10:05:10.467Z",
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
          "source": "https://www.snooker.org/res/index.asp?template=31&season=2026",
          "sourceLabel": "snooker.org · 世界排名",
          "note": "官方积分表，截至北爱尔兰公开赛后。",
          "rows": [
            {
              "rank": 1,
              "name": "赵心童",
              "en": "Zhao Xintong",
              "country": "中国",
              "points": "1,265,550"
            },
            {
              "rank": 2,
              "name": "吴宜泽",
              "en": "Wu Yize",
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
              "en": "Xiao Guodong",
              "country": "中国",
              "points": "503,900"
            },
            {
              "rank": 15,
              "name": "丁俊晖",
              "en": "Ding Junhui",
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
          "source": "https://snookerinfo.co.uk/",
          "sourceLabel": "SnookerInfo · 100+ Centuries",
          "note": "收录职业生涯过百数达 100 杆以上的球员。",
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
              "en": "Ding Junhui",
              "total": "737"
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
              "en": "Marco Fu",
              "total": "572"
            },
            {
              "rank": 14,
              "name": "斯蒂芬·马奎尔",
              "en": "Stephen Maguire",
              "total": "551"
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
          "source": "https://snookerinfo.co.uk/",
          "sourceLabel": "SnookerInfo · 过百榜 147 列",
          "note": "取自同一张过百榜的 147 列，因此只覆盖过百 100 杆以上的球员；过百不足 100 杆的球员不在其内。",
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
              "en": "Ding Junhui",
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
              "en": "Marco Fu",
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
              "en": "Zhang Anda",
              "c147": 5
            }
          ]
        },
        {
          "key": "champ",
          "title": "排名赛冠军 · 世界",
          "sub": "历史累计 · 前 16",
          "wide": false,
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
          "source": "https://snookerinfo.co.uk/ranking-winners/",
          "sourceLabel": "SnookerInfo · Ranking Winners",
          "note": "按排名赛冠军总数排序，含现役与退役球员。",
          "rows": [
            {
              "rank": 1,
              "name": "罗尼·奥沙利文",
              "en": "Ronnie O'Sullivan",
              "span": "1993-2024",
              "wins": 41
            },
            {
              "rank": 2,
              "name": "斯蒂芬·亨德利",
              "en": "Stephen Hendry",
              "span": "1987-2005",
              "wins": 36
            },
            {
              "rank": 3,
              "name": "约翰·希金斯",
              "en": "John Higgins",
              "span": "1994-2025",
              "wins": 33
            },
            {
              "rank": 4,
              "name": "贾德·特鲁姆普",
              "en": "Judd Trump",
              "span": "2011-2026",
              "wins": 31
            },
            {
              "rank": 5,
              "name": "史蒂夫·戴维斯",
              "en": "Steve Davis",
              "span": "1981-1995",
              "wins": 28
            },
            {
              "rank": 6,
              "name": "马克·威廉姆斯",
              "en": "Mark J Williams",
              "span": "1996-2025",
              "wins": 27
            },
            {
              "rank": 7,
              "name": "尼尔·罗伯逊",
              "en": "Neil Robertson",
              "span": "2006-2025",
              "wins": 26
            },
            {
              "rank": 8,
              "name": "马克·塞尔比",
              "en": "Mark Selby",
              "span": "2008-2026",
              "wins": 26
            },
            {
              "rank": 9,
              "name": "丁俊晖",
              "en": "Ding Junhui",
              "span": "2005-2024",
              "wins": 15
            },
            {
              "rank": 10,
              "name": "肖恩·墨菲",
              "en": "Shaun Murphy",
              "span": "2005-2025",
              "wins": 13
            },
            {
              "rank": 11,
              "name": "马克·艾伦",
              "en": "Mark Allen",
              "span": "2012-2025",
              "wins": 12
            },
            {
              "rank": 12,
              "name": "凯伦·威尔逊",
              "en": "Kyren Wilson",
              "span": "2015-2026",
              "wins": 11
            },
            {
              "rank": 13,
              "name": "吉米·怀特",
              "en": "Jimmy White",
              "span": "1986-2004",
              "wins": 10
            },
            {
              "rank": 14,
              "name": "彼得·艾伯顿",
              "en": "Peter Ebdon",
              "span": "1993-2012",
              "wins": 9
            },
            {
              "rank": 15,
              "name": "约翰·帕罗特",
              "en": "John Parrott",
              "span": "1989-1996",
              "wins": 9
            },
            {
              "rank": 16,
              "name": "阿里·卡特",
              "en": "Allister Carter",
              "span": "2009-2026",
              "wins": 7
            }
          ]
        },
        {
          "key": "china",
          "title": "中国球员 · 排名赛冠军",
          "sub": "全部球员 · 点名字看明细",
          "wide": true,
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
          "source": "https://snookerinfo.co.uk/ranking-winners/",
          "sourceLabel": "SnookerInfo · Ranking Winners",
          "note": "合计 34 个排名赛冠军。点击球员名可展开其全部冠军（年份 + 赛事）。",
          "rows": [
            {
              "rank": 1,
              "name": "丁俊晖",
              "span": "2005-2024",
              "wins": 15,
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
              "region": "中国香港",
              "span": "2007-2016",
              "wins": 3,
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
    "tennis": {
      "id": "tennis",
      "title": "网球",
      "status": "ok",
      "sections": [
        {
          "key": "atp",
          "title": "ATP 单打",
          "sub": "前 10",
          "wide": false,
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
          "source": "https://www.tennisexplorer.com/ranking/atp-men/",
          "sourceLabel": "tennisexplorer · ATP 排名",
          "note": "ATP 官网对抓取返回 403，这里用 tennisexplorer 的排名镜像，积分口径与 ATP 一致。",
          "rows": [
            {
              "rank": 1,
              "name": "亚历山大·兹维列夫",
              "en": "Alexander Zverev",
              "country": "德国",
              "points": "9,550"
            },
            {
              "rank": 2,
              "name": "扬尼克·辛纳",
              "en": "Jannik Sinner",
              "country": "意大利",
              "points": "9,450"
            },
            {
              "rank": 3,
              "name": "卡洛斯·阿尔卡拉斯",
              "en": "Carlos Alcaraz",
              "country": "西班牙",
              "points": "6,100"
            },
            {
              "rank": 4,
              "name": "本·谢尔顿",
              "en": "Ben Shelton",
              "country": "美国",
              "points": "4,530"
            },
            {
              "rank": 5,
              "name": "丹尼尔·梅德韦杰夫",
              "en": "Daniil Medvedev",
              "country": "俄罗斯",
              "points": "3,860"
            },
            {
              "rank": 6,
              "name": "弗拉维奥·科博利",
              "en": "Flavio Cobolli",
              "country": "意大利",
              "points": "3,690"
            },
            {
              "rank": 7,
              "name": "阿蒂尔·菲斯",
              "en": "Arthur Fils",
              "country": "法国",
              "points": "3,525"
            },
            {
              "rank": 8,
              "name": "弗朗西斯·蒂亚福",
              "en": "Frances Tiafoe",
              "country": "美国",
              "points": "3,430"
            },
            {
              "rank": 9,
              "name": "亚历克斯·德米纳尔",
              "en": "Alex De Minaur",
              "country": "澳大利亚",
              "points": "3,410"
            },
            {
              "rank": 10,
              "name": "拉斐尔·霍达尔",
              "en": "Rafael Jodar",
              "country": "西班牙",
              "points": "3,209"
            }
          ]
        },
        {
          "key": "wta",
          "title": "WTA 单打",
          "sub": "前 10",
          "wide": false,
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
          "source": "https://www.wtatennis.com/rankings/singles",
          "sourceLabel": "WTA 官方单打排名",
          "note": "直接取自 WTA 官网榜单。",
          "rows": [
            {
              "rank": 1,
              "name": "莱巴金娜",
              "en": "Elena Rybakina",
              "country": "哈萨克斯坦",
              "points": "8,099"
            },
            {
              "rank": 2,
              "name": "萨巴伦卡",
              "en": "Aryna Sabalenka",
              "country": "白俄罗斯",
              "points": "6,485"
            },
            {
              "rank": 3,
              "name": "安德烈耶娃",
              "en": "Mirra Andreeva",
              "country": "俄罗斯",
              "points": "6,306"
            },
            {
              "rank": 4,
              "name": "高芙",
              "en": "Coco Gauff",
              "country": "美国",
              "points": "5,763"
            },
            {
              "rank": 5,
              "name": "佩古拉",
              "en": "Jessica Pegula",
              "country": "美国",
              "points": "5,760"
            },
            {
              "rank": 6,
              "name": "斯维托丽娜",
              "en": "Elina Svitolina",
              "country": "乌克兰",
              "points": "5,121"
            },
            {
              "rank": 7,
              "name": "穆霍娃",
              "en": "Karolina Muchova",
              "country": "捷克",
              "points": "4,665"
            },
            {
              "rank": 8,
              "name": "诺斯科娃",
              "en": "Linda Noskova",
              "country": "捷克",
              "points": "4,343"
            },
            {
              "rank": 9,
              "name": "斯瓦泰克",
              "en": "Iga Swiatek",
              "country": "波兰",
              "points": "4,188"
            },
            {
              "rank": 10,
              "name": "科斯秋克",
              "en": "Marta Kostyuk",
              "country": "乌克兰",
              "points": "3,910"
            }
          ]
        },
        {
          "key": "chn-atp",
          "title": "中国男子 · ATP 排名",
          "sub": "世界排名前 10 位中国球员",
          "wide": false,
          "columns": [
            {
              "k": "rank",
              "label": "排名",
              "c": "rank"
            },
            {
              "k": "name",
              "label": "球员",
              "c": "player"
            },
            {
              "k": "points",
              "label": "积分",
              "c": "points"
            }
          ],
          "source": "https://www.tennisexplorer.com/ranking/atp-men/?country=china",
          "sourceLabel": "tennisexplorer · ATP 中国球员",
          "note": "按世界排名取中国球员前 10 位。ATP 官网对抓取返回 403，此处用 tennisexplorer 镜像。",
          "rows": [
            {
              "rank": 93,
              "name": "布云朝克特",
              "points": "646"
            },
            {
              "rank": 105,
              "name": "吴易昺",
              "points": "571"
            },
            {
              "rank": 162,
              "name": "张之臻",
              "points": "354"
            },
            {
              "rank": 250,
              "name": "商竣程",
              "points": "220"
            },
            {
              "rank": 281,
              "name": "周意",
              "points": "196"
            },
            {
              "rank": 287,
              "name": "孙发京",
              "points": "193"
            },
            {
              "rank": 367,
              "name": "崔杰",
              "points": "138"
            },
            {
              "rank": 740,
              "name": "特日格乐",
              "points": "42"
            },
            {
              "rank": 800,
              "name": "张天汇",
              "points": "35"
            },
            {
              "rank": 856,
              "name": "刘汉屹",
              "points": "30"
            }
          ]
        },
        {
          "key": "chn-wta",
          "title": "中国女子 · WTA 排名",
          "sub": "世界排名前 10 位中国球员",
          "wide": false,
          "columns": [
            {
              "k": "rank",
              "label": "排名",
              "c": "rank"
            },
            {
              "k": "name",
              "label": "球员",
              "c": "player"
            },
            {
              "k": "points",
              "label": "积分",
              "c": "points"
            }
          ],
          "source": "https://www.tennisexplorer.com/ranking/wta-women/?country=china",
          "sourceLabel": "tennisexplorer · WTA 中国球员",
          "note": "按世界排名取中国球员前 10 位。部分低排名球员暂无可靠中文译名，暂用拼音。",
          "rows": [
            {
              "rank": 21,
              "name": "郑钦文",
              "points": "2,017"
            },
            {
              "rank": 38,
              "name": "王欣瑜",
              "points": "1,288"
            },
            {
              "rank": 80,
              "name": "王曦雨",
              "points": "868"
            },
            {
              "rank": 95,
              "name": "张帅",
              "points": "802"
            },
            {
              "rank": 148,
              "name": "Shi Han",
              "points": "503"
            },
            {
              "rank": 168,
              "name": "袁悦",
              "points": "449"
            },
            {
              "rank": 207,
              "name": "马烨欣",
              "points": "376"
            },
            {
              "rank": 213,
              "name": "郭涵煜",
              "points": "361"
            },
            {
              "rank": 215,
              "name": "尤晓迪",
              "points": "354"
            },
            {
              "rank": 229,
              "name": "白卓璇",
              "points": "333"
            }
          ]
        },
        {
          "key": "chn-career",
          "title": "中国球员 · 生涯奖金",
          "sub": "男女合并 · 前 10",
          "wide": false,
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
              "k": "points",
              "label": "奖金",
              "c": "points"
            }
          ],
          "source": "https://wtafiles.wtatennis.com/pdf/rankings/All_Career_Prize_Money.pdf",
          "sourceLabel": "WTA · All Career Prize Money（女子）+ 维基百科（男子）",
          "note": "女子取自 WTA 官方生涯奖金全名单；男子因 ATP 无对应公开 PDF，取自维基百科球员页。含退役球员。",
          "rows": [
            {
              "rank": 1,
              "name": "李娜",
              "points": "$16,709,074"
            },
            {
              "rank": 2,
              "name": "张帅",
              "points": "$14,075,022"
            },
            {
              "rank": 3,
              "name": "郑钦文",
              "points": "$12,415,645"
            },
            {
              "rank": 4,
              "name": "彭帅",
              "points": "$9,617,653"
            },
            {
              "rank": 5,
              "name": "郑洁",
              "points": "$6,157,773"
            },
            {
              "rank": 6,
              "name": "王欣瑜",
              "points": "$6,077,567"
            },
            {
              "rank": 7,
              "name": "王蔷",
              "points": "$5,578,040"
            },
            {
              "rank": 8,
              "name": "郑赛赛",
              "points": "$4,713,887"
            },
            {
              "rank": 9,
              "name": "朱琳",
              "points": "$4,273,204"
            },
            {
              "rank": 10,
              "name": "徐一璠",
              "points": "$4,228,100"
            }
          ]
        },
        {
          "key": "chn-season",
          "title": "中国球员 · 赛季奖金",
          "sub": "女子 · 2026 · 前 10",
          "wide": false,
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
              "k": "points",
              "label": "奖金",
              "c": "points"
            }
          ],
          "source": "https://wtafiles.wtatennis.com/pdf/rankings/All_YTD_Prize_Money.pdf",
          "sourceLabel": "WTA · All YTD Prize Money",
          "note": "赛季累计奖金，单打+双打+混双合计。男子部分因 ATP 官网封锁、无可用来源，本表只列女子。部分球员暂无可靠中文译名，暂用拼音。",
          "rows": [
            {
              "rank": 1,
              "name": "郑钦文",
              "points": "$2,490,893"
            },
            {
              "rank": 2,
              "name": "张帅",
              "points": "$2,171,355"
            },
            {
              "rank": 3,
              "name": "王欣瑜",
              "points": "$1,422,764"
            },
            {
              "rank": 4,
              "name": "郭涵煜",
              "points": "$1,039,751"
            },
            {
              "rank": 5,
              "name": "王曦雨",
              "points": "$725,732"
            },
            {
              "rank": 6,
              "name": "蒋欣玗",
              "points": "$450,455"
            },
            {
              "rank": 7,
              "name": "徐一璠",
              "points": "$430,209"
            },
            {
              "rank": 8,
              "name": "袁悦",
              "points": "$384,397"
            },
            {
              "rank": 9,
              "name": "朱琳",
              "points": "$301,570"
            },
            {
              "rank": 10,
              "name": "白卓璇",
              "points": "$235,159"
            }
          ]
        }
      ]
    }
  }
};
