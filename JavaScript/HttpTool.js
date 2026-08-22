// ============================================================
//  HttpTool.html 页面脚本
//  主题切换逻辑由 theme.js 提供（全局 setTheme + #themeToggle 点击绑定）
//  语言切换由 i18n.js 提供（data-i18n 自动更新 + languagechange 事件）
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },
    'http.doc.title':     { zh: 'HTTP 调试助手', en: 'HTTP Debug Helper' },
    'http.page.title':    { zh: '🌐 HTTP 调试助手', en: '🌐 HTTP Debug Helper' },
    'http.subhead':       { zh: '🔹 支持 GET / POST / PUT / DELETE / PATCH · 自动解析 URL · 生成 TCP 原始帧', en: '🔹 Supports GET / POST / PUT / DELETE / PATCH · Auto URL parsing · TCP raw frame generation' },
    'http.p1.title':      { zh: '① 请求配置', en: '① Request Config' },
    'http.method.label':  { zh: '方法', en: 'Method' },
    'http.timeout.label': { zh: '超时', en: 'Timeout' },
    'http.add.header':    { zh: '➕ 添加', en: '➕ Add' },
    'http.clear':         { zh: '清空', en: 'Clear' },
    'http.headers.hint':  { zh: 'Key: Value', en: 'Key: Value' },
    'http.body.format.form':  { zh: '表单', en: 'Form' },
    'http.body.format.text':  { zh: '文本', en: 'Text' },
    'http.send':          { zh: '🚀 发送请求', en: '🚀 Send Request' },
    'http.gen.tcp':       { zh: '🔍 生成TCP帧', en: '🔍 Gen TCP Frame' },
    'http.copy.tcp.cstr': { zh: '📋 复制C字符串', en: '📋 Copy C String' },
    'http.copy.req':      { zh: '📋 复制请求', en: '📋 Copy Request' },
    'http.tcp.empty':     { zh: '点击「生成TCP帧」预览通过TCP Socket发送的原始HTTP请求字符串', en: 'Click "Gen TCP Frame" to preview the raw HTTP request string sent via TCP Socket' },
    'http.tcp.empty.short': { zh: '点击「生成TCP帧」预览原始HTTP请求字符串', en: 'Click "Gen TCP Frame" to preview raw HTTP request string' },
    'http.parse.protocol': { zh: '协议', en: 'Protocol' },
    'http.parse.host':     { zh: '主机', en: 'Host' },
    'http.parse.port':     { zh: '端口', en: 'Port' },
    'http.parse.path':     { zh: '路径', en: 'Path' },
    'http.p2.title':       { zh: '② 响应数据', en: '② Response Data' },
    'http.resp.waiting':   { zh: '等待请求', en: 'Waiting' },
    'http.status.label':   { zh: '状态', en: 'Status' },
    'http.copy.status':    { zh: '📋 复制状态', en: '📋 Copy Status' },
    'http.resp.headers.label': { zh: '响应头', en: 'Headers' },
    'http.copy':           { zh: '📋 复制', en: '📋 Copy' },
    'http.headers.none':   { zh: '(无)', en: '(none)' },
    'http.headers.waiting': { zh: '(等待响应)', en: '(waiting)' },
    'http.headers.error':   { zh: '(错误)', en: '(error)' },
    'http.resp.body.label': { zh: '响应体', en: 'Body' },
    'http.copy.resp.raw':  { zh: '📋 复制原始', en: '📋 Copy Raw' },
    'http.copy.resp.cstr': { zh: '📋 复制C字符串', en: '📋 Copy C String' },
    'http.auto.format.json': { zh: '自动格式化JSON', en: 'Auto format JSON' },
    'http.resp.body.empty': { zh: '等待响应 ...', en: 'Waiting for response ...' },
    'http.body.waiting':   { zh: '⏳ 等待响应...', en: '⏳ Waiting for response...' },
    'http.p3.title':       { zh: '③ 快捷指令', en: '③ Quick Commands' },
    'http.p3.small':       { zh: '点击快速填充（仅路径，需配合 URL）', en: 'Click to fill path quickly (requires URL)' },
    'http.export':         { zh: '📤 导出', en: '📤 Export' },
    'http.import':         { zh: '📥 导入', en: '📥 Import' },
    'http.add.cmd.label':  { zh: '添加指令', en: 'Add Command' },
    'http.add.cmd':        { zh: '➕ 添加', en: '➕ Add' },
    'http.reset.default':  { zh: '↺ 默认', en: '↺ Default' },
    'http.p4.title':       { zh: '④ 请求历史', en: '④ Request History' },
    'http.history.count.zero': { zh: '0 条', en: '0 items' },
    'http.history.count.unit': { zh: '条', en: 'items' },
    'http.clear.history':  { zh: '清空历史', en: 'Clear History' },
    'http.export.history': { zh: '导出历史', en: 'Export History' },
    'http.history.col.time':     { zh: '时间', en: 'Time' },
    'http.history.col.method':   { zh: '方法', en: 'Method' },
    'http.history.col.url':      { zh: 'URL', en: 'URL' },
    'http.history.col.status':   { zh: '状态', en: 'Status' },
    'http.history.col.duration': { zh: '耗时', en: 'Duration' },
    'http.history.col.action':   { zh: '操作', en: 'Action' },
    'http.history.empty':  { zh: '暂无历史记录', en: 'No history records' },
    'http.footer':         { zh: '🌐 HTTP 调试助手 · 嵌入式工程师专用 · 自动解析 URL · 生成 TCP 原始帧 · 历史记录持久化', en: '🌐 HTTP Debug Helper · For embedded engineers · Auto URL parsing · TCP raw frame generation · Persistent history' },
    'http.header.del.title': { zh: '删除', en: 'Delete' },
    'http.body.placeholder': { zh: '请求体内容 ...', en: 'Request body content ...' },
    'http.cmd.path.placeholder':     { zh: '路径 (如 /api/status)', en: 'Path (e.g. /api/status)' },
    'http.cmd.comment.placeholder':  { zh: '注释', en: 'Comment' },
    // 动态文本
    'http.alert.input.url':      { zh: '请输入 URL', en: 'Please enter a URL' },
    'http.alert.input.path':     { zh: '请输入路径', en: 'Please enter a path' },
    'http.alert.json.parse.fail': { zh: 'JSON 解析失败', en: 'JSON parse failed' },
    'http.alert.no.history.export': { zh: '没有历史记录可导出', en: 'No history to export' },
    'http.alert.gen.tcp.first':  { zh: '请先生成 TCP 帧', en: 'Please generate TCP frame first' },
    'http.alert.copy.fail':     { zh: '复制失败，请手动复制', en: 'Copy failed, please copy manually' },
    'http.status.cleared':      { zh: '已清空', en: 'Cleared' },
    'http.status.success':      { zh: '✅ 成功', en: '✅ Success' },
    'http.status.fail':         { zh: '❌ 失败', en: '❌ Failed' },
    'http.status.error':        { zh: '❌ 错误', en: '❌ Error' },
    'http.btn.sending':         { zh: '⏳ 发送中...', en: '⏳ Sending...' },
    'http.status.requesting':   { zh: '⏳ 请求中...', en: '⏳ Requesting...' },
    'http.detail.sending':      { zh: '发送中...', en: 'Sending...' },
    'http.error.timeout':       { zh: '请求超时', en: 'Request timeout' },
    'http.cmds.empty':          { zh: '暂无快捷指令', en: 'No quick commands' },
    'http.replay':              { zh: '↻ 重放', en: '↻ Replay' },
    'http.copied':              { zh: '✅ 已复制', en: '✅ Copied' },
    'http.tcp.invalid.url':     { zh: '⚠️ 请先输入有效的 URL', en: '⚠️ Please enter a valid URL first' },
    'http.tcp.https.note':      { zh: '⚠️ 注意：此请求使用 HTTPS，原始 TCP 帧仅适用于纯文本 HTTP（需关闭 TLS 或使用 HTTP 端口）。', en: '⚠️ Note: This request uses HTTPS. The raw TCP frame only applies to plain-text HTTP (disable TLS or use an HTTP port).' },
    'http.size.chars':          { zh: '字符', en: 'chars' }
};

