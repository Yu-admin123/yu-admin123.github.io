// ============================================================
//  BLE_Debugger.html 页面脚本
//  主题切换由 theme.js 提供，语言切换由 i18n.js 提供
//  此处仅处理蓝牙调试业务逻辑
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + JS 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    'ble.doc.title':       { zh: '蓝牙调试器', en: 'BLE Debugger' },
    'ble.page.title':      { zh: '📡 蓝牙调试器', en: '📡 BLE Debugger' },
    'ble.subhead':         { zh: '🔹 基于 Web Bluetooth API · 扫描/连接/读写/通知 · 树形服务浏览器 · Hex Dump', en: '🔹 Web Bluetooth API · scan / connect / read / write / notify · tree explorer · hex dump' },
    'ble.warn.https':      { zh: '⚠️ Web Bluetooth 需要 HTTPS 或 localhost 环境，请使用本地 HTTP 服务器并在浏览器中打开。', en: '⚠️ Web Bluetooth requires HTTPS or localhost. Please use a local HTTP server and open in browser.' },
    'ble.warn.https.detail':{ zh: '当前环境不支持 Web Bluetooth API，请使用 https:// 或 http://localhost 访问。', en: 'Current environment does not support Web Bluetooth API. Use https:// or http://localhost.' },

    // Panel ①
    'ble.p1.title':        { zh: '① 蓝牙扫描', en: '① Bluetooth Scan' },
    'ble.p1.small':        { zh: '扫描 & 连接', en: 'Scan & Connect' },
    'ble.status.ready':    { zh: '就绪', en: 'Ready' },
    'ble.status.scanning': { zh: '扫描中...', en: 'Scanning...' },
    'ble.status.connected':{ zh: '已连接', en: 'Connected' },
    'ble.status.disconnected': { zh: '已断开', en: 'Disconnected' },
    'ble.btn.scan':        { zh: '🔍 扫描设备', en: '🔍 Scan Devices' },
    'ble.btn.disconnect':  { zh: '🔌 断开连接', en: '🔌 Disconnect' },
    'ble.btn.reconnect':   { zh: '🔄 重新连接', en: '🔄 Reconnect' },
    'ble.label.deviceName':{ zh: '设备名称', en: 'Device Name' },
    'ble.label.deviceId':  { zh: '设备 ID', en: 'Device ID' },

    // Panel ②
    'ble.p2.title':        { zh: '② 连接统计', en: '② Connection Stats' },
    'ble.p2.small':        { zh: '实时统计', en: 'Real-time Stats' },
    'ble.stat.uptime':     { zh: '已连接时长', en: 'Uptime' },
    'ble.stat.services':   { zh: '服务数', en: 'Services' },
    'ble.stat.chars':      { zh: '特征值数', en: 'Characteristics' },
    'ble.stat.reads':      { zh: '读取次数', en: 'Reads' },
    'ble.stat.writes':     { zh: '写入次数', en: 'Writes' },
    'ble.stat.notifies':   { zh: '通知次数', en: 'Notifications' },
    'ble.stat.rxBytes':    { zh: '接收字节', en: 'RX Bytes' },
    'ble.stat.txBytes':    { zh: '发送字节', en: 'TX Bytes' },
    'ble.stat.disconnected':{ zh: '未连接', en: 'Disconnected' },

    // Panel ③
    'ble.p3.title':        { zh: '③ 服务与特征值浏览器', en: '③ Service & Characteristic Explorer' },
    'ble.p3.small':        { zh: '点击展开服务 · 点击特征值操作', en: 'Click to expand · click char to operate' },
    'ble.tree.empty':      { zh: '请先连接设备', en: 'Connect a device first' },
    'ble.tree.noServices': { zh: '未发现服务', en: 'No services found' },

    // Panel ④
    'ble.p4.title':        { zh: '④ 特征值操作', en: '④ Characteristic Operations' },
    'ble.p4.small':        { zh: '未选择', en: 'None selected' },
    'ble.label.writeMode': { zh: '写入模式', en: 'Write Mode' },
    'ble.mode.hex':        { zh: 'HEX', en: 'HEX' },
    'ble.mode.text':       { zh: 'Text', en: 'Text' },
    'ble.label.writeValue':{ zh: '写入值', en: 'Write Value' },
    'ble.ph.writeHex':     { zh: '00 11 22', en: '00 11 22' },
    'ble.ph.writeText':    { zh: '输入文本...', en: 'Enter text...' },
    'ble.btn.read':        { zh: '📖 读取', en: '📖 Read' },
    'ble.btn.write':       { zh: '✏️ 写入', en: '✏️ Write' },
    'ble.btn.startNotify': { zh: '🔔 开始通知', en: '🔔 Start Notify' },
    'ble.btn.stopNotify':  { zh: '🔕 停止通知', en: '🔕 Stop Notify' },
    'ble.repeat.label':    { zh: '重复发送', en: 'Repeat' },
    'ble.repeat.interval': { zh: '间隔', en: 'Interval' },
    'ble.btn.stopRepeat':  { zh: '⏹ 停止', en: '⏹ Stop' },
    'ble.hex.title':       { zh: '读取结果', en: 'Read Result' },
    'ble.hex.noData':      { zh: '暂无数据，点击读取', en: 'No data, click Read' },

    // Panel ⑤
    'ble.p5.title':        { zh: '⑤ 数据日志', en: '⑤ Data Log' },
    'ble.p5.small':        { zh: '实时数据', en: 'Real-time data' },
    'ble.log.empty':       { zh: '等待数据...', en: 'Waiting for data...' },
    'ble.log.filter.all':  { zh: '全部', en: 'All' },
    'ble.log.filter.read': { zh: '读取', en: 'Read' },
    'ble.log.filter.write':{ zh: '写入', en: 'Write' },
    'ble.log.filter.notify':{ zh: '通知', en: 'Notify' },
    'ble.log.filter.error':{ zh: '错误', en: 'Error' },
    'ble.log.autoScroll':  { zh: '自动滚动', en: 'Auto-scroll' },
    'ble.btn.exportLog':   { zh: '📥 导出', en: '📥 Export' },
    'ble.btn.clearLog':    { zh: '🗑️ 清空', en: '🗑️ Clear' },

    // Footer
    'ble.footer':          { zh: '📡 蓝牙调试器 · 基于 Web Bluetooth API · 支持读写与通知 · 树形服务浏览器', en: '📡 BLE Debugger · Web Bluetooth API · read / write / notify · tree explorer' },

    // 动态消息
    'ble.msg.connected':   { zh: '已连接到 {name}', en: 'Connected to {name}' },
    'ble.msg.disconnected':{ zh: '设备已断开连接', en: 'Device disconnected' },
    'ble.msg.discovering': { zh: '正在发现服务...', en: 'Discovering services...' },
    'ble.msg.servicesFound':{ zh: '发现 {n} 个服务，{m} 个特征值', en: 'Found {n} services, {m} characteristics' },
    'ble.msg.notifyStarted':{ zh: '通知已开启', en: 'Notifications started' },
    'ble.msg.notifyStopped':{ zh: '通知已停止', en: 'Notifications stopped' },
    'ble.msg.repeatStarted':{ zh: '重复发送已启动 (间隔 {ms}ms)', en: 'Repeat write started ({ms}ms interval)' },
    'ble.msg.repeatStopped':{ zh: '重复发送已停止', en: 'Repeat write stopped' },

    // 错误
    'ble.err.noBluetooth':   { zh: '浏览器不支持 Web Bluetooth', en: 'Web Bluetooth not supported' },
    'ble.err.scanFailed':    { zh: '扫描失败', en: 'Scan failed' },
    'ble.err.connectFailed': { zh: '连接失败', en: 'Connection failed' },
    'ble.err.serviceFailed': { zh: '获取服务失败', en: 'Failed to get services' },
    'ble.err.readFailed':    { zh: '读取失败', en: 'Read failed' },
    'ble.err.writeFailed':   { zh: '写入失败', en: 'Write failed' },
    'ble.err.notifyFailed':  { zh: '通知操作失败', en: 'Notify operation failed' },
    'ble.err.noDevice':      { zh: '请先连接设备', en: 'Please connect a device first' },
    'ble.err.noChar':        { zh: '请先选择特征值', en: 'Please select a characteristic' },
    'ble.err.invalidHex':    { zh: '无效的 HEX 值', en: 'Invalid HEX value' },
    'ble.err.cancelled':     { zh: '用户取消了扫描', en: 'Scan cancelled by user' },

    // 日志标签
    'ble.log.read':    { zh: '读取', en: 'READ' },
    'ble.log.write':   { zh: '写入', en: 'WRITE' },
    'ble.log.notify':  { zh: '通知', en: 'NOTIFY' },
    'ble.log.error':   { zh: '错误', en: 'ERROR' },
    'ble.log.info':    { zh: '信息', en: 'INFO' }
};

