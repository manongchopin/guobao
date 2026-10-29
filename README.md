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
- 义乌市级文保（`yiwu-city.html`）：276 个公布名称、329 个点位，按 14 个镇街分组；左侧固定镇街索引（手机上是两列目录），点击即可筛选。
- 金华各区县页（`wucheng/lanxi/dongyang/yongkang/wuyi/pujiang/panan.html`）：共 31 处国保，按「批次 / 镇街」切换，详情走 `place.html?set=区县&id=…`。金东区暂无国保，未建页。

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
├── heritage.html       中国的世界遗产（占位）
├── visited-heritage.html  我去过的世界遗产（0 / 61）
├── guobao.html         国保入口：34 个省级行政区
├── shanghai.html       上海清单页（批次 / 辖区）
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
├── jinhua-data.js      金华 7 个区县 31 处国保
├── files/
│   └── yiwu-city-2019.pdf   市级名录整理版 PDF（15 页，脚本生成）
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
