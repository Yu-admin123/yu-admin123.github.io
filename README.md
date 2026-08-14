
---

# Yu_ToolBox - 嵌入式开发者工具箱

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://yu-admin123.github.io)
[![License](https://img.shields.io/badge/License-MPL--2.0-blue)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Yu-admin123/yu-admin123.github.io)

## 🌐 [中文](./README.md) ｜ [English](./README_en.md)  
> **更新时间：2026-08-14**

> 专为嵌入式开发者打造的在线工具集合，一站式解决开发中的高频需求。

**在线访问**：[https://yu-admin123.github.io](https://yu-admin123.github.io)  
**备用访问**：[https://kit-ymjk.upma.site](https://kit-ymjk.upma.site/)

---

## 📖 项目简介

**Yu_ToolBox** 是一个基于纯静态资源构建的嵌入式开发工具导航站。项目旨在打造一个多功能的嵌入式瑞士军刀, 将嵌入式开发中常用的高频工具集成在统一的界面中，帮助开发者快速定位并使用所需工具，提升开发效率。

所有工具均为纯前端实现，**零依赖、零后端、离线可用**，打开即用。

---

## 🧰 工具列表

| 分类 | 工具 | 说明 |
|------|------|------|
| 🔧 调试 | 🔗 [在线串口工具](./function/serialPortTool.html) | 可自定义波特率、实时数据曲线、脚本自动回复 |
| 🔧 调试 | 📡 [Modbus RTU 助手](./function/ModbusRTU.html) | 支持 Modbus RTU 主站 / 从站操作 |
| 🔧 调试 | 📶 [MQTT 助手](./function/MqttTool.html) | 基于 MQTT over WebSocket，支持订阅 / 发布 |
| 🔧 调试 | 🌐 [HTTP 助手](./function/HttpTool.html) | 支持 HTTP 请求 / 响应调试 |
| 🔧 调试 | 🔌 [WebSocket 测试工具](./function/WebsocketTool.html) | 支持 ws/wss 协议，文本/十六进制收发，自动重连 |
| 🔧 调试 | 🔗 [CAN 总线助手](./function/CanBusTool.html) | 支持 J1939 拆解、DBC 解析、信号解码、反向计算 |
| 💻 软件 | 🎨 [图片取模 / 渲染工具](./function/ImageToData.html) | 支持多种颜色格式互转、取模与数组渲染，含 Floyd 抖动算法 |
| 💻 软件 | 🔢 [CRC 校验计算器](./function/CRCCheck.html) | 支持 CRC-8/16/32/64 多种算法 |
| 💻 软件 | 🔁 [进制转换](./function/RadixConverter.html) | 进制实时互转、位操作、浮点数转换 |
| 💻 软件 | 📈 [数据曲线可视化](./function/SignalPlotter.html) | 信号绘图、FFT 变换与数字滤波分析 |
| 💻 软件 | 🎯 [PID 调节器](./function/PIDemulator.html) | 实时 PID 参数调节与仿真 |
| 💻 软件 | 📝 [文本对比与合并](./function/TextDiffMerge.html) | 文本差异对比、行级高亮、支持合并导出 |
| 💻 软件 | ⏱️ [Unix 时间戳转换](./function/UnixTimestamp.html) | Unix 时间戳与本地时间互转，支持毫秒 / 秒级 |
| ⚡ 硬件 | 🔋 [电池功耗计算器](./function/PowerCalculator.html) | 根据电池容量估算设备工作时长 |
| ⚡ 硬件 | ⚡ [ADC 转换](./function/ADCConverter.html) | ADC 值 ↔ 电压值 ↔ 百分比 互转，支持多分辨率 |
| 🌐 其他 | 🌐 Yu_Tool 通讯助手 | 基于 QT 的桌面调试助手（见下方链接） |

### 📥 其他调试工具下载导航
| 工具 | 说明 |
|------|------|
| 🌐 [Yu_Tool 通讯助手](https://gitee.com/Yu_29211/yu_-tool) | 基于QT的桌面调试助手，支持 Modbus / MQTT / 串口 / TCP  |

> 更多工具持续开发中……

---

## 🚀 功能特性

- **分类导航** — 全部 / 调试 / 硬件 / 软件 / 其他 五大分类，支持单工具归属多个分类
- **实时搜索** — 按工具名称、描述、分类关键词即时筛选
- **主题切换** — Light / Dark 双主题，基于 CSS Variables，状态本地持久化
- **响应设计** — 适配桌面、平板、手机等多端设备
- **卡片动画** — 渐入动画、悬停浮起、NEW 徽标标识新工具
- **一键加群** — 快速加入 QQ 技术交流群（453705020）

---

## 📁 项目结构

```
.
├── index.html                      # 工具箱主页（导航与工具卡片）
├── README.md                       # 项目说明文档
├── LICENSE                         # 开源协议
│
├── asset/                          # 静态资源目录
│   ├── Logo/                       # 图片资源
│   │   ├── Yu_Tools.png            # 工具箱 Logo
│   │   └── Yu.jfif                 # 备用 Logo
│   │
│   ├── CSS/                        # 样式表
│   │   ├── common.css              # ★ 共用样式（主题变量、reset、导航栏、面板、统一按钮/输入框/滑块/选择框、代码输出、状态标签等）
│   │   ├── index.css               # 主页特有样式（Hero、工具卡片网格、分类按钮、搜索框、GitHub按钮、页脚等）
│   │   ├── ADCConverter.css        # ADC 转换页面特有样式
│   │   ├── CRCCheck.css            # CRC 校验页面特有样式
│   │   ├── CanBusTool.css          # CAN 总线助手页面特有样式
│   │   ├── HttpTool.css            # HTTP 助手页面特有样式
│   │   ├── ImageToData.css         # 图片取模/渲染页面特有样式
│   │   ├── ModbusRTU.css           # Modbus RTU 助手页面特有样式
│   │   ├── MqttTool.css            # MQTT 助手页面特有样式
│   │   ├── PIDemulator.css         # PID 调节器页面特有样式
│   │   ├── PowerCalculator.css     # 电池功耗计算器页面特有样式
│   │   ├── RadixConverter.css      # 进制转换页面特有样式
│   │   ├── SignalPlotter.css       # 数据曲线可视化页面特有样式
│   │   ├── TextDiffMerge.css       # 文本对比与合并页面特有样式
│   │   ├── UnixTimestamp.css       # Unix 时间戳转换页面特有样式
│   │   ├── WebsocketTool.css       # WebSocket 测试工具页面特有样式
│   │   └── serialPortTool.css      # 在线串口工具页面特有样式
│   │
│   └── JavaScript/                 # javascript 脚本
│       ├── theme.js                # ★ 共用主题切换逻辑（全局 setTheme + themechange 事件）
│       ├── index.js                # 主页脚本（工具数据 + 分类/搜索渲染）
│       ├── ADCConverter.js         # ADC 转换页面业务逻辑
│       ├── CRCCheck.js             # CRC 校验页面业务逻辑
│       ├── CanBusTool.js           # CAN 总线助手页面业务逻辑
│       ├── HttpTool.js             # HTTP 助手页面业务逻辑
│       ├── ImageToData.js          # 图片取模/渲染页面业务逻辑
│       ├── ModbusRTU.js            # Modbus RTU 助手页面业务逻辑
│       ├── MqttTool.js             # MQTT 助手页面业务逻辑（依赖 mqtt.js CDN）
│       ├── PIDemulator.js          # PID 调节器页面业务逻辑
│       ├── PowerCalculator.js      # 电池功耗计算器页面业务逻辑
│       ├── RadixConverter.js       # 进制转换页面业务逻辑
│       ├── SignalPlotter.js        # 数据曲线可视化页面业务逻辑
│       ├── TextDiffMerge.js        # 文本对比与合并页面业务逻辑
│       ├── UnixTimestamp.js        # Unix 时间戳转换页面业务逻辑
│       ├── WebsocketTool.js        # WebSocket 测试工具页面业务逻辑
│       └── serialPortTool.js       # 在线串口工具页面业务逻辑（依赖 CodeMirror CDN）
│
└── function/                      # 各工具页面入口 HTML
   ├── serialPortTool.html         # 在线串口工具
   ├── ModbusRTU.html              # Modbus RTU 助手
   ├── MqttTool.html               # MQTT 助手
   ├── HttpTool.html               # HTTP 助手
   ├── WebsocketTool.html          # WebSocket 测试工具
   ├── CanBusTool.html             # CAN 总线助手
   ├── ImageToData.html            # 图片取模 / 渲染工具
   ├── CRCCheck.html               # CRC 校验计算器
   ├── RadixConverter.html         # 进制转换
   ├── SignalPlotter.html          # 数据曲线可视化
   ├── PIDemulator.html            # PID 调节器
   ├── TextDiffMerge.html          # 文本对比与合并
   ├── UnixTimestamp.html          # Unix 时间戳转换
   ├── PowerCalculator.html        # 电池功耗计算器
   └── ADCConverter.html           # ADC 转换

```

---

## 🧩 CSS/JS 架构说明


### 共用样式 — `asset/CSS/common.css`

所有页面（含主页）都先引入 `common.css`，它提供以下共用能力：

| 模块 | 内容 |
|------|------|
| **主题变量** | `:root` + `[data-theme="dark"]` 两套 CSS 变量（背景、文字、边框、按钮、状态、强调色等），页面可直接使用 |
| **全局 reset** | `*` 盒模型 / 字体族、`body` 基础结构、`::-webkit-scrollbar` 统一滚动条 |
| **导航栏** | `.navbar`、`.navbar-inner`、`.navbar-brand`、`.navbar-right`（功能页从这里返回主页） |
| **主题切换按钮** | `.theme-toggle` + `.toggle-track` + `.toggle-thumb` + `.theme-icon` + 暗色变体 |
| **容器 / 标题** | `.container`、`.page-title`、`.subhead` |
| **面板** | `.panel`、`.panel-accent`、`.panel-title`，统一卡片 hover 高亮边框 |
| **网格** | `.grid-2col`、`.grid-3col` + 900px 响应式断点 |
| **表单** | `.input-group`、`.input-row`、`.input-row label` |
| **★ 统一控件** | `.input-row input/select/textarea`（圆角10px、聚焦蓝阴影）、`input[type="range"]`（统一4px轨道+16px圆形滑块）、`checkbox/radio`（统一accent-color）、`.btn`（圆角40px、hover缩放0.97）、`.btn-outline`、`.btn-sm`、`.btn-group` |
| **辅助标签** | `.unit`、`.hint-text`、`.tag`、`.range-badge`、`.status-ok/error/warn` |
| **代码输出** | `.code-output`（等宽字体、滚动条） |
| **工具类** | `.footer-note`、`.flex-between`、`.mt-8`、`.file-input-wrapper`、`@keyframes fadeInUp` |
| **响应式** | 600px / 480px 断点下的导航栏和主题切换按钮适配 |

### 页面特有样式 — `asset/CSS/<页面名>.css`

每个页面在 `common.css` **之后**引入自己的 `.css`，只写页面专用样式：

- 页面专用 CSS 变量（如图表颜色、Diff 高亮、HTTP 方法色等）
- 页面专用组件（工具卡片、电池预设卡片、位操作网格、模态框、CodeMirror 主题、Diff 视图等）
- 对 common.css 中少量样式的覆盖（如 `.code-output` 的最大高度）

### 共用脚本 — `asset/JavaScript/theme.js`

```
全局函数：setTheme(theme)
  ├─ 设置 documentElement 的 data-theme 属性
  ├─ 更新 #themeIcon 文本（☀️ / 🌙）
  ├─ localStorage 持久化
  └─ 派发 themechange 事件（页面可监听重绘图表）

DOMContentLoaded 时：
  ├─ 绑定 #themeToggle 点击切换
  └─ 根据当前 data-theme 同步图标（解决跨页面跳转图标不继承）
```

### 页面特有脚本 — `asset/JavaScript/<页面名>.js`

- 页面专用业务逻辑（算法计算、事件绑定、Canvas 图表、DBC 解析、Diff 算法等）
- 若需随主题重绘，监听 `themechange` 事件（ADCConverter、PIDemulator、SignalPlotter、serialPortTool、TextDiffMerge 已使用）

### HTML 入口结构（所有功能页统一）

```html
<head>
    <!-- 1. 主题预初始化内联脚本（防止加载闪烁，必须在 head 内联，不可分离） -->
    <script>
        const savedTheme = localStorage.getItem('toolbox-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    </script>

    <!-- 2. 外部库（如需要，仅 serialPortTool 和 MqttTool 有） -->
    <link rel="stylesheet" href="...cdn...codemirror.min.css">
    <script src="...cdn...codemirror.min.js"></script>

    <!-- 3. 样式层：先 common → 再页面特有 -->
    <link rel="stylesheet" href="../asset/CSS/common.css">
    <link rel="stylesheet" href="../asset/CSS/XXXXXX.css">
</head>
<body>
    ...页面内容...

    <!-- 4. 脚本层：先 theme.js → 再页面特有 -->
    <script src="../asset/JavaScript/theme.js"></script>
    <script src="../asset/JavaScript/XXXXXX.js"></script>
</body>
```

> `index.html` 引用路径为 `./asset/...`（与 asset 同级），`function/*.html` 为 `../asset/...`（进入 asset 需向上一级）。

### 外部依赖

| 文件 | 依赖 | 用途 |
|------|------|------|
| `function/serialPortTool.html` | CodeMirror 5.65.16（cdnjs） | 脚本编辑器代码高亮 |
| `function/MqttTool.html` | mqtt@4.3.7（unpkg） | MQTT over WebSocket 客户端 |

其余 14 个页面为纯原生 JS，零外部依赖。

---

## 💻 本地运行

纯静态页面，直接双击 `index.html` 即可在浏览器中打开。如需以 HTTP 协议访问（推荐）：

```bash
# 方式一：Python
cd 项目根目录
python -m http.server 8000

# 方式二：Node.js
npx serve .
```

访问 `http://localhost:8000` 即可。

---

## 🔗 相关链接

- **GitHub 仓 库** ：[Yu-admin123/yu-admin123.github.io](https://github.com/Yu-admin123/yu-admin123.github.io)
- **Github Pages**：[https://yu-admin123.github.io](https://yu-admin123.github.io)
- **国内访问链接** ：[https://kit-ymjk.upma.site](https://kit-ymjk.upma.site/)
- **Yu_Tool 通讯助手（Gitee）**：[Yu_29211/yu_-tool](https://gitee.com/Yu_29211/yu_-tool)
- **QQ 交流群**：453705020

---

## 📄 许可证

本项目采用 [Mozilla Public License 2.0](./LICENSE) 协议开源。

---

