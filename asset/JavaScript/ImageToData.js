// ============================================================
//  ImageToData.html 页面脚本
//  主题切换逻辑由 theme.js 提供（全局 setTheme + #themeToggle 点击绑定）
//  语言切换由 i18n.js 提供（data-i18n 自动更新 + languagechange 事件）
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + window.I18N.t() 使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':   { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title':  { zh: '切换主题', en: 'Toggle theme' },

    // 文档标题
    'image.doc.title':     { zh: '图片取模 / 渲染工具', en: 'Image Pixel Extract / Render Tool' },

    // 页面标题 / 副标题
    'image.page.title':    { zh: '🎨 图片取模 / 渲染工具', en: '🎨 Image Pixel Extract / Render' },
    'image.subhead':       { zh: '🔹 支持多种颜色格式的互转 · 取模与数组渲染 · 多种扫描方向 · Floyd 抖动',
                             en: '🔹 Multi-format color conversion · Pixel extract & array render · Multiple scan directions · Floyd dithering' },

    // ① 取模
    'image.p1.title':      { zh: '① 图片取模', en: '① Image Pixel Extract' },
    'image.p1.small':      { zh: '图片 → 数组', en: 'Image → Array' },
    'image.label.image':   { zh: '图片', en: 'Image' },
    'image.btn.choose':    { zh: '📁 选择', en: '📁 Choose' },
    'image.btn.sample':    { zh: '示例', en: 'Sample' },
    'image.label.direction': { zh: '方向', en: 'Direction' },
    'image.opt.scanRow':   { zh: '行扫描', en: 'Row scan' },
    'image.opt.scanCol':   { zh: '列扫描', en: 'Column scan' },
    'image.opt.scanZigzag':{ zh: 'Z字形', en: 'Zigzag' },
    'image.label.bitOrder':{ zh: '位序', en: 'Bit Order' },
    'image.opt.msb':       { zh: 'MSB 优先', en: 'MSB First' },
    'image.opt.lsb':       { zh: 'LSB 优先', en: 'LSB First' },
    'image.label.format':  { zh: '格式', en: 'Format' },
    'image.opt.cArray':    { zh: 'C 数组', en: 'C Array' },
    'image.opt.hexList':   { zh: 'HEX 列表', en: 'HEX List' },
    'image.opt.binary':    { zh: '二进制流', en: 'Binary Stream' },
    'image.label.compress':{ zh: '压缩', en: 'Resize' },
    'image.label.colorRange': { zh: '颜色范围', en: 'Color Range' },
    'image.crange.rgb565': { zh: 'RGB565 (16位)', en: 'RGB565 (16-bit)' },
    'image.crange.bgr565': { zh: 'BGR565 (16位)', en: 'BGR565 (16-bit)' },
    'image.crange.rgb666': { zh: 'RGB666 (18位)', en: 'RGB666 (18-bit)' },
    'image.crange.rgb888': { zh: 'RGB888 (24位)', en: 'RGB888 (24-bit)' },
    'image.crange.argb8888': { zh: 'ARGB8888 (32位)', en: 'ARGB8888 (32-bit)' },
    'image.crange.rgba8888': { zh: 'RGBA8888 (32位)', en: 'RGBA8888 (32-bit)' },
    'image.crange.rgb555': { zh: 'RGB555 (15位)', en: 'RGB555 (15-bit)' },
    'image.crange.rgb444': { zh: 'RGB444 (12位)', en: 'RGB444 (12-bit)' },
    'image.crange.rgb332': { zh: 'RGB332 (8位)', en: 'RGB332 (8-bit)' },
    'image.crange.gray8':  { zh: '灰度8位', en: 'Gray 8-bit' },
    'image.crange.mono1':  { zh: '单色1位', en: 'Mono 1-bit' },
    'image.label.dataFormat': { zh: '数据格式', en: 'Data Format' },
    'image.opt.byteStream':{ zh: '字节流 (8位)', en: 'Byte stream (8-bit)' },
    'image.opt.word':      { zh: '字 (16/32位)', en: 'Word (16/32-bit)' },
    'image.label.byteOrder': { zh: '字节序', en: 'Byte Order' },
    'image.opt.msbFirst':  { zh: '高字节在前', en: 'MSB First' },
    'image.opt.lsbFirst':  { zh: '低字节在前', en: 'LSB First' },
    'image.opt.reverse':   { zh: '反色', en: 'Invert' },
    'image.opt.mirrorH':   { zh: '水平镜像', en: 'Mirror H' },
    'image.opt.mirrorV':   { zh: '垂直镜像', en: 'Mirror V' },
    'image.opt.rotate90':  { zh: '旋转90°', en: 'Rotate 90°' },
    'image.opt.dither':    { zh: '抖动 (Floyd)', en: 'Dither (Floyd)' },
    'image.label.mode':    { zh: '模式', en: 'Mode' },
    'image.opt.fit':       { zh: '等比适配 (原始比例)', en: 'Fit (original ratio)' },
    'image.opt.stretch':   { zh: '拉伸填充 (自定义)', en: 'Stretch (custom)' },
    'image.btn.extract':   { zh: '⬇ 取模', en: '⬇ Extract' },
    'image.btn.copy':      { zh: '📋 复制', en: '📋 Copy' },

    // ② 数组渲染
    'image.p2.title':      { zh: '② 数组渲染', en: '② Array Render' },
    'image.p2.small':      { zh: '数组 → 图片', en: 'Array → Image' },
    'image.label.array':   { zh: '数组', en: 'Array' },
    'image.placeholder.array': { zh: '[0x86, 0x1F, 0x84, 0x10, 0xFF, 0xFF, 0x00, 0x00]', en: '[0x86, 0x1F, 0x84, 0x10, 0xFF, 0xFF, 0x00, 0x00]' },
    'image.label.width':   { zh: '宽：', en: 'W:' },
    'image.label.height':  { zh: '高：', en: 'H:' },
    'image.fmt.gray8':     { zh: '灰度8位', en: 'Gray 8-bit' },
    'image.fmt.mono1':     { zh: '单色1位', en: 'Mono 1-bit' },
    'image.label.inputMode': { zh: '输入模式', en: 'Input Mode' },
    'image.opt.byteMode':  { zh: '字节模式 (2字节/像素)', en: 'Byte mode (2 bytes/pixel)' },
    'image.opt.wordMode':  { zh: '字模式 (1像素/元素)', en: 'Word mode (1 pixel/element)' },
    'image.hint.image2lcd':{ zh: '(兼容 Image2Lcd)', en: '(Image2Lcd compatible)' },
    'image.label.scan':    { zh: '扫描', en: 'Scan' },
    'image.hint.dataArr':  { zh: '数据排列方式', en: 'Data arrangement' },
    'image.btn.render':    { zh: '▶ 渲染', en: '▶ Render' },
    'image.btn.random':    { zh: '🎲 随机', en: '🎲 Random' },
    'image.btn.clear':     { zh: '🧹 清空', en: '🧹 Clear' },

    // ③ 色彩互转
    'image.p3.title':      { zh: '③ 色彩互转', en: '③ Color Conversion' },
    'image.p3.small':      { zh: '任意格式 ↔ 任意格式', en: 'Any format ↔ Any format' },
    'image.label.srcFormat': { zh: '源格式', en: 'Source' },
    'image.label.dstFormat': { zh: '目标格式', en: 'Target' },
    'image.label.srcValue': { zh: '源值', en: 'Source Value' },
    'image.placeholder.srcValue': { zh: '例如: 0x2196F3', en: 'e.g. 0x2196F3' },
    'image.title.pickColor': { zh: '从屏幕取色 (支持 Chrome/Edge 85+)', en: 'Pick color from screen (Chrome/Edge 85+)' },
    'image.btn.pickColor': { zh: '🎨 取色', en: '🎨 Pick' },
    'image.btn.convert':   { zh: '→ 转换', en: '→ Convert' },
    'image.label.result':  { zh: '结果', en: 'Result' },
    'image.btn.copyResult': { zh: '复制', en: 'Copy' },
    'image.label.hex':     { zh: 'HEX', en: 'HEX' },
    'image.placeholder.hex': { zh: '#RRGGBB', en: '#RRGGBB' },

    // 画布
    'image.canvas.title':  { zh: '🖼️ 画布预览', en: '🖼️ Canvas Preview' },
    'image.btn.exportPng': { zh: '⬇ 导出 PNG', en: '⬇ Export PNG' },
    'image.btn.exportArray': { zh: '📋 导出数组', en: '📋 Export Array' },

    // footer
    'image.footer':        { zh: '⚡ 支持多种颜色格式的互转、取模与数组渲染，含多种扫描方向与 Floyd 抖动。',
                             en: '⚡ Multi-format color conversion, pixel extract & array render, with multiple scan directions & Floyd dithering.' },

    // ---- 动态文本 ----
    'image.dyn.compressFit':    { zh: '(等比适配，自动)', en: '(Fit, auto)' },
    'image.dyn.compressStretch':{ zh: '(拉伸填充，自定义)', en: '(Stretch, custom)' },
    'image.dyn.invalid':        { zh: '❌ 无效', en: '❌ Invalid' },
    'image.dyn.gray8':          { zh: '灰度8', en: 'Gray8' },
    'image.dyn.mono1':          { zh: '单色1', en: 'Mono1' },
    'image.dyn.gray8Badge':     { zh: '8位灰度', en: '8-bit Gray' },
    'image.dyn.mono1Badge':     { zh: '1位单色', en: '1-bit Mono' },
    'image.dyn.pixels':         { zh: '像素: ', en: 'Pixels: ' },
    'image.dyn.arrayError':     { zh: '⚠️ 数组格式错误', en: '⚠️ Array format error' },
    'image.dyn.sizeError':      { zh: '⚠️ 尺寸 1~1920 x 1~1080', en: '⚠️ Size 1~1920 x 1~1080' },
    'image.dyn.scanRow':        { zh: '行', en: 'Row' },
    'image.dyn.scanCol':        { zh: '列', en: 'Col' },
    'image.dyn.scanZigzag':     { zh: 'Z字形', en: 'Zigzag' },
    'image.dyn.scanSuffix':     { zh: '扫描', en: ' scan' },
    'image.dyn.pixelsUnit':     { zh: ' 像素', en: ' pixels' },
    'image.dyn.bitsUnit':       { zh: '位', en: 'bits' },
    'image.dyn.cleared':        { zh: '🧹 已清空', en: '🧹 Cleared' },
    'image.dyn.loaded':         { zh: '✅ 已加载: ', en: '✅ Loaded: ' },
    'image.dyn.loadedCode':     { zh: '// 图片已加载，点击 "取模" 生成数据', en: '// Image loaded, click "Extract" to generate data' },
    'image.dyn.noImage':        { zh: '⚠️ 请先导入图片', en: '⚠️ Please import an image first' },
    'image.dyn.takeMod':        { zh: '取模', en: 'Extract' },
    'image.dyn.data':           { zh: '数据', en: 'Data' },
    'image.dyn.binaryStream':   { zh: '二进制流', en: 'Binary stream' },
    'image.dyn.bitPerPixel':    { zh: '位/像素', en: 'bits/pixel' },
    'image.dyn.modeFit':        { zh: '等比', en: 'Fit' },
    'image.dyn.modeStretch':    { zh: '拉伸', en: 'Stretch' },
    'image.dyn.packByte':       { zh: '字节流', en: 'Byte stream' },
    'image.dyn.packWord':       { zh: '字', en: 'Word' },
    'image.dyn.extractDone':    { zh: '⏱ 取模完成', en: '⏱ Extract done' },
    'image.dyn.extractStatus':  { zh: '✅ 取模完成', en: '✅ Extract done' },
    'image.dyn.copyFail':       { zh: '复制失败，请手动复制', en: 'Copy failed, please copy manually' },
    'image.dyn.switchedScan':   { zh: '🔄 切换为', en: '🔄 Switched to' },
    'image.dyn.arrayCopied':    { zh: '✅ 数组已复制', en: '✅ Array copied' },
    'image.dyn.copiedToClipboard': { zh: '✅ 已复制到剪贴板', en: '✅ Copied to clipboard' },
    'image.dyn.noExtract':      { zh: '⚠️ 请先取模', en: '⚠️ Please extract first' },
    'image.dyn.unsupported':    { zh: '⚠️ 当前浏览器不支持屏幕取色，请使用 Chrome 85+ 或 Edge 85+', en: '⚠️ Browser does not support EyeDropper, use Chrome 85+ or Edge 85+' },
    'image.dyn.picking':        { zh: '⏳ 取色中…', en: '⏳ Picking...' },
    'image.dyn.clickToPick':    { zh: '👆 请点击屏幕上的颜色', en: '👆 Click a color on screen' },
    'image.dyn.pickSuccess':    { zh: '✅ 取色成功: ', en: '✅ Picked: ' },
    'image.dyn.cancelled':      { zh: '↩️ 取色已取消', en: '↩️ Pick cancelled' },
    'image.dyn.pickFail':       { zh: '❌ 取色失败: ', en: '❌ Pick failed: ' },
    'image.dyn.unknownError':   { zh: '未知错误', en: 'Unknown error' },
    'image.dyn.formatSwitched': { zh: '🔄 源格式已切换，可重新取色', en: '🔄 Source format switched, can re-pick' },
    'image.dyn.ready':          { zh: '✅ 就绪 (行扫描, 字节模式)', en: '✅ Ready (row scan, byte mode)' },
    'image.dyn.placeholderCode':{ zh: '// 导入图片后点击 "取模" 生成数据', en: '// Import an image then click "Extract" to generate data' }
};

