# 生日快乐 🎂 · Birthday Wish

一张会动的日式生日贺卡：折纸星穿过页面送来一封生日信，读完可以把它折成纪念卡保存为图片。中 / 英 / 日三语，纯前端，无后端依赖。

[English README](./README.en.md) · [日本語 README](./README.ja.md)

## 功能

- **贺卡章节**：鸟居与和纸质感的开场、可吹蜡烛的生日蛋糕、俳句、祝福信、时间轴
- **祝福翻牌**：三张祝福卡（健康平安 / 梦想成真 / 美好相遇），点击或键盘 Enter / Space 翻页，GSAP Flip 驱动
- **折纸星之旅**：星星随自然滚动从祝福区穿越到页脚信封（`Flip.fit` + `ScrollTrigger`），布局变化自动重建
- **生日信**：点击信封开信，封口、信纸、正文按 Timeline 顺序显现；信末依据当前祝福用 DrawSVG 描出樱花枝 / 星轨 / 相遇之结
- **纪念卡**：「把信收好」将信纸折成纪念卡，可再次展开，或用原生 Canvas 导出 1080×1440 PNG（本地生成，不上传）
- **三语切换**：中文 / English / 日本語，选择保存在 localStorage，`html lang` 与文档标题跟随切换
- **环境动效**：烟花、樱花、流星、萤火虫、鼠标拖尾、彩带、纸鹤与灯笼，均有 `prefers-reduced-motion` 降级

## 快速开始

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 生产构建到 dist/
npm run preview  # 预览构建产物
```

## 地址栏参数

| 参数   | 说明                               | 示例                             |
| ------ | ---------------------------------- | -------------------------------- |
| `date` | 生日日期，支持 `M-D` 或 `YYYY-M-D` | `?date=11-12`、`?date=2027-2-21` |

- 不传或参数非法（如 `2-30`、`abc`）时回落为默认日期 **2 月 26 日**
- 日期同步作用于页首、生日信、纪念卡与导出的 PNG，按各语言的书写习惯渲染（`十一月十二日` / `November 12th`）

## 项目结构

```
src/
├── App.vue            # 页面结构、GSAP 动画编排、DrawSVG 图案、PNG 导出
├── App.css            # 全部样式与主题变量（--wish-accent / --wish-ink 随祝福切换）
├── i18n.js            # vue-i18n 配置，语言持久化
├── locales/           # zh / en / ja 三份文案
└── components/        # 蛋糕、纸鹤、灯笼、烟花等独立动效组件
```

## 自定义

- **祝福语与正文**：改 `src/locales/*.json` 的 `wishes.items` 与 `letter.*`
- **署名**：改 `message.signature`
- **图案路径**：`App.vue` 的 `motifVariants` 为信末描画、纪念卡与 PNG 共用的唯一数据源，改一处三处同步
- **主题配色**：`App.css` 顶部 `.app[data-wish="N"]` 变量块

## 说明

- 图片导出完全在浏览器本地完成，不收集、不上传任何内容

## License

[MIT](./LICENSE)
