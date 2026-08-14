// ============================================================
//  ModbusRTU.html 页面脚本
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
    'modbus.doc.title': { zh: 'Modbus RTU 串口助手', en: 'Modbus RTU Serial Helper' },

    // Page header
    'modbus.page.title': { zh: '📡 Modbus RTU 串口助手', en: '📡 Modbus RTU Serial Helper' },
    'modbus.subhead': { zh: '🔹 支持 RTU 主站 / 从站模式 · Web Serial API · 自动 CRC 校验 · 寄存器表', en: '🔹 Supports RTU Master / Slave modes · Web Serial API · Auto CRC check · Register table' },

    // Panel titles
    'modbus.p1.title': { zh: '① 串口连接', en: '① Serial Connection' },
    'modbus.p2.title': { zh: '② 工作模式', en: '② Working Mode' },
    'modbus.p3m.title': { zh: '③ 主站指令', en: '③ Master Command' },
    'modbus.p3m.small': { zh: '构建并发送 Modbus 请求', en: 'Build and send Modbus request' },
    'modbus.p3s.title': { zh: '③ 从站寄存器', en: '③ Slave Registers' },
    'modbus.p3s.small': { zh: '编辑本地寄存器数据', en: 'Edit local register data' },
    'modbus.p4m.title': { zh: '④ 响应数据', en: '④ Response Data' },
    'modbus.p4m.small': { zh: '解析从站返回', en: 'Parse slave response' },
    'modbus.p4s.title': { zh: '④ 请求日志', en: '④ Request Log' },
    'modbus.p4s.small': { zh: '收到的主站请求', en: 'Received master requests' },
    'modbus.p5.title': { zh: '⑤ 通信日志', en: '⑤ Communication Log' },
    'modbus.p5.small': { zh: '原始帧 HEX', en: 'Raw frames HEX' },
    'modbus.p6.title': { zh: '⑥ 快捷指令', en: '⑥ Quick Commands' },
    'modbus.p6.small': { zh: '点击快速发送', en: 'Click to send quickly' },

    // Mode
    'modbus.mode.master': { zh: '主站 Master', en: 'Master' },
    'modbus.mode.slave': { zh: '从站 Slave', en: 'Slave' },

    // Labels
    'modbus.label.baudRate': { zh: '波特率', en: 'Baud Rate' },
    'modbus.label.dataBits': { zh: '数据位', en: 'Data Bits' },
    'modbus.label.stopBits': { zh: '停止位', en: 'Stop Bits' },
    'modbus.label.parity': { zh: '校验', en: 'Parity' },
    'modbus.label.timeout': { zh: '超时时间', en: 'Timeout' },
    'modbus.label.pollInterval': { zh: '轮询间隔', en: 'Poll Interval' },
    'modbus.label.slaveAddr': { zh: '本站地址', en: 'Station Address' },
    'modbus.label.slaveDelay': { zh: '响应延时', en: 'Response Delay' },
    'modbus.label.mSlaveAddr': { zh: '从站地址', en: 'Slave Address' },
    'modbus.label.funcCode': { zh: '功能码', en: 'Function Code' },
    'modbus.label.startAddr': { zh: '起始地址', en: 'Start Address' },
    'modbus.label.quantity': { zh: '数量', en: 'Quantity' },
    'modbus.label.regType': { zh: '寄存器类型', en: 'Register Type' },
    'modbus.label.displayRange': { zh: '显示范围', en: 'Display Range' },
    'modbus.label.dataFormat': { zh: '数据格式', en: 'Data Format' },
    'modbus.label.autoScroll': { zh: '自动滚动', en: 'Auto Scroll' },
    'modbus.label.addCmd': { zh: '添加指令', en: 'Add Command' },

    // Options - parity
    'modbus.parity.none': { zh: '无', en: 'None' },
    'modbus.parity.even': { zh: '偶', en: 'Even' },
    'modbus.parity.odd': { zh: '奇', en: 'Odd' },

    // Options - custom baud
    'modbus.option.custom': { zh: '自定义', en: 'Custom' },

    // Register type options
    'modbus.reg.coils': { zh: '线圈 — FC01 (0x)', en: 'Coils — FC01 (0x)' },
    'modbus.reg.discrete': { zh: '离散输入 — FC02 (1x)', en: 'Discrete Input — FC02 (1x)' },
    'modbus.reg.input': { zh: '输入寄存器 — FC04 (3x)', en: 'Input Register — FC04 (3x)' },
    'modbus.reg.holding': { zh: '保持寄存器 — FC03 (4x)', en: 'Holding Register — FC03 (4x)' },

    // Optgroup labels
    'modbus.optgroup.read': { zh: '读操作', en: 'Read Operations' },
    'modbus.optgroup.write': { zh: '写操作', en: 'Write Operations' },

    // Function code options (for select)
    'modbus.fc.01': { zh: '01 - 读线圈', en: '01 - Read Coils' },
    'modbus.fc.02': { zh: '02 - 读离散输入', en: '02 - Read Discrete Inputs' },
    'modbus.fc.03': { zh: '03 - 读保持寄存器', en: '03 - Read Holding Registers' },
    'modbus.fc.04': { zh: '04 - 读输入寄存器', en: '04 - Read Input Registers' },
    'modbus.fc.05': { zh: '05 - 写单个线圈', en: '05 - Write Single Coil' },
    'modbus.fc.06': { zh: '06 - 写单个寄存器', en: '06 - Write Single Register' },
    'modbus.fc.15': { zh: '15 (0x0F) - 写多个线圈', en: '15 (0x0F) - Write Multiple Coils' },
    'modbus.fc.16': { zh: '16 (0x10) - 写多个寄存器', en: '16 (0x10) - Write Multiple Registers' },

    // Function code names (for logs, shorter)
    'modbus.fcname.01': { zh: '读线圈', en: 'Read Coils' },
    'modbus.fcname.02': { zh: '读离散输入', en: 'Read Discrete Inputs' },
    'modbus.fcname.03': { zh: '读保持寄存器', en: 'Read Holding Registers' },
    'modbus.fcname.04': { zh: '读输入寄存器', en: 'Read Input Registers' },
    'modbus.fcname.05': { zh: '写单线圈', en: 'Write Single Coil' },
    'modbus.fcname.06': { zh: '写单寄存器', en: 'Write Single Register' },
    'modbus.fcname.15': { zh: '写多线圈', en: 'Write Multiple Coils' },
    'modbus.fcname.16': { zh: '写多寄存器', en: 'Write Multiple Registers' },

    // Buttons
    'modbus.btn.connect': { zh: '🔗 连接串口', en: '🔗 Connect Port' },
    'modbus.btn.disconnect': { zh: '⛔ 断开', en: '⛔ Disconnect' },
    'modbus.btn.autoPoll': { zh: '自动轮询', en: 'Auto Poll' },
    'modbus.btn.send': { zh: '📤 发送请求', en: '📤 Send Request' },
    'modbus.btn.preview': { zh: '🔍 预览帧', en: '🔍 Preview Frame' },
    'modbus.btn.refresh': { zh: '刷新', en: 'Refresh' },
    'modbus.btn.init': { zh: '初始化', en: 'Initialize' },
    'modbus.btn.clearLog': { zh: '清空日志', en: 'Clear Log' },
    'modbus.btn.exportLog': { zh: '导出日志', en: 'Export Log' },
    'modbus.btn.export': { zh: '📤 导出', en: '📤 Export' },
    'modbus.btn.import': { zh: '📥 导入', en: '📥 Import' },
    'modbus.btn.add': { zh: '➕ 添加', en: '➕ Add' },
    'modbus.btn.reset': { zh: '↺ 默认', en: '↺ Reset' },

    // Placeholders
    'modbus.placeholder.customBaud': { zh: '自定义', en: 'Custom' },
    'modbus.placeholder.writeValue': { zh: '如 FF00 或 1000', en: 'e.g. FF00 or 1000' },
    'modbus.placeholder.cmdInput': { zh: 'HEX帧 (如 01 03 00 00 00 0A)', en: 'HEX frame (e.g. 01 03 00 00 00 0A)' },
    'modbus.placeholder.comment': { zh: '注释', en: 'Comment' },

    // Hints
    'modbus.hint.slaveAddr': { zh: '从站响应此地址的请求', en: 'Slave responds to requests at this address' },
    'modbus.hint.slaveDelay': { zh: '模拟处理延时', en: 'Simulated processing delay' },
    'modbus.hint.dataFormat': { zh: '两个寄存器合并时使用', en: 'Used when merging two registers' },
    'modbus.hint.framePreview': { zh: '构建的帧将在此处显示', en: 'Built frame will appear here' },
    'modbus.hint.waitResp': { zh: '等待响应数据...', en: 'Waiting for response data...' },
    'modbus.hint.waitReq': { zh: '等待主站请求...', en: 'Waiting for master request...' },
    'modbus.hint.waitComm': { zh: '(等待通信)', en: '(Waiting for communication)' },
    'modbus.hint.paramError': { zh: '参数错误', en: 'Parameter error' },
    'modbus.hint.fc05Value': { zh: 'FF00=ON, 0000=OFF', en: 'FF00=ON, 0000=OFF' },
    'modbus.hint.fc06Value': { zh: '0x0000~0xFFFF', en: '0x0000~0xFFFF' },
    'modbus.hint.fc15Value': { zh: '每bit对应一个线圈, 如 FF00', en: 'Each bit maps to a coil, e.g. FF00' },
    'modbus.hint.fc16Value': { zh: '空格分隔, 如 0001 0002', en: 'Space separated, e.g. 0001 0002' },

    // Table headers
    'modbus.th.addr': { zh: '地址', en: 'Address' },
    'modbus.th.valHex': { zh: '值 (HEX)', en: 'Value (HEX)' },
    'modbus.th.valDec': { zh: '值 (DEC)', en: 'Value (DEC)' },
    'modbus.th.bitsHi': { zh: '位15~8', en: 'Bits 15~8' },
    'modbus.th.bitsLo': { zh: '位7~0', en: 'Bits 7~0' },
    'modbus.th.bit': { zh: '位', en: 'Bit ' },
    'modbus.th.time': { zh: '时间', en: 'Time' },
    'modbus.th.funcCode': { zh: '功能码', en: 'Func Code' },
    'modbus.th.content': { zh: '内容', en: 'Content' },
    'modbus.th.response': { zh: '响应', en: 'Response' },
    'modbus.th.formatted': { zh: '格式化', en: 'Formatted' },

    // Status
    'modbus.status.connected': { zh: '● 已连接', en: '● Connected' },
    'modbus.status.disconnected': { zh: '● 未连接', en: '● Disconnected' },

    // Units
    'modbus.unit.max': { zh: '最大', en: 'Max ' },
    'modbus.unit.coilsReg': { zh: '线圈/寄存器', en: 'Coils/Registers' },

    // Alerts
    'modbus.alert.noSerial': { zh: '当前浏览器不支持 Web Serial API，请使用 Chrome 89+ 或 Edge 89+', en: 'Current browser does not support Web Serial API. Please use Chrome 89+ or Edge 89+' },
    'modbus.alert.invalidBaud': { zh: '请输入有效的波特率', en: 'Please enter a valid baud rate' },
    'modbus.alert.connectFail': { zh: '连接失败: ', en: 'Connection failed: ' },
    'modbus.alert.connectFirst': { zh: '请先连接串口', en: 'Please connect to a serial port first' },
    'modbus.alert.jsonParseFail': { zh: 'JSON 解析失败', en: 'JSON parsing failed' },

    // Log messages
    'modbus.log.sendFail': { zh: '发送失败: ', en: 'Send failed: ' },
    'modbus.log.cleared': { zh: '(已清空)', en: '(Cleared)' },
    'modbus.log.regInit': { zh: '寄存器已初始化', en: 'Registers initialized' },
    'modbus.log.crcError': { zh: '从站收到 CRC 错误帧，忽略', en: 'Slave received CRC error frame, ignored' },
    'modbus.log.disconnected': { zh: '串口已断开', en: 'Serial port disconnected' },
    'modbus.log.exceptionResp': { zh: '异常响应', en: 'Exception response' },

    // Error names (Modbus exception codes)
    'modbus.err.illegalFunc': { zh: '非法功能码', en: 'Illegal Function' },
    'modbus.err.illegalAddr': { zh: '非法数据地址', en: 'Illegal Data Address' },
    'modbus.err.illegalValue': { zh: '非法数据值', en: 'Illegal Data Value' },
    'modbus.err.slaveFault': { zh: '从站故障', en: 'Slave Device Failure' },
    'modbus.err.unknown': { zh: '未知', en: 'Unknown' },

    // Response messages
    'modbus.resp.writeCoilOk': { zh: '写线圈成功', en: 'Write Coil OK' },
    'modbus.resp.writeRegOk': { zh: '写寄存器成功', en: 'Write Register OK' },
    'modbus.resp.writeCoilsOk': { zh: '写多个线圈成功', en: 'Write Multiple Coils OK' },
    'modbus.resp.writeRegsOk': { zh: '写多个寄存器成功', en: 'Write Multiple Registers OK' },
    'modbus.resp.unparsed': { zh: '未解析的响应', en: 'Unparsed response' },
    'modbus.resp.addr': { zh: '地址', en: 'Addr' },
    'modbus.resp.value': { zh: '值', en: 'Value' },
    'modbus.resp.start': { zh: '起始', en: 'Start' },
    'modbus.resp.qty': { zh: '数量', en: 'Qty' },
    'modbus.resp.responded': { zh: '已响应', en: 'Responded' },
    'modbus.resp.failed': { zh: '失败', en: 'Failed' },

    // Default command comments
    'modbus.cmdcomment.writeReg100': { zh: '写单寄存器=100', en: 'Write Single Reg=100' },
    'modbus.cmdcomment.writeCoilOn': { zh: '写单线圈=ON', en: 'Write Single Coil=ON' },
    'modbus.cmdcomment.writeMultiReg': { zh: '写多寄存器', en: 'Write Multiple Regs' },
    'modbus.cmdcomment.writeMultiCoil': { zh: '写多线圈', en: 'Write Multiple Coils' },

    // Footer
    'modbus.footer': { zh: '📡 Modbus RTU 串口助手 · Web Serial API · 主站/从站 · CRC-16 自动校验', en: '📡 Modbus RTU Serial Helper · Web Serial API · Master/Slave · CRC-16 Auto Check' }
};

