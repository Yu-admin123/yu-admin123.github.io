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
    'index.cat.web':        { zh: '导航', en: 'Navigation' },
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
    'index.hero.search.title':  { zh: '搜一下', en: 'Search the Web' },
    'index.hero.search.tipSuffix': { zh: '· 随手搜点资料', en: '· search anything' },
    'index.hero.search.go':     { zh: '搜索', en: 'Search' },
    'index.search.web.placeholder': { zh: '搜索互联网...', en: 'Search the web...' },
    'index.footer.line1':   { zh: '嵌入式开发者工具箱', en: 'Embedded Developer Toolbox' },
    'index.footer.line2':   { zh: '一站式解决开发中的高频需求 · 欢迎加入技术交流群：', en: 'One-stop solution for high-frequency needs · Join our tech group: ' },
    'index.empty.text':     { zh: '没有找到匹配的工具，试试其他关键词或分类？', en: 'No matching tools found. Try other keywords or categories?' },
    'index.engine.title':   { zh: '页面设置', en: 'Page Settings' },
    'index.engine.tip':     { zh: '调整搜索引擎与页面外观，所有改动会保存在本地。', en: 'Adjust the search engine and page appearance; changes are saved locally.' },
    'index.engine.label':   { zh: '搜索引擎', en: 'Search Engine' },
    'index.engine.reset':   { zh: '恢复默认', en: 'Reset' },
    'index.engine.save':    { zh: '保存', en: 'Save' },
    'index.engine.custom':      { zh: '自定义搜索引擎', en: 'Custom Search Engines' },
    'index.engine.customName':  { zh: '名称', en: 'Name' },
    'index.engine.customUrl':   { zh: '搜索地址（末尾接查询词，如 https://example.com/search?q=，或含 %s 占位符）', en: 'Search URL (query appended, e.g. https://example.com/search?q=, or use %s placeholder)' },
    'index.engine.customAdd':   { zh: '添加', en: 'Add' },
    'index.engine.customEmpty': { zh: '暂无自定义搜索引擎', en: 'No custom search engines yet' },
    'index.engine.customDelete':{ zh: '删除该搜索引擎', en: 'Delete this search engine' },
    'index.engine.customAdded': { zh: '已添加自定义搜索引擎', en: 'Custom search engine added' },
    'index.engine.customDeleted': { zh: '已删除自定义搜索引擎', en: 'Custom search engine deleted' },
    'index.engine.customInvalid': { zh: '名称和地址不能为空，且地址须以 http:// 或 https:// 开头', en: 'Name and URL are required; URL must start with http:// or https://' },
    'index.engine.customDup':   { zh: '已存在同名或同地址的搜索引擎', en: 'A search engine with that name or URL already exists' },
    'index.fab.top':        { zh: '返回顶部', en: 'Back to top' },
    'index.fab.settings':   { zh: '页面设置', en: 'Page settings' },
    'index.appear.title':   { zh: '外观', en: 'Appearance' },
    'index.appear.bg':      { zh: '页面背景（图片 / 视频，最多 9 个，点击切换）', en: 'Page Background (image / video, up to 9, click to switch)' },
    'index.appear.clear':   { zh: '清除', en: 'Clear' },
    'index.appear.opacity': { zh: '工具卡片透明度', en: 'Card Opacity' },
    'index.appear.blur':    { zh: '工具卡片模糊度', en: 'Card Blur' },
    'index.appear.bgCount':   { zh: '已选 {n} / 9', en: '{n} / 9 selected' },
    'index.appear.bgFull':    { zh: '已达上限：最多上传 9 个背景（图片或视频合计）', en: 'Limit reached: up to 9 backgrounds (images or videos combined)' },
    'index.appear.bgSkipped': { zh: '已达上限，{n} 个文件被忽略（最多 9 个）', en: '{n} files were skipped (max 9)' },
    'index.appear.bgDelete':  { zh: '删除该背景', en: 'Remove this background' },
    'index.appear.bgFileModeTip': { zh: '当前为本地文件模式：浏览器禁用了 IndexedDB 且背景体积易超 localStorage 配额，背景刷新后可能丢失。建议使用本地服务器访问。', en: 'Local file mode: IndexedDB is disabled and backgrounds may exceed the localStorage quota, so they can be lost on refresh. Run it via a local server instead.' },
    'index.config.title':       { zh: '配置备份', en: 'Config Backup' },
    'index.config.export':      { zh: '导出配置', en: 'Export Config' },
    'index.config.import':      { zh: '导入配置', en: 'Import Config' },
    'index.config.exportDone':  { zh: '配置已导出为压缩包', en: 'Config exported as zip' },
    'index.config.importConfirm': { zh: '导入将覆盖当前所有配置（含主页与全部工具页），确定继续？', en: 'Importing overwrites ALL current settings (homepage and every tool page). Continue?' },
    'index.config.importDone':  { zh: '配置已导入，正在重新加载…', en: 'Config imported, reloading…' },
    'index.config.importError': { zh: '导入失败：文件无法解析', en: 'Import failed: cannot parse file' },
    'index.config.importZipError': { zh: '压缩包解析失败，请确认文件完整', en: 'Failed to parse the zip, please check the file is intact' },
    'index.config.importInvalid': { zh: '文件格式不正确', en: 'Invalid file format' },

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
    'index.hw.sitRest':        { zh: '休息时长', en: 'Rest Duration' },
    'index.hw.notifications':  { zh: '桌面通知', en: 'Notifications' },
    'index.hw.save':           { zh: '保存', en: 'Save' },
    'index.hw.cancel':         { zh: '取消', en: 'Cancel' },
    'index.hw.resetTimers':    { zh: '重置计时', en: 'Reset timers' },
    'index.hw.storageOk':      { zh: '🟢 计时数据已保存在本地，刷新页面不会重置', en: '🟢 Timers persist locally — refresh keeps countdown' },
    'index.hw.storageCookie':  { zh: '🟡 localStorage 不可用，已改用 Cookie 保存，刷新页面不会重置', en: '🟡 localStorage unavailable, using Cookie — refresh keeps countdown' },
    'index.hw.storageNone':    { zh: '🔴 当前环境无法持久化数据，刷新页面会重置计时', en: '🔴 Storage unavailable — timers reset on refresh' },
    'index.hw.minutes':        { zh: '分钟', en: 'min' },
    'index.hw.hourElapsed':    { zh: '时辰已过', en: 'Hour elapsed' },
    'index.hw.remain':         { zh: '还剩', en: 'left' },
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
    categoryType: ['debug','other','web'],
    subCategory: 'electronics',   // web 主分类下二次分组；可缺省（缺省归入「其他」）
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
    categoryType: ['software','doc'],
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
    categoryType: ['software'],
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
    categoryType: ['doc','software'],
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
    categoryType: ['doc','software'],
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
    categoryType: ['doc','software'],
    isNew: true
}, {
    id: 'QRCodeTool',
    title: '二维码读写工具', titleEn: 'QR Code Reader/Writer',
    desc: '离线生成二维码/条形码 · 解析图片二维码 · 支持多种格式', descEn: 'Generate QR/barcode offline · decode QR from image · multi-format.',
    icon: '🔲',
    iconClass: 'icon-blue',
    url: './function/QRCodeTool.html',
    tagAccent: [true, false, false],
    category: '二维码/条形码/生成/解析/图像/文档', categoryEn: 'QR/Barcode/Generate/Decode/Image/Docs',
    categoryType: ['doc','other'],
    isNew: true
}, {
    id: 'lceda-pro',
    title: '立创EDA专业版', titleEn: 'LCEDA Pro',
    icon: './asset/Logo/web_Logo/pro-lceda.png',
    iconClass: 'icon-blue',
    url: 'https://pro.lceda.cn/editor',
    tagAccent: [false, false, false],
    category: 'EDA/PCB/电子/导航', categoryEn: 'EDA/PCB/Electronics/Nav',
    categoryType: ['web','hardware'],
    subCategory: 'electronics',
    isNew: false
},
{
    id: 'oshwhub',
    title: '立创开源广场', titleEn: 'OSHWHub',
    icon: './asset/Logo/web_Logo/oshwhub.png',
    iconClass: 'icon-blue',
    url: 'https://oshwhub.com/',
    tagAccent: [false, false, false],
    category: '开源广场/电子/导航', categoryEn: 'Open Source/OSHWHub/Nav',
    categoryType: ['web','software','hardware'],
    subCategory: 'electronics',
    isNew: false
}, 
{
    id: 'szlcsc',
    title: '立创商城', titleEn: 'LCSC Electronics',
    icon: './asset/Logo/web_Logo/szlcsc.png',
    iconClass: 'icon-blue',
    url: 'https://www.szlcsc.com/',
    tagAccent: [false, false, false],
    category: '立创商城/电子/导航', categoryEn: 'LCSC Electronics/Nav',
    categoryType: ['web','hardware'],
    subCategory: 'electronics',
    isNew: false
}, 
{
    id: 'member-jlc',
    title: '立创下单助手', titleEn: 'JLC Order Assistant',
    icon: './asset/Logo/web_Logo/member-jlc.png',
    iconClass: 'icon-blue',
    url: 'https://member.jlc.com/',
    tagAccent: [false, false, false],
    category: '立创下单助手/客户中心/电子/导航', categoryEn: 'JLC Order Assistant/Client Center/Nav',
    categoryType: ['web','hardware'],
    subCategory: 'electronics',
    isNew: false
}, 
{
    id: 'jlc-dfm',
    title: '立创FDM', titleEn: 'JLC FDM',
    icon: './asset/Logo/web_Logo/member-jlc.png',
    iconClass: 'icon-blue',
    url: 'https://www.jlc-dfm.com/',
    tagAccent: [false, false, false],
    category: '立创下单助手/客户中心/电子/导航', categoryEn: 'JLC Order Assistant/Client Center/Nav',
    categoryType: ['web','hardware'],
    subCategory: 'electronics',
    isNew: false
}, 
{
    id: 'wokwi',
    title: 'Arduino开发仿真平台', titleEn: 'Wokwi',
    icon: './asset/Logo/web_Logo/wokwi.png',
    iconClass: 'icon-blue',
    url: 'https://wokwi.com/',
    tagAccent: [false, false, false],
    category: 'Arduino开发仿真平台/导航', categoryEn: 'Wokwi/Nav',
    categoryType: ['web','hardware','software'],
    subCategory: 'electronics',
    isNew: false
},
{
    id: 'jlc-cad',
    title: '立创云CAD · Solidworks', titleEn: 'JLC CAD',
    icon: './asset/Logo/web_Logo/jlc-cad.png',
    iconClass: 'icon-blue',
    url: 'https://cad.jlc-cad.com/',
    tagAccent: [false, false, false],
    category: '立创云CAD/机械/Solidworks', categoryEn: 'JLC ECAD/Solidworks',
    categoryType: ['web'],
    subCategory: 'mechanics',
    isNew: false
},
{
    id: '3d-viewer-jlc',
    title: '立创3D文件查看器', titleEn: 'JLC 3D',
    icon: './asset/Logo/web_Logo/3d-viewer-jlc.png',
    iconClass: 'icon-blue',
    url: 'https://3d-viewer.jlc.com/',
    tagAccent: [false, false, false],
    category: '立创3D模型查看器/机械/Solidworks', categoryEn: 'JLC 3D/Solidworks',
    categoryType: ['web'],
    subCategory: 'mechanics',
    isNew: false
},
{
    id: 'jlc-ecad',
    title: '立创ECAD · Eplan', titleEn: 'JLC ECAD',
    icon: './asset/Logo/web_Logo/jlc-ecad.png',
    iconClass: 'icon-blue',
    url: 'https://www.jlc-ecad.com/',
    tagAccent: [false, false, false],
    category: '立创ECAD/电气CAD/Eplan', categoryEn: 'JLC ECAD/Eplan',
    categoryType: ['web'],
    subCategory: 'industrial',
    isNew: false
},
{
    id: 'iconfont',
    title: 'iconfont图标库', titleEn: 'iconfont',
    icon: './asset/Logo/web_Logo/iconfont.png',
    iconClass: 'icon-blue',
    url: 'https://www.iconfont.cn/',
    tagAccent: [false, false, false],
    category: '阿里图标库/矢量图/iconfont', categoryEn: 'iconfont',
    categoryType: ['web'],
    subCategory: 'ui',
    isNew: false
},
{
    id: 'figma',
    title: 'figma', titleEn: 'figma',
    icon: './asset/Logo/web_Logo/figma.png',
    iconClass: 'icon-blue',
    url: 'https://www.figma.com/',
    tagAccent: [false, false, false],
    category: 'UI设计/图标设计/矢量图/figma', categoryEn: 'figma',
    categoryType: ['web'],
    subCategory: 'ui',
    isNew: false
},
{
    id: 'lottiefiles',
    title: 'lottiefiles', titleEn: 'lottiefiles',
    icon: './asset/Logo/web_Logo/lottiefiles.png',
    iconClass: 'icon-blue',
    url: 'https://lottiefiles.com/',
    tagAccent: [false, false, false],
    category: 'UI动画设计/Gif设计/lottiefiles', categoryEn: 'lottiefiles',
    categoryType: ['web'],
    subCategory: 'ui',
    isNew: false
},
{
    id: 'deepseek',
    title: 'deepseek', titleEn: 'deepseek',
    icon: './asset/Logo/web_Logo/deepseek.png',
    iconClass: 'icon-blue',
    url: 'https://chat.deepseek.com/',
    tagAccent: [false, false, false],
    category: 'ai/deepseek', categoryEn: 'deepseek',
    categoryType: ['web'],
    subCategory: 'ai',
    isNew: false
},
{
    id: 'doubao',
    title: '豆包', titleEn: 'doubao',
    icon: './asset/Logo/web_Logo/doubao.png',
    iconClass: 'icon-blue',
    url: 'https://doubao.com/',
    tagAccent: [false, false, false],
    category: 'ai/doubao', categoryEn: 'doubao',
    categoryType: ['web'],
    subCategory: 'ai',
    isNew: false
},
{
    id: 'kimi',
    title: 'kimi', titleEn: 'kimi',
    icon: './asset/Logo/web_Logo/kimi.png',
    iconClass: 'icon-blue',
    url: 'https://www.kimi.com/',
    tagAccent: [false, false, false],
    category: 'ai/kimi', categoryEn: 'kimi',
    categoryType: ['web'],
    subCategory: 'ai',
    isNew: false
},
{
    id: 'chatgpt',
    title: 'chatgpt', titleEn: 'chatgpt',
    icon: './asset/Logo/web_Logo/chatgpt.png',
    iconClass: 'icon-blue',
    url: 'https://chatgpt.com/',
    tagAccent: [false, false, false],
    category: 'ai/chatgpt', categoryEn: 'chatgpt',
    categoryType: ['web'],
    subCategory: 'ai',
    isNew: false
},
{
    id: 'MaterialManager',
    title: '物料管理', titleEn: 'Material Manager',
    desc: '电子物料入库、盘点、低库存预警与 CSV/JSON 导入导出', descEn: 'Track components, stocktake, low-stock alerts, CSV/JSON import & export.',
    icon: '📦',
    iconClass: 'icon-blue',
    url: './function/MaterialManager.html',
    tagAccent: [true, false, false],
    category: '物料/库存/管理/盘点/嵌入式', categoryEn: 'Material/Inventory/Manage/Stock/Embedded',
    categoryType: 'hardware',
    isNew: true
},
];



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
    // 只更新当前页面上可见的该卡片星标，避免全量重绘导致的闪烁
    var card = toolsGrid.querySelector('.tool-card[data-id="' + id + '"]');
    if (card) {
        var star = card.querySelector('.tool-fav');
        if (star) {
            var faved = isFav(id);
            star.textContent = faved ? '★' : '☆';
            star.classList.toggle('active', faved);
            star.title = window.I18N ? window.I18N.t(faved ? 'index.fav.remove' : 'index.fav.add') : (faved ? '取消收藏' : '收藏');
        }
    } else {
        // 卡片不在当前视图中（如"收藏"分类下取消收藏），仍需全量重绘
        renderTools();
    }
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

