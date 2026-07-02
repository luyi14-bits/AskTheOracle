# 体验打磨 Spec

> **PRD**: `docs/PRD-问卦-v0.5.md`
> **版本**: v0.5 体验打磨
> **管线工程师**: spec-pipeline
> **日期**: 2026-07-02

## Why

v0.2-v0.4 已完成全部五种起卦算法（铜钱/三数/时间/生辰/姓名），核心功能完备。但用户体验停留在"工具"层面，缺三个轻量增强：

1. 卦象结果无法一键分享（在当前社交裂变时代是最大传播短板）
2. 铜钱掷爻没有声音反馈（缺失物理仪式感）
3. 爻线动画太朴素（只是 fadeIn，没有铜钱翻转的视觉冲击）

## Meta

- **优先级**: P0
- **估算工时**: 2.0 人天
- **依赖**: v0.4 全量功能 ✅

## What Changes

- **js/app.js** — 分享卡片生成 + 音效播放函数 + 铜钱动画触发
- **css/style.css** — 3D 动画 keyframes + 分享按钮样式
- **animation.js** — `animateCoinFlip()` 替代纯爻线 fadeIn
- **index.html** — 分享按钮（无结构变更）

## Impact

- Affected code: `js/app.js` (+~60行), `css/style.css` (+~40行), `animation.js` (+~30行)
- v0.4 所有起卦模式不受影响

---

## ADDED Requirements

### R1: 卦象分享卡片

```javascript
function generateShareCard(result, mode) {
    const canvas = document.createElement('canvas');
    canvas.width = 600; canvas.height = 800;
    const ctx = canvas.getContext('2d');
    // 背景 #0f0f0f
    // 金色边框
    // 卦名 + 卦符(64px) + 卦辞
    // 爻辞逐条
    // 变卦(如有)
    // "问卦 · WenGua" 水印
    // → toBlob → download
}
```

- **WHEN** 用户点击"📤 分享卦象" → **THEN** Canvas 绘制 600×800 卡片 → 触发下载 `{卦名}_问卦.png`

### R2: 掷爻音效

```javascript
var audioCtx = null;
function ensureAudio() { if (!audioCtx) audioCtx = new AudioContext(); return audioCtx; }
function playCastSound() {
    try { var ctx = ensureAudio(); var o = ctx.createOscillator(); var g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = 800; o.type = 'sine'; g.gain.setValueAtTime(0.1, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1); o.start(); o.stop(ctx.currentTime + 0.1); } catch(e) {}
}
function playChangingSound() { /* 同上，frequency=1200, 时长0.2s */ }
```

- **WHEN** `castOnce()` 完成 → **THEN** 播放掷爻音；当 `changing=true` → 追加动爻提醒音
- **WHEN** 浏览器静音 → **THEN** try/catch 静默失败

### R3: 铜钱 CSS 3D 翻转动画

```css
@keyframes coinFlip {
    0%   { transform: rotateY(0deg) scale(0); opacity: 0; }
    50%  { transform: rotateY(360deg) scale(1.2); opacity: 1; }
    100% { transform: rotateY(720deg) scale(1); opacity: 1; }
}
@keyframes coinPulse { 0%,100% { box-shadow: 0 0 4px var(--color-accent); } 50% { box-shadow: 0 0 16px var(--color-accent-glow); } }
```

```javascript
// animation.js
animateCoinFlip: function(container, yao) {
    var el = document.createElement('div'); el.className = 'yao coin-flip';
    if (yao.changing) el.classList.add('coin-changing');
    // ... 渲染铜钱图标 + 爻线文字
    container.appendChild(el);
    requestAnimationFrame(function() { el.classList.add('coin-visible'); });
}
```

- **WHEN** 每次掷爻 → **THEN** 铜钱图标 0.5s rotateY(0→720deg) + scale(0→1.2→1)
- **WHEN** 动爻 → **THEN** 追加金色光晕 pulse

### R4: 回归保护

- **WHEN** 使用铜钱/梅花/生辰/姓名任意模式 → **THEN** 功能正常无退化

---

## MODIFIED / REMOVED

无
