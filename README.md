# Honor of Kings — Global Fan-Made Design Study

> 非官方粉丝向设计研究站 · 参考对象：[honorofkings.com/global-en](https://www.honorofkings.com/global-en/)
> 设计语言：`design-system-extraction-2026-10 / 03-zcode`（暗色终端风）× HOK 金色品牌

纯静态单页站，零依赖零构建。复刻官网功能版块结构，图片/视频全部
hotlink 官方 CDN（本仓库不含任何游戏素材），描述文案为原创改写。

## 版块（对应官网功能）

1. **Hero** — 官方背景视频 + 5V5 MOBA 定位 + 三渠道下载徽章（Google Play / App Store / APK）
2. **News** — 4 条官方最新公告卡（外链官方详情页）
3. **Game Features** — Forge Alliances / Legendary Heroes / Dominate Your Lane
4. **Join the Battlefield** — Crystal/Monster/Tower/River/Base 五地标 Tab 轮播（自动播放 + 悬停暂停）
5. **Play Your Style** — 5 角色（Biron/LAM/Milady/Alessio/Dolia）× 职位 × 分路
6. **Meet Your Heroes** — 58 英雄头像墙，按 6 职位筛选（职位标签为官网逐一对位提取）
7. **Our Story** — 电竞/行业/用户/音乐四段十年故事
8. **Download CTA + Footer** — 社媒 8 渠道 + 官方法务链接 + 免责声明

## 设计系统（03-zcode 提取）

| Token | 值 |
|---|---|
| bg-root | `#161616` |
| surface / raised | `oklch(0.205 0 0)` / `oklch(0.269 0 0)` |
| hairline | `rgba(255,255,255,.08)`，无阴影 |
| 高亮（配额制） | amber-500 `#F59E0B` |
| 次强调 | sky-500（oklch 原值） |
| 字阶 | 60/700 · 36/600 · 24/600 · 16/400 · 13/500 + mono 标签 |
| 按钮 | 白胶囊 H44 主 CTA + r10 ghost |
| 节奏 | Section-Y 88px · gap 12/16/20 · 圆角 8/10/16/胶囊 |

## 运行

```bash
# 本地预览
python3 -m http.server 8080
# 打开 http://localhost:8080
```

## 文件

```
index.html      单页（58 英雄瓷片静态渲染，JS 仅做筛选/轮播/显现）
css/style.css   设计系统 + 全部组件样式
js/main.js      导航态 / 地图 Tab / 英雄筛选 / 滚动显现 / 悬浮 CTA
CREDITS.md      素材来源与免责声明
```

## 无障碍

- `prefers-reduced-motion` 下关闭全部动效与自动轮播
- Tab/筛选按钮带 `aria-selected` / `role`，图标链接带 `aria-label`
- 对比度：白/#161616 = 17.9:1，白@.6 ≈ 8:1（提取报告 QA 数据）
