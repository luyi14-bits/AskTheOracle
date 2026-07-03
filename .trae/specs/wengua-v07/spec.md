# 圣杯起卦 + 白话解卦 Spec

> **PRD**: `docs/PRD-天问-v0.7.md`
> **版本**: v0.7
> **管线工程师**: spec-pipeline
> **日期**: 2026-07-03

## Why

两重需求：(1) 缺掷筊问杯模式 — 港台/闽南/东南亚华人最熟悉的占卜方式空白；(2) 文言卦辞看不懂 — "算完还是不懂"是用户最高频抱怨。

## Meta

- **优先级**: P0
- **RICE**: 白话 9.50 + 圣杯 4.50
- **估算工时**: 1.0 人天
- **依赖**: v0.6 PWA ✅

## What Changes

- `js/gua-data.js` — 64 卦各追加 `plain` 字段 (60-120字白话文)
- `js/animation.js` — 新增 `animateJiaobei(container, result)` 筊杯动画
- `js/app.js` — 掷筊逻辑 + 第四标签路由 + 白话渲染
- `css/style.css` — 筊杯动画 keyframes + 白话卡片样式
- `index.html` — 第四标签"掷筊问杯" + 筊杯 UI 区

## Impact

- Affected code: `gua-data.js`(+64)/`animation.js`(+40)/`app.js`(+50)/`style.css`(+30)/`index.html`(+10)

---

## ADDED Requirements

### R1: 掷筊起卦
`castJiaoBei()` 模拟筊杯 → 圣杯(50%)阳爻不变 / 笑杯(25%)阴爻不变 / 阴杯(25%)阳爻会变。六次串行 → `findGua/getBianGua/getInterpretationFocus`。期间禁用标签切换。

### R2: 白话解卦数据
`gua-data.js` 每卦新增 `plain` 字段(60-120字)：一句话定性 + 事业/感情/决策映射 + 注意事项。64 卦全覆盖。

### R3: 白话解卦渲染
卦辞下方新增"💬 白话解读"卡片(`#1a1a1a`背景+金色左边框)。变卦 `plain` 同步。体用生克结论加白话总结。

### R4: 回归保护
铜钱/三数/时间/生辰/姓名/PWA 六项全部正常。

---

## MODIFIED / REMOVED

无
