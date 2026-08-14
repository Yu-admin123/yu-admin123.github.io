// ============================================================
//  WebsocketTool.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },
    'ws.doc.title':       { zh: 'WebSocket 测试工具', en: 'WebSocket Tester' },
    'ws.page.title':      { zh: '🔌 WebSocket 测试工具', en: '🔌 WebSocket Tester' },
    'ws.subhead':         { zh: '🔹 支持 ws / wss 协议 · 文本 / 十六进制收发 · 消息日志 · 自动重连', en: '🔹 Supports ws / wss protocols · text / hex send-receive · message log · auto-reconnect' },
    'ws.p1.title':        { zh: '① 连接配置', en: '① Connection Config' },
    'ws.p1.small':        { zh: 'WebSocket URL', en: 'WebSocket URL' },
    'ws.preset.label':    { zh: '快速选择：', en: 'Quick select:' },
    'ws.protocol.label':  { zh: '协议头', en: 'Subprotocol' },
    'ws.protocol.placeholder': { zh: '可选，如: chat, echo', en: 'Optional, e.g. chat, echo' },
    'ws.protocol.hint':   { zh: '自定义子协议 (可选)', en: 'Custom subprotocol (optional)' },
    'ws.connect':         { zh: '▶ 连接', en: '▶ Connect' },
    'ws.disconnect':      { zh: '⏹ 断开', en: '⏹ Disconnect' },
    'ws.clear.log':       { zh: '🗑 清空日志', en: '🗑 Clear Log' },
    'ws.export.log':      { zh: '📋 导出日志', en: '📋 Export Log' },
    'ws.p2.title':        { zh: '② 发送消息', en: '② Send Message' },
    'ws.p2.small':        { zh: '文本 / HEX', en: 'Text / HEX' },
    'ws.send.mode.label': { zh: '发送模式', en: 'Send Mode' },
    'ws.mode.text':       { zh: '📝 文本', en: '📝 Text' },
    'ws.mode.hex':        { zh: '🔢 十六进制', en: '🔢 Hex' },
    'ws.mode.json':       { zh: '📋 JSON', en: '📋 JSON' },
    'ws.hint.text':       { zh: 'UTF-8 文本', en: 'UTF-8 text' },
    'ws.hint.hex':        { zh: '十六进制，空格分隔，如: 01 02 FF', en: 'Hex, space-separated, e.g. 01 02 FF' },
    'ws.hint.json':       { zh: '合法的 JSON 字符串', en: 'Valid JSON string' },
    'ws.msg.label':       { zh: '消息', en: 'Message' },
    'ws.send.placeholder': { zh: '输入要发送的消息...', en: 'Enter message to send...' },
    'ws.send':            { zh: '📤 发送', en: '📤 Send' },
    'ws.ping':            { zh: '🏓 Ping', en: '🏓 Ping' },
    'ws.clear':           { zh: '清空', en: 'Clear' },
    'ws.send.hint':       { zh: '💡 按 Ctrl+Enter 快速发送', en: '💡 Press Ctrl+Enter to send quickly' },
    'ws.msgcount.zero':   { zh: '已发送: 0', en: 'Sent: 0' },
    'ws.msgcount.fmt':    { zh: '已发送: {n}', en: 'Sent: {n}' },
    'ws.p3.title':        { zh: '③ 连接状态', en: '③ Connection Status' },
    'ws.p3.small':        { zh: '实时信息', en: 'Realtime Info' },
    'ws.badge.not.connected': { zh: '未连接', en: 'Not connected' },
    'ws.badge.connected':     { zh: '已连接', en: 'Connected' },
    'ws.badge.connecting':    { zh: '连接中', en: 'Connecting' },
    'ws.badge.error':         { zh: '错误', en: 'Error' },
    'ws.status.not.connected': { zh: '未连接', en: 'Not connected' },
    'ws.status.connected':    { zh: '已连接 ✓', en: 'Connected ✓' },
    'ws.status.connecting':   { zh: '连接中...', en: 'Connecting...' },
    'ws.status.disconnected': { zh: '已断开', en: 'Disconnected' },
    'ws.status.error':        { zh: '错误', en: 'Error' },
    'ws.status.create.fail':  { zh: '创建失败', en: 'Create failed' },
    'ws.status.reconnect.fail': { zh: '重连失败', en: 'Reconnect failed' },
    'ws.info.protocol':   { zh: '协议', en: 'Protocol' },
    'ws.info.recv':       { zh: '已接收', en: 'Received' },
    'ws.info.sent':       { zh: '已发送', en: 'Sent' },
    'ws.info.ready':      { zh: '就绪状态', en: 'Ready State' },
    'ws.count.zero':      { zh: '0 条', en: '0 items' },
    'ws.count.fmt':       { zh: '{n} 条', en: '{n} items' },
    'ws.logcount.zero':   { zh: '共 0 条', en: 'Total 0 items' },
    'ws.logcount.fmt':    { zh: '共 {n} 条', en: 'Total {n} items' },
    'ws.p4.title':        { zh: '④ 消息日志', en: '④ Message Log' },
    'ws.p4.small':        { zh: '时间 · 方向 · 数据', en: 'Time · Direction · Data' },
    'ws.log.system.tag':  { zh: '[系统]', en: '[System]' },
    'ws.log.welcome':     { zh: '欢迎使用 WebSocket 测试工具，连接后消息将显示在此', en: 'Welcome to WebSocket Tester. Messages will appear here after connecting.' },
    'ws.autoscroll':      { zh: '📌 自动滚动', en: '📌 Auto Scroll' },
    'ws.scroll.lock':     { zh: '📌 锁定滚动', en: '📌 Lock Scroll' },
    'ws.footer':          { zh: '🔌 WebSocket 测试工具 · 支持 ws/wss · 十六进制收发 · 消息日志', en: '🔌 WebSocket Tester · ws/wss support · hex send-receive · message log' },
    // 动态日志 / 提示文本
    'ws.log.already.connecting':  { zh: '已经连接或正在连接中', en: 'Already connected or connecting' },
    'ws.log.input.url':           { zh: '请输入 WebSocket URL', en: 'Please enter a WebSocket URL' },
    'ws.log.url.invalid':         { zh: 'URL 必须以 ws:// 或 wss:// 开头', en: 'URL must start with ws:// or wss://' },
    'ws.log.connecting':          { zh: '正在连接 {url} ...', en: 'Connecting {url} ...' },
    'ws.log.create.fail':         { zh: '创建 WebSocket 失败: {msg}', en: 'Failed to create WebSocket: {msg}' },
    'ws.log.connected':           { zh: '✅ 连接成功！', en: '✅ Connected!' },
    'ws.log.closed':              { zh: '🔌 连接已关闭 [代码: {code}] {reason}', en: '🔌 Connection closed [code: {code}] {reason}' },
    'ws.log.reason.unspecified':  { zh: '未指定原因', en: 'Unspecified reason' },
    'ws.log.reconnect.wait':      { zh: '⏳ 将在 {sec} 秒后尝试重连 (第 {n}/{max} 次)', en: '⏳ Reconnecting in {sec}s (attempt {n}/{max})' },
    'ws.log.reconnecting':        { zh: '🔄 尝试重连...', en: '🔄 Reconnecting...' },
    'ws.log.reconnect.limit':     { zh: '❌ 重连次数已达上限，请手动连接', en: '❌ Reconnect limit reached, please connect manually' },
    'ws.log.ws.error':            { zh: 'WebSocket 错误: {msg}', en: 'WebSocket error: {msg}' },
    'ws.log.unknown.error':       { zh: '未知错误', en: 'Unknown error' },
    'ws.log.disconnect.user':     { zh: '用户主动断开', en: 'User disconnected' },
    'ws.log.disconnect.error':    { zh: '断开连接时出错: {msg}', en: 'Error disconnecting: {msg}' },
    'ws.log.disconnected':        { zh: '已手动断开连接', en: 'Manually disconnected' },
    'ws.log.send.not.connected':  { zh: '未连接，无法发送消息', en: 'Not connected, cannot send message' },
    'ws.log.send.empty':          { zh: '消息内容为空', en: 'Message is empty' },
    'ws.log.hex.invalid':         { zh: '无效的十六进制数据: {msg}', en: 'Invalid hex data: {msg}' },
    'ws.log.hex.no.bytes':        { zh: '没有有效的十六进制字节', en: 'No valid hex bytes' },
    'ws.log.bytes':               { zh: '[{n} 字节]', en: '[{n} bytes]' },
    'ws.log.json.invalid':        { zh: '无效的 JSON: {msg}', en: 'Invalid JSON: {msg}' },
    'ws.log.send.fail':           { zh: '发送失败: {msg}', en: 'Send failed: {msg}' },
    'ws.log.ping.not.connected':  { zh: '未连接，无法发送 Ping', en: 'Not connected, cannot send Ping' },
    'ws.log.ping.fail':           { zh: 'Ping 失败: {msg}', en: 'Ping failed: {msg}' },
    'ws.log.cleared':             { zh: '日志已清空', en: 'Log cleared' },
    'ws.log.export.header':       { zh: 'WebSocket 日志导出', en: 'WebSocket Log Export' },
    'ws.log.export.time':         { zh: '导出时间: {time}', en: 'Export time: {time}' },
    'ws.log.exported':            { zh: '📥 日志已导出', en: '📥 Log exported' },
    'ws.log.page.close':          { zh: '页面关闭', en: 'Page closed' },
    'ws.log.ready':               { zh: '🔌 工具已就绪，输入 WebSocket URL 后点击连接', en: '🔌 Tool ready. Enter a WebSocket URL and click Connect.' },
    'ws.log.url.loaded':          { zh: '📋 从 URL 参数加载地址: {url}', en: '📋 Loaded URL from params: {url}' },
    'ws.conn.time':               { zh: '连接时间: {time}', en: 'Connected: {time}' },
    'ws.none':                    { zh: '(无)', en: '(none)' }
};

