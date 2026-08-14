// ============================================================
//  RadixConverter.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
//  此处仅处理进制转换 / 位操作 / 浮点数业务逻辑
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + JS 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    'radix.doc.title':       { zh: '进制转换器 · 位操作工具', en: 'Radix Converter · Bit Ops Tool' },
    'radix.page.title':      { zh: '🔁 进制转换器 · 位操作工具', en: '🔁 Radix Converter · Bit Ops Tool' },
    'radix.subhead':         { zh: '🔹 进制实时互转 · 支持 8~64 位数据位宽 · 大端 / 小端字节序切换 · 浮点数转换 · 位设置 · 位域提取 · 循环移位 · 位掩码生成等操作', en: '🔹 Real-time radix conversion · 8~64-bit width · big/little endian · floating-point · bit set/clear · bitfield extract · rotate · mask generation' },
    'radix.tab.convert':     { zh: '进制转换', en: 'Radix' },
    'radix.tab.float':       { zh: '浮点数', en: 'Float' },
    'radix.tab.bitops':      { zh: '位操作', en: 'Bit Ops' },
    'radix.width.title':     { zh: '数据位宽 & 字节序', en: 'Data width & Endianness' },
    'radix.width.hint':      { zh: '多字节时影响 HEX 显示字节顺序', en: 'Affects HEX byte order for multi-byte' },
    'radix.label.width':     { zh: '位宽', en: 'Width' },
    'radix.label.byteOrder': { zh: '字节序', en: 'Endianness' },
    'radix.label.format':    { zh: '格式', en: 'Format' },
    'radix.be':              { zh: '大端 BE', en: 'Big-endian BE' },
    'radix.le':              { zh: '小端 LE', en: 'Little-endian LE' },
    'radix.be2':             { zh: '大端 (BE)', en: 'Big-endian (BE)' },
    'radix.le2':             { zh: '小端 (LE)', en: 'Little-endian (LE)' },
    'radix.hex.title':       { zh: '十六进制', en: 'Hexadecimal' },
    'radix.hex.ph':          { zh: '如 FF01AB 或 FF 01 AB', en: 'e.g. FF01AB or FF 01 AB' },
    'radix.hex.info':        { zh: '支持空格分隔字节', en: 'Space-separated bytes supported' },
    'radix.dec.title':       { zh: '十进制', en: 'Decimal' },
    'radix.dec.ph':          { zh: '如 4294967295', en: 'e.g. 4294967295' },
    'radix.bin.title':       { zh: '二进制', en: 'Binary' },
    'radix.bin.ph':          { zh: '如 11111111', en: 'e.g. 11111111' },
    'radix.bin.info':        { zh: '可含空格分组', en: 'Spaces for grouping allowed' },
    'radix.oct.title':       { zh: '八进制', en: 'Octal' },
    'radix.oct.ph':          { zh: '如 377', en: 'e.g. 377' },
    'radix.bitVisual.title': { zh: '位可视化', en: 'Bit visualization' },
    'radix.bitVisual.hint':  { zh: '点击位可翻转，高亮字节跟随字节序', en: 'Click a bit to toggle; highlighted byte follows endianness' },
    'radix.btn.copy':        { zh: '复制', en: 'Copy' },
    'radix.btn.clear':       { zh: '🧹 清空', en: '🧹 Clear' },
    'radix.btn.copyAll':     { zh: '📋 复制全部', en: '📋 Copy all' },
    'radix.ascii.title':     { zh: 'ASCII 文本转换', en: 'ASCII Text Conversion' },
    'radix.ascii.small':     { zh: '（双向互转 · 文本 ⟷ HEX/DEC/BIN）', en: '(Bidirectional · Text ⟷ HEX/DEC/BIN)' },
    'radix.ascii.text':      { zh: '文本', en: 'Text' },
    'radix.ascii.textPh':    { zh: '输入文本，如 Hello', en: 'Enter text, e.g. Hello' },
    'radix.ascii.textHint':  { zh: '输入文本 → 自动更新进制', en: 'Enter text → auto-update radix' },
    'radix.ascii.hexPh':     { zh: '如 48 65 6C 6C 6F 或 48656C6C6F', en: 'e.g. 48 65 6C 6C 6F or 48656C6C6F' },
    'radix.ascii.spaceOpt':  { zh: '空格可选', en: 'Spaces optional' },
    'radix.ascii.decPh':     { zh: '如 72 101 108 108 111', en: 'e.g. 72 101 108 108 111' },
    'radix.ascii.decHint':   { zh: '空格分隔 0‑255', en: 'Space-separated 0‑255' },
    'radix.ascii.binPh':     { zh: '如 01001000 01100101 01101100 01101100 01101111', en: 'e.g. 01001000 01100101 01101100 01101100 01101111' },
    'radix.ascii.binHint':   { zh: '空格可选，按 8 位分组', en: 'Spaces optional, 8-bit groups' },
    'radix.fp.title':         { zh: '浮点数转换', en: 'Floating-point Conversion' },
    'radix.fp.half':          { zh: '半精度 FP16', en: 'Half FP16' },
    'radix.fp.single':        { zh: '单精度 FP32', en: 'Single FP32' },
    'radix.fp.double':        { zh: '双精度 FP64', en: 'Double FP64' },
    'radix.fp.value':         { zh: '浮点数值', en: 'Float value' },
    'radix.fp.valuePh':       { zh: '如 3.14 或 -0.1 或 1e10', en: 'e.g. 3.14 or -0.1 or 1e10' },
    'radix.fp.hexBytes':      { zh: 'HEX 字节', en: 'HEX bytes' },
    'radix.fp.hexPh':         { zh: '如 40 48 F5 C3 或 4048F5C3', en: 'e.g. 40 48 F5 C3 or 4048F5C3' },
    'radix.fp.hexHintInit':   { zh: 'FP32: 4 字节', en: 'FP32: 4 bytes' },
    'radix.fp.hexToFloat':    { zh: 'HEX → 浮点', en: 'HEX → Float' },
    'radix.fp.bitStruct':     { zh: '位结构分析', en: 'Bit-structure analysis' },
    'radix.fp.bitStructHint': { zh: '点击位格子可翻转对应位', en: 'Click a bit cell to toggle it' },
    'radix.fp.sign':          { zh: '符号位 (Sign)', en: 'Sign bit' },
    'radix.fp.exponent':      { zh: '指数 (Exponent)', en: 'Exponent' },
    'radix.fp.mantissa':      { zh: '尾数 (Mantissa)', en: 'Mantissa' },
    'radix.fp.verify':        { zh: '验证: 从位结构还原', en: 'Verify: restore from bits' },
    'radix.bitops.inputTitle': { zh: '输入值', en: 'Input value' },
    'radix.bitops.inputBadge': { zh: '十六进制或十进制', en: 'Hex or decimal' },
    'radix.bitops.input':     { zh: '输入', en: 'Input' },
    'radix.bitops.inputPh':   { zh: '如 0xFF 或 255', en: 'e.g. 0xFF or 255' },
    'radix.bitops.apply':     { zh: '应用', en: 'Apply' },
    'radix.bitops.visualHint': { zh: '点击位可翻转', en: 'Click a bit to toggle' },
    'radix.bitops.sctTitle':  { zh: '位设置 / 清除 / 翻转', en: 'Set / Clear / Toggle' },
    'radix.bitops.bitIdx':    { zh: '位索引', en: 'Bit index' },
    'radix.bitops.bitIdxHint': { zh: '从 0 (LSB) 开始', en: 'From 0 (LSB)' },
    'radix.bitops.set':       { zh: 'Set (置 1)', en: 'Set (to 1)' },
    'radix.bitops.clear':     { zh: 'Clear (清 0)', en: 'Clear (to 0)' },
    'radix.bitops.toggle':    { zh: 'Toggle (翻转)', en: 'Toggle' },
    'radix.bitops.fieldTitle': { zh: '位域提取', en: 'Bitfield extraction' },
    'radix.bitops.hi':        { zh: '高位', en: 'High' },
    'radix.bitops.lo':        { zh: '低位', en: 'Low' },
    'radix.bitops.fieldHint': { zh: '提取 [hi:lo] 位域', en: 'Extract [hi:lo] bitfield' },
    'radix.bitops.extractField': { zh: '提取位域', en: 'Extract field' },
    'radix.bitops.extractSigned': { zh: '有符号提取', en: 'Signed extract' },
    'radix.bitops.fieldResult': { zh: '提取结果', en: 'Extraction result' },
    'radix.bitops.rotateTitle': { zh: '循环移位 (Rotate)', en: 'Rotate' },
    'radix.bitops.shiftAmt':  { zh: '位移量', en: 'Shift amount' },
    'radix.bitops.shiftAmtPh': { zh: '如 4', en: 'e.g. 4' },
    'radix.bitops.rol':       { zh: '左移 (ROL)', en: 'Rotate left (ROL)' },
    'radix.bitops.ror':       { zh: '右移 (ROR)', en: 'Rotate right (ROR)' },
    'radix.bitops.shl':       { zh: '逻辑左移 (SHL)', en: 'Shift left (SHL)' },
    'radix.bitops.shr':       { zh: '逻辑右移 (SHR)', en: 'Shift right (SHR)' },
    'radix.bitops.sar':       { zh: '算术右移 (SAR)', en: 'Arithmetic right (SAR)' },
    'radix.bitops.maskTitle': { zh: '位掩码生成', en: 'Bitmask generation' },
    'radix.bitops.genMask':   { zh: '生成掩码', en: 'Generate mask' },
    'radix.bitops.and':       { zh: 'AND 运算', en: 'AND' },
    'radix.bitops.or':        { zh: 'OR 运算', en: 'OR' },
    'radix.bitops.xor':       { zh: 'XOR 运算', en: 'XOR' },
    'radix.bitops.not':       { zh: 'NOT (取反)', en: 'NOT (invert)' },
    'radix.bitops.maskResult': { zh: '掩码结果', en: 'Mask result' },
    'radix.footer':           { zh: '🔁 进制实时互转 · 位操作 · 浮点数转换。', en: '🔁 Real-time radix conversion · bit ops · floating-point.' },

    // 动态文本
    'radix.copied':          { zh: '已复制', en: 'Copied' },
    'radix.signed':          { zh: '有符号', en: 'Signed' },
    'radix.ascii.textLabel': { zh: '文本', en: 'Text' },
    'radix.fp.bytes':        { zh: '字节', en: 'bytes' },
    'radix.fp.positive':     { zh: '正数 (+)', en: 'Positive (+)' },
    'radix.fp.negative':     { zh: '负数 (−)', en: 'Negative (−)' },
    'radix.fp.expDenorm':    { zh: '非规格化, 实际指数: {exp}', en: 'Denormalized, actual exponent: {exp}' },
    'radix.fp.expNorm':      { zh: '规格化, 实际指数: {exp}', en: 'Normalized, actual exponent: {exp}' },
    'radix.fp.infinity':     { zh: '无穷大 (Infinity)', en: 'Infinity' },
    'radix.fp.nan':          { zh: 'NaN (非数字)', en: 'NaN (not a number)' },
    'radix.fp.manDenormal':  { zh: '非规格化 (无隐含1)', en: 'Denormalized (no implicit 1)' },
    'radix.fp.manInf':       { zh: '无穷大, 尾数无意义', en: 'Infinity, mantissa meaningless' },
    'radix.fp.manNan':       { zh: 'NaN 载荷', en: 'NaN payload' },
    'radix.fp.manNormal':    { zh: '规格化 (隐含前导1)', en: 'Normalized (implicit leading 1)' },
    'radix.bitfield.sub':        { zh: '提取 [{hi}:{lo}]，共 {n} 位，掩码 0x{hex}', en: 'Extract [{hi}:{lo}], {n} bits, mask 0x{hex}' },
    'radix.bitfield.signedVal':  { zh: '{val} (有符号)', en: '{val} (signed)' },
    'radix.bitfield.signedSub':  { zh: '提取 [{hi}:{lo}]，{n} 位有符号，最高位为符号位', en: 'Extract [{hi}:{lo}], {n}-bit signed, MSB is sign bit' },
    'radix.mask.sub':        { zh: '掩码 [{hi}:{lo}]，{n} 位', en: 'Mask [{hi}:{lo}], {n} bits' },
    'radix.mask.notSub':     { zh: 'NOT 运算结果 (按位取反)', en: 'NOT result (bitwise invert)' },
    'radix.mask.applySub':   { zh: '{op} 掩码 0x{hex} [{hi}:{lo}]', en: '{op} mask 0x{hex} [{hi}:{lo}]' },
    'radix.copy.fail':       { zh: '复制失败，请手动复制', en: 'Copy failed, please copy manually' },

    'radix.fp.hint16h':      { zh: 'IEEE 754-2008 binary16 (1-5-10, bias=15)', en: 'IEEE 754-2008 binary16 (1-5-10, bias=15)' },
    'radix.fp.hint16b':      { zh: 'Google Brain bfloat16 (1-8-7, bias=127), 非IEEE标准', en: 'Google Brain bfloat16 (1-8-7, bias=127), non-IEEE' },
    'radix.fp.hint32':       { zh: 'IEEE 754-1985 binary32 (1-8-23, bias=127)', en: 'IEEE 754-1985 binary32 (1-8-23, bias=127)' },
    'radix.fp.hint64':       { zh: 'IEEE 754-1985 binary64 (1-11-52, bias=1023)', en: 'IEEE 754-1985 binary64 (1-11-52, bias=1023)' }
};

