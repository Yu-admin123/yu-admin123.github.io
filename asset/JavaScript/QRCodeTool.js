// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + JS 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    'qrcode.doc.title':    { zh: '二维码读写工具', en: 'QR Code Reader/Writer' },
    'qrcode.page.title':   { zh: '🔲 二维码读写工具', en: '🔲 QR Code Reader/Writer' },
    'qrcode.subhead':      { zh: '🔹 离线生成二维码 / 条形码 · 从图片解析二维码 · 支持多种格式 · 全程本地运行', en: '🔹 Generate QR / barcode offline · decode QR from image · multiple formats · fully local' },

    'qrcode.gen.title':    { zh: '① 生成二维码 / 条形码', en: '① Generate QR / Barcode' },
    'qrcode.gen.small':    { zh: '完全离线', en: 'Fully offline' },
    'qrcode.rd.title':     { zh: '② 解析图片中的二维码 / 条形码', en: '② Decode QR / Barcode from image' },
    'qrcode.rd.small':     { zh: '识别多格式并标注码类型 · 选择图片 · Ctrl+V 粘贴 · 拖拽', en: 'Decodes multiple formats & shows the code type · choose image · Ctrl+V · drag & drop' },

    'qrcode.label.category': { zh: '类别', en: 'Category' },
    'qrcode.label.fmt':    { zh: '格式', en: 'Format' },
    'qrcode.label.content': { zh: '内容', en: 'Content' },
    'qrcode.label.size':    { zh: '放大', en: 'Scale' },
    'qrcode.label.img':     { zh: '图片', en: 'Image' },
    'qrcode.label.chooseImg': { zh: '选择一张图片', en: 'Choose an image' },

    'qrcode.cat.2d':      { zh: '二维码（2D）', en: '2D Code' },
    'qrcode.cat.1d':      { zh: '条形码（1D）', en: '1D Barcode' },

    'qrcode.fmt.qr':      { zh: '标准 QR',     en: 'Standard QR' },
    'qrcode.fmt.microqr': { zh: 'Micro QR',    en: 'Micro QR' },
    'qrcode.fmt.datamatrix': { zh: 'Data Matrix', en: 'Data Matrix' },
    'qrcode.fmt.pdf417':  { zh: 'PDF417',      en: 'PDF417' },
    'qrcode.fmt.aztec':   { zh: 'Aztec Code',  en: 'Aztec Code' },
    'qrcode.fmt.hanxin':  { zh: '汉信码',      en: 'Han Xin' },
    'qrcode.fmt.maxicode': { zh: 'MaxiCode',   en: 'MaxiCode' },
    'qrcode.fmt.code128': { zh: 'CODE128',     en: 'CODE128' },
    'qrcode.fmt.code39':  { zh: 'CODE39',      en: 'CODE39' },
    'qrcode.fmt.code93':  { zh: 'CODE93',      en: 'CODE93' },
    'qrcode.fmt.ean13':   { zh: 'EAN-13',      en: 'EAN-13' },
    'qrcode.fmt.ean8':    { zh: 'EAN-8',       en: 'EAN-8' },
    'qrcode.fmt.upca':    { zh: 'UPC-A',       en: 'UPC-A' },
    'qrcode.fmt.upce':    { zh: 'UPC-E',       en: 'UPC-E' },
    'qrcode.fmt.itf14':   { zh: 'ITF-14',      en: 'ITF-14' },
    'qrcode.fmt.codabar': { zh: 'Codabar',     en: 'Codabar' },

    'qrcode.ph.content': { zh: 'https://example.com', en: 'https://example.com' },
    'qrcode.hint.qr':    { zh: '放大倍数（1×~5×），越大越清晰，可下载高清 PNG', en: 'Scale factor (1×–5×); larger = clearer, downloadable as HD PNG' },
    'qrcode.hint.drop':  { zh: '也可直接拖拽图片到下方 / 在页面粘贴', en: 'You can also drag an image below / paste on page' },

    'qrcode.btn.generate': { zh: '▶ 生成', en: '▶ Generate' },
    'qrcode.btn.example':  { zh: '🎯 示例', en: '🎯 Example' },
    'qrcode.btn.save':     { zh: '💾 下载图片', en: '💾 Download image' },
    'qrcode.btn.copyData': { zh: '📋 复制内容', en: '📋 Copy content' },
    'qrcode.btn.choose':   { zh: '🖼 选择图片', en: '🖼 Choose image' },
    'qrcode.btn.decode':   { zh: '▶ 开始解析', en: '▶ Decode' },
    'qrcode.btn.clear':    { zh: '🧹 清空', en: '🧹 Clear' },
    'qrcode.btn.copyResult': { zh: '📋 复制结果', en: '📋 Copy result' },

    'qrcode.result.title': { zh: '解析结果', en: 'Result' },
    'qrcode.drop.hint':    { zh: '截图后在此页面 Ctrl+V 粘贴，或拖拽图片 / 点击"选择图片"', en: 'Take a screenshot then Ctrl+V on this page, or drag an image / click "Choose image"' },
    'qrcode.note.title':   { zh: '③ 支持格式说明', en: '③ Supported Formats' },
    'qrcode.note.2d':      { zh: '二维码（2D）：标准 QR / Micro QR / Data Matrix / PDF417 / Aztec / 汉信码 / MaxiCode', en: '2D: Standard QR / Micro QR / Data Matrix / PDF417 / Aztec / Han Xin / MaxiCode' },
    'qrcode.note.1d':      { zh: '条形码（1D）：CODE128 / CODE39 / EAN-13 / EAN-8 / UPC-A / UPC-E / ITF-14 / Codabar', en: '1D: CODE128 / CODE39 / EAN-13 / EAN-8 / UPC-A / UPC-E / ITF-14 / Codabar' },
    'qrcode.note.decode':  { zh: '解析：三级引擎——BarcodeDetector → jsQR → ZXing(本地多格式库)，覆盖二维码 + 各种 1D/2D 条码并标注「码类型」，全程离线', en: 'Decode: three engines — BarcodeDetector → jsQR → ZXing (local multi-format lib), covering QR + many 1D/2D barcodes with "code type" label, fully offline' },

    'qrcode.footer': { zh: '🔲 二维码读写工具 · 离线生成二维码/条形码 · 解析图片二维码 · 多格式 · 全程本地', en: '🔲 QR Code Reader/Writer · generate QR/barcode offline · decode QR from image · multi-format · fully local' },

    // ---- 动态文本 ----
    'qrcode.gen.empty':     { zh: '❌ 请输入生成内容', en: '❌ Please enter content to generate' },
    'qrcode.gen.ok':        { zh: '✅ 生成成功', en: '✅ Generated' },
    'qrcode.gen.qrFail':    { zh: '❌ 二维码生成失败，内容过长或包含无法编码的字符', en: '❌ QR generation failed: content too long or unencodable' },
    'qrcode.gen.barFail':   { zh: '❌ 条形码生成失败，请检查内容是否符合该格式', en: '❌ Barcode generation failed: check content validity for this format' },
    'qrcode.gen.contentTooLong': { zh: '❌ 内容超出该格式容量，请缩短或换用容量更大的格式（如标准 QR）', en: "❌ Content exceeds this format's capacity. Shorten it or use a larger format (e.g. Standard QR)." },
    'qrcode.gen.microQRLimit': { zh: '⚠️ Micro QR 容量有限（约 15 字符以内），超长内容请改用「标准 QR」', en: '⚠️ Micro QR has limited capacity (~15 chars). For longer content, switch to Standard QR.' },
    'qrcode.gen.errDetail': { zh: '详细：', en: 'Detail: ' },
    'qrcode.gen.unable':    { zh: '当前浏览器缺少条形码支持', en: 'Barcode support unavailable in this browser' },
    'qrcode.preview.empty': { zh: '输入内容后点击"生成"，或点「示例」快速填入', en: 'Type content and click "Generate", or click "Example" to fill quickly' },
    'qrcode.size.px':       { zh: 'px', en: 'px' },

    'qrcode.noImage':     { zh: '❌ 请先选择或拖入一张图片', en: '❌ Please choose or drop an image first' },
    'qrcode.err.notImage': { zh: '❌ 请选择有效的图片文件', en: '❌ Please select a valid image file' },
    'qrcode.paste.notImage': { zh: '粘贴内容不是图片（可截图复制后在页面 Ctrl+V 粘贴）', en: 'Pasted content is not an image (copy a screenshot, then Ctrl+V on the page)' },
    'qrcode.reading':     { zh: '⏳ 正在解析...', en: '⏳ Decoding...' },
    'qrcode.readOk':      { zh: '✅ 解析成功', en: '✅ Decoded' },
    'qrcode.readFail':    { zh: '❌ 未识别到二维码/条形码，请更换更清晰的图片', en: '❌ No QR/barcode found. Try a clearer image.' },
    'qrcode.detectorUnavailable': { zh: '⚠️ 当前浏览器不支持原生 BarcodeDetector，已自动改用本地 ZXing 库多格式解析', en: '⚠️ Native BarcodeDetector unsupported; using the local ZXing decoder for multi-format parsing' },
    'qrcode.clear.done':  { zh: '已清空', en: 'Cleared' },
    'qrcode.result.placeholder': { zh: '解析结果将显示在这里，可复制', en: 'Decoded result appears here; copyable' },

    'qrcode.fname.qr':   { zh: '二维码', en: 'QR' },
    'qrcode.fname.bar':  { zh: '条形码', en: 'Barcode' },

    // 检测到的码类型标注
    'qrcode.fmtLabel':   { zh: '码类型', en: 'Code Type' },
    'qrcode.fmt.unknown': { zh: '未知', en: 'Unknown' },
    'qrcode.decode.unsupportedFormats': { zh: '提示：Micro QR / 汉信码 / MaxiCode 这三种格式本地无解码器，暂无法解析；其余格式已尽力识别', en: 'Note: Micro QR / Han Xin / MaxiCode have no local decoder and cannot be decoded; all other formats are attempted.' },
    'qrcode.detect.via': { zh: '（识别引擎：', en: ' (engine: ' },
    'qrcode.detect.via.end': { zh: '）', en: ')' },
};

