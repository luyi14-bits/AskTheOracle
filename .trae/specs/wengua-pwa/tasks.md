# Tasks — PWA 移动端适配

> **Spec**: `spec.md` | **PRD**: `docs/PRD-天问-v0.6-PWA.md`

---

- [x] Task 1: manifest.json + 图标
  - [x] SubTask 1.1: 生成 `icon.svg` 作为应用图标（SVG 替代 PNG，满足 192x192 和 512x512）
  - [x] SubTask 1.2: icon.svg — 512x512 暗金主题"问"字图标（可缩放，兼容双规格）
  - [x] SubTask 1.3: 创建 `manifest.json` — name/short_name/icons/display/theme

- [x] Task 2: Service Worker (`sw.js`)
  - [x] SubTask 2.1: Cache-first 策略缓存全部静态资源
  - [x] SubTask 2.2: 缓存列表: `index.html/css/style.css/js/*.js/manifest.json/icon.svg`

- [x] Task 3: index.html 集成
  - [x] SubTask 3.1: `<head>` 中加 6 行 meta + link 标签（含 CSP worker-src 放开）
  - [x] SubTask 3.2: `</body>` 前加 SW 注册脚本
  - [x] SubTask 3.3: CSP 放开 manifest 和 SW 所需权限（connect-src 'self'; worker-src 'self'）

# Dependencies

Task 1 / Task 2 / Task 3 可并行

# 工时

| Task | 子任务 | 人天 |
|------|:---:|:---:|
| Task 1 | 3 | 0.2 |
| Task 2 | 2 | 0.1 |
| Task 3 | 3 | 0.2 |
| **合计** | **8** | **0.5** |
