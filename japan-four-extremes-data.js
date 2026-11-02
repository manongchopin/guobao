/* 日本四极 · 数据
 * 坐标取 Wikipedia / 地理极点资料，部分为近似值，地图仅作方位示意。
 */
window.JAPAN_FOUR_EXTREMES = {
  "modes": [
    {
      "id": "national",
      "name": "日本四极",
      "sub": "国家尺度 · 含主张与远海",
      "desc": "把日本主张的领土、实际管辖的极点和普通人能到的极点放在一起看。",
      "ids": ["etorofu", "benten", "soya", "minamitorishima", "nosappu", "okinotorishima", "hateruma", "tuishi", "yonaguni"]
    },
    {
      "id": "mainland",
      "name": "本土四极",
      "sub": "北海道·本州·四国·九州",
      "desc": "“日本本土四极”通常指四座主岛整体的最北、最东、最南、最西，不是国家全部领土的极限。",
      "ids": ["soya", "nosappu", "sata", "kannonzaki"]
    },
    {
      "id": "islands",
      "name": "四岛各自",
      "sub": "16 个岛端",
      "desc": "北海道、本州、四国、九州各自的东西南北端，不含周边离岛。",
      "ids": ["soya", "shirakami", "nosappu", "obana", "oma", "shiono", "todogasaki", "bishanohana", "takei", "ashizuri", "kamouda", "sadamisaki", "tadenoura", "sata", "tsurumisaki", "kannonzaki"]
    },
    {
      "id": "cert",
      "name": "证书四极",
      "sub": "日本本土四極踏破証明書",
      "desc": "宗谷岬、納沙布岬、佐多岬、神崎鼻四张证书可拼成一张“日本本土四极踏破证明书”；它对应的是本土四极，不是日本全部领土。",
      "ids": ["soya", "nosappu", "sata", "kannonzaki"]
    }
  ],
  "points": [
    {
      "id": "etorofu", "name": "択捉島・カモイワッカ岬", "jp": "択捉島 カモイワッカ岬", "cardinal": "北",
      "island": "択捉島", "pref": "北海道（主张）", "lat": 45.53, "lng": 148.75,
      "status": "claimed", "reach": "日本主张，俄方实际控制", "cert": false,
      "note": "日本主张的领土最北端；普通旅行者不能以“日本国内旅行”方式到达。"
    },
    {
      "id": "benten", "name": "弁天島", "jp": "弁天島", "cardinal": "北",
      "island": "弁天島", "pref": "北海道稚内市", "lat": 45.52639, "lng": 141.91917,
      "status": "rock", "reach": "日本实际管辖的最北端；无人岩礁", "cert": false,
      "note": "宗谷岬外海的岩礁，通常交通方式难以到达；不是普通游客的“最北端打卡点”。"
    },
    {
      "id": "soya", "name": "宗谷岬", "jp": "宗谷岬", "cardinal": "北",
      "island": "北海道", "pref": "北海道稚内市", "lat": 45.52274, "lng": 141.9366,
      "status": "ordinary", "reach": "普通游客可到", "cert": true,
      "note": "普通人通常到达的最北端；有最北端碑，也是本土四极证书之一。"
    },
    {
      "id": "minamitorishima", "name": "南鳥島", "jp": "南鳥島", "cardinal": "東",
      "island": "南鳥島", "pref": "東京都小笠原村", "lat": 24.28667, "lng": 153.98056,
      "status": "restricted", "reach": "海上自衛隊・気象庁设施；需许可", "cert": false,
      "note": "日本最东端；普通人不能自由前往，和“本土最东端”纳沙布岬不是一回事。"
    },
    {
      "id": "nosappu", "name": "納沙布岬", "jp": "納沙布岬", "cardinal": "東",
      "island": "北海道", "pref": "北海道根室市", "lat": 43.36667, "lng": 145.81667,
      "status": "ordinary", "reach": "普通游客可到", "cert": true,
      "note": "除离岛外的最东端，普通人通常到达的最东端；本土四极证书之一。"
    },
    {
      "id": "okinotorishima", "name": "沖ノ鳥島", "jp": "沖ノ鳥島", "cardinal": "南",
      "island": "沖ノ鳥島", "pref": "東京都小笠原村", "lat": 20.4225, "lng": 136.09,
      "status": "remote", "reach": "无人礁；普通人难以到达", "cert": false,
      "note": "日本最南端，由露出海面的礁石组成；不是可以买证书的旅游点。"
    },
    {
      "id": "hateruma", "name": "波照間島・高那崎", "jp": "波照間島 高那崎", "cardinal": "南",
      "island": "波照間島", "pref": "沖縄県竹富町", "lat": 24.045, "lng": 123.78,
      "status": "ordinary", "reach": "普通游客可到（需船）", "cert": false,
      "note": "除无人岛外的最南端，普通人通常到达的最南端；有“日本最南端”碑。"
    },
    {
      "id": "tuishi", "name": "Tuishi（与那国岛西北海礁）", "jp": "Tuishi", "cardinal": "西",
      "island": "与那国島", "pref": "沖縄県与那国町", "lat": 24.449, "lng": 122.932,
      "status": "rock", "reach": "海礁；普通人难以到达", "cert": false,
      "note": "日本实际管辖的最西端，位于与那国岛西崎西北约 120 米；普通游客通常到西崎。"
    },
    {
      "id": "yonaguni", "name": "与那国島・西崎", "jp": "与那国島 西崎", "cardinal": "西",
      "island": "与那国島", "pref": "沖縄県与那国町", "lat": 24.449, "lng": 122.933,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "普通人通常到达的最西端；有“日本最西端”碑，距台湾约 110 公里。"
    },
    {
      "id": "shirakami", "name": "白神岬", "jp": "白神岬", "cardinal": "南",
      "island": "北海道", "pref": "北海道松前町", "lat": 41.39736, "lng": 140.19739,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "北海道最南端（不含周边离岛）。"
    },
    {
      "id": "obana", "name": "尾花岬", "jp": "尾花岬", "cardinal": "西",
      "island": "北海道", "pref": "北海道せたな町", "lat": 42.066, "lng": 139.449,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "北海道最西端（不含周边离岛）。"
    },
    {
      "id": "oma", "name": "大間崎", "jp": "大間崎", "cardinal": "北",
      "island": "本州", "pref": "青森県大間町", "lat": 41.529, "lng": 140.911,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "本州最北端；隔津轻海峡与北海道相望。"
    },
    {
      "id": "shiono", "name": "潮岬", "jp": "潮岬", "cardinal": "南",
      "island": "本州", "pref": "和歌山県串本町", "lat": 33.43306, "lng": 135.7625,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "本州最南端；不是日本最南端。"
    },
    {
      "id": "todogasaki", "name": "魹ヶ崎", "jp": "魹ヶ崎", "cardinal": "東",
      "island": "本州", "pref": "岩手県宮古市", "lat": 39.54794, "lng": 142.07242,
      "status": "ordinary", "reach": "普通游客可到（需步行）", "cert": false,
      "note": "本州最东端；不是日本最东端。"
    },
    {
      "id": "bishanohana", "name": "毘沙ノ鼻", "jp": "毘沙ノ鼻", "cardinal": "西",
      "island": "本州", "pref": "山口県下関市", "lat": 34.11083, "lng": 130.86028,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "本州最西端；不是日本最西端。"
    },
    {
      "id": "takei", "name": "竹居岬", "jp": "竹居岬", "cardinal": "北",
      "island": "四国", "pref": "香川県高松市", "lat": 34.37, "lng": 134.1,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "四国最北端。"
    },
    {
      "id": "ashizuri", "name": "足摺岬", "jp": "足摺岬", "cardinal": "南",
      "island": "四国", "pref": "高知県土佐清水市", "lat": 32.72333, "lng": 133.02,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "四国最南端；不是日本最南端。"
    },
    {
      "id": "kamouda", "name": "蒲生田岬", "jp": "蒲生田岬", "cardinal": "東",
      "island": "四国", "pref": "徳島県阿南市", "lat": 33.83475, "lng": 134.75031,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "四国最东端。"
    },
    {
      "id": "sadamisaki", "name": "佐田岬", "jp": "佐田岬", "cardinal": "西",
      "island": "四国", "pref": "愛媛県伊方町", "lat": 33.344, "lng": 132.01297,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "四国最西端；不是日本最西端。"
    },
    {
      "id": "tadenoura", "name": "田野浦埋立地", "jp": "田野浦埋立地", "cardinal": "北",
      "island": "九州", "pref": "福岡県北九州市", "lat": 33.947, "lng": 130.961,
      "status": "ordinary", "reach": "普通游客可到（港区）", "cert": false,
      "note": "九州最北端；位于北九州港区，不是自然海角。"
    },
    {
      "id": "sata", "name": "佐多岬", "jp": "佐多岬", "cardinal": "南",
      "island": "九州", "pref": "鹿児島県南大隅町", "lat": 30.98611, "lng": 130.66167,
      "status": "ordinary", "reach": "普通游客可到", "cert": true,
      "note": "本土四极的最南端，也是九州最南端；不是日本全部领土的最南端。"
    },
    {
      "id": "tsurumisaki", "name": "鶴御崎", "jp": "鶴御崎", "cardinal": "東",
      "island": "九州", "pref": "大分県佐伯市", "lat": 32.93314, "lng": 132.08539,
      "status": "ordinary", "reach": "普通游客可到", "cert": false,
      "note": "九州最东端；不是日本最东端。"
    },
    {
      "id": "kannonzaki", "name": "神崎鼻", "jp": "神崎鼻", "cardinal": "西",
      "island": "九州", "pref": "長崎県佐世保市", "lat": 33.21778, "lng": 129.5525,
      "status": "ordinary", "reach": "普通游客可到", "cert": true,
      "note": "本土四极的最西端，也是九州最西端；不是日本全部领土的最西端。"
    }
  ]
};
