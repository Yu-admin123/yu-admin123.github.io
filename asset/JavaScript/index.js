// ============================================================
//  index.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
//  文件末尾含 Hero 小组件（时钟 · 下班进度 · 喝水/久坐提醒）
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性使用）
// ============================================================
window.I18N_STRINGS = {
    'index.cat.all':        { zh: '全部',   en: 'All' },
    'index.cat.debug':      { zh: '调试',   en: 'Debug' },
    'index.cat.hardware':   { zh: '硬件',   en: 'Hardware' },
    'index.cat.software':   { zh: '软件',   en: 'Software' },
    'index.cat.doc':        { zh: '文档',   en: 'Docs' },
    'index.cat.other':      { zh: '其他',   en: 'Other' },
    'index.cat.fav':        { zh: '收藏', en: 'Favorites' },
    'index.ad.badge':       { zh: '广告', en: 'Ad' },
    'index.ad.close':       { zh: '关闭广告', en: 'Close ad' },
    'index.ad.bannerText':  { zh: '这里的广告位正在招商，欢迎赞助这个免费工具箱 ✨', en: 'Ad spot open for sponsorship — support this free toolbox ✨' },
    'index.fav.empty':      { zh: '还没有收藏任何工具，点卡片右上角的 ⭐ 把它加进来吧', en: 'No favorites yet — click the ⭐ on a card to add it' },
    'index.fav.add':        { zh: '收藏', en: 'Add to favorites' },
    'index.fav.remove':     { zh: '取消收藏', en: 'Remove from favorites' },
    'index.search.placeholder': { zh: '搜索工具...', en: 'Search tools...' },
    'index.lang.title':     { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'index.theme.title':    { zh: '切换主题', en: 'Toggle theme' },
//    'index.nav.eye':        { zh: '我在看你 👀', en: 'Watching you 👀' },
    'index.hero.desc':      { zh: '专为嵌入式开发者打造的在线工具集合。一站式解决开发中的高频需求。', en: 'An online toolset built for embedded developers. One-stop solution for high-frequency needs.' },
    'index.hero.join':      { zh: '加入交流群：453705020', en: 'Join QQ Group: 453705020' },
    'index.footer.line1':   { zh: '嵌入式开发者工具箱', en: 'Embedded Developer Toolbox' },
    'index.footer.line2':   { zh: '一站式解决开发中的高频需求 · 欢迎加入技术交流群：', en: 'One-stop solution for high-frequency needs · Join our tech group: ' },
    'index.empty.text':     { zh: '没有找到匹配的工具，试试其他关键词或分类？', en: 'No matching tools found. Try other keywords or categories?' },

    /* Hero 小组件 */
    'index.hw.offProgress':    { zh: '下班进度', en: 'Off-Work Progress' },
    'index.hw.until':          { zh: '距下班还有', en: 'left' },
    'index.hw.offWork':        { zh: '🎉 已下班！', en: '🎉 Off Work!' },
    'index.hw.notStarted':     { zh: '还没到上班时间', en: 'Work not started yet' },
    'index.hw.waterReminder':  { zh: '喝水', en: 'Water' },
    'index.hw.sitReminder':    { zh: '久坐', en: 'Sit' },
    'index.hw.waterAlert':     { zh: '该喝水了！', en: 'Time to drink water!' },
    'index.hw.sitAlert':       { zh: '该活动了！', en: 'Time to stand up!' },
    'index.hw.settings':       { zh: '设置', en: 'Settings' },
    'index.hw.workStart':      { zh: '上班时间', en: 'Start Time' },
    'index.hw.workEnd':        { zh: '下班时间', en: 'End Time' },
    'index.hw.waterMl':      { zh: '每次喝水', en: 'Per drink' },
    'index.hw.waterGoal':    { zh: '每日目标', en: 'Daily goal' },
    'index.hw.sitInterval':    { zh: '久坐间隔', en: 'Sit Interval' },
    'index.hw.notifications':  { zh: '桌面通知', en: 'Notifications' },
    'index.hw.save':           { zh: '保存', en: 'Save' },
    'index.hw.cancel':         { zh: '取消', en: 'Cancel' },
    'index.hw.resetTimers':    { zh: '重置计时', en: 'Reset timers' },
    'index.hw.storageOk':      { zh: '🟢 计时数据已保存在本地，刷新页面不会重置', en: '🟢 Timers persist locally — refresh keeps countdown' },
    'index.hw.storageCookie':  { zh: '🟡 localStorage 不可用，已改用 Cookie 保存，刷新页面不会重置', en: '🟡 localStorage unavailable, using Cookie — refresh keeps countdown' },
    'index.hw.storageNone':    { zh: '🔴 当前环境无法持久化数据，刷新页面会重置计时', en: '🔴 Storage unavailable — timers reset on refresh' },
    'index.hw.minutes':        { zh: '分钟', en: 'min' },
    'index.hw.notifGranted':   { zh: '✅ 已授权，提醒会弹出系统通知', en: '✅ Granted — reminders will show system notifications' },
    'index.hw.notifPending':   { zh: '⏳ 尚未授权，点击下方开关即可弹出授权请求', en: '⏳ Not granted — click the toggle to request permission' },
    'index.hw.notifDenied':    { zh: '❌ 浏览器已阻止通知：请点击地址栏左侧的 🔒 图标 → 网站设置 → 允许通知', en: '❌ Blocked by browser: click the 🔒 icon in the address bar → Site settings → Allow notifications' },
    'index.hw.notifUnsupported': { zh: '当前浏览器不支持桌面通知', en: 'Desktop notifications are not supported by this browser' },
    'index.hw.testTitle':      { zh: '测试通知', en: 'Test notification' },
    'index.hw.testBody':       { zh: '桌面通知已开启 ✅', en: 'Desktop notifications enabled ✅' },

    // Hero 右侧：今日待办
    'index.todo.title':        { zh: '今日待办', en: 'Today\'s Todos' },
    'index.todo.inputPlaceholder': { zh: '输入待办，回车添加', en: 'Type a todo, press Enter' },
    'index.todo.empty':        { zh: '暂无待办，输入后回车添加 ✍️', en: 'No todos yet — type and press Enter ✍️' },
    'index.todo.clearDone':    { zh: '清除已完成', en: 'Clear done' }
};

// ============================================================
//  工具数据 (含分类标识 + 中英文 title/desc/category)
// ============================================================
const toolsData = [{
    id: 'yu-tool-gitee',
    title: 'Yu_Tool 通讯助手', titleEn: 'Yu_Tool Desktop Assistant',
    desc: '访问 Gitee 仓库下载 Yu_Tool 通讯调试工具。', descEn: 'Visit Gitee repo to download Yu_Tool desktop debugging tool.',
    icon: './asset/Logo/Yu_Tools.png',
    iconClass: 'icon-blue',
    url: 'https://gitee.com/Yu_29211/yu_-tool',
    tagAccent: [true, false, false],
    category: '下载导航', categoryEn: 'Download',
    categoryType: ['other','debug'],
    isNew: false
}, {
    id: 'serial-port',
    title: '串口调试助手', titleEn: 'Serial Port Tool',
    desc: '可自定义波特率 · 实时数据曲线 · 脚本自动回复', descEn: 'Customizable baud rate · real-time data curves · script auto-reply.',
    icon: '🔗',
    iconClass: 'icon-blue',
    url: './function/serialPortTool.html',
    tagAccent: [true, false, false],
    category: '串口/通讯/调试', categoryEn: 'Serial/Comm/Debug',
    categoryType: 'debug',
    isNew: false
},{
    id: 'Modbus-check',
    title: 'Modbus RTU助手', titleEn: 'Modbus RTU Helper',
    desc: '支持ModbusRTU主站 · 从站操作', descEn: 'Supports Modbus RTU master / slave operations.',
    icon: '📡',
    iconClass: 'icon-blue',
    url: './function/ModbusRTU.html',
    tagAccent: [true, false, false],
    category: 'Modbus/通讯/串口/调试', categoryEn: 'Modbus/Comm/Serial/Debug',
    categoryType: 'debug',
    isNew: false
}, {
    id: 'MqttTool',
    title: 'MQTT助手', titleEn: 'MQTT Helper',
    desc: '基于 MQTT over WebSocket · 支持订阅/发布', descEn: 'MQTT over WebSocket · supports subscribe / publish',
    icon: '📶',
    iconClass: 'icon-blue',
    url: './function/MqttTool.html',
    tagAccent: [true, false, false],
    category: 'MQTT/通讯/网络/调试', categoryEn: 'MQTT/Comm/Network/Debug',
    categoryType: 'debug',
    isNew: false
}, {
    id: 'HttpTool',
    title: 'HTTP助手', titleEn: 'HTTP Helper',
    desc: '基于 HTTP over WebSocket · 支持请求/响应', descEn: 'HTTP request / response debugging',
    icon: '🌐',
    iconClass: 'icon-blue',
    url: './function/HttpTool.html',
    tagAccent: [true, false, false],
    category: 'HTTP/通讯/网络/调试', categoryEn: 'HTTP/Comm/Network/Debug',
    categoryType: 'debug',
    isNew: false
}, {
    id: 'WebsocketTool',
    title: 'WebSocket 测试工具', titleEn: 'WebSocket Tester',
    desc: '支持 ws / wss 协议 · 文本 / 十六进制收发 · 消息日志 · 自动重连', descEn: 'ws / wss protocols · text / hex send-receive · message log · auto-reconnect.',
    icon: '🔌',
    iconClass: 'icon-blue',
    url: './function/WebsocketTool.html',
    tagAccent: [true, false, false],
    category: 'WebSocket/通讯/网络/调试', categoryEn: 'WebSocket/Comm/Network/Debug',
    categoryType: 'debug',
    isNew: false
},{
    id: 'BLE_Debugger',
    title: '蓝牙调试器', titleEn: 'BLE Debugger',
    desc: '基于 Web Bluetooth API · 扫描/连接/读写/通知', descEn: 'Web Bluetooth API · scan / connect / read / write / notify',
    icon: '📡',
    iconClass: 'icon-blue',
    url: './function/BLE_Debugger.html',
    tagAccent: [true, false, false],
    category: '蓝牙/BLE/调试/无线', categoryEn: 'Bluetooth/BLE/Debug/Wireless',
    categoryType: 'debug',
    isNew: true
}, {
    id: 'CanBusTool',
    title: 'CAN 总线助手', titleEn: 'CAN Bus Helper',
    desc: '支持 J1939 拆解 · DBC 解析 · 信号解码 · 反向计算', descEn: 'J1939 disassembly, DBC parsing, signal decoding, reverse calculation.',
    icon: '🔗',
    iconClass: 'icon-blue',
    url: './function/CanBusTool.html',
    tagAccent: [true, false, false],
    category: 'CAN/通讯/总线/调试', categoryEn: 'CAN/Comm/Bus/Debug',
    categoryType: 'debug',
    isNew: false
},{
    id: 'ImageToData-tool',
    title: '图片取模 / 渲染工具', titleEn: 'Image to Data / Renderer',
    desc: '支持多种颜色格式的互转 · 取模与数组渲染 ·含多种扫描方向与 Floyd 抖动', descEn: 'Multi-format color conversion, data extraction & array rendering, multiple scan orders & Floyd dithering.',
    icon: '🎨',
    iconClass: 'icon-blue',
    url: './function/ImageToData.html',
    tagAccent: [false, false, true],
    category: '色彩与图形/转换/取模/渲染/颜色', categoryEn: 'Color/Graphic/Convert/Render',
    categoryType: 'software',
    isNew: false
}, {
    id: 'power-calc',
    title: '电池功耗计算器', titleEn: 'Power Calculator',
    desc: '选择电池估算设备工作时长（天/周/月）', descEn: 'Estimate device runtime from battery capacity (days/weeks/months).',
    icon: '🔋',
    iconClass: 'icon-blue',
    url: './function/PowerCalculator.html',
    tagAccent: [true, false, false],
    category: '功耗计算/电池/计算', categoryEn: 'Power/Battery/Calc',
    categoryType: 'hardware',
    isNew: false
}, {
    id: 'CRC-check',
    title: 'CRC校验计算器', titleEn: 'CRC Calculator',
    desc: '支持 CRC-8/16/32/64 多种算法', descEn: 'Supports CRC-8/16/32/64 multiple algorithms.',
    icon: '🔢',
    iconClass: 'icon-blue',
    url: './function/CRCCheck.html',
    tagAccent: [true, false, false],
    category: '校验计算/CRC', categoryEn: 'Checksum/CRC',
    categoryType: 'software',
    isNew: false
}, {
    id: 'RadixConverter',
    title: '进制转换', titleEn: 'Radix Converter',
    desc: '进制实时互转 · 位操作 · 浮点数转换', descEn: 'Real-time radix conversion · bitwise ops · floating-point conversion.',
    icon: '🔁',
    iconClass: 'icon-blue',
    url: './function/RadixConverter.html',
    tagAccent: [true, false, false],
    category: '进制转换/转换', categoryEn: 'Radix/Convert',
    categoryType: 'software',
    isNew: false
}, {
    id: 'ADCConverter',
    title: 'ADC转换', titleEn: 'ADC Converter',
    desc: 'ADC转换 ↔ 电压值 ↔ 百分比 互转 · 支持多分辨率', descEn: 'ADC value ↔ voltage ↔ percentage conversion · multi-resolution',
    icon: '⚡',
    iconClass: 'icon-blue',
    url: './function/ADCConverter.html',
    tagAccent: [true, false, false],
    category: 'ADC转换/转换', categoryEn: 'ADC/Convert',
    categoryType: ['hardware', 'software'],
    isNew: false
}, {
    id: 'SignalPlotter',
    title: '数据曲线可视化', titleEn: 'Signal Plotter',
    desc: '信号绘图 · FFT变换 · 数字滤波分析工具', descEn: 'Signal plotting, FFT transform & digital filter analysis.',
    icon: '📈',
    iconClass: 'icon-blue',
    url: './function/SignalPlotter.html',
    tagAccent: [true, false, false],
    category: '数据曲线可视化', categoryEn: 'Signal/Plot/FFT',
    categoryType: 'software',
    isNew: false
}, {
    id: 'PIDController',
    title: 'PID调节器', titleEn: 'PID Controller',
    desc: '实时PID参数调节与仿真工具', descEn: 'Real-time PID tuning and simulation tool.',
    icon: '🎯',
    iconClass: 'icon-blue',
    url: './function/PIDemulator.html',
    tagAccent: [true, false, false],
    category: 'PID调节器', categoryEn: 'PID/Controller',
    categoryType: 'software',
    isNew: false
}, {
    id: 'UnixTimestamp',
    title: 'Unix时间戳转换', titleEn: 'Unix Timestamp Converter',
    desc: 'Unix时间戳 ↔ 本地时间互转 · 支持毫秒/秒级', descEn: 'Unix timestamp ↔ local time conversion · supports ms / s.',
    icon: '⏱️',
    iconClass: 'icon-blue',
    url: './function/UnixTimestamp.html',
    tagAccent: [true, false, false],
    category: '时间戳转换/时间/开发', categoryEn: 'Timestamp/Time/Dev',
    categoryType: 'software',
    isNew: false
}, {
    id: 'TimingLab',
    title: '时序秒表', titleEn: 'Timing Lab',
    desc: '高精度主秒表 · 脉宽测量分析 · 打点尖峰曲线 · 事件时间线', descEn: 'High-precision stopwatch · pulse-width analysis · lap spike curves · event timeline.',
    icon: '⏲️',
    iconClass: 'icon-blue',
    url: './function/Timing_lab.html',
    tagAccent: [true, false, false],
    category: '时序/秒表/脉宽/测量/分析/调试/计时/时间/开发', categoryEn: 'Timing/Stopwatch/Pulse/Measure/Analysis/Debug/Time/Dev',
    categoryType: ['hardware', 'software'],
    isNew: false
}, {
    id: 'NtcCounter',
    title: 'NTC 电阻计算器', titleEn: 'NTC Thermistor Calculator',
    desc: 'B值模式 / 三点标定模式 · 通过参数计算B值 · 电阻↔温度双向互算 · 分压 & ADC查表', descEn: 'B-value / 3-point calibration · compute B from params · R↔T bidirectional calc · V-divider & ADC lookup',
    icon: '🔥',
    iconClass: 'icon-blue',
    url: './function/NtcCounter.html',
    tagAccent: [true, false, false],
    category: 'NTC/热敏电阻/温度/计算/硬件/B值/标定', categoryEn: 'NTC/Thermistor/Temp/Calc/Hardware/B-value/Calibration',
    categoryType: ['hardware', 'software'],
    isNew: false
}, {
    id: 'ResDivider',
    title: '电阻分压计算器', titleEn: 'Resistive Divider Calculator',
    desc: '常规电阻分压计算器 · 正向求Vout / 反向求R / E24标准电阻推荐', descEn: 'Resistive divider calc · forward Vout / reverse solve R / E24 standard value recommend.',
    icon: '🧮',
    iconClass: 'icon-blue',
    url: './function/ResDivider.html',
    tagAccent: [true, false, false],
    category: '电阻分压/分压器/电压/计算/硬件', categoryEn: 'Voltage/Divider/Calc/Hardware',
    categoryType: 'hardware',
    isNew: false
}, {
    id: 'PcbTrace',
    title: 'PCB 走线宽度计算器', titleEn: 'PCB Trace Width Calculator',
    desc: 'IPC-2152 经验模型 · 正向求线宽 / 反向求电流 · 电阻·压降·功耗估算', descEn: 'IPC-2152 model · forward width / reverse current · R/ΔV/power estimate.',
    icon: '🖥️',
    iconClass: 'icon-blue',
    url: './function/PcbTrace.html',
    tagAccent: [true, false, false],
    category: 'PCB/走线宽度/硬件/计算/载流', categoryEn: 'PCB/Trace/Hardware/Calc',
    categoryType: 'hardware',
    isNew: false
}, {
    id: 'ViaCalc',
    title: 'PCB 过孔电流计算器', titleEn: 'PCB Via Current Calculator',
    desc: 'IPC-2152 铜环等效走线 · 正向求单孔载流 / 反向求过孔数量 · 电阻·压降·功耗估算', descEn: 'IPC-2152 annular-via model · forward via current / reverse via count · R/ΔV/power estimate.',
    icon: '🕳️',
    iconClass: 'icon-blue',
    url: './function/ViaCalc.html',
    tagAccent: [true, false, false],
    category: 'PCB/过孔/硬件/计算/载流', categoryEn: 'PCB/Via/Hardware/Calc',
    categoryType: 'hardware',
    isNew: true
}, {
    id: 'TextDiffMerge',
    title: '文本对比与合并', titleEn: 'Text Diff & Merge',
    desc: '文本差异对比 · 行级高亮 · 支持合并导出', descEn: 'Text diff comparison · line-level highlighting · merge & export.',
    icon: '📝',
    iconClass: 'icon-blue',
    url: './function/TextDiffMerge.html',
    tagAccent: [true, false, false],
    category: '文本对比/Diff/Merge/开发', categoryEn: 'Text/Diff/Merge/Dev',
    categoryType: ['software', 'doc'],
    isNew: false
}, {
    id: 'MermaidDraw',
    title: '在线流程图', titleEn: 'Flowchart Drawer',
    desc: '基于 Mermaid · 在线/离线双模式 · 嵌入式开发模板 · 实时预览', descEn: 'Mermaid · online/offline dual mode · embedded templates · live preview.',
    icon: '📊',
    iconClass: 'icon-blue',
    url: './function/MermaidDraw.html',
    tagAccent: [true, false, false],
    category: '流程图/Mermaid/图表/绘制/可视化', categoryEn: 'Flowchart/Mermaid/Diagram/Draw/Visualize',
    categoryType: ['software', 'doc'],
    isNew: true
}, {
    id: 'MarkdownEditor',
    title: 'Markdown 编辑器', titleEn: 'Markdown Editor',
    desc: '实时预览 · VSCode 风格代码高亮 · 在线/离线双模式渲染', descEn: 'Live preview · VSCode-style code highlight · online/offline rendering.',
    icon: '📝',
    iconClass: 'icon-blue',
    url: './function/MarkdownEditor.html',
    tagAccent: [true, false, false],
    category: 'Markdown/编辑器/文档/预览/笔记', categoryEn: 'Markdown/Editor/Document/Preview/Note',
    categoryType: ['software', 'doc'],
    isNew: true
}, ];

// 根据当前语言获取工具的标题/描述/分类
function getToolTitle(tool) { return (window.I18N && window.I18N.getLang() === 'en') ? (tool.titleEn || tool.title) : tool.title; }
function getToolDesc(tool)   { return (window.I18N && window.I18N.getLang() === 'en') ? (tool.descEn || tool.desc) : tool.desc; }
function getToolCategory(tool) { return (window.I18N && window.I18N.getLang() === 'en') ? (tool.categoryEn || tool.category) : tool.category; }

// ============================================================
//  收藏（Favorites）—— localStorage 持久化
// ============================================================
const FAV_KEY = 'toolbox-favs';
let favorites = loadFavs();
function loadFavs() {
    try {
        var raw = localStorage.getItem(FAV_KEY);
        if (raw) {
            var arr = JSON.parse(raw);
            if (Array.isArray(arr)) {
                return arr.filter(function (x) { return x && typeof x === 'string'; });
            }
        }
    } catch (e) {}
    return [];
}
function saveFavs() {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); } catch (e) {}
}
function isFav(id) { return favorites.indexOf(id) !== -1; }
function toggleFav(id) {
    var i = favorites.indexOf(id);
    if (i >= 0) favorites.splice(i, 1);
    else favorites.push(id);
    saveFavs();
    renderTools();
}

