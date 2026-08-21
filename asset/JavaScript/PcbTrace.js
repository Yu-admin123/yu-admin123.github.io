/* ============================================================
   PcbTrace.js — PCB 走线宽度计算器
   纯静态 / 离线可用；曲线用原生 Canvas 绘制
   只写本页业务逻辑；setTheme / setLang 由 theme.js / i18n.js 提供
   计算模型（双标准，默认 IPC-2152）：
     IPC-2221 经验公式：
       Area(mil²) = (I / (k · ΔT^b))^(1/c);  I = k · ΔT^b · Area^c
       外层 k=0.048，内层 k=0.024，b=0.44，c=0.725
     IPC-2152（Brooks & Adam 对通用曲线闭式拟合，KiCad 同款）：
       ΔT = K · I^a · W^b · Th^c   （W、Th 单位 mil）
       外层 K=215.3, a=2, b=-1.15, c=-1.0（所有铜厚）
       内层按铜厚：0.5oz K=120/a=2/b=-1.10/c=-1.52；1oz K=200/a=1.9/b=-1.10/c=-1.52
                   2oz K=300/a=2/b=-1.15/c=-1.52；3oz K=262.5/a=1.9/b=-1.15/c=-1.52
     修正系数（仅 IPC-2152）：邻近完整地平面 ≈ +40% 载流；板厚越厚散热越好（近似）
   ============================================================ */