// 翻译辅助：支持 {占位符} 替换
function tt(key, vars) {
    var s = window.I18N.t(key);
    if (vars) {
        for (var k in vars) {
            s = s.split('{' + k + '}').join(vars[k]);
        }
    }
    return s;
}

/* ======================================================
   全局状态
====================================================== */
let convBitWidth = 32;
let convEndianness = 'big';
let convValue = BigInt(0);

let fpPrecision = '32';
let fpEndianness = 'big';
let bitopsValue = BigInt(0);
let bitopsBitWidth = 32;

/* ======================================================
   Tab 切换
====================================================== */
document.getElementById('mainTabBar').addEventListener('click', function(e) {
    const tab = e.target.closest('.tab-item');
    if (!tab) return;
    const id = tab.dataset.tab;
    this.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(id).classList.add('active');
});

/* ======================================================
   通用切换组件
====================================================== */
function setupSwitch(containerId, callback) {
    const container = document.getElementById(containerId);
    container.addEventListener('click', function(e) {
        const opt = e.target.closest('.end-opt');
        if (!opt) return;
        this.querySelectorAll('.end-opt').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        callback(opt);
    });
}
setupSwitch('convEndianness', opt => {
    convEndianness = opt.dataset.end;
    updateConvDisplays();
});
setupSwitch('fpPrecision', opt => {
    fpPrecision = opt.dataset.prec;
    const hintKeys = {
        '16h': 'radix.fp.hint16h',
        '16b': 'radix.fp.hint16b',
        '32': 'radix.fp.hint32',
        '64': 'radix.fp.hint64'
    };
    const key = hintKeys[fpPrecision];
    document.getElementById('fpStdHint').textContent = key ? window.I18N.t(key) : '';
    fpFromValue();
});
setupSwitch('fpEndianness', opt => { fpEndianness = opt.dataset.end;
    fpFromValue(); });