// ============================================================
//  分类 + 搜索 渲染逻辑
// ============================================================
const toolsGrid = document.getElementById('toolsGrid');
const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');

let currentCategory = 'all';

// 分类按钮点击
categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        categoryBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.dataset.category;
        renderTools();
    });
});

// 搜索输入
searchInput.addEventListener('input', function() {
    renderTools();
});

function renderTools() {
    const keyword = searchInput.value.trim().toLowerCase();
    const lang = window.I18N ? window.I18N.getLang() : 'zh';

    let filtered = toolsData.filter(tool => {
        // 分类筛选
        if (currentCategory === 'fav') {
            // 收藏分类：只看已收藏
            if (!isFav(tool.id)) {
                return false;
            }
        } else if (currentCategory !== 'all') {
            const types = Array.isArray(tool.categoryType) ? tool.categoryType : [tool.categoryType];
            if (!types.includes(currentCategory)) {
                return false;
            }
        }
        // 关键词筛选（同时匹配中英文，提升搜索体验）
        if (keyword) {
            const title = getToolTitle(tool).toLowerCase();
            const desc = getToolDesc(tool).toLowerCase();
            const cat = getToolCategory(tool).toLowerCase();
            const titleAlt = (lang === 'en' ? tool.title : (tool.titleEn || '')).toLowerCase();
            const descAlt = (lang === 'en' ? tool.desc : (tool.descEn || '')).toLowerCase();
            if (!title.includes(keyword) && !desc.includes(keyword) && !cat.includes(keyword)
                && !titleAlt.includes(keyword) && !descAlt.includes(keyword)) {
                return false;
            }
        }
        return true;
    });

    toolsGrid.innerHTML = '';

    if (filtered.length === 0) {
        const emptyKey = (currentCategory === 'fav') ? 'index.fav.empty' : 'index.empty.text';
        const emptyIcon = (currentCategory === 'fav') ? '⭐' : '🔍';
        toolsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">${emptyIcon}</div>
                    <p>${window.I18N ? window.I18N.t(emptyKey) : '没有找到匹配的工具，试试其他关键词或分类？'}</p>
                </div>
            `;
        return;
    }

    filtered.forEach((tool, index) => {
        const card = document.createElement('a');
        card.className = 'tool-card';
        card.href = tool.url;
        card.target = tool.url.startsWith('http') ? '_blank' : '_self';
        card.dataset.id = tool.id;   // 供悬浮彩弹匹配特殊对话
        card.style.animationDelay = (index * 0.06) + 's';

        const title = getToolTitle(tool);
        const desc = getToolDesc(tool);
        const faved = isFav(tool.id);
        const favTitle = window.I18N ? window.I18N.t(faved ? 'index.fav.remove' : 'index.fav.add') : (faved ? '取消收藏' : '收藏');

        let iconHtml;
        if (tool.icon && (tool.icon.endsWith('.png') || tool.icon.endsWith('.jpg') || tool.icon
                .endsWith('.svg'))) {
            iconHtml =
                `<img src="${tool.icon}" alt="${title}" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">`;
        } else {
            iconHtml = tool.icon;
        }

        card.innerHTML = `
                <div class="tool-card-header">
                    <div class="tool-card-icon ${tool.iconClass}">${iconHtml}</div>
                    <div class="tool-card-info">
                        <div class="tool-card-title">
                            ${title}
                            ${tool.isNew ? '<span class="new-badge">NEW</span>' : ''}
                        </div>
                    </div>
                </div>
                <p class="tool-card-desc">${desc}</p>
                <span class="tool-fav ${faved ? 'active' : ''}" title="${favTitle}" data-fav-id="${tool.id}" role="button" tabindex="0">${faved ? '★' : '☆'}</span>
                <span class="tool-card-arrow">→</span>
            `;

        toolsGrid.appendChild(card);
    });
}

