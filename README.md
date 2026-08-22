# Yu_ToolBox — 嵌入式开发者工具箱

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://yu-admin123.github.io)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Yu-admin123/yu-admin123.github.io)

> 更新于 2026-08-21 · [English](./README_en.md)

做嵌入式开发，总有那么些反复要用的小工具：算个 CRC、换个进制、查 NTC 温度、估 PCB 走线能过多少电流……每次都要临时找、临时装，挺烦的。

Yu_ToolBox 把这些高频需求攒进一个网页。**纯前端、零依赖、零后端，打开即用，断网也能跑**——所有计算都在本地浏览器里完成，数据不出你的电脑。

🔗 在线访问：[yu-admin123.github.io](https://yu-admin123.github.io) ｜ 备用：[kit-ymjk.upma.site](https://kit-ymjk.upma.site/)

---

## 🧰 工具一览

24 个工具，覆盖调试、软件、硬件等场景：

| 工具 | 一句话说明 |
|------|-----------|
| 🔗 [在线串口工具](./function/serialPortTool.html) | 自定义波特率、实时数据曲线、脚本自动回复 |
| 📡 [Modbus RTU 助手](./function/ModbusRTU.html) | 主站 / 从站双模式 |
| 📶 [MQTT 助手](./function/MqttTool.html) | MQTT over WebSocket，订阅 / 发布 |
| 🌐 [HTTP 助手](./function/HttpTool.html) | 请求 / 响应调试 |
| 🔌 [WebSocket 测试工具](./function/WebsocketTool.html) | ws/wss，文本 / 十六进制收发，自动重连 |
| 📡 [蓝牙调试器](./function/BLE_Debugger.html) | 扫描 / 连接 / 读写 / 通知，服务树 + Hex Dump |
| 🔗 [CAN 总线助手](./function/CanBusTool.html) | J1939 拆解、DBC 解析、信号解码、反向计算 |
| 🎨 [图片取模 / 渲染](./function/ImageToData.html) | 颜色格式互转、取模、数组渲染，含 Floyd 抖动 |
| 🔢 [CRC 校验计算器](./function/CRCCheck.html) | CRC-8/16/32/64 |
| 🔁 [进制转换](./function/RadixConverter.html) | 实时互转、位操作、浮点数 |
| 📈 [数据曲线可视化](./function/SignalPlotter.html) | 绘图、FFT、数字滤波 |
| 🎯 [PID 调节器](./function/PIDemulator.html) | 参数实时调节 + 仿真 |
| 📝 [文本对比与合并](./function/TextDiffMerge.html) | 差异对比、行级高亮、合并导出 |
| ⏱️ [Unix 时间戳转换](./function/UnixTimestamp.html) | 时间戳 ↔ 本地时间 |
| ⏲️ [时序秒表](./function/Timing_lab.html) | 高精度秒表、脉宽测量、打点尖峰曲线 |
| 📊 [在线流程图](./function/MermaidDraw.html) | 基于 Mermaid，在线 / 离线双模式，嵌入式模板 |
| 📝 [Markdown 编辑器](./function/MarkdownEditor.html) | 实时预览、VSCode 风格高亮、在线 / 离线双模式 |
| 🔋 [电池功耗计算器](./function/PowerCalculator.html) | 按电池容量估算设备续航 |
| ⚡ [ADC 转换](./function/ADCConverter.html) | ADC 值 ↔ 电压 ↔ 百分比，多分辨率 |
| 🔥 [NTC 电阻计算器](./function/NtcCounter.html) | B 值 / 三点标定，电阻 ↔ 温度互算 |
| 🧮 [电阻分压计算器](./function/ResDivider.html) | 正反向求解，E24 推荐 |
| 🖥️ [PCB 走线宽度计算器](./function/PcbTrace.html) | IPC-2152 模型，线宽 / 电流互算 |
| 🕳️ [PCB 过孔电流计算器](./function/ViaCalc.html) | 单孔载流 / 过孔数量互算 |
| 🔲 [二维码读写工具](./function/QRCodeTool.html) | 离线生成二维码/条形码，解析图片中的二维码，支持多种格式 |

另有桌面版 [Yu_Tool 通讯助手](https://gitee.com/Yu_29211/yu_-tool)（基于 Qt，串口 / Modbus / MQTT / TCP）。

> 更多工具持续添加中。

---

## ✨ 一些细节

- **分类 + 搜索**：调试 / 硬件 / 软件 / 文档 / 其他 / 导航六个分类，一个工具可以同时挂多个分类；导航分类下的外链工具还会按「电子 / 机械 / 工业 / UI」等子分类再次分组；记不清名字就搜关键词，名称、描述、分类都能命中
- **中英文界面**：右上角一键切换，连图表轴标签、提示语都会跟着换
- **浅色 / 深色主题**：随你喜欢，选择会被记住，跨页面不丢
- **收藏夹**：常用工具打星，分类栏「收藏」一键筛选，本地保存
- **多端适配**：手机、平板、电脑都排版正常
- **吉祥物彩蛋**：导航栏的眼睛会追着鼠标看、随机眨眼、长时间不动就睡觉；连点十下会触发一个 10 阶段的小彩蛋
- **一键加群**：右上角直达 QQ 交流群（453705020）

---

## 🛠️ 项目结构

纯静态项目，没有构建步骤。工具都遵循「三件套」约定：每个工具由**同名**的 HTML + CSS + JS 组成，分别放在 `function/`、`asset/CSS/`、`asset/JavaScript/` 下，三处文件名必须一致。

```
Yu_ToolBox/
├── index.html                    # 主页：导航 / 分类 / 搜索 / 收藏 / 吉祥物彩蛋 / 广告位
├── README.md / README_en.md      # 项目说明（中 / 英）
├── LICENSE / NOTICE              # 开源协议与版权声明
│
├── asset/                        # 静态资源
│   ├── Logo/
│   │   ├── Yu_Tools.png          # 工具箱 Logo（favicon + 导航栏品牌图）
│   │   └── Yu.jfif               # 备用 Logo
│   │
│   ├── CSS/
│   │   ├── common.css            # ★ 共用样式，所有页面第一个引入：主题变量、
│   │   │                         #   reset、滚动条、导航栏、面板、统一按钮/输入框/
│   │   │                         #   滑块/复选、代码输出、状态标签、响应式断点
│   │   ├── index.css             # 主页特有样式：Hero、工具卡片网格、分类按钮、搜索框、收藏星标、吉祥物、广告位
│   │   ├── serialPortTool.css    # 在线串口工具
│   │   ├── ModbusRTU.css         # Modbus RTU 助手
│   │   ├── MqttTool.css          # MQTT 助手
│   │   ├── HttpTool.css          # HTTP 助手
│   │   ├── WebsocketTool.css     # WebSocket 测试工具
│   │   ├── BLE_Debugger.css      # 蓝牙调试器
│   │   ├── CanBusTool.css        # CAN 总线助手
│   │   ├── ImageToData.css       # 图片取模 / 渲染
│   │   ├── CRCCheck.css          # CRC 校验计算器
│   │   ├── RadixConverter.css    # 进制转换
│   │   ├── SignalPlotter.css     # 数据曲线可视化
│   │   ├── PIDemulator.css       # PID 调节器
│   │   ├── TextDiffMerge.css     # 文本对比与合并
│   │   ├── UnixTimestamp.css     # Unix 时间戳转换
│   │   ├── Timing_lab.css        # 时序秒表
│   │   ├── MermaidDraw.css       # 在线流程图
│   │   ├── MarkdownEditor.css    # Markdown 编辑器
│   │   ├── PowerCalculator.css   # 电池功耗计算器
│   │   ├── ADCConverter.css      # ADC 转换
│   │   ├── NtcCounter.css        # NTC 电阻计算器
│   │   ├── ResDivider.css        # 电阻分压计算器
│   │   ├── PcbTrace.css          # PCB 走线宽度计算器
│   │   ├── ViaCalc.css           # PCB 过孔电流计算器
│   │   └── QRCodeTool.css        # 二维码读写工具
│   │
│   ├── JavaScript/
│   │   ├── theme.js              # ★ 共用主题：setTheme + themechange 事件 + 图标同步
│   │   ├── i18n.js               # ★ 共用语言：I18N 字典 + languagechange 事件 + data-i18n 应用
│   │   ├── index.js              # 主页脚本：toolsData 注册表 + 分类/搜索/收藏 + 吉祥物彩蛋
│   │   └── <工具名>.js ×24       # 各工具业务逻辑，与上方 CSS 同名一一对应
│   │
│   └── lib/                      # 本地第三方库（离线模式兜底）
│       ├── mermaid.min.js        # mermaid v11（在线流程图离线渲染）
│       ├── marked.min.js         # marked v12（Markdown 编辑器离线渲染）
│       ├── highlight.min.js      # highlight.js v11（Markdown 编辑器离线代码高亮）
│       ├── qrcode.min.js         # 二维码标准生成（qrcode-generator，离线）
│       ├── qrcode_UTF8.js        # qrcode-generator UTF-8 补丁（中文正确编码/解码）
│       ├── bwip-js.js            # 多格式二维码/条形码生成引擎（离线）
│       └── jsQR.js               # 二维码解析（jsQR，离线）
│
└── function/                     # 工具页入口 HTML，与 asset 下同名 CSS/JS 组成三件套
    ├── serialPortTool.html       # 在线串口工具
    ├── ModbusRTU.html            # Modbus RTU 助手
    ├── MqttTool.html             # MQTT 助手
    ├── HttpTool.html             # HTTP 助手
    ├── WebsocketTool.html        # WebSocket 测试工具
    ├── BLE_Debugger.html         # 蓝牙调试器
    ├── CanBusTool.html           # CAN 总线助手
    ├── ImageToData.html          # 图片取模 / 渲染
    ├── CRCCheck.html             # CRC 校验计算器
    ├── RadixConverter.html       # 进制转换
    ├── SignalPlotter.html        # 数据曲线可视化
    ├── PIDemulator.html          # PID 调节器
    ├── TextDiffMerge.html        # 文本对比与合并
    ├── UnixTimestamp.html        # Unix 时间戳转换
    ├── Timing_lab.html           # 时序秒表
    ├── MermaidDraw.html          # 在线流程图
    ├── MarkdownEditor.html       # Markdown 编辑器
    ├── PowerCalculator.html      # 电池功耗计算器
    ├── ADCConverter.html         # ADC 转换
    ├── NtcCounter.html           # NTC 电阻计算器
    ├── ResDivider.html           # 电阻分压计算器
    ├── PcbTrace.html             # PCB 走线宽度计算器
    ├── ViaCalc.html              # PCB 过孔电流计算器
    └── QRCodeTool.html           # 二维码读写工具
```

几个约定，想改代码前先知道：

- **三件套**：每个工具 = `function/名.html` + `asset/CSS/名.css` + `asset/JavaScript/名.js`，CSS/JS 一律外置，不写回 HTML
- **主题系统**：CSS 变量 + `[data-theme="dark"]` 两套值；图表类页面监听 `themechange` 事件重绘
- **语言系统**：HTML 用 `data-i18n` 标记，动态文本走 `window.I18N.t()`，翻译字典放在页面 JS 顶部
- **持久化**：主题、语言、收藏、编辑器分栏比例都存在 localStorage

### 外部依赖

| 页面 | 依赖库 | 用途 |
|------|--------|------|
| 在线串口工具 | CodeMirror（CDN） | 脚本编辑器代码高亮 |
| MQTT 助手 | mqtt.js（CDN） | MQTT over WebSocket 客户端 |
| 在线流程图 | mermaid@11（CDN + 本地 lib 兜底） | 流程图渲染，断网也能用 |
| Markdown 编辑器 | marked + highlight.js（CDN + 本地 lib 兜底） | 实时预览 + 代码高亮 |
| 二维码读写工具 | qrcode + bwip-js + jsQR（本地 lib，纯离线） | 多格式二维码/条形码生成与解析 |

其余 19 个页面纯原生 JS，零外部依赖。

---

## 🚀 本地运行

纯静态页面，双击 `index.html` 就能用。串口 / 蓝牙功能需要 HTTPS 环境（`localhost` 也可以），所以更推荐起个本地服务器：

```bash
# Python
python -m http.server 8000

# 或 Node
npx serve .
```

然后浏览器打开 `http://localhost:8000`。

---

## 🙋 参与贡献

**提需求 / 报 Bug**：工具哪不好用、缺什么功能，提个 issue 或者进 QQ 群（453705020）直接说。

**自己加工具**：照着一个现有工具抄三件套就能加，无需构建。

**部署**：项目本身就是 GitHub Pages 托管的，改完 push 上去就生效。

---

## 🔗 相关链接

- GitHub 仓库：[Yu-admin123/yu-admin123.github.io](https://github.com/Yu-admin123/yu-admin123.github.io)
- 在线访问：[https://yu-admin123.github.io](https://yu-admin123.github.io)
- 国内备用：[https://kit-ymjk.upma.site](https://kit-ymjk.upma.site/)
- 桌面版通讯助手：[Gitee](https://gitee.com/Yu_29211/yu_-tool)
- QQ 交流群：453705020

---

## 📄 许可证

本项目采用 [Apache License 2.0](./LICENSE) 协议开源。

Copyright © 2026 **Yu-admin123**  
如使用、二次开发或分发本项目，请保留版权声明与 [NOTICE](./NOTICE) 文件并注明出处（[GitHub](https://github.com/Yu-admin123/yu-admin123.github.io)）。
