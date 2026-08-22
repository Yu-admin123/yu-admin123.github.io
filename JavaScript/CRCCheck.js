// ============================================================
//  CRCCheck.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
//  此处仅处理 CRC 计算业务逻辑
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + JS 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    'crc.doc.title':       { zh: 'CRC 校验计算器', en: 'CRC Checker' },
    'crc.page.title':      { zh: '🔢 CRC 校验计算器', en: '🔢 CRC Checker' },
    'crc.subhead':         { zh: '🔹 支持 CRC-8/16/32/64 多种算法 · 字节序可调 · 支持 HEX / ASCII / 文件', en: '🔹 Supports CRC-8/16/32/64 · adjustable byte order · HEX / ASCII / file input' },
    'crc.p1.title':        { zh: '① 输入数据', en: '① Input data' },
    'crc.p1.small':        { zh: 'HEX / ASCII / 文件', en: 'HEX / ASCII / file' },
    'crc.label.mode':      { zh: '数据模式', en: 'Data mode' },
    'crc.mode.hex':        { zh: 'HEX (空格分隔)', en: 'HEX (space-separated)' },
    'crc.mode.ascii':      { zh: 'ASCII 文本', en: 'ASCII text' },
    'crc.hint.hexExample': { zh: 'HEX 示例: 01 02 03 04', en: 'HEX example: 01 02 03 04' },
    'crc.label.data':      { zh: '数据', en: 'Data' },
    'crc.data.ph':         { zh: '01 02 03 04 或 123456', en: '01 02 03 04 or 123456' },
    'crc.data.phHex':      { zh: '01 02 03 04 或 0x01 0x02', en: '01 02 03 04 or 0x01 0x02' },
    'crc.data.phAscii':    { zh: '输入文本 (UTF-8)', en: 'Enter text (UTF-8)' },
    'crc.label.file':      { zh: '文件', en: 'File' },
    'crc.btn.selectFile':  { zh: '📁 选择文件', en: '📁 Select file' },
    'crc.file.notSelected': { zh: '未选择', en: 'Not selected' },
    'crc.btn.clear':       { zh: '清除', en: 'Clear' },
    'crc.p2.title':        { zh: '② CRC 参数', en: '② CRC parameters' },
    'crc.label.algo':      { zh: '算法', en: 'Algorithm' },
    'crc.label.init':      { zh: '初始值', en: 'Init value' },
    'crc.label.xor':       { zh: '异或值', en: 'XOR value' },
    'crc.label.refIn':     { zh: '输入反转', en: 'RefIn' },
    'crc.label.refOut':    { zh: '输出反转', en: 'RefOut' },
    'crc.no':              { zh: '否', en: 'No' },
    'crc.yes':             { zh: '是', en: 'Yes' },
    'crc.hint.byteReverse': { zh: '字节序反转', en: 'Byte order reflection' },
    'crc.btn.calc':        { zh: '▶ 计算 CRC', en: '▶ Calculate CRC' },
    'crc.btn.reset':       { zh: '↺ 重置参数', en: '↺ Reset params' },
    'crc.p3.title':        { zh: '③ 校验结果', en: '③ Result' },
    'crc.p3.small':        { zh: 'CRC 值 & 详情', en: 'CRC value & details' },
    'crc.result.label':    { zh: 'CRC 校验值', en: 'CRC value' },
    'crc.result.waiting':  { zh: '等待计算', en: 'Waiting' },
    'crc.result.noData':   { zh: '无有效数据', en: 'No valid data' },
    'crc.result.unknown':  { zh: '未知算法', en: 'Unknown algorithm' },
    'crc.key.algo':        { zh: '算法', en: 'Algorithm' },
    'crc.key.dataLen':     { zh: '数据长度', en: 'Data length' },
    'crc.key.init':        { zh: '初始值', en: 'Init value' },
    'crc.key.xor':         { zh: '异或值', en: 'XOR value' },
    'crc.key.refIn':       { zh: '输入反转', en: 'RefIn' },
    'crc.key.refOut':      { zh: '输出反转', en: 'RefOut' },
    'crc.preview.title':   { zh: '📋 数据预览', en: '📋 Data preview' },
    'crc.preview.small':   { zh: '前 32 字节', en: 'First 32 bytes' },
    'crc.preview.empty':   { zh: '(无数据)', en: '(no data)' },
    'crc.btn.copyResult': { zh: '📋 复制结果', en: '📋 Copy result' },
    'crc.btn.copyFull':   { zh: '📋 复制完整', en: '📋 Copy full' },
    'crc.p4.title':       { zh: '④ 常用 CRC 参数参考', en: '④ Common CRC reference' },
    'crc.p4.small':       { zh: '点击快速加载', en: 'Click to load' },
    'crc.preset.hint':    { zh: '💡 点击预设将自动切换算法并填充对应的初始值/异或值/反转设置。', en: '💡 Click a preset to auto-switch algorithm and fill init/XOR/reflection settings.' },
    'crc.footer':         { zh: '🔢 CRC 校验计算器 · 支持多种主流 CRC 算法与自定义参数', en: '🔢 CRC Checker · Supports mainstream CRC algorithms & custom parameters' },

    // 动态文本
    'crc.bytes':          { zh: '字节', en: 'bytes' },
    'crc.empty':          { zh: '(空)', en: '(empty)' },
    'crc.dec':            { zh: '十进制', en: 'Decimal' },
    'crc.bits':           { zh: '位数', en: 'Width' },
    'crc.calcFirst':      { zh: '请先计算 CRC', en: 'Please calculate CRC first' },
    'crc.copy.fail':      { zh: '复制失败，请手动复制', en: 'Copy failed, please copy manually' },
    'crc.full.title':     { zh: 'CRC 校验结果', en: 'CRC Result' },
    'crc.full.algo':      { zh: '算法', en: 'Algorithm' },
    'crc.full.crc':       { zh: 'CRC', en: 'CRC' },
    'crc.full.dec':       { zh: '十进制', en: 'Decimal' },
    'crc.full.dataLen':   { zh: '数据长度', en: 'Data length' },
    'crc.full.init':      { zh: '初始值', en: 'Init value' },
    'crc.full.xor':       { zh: '异或值', en: 'XOR value' },
    'crc.full.refIn':     { zh: '输入反转', en: 'RefIn' },
    'crc.full.refOut':    { zh: '输出反转', en: 'RefOut' },
    'crc.full.preview':   { zh: '数据预览', en: 'Data preview' },
    'crc.file.info':      { zh: '{name} ({n} 字节)', en: '{name} ({n} bytes)' }
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

