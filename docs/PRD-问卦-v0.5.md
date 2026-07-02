# 体验打磨 PRD

> **版本**: v0.5  
> **状态**: Draft → Ready for Spec  
> **作者**: PM (pm-mentor)  
> **日期**: 2026-07-02  
> **前置**: v0.4 姓名起卦 ✅ 已交付

---

## 1. Executive Summary

**问卦 v0.5** 是体验打磨版本，新增三个轻量功能：卦象分享卡片（一键生成图片分享到社交平台）、掷爻音效（铜钱落地的沉浸感）、铜钱 3D 抛掷动画（视觉仪式感提升）。不增加新的起卦算法，全是对现有体验的增强。

---

## 2. Problem Statement

### 用户痛点

- **算完想发朋友圈没图** — 卦象结果是一堆文字，用户想分享但没好看的可分享图片
- **掷爻没声音，缺少仪式感** — 铜钱掷爻只有视觉动画，缺少落地的声音反馈
- **铜钱动画太朴素** — 当前只是爻线逐条淡入，缺少真正的铜钱旋转/翻转/落地效果

### 业务影响

- 分享 = 免费传播裂变，是当前产品增长的最有效路径
- 音效 + 3D 动画 = 沉浸感，从"工具"升级到"体验"
- 三者都是轻量叠加，不改动现有核心逻辑，风险低

---

## 3. Goals & Metrics (SMART)

| 目标 | 衡量方式 | 截止 |
|------|----------|------|
| 用户可一键生成并下载卦象分享卡片 | Canvas 生成 → 下载 PNG，成功率 100% | v0.5 |
| 铜钱掷爻有音效反馈 | 每次掷爻播放短音效，不卡顿不掉帧 | v0.5 |
| 铜钱抛掷有 3D 旋转动画 | CSS 3D transform 铜钱旋转 + 下落效果 | v0.5 |
| v0.4 功能全部回归 | 五种起卦方式无退化 | v0.5 |

---

## 4. User Personas

### Persona A（复用）：好奇探索者 — 小陈

- **新行为**: 掷爻→听到铜钱音效→看到3D翻转→算完→点"分享"→生成卡片→保存相册→发朋友圈

---

## 5. User Stories

### US-1: 卦象分享卡片（P0）

```
Feature: 一键生成分享卡片

  Scenario: 铜钱模式生成分享卡片
    Given 用户在铜钱模式下掷出一卦结果
    When 点击"📤 分享卦象"按钮
    Then 系统用 Canvas 绘制一张包含以下内容的卡片:
      - 深色背景 + 金色边框
      - 卦名 + 卦符(大字) + 卦辞
      - 动爻标注 + 变卦（如有）
      - "问卦 · WenGua" 水印
    And 自动触发浏览器下载 PNG 图片

  Scenario: 梅花/生辰/姓名模式同样支持
    Given 用户在任意模式的任意结果页面
    Then "📤 分享卦象"按钮均可见可用

  Acceptance Criteria:
  - [ ] Canvas 绘制 600×800 卡片
  - [ ] 暗金配色与整体风格一致
  - [ ] 下载文件名含卦名（如"乾为天_问卦.png"）
  - [ ] 纯前端实现，无后端
```

### US-2: 掷爻音效（P0）

```
Feature: 铜钱掷爻音效

  Scenario: 每次掷爻播放短音效
    Given 用户点击"掷爻起卦"
    When 每次 castOnce() 完成
    Then 播放一声短促清脆的铜钱落地音（< 200ms）
    And 动爻（老阳/老阴）额外播放一声"叮"提醒音

  Scenario: 音效静默模式
    Given 用户浏览器处于静音状态
    Then 不播放音效，不影响主流程

  Scenario: 梅花/生辰/姓名模式不播放音效
    Given 用户在非铜钱模式下
    Then 不起播音效

  Acceptance Criteria:
  - [ ] 用 Web Audio API 生成合成音（无需音频文件）
  - [ ] 掷爻音（6次）+ 动爻提示音（如有）
  - [ ] 音效不阻塞 UI 线程
```

### US-3: 铜钱 3D 抛掷动画（P0）

```
Feature: 铜钱 CSS 3D 翻转动画

  Scenario: 每次掷爻铜钱翻转
    Given 用户点击"掷爻起卦"
    When 每次 castOnce() 完成
    Then 铜钱图标在 #gua-display 中执行:
      - 0.3s 旋转放大（scale 0→1.2→1）
      - 0.2s 3D 翻转（rotateY 0→720）
      - 然后静爻/动爻落定

  Scenario: 动爻铜钱特殊效果
    When 结果是老阳/老阴
    Then 铜钱额外发光脉冲效果

  Acceptance Criteria:
  - [ ] 纯 CSS animation + transform
  - [ ] 6 次掷爻动画串联不卡顿
  - [ ] 兼容 Chrome/Firefox/Safari/Edge
```

---

## 6. Functional Requirements

### 6.1 分享卡片

