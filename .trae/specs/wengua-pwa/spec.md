# PWA 移动端适配 Spec

> **PRD**: `docs/PRD-天问-v0.6-PWA.md`
> **版本**: v0.6 PWA
> **管线工程师**: spec-pipeline
> **日期**: 2026-07-03

## Why

当前问卦仅能通过桌面双击 `index.html` 打开。手机端用户无法安装为 App，也无法离线使用。PWA 以 4 个新文件 + index.html 7 行的代价，实现手机桌面安装和离线能力。

## Meta

- **优先级**: P0
- **RICE**: 9.50（全项目最高 ROI）
- **估算工时**: 0.5 人天
- **依赖**: v0.5 全部功能 ✅

## What Changes

- `manifest.json` — 新增 PWA 配置
- `sw.js` — 新增 Service Worker 离线缓存
- `icon-192.png` / `icon-512.png` — 新增应用图标
- `index.html` — 新增 5 行 meta + 1 段 SW 注册脚本

## Impact

- Affected code: `index.html`（+7 行，不改 JS 逻辑）

---

## ADDED Requirements

### R1: PWA manifest 配置
- **WHEN** 浏览器访问问卦 → **THEN** 读取 `manifest.json` → 弹出安装提示（Android Chrome）或支持手动添加（iOS Safari）
- `display: standalone`, `theme_color: #0f0f0f`, `background_color: #0f0f0f`

### R2: Service Worker 离线缓存
- **WHEN** 首次在线访问 → **THEN** SW 安装并缓存全部静态资源
- **WHEN** 断网后从桌面图标打开 → **THEN** Cache-first 策略命中，页面完整可用，五种起卦均正常

### R3: index.html PWA 集成
- `<link rel="manifest">` + `<meta theme-color>` + `<meta apple-mobile-web-app-*>` + `<link apple-touch-icon>` + SW 注册脚本

### R4: 回归保护
- **WHEN** 铜钱/梅花/生辰/姓名任意模式 → **THEN** 功能无退化

---

## MODIFIED / REMOVED

无