// "全部"模式下，为每个工具确定唯一主分类（用于分组显示）
// 分组主分类直接取 categoryType 数组的第一个元素：数组模式即以第一个分类为主，
// 字符串模式即该分类本身。优先顺序完全由注册顺序决定。
function getPrimaryCategoryType(tool) {
    var types = Array.isArray(tool.categoryType) ? tool.categoryType : [tool.categoryType];
    return types[0];
}

// 获取分类显示名称（兼容 i18n）
function getCatName(catType) {
    var i18nKey = 'index.cat.' + catType;
    if (window.I18N) return window.I18N.t(i18nKey);
    var fallbacks = {
        debug:    { zh: '调试',   en: 'Debug' },
        hardware: { zh: '硬件',   en: 'Hardware' },
        software: { zh: '软件',   en: 'Software' },
        doc:      { zh: '文档',   en: 'Docs' },
        other:    { zh: '其他',   en: 'Other' },
        web:      { zh: '导航',   en: 'Navigation' }
    };
    var lang = (document.documentElement.getAttribute('lang') === 'en') ? 'en' : 'zh';
    return fallbacks[catType] ? fallbacks[catType][lang] : catType;
}

// 分类描述文本（中英文）
var CAT_DESCS = {
    debug:    { zh: '串口、网络、总线、蓝牙等常用调试工具，快速定位与排查问题。', en: 'Serial, network, bus, BLE and other debugging tools for quick troubleshooting.' },
    hardware: { zh: '功耗、PCB、电阻、ADC 等硬件设计与计算工具。', en: 'Power, PCB, resistor, ADC and other hardware design & calculation tools.' },
    software: { zh: '进制转换、CRC、PID、FFT 等嵌入式软件开发常用工具。', en: 'Radix, CRC, PID, FFT and other embedded software development tools.' },
    doc:      { zh: '文本对比、流程图、Markdown 等文档与协作工具。', en: 'Diff, flowchart, Markdown and other documentation & collaboration tools.' },
    other:    { zh: '其他未分类的实用工具与资源。', en: 'Other uncategorized tools and resources.' },
    web:      { zh: '外部网站与资源导航，精选常用工具直达入口。', en: 'External websites & resources — curated quick links to handy tools.' }
};

function getCatDesc(catType) {
    var lang = (document.documentElement.getAttribute('lang') === 'en') ? 'en' : 'zh';
    var desc = CAT_DESCS[catType];
    return desc ? desc[lang] : '';
}

// 子分类映射：web「导航」主分类下，按 subCategory 二次分组时显示的标题。
// key 为 toolsData 里 subCategory 字段值；显示名不依赖 I18N_STRINGS（避免缺 key 出 null）。
var SUB_CATEGORIES = {
    electronics: { zh: '电子', en: 'Electronics'},
    mechanics:   { zh: '机械', en: 'Mechanics'},
    ui:          { zh: 'UI', en: 'UI'},
    ai:          { zh: 'AI', en: 'AI'},
    industrial:  { zh: '工业', en: 'Industrial'},
    other:       { zh: '其他', en: 'Other'}
};
function getSubCatName(key) {
    var lang = (document.documentElement.getAttribute('lang') === 'en') ? 'en' : 'zh';
    var meta = SUB_CATEGORIES[key];
    return meta ? meta[lang] : null;
}