| ID | 需求 | 优先级 |
|----|------|--------|
| FR-S01 | `#result` 区末尾新增"📤 分享卦象"按钮 | Must |
| FR-S02 | `generateShareCard(result)` 用 Canvas 绘制 600×800 卡片 | Must |
| FR-S03 | Canvas 内容：背景色 #0f0f0f + 金色边框 + 卦名+卦符+卦辞+爻辞+变卦+水印 | Must |
| FR-S04 | Canvas → `canvas.toBlob()` → `URL.createObjectURL()` → `<a download>` 触发下载 | Must |
| FR-S05 | 文件名：`{卦名}_问卦.png` | Must |

### 6.2 音效

| ID | 需求 | 优先级 |
|----|------|--------|
| FR-A01 | 用 Web Audio API `OscillatorNode` 合成掷爻音（短促清脆） | Must |
| FR-A02 | 用 Web Audio API 合成动爻提示音（音高更高的"叮"） | Must |
| FR-A03 | `playCastSound()` 和 `playChangingSound()` 两个独立函数 | Must |
| FR-A04 | `AudioContext` 懒初始化（首次用户点击后创建，符合浏览器自动播放策略） | Must |
| FR-A05 | 音效静默不影响主流程（try/catch 包裹） | Must |

### 6.3 3D 动画

| ID | 需求 | 优先级 |
|----|------|--------|
| FR-V01 | `animation.js` 新增 `animateCoinFlip(container)` 方法 | Must |
| FR-V02 | CSS `.coin-flip` animation：0→0.3s rotateY(0→720deg) + scale(0→1.1→1) | Must |
| FR-V03 | 动爻铜钱增加 `.coin-changing` class → 金色光晕 pulse | Must |
| FR-V04 | 替代当前纯爻线文字动画，改为铜钱图标 + 文字组合 | Must |

---

## 7. Non-Functional Requirements

| 类别 | 要求 |
|------|------|
| **性能** | Canvas 渲染 < 50ms，音效 < 5ms 延迟 |
| **体积** | 零新增外部依赖，音效通过 Web Audio 合成 |
| **浏览器** | Canvas + Web Audio + CSS 3D 均为主流浏览器标准 API |

---

## 8. Technical Considerations

### 8.1 音效合成

```javascript
function playCastSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 800; // 短促高频
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(); osc.stop(ctx.currentTime + 0.1);
}
```

### 8.2 3D 动画

```css
@keyframes coinFlip {
    0%   { transform: rotateY(0deg) scale(0); opacity: 0; }
    50%  { transform: rotateY(360deg) scale(1.2); opacity: 1; }
    100% { transform: rotateY(720deg) scale(1); opacity: 1; }
}
.coin-flip { animation: coinFlip 0.5s ease-out; }
```

### 8.3 分享卡片 Canvas 绘制

```
┌──────────── 600px ────────────┐
│  ┌────────────────────────  │
│  │   #0f0f0f 背景            │
│  │                   560px   │
│  │  ┌──────────────────┐   │
│  │  │ 金色边框 + 卦名    │   │
│  │  │ ䷀ (64px)        │   │
│  │  │ 卦辞：元亨利贞    │   │
│  │  │ 爻辞逐条...       │   │
│  │  │ 变卦(如有)        │   │
│  │  │                   │   │
│  │  │ 问卦 · WenGua     │   │ 750px
│  │  └──────────────────┘   │
│  │                         │
│  └────────────────────────  │
└──────────────────────────────┘
```

---

## 9. Dependencies

| 依赖项 | 状态 |
|--------|------|
| v0.4 全量功能（铜钱/梅花/生辰/姓名） | ✅ 已交付 |

---

## 10. Out of Scope

- ❌ 音效音量控制面板 → 远期（MVP 阶段仅浏览器音量）
- ❌ 分享到具体平台的 API（微信/微博 SDK）→ 仅下载 PNG
- ❌ 音效自定义/替换 → 远期
- ❌ 3D 场景（Three.js）→ 仅 CSS 3D，不引入重库

---

## 11. Success Metrics

| 指标 | 目标值 |
|------|--------|
| 分享卡片生成成功率 | 100% |
| 音效播放无卡顿 | 6次掷爻全程不掉帧 |
| 3D 动画兼容性 | Chrome/Firefox/Safari/Edge 均正常 |
| v0.4 回归 | 无退化 |

---

## 12. Open Questions

| # | 问题 | 讨论 |
|---|------|------|
| Q1 | 分享卡片要不要加二维码？ | 不加，二维码需要后端生成短链，破坏纯前端定位 |
| Q2 | 音效要不要做成可选（开关）？ | v0.5 不做开关，跟随系统音量即可 |
| Q3 | 3D 动画要不要替代现有爻线动画还是共存？ | 替代。铜钱翻转 + 爻线落定，两段式动画更丰富 |

---

## 交接包

```
✅ PRD 文档
✅ RICE: 分享(2.27) + 音效(3.80) + 3D(1.13)
✅ User Stories ×3 (Gherkin)
✅ 4项 Success Metrics
✅ Out of Scope: 音量面板/平台API/Three.js
```
