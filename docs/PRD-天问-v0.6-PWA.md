# 问卦 v0.6 PRD — PWA 移动端适配

> **版本**: v0.6  
> **状态**: Draft → Ready for Spec  
> **作者**: PM (pm-mentor)  
> **日期**: 2026-07-03  
> **前置**: v0.5 体验打磨 ✅ 已交付
> **目标**: 不改一行业务代码，把问卦装进手机桌面，获得类原生 App 体验。

---

## 1. Executive Summary

**问卦 v0.6** 是一个零代码量的移动端适配版本。通过添加 `manifest.json` 和 `sw.js` 两个配置文件，让问卦成为一个 PWA（渐进式 Web 应用）。用户用手机浏览器打开问卦一次后，就可以把它添加到手机桌面当 App 用 — 有独立图标、全屏启动、断网也能起卦。

---

## 2. Problem Statement

### 用户痛点

- **不会打开** — 普通用户不知道怎么双击 `index.html`，更不知道怎么传到手机上
- **不能离线** — 没网就打不开，但问卦本质就是离线工具（纯本地计算，不需要网络）
- **不像是 App** — 浏览器打开有地址栏、工具栏，体验不像正经应用
- **缺少入口** — 每次要重新打开文件或输入网址，没有桌面图标

### 业务影响

- PWA 是代价最小的移动端方案：不改一行业务逻辑，加两个文件 + 两张图标，即可获得手机桌面入口、离线能力、全屏体验
- 同时也是把问卦部署到公网（GitHub Pages / Vercel）前的必要一步

---

## 3. Goals & Metrics (SMART)

| 目标 | 衡量方式 | 截止 |
|------|----------|------|
| 用户可从手机桌面一键打开问卦 | Chrome/Edge 弹出安装提示，点击后桌面出现图标 | v0.6 |
| 断网状态下五种起卦模式均可使用 | 开启飞行模式 → 从桌面图标打开 → 完整起卦 | v0.6 |
| iOS 用户可手动添加到主屏幕 | Safari → 分享 → 添加到主屏幕 → 独立窗口无浏览器栏 | v0.6 |
| 桌面版功能零回归 | v0.5 全部功能正常 | v0.6 |

---

## 4. User Personas

### Persona A（复用）：好奇探索者 — 小陈

- **新行为**: 手机浏览器打开朋友分享的链接 → 弹出"安装问卦"提示 → 点确定 → 桌面出现"问卦"图标 → 以后直接点图标就能起卦，断网也行

---

## 5. User Stories

### US-1: 手机一键安装（P0）

```
Feature: PWA 安装

  Scenario: Chrome/Edge 安卓用户首次访问
    Given 用户用手机 Chrome 打开问卦页面
    When 页面加载完成
    Then 浏览器弹出"添加到主屏幕"或底部出现安装提示条
    And 点击后桌面出现"问卦"图标
    And 点击图标全屏打开，无地址栏、无工具栏

  Scenario: iOS Safari 用户手动添加
    Given 用户用 iPhone Safari 打开问卦页面
    When 点击分享按钮 → "添加到主屏幕"
    Then 桌面出现"问卦"图标
    And 点击图标独立窗口打开

  Scenario: 桌面浏览器同样支持
    Given 用户用桌面 Chrome 打开问卦
    When 地址栏右侧出现安装图标 ⊕
    Then 点击可安装为桌面快捷方式

  Acceptance Criteria:
  - [ ] manifest.json 的 display: standalone 生效
  - [ ] 启动页无浏览器 UI（地址栏、工具栏、返回键）
  - [ ] 桌面图标为 192×192 PNG 自定义图标
```

### US-2: 离线起卦（P0）

```
Feature: Service Worker 离线缓存

  Scenario: 断网后正常使用
    Given 用户首次在线访问问卦（Service Worker 已安装）
    When 用户开启飞行模式断网
    And 从桌面图标打开问卦
    Then 页面正常加载
    And 铜钱掷爻、梅花易数、生辰起卦、姓名起卦均可正常使用
    And 分享卡片、音效、3D 动画均正常

  Scenario: 缓存更新
    Given 问卦发布新版本
    When 用户在线时打开问卦
    Then Service Worker 自动检测更新并刷新缓存

  Acceptance Criteria:
  - [ ] 所有 JS/CSS/HTML/JSON 文件缓存成功
  - [ ] 飞行模式下从桌面图标打开 → 完整可用
  - [ ] Console 无 Service Worker 报错
```

---

## 6. Functional Requirements

### 6.1 PWA 配置文件

| ID | 需求 | 优先级 |
|----|------|--------|
| FR-P01 | 新增 `manifest.json`，配置 name/short_name/description/icons/display/theme_color | Must |
| FR-P02 | `display: "standalone"` — 独立窗口，无浏览器 UI | Must |
| FR-P03 | `theme_color: "#c9a94e"` — 状态栏颜色与暗金主题一致 | Must |
| FR-P04 | `background_color: "#0f0f0f"` — 启动页背景与问卦背景一致 | Must |

