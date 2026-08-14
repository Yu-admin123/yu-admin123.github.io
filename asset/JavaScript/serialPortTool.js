// ============================================================
//  serialPortTool.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性使用）
// ============================================================
window.I18N_STRINGS = {
    // Common
    'common.lang.title': { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    // Document title
    'serial.doc.title': { zh: '串口调试助手 · 多曲线', en: 'Serial Debug Tool · Multi-Curve' },

    // Page header
    'serial.page.title': { zh: '🔗 串口调试助手', en: '🔗 Serial Debug Tool' },
    'serial.subhead': { zh: '🔹 可自定义波特率 · 实时数据曲线 · 自动回复脚本 · 发送回显', en: '🔹 Custom baud rate · Real-time data curves · Auto-reply script · Send echo' },

    // Panel titles
    'serial.p1.title': { zh: '① 串口控制', en: '① Serial Control' },
    'serial.p1.small': { zh: '连接 / 参数', en: 'Connect / Params' },
    'serial.p2.title': { zh: '② 数据收发', en: '② Data Tx/Rx' },
    'serial.p3.title': { zh: '③ 多曲线绘制', en: '③ Multi-Curve Plot' },
    'serial.p3.small': { zh: '每帧提取多个数值，分别对应各曲线', en: 'Extract multiple values per frame, one per curve' },

    // Labels
    'serial.label.baud': { zh: '波 特 率:', en: 'Baud Rate:' },
    'serial.label.dataBits': { zh: '数 据 位:', en: 'Data Bits:' },
    'serial.label.stopBits': { zh: '停止位:', en: 'Stop Bits:' },
    'serial.label.parity': { zh: '校 验:', en: 'Parity:' },
    'serial.label.packetTimeout': { zh: '分包超时', en: 'Packet Timeout' },
    'serial.label.send': { zh: '发送', en: 'Send' },
    'serial.label.receive': { zh: '接收', en: 'Receive' },
    'serial.label.echo': { zh: '回显', en: 'Echo' },
    'serial.label.timestamp': { zh: '时间戳', en: 'Timestamp' },
    'serial.label.parseRule': { zh: '解析正则', en: 'Parse Regex' },
    'serial.label.curveCount': { zh: '最大曲线数', en: 'Max Curves' },
    'serial.label.color': { zh: '颜色', en: 'Color' },
    'serial.label.frameEnd': { zh: '帧结束符', en: 'Frame End' },
    'serial.label.refresh': { zh: '刷新', en: 'Refresh' },
    'serial.label.maxPoints': { zh: '最大点数', en: 'Max Points' },
    'serial.label.enable': { zh: '启用', en: 'Enable' },
    'serial.label.addCmd': { zh: '添加指令', en: 'Add Cmd' },

    // Options
    'serial.option.custom': { zh: '自定义', en: 'Custom' },
    'serial.option.perFrame': { zh: '每帧更新', en: 'Per Frame' },
    'serial.option.batch': { zh: '批量 (100ms)', en: 'Batch (100ms)' },

    // Parity options
    'serial.parity.none': { zh: '无', en: 'None' },
    'serial.parity.even': { zh: '偶', en: 'Even' },
    'serial.parity.odd': { zh: '奇', en: 'Odd' },

    // Buttons
    'serial.btn.connect': { zh: '🔗 连接', en: '🔗 Connect' },
    'serial.btn.disconnect': { zh: '⛔ 断开', en: '⛔ Disconnect' },
    'serial.btn.clear': { zh: '🧹 清空', en: '🧹 Clear' },
    'serial.btn.send': { zh: '📤 发送', en: '📤 Send' },
    'serial.btn.collapseChart': { zh: '▾ 收起曲线', en: '▾ Collapse' },
    'serial.btn.expandChart': { zh: '▶ 展开曲线', en: '▶ Expand' },
    'serial.btn.clearChart': { zh: '🧹 清空曲线', en: '🧹 Clear Chart' },
    'serial.btn.resetView': { zh: '⟲ 重置视图', en: '⟲ Reset View' },
    'serial.btn.addRule': { zh: '➕ 添加规则', en: '➕ Add Rule' },
    'serial.btn.clearAllRules': { zh: '🗑️ 清空全部', en: '🗑️ Clear All' },
    'serial.btn.exportJson': { zh: '📤 导出 JSON', en: '📤 Export JSON' },
    'serial.btn.importJson': { zh: '📥 导入 JSON', en: '📥 Import JSON' },
    'serial.btn.add': { zh: '➕ 添加', en: '➕ Add' },
    'serial.btn.resetDefault': { zh: '↺ 恢复默认', en: '↺ Reset Default' },
    'serial.btn.scriptDoc': { zh: '📖 脚本文档', en: '📖 Script Docs' },
    'serial.btn.cancel': { zh: '取消', en: 'Cancel' },
    'serial.btn.save': { zh: '💾 保存', en: '💾 Save' },

    // Status
    'serial.status.disconnected': { zh: '● 未连接', en: '● Disconnected' },
    'serial.status.connected': { zh: '● 已连接', en: '● Connected' },
    'serial.status.disconnected2': { zh: '● 已断开', en: '● Disconnected' },
    'serial.status.waitData': { zh: '● 已连接，等待数据...', en: '● Connected, waiting for data...' },
    'serial.status.connectFail': { zh: '⚠️ 连接失败', en: '⚠️ Connect Failed' },
    'serial.status.readError': { zh: '⚠️ 读取错误', en: '⚠️ Read Error' },
    'serial.status.ready': { zh: '就绪', en: 'Ready' },

    // Hints
    'serial.hint.packetTimeout': { zh: '无结束符时自动分包', en: 'Auto-packet when no end char' },
    'serial.hint.cleared': { zh: '(已清空)', en: '(Cleared)' },
    'serial.hint.chartCollapsed': { zh: '曲线已隐藏，点击“展开曲线”继续查看图表', en: 'Chart hidden, click "Expand" to view' },
    'serial.hint.parseRule': { zh: '正则匹配，默认,号和空格也可', en: 'Regex match, default , and space' },
    'serial.hint.frameEnd': { zh: '收到此字符表示一帧结束', en: 'Frame ends at this char' },
    'serial.hint.refresh': { zh: '曲线更新策略', en: 'Curve update strategy' },
    'serial.hint.zoom': { zh: '🖱 滚轮缩放 · 拖拽平移 · 悬停高亮', en: '🖱 Wheel zoom · Drag pan · Hover highlight' },
    'serial.hint.waitData': { zh: '等待数据...', en: 'Waiting for data...' },
    'serial.hint.scriptMode': { zh: '脚本模式可编写任意逻辑', en: 'Script mode allows any logic' },
    'serial.hint.script': { zh: '💡 脚本中可用 ', en: '💡 In script use ' },
    'serial.hint.script2': { zh: ' 接收到的字符串 · 返回 ', en: ' for received string · Return ' },
    'serial.hint.script3': { zh: ' 回复内容 或 ', en: ' as reply or ' },
    'serial.hint.script4': { zh: ' 不回复 · 支持 ', en: ' for no reply · Supports ' },
    'serial.hint.script5': { zh: ' 转义', en: ' escapes' },

    // Chart info
    'serial.info.points0': { zh: '点数: 0', en: 'Points: 0' },
    'serial.info.pointsActive0': { zh: '点数: 0 (活跃: 0)', en: 'Points: 0 (active: 0)' },
    'serial.info.lastValueNone': { zh: '最后值: —', en: 'Last: —' },
    'serial.info.zoomInit': { zh: '缩放: 1.0x', en: 'Zoom: 1.0x' },
    'serial.info.parse0': { zh: '解析: 0 个值/帧', en: 'Parsed: 0 vals/frame' },
    'serial.info.frame0': { zh: '帧: 0', en: 'Frame: 0' },
    'serial.info.totalLabel': { zh: '总点数: ', en: 'Total: ' },
    'serial.info.activePrefix': { zh: ' (活跃: ', en: ' (active: ' },
    'serial.info.activeSuffix': { zh: '条)', en: ')' },
    'serial.info.lastValueLabel': { zh: '最后值: ', en: 'Last: ' },
    'serial.info.zoomLabel': { zh: '缩放: ', en: 'Zoom: ' },
    'serial.info.parseLabel': { zh: '解析: ', en: 'Parsed: ' },
    'serial.info.parseSuffix': { zh: ' 个值/帧', en: ' vals/frame' },
    'serial.info.frameLabel': { zh: '帧: ', en: 'Frame: ' },
    'serial.info.frameDetail': { zh: ' | 值: [', en: ' | Vals: [' },
    'serial.info.frameRaw': { zh: '] | 原始: "', en: '] | Raw: "' },
    'serial.info.frameAll': { zh: '" | 全部值: [', en: '" | All: [' },

    // Units
    'serial.unit.bytes': { zh: '字节', en: 'bytes' },
    'serial.unit.bytes0': { zh: '0 字节', en: '0 bytes' },

    // Footer
    'serial.footer.line1': { zh: '🔗 串口调试助手 · 正则匹配解析 · 支持曲线显示 · 自动回复脚本 · 发送回显', en: '🔗 Serial Debug Tool · Regex parsing · Curve display · Auto-reply script · Send echo' },

    // Auto reply panel
    'serial.ar.title': { zh: '🤖 自动回复', en: '🤖 Auto Reply' },
    'serial.ar.small': { zh: '匹配规则 · 支持脚本', en: 'Match rules · Script support' },
    'serial.ar.unnamed': { zh: '未命名', en: 'Unnamed' },
    'serial.ar.unnamedRule': { zh: '未命名规则', en: 'Unnamed Rule' },
    'serial.ar.statusEnabled': { zh: '条规则生效', en: ' rule(s) active' },
    'serial.ar.statusDisabled': { zh: '⛔ 已禁用', en: '⛔ Disabled' },
    'serial.ar.hintNoRules': { zh: '暂无规则，点击 "添加规则" 创建', en: 'No rules, click "Add Rule" to create' },
    'serial.ar.matchContains': { zh: '包含', en: 'Contains' },
    'serial.ar.matchRegex': { zh: '正则', en: 'Regex' },
    'serial.ar.matchScript': { zh: '脚本', en: 'Script' },
    'serial.ar.scriptIcon': { zh: '📜脚本', en: '📜Script' },
    'serial.ar.replyText': { zh: '文本', en: 'Text' },
    'serial.ar.editBtnTitle': { zh: '编辑', en: 'Edit' },
    'serial.ar.delBtnTitle': { zh: '删除', en: 'Delete' },
    'serial.ar.editTitle': { zh: '编辑自动回复规则', en: 'Edit Auto-Reply Rule' },
    'serial.ar.addTitle': { zh: '添加自动回复规则', en: 'Add Auto-Reply Rule' },

    // Quick commands
    'serial.cmd.title': { zh: '📋 快捷指令', en: '📋 Quick Commands' },
    'serial.cmd.small': { zh: '点击发送 · 支持注释', en: 'Click to send · With comments' },
    'serial.cmd.hintEmpty': { zh: '暂无指令，请添加', en: 'No commands, please add' },
    'serial.cmd.deleteTip': { zh: '删除此指令', en: 'Delete this command' },
    'serial.cmd.default.test': { zh: '测试/握手', en: 'Test/Handshake' },
    'serial.cmd.default.reset': { zh: '重启模块', en: 'Reset Module' },
    'serial.cmd.default.staMode': { zh: 'STA模式', en: 'STA Mode' },
    'serial.cmd.default.scanWifi': { zh: '扫描WiFi', en: 'Scan WiFi' },
    'serial.cmd.default.queryIp': { zh: '查询IP', en: 'Query IP' },
    'serial.cmd.default.connectWifi': { zh: '连接WiFi', en: 'Connect WiFi' },

    // Modal
    'serial.modal.addTitle': { zh: '添加自动回复规则', en: 'Add Auto-Reply Rule' },
    'serial.modal.ruleName': { zh: '规则名称', en: 'Rule Name' },
    'serial.modal.matchType': { zh: '匹配方式', en: 'Match Type' },
    'serial.modal.matchPattern': { zh: '匹配模式', en: 'Match Pattern' },
    'serial.modal.replyType': { zh: '回复方式', en: 'Reply Type' },
    'serial.modal.replyContent': { zh: '回复内容', en: 'Reply Content' },

    // Match type options
    'serial.match.contains': { zh: '包含文本', en: 'Contains Text' },
    'serial.match.regex': { zh: '正则表达式', en: 'Regex' },
    'serial.match.script': { zh: '自定义脚本', en: 'Custom Script' },

    // Reply type options
    'serial.replyType.text': { zh: '文本 (UTF-8)', en: 'Text (UTF-8)' },

    // Placeholders
    'serial.placeholder.sendInput': { zh: '输入文本或 HEX (如 A0 01 FF)', en: 'Enter text or HEX (e.g. A0 01 FF)' },
    'serial.placeholder.cmdContent': { zh: '命令内容 (如 AA 55 01)', en: 'Command content (e.g. AA 55 01)' },
    'serial.placeholder.cmdComment': { zh: '注释 (如 启动)', en: 'Comment (e.g. Start)' },
    'serial.placeholder.ruleName': { zh: '例如: 握手回复', en: 'e.g. Handshake Reply' },
    'serial.placeholder.matchPattern': { zh: '例如: AT 或 ^AT\\+RST', en: 'e.g. AT or ^AT\\+RST' },
    'serial.placeholder.replyContent': { zh: '仅在非脚本模式下使用，脚本模式由脚本返回', en: 'Only for non-script mode; script mode returns from script' },

    // Alerts
    'serial.alert.cmdExists': { zh: '指令已存在', en: 'Command already exists' },
    'serial.alert.importSuccess': { zh: '导入成功！', en: 'Import successful!' },
    'serial.alert.invalidJson': { zh: '无效的JSON格式', en: 'Invalid JSON format' },
    'serial.alert.parseJsonFail': { zh: '解析JSON失败: ', en: 'Parse JSON failed: ' },
    'serial.alert.invalidBaud': { zh: '无效波特率', en: 'Invalid baud rate' },
    'serial.alert.connectFail': { zh: '连接失败: ', en: 'Connection failed: ' },
    'serial.alert.noData': { zh: '无有效数据', en: 'No valid data' },
    'serial.alert.sendFail': { zh: '发送失败: ', en: 'Send failed: ' },
    'serial.alert.writeScript': { zh: '请编写脚本代码', en: 'Please write script code' },
    'serial.alert.scriptError': { zh: '脚本语法错误: ', en: 'Script syntax error: ' },
    'serial.alert.inputMatchPattern': { zh: '请输入匹配模式', en: 'Please enter match pattern' },
    'serial.alert.inputReplyContent': { zh: '请输入回复内容', en: 'Please enter reply content' },

    // Confirms
    'serial.confirm.deleteRule': { zh: '确定删除规则 "', en: 'Delete rule "' },
    'serial.confirm.deleteRuleSuffix': { zh: '" 吗？', en: '"?' },
    'serial.confirm.clearRules': { zh: '确定清空所有自动回复规则吗？', en: 'Clear all auto-reply rules?' },

    // Auto reply tag
    'serial.ar.autoReplyTag': { zh: '🤖自动回复: ', en: '🤖Auto-reply: ' },
    'serial.ar.defaultName': { zh: '示例-多种回复', en: 'Example-Multi-reply' },
};

(function() {
    // ===== 主题切换后重绘图表 / 颜色预览 =====
    document.addEventListener('themechange', function(e) {
        if (typeof updateColorPreview === 'function') updateColorPreview();
        if (typeof drawChart === 'function') drawChart();
    });

    // ===== i18n 辅助函数 =====
    function t(key) { return window.I18N ? window.I18N.t(key) : key; }
    function formatBytes(count) { return count + ' ' + t('serial.unit.bytes'); }

    // ===== 初始化文档标题 =====
    document.title = t('serial.doc.title');

    // ===== DOM =====
    const baudSelect = document.getElementById('baudRate');
    const customBaud = document.getElementById('customBaud');
    const connectBtn = document.getElementById('connectBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    const clearRxBtn = document.getElementById('clearRxBtn');
    const clearRxBtn2 = document.getElementById('clearRxBtn2');
    const connStatus = document.getElementById('connStatus');
    const sendInput = document.getElementById('sendInput');
    const sendMode = document.getElementById('sendMode');
    const sendBtn = document.getElementById('sendBtn');
    const receiveMode = document.getElementById('receiveMode');
    const showTimestamp = document.getElementById('showTimestamp');
    const rxDisplay = document.getElementById('rxDisplay');
    const rxCount = document.getElementById('rxCount');
    const parseRule = document.getElementById('parseRule');
    const curveCount = document.getElementById('curveCount');
    const chartUpdateMode = document.getElementById('chartUpdateMode');
    const maxPoints = document.getElementById('maxPoints');
    const clearChartBtn = document.getElementById('clearChartBtn');
    const resetViewBtn = document.getElementById('resetViewBtn');
    const chartCanvas = document.getElementById('chartCanvas');
    const chartContainer = document.getElementById('chartContainer');
    const mainGrid = document.getElementById('mainGrid');
    const receivePanel = document.getElementById('receivePanel');
    const chartPanelWrapper = document.getElementById('chartPanelWrapper');
    const chartPanelBody = document.getElementById('chartPanelBody');
    const toggleChartPanelBtn = document.getElementById('toggleChartPanelBtn');
    const chartCollapsedHint = document.getElementById('chartCollapsedHint');
    const tooltipFloat = document.getElementById('tooltipFloat');
    const chartInfo = document.getElementById('chartInfo');
    const lastValueTag = document.getElementById('lastValueTag');
    const zoomInfo = document.getElementById('zoomInfo');
    const parseInfo = document.getElementById('parseInfo');
    const debugInfo = document.getElementById('debugInfo');
    const colorPreview = document.getElementById('colorPreview');
    const cmdContainer = document.getElementById('cmdContainer');
    const customCmdInput = document.getElementById('customCmdInput');
    const customCmdComment = document.getElementById('customCmdComment');
    const addCmdBtn = document.getElementById('addCmdBtn');
    const resetCmdBtn = document.getElementById('resetCmdBtn');
    const exportCmdsBtn = document.getElementById('exportCmdsBtn');
    const importCmdsBtn = document.getElementById('importCmdsBtn');
    const importCmdsInput = document.getElementById('importCmdsInput');
    const packetTimeout = document.getElementById('packetTimeout');
    const frameEnd = document.getElementById('frameEnd');
    const frameIndicator = document.getElementById('frameIndicator');
    const sendEcho = document.getElementById('sendEcho');

    // ===== 自动回复 DOM =====
    const autoReplyToggle = document.getElementById('autoReplyToggle');
    const autoReplyStatus = document.getElementById('autoReplyStatus');
    const replyRulesContainer = document.getElementById('autoReplyRulesContainer');
    const addReplyRuleBtn = document.getElementById('addReplyRuleBtn');
    const clearReplyRulesBtn = document.getElementById('clearReplyRulesBtn');
    const replyModal = document.getElementById('replyRuleModal');
    const replyModalTitle = document.getElementById('replyModalTitle');
    const editRuleId = document.getElementById('editRuleId');
    const ruleName = document.getElementById('ruleName');
    const ruleMatchType = document.getElementById('ruleMatchType');
    const ruleMatchPattern = document.getElementById('ruleMatchPattern');
    const ruleScriptTextarea = document.getElementById('ruleScript');
    const matchPatternRow = document.getElementById('matchPatternRow');
    const scriptRow = document.getElementById('scriptRow');
    const ruleReplyType = document.getElementById('ruleReplyType');
    const ruleReplyContent = document.getElementById('ruleReplyContent');
    const ruleEnabled = document.getElementById('ruleEnabled');
    const replyModalCancel = document.getElementById('replyModalCancel');
    const replyModalSave = document.getElementById('replyModalSave');
    const scriptDocBtn = document.getElementById('scriptDocBtn');

    // ===== CodeMirror 编辑器实例 =====
    let cmEditor = null;

    function initCodeMirror() {
        if (!cmEditor) {
            cmEditor = CodeMirror.fromTextArea(ruleScriptTextarea, {
                mode: 'javascript',
                theme: 'none',
                lineNumbers: true,
                indentUnit: 2,
                tabSize: 2,
                indentWithTabs: false,
                lineWrapping: true,
                extraKeys: {
                    "Tab": function(cm) {
                        cm.replaceSelection("  ", "end");
                    }
                }
            });
            cmEditor.setSize(null, 280);
            window.cmEditor = cmEditor;
        }
        return cmEditor;
    }

    // ===== 曲线颜色 =====
    const CURVE_COLORS = ['#818cf8', '#f472b6', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa', '#fb923c'];
    const DARK_CURVE_COLORS = ['#7a9eff', '#f472b6', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa', '#fb923c'];
    let chartPanelCollapsed = false;

    function updateChartPanelState() {
        if (!mainGrid || !receivePanel || !chartPanelWrapper || !chartPanelBody || !toggleChartPanelBtn || !chartCollapsedHint)
            return;
        chartPanelBody.style.display = chartPanelCollapsed ? 'none' : 'flex';
        chartCollapsedHint.style.display = chartPanelCollapsed ? 'block' : 'none';
        mainGrid.classList.toggle('single-column', chartPanelCollapsed);
        receivePanel.classList.toggle('panel-data-expanded', chartPanelCollapsed);
        toggleChartPanelBtn.textContent = chartPanelCollapsed ? t('serial.btn.expandChart') : t('serial.btn.collapseChart');
        toggleChartPanelBtn.setAttribute('aria-expanded', String(!chartPanelCollapsed));
    }

    toggleChartPanelBtn.addEventListener('click', () => {
        chartPanelCollapsed = !chartPanelCollapsed;
        updateChartPanelState();
    });

    function getCurveColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return isDark ? DARK_CURVE_COLORS : CURVE_COLORS;
    }

    function updateColorPreview() {
        const maxCurves = parseInt(curveCount.value, 10);
        const colors = getCurveColors();
        colorPreview.innerHTML = '';
        for (let i = 0; i < maxCurves; i++) {
            const dot = document.createElement('span');
            dot.className = 'color-dot';
            dot.style.background = colors[i % colors.length];
            colorPreview.appendChild(dot);
        }
    }
    curveCount.addEventListener('change', updateColorPreview);

    // ===== 状态 =====
    let isConnected = false;
    let port = null;
    let reader = null;
    let writer = null;
    let rxEntries = [];
    let chartDataList = [];
    let batchTimer = null;
    let lastValues = [];
    let frameBuffer = '';
    let timeoutTimer = null;
    let frameCount = 0;
    let lastParsedCount = 0;
    let isDrawing = false;
    let drawPending = false;
    let rxUpdatePending = false;
    const textDecoder = new TextDecoder();

    function scheduleDraw() {
        if (drawPending) return;
        drawPending = true;
        requestAnimationFrame(() => {
            drawPending = false;
            drawChart();
        });
    }

    function scheduleRxUpdate() {
        if (rxUpdatePending) return;
        rxUpdatePending = true;
        setTimeout(() => {
            rxUpdatePending = false;
            updateRxDisplay();
        }, 100);
    }

    function initChartData(maxCount) {
        chartDataList = [];
        for (let i = 0; i < maxCount; i++) chartDataList.push([]);
        lastValues = new Array(maxCount).fill(null);
    }
    const initialMax = parseInt(curveCount.value, 10);
    initChartData(initialMax);

    // ===== 曲线缩放/平移状态 =====
    let viewState = { offsetX: 0, offsetY: 0, scaleX: 1.0, scaleY: 1.0 };
    let isDragging = false;
    let dragStartX = 0,
        dragStartY = 0;
    let dragStartOffsetX = 0,
        dragStartOffsetY = 0;
    let hoverPoint = null;

    // ===== 快捷指令 =====
    function getDefaultCmds() {
        return [
            { cmd: 'AT\n', comment: t('serial.cmd.default.test') },
            { cmd: 'AT+RST\n', comment: t('serial.cmd.default.reset') },
            { cmd: 'AT+CWMODE=1\n', comment: t('serial.cmd.default.staMode') },
            { cmd: 'AT+CWLAP\n', comment: t('serial.cmd.default.scanWifi') },
            { cmd: 'AT+CIFSR\n', comment: t('serial.cmd.default.queryIp') },
            { cmd: 'AT+CWJAP="SSID","PWD"\n', comment: t('serial.cmd.default.connectWifi') },
        ];
    }
    let cmdList = getDefaultCmds();

    function saveCmds() { try { localStorage.setItem('serial_cmds2', JSON.stringify(cmdList)); } catch (e) {} }

    function loadCmds() {
        try {
            const saved = localStorage.getItem('serial_cmds2');
            if (saved) { const parsed = JSON.parse(saved); if (Array.isArray(parsed) && parsed.length) cmdList =
                    parsed; }
        } catch (e) {}
    }
    loadCmds();

    function renderCmds() {
        cmdContainer.innerHTML = '';
        cmdList.forEach(item => {
            const cmd = typeof item === 'string' ? item : item.cmd;
            const comment = typeof item === 'string' ? '' : (item.comment || '');
            const wrapper = document.createElement('span');
            wrapper.className = 'cmd-item';
            const btn = document.createElement('button');
            btn.className = 'cmd-btn';
            btn.textContent = cmd.replace(/\n/g, '↵').replace(/\r/g, '⏎');
            btn.title = comment || cmd;
            btn.addEventListener('click', () => {
                sendInput.value = cmd;
                sendData();
            });
            wrapper.appendChild(btn);
            if (comment) {
                const label = document.createElement('span');
                label.className = 'cmd-label';
                label.textContent = comment;
                label.title = comment;
                wrapper.appendChild(label);
            }
            const del = document.createElement('span');
            del.className = 'cmd-del';
            del.textContent = '✕';
            del.title = t('serial.cmd.deleteTip');
            del.addEventListener('click', (e) => {
                e.stopPropagation();
                cmdList = cmdList.filter(c => (typeof c === 'string' ? c : c.cmd) !== cmd);
                renderCmds();
                saveCmds();
            });
            wrapper.appendChild(del);
            cmdContainer.appendChild(wrapper);
        });
        if (cmdList.length === 0) {
            const empty = document.createElement('span');
            empty.className = 'hint-text';
            empty.textContent = t('serial.cmd.hintEmpty');
            cmdContainer.appendChild(empty);
        }
    }
    renderCmds();

    function addCustomCmd() {
        const val = customCmdInput.value.trim();
        const comment = customCmdComment.value.trim();
        if (!val) return;
        const exists = cmdList.some(c => (typeof c === 'string' ? c : c.cmd) === val);
        if (exists) { alert(t('serial.alert.cmdExists')); return; }
        cmdList.push({ cmd: val, comment: comment || '' });
        renderCmds();
        saveCmds();
        customCmdInput.value = '';
        customCmdComment.value = '';
    }

    function resetCmds() {
        cmdList = getDefaultCmds();
        renderCmds();
        saveCmds();
    }
    addCmdBtn.addEventListener('click', addCustomCmd);
    customCmdInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addCustomCmd(); });
    customCmdComment.addEventListener('keydown', (e) => { if (e.key === 'Enter') addCustomCmd(); });
    resetCmdBtn.addEventListener('click', resetCmds);

    function exportCmds() {
        const blob = new Blob([JSON.stringify(cmdList, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'serial_commands.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function importCmds(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data) && data.every(item => {
                        if (typeof item === 'string') return true;
                        if (typeof item === 'object' && item !== null && typeof item.cmd === 'string')
                            return true;
                        return false;
                    })) {
                    cmdList = data;
                    renderCmds();
                    saveCmds();
                    alert(t('serial.alert.importSuccess'));
                } else {
                    alert(t('serial.alert.invalidJson'));
                }
            } catch (err) {
                alert(t('serial.alert.parseJsonFail') + err.message);
            }
        };
        reader.readAsText(file);
    }
    exportCmdsBtn.addEventListener('click', exportCmds);
    importCmdsBtn.addEventListener('click', () => importCmdsInput.click());
    importCmdsInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            importCmds(e.target.files[0]);
            e.target.value = '';
        }
    });

    baudSelect.addEventListener('change', () => {
        customBaud.style.display = baudSelect.value === 'custom' ? 'inline-block' : 'none';
    });

    // ===== 画布 =====
    const ctx = chartCanvas.getContext('2d');
    let canvasW = 0,
        canvasH = 0;
    let dpr = 1;
    let cachedViewMin = 0,
        cachedViewRange = 1;

    function resizeChart() {
        const rect = chartContainer.getBoundingClientRect();
        dpr = window.devicePixelRatio || 1;
        const w = Math.max(100, rect.width - 12);
        const h = Math.max(60, Math.min(300, rect.height - 12));
        canvasW = w;
        canvasH = h;
        chartCanvas.style.width = w + 'px';
        chartCanvas.style.height = h + 'px';
        chartCanvas.width = w * dpr;
        chartCanvas.height = h * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        drawChart();
    }
    window.addEventListener('resize', resizeChart);

    function drawChart() {
        if (isDrawing) return;
        isDrawing = true;
        try {
            const w = canvasW;
            const h = canvasH;
            ctx.clearRect(0, 0, w, h);

            const maxCurves = parseInt(curveCount.value, 10);
            while (chartDataList.length < maxCurves) {
                chartDataList.push([]);
                lastValues.push(null);
            }
            while (chartDataList.length > maxCurves) {
                chartDataList.pop();
                lastValues.pop();
            }

            let hasData = false;
            for (let i = 0; i < maxCurves; i++) {
                if (chartDataList[i] && chartDataList[i].length >= 1) { hasData = true; break; }
            }
            if (!hasData) {
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-light')
                    .trim() ||
                    '#94a3b8';
                ctx.font = '14px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(t('serial.hint.waitData'), w / 2, h / 2);
                chartInfo.textContent = t('serial.info.pointsActive0');
                hoverPoint = null;
                isDrawing = false;
                return;
            }

            let activeCurves = 0;
            for (let i = 0; i < maxCurves; i++) {
                if (chartDataList[i] && chartDataList[i].length > 0) activeCurves++;
            }

            let globalMin = Infinity,
                globalMax = -Infinity;
            let hasAnyData = false;
            for (let i = 0; i < maxCurves; i++) {
                const data = chartDataList[i];
                if (data && data.length > 0) {
                    const validData = data.filter(v => v !== undefined && v !== null && isFinite(v) && !isNaN(
                    v));
                    if (validData.length > 0) {
                        hasAnyData = true;
                        const min = Math.min(...validData);
                        const max = Math.max(...validData);
                        if (min < globalMin) globalMin = min;
                        if (max > globalMax) globalMax = max;
                    }
                }
            }

            if (!hasAnyData) { globalMin = 0;
                globalMax = 1; }
            if (!isFinite(globalMin) || !isFinite(globalMax) || globalMin === globalMax) { globalMin = 0;
                globalMax = 1; }

            const margin = Math.max((globalMax - globalMin) * 0.15, 0.5);
            globalMin = globalMin - margin;
            globalMax = globalMax + margin;
            if (globalMax - globalMin < 0.001) { globalMin = globalMin - 0.5;
                globalMax = globalMax + 0.5; }

            const scaleX = viewState.scaleX;
            const scaleY = viewState.scaleY;
            const offX = viewState.offsetX;
            const offY = viewState.offsetY;

            const range = globalMax - globalMin;
            const displayRange = range * scaleY;
            const mid = (globalMin + globalMax) / 2;
            const viewMin = mid - displayRange / 2 + offY * (displayRange / h) * 0.5;
            const viewMax = mid + displayRange / 2 + offY * (displayRange / h) * 0.5;
            const viewRange = viewMax - viewMin || 1;
            cachedViewMin = viewMin;
            cachedViewRange = viewRange;

            const pad = 8;
            const labelPad = 36;
            const drawW = w - pad - labelPad - pad;
            const drawH = h - pad - pad;

            const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-light')
                .trim() ||
                '#e9edf4';
            const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-muted')
                .trim() ||
                '#64748b';

            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 0.5;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.font = '9px monospace';

            for (let i = 0; i <= 5; i++) {
                const y = pad + (i / 5) * drawH;
                const val = viewMax - (i / 5) * viewRange;
                ctx.beginPath();
                ctx.moveTo(pad + labelPad, y);
                ctx.lineTo(w - pad, y);
                ctx.stroke();
                let displayVal;
                if (viewRange < 0.01) displayVal = val.toFixed(4);
                else if (viewRange < 0.1) displayVal = val.toFixed(3);
                else if (viewRange < 1) displayVal = val.toFixed(2);
                else if (viewRange < 10) displayVal = val.toFixed(1);
                else displayVal = val.toFixed(0);
                ctx.fillStyle = textColor;
                ctx.fillText(displayVal, pad + labelPad - 4, y);
            }

            for (let i = 0; i <= 4; i++) {
                const x = pad + labelPad + (i / 4) * drawW;
                ctx.beginPath();
                ctx.moveTo(x, pad);
                ctx.lineTo(x, h - pad);
                ctx.stroke();
            }

            const colors = getCurveColors();
            let totalPoints = 0;

            for (let idx = 0; idx < maxCurves; idx++) {
                const data = chartDataList[idx] || [];
                const validData = data.filter(v => v !== undefined && v !== null && isFinite(v) && !isNaN(
                    v));
                if (validData.length < 1) continue;
                totalPoints += validData.length;

                const totalPts = validData.length;
                const viewPts = Math.max(2, totalPts / scaleX);
                const startIdx = Math.max(0, Math.floor((totalPts - viewPts) / 2 - offX * (viewPts /
                    drawW) * 0.5));
                const endIdx = Math.min(totalPts, Math.ceil(startIdx + viewPts));
                const visible = validData.slice(startIdx, endIdx);
                if (visible.length < 1) continue;

                ctx.strokeStyle = colors[idx % colors.length];
                ctx.lineWidth = 2;
                ctx.beginPath();
                for (let i = 0; i < visible.length; i++) {
                    const x = pad + labelPad + (i / (visible.length - 1 || 1)) * drawW;
                    const y = pad + drawH - ((visible[i] - viewMin) / viewRange) * drawH;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
                ctx.fillStyle = colors[idx % colors.length];
                for (let i = 0; i < visible.length; i++) {
                    const x = pad + labelPad + (i / (visible.length - 1 || 1)) * drawW;
                    const y = pad + drawH - ((visible[i] - viewMin) / viewRange) * drawH;
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }

            if (hoverPoint && hoverPoint.curveIndex < maxCurves) {
                const data = chartDataList[hoverPoint.curveIndex];
                if (data && data.length > hoverPoint.dataIndex) {
                    const val = data[hoverPoint.dataIndex];
                    if (isFinite(val) && !isNaN(val)) {
                        const totalPts = data.length;
                        const viewPts = Math.max(2, totalPts / scaleX);
                        const startIdx = Math.max(0, Math.floor((totalPts - viewPts) / 2 - offX * (
                            viewPts / drawW) *
                            0.5));
                        const endIdx = Math.min(totalPts, Math.ceil(startIdx + viewPts));
                        if (hoverPoint.dataIndex >= startIdx && hoverPoint.dataIndex < endIdx) {
                            const localIdx = hoverPoint.dataIndex - startIdx;
                            const visible = data.slice(startIdx, endIdx);
                            if (visible.length > localIdx) {
                                const x = pad + labelPad + (localIdx / (visible.length - 1)) *
                                    drawW;
                                const y = pad + drawH - ((visible[localIdx] - viewMin) /
                                    viewRange) * drawH;
                                ctx.beginPath();
                                ctx.arc(x, y, 6, 0, 2 * Math.PI);
                                ctx.fillStyle = colors[hoverPoint.curveIndex % colors.length];
                                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                                ctx.shadowBlur = 8;
                                ctx.fill();
                                ctx.shadowBlur = 0;
                                ctx.strokeStyle = 'white';
                                ctx.lineWidth = 2;
                                ctx.stroke();
                                const tipText =
                                    `C${hoverPoint.curveIndex+1}: ${visible[localIdx].toFixed(4)}`;
                                tooltipFloat.textContent = tipText;
                                tooltipFloat.style.left = (x + 10) + 'px';
                                tooltipFloat.style.top = Math.max(2, Math.min(h - 28, y - 12)) +
                                    'px';
                                tooltipFloat.classList.add('visible');
                            }
                        }
                    }
                }
            }

            chartInfo.textContent = t('serial.info.totalLabel') + totalPoints + t('serial.info.activePrefix') + activeCurves + t('serial.info.activeSuffix');
            const lastVal = lastValues.length > 0 ? lastValues[lastValues.length - 1] : null;
            if (lastVal !== null && lastVal !== undefined && isFinite(lastVal) && !isNaN(lastVal)) {
                lastValueTag.textContent = t('serial.info.lastValueLabel') + lastVal.toFixed(4);
            } else {
                lastValueTag.textContent = t('serial.info.lastValueNone');
            }
            zoomInfo.textContent = t('serial.info.zoomLabel') + scaleX.toFixed(2) + 'x / ' + scaleY.toFixed(2) + 'x';
            parseInfo.textContent = t('serial.info.parseLabel') + lastParsedCount + t('serial.info.parseSuffix');
            debugInfo.textContent = t('serial.info.frameLabel') + frameCount;
        } catch (e) {
            console.error('drawChart error:', e);
        }
        isDrawing = false;
    }

    function updateHover(e) {
        const rect = chartContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - 6;
        const y = e.clientY - rect.top - 6;
        const w = canvasW;
        const h = canvasH;

        if (x < 0 || x > w || y < 0 || y > h) {
            if (hoverPoint) {
                hoverPoint = null;
                tooltipFloat.classList.remove('visible');
                drawChart();
            }
            return;
        }

        const maxCurves = parseInt(curveCount.value, 10);
        const pad = 8;
        const labelPad = 36;
        const drawW = w - pad - labelPad - pad;
        const drawH = h - pad - pad;
        const relX = (x - pad - labelPad) / drawW;
        const viewMin = cachedViewMin;
        const viewRange = cachedViewRange;

        let closest = null;
        let minDist = Infinity;

        for (let idx = 0; idx < maxCurves; idx++) {
            const data = chartDataList[idx];
            if (!data || data.length < 2) continue;
            const totalPts = data.length;
            const scaleX = viewState.scaleX;
            const offX = viewState.offsetX;
            const viewPts = Math.max(2, totalPts / scaleX);
            const startIdx = Math.max(0, Math.floor((totalPts - viewPts) / 2 - offX * (viewPts / drawW) *
                0.5));
            const endIdx = Math.min(totalPts, Math.ceil(startIdx + viewPts));
            const visible = data.slice(startIdx, endIdx);
            if (visible.length < 2) continue;

            const localIdx = Math.round(relX * (visible.length - 1));
            const clampedIdx = Math.max(0, Math.min(visible.length - 1, localIdx));
            const val = visible[clampedIdx];
            if (!isFinite(val) || isNaN(val)) continue;
            const pointX = pad + labelPad + (clampedIdx / (visible.length - 1)) * drawW;
            const pointY = pad + drawH - ((val - viewMin) / viewRange) * drawH;
            const dist = Math.hypot(x - pointX, y - pointY);
            if (dist < minDist && dist < 30) {
                minDist = dist;
                closest = { curveIndex: idx, dataIndex: startIdx + clampedIdx, value: val, x: pointX,
                    y: pointY };
            }
        }

        if (closest) {
            if (!hoverPoint || hoverPoint.curveIndex !== closest.curveIndex || hoverPoint.dataIndex !== closest
                .dataIndex) {
                hoverPoint = closest;
                drawChart();
            }
        } else {
            if (hoverPoint) {
                hoverPoint = null;
                tooltipFloat.classList.remove('visible');
                drawChart();
            } else {
                tooltipFloat.classList.remove('visible');
            }
        }
    }

    // ===== 更新曲线 =====
    function updateChartFromFrame(values) {
        if (!values || !Array.isArray(values) || values.length === 0) return;

        const maxCurves = parseInt(curveCount.value, 10);
        const count = Math.min(values.length, maxCurves);

        for (let i = 0; i < count; i++) {
            const v = values[i];
            if (v === undefined || v === null || !isFinite(v) || isNaN(v)) continue;
            if (!chartDataList[i]) chartDataList[i] = [];
            chartDataList[i].push(v);
            lastValues[i] = v;
            const maxPts = parseInt(maxPoints.value, 10) || 200;
            if (chartDataList[i].length > maxPts) {
                chartDataList[i].splice(0, chartDataList[i].length - maxPts);
            }
        }
        lastParsedCount = count;
        hoverPoint = null;
        tooltipFloat.classList.remove('visible');
        scheduleDraw();
    }

    function resetView() {
        viewState.offsetX = 0;
        viewState.offsetY = 0;
        viewState.scaleX = 1.0;
        viewState.scaleY = 1.0;
        hoverPoint = null;
        tooltipFloat.classList.remove('visible');
        drawChart();
    }

    // ===== 画布交互 =====
    chartContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 1.1 : 0.9;
        viewState.scaleX = Math.max(0.1, Math.min(20, viewState.scaleX * delta));
        viewState.scaleY = Math.max(0.1, Math.min(20, viewState.scaleY * delta));
        hoverPoint = null;
        tooltipFloat.classList.remove('visible');
        drawChart();
    }, { passive: false });

    chartContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        dragStartOffsetX = viewState.offsetX;
        dragStartOffsetY = viewState.offsetY;
        chartContainer.style.cursor = 'grabbing';
        hoverPoint = null;
        tooltipFloat.classList.remove('visible');
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - dragStartX;
            const dy = e.clientY - dragStartY;
            viewState.offsetX = dragStartOffsetX + dx;
            viewState.offsetY = dragStartOffsetY + dy;
            hoverPoint = null;
            tooltipFloat.classList.remove('visible');
            drawChart();
        } else {
            updateHover(e);
        }
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            chartContainer.style.cursor = 'grab';
        }
    });

    chartContainer.addEventListener('mouseleave', () => {
        hoverPoint = null;
        tooltipFloat.classList.remove('visible');
        drawChart();
    });

    let touchStartX = 0,
        touchStartY = 0;
    let touchOffsetX = 0,
        touchOffsetY = 0;
    let lastTouchDist = 0;
    chartContainer.addEventListener('touchstart', (e) => {
        const t = e.touches;
        if (t.length === 1) {
            isDragging = true;
            touchStartX = t[0].clientX;
            touchStartY = t[0].clientY;
            touchOffsetX = viewState.offsetX;
            touchOffsetY = viewState.offsetY;
            hoverPoint = null;
            tooltipFloat.classList.remove('visible');
        } else if (t.length === 2) {
            lastTouchDist = Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
        }
    }, { passive: true });

    chartContainer.addEventListener('touchmove', (e) => {
        const t = e.touches;
        if (t.length === 1 && isDragging) {
            const dx = t[0].clientX - touchStartX;
            const dy = t[0].clientY - touchStartY;
            viewState.offsetX = touchOffsetX + dx;
            viewState.offsetY = touchOffsetY + dy;
            hoverPoint = null;
            tooltipFloat.classList.remove('visible');
            drawChart();
        } else if (t.length === 2) {
            const dist = Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
            if (lastTouchDist > 0) {
                const scale = dist / lastTouchDist;
                viewState.scaleX = Math.max(0.1, Math.min(20, viewState.scaleX * scale));
                viewState.scaleY = Math.max(0.1, Math.min(20, viewState.scaleY * scale));
                hoverPoint = null;
                tooltipFloat.classList.remove('visible');
                drawChart();
            }
            lastTouchDist = dist;
        }
    }, { passive: true });

    chartContainer.addEventListener('touchend', () => {
        isDragging = false;
        lastTouchDist = 0;
    }, { passive: true });

    // ===== 正则解析 =====
    function extractNumbersWithRegex(str, regexStr) {
        try {
            if (!regexStr || regexStr.trim() === '') return [];
            const regex = new RegExp(regexStr, 'gi');
            const allValues = [];
            let match;
            while ((match = regex.exec(str)) !== null) {
                for (let i = 1; i < match.length; i++) {
                    if (match[i] !== undefined && match[i] !== '') {
                        const val = parseFloat(match[i]);
                        if (!isNaN(val) && isFinite(val)) allValues.push(val);
                    }
                }
            }
            if (allValues.length > 0) return allValues;
            const numRegex = /[-+]?\d*\.?\d+/g;
            let m;
            const allNums = [];
            while ((m = numRegex.exec(str)) !== null) {
                const val = parseFloat(m[0]);
                if (!isNaN(val) && isFinite(val)) allNums.push(val);
            }
            return allNums;
        } catch (e) {
            try {
                const numRegex = /[-+]?\d*\.?\d+/g;
                let m;
                const allNums = [];
                while ((m = numRegex.exec(str)) !== null) {
                    const val = parseFloat(m[0]);
                    if (!isNaN(val) && isFinite(val)) allNums.push(val);
                }
                return allNums;
            } catch (e2) { return []; }
        }
    }

    // ===== 发送原始数据（供自动回复调用） =====
    function escapeEscapes(str) {
        return str.replace(/\\r/g, '\r').replace(/\\n/g, '\n');
    }

    async function sendRawData(content, type) {
        if (!content || content.trim() === '') return;
        let data = [];
        if (type === 'hex') {
            const hex = content.replace(/,/g, ' ').trim().split(/\s+/);
            for (let h of hex) {
                if (h.startsWith('0x')) h = h.slice(2);
                const byte = parseInt(h, 16);
                if (!isNaN(byte) && byte >= 0 && byte <= 255) data.push(byte);
            }
        } else {
            const encoder = new TextEncoder();
            data = Array.from(encoder.encode(escapeEscapes(content)));
        }
        if (data.length === 0) return;
        try {
            if (isConnected && port && writer) {
                await writer.write(new Uint8Array(data));
            } else {
                const text = new TextDecoder().decode(new Uint8Array(data));
                const hexStr = data.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
                const now = new Date();
                const timeStr = now.toTimeString().slice(0, 8) + '.' + String(now.getMilliseconds()).padStart(3,
                    '0');
                rxEntries.push({ time: timeStr, hex: hexStr, text: text });
                if (rxEntries.length > 200) rxEntries.shift();
                scheduleRxUpdate();
                rxCount.textContent = formatBytes(rxEntries.reduce((sum, e) => sum + e.text.length, 0));
            }
        } catch (e) {
            console.warn('自动回复发送失败:', e);
        }
    }

    // ===== 自动回复核心逻辑 =====
    let autoReplyRules = [];
    let autoReplyEnabled = true;

    function loadAutoReplyRules() {
        try {
            const saved = localStorage.getItem('auto_reply_rules');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    autoReplyRules = parsed;
                    return;
                }
            }
        } catch (e) {}
        autoReplyRules = [{
            id: 'rule_' + Date.now(),
            name: t('serial.ar.defaultName'),
            matchType: 'script',
            matchPattern: '',
            script: `  // ----- 示例 -----
  if (data.includes('RST'))
  {
    return 'RESET\\r\\n';
  }
  else if (data.includes('VERSION'))
  {
    return 'V1.0\\r\\n';
  }
  // ----- 不匹配则返回 null，不回复 -----
  return null;`,
            replyType: 'text',
            replyContent: 'OK\\r\\n',
            enabled: true
        }];
        saveAutoReplyRules();
    }

    function saveAutoReplyRules() {
        try {
            localStorage.setItem('auto_reply_rules', JSON.stringify(autoReplyRules));
        } catch (e) {}
        updateAutoReplyStatus();
    }

    function updateAutoReplyStatus() {
        const enabled = autoReplyToggle.checked;
        const count = autoReplyRules.filter(r => r.enabled).length;
        autoReplyStatus.textContent = enabled ? `✅ ${count}` + t('serial.ar.statusEnabled') : t('serial.ar.statusDisabled');
        autoReplyStatus.style.color = enabled ? 'var(--status-ok-text)' : 'var(--text-muted)';
    }

    function renderAutoReplyRules() {
        replyRulesContainer.innerHTML = '';
        if (autoReplyRules.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'reply-rule-empty';
            empty.textContent = t('serial.ar.hintNoRules');
            replyRulesContainer.appendChild(empty);
            updateAutoReplyStatus();
            return;
        }
        autoReplyRules.forEach((rule, index) => {
            const div = document.createElement('div');
            div.className = 'reply-rule-item';
            const chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.checked = rule.enabled !== false;
            chk.style.width = '14px';
            chk.style.height = '14px';
            chk.style.margin = '0';
            chk.style.cursor = 'pointer';
            chk.addEventListener('change', () => {
                rule.enabled = chk.checked;
                saveAutoReplyRules();
                renderAutoReplyRules();
            });
            div.appendChild(chk);

            const info = document.createElement('div');
            info.className = 'rule-info';
            const nameSpan = document.createElement('span');
            nameSpan.className = 'rule-name';
            nameSpan.textContent = rule.name || t('serial.ar.unnamed');
            info.appendChild(nameSpan);

            const matchSpan = document.createElement('span');
            matchSpan.className = 'rule-match';
            const matchTypeLabel = rule.matchType === 'contains' ? t('serial.ar.matchContains') :
                rule.matchType === 'regex' ? t('serial.ar.matchRegex') : t('serial.ar.matchScript');
            const matchDisplay = rule.matchType === 'script' ? t('serial.ar.scriptIcon') : (rule.matchPattern || '');
            matchSpan.textContent = `${matchTypeLabel}: ${matchDisplay}`;
            info.appendChild(matchSpan);

            const replySpan = document.createElement('span');
            replySpan.className = 'rule-reply';
            const replyTypeLabel = rule.replyType === 'text' ? t('serial.ar.replyText') : 'HEX';
            replySpan.textContent = `↪ ${replyTypeLabel}: ${rule.replyContent || ''}`;
            info.appendChild(replySpan);

            div.appendChild(info);

            const actions = document.createElement('div');
            actions.className = 'rule-actions';
            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-outline btn-sm';
            editBtn.textContent = '✎';
            editBtn.style.display = 'flex';
            editBtn.style.alignItems = 'center';
            editBtn.style.justifyContent = 'center';
            editBtn.style.fontSize = '1.05rem';
            editBtn.style.width = '48px';
            editBtn.style.height = '24px';
            editBtn.title = t('serial.ar.editBtnTitle');
            editBtn.addEventListener('click', () => openReplyModal(index));
            actions.appendChild(editBtn);
            const delBtn = document.createElement('button');
            delBtn.className = 'btn btn-danger btn-sm';
            delBtn.textContent = '✕';
            delBtn.style.display = 'flex';
            delBtn.style.alignItems = 'center';
            delBtn.style.justifyContent = 'center';
            delBtn.style.fontSize = '0.8rem';
            delBtn.style.width = '48px';
            delBtn.style.height = '24px';
            delBtn.title = t('serial.ar.delBtnTitle');
            delBtn.addEventListener('click', () => {
                if (confirm(t('serial.confirm.deleteRule') + (rule.name || t('serial.ar.unnamed')) + t('serial.confirm.deleteRuleSuffix'))) {
                    autoReplyRules.splice(index, 1);
                    saveAutoReplyRules();
                    renderAutoReplyRules();
                }
            });
            actions.appendChild(delBtn);
            div.appendChild(actions);
            replyRulesContainer.appendChild(div);
        });
        updateAutoReplyStatus();
    }

    // ===== 模态框管理 =====
    let editingIndex = -1;

    // 切换显示匹配字段和回复内容字段
    function toggleMatchFields() {
        const type = ruleMatchType.value;
        const isScript = type === 'script';
        matchPatternRow.style.display = isScript ? 'none' : 'flex';
        scriptRow.style.display = isScript ? 'flex' : 'none';
        const replyContentRow = document.getElementById('replyContentRow');
        replyContentRow.style.display = isScript ? 'none' : 'flex';
    }

    function openReplyModal(index) {
        editingIndex = index;
        const rule = index >= 0 ? autoReplyRules[index] : null;
        replyModalTitle.textContent = rule ? t('serial.ar.editTitle') : t('serial.ar.addTitle');
        editRuleId.value = rule ? rule.id : '';
        ruleName.value = rule ? rule.name : '';
        ruleMatchType.value = rule ? rule.matchType : 'script';
        ruleMatchPattern.value = rule ? (rule.matchPattern || '') : '';
        const defaultScript = `  // ----- 示例 -----
  if (data.includes('RST'))
  {
    return 'RESET\\r\\n';
  }
  else if (data.includes('VERSION'))
  {
    return 'V1.0\\r\\n';
  }
  // ----- 不匹配则返回 null，不回复 -----
  return null;`;
        const scriptContent = rule ? (rule.script || defaultScript) : defaultScript;
        const editor = initCodeMirror();
        editor.setValue(scriptContent);
        setTimeout(() => editor.refresh(), 50);

        ruleReplyType.value = rule ? rule.replyType : 'text';
        ruleReplyContent.value = rule ? rule.replyContent : 'OK\\r\\n';
        ruleEnabled.checked = rule ? (rule.enabled !== false) : true;
        toggleMatchFields();
        replyModal.classList.add('active');
    }

    function closeReplyModal() {
        replyModal.classList.remove('active');
        editingIndex = -1;
    }

    ruleMatchType.addEventListener('change', toggleMatchFields);

    replyModalCancel.addEventListener('click', closeReplyModal);
    replyModal.addEventListener('click', (e) => {
        if (e.target === replyModal) closeReplyModal();
    });

    replyModalSave.addEventListener('click', () => {
        const name = ruleName.value.trim() || t('serial.ar.unnamedRule');
        const matchType = ruleMatchType.value;
        const matchPattern = ruleMatchPattern.value.trim();
        const editor = initCodeMirror();
        const script = editor.getValue().trim();
        const replyType = ruleReplyType.value;
        const replyContent = ruleReplyContent.value.trim();
        const enabled = ruleEnabled.checked;

        if (matchType === 'script') {
            if (!script) {
                alert(t('serial.alert.writeScript'));
                return;
            }
            try {
                const fn = new Function('data', script);
                fn('test');
            } catch (e) {
                alert(t('serial.alert.scriptError') + e.message);
                return;
            }
        } else {
            if (!matchPattern) {
                alert(t('serial.alert.inputMatchPattern'));
                return;
            }
            if (!replyContent) {
                alert(t('serial.alert.inputReplyContent'));
                return;
            }
        }

        const ruleData = {
            id: editRuleId.value || 'rule_' + Date.now(),
            name,
            matchType,
            matchPattern: matchType === 'script' ? '' : matchPattern,
            script: matchType === 'script' ? script : '',
            replyType,
            replyContent: replyContent || '',
            enabled
        };

        if (editingIndex >= 0 && editingIndex < autoReplyRules.length) {
            autoReplyRules[editingIndex] = ruleData;
        } else {
            autoReplyRules.push(ruleData);
        }
        saveAutoReplyRules();
        renderAutoReplyRules();
        closeReplyModal();
    });

    // ===== 脚本文档按钮 =====
    scriptDocBtn.addEventListener('click', () => {
        window.open('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference', '_blank');
    });

    // ===== 清空全部规则 =====
    clearReplyRulesBtn.addEventListener('click', () => {
        if (autoReplyRules.length === 0) return;
        if (confirm(t('serial.confirm.clearRules'))) {
            autoReplyRules = [];
            saveAutoReplyRules();
            renderAutoReplyRules();
        }
    });

    // ===== 添加规则按钮 =====
    addReplyRuleBtn.addEventListener('click', () => openReplyModal(-1));

    // ===== 自动回复检查 =====
    function checkAutoReply(data) {
        if (!autoReplyToggle.checked) return;
        const rules = autoReplyRules.filter(r => r.enabled !== false);
        if (rules.length === 0) return;

        for (const rule of rules) {
            try {
                let matched = false;
                let replyContent = null;

                if (rule.matchType === 'contains') {
                    if (rule.matchPattern && data.includes(rule.matchPattern)) {
                        matched = true;
                        replyContent = rule.replyContent;
                    }
                } else if (rule.matchType === 'regex') {
                    if (rule.matchPattern) {
                        const regex = new RegExp(rule.matchPattern);
                        if (regex.test(data)) {
                            matched = true;
                            replyContent = rule.replyContent;
                        }
                    }
                } else if (rule.matchType === 'script') {
                    if (rule.script) {
                        try {
                            const fn = new Function('data', rule.script);
                            const result = fn(data);
                            if (result !== null && result !== undefined && result !== false) {
                                matched = true;
                                replyContent = String(result);
                            }
                        } catch (e) {
                            console.warn('自动回复脚本执行错误:', e);
                        }
                    }
                }

                if (matched && replyContent !== null && replyContent !== undefined) {
                    const replyType = rule.replyType || 'text';
                    sendRawData(replyContent, replyType);
                    const now = new Date();
                    const timeStr = now.toTimeString().slice(0, 8) + '.' + String(now.getMilliseconds()).padStart(
                        3, '0');
                    const tag = `[` + t('serial.ar.autoReplyTag') + `${rule.name}]`;
                    const displayText = replyType === 'hex' ?
                        replyContent.split(/\s+/).map(b => String.fromCharCode(parseInt(b, 16))).join('') :
                        replyContent;
                    rxEntries.push({
                        time: timeStr,
                        hex: `[AUTO-REPLY] ${replyType==='hex'?replyContent:''}`,
                        text: `${tag} ${displayText}`
                    });
                    if (rxEntries.length > 200) rxEntries.shift();
                    scheduleRxUpdate();
                    rxCount.textContent = formatBytes(rxEntries.reduce((sum, e) => sum + e.text.length, 0));
                    break;
                }
            } catch (e) {
                console.warn('自动回复规则检查错误:', e);
            }
        }
    }

    // ===== 处理一帧数据 =====
    function processFrame(frame) {
        if (!frame || frame.trim() === '') return;

        frameCount++;
        frameIndicator.className = 'frame-indicator active';
        setTimeout(() => { frameIndicator.className = 'frame-indicator idle'; }, 200);

        const now = new Date();
        const timeStr = now.toTimeString().slice(0, 8) + '.' + String(now.getMilliseconds()).padStart(3, '0');
        const hex = textToHex(frame);

        rxEntries.push({ time: timeStr, hex: hex, text: frame });
        if (rxEntries.length > 200) rxEntries.shift();

        scheduleRxUpdate();
        rxCount.textContent = formatBytes(rxEntries.reduce((sum, e) => sum + e.text.length, 0));

        const rule = parseRule.value.trim();
        let values = [];

        if (rule) {
            values = extractNumbersWithRegex(frame, rule);
        }

        if (values.length === 0) {
            const parts = frame.split(/[,，\s]+/).filter(s => s.trim() !== '');
            for (const p of parts) {
                const v = parseFloat(p);
                if (!isNaN(v) && isFinite(v)) values.push(v);
            }
        }

        const maxCurves = parseInt(curveCount.value, 10);
        const frameValues = values.slice(0, maxCurves);

        if (frameValues.length > 0) {
            const updMode = chartUpdateMode.value;
            if (updMode === 'auto') {
                updateChartFromFrame(frameValues);
            } else {
                if (batchTimer) clearTimeout(batchTimer);
                batchTimer = setTimeout(() => {
                    if (frameValues.length > 0) updateChartFromFrame(frameValues);
                    batchTimer = null;
                }, 100);
            }
        }

        lastParsedCount = frameValues.length;
        debugInfo.textContent =
            t('serial.info.frameLabel') + frameCount + t('serial.info.frameDetail') + frameValues.join(', ') + t('serial.info.frameRaw') + frame.trim() + t('serial.info.frameAll') + values.join(', ') + ']';

        checkAutoReply(frame);
    }

    // ===== 帧结束符 =====
    function getFrameEndChar() {
        const val = frameEnd.value;
        if (val === '\\r\\n') return '\r\n';
        if (val === '\\n') return '\n';
        if (val === '\\r') return '\r';
        return val;
    }

    // ===== 接收处理 =====
    function processRxData(text) {
        const endChar = getFrameEndChar();
        frameBuffer += text;

        let endIndex = frameBuffer.indexOf(endChar);
        while (endIndex !== -1) {
            const frame = frameBuffer.substring(0, endIndex);
            frameBuffer = frameBuffer.substring(endIndex + endChar.length);
            if (frame.trim() !== '') processFrame(frame);
            endIndex = frameBuffer.indexOf(endChar);
        }

        if (frameBuffer.length > 10000) {
            if (frameBuffer.trim() !== '') processFrame(frameBuffer);
            frameBuffer = '';
        }

        if (timeoutTimer) clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(() => {
            if (frameBuffer.trim() !== '') {
                const data = frameBuffer;
                frameBuffer = '';
                processFrame(data);
            }
            timeoutTimer = null;
        }, parseInt(packetTimeout.value, 10) || 50);
    }

    function textToHex(str) {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            hex += str.charCodeAt(i).toString(16).padStart(2, '0').toUpperCase() + ' ';
        }
        return hex.trim();
    }

    function updateRxDisplay() {
        const mode = receiveMode.value;
        const showTime = showTimestamp.checked;
        let html = '';

        if (rxEntries.length === 0) {
            rxDisplay.innerHTML = '<span style="color:var(--text-light)">' + t('serial.hint.cleared') + '</span>';
            return;
        }

        if (mode === 'dual') {
            rxEntries.forEach(entry => {
                html += `<div class="rx-entry">`;
                if (showTime) html += `<span class="time">${entry.time}</span>`;
                html += `<span class="hex-part">HEX: ${entry.hex}</span>`;
                html += `<span class="text-part">TEXT: ${entry.text}</span>`;
                html += `</div>`;
            });
            rxDisplay.innerHTML = html;
        } else if (mode === 'hex') {
            let parts = [];
            rxEntries.forEach(e => {
                parts.push(showTime ? `${e.time} HEX: ${e.hex}` : e.hex);
            });
            rxDisplay.textContent = parts.join('\n');
        } else {
            let parts = [];
            rxEntries.forEach(e => {
                parts.push(showTime ? `${e.time} TEXT: ${e.text}` : e.text);
            });
            rxDisplay.textContent = parts.join('\n');
        }
        rxDisplay.scrollTop = rxDisplay.scrollHeight;
    }

    // ===== 串口操作 =====
    async function connect() {
        try {
            const baud = baudSelect.value === 'custom' ? parseInt(customBaud.value, 10) : parseInt(baudSelect
                .value, 10);
            if (isNaN(baud) || baud <= 0) { alert(t('serial.alert.invalidBaud')); return; }
            port = await navigator.serial.requestPort();
            await port.open({
                baudRate: baud,
                dataBits: parseInt(document.getElementById('dataBits').value, 10),
                stopBits: parseInt(document.getElementById('stopBits').value, 10),
                parity: document.getElementById('parity').value
            });
            isConnected = true;
            connectBtn.disabled = true;
            disconnectBtn.disabled = false;
            connStatus.innerHTML = '<span class="status-ok">' + t('serial.status.connected') + '</span>';
            rxDisplay.innerHTML = '<span style="color:var(--text-light)">' + t('serial.status.waitData') + '</span>';
            reader = port.readable.getReader();
            writer = port.writable.getWriter();
            readLoop();
        } catch (e) {
            alert(t('serial.alert.connectFail') + e.message);
            connStatus.innerHTML = `<span class="error-msg">` + t('serial.status.connectFail') + `</span>`;
        }
    }

    async function readLoop() {
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const text = textDecoder.decode(value);
                if (text) processRxData(text);
            }
        } catch (e) {
            if (isConnected) {
                connStatus.innerHTML = `<span class="error-msg">` + t('serial.status.readError') + `</span>`;
            }
        }
    }

    async function disconnect() {
        try {
            if (reader) { await reader.cancel();
                reader = null; }
            if (writer) { await writer.close();
                writer = null; }
            if (port) { await port.close();
                port = null; }
        } catch (e) {}
        isConnected = false;
        connectBtn.disabled = false;
        disconnectBtn.disabled = true;
        connStatus.innerHTML = t('serial.status.disconnected2');
        frameBuffer = '';
        if (timeoutTimer) { clearTimeout(timeoutTimer);
            timeoutTimer = null; }
    }

    // ===== 发送数据（新增回显功能） =====
    async function sendData() {
        const raw = sendInput.value;
        if (!raw.trim()) return;

        // ---- 回显 ----
        if (sendEcho.checked) {
            const now = new Date();
            const timeStr = now.toTimeString().slice(0, 8) + '.' + String(now.getMilliseconds()).padStart(3, '0');
            let hexStr = '';
            let textStr = raw;
            const mode = sendMode.value;
            if (mode === 'hex') {
                // HEX 模式：将输入作为 HEX 显示
                hexStr = raw.replace(/,/g, ' ').trim();
                textStr = '[TX] ' + raw; // 直接显示原始输入
            } else {
                // 文本模式：计算 HEX
                const encoder = new TextEncoder();
                const bytes = encoder.encode(raw);
                hexStr = Array.from(bytes).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
                textStr = '[TX] ' + raw;
            }
            rxEntries.push({
                time: timeStr,
                hex: hexStr,
                text: textStr
            });
            if (rxEntries.length > 200) rxEntries.shift();
            scheduleRxUpdate();
            rxCount.textContent = formatBytes(rxEntries.reduce((sum, e) => sum + e.text.length, 0));
        }

        // ---- 实际发送 ----
        if (!isConnected || !port) {
            // 未连接时，数据已回显，但不再重复处理
            return;
        }
        let data = [];
        const mode = sendMode.value;
        if (mode === 'hex') {
            const hex = raw.replace(/,/g, ' ').trim().split(/\s+/);
            for (let h of hex) {
                if (h.startsWith('0x')) h = h.slice(2);
                const byte = parseInt(h, 16);
                if (!isNaN(byte) && byte >= 0 && byte <= 255) data.push(byte);
            }
        } else {
            const encoder = new TextEncoder();
            data = Array.from(encoder.encode(escapeEscapes(raw)));
        }
        if (data.length === 0) { alert(t('serial.alert.noData')); return; }
        try {
            if (!writer) writer = port.writable.getWriter();
            await writer.write(new Uint8Array(data));
        } catch (e) { alert(t('serial.alert.sendFail') + e.message); }
    }

    // ===== 事件绑定 =====
    connectBtn.addEventListener('click', connect);
    disconnectBtn.addEventListener('click', disconnect);
    sendBtn.addEventListener('click', sendData);
    sendInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendData(); });

    function clearRx() {
        rxEntries = [];
        frameBuffer = '';
        frameCount = 0;
        if (timeoutTimer) { clearTimeout(timeoutTimer);
            timeoutTimer = null; }
        rxDisplay.innerHTML = '<span style="color:var(--text-light)">' + t('serial.hint.cleared') + '</span>';
        rxCount.textContent = t('serial.unit.bytes0');
        debugInfo.textContent = t('serial.info.frame0');
        frameIndicator.className = 'frame-indicator idle';
    }
    clearRxBtn.addEventListener('click', clearRx);
    clearRxBtn2.addEventListener('click', clearRx);

    clearChartBtn.addEventListener('click', () => {
        const maxCurves = parseInt(curveCount.value, 10);
        chartDataList = [];
        lastValues = [];
        for (let i = 0; i < maxCurves; i++) { chartDataList.push([]);
            lastValues.push(null); }
        hoverPoint = null;
        tooltipFloat.classList.remove('visible');
        resetView();
        frameCount = 0;
        debugInfo.textContent = t('serial.info.frame0');
    });
    resetViewBtn.addEventListener('click', resetView);
    maxPoints.addEventListener('change', () => { drawChart(); });

    curveCount.addEventListener('change', () => {
        const maxCurves = parseInt(curveCount.value, 10);
        while (chartDataList.length < maxCurves) {
            chartDataList.push([]);
            lastValues.push(null);
        }
        while (chartDataList.length > maxCurves) {
            chartDataList.pop();
            lastValues.pop();
        }
        updateColorPreview();
        hoverPoint = null;
        tooltipFloat.classList.remove('visible');
        drawChart();
    });

    receiveMode.addEventListener('change', updateRxDisplay);
    showTimestamp.addEventListener('change', updateRxDisplay);

    // ===== 自动回复全局开关 =====
    autoReplyToggle.addEventListener('change', () => {
        updateAutoReplyStatus();
        renderAutoReplyRules();
    });

    // ===== 初始化 =====
    loadAutoReplyRules();
    renderAutoReplyRules();

    setTimeout(() => {
        resizeChart();
        const maxCurves = parseInt(curveCount.value, 10);
        const wavePoints = 80;
        const amplitude = 10;
        const offset = 15;
        for (let c = 0; c < maxCurves; c++) {
            for (let i = 0; i < wavePoints; i++) {
                const t = (i / wavePoints) * 2 * Math.PI;
                let v;
                if (c === 0) {
                    v = offset + amplitude * Math.sin(t);
                } else if (c === 1) {
                    v = offset + amplitude * (2 / Math.PI) * Math.asin(Math.sin(t));
                } else if (c === 2) {
                    v = offset + amplitude * Math.sign(Math.sin(t));
                } else {
                    v = offset + i * 0.2;
                }
                chartDataList[c].push(v);
            }
            lastValues[c] = chartDataList[c][chartDataList[c].length - 1];
        }
        updateColorPreview();
        resetView();
        rxDisplay.innerHTML = '<span style="color:var(--text-light)">' + t('serial.hint.cleared') + '</span>';
        rxCount.textContent = t('serial.unit.bytes0');
        debugInfo.textContent = t('serial.info.frame0');
    }, 100);

    // ===== 语言切换：重渲染动态文本 =====
    document.addEventListener('languagechange', function () {
        document.title = t('serial.doc.title');
        // 重渲染图表面板状态（收起/展开按钮）
        updateChartPanelState();
        // 重渲染快捷指令
        renderCmds();
        // 重渲染自动回复规则与状态
        renderAutoReplyRules();
        updateAutoReplyStatus();
        // 重绘图表（含 chartInfo 等动态文本）
        drawChart();
        // 重渲染接收区
        updateRxDisplay();
        // 更新连接状态显示（未连接时）
        if (!isConnected) {
            connStatus.textContent = t('serial.status.disconnected');
        }
        // 若模态框打开，更新标题
        if (replyModal.classList.contains('active')) {
            replyModalTitle.textContent = editingIndex >= 0 ? t('serial.ar.editTitle') : t('serial.ar.addTitle');
        }
        // 更新字节计数
        if (rxEntries.length === 0) {
            rxCount.textContent = t('serial.unit.bytes0');
        } else {
            rxCount.textContent = formatBytes(rxEntries.reduce((sum, e) => sum + e.text.length, 0));
        }
    });

    window.addEventListener('beforeunload', () => { if (isConnected) disconnect(); });
})();