(function() {
    // ============================================================
    //  DOM 引用
    // ============================================================
    const wsUrl = document.getElementById('wsUrl');
    const wsProtocol = document.getElementById('wsProtocol');
    const connectBtn = document.getElementById('connectBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    const sendBtn = document.getElementById('sendBtn');
    const pingBtn = document.getElementById('pingBtn');
    const sendInput = document.getElementById('sendInput');
    const sendMode = document.getElementById('sendMode');
    const sendHint = document.getElementById('sendHint');
    const logContainer = document.getElementById('logContainer');
    const clearLogBtn = document.getElementById('clearLogBtn');
    const exportLogBtn = document.getElementById('exportLogBtn');
    const exportLogBtn2 = document.getElementById('exportLogBtn2');
    const clearSendBtn = document.getElementById('clearSendBtn');
    const scrollLockBtn = document.getElementById('scrollLockBtn');
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const connTimeLabel = document.getElementById('connTimeLabel');
    const infoUrl = document.getElementById('infoUrl');
    const infoProtocol = document.getElementById('infoProtocol');
    const infoRecv = document.getElementById('infoRecv');
    const infoSent = document.getElementById('infoSent');
    const infoReadyState = document.getElementById('infoReadyState');
    const logCountLabel = document.getElementById('logCountLabel');
    const msgCountTag = document.getElementById('msgCountTag');
    const connStatusBadge = document.getElementById('connStatusBadge');

    // ============================================================
    //  状态
    // ============================================================
    let ws = null;
    let isConnected = false;
    let isConnecting = false;
    let logCount = 0;
    let sentCount = 0;
    let recvCount = 0;
    let autoScroll = true;
    let reconnectTimer = null;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 5;
    // 当前连接状态（供语言切换时刷新）
    let currentStatus = 'disconnected';
    let currentStatusMsgKey = null;

    /** 翻译快捷方法 */
    function t(key) { return window.I18N ? window.I18N.t(key) : ''; }
    /** 带占位符的翻译：tf('key', {n: 5}) → 替换 {n} */
    function tf(key, vars) {
        var s = t(key);
        if (vars) for (var k in vars) { s = s.split('{' + k + '}').join(vars[k]); }
        return s;
    }
    /** 当前语言对应的时间区域 */
    function timeLocale() { return (window.I18N && window.I18N.getLang() === 'en') ? 'en-US' : 'zh-CN'; }

    // ============================================================
    //  日志函数
    // ============================================================
    function addLog(direction, payload, type, extra) {
        const time = new Date();
        const timeStr = time.toLocaleTimeString(timeLocale(), { hour12: false }) + '.' + String(time.getMilliseconds())
            .padStart(3, '0');

        const entry = document.createElement('div');
        entry.className = 'log-entry';

        let dirSymbol = '';
        let dirText = '';
        let cls = '';

        switch (type) {
            case 'sent':
                cls = 'log-sent';
                dirSymbol = '📤';
                dirText = '发送';
                break;
            case 'recv':
                cls = 'log-recv';
                dirSymbol = '📥';
                dirText = '接收';
                break;
            case 'system':
                cls = 'log-system';
                dirSymbol = '🔹';
                dirText = '系统';
                break;
            case 'error':
                cls = 'log-error';
                dirSymbol = '❌';
                dirText = '错误';
                break;
            default:
                cls = 'log-system';
                dirSymbol = '🔹';
                dirText = '系统';
        }

        entry.classList.add(cls);

        let payloadHtml = '';
        if (typeof payload === 'string') {
            payloadHtml = escapeHtml(payload);
        } else {
            payloadHtml = String(payload);
        }

        let extraHtml = '';
        if (extra) {
            extraHtml = ' <span class="log-hex">' + escapeHtml(extra) + '</span>';
        }

        entry.innerHTML = `
            <span class="log-time">[${timeStr}]</span>
            <span class="log-direction">${dirSymbol}</span>
            <span class="log-payload">${payloadHtml}</span>
            ${extraHtml}
        `;

        logContainer.appendChild(entry);
        logCount++;
        logCountLabel.textContent = tf('ws.logcount.fmt', { n: logCount });

        if (autoScroll) {
            entry.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }

        // 限制日志数量防止内存溢出
        while (logContainer.children.length > 2000) {
            logContainer.removeChild(logContainer.firstChild);
        }
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function addSystemLog(msg) {
        addLog('system', msg, 'system');
    }

    function addErrorLog(msg) {
        addLog('error', msg, 'error');
    }

    // ============================================================
    //  状态更新
    // ============================================================
    function updateStatus(state, msgKey) {
        statusDot.className = 'status-dot';
        currentStatus = state;
        currentStatusMsgKey = msgKey || null;
        switch (state) {
            case 'connected':
                statusDot.classList.add('on');
                statusText.textContent = t('ws.status.connected');
                connStatusBadge.textContent = t('ws.badge.connected');
                connStatusBadge.className = 'badge badge-connected';
                isConnected = true;
                isConnecting = false;
                connectBtn.disabled = true;
                disconnectBtn.disabled = false;
                sendBtn.disabled = false;
                pingBtn.disabled = false;
                break;
            case 'connecting':
                statusDot.classList.add('connecting');
                statusText.textContent = t('ws.status.connecting');
                connStatusBadge.textContent = t('ws.badge.connecting');
                connStatusBadge.className = 'badge badge-connecting';
                isConnected = false;
                isConnecting = true;
                connectBtn.disabled = true;
                disconnectBtn.disabled = true;
                sendBtn.disabled = true;
                pingBtn.disabled = true;
                break;
            case 'disconnected':
                statusDot.classList.add('off');
                statusText.textContent = t(msgKey || 'ws.status.not.connected');
                connStatusBadge.textContent = t('ws.badge.not.connected');
                connStatusBadge.className = 'badge badge-disconnected';
                isConnected = false;
                isConnecting = false;
                connectBtn.disabled = false;
                disconnectBtn.disabled = true;
                sendBtn.disabled = true;
                pingBtn.disabled = true;
                break;
            case 'error':
                statusDot.classList.add('error');
                statusText.textContent = t(msgKey || 'ws.status.error');
                connStatusBadge.textContent = t('ws.badge.error');
                connStatusBadge.className = 'badge badge-disconnected';
                isConnected = false;
                isConnecting = false;
                connectBtn.disabled = false;
                disconnectBtn.disabled = true;
                sendBtn.disabled = true;
                pingBtn.disabled = true;
                break;
        }
        updateInfo();
    }

    function updateInfo() {
        infoUrl.textContent = wsUrl.value || '—';
        infoProtocol.textContent = wsProtocol.value || t('ws.none');
        infoRecv.textContent = tf('ws.count.fmt', { n: recvCount });
        infoSent.textContent = tf('ws.count.fmt', { n: sentCount });
        msgCountTag.textContent = tf('ws.msgcount.fmt', { n: sentCount });
        if (ws) {
            const states = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
            infoReadyState.textContent = states[ws.readyState] || ws.readyState;
        } else {
            infoReadyState.textContent = '—';
        }
    }

    // ============================================================
    //  WebSocket 核心
    // ============================================================
    function connectWs() {
        if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
            addSystemLog(t('ws.log.already.connecting'));
            return;
        }

        const url = wsUrl.value.trim();
        if (!url) {
            addErrorLog(t('ws.log.input.url'));
            return;
        }

        if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
            addErrorLog(t('ws.log.url.invalid'));
            return;
        }

        const protocols = wsProtocol.value.trim() ? [wsProtocol.value.trim()] : undefined;

        updateStatus('connecting');
        addSystemLog(tf('ws.log.connecting', { url: url }));

        try {
            ws = new WebSocket(url, protocols);
        } catch (e) {
            addErrorLog(tf('ws.log.create.fail', { msg: e.message }));
            updateStatus('error', 'ws.status.create.fail');
            return;
        }

        ws.onopen = function() {
            const now = new Date();
            connTimeLabel.textContent = tf('ws.conn.time', { time: now.toLocaleTimeString(timeLocale(), { hour12: false }) });
            addSystemLog(t('ws.log.connected'));
            updateStatus('connected');
            reconnectAttempts = 0;
            if (reconnectTimer) {
                clearTimeout(reconnectTimer);
                reconnectTimer = null;
            }
        };

        ws.onmessage = function(event) {
            recvCount++;
            let data = event.data;
            let extra = '';

            if (data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = function() {
                    const buf = new Uint8Array(reader.result);
                    const hexStr = Array.from(buf).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
                    const text = new TextDecoder('utf-8').decode(buf);
                    addLog('recv', text, 'recv', 'HEX: ' + hexStr);
                    updateInfo();
                };
                reader.readAsArrayBuffer(data);
                return;
            } else if (data instanceof ArrayBuffer) {
                const buf = new Uint8Array(data);
                const hexStr = Array.from(buf).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
                const text = new TextDecoder('utf-8').decode(buf);
                addLog('recv', text, 'recv', 'HEX: ' + hexStr);
                updateInfo();
                return;
            } else {
                let display = data;
                try {
                    const parsed = JSON.parse(data);
                    display = JSON.stringify(parsed, null, 2);
                } catch (e) {}
                addLog('recv', display, 'recv');
            }
            updateInfo();
        };

        ws.onclose = function(event) {
            const code = event.code;
            const reason = event.reason || t('ws.log.reason.unspecified');
            addSystemLog(tf('ws.log.closed', { code: code, reason: reason }));
            updateStatus('disconnected', 'ws.status.disconnected');

            if (code !== 1000 && code !== 1001) {
                if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    reconnectAttempts++;
                    const delay = Math.min(1000 * reconnectAttempts, 5000);
                    addSystemLog(tf('ws.log.reconnect.wait', { sec: (delay / 1000), n: reconnectAttempts, max: MAX_RECONNECT_ATTEMPTS }));
                    if (reconnectTimer) clearTimeout(reconnectTimer);
                    reconnectTimer = setTimeout(function() {
                        if (!isConnected && !isConnecting) {
                            addSystemLog(t('ws.log.reconnecting'));
                            connectWs();
                        }
                    }, delay);
                } else {
                    addErrorLog(t('ws.log.reconnect.limit'));
                    updateStatus('error', 'ws.status.reconnect.fail');
                }
            }
            ws = null;
            updateInfo();
        };

        ws.onerror = function(error) {
            addErrorLog(tf('ws.log.ws.error', { msg: (error.message || t('ws.log.unknown.error')) }));
        };
    }

    function disconnectWs() {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
        reconnectAttempts = 0;
        if (ws) {
            try {
                ws.close(1000, t('ws.log.disconnect.user'));
            } catch (e) {
                addErrorLog(tf('ws.log.disconnect.error', { msg: e.message }));
            }
            ws = null;
        }
        updateStatus('disconnected', 'ws.status.disconnected');
        addSystemLog(t('ws.log.disconnected'));
        connTimeLabel.textContent = '—';
        updateInfo();
    }

    function sendMessage() {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            addErrorLog(t('ws.log.send.not.connected'));
            return;
        }

        const raw = sendInput.value;
        if (!raw.trim()) {
            addErrorLog(t('ws.log.send.empty'));
            return;
        }

        const mode = sendMode.value;
        let dataToSend = raw;
        let displayData = raw;

        try {
            if (mode === 'hex') {
                const cleaned = raw.replace(/,/g, ' ').replace(/0x/g, '').trim();
                const parts = cleaned.split(/\s+/);
                const bytes = [];
                for (let p of parts) {
                    if (p === '') continue;
                    const val = parseInt(p, 16);
                    if (isNaN(val) || val < 0 || val > 255) {
                        addErrorLog(tf('ws.log.hex.invalid', { msg: p }));
                        return;
                    }
                    bytes.push(val);
                }
                if (bytes.length === 0) {
                    addErrorLog(t('ws.log.hex.no.bytes'));
                    return;
                }
                dataToSend = new Uint8Array(bytes);
                displayData = Array.from(bytes).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
                ws.send(dataToSend);
                sentCount++;
                addLog('sent', tf('ws.log.bytes', { n: bytes.length }) + ' ' + displayData, 'sent', 'HEX');
            } else if (mode === 'json') {
                let parsed;
                try {
                    parsed = JSON.parse(raw);
                } catch (e) {
                    addErrorLog(tf('ws.log.json.invalid', { msg: e.message }));
                    return;
                }
                const jsonStr = JSON.stringify(parsed);
                dataToSend = jsonStr;
                displayData = JSON.stringify(parsed, null, 2);
                ws.send(dataToSend);
                sentCount++;
                addLog('sent', displayData, 'sent');
            } else {
                ws.send(raw);
                sentCount++;
                addLog('sent', raw, 'sent');
            }
        } catch (e) {
            addErrorLog(tf('ws.log.send.fail', { msg: e.message }));
            return;
        }

        updateInfo();
    }

    function sendPing() {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            addErrorLog(t('ws.log.ping.not.connected'));
            return;
        }
        try {
            ws.send('ping');
            sentCount++;
            addLog('sent', t('ws.ping'), 'sent');
            updateInfo();
        } catch (e) {
            addErrorLog(tf('ws.log.ping.fail', { msg: e.message }));
        }
    }

    // ============================================================
    //  UI 事件绑定
    // ============================================================

    connectBtn.addEventListener('click', connectWs);
    disconnectBtn.addEventListener('click', disconnectWs);
    sendBtn.addEventListener('click', sendMessage);
    pingBtn.addEventListener('click', sendPing);

    sendInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    sendMode.addEventListener('change', function() {
        const hints = {
            'text': t('ws.hint.text'),
            'hex': t('ws.hint.hex'),
            'json': t('ws.hint.json')
        };
        sendHint.textContent = hints[this.value] || '';
        if (this.value === 'hex') {
            sendInput.placeholder = '01 02 03 FF 或 0x01 0x02';
        } else if (this.value === 'json') {
            sendInput.placeholder = '{"key": "value"}';
        } else {
            sendInput.placeholder = t('ws.send.placeholder');
        }
    });

    clearSendBtn.addEventListener('click', function() {
        sendInput.value = '';
    });

    clearLogBtn.addEventListener('click', function() {
        logContainer.innerHTML = '';
        logCount = 0;
        logCountLabel.textContent = t('ws.logcount.zero');
        addSystemLog(t('ws.log.cleared'));
    });

    function exportLogs() {
        const entries = logContainer.querySelectorAll('.log-entry');
        let text = t('ws.log.export.header') + '\n';
        text += tf('ws.log.export.time', { time: new Date().toLocaleString(timeLocale()) }) + '\n';
        text += '='.repeat(60) + '\n\n';
        entries.forEach(el => {
            text += el.textContent + '\n';
        });
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'websocket-log-' + new Date().toISOString().slice(0, 19).replace(/[:-]/g, '') + '.txt';
        a.click();
        URL.revokeObjectURL(a.href);
        addSystemLog(t('ws.log.exported'));
    }

    exportLogBtn.addEventListener('click', exportLogs);
    exportLogBtn2.addEventListener('click', exportLogs);

    scrollLockBtn.addEventListener('click', function() {
        autoScroll = !autoScroll;
        this.textContent = autoScroll ? t('ws.autoscroll') : t('ws.scroll.lock');
        this.classList.toggle('btn-outline', autoScroll);
        if (autoScroll) {
            const last = logContainer.lastElementChild;
            if (last) last.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
    });

    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            wsUrl.value = this.dataset.url;
        });
    });

    // ============================================================
    //  页面关闭时断开连接
    // ============================================================
    window.addEventListener('beforeunload', function() {
        if (ws) {
            try { ws.close(1000, t('ws.log.page.close')); } catch (e) {}
        }
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
        }
    });

    // ============================================================
    //  初始化
    // ============================================================
    updateStatus('disconnected', 'ws.status.not.connected');
    updateInfo();
    addSystemLog(t('ws.log.ready'));
    sendMode.dispatchEvent(new Event('change'));

    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    if (urlParam) {
        wsUrl.value = urlParam;
        addSystemLog(tf('ws.log.url.loaded', { url: urlParam }));
    }

    wsUrl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            connectWs();
        }
    });

    // 初始化文档标题
    document.title = t('ws.doc.title');

    // ============================================================
    //  语言切换：更新动态文本
    // ============================================================
    document.addEventListener('languagechange', function () {
        document.title = t('ws.doc.title');
        // 刷新状态徽章 / 状态文本
        updateStatus(currentStatus, currentStatusMsgKey);
        // 刷新统计信息（含计数单位、已发送计数）
        updateInfo();
        // 刷新发送模式提示与输入框占位符
        sendMode.dispatchEvent(new Event('change'));
        // 刷新滚动锁定按钮文本
        scrollLockBtn.textContent = autoScroll ? t('ws.autoscroll') : t('ws.scroll.lock');
        // 刷新日志计数标签
        logCountLabel.textContent = logCount === 0 ? t('ws.logcount.zero') : tf('ws.logcount.fmt', { n: logCount });
    });

    console.log('🔌 WebSocket 测试工具已加载');
})();
