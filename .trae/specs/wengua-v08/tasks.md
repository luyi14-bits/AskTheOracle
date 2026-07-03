# Tasks — v0.8 交叉起卦 + 小六壬 + 五格

> **Spec**: `spec.md` | **PRD**: `docs/PRD-问卦-v0.8.md`

---

- [x] Task 1: 交叉起卦 (`js/app.js`)
  - [x] SubTask 1.1: `crossCast(name, year, month, day, hour)` — 姓名笔画+生辰数字→梅花引擎
  - [x] SubTask 1.2: 交叉解读文案表 `CROSS_FATE` (5 级各一条)
  - [x] SubTask 1.3: 姓名起卦区新增子模式"交叉分析" + DOM

- [x] Task 2: 小六壬 (`js/app.js` + 动画)
  - [x] SubTask 2.1: `xiaoliuren(month, day, hour)` — 月日时三推算法
  - [x] SubTask 2.2: `LIUREN_DATA` 六个掌诀数据
  - [x] SubTask 2.3: 第七标签"掐指小六壬" + UI 区 + 当前时间自动推算
  - [x] SubTask 2.4: `animateLiuren(container, positions, result)` — 手掌 SVG 逐步点亮动画

- [x] Task 3: 五格姓名学 (`js/app.js` + `css/style.css`)
  - [x] SubTask 3.1: `WUGE_JUDGMENT` 181 条数理吉凶表
  - [x] SubTask 3.2: `calcWuge(parsed)` — 五格计算公式
  - [x] SubTask 3.3: 三才配置五行计算 `calcSancai(wuge)`
  - [x] SubTask 3.4: 渲染函数 `renderWuge(wuge)` 叠加到姓名结果区

- [x] Task 4: 样式 (`css/style.css`)
  - [x] SubTask 4.1: 手掌 SVG/CSS 动画
  - [x] SubTask 4.2: `.wuge-card` 五格卡片样式
  - [x] SubTask 4.3: `.cross-card` 交叉解读样式

# Dependencies

Task 1/2/3 完全独立可并行，Task 4 与 Task 1/2/3 可并行。

# 工时

| Task | 子任务 | 人天 |
|------|:---:|:---:|
| Task 1 | 3 | 0.5 |
| Task 2 | 4 | 0.5 |
| Task 3 | 4 | 0.3 |
| Task 4 | 3 | 0.2 |
| **合计** | **14** | **1.5** |
