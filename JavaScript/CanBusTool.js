// ============================================================
//  CanBusTool.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    // 文档标题
    'can.doc.title':      { zh: 'CAN 总线助手', en: 'CAN Bus Helper' },

    // 页面标题 / 副标题
    'can.page.title':     { zh: '🔗 CAN 总线助手', en: '🔗 CAN Bus Helper' },
    'can.subhead':        { zh: '🔹 CAN 2.0A/B 帧解析 · J1939 协议拆解 · DBC 文件解析 · 信号解码 (Intel/Motorola) · 反向计算 · 模拟收发',
                            en: '🔹 CAN 2.0A/B frame parsing · J1939 disassembly · DBC parsing · Signal decoding (Intel/Motorola) · Reverse calc · TX/RX sim' },

    // ① 帧输入
    'can.p1.title':       { zh: '① CAN 帧输入', en: '① CAN Frame Input' },
    'can.p1.small':       { zh: 'ID & 数据', en: 'ID & Data' },
    'can.label.idHex':    { zh: 'ID (HEX)', en: 'ID (HEX)' },
    'can.unit.stdExt':    { zh: '(标准/扩展)', en: '(Standard/Extended)' },
    'can.label.frameType':{ zh: '帧类型', en: 'Frame Type' },
    'can.option.std':     { zh: '标准帧 (11-bit)', en: 'Standard (11-bit)' },
    'can.option.ext':     { zh: '扩展帧 (29-bit)', en: 'Extended (29-bit)' },
    'can.label.dlc':      { zh: 'DLC', en: 'DLC' },
    'can.unit.dlcRange':  { zh: '(0-8)', en: '(0-8)' },
    'can.label.dataHex':  { zh: '数据 (HEX)', en: 'Data (HEX)' },
    'can.placeholder.data': { zh: '11 22 33 44 55 66 77 88', en: '11 22 33 44 55 66 77 88' },
    'can.hint.dataFmt':   { zh: '空格/连续/0x前缀', en: 'Space / contiguous / 0x prefix' },
    'can.btn.parse':      { zh: '▶ 解析帧', en: '▶ Parse' },
    'can.btn.clear':      { zh: '🗑️ 清空', en: '🗑️ Clear' },
    'can.btn.example':    { zh: '📄 示例 (J1939)', en: '📄 Example (J1939)' },

    // ② 帧解析结果
    'can.p2.title':       { zh: '② 帧解析结果', en: '② Frame Parse Result' },
    'can.label.idDec':    { zh: 'ID (DEC)', en: 'ID (DEC)' },
    'can.label.dataLen':  { zh: '数据长度', en: 'Data Length' },
    'can.result.fullFrame':{ zh: '完整帧 (用于模拟)', en: 'Full Frame (for sim)' },

    // ③ J1939 拆解
    'can.p3.title':       { zh: '③ J1939 协议拆解', en: '③ J1939 Disassembly' },
    'can.p3.small':       { zh: '(扩展帧)', en: '(Extended)' },
    'can.label.priority': { zh: '优先级', en: 'Priority' },
    'can.label.pf':       { zh: 'PDU 格式 (PF)', en: 'PDU Format (PF)' },
    'can.label.ps':       { zh: 'PDU 特定 (PS)', en: 'PDU Specific (PS)' },
    'can.label.sa':       { zh: '源地址 (SA)', en: 'Source Address (SA)' },
    'can.label.pgn':      { zh: 'PGN (参数组)', en: 'PGN (Parameter Group)' },
    'can.label.pgnType':  { zh: 'PGN 类型', en: 'PGN Type' },

    // ④ 位视图
    'can.p4.title':       { zh: '④ ID 位视图', en: '④ ID Bit View' },
    'can.p4.small':       { zh: '29-bit 扩展帧 · 全宽展示', en: '29-bit extended · full width' },
    'can.legend.pri':     { zh: '优先级 (PRI)', en: 'Priority (PRI)' },
    'can.legend.pf':      { zh: 'PDU 格式 (PF)', en: 'PDU Format (PF)' },
    'can.legend.ps':      { zh: 'PDU 特定 (PS)', en: 'PDU Specific (PS)' },
    'can.legend.sa':      { zh: '源地址 (SA)', en: 'Source Address (SA)' },
    'can.legend.bit':     { zh: '█ 每个色块代表 1 bit', en: '█ Each block = 1 bit' },
    'can.legend.stdId':   { zh: '标准帧 ID (11-bit)', en: 'Standard ID (11-bit)' },

    // ⑤ DBC
    'can.p5.title':       { zh: '⑤ DBC 文件加载', en: '⑤ DBC File Load' },
    'can.p5.small':       { zh: '上传 .dbc 自动匹配信号', en: 'Upload .dbc to auto-match signals' },
    'can.label.dbcFile':  { zh: 'DBC 文件', en: 'DBC File' },
    'can.btn.chooseDbc':  { zh: '📁 选择 .dbc', en: '📁 Choose .dbc' },
    'can.btn.clearDbc':   { zh: '清除', en: 'Clear' },
    'can.dbc.notLoaded':  { zh: '未加载', en: 'Not loaded' },
    'can.dbc.waiting':    { zh: '等待加载 DBC...', en: 'Waiting for DBC...' },

    // ⑥ 信号解码
    'can.p6.title':       { zh: '⑥ 信号解码', en: '⑥ Signal Decoding' },
    'can.p6.small':       { zh: '从 DBC 或手动定义', en: 'From DBC or manual' },
    'can.label.sigName':  { zh: '信号名称', en: 'Signal Name' },
    'can.placeholder.sigName': { zh: 'e.g. EngineSpeed', en: 'e.g. EngineSpeed' },
    'can.label.startBit': { zh: '起始位', en: 'Start Bit' },
    'can.label.length':   { zh: '长度 (bit)', en: 'Length (bit)' },
    'can.label.byteOrder':{ zh: '字节序', en: 'Byte Order' },
    'can.option.moto':    { zh: 'Motorola (大端)', en: 'Motorola (Big-endian)' },
    'can.option.intel':   { zh: 'Intel (小端)', en: 'Intel (Little-endian)' },
    'can.label.type':     { zh: '类型', en: 'Type' },
    'can.option.unsigned':{ zh: '无符号', en: 'Unsigned' },
    'can.option.signed':  { zh: '有符号', en: 'Signed' },
    'can.option.float':   { zh: 'IEEE 754 浮点', en: 'IEEE 754 Float' },
    'can.label.scale':    { zh: '缩放因子', en: 'Scale Factor' },
    'can.label.offset':   { zh: '偏移量', en: 'Offset' },
    'can.label.unit':     { zh: '单位', en: 'Unit' },
    'can.placeholder.unit': { zh: 'rpm', en: 'rpm' },
    'can.btn.addSig':     { zh: '➕ 添加信号', en: '➕ Add Signal' },
    'can.btn.decode':     { zh: '🔍 解码', en: '🔍 Decode' },
    'can.btn.clearSig':   { zh: '🗑️ 清空信号', en: '🗑️ Clear Signals' },
    // 表头
    'can.th.name':        { zh: '名称', en: 'Name' },
    'can.th.start':       { zh: '起始位', en: 'Start' },
    'can.th.length':      { zh: '长度', en: 'Length' },
    'can.th.endian':      { zh: '字节序', en: 'Endian' },
    'can.th.type':        { zh: '类型', en: 'Type' },
    'can.th.scale':       { zh: '缩放', en: 'Scale' },
    'can.th.offset':      { zh: '偏移', en: 'Offset' },
    'can.th.unit':        { zh: '单位', en: 'Unit' },
    'can.th.raw':         { zh: '原始值', en: 'Raw' },
    'can.th.phys':        { zh: '物理值', en: 'Physical' },
    'can.th.op':          { zh: '操作', en: 'Action' },

    // ⑦ 反向计算
    'can.p7.title':       { zh: '⑦ 反向计算', en: '⑦ Reverse Calculation' },
    'can.p7.small':       { zh: '物理值 → 原始值', en: 'Physical → Raw' },
    'can.placeholder.invSig': { zh: '选择信号', en: 'Select signal' },
    'can.label.physVal':  { zh: '物理值', en: 'Physical' },
    'can.label.length2':  { zh: '长度', en: 'Length' },
    'can.label.scale2':   { zh: '缩放', en: 'Scale' },
    'can.label.offset2':  { zh: '偏移', en: 'Offset' },
    'can.btn.invCalc':    { zh: '🔄 计算原始值', en: '🔄 Calc Raw' },
    'can.result.rawVal':  { zh: '原始值 (DEC / HEX)', en: 'Raw Value (DEC / HEX)' },
    'can.sub.waitCalc':   { zh: '等待计算', en: 'Waiting to calculate' },

    // ⑧ PGN 预设
    'can.p8.title':       { zh: '⑧ 常用 J1939 PGN 预设', en: '⑧ Common J1939 PGN Presets' },
    'can.pgn.engineSpeed':{ zh: '发动机转速', en: 'Engine Speed' },
    'can.pgn.vehicleSpeed':{ zh: '车速', en: 'Vehicle Speed' },
    'can.pgn.coolantTemp':{ zh: '冷却液温度', en: 'Coolant Temp' },
    'can.pgn.oilPressure':{ zh: '油压', en: 'Oil Pressure' },
    'can.pgn.throttle':   { zh: '油门踏板位置', en: 'Throttle Position' },
    'can.hint.pgnPreset': { zh: '点击预设自动填入 ID (PGN + 源地址 0x00)', en: 'Click a preset to fill ID (PGN + SA 0x00)' },

    // ⑨ CRC 校验
    'can.p9.title':       { zh: '⑨ CRC 校验', en: '⑨ CRC Check' },
    'can.p9.small':       { zh: '对当前数据', en: 'On current data' },
    'can.label.algo':     { zh: '算法', en: 'Algorithm' },
    'can.btn.calcCrc':    { zh: '计算 CRC', en: 'Compute CRC' },
    'can.result.crc':     { zh: 'CRC 结果', en: 'CRC Result' },

    // ⑩ 模拟收发
    'can.p10.title':      { zh: '⑩ 模拟收发', en: '⑩ TX/RX Simulation' },
    'can.p10.small':      { zh: '发送 & 日志', en: 'Send & Log' },
    'can.btn.send':       { zh: '📤 发送当前帧', en: '📤 Send Current Frame' },
    'can.btn.clearLog':   { zh: '🗑️ 清空日志', en: '🗑️ Clear Log' },
    'can.log.ready':      { zh: '[系统] 就绪，等待发送...', en: '[System] Ready, waiting to send...' },

    // footer
    'can.footer':         { zh: '🔗 CAN 总线助手 · 支持 J1939 拆解、DBC 解析、信号解码、反向计算', en: '🔗 CAN Bus Helper · J1939 disassembly, DBC parsing, signal decoding, reverse calc' },

    // 动态文本
    'can.dyn.invalidId':  { zh: '❌ 无效ID', en: '❌ Invalid ID' },
    'can.dyn.stdFrame':   { zh: '标准帧 (11-bit)', en: 'Standard (11-bit)' },
    'can.dyn.extFrame':   { zh: '扩展帧 (29-bit)', en: 'Extended (29-bit)' },
    'can.dyn.bytes':      { zh: ' 字节', en: ' bytes' },
    'can.dyn.pdu1':       { zh: 'PDU1 (特定目标)', en: 'PDU1 (Specific Destination)' },
    'can.dyn.pdu2':       { zh: 'PDU2 (广播)', en: 'PDU2 (Broadcast)' },
    'can.dyn.dbcMatched': { zh: '✅ 已匹配 DBC 消息', en: '✅ Matched DBC message' },
    'can.dyn.sigCount':   { zh: '个信号', en: 'signals' },
    'can.dyn.waitParse':  { zh: '等待解析...', en: 'Waiting to parse...' },
    'can.dyn.invalidPhys':{ zh: '❌ 无效物理值', en: '❌ Invalid physical value' },
    'can.dyn.outOfRange': { zh: '⚠️ 超出范围', en: '⚠️ Out of range' },
    'can.dyn.range':      { zh: '范围', en: 'Range' },
    'can.dyn.startBitDyn':{ zh: '起始位', en: 'Start bit' },
    'can.dyn.lengthDyn':  { zh: '长度', en: 'Length' },
    'can.dyn.byteOrderDyn':{ zh: '字节序', en: 'Byte order' },
    'can.dyn.dbcLoaded':  { zh: '✅ 成功加载 DBC，共', en: '✅ DBC loaded,' },
    'can.dyn.messages':   { zh: '个消息', en: 'messages' },
    'can.dyn.parseFail':  { zh: '❌ 解析 DBC 失败: ', en: '❌ Failed to parse DBC: ' },
    'can.dyn.dbcCleared': { zh: 'DBC 已清除', en: 'DBC cleared' },
    'can.dyn.unknownAlgo':{ zh: '未知算法', en: 'Unknown algorithm' },
    'can.dyn.noData':     { zh: '无数据', en: 'No data' },
    'can.dyn.decimal':    { zh: '十进制', en: 'Decimal' },
    'can.dyn.algoLabel':  { zh: '算法', en: 'Algorithm' },
    'can.dyn.send':       { zh: '➡️ 发送', en: '➡️ Send' },
    'can.dyn.recv':       { zh: '⬅️ 接收', en: '⬅️ Receive' },
    'can.dyn.logCleared': { zh: '[系统] 日志已清空', en: '[System] Log cleared' },
    'can.dyn.alertSigName': { zh: '请输入信号名称', en: 'Please enter a signal name' }
};