(function () {
    'use strict';

    // ============================================================
    //  翻译字典（含公共 key）
    // ============================================================
    window.I18N_STRINGS = {
        'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
        'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

        'pcb.doc.title':      { zh: 'PCB 走线宽度计算器', en: 'PCB Trace Width Calculator' },
        'pcb.title':          { zh: '🖥️ PCB 走线宽度计算器', en: '🖥️ PCB Trace Width Calculator' },
        'pcb.subhead':        { zh: '🔹 默认 IPC-2152 + 内层散热降额 ×2（贴近主流厂商 DFM 惯例）；可切换 IPC-2221 保守基线或调整降额系数对比。正向求线宽 / 反向求电流，并给出电阻、压降与功耗估算。',
                                en: '🔹 IPC-2152 by default + inner-layer derate ×2 (mainstream DFM practice); switch to IPC-2221 baseline or adjust derate. Forward width / reverse current, plus R/ΔV/Power.' },

        'pcb.p1.title':       { zh: '计算模式', en: 'Compute Mode' },
        'pcb.p1.small':       { zh: '正向 / 反向求解', en: 'Forward / Reverse' },
        'pcb.mode.forward':   { zh: '正向：求线宽', en: 'Forward: Width' },
        'pcb.mode.reverse':   { zh: '反向：求电流', en: 'Reverse: Current' },

        'pcb.formula.forward': { zh: 'W = (I / (k·ΔT^b))^(1/c) ÷ 铜厚', en: 'W = (I / (k·ΔT^b))^(1/c) ÷ thickness' },
        'pcb.formula.reverse': { zh: 'I = k·ΔT^b·(W·铜厚)^c', en: 'I = k·ΔT^b·(W·thickness)^c' },
        'pcb.formula.forward2152': { zh: 'W = [ΔT / (K·I^a·Th^c)]^(1/b)（内层按铜厚取系数）', en: 'W = [ΔT / (K·I^a·Th^c)]^(1/b) (internal per Cu weight)' },
        'pcb.formula.reverse2152': { zh: 'I = [ΔT / (K·W^b·Th^c)]^(1/a)', en: 'I = [ΔT / (K·W^b·Th^c)]^(1/a)' },
        'pcb.preset.title':    { zh: '常用电流预设', en: 'Common Current Presets' },

        'pcb.p2.title':       { zh: '输入参数', en: 'Inputs' },
        'pcb.p2.small':       { zh: '双标准 · IPC-2152 默认', en: 'Dual std · IPC-2152 default' },
        'pcb.label.std':      { zh: '计算标准', en: 'Standard' },
        'pcb.std.2152':       { zh: 'IPC-2152（推荐）', en: 'IPC-2152 (recommended)' },
        'pcb.std.2221':       { zh: 'IPC-2221（保守）', en: 'IPC-2221 (conservative)' },
        'pcb.label.unit':     { zh: '尺寸单位', en: 'Unit' },
        'pcb.unit.mm':        { zh: 'mm（毫米）', en: 'mm (millimeter)' },
        'pcb.unit.mil':       { zh: 'mil（密耳）', en: 'mil (1/1000 in)' },
        'pcb.label.dt':       { zh: '温升 ΔT', en: 'Temp Rise ΔT' },
        'pcb.label.oz':       { zh: '铜厚', en: 'Copper Weight' },
        'pcb.label.layer':    { zh: '走线层', en: 'Layer' },
        'pcb.layer.ext':      { zh: '外层（暴露）', en: 'External' },
        'pcb.layer.int':      { zh: '内层（夹心）', en: 'Internal' },
        'pcb.label.derate':   { zh: '内层散热降额', en: 'Inner Layer Derate' },
        'pcb.derate.x1_5':    { zh: '×1.5（载流 −33%）', en: '×1.5 (current −33%)' },
        'pcb.derate.x1':      { zh: '×1.0（IPC-2152 实测）', en: '×1.0 (IPC-2152 measured)' },
        'pcb.derate.x2':      { zh: '×2.0（载流 −50%，≈IPC-2221，推荐）', en: '×2.0 (current −50%, ≈IPC-2221, recommended)' },
        'pcb.derate.x2_5':    { zh: '×2.5（更稳妥）', en: '×2.5 (extra safe)' },
        'pcb.hint.derate':    { zh: '仅内层 · 2152 生效', en: 'inner · 2152 only' },
        'pcb.hint.short':     { zh: '≤10mm 温升可忽略', en: '≤10mm rise negligible' },
        'pcb.conv.title':      { zh: '线宽换算', en: 'Width Conversion' },
        'pcb.conv.small':      { zh: 'mm ↔ mil · 计算后自动填入', en: 'mm ↔ mil · auto-fill on calc' },
        'pcb.conv.mm':         { zh: '毫米 (mm)', en: 'Millimeter (mm)' },
        'pcb.conv.mil':        { zh: '密耳 (mil)', en: 'Mil (1/1000 in)' },
        'pcb.label.plane':    { zh: '邻近铜平面', en: 'Nearby Plane' },
        'pcb.plane.none':     { zh: '无', en: 'None' },
        'pcb.plane.yes':      { zh: '有（≈+40% 载流）', en: 'Yes (≈+40% current)' },
        'pcb.hint.plane':     { zh: '仅 2152 生效', en: '2152 only' },
        'pcb.label.board':    { zh: '板厚', en: 'Board Thickness' },
        'pcb.hint.board':     { zh: '仅 2152 生效', en: '2152 only' },
        'pcb.label.length':   { zh: '走线长度 L', en: 'Trace Length L' },
        'pcb.label.current':  { zh: '电流 I', en: 'Current I' },
        'pcb.label.width':    { zh: '线宽 W', en: 'Width W' },
        'pcb.hint.oz':        { zh: '铜厚（1oz≈35µm）', en: '1oz ≈ 35µm' },

        'pcb.p3.title':       { zh: '计算结果', en: 'Results' },
        'pcb.p3.small':       { zh: '实时计算', en: 'Live' },
        'pcb.result.width':   { zh: '所需线宽 W', en: 'Required Width W' },
        'pcb.result.area':    { zh: '截面积 A', en: 'Area A' },
        'pcb.result.current': { zh: '电流 I', en: 'Current I' },
        'pcb.result.res':     { zh: '直流电阻 R', en: 'DC Resistance R' },
        'pcb.result.vdrop':   { zh: '压降 ΔV', en: 'Drop ΔV' },
        'pcb.result.power':   { zh: '功耗 P', en: 'Power P' },

        'pcb.p4.title':       { zh: '载流能力曲线', en: 'Current Capacity' },
        'pcb.p4.small':       { zh: '最大电流随线宽变化', en: 'Max current vs width' },
        'pcb.chart.yAxisI':   { zh: '最大电流 (A)', en: 'Max Current (A)' },
        'pcb.chart.xAxisW':   { zh: '线宽', en: 'Width' },

        'pcb.p5.title':       { zh: '推荐线宽参考', en: 'Width Reference' },
        'pcb.p5.small':       { zh: '常见电流 · 随温升实时更新', en: 'Common currents · live ΔT' },
        'pcb.table.thI':      { zh: '电流 (A)', en: 'Current (A)' },
        'pcb.table.thExt1':   { zh: '外层 1oz', en: 'Ext 1oz' },
        'pcb.table.thExt2':   { zh: '外层 2oz', en: 'Ext 2oz' },
        'pcb.table.thInt1':   { zh: '内层 1oz', en: 'Int 1oz' },
        'pcb.table.thInt2':   { zh: '内层 2oz', en: 'Int 2oz' },

        'pcb.footer':         { zh: '🖥️ PCB 走线宽度计算器 · 正向求线宽 · 反向求电流 · IPC-2221 经验模型 · 电阻/压降/功耗估算',
                                en: '🖥️ PCB Trace Width Calculator · Forward width · Reverse current · IPC-2221 model · R/ΔV/Power' },

        'pcb.err.invalid':    { zh: '输入无效，请检查数值（电流 / 线宽须为正数）', en: 'Invalid input, please check values (current / width must be positive)' },
        'pcb.err.zeroLen':    { zh: '已按线长=0 处理：电阻/压降/功耗不计算', en: 'Length=0: resistance/drop/power skipped' }
    };

    function tr(k) { return window.I18N.t(k); }

    // 温升 ΔT（支持手动输入；非法/≤0 回退默认 10°C）
    function getDT() {
        var v = parseFloat(els.tempRise.value);
        return (isNaN(v) || v <= 0) ? 10 : v;
    }

    // ============================================================
    //  物理常数与 IPC-2221 参数
    // ============================================================
    var MIL_MM = 0.0254;          // 1 mil = 0.0254 mm
    var MIL2_M2 = 6.4516e-10;     // 1 mil² = (25.4e-6 m)² m²
    var OZ_MIL = { '0.5': 0.689, '1': 1.378, '2': 2.756, '3': 4.134 }; // 铜厚(oz)→mil
    var OZ_UM = { '0.5': 17.5, '1': 35, '2': 70, '3': 105 };          // 铜厚(oz)→µm（仅展示）
    var RHO_20 = 1.724e-8;        // 铜电阻率 @20°C (Ω·m)
    var ALPHA = 0.0039;           // 铜电阻温度系数 (1/°C)
    var AMBIENT = 25;             // 环境温度 °C

    function kFactor(layer) { return layer === 'internal' ? 0.024 : 0.048; }

    // 给定电流，返回截面积 (mil²)
    function areaFromCurrent(I, dT, layer) {
        var k = kFactor(layer);
        return Math.pow(I / (k * Math.pow(dT, 0.44)), 1 / 0.725);
    }
    // 给定截面积 (mil²)，返回最大电流 (A)
    function currentFromArea(areaMils2, dT, layer) {
        var k = kFactor(layer);
        return k * Math.pow(dT, 0.44) * Math.pow(areaMils2, 0.725);
    }
    // 直流电阻 (Ω)：截面积 mil²、长度 mm、温升 dT
    function traceResistance(areaMils2, Lmm, dT) {
        var T = AMBIENT + dT;
        var rho = RHO_20 * (1 + ALPHA * (T - 20));
        var A = areaMils2 * MIL2_M2;
        var L = Lmm / 1000;
        return rho * L / A;
    }

    // ============================================================
    //  IPC-2152（Brooks & Adam 闭式拟合，KiCad 同款系数）
    //   ΔT = K · I^a · W^b · Th^c   （W、Th 单位 mil）
    //   外层所有铜厚共用一组系数；内层按铜厚取系数
    // ============================================================
    var K2152_EXT = { K: 215.3, a: 2, b: -1.15, c: -1.0 };                    // 外层（所有铜厚）
    var K2152_INT = {                                                          // 内层按铜厚
        '0.5': { K: 120, a: 2, b: -1.10, c: -1.52 },
        '1':   { K: 200, a: 1.9, b: -1.10, c: -1.52 },
        '2':   { K: 300, a: 2, b: -1.15, c: -1.52 },
        '3':   { K: 262.5, a: 1.9, b: -1.15, c: -1.52 }
    };
    var PLANE_BOOST = 1.4;   // 邻近完整铜平面 ≈ +40% 载流（仅 2152）

    function k2152Params(layer, oz) {
        return (layer === 'internal') ? (K2152_INT[oz] || K2152_INT['1']) : K2152_EXT;
    }
    // 给定电流(A)，返回所需线宽(mil)
    function widthFromCurrent2152(I, dT, layer, oz) {
        var p = k2152Params(layer, oz);
        var Th = OZ_MIL[oz] || 1.378;
        var denom = p.K * Math.pow(I, p.a) * Math.pow(Th, p.c);
        return Math.pow(dT / denom, 1 / p.b);
    }
    // 给定线宽(mil)，返回最大电流(A)
    function currentFromWidth2152(Wmil, dT, layer, oz) {
        var p = k2152Params(layer, oz);
        var Th = OZ_MIL[oz] || 1.378;
        var denom = p.K * Math.pow(Wmil, p.b) * Math.pow(Th, p.c);
        return Math.pow(dT / denom, 1 / p.a);
    }
    // IPC-2152 修正系数：邻近铜平面 ×1.4；板厚近似（基准 1.6mm，越厚散热略好）
    function t2152Factor(plane, boardLmm) {
        var f = (plane === 'yes') ? PLANE_BOOST : 1;
        var L = (isNaN(boardLmm) || boardLmm <= 0) ? 1.6 : boardLmm;
        f *= Math.pow(L / 1.6, 0.09);
        return f;
    }
    // 内层散热降额系数（仅 IPC-2152 内层生效）：降额作用于载流能力——
    // ×1.5 表示内层载流按外层的 1/1.5 计，所需线宽相应加宽。
    // IPC-2152 实测认为内层≈外层，但工程实践中内层散热环境普遍更差，
    // 多数厂商规范仍保守降额；×2.0 时结果≈IPC-2221 传统翻倍
    function innerDerateVal() {
        var v = els.innerDerate ? parseFloat(els.innerDerate.value) : 1;
        return (isNaN(v) || v <= 0) ? 1 : v;
    }
    // 按标准分发：给定线宽(mm)，返回最大电流(A)
    function currentForWidth(wmm, dT, layer, oz, std, plane, boardLmm) {
        if (std === 'ipc2152') {
            var I = currentFromWidth2152(wmm / MIL_MM, dT, layer, oz) * t2152Factor(plane, boardLmm);
            if (layer === 'internal') I /= innerDerateVal();
            return I;
        }
        var a2 = (wmm / MIL_MM) * (OZ_MIL[oz] || 1.378);
        return currentFromArea(a2, dT, layer);
    }
    // 按标准分发：给定电流(A)，返回所需线宽(mm)
    function widthFor(I, dT, layer, oz, std, plane, boardLmm) {
        if (std === 'ipc2152') {
            // 内层降额作用于载流：等效电流放大 → 所需线宽变宽
            var Ieff = I / t2152Factor(plane, boardLmm);
            if (layer === 'internal') Ieff *= innerDerateVal();
            return widthFromCurrent2152(Ieff, dT, layer, oz) * MIL_MM;
        }
        var a = areaFromCurrent(I, dT, layer);
        return (a / (OZ_MIL[oz] || 1.378)) * MIL_MM;
    }

    // ============================================================
    //  DOM 引用
    // ============================================================
    var els = {};
    function getEls() {
        els.tempRise = document.getElementById('tempRise');
        els.copperOz = document.getElementById('copperOz');
        els.layer = document.getElementById('layer');
        els.traceLen = document.getElementById('traceLen');
        els.current = document.getElementById('current');
        els.widthMm = document.getElementById('widthMm');
        els.currentRow = document.getElementById('currentRow');
        els.widthRow = document.getElementById('widthRow');
        els.ozHint = document.getElementById('ozHint');
        els.unitSel = document.getElementById('unitSel');
        els.standard = document.getElementById('standard');
        els.plane = document.getElementById('plane');
        els.innerDerate = document.getElementById('innerDerate');
        els.board = document.getElementById('board');
        els.traceLenUnit = document.getElementById('traceLenUnit');
        els.widthInputUnit = document.getElementById('widthInputUnit');
        els.areaUnit = document.getElementById('areaUnit');
        els.widthResult = document.getElementById('widthResult');
        els.widthUnit = document.getElementById('widthUnit');
        els.areaResult = document.getElementById('areaResult');
        els.currentResult = document.getElementById('currentResult');
        els.resResult = document.getElementById('resResult');
        els.resUnit = document.getElementById('resUnit');
        els.vdropResult = document.getElementById('vdropResult');
        els.vdropUnit = document.getElementById('vdropUnit');
        els.powerResult = document.getElementById('powerResult');
        els.powerUnit = document.getElementById('powerUnit');
        els.widthMmConv = document.getElementById('widthMmConv');
        els.widthMilConv = document.getElementById('widthMilConv');
        els.statusMsg = document.getElementById('statusMsg');
        els.chartCanvas = document.getElementById('chartCanvas');
        els.chartWrapper = document.getElementById('chartWrapper');
        els.chartTooltip = document.getElementById('chartTooltip');
        els.presetBar = document.getElementById('presetBar');
        els.formula = document.getElementById('modeFormula');
        els.refBody = document.getElementById('refBody');
    }

    // ============================================================
    //  状态
    // ============================================================
    var mode = 'forward';
    var unit = 'mm';   // 'mm' | 'mil'（显示单位；内部一律用 mm 计算）

    // ============================================================
    //  画布辅助
    // ============================================================
    function cssVar(name) {
        return (getComputedStyle(document.documentElement).getPropertyValue(name) || '').trim();
    }
    var _lastW = 0, _lastH = 0;
    function ensureCanvas() {
        var canvas = els.chartCanvas;
        var rect = canvas.getBoundingClientRect();
        var W = rect.width, H = rect.height;
        var dpr = window.devicePixelRatio || 1;
        if (Math.abs(W - _lastW) > 0.5 || Math.abs(H - _lastH) > 0.5 || canvas.width === 0) {
            canvas.width = Math.max(1, Math.floor(W * dpr));
            canvas.height = Math.max(1, Math.floor(H * dpr));
            _lastW = W; _lastH = H;
        }
        var ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { ctx: ctx, W: W, H: H };
    }
    function niceNum(range, round) {
        var exp = Math.floor(Math.log10(range));
        var frac = range / Math.pow(10, exp);
        var f;
        if (round) {
            if (frac < 1.5) f = 1; else if (frac < 3) f = 2; else if (frac < 7) f = 5; else f = 10;
        } else {
            if (frac <= 1) f = 1; else if (frac <= 2) f = 2; else if (frac <= 5) f = 5; else f = 10;
        }
        return f * Math.pow(10, exp);
    }
    function looseLabel(min, max, maxTicks) {
        maxTicks = maxTicks || 6;
        var range = niceNum(max - min, false);
        var step = niceNum(range / (maxTicks - 1), true);
        if (step <= 0) step = 1;
        // 直接用用户原始 min 作为图框起点，
        // 避免 floor(min/step)*step 把 niceMin 拉到 0 而造成曲线左下空白
        var niceMin = min;
        var niceMax = Math.ceil(max / step) * step;
        var ticks = [];
        var start = niceMin;
        for (var v = start; v <= niceMax + step / 2; v += step) ticks.push(+v.toFixed(10));
        return { min: niceMin, max: niceMax, step: step, ticks: ticks };
    }
    // 单位换算与格式化（显示单位 → 内部 mm）
    function toMm(v) { return unit === 'mil' ? v * MIL_MM : v; }
    function fromMm(mm) { return unit === 'mil' ? mm / MIL_MM : mm; }
    function rnd3(v) { return Math.round(v * 1000) / 1000; }
    function fmtTick(v) {
        if (unit === 'mil') {
            if (v >= 100) return String(Math.round(v));
            if (v >= 10) return (Math.round(v * 10) / 10).toString();
            return v.toFixed(2);
        }
        if (v >= 10) return v.toFixed(0);
        if (v >= 1) return v.toFixed(1);
        return v.toFixed(2);
    }
    function fmtVal(mm) {
        var v = fromMm(mm);
        if (unit === 'mil') {
            if (v >= 100) return String(Math.round(v));
            if (v >= 10) return (Math.round(v * 10) / 10).toString();
            return v.toFixed(2);
        }
        if (v >= 10) return v.toFixed(1);
        if (v >= 1) return v.toFixed(2);
        return v.toFixed(3);
    }
    function fmtArea(mm2) {
        if (unit === 'mil') {
            var v = mm2 / (MIL_MM * MIL_MM);
            if (v >= 100) return String(Math.round(v));
            if (v >= 10) return (Math.round(v * 10) / 10).toString();
            return v.toFixed(1);
        }
        return mm2 >= 1 ? mm2.toFixed(2) : mm2.toFixed(3);
    }

    // 图表状态（供悬浮复用）
    var chartState = null;

    function render() {
        var setup = ensureCanvas();
        var ctx = setup.ctx, W = setup.W, H = setup.H;
        if (W < 10 || H < 10) return;

        var bg = cssVar('--pcb-chart-bg') || '#fff';
        var gridCol = cssVar('--pcb-chart-grid') || '#e9edf4';
        var axisCol = cssVar('--pcb-chart-axis') || '#94a3b8';
        var labelCol = cssVar('--pcb-chart-label') || '#64748b';
        var lineCol = cssVar('--pcb-chart-line') || '#f59e0b';
        var fillCol = cssVar('--pcb-chart-fill') || 'rgba(245,158,11,0.1)';
        var dotCol = cssVar('--pcb-chart-dot') || '#ef4444';

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

        var dT = getDT();
        var oz = els.copperOz.value;
        var layer = els.layer.value;
        var std = els.standard ? els.standard.value : 'ipc2152';
        var plane = els.plane ? els.plane.value : 'none';
        var boardLmm = parseFloat(els.board.value) || 1.6;
        var workWmm = (mode === 'forward')
            ? (parseFloat(els.widthResult.getAttribute('data-mm')) || 0.5)
            : (toMm(parseFloat(els.widthMm.value)) || 0.5);
        if (!(workWmm > 0)) workWmm = 0.5;

        // X 轴范围：以工作点为基准自适应（x 轴按显示单位绘制）
        var xMin = 0.1;
        var xMax = Math.max(3, workWmm * 1.6);
        var xUnit = (unit === 'mil') ? MIL_MM : 1;     // 每个显示单位对应的 mm
        var xMinU = (unit === 'mil') ? Math.ceil(xMin / xUnit) : xMin;   // 显示单位
        var xMaxU = (unit === 'mil') ? Math.ceil(xMax / xUnit) : xMax;

        var N = 160;
        var pts = [];
        var iMax = 0;
        for (var i = 0; i <= N; i++) {
            var wmm = xMin + (xMax - xMin) * i / N;
            var imax = currentForWidth(wmm, dT, layer, oz, std, plane, boardLmm);
            pts.push({ w: wmm / xUnit, I: imax });   // 存显示单位
            if (imax > iMax) iMax = imax;
        }

        var pad = { l: 40, r: 18, t: 16, b: 38 };
        var plotW = W - pad.l - pad.r;
        var plotH = H - pad.t - pad.b;
        var x = looseLabel(xMinU, xMaxU, (unit === 'mil') ? 11 : 7);
        var ymax = Math.max(iMax, 1e-3);
        var y = looseLabel(0, ymax, 5);

        function xToPx(wv) { return pad.l + (wv - x.min) / (x.max - x.min) * plotW; }
        function yToPx(iv) { return pad.t + (1 - (iv - y.min) / (y.max - y.min)) * plotH; }

        // 网格
        ctx.strokeStyle = gridCol; ctx.lineWidth = 1; ctx.beginPath();
        for (i = 0; i < x.ticks.length; i++) { var xp = xToPx(x.ticks[i]); ctx.moveTo(xp, pad.t); ctx.lineTo(xp, pad.t + plotH); }
        for (i = 0; i < y.ticks.length; i++) { var yp = yToPx(y.ticks[i]); ctx.moveTo(pad.l, yp); ctx.lineTo(pad.l + plotW, yp); }
        ctx.stroke();

        // 坐标轴
        ctx.strokeStyle = axisCol; ctx.lineWidth = 1; ctx.beginPath();
        ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, pad.t + plotH); ctx.lineTo(pad.l + plotW, pad.t + plotH);
        ctx.stroke();

        // 刻度标签
        ctx.fillStyle = labelCol; ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        for (i = 0; i < x.ticks.length; i++) ctx.fillText(fmtTick(x.ticks[i]), xToPx(x.ticks[i]), pad.t + plotH + 6);
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        for (i = 0; i < y.ticks.length; i++) ctx.fillText(y.ticks[i].toFixed(y.step < 1 ? 2 : (y.step < 10 ? 1 : 0)), pad.l - 6, yToPx(y.ticks[i]));
        // X 轴标题
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText(tr('pcb.chart.xAxisW') + ' (' + unit + ')', pad.l + plotW / 2, H - 2);
        // Y 轴标题（旋转）
        ctx.save(); ctx.translate(12, pad.t + plotH / 2); ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(tr('pcb.chart.yAxisI'), 0, 0); ctx.restore();

        // 填充区域
        ctx.beginPath(); ctx.moveTo(xToPx(pts[0].w), yToPx(pts[0].I));
        for (i = 1; i < pts.length; i++) ctx.lineTo(xToPx(pts[i].w), yToPx(pts[i].I));
        ctx.lineTo(xToPx(pts[pts.length - 1].w), pad.t + plotH);
        ctx.lineTo(xToPx(pts[0].w), pad.t + plotH); ctx.closePath();
        ctx.fillStyle = fillCol; ctx.fill();

        // 曲线
        ctx.strokeStyle = lineCol; ctx.lineWidth = 2; ctx.beginPath();
        ctx.moveTo(xToPx(pts[0].w), yToPx(pts[0].I));
        for (i = 1; i < pts.length; i++) ctx.lineTo(xToPx(pts[i].w), yToPx(pts[i].I));
        ctx.stroke();

        // 当前工作点
        var dotW = workWmm / xUnit, dotI;
        if (mode === 'forward') {
            dotI = parseFloat(els.current.value) || 0;
        } else {
            dotI = currentForWidth(workWmm, dT, layer, oz, std, plane, boardLmm);
        }
        if (dotW >= x.min && dotW <= x.max && dotI >= y.min && dotI <= y.max) {
            ctx.fillStyle = dotCol; ctx.beginPath();
            ctx.arc(xToPx(dotW), yToPx(dotI), 4, 0, Math.PI * 2); ctx.fill();
        }

        chartState = { x: x, y: y, pad: pad, plotW: plotW, plotH: plotH, dT: dT, oz: oz, layer: layer, std: std, plane: plane, boardLmm: boardLmm, xUnit: xUnit, W: W, H: H };
    }
    function drawChart() { render(); }

    // ============================================================
    //  输入 / 计算
    // ============================================================
    function setResultsEmpty() {
        els.widthResult.textContent = '--'; els.widthResult.removeAttribute('data-mm');
        els.areaResult.textContent = '--';
        els.currentResult.textContent = '--';
        els.resResult.textContent = '--';
        els.vdropResult.textContent = '--';
        els.powerResult.textContent = '--';
    }
    function showStatus(key, isWarn) {
        els.statusMsg.textContent = tr(key);
        els.statusMsg.className = isWarn ? 'status-warn' : 'status-error';
        els.statusMsg.style.display = 'block';
    }
    function hideStatus() { els.statusMsg.style.display = 'none'; }

    function switchMode(m) {
        mode = m;
        var tabs = document.querySelectorAll('.mode-tab');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.toggle('active', tabs[i].getAttribute('data-mode') === m);
        }
        els.currentRow.style.display = (m === 'forward') ? '' : 'none';
        els.widthRow.style.display = (m === 'reverse') ? '' : 'none';
        updateFormula();
        calculate();
    }

    function updateFormula() {
        if (!els.formula) return;
        var is2152 = els.standard && els.standard.value === 'ipc2152';
        var key;
        if (mode === 'forward') key = is2152 ? 'pcb.formula.forward2152' : 'pcb.formula.forward';
        else key = is2152 ? 'pcb.formula.reverse2152' : 'pcb.formula.reverse';
        els.formula.textContent = tr(key);
    }

    function applyPreset(btn) {
        var amp = parseFloat(btn.getAttribute('data-amp'));
        els.current.value = amp;
        switchMode('forward');
    }

    function calculate() {
        hideStatus();
        var dT = getDT();
        var oz = els.copperOz.value;
        var thickMils = OZ_MIL[oz] || 1.378;
        var layer = els.layer.value;
        var std = els.standard ? els.standard.value : 'ipc2152';
        var plane = els.plane ? els.plane.value : 'none';
        var boardLmm = parseFloat(els.board.value) || 1.6;
        var Lmm = toMm(parseFloat(els.traceLen.value));
        if (isNaN(Lmm) || Lmm < 0) Lmm = 0;

        if (mode === 'forward') {
            var I = parseFloat(els.current.value);
            if (isNaN(I) || I <= 0) { showStatus('pcb.err.invalid'); setResultsEmpty(); drawChart(); return; }
            var widthMm, areaMils2;
            if (std === 'ipc2152') {
                widthMm = widthFor(I, dT, layer, oz, 'ipc2152', plane, boardLmm);
                areaMils2 = (widthMm / MIL_MM) * thickMils;   // 等效截面积（供 R/V/P 估算）
            } else {
                areaMils2 = areaFromCurrent(I, dT, layer);
                widthMm = (areaMils2 / thickMils) * MIL_MM;
            }
            var areaMm2 = areaMils2 * MIL_MM * MIL_MM;
            fillResults(widthMm, areaMm2, I, areaMils2, Lmm, dT);
        } else {
            var wmm = toMm(parseFloat(els.widthMm.value));
            if (isNaN(wmm) || wmm <= 0) { showStatus('pcb.err.invalid'); setResultsEmpty(); drawChart(); return; }
            var a2 = (wmm / MIL_MM) * thickMils;
            var Imax = currentForWidth(wmm, dT, layer, oz, std, plane, boardLmm);
            var a2mm2 = a2 * MIL_MM * MIL_MM;
            fillResults(wmm, a2mm2, Imax, a2, Lmm, dT);
        }
        drawChart();
    }

    function fillResults(widthMm, areaMm2, current, areaMils2, Lmm, dT) {
        els.widthResult.textContent = fmtVal(widthMm);
        els.widthResult.setAttribute('data-mm', widthMm.toFixed(4));
        els.widthUnit.textContent = unit;
        els.areaResult.textContent = fmtArea(areaMm2);
        els.areaUnit.textContent = (unit === 'mil') ? 'mil²' : 'mm²';
        els.currentResult.textContent = current.toFixed(3);
        if (Lmm > 0) {
            if (mode === 'reverse') showStatus('pcb.err.zeroLen', true);
            else hideStatus();
            var R = traceResistance(areaMils2, Lmm, dT);
            var Vdrop = current * R;
            var P = current * current * R;
            els.resResult.textContent = (R >= 1 ? R.toFixed(3) : R.toFixed(4));
            els.resUnit.textContent = 'Ω';
            els.vdropResult.textContent = (Vdrop >= 1 ? Vdrop.toFixed(3) : Vdrop.toFixed(4));
            els.vdropUnit.textContent = 'V';
            els.powerResult.textContent = (P >= 1 ? P.toFixed(3) : P.toFixed(4));
            els.powerUnit.textContent = 'W';
        } else {
            els.resResult.textContent = '--'; els.resUnit.textContent = 'Ω';
            els.vdropResult.textContent = '--'; els.vdropUnit.textContent = 'V';
            els.powerResult.textContent = '--'; els.powerUnit.textContent = 'W';
        }
        // mm/mil 换算器：自动填入正向结果宽度
        if (els.widthMmConv) els.widthMmConv.value = widthMm.toFixed(4);
        if (els.widthMilConv) els.widthMilConv.value = (widthMm / MIL_MM).toFixed(2);
    }

    // ============================================================
    //  推荐线宽参考表（随温升实时更新）
    // ============================================================
    function buildRefTable() {
        var dT = getDT();
        var std = els.standard ? els.standard.value : 'ipc2152';
        var plane = els.plane ? els.plane.value : 'none';
        var boardLmm = parseFloat(els.board.value) || 1.6;
        var commonI = [0.5, 1, 2, 3, 5, 10];
        var combos = [
            { layer: 'external', oz: '1' },
            { layer: 'external', oz: '2' },
            { layer: 'internal', oz: '1' },
            { layer: 'internal', oz: '2' }
        ];
        var html = '';
        for (var i = 0; i < commonI.length; i++) {
            var I = commonI[i];
            html += '<tr><td>' + I.toFixed(1) + '</td>';
            for (var c = 0; c < combos.length; c++) {
                var wmm = widthFor(I, dT, combos[c].layer, combos[c].oz, std, plane, boardLmm);
                html += '<td>' + fmtVal(wmm) + '</td>';
            }
            html += '</tr>';
        }
        els.refBody.innerHTML = html;
    }

    // ============================================================
    //  悬浮提示
    // ============================================================
    function hideTooltip() {
        if (els.chartTooltip) els.chartTooltip.style.opacity = '0';
        render();
    }
    function onChartHover(e) {
        if (!chartState) return;
        var rect = els.chartCanvas.getBoundingClientRect();
        var mx = e.clientX - rect.left;
        var my = e.clientY - rect.top;
        var cs = chartState;
        if (mx < cs.pad.l || mx > cs.pad.l + cs.plotW || my < cs.pad.t || my > cs.pad.t + cs.plotH) { hideTooltip(); return; }
        var frac = (mx - cs.pad.l) / cs.plotW;
        var w = cs.x.min + frac * (cs.x.max - cs.x.min);   // 显示单位
        if (w < 0.02) w = 0.02;
        var wmm = w * (cs.xUnit || 1);
        var imax = currentForWidth(wmm, cs.dT, cs.layer, cs.oz, cs.std, cs.plane, cs.boardLmm);
        render();
        var ctx = els.chartCanvas.getContext('2d');
        var xp = cs.pad.l + (w - cs.x.min) / (cs.x.max - cs.x.min) * cs.plotW;
        var yp = cs.pad.t + (1 - (imax - cs.y.min) / (cs.y.max - cs.y.min)) * cs.plotH;
        ctx.strokeStyle = cssVar('--pcb-chart-dot') || '#ef4444'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(xp, cs.pad.t); ctx.lineTo(xp, cs.pad.t + cs.plotH); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = cssVar('--pcb-chart-dot') || '#ef4444'; ctx.beginPath(); ctx.arc(xp, yp, 4, 0, Math.PI * 2); ctx.fill();
        var tip = els.chartTooltip;
        tip.textContent = fmtVal(wmm) + ' ' + unit + ' → ' + imax.toFixed(3) + ' A';
        tip.style.left = Math.min(xp + 12, cs.W - 130) + 'px';
        tip.style.top = Math.max(yp - 30, 4) + 'px';
        tip.style.opacity = '1';
    }

    // ============================================================
    //  单位切换
    // ============================================================
    function updateUnitSpans() {
        if (els.traceLenUnit) els.traceLenUnit.textContent = unit;
        if (els.widthInputUnit) els.widthInputUnit.textContent = unit;
        if (els.widthUnit) els.widthUnit.textContent = unit;
        if (els.areaUnit) els.areaUnit.textContent = (unit === 'mil') ? 'mil²' : 'mm²';
    }
    function updateBoardOptions() {
        var b = els.board;
        if (!b) return;
        var vals = [0.8, 1.0, 1.6, 2.0, 2.4];
        for (var i = 0; i < b.options.length; i++) {
            var vmm = vals[i] || parseFloat(b.options[i].value);
            b.options[i].textContent = (unit === 'mil')
                ? Math.round(vmm / MIL_MM) + ' mil'
                : vmm.toFixed(1) + ' mm';
        }
    }
    // 内层散热降额行与「走线层/标准」联动：仅内层 + 2152 可调
    function updateDerateRow() {
        var isInt = els.layer && els.layer.value === 'internal';
        var is2152 = els.standard && els.standard.value === 'ipc2152';
        var on = isInt && is2152;
        var d = els.innerDerate;
        if (d) {
            d.disabled = !on;
            d.style.opacity = on ? '' : '0.5';
        }
    }
    function setUnit(u, convertInputs) {
        var prev = unit;
        unit = (u === 'mil') ? 'mil' : 'mm';
        if (els.unitSel) els.unitSel.value = unit;
        if (convertInputs && prev !== unit) {
            var lv = parseFloat(els.traceLen.value);
            if (!isNaN(lv)) els.traceLen.value = rnd3(prev === 'mm' ? lv / MIL_MM : lv * MIL_MM);
            var wv = parseFloat(els.widthMm.value);
            if (!isNaN(wv)) els.widthMm.value = rnd3(prev === 'mm' ? wv / MIL_MM : wv * MIL_MM);
        }
        els.traceLen.step = (unit === 'mil') ? '1' : 'any';
        els.widthMm.step = (unit === 'mil') ? '1' : '0.05';
        updateUnitSpans();
        updateBoardOptions();
        calculate();
        buildRefTable();
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    function bindEvents() {
        var tabs = document.querySelectorAll('.mode-tab');
        for (var i = 0; i < tabs.length; i++) {
            (function (t) { t.addEventListener('click', function () { switchMode(t.getAttribute('data-mode')); }); })(tabs[i]);
        }
        els.tempRise.addEventListener('input', function () { calculate(); buildRefTable(); });
        els.copperOz.addEventListener('change', function () {
            var um = OZ_UM[els.copperOz.value];
            els.ozHint.textContent = um ? ('≈ ' + um + ' µm') : '';
            calculate();
        });
        els.layer.addEventListener('change', function () { updateDerateRow(); calculate(); });
        els.standard.addEventListener('change', function () { updateFormula(); updateDerateRow(); calculate(); buildRefTable(); });
        els.plane.addEventListener('change', function () { calculate(); buildRefTable(); });
        els.innerDerate.addEventListener('change', function () { calculate(); buildRefTable(); });
        els.board.addEventListener('change', function () { calculate(); buildRefTable(); });
        els.unitSel.addEventListener('change', function () {
            setUnit(els.unitSel.value, true);
            localStorage.setItem('toolbox-unit', els.unitSel.value);
        });
        els.traceLen.addEventListener('input', calculate);
        els.current.addEventListener('input', calculate);
        els.widthMm.addEventListener('input', calculate);
        // mm ↔ mil 双向换算（手动输入）
        els.widthMmConv.addEventListener('input', function () {
            var v = parseFloat(els.widthMmConv.value);
            if (isNaN(v)) { els.widthMilConv.value = ''; return; }
            els.widthMilConv.value = (v / MIL_MM).toFixed(2);
        });
        els.widthMilConv.addEventListener('input', function () {
            var v = parseFloat(els.widthMilConv.value);
            if (isNaN(v)) { els.widthMmConv.value = ''; return; }
            els.widthMmConv.value = (v * MIL_MM).toFixed(4);
        });
        els.chartWrapper.addEventListener('mousemove', onChartHover);
        els.chartWrapper.addEventListener('mouseleave', hideTooltip);

        var pbtns = els.presetBar ? els.presetBar.querySelectorAll('.pcb-preset-btn') : [];
        for (var pi = 0; pi < pbtns.length; pi++) {
            (function (b) { b.addEventListener('click', function () { applyPreset(b); }); })(pbtns[pi]);
        }

        var resizeTimer;
        window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawChart, 80); });
    }

    // ============================================================
    //  主题 & 语言 监听（不重定义 setTheme / setLang）
    // ============================================================
    document.addEventListener('themechange', function () { drawChart(); });
    document.addEventListener('languagechange', function () {
        document.title = tr('pcb.doc.title');
        updateFormula();
        calculate();
        buildRefTable();
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.addEventListener('DOMContentLoaded', function () {
        getEls();
        // 恢复上次单位选择（默认 mm）
        unit = (localStorage.getItem('toolbox-unit') === 'mil') ? 'mil' : 'mm';
        if (els.unitSel) els.unitSel.value = unit;
        if (unit === 'mil') {
            var lv0 = parseFloat(els.traceLen.value);
            if (!isNaN(lv0)) els.traceLen.value = rnd3(lv0 / MIL_MM);
            var wv0 = parseFloat(els.widthMm.value);
            if (!isNaN(wv0)) els.widthMm.value = rnd3(wv0 / MIL_MM);
            els.traceLen.step = '1';
            els.widthMm.step = '1';
        } else {
            els.traceLen.step = 'any';
            els.widthMm.step = '0.05';
        }
        updateUnitSpans();
        updateBoardOptions();
        updateDerateRow();
        bindEvents();
        document.title = tr('pcb.doc.title');
        var um = OZ_UM[els.copperOz.value];
        els.ozHint.textContent = um ? ('≈ ' + um + ' µm') : '';
        switchMode('forward');
        calculate();
        buildRefTable();
    });
})();
