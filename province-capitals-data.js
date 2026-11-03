/* 34 个省级行政区 · 省会/首府
 * 记录口径：到过省会/首府主城区；仅转机、站内换乘不算。
 */
window.CHINA_CAPITALS = {
  "updated": "2026-11-03",
  "definition": "到过省会/首府主城区：住一晚，或在城区停留至少 3 小时并参观一处地点/吃饭，或从机场/车站进入城区。仅转机、站内换乘、高速服务区停留不算。",
  "regions": [
    { "id": "north", "name": "华北", "provinces": ["beijing", "tianjin", "hebei", "shanxi", "neimenggu"] },
    { "id": "northeast", "name": "东北", "provinces": ["liaoning", "jilin", "heilongjiang"] },
    { "id": "east", "name": "华东", "provinces": ["shanghai", "jiangsu", "zhejiang", "anhui", "fujian", "jiangxi", "shandong"] },
    { "id": "central", "name": "华中", "provinces": ["henan", "hubei", "hunan"] },
    { "id": "south", "name": "华南", "provinces": ["guangdong", "guangxi", "hainan"] },
    { "id": "southwest", "name": "西南", "provinces": ["chongqing", "sichuan", "guizhou", "yunnan", "xizang"] },
    { "id": "northwest", "name": "西北", "provinces": ["shaanxi", "gansu", "qinghai", "ningxia", "xinjiang"] },
    { "id": "gangaotai", "name": "港澳台", "provinces": ["taiwan", "hongkong", "macau"] }
  ],
  "provinces": [
    { "id": "beijing", "name": "北京", "mapName": "北京市", "capital": "北京", "type": "直辖市", "region": "north", "adcode": "110000" },
    { "id": "tianjin", "name": "天津", "mapName": "天津市", "capital": "天津", "type": "直辖市", "region": "north", "adcode": "120000" },
    { "id": "hebei", "name": "河北", "mapName": "河北省", "capital": "石家庄", "type": "省", "region": "north", "adcode": "130000" },
    { "id": "shanxi", "name": "山西", "mapName": "山西省", "capital": "太原", "type": "省", "region": "north", "adcode": "140000" },
    { "id": "neimenggu", "name": "内蒙古", "mapName": "内蒙古自治区", "capital": "呼和浩特", "type": "自治区", "region": "north", "adcode": "150000" },
    { "id": "liaoning", "name": "辽宁", "mapName": "辽宁省", "capital": "沈阳", "type": "省", "region": "northeast", "adcode": "210000" },
    { "id": "jilin", "name": "吉林", "mapName": "吉林省", "capital": "长春", "type": "省", "region": "northeast", "adcode": "220000" },
    { "id": "heilongjiang", "name": "黑龙江", "mapName": "黑龙江省", "capital": "哈尔滨", "type": "省", "region": "northeast", "adcode": "230000" },
    { "id": "shanghai", "name": "上海", "mapName": "上海市", "capital": "上海", "type": "直辖市", "region": "east", "adcode": "310000" },
    { "id": "jiangsu", "name": "江苏", "mapName": "江苏省", "capital": "南京", "type": "省", "region": "east", "adcode": "320000" },
    { "id": "zhejiang", "name": "浙江", "mapName": "浙江省", "capital": "杭州", "type": "省", "region": "east", "adcode": "330000" },
    { "id": "anhui", "name": "安徽", "mapName": "安徽省", "capital": "合肥", "type": "省", "region": "east", "adcode": "340000" },
    { "id": "fujian", "name": "福建", "mapName": "福建省", "capital": "福州", "type": "省", "region": "east", "adcode": "350000" },
    { "id": "jiangxi", "name": "江西", "mapName": "江西省", "capital": "南昌", "type": "省", "region": "east", "adcode": "360000" },
    { "id": "shandong", "name": "山东", "mapName": "山东省", "capital": "济南", "type": "省", "region": "east", "adcode": "370000" },
    { "id": "henan", "name": "河南", "mapName": "河南省", "capital": "郑州", "type": "省", "region": "central", "adcode": "410000" },
    { "id": "hubei", "name": "湖北", "mapName": "湖北省", "capital": "武汉", "type": "省", "region": "central", "adcode": "420000" },
    { "id": "hunan", "name": "湖南", "mapName": "湖南省", "capital": "长沙", "type": "省", "region": "central", "adcode": "430000" },
    { "id": "guangdong", "name": "广东", "mapName": "广东省", "capital": "广州", "type": "省", "region": "south", "adcode": "440000" },
    { "id": "guangxi", "name": "广西", "mapName": "广西壮族自治区", "capital": "南宁", "type": "自治区", "region": "south", "adcode": "450000" },
    { "id": "hainan", "name": "海南", "mapName": "海南省", "capital": "海口", "type": "省", "region": "south", "adcode": "460000" },
    { "id": "chongqing", "name": "重庆", "mapName": "重庆市", "capital": "重庆", "type": "直辖市", "region": "southwest", "adcode": "500000" },
    { "id": "sichuan", "name": "四川", "mapName": "四川省", "capital": "成都", "type": "省", "region": "southwest", "adcode": "510000" },
    { "id": "guizhou", "name": "贵州", "mapName": "贵州省", "capital": "贵阳", "type": "省", "region": "southwest", "adcode": "520000" },
    { "id": "yunnan", "name": "云南", "mapName": "云南省", "capital": "昆明", "type": "省", "region": "southwest", "adcode": "530000" },
    { "id": "xizang", "name": "西藏", "mapName": "西藏自治区", "capital": "拉萨", "type": "自治区", "region": "southwest", "adcode": "540000" },
    { "id": "shaanxi", "name": "陕西", "mapName": "陕西省", "capital": "西安", "type": "省", "region": "northwest", "adcode": "610000" },
    { "id": "gansu", "name": "甘肃", "mapName": "甘肃省", "capital": "兰州", "type": "省", "region": "northwest", "adcode": "620000" },
    { "id": "qinghai", "name": "青海", "mapName": "青海省", "capital": "西宁", "type": "省", "region": "northwest", "adcode": "630000" },
    { "id": "ningxia", "name": "宁夏", "mapName": "宁夏回族自治区", "capital": "银川", "type": "自治区", "region": "northwest", "adcode": "640000" },
    { "id": "xinjiang", "name": "新疆", "mapName": "新疆维吾尔自治区", "capital": "乌鲁木齐", "type": "自治区", "region": "northwest", "adcode": "650000" },
    { "id": "taiwan", "name": "台湾", "mapName": "台湾省", "capital": "台北", "type": "省", "region": "gangaotai", "adcode": "710000", "note": "按 34 个省级行政区名单列入；个人旅行记录，不作其他表述。" },
    { "id": "hongkong", "name": "香港", "mapName": "香港特别行政区", "capital": "香港", "type": "特别行政区", "region": "gangaotai", "adcode": "810000" },
    { "id": "macau", "name": "澳门", "mapName": "澳门特别行政区", "capital": "澳门", "type": "特别行政区", "region": "gangaotai", "adcode": "820000" }
  ]
};