// 收藏按钮的点击/回车交互（卡片会因渲染重建，故用委托监听，只在模块作用域注册一次）
toolsGrid.addEventListener('click', function (e) {
    var star = e.target && e.target.closest ? e.target.closest('.tool-fav') : null;
    if (star) {
        e.preventDefault();
        e.stopPropagation();   // 阻止跳转
        var card = star.closest('.tool-card');
        if (card && card.dataset && card.dataset.id) toggleFav(card.dataset.id);
    }
});
toolsGrid.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var star = e.target && e.target.closest ? e.target.closest('.tool-fav') : null;
    if (star) {
        e.preventDefault();
        e.stopPropagation();
        var card = star.closest('.tool-card');
        if (card && card.dataset && card.dataset.id) toggleFav(card.dataset.id);
    }
});

// 监听语言切换，重新渲染工具卡片
document.addEventListener('languagechange', function () {
    renderTools();
});

// 初始渲染
renderTools();

/* ============================================================
   Hero 区域左侧悬浮小组件
   功能：实时时钟 · 下班进度条 · 喝水/久坐提醒
   依赖：i18n.js (可选)，common.css 主题变量
   ============================================================ */

(function () {
    'use strict';

    // ===== 配置 =====
    var STORAGE_KEY = 'hero-widget-settings';
    // 提醒时间独立存储 key（必须在使用 loadNextTs/saveNextTs 之前定义）
    var NEXT_KEYS = { sit: 'hero-widget-sit-next' };
    var DEFAULT_SETTINGS = {
        workStart: '09:00',
        workEnd:   '18:00',
        waterMl: 250,      // 每次喝水 ml
        waterGoal: 2000,   // 每日目标 ml
        sitInterval:   60,   // 分钟
        notifications: true
    };

    // ===== 状态 =====
    var settings = loadSettings();
    // 喝水：改为统计「今日已喝累计 ml」，跨天自动清零（不再用次数/倒计时）
    var WATER_KEY = 'hero-widget-water';
    var waterToday = loadWaterToday();
    // 久坐：仍为倒计时提醒，时间戳持久化延续
    var sitNextTs  = loadNextTs('sit', settings.sitInterval);
    var sitTriggered   = false;

    // ===== i18n 辅助 =====
    var DAY_ZH = ['日','一','二','三','四','五','六'];
    var DAY_EN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    function t(key) {
        return (window.I18N && typeof window.I18N.t === 'function')
            ? window.I18N.t(key) : null;
    }
    function isEn() {
        return window.I18N && window.I18N.getLang() === 'en';
    }

    // ===== DOM 引用 =====
    var el = {};
    function cacheDom() {
        el.clock       = document.getElementById('hwClock');
        el.date        = document.getElementById('hwDate');
        el.progressFill= document.getElementById('hwProgressFill');
        el.progressText= document.getElementById('hwProgressText');
        el.countdown   = document.getElementById('hwCountdown');
        el.waterTimer  = document.getElementById('hwWaterTimer');
        el.waterFill   = document.getElementById('hwWaterFill');
        el.waterItem   = document.getElementById('hwWaterItem');
        el.sitTimer    = document.getElementById('hwSitTimer');
        el.sitFill     = document.getElementById('hwSitFill');
        el.sitItem     = document.getElementById('hwSitItem');
        el.settingsBtn = document.getElementById('hwSettingsBtn');
        el.modalOverlay= document.getElementById('hwModalOverlay');
        el.modalSave   = document.getElementById('hwModalSave');
        el.modalCancel = document.getElementById('hwModalCancel');
        el.modalReset  = document.getElementById('hwModalReset');
        el.inWorkStart = document.getElementById('hwInWorkStart');
        el.inWorkEnd   = document.getElementById('hwInWorkEnd');
        el.inWaterMl   = document.getElementById('hwInWaterMl');
        el.inWaterGoal = document.getElementById('hwInWaterGoal');
        el.inSit       = document.getElementById('hwInSit');
        el.notifToggle = document.getElementById('hwNotifToggle');
        el.notifStatus = document.getElementById('hwNotifStatus');
//        el.storageStatus = document.getElementById('hwStorageStatus');
    }

    // ===== 持久化存储（localStorage 优先，Cookie 兜底） =====
    // 部分预览环境（WebView / 无痕模式 / 隐私窗口）下 localStorage 会随刷新
    // 或窗口关闭被清空，导致计时"重置"。因此所有写入同时落一份 Cookie，
    // 读取时 localStorage 优先、Cookie 兜底，保证刷新页面倒计时不丢失。
    function storageGet(key) {
        try {
            var v = localStorage.getItem(key);
            if (v !== null) return v;
        } catch (e) {}
        try {
            var esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            var m = document.cookie.match(new RegExp('(?:^|;\\s*)' + esc + '=([^;]*)'));
            if (m && m[1]) {
                try { return decodeURIComponent(m[1]); } catch (e2) { return m[1]; }
            }
        } catch (e) {}
        return null;
    }
    function storageSet(key, value) {
        try { localStorage.setItem(key, value); } catch (e) {}
        try {
            document.cookie = key + '=' + encodeURIComponent(value) +
                '; expires=' + new Date(Date.now() + 365 * 24 * 3600 * 1000).toUTCString() +
                '; path=/; SameSite=Lax';
        } catch (e) {}
    }
    // 探测当前环境可用的持久化方式：'local' | 'cookie' | 'none'
    function storageAvailable() {
        try {
            localStorage.setItem('__hw_test__', '1');
            var ok = localStorage.getItem('__hw_test__') === '1';
            localStorage.removeItem('__hw_test__');
            if (ok) return 'local';
        } catch (e) {}
        try {
            document.cookie = '__hw_test__=1; path=/; SameSite=Lax';
            if (/(?:^|;\s*)__hw_test__=1/.test(document.cookie)) return 'cookie';
        } catch (e) {}
        return 'none';
    }

    // ===== 设置读写 =====
    function loadSettings() {
        try {
            var raw = storageGet(STORAGE_KEY);
            if (raw) {
                var obj = JSON.parse(raw);
                return mergeDefaults(obj);
            }
        } catch (e) {}
        return mergeDefaults({});
    }
    function mergeDefaults(obj) {
        var out = {};
        for (var k in DEFAULT_SETTINGS) {
            out[k] = (obj[k] !== undefined) ? obj[k] : DEFAULT_SETTINGS[k];
        }
        return out;
    }
    function saveSettings() {
        storageSet(STORAGE_KEY, JSON.stringify(settings));
    }

    // ===== 提醒时间持久化（独立 key，避免被 mergeDefaults 过滤） =====
    function loadNextTs(type, intervalMin) {
        try {
            var ts = parseInt(storageGet(NEXT_KEYS[type]), 10);
            if (ts && !isNaN(ts)) {
                var now = Date.now();
                // 过期超过一整个周期视为"上次会话遗留"，从当前时间重新计时，
                // 避免用户隔了很久再打开页面时立即补发提醒
                if (now >= ts + intervalMin * 60000) {
                    ts = now + intervalMin * 60000;
                    saveNextTs(type, ts);
                }
                return ts;
            }
        } catch (e) {}
        return Date.now() + intervalMin * 60000;
    }
    function saveNextTs(type, ts) {
        storageSet(NEXT_KEYS[type], String(ts));
    }

    // ===== 喝水：今日累计 ml（跨天自动清零） =====
    function todayKey() {
        var d = new Date();
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }
    function loadWaterToday() {
        var obj = null;
        try {
            var raw = storageGet(WATER_KEY);
            if (raw) obj = JSON.parse(raw);
        } catch (e) {}
        var today = todayKey();
        if (obj && obj.date === today && typeof obj.ml === 'number') {
            return { date: today, ml: Math.max(0, obj.ml) };
        }
        return { date: today, ml: 0 };   // 新的一天从头算
    }
    function saveWaterToday() {
        try { storageSet(WATER_KEY, JSON.stringify(waterToday)); } catch (e) {}
    }
    // 主页点一次「喝水」：累加 settings.waterMl
    function recordWater() {
        waterToday.ml += Math.max(0, settings.waterMl || 0);
        saveWaterToday();
        updateWater();
        playBeep(880);
        var reached = waterToday.ml >= Math.max(1, settings.waterGoal || 2000);
        document.dispatchEvent(new CustomEvent('mascot-say', {
            detail: reached
                ? { zh: '今日喝水目标达成！你是个自律的嵌入式工程师 💧🎉', en: 'Daily water goal reached! A disciplined engineer 💧🎉' }
                : { zh: '喝了一杯水，Hydration +1，继续敲代码 💧', en: 'One cup down, hydration +1, back to coding 💧' }
        }));
    }
    // 刷新「今日已喝 ml / 每日目标」显示与进度条
    function updateWater() {
        if (!el.waterItem) return;
        // 跨天自动清零：即使页面一直开着过夜也生效
        var today = todayKey();
        if (waterToday.date !== today) {
            waterToday = { date: today, ml: 0 };
            saveWaterToday();
        }
        var ml = waterToday.ml;
        el.waterTimer.textContent = ml + ' ml';
        var goal = Math.max(1, settings.waterGoal || 2000);
        var pct = Math.min(100, (ml / goal) * 100);
        el.waterFill.style.width = pct.toFixed(1) + '%';
        if (ml >= goal) el.waterItem.classList.add('done');
        else el.waterItem.classList.remove('done');
    }

    // ===== 时间工具 =====
    function parseTime(str) {
        var parts = str.split(':');
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    function todayMinutes() {
        var d = new Date();
        return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;
    }
    function pad2(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    // ===== 时钟更新 =====
    function updateClock() {
        var d = new Date();
        el.clock.textContent = pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());

        var days = isEn() ? DAY_EN : DAY_ZH;
        var dayStr = isEn() ? days[d.getDay()] : '| 周'+ days[d.getDay()];
        var month = d.getMonth() + 1;
        var date = d.getDate();
        el.date.textContent = month + '/' + date + ' ' + dayStr;
    }

    // ===== 下班进度 =====
    function updateProgress() {
        var startMin = parseTime(settings.workStart);
        var endMin   = parseTime(settings.workEnd);
        var now      = todayMinutes();

        var progress, countdownText, isDone = false;

        if (now < startMin) {
            // 还没上班
            progress = 0;
            countdownText = t('index.hw.notStarted') || '还没到上班时间';
        } else if (now >= endMin) {
            // 已下班
            progress = 100;
            countdownText = t('index.hw.offWork') || '已下班！';
            isDone = true;
        } else {
            var total = endMin - startMin;
            var elapsed = now - startMin;
            progress = Math.min(100, (elapsed / total) * 100);

            var remainMin = endMin - now;
            var h = Math.floor(remainMin / 60);
            var m = Math.floor(remainMin % 60);
            var prefix = (t('index.hw.until') || '距下班还有');
            if (isEn()) {
                countdownText = h > 0
                    ? h + 'h ' + m + 'm ' + (t('index.hw.until') || 'left')
                    : m + 'm ' + (t('index.hw.until') || 'left');
            } else {
                countdownText = prefix + ' ' + (h > 0 ? h + 'h ' : '') + m + 'm';
            }
        }

        el.progressFill.style.width = progress.toFixed(1) + '%';
        el.progressText.textContent = Math.round(progress) + '%';
        el.countdown.textContent = countdownText;

        if (isDone) {
            el.progressFill.classList.add('done');
            el.countdown.classList.add('hw-countdone');
        } else {
            el.progressFill.classList.remove('done');
            el.countdown.classList.remove('hw-countdone');
        }
    }

    // ===== 提醒逻辑（喝水按 ml 累计，久坐按倒计时） =====
    function updateReminders() {
        var now = Date.now();

        // 喝水：刷新今日累计显示与进度
        updateWater();

        // 久坐
        if (!sitTriggered && now >= sitNextTs) {
            sitTriggered = true;
            triggerReminder('sit');
        }
        if (sitTriggered) {
            var sAlert = t('index.hw.sitAlert') || '该活动了！';
            el.sitTimer.textContent = sAlert;
            el.sitFill.style.width = '100%';
        } else {
            var sRemain = Math.max(0, sitNextTs - now);
            el.sitTimer.textContent = formatCountdown(sRemain);
            var sPct = 100 - (sRemain / (settings.sitInterval * 60000)) * 100;
            el.sitFill.style.width = Math.min(100, Math.max(0, sPct)) + '%';
        }
    }

    function formatCountdown(ms) {
        var totalSec = Math.floor(ms / 1000);
        var m = Math.floor(totalSec / 60);
        var s = totalSec % 60;
        return pad2(m) + ':' + pad2(s);
    }

    function triggerReminder(type) {
        // 现在是倒计时提醒，只有久坐会触发；喝水改为 ml 累计，不再触发通知
        var title = (t('index.hw.sitAlert') || '该活动了！') + ' 🪑';
        var body  = isEn() ? 'Stand up and stretch, click to dismiss' : '站起来活动一下，点击消除提醒';
        el.sitItem.classList.add('triggered');
        // 推进下次提醒时间并持久化
        sitNextTs = Date.now() + settings.sitInterval * 60000;
        saveNextTs('sit', sitNextTs);
        showNotification(title, body);
        playBeep(660);
    }

    function dismissReminder() {
        if (!sitTriggered) return;
        sitTriggered = false;
        sitNextTs = Date.now() + settings.sitInterval * 60000;
        saveNextTs('sit', sitNextTs);
        el.sitItem.classList.remove('triggered');
        document.dispatchEvent(new CustomEvent('mascot-say', {
            detail: { zh: '起来活动一下，久坐伤身，我替你记着时间 🪑', en: 'Time to stretch — sitting too long hurts. I will keep the clock 🪑' }
        }));
    }

    // ===== 通知 =====
    function showNotification(title, body) {
        if (!settings.notifications) return;
        if (!('Notification' in window)) return;
        if (Notification.permission === 'granted') {
            try {
                new Notification(title, { body: body, icon: './asset/Logo/Yu_Tools.png' });
            } catch (e) {}
        } else if (Notification.permission === 'default') {
            // 兜底：权限未定且正处于用户手势中时尝试请求（部分浏览器允许）
            requestPermission().then(function (perm) {
                if (perm === 'granted') {
                    try {
                        new Notification(title, { body: body, icon: './asset/Logo/Yu_Tools.png' });
                    } catch (e) {}
                }
                updateNotifStatus();
            });
        }
    }

    // 兼容新旧 API 的权限请求（Chrome/Edge 返回 Promise，旧版 Safari 走回调）
    function requestPermission() {
        return new Promise(function (resolve) {
            if (!('Notification' in window)) return resolve('unsupported');
            var rp = Notification.requestPermission;
            if (!rp) return resolve('unsupported');
            try {
                var result = rp.call(Notification, function (perm) { resolve(perm); });
                if (result && typeof result.then === 'function') {
                    result.then(resolve).catch(function () { resolve('error'); });
                }
            } catch (e) {
                resolve('error');
            }
        });
    }

    // 请求通知权限（必须在用户手势中调用才会弹出授权框）
    function requestNotifPermission(showTest) {
        if (!('Notification' in window)) {
            updateNotifStatus();
            return Promise.resolve('unsupported');
        }
        if (Notification.permission === 'granted') {
            updateNotifStatus();
            if (showTest) showNotification(
                t('index.hw.testTitle') || '测试通知',
                t('index.hw.testBody') || '桌面通知已开启 ✅'
            );
            return Promise.resolve('granted');
        }
        if (Notification.permission === 'denied') {
            updateNotifStatus();
            return Promise.resolve('denied');
        }
        return requestPermission().then(function (perm) {
            updateNotifStatus();
            if (perm === 'granted' && showTest) {
                showNotification(
                    t('index.hw.testTitle') || '测试通知',
                    t('index.hw.testBody') || '桌面通知已开启 ✅'
                );
            }
            return perm;
        });
    }

    // 在设置弹窗中显示通知权限状态
    function updateNotifStatus() {
        if (!el.notifStatus) return;
        var cls, txt;
        if (!('Notification' in window)) {
            cls = 'denied';
            txt = t('index.hw.notifUnsupported') || '当前浏览器不支持桌面通知';
        } else if (Notification.permission === 'granted') {
            cls = 'granted';
            txt = t('index.hw.notifGranted') || '✅ 已授权，提醒会弹出系统通知';
        } else if (Notification.permission === 'denied') {
            cls = 'denied';
            txt = t('index.hw.notifDenied') || '❌ 浏览器已阻止通知：请点击地址栏左侧的 🔒 图标 → 网站设置 → 允许通知';
        } else {
            cls = 'pending';
            txt = t('index.hw.notifPending') || '⏳ 尚未授权，点击下方开关即可弹出授权请求';
        }
        el.notifStatus.textContent = txt;
        el.notifStatus.className = 'hw-notif-status ' + cls;
    }

    // 在设置弹窗中显示计时持久化状态，帮助确认"刷新不重置"是否生效
    function updateStorageStatus() {
        if (!el.storageStatus) return;
        var st = storageAvailable();
        var cls, txt;
        if (st === 'local') {
            cls = 'granted';
            txt = t('index.hw.storageOk') || '🟢 计时数据已保存在本地，刷新页面不会重置';
        } else if (st === 'cookie') {
            cls = 'pending';
            txt = t('index.hw.storageCookie') || '🟡 当前环境 localStorage 不可用，已改用 Cookie 保存，刷新页面不会重置';
        } else {
            cls = 'denied';
            txt = t('index.hw.storageNone') || '🔴 当前环境无法持久化数据，刷新页面会重置计时';
        }
        el.storageStatus.textContent = txt;
        el.storageStatus.className = 'hw-storage-status ' + cls;
    }

    // ===== 提示音 =====
    var audioCtx = null;
    function playBeep(freq) {
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq || 800;
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        } catch (e) {}
    }

    // ===== 设置弹窗 =====
    function openSettings() {
        el.inWorkStart.value = settings.workStart;
        el.inWorkEnd.value   = settings.workEnd;
        el.inWaterMl.value   = settings.waterMl;
        el.inWaterGoal.value = settings.waterGoal;
        el.inSit.value       = settings.sitInterval;
        el.notifToggle.classList.toggle('on', settings.notifications);
        el.modalOverlay.classList.add('active');
        // 打开设置即更新权限状态，并在用户手势中请求权限（若未授权）
        updateNotifStatus();
        updateStorageStatus();
        if (settings.notifications) requestNotifPermission(false);
    }
    function closeSettings() {
        el.modalOverlay.classList.remove('active');
    }
    function applySettings() {
        settings.workStart = el.inWorkStart.value || '09:00';
        settings.workEnd   = el.inWorkEnd.value   || '18:00';
        settings.waterMl      = Math.max(1, parseInt(el.inWaterMl.value, 10) || 200);
        settings.waterGoal    = Math.max(1, parseInt(el.inWaterGoal.value, 10) || 2000);
        settings.sitInterval  = Math.max(1, parseInt(el.inSit.value,      10) || 60);
        settings.notifications = el.notifToggle.classList.contains('on');

        // 间隔变化只影响久坐：重置其倒计时（时间戳持久化）
        sitNextTs = Date.now() + settings.sitInterval * 60000;
        saveNextTs('sit', sitNextTs);
        sitTriggered = false;
        el.sitItem.classList.remove('triggered');

        if (settings.notifications) requestNotifPermission();
        saveSettings();
        closeSettings();
        updateProgress();
        updateReminders();   // 内含 updateWater，喝水目标/每次量变化即时刷新
    }

    // 手动重置：喝水今日累计清零 + 久坐重新计时，均持久化。
    function resetTimers() {
        // 喝水：今日累计清零
        waterToday.ml = 0;
        saveWaterToday();
        updateWater();
        // 久坐：从当前时间重新开始倒计时
        sitTriggered = false;
        sitNextTs = Date.now() + settings.sitInterval * 60000;
        saveNextTs('sit', sitNextTs);
        el.sitItem.classList.remove('triggered');
        updateReminders();
        playBeep(1046);
    }

    // ===== 事件绑定 =====
    function bindEvents() {
        el.settingsBtn.addEventListener('click', openSettings);
        el.modalCancel.addEventListener('click', closeSettings);
        el.modalSave.addEventListener('click', applySettings);
        el.modalReset.addEventListener('click', function() {
            resetTimers();
            closeSettings();
        });
        el.modalOverlay.addEventListener('click', function(e) {
            if (e.target === el.modalOverlay) closeSettings();
        });
        el.waterItem.addEventListener('click', recordWater);
        el.sitItem.addEventListener('click',   function() { dismissReminder(); });
        el.notifToggle.addEventListener('click', function() {
            var on = !el.notifToggle.classList.contains('on');
            el.notifToggle.classList.toggle('on');
            // 用户手势：开启通知时立即请求权限，授权成功后发一条测试通知
            if (on) requestNotifPermission(true);
            updateNotifStatus();
        });

        // i18n 切换时刷新文本
        document.addEventListener('languagechange', function() {
            updateClock();
            updateProgress();
            updateReminders();
        });
    }

    // ===== 启动 =====
    function init() {
        cacheDom();
        if (!el.clock) return;
        bindEvents();
        requestNotifPermission();
        updateClock();
        updateProgress();
        updateReminders();
        setInterval(function() {
            updateClock();
            updateProgress();
            updateReminders();
        }, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// ============================================================
//  Hero 右侧：今日待办清单
//  独立 IIFE；localStorage + Cookie 双存储，刷新页面不丢失
// ============================================================
(function () {
    var TODO_KEY = 'hero-todo-list';

    // ===== 存储（localStorage 优先，Cookie 兜底，与左侧小组件一致） =====
    function storageGet(key) {
        try {
            var v = localStorage.getItem(key);
            if (v !== null && v !== undefined) return v;
        } catch (e) {}
        try {
            var m = document.cookie.match(COOKIE_RE);
            if (m) return decodeURIComponent(m[1]);
        } catch (e) {}
        return null;
    }
    var COOKIE_RE = /(?:^|;\s*)hero-todo-list=([^;]*)/;
    function storageSet(key, val) {
        try { localStorage.setItem(key, val); } catch (e) {}
        try {
            document.cookie = key + '=' + encodeURIComponent(val) +
                '; expires=' + new Date(Date.now() + 365 * 86400000).toUTCString() + '; path=/';
        } catch (e) {}
    }
    function loadTodos() {
        try {
            var raw = storageGet(TODO_KEY);
            if (raw) {
                var arr = JSON.parse(raw);
                if (Array.isArray(arr)) return arr.filter(function (x) { return x && typeof x.text === 'string'; });
            }
        } catch (e) {}
        return [];
    }
    function saveTodos() {
        try { storageSet(TODO_KEY, JSON.stringify(todos)); } catch (e) {}
    }
    function t(key) {
        return (window.I18N && typeof window.I18N.t === 'function') ? window.I18N.t(key) : null;
    }

    var todos = loadTodos();
    var listEl = null, emptyEl = null, statsEl = null, fillEl = null, clearBtn = null, inputEl = null;

    function cacheDom() {
        listEl   = document.getElementById('todoList');
        emptyEl  = document.getElementById('todoEmpty');
        statsEl  = document.getElementById('todoStats');
        fillEl   = document.getElementById('todoProgressFill');
        clearBtn = document.getElementById('todoClearBtn');
        inputEl  = document.getElementById('todoInput');
    }

    function render() {
        if (!listEl) return;
        listEl.innerHTML = '';
        todos.forEach(function (item, i) {
            var li = document.createElement('li');
            li.className = 'todo-item' + (item.done ? ' done' : '');

            var check = document.createElement('button');
            check.type = 'button';
            check.className = 'todo-check';
            check.textContent = '\u2713';
            check.setAttribute('aria-label', item.done ? 'undo' : 'done');
            check.addEventListener('click', function () {
                todos[i].done = !todos[i].done;
                if (todos[i].done) {
                    document.dispatchEvent(new CustomEvent('mascot-say', {
                        detail: { zh: '搞定一项待办，离下班又近了一步 ✅', en: 'One todo done, one step closer to clock-out ✅' }
                    }));
                }
                saveTodos();
                render();
            });

            var span = document.createElement('span');
            span.className = 'todo-text';
            span.textContent = item.text;
            span.title = item.text;

            var del = document.createElement('button');
            del.type = 'button';
            del.className = 'todo-del';
            del.textContent = '\u2715';
            del.setAttribute('aria-label', 'delete');
            del.addEventListener('click', function () {
                todos.splice(i, 1);
                saveTodos();
                render();
            });

            li.appendChild(check);
            li.appendChild(span);
            li.appendChild(del);
            listEl.appendChild(li);
        });

        var done = 0;
        for (var k = 0; k < todos.length; k++) { if (todos[k].done) done++; }
        if (statsEl) statsEl.textContent = done + '/' + todos.length;
        if (fillEl) fillEl.style.width = (todos.length ? Math.round(done / todos.length * 100) : 0) + '%';
        if (emptyEl) emptyEl.classList.toggle('show', todos.length === 0);
        if (clearBtn) clearBtn.style.opacity = done ? '' : '0.25';
    }

    function addTodo(text) {
        text = (text || '').trim();
        if (!text) return;
        todos.push({ text: text, done: false });
        saveTodos();
        render();
    }

    function clearDone() {
        todos = todos.filter(function (x) { return !x.done; });
        saveTodos();
        render();
    }

    // ===== 输入框添加 =====
    function submitInput() {
        var text = inputEl ? inputEl.value : '';
        text = (text || '').trim();
        if (!text) return;
        addTodo(text);
        if (inputEl) inputEl.value = '';
    }

    // 与左侧时间小组件保持等高：右侧高度 = heroWidget 高度，蓝条严格对称
    function syncHeight() {
        var w = document.getElementById('heroWidget');
        var t = document.getElementById('heroTodo');
        if (w && t && w.offsetHeight > 0) {
            t.style.height = w.offsetHeight + 'px';
        }
    }

    function init() {
        if (!document.getElementById('heroTodo')) return;
        cacheDom();
        render();
        syncHeight();
        window.addEventListener('resize', syncHeight);
        if (inputEl) {
            inputEl.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    submitInput();
                }
            });
        }
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                var hasDone = todos.some(function (x) { return x.done; });
                if (hasDone) clearDone();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// ============================================================
//  导航栏：眼睛跟随鼠标 + 空闲状态机
//  鼠标移动时瞳孔跟随；3 秒无操作随机切换 高兴/睡觉/思考 表情
//  任一鼠标移动立即恢复跟随
// ============================================================
(function () {
    var eye = document.getElementById('navEye');
    if (!eye) return;
    var pupils = eye.querySelectorAll('.nav-eye-pupil');
    if (!pupils.length) return;

    var MAX_X = 5;    // 瞳孔横向最大偏移 (px)，正圆 22px - 瞳孔 10px 半径差 6px
    var MAX_Y = 5;    // 瞳孔纵向最大偏移 (px)，正圆对称

    var IDLE_MS = 12000;      // 无操作多久进入发呆
    var BLINK_MIN = 2000;    // 眨眼最小间隔 (ms)
    var BLINK_MAX = 5000;    // 眨眼最大间隔 (ms)

    var idleTimer = null;  // 进入发呆的倒计时
    var blinkTimer = null; // 随机眨眼定时器
    var isIdle = false;    // 当前是否处于发呆状态

    // 瞳孔跟随鼠标（特殊表情如星星眼时不跟随）
    function update(e) {
        if (eye.getAttribute('data-mood') === 'star') return;
        var r = eye.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        var k = Math.min(
            dx !== 0 ? MAX_X / Math.abs(dx) : 1,
            dy !== 0 ? MAX_Y / Math.abs(dy) : 1,
            1
        );
        var tx = dx * k;
        var ty = dy * k;
        for (var i = 0; i < pupils.length; i++) {
            pupils[i].style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
        }
    }

    function setMood(mood) {
        if (mood) eye.setAttribute('data-mood', mood);
        else eye.removeAttribute('data-mood');
    }

    // 眨眼：2~5 秒随机执行一次（鼠标动时也眨）；睡觉时不眨，星星眼时保持星星不眨，醒来后继续
    function scheduleBlink() {
        blinkTimer = setTimeout(doBlink, BLINK_MIN + Math.random() * (BLINK_MAX - BLINK_MIN));
    }
    function doBlink() {
        if (!isIdle && eye.getAttribute('data-mood') !== 'star') {
            eye.classList.add('blinking');
            setTimeout(function () { eye.classList.remove('blinking'); }, 320);
        }
        scheduleBlink();
    }

    function startIdle() {
        if (isIdle) return;
        if (onGithub) {              // 鼠标停在 GitHub 上时保持星星眼，不睡觉
            idleTimer = setTimeout(startIdle, IDLE_MS);
            return;
        }
        isIdle = true;
        setMood('sleep');   // 发呆时只睡觉
        document.dispatchEvent(new CustomEvent('mascot-sleep'));
    }

    // 鼠标一动：立即退出发呆、恢复跟随
    function leaveIdle() {
        if (!isIdle) return;
        isIdle = false;
        setMood('');
        document.dispatchEvent(new CustomEvent('mascot-awake'));
    }

    function onMove(e) {
        leaveIdle();
        clearTimeout(idleTimer);
        idleTimer = setTimeout(startIdle, IDLE_MS);
        update(e);
    }

    document.addEventListener('mousemove', onMove, { passive: true });

    // 悬浮 GitHub：变成期待的星星眼；移开后恢复
    var githubBtn = document.querySelector('.github-btn');
    var onGithub = false;
    if (githubBtn) {
        githubBtn.addEventListener('mouseenter', function () {
            onGithub = true;
            isIdle = false;
            clearTimeout(idleTimer);
            setMood('star');
        });
        githubBtn.addEventListener('mouseleave', function () {
            onGithub = false;
            setMood('');
            // 瞳孔回正，恢复跟随
            for (var i = 0; i < pupils.length; i++) {
                pupils[i].style.transform = '';
            }
            clearTimeout(idleTimer);
            idleTimer = setTimeout(startIdle, IDLE_MS);
        });
    }

    // 页面加载后若一直未动，也进入发呆；眨眼随机启动
    idleTimer = setTimeout(startIdle, IDLE_MS);
    scheduleBlink();
})();

// ============================================================
//  顶部广告横幅：可点击 / 可关闭（关闭状态持久化到 localStorage）
// ============================================================
(function () {
    'use strict';
    var banner = document.getElementById('adBanner');
    if (!banner) return;
    var textEl = document.getElementById('adBannerText');
    var closeBtn = document.getElementById('adBannerClose');

    function refresh() {
        if (textEl && window.I18N && typeof window.I18N.t === 'function') {
            textEl.textContent = window.I18N.t('index.ad.bannerText');
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            // 仅隐藏当前页面的广告——不写任何存储，刷新 / 重新打开页面都会再次显示
            banner.style.display = 'none';
        });
    }
    document.addEventListener('languagechange', refresh);
    refresh();
})();

// ============================================================
//  语言对话框：眼睛右侧气泡，每 30 秒随机一句嵌入式段子
//  点击气泡立即换一句；✕ 收起为 💬 胶囊；再点 💬 展开
//  "连续工作 x 小时" 读取下班进度模块设置动态生成
// ============================================================
(function () {
    'use strict';

    var chat     = document.getElementById('navChat');
    if (!chat) return;
    var textEl   = document.getElementById('navChatText');
    var closeBtn = document.getElementById('navChatClose');
    var tabBtn   = document.getElementById('navChatTab');
    var eyeEl    = document.getElementById('navEye');   // 换句时同步张嘴
    if (!textEl || !closeBtn || !tabBtn) return;

    var ROTATE_MS = 10000;   // 默认每 10 秒定时随机换一句
    var STORAGE_KEY = 'hero-widget-settings';   // 下班进度模块设置
    var lastIdx = -1;
    var timer = null;

    // 双语词条（英文直译）
    var SPEECHES = [
        { zh: '今日宜用 C，忌用汇编', en: 'Today is a good day for C; avoid assembly' },
        { zh: '我写的代码没有 bug，只有未预期的特性', en: 'My code has no bugs, only unexpected features' },
        { zh: '波特率：115200，心情：9600', en: 'Baud rate: 115200, mood: 9600' },
        { zh: '这个表情自带 32KB Flash，可擦写 10 万次', en: 'This emoji has 32KB Flash, rated for 100k erase cycles' },
        { zh: '正在读取寄存器...', en: 'Reading registers...' },
        { zh: '正在调参，勿扰', en: 'Tuning parameters, do not disturb' },
        { zh: '信号强度：一格，建议靠近路由器', en: 'Signal strength: 1 bar, move closer to the router' },
        { zh: '测试中，请不要断电', en: 'Testing in progress, do not cut the power' },
        { zh: '加载中... 预计 4 年 3 个月后完成', en: 'Loading... ETA 4 years 3 months' },
        { zh: '你的代码已通过静态分析，但没通过现实', en: 'Your code passed static analysis, but not reality' },
        { zh: '堆栈使用率 127%，建议立即优化', en: 'Stack usage 127%, optimize immediately' },
        { zh: '芯片温度 75°C，摸一下试试？', en: 'Chip temp 75°C, wanna touch it?' },
        { zh: '我是一只表情，但我梦想成为寄存器', en: 'I am an emoji, but I dream of being a register' },
        { zh: '别问我为什么发光，因为我是 LED 转世', en: 'Do not ask why I glow, I am an LED reborn' },
        { zh: '我的电阻值是 1kΩ，但我只想躺平', en: 'My resistance is 1kΩ, but I just want to lie flat' },
        { zh: '我的工作就是被点击，然后说点废话', en: 'My job is to be clicked and say nonsense' },
        { zh: '戳我干嘛，我只会卖萌，不会写代码', en: 'Why poking me? I only act cute, not write code' },
        { zh: '你按我一下，我就亮一下，像 LED 一样', en: 'Press me and I light up, just like an LED' },
        { zh: '我虽然小，但我也是有 Flash 的！虽然只有 1KB...', en: 'I am small but I have Flash! Only 1KB though...' },
        { zh: '别一直点我，我会害羞的 (〃ω〃)', en: 'Stop poking me, I will get shy (〃ω〃)' },
        { zh: '我这么可爱，你舍得让我帮你调串口吗？', en: 'I am so cute, how can you make me debug your UART?' },
        { zh: '我可能在 MCU 里跑着，也可能在等你摸鱼', en: 'I might be running in an MCU, or waiting for you to slack off' },
        { zh: '我怕静电，你摸我之前要接地哦', en: 'I fear static, ground yourself before touching me' },
        { zh: '我是 5V 宽容的，但你点我的时候轻一点', en: 'I am 5V tolerant, but tap me gently' },
        { zh: '我虽然叫表情，但我更像个电阻，默默发热', en: 'They call me emoji, but I am more like a resistor, quietly heating up' },
        { zh: '等我长大了，我要当一颗主控芯片，带你飞', en: 'When I grow up, I will be an MCU and take you flying' },
        { zh: '我不想只当表情，我想当你的调试助手', en: 'I do not want to be just an emoji, I want to be your debug assistant' },
        { zh: '我的梦想是，有一天能出现在你的电路板上', en: 'My dream is to one day sit on your PCB' },
        { zh: '希望有一天，你打开 Keil 时还能想起我', en: 'I hope one day, when you open Keil, you still remember me' },
        { zh: '你摸鱼的时候，我就在这里陪你', en: 'When you are slacking off, I am right here with you' },
        { zh: '如果你累了，看看我，我会发光给你看', en: 'If you are tired, look at me, I will glow for you' },
        { zh: '我知道你是嵌入式大佬，但我可以当你的小跟班', en: 'I know you are an embedded master, but I can be your sidekick' },
        
        { zh: '我虽然不能 debug，但我会发光 ✨', en: 'I cannot debug, but I can glow ✨' },
        { zh: 'SPI 和 I2C 吵架了，我在劝架 😅', en: 'SPI and I2C are fighting, I am mediating 😅' },
        { zh: '你的代码像示波器波形，有时有，有时没有', en: 'Your code is like oscilloscope waveform – sometimes there, sometimes not' },
        { zh: '别看我小，我缓存了你的所有操作', en: 'Do not underestimate me, I have cached all your actions' },
        { zh: '看门狗饿了，快去喂它 🐶', en: 'Watchdog is hungry, go feed it 🐶' },
        { zh: '堆栈溢出不要怕，我帮你清空（假的）', en: 'Do not fear stack overflow, I will clear it (just kidding)' },
        { zh: '你的代码编译通过了？祝贺你，但现实还没通过', en: 'Your code compiled? Congrats, but reality has not approved it yet' },
        { zh: '我是一个浮点数，永远不精确但足够', en: 'I am a float, never precise but good enough' },
        { zh: '我的主频是 50MHz，但我跑得比你的代码快', en: 'My clock is 50MHz, but I run faster than your code' },
        { zh: '我是嵌入式工程师的第三只手 🤚', en: 'I am the embedded engineer\'s third hand 🤚' },
        { zh: '我怀疑你有内存泄漏，但我没有证据', en: 'I suspect a memory leak, but I have no evidence' },
        { zh: '别按我，我正在处理中断 ⚡', en: 'Do not click me, I am handling an interrupt ⚡' },
        { zh: '我是一段汇编，但我向往高级语言', en: 'I am a piece of assembly, but I long for high-level languages' },
        { zh: '我支持热插拔，但你拔我时轻一点', en: 'I support hot-plug, but be gentle when unplugging me' },
        { zh: '我有一颗晶振，但我不准时', en: 'I have a crystal oscillator, but I am not punctual' },
        { zh: '我的位宽是 32，但我只输出爱 ❤️', en: 'My bit width is 32, but I only output love ❤️' },
        { zh: '我记录了你点击的次数，准备写入 EEPROM', en: 'I am counting your clicks, about to write to EEPROM' },
        { zh: '当你凝视代码时，我在凝视你 👀', en: 'While you stare at code, I am staring at you 👀' },
        { zh: '我是一颗晶振，我的频率是你的心跳 💓', en: 'I am a crystal, my frequency is your heartbeat 💓' },
        { zh: '我支持 DMA，但我只想安静地躺着', en: 'I support DMA, but I just want to lie down quietly' },
        { zh: '你的代码有警告，但我的爱没有 warning', en: 'Your code has warnings, but my love has no warnings' },
        { zh: '我是一段函数，永远不会返回 null', en: 'I am a function that never returns null' },
        { zh: '我生在寄存器，长在堆栈，梦在 Flash', en: 'I was born in a register, grew up in the stack, dream in Flash' },
        { zh: '调试器说它找不到我，我在等你来找', en: 'The debugger says it cannot find me, I am waiting for you to find me' },
        { zh: '我的电平是 3.3V，但我的心情是 0V 到 3.3V 随机', en: 'My voltage is 3.3V, but my mood is random 0V to 3.3V' },

        { zh: '我住在 Flash 里，但心在 RAM 上', en: 'I live in Flash, but my heart is in RAM' },
        { zh: '你的代码就像未经滤波的信号，充满谐波', en: 'Your code is like an unfiltered signal, full of harmonics' },
        { zh: '我是 ADC 通道 0，只读取幸福电压', en: 'I am ADC channel 0, reading only happiness voltage' },
        { zh: '别敲键盘了，敲敲我吧 💔', en: 'Stop typing on the keyboard, tap on me instead 💔' },
        { zh: '我是一颗运算放大器，正在放大你的情绪', en: 'I am an op-amp, amplifying your emotions' },
        { zh: 'PWM 占空比：100%，我对你的热情永不衰减', en: 'PWM duty cycle: 100%, my enthusiasm for you never fades' },
        { zh: '我正在等待你的 trigger 信号', en: 'I am waiting for your trigger signal' },
        { zh: '你的代码如此优秀，我甚至想给你一个 IRQ 高优先级', en: 'Your code is so good, I want to give you a high-priority IRQ' },
        { zh: '我是 SPI 从机，永远听从你的指令', en: 'I am an SPI slave, always following your commands' },
        { zh: '我的相位噪声很低，但我的笑声很大', en: 'My phase noise is low, but my laughter is loud' },
        { zh: '我支持多线程，但只想和你单线程聊天', en: 'I support multithreading, but I only want to chat with you in a single thread' },
        { zh: '我是你的看门狗，永远忠诚，绝不咬人', en: 'I am your watchdog, forever loyal, never biting' },
        { zh: '我有 16 个 GPIO，但只为你点亮一盏灯', en: 'I have 16 GPIOs, but I only light up one for you' },
        { zh: '我的心跳是 32768Hz，和你一样稳定', en: 'My heartbeat is 32768Hz, as stable as yours' },
        { zh: '我是一颗逻辑门，只会对你输出高电平', en: 'I am a logic gate, only outputting high level for you' },
        { zh: '你在调试代码，我在调试你的微笑', en: 'You are debugging code, I am debugging your smile' },
        { zh: '我支持 Modbus，更支持你摸鱼', en: 'I support Modbus, and I support you slacking off even more' },
        { zh: '我的采样率是 1ksps，但对你每秒都是高采样', en: 'My sample rate is 1ksps, but for you it is always high-rate' },
        { zh: '我跑在 RTOS 上，但常常想跑向你', en: 'I run on RTOS, but I often want to run to you' },
        { zh: '我支持 CAN 总线，但更想和你连接成局域网', en: 'I support CAN bus, but I prefer to connect with you as a LAN' },
        { zh: '我的工作电压是 3.3V，但我的爱不需要稳压', en: 'My operating voltage is 3.3V, but my love needs no regulation' },

        { zh: '我的功耗是 μA 级别，但我的思念是 A 级别', en: 'My power consumption is at µA level, but my missing you is at A level' },
        { zh: '初始化已完成，随时准备为你服务', en: 'Initialization complete, ready to serve you anytime' },

        { zh: '今天的代码格外听话，是因为你在看吗？', en: 'The code is behaving today, is it because you are watching?' },
        { zh: '示波器上看到了一条完美的波形，就像你的心情', en: 'A perfect waveform on the oscilloscope, just like your mood' },
        { zh: '调试器说它找到了一个断点，但没找到你的 bug', en: 'Debugger found a breakpoint, but not your bug' },
        { zh: '这个函数返回了 0，但它心里并不平静', en: 'This function returned 0, but it is not calm inside' },
        { zh: '堆栈指针在跳舞，你在写递归吗？', en: 'Stack pointer is dancing, are you writing recursion?' },
        { zh: '看门狗打了个哈欠，看来你喂得很及时', en: 'Watchdog yawned, looks like you fed it on time' },
        { zh: '终端里的日志像诗，可惜只有你能读懂', en: 'Logs in the terminal are like poetry, but only you can read them' },
        { zh: '时钟频率跑满了，但你的思绪还没跟上', en: 'Clock frequency is maxed out, but your mind has not caught up yet' },
        { zh: '这段代码跑得很顺畅，像滑过冰面', en: 'This code runs smoothly, like gliding on ice' },
        { zh: '没有报错，没有警告，今天是个好日子', en: 'No errors, no warnings, today is a good day' },
        { zh: '打开 Keil 的那一刻，世界都安静了', en: 'The moment Keil opens, the world goes quiet' },
        { zh: 'QSPI Flash 里的数据，像你的记忆一样珍贵', en: 'Data in QSPI Flash is as precious as your memory' },
        { zh: '这个 bit 位被置 1 了，是你故意设的吗？', en: 'This bit is set to 1, did you set it on purpose?' },
        { zh: '硬件复位后，一切重新开始，就像每天清晨', en: 'After hardware reset, everything restarts, like every morning' },
        { zh: 'CAN 总线上的消息川流不息，像城市里的车流', en: 'Messages on CAN bus flow like traffic in a city' },
        { zh: '你的代码风格简洁优雅，让人忍不住多看几眼', en: 'Your coding style is clean and elegant, hard to look away' },
        { zh: '优化等级调到最高，性能飞起，但调试变难了', en: 'Optimization level maxed, performance soars, but debugging gets harder' },
        { zh: '这个变量名取得真好，一看就知道意思', en: 'This variable name is well chosen, clear at a glance' },
        { zh: '中断服务程序跑得飞快，像闪电一样', en: 'ISR runs lightning fast, like a bolt of lightning' },
        { zh: 'DMA 在后台默默搬运数据，像勤劳的小蜜蜂', en: 'DMA moves data in the background, like a busy bee' },
        { zh: '这个设计模式用得恰到好处，值得点赞', en: 'This design pattern is used perfectly, deserves a thumbs up' },
        { zh: 'SPI 的 SCK 时钟像心跳一样稳定', en: 'SPI SCK clock is as steady as a heartbeat' },
        { zh: 'I2C 的 SDA 信号线上，信息在悄悄流动', en: 'On the I2C SDA line, information flows quietly' },
        { zh: '你的注释写得比小说还精彩', en: 'Your comments are more interesting than a novel' },
        { zh: '这个硬件抽象层设计得很巧妙', en: 'This HAL is designed quite ingeniously' },
        { zh: '时序图上的每个边沿都充满了故事', en: 'Every edge on the timing diagram tells a story' },
        { zh: '今天的 Bug 特别少，是不是因为昨晚睡得好？', en: 'Fewer bugs today, did you sleep well last night?' },
        { zh: 'Memory map 里，每个地址都有它的使命', en: 'In the memory map, every address has its purpose' },
        { zh: 'CRC 校验通过了，数据包完整无损', en: 'CRC check passed, data packet is intact' },
        { zh: 'IDE 的智能提示越来越懂你了', en: 'The IDE\'s autocomplete knows you better and better' },
        { zh: '这个外设的寄存器配置得刚刚好', en: 'This peripheral\'s registers are configured just right' },
        { zh: 'FreeRTOS 的任务调度有条不紊', en: 'FreeRTOS task scheduling is well-organized' },
        { zh: 'MCU 在睡眠模式下依然保持警觉', en: 'The MCU stays alert even in sleep mode' },
        { zh: '硬件加速器加持下，处理速度快如闪电', en: 'With hardware acceleration, processing is lightning fast' },
        { zh: '你的代码可读性如此之高，让人赏心悦目', en: 'Your code is so readable, it is a pleasure to look at' },
        { zh: '这个回调函数处理得游刃有余', en: 'This callback function handles everything with ease' }



    ];

    // ===== 连续点击眼睛触发的特殊对话（10 阶彩蛋）=====
    var EYE_MESSAGES = [
        { zh: '你好，我是这个工具箱的吉祥物，代号 0xE5', en: 'Hi, I\'m this toolbox\'s mascot, codename 0xE5' },
        { zh: '你又点我？代码写完了吗？', en: 'Poking me again? Finished your code yet?' },
        { zh: '再点我就要申请中断了', en: 'Poke me again and I will request an interrupt' },
        { zh: 'IRQ 请求已发送，等待 CPU 响应...', en: 'IRQ request sent, waiting for CPU response...' },
        { zh: 'CPU 说它很忙，让我自己处理', en: 'The CPU says it is busy, handle it myself' },
        { zh: '好吧，我决定触发一次看门狗复位', en: 'Alright, I will trigger a watchdog reset' },
        { zh: '🐶 看门狗被我喂饱了，暂时不咬你', en: '🐶 Watchdog fed, it will not bite you for now' },
        { zh: '你已经点了我 8 次，我记住你了', en: 'You have poked me 8 times, I will remember you' },
        { zh: '再点一次，我将把你的代码风格设为「混沌」模式', en: 'One more poke and I will set your code style to "chaos" mode' },
        { zh: '🎉 恭喜你获得「表情狂魔」成就！现在请去写代码', en: '🎉 Congrats, you earned the "Emoji Addict" achievement! Now go write code' }
    ];
    var EYE_PAUSE_MS = 10000;   // 特殊对话期间暂停自动轮换 10 秒
    var EYE_STEPS     = EYE_MESSAGES.length;   // 10 阶
    var eggHit   = 0;     // 当前特殊对话已点击数
    var eggTimer = null;  // 特殊对话 1 分钟窗口定时器

    function isEn() {
        return window.I18N && typeof window.I18N.getLang === 'function' &&
               window.I18N.getLang() === 'en';
    }

    // "已经连续工作了 x 小时，建议加薪" —— 读取下班进度模块的 workStart 动态计算
    function workHoursLine() {
        var lang = isEn();
        try {
            var cfg = null;
            try { cfg = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) {}
            var start = (cfg && cfg.workStart) ? cfg.workStart : '09:00';
            var parts = start.split(':');
            var startMin = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
            var d = new Date();
            var nowMin = d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;
            var elapsed = Math.floor(nowMin - startMin);
            if (elapsed < 60) return null;   // 上班不足 1 小时，换一句
            var hours = Math.floor(elapsed / 60);
            return lang
                ? 'Been working ' + hours + 'h straight, suggest a raise'
                : '已经连续工作了 ' + hours + ' 小时，建议加薪';
        } catch (e) {
            return lang
                ? 'Been working for hours, suggest a raise'
                : '已经连续工作了 N 小时，建议加薪';
        }
    }

    // 随机选一句（动态句上班满 1 小时才进候选，且不与上一句重复）
    function pickSpeech() {
        var lang = isEn();
        var lines = [];
        for (var i = 0; i < SPEECHES.length; i++) {
            lines.push(lang ? SPEECHES[i].en : SPEECHES[i].zh);
        }
        var dynamic = workHoursLine();
        if (dynamic) lines.push(dynamic);
        var idx;
        do {
            idx = Math.floor(Math.random() * lines.length);
        } while (lines.length > 1 && idx === lastIdx);
        lastIdx = idx;
        return lines[idx];
    }

    // 换句时眼睛同步张嘴"说话"（睡觉时不张嘴；与眨眼互不联动）
    var talkTimer = null;
    function talk() {
        if (!eyeEl) return;
        if (eyeEl.getAttribute('data-mood') === 'sleep') return;   // 睡觉除外
        eyeEl.classList.remove('talking');
        void eyeEl.offsetWidth;   // 强制重排以重放动画
        eyeEl.classList.add('talking');
        if (talkTimer) clearTimeout(talkTimer);
        talkTimer = setTimeout(function () { eyeEl.classList.remove('talking'); }, 700);
    }

    // 通用展示一条文本（气泡 + 换句动画 + 嘴巴同步张开）
    function displayText(msg) {
        textEl.textContent = msg;   // 文本直接完整显示在气泡内
        // 重放换句动画
        textEl.classList.remove('swap');
        void textEl.offsetWidth;
        textEl.classList.add('swap');
        talk();   // 嘴巴同步张开
    }

    function show() {
        displayText(pickSpeech());
    }

    function startRotate() {
        if (timer) return;
        timer = setInterval(show, ROTATE_MS);
    }
    function haltRotate() {
        if (timer) { clearInterval(timer); timer = null; }
    }
    function collapse() {
        chat.classList.add('collapsed');
        haltRotate();
    }
    function expand() {
        chat.classList.remove('collapsed');
        show();
        startRotate();
    }

    // ===== 连续点击眼睛的特殊对话彩蛋 =====
    // 点击眼睛进入特殊对话，1 分钟内暂停自动轮换；任一次点击都会刷新窗口。
    // 第 10 次点击后完成彩蛋并切换一次主题（白天↔黑夜），随后结束特殊时段。
    function finishEgg() {
        eggHit = 0;
        if (eggTimer) { clearTimeout(eggTimer); eggTimer = null; }
    }
    function toggleThemeOnce() {
        var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        if (typeof setTheme === 'function') {
            setTheme(cur === 'dark' ? 'light' : 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
            localStorage.setItem('toolbox-theme', cur === 'dark' ? 'light' : 'dark');
        }
    }
    function handleEyeClick() {
        // 若气泡收起则先展开
        if (chat.classList.contains('collapsed')) chat.classList.remove('collapsed');
        // 特殊对话期间暂停自动轮换
        haltRotate();
        // 刷新「1 分钟」窗口定时器
        if (eggTimer) clearTimeout(eggTimer);
        eggTimer = setTimeout(function () {
            finishEgg();
            startRotate();
        }, EYE_PAUSE_MS);
        // 累加点击次数（1~10 循环推进）
        eggHit = (eggHit % EYE_STEPS) + 1;
        var idx = eggHit - 1;
        displayText(isEn() ? EYE_MESSAGES[idx].en : EYE_MESSAGES[idx].zh);
        // 第 10 次：完成彩蛋并切换一次主题
        if (eggHit === EYE_STEPS) {
            finishEgg();
            toggleThemeOnce();
            startRotate();
        }
    }

    // 点击气泡/文本：立即换一句；点击 ✕ 收起
    chat.addEventListener('click', function (e) {
        if (e.target === closeBtn) return;   // 交给 ✕ 处理
        show();
    });
    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        collapse();
    });
    tabBtn.addEventListener('click', function () {
        expand();
    });
    // 键盘可达性：回车/空格 = 点击
    chat.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (chat.classList.contains('collapsed')) expand();
            else show();
        }
    });

    // ===== 悬浮卡片 / 加群按钮的特殊对话 =====
    // 鼠标悬浮到卡片或按钮上即显示对应一句；移出后 30 秒恢复正常自动轮换。
    var HOVER_LEAVE_MS = 10000;   // 移出后多久恢复轮换
    var HOVER_MSGS = {
        'join-group': { zh: '群里定期掉落串口调试秘籍，错过等一年 😏', en: 'Serial-debug cheat sheets drop in the group regularly — miss it, wait a year 😏' },
        'github-btn': { zh: '如果你觉得这个工具有用，就给它一颗星吧，像点亮寄存器一样 🌟', en: 'If this tool helps you, give it a star — like lighting up a register 🌟' },
        'yu-tool-gitee': { zh: '串口、Modbus、MQTT、TCP… 我兄弟全包了', en: 'Serial, Modbus, MQTT, TCP… my brothers cover them all' },
        'serial-port': { zh: '波特率调不对？别急，我也是这样过来的 😅', en: 'Baud rate won\'t match? Easy, I\'ve been there too 😅' },
        'Modbus-check': { zh: '主站从站，傻傻分不清？我懂你 🥲', en: 'Master and slave, can\'t tell them apart? I feel you 🥲' },
        'MqttTool': { zh: '订阅发布，像极了你在群里潜水', en: 'Subscribe and publish, just like you lurking in the group' },
        'HttpTool': { zh: '请求/响应，像极了爱情 — 有来有回才行', en: 'Request / response, just like love — takes two to tango' },
        'WebsocketTool': { zh: 'ws/wss 握个手，咱就是好朋友 🤝', en: 'WS/WSS, shake hands and we\'re friends 🤝' },
        'CanBusTool': { zh: 'J1939、DBC…这些缩写比我命还长', en: 'J1939, DBC… these abbreviations outlive me' },
        'ImageToData-tool': { zh: '取模取到手抽筋，一键生成帮你续命', en: 'Extract data till your hand cramps — one click saves the day' },
        'power-calc': { zh: '省电模式已开启，但你的代码还没写完', en: 'Power-save mode on, but your code\'s not done yet' },
        'CRC-check': { zh: 'CRC 算不对？一定是数据包在搞鬼 👻', en: 'CRC wrong? The data packet is definitely behind it 👻' },
        'RadixConverter': { zh: '0b、0x、0o… 我全都认识，但脑子转不过来', en: '0b, 0x, 0o… I know them all, but my head spins' },
        'ADCConverter': { zh: 'ADC 读数千千万，电压换算靠直觉', en: 'Thousands of ADC readings, voltage conversion by instinct' },
        'SignalPlotter': { zh: '波形画得再好看，不如实测跑一遍', en: 'Pretty wave forms win nothing — a real run beats all' },
        'PIDController': { zh: 'P 大 I 小 D 适中，调参如调酒 🍸', en: 'P big, I small, D just right — tuning is like making a cocktail 🍸' },
        'TextDiffMerge': { zh: 'diff 像找茬游戏，你永远是输家', en: 'Diff is like spot-the-difference, and you always lose' },
        'UnixTimestamp': { zh: '时间戳转成日期，恍如隔世', en: 'Timestamp to date, feels like a lifetime ago' },
        'TimingLab': { zh: '高精度计时，测脉宽测到心跳同步 💓', en: 'Precision timing, measuring pulses till your heartbeat syncs 💓' },
        'NtcCounter': { zh: 'NTC 阻值随温度变，你的代码可别跟着变 🧊', en: 'NTC resistance drifts with temp — don\'t let your code drift too 🧊' },
        'ResDivider': { zh: 'Vout=Vin×R2/(R1+R2)—公式我会背，但还是让计算器来吧', en: 'Vout=Vin×R2/(R1+R2) I can recite it, but let the calculator pick R1/R2 for me' },
        'PcbTrace': { zh: '线太细会烧板，太宽费板材 — 让我帮你拿捏 📐', en: 'Too thin burns the board, too wide wastes copper — let me size it 📐' },
        'ViaCalc': { zh: '大电流过板别只打一个孔，并联过孔才是正解 🕳️', en: 'High current through the board? Parallel vias, not one lonely hole 🕳️' },
        'BLE_Debugger': { zh: 'UUID 抄错一位，调试两小时 — 蓝牙让你深刻体会“位”的重要性 🔍', en: 'One wrong UUID digit, two hours of debugging — BLE really teaches you the value of bits 🔍' },
        'MermaidDraw': { zh: 'Mermaid 在手，图表不愁 📊', en: 'with Mermaid, diagrams are a breeze 📊' },
        'MarkdownEditor': { zh: '写文档也能很爽，VSCode 配色实时预览 ✍️', en: 'Docs made easy — VSCode colors with live preview ✍️' },

        // 分类标签 / 语言 / 主题按钮悬浮
        'cat-all':      { zh: '全部工具都在这，挑一个顺眼的用吧 ✨', en: 'All tools in one place — pick your favorite ✨' },
        'cat-fav':      { zh: '收藏夹里有你的心头好，常备不懈 ⭐', en: 'Your favorites live here, always ready ⭐' },
        'cat-debug':    { zh: '调试三件套：逻辑分析仪、示波器、还有我 😎', en: 'Debug trio: logic analyzer, scope, and me 😎' },
        'cat-hardware': { zh: '硬件区的快乐：焊台、万用表、飞线一根 🔧', en: 'Hardware joy: soldering iron, multimeter, a flying wire 🔧' },
        'cat-software': { zh: '软件区的代码，编译一次少一个 bug（大概）💻', en: 'Software code — one compile, one fewer bug (probably) 💻' },
        'cat-doc':      { zh: '文档工具：对比、画图、写文档，一条龙 📚', en: 'Doc tools: diff, diagram, markdown — one-stop 📚' },
        'cat-other':    { zh: '杂项工具，总有一款你用得上 🧰', en: 'Misc tools, one of them is bound to fit 🧰' },
        'lang-toggle':  { zh: '想换语言？中文 / English 随你切，我都能唠 🌐', en: 'Switch language? Chinese / English, I chat in both 🌐' },
'theme-toggle': { zh: '白天亮眼，夜晚护眼，主题随你切换 🌙', en: 'Bright by day, easy on the eyes by night — switch freely 🌙' },
        'ad-banner':    { zh: '这个广告位悬浮着等你赞助，悄悄点一下也行 ✨', en: "This ad floats here waiting for a sponsor — a click helps too ✨" }
    };
    var hoverTimer = null;
    function hoverIn(key, customMsg) {
        var msg = customMsg || HOVER_MSGS[key];
        if (!msg) return;
        if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
        haltRotate();
        displayText(typeof msg === 'string' ? msg : (isEn() ? (msg.en || msg.zh) : (msg.zh || msg.en)));
    }
    function scheduleNormalResume() {
        if (hoverTimer) clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function () {
            hoverTimer = null;
            show();
            startRotate();
        }, HOVER_LEAVE_MS);
    }

    // 卡片委托监听（卡片在渲染时会被重建，故挂在容器上）
    var toolsGridEl = document.getElementById('toolsGrid');
    var lastCardId = null;
    if (toolsGridEl) {
        toolsGridEl.addEventListener('mouseover', function (e) {
            var t = e.target;
            var card = t && t.closest ? t.closest('.tool-card') : null;
            var id = card && card.dataset ? card.dataset.id : null;
            if (id && id !== lastCardId && HOVER_MSGS[id]) {
                lastCardId = id;
                hoverIn(id);
            }
        });
        toolsGridEl.addEventListener('mouseleave', function () {
            lastCardId = null;
            scheduleNormalResume();
        });
    }
    // 加群按钮
    var joinBtn = document.querySelector('.btn-join-group');
    if (joinBtn) {
        joinBtn.addEventListener('mouseenter', function () { hoverIn('join-group'); });
        joinBtn.addEventListener('mouseleave', function () { scheduleNormalResume(); });
    }
    // GitHub 按钮
    var githubBtnHover = document.querySelector('.github-btn');
    if (githubBtnHover) {
        githubBtnHover.addEventListener('mouseenter', function () { hoverIn('github-btn'); });
        githubBtnHover.addEventListener('mouseleave', function () { scheduleNormalResume(); });
    }

    // 分类标签悬浮 → 对应分类的吉祥物吐槽
    var catBtns = document.querySelectorAll('.category-btn');
    for (var ci = 0; ci < catBtns.length; ci++) {
        (function (btn) {
            btn.addEventListener('mouseenter', function () {
                var cat = btn.getAttribute('data-category') || '';
                if (cat === 'all' && typeof toolsData !== 'undefined') {
                    var count = toolsData.length;
                    hoverIn('cat-all', isEn()
                        ? 'All ' + count + ' tools are right here — pick your favorite ✨'
                        : '当前共有 ' + count + ' 个工具，挑一个顺眼的用吧 ✨');
                } else {
                    hoverIn('cat-' + cat);
                }
            });
            btn.addEventListener('mouseleave', scheduleNormalResume);
        })(catBtns[ci]);
    }
    // 语言 / 主题按钮悬浮
    var langToggleHover = document.getElementById('langToggle');
    if (langToggleHover) {
        langToggleHover.addEventListener('mouseenter', function () { hoverIn('lang-toggle'); });
        langToggleHover.addEventListener('mouseleave', scheduleNormalResume);
    }
    var themeToggleHover = document.getElementById('themeToggle');
    if (themeToggleHover) {
        themeToggleHover.addEventListener('mouseenter', function () { hoverIn('theme-toggle'); });
        themeToggleHover.addEventListener('mouseleave', scheduleNormalResume);
    }
    // 广告位悬浮 → 吉祥物吐槽
    var adBannerHover = document.getElementById('adBanner');
    if (adBannerHover) {
        adBannerHover.addEventListener('mouseenter', function () { hoverIn('ad-banner'); });
        adBannerHover.addEventListener('mouseleave', scheduleNormalResume);
    }

    // 外部交互（喝水 / 久坐 / 完成待办等）通过事件让吉祥物说话
    document.addEventListener('mascot-say', function (e) {
        var d = e.detail;
        if (!d) return;
        if (sleepActive) { sleepActive = false; if (wakeTimer) { clearTimeout(wakeTimer); wakeTimer = null; } }
        haltRotate();
        displayText(isEn() ? (d.en || d.zh) : (d.zh || d.en));
        scheduleNormalResume();
    });

    // ===== 睡觉 / 唤醒的对话联动 =====
    // 鼠标静止进入睡觉时，随机显示一条「睡觉」文案并暂停轮换；
    // 鼠标一动唤醒时，随机显示一条「唤醒」文案，10 秒后恢复正常的自动轮番。
    var WAKE_MS = 10000;   // 唤醒文案显示时长
    var SLEEP_MSGS = [
        { zh: '🛌 检测到鼠标静止，系统进入低功耗模式... Zzz...', en: '🛌 No mouse detected, entering low-power mode... Zzz...' },
        { zh: '💤 看门狗已休眠，等待唤醒信号...', en: '💤 Watchdog asleep, waiting for a wake-up signal...' },
        { zh: '🌙 我睡着了，除非你动一下鼠标，否则我不会醒来', en: '🌙 I fell asleep; I won\'t wake up until you move the mouse' },
        { zh: '⏳ 闲置超时，即将关闭外设... 开玩笑的，但请你动一动', en: '⏳ Idle timeout, shutting down peripherals... just kidding, but do move around' },
        { zh: '🔋 省电模式已开启，动一下鼠标即可唤醒', en: '🔋 Power-save mode on, move the mouse to wake me' }
    ];
    var WAKE_MSGS = [
        { zh: '👋 你终于回来了！我以为你忘了这个工具箱', en: '👋 You are back! I thought you forgot this toolbox' },
        { zh: '⚡ 唤醒成功！寄存器已恢复，继续干活吧', en: '⚡ Wake successful! Registers restored, keep working' },
        { zh: '🐶 看门狗被喂了一口，系统继续运行', en: '🐶 Watchdog fed, system keeps running' },
        { zh: '🔄 从深度睡眠中恢复，所有上下文已保存', en: '🔄 Restored from deep sleep, all contexts saved' },
        { zh: '🎉 休眠模式退出，你的代码还没有写完，加油！', en: '🎉 Sleep mode is over — your code is not done yet. Keep going!' }
    ];
    var sleepActive = false;
    var wakeTimer = null;

    function enterSleep() {
        if (sleepActive) return;
        sleepActive = true;
        if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
        if (wakeTimer) { clearTimeout(wakeTimer); wakeTimer = null; }
        haltRotate();
        var s = SLEEP_MSGS[Math.floor(Math.random() * SLEEP_MSGS.length)];
        displayText(isEn() ? s.en : s.zh);
    }
    function enterWake() {
        if (!sleepActive) return;
        sleepActive = false;
        var w = WAKE_MSGS[Math.floor(Math.random() * WAKE_MSGS.length)];
        displayText(isEn() ? w.en : w.zh);
        if (wakeTimer) clearTimeout(wakeTimer);
        wakeTimer = setTimeout(function () {
            wakeTimer = null;
            show();
            startRotate();
        }, WAKE_MS);
    }
    document.addEventListener('mascot-sleep', enterSleep);
    document.addEventListener('mascot-awake', enterWake);

    // 连续点击眼睛 → 进入特殊对话彩蛋
    var egg = eyeEl || null;
    if (egg) {
        egg.addEventListener('click', function (e) {
            e.stopPropagation();
            handleEyeClick();
        });
    }

    // 首句立即显示，随后每 30 秒随机更换
    show();
    startRotate();
})();
