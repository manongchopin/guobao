# 我走过的世界 · 网页版

一个静态网页，不需要安装任何东西。

## 打开

直接双击 `index.html`，进「我走过的世界」首页；点「中国的世界遗产」或「中国的国保」进入对应目录。国保入口是 `guobao.html`，再往下是各省、市、区县。

如果想让手机也能访问（同一个 Wi-Fi 下），在本文件夹里运行：

```bash
python3 -m http.server 8000
```

然后浏览器打开 `http://localhost:8000`，手机打开 `http://电脑的局域网IP:8000`。

## 怎么用

- 首页（`index.html`）：读万卷书，行万里路；三个入口——中国的世界遗产、我去过的世界遗产、中国的国保。
- 顶部两个按钮：**按批次** / **按辖区**，一键切换。选择会被记住，下次打开还是上次的视图。
- 点任意一张卡片，进入这一处的独立页面。网址形如 `place.html?id=1-11`，可以直接收藏、分享。
- 详情页底部有「上一处 / 下一处」，按批次顺序走，不用退回清单。
- 浙江页（`zhejiang.html`）：11 个地级市，每个市下面列出所辖的区 / 县 / 县级市，共 90 个；义乌已点亮。
- 义乌页（`yiwu.html`）：7 处国保，按「批次 / 镇街」切换，点进去是 `place.html?set=yiwu&id=…`。
- 世界遗产单页（`heritage-place.html?id=437`）：简介、入选信息、UNESCO 外链、照片与游记位。
- 义乌市级文保（`yiwu-city.html`）：276 个公布名称、329 个点位，按 14 个镇街分组；左侧固定镇街索引（手机上是两列目录），点击即可筛选。
- 金华各区县页（`wucheng/lanxi/dongyang/yongkang/wuyi/pujiang/panan.html`）：共 31 处国保，按「批次 / 镇街」切换，详情走 `place.html?set=区县&id=…`。金东区暂无国保，未建页。

## 打卡（已走过的国保）

- 每张卡片右上角有一个圆点：`＋` 表示没去过，`✓` 表示去过；点一下切换。
- 详情页顶部也有「标记为已去过」，旁边显示本清单已走多少。
- 上海、义乌、北京：`LIST_CONFIG.districtTable = true` + `batchTable: true`，批次与辖区都是表格，批次/镇街视图：批次保持卡片，辖区改成表格 + 索引；表格行右侧有独立打卡按钮。
- 禁止出境文物：按批次、按省份都是表格 + 索引，行右侧独立打卡（`forbidden-visited.js`）。
- 世界遗产：61 项清单显示 `已走 21/61`，卡片打钩标红；「我去过的世界遗产」按大洲 → 国家列出 96 项。
- 计数会逐级汇总：
  - 区县页（如义乌）：`已走 1 / 7`
  - 金华（浙江页金华段）：`已走 1 / 38`，每个区县卡片显示 `1/7 已走`
  - 全国（国保入口）：`国保已走 1 / 5058`
- 状态存在浏览器 localStorage；`visited.js` 里的 `VISITED_SEED` 是公开的“已走”种子（目前放了古月桥 5-289）。
- 世界遗产同理：`visited-wh.js` 里 `WH_VISITED_SEED` 放了 21 个 UNESCO 编号；中国 61 项里打钩 21 项，详情页可切换。
- 想永久点亮：把编号加进 `VISITED_SEED`，并把 `SEED_VERSION` 加 1，提交即可。
- 换设备、清缓存或换域名后，本机记录会丢；种子里的记录不受影响。

## 加照片

每一处一个文件夹，文件夹名就是网址里 `?id=` 后面那串：

```
images/1-11/1.jpg
images/1-11/2.jpg
```