/* ======================================================
   工具函数
====================================================== */
function copyField(id) {
    const el = document.getElementById(id);
    const text = el.value || el.textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => showCopyToast(el));
}

function showCopyToast(el) {
    const toast = document.createElement('span');
    toast.className = 'status-ok';
    toast.textContent = '已复制';
    toast.style.position = 'absolute';
    toast.style.zIndex = '999';
    toast.style.fontSize = '0.6rem';
    toast.style.padding = '2px 10px';
    toast.style.borderRadius = '20px';
    toast.style.top = '-20px';
    toast.style.right = '0';
    const parent = el.parentElement;
    parent.style.position = 'relative';
    parent.appendChild(toast);
    setTimeout(() => toast.remove(), 1200);
}

function hexToBytes(hex) {
    hex = hex.replace(/[\s,]/g, '');
    if (!hex) return [];
    if (hex.length % 2 !== 0) hex = '0' + hex;
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        const b = parseInt(hex.substring(i, i + 2), 16);
        if (isNaN(b)) return null;
        bytes.push(b);
    }
    return bytes;
}

function bytesToHex(bytes, sep) {
    return bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(sep !== undefined ? sep : ' ');
}

function applyEndianness(bytes, endianness) {
    if (endianness === 'little') return [...bytes].reverse();
    return bytes;
}

function getBitMask(width) {
    if (width >= 64) return BigInt('0xFFFFFFFFFFFFFFFF');
    return (BigInt(1) << BigInt(width)) - BigInt(1);
}

function valueToBytes(val, width) {
    const numBytes = Math.ceil(width / 8);
    const bytes = [];
    for (let i = numBytes - 1; i >= 0; i--) {
        bytes.push(Number((val >> BigInt(i * 8)) & BigInt(0xFF)));
    }
    return bytes;
}

function bytesToValue(bytes) {
    let val = 0n;
    for (const b of bytes) {
        val = (val << 8n) | BigInt(b);
    }
    return val;
}

/* ======================================================
   进制转换 (TAB 1) — 核心逻辑
====================================================== */
function getConvWidth() { return convBitWidth; }

function onConvBitWidthChange() {
    convBitWidth = parseInt(document.getElementById('convBitWidth').value);
    convValue = convValue & getBitMask(convBitWidth);
    updateConvDisplays();
}

function onRadixInput(source) {
    const mask = getBitMask(getConvWidth());
    let val;
    try {
        if (source === 'hex') {
            let hex = document.getElementById('convHex').value.replace(/[\s,]/g, '');
            if (!hex) { setConvValueToZero(); return; }
            if (hex.length % 2 !== 0) hex = '0' + hex;
            if (!/^[0-9a-fA-F]*$/.test(hex)) return;
            if (hex === '') return;
            val = BigInt('0x' + hex) & mask;
        } else if (source === 'dec') {
            const str = document.getElementById('convDec').value.trim();
            if (!str) { setConvValueToZero(); return; }
            if (str.startsWith('-')) {
                val = BigInt(str);
                val = val & mask;
            } else {
                val = BigInt(str) & mask;
            }
        } else if (source === 'bin') {
            let bin = document.getElementById('convBin').value.replace(/[\s,]/g, '');
            if (!bin) { setConvValueToZero(); return; }
            if (!/^[01]*$/.test(bin)) return;
            val = BigInt('0b' + bin) & mask;
        } else if (source === 'oct') {
            const str = document.getElementById('convOct').value.trim();
            if (!str) { setConvValueToZero(); return; }
            if (!/^[0-7]*$/.test(str)) return;
            val = BigInt('0o' + str) & mask;
        }
    } catch (e) { return; }
    convValue = val;
    updateConvDisplays(source);
}

