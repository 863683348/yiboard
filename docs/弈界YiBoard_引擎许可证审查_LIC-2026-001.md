# 弈界 YiBoard — XQWLight / ElephantEye 许可证审查报告

- **审查编号**: LIC-2026-001
- **审查对象**: XQWLight（象棋巫师精简版）、ElephantEye（象眼）
- **审查目的**: 确认开源象棋引擎在弈界 YiBoard（商业 SaaS 产品，闭源前端）中集成的合规性，出具书面结论供主理人拍板（对应 OPEN-DECISIONS OD-1 阻塞项 & 技术架构 R7 风险）
- **审查日期**: 2026-08-12
- **审查方式**: 官方 GitHub 仓库 LICENSE 文件核验 + 官网（xqbase.com）声明核验 + 法律实践检索
- **结论先行**: **XQWLight 为 GPL-2.0（强 Copyleft），不建议以 WASM 形式嵌入闭源前端；ElephantEye 为 LGPL-2.1，可作为闭源商业集成的首选方案。**

---

## 1. 许可证事实认定（证据）

| 引擎 | 许可证 | 证据来源 | 作者 / 版权方 |
|---|---|---|---|
| **XQWLight** | **GPL-2.0**（GNU General Public License v2，1991） | GitHub `xqbase/xqwlight` 仓库 LICENSE 文件为标准 GPL-2.0 原文；GitHub 仓库页标注 "GPL-2.0 license"；多个镜像（gitee/gjTool 等）一致 | 象棋百科全书网（www.xqbase.com），作者署名 "Morning Yellow"（黄晨） |
| **ElephantEye** | **LGPL-2.1**（GNU Lesser General Public License v2.1） | GitHub `xqbase/eleeye` 仓库 LICENSE 为 LGPL-2.1 原文；README 明确声明："在遵循《GNU 宽松通用公共许可协议》(LGPL)的前提下，广大象棋爱好者和程序设计师可以自由使用 ElephantEye 及其源程序" | 同上（xqbase 组织下） |

**补充事实**：
- XQWLight 官方 README 说明其**自带 JavaScript 移植版本**（"written in C++, Java, JavaScript and ActionScript"），即存在免 WASM 编译的纯 JS 实现，但**同样受 GPL-2.0 约束**。
- XQBase 商业产品线中，付费"超级引擎"（45–168 元）为**闭源商业授权**，与开源的 XQWLight/ElephantEye 是不同授权路径；我们未发现 XQWLight/ElephantEye 单独提供付费商用双授权（dual license）的公开渠道。

---

## 2. 关键法律分析：对闭源商业 SaaS 的影响

### 2.1 GPL-2.0 的核心义务（适用于 XQWLight）

GPL-2.0 是**强 Copyleft**：
- 若将 GPL 代码**并入（incorporate / link）**你的程序并对外分发，整个衍生作品**必须以 GPL-2.0 授权**，即必须开放全部源代码；
- 许可证原文明确："This General Public License does not permit incorporating your program into proprietary programs"（不允许并入专有程序）；
- 触发条件是"**分发（distribution）**"——SaaS 场景下若引擎代码随前端资源下发到用户浏览器（WASM/JS 文件），即构成分发。

### 2.2 关键判例实践：引擎独立进程 vs 同进程嵌入

棋类引擎领域有成熟实践（chess.stackexchange 高赞判例分析、ICC 捆绑 Stockfish 先例）：
- **引擎作为独立可执行文件/独立进程，通过管道协议（UCCI/UCI）与主程序通信** → 不构成"链接"→ 主程序**无需开源**（ICC 商业软件捆绑 GPL 的 Stockfish 即属此类，被公认为合法）；
- **引擎编译进主程序内（静态/动态链接、或 WASM 同进程嵌入）** → 构成"合并"→ **触发 GPL 传染**，前端需整体开源。

### 2.3 两种集成形态的合规判断（YiBoard 场景）

| 集成形态 | XQWLight（GPL-2.0） | ElephantEye（LGPL-2.1） |
|---|---|---|
| **A. 编译为 WASM 嵌入浏览器前端**（当前技术架构方案） | ❌ **高风险**：WASM 同进程嵌入视为"并入"，前端需整体 GPL 开源，与闭源商业化冲突 | ✅ **合规**：LGPL 允许闭源程序使用库（不改库本身则仅需保留声明 + 提供 relink 手段）；WASM 作为独立模块边界清晰 |
| **B. 服务端独立引擎进程 + UCCI 协议通信**（前端发 HTTP/WS，引擎在服务端跑） | ✅ **合规**：独立进程管道模式，前端闭源安全；但每步走子需网络往返，延迟高、服务端算力成本 | ✅ **合规**（同左） |
| **C. 纯 JS 移植版直接嵌入前端** | ❌ **高风险**：与 A 同理（GPL 传染） | —（ElephantEye 无官方 JS 版，需 WASM） |

---

## 3. 风险评级