### 6.2 Service Worker

| ID | 需求 | 优先级 |
|----|------|--------|
| FR-S01 | 新增 `sw.js`，Cache-first 策略缓存全部静态资源 | Must |
| FR-S02 | 缓存文件列表：`index.html` / `css/style.css` / `js/*.js` / `manifest.json` | Must |
| FR-S03 | 自动更新缓存：新版本检测 → 重新 install → 旧缓存清理 | Should |
| FR-S04 | 注册范围限定在根路径，不缓存外部资源 | Must |

### 6.3 HTML 集成

| ID | 需求 | 优先级 |
|----|------|--------|
| FR-H01 | `<link rel="manifest" href="manifest.json">` | Must |
| FR-H02 | Service Worker 注册 `<script>` | Must |
| FR-H03 | `<meta name="theme-color" content="#0f0f0f">` | Must |
| FR-H04 | `<meta name="apple-mobile-web-app-capable" content="yes">` — iOS 支持 | Must |
| FR-H05 | `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">` | Must |
| FR-H06 | `<link rel="apple-touch-icon" href="icon-192.png">` — iOS 桌面图标 | Must |

### 6.4 图标资源

| ID | 需求 | 优先级 |
|----|------|--------|
| FR-I01 | `icon-192.png` — 192×192 暗金主题应用图标 | Must |
| FR-I02 | `icon-512.png` — 512×512 高清图标(用于启动画面) | Must |

---

## 7. Non-Functional Requirements

| 类别 | 要求 |
|------|------|
| **离线** | 全静态资源缓存，断网五模式可用 |
| **体积** | manifest.json < 1KB, sw.js < 1KB, 图标 < 50KB |
| **兼容性** | Chrome/Edge/Firefox/Safari 均支持 PWA manifest |
| **部署** | 只需静态文件服务器（GitHub Pages / Vercel / 本地 http-server） |
| **不破坏现有** | HTML 只加 2 行, JS/CSS 零改动 |

---

## 8. Technical Considerations

### 8.1 文件清单

```
根目录
├── manifest.json     ← 新增
├── sw.js             ← 新增
├── icon-192.png      ← 新增
├── icon-512.png      ← 新增
├── index.html        ← +7 行不改逻辑
├── css/              ← 不变
├── js/               ← 不变
└── docs/             ← 不变
```

### 8.2 index.html 改动

```html
<!-- <head> 中新增 -->
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#0f0f0f">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="apple-touch-icon" href="icon-192.png">

<!-- </body> 前新增 -->
<script>
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
</script>
```

### 8.3 RICE 评分

| 维度 | 评分 | 说明 |
|------|:---:|------|
| Reach | 1 | 个人项目固定 |
| Impact | **5** | 从"桌面文件"升级为"手机 App"，体验质变 |
| Confidence | **95%** | PWA 是浏览器标准，无技术风险 |
| Effort | 0.5 | 半天（不含图标设计） |
| **RICE** | **9.50** | **全项目最高** |

---

## 9. Dependencies

| 依赖项 | 状态 |
|--------|------|
| v0.5 全部功能 | ✅ 已交付 |
| 图标资源 (192×192 + 512×512 PNG) | ⚠️ 需生成 |
| HTTPS 服务器（Service Worker 要求） | ⚠️ 部署时需要 |
| 本地测试可用 `http://localhost`（localhost 豁免 HTTPS） | ✅ |

---

## 10. Out of Scope

- ❌ 不用 `beforeinstallprompt` 自定义安装弹窗（浏览器自带就够了）
- ❌ 不做推送通知（Web Push）→ 问卦不涉及消息推送
- ❌ 不上架 Google Play / App Store
- ❌ 不做微信小程序
- ❌ 不修改任何业务 JS 代码

---

## 11. Success Metrics

| 指标 | 目标值 |
|------|--------|
| Chrome Android 弹出安装提示 | 100% |
| 飞行模式下五模式起卦 | 100% 可用 |
| iOS Safari 添加到主屏幕 | 独立窗口 |
| 桌面版功能回归 | 0 退化 |
| PWA Lighthouse 评分 | ≥ 90 |

---

## 12. Open Questions

| # | 问题 | 讨论 |
|---|------|------|
| Q1 | 产品名称到底用"天问"还是"问卦"？ | 需要统一。manifest.name 和 `<title>` 保持一致。建议"问卦"（已有品牌积累） |
| Q2 | 图标设计用什么？ | 建议 AI 生成：暗金(#c9a94e)底色 + ䷀卦符 或 "问"字 篆书 |
| Q3 | 是否需要 `lunar.js` 也加入 SW 缓存？ | 不需要，当前版本中 `lunar.js` 已从项目移除 |

---

## 交接包（→ spec-pipeline）

```
✅ PRD 文档（本文档）
✅ RICE: 9.50（全项目最高）
✅ User Stories ×2（安装 + 离线）
✅ 4项 Success Metrics
✅ Out of Scope: 推送/商店/小程序/业务代码改动
```