function setConvValueToZero() {
    convValue = 0n;
    updateConvDisplays();
}

function updateConvDisplays(skipSource) {
    const width = getConvWidth();
    const mask = getBitMask(width);
    convValue = convValue & mask;

    if (skipSource !== 'hex') {
        const beBytes = valueToBytes(convValue, width);
        const displayBytes = applyEndianness(beBytes, convEndianness);
        document.getElementById('convHex').value = bytesToHex(displayBytes);
    }
    if (skipSource !== 'dec') {
        let decStr = convValue.toString(10);
        const signBit = BigInt(1) << BigInt(width - 1);
        if (width > 1 && (convValue & signBit) !== 0n) {
            const signedVal = convValue - (BigInt(1) << BigInt(width));
            decStr = convValue.toString(10);
        }
        document.getElementById('convDec').value = decStr;
        if (width > 1 && (convValue & signBit) !== 0n) {
            const signedVal = convValue - (BigInt(1) << BigInt(width));
            document.getElementById('convDecInfo').textContent = '有符号: ' + signedVal.toString(10);
        } else {
            document.getElementById('convDecInfo').textContent = '';
        }
    }
    if (skipSource !== 'bin') {
        const binStr = convValue.toString(2).padStart(width, '0');
        document.getElementById('convBin').value = formatBinString(binStr);
    }
    if (skipSource !== 'oct') {
        document.getElementById('convOct').value = convValue.toString(8);
    }
    renderConvBitVisual();
    updateConvSummary();
}

function formatBinString(binStr) {
    const parts = [];
    for (let i = 0; i < binStr.length; i += 4) {
        parts.push(binStr.substring(i, i + 4));
    }
    return parts.join(' ');
}

function renderConvBitVisual() {
    const width = getConvWidth();
    const container = document.getElementById('convBitVisual');
    const numBytes = Math.ceil(width / 8);
    const beBytes = valueToBytes(convValue, width);
    const displayOrder = convEndianness === 'big' ? beBytes : [...beBytes].reverse();

    let html = '<div style="display:flex;flex-wrap:wrap;gap:16px;">';
    for (let byteIdx = 0; byteIdx < numBytes; byteIdx++) {
        const byteVal = displayOrder[byteIdx] || 0;
        const actualBytePos = convEndianness === 'big' ? byteIdx : (numBytes - 1 - byteIdx);
        html += '<div>';
        html += `<div class="bit-byte-label">Byte ${actualBytePos}</div>`;
        html += '<div class="bit-grid" style="justify-content:flex-start;">';
        for (let bit = 7; bit >= 0; bit--) {
            const bitVal = (byteVal >> bit) & 1;
            const byteFromLsb = numBytes - 1 - actualBytePos;
            const globalIdx = byteFromLsb * 8 + bit;
            if (globalIdx >= width) {
                html +=
                `<div class="bit-cell bit-0" style="opacity:0.25;cursor:default;pointer-events:none;">-</div>`;
            } else {
                const cls = bitVal ? 'bit-cell bit-1' : 'bit-cell bit-0';
                html +=
                    `<div class="${cls}" onclick="toggleConvBit(${globalIdx})">${bitVal}<span class="bit-index">${globalIdx}</span></div>`;
            }
        }
        html += '</div></div>';
    }
    html += '</div>';
    container.innerHTML = html;
}

function toggleConvBit(globalIdx) {
    const mask = BigInt(1) << BigInt(globalIdx);
    convValue ^= mask;
    convValue = convValue & getBitMask(getConvWidth());
    updateConvDisplays();
}

function updateConvSummary() {
    const width = getConvWidth();
    const hexLen = Math.ceil(width / 4);
    const binStr = convValue.toString(2).padStart(width, '0');
    document.getElementById('convBitSummary').textContent =
        `0x${convValue.toString(16).toUpperCase().padStart(hexLen, '0')}  |  ${convValue.toString(10)}  |  0b${formatBinString(binStr)}`;
}

function copyConvField(id, type) {
    const el = document.getElementById(id);
    let text = el.value;
    if (type === 'hex') { text = '0x' + text.replace(/\s/g, ''); } else if (type === 'bin') { text = '0b' + text
            .replace(/\s/g, ''); } else if (type === 'oct') { text = '0o' + text; }
    navigator.clipboard.writeText(text).then(() => showCopyToast(el));
}

/* ======================================================
   ASCII 双向互转 (升级核心)
====================================================== */
let asciiUpdating = false;

// ----- 核心转换函数 -----
function textToBytes(text) {
    const bytes = [];
    for (let i = 0; i < text.length; i++) {
        bytes.push(text.charCodeAt(i) & 0xFF);
    }
    return bytes;
}

function bytesToText(bytes) {
    let text = '';
    for (const b of bytes) {
        text += String.fromCharCode(b);
    }
    return text;
}

// ----- 从文本更新 -----
function asciiFromText() {
    if (asciiUpdating) return;
    asciiUpdating = true;
    try {
        const text = document.getElementById('asciiInput').value;
        const bytes = textToBytes(text);
        document.getElementById('asciiHex').value = bytesToHex(bytes);
        document.getElementById('asciiDec').value = bytes.map(b => b.toString(10)).join(' ');
        document.getElementById('asciiBin').value = bytes.map(b => b.toString(2).padStart(8, '0')).join(' ');
    } finally { asciiUpdating = false; }
}