| # | 风险 | 概率 | 影响 | 等级 | 说明 |
|---|---|---|---|---|---|
| R1 | 用 XQWLight WASM 嵌入 → 违反 GPL-2.0 传染义务 | 高（若采用方案 A） | 高：被原作者/社区投诉、被迫整体开源或下架；商业信誉受损 | 🔴 **高** | 技术架构当前方案即为此形态，**必须在 M1.1 前纠正** |
| R2 | 用 ElephantEye 但未保留版权声明 / 未提供对应修改源码 | 中（执行疏漏） | 中：违约但易补救 | 🟡 中 | 合规行动清单可消除 |
| R3 | ElephantEye 的 LGPL 要求"可重新链接"（relink）：WASM 分发需向用户提供可替换引擎模块的手段 | 中（技术实现细节） | 低-中：提供 WASM 源或可替换模块即可满足 | 🟡 中 | 见行动清单 |
| R4 | 许可条款被错误解读（如认为 GPL 引擎=不能商用）导致放弃 | — | — | ℹ️ 信息 | GPL/LGPL **均允许商业使用与收费**，义务在于开源分发方式，不是禁止商用 |

---

## 4. 审查结论与推荐方案

### 4.1 结论
1. **XQWLight 是 GPL-2.0**：其源码、自带 JS 版、编译产物均不得以 WASM/JS 形式嵌入弈界闭源前端；若坚持使用，只能采用"服务端独立进程 + UCCI 管道"形态。
2. **ElephantEye 是 LGPL-2.1**：可以作为闭源商业产品集成，推荐**编译为 WASM 独立模块**嵌入前端（保留版权声明 + 不修改引擎核心 + 提供源码获取与 relink 说明即合规）。
3. 两者**均可商业使用**，不存在"开源引擎=不能赚钱"的问题。

### 4.2 推荐方案（按优先级）

| 优先级 | 方案 | 说明 |
|---|---|---|
| ⭐ **首选** | **ElephantEye → WASM 独立模块**（替换原 XQWLight 计划） | LGPL-2.1 兼容闭源前端；棋力为大师级（联众 2500 分 / 弈天 2000 分 / CCGC 第 7 名），满足"业余高手"难度需求；引擎体积约 466KB，可接受 |
| 备选 | XQWLight 服务端独立进程（UCCI 协议） | 保留 XQWLight 方案但改服务端形态；代价是每步网络往返 + 服务端算力 |
| 不推荐 | XQWLight WASM / JS 嵌入前端 | GPL-2.0 传染，前端须整体开源 |

> 注：若未来产品决定**整体开源**（如改 MIT/GPL 开源品牌策略），XQWLight WASM 方案立即可用——这是一个可留待拍板的战略选项。

### 4.3 对技术架构文档的修正建议
- 《弈界YiBoard_技术架构.md》§3.2 中"集成 XQWLight → WASM"应**改为"集成 ElephantEye → WASM（LGPL-2.1，兼容闭源）"**，并删除/标注 XQWLight 的许可风险；
- 风险 R7 结论由"待审查"更新为"已审查：XQWLight=GPL-2.0（嵌入不可行），ElephantEye=LGPL-2.1（推荐）"。

---

## 5. 合规行动清单（采用首选方案时）

- [ ] **选型确认**：主理人拍板采用 ElephantEye（本报告 §4.2 首选）
- [ ] **保留版权声明**：产品"关于/致谢"页 + 源码分发说明中注明 "ElephantEye © 2004–2006 www.xqbase.com, Morning Yellow, licensed under LGPL-2.1"（附 LICENSE 全文链接）
- [ ] **不修改引擎核心**：仅通过 UCCI 协议接口调用；如需改评价函数，改的部分以 LGPL-2.1 开源并注明
- [ ] **提供 relink 能力**：WASM 分发时，向用户提供获取 ElephantEye 源程序的方式（GitHub 链接 + 构建说明），满足 LGPL"可替换模块"要求
- [ ] **编译记录归档**：记录 Emscripten 编译参数与版本，便于后续提供对应源码
- [ ] **文档同步**：更新《技术架构》§3.2 与《OPEN_DECISIONS》OD-1 状态
- [ ] （若未来转开源战略）重新评估 XQWLight GPL-2.0 方案的可行性

---

## 6. 决策请求

请主理人就以下事项拍板：
1. 是否采用 **ElephantEye → WASM** 作为象棋引擎方案（推荐）？
2. 若坚持 XQWLight：是否接受"服务端独立进程"形态（延迟/成本代价），或接受"前端整体开源"战略调整？
3. 是否委托法务/外部律师复核本结论（涉及对外分发，建议至少存档本报告）？

---

## 附：证据链接
- XQWLight 官方仓库（GPL-2.0）：https://github.com/xqbase/xqwlight
- ElephantEye 官方仓库（LGPL-2.1）：https://github.com/xqbase/eleeye
- 官网声明：http://www.xqbase.com/
- GPL-2.0 全文：https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
- LGPL-2.1 全文：https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html

---

*本报告为工程侧合规评估，不构成正式法律意见；对外商业发布前建议法务复核。*
