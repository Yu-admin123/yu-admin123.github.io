/* ============================================================
   ViaCalc.js — PCB 过孔电流计算器
   纯静态 / 离线可用；曲线用原生 Canvas 绘制
   只写本页业务逻辑；setTheme / setLang 由 theme.js / i18n.js 提供

   计算模型（双标准，默认 IPC-2152）：
     过孔铜环截面积（精确圆环）：
       A = π · [(D/2+t)² − (D/2)²]，D=钻孔直径(mm)，t=电镀铜厚(µm)
     IPC-2221（铜环等效截面积法）：
       I = k · ΔT^0.44 · A_mil²^0.725，k = 0.048
     IPC-2152（铜环→内层 1oz 等效走线，业界通用近似）：
       W_eq = A_mil² / Th_1oz（按 1oz 铜厚折算等效走线宽）
       ΔT = K · I^a · W^b · Th^c（内层 1oz：K=200/a=1.9/b=-1.10/c=-1.52）
     修正系数（仅 IPC-2152）：
       邻近铜平面 ≈ +40% 载流
       过孔类型：通孔×1.0 / 盲孔×1.5 / 埋孔×2.0（散热降额）
       圆柱散热（随孔径自适应）：clamp(0.95·D+0.015, 0.25, 0.7)
         0.3mm≈0.56A 贴合实测（经验值 0.5~0.6A）
     单孔直流电阻：R = ρ(T) · L / A
   ============================================================ */