// ----- 从 HEX 更新 -----
function asciiFromHex() {
    if (asciiUpdating) return;
    asciiUpdating = true;
    try {
        const hex = document.getElementById('asciiHex').value;
        if (!hex.trim()) { clearAsciiFields(); return; }
        const bytes = hexToBytes(hex);
        if (bytes === null) return;
        const text = bytesToText(bytes);
        document.getElementById('asciiInput').value = text;
        document.getElementById('asciiDec').value = bytes.map(b => b.toString(10)).join(' ');
        document.getElementById('asciiBin').value = bytes.map(b => b.toString(2).padStart(8, '0')).join(' ');
    } finally { asciiUpdating = false; }
}

// ----- 从 DEC 更新 -----
function asciiFromDec() {
    if (asciiUpdating) return;
    asciiUpdating = true;
    try {
        const dec = document.getElementById('asciiDec').value;
        if (!dec.trim()) { clearAsciiFields(); return; }
        const parts = dec.trim().split(/\s+/);
        const bytes = [];
        for (const p of parts) {
            if (p === '') continue;
            const num = parseInt(p, 10);
            if (isNaN(num) || num < 0 || num > 255) return;
            bytes.push(num);
        }
        if (bytes.length === 0) { clearAsciiFields(); return; }
        const text = bytesToText(bytes);
        document.getElementById('asciiInput').value = text;
        document.getElementById('asciiHex').value = bytesToHex(bytes);
        document.getElementById('asciiBin').value = bytes.map(b => b.toString(2).padStart(8, '0')).join(' ');
    } finally { asciiUpdating = false; }
}

// ----- 从 BIN 更新 -----
function asciiFromBin() {
    if (asciiUpdating) return;
    asciiUpdating = true;
    try {
        const bin = document.getElementById('asciiBin').value;
        if (!bin.trim()) { clearAsciiFields(); return; }
        const clean = bin.replace(/\s/g, '');
        if (clean.length === 0) { clearAsciiFields(); return; }
        if (clean.length % 8 !== 0) return;
        const bytes = [];
        for (let i = 0; i < clean.length; i += 8) {
            const byteStr = clean.substring(i, i + 8);
            const num = parseInt(byteStr, 2);
            if (isNaN(num) || num > 255) return;
            bytes.push(num);
        }
        const text = bytesToText(bytes);
        document.getElementById('asciiInput').value = text;
        document.getElementById('asciiHex').value = bytesToHex(bytes);
        document.getElementById('asciiDec').value = bytes.map(b => b.toString(10)).join(' ');
    } finally { asciiUpdating = false; }
}

// ----- 清空 -----
function clearAsciiFields() {
    if (asciiUpdating) return;
    asciiUpdating = true;
    try {
        document.getElementById('asciiInput').value = '';
        document.getElementById('asciiHex').value = '';
        document.getElementById('asciiDec').value = '';
        document.getElementById('asciiBin').value = '';
    } finally { asciiUpdating = false; }
}

// ----- 复制全部 (以文本格式) -----
function copyAllAscii() {
    const text = document.getElementById('asciiInput').value;
    const hex = document.getElementById('asciiHex').value;
    const dec = document.getElementById('asciiDec').value;
    const bin = document.getElementById('asciiBin').value;
    const lines = [];
    if (text) lines.push(tt('radix.ascii.textLabel') + ': ' + text);
    if (hex) lines.push('HEX:  ' + hex);
    if (dec) lines.push('DEC:  ' + dec);
    if (bin) lines.push('BIN:  ' + bin);
    if (lines.length === 0) return;
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
        const btn = document.querySelector('.ascii-actions .btn:last-child');
        showCopyToast(btn);
    });
}

// ----- 折叠控制 -----
function toggleAsciiSection() {
    const toggle = document.querySelector('.ascii-section .collapse-toggle');
    const body = document.getElementById('asciiBody');
    toggle.classList.toggle('collapsed');
    body.classList.toggle('collapsed');
    body.style.maxHeight = body.classList.contains('collapsed') ? '0px' : '400px';
}

// 初始化 ASCII 折叠状态 (展开)
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('asciiBody').style.maxHeight = '400px';
});

/* ======================================================
   浮点数 (TAB 2)
====================================================== */
const FP_FORMATS = {
    '16h': { expBits: 5, manBits: 10, bias: 15, totalBits: 16, name: 'FP16' },
    '16b': { expBits: 8, manBits: 7, bias: 127, totalBits: 16, name: 'BF16' },
    '32': { expBits: 8, manBits: 23, bias: 127, totalBits: 32, name: 'FP32' },
    '64': { expBits: 11, manBits: 52, bias: 1023, totalBits: 64, name: 'FP64' },
};

function getFpFormat() { return FP_FORMATS[fpPrecision]; }

function float32ToFP16(f32val) {
    const buf = new ArrayBuffer(4);
    new Float32Array(buf)[0] = f32val;
    const u32 = new Uint32Array(buf)[0];
    const sign = (u32 >> 31) & 1;
    let exp32 = (u32 >> 23) & 0xFF;
    let man32 = u32 & 0x7FFFFF;
    let exp16, man16;
    if (exp32 === 0) { exp16 = 0;
        man16 = man32 >> 13; } else if (exp32 === 0xFF) { exp16 = 0x1F;
        man16 = man32 >> 13; } else {
        exp16 = exp32 - 127 + 15;
        man16 = man32 >> 13;
        if (exp16 >= 0x1F) { exp16 = 0x1F;
            man16 = 0; } else if (exp16 <= 0) {
            const shift = 1 - exp16;
            man16 = (0x400000 | (man32 >> 1)) >> (12 + shift);
            exp16 = 0;
        }
    }
    return (sign << 15) | (exp16 << 10) | man16;
}

function fp16ToFloat32(u16) {
    const sign = (u16 >> 15) & 1;
    const exp16 = (u16 >> 10) & 0x1F;
    const man16 = u16 & 0x3FF;
    let exp32, man32;
    if (exp16 === 0) {
        if (man16 === 0) return new Float32Array(new Uint32Array([sign << 31]).buffer)[0];
        exp32 = 127 - 15;
        let m = man16;
        while ((m & 0x400) === 0) { m <<= 1;
            exp32--; }
        man32 = (m & 0x3FF) << 13;
    } else if (exp16 === 0x1F) { exp32 = 0xFF;
        man32 = man16 << 13; } else { exp32 = exp16 - 15 + 127;
        man32 = man16 << 13; }
    return new Float32Array(new Uint32Array([(sign << 31) | (exp32 << 23) | man32]).buffer)[0];
}