(function() {
    // ============================================================
    //  DOM 引用
    // ============================================================
    const canId = document.getElementById('canId');
    const canType = document.getElementById('canType');
    const canDlc = document.getElementById('canDlc');
    const canData = document.getElementById('canData');
    const parseBtn = document.getElementById('parseBtn');
    const clearBtn = document.getElementById('clearBtn');
    const exampleBtn = document.getElementById('exampleBtn');

    const parsedIdHex = document.getElementById('parsedIdHex');
    const parsedIdDec = document.getElementById('parsedIdDec');
    const parsedType = document.getElementById('parsedType');
    const parsedDlc = document.getElementById('parsedDlc');
    const parsedData = document.getElementById('parsedData');
    const parsedLen = document.getElementById('parsedLen');
    const fullFrameDisplay = document.getElementById('fullFrameDisplay');

    const j1939Priority = document.getElementById('j1939Priority');
    const j1939Pf = document.getElementById('j1939Pf');
    const j1939Ps = document.getElementById('j1939Ps');
    const j1939Sa = document.getElementById('j1939Sa');
    const j1939Pgn = document.getElementById('j1939Pgn');
    const j1939PgnType = document.getElementById('j1939PgnType');
    const bitView = document.getElementById('bitView');
    const bitViewLegend = document.getElementById('bitViewLegend');

    const dbcFileInput = document.getElementById('dbcFileInput');
    const dbcFileInfo = document.getElementById('dbcFileInfo');
    const clearDbcBtn = document.getElementById('clearDbcBtn');
    const dbcStatus = document.getElementById('dbcStatus');

    const sigName = document.getElementById('sigName');
    const sigStart = document.getElementById('sigStart');
    const sigLen = document.getElementById('sigLen');
    const sigEndian = document.getElementById('sigEndian');
    const sigType = document.getElementById('sigType');
    const sigScale = document.getElementById('sigScale');
    const sigOffset = document.getElementById('sigOffset');
    const sigUnit = document.getElementById('sigUnit');
    const addSigBtn = document.getElementById('addSigBtn');
    const decodeSigBtn = document.getElementById('decodeSigBtn');
    const clearSigBtn = document.getElementById('clearSigBtn');
    const sigTableBody = document.getElementById('sigTableBody');

    const invSigName = document.getElementById('invSigName');
    const invPhysVal = document.getElementById('invPhysVal');
    const invStart = document.getElementById('invStart');
    const invLen = document.getElementById('invLen');
    const invEndian = document.getElementById('invEndian');
    const invType = document.getElementById('invType');
    const invScale = document.getElementById('invScale');
    const invOffset = document.getElementById('invOffset');
    const invCalcBtn = document.getElementById('invCalcBtn');
    const invResult = document.getElementById('invResult');
    const invResultSub = document.getElementById('invResultSub');

    const crcAlgo = document.getElementById('crcAlgo');
    const crcCalcBtn = document.getElementById('crcCalcBtn');
    const crcResult = document.getElementById('crcResult');
    const crcResultSub = document.getElementById('crcResultSub');

    const sendBtn = document.getElementById('sendBtn');
    const clearLogBtn = document.getElementById('clearLogBtn');
    const logArea = document.getElementById('logArea');

    const pgnPresetContainer = document.getElementById('pgnPresetContainer');

    // ============================================================
    //  状态
    // ============================================================
    let currentFrame = {
        id: 0,
        type: 'extended',
        dlc: 8,
        data: []
    };
    let signalDefs = [];
    let dbcMessages = {};

    // DBC 加载状态（用于语言切换时重新渲染状态文本）
    let dbcFileName = null;     // 已加载文件名（null = 未加载）
    let dbcMsgCount = 0;        // 已加载消息数
    let dbcError = null;        // 解析错误信息（null = 无错误）
    let dbcCleared = false;     // 是否已清除

    // 日志状态（用于语言切换时更新就绪/已清空提示）
    let logState = 'ready';     // 'ready' | 'cleared' | 'content'

    // ============================================================
    //  CRC 核心
    // ============================================================
    const CRC_PRESETS = {
        'crc8': { width: 8, poly: 0x07, init: 0x00, xor: 0x00, refIn: true, refOut: true },
        'crc8_dallas': { width: 8, poly: 0x31, init: 0x00, xor: 0x00, refIn: true, refOut: true },
        'crc16_modbus': { width: 16, poly: 0x8005, init: 0xFFFF, xor: 0x0000, refIn: true, refOut: true },
        'crc16_ccitt': { width: 16, poly: 0x1021, init: 0x0000, xor: 0x0000, refIn: false, refOut: false },
        'crc32': { width: 32, poly: 0x04C11DB7, init: 0xFFFFFFFF, xor: 0xFFFFFFFF, refIn: true, refOut: true },
        'crc64_ecma': { width: 64, poly: 0x42F0E1EBA9EA3693, init: 0x0000000000000000, xor: 0x0000000000000000,
            refIn: false, refOut: false }
    };

    function crcCompute(dataBytes, width, poly, init, xorOut, refIn, refOut) {
        if (!dataBytes || dataBytes.length === 0) return { crc: 0, hex: '0x00' };

        const is64 = width === 64;
        const is32 = width === 32;
        const is16 = width === 16;
        const is8 = width === 8;

        let crc = init;
        const mask = is64 ? BigInt(0xFFFFFFFFFFFFFFFF) :
            is32 ? 0xFFFFFFFF :
            is16 ? 0xFFFF :
            0xFF;
        const polyBig = is64 ? BigInt(poly) : poly;
        const initBig = is64 ? BigInt(init) : init;
        const xorBig = is64 ? BigInt(xorOut) : xorOut;
        const widthBig = is64 ? 64 : width;

        const refInBool = refIn === true || refIn === 'true';
        const refOutBool = refOut === true || refOut === 'true';

        let crcBig = is64 ? BigInt(crc) : BigInt(crc);
        const polyBigInt = is64 ? BigInt(poly) : BigInt(poly);
        const maskBig = is64 ? (1n << 64n) - 1n :
            is32 ? BigInt(0xFFFFFFFF) :
            is16 ? BigInt(0xFFFF) :
            BigInt(0xFF);
        const widthBigInt = BigInt(widthBig);

        for (let byte of dataBytes) {
            let b = BigInt(byte & 0xFF);
            if (refInBool) {
                let rev = 0n;
                for (let i = 0; i < 8; i++) {
                    rev = (rev << 1n) | (b & 1n);
                    b >>= 1n;
                }
                b = rev;
            }
            if (is64) {
                crcBig ^= (b << 56n);
            } else if (is32) {
                crcBig ^= (b << 24n);
            } else if (is16) {
                crcBig ^= (b << 8n);
            } else {
                crcBig ^= b;
            }
            for (let i = 0; i < 8; i++) {
                if ((crcBig & (1n << BigInt(widthBig - 1))) !== 0n) {
                    crcBig = ((crcBig << 1n) ^ polyBigInt) & maskBig;
                } else {
                    crcBig = (crcBig << 1n) & maskBig;
                }
            }
        }

        let finalCrc = crcBig;
        if (refOutBool) {
            let rev = 0n;
            let temp = finalCrc;
            for (let i = 0n; i < widthBigInt; i++) {
                rev = (rev << 1n) | (temp & 1n);
                temp >>= 1n;
            }
            finalCrc = rev;
        }
        finalCrc ^= (is64 ? xorBig : BigInt(xorOut));
        finalCrc &= maskBig;

        let hexStr;
        let numVal;
        if (is64) {
            hexStr = '0x' + finalCrc.toString(16).padStart(16, '0').toUpperCase();
            numVal = finalCrc.toString(16);
        } else if (is32) {
            hexStr = '0x' + finalCrc.toString(16).padStart(8, '0').toUpperCase();
            numVal = Number(finalCrc);
        } else if (is16) {
            hexStr = '0x' + finalCrc.toString(16).padStart(4, '0').toUpperCase();
            numVal = Number(finalCrc);
        } else {
            hexStr = '0x' + finalCrc.toString(16).padStart(2, '0').toUpperCase();
            numVal = Number(finalCrc);
        }
        return { crc: numVal, hex: hexStr, big: finalCrc };
    }

    // ============================================================
    //  工具函数
    // ============================================================
    function parseHexString(str) {
        let cleaned = str.replace(/,/g, ' ').replace(/0x/g, '').trim();
        if (cleaned === '') return [];
        cleaned = cleaned.replace(/\s+/g, ' ');
        const parts = cleaned.split(' ');
        const bytes = [];
        for (let p of parts) {
            if (p === '') continue;
            const val = parseInt(p, 16);
            if (!isNaN(val) && val >= 0 && val <= 255) bytes.push(val);
        }
        if (bytes.length === 0 && cleaned.length > 0) {
            const hex = cleaned.replace(/\s/g, '');
            for (let i = 0; i < hex.length; i += 2) {
                const byte = parseInt(hex.substr(i, 2), 16);
                if (!isNaN(byte)) bytes.push(byte);
            }
        }
        return bytes;
    }

    function formatHex(bytes) {
        return bytes.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    }

    function getCanIdType(id, type) {
        const idNum = parseInt(id, 16);
        if (isNaN(idNum)) return 0;
        if (type === 'extended') {
            return idNum & 0x1FFFFFFF;
        } else {
            return idNum & 0x7FF;
        }
    }

    // ============================================================
    //  J1939 解析
    // ============================================================
    function parseJ1939(idNum) {
        if (idNum > 0x1FFFFFFF) return null;
        const priority = (idNum >> 26) & 0x7;
        const pduFormat = (idNum >> 16) & 0xFF;
        const pduSpecific = (idNum >> 8) & 0xFF;
        const sourceAddr = idNum & 0xFF;
        let pgn = 0;
        let pgnType = '';
        if (pduFormat < 240) {
            pgn = (pduFormat << 8) | 0;
            pgnType = 'pdu1';   // PDU1 (特定目标) — 显示时通过 i18n 翻译
        } else {
            pgn = (pduFormat << 8) | pduSpecific;
            pgnType = 'pdu2';   // PDU2 (广播)
        }
        return { priority, pduFormat, pduSpecific, sourceAddr, pgn, pgnType };
    }

    // ============================================================
    //  位视图 (全宽优化)
    // ============================================================
    function renderBitView(idNum, type) {
        bitView.innerHTML = '';
        if (type === 'standard') {
            const bits = idNum.toString(2).padStart(11, '0');
            const container = document.createElement('div');
            container.className = 'bit-view';
            const groupDiv = document.createElement('div');
            groupDiv.className = 'group';
            const bitsDiv = document.createElement('div');
            bitsDiv.className = 'bits';
            for (let i = 0; i < bits.length; i++) {
                const span = document.createElement('span');
                span.className = 'bit';
                span.style.backgroundColor = '#4ecdc4';
                span.textContent = bits[i];
                bitsDiv.appendChild(span);
            }
            groupDiv.appendChild(bitsDiv);
            container.appendChild(groupDiv);
            bitView.appendChild(container);
            // 更新图例
            bitViewLegend.innerHTML = `
                <span class="legend-item"><span class="legend-swatch" style="background:#4ecdc4;"></span> ${window.I18N.t('can.legend.stdId')}</span>
                <span class="legend-item" style="color:var(--text-light);">${window.I18N.t('can.legend.bit')}</span>
            `;
            return;
        }
        // 29-bit
        const bits = idNum.toString(2).padStart(29, '0');
        const groups = [
            { label: 'PRI', start: 0, end: 2, color: '#ff6b6b' },
            { label: 'PF', start: 3, end: 10, color: '#4ecdc4' },
            { label: 'PS', start: 11, end: 18, color: '#ffe66d' },
            { label: 'SA', start: 19, end: 28, color: '#a29bfe' }
        ];
        const container = document.createElement('div');
        container.className = 'bit-view';
        groups.forEach(g => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'group';
            const labelSpan = document.createElement('span');
            labelSpan.className = 'label';
            labelSpan.textContent = g.label;
            const bitsDiv = document.createElement('div');
            bitsDiv.className = 'bits';
            for (let i = g.start; i <= g.end; i++) {
                const bit = bits[i];
                const span = document.createElement('span');
                span.className = 'bit';
                span.style.backgroundColor = g.color;
                span.textContent = bit;
                bitsDiv.appendChild(span);
            }
            groupDiv.appendChild(labelSpan);
            groupDiv.appendChild(bitsDiv);
            container.appendChild(groupDiv);
        });
        bitView.appendChild(container);
        // 更新图例 (保留)
        bitViewLegend.innerHTML = `
            <span class="legend-item"><span class="legend-swatch" style="background:#ff6b6b;"></span> ${window.I18N.t('can.legend.pri')}</span>
            <span class="legend-item"><span class="legend-swatch" style="background:#4ecdc4;"></span> ${window.I18N.t('can.legend.pf')}</span>
            <span class="legend-item"><span class="legend-swatch" style="background:#ffe66d;"></span> ${window.I18N.t('can.legend.ps')}</span>
            <span class="legend-item"><span class="legend-swatch" style="background:#a29bfe;"></span> ${window.I18N.t('can.legend.sa')}</span>
            <span class="legend-item" style="color:var(--text-light);">${window.I18N.t('can.legend.bit')}</span>
        `;
    }

    // ============================================================
    //  信号提取核心
    // ============================================================
    function extractSignal(dataBytes, startBit, length, endian, type) {
        if (dataBytes.length === 0) return { raw: 0, value: 0 };
        let buffer = new ArrayBuffer(8);
        let view = new DataView(buffer);
        for (let i = 0; i < Math.min(dataBytes.length, 8); i++) {
            view.setUint8(7 - i, dataBytes[i]);
        }
        const totalBits = 64;
        let raw = 0n;
        for (let i = 0; i < length; i++) {
            const bitPos = totalBits - 1 - (startBit + i);
            const byteIdx = Math.floor(bitPos / 8);
            const bitIdx = 7 - (bitPos % 8);
            const byteVal = BigInt(view.getUint8(byteIdx));
            const bitVal = (byteVal >> BigInt(bitIdx)) & 1n;
            if (endian === 'big') {
                raw = (raw << 1n) | bitVal;
            } else {
                raw = raw | (bitVal << BigInt(i));
            }
        }
        let numVal = Number(raw);
        let physVal = numVal;
        if (type === 'signed') {
            const signBit = 1n << BigInt(length - 1);
            if ((raw & signBit) !== 0n) {
                numVal = Number(raw - (1n << BigInt(length)));
            }
        } else if (type === 'float') {
            if (length === 32) {
                const floatBytes = new ArrayBuffer(4);
                const fview = new DataView(floatBytes);
                for (let i = 0; i < 4; i++) {
                    const shift = 24 - i * 8;
                    fview.setUint8(i, Number((raw >> BigInt(shift)) & 0xFFn));
                }
                physVal = fview.getFloat32(0, false);
                numVal = physVal;
            } else {
                physVal = NaN;
            }
        }
        return { raw: numVal, value: physVal };
    }

    // ============================================================
    //  DBC 状态文本渲染（语言切换时统一刷新）
    // ============================================================
    function renderDbcStatus() {
        if (dbcError) {
            dbcStatus.textContent = window.I18N.t('can.dyn.parseFail') + dbcError;
            dbcFileInfo.textContent = dbcFileName
                ? (dbcFileName + ' (' + dbcMsgCount + ' ' + window.I18N.t('can.dyn.messages') + ')')
                : window.I18N.t('can.dbc.notLoaded');
            return;
        }
        if (dbcFileName) {
            dbcFileInfo.textContent = dbcFileName + ' (' + dbcMsgCount + ' ' + window.I18N.t('can.dyn.messages') + ')';
            if (dbcMessages[currentFrame.id]) {
                const msg = dbcMessages[currentFrame.id];
                dbcStatus.textContent = window.I18N.t('can.dyn.dbcMatched') + ': ' + msg.name + ' (' + msg.signals.length + ' ' + window.I18N.t('can.dyn.sigCount') + ')';
            } else {
                dbcStatus.textContent = window.I18N.t('can.dyn.dbcLoaded') + ' ' + dbcMsgCount + ' ' + window.I18N.t('can.dyn.messages');
            }
            return;
        }
        dbcFileInfo.textContent = window.I18N.t('can.dbc.notLoaded');
        dbcStatus.textContent = dbcCleared ? window.I18N.t('can.dyn.dbcCleared') : window.I18N.t('can.dbc.waiting');
    }

    // ============================================================
    //  解析帧 (主函数)
    // ============================================================
    function parseFrame() {
        const idStr = canId.value.trim();
        const type = canType.value;
        const dlc = parseInt(canDlc.value) || 0;
        const dataStr = canData.value;
        let dataBytes = parseHexString(dataStr);

        if (dataBytes.length > dlc) dataBytes = dataBytes.slice(0, dlc);
        while (dataBytes.length < dlc) dataBytes.push(0);

        const idNum = getCanIdType(idStr, type);
        if (idNum === 0 && idStr !== '0') {
            parsedIdHex.textContent = window.I18N.t('can.dyn.invalidId');
            parsedIdDec.textContent = '—';
            return;
        }

        currentFrame.id = idNum;
        currentFrame.type = type;
        currentFrame.dlc = dlc;
        currentFrame.data = dataBytes;

        const idHex = '0x' + idNum.toString(16).toUpperCase();
        parsedIdHex.textContent = idHex;
        parsedIdDec.textContent = idNum.toString(10);
        parsedType.textContent = type === 'standard' ? window.I18N.t('can.dyn.stdFrame') : window.I18N.t('can.dyn.extFrame');
        parsedDlc.textContent = dlc;
        parsedData.textContent = formatHex(dataBytes);
        parsedLen.textContent = dataBytes.length + window.I18N.t('can.dyn.bytes');

        const typeLabel = type === 'standard' ? 'STD' : 'EXT';
        fullFrameDisplay.textContent = `ID=${idHex} ${typeLabel} DLC=${dlc} DATA=${formatHex(dataBytes)}`;

        if (type === 'extended') {
            const j = parseJ1939(idNum);
            if (j) {
                j1939Priority.textContent = j.priority;
                j1939Pf.textContent = '0x' + j.pduFormat.toString(16).toUpperCase();
                j1939Ps.textContent = '0x' + j.pduSpecific.toString(16).toUpperCase();
                j1939Sa.textContent = '0x' + j.sourceAddr.toString(16).toUpperCase();
                j1939Pgn.textContent = '0x' + j.pgn.toString(16).toUpperCase();
                j1939PgnType.textContent = window.I18N.t('can.dyn.' + j.pgnType);
            } else {
                clearJ1939();
            }
        } else {
            clearJ1939();
        }

        renderBitView(idNum, type);

        if (dbcFileName) {
            if (dbcMessages[idNum]) {
                const msg = dbcMessages[idNum];
                signalDefs = msg.signals.map(s => ({
                    name: s.name,
                    startBit: s.startBit,
                    length: s.length,
                    endian: s.endian,
                    signed: s.signed,
                    scale: s.scale,
                    offset: s.offset,
                    unit: s.unit,
                    type: s.signed ? 'signed' : 'unsigned'
                }));
                renderSignalTable();
            }
            renderDbcStatus();
        }

        decodeAllSignals();
        if (dataBytes.length > 0) computeCrc();
    }

    function clearJ1939() {
        j1939Priority.textContent = '—';
        j1939Pf.textContent = '—';
        j1939Ps.textContent = '—';
        j1939Sa.textContent = '—';
        j1939Pgn.textContent = '—';
        j1939PgnType.textContent = '—';
    }

    // ============================================================
    //  信号解码
    // ============================================================
    function decodeAllSignals() {
        const dataBytes = currentFrame.data;
        const rows = sigTableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const def = signalDefs[index];
            if (!def) return;
            const result = extractSignal(dataBytes, def.startBit, def.length, def.endian, def.type || (
                def.signed ? 'signed' : 'unsigned'));
            const rawVal = result.raw;
            let physVal = result.value;
            if (def.type !== 'float') {
                physVal = rawVal * (def.scale || 1) + (def.offset || 0);
            } else {
                physVal = result.value;
            }
            const rawTd = row.querySelector('td:nth-child(9)');
            const physTd = row.querySelector('td:nth-child(10)');
            if (rawTd) rawTd.textContent = rawVal.toString(10);
            if (physTd) {
                const unit = def.unit || '';
                physTd.textContent = (typeof physVal === 'number' && !isNaN(physVal)) ? physVal.toFixed(4) + (
                    unit ? ' ' + unit : '') : 'NaN';
            }
        });
    }

    function addSignal() {
        const name = sigName.value.trim();
        if (!name) { alert(window.I18N.t('can.dyn.alertSigName')); return; }
        const startBit = parseInt(sigStart.value) || 0;
        const length = parseInt(sigLen.value) || 1;
        const endian = sigEndian.value;
        const type = sigType.value;
        const scale = parseFloat(sigScale.value) || 1.0;
        const offset = parseFloat(sigOffset.value) || 0;
        const unit = sigUnit.value.trim();

        signalDefs.push({
            name,
            startBit,
            length,
            endian,
            type,
            scale,
            offset,
            unit,
            signed: type === 'signed'
        });
        renderSignalTable();
        decodeAllSignals();
    }

    function removeSignal(index) {
        signalDefs.splice(index, 1);
        renderSignalTable();
        decodeAllSignals();
    }

    function clearSignals() {
        signalDefs = [];
        renderSignalTable();
    }

    function renderSignalTable() {
        sigTableBody.innerHTML = '';
        signalDefs.forEach((def, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${def.name}</td>
                <td>${def.startBit}</td>
                <td>${def.length}</td>
                <td>${def.endian === 'big' ? 'Motorola' : 'Intel'}</td>
                <td>${def.type}</td>
                <td>${def.scale}</td>
                <td>${def.offset}</td>
                <td>${def.unit || '-'}</td>
                <td>—</td>
                <td>—</td>
                <td><button class="btn btn-outline btn-sm" data-idx="${idx}">✕</button></td>
            `;
            const delBtn = tr.querySelector('button');
            delBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const idx = parseInt(this.dataset.idx);
                removeSignal(idx);
            });
            sigTableBody.appendChild(tr);
        });
    }

    // ============================================================
    //  反向计算
    // ============================================================
    function inverseCalc() {
        const phys = parseFloat(invPhysVal.value);
        if (isNaN(phys)) { invResult.textContent = window.I18N.t('can.dyn.invalidPhys'); return; }
        const start = parseInt(invStart.value) || 0;
        const len = parseInt(invLen.value) || 1;
        const endian = invEndian.value;
        const type = invType.value;
        const scale = parseFloat(invScale.value) || 1.0;
        const offset = parseFloat(invOffset.value) || 0;

        let raw = Math.round((phys - offset) / scale);
        const maxVal = (1 << len) - 1;
        if (type === 'signed') {
            const maxSigned = (1 << (len - 1)) - 1;
            const minSigned = -(1 << (len - 1));
            if (raw < minSigned || raw > maxSigned) {
                invResult.textContent = window.I18N.t('can.dyn.outOfRange');
                invResultSub.textContent = window.I18N.t('can.dyn.range') + ': ' + minSigned + ' ~ ' + maxSigned;
                return;
            }
        } else {
            if (raw < 0 || raw > maxVal) {
                invResult.textContent = window.I18N.t('can.dyn.outOfRange');
                invResultSub.textContent = window.I18N.t('can.dyn.range') + ': 0 ~ ' + maxVal;
                return;
            }
        }
        const hexStr = '0x' + raw.toString(16).toUpperCase();
        invResult.textContent = raw + '  (HEX: ' + hexStr + ')';
        invResultSub.textContent = window.I18N.t('can.dyn.startBitDyn') + ' ' + start + ', ' +
            window.I18N.t('can.dyn.lengthDyn') + ' ' + len + ', ' +
            window.I18N.t('can.dyn.byteOrderDyn') + ' ' + (endian === 'big' ? 'Motorola' : 'Intel');
    }

    // ============================================================
    //  DBC 解析 (简化)
    // ============================================================
    function parseDbc(text) {
        const lines = text.split(/\r?\n/);
        const messages = {};
        let currentMsg = null;
        let currentSignals = [];

        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('BO_ ')) {
                const parts = line.split(/\s+/);
                const id = parseInt(parts[1]);
                const name = parts[2];
                currentMsg = { id, name, signals: [] };
                messages[id] = currentMsg;
                currentSignals = [];
            } else if (line.startsWith('SG_ ') && currentMsg) {
                const sgParts = line.split(/\s+/);
                const name = sgParts[1];
                const rest = sgParts.slice(2).join(' ');
                const match = rest.match(/(\d+)\|(\d+)@([0-9a-zA-Z]+)/);
                if (!match) continue;
                const startBit = parseInt(match[1]);
                const length = parseInt(match[2]);
                const endian = match[3].toLowerCase() === '0' ? 'big' : 'little';
                const signed = rest.includes('+') ? false : true;
                const scaleMatch = rest.match(/\(([\d.]+),([\d.]+)\)/);
                let scale = 1,
                    offset = 0;
                if (scaleMatch) {
                    scale = parseFloat(scaleMatch[1]);
                    offset = parseFloat(scaleMatch[2]);
                }
                const unitMatch = rest.match(/"([^"]*)"/);
                const unit = unitMatch ? unitMatch[1] : '';
                currentMsg.signals.push({
                    name,
                    startBit,
                    length,
                    endian,
                    signed,
                    scale,
                    offset,
                    unit
                });
            }
        }
        return messages;
    }

    function loadDbc(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const text = e.target.result;
                const parsed = parseDbc(text);
                dbcMessages = parsed;
                const count = Object.keys(parsed).length;
                dbcFileName = file.name;
                dbcMsgCount = count;
                dbcError = null;
                dbcCleared = false;
                parseFrame();
            } catch (err) {
                dbcError = err.message;
                renderDbcStatus();
            }
        };
        reader.readAsText(file);
    }

    function clearDbc() {
        dbcMessages = {};
        dbcFileName = null;
        dbcMsgCount = 0;
        dbcError = null;
        dbcCleared = true;
        dbcFileInput.value = '';
        parseFrame();
        renderDbcStatus();
    }

    // ============================================================
    //  CRC 计算
    // ============================================================
    function computeCrc() {
        const algo = crcAlgo.value;
        const preset = CRC_PRESETS[algo];
        if (!preset) {
            crcResult.textContent = '❌';
            crcResultSub.textContent = window.I18N.t('can.dyn.unknownAlgo');
            return;
        }
        const dataBytes = currentFrame.data;
        if (dataBytes.length === 0) {
            crcResult.textContent = '—';
            crcResultSub.textContent = window.I18N.t('can.dyn.noData');
            return;
        }
        const result = crcCompute(dataBytes, preset.width, preset.poly, preset.init, preset.xor, preset.refIn,
            preset.refOut);
        crcResult.textContent = result.hex;
        crcResultSub.textContent = window.I18N.t('can.dyn.decimal') + ': ' + result.crc + ' · ' +
            window.I18N.t('can.dyn.algoLabel') + ': ' + algo;
    }

    // ============================================================
    //  模拟收发
    // ============================================================
    function addLog(message, isSend = true) {
        const time = new Date().toLocaleTimeString();
        const dir = isSend ? window.I18N.t('can.dyn.send') : window.I18N.t('can.dyn.recv');
        const entry = `[${time}] ${dir}: ${message}`;
        logArea.textContent = entry + '\n' + logArea.textContent;
        logState = 'content';
        if (logArea.textContent.split('\n').length > 50) {
            const lines = logArea.textContent.split('\n');
            logArea.textContent = lines.slice(0, 50).join('\n');
        }
    }

    function sendFrame() {
        const idHex = '0x' + currentFrame.id.toString(16).toUpperCase();
        const typeLabel = currentFrame.type === 'standard' ? 'STD' : 'EXT';
        const dataHex = formatHex(currentFrame.data);
        const msg = `ID=${idHex} ${typeLabel} DLC=${currentFrame.dlc} DATA=${dataHex}`;
        addLog(msg, true);
    }

    function clearLog() {
        logArea.textContent = window.I18N.t('can.dyn.logCleared');
        logState = 'cleared';
    }

    // ============================================================
    //  示例
    // ============================================================
    function loadExample() {
        canId.value = '18FEF100';
        canType.value = 'extended';
        canDlc.value = 8;
        canData.value = '00 00 00 00 00 00 00 00';
        parseFrame();
        signalDefs.push({
            name: 'EngineSpeed',
            startBit: 8,
            length: 16,
            endian: 'little',
            type: 'unsigned',
            scale: 0.125,
            offset: 0,
            unit: 'rpm',
            signed: false
        });
        renderSignalTable();
        decodeAllSignals();
        canData.value = '00 00 00 00 00 00 00 00';
        parseFrame();
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    parseBtn.addEventListener('click', parseFrame);
    clearBtn.addEventListener('click', function() {
        canId.value = '';
        canDlc.value = 0;
        canData.value = '';
        parsedIdHex.textContent = '—';
        parsedIdDec.textContent = '—';
        parsedType.textContent = '—';
        parsedDlc.textContent = '—';
        parsedData.textContent = '—';
        parsedLen.textContent = '—';
        fullFrameDisplay.textContent = '—';
        currentFrame.data = [];
        clearJ1939();
        bitView.innerHTML = '';
        bitViewLegend.innerHTML = `
            <span class="legend-item" style="color:var(--text-light);">${window.I18N.t('can.dyn.waitParse')}</span>
        `;
        crcResult.textContent = '—';
        crcResultSub.textContent = window.I18N.t('can.sub.waitCalc');
        decodeAllSignals();
    });
    exampleBtn.addEventListener('click', loadExample);

    canId.addEventListener('change', parseFrame);
    canType.addEventListener('change', parseFrame);
    canDlc.addEventListener('change', parseFrame);
    canData.addEventListener('input', parseFrame);

    addSigBtn.addEventListener('click', addSignal);
    decodeSigBtn.addEventListener('click', decodeAllSignals);
    clearSigBtn.addEventListener('click', clearSignals);

    invCalcBtn.addEventListener('click', inverseCalc);

    crcCalcBtn.addEventListener('click', computeCrc);
    crcAlgo.addEventListener('change', computeCrc);

    sendBtn.addEventListener('click', sendFrame);
    clearLogBtn.addEventListener('click', clearLog);

    dbcFileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            loadDbc(this.files[0]);
        }
    });
    clearDbcBtn.addEventListener('click', clearDbc);

    pgnPresetContainer.addEventListener('click', function(e) {
        const target = e.target.closest('button');
        if (target && target.dataset.pgn) {
            const pgn = parseInt(target.dataset.pgn);
            const id = (3 << 26) | (pgn << 8) | 0x00;
            canId.value = '0x' + id.toString(16).toUpperCase();
            canType.value = 'extended';
            canDlc.value = 8;
            canData.value = '00 00 00 00 00 00 00 00';
            parseFrame();
        }
    });

    // ============================================================
    //  语言切换：更新动态文本并重新渲染
    // ============================================================
    document.addEventListener('languagechange', function () {
        document.title = window.I18N.t('can.doc.title');
        parseFrame();        // 刷新解析结果、J1939、位视图图例、DBC 状态、信号表
        computeCrc();        // 刷新 CRC 结果副文本
        inverseCalc();       // 刷新反向计算副文本
        renderDbcStatus();   // 刷新 DBC 状态/文件信息（覆盖未加载/已清除情况）
        // 日志区：仅在无用户内容时更新就绪/已清空提示
        if (logState === 'ready') {
            logArea.textContent = window.I18N.t('can.log.ready');
        } else if (logState === 'cleared') {
            logArea.textContent = window.I18N.t('can.dyn.logCleared');
        }
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.title = window.I18N.t('can.doc.title');
    logArea.textContent = window.I18N.t('can.log.ready');
    loadExample();
})();
