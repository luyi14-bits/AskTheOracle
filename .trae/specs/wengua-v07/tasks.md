# Tasks — v0.7 圣杯起卦 + 白话解卦

> **Spec**: `spec.md` | **PRD**: `docs/PRD-天问-v0.7.md`

---

- [x] Task 1: 白话解卦数据 + 渲染 (`js/gua-data.js` + `js/app.js`)
  - [x] SubTask 1.1: `GUA_DATA` 64 卦每卦追加 `plain` 字段 (60-120字)
  - [x] SubTask 1.2: 所有渲染函数中卦辞下方追加"💬 白话解读"卡片
  - [x] SubTask 1.3: 变卦 `plain` 同步展示
  - [x] SubTask 1.4: 体用生克结论加白话总结 (查 level 表)

- [x] Task 2: 掷筊起卦 (`index.html` + `js/app.js`)
  - [x] SubTask 2.1: `#mode-tabs` 新增第四标签"掷筊问杯" + `#jiaobei-controls` 区
  - [x] SubTask 2.2: `castJiaoBei()` — 圣杯50%/笑杯25%/阴杯25% → 六爻映射
  - [x] SubTask 2.3: 六次掷筊串行循环 + 模式路由 `switchMode('jiaobei')`
  - [x] SubTask 2.4: 掷筊期间标签切换禁用 + 恢复

- [x] Task 3: 筊杯动画 + 样式 (`js/animation.js` + `css/style.css`)
  - [x] SubTask 3.1: `animateJiaobei(container, result)` — 两只弯月形 div 从天而降
  - [x] SubTask 3.2: CSS keyframes: 下落 + 翻转 + 落地辉光(圣杯绿/笑杯黄/阴杯红)
  - [x] SubTask 3.3: 白话卡片 `.plain-card` 样式(浅背景+金色左边框)

# Dependencies

```
Task 1 (白话) ──独立──
Task 2 (圣杯) ──独立──→ Task 3 依赖 Task 2
```

Task 1 和 Task 2 完全独立可并行。

# 工时

| Task | 子任务 | 人天 |
|------|:---:|:---:|
| Task 1 | 4 | 0.4 |
| Task 2 | 4 | 0.4 |
| Task 3 | 3 | 0.2 |
| **合计** | **11** | **1.0** |