function float32ToBF16(f32val) {
    const buf = new ArrayBuffer(4);
    new Float32Array(buf)[0] = f32val;
    return (new Uint32Array(buf)[0] >> 16) & 0xFFFF;
}

function bf16ToFloat32(u16) {
    return new Float32Array(new Uint32Array([u16 << 16]).buffer)[0];
}

function fpValueToUint(val) {
    if (fpPrecision === '16h') return float32ToFP16(val);
    if (fpPrecision === '16b') return float32ToBF16(val);
    const buf = new ArrayBuffer(fpPrecision === '32' ? 4 : 8);
    if (fpPrecision === '32') { new Float32Array(buf)[0] = val; return new Uint32Array(buf)[0]; } else { new Float64Array(
            buf)[0] = val; return new BigUint64Array(buf)[0]; }
}

function fpUintToValue(uintVal) {
    if (fpPrecision === '16h') return fp16ToFloat32(uintVal);
    if (fpPrecision === '16b') return bf16ToFloat32(uintVal);
    if (fpPrecision === '32') return new Float32Array(new Uint32Array([uintVal]).buffer)[0];
    return new Float64Array(new BigUint64Array([uintVal]).buffer)[0];
}

function fpUintToBytes(uintVal) {
    const totalBytes = getFpFormat().totalBits / 8;
    const bytes = [];
    if (typeof uintVal === 'bigint') {
        let v = uintVal;
        for (let i = totalBytes - 1; i >= 0; i--) bytes.push(Number((v >> BigInt(i * 8)) & 0xFFn));
    } else {
        for (let i = totalBytes - 1; i >= 0; i--) bytes.push((uintVal >> (i * 8)) & 0xFF);
    }
    return bytes;
}

function fpBytesToUint(bytes) {
    if (typeof bytes[0] === 'bigint' || getFpFormat().totalBits === 64) {
        let v = 0n;
        for (const b of bytes) v = (v << 8n) | BigInt(b);
        return v;
    }
    let v = 0;
    for (const b of bytes) v = (v << 8) | b;
    return v;
}

const fpValueInput = document.getElementById('fpValueInput');
const fpHexInput = document.getElementById('fpHexInput');

function fpFromValue() {
    const val = parseFloat(fpValueInput.value);
    if (isNaN(val)) { fpClearResults(); return; }
    const fmt = getFpFormat();
    document.getElementById('fpHexHint').textContent = `${fmt.name}: ${fmt.totalBits / 8} ` + tt('radix.fp.bytes');
    const uintVal = fpValueToUint(val);
    const beBytes = fpUintToBytes(uintVal);
    const display = applyEndianness([...beBytes], fpEndianness);
    fpHexInput.value = bytesToHex(display);
    analyzeFpFromUint(uintVal, val);
}

function fpFromHex() {
    const bytes = hexToBytes(fpHexInput.value);
    if (!bytes) return;
    const expected = getFpFormat().totalBits / 8;
    const src = applyEndianness(bytes, fpEndianness === 'big' ? 'little' : 'big');
    while (src.length < expected) src.unshift(0);
    const uintVal = fpBytesToUint(src.slice(0, expected));
    const val = fpUintToValue(uintVal);
    fpValueInput.value = (typeof val === 'number') ? val.toPrecision(17) : val.toPrecision(17);
    analyzeFpFromUint(uintVal, val);
}

function fpClearResults() {
    document.getElementById('fpBitStructure').innerHTML = '';
    document.getElementById('fpSignValue').textContent = '—';
    document.getElementById('fpExpValue').textContent = '—';
    document.getElementById('fpManValue').textContent = '—';
    document.getElementById('fpVerifyValue').textContent = '—';
    document.getElementById('fpSignDesc').textContent = '';
    document.getElementById('fpExpDesc').textContent = '';
    document.getElementById('fpManDesc').textContent = '';
}

function analyzeFpFromUint(uintVal, val) {
    const fmt = getFpFormat();
    const { expBits, manBits, bias, totalBits } = fmt;
    const uv = typeof uintVal === 'bigint' ? uintVal : BigInt(uintVal);
    const sign = Number((uv >> BigInt(totalBits - 1)) & 1n);
    let expVal = 0;
    for (let i = 0; i < expBits; i++) expVal = (expVal << 1) | Number((uv >> BigInt(totalBits - 2 - i)) & 1n);
    let manVal = 0;
    for (let i = 0; i < manBits; i++) manVal = (manVal << 1) | Number((uv >> BigInt(manBits - 1 - i)) & 1n);

    const bits = [];
    for (let i = totalBits - 1; i >= 0; i--) bits.push(Number((uv >> BigInt(i)) & 1n));
    const container = document.getElementById('fpBitStructure');
    let html = '<div class="bit-visual-row"><span class="bit-row-label">S</span><div class="bit-grid">';
    html += makeFpBitCell(bits[0], 0) + '</div></div>';
    html += '<div class="bit-visual-row"><span class="bit-row-label">E</span><div class="bit-grid">';
    for (let i = 1; i <= expBits; i++) {
        html += makeFpBitCell(bits[i], i);
        if ((i - 1) % 4 === 3 && i < expBits) html += '<div class="bit-separator"></div>';
    }
    html += '</div></div><div class="bit-visual-row"><span class="bit-row-label">M</span><div class="bit-grid">';
    for (let i = 0; i < manBits; i++) {
        html += makeFpBitCell(bits[1 + expBits + i], 1 + expBits + i);
        if ((i + 1) % 4 === 0 && i < manBits - 1) html += '<div class="bit-separator"></div>';
    }
    html += '</div></div>';
    container.innerHTML = html;

    document.getElementById('fpSignValue').textContent = sign;
    document.getElementById('fpSignDesc').textContent = sign ? tt('radix.fp.negative') : tt('radix.fp.positive');

    const maxExp = (1 << expBits) - 1;
    let actualExp, expDesc;
    if (expVal === 0) { actualExp = 1 - bias;
        expDesc = tt('radix.fp.expDenorm', { exp: actualExp }); } else if (expVal === maxExp) { expDesc = manVal === 0 ?
            tt('radix.fp.infinity') : tt('radix.fp.nan');
        actualExp = null; } else { actualExp = expVal - bias;
        expDesc = tt('radix.fp.expNorm', { exp: actualExp }); }
    document.getElementById('fpExpValue').textContent = expVal + (actualExp !== null ? ` (${actualExp})` : '');
    document.getElementById('fpExpDesc').textContent = expDesc;

    let manDisplay, manDesc;
    if (expVal === 0) { manDisplay = '0.' + manVal.toString(2).padStart(manBits, '0');
        manDesc = tt('radix.fp.manDenormal'); } else if (expVal === maxExp) { manDisplay = manVal.toString(2).padStart(manBits,
            '0');
        manDesc = manVal === 0 ? tt('radix.fp.manInf') : tt('radix.fp.manNan'); } else { manDisplay = '1.' + manVal.toString(2).padStart(
            manBits, '0');
        manDesc = tt('radix.fp.manNormal'); }
    document.getElementById('fpManValue').textContent = manDisplay.length > 40 ? manDisplay.substring(0, 37) + '...' :
        manDisplay;
    document.getElementById('fpManDesc').textContent = manDesc;

    let verifyText, specialTag = '';
    if (typeof val === 'number') {
        if (isNaN(val)) { verifyText = 'NaN';
            specialTag = '<span class="fp-tag fp-tag-nan">NaN</span>'; } else if (!isFinite(val)) { verifyText =
                val > 0 ? '+Infinity' : '-Infinity';
            specialTag = '<span class="fp-tag fp-tag-inf">' + (val > 0 ? '+∞' : '−∞') + '</span>'; } else if (val ===
            0) { verifyText = '0';
            specialTag = '<span class="fp-tag fp-tag-zero">Zero</span>'; } else verifyText = val.toPrecision(17);
    } else { verifyText = String(val); }
    document.getElementById('fpVerifyValue').innerHTML = verifyText + ' ' + specialTag;
}