(function() {
    // ============================================================
    //  DOM 引用
    // ============================================================
    const inputMode = document.getElementById('inputMode');
    const dataInput = document.getElementById('dataInput');
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const clearFileBtn = document.getElementById('clearFileBtn');
    const crcAlgo = document.getElementById('crcAlgo');
    const initVal = document.getElementById('initVal');
    const xorVal = document.getElementById('xorVal');
    const refIn = document.getElementById('refIn');
    const refOut = document.getElementById('refOut');
    const calcBtn = document.getElementById('calcBtn');
    const resetAlgoBtn = document.getElementById('resetAlgoBtn');
    const crcResult = document.getElementById('crcResult');
    const crcResultSub = document.getElementById('crcResultSub');
    const detailAlgo = document.getElementById('detailAlgo');
    const detailLen = document.getElementById('detailLen');
    const detailInit = document.getElementById('detailInit');
    const detailXor = document.getElementById('detailXor');
    const detailRefIn = document.getElementById('detailRefIn');
    const detailRefOut = document.getElementById('detailRefOut');
    const dataPreview = document.getElementById('dataPreview');
    const copyResultBtn = document.getElementById('copyResultBtn');
    const copyFullBtn = document.getElementById('copyFullBtn');
    const presetContainer = document.getElementById('presetContainer');

    // ============================================================
    //  CRC 算法预设
    // ============================================================
    const CRC_PRESETS = {
        'crc8': { width: 8, poly: 0x07, init: 0x00, xor: 0x00, refIn: true, refOut: true },
        'crc8_dallas': { width: 8, poly: 0x31, init: 0x00, xor: 0x00, refIn: true, refOut: true },
        'crc16_modbus': { width: 16, poly: 0x8005, init: 0xFFFF, xor: 0x0000, refIn: true, refOut: true },
        'crc16_ccitt': { width: 16, poly: 0x1021, init: 0x0000, xor: 0x0000, refIn: false, refOut: false },
        'crc16_ccitt_false': { width: 16, poly: 0x1021, init: 0xFFFF, xor: 0x0000, refIn: false,
        refOut: false },
        'crc16_x25': { width: 16, poly: 0x1021, init: 0xFFFF, xor: 0xFFFF, refIn: true, refOut: true },
        'crc16_kermit': { width: 16, poly: 0x1021, init: 0x0000, xor: 0x0000, refIn: true, refOut: true },
        'crc32': { width: 32, poly: 0x04C11DB7, init: 0xFFFFFFFF, xor: 0xFFFFFFFF, refIn: true,
        refOut: true },
        'crc32_mpeg2': { width: 32, poly: 0x04C11DB7, init: 0xFFFFFFFF, xor: 0x00000000, refIn: false,
            refOut: false },
        'crc64_ecma': { width: 64, poly: 0x42F0E1EBA9EA3693, init: 0x0000000000000000, xor: 0x0000000000000000,
            refIn: false, refOut: false }
    };

    // ============================================================
    //  CRC 计算核心 (支持 8/16/32/64)
    // ============================================================
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

        // 使用 BigInt 统一处理
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
                // 按位反转字节
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
            // 按位反转整个 CRC 值
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

        // 转为普通数字或字符串
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
        const cleaned = str.replace(/,/g, ' ').replace(/0x/g, '').trim();
        if (cleaned === '') return [];
        const parts = cleaned.split(/\s+/);
        const bytes = [];
        for (let p of parts) {
            if (p === '') continue;
            const val = parseInt(p, 16);
            if (!isNaN(val) && val >= 0 && val <= 255) bytes.push(val);
        }
        return bytes;
    }

    function stringToBytes(str) {
        const encoder = new TextEncoder();
        return Array.from(encoder.encode(str));
    }

    function formatBytes(bytes, limit) {
        limit = limit || 32;
        const slice = bytes.slice(0, limit);
        const hex = slice.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
        if (bytes.length > limit) return hex + ' ... (' + bytes.length + ' 字节)';
        return hex + (bytes.length === 0 ? ' (空)' : ' (' + bytes.length + ' 字节)');
    }

    function getCrcPreset(name) {
        return CRC_PRESETS[name] || null;
    }

    function applyPreset(name) {
        const preset = getCrcPreset(name);
        if (!preset) return;
        crcAlgo.value = name;
        const initHex = '0x' + (preset.init.toString(16).toUpperCase());
        const xorHex = '0x' + (preset.xor.toString(16).toUpperCase());
        initVal.value = initHex;
        xorVal.value = xorHex;
        refIn.value = preset.refIn ? 'true' : 'false';
        refOut.value = preset.refOut ? 'true' : 'false';
        // 触发计算
        calculateCrc();
    }

    // ============================================================
    //  主计算函数
    // ============================================================
    function calculateCrc() {
        const mode = inputMode.value;
        let raw = dataInput.value;
        let bytes = [];

        // 检查是否有文件数据
        if (window._fileBytes && window._fileBytes.length > 0) {
            bytes = window._fileBytes;
        } else if (mode === 'hex') {
            bytes = parseHexString(raw);
        } else {
            bytes = stringToBytes(raw);
        }

        if (bytes.length === 0) {
            crcResult.textContent = '—';
            crcResultSub.textContent = tt('crc.result.noData');
            dataPreview.textContent = tt('crc.preview.empty');
            detailLen.textContent = '0';
            return;
        }

        const algoName = crcAlgo.value;
        const preset = getCrcPreset(algoName);
        if (!preset) {
            crcResult.textContent = '❌';
            crcResultSub.textContent = tt('crc.result.unknown');
            return;
        }

        // 解析自定义参数（允许覆盖预设）
        let initValStr = initVal.value.trim();
        let xorValStr = xorVal.value.trim();
        let init = preset.init;
        let xor = preset.xor;
        let refInVal = refIn.value === 'true';
        let refOutVal = refOut.value === 'true';
        const width = preset.width;

        try {
            if (initValStr.startsWith('0x') || initValStr.startsWith('0X')) {
                init = parseInt(initValStr, 16);
            } else {
                init = parseInt(initValStr, 10);
            }
            if (isNaN(init)) init = preset.init;
        } catch (e) { init = preset.init; }

        try {
            if (xorValStr.startsWith('0x') || xorValStr.startsWith('0X')) {
                xor = parseInt(xorValStr, 16);
            } else {
                xor = parseInt(xorValStr, 10);
            }
            if (isNaN(xor)) xor = preset.xor;
        } catch (e) { xor = preset.xor; }

        // 确保 init/xor 在有效范围内
        const mask = (width === 64) ? BigInt(0xFFFFFFFFFFFFFFFF) :
            (width === 32) ? 0xFFFFFFFF :
            (width === 16) ? 0xFFFF :
            0xFF;
        if (width === 64) {
            init = BigInt(init);
            xor = BigInt(xor);
        } else {
            init = init & mask;
            xor = xor & mask;
        }

        const result = crcCompute(bytes, width, preset.poly, init, xor, refInVal, refOutVal);

        // 显示结果
        crcResult.textContent = result.hex;
        const decStr = (width === 64) ? result.big.toString(10) : result.crc.toString(10);
        crcResultSub.textContent = tt('crc.dec') + ': ' + decStr + ' · ' + tt('crc.bits') + ': ' + width + ' bit';

        // 详情
        detailAlgo.textContent = algoName;
        detailLen.textContent = bytes.length + ' ' + tt('crc.bytes');
        detailInit.textContent = '0x' + (width === 64 ? BigInt(init).toString(16).toUpperCase() : init.toString(16)
            .toUpperCase());
        detailXor.textContent = '0x' + (width === 64 ? BigInt(xor).toString(16).toUpperCase() : xor.toString(16)
            .toUpperCase());
        detailRefIn.textContent = refInVal ? tt('crc.yes') : tt('crc.no');
        detailRefOut.textContent = refOutVal ? tt('crc.yes') : tt('crc.no');

        // 数据预览
        dataPreview.textContent = formatBytes(bytes, 32);

        // 保存结果用于复制
        window._lastCrcResult = {
            hex: result.hex,
            dec: decStr,
            algo: algoName,
            len: bytes.length,
            init: detailInit.textContent,
            xor: detailXor.textContent,
            refInVal: refInVal,
            refOutVal: refOutVal,
            dataPreview: dataPreview.textContent
        };
    }

    // ============================================================
    //  文件处理
    // ============================================================
    function loadFile(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            const buffer = e.target.result;
            const bytes = new Uint8Array(buffer);
            window._fileBytes = Array.from(bytes);
            fileInfo.textContent = tt('crc.file.info', { name: file.name, n: bytes.length });
            dataInput.value = '';
            inputMode.value = 'hex';
            calculateCrc();
        };
        reader.readAsArrayBuffer(file);
    }

    function clearFile() {
        window._fileBytes = null;
        fileInfo.textContent = '未选择';
        fileInput.value = '';
        calculateCrc();
    }

    // ============================================================
    //  复制功能
    // ============================================================
    function copyText(text, btn) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                const orig = btn.textContent;
                btn.textContent = '✓';
                setTimeout(() => btn.textContent = orig, 800);
            }).catch(() => fallbackCopy(text));
        } else { fallbackCopy(text); }
    }

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { alert(tt('crc.copy.fail')); }
        document.body.removeChild(ta);
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    calcBtn.addEventListener('click', calculateCrc);

    inputMode.addEventListener('change', function() {
        if (this.value === 'hex') {
            dataInput.placeholder = window.I18N.t('crc.data.phHex');
        } else {
            dataInput.placeholder = window.I18N.t('crc.data.phAscii');
        }
        calculateCrc();
    });

    dataInput.addEventListener('input', function() {
        // 如果当前有文件数据，清除
        if (window._fileBytes) {
            window._fileBytes = null;
            fileInfo.textContent = tt('crc.file.notSelected');
            fileInput.value = '';
        }
        calculateCrc();
    });

    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            loadFile(this.files[0]);
        }
    });

    clearFileBtn.addEventListener('click', clearFile);

    crcAlgo.addEventListener('change', function() {
        const preset = getCrcPreset(this.value);
        if (preset) {
            const initHex = '0x' + (preset.init.toString(16).toUpperCase());
            const xorHex = '0x' + (preset.xor.toString(16).toUpperCase());
            initVal.value = initHex;
            xorVal.value = xorHex;
            refIn.value = preset.refIn ? 'true' : 'false';
            refOut.value = preset.refOut ? 'true' : 'false';
        }
        calculateCrc();
    });

    [initVal, xorVal, refIn, refOut].forEach(el => {
        el.addEventListener('change', calculateCrc);
        el.addEventListener('input', calculateCrc);
    });

    resetAlgoBtn.addEventListener('click', function() {
        const preset = getCrcPreset(crcAlgo.value);
        if (preset) {
            const initHex = '0x' + (preset.init.toString(16).toUpperCase());
            const xorHex = '0x' + (preset.xor.toString(16).toUpperCase());
            initVal.value = initHex;
            xorVal.value = xorHex;
            refIn.value = preset.refIn ? 'true' : 'false';
            refOut.value = preset.refOut ? 'true' : 'false';
            calculateCrc();
        }
    });

    copyResultBtn.addEventListener('click', function() {
        const val = crcResult.textContent;
        if (val && val !== '—') {
            copyText(val, this);
        } else {
            alert(tt('crc.calcFirst'));
        }
    });

    copyFullBtn.addEventListener('click', function() {
        const result = window._lastCrcResult;
        if (!result) { alert(tt('crc.calcFirst')); return; }
        const lines = [
            tt('crc.full.title'),
            tt('crc.full.algo') + ': ' + result.algo,
            tt('crc.full.crc') + ': ' + result.hex,
            tt('crc.full.dec') + ': ' + result.dec,
            tt('crc.full.dataLen') + ': ' + result.len + ' ' + tt('crc.bytes'),
            tt('crc.full.init') + ': ' + result.init,
            tt('crc.full.xor') + ': ' + result.xor,
            tt('crc.full.refIn') + ': ' + (result.refInVal ? tt('crc.yes') : tt('crc.no')),
            tt('crc.full.refOut') + ': ' + (result.refOutVal ? tt('crc.yes') : tt('crc.no')),
            tt('crc.full.preview') + ': ' + result.dataPreview
        ];
        copyText(lines.join('\n'), this);
    });

    // 预设按钮
    presetContainer.addEventListener('click', function(e) {
        const target = e.target.closest('button');
        if (target && target.dataset.preset) {
            applyPreset(target.dataset.preset);
        }
    });

    // ============================================================
    //  初始化
    // ============================================================
    // 设置默认算法为 CRC-16/Modbus
    crcAlgo.value = 'crc16_modbus';
    const defaultPreset = getCrcPreset('crc16_modbus');
    if (defaultPreset) {
        initVal.value = '0xFFFF';
        xorVal.value = '0x0000';
        refIn.value = 'true';
        refOut.value = 'true';
    }
    dataInput.value = '01 02 03 04';
    calculateCrc();

    // 提供一些示例数据以便测试
    window._fileBytes = null;

    // ============================================================
    //  语言切换：更新动态文本
    // ============================================================
    document.addEventListener('languagechange', function() {
        document.title = window.I18N.t('crc.doc.title');
        // 更新输入框 placeholder
        if (inputMode.value === 'hex') {
            dataInput.placeholder = window.I18N.t('crc.data.phHex');
        } else {
            dataInput.placeholder = window.I18N.t('crc.data.phAscii');
        }
        // 更新文件信息（未选择文件时）
        if (!window._fileBytes) {
            fileInfo.textContent = window.I18N.t('crc.file.notSelected');
        }
        // 重新计算以刷新所有动态文本
        calculateCrc();
    });
})();
