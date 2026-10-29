/* 上海全国重点文物保护单位 —— 数据
 * 40 处 / 41 个点位（沉香阁为豫园子项，单独成页）
 * 想补充资料：直接改本文件的 intro / note，
 * 想加照片：把图片放进 images/<id>/1.jpg … 6.jpg，详情页会自动显示。
 */
window.PLACES = [
  {
    id: "1-9", order: 1, name: "上海中山故居", batch: 1, code: "1-9",
    district: "黄浦区", type: "近现代", era: "1919 年",
    address: "香山路 7 号", status: "open", statusText: "开放 · 售票",
    route: "R1 老城厢 · 淮海路",
    intro: "孙中山 1918 至 1924 年在上海的寓所，一幢西式花园住宅。他在这里完成了《孙文学说》《实业计划》等著作，也会见过许多重要客人。"
  },
  {
    id: "1-10", order: 2, name: "中国社会主义青年团中央机关旧址", batch: 1, code: "1-10",
    district: "黄浦区", type: "近现代", era: "1920—1921 年",
    address: "淮海中路 567 弄 6 号（渔阳里）", status: "open", statusText: "开放 · 免费",
    route: "R1 老城厢 · 淮海路",
    intro: "渔阳里 6 号，1920 年中国社会主义青年团在此成立，外国语学社也设在这里。中国青年运动的起点，一幢普通的石库门房子。"
  },
  {
    id: "1-11", order: 3, name: "中国共产党第一次全国代表大会会址", batch: 1, code: "1-11",
    district: "黄浦区", type: "近现代", era: "1921 年",
    address: "兴业路 76 号", status: "reserve", statusText: "预约 · 免费",
    route: "R1 老城厢 · 淮海路",
    intro: "1921 年 7 月，中共一大在这幢石库门里弄住宅中召开。1952 年建立纪念馆，2019 年将太仓路 127 号的代表宿舍旧址归并进来。",
    note: "含子项：一大代表宿舍旧址（太仓路 127 号，暂不开放）"
  },
  {
    id: "1-31", order: 4, name: "鲁迅墓", batch: 1, code: "1-31",
    district: "虹口区", type: "近现代", era: "1956 年迁葬",
    address: "四川北路 2288 号 鲁迅公园内", status: "open", statusText: "开放 · 公园内",
    route: "R3 虹口 · 北站",
    intro: "鲁迅 1936 年逝世后葬于万国公墓，1956 年迁葬至鲁迅公园。花岗岩墓栏、毛泽东题写的墓碑，墓前是先生常走的这片草地。"
  },
  {
    id: "2-10", order: 5, name: "宋庆龄墓", batch: 2, code: "2-10",
    district: "长宁区", type: "近现代", era: "1981 年",
    address: "宋园路 21 号 宋庆龄陵园", status: "open", statusText: "开放 · 陵园",
    route: "R5 长宁 · 普陀",
    intro: "宋庆龄 1981 年逝世后安葬于宋氏墓地，与父母合葬。陵园内还有宋氏家族墓和一座生平陈列馆。"
  },
  {
    id: "2-39", order: 6, name: "豫园", batch: 2, code: "2-39",
    district: "黄浦区", type: "古建筑", era: "明至清",
    address: "安仁街（豫园商城）", status: "open", statusText: "开放 · 售票",
    route: "R1 老城厢 · 淮海路",
    intro: "明嘉靖三十八年（1559）潘允端始建，江南古典园林的代表。玉玲珑、点春堂、九曲桥，园外就是老城厢最热闹的一片。",
    note: "含子项：沉香阁（1996 年归入）"
  },
  {
    id: "chenxiangge", order: 7, name: "沉香阁", batch: 4, code: "2-39（子项）",
    district: "黄浦区", type: "古建筑", era: "明万历年间",
    address: "沉香阁路 29 号", status: "open", statusText: "开放 · 寺院",
    route: "R1 老城厢 · 淮海路",
    intro: "明万历年间建，因供奉一尊沉香木观音而得名，是上海著名的尼庵。1996 年作为子项归入豫园。",
    note: "子项：1996 年归入豫园"
  },
  {
    id: "3-25", order: 8, name: "龙华革命烈士纪念地", batch: 3, code: "3-25",
    district: "徐汇区", type: "近现代", era: "1927—1937 年",
    address: "龙华西路 180 号", status: "open", statusText: "开放 · 陵园",
    route: "R4 徐汇",
    intro: "原国民党淞沪警备司令部军法处和龙华监狱旧址。1927 至 1937 年间，大批共产党人和革命者在这里被关押、就义。"
  },
  {
    id: "3-179", order: 9, name: "松江唐经幢", batch: 3, code: "3-179",
    district: "松江区", type: "石刻", era: "唐大中十三年（859）",
    address: "中山中路 中山小学内", status: "reserve", statusText: "校园内 · 需预约",
    route: "R8 松江",
    intro: "唐大中十三年（859）建，现存上海最古老的地面建筑。整座经幢刻满陀罗尼经文与供养人题名，是唐代松江的实物见证。"
  },
  {
    id: "3-254", order: 10, name: "徐光启墓", batch: 3, code: "3-254",
    district: "徐汇区", type: "古墓葬", era: "明崇祯七年（1634）",
    address: "南丹路 17 号 光启公园", status: "open", statusText: "开放 · 公园",
    route: "R4 徐汇",
    intro: "徐光启 1633 年去世，1634 年葬于此。墓制中西合璧，十字架与中式墓冢并存，很像他本人的一生。"
  },
  {
    id: "4-83", order: 11, name: "兴圣教寺塔（松江方塔）", batch: 4, code: "4-83",
    district: "松江区", type: "古建筑", era: "北宋",
    address: "中山东路 235 号 方塔园", status: "open", statusText: "开放 · 售票",
    route: "R8 松江",
    intro: "北宋熙宁至元祐年间建，九级方形楼阁式砖木塔。塔身修长，是江南宋塔的典型，也是松江老城的天际线。"
  },
  {
    id: "4-120", order: 12, name: "真如寺大殿", batch: 4, code: "4-120",
    district: "普陀区", type: "古建筑", era: "元延祐七年（1320）",
    address: "兰溪路 399 号", status: "open", statusText: "开放 · 售票",
    route: "R5 长宁 · 普陀",
    intro: "元延祐七年（1320）建，江南现存最早的元代木构建筑之一。殿内梁架上的墨书题记，是断代的关键证据。"
  },
  {
    id: "4-220", order: 13, name: "上海外滩建筑群", batch: 4, code: "4-220",
    district: "黄浦区", district2: "虹口区", type: "近现代", era: "1906—1937 年",
    address: "中山东一路沿线（含虹口百老汇大厦）", status: "open", statusText: "街区 · 多需外观",
    route: "R2 外滩 · 南京路",
    intro: "1906 至 1937 年间建成的二十余幢建筑，从亚细亚大楼到中国银行，一条街就是一部远东金融史。多数仍是办公或酒店，看外观即可。"
  },
  {
    id: "4-226", order: 14, name: "上海邮政总局", batch: 4, code: "4-226",
    district: "虹口区", type: "近现代", era: "1924 年",
    address: "北苏州路 276 号", status: "reserve", statusText: "博物馆开放日",
    route: "R3 虹口 · 北站",
    intro: "1924 年建成，折衷主义风格，曾是远东最大的邮政建筑之一。钟楼、科林斯柱式，苏州河北岸最气派的一幢。现为上海邮政博物馆。"
  },
  {
    id: "5-37", order: 15, name: "福泉山遗址", batch: 5, code: "5-37",
    district: "青浦区", type: "古遗址", era: "新石器时代",
    address: "重固镇", status: "reserve", statusText: "需预约 / 团队",
    route: "R9 青浦",
    intro: "良渚文化的高台墓地，人工堆筑的土山，被称为“东方土筑金字塔”。一层层墓葬叠压，是太湖地区史前社会最完整的剖面之一。"
  },
  {
    id: "5-482", order: 16, name: "上海宋庆龄故居", batch: 5, code: "5-482",
    district: "徐汇区", type: "近现代", era: "1948—1981 年",
    address: "淮海中路 1843 号", status: "open", statusText: "开放 · 售票",
    route: "R4 徐汇",
    intro: "1948 至 1981 年宋庆龄在上海的寓所。一幢红瓦白墙的小楼，院子里的樟树和鸽子，是她晚年生活的背景。"
  },
  {
    id: "5-483", order: 17, name: "张闻天故居", batch: 5, code: "5-483",
    district: "浦东新区", type: "近现代", era: "近代",
    address: "祝桥镇 邓三村", status: "open", statusText: "开放 · 免费",
    route: "R11 奉贤 · 浦东",
    intro: "清光绪年间建造的江南农村宅院，张闻天出生于此。远离市区，是一处安静得有点出乎意料的国保。"
  },
  {
    id: "6-505", order: 18, name: "龙华塔", batch: 6, code: "6-505",
    district: "徐汇区", type: "古建筑", era: "北宋太平兴国二年（977）",
    address: "龙华路 2853 号", status: "view", statusText: "仅外观 · 寺前",
    route: "R4 徐汇",
    intro: "北宋太平兴国二年（977）建，七级八面砖木塔。塔在龙华寺山门前，不能登塔，但绕塔一圈就能看出宋塔的收分与檐口。"
  },
  {
    id: "6-926", order: 19, name: "马勒住宅", batch: 6, code: "6-926",
    district: "静安区", type: "近现代", era: "1936 年",
    address: "陕西南路 30 号", status: "view", statusText: "酒店 · 消费可入",
    route: "R6 静安",
    intro: "1936 年建，北欧挪威风格的花园住宅，马勒家族的产业。尖顶、彩色玻璃、船形装饰，像一座搬进上海的童话城堡。现为精品酒店。"
  },
  {
    id: "6-927", order: 20, name: "国际饭店", batch: 6, code: "6-927",
    district: "黄浦区", type: "近现代", era: "1934 年",
    address: "南京西路 170 号", status: "view", statusText: "大堂 / 餐厅",
    route: "R2 外滩 · 南京路",
    intro: "1934 年建成，24 层，邬达克设计，曾长期是远东第一高楼。上海城市测绘的“大地原点”就在这幢楼里。"
  },
  {
    id: "7-0134", order: 21, name: "崧泽遗址", batch: 7, code: "7-0134",
    district: "青浦区", type: "古遗址", era: "新石器时代",
    address: "赵巷镇 崧泽村", status: "open", statusText: "开放 · 免费",
    route: "R9 青浦",
    intro: "马家浜文化到良渚文化的聚落遗址，“上海第一人”头骨在此出土。崧泽文化因它得名，是上海地区最早的新石器时代命名地。"
  },
  {
    id: "7-0135", order: 22, name: "上海马桥遗址", batch: 7, code: "7-0135",
    district: "闵行区", type: "古遗址", era: "新石器时代至商",
    address: "马桥镇 俞塘村", status: "reserve", statusText: "展示馆 · 预约",
    route: "R10 嘉定 · 闵行",
    intro: "新石器时代至商代，马桥文化的命名地。太湖地区青铜时代的一把标尺，也是上海“有青铜”的证据。"
  },
  {
    id: "7-0136", order: 23, name: "广富林遗址", batch: 7, code: "7-0136",
    district: "松江区", type: "古遗址", era: "新石器时代、东周",
    address: "广富林街道", status: "open", statusText: "开放 · 售票",
    route: "R8 松江",
    intro: "良渚文化到周代的聚落，广富林文化的命名地。今天的水下博物馆把遗址本身做成了展品，屋顶浮在水面上。"
  },
  {
    id: "7-0137", order: 24, name: "志丹苑元代水闸遗址", batch: 7, code: "7-0137",
    district: "普陀区", type: "古遗址", era: "元",
    address: "延长西路 志丹路口", status: "open", statusText: "开放 · 免费",
    route: "R5 长宁 · 普陀",
    intro: "2001 年发现，元代石构水闸，木桩、石板、铁锭榫都保存了下来。上海古代水利工程最完整的一处实证，现在罩在博物馆里。"
  },
  {
    id: "7-0945", order: 25, name: "嘉定孔庙", batch: 7, code: "7-0945",
    district: "嘉定区", type: "古建筑", era: "明至清",
    address: "南大街 183 号", status: "open", statusText: "开放 · 售票",
    route: "R10 嘉定 · 闵行",
    intro: "南宋嘉定十二年（1219）始建，现存建筑多为明清重建。牌坊、泮池、大成殿一路排开，是江南规模较大的孔庙，现为嘉定博物馆。"
  },
  {
    id: "7-1694", order: 26, name: "杨树浦水厂", batch: 7, code: "7-1694",
    district: "杨浦区", type: "近现代", era: "1883 年",
    address: "杨树浦路 830 号", status: "closed", statusText: "厂区不开放 · 外观",
    route: "R7 杨浦滨江",
    intro: "1883 年建成，中国第一座现代化自来水厂，英式城堡风格的厂房至今仍在供水。厂区不开放，走杨浦滨江看立面最合适。"
  },
  {
    id: "7-1695", order: 27, name: "佘山天文台", batch: 7, code: "7-1695",
    district: "松江区", type: "近现代", era: "1900 年",
    address: "西佘山", status: "open", statusText: "开放 · 售票",
    route: "R8 松江",
    intro: "1900 年建，中国第一座现代天文台。圆顶、子午仪、百年老望远镜都还在，现为上海天文博物馆，在山顶，需要爬一段。"
  },
  {
    id: "7-1696", order: 28, name: "提篮桥监狱早期建筑", batch: 7, code: "7-1696",
    district: "虹口区", type: "近现代", era: "1903 年",
    address: "长阳路 147 号", status: "closed", statusText: "不开放 · 外观",
    route: "R3 虹口 · 北站",
    intro: "1903 年建，曾被称为“远东第一监狱”。十字形监楼、厚重的红砖墙，是近代司法建筑的一个极端样本。不对外开放，只能看外观。"
  },
  {
    id: "7-1697", order: 29, name: "徐家汇天主堂", batch: 7, code: "7-1697",
    district: "徐汇区", type: "近现代", era: "1910 年",
    address: "蒲西路 158 号", status: "reserve", statusText: "弥撒 / 预约",
    route: "R4 徐汇",
    intro: "1910 年建成，哥特式双塔，红砖清水墙。曾是远东最大的天主教堂之一，徐家汇的地名与天际线都由它定下。"
  },
  {
    id: "7-1698", order: 30, name: "中国共产党第二次全国代表大会会址", batch: 7, code: "7-1698",
    district: "静安区", type: "近现代", era: "1922 年",
    address: "成都北路 7 弄 30 号（辅德里）", status: "open", statusText: "开放 · 免费",
    route: "R6 静安",
    intro: "1922 年 7 月，中共二大在辅德里这幢石库门里召开，制定了党的第一部党章。一间客堂，几张凳子，历史的分量却很重。"
  },
  {
    id: "8-0034", order: 31, name: "青龙镇遗址", batch: 8, code: "8-0034",
    district: "青浦区", type: "古遗址", era: "唐宋",
    address: "白鹤镇 青龙村", status: "view", statusText: "遗址 · 塔外观",
    route: "R9 青浦",
    intro: "唐宋时期上海最早的对外贸易港口，“先有青龙镇，后有上海滩”。隆平寺塔基的发掘，让它成为海上丝绸之路的重要证据。地面还能看到青龙塔。"
  },
  {
    id: "8-0563", order: 32, name: "圣三一基督教堂", batch: 8, code: "8-0563",
    district: "黄浦区", type: "近现代", era: "1869 年",
    address: "九江路 219 号", status: "closed", statusText: "修缮 / 礼拜 · 看公告",
    route: "R2 外滩 · 南京路",
    intro: "1869 年建成，上海现存最早的基督教堂，红砖哥特式，老上海叫它“红礼拜堂”。钟楼曾是全城制高点。近年长期修缮，去之前先看公告。"
  },
  {
    id: "8-0564", order: 33, name: "圣约翰大学近代建筑", batch: 8, code: "8-0564",
    district: "长宁区", type: "近现代", era: "1879—1948 年",
    address: "万航渡路 1575 号（华东政法大学）", status: "reserve", statusText: "校园 · 预约",
    route: "R5 长宁 · 普陀",
    intro: "1879 年创办，中国最早的教会大学之一，有“东方哈佛”之称。中西合璧的校园建筑群沿苏州河展开，现为华东政法大学长宁校区。"
  },
  {
    id: "8-0565", order: 34, name: "上海交通大学早期建筑", batch: 8, code: "8-0565",
    district: "徐汇区", type: "近现代", era: "1896 年起",
    address: "华山路 1954 号", status: "reserve", statusText: "校园 · 预约",
    route: "R4 徐汇",
    intro: "1896 年南洋公学创办，校园从未搬迁。老图书馆、中院、新上院……一幢幢看过去，就是一部中国近现代建筑风格的流动样本。"
  },
  {
    id: "8-0566", order: 35, name: "沪江大学近代建筑", batch: 8, code: "8-0566",
    district: "杨浦区", type: "近现代", era: "1906—1948 年",
    address: "军工路 516 号（上海理工大学）", status: "reserve", statusText: "校园 · 预约",
    route: "R7 杨浦滨江",
    intro: "1906 年创办，清水红砖、两坡红瓦，三十余幢历史建筑风格统一，是上海保存最完整的校园建筑群之一。现为上海理工大学。"
  },
  {
    id: "8-0567", order: 36, name: "上海工部局宰牲场旧址", batch: 8, code: "8-0567",
    district: "虹口区", type: "近现代", era: "1933 年",
    address: "沙泾路 10 号", status: "open", statusText: "开放 · 免费",
    route: "R3 虹口 · 北站",
    intro: "1933 年建，当时远东规模最大、技术最完善的宰牲场。混凝土的伞形柱、盘旋的坡道，工业建筑的美感在今天才被真正看见。现为 1933 老场坊。"
  },
  {
    id: "8-0568", order: 37, name: "四行仓库抗战旧址", batch: 8, code: "8-0568",
    district: "静安区", type: "近现代", era: "1937 年",
    address: "光复路 21 号", status: "reserve", statusText: "预约 · 免费",
    route: "R3 虹口 · 北站",
    intro: "1931 年建成的货物仓库。1937 年谢晋元率部在此坚守四昼夜，西山墙上的弹孔至今保留。现为四行仓库抗战纪念馆。"
  },
  {
    id: "8-0569", order: 38, name: "中国共产党代表团驻沪办事处旧址", batch: 8, code: "8-0569",
    district: "黄浦区", type: "近现代", era: "1946—1947 年",
    address: "思南路 73 号", status: "open", statusText: "开放 · 免费",
    route: "R1 老城厢 · 淮海路",
    intro: "1946 至 1947 年中共代表团驻沪办事处，人称“周公馆”。一幢西班牙式花园洋房，周恩来在这里工作、会客，也是上海保存最完好的周恩来纪念地。"
  },
  {
    id: "8-0570", order: 39, name: "中国福利会少年宫", batch: 8, code: "8-0570",
    district: "静安区", type: "近现代", era: "1953 年",
    address: "延安西路 64 号", status: "closed", statusText: "不开放 · 外观",
    route: "R6 静安",
    intro: "原嘉道理住宅，1924 年建，因通体大理石被称为“大理石大厦”。1953 年宋庆龄在此创办中国第一所少年宫。内部不开放，可从延安西路看立面。"
  },
  {
    id: "8-0571", order: 40, name: "上海科学会堂", batch: 8, code: "8-0571",
    district: "黄浦区", type: "近现代", era: "1958 年",
    address: "南昌路 47 号", status: "closed", statusText: "不开放 · 开放日",
    route: "R1 老城厢 · 淮海路",
    intro: "原法国学堂，20 世纪初的法式建筑，上海现存规模最大的单体法式木构架建筑。1958 年改为科学会堂，平日是市科协办公地，遗产日偶尔开放。"
  },
  {
    id: "huatinghaitang", order: 41, name: "华亭海塘奉贤段", batch: 8, code: "8-（子项待核）",
    district: "奉贤区", type: "其他", era: "清",
    address: "柘林镇 奉柘公路南侧", status: "open", statusText: "开放 · 野外自驾",
    route: "R11 奉贤 · 浦东",
    intro: "现存石塘为清代所建，自柘林“小普陀”东侧一直到奉海村，长约 3.9 公里，人称“上海小长城”。通体青石与花岗岩条石垒砌，是江南海塘最有代表性的区段。"
  }
];

window.BATCHES = [
  { n: 1, label: "第一批", year: "1961" },
  { n: 2, label: "第二批", year: "1982" },
  { n: 3, label: "第三批", year: "1988" },
  { n: 4, label: "第四批", year: "1996" },
  { n: 5, label: "第五批", year: "2001" },
  { n: 6, label: "第六批", year: "2006" },
  { n: 7, label: "第七批", year: "2013" },
  { n: 8, label: "第八批", year: "2019" }
];

window.DISTRICTS = [
  "黄浦区", "徐汇区", "虹口区", "静安区", "长宁区", "普陀区", "杨浦区",
  "松江区", "青浦区", "嘉定区", "闵行区", "浦东新区", "奉贤区"
];