- 命名 `1.jpg` 到 `6.jpg`，按序号显示，最多 6 张。
- 格式用 JPG（HEIC 浏览器不一定认，先在手机里导出成 JPG）。
- 放进去刷新页面就会自动出现，不需要改代码。
- 没有照片时，页面显示「文保碑 / 建筑本体 / 环境与细节」三个占位框。

## 改文字

所有内容都在 `data.js` 里，一条对应一处：

```js
{
  id: "1-11",
  name: "中国共产党第一次全国代表大会会址",
  ...
  intro: "简介写在这里。"
}
```

- `intro`：详情页的简介。
- `statusText`：开放状态文案，例如「预约 · 免费」。
- `photos`：也可以不用 1.jpg 这套规则，直接写数组，例如
  `photos: ["images/1-11/大门.jpg", "images/1-11/展厅.jpg"]`。
- `travel`：游记。用两个换行分段，例如
  `travel: "第一段。\n\n第二段。"`，填了就会替换掉详情页的占位框。

## 目录

```
web/
├── index.html          首页：我走过的世界
├── heritage.html       中国的世界遗产（61 项，按年份/省份）
├── heritage-place.html 世界遗产单页（?id=437）
├── visited-heritage.html  我去过的世界遗产（96 项，大洲/国家表格）
├── canal.html          大运河 31 个遗产区（资料页）
├── jomon-irie-takasago.html 入江·高砂贝冢中文资料（含 PDF）
├── jomon.html          日本北部的绳纹史前遗址群 · 资料库
├── world-heritage.html  全世界的世界遗产（五大区域总表）
├── wh-asia.html 等      五大区域分页（国家索引 + 表格）
├── world-heritage-data.js 全世界 1,259 条区域名录
├── assets/guobao-mark.png 国保入口右上角标志
├── images/home/books.jpg  首页「读万卷书」
├── images/home/road.jpg   首页「行万里路」（地图 © OpenStreetMap contributors）
├── forbidden.html      195 件禁止出境文物（按批次/省份）
├── guobao.html         国保入口：34 个省级行政区
├── macau.html          澳门被评定的不动产（165 项，按编号 + 区域筛选）
├── hongkong.html       香港法定古迹（138 项，表格 + 辖区索引）
├── hk-place.html       香港法定古迹单页（?id=M0086）
├── hk-grade-1/2/3.html 香港一、二、三级历史建筑
├── hk-grade-data.js    三档历史建筑 777 项
├── shanghai.html       上海（批次卡片 / 辖区表格）
├── beijing.html        北京（135 处，批次卡片 / 辖区表格）       上海清单页（批次 / 辖区）
├── heilongjiang.html   黑龙江（13 市 / 122 县区 / 57 处）
├── heilongjiang-guobao.html 黑龙江国保
├── heilongjiang-data.js 黑龙江 57 处
├── guizhou.html        贵州（9 市州 / 88 县区 / 81 处）
├── guizhou-guobao.html 贵州国保
├── guizhou-data.js     贵州 81 处
├── county.html         通用县区页（按批次表格 + 打卡）
├── tianjin.html        天津（16 区 / 34 处）
├── tianjin-guobao.html 天津国保（按批次 / 按辖区）
├── tianjin-data.js     天津 34 处国保
├── ningxia.html        宁夏（5 市 / 22 县区 / 37 处）
├── ningxia-guobao.html 宁夏国保（按批次 / 按县区）
├── ningxia-data.js     宁夏 37 处国保
├── neimenggu.html    内蒙古（12 盟市 / 149 处）
├── jilin.html          吉林（9 市州 / 93 处）
├── jiangxi.html        江西（11 市 / 160 处）
├── shandong.html       山东（16 市 / 226 处）
├── taiwan.html         台湾（22 县市 / 119 处重要古迹单位）
├── yunnan.html         云南（16 市州 / 170 处）
├── xizang.html         西藏（7 市地 / 70 处）
├── yunnan-guobao.html  云南国保总表
├── xizang-guobao.html  西藏国保总表
├── chongqing.html      重庆（38 区县 / 64 处）
├── sichuan.html        四川（21 市州 / 261 处）
├── chongqing-guobao.html 重庆国保总表
├── sichuan-guobao.html 四川国保总表
├── hubei.html          湖北（14 市州 / 168 处）
├── hunan.html          湖南（14 市州 / 228 处）
├── hubei-guobao.html   湖北国保总表
├── hunan-guobao.html   湖南国保总表
├── henan.html          河南（18 市 / 420 处）
├── shandong-guobao.html 山东国保总表
├── henan-guobao.html   河南国保总表
├── fujian.html         福建（9 市 / 169 处）
├── jiangxi-guobao.html 江西国保总表
├── fujian-guobao.html  福建国保总表
├── anhui.html          安徽（16 市 / 174 处）
├── jilin-guobao.html   吉林国保总表
├── anhui-guobao.html   安徽国保总表
├── liaoning.html      辽宁（16 市 / 144 处）
├── neimenggu-guobao.html 内蒙古国保总表
├── liaoning-guobao.html 辽宁国保总表
├── hebei.html          河北（11 市 / 290 处）
├── jiangsu.html        江苏（13 市 / 251 处）
├── hebei-guobao.html   河北国保总表
├── jiangsu-guobao.html 江苏国保总表
├── guangdong.html      广东（21 市 / 124 县区 / 133 处）
├── guangxi.html        广西（14 市 / 111 县区 / 81 处）
├── guangdong-guobao.html 广东国保总表
├── hainan.html         海南（4 市 / 15 县区 / 35 处）
├── hainan-guobao.html  海南国保（按批次 / 按市县）
├── hainan-data.js      海南 35 处国保
├── shaanxi.html        陕西（10 市 / 270 处）
├── gansu.html          甘肃（14 市州 / 151 处）
├── qinghai.html        青海（8 市州 + 省本级 / 50 处）
├── xinjiang.html       新疆（15 地州 / 133 处）
├── shaanxi-guobao.html 陕西国保总表
├── shanxi.html         山西（11 市 / 121 县区 / 531 处）
├── shanxi-guobao.html  山西国保总表（按批次 / 按地级市）
├── shanxi-data.js      山西 531 处（市县归属）
├── zhejiang.html       浙江骨架页（11 市 → 90 县区）
├── yiwu.html           义乌清单页（批次 / 镇街）
├── yiwu-city.html      义乌市级文保（按镇街）
├── wucheng.html        婺城区国保（7 处）
├── lanxi.html          兰溪市国保（8 处）
├── dongyang.html       东阳市国保（6 处）
├── yongkang.html       永康市国保（2 处）
├── wuyi.html           武义县国保（3 处）
├── pujiang.html        浦江县国保（3 处）
├── panan.html          磐安县国保（2 处）
├── place.html          详情页模板（?set=shanghai|yiwu|区县）
├── data.js             上海 40 处数据
├── yiwu-data.js        义乌 7 处国保数据
├── yiwu-city-data.js   义乌市级文保 276 处 / 329 点位
├── heritage-data.js    中国世界遗产 61 项（含简介与标准）
├── heritage-visited-data.js  中国以外 75 项已走世界遗产
├── visited-wh.js       中国 21 项的打卡种子
├── forbidden-data.js   195 件禁止出境文物（含 F0001–F0195）
├── forbidden-visited.js  禁止出境文物打卡
├── beijing-data.js     北京 135 处国保
├── macau-data.js       澳门不动产 165 项
├── macau-visited.js    澳门不动产打卡
├── assets/yiwu-mark.png 义乌团扇标志
├── assets/flag-hk.svg  香港区旗
├── assets/flag-macau.svg 澳门区旗
├── hongkong-data.js    香港法定古迹 138 项
├── jincheng-data.js    晋城 6 个县区 72 处国保
├── jinhua-data.js      金华 7 个区县 31 处国保
├── visited.js          打卡种子 + localStorage 读写
├── files/
│   ├── yiwu-city-2019.pdf   市级名录整理版 PDF（15 页，脚本生成）
│   ├── first-batch-1961.pdf 第一批国保名单整理本（10 页，OCR 校订）
│   └── first-batch-1961-scan.pdf 1961 年公报删节原档（11 页扫描）
├── assets/
│   ├── style.css
│   ├── app.js          清单页逻辑
│   ├── place.js        详情页逻辑
│   └── favicon.svg
└── images/             每处一个文件夹，放照片
```