(function () {
    'use strict';

    // ============================================================
    //  翻译字典（含公共 key）
    // ============================================================
    window.I18N_STRINGS = {
        'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
        'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

        'via.doc.title':      { zh: 'PCB 过孔电流计算器', en: 'PCB Via Current Calculator' },
        'via.title':          { zh: '🕳️ PCB 过孔电流计算器', en: '🕳️ PCB Via Current Calculator' },
        'via.subhead':        { zh: '🔹 默认采用 IPC-2152 + 圆柱散热修正；通/盲/埋孔按散热环境自动降额。可切换回 IPC-2221 保守基线对比。正向求单孔最大载流，反向求并联过孔数量，并给出电阻、压降与功耗估算。',
                                en: '🔹 IPC-2152 by default  + adaptive cylindrical thermal factor; through/blind/buried auto-derated. Switch to IPC-2221 baseline. Forward single-via capacity; reverse parallel via count; plus R / ΔV / power.' },

        'via.p1.title':       { zh: '计算模式', en: 'Compute Mode' },
        'via.p1.small':       { zh: '正向 / 反向求解', en: 'Forward / Reverse' },
        'via.mode.forward':   { zh: '正向：求单孔载流', en: 'Forward: Via Current' },
        'via.mode.reverse':   { zh: '反向：求过孔数量', en: 'Reverse: Via Count' },

        'via.formula.forward':    { zh: 'I_via = 0.048·ΔT^0.44·A^0.725', en: 'I_via = 0.048·ΔT^0.44·A^0.725' },
        'via.formula.forward2152':{ zh: 'I_via = [ΔT / (K·(A/Th)^b·Th^c)]^(1/a)', en: 'I_via = [ΔT / (K·(A/Th)^b·Th^c)]^(1/a)' },
        'via.formula.reverse':    { zh: 'N = ⌈I_total / I_via⌉（并联均流）', en: 'N = ⌈I_total / I_via⌉ (parallel)' },
        'via.preset.title':       { zh: '常用电流预设', en: 'Common Current Presets' },

        'via.p2.title':       { zh: '输入参数', en: 'Inputs' },
        'via.p2.small':       { zh: '双标准 · IPC-2152 默认', en: 'Dual std · IPC-2152 default' },
        'via.label.std':      { zh: '计算标准', en: 'Standard' },
        'via.std.2152':       { zh: 'IPC-2152（推荐）', en: 'IPC-2152 (recommended)' },
        'via.std.2221':       { zh: 'IPC-2221（保守·内层降额）', en: 'IPC-2221 (conservative, inner derate)' },
        'via.label.unit':     { zh: '尺寸单位', en: 'Unit' },
        'via.unit.mm':        { zh: 'mm（毫米）', en: 'mm (millimeter)' },
        'via.unit.mil':       { zh: 'mil（密耳）', en: 'mil (1/1000 in)' },
        'via.label.dt':       { zh: '温升 ΔT', en: 'Temp Rise ΔT' },
        'via.label.plane':    { zh: '邻近铜平面', en: 'Nearby Plane' },
        'via.plane.none':     { zh: '无', en: 'None' },
        'via.plane.yes':      { zh: '有（≈+40% 载流）', en: 'Yes (≈+40% current)' },
        'via.hint.plane':     { zh: '仅 2152 生效', en: '2152 only' },
        'via.label.viaType':  { zh: '过孔类型', en: 'Via Type' },
        'via.type.through':   { zh: '通孔（贯穿整板）', en: 'Through (plated-thru)' },
        'via.type.blind':     { zh: '盲孔（一端通表层）', en: 'Blind (one side open)' },
        'via.type.buried':    { zh: '埋孔（完全埋入板内）', en: 'Buried (fully embedded)' },
        'via.hint.viaType':   { zh: '盲/埋孔散热差 · 仅 2152', en: 'blind/buried derated · 2152 only' },
        'via.label.d':        { zh: '钻孔直径 D', en: 'Drill Diameter D' },
        'via.label.plating':  { zh: '电镀铜厚', en: 'Plating Thickness' },
        'via.label.board':    { zh: '板厚 L', en: 'Board Thickness L' },
        'via.label.current':  { zh: '目标电流 I', en: 'Target Current I' },

        'via.p3.title':       { zh: '计算结果', en: 'Results' },
        'via.p3.small':       { zh: '实时计算', en: 'Live' },
        'via.result.viaI':    { zh: '单孔载流 I_via', en: 'Via Current I_via' },
        'via.result.n':       { zh: '需过孔数 N', en: 'Via Count N' },
        'via.result.nUnit':   { zh: '个', en: 'pcs' },
        'via.result.viaR':    { zh: '单孔电阻 R_via', en: 'Via Resistance R_via' },
        'via.result.totalR':  { zh: '并联总电阻 R', en: 'Total Resistance R' },
        'via.result.vdrop':   { zh: '压降 ΔV', en: 'Drop ΔV' },
        'via.result.power':   { zh: '功耗 P', en: 'Power P' },

        'via.p4.title':       { zh: '单孔载流能力曲线', en: 'Via Current Capacity' },
        'via.p4.small':       { zh: '随钻孔直径 / 镀铜厚变化', en: 'vs drill diameter / plating' },
        'via.chart.yAxisI':   { zh: '单孔载流 (A)', en: 'Via Current (A)' },
        'via.chart.xAxisD':   { zh: '钻孔直径', en: 'Drill Diameter' },

        'via.p5.title':       { zh: '推荐过孔数量参考', en: 'Via Count Reference' },
        'via.p5.small':       { zh: '常见电流 · 随参数实时更新', en: 'Common currents · live params' },
        'via.table.thI':      { zh: '电流 (A)', en: 'Current (A)' },

        'via.footer':         { zh: '🕳️ PCB 过孔电流计算器 · 正向求单孔载流 · 反向求过孔数量 · 默认 IPC-2152（可切 IPC-2221）· 电阻/压降/功耗估算',
                                en: '🕳️ PCB Via Current Calculator · Forward via current · Reverse via count · IPC-2152 default (IPC-2221 opt) · R/ΔV/Power' },

        'via.err.invalid':    { zh: '输入无效，请检查数值（孔径 / 目标电流须为正数）', en: 'Invalid input, please check values (diameter / current must be positive)' }
    };

    function tr(k) { return window.I18N.t(k); }

    // 温升 ΔT（支持手动输入；非法/≤0 回退默认 10°C）
    function getDT() {
        var v = parseFloat(els.tempRise.value);
        return (isNaN(v) || v <= 0) ? 10 : v;
    }

    // ============================================================
    //  物理常数与过孔模型
    // ============================================================
    var MIL2_M2 = 6.4516e-10;     // 1 mil² = (25.4e-6 m)² m²
    var MIL_MM = 0.0254;          // 1 mil = 0.0254 mm
    var RHO_20 = 1.724e-8;        // 铜电阻率 @20°C (Ω·m)
    var ALPHA = 0.0039;           // 铜电阻温度系数 (1/°C)
    var AMBIENT = 25;             // 环境温度 °C
    var K_EXTERNAL = 0.048;       // IPC-2221 外层系数（走线用）
    var K_INTERNAL = 0.024;       // IPC-2221 内层系数（过孔埋在板内，散热同内层走线，更保守）
    var OZ_MIL = { '0.5': 0.689, '1': 1.378, '2': 2.756, '3': 4.134 };
    var PLATING_CURVES = [17.5, 25, 35];   // 图中展示的镀铜厚 (µm)
    var PLANE_BOOST = 1.4;        // 邻近铜平面载流提升（仅 2152）
    // IPC-2152 内层 1oz（过孔"铜环→内层 1oz 等效走线"基准）
    var K2152_INT_1OZ = { K: 200, a: 1.9, b: -1.10, c: -1.52 };

    // 铜环截面积（m²）：外径 D+t，内径 D（精确圆环）
    function viaAreaAnnularM2(Dmm, tum) {
        var Rout = (Dmm / 2 + tum / 1000) / 1000;   // mm → m（外径）
        var Rin = Dmm / 2 / 1000;                     // mm → m（内径）
        return Math.PI * (Rout * Rout - Rin * Rin);
    }
    // 单孔最大载流 (A)：IPC-2221（铜环等效截面积法，内层 k=0.024 降额）
    // 注意：过孔埋在板内、散热环境同内层走线，故用内层系数而非外层 0.048，
    //      否则结果会偏乐观（比 IPC-2152 还大，违背"保守"语义）
    function viaCurrent2221(Dmm, tum, dT) {
        var A_mil2 = viaAreaAnnularM2(Dmm, tum) / MIL2_M2;
        return K_INTERNAL * Math.pow(dT, 0.44) * Math.pow(A_mil2, 0.725);
    }
    // 单孔最大载流 (A)：IPC-2152（铜环→内层 1oz 等效走线）
    function viaCurrent2152(Dmm, tum, dT) {
        var A_mil2 = viaAreaAnnularM2(Dmm, tum) / MIL2_M2;
        var p = K2152_INT_1OZ;
        var W_eq = A_mil2 / OZ_MIL['1'];   // 等效走线宽（按 1oz 铜厚 mil 折算）
        var denom = p.K * Math.pow(W_eq, p.b) * Math.pow(OZ_MIL['1'], p.c);
        return Math.pow(dT / denom, 1 / p.a);
    }
    // 单孔直流电阻（Ω）：板厚 L_mm、温升 dT
    function viaResistance(Dmm, tum, Lmm, dT) {
        var T = AMBIENT + dT;
        var rho = RHO_20 * (1 + ALPHA * (T - 20));
        return rho * (Lmm / 1000) / viaAreaAnnularM2(Dmm, tum);
    }
    // 圆柱散热修正（随孔径自适应）：小孔径表面积小/热阻大散热更差
    function viaThermalFactor(Dmm) {
        var t = 0.95 * Dmm + 0.015;
        if (t < 0.25) t = 0.25;
        if (t > 0.7) t = 0.7;
        return t;
    }
    // 过孔类型散热降额（仅 IPC-2152）：埋孔最保守
    function viaTypeDerate() {
        var t = els.viaType ? els.viaType.value : 'through';
        return (t === 'buried') ? 2 : ((t === 'blind') ? 1.5 : 1);
    }
    // 按标准分发 + 修正系数
    function viaCurrentFor(Dmm, tum, dT, std, plane) {
        var I = (std === 'ipc2152') ? viaCurrent2152(Dmm, tum, dT) : viaCurrent2221(Dmm, tum, dT);
        if (std === 'ipc2152' && plane === 'yes') I *= PLANE_BOOST;
        if (std === 'ipc2152') I /= viaTypeDerate();
        I *= viaThermalFactor(Dmm);
        return I;
    }

    // ============================================================
    //  DOM 引用
    // ============================================================
    var els = {};
    function getEls() {
        els.standard = document.getElementById('standard');
        els.unitSel = document.getElementById('unitSel');
        els.tempRise = document.getElementById('tempRise');
        els.plane = document.getElementById('plane');
        els.viaType = document.getElementById('viaType');
        els.drillD = document.getElementById('drillD');
        els.drillDUnit = document.getElementById('drillDUnit');
        els.plating = document.getElementById('plating');
        els.boardL = document.getElementById('boardL');
        els.boardLUnit = document.getElementById('boardLUnit');
        els.targetCurrent = document.getElementById('targetCurrent');
        els.currentRow = document.getElementById('currentRow');
        els.viaIResult = document.getElementById('viaIResult');
        els.nResult = document.getElementById('nResult');
        els.viaRResult = document.getElementById('viaRResult');
        els.totalRResult = document.getElementById('totalRResult');
        els.vdropResult = document.getElementById('vdropResult');
        els.powerResult = document.getElementById('powerResult');
        els.statusMsg = document.getElementById('statusMsg');
        els.chartCanvas = document.getElementById('chartCanvas');
        els.chartWrapper = document.getElementById('chartWrapper');
        els.chartTooltip = document.getElementById('chartTooltip');
        els.chartLegend = document.getElementById('chartLegend');
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
    //  单位换算与格式化
    // ============================================================
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
        // 直接用用户原始 min 作为图框起点；
        // niceMax 钳制在 max 之内，避免 niceMax > 数据范围导致右侧空白
        var niceMin = min;
        var niceMax = Math.min(max, Math.ceil(max / step) * step);
        var ticks = [];
        for (var v = niceMin; v <= niceMax + step / 2; v += step) ticks.push(+v.toFixed(10));
        return { min: niceMin, max: niceMax, step: step, ticks: ticks };
    }

    // 图表状态（供悬浮复用）
    var chartState = null;

    function render() {
        var setup = ensureCanvas();
        var ctx = setup.ctx, W = setup.W, H = setup.H;
        if (W < 10 || H < 10) return;

        var bg = cssVar('--via-chart-bg') || '#fff';
        var gridCol = cssVar('--via-chart-grid') || '#e9edf4';
        var axisCol = cssVar('--via-chart-axis') || '#94a3b8';
        var labelCol = cssVar('--via-chart-label') || '#64748b';
        var lineCol = cssVar('--via-chart-line') || '#f59e0b';
        var line2Col = cssVar('--via-chart-line2') || '#94a3b8';
        var fillCol = cssVar('--via-chart-fill') || 'rgba(245,158,11,0.1)';
        var dotCol = cssVar('--via-chart-dot') || '#ef4444';

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

        var dT = getDT();
        var Dmm = toMm(parseFloat(els.drillD.value));
        if (!(Dmm > 0)) Dmm = 0.4;
        var tum = parseFloat(els.plating.value) || 35;
        var std = els.standard ? els.standard.value : 'ipc2152';
        var plane = els.plane ? els.plane.value : 'none';
        var workI = viaCurrentFor(Dmm, tum, dT, std, plane);

        // X 轴范围：以工作孔径为基准自适应（x 轴按显示单位绘制）
        var xMin = 0.15;
        var xMax = Math.max(1.2, Dmm * 1.6);
        var xUnit = (unit === 'mil') ? MIL_MM : 1;
        var xMinU = (unit === 'mil') ? Math.ceil(xMin / xUnit) : xMin;
        var xMaxU = (unit === 'mil') ? Math.ceil(xMax / xUnit) : xMax;

        var N = 120;
        function seriesFor(t) {
            var pts = [];
            for (var i = 0; i <= N; i++) {
                var d = xMin + (xMax - xMin) * i / N;
                pts.push({ d: d / xUnit, I: viaCurrentFor(d, t, dT, std, plane) });
            }
            return pts;
        }

        var pad = { l: 40, r: 18, t: 16, b: 38 };
        var plotW = W - pad.l - pad.r;
        var plotH = H - pad.t - pad.b;
        var x = looseLabel(xMinU, xMaxU, (unit === 'mil') ? 8 : 7);
        var iMax = viaCurrentFor(xMax, tum, dT, std, plane);
        var ymax = Math.max(iMax, 1e-3);
        var y = looseLabel(0, ymax, 5);

        function xToPx(dv) { return pad.l + (dv - x.min) / (x.max - x.min) * plotW; }
        function yToPx(iv) { return pad.t + (1 - (iv - y.min) / (y.max - y.min)) * plotH; }

        // 网格
        ctx.strokeStyle = gridCol; ctx.lineWidth = 1; ctx.beginPath();
        for (var i = 0; i < x.ticks.length; i++) { var xp = xToPx(x.ticks[i]); ctx.moveTo(xp, pad.t); ctx.lineTo(xp, pad.t + plotH); }
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
        for (i = 0; i < y.ticks.length; i++) ctx.fillText(y.ticks[i].toFixed(y.step < 1 ? 1 : 0), pad.l - 6, yToPx(y.ticks[i]));
        // X 轴标题
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText(tr('via.chart.xAxisD') + ' (' + unit + ')', pad.l + plotW / 2, H - 2);
        // Y 轴标题（旋转）
        ctx.save(); ctx.translate(12, pad.t + plotH / 2); ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(tr('via.chart.yAxisI'), 0, 0); ctx.restore();

        // 多镀铜厚曲线：当前镀铜高亮，其余细线
        var sMain = seriesFor(tum);
        for (var c = 0; c < PLATING_CURVES.length; c++) {
            if (Math.abs(PLATING_CURVES[c] - tum) < 0.001) continue;
            var s = seriesFor(PLATING_CURVES[c]);
            ctx.strokeStyle = line2Col; ctx.lineWidth = 1.2; ctx.beginPath();
            ctx.moveTo(xToPx(s[0].d), yToPx(s[0].I));
            for (i = 1; i < s.length; i++) ctx.lineTo(xToPx(s[i].d), yToPx(s[i].I));
            ctx.stroke();
        }

        // 当前镀铜厚曲线（高亮 + 填充）
        ctx.beginPath(); ctx.moveTo(xToPx(sMain[0].d), yToPx(sMain[0].I));
        for (i = 1; i < sMain.length; i++) ctx.lineTo(xToPx(sMain[i].d), yToPx(sMain[i].I));
        ctx.lineTo(xToPx(sMain[sMain.length - 1].d), pad.t + plotH);
        ctx.lineTo(xToPx(sMain[0].d), pad.t + plotH); ctx.closePath();
        ctx.fillStyle = fillCol; ctx.fill();
        ctx.strokeStyle = lineCol; ctx.lineWidth = 2.2; ctx.beginPath();
        ctx.moveTo(xToPx(sMain[0].d), yToPx(sMain[0].I));
        for (i = 1; i < sMain.length; i++) ctx.lineTo(xToPx(sMain[i].d), yToPx(sMain[i].I));
        ctx.stroke();

        // 图例（DOM 渲染：X 轴下方居中，圆点+文字）
        if (els.chartLegend) {
            var html = '';
            for (var g = 0; g < PLATING_CURVES.length; g++) {
                var t = PLATING_CURVES[g];
                var active = Math.abs(t - tum) < 0.001;
                var color = active ? lineCol : line2Col;
                html += '<span class="chart-legend-item' + (active ? ' active' : '') + '">'
                      + '<span class="chart-legend-dot" style="background:' + color + ';"></span>'
                      + '镀铜 ' + t + ' µm</span>';
            }
            els.chartLegend.innerHTML = html;
        }

        // 当前工作点
        if ((Dmm / xUnit) >= x.min && (Dmm / xUnit) <= x.max && workI >= y.min && workI <= y.max) {
            ctx.fillStyle = dotCol; ctx.beginPath();
            ctx.arc(xToPx(Dmm / xUnit), yToPx(workI), 4, 0, Math.PI * 2); ctx.fill();
        }

        chartState = { x: x, y: y, pad: pad, plotW: plotW, plotH: plotH, dT: dT, tum: tum, std: std, plane: plane, xUnit: xUnit, W: W, H: H };
    }
    function drawChart() { render(); }

    // ============================================================
    //  输入 / 计算
    // ============================================================
    function fillNum(el, n, decimals) {
        el.textContent = isFinite(n) ? n.toFixed(decimals) : '--';
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
        els.currentRow.style.display = (m === 'reverse') ? '' : 'none';
        updateFormula();
        calculate();
    }

    function updateFormula() {
        if (!els.formula) return;
        if (mode === 'forward') {
            var is2152 = els.standard && els.standard.value === 'ipc2152';
            els.formula.textContent = tr(is2152 ? 'via.formula.forward2152' : 'via.formula.forward');
        } else {
            els.formula.textContent = tr('via.formula.reverse');
        }
    }

    function applyPreset(btn) {
        var amp = parseFloat(btn.getAttribute('data-amp'));
        els.targetCurrent.value = amp;
        switchMode('reverse');
    }

    function calculate() {
        hideStatus();
        var dT = getDT();
        var Dmm = toMm(parseFloat(els.drillD.value));
        var tum = parseFloat(els.plating.value) || 35;
        var std = els.standard ? els.standard.value : 'ipc2152';
        var plane = els.plane ? els.plane.value : 'none';
        var Lmm = toMm(parseFloat(els.boardL.value));
        if (isNaN(Lmm) || Lmm < 0) Lmm = 0;

        // 兜底默认：无效输入用合理默认继续计算，绝不清空结果
        if (isNaN(Dmm) || Dmm <= 0) Dmm = 0.4;

        var I_via = viaCurrentFor(Dmm, tum, dT, std, plane);
        var R_via = viaResistance(Dmm, tum, Lmm, dT);
        var N, I;
        if (mode === 'forward') {
            N = 1;
            I = I_via;
        } else {
            var Itotal = parseFloat(els.targetCurrent.value);
            if (isNaN(Itotal) || Itotal <= 0) Itotal = 1;
            N = Math.max(1, Math.ceil(Itotal / I_via));
            I = Itotal;
        }

        var R_total = R_via / N;
        var Vdrop = I * R_total;
        var P = I * I * R_total;

        fillNum(els.viaIResult, I_via, 2);
        els.nResult.textContent = N;
        fillNum(els.viaRResult, R_via * 1000, 2);
        fillNum(els.totalRResult, R_total * 1000, 2);
        fillNum(els.vdropResult, Vdrop * 1000, 2);
        fillNum(els.powerResult, P * 1000, 2);
        drawChart();
    }

    // ============================================================
    //  推荐过孔数量参考表
    // ============================================================
    function buildRefTable() {
        var dT = getDT();
        var tum = parseFloat(els.plating.value) || 35;
        var std = els.standard ? els.standard.value : 'ipc2152';
        var plane = els.plane ? els.plane.value : 'none';
        var commonI = [1, 2, 3, 5, 10, 20];
        var drills = [0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.0];
        var html = '';
        for (var i = 0; i < commonI.length; i++) {
            var I = commonI[i];
            html += '<tr><td>' + I.toFixed(0) + '</td>';
            for (var c = 0; c < drills.length; c++) {
                var iv = viaCurrentFor(drills[c], tum, dT, std, plane);
                var n = Math.max(1, Math.ceil(I / iv));
                html += '<td>' + n + '</td>';
            }
            html += '</tr>';
        }
        els.refBody.innerHTML = html;
    }
    function updateRefHeaders() {
        var drills = [0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.0];
        var ths = document.querySelectorAll('#refTable thead th');
        for (var i = 1; i < ths.length; i++) {
            var dmm = drills[i - 1];
            ths[i].textContent = 'Ø' + (unit === 'mil' ? Math.round(dmm / MIL_MM) : dmm.toFixed(1));
        }
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
        var d = cs.x.min + frac * (cs.x.max - cs.x.min);   // 显示单位
        if (d < 0.05) d = 0.05;
        var dmm = d * (cs.xUnit || 1);
        var imax = viaCurrentFor(dmm, cs.tum, cs.dT, cs.std, cs.plane);
        render();
        var ctx = els.chartCanvas.getContext('2d');
        var xp = cs.pad.l + (d - cs.x.min) / (cs.x.max - cs.x.min) * cs.plotW;
        var yp = cs.pad.t + (1 - (imax - cs.y.min) / (cs.y.max - cs.y.min)) * cs.plotH;
        ctx.strokeStyle = cssVar('--via-chart-dot') || '#ef4444'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(xp, cs.pad.t); ctx.lineTo(xp, cs.pad.t + cs.plotH); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = cssVar('--via-chart-dot') || '#ef4444'; ctx.beginPath(); ctx.arc(xp, yp, 4, 0, Math.PI * 2); ctx.fill();
        var tip = els.chartTooltip;
        tip.textContent = 'Ø' + fmtVal(dmm) + ' ' + unit + ' → ' + imax.toFixed(2) + ' A';
        tip.style.left = Math.min(xp + 12, cs.W - 130) + 'px';
        tip.style.top = Math.max(yp - 30, 4) + 'px';
        tip.style.opacity = '1';
    }

    // ============================================================
    //  单位切换
    // ============================================================
    function updateUnitSpans() {
        if (els.drillDUnit) els.drillDUnit.textContent = unit;
        if (els.boardLUnit) els.boardLUnit.textContent = unit;
    }
    function setUnit(u, convertInputs) {
        var prev = unit;
        unit = (u === 'mil') ? 'mil' : 'mm';
        if (els.unitSel) els.unitSel.value = unit;
        if (convertInputs && prev !== unit) {
            var dv = parseFloat(els.drillD.value);
            if (!isNaN(dv)) els.drillD.value = rnd3(prev === 'mm' ? dv / MIL_MM : dv * MIL_MM);
            var bv = parseFloat(els.boardL.value);
            if (!isNaN(bv)) els.boardL.value = rnd3(prev === 'mm' ? bv / MIL_MM : bv * MIL_MM);
        }
        els.drillD.step = (unit === 'mil') ? '1' : '0.05';
        els.boardL.step = (unit === 'mil') ? '5' : '0.1';
        updateUnitSpans();
        updateRefHeaders();
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
        els.standard.addEventListener('change', function () { updateFormula(); calculate(); buildRefTable(); });
        els.unitSel.addEventListener('change', function () {
            setUnit(els.unitSel.value, true);
            localStorage.setItem('toolbox-unit', els.unitSel.value);
        });
        els.tempRise.addEventListener('input', function () { calculate(); buildRefTable(); });
        els.plane.addEventListener('change', function () { calculate(); buildRefTable(); });
        els.viaType.addEventListener('change', function () { calculate(); buildRefTable(); });
        els.drillD.addEventListener('input', function () { calculate(); buildRefTable(); });
        els.plating.addEventListener('change', function () { calculate(); buildRefTable(); });
        els.boardL.addEventListener('input', function () { calculate(); buildRefTable(); });
        els.targetCurrent.addEventListener('input', function () { calculate(); buildRefTable(); });
        els.chartWrapper.addEventListener('mousemove', onChartHover);
        els.chartWrapper.addEventListener('mouseleave', hideTooltip);

        var pbtns = els.presetBar ? els.presetBar.querySelectorAll('.via-preset-btn') : [];
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
        document.title = tr('via.doc.title');
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
            var dv0 = parseFloat(els.drillD.value);
            if (!isNaN(dv0)) els.drillD.value = rnd3(dv0 / MIL_MM);
            var bv0 = parseFloat(els.boardL.value);
            if (!isNaN(bv0)) els.boardL.value = rnd3(bv0 / MIL_MM);
            els.drillD.step = '1';
            els.boardL.step = '5';
        } else {
            els.drillD.step = '0.05';
            els.boardL.step = '0.1';
        }
        updateUnitSpans();
        updateRefHeaders();
        bindEvents();
        document.title = tr('via.doc.title');
        switchMode('forward');
        calculate();
        buildRefTable();
    });
})();
