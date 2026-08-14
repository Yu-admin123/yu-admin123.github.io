// ============================================================
//  index.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性使用）
// ============================================================
window.I18N_STRINGS = {
    'index.cat.all':        { zh: '全部',   en: 'All' },
    'index.cat.debug':      { zh: '调试',   en: 'Debug' },
    'index.cat.hardware':   { zh: '硬件',   en: 'Hardware' },
    'index.cat.software':   { zh: '软件',   en: 'Software' },
    'index.cat.other':      { zh: '其他',   en: 'Other' },
    'index.search.placeholder': { zh: '搜索工具...', en: 'Search tools...' },
    'index.lang.title':     { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'index.theme.title':    { zh: '切换主题', en: 'Toggle theme' },
    'index.hero.desc':      { zh: '专为嵌入式开发者打造的在线工具集合。一站式解决开发中的高频需求。', en: 'An online toolset built for embedded developers. One-stop solution for high-frequency needs.' },
    'index.hero.join':      { zh: '加入交流群：453705020', en: 'Join QQ Group: 453705020' },
    'index.footer.line1':   { zh: '嵌入式开发者工具箱', en: 'Embedded Developer Toolbox' },
    'index.footer.line2':   { zh: '一站式解决开发中的高频需求 · 欢迎加入技术交流群：', en: 'One-stop solution for high-frequency needs · Join our tech group: ' },
    'index.empty.text':     { zh: '没有找到匹配的工具，试试其他关键词或分类？', en: 'No matching tools found. Try other keywords or categories?' }
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
    desc: '可自定义波特率 · 实时数据曲线 · 脚本自动回复。', descEn: 'Customizable baud rate · real-time data curves · script auto-reply.',
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
    desc: '支持ModbusRTU主站 从站操作。', descEn: 'Supports Modbus RTU master / slave operations.',
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
    desc: '支持 ws / wss 协议 · 文本 / 十六进制收发 · 消息日志 · 自动重连。', descEn: 'ws / wss protocols · text / hex send-receive · message log · auto-reconnect.',
    icon: '🔌',
    iconClass: 'icon-blue',
    url: './function/WebsocketTool.html',
    tagAccent: [true, false, false],
    category: 'WebSocket/通讯/网络/调试', categoryEn: 'WebSocket/Comm/Network/Debug',
    categoryType: 'debug',
    isNew: false
},{
    id: 'CanBusTool',
    title: 'CAN 总线助手', titleEn: 'CAN Bus Helper',
    desc: '支持 J1939 拆解、DBC 解析、信号解码、反向计算。', descEn: 'J1939 disassembly, DBC parsing, signal decoding, reverse calculation.',
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
    desc: '支持多种颜色格式的互转、取模与数组渲染，含多种扫描方向与 Floyd 抖动。', descEn: 'Multi-format color conversion, data extraction & array rendering, multiple scan orders & Floyd dithering.',
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
    desc: '选择电池估算设备工作时长（天/周/月）。', descEn: 'Estimate device runtime from battery capacity (days/weeks/months).',
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
    desc: '支持 CRC-8/16/32/64 多种算法。', descEn: 'Supports CRC-8/16/32/64 multiple algorithms.',
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
    desc: '进制实时互转 · 位操作 · 浮点数转换。', descEn: 'Real-time radix conversion · bitwise ops · floating-point conversion.',
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
    desc: '信号绘图、FFT 变换与数字滤波分析工具', descEn: 'Signal plotting, FFT transform & digital filter analysis.',
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
    id: 'TextDiffMerge',
    title: '文本对比与合并', titleEn: 'Text Diff & Merge',
    desc: '文本差异对比 · 行级高亮 · 支持合并导出。', descEn: 'Text diff comparison · line-level highlighting · merge & export.',
    icon: '📝',
    iconClass: 'icon-blue',
    url: './function/TextDiffMerge.html',
    tagAccent: [true, false, false],
    category: '文本对比/Diff/Merge/开发', categoryEn: 'Text/Diff/Merge/Dev',
    categoryType: 'software',
    isNew: true
}, {
    id: 'UnixTimestamp',
    title: 'Unix时间戳转换', titleEn: 'Unix Timestamp Converter',
    desc: 'Unix时间戳 ↔ 本地时间互转 · 支持毫秒/秒级。', descEn: 'Unix timestamp ↔ local time conversion · supports ms / s.',
    icon: '⏱️',
    iconClass: 'icon-blue',
    url: './function/UnixTimestamp.html',
    tagAccent: [true, false, false],
    category: '时间戳转换/时间/开发', categoryEn: 'Timestamp/Time/Dev',
    categoryType: 'software',
    isNew: true
}, ];

// 根据当前语言获取工具的标题/描述/分类
function getToolTitle(tool) { return (window.I18N && window.I18N.getLang() === 'en') ? (tool.titleEn || tool.title) : tool.title; }
function getToolDesc(tool)   { return (window.I18N && window.I18N.getLang() === 'en') ? (tool.descEn || tool.desc) : tool.desc; }
function getToolCategory(tool) { return (window.I18N && window.I18N.getLang() === 'en') ? (tool.categoryEn || tool.category) : tool.category; }

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
        if (currentCategory !== 'all') {
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
        toolsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <p>${window.I18N ? window.I18N.t('index.empty.text') : '没有找到匹配的工具，试试其他关键词或分类？'}</p>
                </div>
            `;
        return;
    }

    filtered.forEach((tool, index) => {
        const card = document.createElement('a');
        card.className = 'tool-card';
        card.href = tool.url;
        card.target = tool.url.startsWith('http') ? '_blank' : '_self';
        card.style.animationDelay = (index * 0.06) + 's';

        const title = getToolTitle(tool);
        const desc = getToolDesc(tool);

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
                <span class="tool-card-arrow">→</span>
            `;

        toolsGrid.appendChild(card);
    });
}

// 监听语言切换，重新渲染工具卡片
document.addEventListener('languagechange', function () {
    renderTools();
});

// 初始渲染
renderTools();