## 以后加省份

只搭行政骨架（像浙江）：复制 `zhejiang.html` 改名，替换里面的地级市与县区列表。
已有国保清单（像上海、义乌）：复制 `shanghai.html` / `yiwu.html` 和对应的 `*-data.js`，
把页面里的 `LIST_CONFIG` 指向新数据文件（`detailBase` 记得带上自己的 `set`）。
然后在 `index.html` 里找到该省份的卡片，把 `<div class="prov">` 换成
`<a class="prov is-active" href="jiangsu.html">`（骨架可用 `is-wip`），并写上说明。

全国入口上的「已整理 1 / 34」和进度条，也在 `index.html` 顶部手动改。

## 文件版权页规范

以后本站提供下载或在线的整理文件（PDF、Word、表格等），只要经过 DeepSeek 与 chopinfisher 共同整理，封面或首页必须先放「版权与整理说明」，再进入正文。

至少包含五项：

1. **原始来源**：原公告单位、公告名称、发布日期、原始链接（如有）。
2. **整理分工**：DeepSeek 负责数据整理、分类与版面生成；chopinfisher 负责核校、补充与发布。
3. **权利归属**：整理版著作权归整理者共同所有；原始内容著作权归原公告单位或原作者。
4. **使用范围**：仅供个人学习、研究与旅行参考；转载或引用请注明来源。
5. **版本信息**：整理版年月；如更新，标注版本号并在下载链接加 `?v=N`。

