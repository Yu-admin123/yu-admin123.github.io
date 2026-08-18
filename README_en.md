
---

# Yu_ToolBox - Embedded Developer's Toolbox

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://yu-admin123.github.io)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Yu-admin123/yu-admin123.github.io)

## 🌐 [中文](./README.md) ｜ [English](./README_en.md)  
> **Last updated: 2026-08-18**

> A curated online toolset built for embedded developers. One-stop solution for high-frequency needs during development.

**Live demo**: [https://yu-admin123.github.io](https://yu-admin123.github.io)  
**Mirror (China)**: [https://kit-ymjk.upma.site](https://kit-ymjk.upma.site/)

---

## 📖 Introduction

**Yu_ToolBox** is a static-site-based embedded development tool navigator. The project aims to be a multi-functional Swiss Army knife for embedded development — integrating frequently-used tools into a unified interface so developers can quickly locate and use what they need, boosting productivity.

All tools are pure front-end implementations: **zero dependencies, zero back-end, works offline** — just open and use.


---

## 🧰 Tool List

| Category | Tool | Description |
|----------|------|-------------|
| 🔧 Debug | 🔗 [Serial Port Tool](./function/serialPortTool.html) | Customizable baud rate, real-time data curves, script auto-reply |
| 🔧 Debug | 📡 [Modbus RTU Helper](./function/ModbusRTU.html) | Supports Modbus RTU master / slave operations |
| 🔧 Debug | 📶 [MQTT Helper](./function/MqttTool.html) | MQTT over WebSocket, supports subscribe / publish |
| 🔧 Debug | 🌐 [HTTP Helper](./function/HttpTool.html) | HTTP request / response debugging |
| 🔧 Debug | 🔌 [WebSocket Tester](./function/WebsocketTool.html) | ws/wss protocols, text/hex send-receive, auto-reconnect |
| 🔧 Debug | 🔗 [CAN Bus Helper](./function/CanBusTool.html) | J1939 disassembly, DBC parsing, signal decoding, reverse calculation |
| 💻 Software | 🎨 [Image to Data / Renderer](./function/ImageToData.html) | Multi-format color conversion, data extraction & array rendering, Floyd dithering |
| 💻 Software | 🔢 [CRC Calculator](./function/CRCCheck.html) | CRC-8/16/32/64 multiple algorithms |
| 💻 Software | 🔁 [Radix Converter](./function/RadixConverter.html) | Real-time radix conversion, bitwise ops, floating-point conversion |
| 💻 Software | 📈 [Signal Plotter](./function/SignalPlotter.html) | Signal plotting, FFT transform, digital filter analysis |
| 💻 Software | 🎯 [PID Controller](./function/PIDemulator.html) | Real-time PID tuning and simulation |
| 💻 Software | 📝 [Text Diff & Merge](./function/TextDiffMerge.html) | Text diff comparison, line-level highlighting, merge & export |
| 💻 Software | ⏱️ [Unix Timestamp Converter](./function/UnixTimestamp.html) | Unix timestamp ↔ local time, supports ms / s |
| 💻 Software | ⏲️ [Timing Lab](./function/Timing_lab.html) | High-precision stopwatch, pulse-width analysis, lap spike curves, event timeline |
| ⚡ Hardware | 🔋 [Power Calculator](./function/PowerCalculator.html) | Estimate device runtime from battery capacity |
| ⚡ Hardware | ⚡ [ADC Converter](./function/ADCConverter.html) | ADC value ↔ voltage ↔ percentage, multi-resolution |
| 🌐 Other | 🌐 Yu_Tool Desktop Assistant | QT-based desktop debugging tool (see link below) |

### 📥 External Debug Tools

| Tool | Description |
|------|-------------|
| 🌐 [Yu_Tool Desktop Assistant](https://gitee.com/Yu_29211/yu_-tool) | QT-based desktop debugging tool, supports Modbus / MQTT / Serial / TCP |

> More tools are under continuous development…

---

## 🚀 Features

- **Categorized Navigation** — All / Debug / Hardware / Software / Other; a single tool can belong to multiple categories
- **⭐ Favorites** — Star any card to save it; the "Favorites" tab filters to saved tools, persisted locally
- **Real-time Search** — Instant filtering by tool name, description, or category keywords
- **Theme Switching** — Light / Dark dual themes via CSS Variables, state persisted in localStorage
- **Responsive Design** — Adapts to desktop, tablet, and mobile
- **Card Animations** — Fade-in animation, hover lift, NEW badge for new tools
- **Join Group** — Quick link to join the QQ tech community (453705020)
- **Mascot Easter Eggs** — The navbar "eyes + mouth" that follow your cursor, blink, fall asleep / wake; a chat bubble rotating quips every 10s, a 10-step easter-egg for repeatedly clicking the eyes, and one-liners when hovering cards / buttons

---

## 📁 Project Structure

```
.
├── index.html                      # Toolbox home page (navigation & tool cards)
├── README.md                       # Project documentation (Chinese)
├── README_en.md                    # Project documentation (English)
├── LICENSE                         # Open-source license
│
├── asset/                          # Static assets
│   ├── Logo/                       # Image resources
│   │   ├── Yu_Tools.png            # Toolbox logo
│   │   └── Yu.jfif                 # Backup logo
│   │
│   ├── CSS/                        # Stylesheets
│   │   ├── common.css              # ★ Shared styles (theme vars, reset, navbar, panels, unified buttons/inputs/sliders/selects, code output, status labels, etc.)
│   │   ├── index.css               # Home page styles (Hero, tool card grid, category tabs, search box, GitHub button, favorite star, footer, etc.)
│   │   ├── ADCConverter.css        # ADC Converter page styles
│   │   ├── CRCCheck.css            # CRC Calculator page styles
│   │   ├── CanBusTool.css          # CAN Bus Helper page styles
│   │   ├── HttpTool.css            # HTTP Helper page styles
│   │   ├── ImageToData.css         # Image to Data page styles
│   │   ├── ModbusRTU.css           # Modbus RTU Helper page styles
│   │   ├── MqttTool.css            # MQTT Helper page styles
│   │   ├── PIDemulator.css         # PID Controller page styles
│   │   ├── PowerCalculator.css     # Power Calculator page styles
│   │   ├── RadixConverter.css      # Radix Converter page styles
│   │   ├── SignalPlotter.css       # Signal Plotter page styles
│   │   ├── TextDiffMerge.css       # Text Diff & Merge page styles
│   │   ├── UnixTimestamp.css       # Unix Timestamp Converter page styles
│   │   ├── WebsocketTool.css       # WebSocket Tester page styles
│   │   ├── Timing_lab.css          # Timing Lab page styles
│   │   └── serialPortTool.css      # Serial Port Tool page styles
│   │
│   └── JavaScript/                 # JavaScript scripts
│       ├── theme.js                # ★ Shared theme switching logic (global setTheme + themechange event)
│       ├── index.js                # Home page script (tool data + category/search rendering + favorites + mascot easter eggs)
│       ├── ADCConverter.js         # ADC Converter page logic
│       ├── CRCCheck.js             # CRC Calculator page logic
│       ├── CanBusTool.js           # CAN Bus Helper page logic
│       ├── HttpTool.js             # HTTP Helper page logic
│       ├── ImageToData.js          # Image to Data page logic
│       ├── ModbusRTU.js            # Modbus RTU Helper page logic
│       ├── MqttTool.js             # MQTT Helper page logic (depends on mqtt.js CDN)
│       ├── PIDemulator.js          # PID Controller page logic
│       ├── PowerCalculator.js      # Power Calculator page logic
│       ├── RadixConverter.js       # Radix Converter page logic
│       ├── SignalPlotter.js        # Signal Plotter page logic
│       ├── TextDiffMerge.js        # Text Diff & Merge page logic
│       ├── UnixTimestamp.js        # Unix Timestamp Converter page logic
│       ├── WebsocketTool.js        # WebSocket Tester page logic
│       ├── Timing_lab.js           # Timing Lab page logic
│       └── serialPortTool.js       # Serial Port Tool page logic (depends on CodeMirror CDN)
│
└── function/                       # Tool page entry HTML files
    ├── serialPortTool.html         # Serial Port Tool
    ├── ModbusRTU.html              # Modbus RTU Helper
    ├── MqttTool.html               # MQTT Helper
    ├── HttpTool.html               # HTTP Helper
    ├── WebsocketTool.html          # WebSocket Tester
    ├── CanBusTool.html             # CAN Bus Helper
    ├── ImageToData.html            # Image to Data / Renderer
    ├── CRCCheck.html               # CRC Calculator
    ├── RadixConverter.html         # Radix Converter
    ├── SignalPlotter.html          # Signal Plotter
    ├── PIDemulator.html            # PID Controller
    ├── TextDiffMerge.html          # Text Diff & Merge
    ├── UnixTimestamp.html          # Unix Timestamp Converter
    ├── PowerCalculator.html        # Power Calculator
    ├── ADCConverter.html           # ADC Converter
    └── Timing_lab.html             # Timing Lab
```

---

## 🧩 CSS/JS Architecture

The project has completed **full CSS/JS separation**. All pages follow a "shared + page-specific" two-layer structure.

### Shared Styles — `asset/CSS/common.css`

Every page (including the home page) imports `common.css` first. It provides:

| Module | Contents |
|--------|----------|
| **Theme Variables** | `:root` + `[data-theme="dark"]` two sets of CSS variables (background, text, border, button, status, accent colors, etc.) |
| **Global Reset** | `*` box-sizing / font-family, `body` base layout, `::-webkit-scrollbar` unified scrollbar |
| **Navbar** | `.navbar`, `.navbar-inner`, `.navbar-brand`, `.navbar-right` (function pages link back to home from here) |
| **Theme Toggle Button** | `.theme-toggle` + `.toggle-track` + `.toggle-thumb` + `.theme-icon` + dark variants |
| **Container / Title** | `.container`, `.page-title`, `.subhead` |
| **Panels** | `.panel`, `.panel-accent`, `.panel-title`, unified card hover highlight border |
| **Grids** | `.grid-2col`, `.grid-3col` + 900px responsive breakpoint |
| **Forms** | `.input-group`, `.input-row`, `.input-row label` |
| **★ Unified Controls** | `.input-row input/select/textarea` (10px radius, focus blue shadow), `input[type="range"]` (4px track + 16px round thumb), `checkbox/radio` (unified accent-color), `.btn` (40px radius, hover scale 0.97), `.btn-outline`, `.btn-sm`, `.btn-group` |
| **Auxiliary Labels** | `.unit`, `.hint-text`, `.tag`, `.range-badge`, `.status-ok/error/warn` |
| **Code Output** | `.code-output` (monospace font, scrollbar) |
| **Utilities** | `.footer-note`, `.flex-between`, `.mt-8`, `.file-input-wrapper`, `@keyframes fadeInUp` |
| **Responsive** | Navbar & theme toggle adaptations at 600px / 480px breakpoints |

### Page-Specific Styles — `asset/CSS/<page-name>.css`

Each page imports its own `.css` **after** `common.css`, containing only page-specific styles:

- Page-specific CSS variables (e.g., chart colors, diff highlights, HTTP method colors)
- Page-specific components (tool cards, battery preset cards, bit manipulation grids, modals, CodeMirror themes, diff views, etc.)
- Minor overrides of common.css (e.g., `.code-output` max-height)

### Shared Script — `asset/JavaScript/theme.js`

```
Global function: setTheme(theme)
  ├─ Sets documentElement's data-theme attribute
  ├─ Updates #themeIcon text (☀️ / 🌙)
  ├─ Persists to localStorage
  └─ Dispatches themechange event (pages can listen to redraw charts)

On DOMContentLoaded:
  ├─ Binds #themeToggle click toggle
  └─ Syncs icon based on current data-theme (fixes cross-page icon inheritance)
```

### Page-Specific Scripts — `asset/JavaScript/<page-name>.js`

- Page-specific business logic (algorithm calculations, event bindings, Canvas charts, DBC parsing, diff algorithms, etc.)
- If chart redraw on theme change is needed, listen to the `themechange` event (used by: ADCConverter, PIDemulator, SignalPlotter, serialPortTool, TextDiffMerge)

### HTML Entry Structure (unified for all function pages)

```html
<head>
    <!-- 1. Theme pre-init inline script (prevents load flash; MUST be inline in head, cannot be extracted) -->
    <script>
        const savedTheme = localStorage.getItem('toolbox-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    </script>

    <!-- 2. External libraries (only serialPortTool and MqttTool need these) -->
    <link rel="stylesheet" href="...cdn...codemirror.min.css">
    <script src="...cdn...codemirror.min.js"></script>

    <!-- 3. Style layer: common first → then page-specific -->
    <link rel="stylesheet" href="../asset/CSS/common.css">
    <link rel="stylesheet" href="../asset/CSS/XXXXXX.css">
</head>
<body>
    ...page content...

    <!-- 4. Script layer: theme.js first → then page-specific -->
    <script src="../asset/JavaScript/theme.js"></script>
    <script src="../asset/JavaScript/XXXXXX.js"></script>
</body>
```

> `index.html` uses path `./asset/...` (same level as asset). `function/*.html` uses `../asset/...` (one level up to reach asset).

### External Dependencies

| File | Dependency | Purpose |
|------|-----------|---------|
| `function/serialPortTool.html` | CodeMirror 5.65.16 (cdnjs) | Script editor code highlighting |
| `function/MqttTool.html` | mqtt@4.3.7 (unpkg) | MQTT over WebSocket client |

The remaining 14 pages are pure vanilla JS with zero external dependencies.

---

## 💻 Local Development

Static pages — just double-click `index.html` to open in a browser. For HTTP protocol access (recommended):

```bash
# Option 1: Python
cd project-root
python -m http.server 8000

# Option 2: Node.js
npx serve .
```

Then visit `http://localhost:8000`.

---

## 🔗 Related Links

- **GitHub Repository**: [Yu-admin123/yu-admin123.github.io](https://github.com/Yu-admin123/yu-admin123.github.io)
- **GitHub Pages**: [https://yu-admin123.github.io](https://yu-admin123.github.io)
- **China Mirror**: [https://kit-ymjk.upma.site](https://kit-ymjk.upma.site/)
- **Yu_Tool Desktop Assistant (Gitee)**: [Yu_29211/yu_-tool](https://gitee.com/Yu_29211/yu_-tool)
- **QQ Community**: 453705020

---

## 📄 License

This project is open-sourced under the [Apache License 2.0](./LICENSE).

Copyright © 2026 **Yu-admin123**  
If you reuse, modify or redistribute this project, please retain the copyright notice and the [NOTICE](./NOTICE) file, and credit the original source ([GitHub](https://github.com/Yu-admin123/yu-admin123.github.io)).

---