(function() {
    'use strict';

    // ============================================================
    //  模式切换 (主站/从站)
    // ============================================================
    let currentMode = 'master';
    const modeSwitcher = document.getElementById('modeSwitcher');
    modeSwitcher.addEventListener('click', (e) => {
        const btn = e.target.closest('.mode-btn');
        if (!btn) return;
        const mode = btn.dataset.mode;
        if (mode === currentMode) return;
        currentMode = mode;
        document.body.className = 'mode-' + mode;
        modeSwitcher.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
        if (mode === 'slave') {
            stopAutoPoll();
            renderRegTable();
        }
    });

    // ============================================================
    //  串口连接 (Web Serial API)
    // ============================================================
    let port = null,
        reader = null,
        writer = null,
        isConnected = false;
    let readableStreamClosed = null;

    const baudSelect = document.getElementById('baudRate');
    const customBaud = document.getElementById('customBaud');
    const connectBtn = document.getElementById('connectBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    const connStatus = document.getElementById('connStatus');

    baudSelect.addEventListener('change', () => {
        customBaud.style.display = baudSelect.value === 'custom' ? 'inline-block' : 'none';
    });

    connectBtn.addEventListener('click', async () => {
        if (!('serial' in navigator)) {
            alert(window.I18N.t('modbus.alert.noSerial'));
            return;
        }
        try {
            port = await navigator.serial.requestPort();
            const baud = baudSelect.value === 'custom' ? parseInt(customBaud.value) : parseInt(baudSelect.value);
            if (!baud || baud <= 0) { alert(window.I18N.t('modbus.alert.invalidBaud')); return; }
            await port.open({
                baudRate: baud,
                dataBits: parseInt(document.getElementById('dataBits').value),
                stopBits: parseInt(document.getElementById('stopBits').value),
                parity: document.getElementById('parity').value
            });
            if (port.writable) {
                writer = port.writable.getWriter();
            }
            isConnected = true;
            updateConnUI(true);
            startReading();
        } catch (err) {
            if (err.name !== 'NotFoundError') {
                alert(window.I18N.t('modbus.alert.connectFail') + err.message);
            }
        }
    });

    disconnectBtn.addEventListener('click', async () => {
        await doDisconnect();
    });

    async function doDisconnect() {
        stopAutoPoll();
        isConnected = false;
        if (writer) {
            try { await writer.close(); } catch (e) {}
            try { writer.releaseLock(); } catch (e) {}
            writer = null;
        }
        if (reader) {
            try { await reader.cancel(); } catch (e) {}
            try { reader.releaseLock(); } catch (e) {}
            reader = null;
        }
        if (readableStreamClosed) {
            try { await readableStreamClosed.catch(() => {}); } catch (e) {}
            readableStreamClosed = null;
        }
        if (port) {
            try { await port.close(); } catch (e) {}
            port = null;
        }
        frameBuffer = [];
        updateConnUI(false);
    }

    function updateConnUI(connected) {
        connectBtn.disabled = connected;
        disconnectBtn.disabled = !connected;
        connStatus.innerHTML = connected ?
            '<span class="status-ok">' + window.I18N.t('modbus.status.connected') + '</span>' :
            window.I18N.t('modbus.status.disconnected');
        baudSelect.disabled = connected;
        document.getElementById('dataBits').disabled = connected;
        document.getElementById('stopBits').disabled = connected;
        document.getElementById('parity').disabled = connected;
    }

    // ============================================================
    //  数据收发
    // ============================================================
    const textDecoder = new TextDecoder();
    let frameBuffer = [];
    let rxByteCount = 0,
        txByteCount = 0,
        errCount = 0;
    let frameTimeout = null;
    const FRAME_GAP_MS = 30;

    function updateCounters() {
        document.getElementById('txCount').textContent = 'TX: ' + txByteCount;
        document.getElementById('rxCount').textContent = 'RX: ' + rxByteCount;
        document.getElementById('errCount').textContent = 'ERR: ' + errCount;
    }

    async function startReading() {
        try {
            reader = port.readable.getReader();
            readableStreamClosed = port.readable.closed;
            while (isConnected) {
                try {
                    const { value, done } = await reader.read();
                    if (done) break;
                    if (value && value.length > 0) {
                        rxByteCount += value.length;
                        updateCounters();
                        processRxBytes(value);
                    }
                } catch (e) {
                    break;
                }
            }
        } catch (e) {} finally {
            if (reader) { try { reader.releaseLock(); } catch (e2) {} reader = null; }
        }
    }

    function processRxBytes(data) {
        for (let i = 0; i < data.length; i++) {
            frameBuffer.push(data[i]);
        }
        if (frameTimeout) clearTimeout(frameTimeout);
        frameTimeout = setTimeout(() => {
            if (frameBuffer.length > 0) {
                const frame = new Uint8Array(frameBuffer);
                frameBuffer = [];
                onFrameReceived(frame);
            }
        }, FRAME_GAP_MS);
    }

    async function sendBytes(bytes) {
        if (!isConnected || !writer) return false;
        try {
            const encoder = new TextEncoder();
            await writer.write(bytes);
            txByteCount += bytes.length;
            updateCounters();
            addLog('tx', bytes);
            return true;
        } catch (e) {
            errCount++;
            updateCounters();
            addLog('err', null, window.I18N.t('modbus.log.sendFail') + e.message);
            return false;
        }
    }

    // ============================================================
    //  CRC-16 / Modbus
    // ============================================================
    function crc16Modbus(bytes) {
        let crc = 0xFFFF;
        for (let i = 0; i < bytes.length; i++) {
            crc ^= bytes[i] & 0xFF;
            for (let j = 0; j < 8; j++) {
                if (crc & 0x0001) {
                    crc = (crc >> 1) ^ 0xA001;
                } else {
                    crc >>= 1;
                }
            }
        }
        return crc;
    }

    function appendCRC(frame) {
        const crc = crc16Modbus(frame);
        const result = new Uint8Array(frame.length + 2);
        result.set(frame);
        result[frame.length] = crc & 0xFF;
        result[frame.length + 1] = (crc >> 8) & 0xFF;
        return result;
    }

    function verifyCRC(frame) {
        if (frame.length < 4) return false;
        const data = frame.slice(0, frame.length - 2);
        const crcReceived = frame[frame.length - 2] | (frame[frame.length - 1] << 8);
        const crcCalc = crc16Modbus(data);
        return crcReceived === crcCalc;
    }

    function bytesToHex(bytes) {
        return Array.from(bytes).map(b => (b & 0xFF).toString(16).toUpperCase().padStart(2, '0')).join(' ');
    }

    // ============================================================
    //  通信日志
    // ============================================================
    const logDisplay = document.getElementById('logDisplay');
    let logEntries = [];
    const MAX_LOG = 500;

    function addLog(type, bytes, text) {
        const now = new Date();
        const ts = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
        let html = '';
        if (type === 'tx') {
            html = `<span class="time">${ts}</span><span class="dir-tx">TX →</span><span class="hex-part">[${bytes.length}B] ${bytesToHex(bytes)}</span>`;
        } else if (type === 'rx') {
            const crcOk = verifyCRC(bytes);
            html = `<span class="time">${ts}</span><span class="dir-rx">RX ←</span><span class="hex-part">[${bytes.length}B] ${bytesToHex(bytes)}</span> ${crcOk ? '<span class="status-ok">CRC✓</span>' : '<span class="error-msg">CRC✗</span>'}`;
        } else if (type === 'err') {
            html = `<span class="time">${ts}</span><span class="dir-err">ERR</span> <span class="error-msg">${text || ''}</span>`;
        } else if (type === 'info') {
            html = `<span class="time">${ts}</span><span style="color:var(--accent-blue);font-size:0.62rem;font-weight:600;">INFO</span> <span style="color:var(--text-muted);font-size:0.65rem;">${text || ''}</span>`;
        }
        logEntries.push(html);
        if (logEntries.length > MAX_LOG) logEntries.shift();
        const shouldScroll = document.getElementById('autoScrollLog').checked;
        const isAtBottom = logDisplay.scrollTop + logDisplay.clientHeight >= logDisplay.scrollHeight - 20;
        logDisplay.innerHTML = logEntries.join('\n');
        if ((shouldScroll || isAtBottom) && type !== 'info') {
            logDisplay.scrollTop = logDisplay.scrollHeight;
        }
    }

    document.getElementById('clearLogBtn').addEventListener('click', () => {
        logEntries = [];
        logDisplay.innerHTML = window.I18N.t('modbus.log.cleared');
    });
    document.getElementById('exportLogBtn').addEventListener('click', () => {
        const text = logDisplay.textContent;
        const blob = new Blob([text], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'modbus_log_' + Date.now() + '.txt';
        a.click();
    });

    // ============================================================
    //  主站：帧构建与发送
    // ============================================================
    const mSlaveAddr = document.getElementById('mSlaveAddr');
    const mFuncCode = document.getElementById('mFuncCode');
    const mStartAddr = document.getElementById('mStartAddr');
    const mQuantity = document.getElementById('mQuantity');
    const mWriteValue = document.getElementById('mWriteValue');
    const framePreview = document.getElementById('framePreview');
    const crcPreview = document.getElementById('crcPreview');

    const FUNC_INFO = {
        '01': { name: '读线圈', maxQty: 2000, hasAddr: true, hasQty: true, hasValue: false },
        '02': { name: '读离散输入', maxQty: 2000, hasAddr: true, hasQty: true, hasValue: false },
        '03': { name: '读保持寄存器', maxQty: 125, hasAddr: true, hasQty: true, hasValue: false },
        '04': { name: '读输入寄存器', maxQty: 125, hasAddr: true, hasQty: true, hasValue: false },
        '05': { name: '写单个线圈', maxQty: 0, hasAddr: true, hasQty: false, hasValue: true, valLabelKey: 'modbus.label.writeValue',
            valHintKey: 'modbus.hint.fc05Value' },
        '06': { name: '写单个寄存器', maxQty: 0, hasAddr: true, hasQty: false, hasValue: true, valLabelKey: 'modbus.label.writeValue',
            valHintKey: 'modbus.hint.fc06Value' },
        '15': { name: '写多个线圈', maxQty: 1968, hasAddr: true, hasQty: true, hasValue: true, valLabelKey: 'modbus.label.coilDataHex',
            valHintKey: 'modbus.hint.fc15Value' },
        '16': { name: '写多个寄存器', maxQty: 123, hasAddr: true, hasQty: true, hasValue: true,
            valLabelKey: 'modbus.label.regDataHex', valHintKey: 'modbus.hint.fc16Value' },
    };

    function updateFuncUI() {
        const fc = mFuncCode.value;
        const info = FUNC_INFO[fc];
        if (!info) return;

        document.getElementById('mAddrRow').style.display = info.hasAddr ? 'flex' : 'none';
        document.getElementById('mQtyRow').style.display = info.hasQty ? 'flex' : 'none';
        document.getElementById('mValueRow').style.display = info.hasValue ? 'flex' : 'none';

        if (info.hasQty) {
            mQuantity.max = info.maxQty;
            if (parseInt(mQuantity.value) > info.maxQty) mQuantity.value = info.maxQty;
            document.getElementById('mQtyUnit').textContent = info.maxQty <= 2000 ? window.I18N.t('modbus.unit.max') + info.maxQty : '';
        }
        if (info.hasValue) {
            document.getElementById('mValueLabel').textContent = window.I18N.t(info.valLabelKey);
            document.getElementById('mValueHint').textContent = window.I18N.t(info.valHintKey);
        }
        updateFramePreview();
    }
    mFuncCode.addEventListener('change', updateFuncUI);
    [mSlaveAddr, mStartAddr, mQuantity, mWriteValue].forEach(el => el.addEventListener('input', updateFramePreview));

    function buildMasterFrame() {
        const addr = parseInt(mSlaveAddr.value) & 0xFF;
        const fc = parseInt(mFuncCode.value, 16);
        const startAddr = parseInt(mStartAddr.value) & 0xFFFF;
        const qty = parseInt(mQuantity.value) || 0;
        const info = FUNC_INFO[mFuncCode.value];

        let frame = [addr, fc, (startAddr >> 8) & 0xFF, startAddr & 0xFF];

        if (info.hasQty) {
            frame.push((qty >> 8) & 0xFF, qty & 0xFF);
        }
        if (info.hasValue) {
            const valStr = mWriteValue.value.trim();
            if (fc === 0x05) {
                let v = 0;
                if (valStr.toUpperCase() === 'FF00') v = 0xFF00;
                else if (valStr.toUpperCase() === '0000') v = 0x0000;
                else v = parseInt(valStr, 16) || 0;
                frame.push((v >> 8) & 0xFF, v & 0xFF);
            } else if (fc === 0x06) {
                let v = parseInt(valStr, valStr.startsWith('0x') || valStr.startsWith('0X') ? 16 : 10) || 0;
                frame.push((v >> 8) & 0xFF, v & 0xFF);
            } else if (fc === 0x15) {
                const bytes = parseHexValues(valStr);
                const byteCount = Math.ceil(qty / 8);
                frame.push(byteCount);
                for (let i = 0; i < byteCount && i < bytes.length; i++) {
                    frame.push(bytes[i] & 0xFF);
                }
            } else if (fc === 0x16) {
                const vals = parseHexValues(valStr);
                const byteCount = Math.min(qty, vals.length / 2) * 2;
                frame.push(byteCount);
                for (let i = 0; i < byteCount && i < vals.length; i++) {
                    frame.push(vals[i] & 0xFF);
                }
            }
        }

        return appendCRC(new Uint8Array(frame));
    }

    function parseHexValues(str) {
        const cleaned = str.replace(/0x/gi, '').replace(/[,，]/g, ' ').trim();
        if (!cleaned) return [];
        return cleaned.split(/\s+/).map(s => parseInt(s, 16)).filter(v => !isNaN(v) && v >= 0 && v <= 0xFF);
    }

    function updateFramePreview() {
        try {
            const frame = buildMasterFrame();
            const crc = frame[frame.length - 2] | (frame[frame.length - 1] << 8);
            crcPreview.textContent = 'CRC: 0x' + crc.toString(16).toUpperCase().padStart(4, '0');
            framePreview.textContent = bytesToHex(frame);
            framePreview.style.color = 'var(--text-code)';
        } catch (e) {
            framePreview.textContent = window.I18N.t('modbus.hint.paramError');
            framePreview.style.color = 'var(--status-error-text)';
            crcPreview.textContent = 'CRC: —';
        }
    }

    document.getElementById('buildFrameBtn').addEventListener('click', updateFramePreview);

    document.getElementById('sendModbusBtn').addEventListener('click', async () => {
        if (!isConnected) { alert(window.I18N.t('modbus.alert.connectFirst')); return; }
        try {
            const frame = buildMasterFrame();
            await sendBytes(frame);
        } catch (e) {
            errCount++;
            updateCounters();
            addLog('err', null, window.I18N.t('modbus.log.sendFail') + e.message);
        }
    });

    // ============================================================
    //  主站：响应解析
    // ============================================================
    let currentDataFormat = 'hex16';
    document.querySelectorAll('.format-group .fmt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.format-group .fmt-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDataFormat = btn.dataset.fmt;
            reRenderRespTable();
        });
    });

    let lastResponseData = null;
    let lastResponseMeta = null;

    function onFrameReceived(frame) {
        if (currentMode === 'master') {
            parseMasterResponse(frame);
        } else {
            handleSlaveRequest(frame);
        }
    }

    function parseMasterResponse(frame) {
        if (frame.length < 4) {
            addLog('rx', frame);
            return;
        }

        const addr = frame[0];
        const fc = frame[1];
        if (fc & 0x80) {
            const errCode = frame.length >= 3 ? frame[2] : 0;
            const errNames = {
                1: window.I18N.t('modbus.err.illegalFunc'),
                2: window.I18N.t('modbus.err.illegalAddr'),
                3: window.I18N.t('modbus.err.illegalValue'),
                4: window.I18N.t('modbus.err.slaveFault')
            };
            addLog('err', frame, `${window.I18N.t('modbus.log.exceptionResp')} FC=${(fc & 0x7F).toString(16)} ERR=${errCode} (${errNames[errCode] || window.I18N.t('modbus.err.unknown')})`);
            errCount++;
            updateCounters();
            return;
        }

        addLog('rx', frame);

        const respTableBody = document.getElementById('respTableBody');
        const startAddr = parseInt(mStartAddr.value) || 0;

        if (fc === 0x01 || fc === 0x02) {
            const byteCount = frame[2];
            const data = frame.slice(3, 3 + byteCount);
            lastResponseData = data;
            lastResponseMeta = { fc, startAddr, count: byteCount * 8 };
            renderCoilResponse(respTableBody, data, startAddr);
        } else if (fc === 0x03 || fc === 0x04) {
            const byteCount = frame[2];
            const data = frame.slice(3, 3 + byteCount);
            lastResponseData = data;
            lastResponseMeta = { fc, startAddr, count: byteCount / 2 };
            renderRegisterResponse(respTableBody, data, startAddr);
        } else if (fc === 0x05) {
            respTableBody.innerHTML = getWriteSuccessHtml(fc, frame);
            lastResponseData = frame;
            lastResponseMeta = { fc };
        } else if (fc === 0x06) {
            respTableBody.innerHTML = getWriteSuccessHtml(fc, frame);
            lastResponseData = frame;
            lastResponseMeta = { fc };
        } else if (fc === 0x15) {
            respTableBody.innerHTML = getWriteSuccessHtml(fc, frame);
            lastResponseData = frame;
            lastResponseMeta = { fc };
        } else if (fc === 0x16) {
            respTableBody.innerHTML = getWriteSuccessHtml(fc, frame);
            lastResponseData = frame;
            lastResponseMeta = { fc };
        } else {
            respTableBody.innerHTML =
                `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);">${window.I18N.t('modbus.resp.unparsed')} FC=0x${fc.toString(16)}</td></tr>`;
        }
    }

    function renderCoilResponse(tbody, data, startAddr) {
        let html = '';
        for (let byteIdx = 0; byteIdx < data.length; byteIdx++) {
            for (let bit = 0; bit < 8; bit++) {
                const addr = startAddr + byteIdx * 8 + bit;
                const val = (data[byteIdx] >> bit) & 1;
                html +=
                    `<tr><td class="addr-cell">${addr}</td><td>${val}</td><td>${val ? 'ON' : 'OFF'}</td><td style="color:${val ? 'var(--status-ok-text)' : 'var(--text-light)'};">${val ? '● ON' : '○ OFF'}</td></tr>`;
            }
        }
        tbody.innerHTML = html;
    }

    function renderRegisterResponse(tbody, data, startAddr) {
        let html = '';
        for (let i = 0; i + 1 < data.length; i += 2) {
            const addr = startAddr + i / 2;
            const raw = (data[i] << 8) | data[i + 1];
            const hex = '0x' + raw.toString(16).toUpperCase().padStart(4, '0');
            let formatted = '';

            if (currentDataFormat === 'hex16') {
                formatted = hex;
            } else if (currentDataFormat === 'int16') {
                const signed = raw > 32767 ? raw - 65536 : raw;
                formatted = signed.toString();
            } else if (currentDataFormat === 'hex32' && i + 3 < data.length) {
                const val = ((data[i] << 24) | (data[i + 1] << 16) | (data[i + 2] << 8) | data[i + 3]) >>> 0;
                formatted = '0x' + val.toString(16).toUpperCase().padStart(8, '0');
            } else if (currentDataFormat === 'float' && i + 3 < data.length) {
                const buf = new ArrayBuffer(4);
                const dv = new DataView(buf);
                dv.setUint16(0, (data[i] << 8) | data[i + 1], false);
                dv.setUint16(2, (data[i + 2] << 8) | data[i + 3], false);
                formatted = dv.getFloat32(0, false).toFixed(4);
            } else if (currentDataFormat === 'ascii') {
                formatted = String.fromCharCode(data[i], data[i + 1]).replace(/[^\x20-\x7E]/g, '.');
            } else {
                formatted = hex;
            }

            html +=
                `<tr><td class="addr-cell">${addr}</td><td>${hex}</td><td>${raw}</td><td>${formatted}</td></tr>`;
        }
        tbody.innerHTML = html;
    }

    function getWriteSuccessHtml(fc, frame) {
        if (fc === 0x05) {
            return `<tr><td colspan="4" style="text-align:center;"><span class="status-ok">${window.I18N.t('modbus.resp.writeCoilOk')}</span> ${window.I18N.t('modbus.resp.addr')}=${(frame[2]<<8|frame[3])} ${window.I18N.t('modbus.resp.value')}=${bytesToHex(frame.slice(4,6))}</td></tr>`;
        } else if (fc === 0x06) {
            return `<tr><td colspan="4" style="text-align:center;"><span class="status-ok">${window.I18N.t('modbus.resp.writeRegOk')}</span> ${window.I18N.t('modbus.resp.addr')}=${(frame[2]<<8|frame[3])} ${window.I18N.t('modbus.resp.value')}=${bytesToHex(frame.slice(4,6))}</td></tr>`;
        } else if (fc === 0x15) {
            const startA = (frame[2] << 8) | frame[3];
            const qty = (frame[4] << 8) | frame[5];
            return `<tr><td colspan="4" style="text-align:center;"><span class="status-ok">${window.I18N.t('modbus.resp.writeCoilsOk')}</span> ${window.I18N.t('modbus.resp.start')}=${startA} ${window.I18N.t('modbus.resp.qty')}=${qty}</td></tr>`;
        } else if (fc === 0x16) {
            const startA = (frame[2] << 8) | frame[3];
            const qty = (frame[4] << 8) | frame[5];
            return `<tr><td colspan="4" style="text-align:center;"><span class="status-ok">${window.I18N.t('modbus.resp.writeRegsOk')}</span> ${window.I18N.t('modbus.resp.start')}=${startA} ${window.I18N.t('modbus.resp.qty')}=${qty}</td></tr>`;
        }
        return '';
    }

    function reRenderRespTable() {
        if (!lastResponseData || !lastResponseMeta) return;
        const { fc, startAddr, count } = lastResponseMeta;
        const tbody = document.getElementById('respTableBody');
        if (fc === 0x01 || fc === 0x02) {
            renderCoilResponse(tbody, lastResponseData, startAddr);
        } else if (fc === 0x03 || fc === 0x04) {
            renderRegisterResponse(tbody, lastResponseData, startAddr);
        } else if (fc === 0x05 || fc === 0x06 || fc === 0x15 || fc === 0x16) {
            tbody.innerHTML = getWriteSuccessHtml(fc, lastResponseData);
        }
    }

    // ============================================================
    //  主站：自动轮询
    // ============================================================
    let autoPollTimer = null;
    let isAutoPolling = false;

    document.getElementById('autoPollBtn').addEventListener('click', () => {
        if (isAutoPolling) stopAutoPoll();
        else startAutoPoll();
    });

    function startAutoPoll() {
        if (!isConnected) { alert(window.I18N.t('modbus.alert.connectFirst')); return; }
        isAutoPolling = true;
        document.getElementById('pollIndicator').classList.add('active');
        document.getElementById('autoPollBtn').style.borderColor = 'var(--accent-blue)';
        const interval = parseInt(document.getElementById('pollInterval').value) || 1000;
        autoPollTimer = setInterval(async () => {
            if (!isConnected) { stopAutoPoll(); return; }
            try {
                const frame = buildMasterFrame();
                await sendBytes(frame);
            } catch (e) { /* ignore */ }
        }, interval);
    }

    function stopAutoPoll() {
        isAutoPolling = false;
        if (autoPollTimer) { clearInterval(autoPollTimer);
            autoPollTimer = null; }
        document.getElementById('pollIndicator').classList.remove('active');
        document.getElementById('autoPollBtn').style.borderColor = '';
    }

    // ============================================================
    //  从站：寄存器数据
    // ============================================================
    const slaveRegData = {
        coils: new Uint8Array(256).fill(0),
        discrete: new Uint8Array(256).fill(0),
        holding: new Uint16Array(256).fill(0),
        input: new Uint16Array(256).fill(0),
    };

    function renderRegTable() {
        const type = document.getElementById('regType').value;
        const start = parseInt(document.getElementById('regStart').value) || 0;
        const end = parseInt(document.getElementById('regEnd').value) || 49;
        const isBit = (type === 'coils' || type === 'discrete');
        const tbody = document.getElementById('regTableBody');
        const thead = document.querySelector('#regTable thead tr');

        if (isBit) {
            var bitLabel = window.I18N.t('modbus.th.bit');
            thead.innerHTML =
                '<th>' + window.I18N.t('modbus.th.addr') + '</th><th>' + bitLabel + '7</th><th>' + bitLabel + '6</th><th>' + bitLabel + '5</th><th>' + bitLabel + '4</th><th>' + bitLabel + '3</th><th>' + bitLabel + '2</th><th>' + bitLabel + '1</th><th>' + bitLabel + '0</th><th>HEX</th>';
        } else {
            thead.innerHTML = '<th>' + window.I18N.t('modbus.th.addr') + '</th><th>' + window.I18N.t('modbus.th.valHex') + '</th><th>' + window.I18N.t('modbus.th.valDec') + '</th><th>' + window.I18N.t('modbus.th.bitsHi') + '</th><th>' + window.I18N.t('modbus.th.bitsLo') + '</th>';
        }

        let html = '';
        if (isBit) {
            for (let byteAddr = Math.floor(start / 8); byteAddr <= Math.floor(end / 8) && byteAddr < 256; byteAddr++) {
                const val = slaveRegData[type][byteAddr];
                let bits = '';
                for (let b = 7; b >= 0; b--) {
                    const bitVal = (val >> b) & 1;
                    const bitAddr = byteAddr * 8 + (7 - b);
                    bits +=
                        `<td><input type="number" min="0" max="1" value="${bitVal}" data-type="${type}" data-baddr="${byteAddr}" data-bit="${7-b}" style="width:36px;text-align:center;" ${bitAddr < start || bitAddr > end ? 'disabled' : ''}></td>`;
                }
                html +=
                    `<tr><td class="addr-cell">${byteAddr * 8}~${byteAddr * 8 + 7}</td>${bits}<td>0x${val.toString(16).toUpperCase().padStart(2, '0')}</td></tr>`;
            }
        } else {
            for (let addr = start; addr <= end && addr < 256; addr++) {
                const val = slaveRegData[type][addr];
                const hex = '0x' + val.toString(16).toUpperCase().padStart(4, '0');
                const hi = (val >> 8) & 0xFF;
                const lo = val & 0xFF;
                html +=
                    `<tr><td class="addr-cell">${addr}</td><td><input type="text" value="${hex}" data-type="${type}" data-addr="${addr}" data-part="hex"></td><td>${val}</td><td>${hi.toString(16).toUpperCase().padStart(2,'0')}</td><td>${lo.toString(16).toUpperCase().padStart(2,'0')}</td></tr>`;
            }
        }
        tbody.innerHTML = html;

        tbody.querySelectorAll('input').forEach(inp => {
            inp.addEventListener('change', function() {
                const type = this.dataset.type;
                if (this.dataset.bit !== undefined) {
                    const bAddr = parseInt(this.dataset.baddr);
                    const bit = parseInt(this.dataset.bit);
                    const v = parseInt(this.value) ? 1 : 0;
                    if (v) slaveRegData[type][bAddr] |= (1 << bit);
                    else slaveRegData[type][bAddr] &= ~(1 << bit);
                    renderRegTable();
                } else if (this.dataset.addr !== undefined) {
                    const addr = parseInt(this.dataset.addr);
                    let val = parseInt(this.value, 16);
                    if (isNaN(val)) val = parseInt(this.value, 10);
                    if (isNaN(val)) val = 0;
                    val = val & 0xFFFF;
                    slaveRegData[type][addr] = val;
                    renderRegTable();
                }
            });
        });
    }

    document.getElementById('regType').addEventListener('change', renderRegTable);
    document.getElementById('refreshRegBtn').addEventListener('click', renderRegTable);
    document.getElementById('initRegBtn').addEventListener('click', () => {
        const type = document.getElementById('regType').value;
        if (type === 'coils' || type === 'discrete') {
            slaveRegData[type].fill(0);
        } else {
            for (let i = 0; i < slaveRegData[type].length; i++) {
                slaveRegData[type][i] = i;
            }
        }
        renderRegTable();
        addLog('info', null, window.I18N.t('modbus.log.regInit'));
    });

    // ============================================================
    //  从站：自动响应请求
    // ============================================================
    let slaveReqLog = [];

    function handleSlaveRequest(frame) {
        addLog('rx', frame);
        if (frame.length < 4) return;

        const myAddr = parseInt(document.getElementById('slaveAddr').value) || 1;
        const reqAddr = frame[0];
        const fc = frame[1];

        if (reqAddr !== myAddr) return;

        if (!verifyCRC(frame)) {
            addLog('err', null, window.I18N.t('modbus.log.crcError'));
            errCount++;
            updateCounters();
            return;
        }

        const delay = parseInt(document.getElementById('slaveDelay').value) || 0;
        setTimeout(() => {
            const response = buildSlaveResponse(frame);
            if (response) {
                sendBytes(response);
                logSlaveRequest(frame, true, '');
            } else {
                const errResp = appendCRC(new Uint8Array([myAddr, fc | 0x80, 0x01]));
                sendBytes(errResp);
                logSlaveRequest(frame, false, window.I18N.t('modbus.err.illegalFunc'));
            }
        }, delay);
    }

    function buildSlaveResponse(req) {
        const myAddr = parseInt(document.getElementById('slaveAddr').value) || 1;
        const fc = req[1];
        const reqData = req.slice(2, req.length - 2);

        let resp = [myAddr, fc];

        switch (fc) {
            case 0x01: {
                const startAddr = (reqData[0] << 8) | reqData[1];
                const qty = (reqData[2] << 8) | reqData[3];
                if (qty < 1 || qty > 2000) return appendCRC(new Uint8Array([myAddr, fc | 0x80, 0x03]));
                const byteCount = Math.ceil(qty / 8);
                resp.push(byteCount);
                for (let i = 0; i < byteCount; i++) {
                    const byteAddr = Math.floor(startAddr / 8) + i;
                    resp.push(byteAddr < 256 ? (slaveRegData.coils[byteAddr] & 0xFF) : 0);
                }
                break;
            }
            case 0x02: {
                const startAddr = (reqData[0] << 8) | reqData[1];
                const qty = (reqData[2] << 8) | reqData[3];
                if (qty < 1 || qty > 2000) return appendCRC(new Uint8Array([myAddr, fc | 0x80, 0x03]));
                const byteCount = Math.ceil(qty / 8);
                resp.push(byteCount);
                for (let i = 0; i < byteCount; i++) {
                    const byteAddr = Math.floor(startAddr / 8) + i;
                    resp.push(byteAddr < 256 ? (slaveRegData.discrete[byteAddr] & 0xFF) : 0);
                }
                break;
            }
            case 0x03: {
                const startAddr = (reqData[0] << 8) | reqData[1];
                const qty = (reqData[2] << 8) | reqData[3];
                if (qty < 1 || qty > 125) return appendCRC(new Uint8Array([myAddr, fc | 0x80, 0x03]));
                resp.push(qty * 2);
                for (let i = 0; i < qty; i++) {
                    const addr = startAddr + i;
                    const val = addr < 256 ? slaveRegData.holding[addr] : 0;
                    resp.push((val >> 8) & 0xFF, val & 0xFF);
                }
                break;
            }
            case 0x04: {
                const startAddr = (reqData[0] << 8) | reqData[1];
                const qty = (reqData[2] << 8) | reqData[3];
                if (qty < 1 || qty > 125) return appendCRC(new Uint8Array([myAddr, fc | 0x80, 0x03]));
                resp.push(qty * 2);
                for (let i = 0; i < qty; i++) {
                    const addr = startAddr + i;
                    const val = addr < 256 ? slaveRegData.input[addr] : 0;
                    resp.push((val >> 8) & 0xFF, val & 0xFF);
                }
                break;
            }
            case 0x05: {
                const addr = (reqData[0] << 8) | reqData[1];
                const val = (reqData[2] << 8) | reqData[3];
                resp = [myAddr, fc, reqData[0], reqData[1], reqData[2], reqData[3]];
                if (addr < 2048) {
                    const byteAddr = Math.floor(addr / 8);
                    const bit = addr % 8;
                    if (val === 0xFF00) slaveRegData.coils[byteAddr] |= (1 << bit);
                    else if (val === 0x0000) slaveRegData.coils[byteAddr] &= ~(1 << bit);
                    renderRegTable();
                }
                break;
            }
            case 0x06: {
                const addr = (reqData[0] << 8) | reqData[1];
                const val = (reqData[2] << 8) | reqData[3];
                resp = [myAddr, fc, reqData[0], reqData[1], reqData[2], reqData[3]];
                if (addr < 256) {
                    slaveRegData.holding[addr] = val;
                    renderRegTable();
                }
                break;
            }
            case 0x0F: {
                const startAddr = (reqData[0] << 8) | reqData[1];
                const qty = (reqData[2] << 8) | reqData[3];
                const byteCount = reqData[4];
                for (let i = 0; i < byteCount; i++) {
                    const byteAddr = Math.floor(startAddr / 8) + i;
                    if (byteAddr < 256) {
                        slaveRegData.coils[byteAddr] = reqData[5 + i];
                    }
                }
                resp = [myAddr, fc, reqData[0], reqData[1], reqData[2], reqData[3]];
                renderRegTable();
                break;
            }
            case 0x10: {
                const startAddr = (reqData[0] << 8) | reqData[1];
                const qty = (reqData[2] << 8) | reqData[3];
                const byteCount = reqData[4];
                for (let i = 0; i < qty && (5 + i * 2 + 1) < reqData.length; i++) {
                    const addr = startAddr + i;
                    if (addr < 256) {
                        slaveRegData.holding[addr] = (reqData[5 + i * 2] << 8) | reqData[5 + i * 2 + 1];
                    }
                }
                resp = [myAddr, fc, reqData[0], reqData[1], reqData[2], reqData[3]];
                renderRegTable();
                break;
            }
            default:
                return null;
        }

        return appendCRC(new Uint8Array(resp));
    }

    function logSlaveRequest(req, ok, msg) {
        const now = new Date();
        const ts = now.toTimeString().split(' ')[0];
        const fc = req[1];
        const fcNames = {
            1: window.I18N.t('modbus.fcname.01'),
            2: window.I18N.t('modbus.fcname.02'),
            3: window.I18N.t('modbus.fcname.03'),
            4: window.I18N.t('modbus.fcname.04'),
            5: window.I18N.t('modbus.fcname.05'),
            6: window.I18N.t('modbus.fcname.06'),
            0x0F: window.I18N.t('modbus.fcname.15'),
            0x10: window.I18N.t('modbus.fcname.16')
        };
        const name = fcNames[fc] || ('FC' + fc.toString(16));
        const tbody = document.getElementById('slaveReqBody');
        if (slaveReqLog.length === 0) tbody.innerHTML = '';
        const row = document.createElement('tr');
        row.innerHTML =
            `<td>${ts}</td><td class="addr-cell">${req[0]}</td><td>${fc} ${name}</td><td style="font-size:0.65rem;">${bytesToHex(req.slice(0, req.length-2))}</td><td>${ok ? '<span class="status-ok">' + window.I18N.t('modbus.resp.responded') + '</span>' : '<span class="error-msg">' + (msg||window.I18N.t('modbus.resp.failed')) + '</span>'}</td>`;
        tbody.insertBefore(row, tbody.firstChild);
        slaveReqLog.push({ ts, req, ok });
        if (slaveReqLog.length > 100) {
            slaveReqLog.shift();
            if (tbody.lastChild) tbody.removeChild(tbody.lastChild);
        }
    }

    document.getElementById('clearSlaveLogBtn').addEventListener('click', () => {
        slaveReqLog = [];
        document.getElementById('slaveReqBody').innerHTML =
            '<tr><td colspan="5" style="text-align:center;color:var(--text-light);padding:20px;">' + window.I18N.t('modbus.log.cleared') + '</td></tr>';
    });

    // ============================================================
    //  快捷指令
    // ============================================================
    const DEFAULT_CMDS = [
        { cmd: '01 03 00 00 00 0A', commentKey: 'modbus.fcname.03' },
        { cmd: '01 01 00 00 00 10', commentKey: 'modbus.fcname.01' },
        { cmd: '01 02 00 00 00 10', commentKey: 'modbus.fcname.02' },
        { cmd: '01 04 00 00 00 0A', commentKey: 'modbus.fcname.04' },
        { cmd: '01 06 00 00 00 64', commentKey: 'modbus.cmdcomment.writeReg100' },
        { cmd: '01 05 00 00 FF 00', commentKey: 'modbus.cmdcomment.writeCoilOn' },
        { cmd: '01 10 00 00 00 02 04 00 64 00 C8', commentKey: 'modbus.cmdcomment.writeMultiReg' },
        { cmd: '01 0F 00 00 00 08 01 FF', commentKey: 'modbus.cmdcomment.writeMultiCoil' },
    ];
    let cmdList = [...DEFAULT_CMDS];

    function saveCmds() { try { localStorage.setItem('modbus_cmds', JSON.stringify(cmdList)); } catch (e) {} }

    function loadCmds() {
        try {
            const s = localStorage.getItem('modbus_cmds');
            if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length) cmdList = p; }
        } catch (e) {}
    }
    loadCmds();

    function renderCmds() {
        const container = document.getElementById('cmdContainer');
        container.innerHTML = '';
        cmdList.forEach((item, idx) => {
            const cmd = typeof item === 'string' ? item : item.cmd;
            const comment = typeof item === 'string' ? '' :
                (item.commentKey ? window.I18N.t(item.commentKey) : (item.comment || ''));
            const wrapper = document.createElement('span');
            wrapper.className = 'cmd-item';
            const btn = document.createElement('button');
            btn.className = 'cmd-btn';
            btn.textContent = cmd.replace(/\s+/g, ' ');
            btn.title = comment || cmd;
            btn.addEventListener('click', () => {
                if (!isConnected) { alert(window.I18N.t('modbus.alert.connectFirst')); return; }
                const bytes = parseHexToBytes(cmd);
                if (bytes.length > 0) sendBytes(bytes);
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
            container.appendChild(wrapper);
        });
    }

    function parseHexToBytes(str) {
        const cleaned = str.replace(/0x/gi, '').replace(/[,，]/g, ' ').trim();
        if (!cleaned) return [];
        return cleaned.split(/\s+/).map(s => parseInt(s, 16)).filter(v => !isNaN(v) && v >= 0 && v <= 0xFF);
    }

    renderCmds();

    document.getElementById('addCmdBtn').addEventListener('click', () => {
        const val = document.getElementById('customCmdInput').value.trim();
        const comment = document.getElementById('customCmdComment').value.trim();
        if (!val) return;
        cmdList.push({ cmd: val, comment: comment || '' });
        renderCmds();
        saveCmds();
        document.getElementById('customCmdInput').value = '';
        document.getElementById('customCmdComment').value = '';
    });
    document.getElementById('customCmdInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') document
            .getElementById('addCmdBtn').click(); });
    document.getElementById('resetCmdBtn').addEventListener('click', () => {
        cmdList = [...DEFAULT_CMDS];
        renderCmds();
        saveCmds();
    });

    document.getElementById('exportCmdsBtn').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(cmdList, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'modbus_commands.json';
        a.click();
    });
    document.getElementById('importCmdsBtn').addEventListener('click', () => document.getElementById('importCmdsInput')
        .click());
    document.getElementById('importCmdsInput').addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const data = JSON.parse(ev.target.result);
                    if (Array.isArray(data)) { cmdList = data;
                        renderCmds();
                        saveCmds(); }
                } catch (err) { alert(window.I18N.t('modbus.alert.jsonParseFail')); }
            };
            reader.readAsText(e.target.files[0]);
            e.target.value = '';
        }
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.title = window.I18N.t('modbus.doc.title');
    updateOptgroupLabels();
    updateConnUI(false);
    logDisplay.textContent = window.I18N.t('modbus.hint.waitComm');
    updateFuncUI();
    if (currentMode === 'slave') renderRegTable();

    // 监听语言切换，更新动态文本
    document.addEventListener('languagechange', function () {
        document.title = window.I18N.t('modbus.doc.title');
        updateOptgroupLabels();
        updateConnUI(isConnected);
        updateFuncUI();
        updateCounters();
        if (currentMode === 'slave') renderRegTable();
        reRenderRespTable();
        renderCmds();
        if (logEntries.length === 0) {
            logDisplay.textContent = window.I18N.t('modbus.hint.waitComm');
        }
        if (slaveReqLog.length === 0) {
            document.getElementById('slaveReqBody').innerHTML =
                '<tr><td colspan="5" style="text-align:center;color:var(--text-light);padding:20px;">' + window.I18N.t('modbus.hint.waitReq') + '</td></tr>';
        }
    });

    if ('serial' in navigator) {
        navigator.serial.addEventListener('disconnect', (e) => {
            if (port && e.target === port) {
                isConnected = false;
                port = null;
                reader = null;
                writer = null;
                updateConnUI(false);
                stopAutoPoll();
                addLog('err', null, window.I18N.t('modbus.log.disconnected'));
            }
        });
    }

    // 更新 optgroup 的 label 属性（data-optgroup-key）
    function updateOptgroupLabels() {
        document.querySelectorAll('optgroup[data-optgroup-key]').forEach(function (el) {
            el.setAttribute('label', window.I18N.t(el.getAttribute('data-optgroup-key')));
        });
    }

})();
