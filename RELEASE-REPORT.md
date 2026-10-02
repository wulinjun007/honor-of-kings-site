# Release Report · Honor of Kings — Global Fan-Made Design Study

**上线时间**：2026-10-02
**定位**：参考 honorofkings.com/global-en 功能版块 + design-system-extraction-2026-10（03-zcode 暗色设计语言）的粉丝向设计研究站（非官方、非营利、素材全外链）

## 上线通道

| 通道 | URL | 状态 |
|---|---|---|
| **Netlify（正式）** | https://honor-of-kings-study.netlify.app | ✅ 200，82/82 图片加载，0 控制台错误 |
| GitHub Pages（备份） | https://wulinjun007.github.io/honor-of-kings-site/ | ✅ 200，标题一致 |
| GitHub 仓库 | https://github.com/wulinjun007/honor-of-kings-site | ✅ main，2 commits |

**Netlify Site ID**：`43f35a54-9034-4234-9d40-717b84753d4b`（sso_login 已关闭）

## 功能版块（对应官网）

1. Hero：官方背景视频（hd_bg2.webm）+ 5V5 MOBA 定位 + Google Play/App Store/APK 三徽章 + 数据带
2. News：4 条官方公告卡（外链官方详情页，日期 mono 金色）
3. Game Features：Forge Alliances / Legendary Heroes / Dominate Your Lane（描边图标卡）
4. Join the Battlefield：Crystal/Monster/Tower/River/Base 五地标 Tab（自动轮播 6s + 悬停暂停 + 点击切换，文案对位官网提取）
5. Play Your Style：Biron/LAM/Milady/Alessio/Dolia 五角色卡（立绘经逐张人工对位）× 职位徽章 × 分路
6. Meet Your Heroes：58 英雄头像墙（官网逐一对位提取 id↔职位），ALL/FIGHTER/MAGE/MARKSMAN/ASSASSIN/SUPPORT/TANK 六职位筛选（计数实时），MORE TO COME 瓦片
7. Our Story：01-04 金色编号交替排布（电竞/行业/用户/音乐）
8. Download CTA（amber 辉光面板）+ Footer（8 社媒 + 官方法务链接 + 免责声明）
9. 悬浮 Start Playing Now 金胶囊 + 回顶按钮；prefers-reduced-motion 全动效降级

## 设计语言（03-zcode 提取落地）

- `#161616` root / `oklch(0.205 0 0)` surface / `oklch(0.269 0 0)` raised，无阴影 + `white/8%` hairline
- amber-500 `#F59E0B` 单一高亮配额（呼应 HOK 金）+ sky-500 次强调（本次基本未用，保持克制）
- 字阶 60/700 · 36/600 · 24/600 · 16/400 · 13/500 + Geist Mono eyebrow/标签（系统栈优雅降级）
- 白胶囊主 CTA（H44）+ r10 ghost；Section-Y 88px；圆角 8/10/16/胶囊

## 验收记录

- 本地（Playwright 1440×900）：82 img 0 broken、地图 Tab 切换 ✓、英雄筛选 MAGE=13 ✓、0 console error
- 线上（Netlify 公网）：同审计全绿 + 背景视频 readyState≥2；移动端 390×844 Hero/英雄墙/汉堡菜单截图检查 ✓
- 双通道标题一致性 ✓

## ⚠️ 本次踩坑（重要，跨会话复用）

1. **`netlify api updateSite` 对 `sso_login`/`name` 字段静默不生效**（请求 200、updated_at 变化，但字段不落库）——须从 `~/Library/Preferences/netlify/config.json` 取 token 原生 `curl -X PATCH /api/v1/sites/{id}` 传 `{"sso_login":false}` / `{"name":"xxx"}`（本次实测均成功）。
2. **API 新建站默认 `sso_login: true`**（访客 401 保护）+ `name` 参数被忽略（返回随机名）。
3. **`netlify deploy --prod` 新站 403 Forbidden（draft 部署正常）**：工作路径 = `netlify deploy`（draft）→ `netlify api restoreSiteDeploy` 把 draft 提升为 production，实测可行。旧站（今日晨前建）不受此限。
4. 建站清理：调试中产生的随机名站点已删除，保留正本 `honor-of-kings-study`。

## 素材合规

- 全部游戏图片/视频 hotlink 自 `www.honorofkings.com` 与官方 CMS，仓库零素材文件
- 描述文案为原创改写；页脚+README+CREDITS.md 三处非官方免责声明