function makeFpBitCell(value, index) {
    const cls = value ? 'bit-cell bit-1' : 'bit-cell bit-0';
    return `<div class="${cls}" data-fp-idx="${index}" onclick="toggleFpBit(this)">${value}<span class="bit-index">${index}</span></div>`;
}

function toggleFpBit(el) {
    const idx = parseInt(el.dataset.fpIdx);
    const fmt = getFpFormat();
    const totalBits = fmt.totalBits;
    const bytes = hexToBytes(fpHexInput.value);
    if (!bytes) return;
    const expected = totalBits / 8;
    const src = applyEndianness(bytes, fpEndianness === 'big' ? 'little' : 'big');
    while (src.length < expected) src.unshift(0);
    let uintVal = fpBytesToUint(src.slice(0, expected));
    const bitPos = totalBits - 1 - idx;
    if (typeof uintVal === 'bigint') { uintVal = uintVal ^ (1n << BigInt(bitPos)); } else { uintVal = uintVal ^ (1 <<
            bitPos); }
    const val = fpUintToValue(uintVal);
    const beBytes = fpUintToBytes(uintVal);
    const display = applyEndianness([...beBytes], fpEndianness);
    fpHexInput.value = bytesToHex(display);
    fpValueInput.value = (typeof val === 'number') ? val.toPrecision(17) : val.toPrecision(17);
    analyzeFpFromUint(uintVal, val);
}

fpValueInput.addEventListener('input', () => fpFromValue());

/* ======================================================
   位操作 (TAB 3)
====================================================== */
function getBitopsWidth() { return parseInt(document.getElementById('bitopsBitWidth').value); }

function applyBitopsInput() {
    const raw = document.getElementById('bitopsInput').value.trim();
    let val;
    try { val = BigInt(raw); } catch (e) { return; }
    const mask = getBitMask(getBitopsWidth());
    bitopsValue = val & mask;
    renderBitopsVisual();
}

function renderBitopsVisual() {
    const width = getBitopsWidth();
    const mask = getBitMask(width);
    bitopsValue = bitopsValue & mask;
    const container = document.getElementById('bitopsVisual');
    let html = '<div class="bit-grid">';
    for (let i = width - 1; i >= 0; i--) {
        const bitVal = (bitopsValue >> BigInt(i)) & BigInt(1);
        const cls = bitVal ? 'bit-cell bit-1' : 'bit-cell bit-0';
        html += `<div class="${cls}" onclick="toggleBitopsBit(${i})">${bitVal}<span class="bit-index">${i}</span></div>`;
        if (i > 0 && i % 4 === 0) html += '<div class="bit-separator"></div>';
    }
    html += '</div>';
    container.innerHTML = html;
    const hexStr = '0x' + bitopsValue.toString(16).toUpperCase().padStart(Math.ceil(width / 4), '0');
    document.getElementById('bitopsCurrentHex').textContent = hexStr;
    document.getElementById('bitopsCurrentDec').textContent = bitopsValue.toString(10);
    document.getElementById('bitopsInput').value = hexStr;
}

function toggleBitopsBit(idx) {
    bitopsValue ^= (BigInt(1) << BigInt(idx));
    renderBitopsVisual();
}

function bitSingleOp(op) {
    const idx = parseInt(document.getElementById('bitSingleIdx').value);
    if (isNaN(idx) || idx < 0 || idx >= getBitopsWidth()) return;
    const mask = BigInt(1) << BigInt(idx);
    if (op === 'set') bitopsValue |= mask;
    else if (op === 'clear') bitopsValue &= ~mask;
    else if (op === 'toggle') bitopsValue ^= mask;
    renderBitopsVisual();
}

function extractBitField() {
    const hi = parseInt(document.getElementById('bitFieldHi').value);
    const lo = parseInt(document.getElementById('bitFieldLo').value);
    const width = getBitopsWidth();
    if (isNaN(hi) || isNaN(lo) || hi < lo || lo < 0 || hi >= width) return;
    const bitCount = hi - lo + 1;
    const mask = (BigInt(1) << BigInt(bitCount)) - BigInt(1);
    const result = (bitopsValue >> BigInt(lo)) & mask;
    const box = document.getElementById('bitFieldResult');
    box.style.display = 'block';
    document.getElementById('bitFieldValue').textContent =
        `0x${result.toString(16).toUpperCase().padStart(Math.ceil(bitCount / 4), '0')}  (${result.toString(10)})`;
    document.getElementById('bitFieldSub').textContent = `提取 [${hi}:${lo}]，共 ${bitCount} 位，掩码 0x${mask.toString(16).toUpperCase()}`;
}