// 创建单个工具卡片元素（提取为公共函数，分组/平铺两种渲染复用）
function createToolCard(tool, index) {
    var card = document.createElement('a');
    card.className = 'tool-card';
    card.href = tool.url;
    card.target = tool.url.startsWith('http') ? '_blank' : '_self';
    card.dataset.id = tool.id;   // 供悬浮彩弹匹配特殊对话
    card.style.animationDelay = (index * 0.02) + 's';

    var title = getToolTitle(tool);
    var desc = getToolDesc(tool) || '';   // 无描述 → 空串，不渲染描述行
    var hasDesc = (desc.length > 0);
    var faved = isFav(tool.id);
    var favTitle = window.I18N ? window.I18N.t(faved ? 'index.fav.remove' : 'index.fav.add') : (faved ? '取消收藏' : '收藏');

    var iconHtml;
    // 图片模式（.png/.jpg/.svg）：四周留白、不变形地居中显示，露出图标底色更好看
    if (tool.icon && (tool.icon.endsWith('.png') || tool.icon.endsWith('.jpg') || tool.icon
            .endsWith('.svg'))) {
        iconHtml =
            '<img src="' + tool.icon + '" alt="' + title + '" loading="lazy" class="icon-img">';
    } else {
        // emoji 图标包一层 span，便于通过容器染色类对 emoji 单独应用 CSS filter
        iconHtml = '<span class="tool-icon-emoji">' + tool.icon + '</span>';
    }

    card.innerHTML =
        '<div class="tool-card-header">' +
            '<div class="tool-card-icon ' + tool.iconClass + '">' + iconHtml + '</div>' +
            '<div class="tool-card-info">' +
                '<div class="tool-card-title">' +
                    title +
                    (tool.isNew ? '<span class="new-badge">NEW</span>' : '') +
                '</div>' +
            '</div>' +
        '</div>' +
        (hasDesc ? '<p class="tool-card-desc">' + desc + '</p>' : '') +
        '<span class="tool-fav ' + (faved ? 'active' : '') + '" title="' + favTitle + '" data-fav-id="' + tool.id + '" role="button" tabindex="0">' + (faved ? '★' : '☆') + '</span>' +
        '<span class="tool-card-arrow">→</span>';

    // 无描述卡片：标题区已占满空间，去掉 header 的下边距，整体更紧凑
    if (!hasDesc) card.classList.add('no-desc');

    return card;
}

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
            // 用 || '' 兜底，兼容未声明 desc/category/titleEn 等的工具（如无描述的导航外链卡）
            const title = (getToolTitle(tool) || '').toLowerCase();
            const desc = (getToolDesc(tool) || '').toLowerCase();
            const cat = (getToolCategory(tool) || '').toLowerCase();
            const titleAlt = ((lang === 'en' ? tool.title : (tool.titleEn || '')) || '').toLowerCase();
            const descAlt = ((lang === 'en' ? tool.desc : (tool.descEn || '')) || '').toLowerCase();
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

    // ===== 渲染：全部模式按分类分组，其他模式平铺 =====
    if (currentCategory === 'all') {
        // 分类显示顺序（与导航栏一致，排除 all / fav）
        var catOrder = ['debug', 'hardware', 'software', 'doc', 'other', 'web'];
        var cardIndex = 0;   // 动画延迟计数器，跨分类连续递增
        var groupIndex = 0;  // 分类序号，用于判断是否需要细横线

        catOrder.forEach(function (catType) {
            var catTools = filtered.filter(function (tool) {
                return getPrimaryCategoryType(tool) === catType;
            });
            if (catTools.length === 0) return;

            // 每个分类都支持整体收起/展开（默认展开，状态按分类分别存 localStorage）
            // 读状态：旧「导航」key 兼容，其余用 toolbox-cat-collapsed-<catType>
            var catCollapsed = (catType === 'web')
                ? (localStorage.getItem('toolbox-cat-collapsed-web') === '1'
                    || (localStorage.getItem('toolbox-nav-collapsed') === '1' && localStorage.getItem('toolbox-cat-collapsed-web') === null))
                : (localStorage.getItem('toolbox-cat-collapsed-' + catType) === '1');

            // 分类标题（渐变蓝竖线 + 分类名 + 数量徽章 + 描述 + 展开箭头，动画延迟与同组第一张卡片一致）
            var header = document.createElement('div');
            header.className = 'tool-cat-header' + (groupIndex > 0 ? ' has-divider' : '') + ' tool-cat-toggleable';
            header.style.animationDelay = (cardIndex * 0.02) + 's';
            header.innerHTML =
                '<span class="tool-cat-line"></span>' +
                '<span class="tool-cat-title">' + getCatName(catType) + '</span>' +
                '<span class="tool-cat-count">' + catTools.length + '</span>' +
                '<span class="tool-cat-desc">' + getCatDesc(catType) + '</span>' +
                '<span class="tool-cat-toggle">' + (catCollapsed ? '▸' : '▾') + '</span>';
            toolsGrid.appendChild(header);

            // 该分类的内容（子分类/卡片）统一放进可折叠容器
            var collapseWrap = document.createElement('div');
            collapseWrap.className = 'tool-cat-collapse' + (catCollapsed ? ' collapsed' : '');

            // web「导航」分类：再按 subCategory 二次分组渲染子分类小标题
            if (catType === 'web') {
                var SUB_ORDER = ['electronics', 'ai', 'ui','mechanics','industrial','other'];
                var subGroups = {};
                catTools.forEach(function (tool) {
                    // 未声明 subCategory 或声明非已知项 → 归入「其他」
                    var key = (tool.subCategory && SUB_CATEGORIES[tool.subCategory]) ? tool.subCategory : 'other';
                    (subGroups[key] = subGroups[key] || []).push(tool);
                });
                SUB_ORDER.forEach(function (key) {
                    var list = subGroups[key];
                    if (!list || !list.length) return;

                    var subHeader = document.createElement('div');
                    subHeader.className = 'tool-sub-header';
                    subHeader.style.animationDelay = (cardIndex * 0.02) + 's';
                    subHeader.innerHTML =
                        '<span class="tool-sub-line"></span>' +
                        '<span class="tool-sub-title">' + getSubCatName(key) + '</span>' +
                        '<span class="tool-sub-count">' + list.length + '</span>';
                    collapseWrap.appendChild(subHeader);

                    list.forEach(function (tool) {
                        collapseWrap.appendChild(createToolCard(tool, cardIndex));
                        cardIndex++;
                    });
                });
            } else {
                // 普通分类：平铺卡片
                catTools.forEach(function (tool) {
                    collapseWrap.appendChild(createToolCard(tool, cardIndex));
                    cardIndex++;
                });
            }

            toolsGrid.appendChild(collapseWrap);

            // 点击分类标题可展开/收起
            header.addEventListener('click', function () {
                var isCollapsed = collapseWrap.classList.toggle('collapsed');
                var storeKey = (catType === 'web') ? 'toolbox-cat-collapsed-web' : ('toolbox-cat-collapsed-' + catType);
                localStorage.setItem(storeKey, isCollapsed ? '1' : '0');
                // 写下新 key 后，旧「导航」key 不再生效
                if (catType === 'web') localStorage.removeItem('toolbox-nav-collapsed');
                this.querySelector('.tool-cat-toggle').textContent = isCollapsed ? '▸' : '▾';
            });

            groupIndex++;
        });
    } else {
        // 非"全部"模式：平铺渲染
        filtered.forEach(function (tool, index) {
            toolsGrid.appendChild(createToolCard(tool, index));
        });
    }
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
        sitRestMin:    5,    // 休息时长（分钟）
        notifications: true
    };

    // ===== 状态 =====
    var settings = loadSettings();
    // 喝水：改为统计「今日已喝累计 ml」，跨天自动清零（不再用次数/倒计时）
    var WATER_KEY = 'hero-widget-water';
    var waterToday = loadWaterToday();
    // 久坐：仍为倒计时提醒，时间戳持久化延续
    var sitNextTs  = loadNextTs('sit', settings.sitInterval);
    var sitTriggered   = false;   // 阶段1：久坐提醒触发
    var sitResting     = false;   // 阶段2：正在休息倒计时
    var sitDone        = false;   // 阶段3：休息完成，等待点击回到阶段 0
    var sitRestEndTs   = 0;       // 休息结束时间戳
    // 休息时长（毫秒，随设置动态更新）
    function getSitRestMs() { return Math.max(1, settings.sitRestMin || 5) * 60000; }

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
        el.lunarGz     = document.getElementById('hwLunarGz');
        el.lunarBarFill = document.getElementById('hwLunarBarFill');
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
        el.inSitRest   = document.getElementById('hwInSitRest');
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

    // ===== 农历 / 干支 / 时辰 转换（1900–2100 自包含算法，零外部依赖） =====
    var GAN   = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    var ZHI   = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    var ZODIAC= ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
    // 每年是否闰月、闰几月、各月天数（仅取低 4 bit 与 0x10000 位）
    var LUNAR_INFO = [
        0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
        0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
        0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
        0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
        0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
        0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
        0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
        0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
        0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
        0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
        0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
        0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
        0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
        0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
        0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
        0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,
        0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,
        0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0xA4E0,0x0aba4,0x0a5b0,0x052b0,
        0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,
        0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,
        0x0d520];
    // 五虎遁：年干 → 正月（寅月）天干索引
    var MONTH_GAN_START = [2,4,6,8,0,2,4,6,8,0];
    // 五鼠遁：日干 → 子时天干索引
    var HOUR_GAN_START  = [0,2,4,6,8,0,2,4,6,8];

    function lYearDays(y) { var sum = 348; for (var i = 0x8000; i > 0x8; i >>= 1) sum += (LUNAR_INFO[y-1900] & i) ? 1 : 0; return sum + leapDays(y); }
    function leapMonth(y) { return LUNAR_INFO[y-1900] & 0xf; }
    function leapDays(y)  { return leapMonth(y) ? ((LUNAR_INFO[y-1900] & 0x10000) ? 30 : 29) : 0; }
    function monthDays(y, m) { return ((LUNAR_INFO[y-1900] & (0x10000 >> m)) ? 30 : 29); }

    // 公历 → 农历（返回农历月、日、是否闰月）
    function solar2lunar(y, m, d) {
        var baseDate = new Date(1900, 0, 31);
        var objDate  = new Date(y, m - 1, d);
        var offset   = Math.round((objDate - baseDate) / 86400000);
        var temp = 0, i;
        for (i = 1900; i < 2101 && offset > 0; i++) { temp = lYearDays(i); offset -= temp; }
        if (offset < 0) { offset += temp; i--; }
        var isLeap = false;
        var leap = leapMonth(i);
        var j;
        for (j = 1; j < 13 && offset > 0; j++) {
            if (leap > 0 && j === (leap + 1) && !isLeap) { --j; isLeap = true; temp = leapDays(i); }
            else { temp = monthDays(i, j); }
            if (isLeap && j === (leap + 1)) isLeap = false;
            offset -= temp;
        }
        if (offset === 0 && leap > 0 && j === leap + 1) {
            if (isLeap) isLeap = false; else { isLeap = true; --j; }
        }
        if (offset < 0) { offset += temp; --j; }
        return { month: j, day: offset + 1, isLeap: isLeap };
    }

    var NSTR1 = ['日','一','二','三','四','五','六','七','八','九','十'];
    function lunarDayName(d) {
        if (d === 10) return '初十';
        if (d === 20) return '二十';
        if (d === 30) return '三十';
        var t = ['','初','十','廿','卅'][Math.floor(d / 10)];
        return t + NSTR1[d % 10];
    }
    var LUNAR_MONTHS = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
    function lunarMonthName(m, isLeap) { return (isLeap ? '闰' : '') + LUNAR_MONTHS[m - 1] + '月'; }

    // 当前时辰（子=0 … 亥=11）与起始时刻
    function getShiChen(h) {
        if (h >= 23) return 0;
        if (h >= 21) return 11;
        if (h >= 19) return 10;
        if (h >= 17) return 9;
        if (h >= 15) return 8;
        if (h >= 13) return 7;
        if (h >= 11) return 6;
        if (h >= 9)  return 5;
        if (h >= 7)  return 4;
        if (h >= 5)  return 3;
        if (h >= 3)  return 2;
        if (h >= 1)  return 1;
        return 0;
    }

    // ===== 刷新农历信息 =====
    function updateLunar() {
        if (!el.date || !el.lunarGz) return;
        var d = new Date();
        var y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate();

        // 农历月日：并入日期行（去掉“农历”前缀）
        var L = solar2lunar(y, m, day);
        el.date.textContent += ' · ' + lunarMonthName(L.month, L.isLeap) + lunarDayName(L.day);

        // 年 / 月 / 日 干支
        var yGan = (y - 4) % 10, yZhi = (y - 4) % 12;
        // 月干支：基于农历月（正月=寅）
        var mZhi = (L.month + 1) % 12;
        var mGan = (MONTH_GAN_START[((y - 4) % 10 + 10) % 10] + (L.month - 1)) % 10;
        // 日干支
        var dayCyclical = Math.round(Date.UTC(y, m - 1, 1) / 86400000) + 25577 + (day - 1);
        var dGan = ((dayCyclical % 10) + 10) % 10;
        var dZhi = ((dayCyclical % 12) + 12) % 12;

        el.lunarGz.textContent =
            GAN[yGan] + ZHI[yZhi] + '[' + ZODIAC[yZhi] + ']年 ' +
            GAN[mGan] + ZHI[mZhi] + '月 ' +
            GAN[dGan] + ZHI[dZhi] + '日 ';

        // 时辰与进度
        var h = d.getHours(), min = d.getMinutes(), sec = d.getSeconds();
        var hz = getShiChen(h);
        var startMin = (hz === 0) ? ((h >= 23) ? 1380 : -60) : ((hz - 1) * 2 + 1) * 60;
        var nowMin = h * 60 + min + sec / 60;
        var elapsed = nowMin - startMin;
        if (elapsed < 0) elapsed += 1440;
        var pct = (elapsed / 120) * 100;
        var remain = Math.max(0, 120 - elapsed);

        var hGan = (HOUR_GAN_START[dGan] + hz) % 10;
        var hzText = GAN[hGan] + ZHI[hz] + '时';

        el.lunarGz.textContent += hzText;
        if (el.lunarBarFill) {
            el.lunarBarFill.style.width = pct.toFixed(1) + '%';
        }
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

        updateLunar();
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

        // 久坐三态循环：
        //   阶段 0 — 正常计时（sitTriggered=false, sitResting=false, sitDone=false）
        //   阶段 1 — 久坐提醒触发（sitTriggered=true, sitResting=false），点击进入休息
        //   阶段 2 — 休息倒计时中（sitResting=true），休息结束进入阶段 3
        //   阶段 3 — 休息完成（sitDone=true），点击回到阶段 0
        // --- 先更新显示 ---
        if (sitTriggered && !sitResting && !sitDone) {
            // 阶段 1：久坐提醒
            var sAlert = t('index.hw.sitAlert') || '该活动了！';
            el.sitTimer.textContent = sAlert;
            el.sitFill.style.width = '100%';
        } else if (sitResting) {
            // 阶段 2：休息倒计时
            el.sitItem.classList.remove('rest-done');
            el.sitItem.classList.add('resting');
            el.sitItem.classList.remove('triggered');
            var restRemain = Math.max(0, sitRestEndTs - now);
            if (restRemain <= 0) {
                el.sitTimer.textContent = '00:00';
                el.sitFill.style.width = '100%';
            } else {
                var restPrefix = isEn() ? 'Rest ' : '休息 ';
                el.sitTimer.textContent = restPrefix + formatCountdown(restRemain);
                var rPct = 100 - (restRemain / getSitRestMs()) * 100;
                el.sitFill.style.width = Math.min(100, Math.max(0, rPct)) + '%';
            }
        } else if (sitDone) {
            // 阶段 3：休息完成，等待点击
            el.sitItem.classList.remove('resting');
            el.sitItem.classList.add('rest-done');
            el.sitItem.classList.add('triggered');
            var doneText = isEn() ? 'Rest done ✓' : '休息完成 ✓';
            el.sitTimer.textContent = doneText;
            el.sitFill.style.width = '100%';
        } else {
            // 阶段 0：正常显示倒计时
            el.sitItem.classList.remove('resting');
            el.sitItem.classList.remove('rest-done');
            el.sitItem.classList.remove('triggered');
            var sRemain = Math.max(0, sitNextTs - now);
            el.sitTimer.textContent = formatCountdown(sRemain);
            var sPct = 100 - (sRemain / (settings.sitInterval * 60000)) * 100;
            el.sitFill.style.width = Math.min(100, Math.max(0, sPct)) + '%';
        }

        // --- 再更新状态（状态变化会影响下一帧显示） ---
        if (!sitTriggered && !sitResting && !sitDone) {
            // 阶段 0：正常倒计时
            if (now >= sitNextTs) {
                sitTriggered = true;
                triggerReminder('sit');
            }
        } else if (sitResting && now >= sitRestEndTs) {
            // 阶段 2 → 阶段 3：休息结束进入完成态
            sitResting = false;
            sitDone = true;
            el.sitItem.classList.remove('resting');
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
        var body  = isEn() ? 'Stand up and stretch, click to start rest' : '站起来活动一下，点击进入休息';
        el.sitItem.classList.add('triggered');
        // 推进下次提醒时间并持久化
        sitNextTs = Date.now() + settings.sitInterval * 60000;
        saveNextTs('sit', sitNextTs);
        showNotification(title, body);
        playBeep(660);
    }

    function handleSitClick() {
        if (sitTriggered && !sitResting && !sitDone) {
            // 阶段1 → 阶段2：点击进入休息倒计时
            var restMs = getSitRestMs();
            sitTriggered = false;
            sitResting = true;
            sitRestEndTs = Date.now() + restMs;
            el.sitItem.classList.remove('triggered');
            el.sitItem.classList.remove('rest-done');
            el.sitItem.classList.add('resting');
            el.sitFill.style.width = '0%';
            var restPrefix = isEn() ? 'Rest ' : '休息 ';
            el.sitTimer.textContent = restPrefix + formatCountdown(restMs);
            document.dispatchEvent(new CustomEvent('mascot-say', {
                detail: { zh: '休息 ' + (settings.sitRestMin || 5) + ' 分钟，活动一下再回来 🪑', en: 'Take a ' + (settings.sitRestMin || 5) + '-min break, stretch and come back 🪑' }
            }));
            playBeep(880);
        } else if (sitDone) {
            // 阶段3 → 阶段0：点击回到久坐计时
            sitDone = false;
            sitTriggered = false;
            sitNextTs = Date.now() + settings.sitInterval * 60000;
            saveNextTs('sit', sitNextTs);
            el.sitItem.classList.remove('triggered');
            el.sitItem.classList.remove('rest-done');
            document.dispatchEvent(new CustomEvent('mascot-say', {
                detail: { zh: '休息结束，继续搬砖 🪑', en: 'Break over, back to work 🪑' }
            }));
            playBeep(880);
        }
        // 其余阶段点击无效
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

    // ===== 提示音（已关闭：保留调用点，函数置空以避免页面发声） =====
    function playBeep(freq) {
        // 提示音已按要求移除。如需恢复，将下方 return 删除即可重新启用蜂鸣。
        return;
    }

    // ===== 设置弹窗 =====
    function openSettings() {
        el.inWorkStart.value = settings.workStart;
        el.inWorkEnd.value   = settings.workEnd;
        el.inWaterMl.value   = settings.waterMl;
        el.inWaterGoal.value = settings.waterGoal;
        el.inSit.value       = settings.sitInterval;
        el.inSitRest.value   = settings.sitRestMin;
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
        settings.sitRestMin   = Math.max(1, parseInt(el.inSitRest.value,  10) || 5);
        settings.notifications = el.notifToggle.classList.contains('on');

        // 间隔变化只影响久坐：重置其倒计时（时间戳持久化）
        sitNextTs = Date.now() + settings.sitInterval * 60000;
        saveNextTs('sit', sitNextTs);
        sitTriggered = false;
        sitResting = false;
        sitDone = false;
        el.sitItem.classList.remove('triggered');
        el.sitItem.classList.remove('resting');
        el.sitItem.classList.remove('rest-done');

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
        sitResting = false;
        sitDone = false;
        sitNextTs = Date.now() + settings.sitInterval * 60000;
        saveNextTs('sit', sitNextTs);
        el.sitItem.classList.remove('triggered');
        el.sitItem.classList.remove('resting');
        el.sitItem.classList.remove('rest-done');
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
        el.sitItem.addEventListener('click',   function() { handleSitClick(); });
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
            // 双击编辑待办文本
            span.addEventListener('dblclick', function () {
                var input = document.createElement('input');
                input.type = 'text';
                input.className = 'todo-text todo-text-edit';
                input.value = item.text;
                input.maxLength = 60;
                input.autofocus = true;
                input.style.width = (span.parentElement.offsetWidth - 60) + 'px';
                span.parentElement.replaceChild(input, span);
                input.focus();
                input.select();
                function finishEdit() {
                    var val = (input.value || '').trim();
                    if (val && val !== item.text) {
                        todos[i].text = val;
                        saveTodos();
                    }
                    render();
                }
                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') { e.preventDefault(); finishEdit(); }
                    if (e.key === 'Escape') { render(); }
                });
                input.addEventListener('blur', finishEdit);
            });

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

    // 左右两侧（时间 / 待办）强制等高，蓝条严格对称：
    // 取两者中较高的一方，两个容器都设为该高度，避免任一侧内容变化后错位
    function syncHeight() {
        var w = document.getElementById('heroWidget');
        var t = document.getElementById('heroTodo');
        if (!w || !t) return;
        var h = Math.max(w.offsetHeight, t.offsetHeight);
        if (h > 0) {
            w.style.height = h + 'px';
            t.style.height = h + 'px';
        }
    }

    function init() {
        if (!document.getElementById('heroTodo')) return;
        cacheDom();
        render();
        syncHeight();
        // 实时跟随任意一侧尺寸变化（字体加载、待办增减等），保证始终等高
        if (window.ResizeObserver) {
            var _hw = document.getElementById('heroWidget');
            if (_hw) new ResizeObserver(syncHeight).observe(_hw);
            var _ht = document.getElementById('heroTodo');
            if (_ht) new ResizeObserver(syncHeight).observe(_ht);
        } else {
            window.addEventListener('resize', syncHeight);
        }
        // 首屏字体/布局稳定后再校准一次，消除加载瞬间的高度偏差
        window.addEventListener('load', syncHeight);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(syncHeight);
        }
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
        'QRCodeTool': { zh: '扫一扫 / 生成二维码都交给我，离线也照跑 🔲', en: 'Scan or generate QR & barcodes — works offline, no excuses 🔲' },

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

// ============================================================
//  Hero 轮播（① 介绍 ② 交流群 ③ 搜索）+ 右下角悬浮按钮（返回顶部 / 搜索引擎设置）
//  可左右箭头 / 指示点 / 键盘 ←→ / 触摸滑动切换
// ============================================================
(function () {
    'use strict';

    // ---- 搜索引擎：下拉选择（存 localStorage 的引擎 id，默认必应） ----
    var ENGINE_KEY = 'toolbox-search-engine';
    var DEFAULT_ENGINE = 'bing';
    // 下拉选项的 value 即搜索地址模板（与 HTML 中 <option> 保持一致）
    var ENGINES = {
        bing:     'https://www.bing.com/search?q=',
        bilibili: 'https://search.bilibili.com/all?keyword=',
        baidu:    'https://www.baidu.com/s?wd=',
        google:   'https://www.google.com/search?q=',
        metaso:   'https://metaso.cn/?q=',
        sogou:    'https://www.sogou.com/web?query=',
        toutiao:  'https://so.toutiao.com/search?keyword=',
        sm:       'https://www.sm.cn/s?q=',
        so360:    'https://www.so.com/s?q=',
        duckduck: 'https://duckduckgo.com/?q='
    };
    // 内置引擎显示名（下拉 option 文案与之对应，用于未渲染下拉时兜底取名字）
    var ENGINE_NAMES = {
        bing: '必应', bilibili: '哔哩哔哩', baidu: '百度', google: '谷歌', metaso: '秘塔AI',
        sogou: '搜狗', toutiao: '头条', sm: '神马', so360: '360搜索', duckduck: 'DuckDuckGo'
    };
    // 自定义搜索引擎：存 localStorage（小数据，刷新不丢），结构 [{id,name,url}]
    var CUSTOM_ENGINES_KEY = 'toolbox-search-engines-custom';
    // 旧版以完整 URL 存储的数据兼容映射（反向查找 id）
    function urlToId(url) {
        for (var k in ENGINES) {
            if (ENGINES.hasOwnProperty(k) && ENGINES[k] === url) return k;
        }
        return null;
    }
    // 读取自定义引擎列表（容错：坏数据回退空数组）
    function loadCustomEngines() {
        try {
            var raw = localStorage.getItem(CUSTOM_ENGINES_KEY);
            if (!raw) return [];
            var arr = JSON.parse(raw);
            if (!Array.isArray(arr)) return [];
            return arr.filter(function (e) {
                return e && typeof e.id === 'string' && typeof e.url === 'string' && typeof e.name === 'string';
            });
        } catch (e) { return []; }
    }
    function saveCustomEngines(list) {
        try { localStorage.setItem(CUSTOM_ENGINES_KEY, JSON.stringify(list)); } catch (e) {}
    }
    // 同时查内置与自定义引擎，按「存储的 id（内置）或完整 URL（自定义）」解析出搜索地址
    function getEngineUrl() {
        var raw = localStorage.getItem(ENGINE_KEY) || DEFAULT_ENGINE;
        // 兼容旧版：存的是完整 URL 时反查 id；否则按 id 取
        if (ENGINES.hasOwnProperty(raw)) return ENGINES[raw];
        var id = urlToId(raw);
        if (id) return ENGINES[id];
        // 自定义引擎：存储值即其完整 URL
        var customs = loadCustomEngines();
        for (var i = 0; i < customs.length; i++) {
            if (customs[i].url === raw || customs[i].id === raw) return customs[i].url;
        }
        return ENGINES[DEFAULT_ENGINE];
    }
    // 取当前引擎的显示名：优先下拉框 option 文案，其次内置名/自定义名兜底
    function getEngineName() {
        var url = getEngineUrl();
        if (engineSelect) {
            for (var i = 0; i < engineSelect.options.length; i++) {
                if (engineSelect.options[i].value === url) {
                    return engineSelect.options[i].text;
                }
            }
        }
        if (ENGINE_NAMES.hasOwnProperty(rawEngineId())) return ENGINE_NAMES[rawEngineId()];
        var customs = loadCustomEngines();
        for (var j = 0; j < customs.length; j++) {
            if (customs[j].url === url) return customs[j].name;
        }
        return ENGINE_NAMES[DEFAULT_ENGINE] || '必应';
    }
    // 取存储的原始值（内置 id / 完整 URL），用于从名字映射兜底
    function rawEngineId() {
        var raw = localStorage.getItem(ENGINE_KEY) || DEFAULT_ENGINE;
        if (ENGINES.hasOwnProperty(raw)) return raw;
        return urlToId(raw) || '';
    }
    // 重建下拉选项：内置引擎 + 自定义引擎（保持内置顺序在前，自定义追加在后）
    function renderEngineOptions() {
        if (!engineSelect) return;
        var sel = engineSelect;
        var cur = getEngineUrl();
        sel.innerHTML = '';
        for (var k in ENGINES) {
            if (!ENGINES.hasOwnProperty(k)) continue;
            var o = document.createElement('option');
            o.value = ENGINES[k];
            o.textContent = ENGINE_NAMES.hasOwnProperty(k) ? ENGINE_NAMES[k] : k;
            sel.appendChild(o);
        }
        var customs = loadCustomEngines();
        customs.forEach(function (e) {
            var o = document.createElement('option');
            o.value = e.url;
            o.textContent = e.name;
            sel.appendChild(o);
        });
        sel.value = cur;
    }
    // 渲染自定义引擎列表（含删除按钮）；空时显示占位文案
    function renderCustomEngineList() {
        if (!customEngineList) return;
        var list = loadCustomEngines();
        customEngineList.innerHTML = '';
        if (!list.length) {
            var empty = document.createElement('div');
            empty.className = 'engine-custom-empty';
            empty.textContent = I18N.t('index.engine.customEmpty');
            customEngineList.appendChild(empty);
            return;
        }
        list.forEach(function (e) {
            var item = document.createElement('div');
            item.className = 'engine-custom-item';
            var nm = document.createElement('span');
            nm.className = 'engine-custom-item-name';
            nm.textContent = e.name;
            nm.title = e.name;
            var u = document.createElement('span');
            u.className = 'engine-custom-item-url';
            u.textContent = e.url;
            u.title = e.url;
            var del = document.createElement('button');
            del.type = 'button';
            del.className = 'engine-custom-del';
            del.textContent = '✕';
            del.title = I18N.t('index.engine.customDelete');
            del.setAttribute('data-i18n-title', 'index.engine.customDelete');
            del.addEventListener('click', function () { deleteCustomEngine(e.id, e.url); });
            item.appendChild(nm);
            item.appendChild(u);
            item.appendChild(del);
            customEngineList.appendChild(item);
        });
    }
    // 添加自定义引擎：校验名称/地址合法性 + 去重，写入后重建下拉与列表并选中
    function addCustomEngine() {
        if (!customEngineName || !customEngineUrl) return;
        var name = customEngineName.value.trim();
        var url = customEngineUrl.value.trim();
        if (!name || !url || !/^https?:\/\//i.test(url)) {
            showEngineCustomNotice(I18N.t('index.engine.customInvalid'));
            return;
        }
        var list = loadCustomEngines();
        var dup = list.some(function (e) {
            return e.name.toLowerCase() === name.toLowerCase() || e.url === url;
        });
        if (dup) {
            showEngineCustomNotice(I18N.t('index.engine.customDup'));
            return;
        }
        list.push({ id: 'custom-' + Date.now() + '-' + Math.floor(Math.random() * 1e4), name: name, url: url });
        saveCustomEngines(list);
        renderEngineOptions();
        renderCustomEngineList();
        if (engineSelect) engineSelect.value = url;
        customEngineName.value = '';
        customEngineUrl.value = '';
        showEngineCustomNotice(I18N.t('index.engine.customAdded'));
    }
    // 删除自定义引擎：从存储移除；若其正被选用则回退默认
    function deleteCustomEngine(id, url) {
        var list = loadCustomEngines();
        var next = list.filter(function (e) { return e.id !== id; });
        if (next.length === list.length) return;   // 未找到，忽略
        saveCustomEngines(next);
        var curUrl = getEngineUrl();
        if (curUrl === url) setEngineUrl(ENGINES[DEFAULT_ENGINE]);
        renderEngineOptions();
        renderCustomEngineList();
        updateSearchTip();
        showEngineCustomNotice(I18N.t('index.engine.customDeleted'));
    }
    // 自定义引擎提示条（复用 .engine-bg-notice 的淡入淡出）
    var engineCustomNoticeTimer = null;
    function showEngineCustomNotice(msg) {
        if (!engineCustomNotice) return;
        engineCustomNotice.textContent = msg;
        engineCustomNotice.classList.add('show');
        if (engineCustomNoticeTimer) clearTimeout(engineCustomNoticeTimer);
        engineCustomNoticeTimer = setTimeout(function () { engineCustomNotice.classList.remove('show'); }, 3000);
    }
    // 刷新搜索页提示：<引擎名> · 随手搜点资料
    function updateSearchTip() {
        if (!searchTip) return;
        var suffix = window.I18N ? window.I18N.t('index.hero.search.tipSuffix') : '· 随手搜点资料';
        searchTip.textContent = getEngineName() + ' ' + suffix;
    }
    // 保存：value 即搜索地址模板，直接存储（兼容旧版存的完整 URL）
    function setEngineUrl(url) {
        localStorage.setItem(ENGINE_KEY, url);
    }

    // ---- 轮播元素 ----
    var track = document.getElementById('heroCarouselTrack');
    var dotsWrap = document.getElementById('heroCarouselDots');
    var prevBtn = document.getElementById('heroCarouselPrev');
    var nextBtn = document.getElementById('heroCarouselNext');
    var carouselEl = document.getElementById('heroCarousel');
    if (!track || !dotsWrap || !prevBtn || !nextBtn || !carouselEl) return;  // 结构缺失则安全退出

    var slides = track.children;
    var total = slides.length;
    var SLIDE_KEY = 'hero-carousel-slide';
    var savedSlide = 0;
    try { savedSlide = parseInt(localStorage.getItem(SLIDE_KEY), 10); } catch (e) {}
    var index = (!isNaN(savedSlide) && savedSlide >= 0 && savedSlide < total) ? savedSlide : 0;
    var dots = [];

    // 生成指示点
    for (var i = 0; i < total; i++) {
        (function (idx) {
            var d = document.createElement('button');
            d.type = 'button';
            d.className = 'hero-dot' + (idx === index ? ' active' : '');
            d.setAttribute('aria-label', (idx + 1) + ' / ' + total);
            d.addEventListener('click', function () { goTo(idx); });
            dotsWrap.appendChild(d);
            dots.push(d);
        })(i);
    }

    function render(animate) {
        if (animate === false) {
            // 刷新后恢复页码：直接定位，不要滑动动画
            track.style.transition = 'none';
        } else {
            track.style.transition = '';
        }
        track.style.transform = 'translateX(' + (-index * 100) + '%)';
        for (var k = 0; k < dots.length; k++) {
            dots[k].classList.toggle('active', k === index);
        }
        if (animate === false) {
            // 下一帧恢复过渡，保证之后手动切换仍有动画
            requestAnimationFrame(function () { track.style.transition = ''; });
        }
    }
    function goTo(i) {
        index = (i + total) % total;
        try { localStorage.setItem(SLIDE_KEY, String(index)); } catch (e) {}
        render(true);
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    // 键盘左右键（输入框聚焦时不拦截）
    document.addEventListener('keydown', function (e) {
        if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
        if (e.key === 'ArrowLeft') prev();
        else if (e.key === 'ArrowRight') next();
    });

    // 触摸滑动切换
    var startX = 0, swiping = false;
    track.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        swiping = true;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
        if (!swiping) return;
        swiping = false;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) { if (dx < 0) next(); else prev(); }
    });

    render(false);

    // ---- 搜索页逻辑 ----
    var searchInput = document.getElementById('heroSearchInput');
    var searchBtn = document.getElementById('heroSearchBtn');
    var searchTip = document.getElementById('heroSearchTip');
    function doSearch() {
        if (!searchInput) return;
        var q = searchInput.value.trim();
        if (!q) { searchInput.focus(); return; }
        var url = getEngineUrl();
        // 支持 %s 占位符（用户粘贴的搜索地址常含 ?q=%s）；否则在地址后直接拼接查询词
        var target = (url.indexOf('%s') !== -1) ? url.replace('%s', encodeURIComponent(q)) : (url + encodeURIComponent(q));
        window.open(target, '_blank', 'noopener');
    }
    if (searchBtn) searchBtn.addEventListener('click', doSearch);
    if (searchInput) {
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') doSearch();
        });
    }
    updateSearchTip();

    // 注：外观初始化应用放到本 IIFE 末尾（appearDraft 赋值之后）执行，见文件下方 initAppearanceOnLoad()

    // ---- 右下角悬浮按钮：返回顶部 + 搜索引擎设置 ----
    var fabTop = document.getElementById('heroFabTop');
    var fabSettings = document.getElementById('heroFabSettings');
    var engineOverlay = document.getElementById('engineModalOverlay');
    var engineSelect = document.getElementById('engineSelect');
    var engineSave = document.getElementById('engineModalSave');
    var engineReset = document.getElementById('engineModalReset');
    var engineCancel = document.getElementById('engineModalCancel');
    // 自定义搜索引擎相关元素
    var customEngineName = document.getElementById('customEngineName');
    var customEngineUrl = document.getElementById('customEngineUrl');
    var customEngineAdd = document.getElementById('customEngineAdd');
    var customEngineList = document.getElementById('customEngineList');
    var engineCustomNotice = document.getElementById('engineCustomNotice');

    // ---- 外观设置元素（页面背景 / 卡片透明度 / 卡片模糊度） ----
    // 注意：背景图 dataURL 可能很大，localStorage 放不下（配额 ~5MB 会抛异常）。
    // 因此小数据（透明度/模糊度）存 localStorage，背景图列表单独存 IndexedDB。
    var APPEAR_KEY = 'hero-page-appearance';
    var BG_DB_NAME = 'yu-toolbox-bg';
    var BG_DB_STORE = 'bg';
    var BG_META_ID = '__meta__';   // 存 {id:'__meta__', currentId}
    var DEFAULT_APPEAR = { bg: '', opacity: 100, blur: 0, bgClarity: 70, opacityHover: 100, blurHover: 0 };
    // 内存中的当前外观草稿：跨弹窗打开保持，不被 localStorage 的空值覆盖
    var appearDraft = { bg: '', opacity: 100, blur: 0, bgClarity: 70, opacityHover: 100, blurHover: 0 };
    // 背景列表与当前选中（图片 / 视频均可，可切换）
    var bgImages = [];        // [{id, type:'image'|'video', dataURL}]
    var bgCurrentId = null;
    var bgLoaded = false;     // 背景列表是否已完成首次（页面加载时）加载；之后打开设置不再用存储覆盖内存
    var MAX_BG_ITEMS = 9;     // 背景图/视频合计上限：图片和视频都算在内，最多 9 个
    var pageBgInput = document.getElementById('pageBgInput');
    var pageBgClear = document.getElementById('pageBgClear');
    var pageBgGrid = document.getElementById('pageBgGrid');
    var pageBgCount = document.getElementById('pageBgCount');
    var pageBgNotice = document.getElementById('pageBgNotice');
    var bgFileModeTip = document.getElementById('bgFileModeTip');
    var cardOpacity = document.getElementById('cardOpacity');
    var cardOpacityVal = document.getElementById('cardOpacityVal');
    var cardBlur = document.getElementById('cardBlur');
    var cardBlurVal = document.getElementById('cardBlurVal');
    var cardOpacityHover = document.getElementById('cardOpacityHover');
    var cardOpacityHoverVal = document.getElementById('cardOpacityHoverVal');
    var cardBlurHover = document.getElementById('cardBlurHover');
    var cardBlurHoverVal = document.getElementById('cardBlurHoverVal');
    var pageBgDim = document.getElementById('pageBgDim');
    var pageBgDimVal = document.getElementById('pageBgDimVal');

    // 读取透明度/模糊度（小数据，存 localStorage）；背景图由 IndexedDB 异步载入
    function loadAppearance() {
        try {
            var raw = localStorage.getItem(APPEAR_KEY);
            if (raw) {
                var obj = JSON.parse(raw);
                appearDraft.opacity = (typeof obj.opacity === 'number' && obj.opacity >= 0 && obj.opacity <= 100) ? obj.opacity : 100;
                appearDraft.blur = (typeof obj.blur === 'number' && obj.blur >= 0 && obj.blur <= 20) ? obj.blur : 0;
                appearDraft.bgClarity = (typeof obj.bgClarity === 'number' && obj.bgClarity >= 0 && obj.bgClarity <= 100) ? obj.bgClarity : 70;
                appearDraft.opacityHover = (typeof obj.opacityHover === 'number' && obj.opacityHover >= 0 && obj.opacityHover <= 100) ? obj.opacityHover : 100;
                appearDraft.blurHover = (typeof obj.blurHover === 'number' && obj.blurHover >= 0 && obj.blurHover <= 20) ? obj.blurHover : 0;
            }
        } catch (e) {}
    }
    // ---- IndexedDB 存取背景图列表（大数据，规避 localStorage 配额） ----
    function openBgDB(cb) {
        if (!window.indexedDB) { cb(null); return; }
        var req;
        try { req = window.indexedDB.open(BG_DB_NAME, 1); }
        catch (e) { cb(null); return; }
        req.onupgradeneeded = function (e) {
            var db = e.target.result;
            if (!db.objectStoreNames.contains(BG_DB_STORE)) db.createObjectStore(BG_DB_STORE, { keyPath: 'id' });
        };
        req.onsuccess = function (e) { cb(e.target.result); };
        req.onerror = function () { cb(null); };
    }
    // ---- 双保险持久化：IndexedDB 为主（大文件/多文件/视频），localStorage 兜底 ----
    // 很多环境（如直接 file:// 打开、隐私模式、浏览器策略）下 IndexedDB 不可用，
    // 此时仅靠 IndexedDB 会导致背景永远存不住；localStorage 兜底可覆盖绝大多数环境。
    var BG_LS_KEY = 'hero-page-bg-list';
    function persistBgLS(list, currentId) {
        try {
            var payload = JSON.stringify({
                list: list.map(function (i) { return { id: i.id, type: i.type, dataURL: i.dataURL }; }),
                currentId: currentId
            });
            localStorage.setItem(BG_LS_KEY, payload);
        } catch (e) { /* 超出配额（视频过大）则仅依赖 IndexedDB，忽略 */ }
    }
    function loadBgLS(cb) {
        try {
            var raw = localStorage.getItem(BG_LS_KEY);
            if (!raw) { cb([], null); return; }
            var obj = JSON.parse(raw);
            var list = (obj.list || []).map(function (i) {
                return { id: i.id, type: i.type === 'video' ? 'video' : 'image', dataURL: i.dataURL };
            });
            var cur = (obj.currentId && list.some(function (x) { return x.id === obj.currentId; })) ? obj.currentId : (list[0] ? list[0].id : null);
            cb(list, cur);
        } catch (e) { cb([], null); }
    }
    // 载入全部背景图 + 当前选中 id：
    // 同时读 IndexedDB 与 localStorage，取「数量更多且非空」的那份，
    // 避免某个后端只落了部分记录（如 clear+put 竞态、配额超限）时丢数据。
    function loadBgList(cb) {
        var idbList = null, idbCur = null, idbDone = false;
        var lsList = null, lsCur = null, lsDone = false;
        function settle() {
            if (!idbDone || !lsDone) return;
            var idbN = idbList ? idbList.length : 0;
            var lsN = lsList ? lsList.length : 0;
            // 优先用数量更多的源；若数量相同则 IndexedDB 优先
            var useIDB = idbN > 0 && (lsN === 0 || idbN >= lsN);
            var chosen = useIDB ? idbList : (lsList || []);
            var cur = useIDB ? idbCur : lsCur;
            cb(chosen, cur);
        }
        openBgDB(function (db) {
            if (!db) { idbList = []; idbCur = null; idbDone = true; settle(); return; }
            try {
                var tx = db.transaction(BG_DB_STORE, 'readonly');
                var store = tx.objectStore(BG_DB_STORE);
                var out = [];
                var metaId = null;
                var req = store.openCursor();
                req.onsuccess = function (ev) {
                    var cur = ev.target.result;
                    if (cur) {
                        if (cur.value && cur.value.id === BG_META_ID) metaId = cur.value.currentId;
                        else if (cur.value && cur.value.dataURL) {
                            var tp = cur.value.type;
                            if (tp !== 'video' && tp !== 'image') tp = (cur.value.dataURL.indexOf('data:video/') === 0) ? 'video' : 'image';
                            out.push({ id: cur.value.id, dataURL: cur.value.dataURL, type: tp });
                        }
                        cur.continue();
                    } else { idbList = out; idbCur = metaId; idbDone = true; settle(); }
                };
                req.onerror = function () { idbList = []; idbCur = null; idbDone = true; settle(); };
            } catch (e) { idbList = []; idbCur = null; idbDone = true; settle(); }
        });
        loadBgLS(function (list, currentId) { lsList = list || []; lsCur = currentId; lsDone = true; settle(); });
    }
    // 持久化整个背景列表 + 当前选中：始终写 localStorage 兜底，并写 IndexedDB（大文件）
    // IndexedDB 写入改用「先 clear()（独立事务），其 oncomplete 后再开新事务 put」的规范写法，
    // 彻底排除「clear 与 put 同一事务」在某些浏览器下的竞态（只落部分记录）。
    function saveBgList() {
        persistBgLS(bgImages, bgCurrentId);   // 先兜底，保证任何环境都不丢
        openBgDB(function (db) {
            if (!db) { console.warn('[Yu_ToolBox] IndexedDB 不可用，已回退 localStorage 兜底'); return; }
            try {
                var tx1 = db.transaction(BG_DB_STORE, 'readwrite');
                tx1.objectStore(BG_DB_STORE).clear();
                tx1.onerror = function (e) { console.error('[Yu_ToolBox] 清空背景失败', e); };
                tx1.oncomplete = function () {
                    try {
                        var tx2 = db.transaction(BG_DB_STORE, 'readwrite');
                        var s2 = tx2.objectStore(BG_DB_STORE);
                        bgImages.forEach(function (img) {
                            s2.put({ id: img.id, type: img.type === 'video' ? 'video' : 'image', dataURL: img.dataURL });
                        });
                        s2.put({ id: BG_META_ID, currentId: bgCurrentId });
                        tx2.onerror = function (e) { console.error('[Yu_ToolBox] 保存背景到 IndexedDB 失败', e); };
                        tx2.onabort = function (e) { console.error('[Yu_ToolBox] 保存背景事务被中止', e); };
                    } catch (e) { console.error('[Yu_ToolBox] 保存背景失败', e); }
                };
            } catch (e) { console.error('[Yu_ToolBox] 保存背景失败', e); }
        });
    }

    // 把 dataURL 转成 Blob（视频用 URL.createObjectURL 播放，避免 url() 不支持）
    function dataURLtoBlob(dataURL) {
        var parts = String(dataURL).split(',');
        var mimeMatch = parts[0].match(/:(.*?);/);
        var mime = mimeMatch ? mimeMatch[1] : 'video/mp4';
        var bstr = atob(parts[1] || '');
        var n = bstr.length;
        var u8 = new Uint8Array(n);
        for (var i = 0; i < n; i++) u8[i] = bstr.charCodeAt(i);
        return new Blob([u8], { type: mime });
    }
    // 取背景层（懒创建）；并取/建其内的视频元素
    function getBgLayer() {
        var layer = document.getElementById('pageBgLayer');
        if (!layer) {
            layer = document.createElement('div');
            layer.id = 'pageBgLayer';
            document.body.appendChild(layer);
        }
        return layer;
    }
    function getBgVideo(layer) {
        var v = layer.querySelector('video.page-bg-video');
        if (!v) {
            v = document.createElement('video');
            v.className = 'page-bg-video';
            v.muted = true;
            v.loop = true;
            v.autoplay = true;
            v.playsInline = true;
            v.setAttribute('playsinline', '');
            v.setAttribute('muted', '');
            layer.insertBefore(v, layer.firstChild);
        }
        return v;
    }
    // 解析当前背景项为可用的展示 URL：图片直接用 dataURL，视频转 objectURL（带缓存避免重复创建）
    function resolveBgUrl(item) {
        if (!item) return '';
        if (item.type === 'video') {
            if (!item._url) item._url = URL.createObjectURL(dataURLtoBlob(item.dataURL));
            return item._url;
        }
        return item.dataURL;
    }

    function applyAppearance(a) {
        if (!a) return;
        // 卡片背景不透明度（alpha）→ CSS 变量；模糊度 → CSS 变量
        // 雾面效果需要卡片半透明，backdrop-filter 才能糊化背后的内容；
        // 因此开启模糊时若 alpha 仍为 1（不透明），自动降到 0.82，保证雾面可见
        var alpha = a.opacity / 100;
        if (a.blur > 0 && alpha >= 1) alpha = 0.82;
        document.documentElement.style.setProperty('--tool-card-alpha', String(alpha));
        document.documentElement.style.setProperty('--tool-card-blur', a.blur + 'px');
        // 悬停态独立外观：鼠标移到卡片上时使用（聚焦高亮）；同样在开启模糊且 alpha=1 时自动降到 0.82 保证雾面可见
        var hAlpha = (typeof a.opacityHover === 'number') ? a.opacityHover / 100 : alpha;
        var hBlur = (typeof a.blurHover === 'number') ? a.blurHover : a.blur;
        if (hBlur > 0 && hAlpha >= 1) hAlpha = 0.82;
        document.documentElement.style.setProperty('--tool-card-alpha-hover', String(hAlpha));
        document.documentElement.style.setProperty('--tool-card-blur-hover', hBlur + 'px');
        // 页面背景压暗层透明度：bgClarity 越高背景越通透（压暗越少）。颜色由主题决定，这里只控百分比
        var clarity = (typeof a.bgClarity === 'number') ? a.bgClarity : 70;
        var dimPct = 100 - clarity;
        document.documentElement.style.setProperty('--page-bg-dim', dimPct + '%');
        // 页面背景 → 独立全屏层（图片用 backgroundImage，视频用 <video> 元素，避免与主题脚本的 body 背景互相覆盖）
        var bgLayer = getBgLayer();
        var vid = getBgVideo(bgLayer);
        var cur = bgImages.filter(function (x) { return x.id === bgCurrentId; })[0];
        if (cur && cur.type === 'video') {
            var vurl = resolveBgUrl(cur);
            if (vid.getAttribute('src') !== vurl) vid.setAttribute('src', vurl);
            bgLayer.style.backgroundImage = '';
            bgLayer.classList.add('show');
            var p = vid.play && vid.play();
            if (p && p.catch) p.catch(function () {});
        } else if (cur) {
            bgLayer.style.backgroundImage = 'url("' + cur.dataURL + '")';
            bgLayer.classList.add('show');
            vid.removeAttribute('src');
            if (vid.pause) vid.pause();
        } else {
            bgLayer.style.backgroundImage = '';
            bgLayer.classList.remove('show');
            vid.removeAttribute('src');
            if (vid.pause) vid.pause();
        }
    }
    // 透明度/模糊度（小）存 localStorage；背景图列表（大）存 IndexedDB
    function saveAppearance(a) {
        try {
            localStorage.setItem(APPEAR_KEY, JSON.stringify({ opacity: a.opacity, blur: a.blur, bgClarity: a.bgClarity, opacityHover: a.opacityHover, blurHover: a.blurHover }));
        } catch (e) {}
        saveBgList();
    }
    // 当前（未保存）外观草稿：appearDraft 已在上方声明并初始化；
    // 透明度/模糊度在打开/初始化时由 loadAppearance() 同步填入，背景图列表由 loadBgList() 异步填入

    // 页面加载时应用已保存的外观（此处 appearDraft 已赋值，避免初始化顺序导致的崩溃）
    loadAppearance();              // 同步载入透明度/模糊度到 appearDraft
    loadBgList(function (list, currentId) {  // 异步载入背景图列表（IndexedDB，支持多张大图）
        bgImages = list || [];
        bgCurrentId = (currentId && bgImages.some(function (x) { return x.id === currentId; })) ? currentId : (bgImages[0] ? bgImages[0].id : null);
        var cur = bgImages.filter(function (x) { return x.id === bgCurrentId; })[0];
        appearDraft.bg = cur ? cur.dataURL : '';
        bgLoaded = true;   // 首次（页面加载）加载完成，之后打开设置不再用存储覆盖内存
        applyAppearance(appearDraft);
        if (engineOverlay && engineOverlay.classList.contains('active')) renderBgGrid();
    });

    // 双语提示：把 "{n}" 占位符替换为实际数字，遵循项目规范用 I18N.t 取文案
    function bgMsg(key, n) {
        var s = I18N.t(key);
        return s ? String(s).replace('{n}', n) : '';
    }
    // 更新「已选 N / 9」计数显示，并在达上限时高亮
    function updateBgCount() {
        if (!pageBgCount) return;
        var n = bgImages.length;
        pageBgCount.textContent = bgMsg('index.appear.bgCount', n);
        if (n >= MAX_BG_ITEMS) pageBgCount.classList.add('full');
        else pageBgCount.classList.remove('full');
    }
    // 短暂提示（已达上限 / 文件被忽略）：显示在计数下方的提示条，3 秒后淡出
    var bgNoticeTimer = null;
    function showBgNotice(msg) {
        if (!pageBgNotice) return;
        pageBgNotice.textContent = msg;
        pageBgNotice.classList.add('show');
        if (bgNoticeTimer) clearTimeout(bgNoticeTimer);
        bgNoticeTimer = setTimeout(function () { pageBgNotice.classList.remove('show'); }, 3000);
    }
    // 配置备份：导出 / 导入整站所有配置（localStorage 全部键 + IndexedDB 背景库），覆盖主页与全部工具页
    var configExportBtn = document.getElementById('configExportBtn');
    var configImportBtn = document.getElementById('configImportBtn');
    var configImportInput = document.getElementById('configImportInput');
    var configNotice = document.getElementById('configNotice');
    var configNoticeTimer = null;
    function showConfigNotice(msg) {
        if (!configNotice) return;
        configNotice.textContent = msg;
        configNotice.classList.add('show');
        if (configNoticeTimer) clearTimeout(configNoticeTimer);
        configNoticeTimer = setTimeout(function () { configNotice.classList.remove('show'); }, 3000);
    }
    // 读取 IndexedDB 背景库的全部记录（含 __meta__）
    function readBgStore(cb) {
        openBgDB(function (db) {
            if (!db) { cb([]); return; }
            try {
                var tx = db.transaction(BG_DB_STORE, 'readonly');
                var store = tx.objectStore(BG_DB_STORE);
                var out = [];
                var req = store.openCursor();
                req.onsuccess = function (ev) {
                    var cur = ev.target.result;
                    if (cur) { out.push(cur.value); cur.continue(); }
                    else cb(out);
                };
                req.onerror = function () { cb([]); };
            } catch (e) { cb([]); }
        });
    }
    // 覆盖写入 IndexedDB 背景库（先 clear 再逐条 put）
    function writeBgStore(records, cb) {
        cb = cb || function () {};
        openBgDB(function (db) {
            if (!db) { cb(); return; }
            try {
                var tx = db.transaction(BG_DB_STORE, 'readwrite');
                tx.objectStore(BG_DB_STORE).clear();
                tx.oncomplete = function () {
                    try {
                        var tx2 = db.transaction(BG_DB_STORE, 'readwrite');
                        records.forEach(function (r) { tx2.objectStore(BG_DB_STORE).put(r); });
                        tx2.oncomplete = function () { cb(); };
                        tx2.onerror = function () { cb(); };
                    } catch (e) { cb(); }
                };
                tx.onerror = function () { cb(); };
            } catch (e) { cb(); }
        });
    }
    // 把「原始 IndexedDB 记录（含 __meta__）」转换为规范化的 {list, currentId}
    function bgRecordsToPayload(records) {
        var list = [];
        var currentId = null;
        (records || []).forEach(function (r) {
            if (r && r.id === BG_META_ID) currentId = r.currentId;
            else if (r && r.dataURL) list.push({ id: r.id, type: r.type === 'video' ? 'video' : 'image', dataURL: r.dataURL });
        });
        return { list: list, currentId: currentId };
    }
    // 把规范化的 {list, currentId} 还原成 IndexedDB 记录数组（含 __meta__）
    function bgPayloadToRecords(payload) {
        var recs = (payload && payload.list || []).map(function (i) {
            return { id: i.id, type: i.type === 'video' ? 'video' : 'image', dataURL: i.dataURL };
        });
        if (payload && payload.currentId) recs.push({ id: BG_META_ID, currentId: payload.currentId });
        return recs;
    }
    // ---- 配置导出/导入：压缩包（zip）方式，背景拆真实媒体、每个卡片独立文件 ----
    // 精选映射：仅列出「确有独立持久配置」的工具；其余无落盘的工具不生成卡片文件。
    // 通用/共享键（SPLIT_KEY、MAIN_H_KEY、STORAGE_KEY 等）归入 site；全量兜底见 _raw/。
    var TOOL_CONFIG = {
        'serialPortTool': ['serial_cmds2', 'auto_reply_rules'],
        'HttpTool':       ['http_cmds', 'http_history'],
        'ModbusRTU':      ['modbus_cmds'],
        'MaterialManager':['STORAGE_KEY'],
        'MermaidDraw':    ['flowchart-main-h', 'MAIN_H_KEY']
    };
    var SITE_KEYS = ['toolbox-theme', 'toolbox-lang', 'toolbox-unit', 'toolbox-cat-collapsed-web',
        'toolbox-nav-collapsed', 'ENGINE_KEY', 'FAV_KEY', 'APPEAR_KEY',
        'SLIDE_KEY', 'MAIN_H_KEY', 'STORAGE_KEY', 'SPLIT_KEY', '__hw_test__'];
    function isCatCollapse(k) { return String(k).indexOf('toolbox-cat-collapsed-') === 0; }
    function toBytes(s) { return new TextEncoder().encode(s); }
    function tsStamp() { return new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-'); }
    function downloadBlob(blob, name) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.download = name; a.href = url;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }
    // dataURL → {mime, bytes}（用于把背景拆成真实媒体文件）
    function dataURLToBytes(dataURL) {
        var s = String(dataURL);
        var comma = s.indexOf(',');
        var m = s.slice(0, comma).match(/data:([^;]+)/);
        var mime = m ? m[1] : 'application/octet-stream';
        var bin = atob(s.slice(comma + 1));
        var bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return { mime: mime, bytes: bytes };
    }
    // bytes + mime → dataURL（导入时由媒体文件重建背景）
    function bytesToDataURL(mime, bytes) {
        var bin = '', chunk = 0x8000;
        for (var i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
        return 'data:' + mime + ';base64,' + btoa(bin);
    }
    function extForMime(mime, type) {
        var map = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/webp': 'webp',
            'image/gif': 'gif', 'image/bmp': 'bmp', 'video/mp4': 'mp4', 'video/webm': 'webm', 'video/ogg': 'ogv' };
        return map[mime] || (type === 'video' ? 'mp4' : 'png');
    }

    // 导出：构建结构化 zip（manifest + 背景媒体 + 各卡片 + 站点 + 全量兜底）
    // 背景直接用内存中「当前显示」的 bgImages / bgCurrentId：
    // 它始终与界面一致（页面加载时由 loadBgList 填充、上传/删除时实时更新），
    // 不再二次读存储，避免「背景仅存在于内存、尚未落盘（如大视频超配额）」时被漏导出。
    function exportConfig() {
        var all = {};
        for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); all[k] = localStorage.getItem(k); }
        var recs = bgImages.map(function (img) {
            return { id: img.id, type: img.type === 'video' ? 'video' : 'image', dataURL: img.dataURL };
        });
        if (bgCurrentId) recs.push({ id: BG_META_ID, currentId: bgCurrentId });
        finishExportZip(all, recs);
    }
    function finishExportZip(all, bgRecs) {
        var ts = tsStamp();
        var fallback = function () {
            var data = { meta: { app: 'Yu_ToolBox', version: 2, exportedAt: new Date().toISOString() }, localStorage: all, indexedDB: {}, background: bgRecordsToPayload(bgRecs) };
            data.indexedDB[BG_DB_NAME] = bgRecs;
            downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), 'yu-toolbox-config-' + ts + '.json');
            showConfigNotice(I18N.t('index.config.exportDone') || '配置已导出');
        };
        if (!window.ZipUtil) { fallback(); return; }
        var bgPayload = bgRecordsToPayload(bgRecs);
        var files = [];
        files.push({ name: 'manifest.json', data: toBytes(JSON.stringify({
            app: 'Yu_ToolBox', version: 2, exportedAt: new Date().toISOString()
        }, null, 2)) });
        // 背景：拆成真实媒体文件 + 索引 json
        var mediaMeta = [];
        (bgPayload.list || []).forEach(function (it) {
            var info = dataURLToBytes(it.dataURL);
            var ext = extForMime(info.mime, it.type);
            var fname = 'background/media/' + it.id + '.' + ext;
            files.push({ name: fname, data: info.bytes });
            mediaMeta.push({ id: it.id, type: it.type, mime: info.mime, file: fname });
        });
        files.push({ name: 'background/background.json', data: toBytes(JSON.stringify({ currentId: bgPayload.currentId, media: mediaMeta }, null, 2)) });
        // 卡片：每个工具独立一个 json
        Object.keys(TOOL_CONFIG).forEach(function (tool) {
            var cfg = {}; var has = false;
            TOOL_CONFIG[tool].forEach(function (key) { if (Object.prototype.hasOwnProperty.call(all, key)) { cfg[key] = all[key]; has = true; } });
            if (has) files.push({ name: 'cards/' + tool + '.json', data: toBytes(JSON.stringify(cfg, null, 2)) });
        });
        // 站点（主页）配置
        var site = {};
        Object.keys(all).forEach(function (k) {
            if (k === BG_LS_KEY) return;
            if (SITE_KEYS.indexOf(k) >= 0 || isCatCollapse(k)) site[k] = all[k];
        });
        files.push({ name: 'site/site.json', data: toBytes(JSON.stringify(site, null, 2)) });
        // 全量兜底（保证导入时不遗漏任何键）
        files.push({ name: '_raw/localStorage.json', data: toBytes(JSON.stringify(all, null, 2)) });
        files.push({ name: '_raw/background-raw.json', data: toBytes(JSON.stringify({ indexedDB: bgRecs }, null, 2)) });

        ZipUtil.createZip(files).then(function (blob) {
            downloadBlob(blob, 'yu-toolbox-config-' + ts + '.zip');
            showConfigNotice(I18N.t('index.config.exportDone') || '配置已导出为压缩包');
        }).catch(function () { fallback(); });
    }
    // 导入：检测 zip 魔数 → 解析压缩包；否则按旧版 JSON 处理（兼容旧备份）
    function importConfig(file) {
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (ev) {
            var buf = ev.target.result;   // ArrayBuffer
            var dv = new DataView(buf);
            var isZip = buf.byteLength >= 4 && dv.getUint32(0, true) === 0x04034b50;
            if (isZip) { importZip(buf); return; }
            var text; try { text = new TextDecoder().decode(new Uint8Array(buf)); } catch (e) { text = ''; }
            var data; try { data = JSON.parse(text); } catch (e) { showConfigNotice(I18N.t('index.config.importError') || '导入失败'); return; }
            importLegacyConfig(data);
        };
        reader.readAsArrayBuffer(file);
    }
    function importLegacyConfig(data) {
        if (!data || typeof data.localStorage !== 'object') { showConfigNotice(I18N.t('index.config.importInvalid') || '文件格式不正确'); return; }
        if (!window.confirm(I18N.t('index.config.importConfirm') || '导入将覆盖当前所有配置，确定继续？')) return;
        Object.keys(data.localStorage).forEach(function (k) { try { localStorage.setItem(k, data.localStorage[k]); } catch (e) {} });
        var idbRecs = (data.indexedDB && data.indexedDB[BG_DB_NAME]) || [];
        var payload = (data.background && data.background.list) ? data.background : bgRecordsToPayload(idbRecs);
        var records = idbRecs.length ? idbRecs : bgPayloadToRecords(payload);
        try { persistBgLS(payload.list || [], payload.currentId || null); } catch (e) {}
        writeBgStore(records, function () {
            showConfigNotice(I18N.t('index.config.importDone') || '配置已导入，正在重新加载…');
            setTimeout(function () { location.reload(); }, 600);
        });
    }
    function importZip(buf) {
        if (!window.ZipUtil) { showConfigNotice(I18N.t('index.config.importZipError') || '压缩组件缺失'); return; }
        ZipUtil.parseZip(buf).then(function (entries) {
            var map = {}; entries.forEach(function (e) { map[e.name] = e.bytes; });
            if (!window.confirm(I18N.t('index.config.importConfirm') || '导入将覆盖当前所有配置，确定继续？')) return;
            // ① 全量兜底恢复（保证完整，不被精选映射遗漏）
            var raw = map['_raw/localStorage.json'];
            if (raw) {
                try {
                    var obj = JSON.parse(new TextDecoder().decode(raw));
                    Object.keys(obj).forEach(function (k) { try { localStorage.setItem(k, obj[k]); } catch (e) {} });
                } catch (e) {}
            }
            // ② 背景：由 media 重建 dataURL → 写回 IndexedDB（主，可存大文件/视频）+ localStorage 兜底
            //    关键修复：必须等 IndexedDB 真正写完再 reload，否则大视频写入未完成就被刷新打断而丢失。
            var doReload = function () {
                showConfigNotice(I18N.t('index.config.importDone') || '配置已导入，正在重新加载…');
                setTimeout(function () { location.reload(); }, 300);
            };
            var bgJson = map['background/background.json'];
            if (bgJson) {
                try {
                    var bg = JSON.parse(new TextDecoder().decode(bgJson));
                    var list = (bg.media || []).map(function (m) {
                        var mb = map[m.file]; if (!mb) return null;
                        try { return { id: m.id, type: m.type, dataURL: bytesToDataURL(m.mime, mb) }; } catch (e) { return null; }
                    }).filter(Boolean);
                    var payload = { list: list, currentId: bg.currentId };
                    try { persistBgLS(payload.list, payload.currentId); } catch (e) {}  // 兜底；大文件会超配额被忽略，以 IndexedDB 为准
                    writeBgStore(bgPayloadToRecords(payload), function () { doReload(); });
                } catch (e) { doReload(); }
            } else {
                doReload();
            }
        }).catch(function () {
            showConfigNotice(I18N.t('index.config.importZipError') || '压缩包解析失败，请确认文件完整');
        });
    }
    if (configExportBtn) {
        configExportBtn.addEventListener('click', function (e) {
            e.preventDefault();
            exportConfig();
        });
    }
    if (configImportBtn && configImportInput) {
        configImportBtn.addEventListener('click', function (e) {
            e.preventDefault();
            configImportInput.value = '';   // 允许重复选择同一文件
            configImportInput.click();
        });
        configImportInput.addEventListener('change', function () {
            var f = configImportInput.files && configImportInput.files[0];
            if (f) importConfig(f);
        });
    }
    // 渲染背景缩略图网格（图片用背景图，视频用 <video> 预览；点击切换当前背景）
    function renderBgGrid() {
        if (!pageBgGrid) return;
        pageBgGrid.innerHTML = '';
        bgImages.forEach(function (img) {
            var t;
            if (img.type === 'video') {
                t = document.createElement('div');
                t.className = 'engine-bg-thumb engine-bg-video' + (img.id === bgCurrentId ? ' active' : '');
                var vt = document.createElement('video');
                vt.src = img.dataURL;
                vt.muted = true;
                vt.loop = true;
                vt.autoplay = true;
                vt.playsInline = true;
                vt.setAttribute('muted', '');
                vt.setAttribute('autoplay', '');
                vt.setAttribute('loop', '');
                vt.setAttribute('playsinline', '');
                vt.preload = 'auto';
                t.appendChild(vt);
            } else {
                t = document.createElement('div');
                t.className = 'engine-bg-thumb' + (img.id === bgCurrentId ? ' active' : '');
                t.style.backgroundImage = 'url("' + img.dataURL + '")';
            }
            t.title = '点击设为背景';
            t.addEventListener('click', function () {
                bgCurrentId = img.id;
                var cur = bgImages.filter(function (x) { return x.id === bgCurrentId; })[0];
                appearDraft.bg = cur ? cur.dataURL : '';
                applyAppearance(appearDraft);
                renderBgGrid();
            });
            // 单个背景删除按钮（右上角 ✕）：只删当前这一项，不是全部清除
            var del = document.createElement('button');
            del.type = 'button';
            del.className = 'engine-bg-del';
            del.textContent = '✕';
            del.title = I18N.t('index.appear.bgDelete') || '删除';
            del.setAttribute('aria-label', del.title);
            del.addEventListener('click', function (e) {
                e.stopPropagation();   // 阻止冒泡到缩略图（否则会先被设为背景）
                bgImages = bgImages.filter(function (x) { return x.id !== img.id; });
                if (bgCurrentId === img.id) {
                    bgCurrentId = bgImages.length ? bgImages[0].id : null;
                }
                var cur = bgImages.filter(function (x) { return x.id === bgCurrentId; })[0];
                appearDraft.bg = cur ? cur.dataURL : '';
                saveBgList();                 // 立即持久化
                syncAppearanceUI();           // 重渲染网格 + 刷新计数
                applyAppearance(appearDraft);
            });
            t.appendChild(del);
            pageBgGrid.appendChild(t);
        });
    }

    function syncAppearanceUI() {
        // 本地文件模式（file://）提示：背景依赖 IndexedDB + localStorage 兜底，
        // 而 file:// 下 IndexedDB 通常被禁用、且背景体积易超 localStorage 配额，故背景刷新可能丢失。
        if (bgFileModeTip) {
            if (location.protocol === 'file:') {
                bgFileModeTip.textContent = I18N.t('index.appear.bgFileModeTip') || '';
                bgFileModeTip.style.display = '';
            } else {
                bgFileModeTip.style.display = 'none';
            }
        }
        if (cardOpacity) {
            cardOpacity.value = String(appearDraft.opacity);
            if (cardOpacityVal) cardOpacityVal.textContent = appearDraft.opacity + '%';
        }
        if (cardBlur) {
            cardBlur.value = String(appearDraft.blur);
            if (cardBlurVal) cardBlurVal.textContent = appearDraft.blur + 'px';
        }
        if (cardOpacityHover) {
            cardOpacityHover.value = String(appearDraft.opacityHover);
            if (cardOpacityHoverVal) cardOpacityHoverVal.textContent = appearDraft.opacityHover + '%';
        }
        if (cardBlurHover) {
            cardBlurHover.value = String(appearDraft.blurHover);
            if (cardBlurHoverVal) cardBlurHoverVal.textContent = appearDraft.blurHover + 'px';
        }
        if (pageBgDim) {
            pageBgDim.value = String(appearDraft.bgClarity);
            if (pageBgDimVal) pageBgDimVal.textContent = appearDraft.bgClarity + '%';
        }
        renderBgGrid();
        updateBgCount();
        if (pageBgInput) pageBgInput.value = '';
    }
    // 实时预览：拖动滑块立即反映到页面
    if (cardOpacity) {
        cardOpacity.addEventListener('input', function () {
            var v = parseInt(cardOpacity.value, 10);
            appearDraft.opacity = isNaN(v) ? 100 : v;
            if (cardOpacityVal) cardOpacityVal.textContent = appearDraft.opacity + '%';
            applyAppearance(appearDraft);
        });
    }
    if (cardBlur) {
        cardBlur.addEventListener('input', function () {
            appearDraft.blur = parseInt(cardBlur.value, 10) || 0;
            if (cardBlurVal) cardBlurVal.textContent = appearDraft.blur + 'px';
            applyAppearance(appearDraft);
        });
    }
    // 悬停态卡片透明度（鼠标移到卡片上时使用）
    if (cardOpacityHover) {
        cardOpacityHover.addEventListener('input', function () {
            var v = parseInt(cardOpacityHover.value, 10);
            appearDraft.opacityHover = isNaN(v) ? 100 : v;
            if (cardOpacityHoverVal) cardOpacityHoverVal.textContent = appearDraft.opacityHover + '%';
            applyAppearance(appearDraft);
        });
    }
    // 悬停态卡片模糊度（鼠标移到卡片上时使用）
    if (cardBlurHover) {
        cardBlurHover.addEventListener('input', function () {
            appearDraft.blurHover = parseInt(cardBlurHover.value, 10) || 0;
            if (cardBlurHoverVal) cardBlurHoverVal.textContent = appearDraft.blurHover + 'px';
            applyAppearance(appearDraft);
        });
    }
    // 页面背景通透度（控制压暗层透明度，与卡片透明度互不影响）
    if (pageBgDim) {
        pageBgDim.addEventListener('input', function () {
            appearDraft.bgClarity = parseInt(pageBgDim.value, 10) || 0;
            if (pageBgDimVal) pageBgDimVal.textContent = appearDraft.bgClarity + '%';
            applyAppearance(appearDraft);
        });
    }
    // 上传背景图（可多选）→ 逐张转 dataURL 加入列表，最后一张自动设为当前并立即持久化
    // 限制：图片 + 视频合计最多 MAX_BG_ITEMS（9）个；超出部分被忽略并提示
    if (pageBgInput) {
        pageBgInput.addEventListener('change', function () {
            var files = pageBgInput.files;
            if (!files || !files.length) return;
            // 先复制文件列表到普通数组，再清空 value：input.files 是实时引用，
            // 一旦清空 FileList 会立即变空，必须在复制之后再 value=''
            var slice = Array.prototype.slice.call(files, 0);
            pageBgInput.value = '';   // 允许重复选择同一文件
            // 只保留图片 / 视频类型
            var media = slice.filter(function (file) {
                var t = file.type || '';
                return t.indexOf('video/') === 0 || t.indexOf('image/') === 0;
            });
            var remaining = MAX_BG_ITEMS - bgImages.length;   // 当前还能再加入的数量
            if (remaining <= 0) {
                if (media.length) showBgNotice(bgMsg('index.appear.bgFull', media.length));
                updateBgCount();
                return;
            }
            var allowed = media.slice(0, remaining);          // 本次实际能加入的文件
            var overLimit = media.length - allowed.length;    // 因达上限被忽略的数量
            if (overLimit > 0) showBgNotice(bgMsg('index.appear.bgSkipped', overLimit));
            if (!allowed.length) { updateBgCount(); return; }
            var pending = allowed.length;
            allowed.forEach(function (file) {
                var isVideo = file.type && file.type.indexOf('video/') === 0;
                var reader = new FileReader();
                reader.onload = function (ev) {
                    var id = 'bg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
                    bgImages.push({ id: id, type: isVideo ? 'video' : 'image', dataURL: ev.target.result });
                    bgCurrentId = id;
                    if (--pending === 0) finish();
                };
                reader.onerror = function () { if (--pending === 0) finish(); };
                reader.readAsDataURL(file);
            });
            function finish() {
                var cur = bgImages.filter(function (x) { return x.id === bgCurrentId; })[0];
                appearDraft.bg = cur ? cur.dataURL : '';
                saveBgList();                 // 立即持久化，重开弹窗/刷新都不丢
                syncAppearanceUI();
                applyAppearance(appearDraft);
            }
        });
    }
    if (pageBgClear) {
        pageBgClear.addEventListener('click', function () {
            bgImages = [];
            bgCurrentId = null;
            appearDraft.bg = '';
            saveBgList();                     // 同步清除持久化
            syncAppearanceUI();
            applyAppearance(appearDraft);
            renderBgGrid();
        });
    }

    // 返回顶部（滚动超过一屏后显示）
    function onScroll() {
        if (!fabTop) return;
        if (window.scrollY > 300) fabTop.classList.add('show');
        else fabTop.classList.remove('show');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (fabTop) {
        fabTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 保存 / 恢复默认
    function saveEngine() {
        if (!engineSelect) return;
        setEngineUrl(engineSelect.value);
        saveAppearance(appearDraft);
        applyAppearance(appearDraft);
        updateSearchTip();
        if (engineOverlay) engineOverlay.classList.remove('active');
    }

    // 打开 / 关闭设置弹窗
    if (fabSettings && engineOverlay) {
        fabSettings.addEventListener('click', function () {
            // 重建下拉（含自定义引擎）并选中当前引擎；刷新自定义列表
            renderEngineOptions();
            renderCustomEngineList();
            appearDraft.opacity = (typeof appearDraft.opacity === 'number') ? appearDraft.opacity : 100;
            appearDraft.blur = (typeof appearDraft.blur === 'number') ? appearDraft.blur : 0;
            // 透明/模糊度以小数据 localStorage 为准；背景图保留内存中当前值（避免被覆盖丢失）
            loadAppearance();
            // 背景图：页面加载时已完成首次读取（bgLoaded=true），内存列表即权威，
            // 打开设置时**不再用存储快照覆盖**，否则延迟回调会清掉本次会话刚上传的数据。
            function renderBgUI() {
                var c = bgImages.filter(function (x) { return x.id === bgCurrentId; })[0];
                appearDraft.bg = c ? c.dataURL : '';
                applyAppearance(appearDraft);
                syncAppearanceUI();
                renderBgGrid();
            }
            if (!bgLoaded) {
                // 极少数情况：首次打开设置时页面加载的读取尚未完成，等其完成再渲染
                loadBgList(function (list, currentId) {
                    bgImages = list || [];
                    bgCurrentId = (currentId && bgImages.some(function (x) { return x.id === currentId; })) ? currentId : (bgImages[0] ? bgImages[0].id : null);
                    renderBgUI();
                });
            } else {
                renderBgUI();
            }
            engineOverlay.classList.add('active');
        });
    }
    if (engineSave) engineSave.addEventListener('click', saveEngine);
    if (engineReset) {
        engineReset.addEventListener('click', function () {
            setEngineUrl(ENGINES[DEFAULT_ENGINE]);
            appearDraft = { bg: '', opacity: 100, blur: 0, bgClarity: 70, opacityHover: 100, blurHover: 0 };
            bgImages = [];
            bgCurrentId = null;
            saveAppearance(appearDraft);
            applyAppearance(appearDraft);
            updateBgCount();
            renderBgGrid();
            if (engineOverlay) engineOverlay.classList.remove('active');
        });
    }
    if (engineCancel) {
        engineCancel.addEventListener('click', function () {
            if (engineOverlay) engineOverlay.classList.remove('active');
        });
    }
    if (engineOverlay) {
        engineOverlay.addEventListener('click', function (e) {
            if (e.target === engineOverlay) engineOverlay.classList.remove('active');
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && engineOverlay && engineOverlay.classList.contains('active')) {
            engineOverlay.classList.remove('active');
        }
    });

    // 语言切换时刷新搜索页提示与背景计数文案
    document.addEventListener('languagechange', updateSearchTip);
    document.addEventListener('languagechange', updateBgCount);
    // 语言切换时同步自定义引擎列表的文案（空占位 / 删除按钮 title）
    document.addEventListener('languagechange', function () {
        renderCustomEngineList();
    });

    // 添加自定义搜索引擎
    if (customEngineAdd) customEngineAdd.addEventListener('click', addCustomEngine);
    // 回车快捷添加（名称或地址框内回车即添加）
    if (customEngineName) customEngineName.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); addCustomEngine(); } });
    if (customEngineUrl) customEngineUrl.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); addCustomEngine(); } });

    // 初次进入即渲染下拉与自定义列表（保证搜索页提示、弹窗内容正确）
    renderEngineOptions();
    renderCustomEngineList();

    })();