// 翻译辅助：支持 {占位符} 替换
function tt(key, vars) {
    var s = window.I18N.t(key);
    if (vars) {
        for (var k in vars) {
            if (vars.hasOwnProperty(k)) {
                s = s.split('{' + k + '}').join(vars[k]);
            }
        }
    }
    return s;
}

(function() {
    'use strict';

    // ============================================================
    //  DOM 引用
    // ============================================================
    var scanBtn         = document.getElementById('scanBtn');
    var disconnectBtn   = document.getElementById('disconnectBtn');
    var reconnectBtn    = document.getElementById('reconnectBtn');
    var bleStatus       = document.getElementById('bleStatus');
    var deviceCard      = document.getElementById('deviceCard');
    var deviceNameEl    = document.getElementById('deviceName');
    var deviceIdEl      = document.getElementById('deviceId');
    var bleWarning      = document.getElementById('bleWarning');
    var bleTree         = document.getElementById('bleTree');
    var charProps       = document.getElementById('charProps');
    var selectedCharLabel = document.getElementById('selectedCharLabel');
    var writeMode       = document.getElementById('writeMode');
    var writeValue      = document.getElementById('writeValue');
    var readBtn         = document.getElementById('readBtn');
    var writeBtn        = document.getElementById('writeBtn');
    var notifyBtn       = document.getElementById('notifyBtn');
    var repeatRow       = document.getElementById('repeatRow');
    var repeatCheck     = document.getElementById('repeatCheck');
    var repeatInterval  = document.getElementById('repeatInterval');
    var stopRepeatBtn   = document.getElementById('stopRepeatBtn');
    var hexDump         = document.getElementById('hexDump');
    var hexDumpContent  = document.getElementById('hexDumpContent');
    var logArea         = document.getElementById('logArea');
    var logFilters      = document.getElementById('logFilters');
    var autoScroll      = document.getElementById('autoScroll');
    var exportLogBtn    = document.getElementById('exportLogBtn');
    var clearLogBtn     = document.getElementById('clearLogBtn');
    var statsGrid       = document.getElementById('statsGrid');

    // ============================================================
    //  状态
    // ============================================================
    var bleDevice      = null;
    var bleServer      = null;
    var bleServices    = [];
    var bleCharsByService = [];  // 每个服务的特征值缓存
    var activeChar     = null;
    var isNotifying    = false;
    var connectedAt    = null;
    var connTimerId    = null;
    var stats = { reads: 0, writes: 0, notifications: 0, rxBytes: 0, txBytes: 0 };
    var logEntries     = [];
    var logFilter      = 'all';
    var repeatTimer    = null;
    var lastDeviceName = null;
    var notifyingChars = {};  // 正在通知的特征值集合

    // ============================================================
    //  常用蓝牙 UUID 名称对照表
    // ============================================================
    var UUID_NAMES = {
        '00001800-0000-1000-8000-00805f9b34fb': 'Generic Access',
        '00001801-0000-1000-8000-00805f9b34fb': 'Generic Attribute',
        '0000180a-0000-1000-8000-00805f9b34fb': 'Device Information',
        '0000180f-0000-1000-8000-00805f9b34fb': 'Battery Service',
        '0000180d-0000-1000-8000-00805f9b34fb': 'Heart Rate',
        '00001809-0000-1000-8000-00805f9b34fb': 'Health Thermometer',
        '00001810-0000-1000-8000-00805f9b34fb': 'Blood Pressure',
        '00001812-0000-1000-8000-00805f9b34fb': 'Human Interface Device',
        '0000181a-0000-1000-8000-00805f9b34fb': 'Environmental Sensing',
        '00001802-0000-1000-8000-00805f9b34fb': 'Immediate Alert',
        '00001803-0000-1000-8000-00805f9b34fb': 'Link Loss',
        '00001804-0000-1000-8000-00805f9b34fb': 'Tx Power',
        '00001805-0000-1000-8000-00805f9b34fb': 'Current Time',
        '00001813-0000-1000-8000-00805f9b34fb': 'Scan Parameters',
        '00001816-0000-1000-8000-00805f9b34fb': 'Cycling Speed and Cadence',
        '00001818-0000-1000-8000-00805f9b34fb': 'Cycling Power',
        '00001819-0000-1000-8000-00805f9b34fb': 'Location and Navigation',
        '0000181c-0000-1000-8000-00805f9b34fb': 'User Data',
        '0000181d-0000-1000-8000-00805f9b34fb': 'Weight Scale',
        '00001820-0000-1000-8000-00805f9b34fb': 'Internet Protocol Support',
        '00001822-0000-1000-8000-00805f9b34fb': 'Pulse Oximeter',
        '00002a00-0000-1000-8000-00805f9b34fb': 'Device Name',
        '00002a01-0000-1000-8000-00805f9b34fb': 'Appearance',
        '00002a19-0000-1000-8000-00805f9b34fb': 'Battery Level',
        '00002a29-0000-1000-8000-00805f9b34fb': 'Manufacturer Name',
        '00002a24-0000-1000-8000-00805f9b34fb': 'Model Number',
        '00002a25-0000-1000-8000-00805f9b34fb': 'Serial Number',
        '00002a26-0000-1000-8000-00805f9b34fb': 'Firmware Revision',
        '00002a27-0000-1000-8000-00805f9b34fb': 'Hardware Revision',
        '00002a28-0000-1000-8000-00805f9b34fb': 'Software Revision',
        '00002a37-0000-1000-8000-00805f9b34fb': 'Heart Rate Measurement',
        '00002a39-0000-1000-8000-00805f9b34fb': 'Heart Rate Control Point',
        '00002a6e-0000-1000-8000-00805f9b34fb': 'Temperature Measurement',
        '00002a6f-0000-1000-8000-00805f9b34fb': 'Temperature Type',
        '00002a35-0000-1000-8000-00805f9b34fb': 'Blood Pressure Measurement',
        '00002a49-0000-1000-8000-00805f9b34fb': 'Blood Pressure Feature',
        '00002a4d-0000-1000-8000-00805f9b34fb': 'Report',
        '00002a4e-0000-1000-8000-00805f9b34fb': 'Report Map',
        '00002902-0000-1000-8000-00805f9b34fb': 'CCCD'
    };

    var DEFAULT_OPTIONAL_SERVICES = [
        '00001800-0000-1000-8000-00805f9b34fb', '00001801-0000-1000-8000-00805f9b34fb',
        '0000180a-0000-1000-8000-00805f9b34fb', '0000180f-0000-1000-8000-00805f9b34fb',
        '0000180d-0000-1000-8000-00805f9b34fb', '00001809-0000-1000-8000-00805f9b34fb',
        '00001810-0000-1000-8000-00805f9b34fb', '00001812-0000-1000-8000-00805f9b34fb',
        '0000181a-0000-1000-8000-00805f9b34fb', '00001802-0000-1000-8000-00805f9b34fb',
        '00001803-0000-1000-8000-00805f9b34fb', '00001804-0000-1000-8000-00805f9b34fb',
        '00001805-0000-1000-8000-00805f9b34fb', '00001813-0000-1000-8000-00805f9b34fb',
        '00001816-0000-1000-8000-00805f9b34fb', '00001818-0000-1000-8000-00805f9b34fb',
        '00001819-0000-1000-8000-00805f9b34fb', '0000181c-0000-1000-8000-00805f9b34fb',
        '0000181d-0000-1000-8000-00805f9b34fb', '00001820-0000-1000-8000-00805f9b34fb',
        '00001822-0000-1000-8000-00805f9b34fb', '0000ffe0-0000-1000-8000-00805f9b34fb',
        '0000ffe5-0000-1000-8000-00805f9b34fb', '0000ff00-0000-1000-8000-00805f9b34fb'
    ];

    function friendlyUUID(uuid) {
        var key = uuid.toLowerCase();
        return UUID_NAMES[key] || null;
    }
    function shortUUID(uuid) {
        var name = friendlyUUID(uuid);
        if (name) return name;
        // 取短 UUID（16-bit 或 32-bit 形式）
        var u = uuid.toUpperCase();
        if (u.length === 36) {
            var s = u.substring(4, 8);
            return '0x' + s;
        }
        return u;
    }
    function fullUUIDDisplay(uuid) {
        var name = friendlyUUID(uuid);
        if (name) return name + ' (0x' + uuid.substring(4, 8).toUpperCase() + ')';
        return uuid.toUpperCase();
    }

    // ============================================================
    //  数据转换
    // ============================================================
    function bufferToHex(buffer) {
        var arr = new Uint8Array(buffer);
        var hex = [];
        for (var i = 0; i < arr.length; i++) {
            hex.push(arr[i].toString(16).padStart(2, '0').toUpperCase());
        }
        return hex.join(' ');
    }

    function bufferToAscii(buffer) {
        var arr = new Uint8Array(buffer);
        var ascii = [];
        for (var i = 0; i < arr.length; i++) {
            var b = arr[i];
            ascii.push(b >= 32 && b <= 126 ? String.fromCharCode(b) : '.');
        }
        return ascii.join('');
    }

    function bufferToHexDump(buffer) {
        var arr = new Uint8Array(buffer);
        var rows = [];
        for (var offset = 0; offset < arr.length; offset += 16) {
            var hexParts = [];
            var asciiParts = [];
            var end = Math.min(offset + 16, arr.length);
            for (var i = offset; i < end; i++) {
                hexParts.push(arr[i].toString(16).padStart(2, '0').toUpperCase());
                asciiParts.push(arr[i] >= 32 && arr[i] <= 126 ? String.fromCharCode(arr[i]) : '.');
                if (i === offset + 7) hexParts.push(''); // 中间分隔标记
            }
            // 补齐不足16字节的行
            while (hexParts.length < 17) hexParts.push('  ');
            while (asciiParts.length < 16) asciiParts.push(' ');

            // 构建 hex 字符串：前8 + 空格 + 后8
            var hexStr = '';
            for (var j = 0; j < 16; j++) {
                if (j === 8) hexStr += ' ';
                hexStr += (hexParts[j] || ' ') + ' ';
            }

            rows.push({
                offset: offset.toString(16).padStart(8, '0').toUpperCase(),
                hex: hexStr.trim(),
                ascii: asciiParts.join('')
            });
        }
        return rows;
    }

    function parseHexInput(str) {
        var cleaned = str.replace(/,/g, ' ').replace(/0x/gi, '').trim();
        if (cleaned === '') return null;
        var parts = cleaned.split(/\s+/);
        var bytes = [];
        for (var i = 0; i < parts.length; i++) {
            if (parts[i] === '') continue;
            var val = parseInt(parts[i], 16);
            if (isNaN(val) || val < 0 || val > 255) return null;
            bytes.push(val);
        }
        return bytes.length > 0 ? new Uint8Array(bytes) : null;
    }

    function parseTextInput(str) {
        return new TextEncoder().encode(str);
    }

    // ============================================================
    //  Hex Dump 渲染
    // ============================================================
    function renderHexDump(buffer) {
        if (!buffer || buffer.byteLength === 0) {
            hexDump.style.display = 'none';
            return;
        }
        hexDump.style.display = 'block';
        var rows = bufferToHexDump(buffer);
        var html = '';
        for (var i = 0; i < rows.length; i++) {
            var r = rows[i];
            html += '<div class="ble-hex-dump-row">' +
                '<span class="hd-offset">' + r.offset + '</span>' +
                '<span class="hd-hex">' + r.hex + '</span>' +
                '<span class="hd-ascii">' + r.ascii + '</span>' +
                '</div>';
        }
        hexDumpContent.innerHTML = html;
    }

    // ============================================================
    //  时间戳
    // ============================================================
    function timestamp() {
        var d = new Date();
        return d.getHours().toString().padStart(2, '0') + ':' +
               d.getMinutes().toString().padStart(2, '0') + ':' +
               d.getSeconds().toString().padStart(2, '0') + '.' +
               d.getMilliseconds().toString().padStart(3, '0');
    }

    function formatUptime(seconds) {
        if (seconds < 0) seconds = 0;
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        var s = seconds % 60;
        if (h > 0) {
            return h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
        }
        return m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
    }

    // ============================================================
    //  日志系统
    // ============================================================
    function addLogEntry(type, dirLabel, charInfo, dataHex, dataAscii) {
        var entry = {
            type: type,
            ts: timestamp(),
            dirLabel: dirLabel,
            charInfo: charInfo,
            dataHex: dataHex || '',
            dataAscii: dataAscii || ''
        };
        logEntries.push(entry);
        renderLogEntry(entry);
        if (autoScroll.checked) {
            logArea.scrollTop = logArea.scrollHeight;
        }
    }

    function renderLogEntry(entry) {
        var empty = logArea.querySelector('.ble-log-empty');
        if (empty) empty.remove();

        var div = document.createElement('div');
        div.className = 'ble-log-entry';
        div.setAttribute('data-log-type', entry.type);

        if (logFilter !== 'all' && entry.type !== logFilter) {
            div.classList.add('filtered-out');
        }

        var ts = '<span class="ts">' + entry.ts + '</span>';
        var dir = '<span class="dir ' + entry.type + '">' + entry.dirLabel + '</span>';
        var info = entry.charInfo ? '<span class="char-info">' + entry.charInfo + '</span>' : '';
        var data = entry.dataHex ? '<span class="data">' + entry.dataHex + '</span>' : '';
        var ascii = entry.dataAscii ? '<span class="ascii">"' + entry.dataAscii + '"</span>' : '';

        div.innerHTML = ts + dir + info + data + ascii;
        logArea.appendChild(div);
    }

    function applyLogFilter(filter) {
        logFilter = filter;
        var entries = logArea.querySelectorAll('.ble-log-entry');
        for (var i = 0; i < entries.length; i++) {
            var type = entries[i].getAttribute('data-log-type');
            if (filter === 'all' || type === filter) {
                entries[i].classList.remove('filtered-out');
            } else {
                entries[i].classList.add('filtered-out');
            }
        }
        // 更新过滤按钮样式
        var btns = logFilters.querySelectorAll('button');
        for (var j = 0; j < btns.length; j++) {
            var f = btns[j].getAttribute('data-filter');
            if (f === filter) {
                btns[j].classList.add('ble-filter-active');
                btns[j].classList.remove('btn-outline');
            } else {
                btns[j].classList.remove('ble-filter-active');
                btns[j].classList.add('btn-outline');
            }
        }
    }

    function logRead(charInfo, buffer) {
        stats.reads++;
        stats.rxBytes += buffer.byteLength;
        updateStats();
        addLogEntry('read', window.I18N.t('ble.log.read'), charInfo, bufferToHex(buffer), bufferToAscii(buffer));
    }

    function logWrite(charInfo, buffer) {
        stats.writes++;
        stats.txBytes += buffer.byteLength;
        updateStats();
        addLogEntry('write', window.I18N.t('ble.log.write'), charInfo, bufferToHex(buffer), bufferToAscii(buffer));
    }

    function logNotify(charInfo, buffer) {
        stats.notifications++;
        stats.rxBytes += buffer.byteLength;
        updateStats();
        addLogEntry('notify', window.I18N.t('ble.log.notify'), charInfo, bufferToHex(buffer), bufferToAscii(buffer));
    }

    function logError(msg) {
        addLogEntry('error', window.I18N.t('ble.log.error'), '', msg, '');
    }

    function logInfo(msg) {
        addLogEntry('info', window.I18N.t('ble.log.info'), '', msg, '');
    }

    function clearLog() {
        logEntries = [];
        logArea.innerHTML = '<div class="ble-log-empty" data-i18n="ble.log.empty">' + window.I18N.t('ble.log.empty') + '</div>';
    }

    function exportLog() {
        var lines = [];
        lines.push('=== BLE Debugger Log ===');
        lines.push('Exported: ' + new Date().toISOString());
        lines.push('');
        for (var i = 0; i < logEntries.length; i++) {
            var e = logEntries[i];
            var line = '[' + e.ts + '] ' + e.dirLabel;
            if (e.charInfo) line += ' | ' + e.charInfo;
            if (e.dataHex) line += ' | ' + e.dataHex;
            if (e.dataAscii) line += ' | "' + e.dataAscii + '"';
            lines.push(line);
        }
        var blob = new Blob([lines.join('\n')], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'ble_debug_log_' + new Date().toISOString().replace(/[:.]/g, '-') + '.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    // ============================================================
    //  统计面板
    // ============================================================
    function renderStatsPlaceholder() {
        statsGrid.innerHTML = '<div class="ble-stat-card" style="grid-column:1/-1;"><div class="ble-stat-value" style="font-size:0.85rem;color:var(--text-muted);">' + window.I18N.t('ble.stat.disconnected') + '</div></div>';
    }

    function updateStats() {
        if (!bleServer || !bleServer.connected) {
            renderStatsPlaceholder();
            return;
        }
        var uptime = connectedAt ? Math.floor((Date.now() - connectedAt.getTime()) / 1000) : 0;
        var totalChars = 0;
        for (var i = 0; i < bleCharsByService.length; i++) {
            totalChars += bleCharsByService[i].length;
        }
        var cards = [
            { v: formatUptime(uptime), l: 'ble.stat.uptime', cls: 'highlight' },
            { v: bleServices.length, l: 'ble.stat.services' },
            { v: totalChars, l: 'ble.stat.chars' },
            { v: stats.reads, l: 'ble.stat.reads' },
            { v: stats.writes, l: 'ble.stat.writes' },
            { v: stats.notifications, l: 'ble.stat.notifies' },
            { v: formatBytes(stats.rxBytes), l: 'ble.stat.rxBytes' },
            { v: formatBytes(stats.txBytes), l: 'ble.stat.txBytes' }
        ];
        var html = '';
        for (var j = 0; j < cards.length; j++) {
            var c = cards[j];
            html += '<div class="ble-stat-card' + (c.cls ? ' ' + c.cls : '') + '">' +
                '<div class="ble-stat-value">' + c.v + '</div>' +
                '<div class="ble-stat-label" data-i18n="' + c.l + '">' + window.I18N.t(c.l) + '</div>' +
                '</div>';
        }
        statsGrid.innerHTML = html;
    }

    function formatBytes(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
    }

    function updateConnectionTimer() {
        if (!bleServer || !bleServer.connected) return;
        var uptime = connectedAt ? Math.floor((Date.now() - connectedAt.getTime()) / 1000) : 0;
        var valEl = statsGrid.querySelector('.ble-stat-card.highlight .ble-stat-value');
        if (valEl) valEl.textContent = formatUptime(uptime);
    }

    // ============================================================
    //  树形浏览器
    // ============================================================
    function renderServiceTree() {
        if (!bleServer || !bleServer.connected) {
            bleTree.innerHTML = '<div class="ble-tree-empty" data-i18n="ble.tree.empty">' + window.I18N.t('ble.tree.empty') + '</div>';
            return;
        }
        if (bleServices.length === 0) {
            bleTree.innerHTML = '<div class="ble-tree-empty" data-i18n="ble.tree.noServices">' + window.I18N.t('ble.tree.noServices') + '</div>';
            return;
        }

        var html = '';
        for (var i = 0; i < bleServices.length; i++) {
            var svc = bleServices[i];
            var svcName = friendlyUUID(svc.uuid) || 'Service';
            var svcShort = shortUUID(svc.uuid);
            var chars = bleCharsByService[i] || [];

            html += '<div class="ble-tree-item">';
            // 服务头
            html += '<div class="ble-tree-header ble-tree-service-header" onclick="BLE_TREE.toggleService(this)" data-svc-idx="' + i + '">';
            html += '<span class="ble-tree-arrow">▶</span>';
            html += '<span class="ble-tree-icon">📦</span>';
            html += '<span class="ble-tree-name">' + svcName + '</span>';
            html += '<span class="ble-tree-uuid">' + svcShort + '</span>';
            html += '</div>';

            // 特征值列表
            html += '<div class="ble-tree-children">';
            for (var j = 0; j < chars.length; j++) {
                var ch = chars[j];
                var chName = friendlyUUID(ch.uuid) || 'Characteristic';
                var chShort = shortUUID(ch.uuid);
                var props = ch.properties;
                var propTags = '';
                if (props.read)    propTags += '<span class="prop-tag read">R</span>';
                if (props.write)   propTags += '<span class="prop-tag write">W</span>';
                if (props.writeWithoutResponse) propTags += '<span class="prop-tag writeWo">W!</span>';
                if (props.notify)  propTags += '<span class="prop-tag notify">N</span>';
                if (props.indicate) propTags += '<span class="prop-tag indicate">I</span>';

                var isNotifyingNow = notifyingChars[ch.uuid.toLowerCase()];

                html += '<div class="ble-tree-item">';
                html += '<div class="ble-tree-header ble-tree-char-header" onclick="BLE_TREE.selectChar(this)" data-svc-idx="' + i + '" data-char-idx="' + j + '" data-char-uuid="' + ch.uuid + '">';
                html += '<span class="ble-tree-icon">📋</span>';
                html += '<span class="ble-tree-name">' + chName + '</span>';
                html += '<span class="ble-tree-uuid">' + chShort + '</span>';
                html += '<span class="ble-tree-props">' + propTags + (isNotifyingNow ? '<span class="prop-tag notifying">●</span>' : '') + '</span>';
                html += '<span class="ble-tree-actions">';
                if (props.read)    html += '<button class="btn btn-outline btn-sm" title="Read" onclick="event.stopPropagation();BLE_TREE.quickRead(' + i + ',' + j + ')">📖</button>';
                if (props.write || props.writeWithoutResponse) html += '<button class="btn btn-outline btn-sm" title="Write" onclick="event.stopPropagation();BLE_TREE.quickWrite(' + i + ',' + j + ')">✏️</button>';
                if (props.notify || props.indicate) html += '<button class="btn btn-outline btn-sm" title="Notify" onclick="event.stopPropagation();BLE_TREE.quickNotify(' + i + ',' + j + ')">🔔</button>';
                html += '</span>';
                html += '</div>';
                html += '</div>';
            }

            if (chars.length === 0) {
                html += '<div class="ble-tree-header" style="padding-left:36px;color:var(--text-light);font-style:italic;cursor:default;">(no characteristics)</div>';
            }
            html += '</div>';
            html += '</div>';
        }

        bleTree.innerHTML = html;
    }

    // 暴露到全局供 onclick 使用
    window.BLE_TREE = {
        toggleService: function(header) {
            var arrow = header.querySelector('.ble-tree-arrow');
            var children = header.nextElementSibling;
            if (children.classList.contains('expanded')) {
                children.classList.remove('expanded');
                arrow.classList.remove('expanded');
                arrow.textContent = '▶';
            } else {
                children.classList.add('expanded');
                arrow.classList.add('expanded');
                arrow.textContent = '▼';
            }
        },

        selectChar: function(header) {
            // 高亮当前
            var allChars = bleTree.querySelectorAll('.ble-tree-char-header');
            for (var i = 0; i < allChars.length; i++) {
                allChars[i].classList.remove('selected');
            }
            header.classList.add('selected');

            var svcIdx = parseInt(header.getAttribute('data-svc-idx'));
            var charIdx = parseInt(header.getAttribute('data-char-idx'));
            var chars = bleCharsByService[svcIdx];
            if (chars && charIdx >= 0 && charIdx < chars.length) {
                activeChar = chars[charIdx];
                updateCharOperationPanel();
            }
        },

        quickRead: function(svcIdx, charIdx) {
            var chars = bleCharsByService[svcIdx];
            if (!chars) return;
            activeChar = chars[charIdx];
            updateCharOperationPanel();
            // 高亮树中对应项
            var headers = bleTree.querySelectorAll('.ble-tree-char-header');
            for (var i = 0; i < headers.length; i++) {
                headers[i].classList.remove('selected');
                if (parseInt(headers[i].getAttribute('data-svc-idx')) === svcIdx &&
                    parseInt(headers[i].getAttribute('data-char-idx')) === charIdx) {
                    headers[i].classList.add('selected');
                }
            }
            readCharacteristic();
        },

        quickWrite: function(svcIdx, charIdx) {
            var chars = bleCharsByService[svcIdx];
            if (!chars) return;
            activeChar = chars[charIdx];
            updateCharOperationPanel();
            var headers = bleTree.querySelectorAll('.ble-tree-char-header');
            for (var i = 0; i < headers.length; i++) {
                headers[i].classList.remove('selected');
                if (parseInt(headers[i].getAttribute('data-svc-idx')) === svcIdx &&
                    parseInt(headers[i].getAttribute('data-char-idx')) === charIdx) {
                    headers[i].classList.add('selected');
                }
            }
            writeValue.focus();
            writeValue.select();
        },

        quickNotify: function(svcIdx, charIdx) {
            var chars = bleCharsByService[svcIdx];
            if (!chars) return;
            activeChar = chars[charIdx];
            updateCharOperationPanel();
            var headers = bleTree.querySelectorAll('.ble-tree-char-header');
            for (var i = 0; i < headers.length; i++) {
                headers[i].classList.remove('selected');
                if (parseInt(headers[i].getAttribute('data-svc-idx')) === svcIdx &&
                    parseInt(headers[i].getAttribute('data-char-idx')) === charIdx) {
                    headers[i].classList.add('selected');
                }
            }
            toggleNotify();
        }
    };

    // ============================================================
    //  特征值操作面板更新
    // ============================================================
    function updateCharOperationPanel() {
        if (!activeChar) {
            charProps.innerHTML = '';
            selectedCharLabel.textContent = window.I18N.t('ble.p4.small');
            readBtn.disabled = true;
            writeBtn.disabled = true;
            notifyBtn.disabled = true;
            repeatRow.style.display = 'none';
            hexDump.style.display = 'none';
            return;
        }

        var props = activeChar.properties;
        var tags = '';
        if (props.read)    tags += '<span class="prop-tag read">READ</span>';
        if (props.write)   tags += '<span class="prop-tag write">WRITE</span>';
        if (props.writeWithoutResponse) tags += '<span class="prop-tag writeWo">WRITE NO RESP</span>';
        if (props.notify)  tags += '<span class="prop-tag notify">NOTIFY</span>';
        if (props.indicate) tags += '<span class="prop-tag indicate">INDICATE</span>';
        charProps.innerHTML = tags;

        selectedCharLabel.textContent = fullUUIDDisplay(activeChar.uuid);

        readBtn.disabled = !props.read;
        writeBtn.disabled = !(props.write || props.writeWithoutResponse);
        notifyBtn.disabled = !(props.notify || props.indicate);

        // 通知状态
        var charUuid = activeChar.uuid.toLowerCase();
        isNotifying = !!notifyingChars[charUuid];
        updateNotifyBtn();

        // 重复发送
        repeatRow.style.display = (props.write || props.writeWithoutResponse) ? '' : 'none';
    }

    // ============================================================
    //  蓝牙操作
    // ============================================================
    function setStatus(type, text) {
        bleStatus.className = 'ble-status ' + type;
        bleStatus.textContent = text;
    }

    async function scanAndConnect() {
        if (!navigator.bluetooth) {
            bleWarning.style.display = 'block';
            logError(window.I18N.t('ble.err.noBluetooth'));
            return;
        }

        setStatus('scanning', window.I18N.t('ble.status.scanning'));
        scanBtn.disabled = true;
        reconnectBtn.style.display = 'none';
        logInfo(window.I18N.t('ble.status.scanning'));

        try {
            bleDevice = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: DEFAULT_OPTIONAL_SERVICES
            });

            if (!bleDevice) {
                setStatus('ready', window.I18N.t('ble.status.ready'));
                scanBtn.disabled = false;
                return;
            }

            bleDevice.addEventListener('gattserverdisconnected', onDisconnected);
            lastDeviceName = bleDevice.name || 'Unknown';

            var name = bleDevice.name || 'Unknown';
            logInfo(tt('ble.msg.connected', { name: name }));

            bleServer = await bleDevice.gatt.connect();
            connectedAt = new Date();

            setStatus('connected', window.I18N.t('ble.status.connected'));
            scanBtn.disabled = true;
            disconnectBtn.disabled = false;
            reconnectBtn.style.display = 'none';

            // 显示设备信息
            deviceCard.style.display = 'block';
            deviceNameEl.innerHTML = '<span class="ble-device-icon">📱</span>' + name;
            deviceIdEl.textContent = bleDevice.id;

            // 重置统计
            stats = { reads: 0, writes: 0, notifications: 0, rxBytes: 0, txBytes: 0 };
            updateStats();

            // 启动连接计时器
            if (connTimerId) clearInterval(connTimerId);
            connTimerId = setInterval(updateConnectionTimer, 1000);

            // 发现服务
            logInfo(window.I18N.t('ble.msg.discovering'));
            await discoverServices();

        } catch (err) {
            if (err.name === 'NotFoundError') {
                logInfo(window.I18N.t('ble.err.cancelled'));
            } else {
                logError(window.I18N.t('ble.err.scanFailed') + ': ' + err.message);
            }
            setStatus('ready', window.I18N.t('ble.status.ready'));
            scanBtn.disabled = false;
            bleDevice = null;
        }
    }

    async function discoverServices() {
        try {
            bleServices = await bleServer.getPrimaryServices();
            bleCharsByService = [];
            var totalChars = 0;

            for (var i = 0; i < bleServices.length; i++) {
                try {
                    var chars = await bleServices[i].getCharacteristics();
                    bleCharsByService.push(chars);
                    totalChars += chars.length;
                } catch (e) {
                    bleCharsByService.push([]);
                }
            }

            logInfo(tt('ble.msg.servicesFound', { n: bleServices.length, m: totalChars }));
            updateStats();
            renderServiceTree();

        } catch (err) {
            logError(window.I18N.t('ble.err.serviceFailed') + ': ' + err.message);
            bleTree.innerHTML = '<div class="ble-tree-empty">' + window.I18N.t('ble.tree.noServices') + '</div>';
        }
    }

    async function readCharacteristic() {
        if (!bleServer || !bleServer.connected) {
            logError(window.I18N.t('ble.err.noDevice'));
            return;
        }
        if (!activeChar) {
            logError(window.I18N.t('ble.err.noChar'));
            return;
        }

        try {
            var value = await activeChar.readValue();
            var charInfo = shortUUID(activeChar.uuid);
            renderHexDump(value.buffer);
            logRead(charInfo, value.buffer);
        } catch (err) {
            logError(window.I18N.t('ble.err.readFailed') + ': ' + err.message);
        }
    }

    async function writeCharacteristic() {
        if (!bleServer || !bleServer.connected) {
            logError(window.I18N.t('ble.err.noDevice'));
            return;
        }
        if (!activeChar) {
            logError(window.I18N.t('ble.err.noChar'));
            return;
        }

        var mode = writeMode.value;
        var raw = writeValue.value.trim();
        if (raw === '') {
            logError(window.I18N.t('ble.err.invalidHex'));
            return;
        }

        var buffer;
        if (mode === 'hex') {
            buffer = parseHexInput(raw);
            if (!buffer) {
                logError(window.I18N.t('ble.err.invalidHex'));
                return;
            }
        } else {
            buffer = parseTextInput(raw);
        }

        try {
            await activeChar.writeValue(buffer);
            var charInfo = shortUUID(activeChar.uuid);
            logWrite(charInfo, buffer.buffer);
        } catch (err) {
            logError(window.I18N.t('ble.err.writeFailed') + ': ' + err.message);
        }
    }

    function onCharacteristicValueChanged(event) {
        var charc = event.target;
        var charInfo = shortUUID(charc.uuid);
        logNotify(charInfo, charc.value.buffer);
        // 如果当前选中的特征值就是通知来源，更新 hex dump
        if (activeChar && activeChar.uuid === charc.uuid) {
            renderHexDump(charc.value.buffer);
        }
    }

    async function toggleNotify() {
        if (!bleServer || !bleServer.connected) {
            logError(window.I18N.t('ble.err.noDevice'));
            return;
        }
        if (!activeChar) {
            logError(window.I18N.t('ble.err.noChar'));
            return;
        }

        var charUuid = activeChar.uuid.toLowerCase();
        if (notifyingChars[charUuid]) {
            await stopNotify();
        } else {
            await startNotify();
        }
    }

    async function startNotify() {
        try {
            activeChar.addEventListener('characteristicvaluechanged', onCharacteristicValueChanged);
            await activeChar.startNotifications();
            var charUuid = activeChar.uuid.toLowerCase();
            notifyingChars[charUuid] = true;
            isNotifying = true;
            updateNotifyBtn();
            renderServiceTree(); // 刷新树中通知指示器
            logInfo(window.I18N.t('ble.msg.notifyStarted'));
        } catch (err) {
            logError(window.I18N.t('ble.err.notifyFailed') + ': ' + err.message);
            activeChar.removeEventListener('characteristicvaluechanged', onCharacteristicValueChanged);
        }
    }

    async function stopNotify() {
        try {
            await activeChar.stopNotifications();
            activeChar.removeEventListener('characteristicvaluechanged', onCharacteristicValueChanged);
            var charUuid = activeChar.uuid.toLowerCase();
            delete notifyingChars[charUuid];
            isNotifying = false;
            updateNotifyBtn();
            renderServiceTree();
            logInfo(window.I18N.t('ble.msg.notifyStopped'));
        } catch (err) {
            var charUuid = activeChar.uuid.toLowerCase();
            delete notifyingChars[charUuid];
            isNotifying = false;
            updateNotifyBtn();
            activeChar.removeEventListener('characteristicvaluechanged', onCharacteristicValueChanged);
            renderServiceTree();
        }
    }

    function updateNotifyBtn() {
        if (isNotifying) {
            notifyBtn.textContent = window.I18N.t('ble.btn.stopNotify');
            notifyBtn.className = 'btn btn-outline';
        } else {
            notifyBtn.textContent = window.I18N.t('ble.btn.startNotify');
            notifyBtn.className = 'btn btn-outline';
        }
    }

    function disconnect() {
        if (bleDevice && bleDevice.gatt.connected) {
            bleDevice.gatt.disconnect();
        }
    }

    function onDisconnected() {
        setStatus('disconnected', window.I18N.t('ble.status.disconnected'));
        scanBtn.disabled = false;
        disconnectBtn.disabled = true;
        reconnectBtn.style.display = 'inline-flex';
        bleServer = null;
        activeChar = null;
        isNotifying = false;
        notifyingChars = {};
        bleServices = [];
        bleCharsByService = [];
        deviceCard.style.display = 'none';
        charProps.innerHTML = '';
        selectedCharLabel.textContent = window.I18N.t('ble.p4.small');
        readBtn.disabled = true;
        writeBtn.disabled = true;
        notifyBtn.disabled = true;
        repeatRow.style.display = 'none';
        hexDump.style.display = 'none';
        stopRepeatWrite();
        if (connTimerId) { clearInterval(connTimerId); connTimerId = null; }
        renderStatsPlaceholder();
        bleTree.innerHTML = '<div class="ble-tree-empty" data-i18n="ble.tree.empty">' + window.I18N.t('ble.tree.empty') + '</div>';
        logInfo(window.I18N.t('ble.msg.disconnected'));
    }

    function reconnect() {
        if (bleDevice) {
            bleDevice.removeEventListener('gattserverdisconnected', onDisconnected);
            bleDevice = null;
        }
        scanAndConnect();
    }

    // ============================================================
    //  重复发送
    // ============================================================
    function startRepeatWrite() {
        if (!activeChar) return;
        var ms = parseInt(repeatInterval.value) || 1000;
        if (ms < 50) ms = 50;
        repeatInterval.value = ms;

        stopRepeatBtn.style.display = 'inline-flex';
        repeatCheck.disabled = true;
        writeBtn.disabled = true;
        logInfo(tt('ble.msg.repeatStarted', { ms: ms }));

        repeatTimer = setInterval(function() {
            if (!bleServer || !bleServer.connected) {
                stopRepeatWrite();
                return;
            }
            writeCharacteristic();
        }, ms);
    }

    function stopRepeatWrite() {
        if (repeatTimer) {
            clearInterval(repeatTimer);
            repeatTimer = null;
        }
        stopRepeatBtn.style.display = 'none';
        repeatCheck.checked = false;
        repeatCheck.disabled = false;
        if (activeChar) {
            var props = activeChar.properties;
            writeBtn.disabled = !(props.write || props.writeWithoutResponse);
        }
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    scanBtn.addEventListener('click', scanAndConnect);
    disconnectBtn.addEventListener('click', disconnect);
    reconnectBtn.addEventListener('click', reconnect);
    readBtn.addEventListener('click', readCharacteristic);
    writeBtn.addEventListener('click', writeCharacteristic);
    notifyBtn.addEventListener('click', toggleNotify);
    clearLogBtn.addEventListener('click', clearLog);
    exportLogBtn.addEventListener('click', exportLog);

    writeMode.addEventListener('change', function() {
        if (this.value === 'hex') {
            writeValue.placeholder = window.I18N.t('ble.ph.writeHex');
        } else {
            writeValue.placeholder = window.I18N.t('ble.ph.writeText');
        }
        writeValue.value = '';
    });

    repeatCheck.addEventListener('change', function() {
        if (this.checked) {
            startRepeatWrite();
        } else {
            stopRepeatWrite();
        }
    });

    stopRepeatBtn.addEventListener('click', function() {
        stopRepeatWrite();
        logInfo(window.I18N.t('ble.msg.repeatStopped'));
    });

    // 日志过滤
    logFilters.addEventListener('click', function(e) {
        var btn = e.target.closest('button');
        if (!btn) return;
        var filter = btn.getAttribute('data-filter');
        if (filter) applyLogFilter(filter);
    });

    // ============================================================
    //  初始化
    // ============================================================
    function init() {
        if (navigator.bluetooth) {
            bleWarning.style.display = 'none';
            setStatus('ready', window.I18N.t('ble.status.ready'));
        } else {
            bleWarning.style.display = 'block';
            setStatus('disconnected', window.I18N.t('ble.err.noBluetooth'));
            scanBtn.disabled = true;
        }

        writeValue.placeholder = window.I18N.t('ble.ph.writeHex');
        renderStatsPlaceholder();
        bleTree.innerHTML = '<div class="ble-tree-empty" data-i18n="ble.tree.empty">' + window.I18N.t('ble.tree.empty') + '</div>';
    }

    // ============================================================
    //  语言切换：更新动态文本
    // ============================================================
    document.addEventListener('languagechange', function() {
        document.title = window.I18N.t('ble.doc.title');

        // 重新应用 data-i18n 会自动处理大部分静态文本
        // 这里只处理 JS 动态生成的文本

        // 状态
        if (navigator.bluetooth) {
            if (bleDevice && bleServer && bleServer.connected) {
                setStatus('connected', window.I18N.t('ble.status.connected'));
            } else {
                setStatus('ready', window.I18N.t('ble.status.ready'));
            }
        }

        // 按钮
        updateNotifyBtn();
        scanBtn.textContent = window.I18N.t('ble.btn.scan');
        disconnectBtn.textContent = window.I18N.t('ble.btn.disconnect');
        reconnectBtn.textContent = window.I18N.t('ble.btn.reconnect');
        readBtn.textContent = window.I18N.t('ble.btn.read');
        writeBtn.textContent = window.I18N.t('ble.btn.write');
        clearLogBtn.textContent = window.I18N.t('ble.btn.clearLog');
        exportLogBtn.textContent = window.I18N.t('ble.btn.exportLog');
        stopRepeatBtn.textContent = window.I18N.t('ble.btn.stopRepeat');

        // placeholder
        if (writeMode.value === 'hex') {
            writeValue.placeholder = window.I18N.t('ble.ph.writeHex');
        } else {
            writeValue.placeholder = window.I18N.t('ble.ph.writeText');
        }

        // 选中特征值标签
        if (activeChar) {
            selectedCharLabel.textContent = fullUUIDDisplay(activeChar.uuid);
        } else {
            selectedCharLabel.textContent = window.I18N.t('ble.p4.small');
        }

        // 统计面板
        updateStats();

        // 树形浏览器
        if (bleServer && bleServer.connected) {
            renderServiceTree();
        } else {
            bleTree.innerHTML = '<div class="ble-tree-empty" data-i18n="ble.tree.empty">' + window.I18N.t('ble.tree.empty') + '</div>';
        }

        // 空日志
        var empty = logArea.querySelector('.ble-log-empty');
        if (empty) empty.textContent = window.I18N.t('ble.log.empty');

        // 过滤按钮
        var filterBtns = logFilters.querySelectorAll('button');
        var filterLabels = {
            'all': 'ble.log.filter.all',
            'read': 'ble.log.filter.read',
            'write': 'ble.log.filter.write',
            'notify': 'ble.log.filter.notify',
            'error': 'ble.log.filter.error'
        };
        for (var i = 0; i < filterBtns.length; i++) {
            var f = filterBtns[i].getAttribute('data-filter');
            if (filterLabels[f]) filterBtns[i].textContent = window.I18N.t(filterLabels[f]);
        }

        // 自动滚动标签
        var autoScrollLabel = logArea.parentElement.querySelector('.ble-auto-scroll');
        if (autoScrollLabel) {
            var textNode = autoScrollLabel.childNodes[autoScrollLabel.childNodes.length - 1];
            if (textNode && textNode.nodeType === 3) {
                textNode.textContent = ' ' + window.I18N.t('ble.log.autoScroll');
            }
        }

        // 重复发送标签
        var repeatLabel = repeatRow.querySelector('label');
        if (repeatLabel) {
            var span = repeatLabel.querySelector('span');
            if (span) span.textContent = window.I18N.t('ble.repeat.label');
        }

        // Hex dump 标题
        var hexTitle = hexDump.querySelector('.ble-hex-dump-title');
        if (hexTitle) hexTitle.textContent = window.I18N.t('ble.hex.title');
    });

    init();
})();