(function() {
    'use strict';

    // ============================================================
    //  DOM 引用
    // ============================================================
    const httpMethod = document.getElementById('httpMethod');
    const httpUrl = document.getElementById('httpUrl');
    const httpTimeout = document.getElementById('httpTimeout');
    const httpBody = document.getElementById('httpBody');
    const headersContainer = document.getElementById('headersContainer');
    const addHeaderBtn = document.getElementById('addHeaderBtn');
    const clearHeadersBtn = document.getElementById('clearHeadersBtn');
    const sendBtn = document.getElementById('sendBtn');
    const genTcpBtn = document.getElementById('genTcpBtn');
    const copyTcpBtn = document.getElementById('copyTcpBtn');
    const tcpFrameDisplay = document.getElementById('tcpFrameDisplay');
    const clearReqBtn = document.getElementById('clearReqBtn');
    const duplicateReqBtn = document.getElementById('duplicateReqBtn');

    const respStatus = document.getElementById('respStatus');
    const respStatusDetail = document.getElementById('respStatusDetail');
    const respTime = document.getElementById('respTime');
    const respHeadersDisplay = document.getElementById('respHeadersDisplay');
    const respBodyDisplay = document.getElementById('respBodyDisplay');
    const respSize = document.getElementById('respSize');
    const copyStatusBtn = document.getElementById('copyStatusBtn');
    const copyHeadersBtn = document.getElementById('copyHeadersBtn');
    const copyRespRawBtn = document.getElementById('copyRespRawBtn');
    const copyRespCStrBtn = document.getElementById('copyRespCStrBtn');
    const clearRespBtn = document.getElementById('clearRespBtn');
    const autoFormatJson = document.getElementById('autoFormatJson');

    const cmdContainer = document.getElementById('cmdContainer');
    const cmdMethodSelect = document.getElementById('cmdMethodSelect');
    const customCmdPath = document.getElementById('customCmdPath');
    const customCmdComment = document.getElementById('customCmdComment');
    const addCmdBtn = document.getElementById('addCmdBtn');
    const resetCmdBtn = document.getElementById('resetCmdBtn');
    const exportCmdsBtn = document.getElementById('exportCmdsBtn');
    const importCmdsBtn = document.getElementById('importCmdsBtn');
    const importCmdsInput = document.getElementById('importCmdsInput');

    const historyBody = document.getElementById('historyBody');
    const historyCount = document.getElementById('historyCount');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const exportHistoryBtn = document.getElementById('exportHistoryBtn');

    const bodyFormatSelector = document.getElementById('bodyFormatSelector');
    const bodyFormatHint = document.getElementById('bodyFormatHint');

    // 解析显示元素
    const parsedProtocol = document.getElementById('parsedProtocol');
    const parsedHost = document.getElementById('parsedHost');
    const parsedPort = document.getElementById('parsedPort');
    const parsedPath = document.getElementById('parsedPath');

    // ============================================================
    //  状态
    // ============================================================
    let lastResponse = null; // 保存最后一次响应对象 { status, statusText, headers, body, duration }
    let currentBodyFormat = 'json';
    let cmdList = [];
    let historyList = [];
    const MAX_HISTORY = 50;
    let parsedUrlInfo = null; // 缓存解析结果
    // 响应显示阶段：'waiting' | 'requesting' | 'done' | 'error' | 'cleared'
    let respPhase = 'waiting';
    let lastErrorMessage = '';   // 最近一次错误原始消息（非超时）
    let lastErrorTimeout = null; // 超时错误时记录超时值，否则 null

    /** 翻译快捷方法（i18n.js 已在本脚本之前加载） */
    function t(key) { return window.I18N ? window.I18N.t(key) : ''; }

    // ============================================================
    //  URL 解析与显示
    // ============================================================
    function parseUrl(url) {
        if (!url || !url.trim()) return null;
        try {
            const u = new URL(url);
            let host = u.hostname;
            let port = u.port;
            if (!port) {
                port = u.protocol === 'https:' ? '443' : '80';
            }
            return {
                protocol: u.protocol.replace(':', ''),
                host: host,
                port: port,
                path: u.pathname + u.search,
                full: url
            };
        } catch (e) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                return parseUrl('http://' + url);
            }
            return null;
        }
    }

    function updateUrlParseDisplay() {
        const url = httpUrl.value.trim();
        const info = parseUrl(url);
        if (info) {
            parsedProtocol.textContent = info.protocol;
            parsedHost.textContent = info.host;
            parsedPort.textContent = info.port;
            parsedPath.textContent = info.path || '/';
            parsedUrlInfo = info;
        } else {
            parsedProtocol.textContent = '—';
            parsedHost.textContent = '—';
            parsedPort.textContent = '—';
            parsedPath.textContent = '—';
            parsedUrlInfo = null;
        }
        // 清空之前的 TCP 预览，因为 URL 变了
        tcpFrameDisplay.innerHTML = '<span class="empty-hint" data-i18n="http.tcp.empty.short">' + t('http.tcp.empty.short') + '</span>';
        copyTcpBtn.disabled = true;
    }

    httpUrl.addEventListener('input', updateUrlParseDisplay);
    // 初始解析
    updateUrlParseDisplay();

    // ============================================================
    //  Headers 管理
    // ============================================================
    function getHeaders() {
        const rows = headersContainer.querySelectorAll('.header-row');
        const headers = {};
        rows.forEach(row => {
            const key = row.querySelector('.header-key').value.trim();
            const val = row.querySelector('.header-val').value.trim();
            if (key) headers[key] = val;
        });
        return headers;
    }

    function setHeaders(headers) {
        headersContainer.innerHTML = '';
        if (!headers || Object.keys(headers).length === 0) {
            addHeaderRow('', '');
            return;
        }
        for (const [k, v] of Object.entries(headers)) {
            addHeaderRow(k, v);
        }
    }

    function addHeaderRow(key, val) {
        const row = document.createElement('div');
        row.className = 'header-row';
        const kInput = document.createElement('input');
        kInput.className = 'header-key';
        kInput.placeholder = 'Key';
        kInput.value = key || '';
        const vInput = document.createElement('input');
        vInput.className = 'header-val';
        vInput.placeholder = 'Value';
        vInput.value = val || '';
        const del = document.createElement('span');
        del.className = 'header-del';
        del.textContent = '✕';
        del.addEventListener('click', () => {
            if (headersContainer.querySelectorAll('.header-row').length > 1) {
                row.remove();
            } else {
                kInput.value = '';
                vInput.value = '';
            }
        });
        row.appendChild(kInput);
        row.appendChild(vInput);
        row.appendChild(del);
        headersContainer.appendChild(row);
    }

    addHeaderBtn.addEventListener('click', () => addHeaderRow('', ''));
    clearHeadersBtn.addEventListener('click', () => {
        headersContainer.innerHTML = '';
        addHeaderRow('', '');
    });

    setHeaders({ 'Content-Type': 'application/json' });

    // ============================================================
    //  Body 格式切换
    // ============================================================
    bodyFormatSelector.addEventListener('click', (e) => {
        const btn = e.target.closest('.fmt-btn');
        if (!btn) return;
        const fmt = btn.dataset.format;
        if (fmt === currentBodyFormat) return;
        currentBodyFormat = fmt;
        bodyFormatSelector.querySelectorAll('.fmt-btn').forEach(b => b.classList.toggle('active', b.dataset
            .format === fmt));
        const hints = {
            json: 'application/json',
            form: 'application/x-www-form-urlencoded',
            text: 'text/plain',
            raw: 'application/octet-stream'
        };
        bodyFormatHint.textContent = hints[fmt] || '';
        updateContentType(fmt);
    });

    function updateContentType(fmt) {
        const rows = headersContainer.querySelectorAll('.header-row');
        let found = false;
        rows.forEach(row => {
            const key = row.querySelector('.header-key');
            if (key.value.trim().toLowerCase() === 'content-type') {
                const val = row.querySelector('.header-val');
                const mimeMap = {
                    json: 'application/json',
                    form: 'application/x-www-form-urlencoded',
                    text: 'text/plain',
                    raw: 'application/octet-stream'
                };
                val.value = mimeMap[fmt] || 'application/octet-stream';
                found = true;
            }
        });
        if (!found) {
            const mimeMap = {
                json: 'application/json',
                form: 'application/x-www-form-urlencoded',
                text: 'text/plain',
                raw: 'application/octet-stream'
            };
            addHeaderRow('Content-Type', mimeMap[fmt] || 'application/octet-stream');
        }
    }

    // ============================================================
    //  生成 TCP 原始帧（使用解析出的 IP/端口）
    // ============================================================
    function generateRawTcpFrame() {
        if (!parsedUrlInfo) {
            tcpFrameDisplay.textContent = t('http.tcp.invalid.url');
            tcpFrameDisplay.style.color = 'var(--status-error-text)';
            copyTcpBtn.disabled = true;
            return null;
        }

        const method = httpMethod.value;
        const { host, port, path, protocol } = parsedUrlInfo;
        const headers = getHeaders();
        let body = httpBody.value;

        // 构建 Host 头
        let hostHeader = host;
        const defaultPort = protocol === 'https' ? 443 : 80;
        if (parseInt(port) !== defaultPort) {
            hostHeader += ':' + port;
        }

        let raw = `${method} ${path} HTTP/1.1\r\n`;
        let hasHost = false;
        for (const key of Object.keys(headers)) {
            if (key.toLowerCase() === 'host') hasHost = true;
        }
        if (!hasHost) {
            raw += `Host: ${hostHeader}\r\n`;
        }

        let hasContentLength = false;
        for (const key of Object.keys(headers)) {
            if (key.toLowerCase() === 'content-length') hasContentLength = true;
        }
        const noBodyMethods = ['GET', 'HEAD', 'OPTIONS'];
        const shouldHaveBody = body && !noBodyMethods.includes(method);
        if (shouldHaveBody && !hasContentLength) {
            const encoder = new TextEncoder();
            const byteLength = encoder.encode(body).length;
            raw += `Content-Length: ${byteLength}\r\n`;
        }

        for (const [key, val] of Object.entries(headers)) {
            const lowerKey = key.toLowerCase();
            if (lowerKey === 'host' || lowerKey === 'content-length') continue;
            raw += `${key}: ${val}\r\n`;
        }
        raw += `\r\n`;
        if (shouldHaveBody) {
            raw += body;
        }

        let note = '';
        if (protocol === 'https') {
            note = '\n\n' + t('http.tcp.https.note');
        }
        return raw + note;
    }

    function updateTcpPreview() {
        const raw = generateRawTcpFrame();
        if (raw === null) return;
        tcpFrameDisplay.textContent = raw;
        tcpFrameDisplay.style.color = ''; // 清除内联样式，使用CSS变量
        copyTcpBtn.disabled = false;
    }

    genTcpBtn.addEventListener('click', updateTcpPreview);

    copyTcpBtn.addEventListener('click', () => {
        const raw = tcpFrameDisplay.textContent;
        if (!raw || raw.startsWith('⚠️') || tcpFrameDisplay.querySelector('.empty-hint')) {
            alert(t('http.alert.gen.tcp.first'));
            return;
        }
        let escaped = raw.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r/g, '\\r').replace(/\n/g,
        '\\n');
        const finalStr = `"${escaped}"`;
        navigator.clipboard?.writeText(finalStr).then(() => {
            const orig = copyTcpBtn.textContent;
            copyTcpBtn.textContent = t('http.copied');
            setTimeout(() => copyTcpBtn.textContent = orig, 1500);
        }).catch(() => {
            const area = document.createElement('textarea');
            area.value = finalStr;
            document.body.appendChild(area);
            area.select();
            document.execCommand('copy');
            area.remove();
            const orig = copyTcpBtn.textContent;
            copyTcpBtn.textContent = t('http.copied');
            setTimeout(() => copyTcpBtn.textContent = orig, 1500);
        });
    });

    // ============================================================
    //  快捷指令（仅路径）
    // ============================================================
    const DEFAULT_CMDS = [
        { method: 'GET', url: '/api/status', comment: '获取设备状态' },
        { method: 'GET', url: '/api/config', comment: '获取配置' },
        { method: 'POST', url: '/api/config', comment: '设置配置' },
        { method: 'GET', url: '/api/data', comment: '获取数据' },
        { method: 'POST', url: '/api/command', comment: '发送命令' },
        { method: 'GET', url: '/api/health', comment: '健康检查' },
    ];

    function loadCmds() {
        try {
            const s = localStorage.getItem('http_cmds');
            if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length) cmdList = p; return; }
        } catch (e) {}
        cmdList = [...DEFAULT_CMDS];
    }
    loadCmds();

    function saveCmds() {
        try { localStorage.setItem('http_cmds', JSON.stringify(cmdList)); } catch (e) {}
    }

    function renderCmds() {
        cmdContainer.innerHTML = '';
        if (cmdList.length === 0) {
            const span = document.createElement('span');
            span.className = 'hint-text';
            span.textContent = t('http.cmds.empty');
            cmdContainer.appendChild(span);
            return;
        }
        cmdList.forEach((item, idx) => {
            const method = item.method || 'GET';
            const url = item.url || '';
            const comment = item.comment || '';
            const wrapper = document.createElement('span');
            wrapper.className = 'cmd-item';
            const btn = document.createElement('button');
            btn.className = 'cmd-btn';
            btn.textContent = `${method} ${url}`;
            btn.title = comment || url;
            btn.addEventListener('click', () => {
                httpMethod.value = method;
                const currentUrl = httpUrl.value.trim();
                let newUrl = currentUrl;
                if (currentUrl) {
                    try {
                        const u = new URL(currentUrl);
                        u.pathname = url;
                        u.search = '';
                        newUrl = u.toString();
                    } catch (e) {
                        newUrl = currentUrl + url;
                    }
                } else {
                    newUrl = 'http://localhost' + url;
                }
                httpUrl.value = newUrl;
                updateUrlParseDisplay();
                if (item.body) httpBody.value = item.body;
            });
            wrapper.appendChild(btn);
            if (comment) {
                const label = document.createElement('span');
                label.className = 'cmd-label';
                label.textContent = comment;
                wrapper.appendChild(label);
            }
            const del = document.createElement('span');
            del.className = 'cmd-del';
            del.textContent = '✕';
            del.addEventListener('click', (e) => {
                e.stopPropagation();
                cmdList.splice(idx, 1);
                renderCmds();
                saveCmds();
            });
            wrapper.appendChild(del);
            cmdContainer.appendChild(wrapper);
        });
    }

    addCmdBtn.addEventListener('click', () => {
        const method = cmdMethodSelect.value;
        const url = customCmdPath.value.trim();
        const comment = customCmdComment.value.trim();
        if (!url) { alert(t('http.alert.input.path')); return; }
        cmdList.push({ method, url, comment });
        renderCmds();
        saveCmds();
        customCmdPath.value = '';
        customCmdComment.value = '';
    });
    customCmdPath.addEventListener('keydown', (e) => { if (e.key === 'Enter') addCmdBtn.click(); });

    resetCmdBtn.addEventListener('click', () => {
        cmdList = [...DEFAULT_CMDS];
        renderCmds();
        saveCmds();
    });

    exportCmdsBtn.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(cmdList, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'http_commands.json';
        a.click();
    });
    importCmdsBtn.addEventListener('click', () => importCmdsInput.click());
    importCmdsInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const data = JSON.parse(ev.target.result);
                    if (Array.isArray(data)) { cmdList = data;
                        renderCmds();
                        saveCmds(); }
                } catch (err) { alert(t('http.alert.json.parse.fail')); }
            };
            reader.readAsText(e.target.files[0]);
            e.target.value = '';
        }
    });

    renderCmds();

    // ============================================================
    //  历史记录
    // ============================================================
    function loadHistory() {
        try {
            const s = localStorage.getItem('http_history');
            if (s) { const p = JSON.parse(s); if (Array.isArray(p)) historyList = p; }
        } catch (e) {}
    }
    loadHistory();

    function saveHistory() {
        try { localStorage.setItem('http_history', JSON.stringify(historyList)); } catch (e) {}
    }

    function addHistory(entry) {
        historyList.unshift(entry);
        if (historyList.length > MAX_HISTORY) historyList.pop();
        saveHistory();
        renderHistory();
    }

    function renderHistory() {
        if (historyList.length === 0) {
            historyBody.innerHTML =
                '<tr><td colspan="6" style="text-align:center;color:var(--text-light);padding:20px;">' + t('http.history.empty') + '</td></tr>';
            historyCount.textContent = t('http.history.count.zero');
            return;
        }
        let html = '';
        for (const h of historyList) {
            const time = h.time || '--';
            const method = h.method || 'GET';
            const url = h.url || '';
            const status = h.status || '--';
            const statusText = h.statusText || '';
            const duration = h.duration || 0;
            const statusClass = status >= 200 && status < 300 ? 'status-ok' :
                status >= 400 ? 'status-error' :
                status > 0 ? 'status-warn' : 'status-info';
            html += `<tr>
                <td style="font-size:0.6rem;color:var(--text-muted);">${time}</td>
                <td><span class="method-tag ${method}">${method}</span></td>
                <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${url}">${url}</td>
                <td><span class="${statusClass}">${status} ${statusText}</span></td>
                <td style="font-size:0.6rem;color:var(--text-muted);">${duration}ms</td>
                <td>
                    <button class="btn btn-outline btn-sm replay-btn" data-idx="${historyList.indexOf(h)}" style="padding:1px 8px;font-size:0.6rem;">${t('http.replay')}</button>
                </td>
            </tr>`;
        }
        historyBody.innerHTML = html;
        historyCount.textContent = historyList.length + ' ' + t('http.history.count.unit');

        historyBody.querySelectorAll('.replay-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.dataset.idx);
                const entry = historyList[idx];
                if (entry) {
                    httpMethod.value = entry.method || 'GET';
                    httpUrl.value = entry.url || '';
                    if (entry.headers) setHeaders(entry.headers);
                    if (entry.body) httpBody.value = entry.body;
                    updateUrlParseDisplay();
                    sendRequest();
                }
            });
        });
    }

    clearHistoryBtn.addEventListener('click', () => {
        historyList = [];
        saveHistory();
        renderHistory();
    });

    exportHistoryBtn.addEventListener('click', () => {
        if (historyList.length === 0) { alert(t('http.alert.no.history.export')); return; }
        const data = historyList.map(h => ({
            time: h.time,
            method: h.method,
            url: h.url,
            status: h.status,
            statusText: h.statusText,
            duration: h.duration,
            headers: h.headers,
            body: h.body
        }));
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `http_history_${Date.now()}.json`;
        a.click();
    });

    renderHistory();

    // ============================================================
    //  响应数据更新函数
    // ============================================================
    function updateResponseDisplay(response) {
        if (!response) {
            respPhase = 'cleared';
            respStatus.textContent = t('http.status.cleared');
            respStatusDetail.textContent = '—';
            respBodyDisplay.innerHTML = '<span class="empty-hint" data-i18n="http.resp.body.empty">' + t('http.resp.body.empty') + '</span>';
            respHeadersDisplay.textContent = t('http.headers.none');
            respTime.style.display = 'none';
            respSize.textContent = '';
            copyStatusBtn.disabled = true;
            copyHeadersBtn.disabled = true;
            copyRespRawBtn.disabled = true;
            copyRespCStrBtn.disabled = true;
            return;
        }

        respPhase = 'done';
        const isOk = response.status >= 200 && response.status < 300;
        respStatus.textContent = isOk ? t('http.status.success') : t('http.status.fail');
        respStatusDetail.innerHTML =
            `<span style="font-weight:700;color:${isOk ? 'var(--status-ok-text)' : 'var(--status-error-text)'};">${response.status} ${response.statusText}</span>`;
        respTime.style.display = 'inline';
        respTime.textContent = `${response.duration}ms`;
        copyStatusBtn.disabled = false;

        const headerStr = Object.entries(response.headers).map(([k, v]) => `${k}: ${v}`).join('\n');
        respHeadersDisplay.textContent = headerStr || t('http.headers.none');
        copyHeadersBtn.disabled = false;

        let bodyText = response.body;
        let displayBody = bodyText;
        const autoFormat = autoFormatJson.checked;
        if (autoFormat) {
            try {
                const parsed = JSON.parse(bodyText);
                displayBody = JSON.stringify(parsed, null, 2);
            } catch (e) {
                displayBody = bodyText;
            }
        } else {
            displayBody = bodyText;
        }
        respBodyDisplay.textContent = displayBody;
        respSize.textContent = `${bodyText ? bodyText.length : 0} ${t('http.size.chars')}`;
        copyRespRawBtn.disabled = false;
        copyRespCStrBtn.disabled = false;

        lastResponse = response;
    }

    // ============================================================
    //  复制功能
    // ============================================================
    function copyToClipboard(text, btnElement) {
        if (!text) return;
        navigator.clipboard?.writeText(text).then(() => {
            const orig = btnElement.textContent;
            btnElement.textContent = t('http.copied');
            setTimeout(() => btnElement.textContent = orig, 1500);
        }).catch(() => {
            const area = document.createElement('textarea');
            area.value = text;
            document.body.appendChild(area);
            area.select();
            document.execCommand('copy');
            area.remove();
            const orig = btnElement.textContent;
            btnElement.textContent = t('http.copied');
            setTimeout(() => btnElement.textContent = orig, 1500);
        });
    }

    copyStatusBtn.addEventListener('click', () => {
        if (!lastResponse) return;
        const text = `${lastResponse.status} ${lastResponse.statusText}`;
        copyToClipboard(text, copyStatusBtn);
    });

    copyHeadersBtn.addEventListener('click', () => {
        if (!lastResponse) return;
        const text = Object.entries(lastResponse.headers).map(([k, v]) => `${k}: ${v}`).join('\n');
        copyToClipboard(text, copyHeadersBtn);
    });

    copyRespRawBtn.addEventListener('click', () => {
        if (!lastResponse) return;
        copyToClipboard(lastResponse.body || '', copyRespRawBtn);
    });

    copyRespCStrBtn.addEventListener('click', () => {
        if (!lastResponse) return;
        let raw = lastResponse.body || '';
        let escaped = raw.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r/g, '\\r').replace(/\n/g,
        '\\n');
        const finalStr = `"${escaped}"`;
        copyToClipboard(finalStr, copyRespCStrBtn);
    });

    // ============================================================
    //  发送 HTTP 请求（fetch）
    // ============================================================
    async function sendRequest() {
        const url = httpUrl.value.trim();
        if (!url) {
            alert(t('http.alert.input.url'));
            return;
        }
        const method = httpMethod.value;
        const timeout = parseInt(httpTimeout.value) || 10000;

        respPhase = 'requesting';
        sendBtn.disabled = true;
        sendBtn.textContent = t('http.btn.sending');
        respStatus.textContent = t('http.status.requesting');
        respStatusDetail.textContent = t('http.detail.sending');
        respBodyDisplay.innerHTML = '<span style="color:var(--text-light);" data-i18n="http.body.waiting">' + t('http.body.waiting') + '</span>';
        respHeadersDisplay.textContent = t('http.headers.waiting');
        respTime.style.display = 'none';
        respSize.textContent = '';
        copyStatusBtn.disabled = true;
        copyHeadersBtn.disabled = true;
        copyRespRawBtn.disabled = true;
        copyRespCStrBtn.disabled = true;
        lastResponse = null;

        const headers = getHeaders();
        const bodyFormat = currentBodyFormat;
        let body = httpBody.value;

        let finalBody = null;
        let contentType = headers['Content-Type'] || '';
        if (bodyFormat === 'json') {
            if (body.trim()) {
                try { JSON.parse(body);
                    finalBody = body; } catch (e) { finalBody = body; }
            }
            if (!contentType.includes('json')) headers['Content-Type'] = 'application/json';
        } else if (bodyFormat === 'form') {
            if (body.trim()) {
                try {
                    const params = new URLSearchParams();
                    const pairs = body.split('&').filter(p => p.includes('='));
                    for (const p of pairs) {
                        const [k, v] = p.split('=');
                        if (k) params.append(k, v || '');
                    }
                    finalBody = params.toString();
                } catch (e) { finalBody = body; }
            }
            if (!contentType.includes('urlencoded')) headers['Content-Type'] =
                'application/x-www-form-urlencoded';
        } else if (bodyFormat === 'text') {
            finalBody = body;
            if (!contentType.includes('text')) headers['Content-Type'] = 'text/plain';
        } else {
            finalBody = body;
            if (!contentType) headers['Content-Type'] = 'application/octet-stream';
        }

        const noBodyMethods = ['GET', 'HEAD', 'OPTIONS'];
        if (noBodyMethods.includes(method)) finalBody = null;

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);
        const startTime = performance.now();

        try {
            const fetchOptions = { method, headers, signal: controller.signal };
            if (finalBody) fetchOptions.body = finalBody;

            const response = await fetch(url, fetchOptions);
            clearTimeout(timer);
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);

            let respText = '';
            const contentTypeResp = response.headers.get('content-type') || '';
            if (contentTypeResp.includes('application/json')) {
                try {
                    const json = await response.json();
                    respText = JSON.stringify(json);
                } catch (e) { respText = await response.text(); }
            } else {
                respText = await response.text();
            }

            const statusCode = response.status;
            const statusText = response.statusText || '';

            const headersObj = {};
            response.headers.forEach((v, k) => { headersObj[k] = v; });

            const respObj = {
                status: statusCode,
                statusText: statusText,
                headers: headersObj,
                body: respText,
                duration: duration
            };
            updateResponseDisplay(respObj);

            const now = new Date();
            const timeStr = now.toTimeString().slice(0, 8);
            addHistory({
                time: timeStr,
                method,
                url,
                status: statusCode,
                statusText,
                duration,
                headers,
                body: httpBody.value,
            });

        } catch (err) {
            clearTimeout(timer);
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);

            let errMsg = err.message;
            let isTimeout = false;
            if (err.name === 'AbortError') {
                isTimeout = true;
                errMsg = t('http.error.timeout') + ' (' + timeout + 'ms)';
            }
            // 记录错误信息，便于语言切换时重新渲染
            lastErrorMessage = isTimeout ? '' : errMsg;
            lastErrorTimeout = isTimeout ? timeout : null;
            respPhase = 'error';
            respStatus.textContent = t('http.status.error');
            respStatusDetail.innerHTML = `<span style="color:var(--status-error-text);">${errMsg}</span>`;
            respBodyDisplay.innerHTML = `<span style="color:var(--status-error-text);">${errMsg}</span>`;
            respHeadersDisplay.textContent = t('http.headers.error');
            respTime.style.display = 'inline';
            respTime.textContent = `${duration}ms`;
            respSize.textContent = '';
            copyStatusBtn.disabled = true;
            copyHeadersBtn.disabled = true;
            copyRespRawBtn.disabled = true;
            copyRespCStrBtn.disabled = true;
            lastResponse = null;
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = t('http.send');
        }
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    sendBtn.addEventListener('click', sendRequest);

    httpBody.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            sendRequest();
        }
    });
    httpUrl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendRequest();
    });

    clearReqBtn.addEventListener('click', () => {
        httpUrl.value = '';
        httpBody.value = '';
        tcpFrameDisplay.innerHTML = '<span class="empty-hint" data-i18n="http.tcp.empty.short">' + t('http.tcp.empty.short') + '</span>';
        copyTcpBtn.disabled = true;
        updateUrlParseDisplay();
    });

    duplicateReqBtn.addEventListener('click', () => {
        const data = {
            method: httpMethod.value,
            url: httpUrl.value,
            headers: getHeaders(),
            body: httpBody.value
        };
        const text = JSON.stringify(data, null, 2);
        navigator.clipboard?.writeText(text).then(() => {
            const orig = duplicateReqBtn.textContent;
            duplicateReqBtn.textContent = t('http.copied');
            setTimeout(() => duplicateReqBtn.textContent = orig, 1500);
        }).catch(() => alert(t('http.alert.copy.fail')));
    });

    clearRespBtn.addEventListener('click', () => {
        updateResponseDisplay(null);
        copyStatusBtn.disabled = true;
        copyHeadersBtn.disabled = true;
        copyRespRawBtn.disabled = true;
        copyRespCStrBtn.disabled = true;
        lastResponse = null;
    });

    autoFormatJson.addEventListener('change', () => {
        if (lastResponse) {
            updateResponseDisplay(lastResponse);
        }
    });

    // ============================================================
    //  初始化：从 URL 参数加载
    // ============================================================
    (function parseUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const url = params.get('url');
        const method = params.get('method');
        const body = params.get('body');
        if (url) httpUrl.value = url;
        if (method) httpMethod.value = method;
        if (body) httpBody.value = body;
        updateUrlParseDisplay();
    })();

    // 初始化文档标题
    document.title = t('http.doc.title');

    // ============================================================
    //  语言切换：更新动态文本
    // ============================================================
    document.addEventListener('languagechange', function () {
        document.title = t('http.doc.title');
        // 重新渲染指令 / 历史（含空状态、重放按钮等动态文本）
        renderCmds();
        renderHistory();
        // 根据当前响应阶段刷新响应显示区（applyTranslations 已更新静态文本，这里修正动态部分）
        if (respPhase === 'requesting') {
            respStatus.textContent = t('http.status.requesting');
            respStatusDetail.textContent = t('http.detail.sending');
            respHeadersDisplay.textContent = t('http.headers.waiting');
        } else if (respPhase === 'done' && lastResponse) {
            updateResponseDisplay(lastResponse);
        } else if (respPhase === 'error') {
            let errMsg = lastErrorTimeout !== null
                ? (t('http.error.timeout') + ' (' + lastErrorTimeout + 'ms)')
                : lastErrorMessage;
            respStatus.textContent = t('http.status.error');
            respStatusDetail.innerHTML = '<span style="color:var(--status-error-text);">' + errMsg + '</span>';
            respBodyDisplay.innerHTML = '<span style="color:var(--status-error-text);">' + errMsg + '</span>';
            respHeadersDisplay.textContent = t('http.headers.error');
        } else if (respPhase === 'cleared') {
            respStatus.textContent = t('http.status.cleared');
        }
        // waiting 阶段由 applyTranslations 自动处理
    });

    console.log('🌐 HTTP 调试助手已加载 (URL解析模式)');
})();