function extractBitFieldSigned() {
    const hi = parseInt(document.getElementById('bitFieldHi').value);
    const lo = parseInt(document.getElementById('bitFieldLo').value);
    const width = getBitopsWidth();
    if (isNaN(hi) || isNaN(lo) || hi < lo || lo < 0 || hi >= width) return;
    const bitCount = hi - lo + 1;
    const mask = (BigInt(1) << BigInt(bitCount)) - BigInt(1);
    let result = (bitopsValue >> BigInt(lo)) & mask;
    const signBit = BigInt(1) << BigInt(bitCount - 1);
    if (result & signBit) { result -= BigInt(1) << BigInt(bitCount); }
    const box = document.getElementById('bitFieldResult');
    box.style.display = 'block';
    document.getElementById('bitFieldValue').textContent = tt('radix.bitfield.signedVal', { val: result.toString(10) });
    document.getElementById('bitFieldSub').textContent = tt('radix.bitfield.signedSub', { hi: hi, lo: lo, n: bitCount });
}

function rotateBits(dir) {
    const amount = parseInt(document.getElementById('rotateAmount').value) || 0;
    const width = BigInt(getBitopsWidth());
    const a = BigInt(amount) % width;
    if (a === 0n) return;
    const fullMask = getBitMask(Number(width));
    if (dir === 'left') { bitopsValue = ((bitopsValue << a) | (bitopsValue >> (width - a))) & fullMask; } else { bitopsValue =
            ((bitopsValue >> a) | (bitopsValue << (width - a))) & fullMask; }
    renderBitopsVisual();
}

function shiftBits(dir) {
    const amount = parseInt(document.getElementById('rotateAmount').value) || 0;
    const width = getBitopsWidth();
    const mask = getBitMask(width);
    const a = BigInt(amount);
    if (dir === 'left') { bitopsValue = (bitopsValue << a) & mask; } else if (dir === 'right') { bitopsValue = bitopsValue >>
            a; } else if (dir === 'aright') {
        const signBit = BigInt(1) << BigInt(width - 1);
        const isNeg = (bitopsValue & signBit) !== 0n;
        bitopsValue = bitopsValue >> a;
        if (isNeg) {
            const signExtension = mask ^ ((BigInt(1) << BigInt(width - amount)) - BigInt(1));
            bitopsValue |= signExtension;
        }
    }
    renderBitopsVisual();
}

function generateMask(mode) {
    const width = getBitopsWidth();
    const hi = parseInt(document.getElementById('maskHi').value);
    const lo = parseInt(document.getElementById('maskLo').value);
    if (isNaN(hi) || isNaN(lo) || hi < lo || lo < 0 || hi >= width) return;
    const bitCount = hi - lo + 1;
    const mask = ((BigInt(1) << BigInt(bitCount)) - BigInt(1)) << BigInt(lo);
    const box = document.getElementById('maskResult');
    box.style.display = 'block';
    document.getElementById('maskValue').textContent =
        `0x${mask.toString(16).toUpperCase().padStart(Math.ceil(width / 4), '0')}  (${mask.toString(10)})`;
    document.getElementById('maskSub').textContent = `掩码 [${hi}:${lo}]，${bitCount} 位`;
    if (mode === 'set') return;
}

function applyMask(op) {
    const width = getBitopsWidth();
    const hi = parseInt(document.getElementById('maskHi').value);
    const lo = parseInt(document.getElementById('maskLo').value);
    if (isNaN(hi) || isNaN(lo) || hi < lo || lo < 0 || hi >= width) return;
    const bitCount = hi - lo + 1;
    let mask = ((BigInt(1) << BigInt(bitCount)) - BigInt(1)) << BigInt(lo);
    const fullMask = getBitMask(width);
    let result;
    if (op === 'and') result = bitopsValue & mask;
    else if (op === 'or') result = bitopsValue | mask;
    else if (op === 'xor') result = bitopsValue ^ mask;
    else if (op === 'not') result = (~bitopsValue) & fullMask;
    const box = document.getElementById('maskResult');
    box.style.display = 'block';
    const opLabel = { and: 'AND', or: 'OR', xor: 'XOR', not: 'NOT' } [op];
    if (op === 'not') {
        document.getElementById('maskValue').textContent =
            `0x${result.toString(16).toUpperCase().padStart(Math.ceil(width / 4), '0')}  (${result.toString(10)})`;
        document.getElementById('maskSub').textContent = tt('radix.mask.notSub');
    } else {
        const maskHex = '0x' + mask.toString(16).toUpperCase().padStart(Math.ceil(width / 4), '0');
        document.getElementById('maskValue').textContent =
            `0x${result.toString(16).toUpperCase().padStart(Math.ceil(width / 4), '0')}  (${result.toString(10)})`;
        document.getElementById('maskSub').textContent = tt('radix.mask.applySub', { op: opLabel, hex: maskHex.replace('0x',''), hi: hi, lo: lo });
    }
    bitopsValue = result;
    renderBitopsVisual();
}

/* ======================================================
   初始化
====================================================== */
updateConvDisplays();
renderBitopsVisual();
// ASCII 折叠初始展开
document.getElementById('asciiBody').style.maxHeight = '400px';

/* ======================================================
   语言切换：更新动态文本
====================================================== */
document.addEventListener('languagechange', function() {
    document.title = window.I18N.t('radix.doc.title');
    // 重新渲染含动态文本的区域
    updateConvDisplays();
    // 更新浮点数标准提示
    const hintKeys = { '16h': 'radix.fp.hint16h', '16b': 'radix.fp.hint16b', '32': 'radix.fp.hint32', '64': 'radix.fp.hint64' };
    const hk = hintKeys[fpPrecision];
    const fpStdHintEl = document.getElementById('fpStdHint');
    if (hk && fpStdHintEl) fpStdHintEl.textContent = window.I18N.t(hk);
    fpFromValue();
    renderBitopsVisual();
    asciiFromText();
});
