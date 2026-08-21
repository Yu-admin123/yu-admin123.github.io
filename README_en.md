# Yu_ToolBox — Embedded Developer's Toolbox

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://yu-admin123.github.io)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Yu-admin123/yu-admin123.github.io)

> Last updated: 2026-08-21 · [中文](./README.md)

Ever been mid-project and needed to compute a CRC, convert a radix, check an NTC thermistor, or estimate how much current a PCB trace can carry? You end up hunting for yet another little tool every single time.

Yu_ToolBox gathers these everyday needs into a single web page. **Pure front-end, zero dependencies, no backend — open it and it just works, even offline.** Everything runs in your browser, and your data never leaves your machine.

🔗 Live: [yu-admin123.github.io](https://yu-admin123.github.io) ｜ Mirror (China): [kit-ymjk.upma.site](https://kit-ymjk.upma.site/)

---


## 🧰 What's inside

24 tools, covering debugging, software and hardware work:

| Tool | What it does |
|------|--------------|
| 🔗 [Serial Port Tool](./function/serialPortTool.html) | Custom baud rate, real-time curves, scripted auto-reply |
| 📡 [Modbus RTU Helper](./function/ModbusRTU.html) | Master / slave modes |
| 📶 [MQTT Helper](./function/MqttTool.html) | MQTT over WebSocket, subscribe / publish |
| 🌐 [HTTP Helper](./function/HttpTool.html) | Request / response debugging |
| 🔌 [WebSocket Tester](./function/WebsocketTool.html) | ws/wss, text / hex, auto-reconnect |
| 📡 [BLE Debugger](./function/BLE_Debugger.html) | Scan / connect / read / write / notify, service tree + hex dump |
| 🔗 [CAN Bus Helper](./function/CanBusTool.html) | J1939 disassembly, DBC parsing, signal decoding |
| 🎨 [Image to Data / Renderer](./function/ImageToData.html) | Color format conversion, bitmap extraction, Floyd dithering |
| 🔢 [CRC Calculator](./function/CRCCheck.html) | CRC-8/16/32/64 |
| 🔁 [Radix Converter](./function/RadixConverter.html) | Live conversion, bitwise ops, floats |
| 📈 [Signal Plotter](./function/SignalPlotter.html) | Plotting, FFT, digital filtering |
| 🎯 [PID Controller](./function/PIDemulator.html) | Live tuning + simulation |
| 📝 [Text Diff & Merge](./function/TextDiffMerge.html) | Diff, line-level highlight, merge & export |
| ⏱️ [Unix Timestamp Converter](./function/UnixTimestamp.html) | Timestamp ↔ local time |
| ⏲️ [Timing Lab](./function/Timing_lab.html) | High-precision stopwatch, pulse-width analysis |
| 📊 [Flowchart Drawer](./function/MermaidDraw.html) | Mermaid-based, online / offline, embedded templates |
| 📝 [Markdown Editor](./function/MarkdownEditor.html) | Live preview, VSCode-style highlight, online / offline |
| 🔋 [Power Calculator](./function/PowerCalculator.html) | Estimate runtime from battery capacity |
| ⚡ [ADC Converter](./function/ADCConverter.html) | ADC ↔ voltage ↔ percentage, multi-resolution |
| 🔥 [NTC Thermistor Calculator](./function/NtcCounter.html) | B-value / 3-point calibration, R ↔ T |
| 🧮 [Resistive Divider Calculator](./function/ResDivider.html) | Forward / reverse solve, E24 suggestion |
| 🖥️ [PCB Trace Width Calculator](./function/PcbTrace.html) | IPC-2152 model, width ↔ current |
| 🕳️ [PCB Via Current Calculator](./function/ViaCalc.html) | Single-via current / via count |
| 🔲 [QR Code Reader/Writer](./function/QRCodeTool.html) | Generate QR/barcodes offline, decode QR from images, multi-format |

There's also a desktop version, [Yu_Tool Desktop Assistant](https://gitee.com/Yu_29211/yu_-tool) (Qt-based, covering serial / Modbus / MQTT / TCP).

> More tools on the way.

---

## ✨ Nice touches

- **Categories + search**: filter by debug / hardware / software / docs / other — a tool can live in several categories; search matches names, descriptions and category keywords
- **中文 / English**: switch in one click — even chart axis labels and tooltips follow along
- **Light / dark theme**: your choice, remembered across pages
- **Favorites**: star the tools you use often, filter by them in one click, stored locally
- **Works on any screen**: phone, tablet, desktop
- **A hidden easter egg**: the mascot's eyes follow your cursor, blink, and fall asleep when idle — click them ten times and see what happens
- **One-click community**: jump straight to the QQ group (453705020) from the navbar

---

## 🛠️ Project structure

Pure static project, no build step. Every tool follows the "three-file rule": one HTML + one CSS + one JS with **matching names**, living in `function/`, `asset/CSS/` and `asset/JavaScript/` respectively — keep the three filenames identical.

```
Yu_ToolBox/
├── index.html                    # Home page: nav / categories / search / favorites / mascot / ad banner
├── README.md / README_en.md      # Project docs (Chinese / English)
├── LICENSE / NOTICE              # Open-source license and copyright notice
│
├── asset/                        # Static assets
│   ├── Logo/
│   │   ├── Yu_Tools.png          # Toolbox logo (favicon + navbar brand)
│   │   └── Yu.jfif               # Fallback logo
│   │
│   ├── CSS/
│   │   ├── common.css            # ★ Shared styles, first stylesheet on every page: theme variables,
│   │   │                         #   reset, scrollbars, navbar, panels, unified buttons/inputs/
│   │   │                         #   sliders/checkboxes, code output, status tags, responsive breakpoints
│   │   ├── index.css             # Home page styles: hero, tool card grid, category buttons, search, favorites, mascot, ad banner
│   │   ├── serialPortTool.css    # Serial Port Tool
│   │   ├── ModbusRTU.css         # Modbus RTU Helper
│   │   ├── MqttTool.css          # MQTT Helper
│   │   ├── HttpTool.css          # HTTP Helper
│   │   ├── WebsocketTool.css     # WebSocket Tester
│   │   ├── BLE_Debugger.css      # BLE Debugger
│   │   ├── CanBusTool.css        # CAN Bus Helper
│   │   ├── ImageToData.css       # Image to Data / Renderer
│   │   ├── CRCCheck.css          # CRC Calculator
│   │   ├── RadixConverter.css    # Radix Converter
│   │   ├── SignalPlotter.css     # Signal Plotter
│   │   ├── PIDemulator.css       # PID Controller
│   │   ├── TextDiffMerge.css     # Text Diff & Merge
│   │   ├── UnixTimestamp.css     # Unix Timestamp Converter
│   │   ├── Timing_lab.css        # Timing Lab
│   │   ├── MermaidDraw.css       # Flowchart Drawer
│   │   ├── MarkdownEditor.css    # Markdown Editor
│   │   ├── PowerCalculator.css   # Power Calculator
│   │   ├── ADCConverter.css      # ADC Converter
│   │   ├── NtcCounter.css        # NTC Thermistor Calculator
│   │   ├── ResDivider.css        # Resistive Divider Calculator
│   │   ├── PcbTrace.css          # PCB Trace Width Calculator
│   │   ├── ViaCalc.css           # PCB Via Current Calculator
│   │   └── QRCodeTool.css        # QR Code Reader/Writer
│   │
│   ├── JavaScript/
│   │   ├── theme.js              # ★ Shared theming: setTheme + themechange event + icon sync
│   │   ├── i18n.js               # ★ Shared i18n: I18N dictionary + languagechange event + data-i18n
│   │   ├── index.js              # Home scripts: toolsData registry + categories/search/favorites + mascot
│   │   └── <tool>.js ×24         # Per-tool logic, one-to-one with the CSS files above
│   │
│   └── lib/                      # Local third-party libs (offline fallback)
│       ├── mermaid.min.js        # mermaid v11 (offline rendering for Flowchart Drawer)
│       ├── marked.min.js         # marked v12 (offline rendering for Markdown Editor)
│       ├── highlight.min.js      # highlight.js v11 (offline highlighting for Markdown Editor)
│       ├── qrcode.min.js         # standard QR generation (qrcode-generator, offline)
│       ├── qrcode_UTF8.js        # qrcode-generator UTF-8 patch (correct CJK encoding/decoding)
│       ├── bwip-js.js            # multi-format QR/barcode generation engine (offline)
│       └── jsQR.js               # QR decoding (jsQR, offline)
│
└── function/                     # Tool entry HTML, forming the three-file set with asset CSS/JS
    ├── serialPortTool.html       # Serial Port Tool
    ├── ModbusRTU.html            # Modbus RTU Helper
    ├── MqttTool.html             # MQTT Helper
    ├── HttpTool.html             # HTTP Helper
    ├── WebsocketTool.html        # WebSocket Tester
    ├── BLE_Debugger.html         # BLE Debugger
    ├── CanBusTool.html           # CAN Bus Helper
    ├── ImageToData.html          # Image to Data / Renderer
    ├── CRCCheck.html             # CRC Calculator
    ├── RadixConverter.html       # Radix Converter
    ├── SignalPlotter.html        # Signal Plotter
    ├── PIDemulator.html          # PID Controller
    ├── TextDiffMerge.html        # Text Diff & Merge
    ├── UnixTimestamp.html        # Unix Timestamp Converter
    ├── Timing_lab.html           # Timing Lab
    ├── MermaidDraw.html          # Flowchart Drawer
    ├── MarkdownEditor.html       # Markdown Editor
    ├── PowerCalculator.html      # Power Calculator
    ├── ADCConverter.html         # ADC Converter
    ├── NtcCounter.html           # NTC Thermistor Calculator
    ├── ResDivider.html           # Resistive Divider Calculator
    ├── PcbTrace.html             # PCB Trace Width Calculator
    ├── ViaCalc.html              # PCB Via Current Calculator
    └── QRCodeTool.html           # QR Code Reader/Writer
```

A few conventions worth knowing before touching the code:

- **Three-file rule**: every tool is `function/name.html` + `asset/CSS/name.css` + `asset/JavaScript/name.js`; CSS/JS live in external files, never inline
- **Theming**: CSS variables + a `[data-theme="dark"]` set; chart pages listen for the `themechange` event to redraw
- **i18n**: HTML uses `data-i18n` attributes, dynamic text goes through `window.I18N.t()`, translation dictionaries live at the top of each tool's JS
- **Persistence**: theme, language, favorites and editor split ratios are kept in localStorage

### External dependencies

| Page | Library | Purpose |
|------|---------|---------|
| Serial Port Tool | CodeMirror (CDN) | Syntax highlighting in the script editor |
| MQTT Helper | mqtt.js (CDN) | MQTT over WebSocket client |
| Flowchart Drawer | mermaid@11 (CDN + local lib fallback) | Diagram rendering, works offline |
| Markdown Editor | marked + highlight.js (CDN + local lib fallback) | Live preview + code highlighting |
| QR Code Reader/Writer | qrcode + bwip-js + jsQR (local lib, fully offline) | Multi-format QR/barcode generation & decoding |

The other 19 pages are vanilla JS with zero external dependencies.

---

## 🚀 Run locally

It's all static — just double-click `index.html`. Serial / Bluetooth features need a secure context (`localhost` counts), so a local server is recommended:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000`.

---

## 🙋 Contributing

**Feature requests / bug reports**: open an issue, or drop by the QQ group (453705020).

**Add your own tool**: copy the three files of an existing tool and adapt — no build step required. 

**Deploying**: the site is hosted on GitHub Pages — push your changes and you're live.

---

## 🔗 Links

- GitHub repo: [Yu-admin123/yu-admin123.github.io](https://github.com/Yu-admin123/yu-admin123.github.io)
- Live demo: [https://yu-admin123.github.io](https://yu-admin123.github.io)
- China mirror: [https://kit-ymjk.upma.site](https://kit-ymjk.upma.site/)
- Desktop assistant: [Gitee](https://gitee.com/Yu_29211/yu_-tool)
- QQ group: 453705020

---

## 📄 License
This project is open-sourced under the [Apache License 2.0](./LICENSE).

Copyright © 2026 **Yu-admin123**  
If you reuse, modify or redistribute this project, please retain the copyright notice and the [NOTICE](./NOTICE) file, and credit the original source ([GitHub](https://github.com/Yu-admin123/yu-admin123.github.io)).