(function() {
    // ---- DOM 引用 ----
    const imageFileInput = document.getElementById('imageFileInput');
    const loadSampleBtn = document.getElementById('loadSampleBtn');
    const importPreviewImg = document.getElementById('importPreviewImg');
    const importFileInfo = document.getElementById('importFileInfo');
    const compressWidth = document.getElementById('compressWidth');
    const compressHeight = document.getElementById('compressHeight');
    const compressMode = document.getElementById('compressMode');
    const compressHint = document.getElementById('compressHint');
    const scanDir = document.getElementById('scanDir');
    const bitOrder = document.getElementById('bitOrder');
    const outputFormat = document.getElementById('outputFormat');
    const colorRange = document.getElementById('colorRange');
    const rangeBadge = document.getElementById('rangeBadge');
    const dataPack = document.getElementById('dataPack');
    const byteOrder = document.getElementById('byteOrder');
    const optReverse = document.getElementById('optReverse');
    const optMirrorH = document.getElementById('optMirrorH');
    const optMirrorV = document.getElementById('optMirrorV');
    const optRotate90 = document.getElementById('optRotate90');
    const optDither = document.getElementById('optDither');
    const importConvertBtn = document.getElementById('importConvertBtn');
    const copyImportArrayBtn = document.getElementById('copyImportArrayBtn');
    const importStatus = document.getElementById('importStatus');
    const codeOutput = document.getElementById('codeOutput');

    const arrayInput = document.getElementById('arrayInput');
    const imgWidth = document.getElementById('imgWidth');
    const imgHeight = document.getElementById('imgHeight');
    const arrayFormat = document.getElementById('arrayFormat');
    const arrayScanDir = document.getElementById('arrayScanDir');
    const inputPack = document.getElementById('inputPack');
    const inputByteOrder = document.getElementById('inputByteOrder');
    const renderArrayBtn = document.getElementById('renderArrayBtn');
    const randomArrayBtn = document.getElementById('randomArrayBtn');
    const clearCanvasBtn = document.getElementById('clearCanvasBtn');
    const arrayStatus = document.getElementById('arrayStatus');

    const srcFormat = document.getElementById('srcFormat');
    const dstFormat = document.getElementById('dstFormat');
    const srcValue = document.getElementById('srcValue');
    const convertBtn = document.getElementById('convertBtn');
    const srcSwatch = document.getElementById('srcSwatch');
    const srcColorInfo = document.getElementById('srcColorInfo');
    const srcTag = document.getElementById('srcTag');
    const dstSwatch = document.getElementById('dstSwatch');
    const dstColorInfo = document.getElementById('dstColorInfo');
    const dstTag = document.getElementById('dstTag');
    const dstResult = document.getElementById('dstResult');
    const copyDstResultBtn = document.getElementById('copyDstResultBtn');
    const srcDetail = document.getElementById('srcDetail');
    const dstDetail = document.getElementById('dstDetail');
    const convR = document.getElementById('convR');
    const convG = document.getElementById('convG');
    const convB = document.getElementById('convB');
    const convA = document.getElementById('convA');
    const convRVal = document.getElementById('convRVal');
    const convGVal = document.getElementById('convGVal');
    const convBVal = document.getElementById('convBVal');
    const convAVal = document.getElementById('convAVal');
    const convHexInput = document.getElementById('convHexInput');
    const convColorPicker = document.getElementById('convColorPicker');

    // ---- 新增：取色按钮 + 状态提示 ----
    const pickColorBtn = document.getElementById('pickColorBtn');
    const colorPickStatus = document.getElementById('colorPickStatus');

    const mainCanvas = document.getElementById('mainCanvas');
    const ctx = mainCanvas.getContext('2d');
    const canvasWrapper = document.getElementById('canvasWrapper');
    const canvasSizeLabel = document.getElementById('canvasSizeLabel');
    const pixelCountLabel = document.getElementById('pixelCountLabel');
    const renderTime = document.getElementById('renderTime');
    const exportPngBtn = document.getElementById('exportPngBtn');
    const exportArrayBtn = document.getElementById('exportArrayBtn');

    // ============================================================
    //  状态跟踪（用于语言切换时重新渲染动态文本）
    // ============================================================
    // arrayStatus 状态: 'ready' | 'cleared' | 'rendered' | 'error_size' | 'error_format' | 'click' | 'switched' | 'copied'
    let arrayStatusInfo = { type: 'ready', data: {} };
    // importStatus 状态: 'placeholder' | 'loaded' | 'noimage' | 'extracted' | 'copied' | 'noextract'
    let importStatusInfo = { type: 'placeholder', data: {} };
    // colorPickStatus 状态: 'empty' | 'unsupported' | 'picking' | 'success' | 'cancelled' | 'failed' | 'switched'
    let colorPickInfo = { type: 'empty', data: {} };
    // codeOutput 状态: 'placeholder' | 'loaded' | 'extracted'
    let codeOutputInfo = { type: 'placeholder', data: {} };
    // 画布尺寸（用于语言切换时更新 pixelCountLabel）
    let lastCanvasW = 2, lastCanvasH = 2;
    // renderTime 状态: { type: 'time', ms } | { type: 'extractDone' }
    let renderTimeInfo = { type: 'time', ms: 0 };
    // 取色按钮是否正在取色
    let isPicking = false;

    // ---- 辅助 ----
    function toUint32(v) { return v >>> 0; }

    function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

    // ============================================================
    //  i18n 辅助函数
    // ============================================================
    /** 获取扫描方向名称（已翻译） */
    function scanName(scan) {
        if (scan === 'row') return window.I18N.t('image.dyn.scanRow');
        if (scan === 'col') return window.I18N.t('image.dyn.scanCol');
        if (scan === 'zigzag') return window.I18N.t('image.dyn.scanZigzag');
        return scan;
    }

    /** 获取格式标签名（gray8/mono1 需翻译，其余为技术名称） */
    function getTagName(mode) {
        const tags = { 'rgb565': 'RGB565', 'bgr565': 'BGR565', 'rgb666': 'RGB666', 'rgb888': 'RGB888',
            'argb8888': 'ARGB8888', 'rgba8888': 'RGBA8888', 'rgb555': 'RGB555', 'rgb444': 'RGB444',
            'rgb332': 'RGB332' };
        if (tags[mode]) return tags[mode];
        if (mode === 'gray8') return window.I18N.t('image.dyn.gray8');
        if (mode === 'mono1') return window.I18N.t('image.dyn.mono1');
        return 'RGB';
    }

    /** 获取颜色范围标签（用于取模输出注释，gray8/mono1 需翻译） */
    function getRangeLabel(range) {
        const labels = { 'rgb565': 'RGB565', 'bgr565': 'BGR565', 'rgb666': 'RGB666', 'rgb888': 'RGB888',
            'argb8888': 'ARGB8888', 'rgba8888': 'RGBA8888', 'rgb555': 'RGB555', 'rgb444': 'RGB444',
            'rgb332': 'RGB332' };
        if (labels[range]) return labels[range];
        if (range === 'gray8') return window.I18N.t('image.dyn.gray8');
        if (range === 'mono1') return window.I18N.t('image.dyn.mono1');
        return range.toUpperCase();
    }

    /** 获取颜色范围徽章标签（用于 rangeBadge，gray8/mono1 需翻译） */
    function getRangeBadgeLabel(range) {
        const labels = { 'rgb565': 'R5 G6 B5', 'bgr565': 'B5 G6 R5', 'rgb666': 'R6 G6 B6', 'rgb888': 'R8 G8 B8',
            'argb8888': 'A8 R8 G8 B8', 'rgba8888': 'R8 G8 B8 A8', 'rgb555': 'R5 G5 B5', 'rgb444': 'R4 G4 B4',
            'rgb332': 'R3 G3 B2' };
        if (labels[range]) return labels[range];
        if (range === 'gray8') return window.I18N.t('image.dyn.gray8Badge');
        if (range === 'mono1') return window.I18N.t('image.dyn.mono1Badge');
        return 'R5 G6 B5';
    }

    function getBitsPerPixel(mode) {
        switch (mode) {
            case 'rgb565':
            case 'bgr565':
                return 16;
            case 'rgb666':
                return 18;
            case 'rgb888':
                return 24;
            case 'argb8888':
            case 'rgba8888':
                return 32;
            case 'rgb555':
                return 15;
            case 'rgb444':
                return 12;
            case 'rgb332':
                return 8;
            case 'gray8':
                return 8;
            case 'mono1':
                return 1;
            default:
                return 24;
        }
    }

    function rgbToHex(r, g, b) {
        const toHex = (c) => clamp(Math.round(c), 0, 255).toString(16).padStart(2, '0').toUpperCase();
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    // ---- 核心颜色转换 ----
    function convertColor(r, g, b, a, mode) {
        r = clamp(r, 0, 255);
        g = clamp(g, 0, 255);
        b = clamp(b, 0, 255);
        a = (a !== undefined) ? clamp(a, 0, 255) : 255;
        let val = 0,
            bits = 0,
            rr = r,
            gg = g,
            bb = b,
            aa = a,
            hexStr = '';
        switch (mode) {
            case 'rgb565': {
                const r5 = Math.round(r / 255 * 31),
                    g6 = Math.round(g / 255 * 63),
                    b5 = Math.round(b / 255 * 31);
                val = (r5 << 11) | (g6 << 5) | b5;
                bits = 16;
                rr = Math.round(r5 / 31 * 255);
                gg = Math.round(g6 / 63 * 255);
                bb = Math.round(b5 / 31 * 255);
                hexStr = '0x' + val.toString(16).padStart(4, '0').toUpperCase();
                break;
            }
            case 'bgr565': {
                const b5 = Math.round(b / 255 * 31),
                    g6 = Math.round(g / 255 * 63),
                    r5 = Math.round(r / 255 * 31);
                val = (b5 << 11) | (g6 << 5) | r5;
                bits = 16;
                rr = Math.round(r5 / 31 * 255);
                gg = Math.round(g6 / 63 * 255);
                bb = Math.round(b5 / 31 * 255);
                hexStr = '0x' + val.toString(16).padStart(4, '0').toUpperCase();
                break;
            }
            case 'rgb666': {
                const r6 = Math.round(r / 255 * 63),
                    g6b = Math.round(g / 255 * 63),
                    b6 = Math.round(b / 255 * 63);
                val = (r6 << 12) | (g6b << 6) | b6;
                bits = 18;
                rr = Math.round(r6 / 63 * 255);
                gg = Math.round(g6b / 63 * 255);
                bb = Math.round(b6 / 63 * 255);
                hexStr = '0x' + val.toString(16).padStart(6, '0').toUpperCase();
                break;
            }
            case 'rgb888': {
                val = (r << 16) | (g << 8) | b;
                bits = 24;
                rr = r;
                gg = g;
                bb = b;
                hexStr = '0x' + val.toString(16).padStart(6, '0').toUpperCase();
                break;
            }
            case 'argb8888': {
                val = toUint32((a << 24) | (r << 16) | (g << 8) | b);
                bits = 32;
                rr = r;
                gg = g;
                bb = b;
                aa = a;
                hexStr = '0x' + val.toString(16).padStart(8, '0').toUpperCase();
                break;
            }
            case 'rgba8888': {
                val = toUint32((r << 24) | (g << 16) | (b << 8) | a);
                bits = 32;
                rr = r;
                gg = g;
                bb = b;
                aa = a;
                hexStr = '0x' + val.toString(16).padStart(8, '0').toUpperCase();
                break;
            }
            case 'rgb555': {
                const r4 = Math.round(r / 255 * 31),
                    g4 = Math.round(g / 255 * 31),
                    b4 = Math.round(b / 255 * 31);
                val = (r4 << 10) | (g4 << 5) | b4;
                bits = 15;
                rr = Math.round(r4 / 31 * 255);
                gg = Math.round(g4 / 31 * 255);
                bb = Math.round(b4 / 31 * 255);
                hexStr = '0x' + val.toString(16).padStart(4, '0').toUpperCase();
                break;
            }
            case 'rgb444': {
                const r3 = Math.round(r / 255 * 15),
                    g3 = Math.round(g / 255 * 15),
                    b3 = Math.round(b / 255 * 15);
                val = (r3 << 8) | (g3 << 4) | b3;
                bits = 12;
                rr = Math.round(r3 / 15 * 255);
                gg = Math.round(g3 / 15 * 255);
                bb = Math.round(b3 / 15 * 255);
                hexStr = '0x' + val.toString(16).padStart(3, '0').toUpperCase();
                break;
            }
            case 'rgb332': {
                const r2 = Math.round(r / 255 * 7),
                    g2 = Math.round(g / 255 * 7),
                    b2 = Math.round(b / 255 * 3);
                val = (r2 << 5) | (g2 << 2) | b2;
                bits = 8;
                rr = Math.round(r2 / 7 * 255);
                gg = Math.round(g2 / 7 * 255);
                bb = Math.round(b2 / 3 * 255);
                hexStr = '0x' + val.toString(16).padStart(2, '0').toUpperCase();
                break;
            }
            case 'gray8': {
                const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
                val = gray;
                bits = 8;
                rr = gray;
                gg = gray;
                bb = gray;
                hexStr = '0x' + val.toString(16).padStart(2, '0').toUpperCase();
                break;
            }
            case 'mono1': {
                const mono = (0.299 * r + 0.587 * g + 0.114 * b) > 127 ? 1 : 0;
                val = mono;
                bits = 1;
                rr = mono * 255;
                gg = mono * 255;
                bb = mono * 255;
                hexStr = '0x' + val.toString(16).toUpperCase();
                break;
            }
            default: {
                val = (r << 16) | (g << 8) | b;
                bits = 24;
                hexStr = '0x' + val.toString(16).padStart(6, '0').toUpperCase();
            }
        }
        return { val, bits, rr, gg, bb, aa, hexStr };
    }

    function decodeColor(val, mode) {
        let r = 0,
            g = 0,
            b = 0,
            a = 255,
            rBits = 0,
            gBits = 0,
            bBits = 0;
        switch (mode) {
            case 'rgb565': {
                const r5 = (val >> 11) & 0x1F,
                    g6 = (val >> 5) & 0x3F,
                    b5 = val & 0x1F;
                r = Math.round(r5 / 31 * 255);
                g = Math.round(g6 / 63 * 255);
                b = Math.round(b5 / 31 * 255);
                rBits = 5;
                gBits = 6;
                bBits = 5;
                break;
            }
            case 'bgr565': {
                const b5 = (val >> 11) & 0x1F,
                    g6 = (val >> 5) & 0x3F,
                    r5 = val & 0x1F;
                r = Math.round(r5 / 31 * 255);
                g = Math.round(g6 / 63 * 255);
                b = Math.round(b5 / 31 * 255);
                rBits = 5;
                gBits = 6;
                bBits = 5;
                break;
            }
            case 'rgb666': {
                const r6 = (val >> 12) & 0x3F,
                    g6b = (val >> 6) & 0x3F,
                    b6 = val & 0x3F;
                r = Math.round(r6 / 63 * 255);
                g = Math.round(g6b / 63 * 255);
                b = Math.round(b6 / 63 * 255);
                rBits = 6;
                gBits = 6;
                bBits = 6;
                break;
            }
            case 'rgb888': {
                r = (val >> 16) & 0xFF;
                g = (val >> 8) & 0xFF;
                b = val & 0xFF;
                rBits = 8;
                gBits = 8;
                bBits = 8;
                break;
            }
            case 'argb8888': {
                val = toUint32(val);
                a = (val >>> 24) & 0xFF;
                r = (val >>> 16) & 0xFF;
                g = (val >>> 8) & 0xFF;
                b = val & 0xFF;
                rBits = 8;
                gBits = 8;
                bBits = 8;
                break;
            }
            case 'rgba8888': {
                val = toUint32(val);
                r = (val >>> 24) & 0xFF;
                g = (val >>> 16) & 0xFF;
                b = (val >>> 8) & 0xFF;
                a = val & 0xFF;
                rBits = 8;
                gBits = 8;
                bBits = 8;
                break;
            }
            case 'rgb555': {
                const r4 = (val >> 10) & 0x1F,
                    g4 = (val >> 5) & 0x1F,
                    b4 = val & 0x1F;
                r = Math.round(r4 / 31 * 255);
                g = Math.round(g4 / 31 * 255);
                b = Math.round(b4 / 31 * 255);
                rBits = 5;
                gBits = 5;
                bBits = 5;
                break;
            }
            case 'rgb444': {
                const r3 = (val >> 8) & 0xF,
                    g3 = (val >> 4) & 0xF,
                    b3 = val & 0xF;
                r = Math.round(r3 / 15 * 255);
                g = Math.round(g3 / 15 * 255);
                b = Math.round(b3 / 15 * 255);
                rBits = 4;
                gBits = 4;
                bBits = 4;
                break;
            }
            case 'rgb332': {
                const r2 = (val >> 5) & 0x7,
                    g2 = (val >> 2) & 0x7,
                    b2 = val & 0x3;
                r = Math.round(r2 / 7 * 255);
                g = Math.round(g2 / 7 * 255);
                b = Math.round(b2 / 3 * 255);
                rBits = 3;
                gBits = 3;
                bBits = 2;
                break;
            }
            case 'gray8': {
                r = g = b = val & 0xFF;
                rBits = 8;
                gBits = 8;
                bBits = 8;
                break;
            }
            case 'mono1': {
                const mono = val & 0x1;
                r = g = b = mono ? 255 : 0;
                rBits = 1;
                gBits = 1;
                bBits = 1;
                break;
            }
            default: {
                r = (val >> 16) & 0xFF;
                g = (val >> 8) & 0xFF;
                b = val & 0xFF;
                rBits = 8;
                gBits = 8;
                bBits = 8;
            }
        }
        return { r, g, b, a, rBits, gBits, bBits };
    }

    function parseHexValue(str, mode) {
        let s = str.trim();
        if (s.startsWith('0x') || s.startsWith('0X')) s = s.substring(2);
        s = s.replace(/,/g, '').trim();
        if (s === '') return null;
        let maxVal = 0;
        switch (mode) {
            case 'rgb565':
                maxVal = 0xFFFF;
                break;
            case 'bgr565':
                maxVal = 0xFFFF;
                break;
            case 'rgb666':
                maxVal = 0x3FFFF;
                break;
            case 'rgb888':
                maxVal = 0xFFFFFF;
                break;
            case 'argb8888':
                maxVal = 0xFFFFFFFF;
                break;
            case 'rgba8888':
                maxVal = 0xFFFFFFFF;
                break;
            case 'rgb555':
                maxVal = 0x7FFF;
                break;
            case 'rgb444':
                maxVal = 0xFFF;
                break;
            case 'rgb332':
                maxVal = 0xFF;
                break;
            case 'gray8':
                maxVal = 0xFF;
                break;
            case 'mono1':
                maxVal = 0x1;
                break;
            default:
                maxVal = 0xFFFFFF;
        }
        const parsed = parseInt(s, 16);
        if (isNaN(parsed)) return null;
        if (maxVal > 0xFFFFFF) {
            const val = toUint32(parsed);
            if (val > maxVal) return null;
            return val;
        }
        if (parsed < 0 || parsed > maxVal) return null;
        return parsed;
    }

    function parseArray(str, mode) {
        let cleaned = str.replace(/[\[\]]/g, '').trim();
        if (cleaned === '') return [];
        const parts = cleaned.split(',').map(s => s.trim()).filter(s => s !== '');
        const result = [];
        for (let p of parts) {
            const val = parseHexValue(p, mode);
            if (val === null) return null;
            result.push(val);
        }
        return result;
    }

    // ---- 数组转字符串（支持字/字节模式） ----
    function arrayToStr(arr, mode, packType = 'byte', byteOrderVal = 'msb') {
        const bitsPerPixel = getBitsPerPixel(mode);
        let pad = 4;
        if (packType === 'byte') {
            pad = 2;
        } else {
            if (bitsPerPixel <= 8) pad = 2;
            else if (bitsPerPixel <= 16) pad = 4;
            else if (bitsPerPixel <= 24) pad = 6;
            else pad = 8;
        }

        let parts = [];
        if (packType === 'byte') {
            let bytesPerPixel = Math.ceil(bitsPerPixel / 8);
            for (let v of arr) {
                let temp = [];
                for (let i = bytesPerPixel - 1; i >= 0; i--) {
                    temp.push((v >> (i * 8)) & 0xFF);
                }
                if (byteOrderVal === 'msb') {
                    temp.forEach(b => parts.push('0x' + b.toString(16).padStart(2, '0').toUpperCase()));
                } else {
                    temp.reverse().forEach(b => parts.push('0x' + b.toString(16).padStart(2, '0').toUpperCase()));
                }
            }
        } else {
            parts = arr.map(v => '0x' + v.toString(16).padStart(pad, '0').toUpperCase());
        }

        const lines = [];
        for (let i = 0; i < parts.length; i += 8) {
            lines.push(parts.slice(i, i + 8).join(', '));
        }
        return '[' + lines.join(',\n ') + ']';
    }

    // ============================================================
    //  动态文本渲染函数（语言切换时统一调用）
    // ============================================================
    function renderArrayStatus() {
        const info = arrayStatusInfo;
        switch (info.type) {
            case 'ready':
                arrayStatus.innerHTML = window.I18N.t('image.dyn.ready');
                break;
            case 'cleared':
                arrayStatus.innerHTML = window.I18N.t('image.dyn.cleared');
                break;
            case 'rendered':
                arrayStatus.innerHTML = `✅ ${scanName(info.data.scan)}${window.I18N.t('image.dyn.scanSuffix')} ${info.data.total}${window.I18N.t('image.dyn.pixelsUnit')} ${info.data.time}ms`;
                break;
            case 'error_size':
                arrayStatus.innerHTML = '<span class="error-msg">' + window.I18N.t('image.dyn.sizeError') + '</span>';
                break;
            case 'error_format':
                arrayStatus.innerHTML = '<span class="error-msg">' + window.I18N.t('image.dyn.arrayError') + '</span>';
                break;
            case 'click':
                arrayStatus.innerHTML = `📍 (${info.data.x},${info.data.y}) ${info.data.mode}: ${info.data.hexStr}`;
                break;
            case 'switched':
                arrayStatus.innerHTML = `${window.I18N.t('image.dyn.switchedScan')} ${scanName(info.data.scan)}${window.I18N.t('image.dyn.scanSuffix')}`;
                break;
            case 'copied':
                arrayStatus.innerHTML = window.I18N.t('image.dyn.arrayCopied');
                break;
        }
    }

    function renderImportStatus() {
        const info = importStatusInfo;
        switch (info.type) {
            case 'placeholder':
                importStatus.innerHTML = '';
                break;
            case 'loaded':
                importStatus.innerHTML = `<span class="status-ok">${window.I18N.t('image.dyn.loaded')}${info.data.w}x${info.data.h}</span>`;
                break;
            case 'noimage':
                importStatus.innerHTML = '<span class="error-msg">' + window.I18N.t('image.dyn.noImage') + '</span>';
                break;
            case 'extracted':
                var modeLabel = info.data.mode === 'fit' ? window.I18N.t('image.dyn.modeFit') : window.I18N.t('image.dyn.modeStretch');
                var scanLabel = scanName(info.data.scan);
                var packLabel = info.data.pack === 'byte' ? window.I18N.t('image.dyn.packByte') : window.I18N.t('image.dyn.packWord');
                importStatus.innerHTML = `<span class="status-ok">${window.I18N.t('image.dyn.extractStatus')} [${modeLabel}] ${scanLabel}${window.I18N.t('image.dyn.scanSuffix')}: ${info.data.w}x${info.data.h} (${info.data.total}${window.I18N.t('image.dyn.pixelsUnit')}, ${info.data.bits}${window.I18N.t('image.dyn.bitsUnit')}, ${packLabel})</span>`;
                break;
            case 'copied':
                importStatus.innerHTML = window.I18N.t('image.dyn.copiedToClipboard');
                break;
            case 'noextract':
                importStatus.innerHTML = '<span class="error-msg">' + window.I18N.t('image.dyn.noExtract') + '</span>';
                break;
        }
    }

    function renderColorPickStatus() {
        const info = colorPickInfo;
        switch (info.type) {
            case 'empty':
                colorPickStatus.innerHTML = '';
                break;
            case 'unsupported':
                colorPickStatus.innerHTML = '<span class="error-msg">' + window.I18N.t('image.dyn.unsupported') + '</span>';
                break;
            case 'picking':
                colorPickStatus.innerHTML = '<span class="status-info">' + window.I18N.t('image.dyn.clickToPick') + '</span>';
                break;
            case 'success':
                colorPickStatus.innerHTML = `<span class="status-ok">${window.I18N.t('image.dyn.pickSuccess')}${info.data.hex} → ${info.data.hexStr} (${info.data.srcMode})</span>`;
                break;
            case 'cancelled':
                colorPickStatus.innerHTML = '<span class="status-info">' + window.I18N.t('image.dyn.cancelled') + '</span>';
                break;
            case 'failed':
                colorPickStatus.innerHTML = `<span class="error-msg">${window.I18N.t('image.dyn.pickFail')}${info.data.msg}</span>`;
                break;
            case 'switched':
                colorPickStatus.innerHTML = '<span class="status-info">' + window.I18N.t('image.dyn.formatSwitched') + '</span>';
                break;
        }
    }

    /** 根据状态信息构建取模输出字符串 */
    function buildOutputString(d) {
        const rangeLabel = getRangeLabel(d.range);
        const wStr = d.w, hStr = d.h;
        const outType = d.outType, outPad = d.outPad, outBits = d.outBits;
        const count = d.outputData.length;
        const packType = d.packType;

        const parts = d.outputData.map(v => {
            if (packType === 'byte') return '0x' + v.toString(16).padStart(2, '0').toUpperCase();
            else return '0x' + v.toString(16).padStart(outPad, '0').toUpperCase();
        });
        const lines = [];
        for (let i = 0; i < parts.length; i += 8) lines.push(parts.slice(i, i + 8).join(', '));

        if (d.fmt === 'c_array') {
            let s = `// ${rangeLabel} ${window.I18N.t('image.dyn.takeMod')}: ${wStr}x${hStr}\n`;
            s += `const ${outType} image_${wStr}x${hStr}[${count}] = {\n  `;
            s += lines.join(',\n  ');
            s += '\n};';
            return s;
        } else if (d.fmt === 'hex_list') {
            let s = `// ${rangeLabel} ${window.I18N.t('image.dyn.data')}: ${wStr}x${hStr}\n`;
            s += lines.join(',\n');
            return s;
        } else {
            let s = `// ${window.I18N.t('image.dyn.binaryStream')} (${outBits}${window.I18N.t('image.dyn.bitPerPixel')}) ${wStr}x${hStr}\n`;
            const bytes = [];
            if (packType === 'byte') {
                for (let v of d.outputData) bytes.push(v & 0xFF);
            } else {
                const bp = Math.ceil(d.maxBits / 8);
                for (let v of d.finalData) {
                    for (let i = bp - 1; i >= 0; i--) bytes.push((v >> (i * 8)) & 0xFF);
                }
            }
            let hexStr = '';
            for (let b of bytes) hexStr += b.toString(16).padStart(2, '0').toUpperCase() + ' ';
            s += hexStr;
            return s;
        }
    }

    function renderCodeOutput() {
        const info = codeOutputInfo;
        switch (info.type) {
            case 'placeholder':
                codeOutput.textContent = window.I18N.t('image.dyn.placeholderCode');
                break;
            case 'loaded':
                codeOutput.textContent = window.I18N.t('image.dyn.loadedCode');
                break;
            case 'extracted':
                codeOutput.textContent = buildOutputString(info.data);
                break;
        }
    }

    function renderCanvasLabels() {
        pixelCountLabel.textContent = window.I18N.t('image.dyn.pixels') + (lastCanvasW * lastCanvasH);
        if (renderTimeInfo.type === 'time') {
            renderTime.textContent = `⏱ ${renderTimeInfo.ms.toFixed(1)}ms`;
        } else if (renderTimeInfo.type === 'extractDone') {
            renderTime.textContent = window.I18N.t('image.dyn.extractDone');
        }
    }

    // ---- 模块1: 压缩控制 ----
    function updateCompressControls() {
        const mode = compressMode.value;
        const isFit = mode === 'fit';
        compressWidth.disabled = isFit;
        compressHeight.disabled = isFit;
        compressWidth.style.opacity = isFit ? '0.5' : '1';
        compressHeight.style.opacity = isFit ? '0.5' : '1';
        compressHint.textContent = isFit ? window.I18N.t('image.dyn.compressFit') : window.I18N.t('image.dyn.compressStretch');
    }

    // ---- 模块3: 转换 ----
    function performConversion() {
        const srcMode = srcFormat.value,
            dstMode = dstFormat.value,
            raw = srcValue.value;
        const srcVal = parseHexValue(raw, srcMode);
        if (srcVal === null) {
            srcSwatch.style.backgroundColor = '#ccc';
            srcColorInfo.textContent = window.I18N.t('image.dyn.invalid');
            dstSwatch.style.backgroundColor = '#ccc';
            dstColorInfo.textContent = window.I18N.t('image.dyn.invalid');
            dstResult.value = '';
            return;
        }
        const decoded = decodeColor(srcVal, srcMode);
        const srcHex = rgbToHex(decoded.r, decoded.g, decoded.b);
        srcSwatch.style.backgroundColor = srcHex;
        srcColorInfo.textContent = srcHex;
        srcTag.textContent = getTagName(srcMode);
        srcDetail.textContent = `R:${decoded.r} G:${decoded.g} B:${decoded.b}` + (srcMode === 'argb8888' || srcMode ===
            'rgba8888' ? ` A:${decoded.a}` : '');
        const result = convertColor(decoded.r, decoded.g, decoded.b, decoded.a, dstMode);
        const dstHex = rgbToHex(result.rr, result.gg, result.bb);
        dstSwatch.style.backgroundColor = dstHex;
        dstColorInfo.textContent = dstHex;
        dstTag.textContent = getTagName(dstMode);
        dstResult.value = result.hexStr;
        const dstDecoded = decodeColor(result.val, dstMode);
        dstDetail.textContent = `R:${dstDecoded.r} G:${dstDecoded.g} B:${dstDecoded.b}` + (dstMode === 'argb8888' || dstMode ===
            'rgba8888' ? ` A:${dstDecoded.a}` : '');
        convR.value = decoded.r;
        convG.value = decoded.g;
        convB.value = decoded.b;
        convA.value = decoded.a;
        convRVal.textContent = decoded.r;
        convGVal.textContent = decoded.g;
        convBVal.textContent = decoded.b;
        convAVal.textContent = decoded.a;
        convHexInput.value = srcHex;
        convColorPicker.value = srcHex;
        dstResult.dataset.hex = dstHex;
        dstResult.dataset.val = result.val;
        dstResult.dataset.mode = dstMode;
    }

    function updateFromSliders() {
        const r = parseInt(convR.value, 10),
            g = parseInt(convG.value, 10),
            b = parseInt(convB.value, 10),
            a = parseInt(convA.value, 10);
        convRVal.textContent = r;
        convGVal.textContent = g;
        convBVal.textContent = b;
        convAVal.textContent = a;
        const hex = rgbToHex(r, g, b);
        convHexInput.value = hex;
        convColorPicker.value = hex;
        const srcMode = srcFormat.value;
        const srcResult = convertColor(r, g, b, a, srcMode);
        srcValue.value = srcResult.hexStr;
        performConversion();
    }

    // ---- 模块2: 渲染 ----
    function renderCanvasWithScan(width, height, dataArray, mode, scanDirValue) {
        const w = clamp(width, 1, 1920),
            h = clamp(height, 1, 1080);
        const total = w * h;
        const pixels = [];
        for (let i = 0; i < total; i++) pixels.push(i < dataArray.length ? clamp(dataArray[i], 0, 0xFFFFFFFF) : 0);

        let matrix = [];
        if (scanDirValue === 'row') {
            let idx = 0;
            for (let y = 0; y < h; y++) { let row = []; for (let x = 0; x < w; x++) row.push(pixels[idx++]);
                matrix.push(row); }
        } else if (scanDirValue === 'col') {
            let idx = 0;
            for (let x = 0; x < w; x++) { for (let y = 0; y < h; y++) { if (!matrix[y]) matrix[y] = [];
                    matrix[y][x] = pixels[idx++]; } }
        } else if (scanDirValue === 'zigzag') {
            let idx = 0;
            for (let y = 0; y < h; y++) { let row = []; if (y % 2 === 0) { for (let x = 0; x < w; x++) row.push(
                        pixels[idx++]); } else { for (let x = w - 1; x >= 0; x--) row.push(pixels[idx++]); }
                matrix.push(row); }
        }
        const flatPixels = [];
        for (let y = 0; y < h; y++)
            for (let x = 0; x < w; x++) flatPixels.push(matrix[y][x]);

        mainCanvas.width = w;
        mainCanvas.height = h;
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;
        for (let i = 0; i < total; i++) {
            const decoded = decodeColor(flatPixels[i], mode);
            const idx = i * 4;
            data[idx] = clamp(decoded.r, 0, 255);
            data[idx + 1] = clamp(decoded.g, 0, 255);
            data[idx + 2] = clamp(decoded.b, 0, 255);
            data[idx + 3] = (mode === 'argb8888' || mode === 'rgba8888') ? clamp(decoded.a, 0, 255) : 255;
        }
        ctx.putImageData(imageData, 0, 0);

        canvasSizeLabel.textContent = `${w} x ${h}`;
        lastCanvasW = w;
        lastCanvasH = h;
        pixelCountLabel.textContent = window.I18N.t('image.dyn.pixels') + total;
        const wrapperWidth = canvasWrapper.clientWidth - 24;
        let displaySize = Math.min(wrapperWidth, 400);
        if (w > 400 || h > 400) { const ratio = Math.min(400 / w, 400 / h, 1);
            displaySize = Math.min(w * ratio, 400); }
        const displayW = Math.max(30, Math.min(displaySize, w * 2));
        mainCanvas.style.width = Math.min(displayW, wrapperWidth) + 'px';
        mainCanvas.style.height = 'auto';
        window._currentMatrix = matrix;
        window._currentScanDir = scanDirValue;
        window._currentMode = mode;
        return flatPixels;
    }

    function renderFromArray() {
        const mode = arrayFormat.value;
        const raw = arrayInput.value;
        let parsed = parseArray(raw, mode);
        if (parsed === null) {
            arrayStatusInfo = { type: 'error_format', data: {} };
            renderArrayStatus();
            return;
        }

        const packType = inputPack.value;
        const order = inputByteOrder.value;
        if (packType === 'byte') {
            let merged = [];
            for (let i = 0; i < parsed.length; i += 2) {
                if (i + 1 < parsed.length) {
                    let b1 = parsed[i],
                        b2 = parsed[i + 1];
                    let val = (order === 'msb') ? ((b1 << 8) | b2) : ((b2 << 8) | b1);
                    merged.push(val);
                }
            }
            parsed = merged;
        }

        const w = parseInt(imgWidth.value, 10) || 2,
            h = parseInt(imgHeight.value, 10) || 2;
        if (w < 1 || w > 1920 || h < 1 || h > 1080) {
            arrayStatusInfo = { type: 'error_size', data: {} };
            renderArrayStatus();
            return;
        }
        const scan = arrayScanDir.value;
        const start = performance.now();
        renderCanvasWithScan(w, h, parsed, mode, scan);
        const end = performance.now();
        arrayStatusInfo = { type: 'rendered', data: { scan: scan, total: w * h, time: (end - start).toFixed(1) } };
        renderArrayStatus();
        renderTimeInfo = { type: 'time', ms: (end - start) };
        renderTime.textContent = `⏱ ${(end - start).toFixed(1)}ms`;
    }

    function randomFill() {
        const mode = arrayFormat.value;
        const w = clamp(parseInt(imgWidth.value, 10) || 2, 1, 1920),
            h = clamp(parseInt(imgHeight.value, 10) || 2, 1, 1080);
        const total = w * h;
        let maxVal = 0xFFFFFF;
        switch (mode) {
            case 'rgb565':
                maxVal = 0xFFFF;
                break;
            case 'bgr565':
                maxVal = 0xFFFF;
                break;
            case 'rgb666':
                maxVal = 0x3FFFF;
                break;
            case 'rgb888':
                maxVal = 0xFFFFFF;
                break;
            case 'argb8888':
                maxVal = 0xFFFFFFFF;
                break;
            case 'rgba8888':
                maxVal = 0xFFFFFFFF;
                break;
            case 'rgb555':
                maxVal = 0x7FFF;
                break;
            case 'rgb444':
                maxVal = 0xFFF;
                break;
            case 'rgb332':
                maxVal = 0xFF;
                break;
            case 'gray8':
                maxVal = 0xFF;
                break;
            case 'mono1':
                maxVal = 0x1;
                break;
            default:
                maxVal = 0xFFFFFF;
        }
        const arr = [];
        for (let i = 0; i < total; i++) arr.push(Math.floor(Math.random() * (maxVal + 1)));
        const packType = inputPack.value;
        const order = inputByteOrder.value;
        arrayInput.value = arrayToStr(arr, mode, packType, order);
        renderFromArray();
    }

    function clearCanvas() {
        const mode = arrayFormat.value;
        const w = clamp(parseInt(imgWidth.value, 10) || 2, 1, 1920),
            h = clamp(parseInt(imgHeight.value, 10) || 2, 1, 1080);
        const arr = new Array(w * h).fill(0);
        const scan = arrayScanDir.value;
        renderCanvasWithScan(w, h, arr, mode, scan);
        arrayStatusInfo = { type: 'cleared', data: {} };
        renderArrayStatus();
    }

    // ---- 模块1: 取模 ----
    let importedImageData = null;

    function updateRangeBadge() {
        rangeBadge.textContent = getRangeBadgeLabel(colorRange.value);
    }
    colorRange.addEventListener('change', updateRangeBadge);
    updateRangeBadge();

    function loadImageFromFile(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                importedImageData = img;
                importPreviewImg.src = e.target.result;
                importPreviewImg.style.display = 'block';
                importFileInfo.textContent = `${file.name} (${img.width}x${img.height})`;
                if (compressMode.value === 'fit') {
                    compressWidth.value = img.width;
                    compressHeight.value = img.height;
                } else {
                    compressWidth.value = Math.min(img.width, 32);
                    compressHeight.value = Math.min(img.height, 32);
                }
                importStatusInfo = { type: 'loaded', data: { w: img.width, h: img.height } };
                renderImportStatus();
                codeOutputInfo = { type: 'loaded', data: {} };
                renderCodeOutput();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // ---- 取模核心（默认字节流+高字节在前，最近邻缩放） ----
    function performTakeMod() {
        if (!importedImageData) {
            importStatusInfo = { type: 'noimage', data: {} };
            renderImportStatus();
            return;
        }
        const srcW = importedImageData.width,
            srcH = importedImageData.height;
        const mode = compressMode.value;
        let drawW, drawH;
        if (mode === 'fit') { drawW = srcW;
            drawH = srcH; } else {
            let tw = parseInt(compressWidth.value, 10) || srcW,
                th = parseInt(compressHeight.value, 10) || srcH;
            drawW = clamp(tw, 1, 1920);
            drawH = clamp(th, 1, 1080);
        }
        let rotate = optRotate90.checked;
        let finalW = drawW,
            finalH = drawH;
        if (rotate) { finalW = drawH;
            finalH = drawW; }

        const offCanvas = document.createElement('canvas');
        offCanvas.width = drawW;
        offCanvas.height = drawH;
        const offCtx = offCanvas.getContext('2d');
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(importedImageData, 0, 0, drawW, drawH);

        const imageData = offCtx.getImageData(0, 0, drawW, drawH);
        const data = imageData.data;
        const total = drawW * drawH;
        const range = colorRange.value;
        let pixelArr = [];
        for (let i = 0; i < total; i++) {
            const idx = i * 4;
            let r = data[idx],
                g = data[idx + 1],
                b = data[idx + 2],
                a = data[idx + 3];
            if (optReverse.checked) { r = 255 - r;
                g = 255 - g;
                b = 255 - b; }
            pixelArr.push({ r, g, b, a, val: 0, bits: 0 });
        }
        for (let i = 0; i < pixelArr.length; i++) {
            const p = pixelArr[i];
            const result = convertColor(p.r, p.g, p.b, p.a, range);
            p.val = result.val;
            p.bits = result.bits;
            p.r = result.rr;
            p.g = result.gg;
            p.b = result.bb;
            p.a = result.aa;
        }
        let pixels = pixelArr.map(p => p.val);
        const w = drawW,
            h = drawH;
        let matrix = [];
        for (let y = 0; y < h; y++) { let row = []; for (let x = 0; x < w; x++) row.push(pixels[y * w + x]);
            matrix.push(row); }
        if (optMirrorH.checked)
            for (let y = 0; y < h; y++) matrix[y].reverse();
        if (optMirrorV.checked) matrix.reverse();
        if (rotate) {
            const newMatrix = [];
            for (let x = 0; x < w; x++) { const row = []; for (let y = h - 1; y >= 0; y--) row.push(matrix[y][x]);
                newMatrix.push(row); }
            matrix = newMatrix;
            const tmp = finalW;
            finalW = finalH;
            finalH = tmp;
        }
        const rows = matrix.length,
            cols = matrix[0] ? matrix[0].length : 0;
        let scanResult = [];
        const dir = scanDir.value;
        if (dir === 'row') { for (let y = 0; y < rows; y++)
                for (let x = 0; x < cols; x++) scanResult.push(matrix[y][x]); } else if (dir === 'col') { for (let x =
                    0; x < cols; x++)
                for (let y = 0; y < rows; y++) scanResult.push(matrix[y][x]); } else { for (let y = 0; y < rows; y++) {
                    if (y % 2 === 0) { for (let x = 0; x < cols; x++) scanResult.push(matrix[y][x]); } else { for (let x =
                            cols - 1; x >= 0; x--) scanResult.push(matrix[y][x]); } } }

        const bitOrderVal = bitOrder.value;
        let finalData = scanResult;
        const bitLen = pixelArr.length > 0 ? pixelArr[0].bits : 16;
        const maxBits = bitLen;
        if (bitOrderVal === 'lsb' && maxBits > 1) {
            finalData = scanResult.map(v => { let r = 0; for (let i = 0; i < maxBits; i++) r = (r << 1) | ((v >>
                        i) & 1); return r; });
        }

        const packType = dataPack.value;
        const order = byteOrder.value;
        let outputData = finalData;
        let outType = 'uint32_t',
            outPad = 4,
            outBits = maxBits;
        if (packType === 'byte') {
            let bytesPerPixel = Math.ceil(maxBits / 8);
            let byteArray = [];
            for (let v of finalData) {
                let temp = [];
                for (let i = bytesPerPixel - 1; i >= 0; i--) temp.push((v >> (i * 8)) & 0xFF);
                if (order === 'msb') byteArray.push(...temp);
                else byteArray.push(...temp.reverse());
            }
            outputData = byteArray;
            outType = 'uint8_t';
            outPad = 2;
            outBits = 8;
        } else {
            if (maxBits <= 8) outType = 'uint8_t';
            else if (maxBits <= 16) outType = 'uint16_t';
            else if (maxBits <= 32) outType = 'uint32_t';
            if (maxBits <= 8) outPad = 2;
            else if (maxBits <= 16) outPad = 4;
            else if (maxBits <= 24) outPad = 6;
            else outPad = 8;
        }

        const fmt = outputFormat.value;
        const count = outputData.length;

        // 存储取模输出状态（用于语言切换时重建）
        codeOutputInfo = {
            type: 'extracted',
            data: {
                range: range,
                w: finalW,
                h: finalH,
                fmt: fmt,
                outputData: outputData,
                packType: packType,
                maxBits: maxBits,
                outBits: outBits,
                outPad: outPad,
                outType: outType,
                finalData: finalData
            }
        };
        renderCodeOutput();

        const displayW2 = finalW,
            displayH2 = finalH;
        const total2 = displayW2 * displayH2;
        const displayArr = [];
        for (let i = 0; i < total2; i++) displayArr.push(i < finalData.length ? finalData[i] : 0);
        const scanForDisplay = scanDir.value;
        renderCanvasWithScan(displayW2, displayH2, displayArr, range, scanForDisplay);

        imgWidth.value = displayW2;
        imgHeight.value = displayH2;
        const rowData = [];
        const matrixData = window._currentMatrix || [];
        for (let y = 0; y < displayH2; y++)
            for (let x = 0; x < displayW2; x++) rowData.push((matrixData[y] && matrixData[y][x] !== undefined) ?
                matrixData[y][x] : 0);
        arrayInput.value = arrayToStr(rowData, range, packType, order);

        importStatusInfo = {
            type: 'extracted',
            data: {
                mode: mode,
                scan: scanDir.value,
                w: displayW2,
                h: displayH2,
                total: total2,
                bits: outBits,
                pack: packType
            }
        };
        renderImportStatus();
        renderTimeInfo = { type: 'extractDone' };
        renderTime.textContent = window.I18N.t('image.dyn.extractDone');
        window._lastImportArray = finalData;
        window._lastMode = range;
    }

    // ---- 复制 ----
    function copyText(text, btn) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => { const orig = btn.textContent;
                btn.textContent = '✓';
                setTimeout(() => btn.textContent = orig, 800); }).catch(() => fallbackCopy(text));
        } else { fallbackCopy(text); }
    }

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { alert(window.I18N.t('image.dyn.copyFail')); }
        document.body.removeChild(ta);
    }

    // ---- 画布点击 ----
    mainCanvas.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const scaleX = this.width / rect.width,
            scaleY = this.height / rect.height;
        const x = Math.floor((e.clientX - rect.left) * scaleX),
            y = Math.floor((e.clientY - rect.top) * scaleY);
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        const imageData = ctx.getImageData(x, y, 1, 1);
        const d = imageData.data;
        const r = d[0],
            g = d[1],
            b = d[2],
            a = d[3];
        const mode = arrayFormat.value;
        const result = convertColor(r, g, b, a, mode);
        arrayStatusInfo = { type: 'click', data: { x: x, y: y, mode: mode, hexStr: result.hexStr } };
        renderArrayStatus();
    });

    // ---- 事件绑定 ----
    convertBtn.addEventListener('click', performConversion);
    srcValue.addEventListener('keydown', (e) => { if (e.key === 'Enter') performConversion(); });
    srcFormat.addEventListener('change', performConversion);
    dstFormat.addEventListener('change', performConversion);
    convR.addEventListener('input', updateFromSliders);
    convG.addEventListener('input', updateFromSliders);
    convB.addEventListener('input', updateFromSliders);
    convA.addEventListener('input', updateFromSliders);
    convHexInput.addEventListener('change', function() {
        const raw = this.value;
        const match = raw.match(/^#?([0-9a-fA-F]{6})$/);
        if (match) {
            const h = match[1];
            const r = parseInt(h.substring(0, 2), 16),
                g = parseInt(h.substring(2, 4), 16),
                b = parseInt(h.substring(4, 6), 16);
            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                convR.value = r;
                convG.value = g;
                convB.value = b;
                convA.value = 255;
                convRVal.textContent = r;
                convGVal.textContent = g;
                convBVal.textContent = b;
                convAVal.textContent = 255;
                const srcMode = srcFormat.value;
                const srcResult = convertColor(r, g, b, 255, srcMode);
                srcValue.value = srcResult.hexStr;
                performConversion();
            }
        }
    });
    convColorPicker.addEventListener('input', function() {
        const hex = this.value;
        const match = hex.match(/^#?([0-9a-fA-F]{6})$/);
        if (match) {
            const h = match[1];
            const r = parseInt(h.substring(0, 2), 16),
                g = parseInt(h.substring(2, 4), 16),
                b = parseInt(h.substring(4, 6), 16);
            convR.value = r;
            convG.value = g;
            convB.value = b;
            convA.value = 255;
            convRVal.textContent = r;
            convGVal.textContent = g;
            convBVal.textContent = b;
            convAVal.textContent = 255;
            convHexInput.value = hex;
            const srcMode = srcFormat.value;
            const srcResult = convertColor(r, g, b, 255, srcMode);
            srcValue.value = srcResult.hexStr;
            performConversion();
        }
    });
    copyDstResultBtn.addEventListener('click', function() { copyText(dstResult.value, this); });

    renderArrayBtn.addEventListener('click', renderFromArray);
    randomArrayBtn.addEventListener('click', randomFill);
    clearCanvasBtn.addEventListener('click', clearCanvas);
    arrayFormat.addEventListener('change', function() {
        const w = parseInt(imgWidth.value, 10) || 2,
            h = parseInt(imgHeight.value, 10) || 2,
            mode = this.value;
        const raw = arrayInput.value;
        const parsed = parseArray(raw, mode);
        if (parsed !== null) { const scan = arrayScanDir.value;
            renderCanvasWithScan(w, h, parsed, mode, scan); }
    });
    arrayScanDir.addEventListener('change', function() {
        const w = parseInt(imgWidth.value, 10) || 2,
            h = parseInt(imgHeight.value, 10) || 2,
            mode = arrayFormat.value;
        const raw = arrayInput.value;
        const parsed = parseArray(raw, mode);
        if (parsed !== null) {
            const scan = this.value;
            renderCanvasWithScan(w, h, parsed, mode, scan);
            arrayStatusInfo = { type: 'switched', data: { scan: scan } };
            renderArrayStatus();
        }
    });

    exportPngBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = `image_${mainCanvas.width}x${mainCanvas.height}.png`;
        link.href = mainCanvas.toDataURL('image/png');
        link.click();
    });

    exportArrayBtn.addEventListener('click', function() {
        const w = mainCanvas.width,
            h = mainCanvas.height;
        const total = w * h;
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        const mode = arrayFormat.value;
        const arr = [];
        for (let i = 0; i < total; i++) {
            const idx = i * 4;
            const r = data[idx],
                g = data[idx + 1],
                b = data[idx + 2],
                a = data[idx + 3];
            const result = convertColor(r, g, b, a, mode);
            arr.push(result.val);
        }
        const packType = inputPack.value;
        const order = inputByteOrder.value;
        const str = arrayToStr(arr, mode, packType, order);
        copyText(str, this);
        arrayStatusInfo = { type: 'copied', data: {} };
        renderArrayStatus();
    });

    compressMode.addEventListener('change', function() {
        updateCompressControls();
        if (this.value === 'fit' && importedImageData) {
            compressWidth.value = importedImageData.width;
            compressHeight.value = importedImageData.height;
        }
    });

    imageFileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) loadImageFromFile(this.files[0]);
    });

    loadSampleBtn.addEventListener('click', function() {
        const c = document.createElement('canvas');
        c.width = 128;
        c.height = 128;
        const cx = c.getContext('2d');
        const grad = cx.createLinearGradient(0, 0, 128, 128);
        grad.addColorStop(0, '#ff0000');
        grad.addColorStop(0.33, '#00ff00');
        grad.addColorStop(0.66, '#0000ff');
        grad.addColorStop(1, '#ff00ff');
        cx.fillStyle = grad;
        cx.fillRect(0, 0, 128, 128);
        cx.fillStyle = 'white';
        cx.font = 'bold 20px sans-serif';
        cx.textAlign = 'center';
        cx.fillText(window.I18N.t('image.dyn.takeMod'), 64, 72);
        c.toBlob(function(blob) {
            const file = new File([blob], 'sample.png', { type: 'image/png' });
            loadImageFromFile(file);
            const dt = new DataTransfer();
            dt.items.add(file);
            imageFileInput.files = dt.files;
        }, 'image/png');
    });

    importConvertBtn.addEventListener('click', performTakeMod);

    copyImportArrayBtn.addEventListener('click', function() {
        if (window._lastImportArray) {
            copyText(codeOutput.textContent, this);
            importStatusInfo = { type: 'copied', data: {} };
            renderImportStatus();
        } else {
            importStatusInfo = { type: 'noextract', data: {} };
            renderImportStatus();
        }
    });

    window.addEventListener('resize', () => {
        const w = mainCanvas.width,
            h = mainCanvas.height;
        if (w > 0 && h > 0) {
            const wrapperWidth = canvasWrapper.clientWidth - 24;
            let displaySize = Math.min(wrapperWidth, 400);
            if (w > 400 || h > 400) { const ratio = Math.min(400 / w, 400 / h, 1);
                displaySize = Math.min(w * ratio, 400); }
            const displayW = Math.max(30, Math.min(displaySize, w * 2));
            mainCanvas.style.width = Math.min(displayW, wrapperWidth) + 'px';
            mainCanvas.style.height = 'auto';
        }
    });

    // ================================================================
    //  ★★★ 屏幕取色功能 (EyeDropper API) ★★★
    // ================================================================
    pickColorBtn.addEventListener('click', async function() {
        // 检测浏览器是否支持 EyeDropper API
        if (!window.EyeDropper) {
            colorPickInfo = { type: 'unsupported', data: {} };
            renderColorPickStatus();
            return;
        }

        // 禁用按钮，防止重复点击
        this.disabled = true;
        this.classList.add('picking');
        isPicking = true;
        this.textContent = window.I18N.t('image.dyn.picking');
        colorPickInfo = { type: 'picking', data: {} };
        renderColorPickStatus();

        try {
            const eyeDropper = new EyeDropper();
            const result = await eyeDropper.open();
            const hex = result.sRGBHex; // 格式: #RRGGBB
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);

            // 转换为当前源格式
            const srcMode = srcFormat.value;
            const converted = convertColor(r, g, b, 255, srcMode);

            // 更新源值输入框
            srcValue.value = converted.hexStr;

            // 更新 HEX 输入框和颜色选择器
            convHexInput.value = hex;
            convColorPicker.value = hex;

            // 更新滑块
            convR.value = r;
            convG.value = g;
            convB.value = b;
            convA.value = 255;
            convRVal.textContent = r;
            convGVal.textContent = g;
            convBVal.textContent = b;
            convAVal.textContent = 255;

            // 触发转换，更新所有UI
            performConversion();

            // 显示取色成功状态
            colorPickInfo = { type: 'success', data: { hex: hex, hexStr: converted.hexStr, srcMode: srcMode } };
            renderColorPickStatus();

            // 给源色块添加一个闪烁动画反馈
            srcSwatch.classList.remove('color-picked');
            // 强制回流后添加类以重启动画
            void srcSwatch.offsetWidth;
            srcSwatch.classList.add('color-picked');

            // 也更新一下 dstResult 旁边的提示（可选）
            dstResult.style.transition = 'background 0.3s';
            dstResult.style.background = 'var(--status-ok-bg)';
            setTimeout(() => {
                dstResult.style.background = '';
            }, 500);

        } catch (e) {
            if (e.name === 'AbortError') {
                // 用户主动取消了取色
                colorPickInfo = { type: 'cancelled', data: {} };
                renderColorPickStatus();
            } else {
                console.error(e);
                colorPickInfo = { type: 'failed', data: { msg: e.message || window.I18N.t('image.dyn.unknownError') } };
                renderColorPickStatus();
            }
        } finally {
            // 恢复按钮状态
            this.disabled = false;
            this.classList.remove('picking');
            isPicking = false;
            this.textContent = window.I18N.t('image.btn.pickColor');
        }
    });

    // 额外：当源格式改变时，清空取色状态提示（避免误导）
    srcFormat.addEventListener('change', function() {
        if (colorPickInfo.type === 'success' || colorPickInfo.type === 'failed') {
            colorPickInfo = { type: 'switched', data: {} };
            renderColorPickStatus();
            setTimeout(() => {
                if (colorPickInfo.type === 'switched') {
                    colorPickInfo = { type: 'empty', data: {} };
                    renderColorPickStatus();
                }
            }, 3000);
        }
    });

    // ============================================================
    //  语言切换：更新动态文本并重新渲染
    // ============================================================
    document.addEventListener('languagechange', function () {
        document.title = window.I18N.t('image.doc.title');
        updateCompressControls();   // 刷新压缩提示
        performConversion();        // 刷新色块、标签、滑块、详情
        updateRangeBadge();         // 刷新颜色范围徽章
        renderArrayStatus();        // 刷新数组状态
        renderImportStatus();       // 刷新取模状态
        renderColorPickStatus();    // 刷新取色状态
        renderCodeOutput();         // 刷新取模输出代码
        renderCanvasLabels();       // 刷新画布标签（像素数、渲染时间）
        // 取色按钮：如果在取色中，保持"取色中"文本
        if (isPicking) {
            pickColorBtn.textContent = window.I18N.t('image.dyn.picking');
        }
    });

    // ---- 初始化 ----
    document.title = window.I18N.t('image.doc.title');
    const defaultArr = [0x861F, 0x8410, 0xFFFF, 0x0000];
    const defaultPack = 'byte';
    const defaultOrder = 'msb';
    arrayInput.value = arrayToStr(defaultArr, 'rgb565', defaultPack, defaultOrder);
    imgWidth.value = 2;
    imgHeight.value = 2;
    renderCanvasWithScan(2, 2, defaultArr, 'rgb565', 'row');
    arrayStatusInfo = { type: 'ready', data: {} };
    renderArrayStatus();
    compressWidth.value = 16;
    compressHeight.value = 16;
    codeOutputInfo = { type: 'placeholder', data: {} };
    renderCodeOutput();
    updateCompressControls();

    performConversion();

    setTimeout(() => { loadSampleBtn.click(); }, 300);

    // 同步主题图标（data-theme 已由 head 内联脚本设置；setTheme 来自 theme.js）
    setTheme(localStorage.getItem('toolbox-theme') || 'light');
})();