标准文字模板：

> **版权与整理说明**
>
> 原始名录／资料：〔单位〕〔日期〕公告《〔名称〕》。
>
> 本整理版由 **DeepSeek** 与 **chopinfisher** 共同整理：DeepSeek 负责数据整理、分类与版面生成；chopinfisher 负责核校、补充与发布。
>
> 整理版著作权归整理者共同所有；原始内容著作权归原公告单位。仅供个人学习、研究与旅行参考，转载或引用请注明来源。

版式上沿用义乌名录的做法：A4 封面，标题、原始说明、镇街／章节列表之后放版权块，页脚标「整理版 年 月」与原始网址。

文件链接统一在新标签页打开，不强制下载；新增文件后把链接写成 `href="files/xxx.pdf" target="_blank" rel="noopener"`。

## 整理本排版规范

扫描件做了 OCR 之后，不再逐页复刻原件版式，而是重做一本「整理本」。以后按以下要求：

1. **封面**：标题、原始来源、整理分工、版权说明；沿用义乌名录与第一批名单的封面结构。
2. **目录**：按内容分章，页码用实际分页回填，不写死。
3. **正文自由流动**：不固定每页行数，不按原档页码一一对应；排到页底再换页，章节之间可以连续接排。
4. **表头重复**：跨页表格必须重复表头，行不跨页拆断。
5. **重新编号**：原编号与阅读顺序不一致时，按阅读顺序重编 1—N，表头写「序号」，并在说明中注明原编号规则、可对照原档。
6. **版式**：白纸内页、无衬线字体、黑色表头、页眉页脚、页码；封面保留米色纸与印章。
7. **两个版本**：档案页同时提供原档扫描件与 OCR 整理本，均在新标签页打开。
8. **校订说明**：写清 OCR 工具、校订依据、地址与历史称谓的处理方式。

目标是「可检索、可引用、可打印」，而不是影印件的翻版。