(function () {
    'use strict';

    // ============================================================
    //  DOM 引用
    // ============================================================
    const genCategory = document.getElementById('genCategory');
    const genFormat = document.getElementById('genFormat');
    const genContent = document.getElementById('genContent');
    const genSize = document.getElementById('genSize');
    const genSizeVal = document.getElementById('genSizeVal');
    const btnGenerate = document.getElementById('btnGenerate');
    const btnExample = document.getElementById('btnExample');
    const btnSave = document.getElementById('btnSave');
    const btnCopyData = document.getElementById('btnCopyData');
    const genCanvas = document.getElementById('genCanvas');
    const genStatus = document.getElementById('genStatus');
    const genDetail = document.getElementById('genDetail');

    const imgInput = document.getElementById('imgInput');
    const btnChoose = document.getElementById('btnChoose');
    const dropZone = document.getElementById('dropZone');
    const rdCanvas = document.getElementById('rdCanvas');
    const btnDecode = document.getElementById('btnDecode');
    const btnClear = document.getElementById('btnClear');
    const btnCopyResult = document.getElementById('btnCopyResult');
    const rdStatus = document.getElementById('rdStatus');
    const rdFormat = document.getElementById('rdFormat');
    const rdResult = document.getElementById('rdResult');
    const rdNote = document.getElementById('rdNote');

    // 当前的解析源（ImageBitmap / HTMLImageElement / Canvas 元素）
    let decodeSource = null;
    // 记录是否已渲染预览图（用于切换清除）
    let hasPreview = false;
    // BarcodeDetector 支持检测（缓存）
    let detectorSupported = ('BarcodeDetector' in window);

    // ============================================================
    //  码类型显示映射（BarcodeDetector.format → i18n 名称 + 图标标注）
    // ============================================================
    // key：BarcodeDetector 的 format 值（小写下划线）；value：i18n key、中文简写。
    // 表格顺序即解析优先级（2D 优先尝试，1D 其次）。
    const FORMAT_DISPLAY = {
        'qr_code':       { i18n: 'qrcode.fmt.qr',          badge: 'QR' },
        'micro_qr_code': { i18n: 'qrcode.fmt.microqr',     badge: 'Micro QR' },
        'data_matrix':   { i18n: 'qrcode.fmt.datamatrix',  badge: 'DM' },
        'pdf417':        { i18n: 'qrcode.fmt.pdf417',      badge: 'PDF417' },
        'aztec':         { i18n: 'qrcode.fmt.aztec',       badge: 'Aztec' },
        'han_xin':       { i18n: 'qrcode.fmt.hanxin',      badge: '汉信码' },
        'maxi_code':     { i18n: 'qrcode.fmt.maxicode',    badge: 'Maxi' },
        'code_128':      { i18n: 'qrcode.fmt.code128',     badge: 'CODE128' },
        'code_39':       { i18n: 'qrcode.fmt.code39',      badge: 'CODE39' },
        'code_93':       { i18n: 'qrcode.fmt.code93',      badge: 'CODE93' },
        'codabar':       { i18n: 'qrcode.fmt.codabar',     badge: 'Codabar' },
        'ean_13':        { i18n: 'qrcode.fmt.ean13',       badge: 'EAN-13' },
        'ean_8':         { i18n: 'qrcode.fmt.ean8',        badge: 'EAN-8' },
        'upc_a':         { i18n: 'qrcode.fmt.upca',        badge: 'UPC-A' },
        'upc_e':         { i18n: 'qrcode.fmt.upce',        badge: 'UPC-E' },
        'itf':           { i18n: 'qrcode.fmt.itf14',       badge: 'ITF' }
    };
    // BarcodeDetector 的格式规范名（仅取 W3C 规范枚举，保证构建设备时不抛错）
    const DETECTOR_FORMATS = [
        'qr_code', 'data_matrix', 'pdf417', 'aztec',
        'code_128', 'code_39', 'code_93', 'codabar',
        'ean_13', 'ean_8', 'upc_a', 'upc_e', 'itf'
    ];
    // 浏览器实际支持的格式（通过 getSupportedFormats 探测）
    let supportedDetectorFormats = DETECTOR_FORMATS.slice();

    function detectSupportedFormats() {
        if (!window.BarcodeDetector || !window.BarcodeDetector.getSupportedFormats) {
            return DETECTOR_FORMATS.slice();
        }
        try {
            const list = window.BarcodeDetector.getSupportedFormats();
            if (list && list.length) supportedDetectorFormats = list;
        } catch (e) { /* 保持默认 */ }
        // 仅保留我们有显示映射的格式；按 DETECTOR_FORMATS 顺序去重
        const ordered = DETECTOR_FORMATS.filter(function (f) { return supportedDetectorFormats.indexOf(f) !== -1; });
        if (ordered.length) supportedDetectorFormats = ordered;
        return supportedDetectorFormats;
    }
    detectSupportedFormats();

    // 把 BarcodeDetector.format 转成友好名称（i18n）
    function formatName(fmt) {
        const meta = FORMAT_DISPLAY[fmt];
        if (meta) return window.I18N.t(meta.i18n);
        return window.I18N.t('qrcode.fmt.unknown') + (fmt ? ' (' + fmt + ')' : '');
    }

    // ============================================================
    //  多格式解析（ZXing 本地库）
    //  覆盖 PDF417 / Aztec / DataMatrix / 1D 条码等 jsQR 解不了的格式，
    //  完全离线、图片不上传。加载失败时静默跳过，不影响其他引擎。
    // ============================================================
    // ZXing.BarcodeFormat 数值 → 我们的 FORMAT_DISPLAY key
    const ZXING_FMT = {
        0: 'aztec',            // AZTEC
        1: 'codabar',          // CODABAR
        2: 'code_39',          // CODE_39
        3: 'code_93',          // CODE_93
        4: 'code_128',         // CODE_128
        5: 'data_matrix',      // DATA_MATRIX
        6: 'ean_8',            // EAN_8
        7: 'ean_13',           // EAN_13
        8: 'itf',              // ITF
        9: 'maxi_code',        // MAXICODE
        10: 'pdf417',          // PDF_417
        11: 'qr_code',         // QR_CODE
        14: 'upc_a',           // UPC_A
        15: 'upc_e'            // UPC_E
    };
    let zxingAvailable = null; // 惰性缓存 ZXing 是否可用

    function zxingReady() {
        if (zxingAvailable === null) {
            zxingAvailable = !!(window.ZXing && window.ZXing.MultiFormatReader);
        }
        return zxingAvailable;
    }

    // 把源图转成 ZXing 需要的灰度亮度数组 + 宽高
    function sourceLuminance(src) {
        const w = src.naturalWidth || src.width || 0;
        const h = src.naturalHeight || src.height || 0;
        if (!w || !h) return null;
        const tmp = document.createElement('canvas');
        tmp.width = w; tmp.height = h;
        const ctx = tmp.getContext('2d', { willReadFrequently: true });
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(src, 0, 0, w, h);
        let img;
        try { img = ctx.getImageData(0, 0, w, h); } catch (e) { return null; }
        const lum = new Uint8ClampedArray(w * h);
        const d = img.data;
        for (let i = 0; i < w * h; i++) {
            const p = i * 4;
            lum[i] = Math.round(d[p] * 0.299 + d[p + 1] * 0.587 + d[p + 2] * 0.114);
        }
        return { lum: lum, width: w, height: h };
    }

    // 用 ZXing MultiFormatReader 尝试解码。
    // pass=0 用 HybridBinarizer（偏 2D 矩阵码）；pass=1 用 GlobalHistogram + TryHarder（偏 1D 线性条码）
    function tryZxingDecode(src, useLinear) {
        const L = sourceLuminance(src);
        if (!L) return null;
        const Z = window.ZXing;
        try {
            const srcObj = new Z.RGBLuminanceSource(L.lum, L.width, L.height);
            const bin = useLinear
                ? new Z.BinaryBitmap(new Z.GlobalHistogramBinarizer(srcObj))
                : new Z.BinaryBitmap(new Z.HybridBinarizer(srcObj));
            const reader = new Z.MultiFormatReader();
            const hints = new Map();
            const fmtVals = [];
            // ZXING_FMT 的 key 是数字（AZTEC=0...QR_CODE=11），通过 BarcodeFormat 反向映射拿到枚举值
            Object.keys(ZXING_FMT).forEach(function (numKey) {
                const name = Z.BarcodeFormat[Number(numKey)];   // 数字 → 名称（e.g. 11 → "QR_CODE"）
                if (name && Z.BarcodeFormat[name] !== undefined) {
                    fmtVals.push(Z.BarcodeFormat[name]);          // 名称 → 数值
                }
            });
            hints.set(Z.DecodeHintType.POSSIBLE_FORMATS, fmtVals);
            hints.set(Z.DecodeHintType.TRY_HARDER, true);
            reader.setHints(hints);
            const r = reader.decode(bin);
            const text = r ? r.getText() : null;
            if (!text) return null;
            // 取 format：优先字符串名，再看是否是 ZXING_FMT 的 key
            let key = null;
            const rawFmt = r.getBarcodeFormat && r.getBarcodeFormat();
            if (typeof rawFmt === 'string' && FORMAT_DISPLAY[rawFmt]) key = rawFmt;
            else if (typeof rawFmt === 'number' || typeof rawFmt === 'string') key = ZXING_FMT[rawFmt];
            return { data: text, fmt: key || null, formatRaw: rawFmt };
        } catch (e) {
            return null;
        }
    }

    async function decodeZxing() {
        if (!zxingReady() || !decodeSource) return null;
        // 2D 优先
        const hit2d = tryZxingDecode(decodeSource, false);
        if (hit2d) return hit2d;
        // 1D 次之
        const hit1d = tryZxingDecode(decodeSource, true);
        if (hit1d) return hit1d;
        return null;
    }

    // ============================================================
    //  工具函数
    // ============================================================
    function setGenStatus(text, isErr, detail) {
        genStatus.textContent = text;
        genStatus.className = 'hint-text' + (isErr ? ' error-msg' : '');
        if (genDetail) {
            if (detail) {
                genDetail.textContent = detail;
                genDetail.style.display = '';
                genDetail.className = 'hint-text error-msg';
                genDetail.style.fontFamily = "'SF Mono', 'Fira Code', monospace";
                genDetail.style.wordBreak = 'break-all';
            } else {
                genDetail.textContent = '';
                genDetail.style.display = 'none';
            }
        }
    }

    function isDarkTheme() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    // ============================================================
    //  ① 生成
    // ============================================================
    // 二维码（2D）格式：val=bwip-js bcid；key=i18n 字典 key；qrcode 用 qrcode-generator
    // 条形码（1D）格式：val=bwip-js bcid
    const FORMAT_2D = [
        { val: 'qrcode',      i18n: 'qrcode.fmt.qr' },
        { val: 'microqrcode', i18n: 'qrcode.fmt.microqr' },
        { val: 'datamatrix',  i18n: 'qrcode.fmt.datamatrix' },
        { val: 'pdf417',      i18n: 'qrcode.fmt.pdf417' },
        { val: 'azteccode',   i18n: 'qrcode.fmt.aztec' },
        { val: 'hanxin',      i18n: 'qrcode.fmt.hanxin' },
        { val: 'maxicode',    i18n: 'qrcode.fmt.maxicode' }
    ];
    const FORMAT_1D = [
        { val: 'code128',            i18n: 'qrcode.fmt.code128' },
        { val: 'code39',             i18n: 'qrcode.fmt.code39' },
        { val: 'ean13',              i18n: 'qrcode.fmt.ean13' },
        { val: 'ean8',               i18n: 'qrcode.fmt.ean8' },
        { val: 'upca',               i18n: 'qrcode.fmt.upca' },
        { val: 'upce',               i18n: 'qrcode.fmt.upce' },
        { val: 'itf14',              i18n: 'qrcode.fmt.itf14' },
        { val: 'rationalizedCodabar', i18n: 'qrcode.fmt.codabar' }
    ];

    // 长内容优先使用的示例
    const URL_SAMPLE = 'https://github.com/Yu-admin123/yu-admin123.github.io';

    // UTF-8 字节长度
    function byteLen(str) {
        return new TextEncoder().encode(str).length;
    }
    // 仅数字
    function digitsOnly(s) { return s.replace(/\D/g, ''); }

    // 各格式：example=切换到此格式时建议填入的示例（能放下 URL 的用 URL，反之用格式内合适样本）；
    // canHold=当前内容是否可直接用于该格式（长度/字符集/位数校验）。
    const FORMAT_META = {
        qrcode:   { example: URL_SAMPLE, canHold: c => c.length > 0 && byteLen(c) <= 2953 },
        microqrcode: { example: 'Yu_Tools', canHold: c => byteLen(c) <= 14 },
        datamatrix:  { example: URL_SAMPLE, canHold: c => c.length > 0 && byteLen(c) <= 500 },
        pdf417:      { example: URL_SAMPLE, canHold: c => c.length > 0 && byteLen(c) <= 1000 },
        azteccode:   { example: URL_SAMPLE, canHold: c => c.length > 0 && byteLen(c) <= 1500 },
        hanxin:      { example: URL_SAMPLE, canHold: c => c.length > 0 && byteLen(c) <= 4000 },
        maxicode:    { example: 'PM 420 000000000000000000', canHold: c => byteLen(c) <= 80 },
        code128:     { example: URL_SAMPLE, canHold: c => c.length > 0 && /^[\x00-\x7f]*$/.test(c) },
        code39:      { example: 'YU-TOOLS', canHold: c => c.length > 0 && /^[A-Z0-9 \-\.\$\/\+\%]*$/i.test(c) },
        ean13:       { example: '590123412345', canHold: c => c.length > 0 && /^\d{12}$|^\d{13}$/.test(digitsOnly(c)) },
        ean8:        { example: '9638507', canHold: c => [7, 8].indexOf(digitsOnly(c).length) !== -1 },
        upca:        { example: '03600029145', canHold: c => [11, 12].indexOf(digitsOnly(c).length) !== -1 },
        upce:        { example: '0425261', canHold: c => [6, 7, 8].indexOf(digitsOnly(c).length) !== -1 },
        itf14:       { example: '1234567890123', canHold: c => [13, 14].indexOf(digitsOnly(c).length) !== -1 },
        rationalizedCodabar: { example: 'A123456B', canHold: c => c.length > 0 && /^[A-D]?[0-9\-\$:\/\.\+]+[A-D]?$/i.test(c) }
    };

    // 需要自动补/校验校验位的格式：{bcid, 基础位数(不含校验位)}
    // 注：UPC-E 校验位算法特殊（非普通 mod-10），不自动补，交给 bwip-js 校验提示
    const CHECK_DIGIT = {
        ean13: { base: 12, mod: 10 },
        ean8:  { base: 7,  mod: 10 },
        upca:  { base: 11, mod: 10 },
        itf14: { base: 13, mod: 10 }
    };

    // 生成时填充二级格式下拉框（按当前类别）
    function populateFormats(category) {
        const list = (category === '1d') ? FORMAT_1D : FORMAT_2D;
        genFormat.innerHTML = '';
        list.forEach(function (f) {
            const opt = document.createElement('option');
            opt.value = f.val;
            opt.textContent = window.I18N.t(f.i18n);
            genFormat.appendChild(opt);
        });
        // 若当前选中的值不在新列表里，则回退到第一个
        if (!list.some(function (f) { return f.val === genFormat.value; })) {
            genFormat.value = list[0].val;
        }
    }
    // 「示例」按钮：仅当用户点击时，才按当前格式填入示例文本（其余情况输入框保持用户内容/默认空）
    function fillExample() {
        const meta = FORMAT_META[currentFormat()];
        if (!meta) return;
        genContent.value = meta.example;
        renderGeneration(meta.example);
        genContent.focus();
    }

    genCategory.addEventListener('change', function () {
        populateFormats(genCategory.value);
        // 切换类别/格式不自动填内容；仅在有内容时重绘
        const value = genContent.value.trim();
        if (value) renderGeneration(value);
    });
    genFormat.addEventListener('change', function () {
        const value = genContent.value.trim();
        if (value) renderGeneration(value);
    });
    if (btnExample) btnExample.addEventListener('click', fillExample);

    // EAN/UPC/ITF 类：若用户给的位数是『不含校验位』则自动补一位，避免报错
    function normalizeNum(value, bcid) {
        const spec = CHECK_DIGIT[bcid];
        if (!spec || spec.base < 0) return value;
        let digits = value.replace(/\D/g, '');
        if (digits.length !== spec.base) return value; // 位数不对就交给 bwip-js 报错
        // Mod-10 校验位：最右一位数据位权重3，向左交替 3,1,3,1...
        let sum = 0;
        for (let i = 0; i < digits.length; i++) {
            const d = parseInt(digits[i], 10);
            const weight = ((digits.length - i) % 2 === 1) ? 3 : 1; // 从右起第1位权重3
            sum += d * weight;
        }
        const check = (10 - (sum % 10)) % 10;
        return digits + check;
    }

    // 标准二维码：用 qrcode-generator（保证中文/URL 可被 jsQR 正确往返解码）
    function generateQR(value) {
        try {
            const scale = parseInt(genSize.value, 10) || 3;
            const qr = window.qrcode(0, 'M');
            qr.addData(value, 'Byte');
            qr.make();
            const count = qr.getModuleCount();
            const cell = scale;
            const padPx = 4 * scale;
            const px = count * cell + padPx * 2;
            genCanvas.width = px;
            genCanvas.height = px;
            const ctx = genCanvas.getContext('2d');
            ctx.clearRect(0, 0, px, px);
            const isDark = isDarkTheme();
            ctx.fillStyle = isDark ? '#1a1a1a' : '#ffffff';
            ctx.fillRect(0, 0, px, px);
            ctx.fillStyle = (isDark ? '#e6e6e6' : '#000000');
            for (let r = 0; r < count; r++) {
                for (let c = 0; c < count; c++) {
                    if (qr.isDark(r, c)) {
                        ctx.fillRect(padPx + c * cell, padPx + r * cell, cell, cell);
                    }
                }
            }
            genStatus.textContent = window.I18N.t('qrcode.gen.ok');
            genStatus.className = 'hint-text';
            if (genDetail) { genDetail.textContent = ''; genDetail.style.display = 'none'; }
        } catch (e) {
            genCanvas.width = genCanvas.height = 240;
            const ctx = genCanvas.getContext('2d');
            ctx.clearRect(0, 0, 240, 240);
            setGenStatus(window.I18N.t('qrcode.gen.qrFail'), true, (e && (e.message || e)) || '');
        }
    }

    // 其他格式（含 Micro QR / DataMatrix / PDF417 / Aztec / 汉信码 / MaxiCode / 全部1D）：用 bwip-js
    function generateBwip(value, bcid) {
        if (typeof window.bwipjs !== 'object') {
            setGenStatus(window.I18N.t('qrcode.gen.unable'), true);
            return;
        }
        const isDark = isDarkTheme();
        const paper = isDark ? '1A1A1A' : 'FFFFFF';
        const ink = isDark ? 'E6E6E6' : '000000';
        const is1D = (genCategory.value === '1d');
        let text = value;
        if (is1D && CHECK_DIGIT[bcid] && CHECK_DIGIT[bcid].base > 0) {
            const norm = normalizeNum(value, bcid);
            if (/^\d+$/.test(norm)) text = norm;
        }
        try {
            const scale = parseInt(genSize.value, 10) || 3;
            // Micro QR 容量极小：先做长度预检，给出明确提示
            if (bcid === 'microqrcode' && byteLen(text) > 14) {
                genCanvas.width = genCanvas.height = 240;
                const c2 = genCanvas.getContext('2d');
                c2.clearRect(0, 0, 240, 240);
                setGenStatus(window.I18N.t('qrcode.gen.microQRLimit'), true,
                    window.I18N.t('qrcode.gen.errDetail') + ' ' + byteLen(text) + ' bytes > 14');
                return;
            }
            window.bwipjs.toCanvas(genCanvas, {
                bcid: bcid,
                text: text,
                scale: scale,
                includetext: is1D,           // 1D 显示数字，2D 不显示文本
                textyoffset: -4,
                backgroundcolor: paper,
                barcolor: ink
            });
            genStatus.textContent = window.I18N.t('qrcode.gen.ok');
            genStatus.className = 'hint-text';
            if (genDetail) { genDetail.textContent = ''; genDetail.style.display = 'none'; }
        } catch (e) {
            genCanvas.width = genCanvas.height = 240;
            const ctx = genCanvas.getContext('2d');
            ctx.clearRect(0, 0, 240, 240);
            const errMsg = (e && (e.message || e)) || String(e);
            const isLimit = bcid === 'microqrcode' || /length|too long|capacity|exceeded|valid/i.test(String(errMsg));
            if (bcid === 'microqrcode') {
                setGenStatus(window.I18N.t('qrcode.gen.microQRLimit'), true,
                    window.I18N.t('qrcode.gen.errDetail') + ' ' + errMsg);
            } else if (isLimit) {
                setGenStatus(window.I18N.t('qrcode.gen.contentTooLong'), true,
                    window.I18N.t('qrcode.gen.errDetail') + ' ' + errMsg);
            } else {
                setGenStatus(window.I18N.t('qrcode.gen.barFail'), true,
                    window.I18N.t('qrcode.gen.errDetail') + ' ' + errMsg);
            }
        }
    }

    function currentFormat() { return genFormat.value; }

    function generate() {
        const value = genContent.value.trim();
        if (!value) {
            setGenStatus(window.I18N.t('qrcode.gen.empty'), true);
            document.getElementById('genContent').focus();
            return;
        }
        renderGeneration(value);
        genStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function renderGeneration(value) {
        const fmt = currentFormat();
        if (fmt === 'qrcode') {
            generateQR(value);
        } else if (window.bwipjs && window.bwipjs.toCanvas) {
            generateBwip(value, fmt);
        } else {
            setGenStatus(window.I18N.t('qrcode.gen.unable'), true);
        }
    }

    genSize.addEventListener('input', function () {
        genSizeVal.textContent = genSize.value + '×';
        const value = genContent.value.trim();
        if (value) renderGeneration(value);
    });
    btnGenerate.addEventListener('click', generate);
    genContent.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); }
    });

    // 下载图片
    btnSave.addEventListener('click', function () {
        if (!genCanvas.width || genCanvas.width < 2) { setGenStatus(window.I18N.t('qrcode.preview.empty')); return; }
        try {
            const value = genContent.value.trim() || 'code';
            const base = (genCategory.value === '1d') ? window.I18N.t('qrcode.fname.bar') : window.I18N.t('qrcode.fname.qr');
            const safe = value.replace(/[^\w\u4e00-\u9fa5-]+/g, '_').slice(0, 20) || 'output';
            const a = document.createElement('a');
            a.href = genCanvas.toDataURL('image/png');
            a.download = base + '_' + safe + '.png';
            a.click();
        } catch (e) { /* ignore */ }
    });

    // 复制内容
    btnCopyData.addEventListener('click', function () {
        const value = genContent.value.trim();
        if (!value) { setGenStatus(window.I18N.t('qrcode.gen.empty'), true); return; }
        copyText(value, this);
    });

    // ============================================================
    //  复制工具
    // ============================================================
    function copyText(text, btn) {
        const done = function () {
            const orig = btn.textContent;
            btn.textContent = '✓';
            setTimeout(function () { btn.textContent = orig; }, 800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(function () {
                fallbackCopy(text); done();
            });
        } else { fallbackCopy(text); done(); }
    }
    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
    }

    btnCopyResult.addEventListener('click', function () {
        const text = rdResult.textContent;
        if (text && text !== '—' && text !== window.I18N.t('qrcode.result.placeholder')) copyText(text, this);
    });

    // ============================================================
    //  ② 解析
    // ============================================================
    btnChoose.addEventListener('click', function () { imgInput.click(); });
    imgInput.addEventListener('change', function (e) {
        const file = e.target.files && e.target.files[0];
        if (file) loadFile(file);
        imgInput.value = '';
    });

    function loadFile(file, autoDecode) {
        if (!file.type.match(/^image\//)) {
            setRdStatus(window.I18N.t('qrcode.err.notImage'), 'error');
            return;
        }
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = function () {
            URL.revokeObjectURL(url);
            showDecodePreview(img);
            // 粘贴/拖拽的图片自动开始解析，省去手动点击
            if (autoDecode) decodeImage();
        };
        img.onerror = function () { URL.revokeObjectURL(url); };
        img.src = url;
    }

    // 渲染预览图到 dropZone
    function showDecodePreview(source) {
        decodeSource = source;
        hasPreview = true;
        dropZone.classList.add('has-img');
        const inner = dropZone.querySelector('.drop-zone-inner');
        if (inner) inner.style.display = 'none';
        rdCanvas.style.display = 'block';
        // 按最长边 300 缩放显示
        const maxSide = 300;
        const scale = Math.min(1, maxSide / Math.max(source.naturalWidth, source.naturalHeight));
        rdCanvas.width = Math.max(1, Math.round(source.naturalWidth * scale));
        rdCanvas.height = Math.max(1, Math.round(source.naturalHeight * scale));
        const ctx = rdCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, rdCanvas.width, rdCanvas.height);
        ctx.drawImage(source, 0, 0, rdCanvas.width, rdCanvas.height);
        rdResult.textContent = window.I18N.t('qrcode.result.placeholder');
        rdStatus.style.display = 'none';
        if (rdFormat) { rdFormat.style.display = 'none'; rdFormat.removeAttribute('data-fmt'); }
    }

    // 从 Image 源解码
    async function decodeImage() {
        if (!decodeSource) {
            setRdStatus(window.I18N.t('qrcode.noImage'), 'error');
            return;
        }
        setRdStatus(window.I18N.t('qrcode.reading'), 'warn');
        btnDecode.disabled = true;

        // 策略1：原生 BarcodeDetector（支持二维码 + 1D/2D 多格式，并给出 format）
        if (detectorSupported && window.BarcodeDetector) {
            try {
                const detector = new BarcodeDetector({ formats: supportedDetectorFormats });
                const results = await detector.detect(decodeSource);
                if (results && results.length > 0) {
                    const first = results[0];
                    const fmt = first.format || 'qr_code';
                    showResult(first.rawValue, window.I18N.t('qrcode.readOk'), 'ok', fmt, 'BarcodeDetector');
                    return;
                }
            } catch (e) {
                // fall through to jsQR
            }
        }

        // 策略2：jsQR（仅标准二维码）
        if (typeof window.jsQR === 'function' && decodeSource) {
            try {
                const candidate = await extractOrigninalCanvas();
                if (candidate) {
                    const code = window.jsQR(candidate.data, candidate.width, candidate.height);
                    if (code && code.data) {
                        showResult(code.data, window.I18N.t('qrcode.readOk'), 'ok', 'qr_code', 'jsQR');
                        return;
                    }
                }
            } catch (e) { /* ignore */ }
        }

        // 策略3：ZXing 本地多格式解析（覆盖 PDF417 / Aztec / Data Matrix / 1D 条码等）
        if (zxingReady() && decodeSource) {
            try {
                const hit = await decodeZxing();
                if (hit && hit.data) {
                    showResult(hit.data, window.I18N.t('qrcode.readOk'), 'ok', hit.fmt || null, 'ZXing');
                    return;
                }
            } catch (e) { /* ignore */ }
        }

        // 本地解析失败：显示说明（按引擎可用性 + 无法本地解析的格式）
        let note = '';
        // 仅当连本地 ZXing 库也不可用时，才提示「能力受限、仅二维码」；
        // 否则 ZXing/BarcodeDetector 已覆盖多格式，无需重复说明引擎。
        if (!detectorSupported && !zxingReady()) {
            note += window.I18N.t('qrcode.detectorUnavailable') + ' ';
        }
        note += window.I18N.t('qrcode.decode.unsupportedFormats');
        rdNote.textContent = note.trim();
        showResult(window.I18N.t('qrcode.readFail'), window.I18N.t('qrcode.readFail'), 'error', null, null);
    }

    function showResult(content, statusText, statusClass, codeFmt, engine) {
        rdResult.textContent = content || window.I18N.t('qrcode.readFail');
        setRdStatus(statusText, statusClass);
        // 标注识别的码类型
        if (rdFormat) {
            if (codeFmt && FORMAT_DISPLAY[codeFmt]) {
                rdFormat.style.display = '';
                rdFormat.textContent = window.I18N.t('qrcode.fmtLabel') + ': ' + formatName(codeFmt);
                rdFormat.className = 'tag';
                rdFormat.setAttribute('data-fmt', codeFmt);
            } else {
                rdFormat.style.display = 'none';
                rdFormat.removeAttribute('data-fmt');
            }
        }
        // 识别引擎说明（放到底部备注，不占工具栏）
        if (rdNote && engine) {
            rdNote.textContent = window.I18N.t('qrcode.detect.via') + engine + window.I18N.t('qrcode.detect.via.end');
        }
        btnDecode.disabled = false;
    }

    // 从源提取 ARGB 像素数据供 jsQR 使用
    function extractOrigninalCanvas() {
        return new Promise(function (resolve) {
            let w, h;
            if (decodeSource.width) { w = decodeSource.width; h = decodeSource.height; }
            else { w = decodeSource.naturalWidth; h = decodeSource.naturalHeight; }
            const tmp = document.createElement('canvas');
            tmp.width = w; tmp.height = h;
            const ctx = tmp.getContext('2d', { willReadFrequently: true });
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(decodeSource, 0, 0, w, h);
            let data;
            try { data = ctx.getImageData(0, 0, w, h).data; } catch (e) { resolve(null); return; }
            resolve({ data: data, width: w, height: h });
        });
    }

    function setRdStatus(text, cls) {
        rdStatus.textContent = text;
        rdStatus.className = 'status-' + cls;
        rdStatus.style.display = '';
        // cls: ok / error / warn
    }

    btnDecode.addEventListener('click', decodeImage);

    function clearDecode() {
        decodeSource = null;
        hasPreview = false;
        rdCanvas.getContext('2d').clearRect(0, 0, rdCanvas.width, rdCanvas.height);
        rdCanvas.width = rdCanvas.height = 0;
        rdCanvas.style.display = 'none';
        const inner = dropZone.querySelector('.drop-zone-inner');
        if (inner) inner.style.display = '';
        dropZone.classList.remove('has-img');
        rdResult.textContent = window.I18N.t('qrcode.result.placeholder');
        rdStatus.style.display = 'none';
        rdNote.textContent = '';
        if (rdFormat) { rdFormat.style.display = 'none'; rdFormat.removeAttribute('data-fmt'); }
        btnDecode.disabled = false;
    }
    btnClear.addEventListener('click', clearDecode);

    // ---- 拖拽 ----
    dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', function (e) { dropZone.classList.remove('dragover'); });
    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (file && file.type.match(/^image\//)) loadFile(file, true);
    });

    // ---- 粘贴图片 ----
    document.addEventListener('paste', function (e) {
        const cd = e.clipboardData;
        if (!cd) return;
        let file = null;
        if (cd.items) {
            for (let i = 0; i < cd.items.length; i++) {
                const item = cd.items[i];
                if (item.type && item.type.indexOf('image') === 0) {
                    file = item.getAsFile && item.getAsFile();
                    if (file) break;
                }
            }
        }
        // 降级：items 未取到文件时，尝试 clipboardData.files
        if (!file && cd.files && cd.files.length) {
            const f = cd.files[0];
            if (f.type && f.type.indexOf('image') === 0) file = f;
        }

        if (file) {
            e.preventDefault();
            loadFile(file, true); // 第二个参数 = 粘贴后自动解析
        } else if (cd.getData && cd.getData('text')) {
            // 粘贴的是文字而非图片：仅提示，不打断
            setRdStatus(window.I18N.t('qrcode.paste.notImage'), 'warn');
        }
    });

    // ============================================================
    //  语言切换：更新动态文本 + 重绘生成结果
    // ============================================================
    document.addEventListener('languagechange', function () {
        document.title = window.I18N.t('qrcode.doc.title');
        // 语言变化时重建二级格式下拉（沿用当前选中值）
        populateFormats(genCategory.value);
        // 重绘生成区（保持当前内容与模式）
        const value = genContent.value.trim();
        if (value) renderGeneration(value);
        // 解析面板动态文本
        if (!decodeSource) {
            rdResult.textContent = window.I18N.t('qrcode.result.placeholder');
        } else if (rdFormat && rdFormat.style.display !== 'none' && rdFormat.getAttribute('data-fmt')) {
            // 语言切换后重绘「码类型」标注
            rdFormat.textContent = window.I18N.t('qrcode.fmtLabel') + ': ' + formatName(rdFormat.getAttribute('data-fmt'));
        }
    });

    // ============================================================
    //  主题切换：重绘生成结果（Canvas 颜色随主题）
    // ============================================================
    document.addEventListener('themechange', function () {
        const value = genContent.value.trim();
        if (value) renderGeneration(value);
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.title = window.I18N.t('qrcode.doc.title');
    // 首次填充格式下拉（默认二维码类别，保持"标准 QR"）
    genCategory.value = '2d';
    populateFormats('2d');
    genFormat.value = 'qrcode';
    genSizeVal.textContent = genSize.value + '×';
    // 输入框默认留空，示例由用户点击「示例」按钮填入
    genContent.value = '';
    genCanvas.width = genCanvas.height = 150;
    const initCtx = genCanvas.getContext('2d');
    initCtx.clearRect(0, 0, 150, 150);
    genStatus.textContent = window.I18N.t('qrcode.preview.empty');
    rdResult.textContent = window.I18N.t('qrcode.result.placeholder');
    // 初始化提示：仅当缺少所有多格式解码能力（原生 BarcodeDetector 与本地 ZXing 都不可用）时，
    // 才对「仅能解析二维码」做预先说明；否则无需预先警告（能力已由某一引擎覆盖）。
    if (!detectorSupported && !zxingReady() && typeof window.jsQR === 'function') {
        rdNote.textContent = window.I18N.t('qrcode.detectorUnavailable');
    }

})();
