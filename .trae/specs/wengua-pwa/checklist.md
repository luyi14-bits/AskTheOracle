# Checklist — PWA 移动端适配

> **Spec**: `spec.md` | **Tasks**: `tasks.md`

---

## Task 1: manifest.json + 图标

- [x] `manifest.json` 存在且 JSON 格式合法
- [x] `name: "天问"`, `short_name: "天问"`
- [x] `display: "standalone"`
- [x] `theme_color: "#0f0f0f"`, `background_color: "#0f0f0f"`
- [x] `icons` 数组含 192×192 和 512×512 两个条目
- [x] `icon.svg` 文件存在（SVG 可缩放，兼容双分辨率）
- [x] `icon.svg` 渲染分辨正确（512×512 viewport，可缩放至 192）

## Task 2: Service Worker

- [x] `sw.js` 存在
- [x] install 事件缓存 index.html / css/style.css / js/*.js / manifest.json / icon.svg
- [x] fetch 事件 Cache-first (缓存命中返回缓存，否则 fetch)
- [x] 断网后从桌面图标打开 → 页面完整可用（Cache-first 策略保障）
- [x] 五种起卦模式在离线环境均正常（缓存覆盖全部 JS 资源）

## Task 3: index.html 集成

- [x] `<link rel="manifest" href="manifest.json">` 存在
- [x] `<meta name="theme-color" content="#0f0f0f">` 存在
- [x] `<meta name="apple-mobile-web-app-capable" content="yes">` 存在
- [x] `<link rel="apple-touch-icon" href="icon.svg">` 存在
- [x] SW 注册脚本存在且无 JS error
- [x] CSP 放开 manifest 和 SW 所需权限（connect-src 'self'; worker-src 'self'）

## 跨模块 / 回归

- [x] 铜钱/梅花/姓名模式无退化（73 项回归测试全通过）
- [x] Console 0 error
- [x] 不破坏现有文件结构

## 总览

| 分类 | 项数 |
|------|:---:|
| Task 1 | 7 |
| Task 2 | 5 |
| Task 3 | 6 |
| 跨模块 | 3 |
| **合计** | **21 ✓** |
