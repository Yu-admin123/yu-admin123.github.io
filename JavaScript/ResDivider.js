/* ============================================================
   ResDivider.js — 电阻分压计算器
   纯静态 / 离线可用；曲线用原生 Canvas 绘制
   只写本页业务逻辑；setTheme / setLang 由 theme.js / i18n.js 提供
   ============================================================ */
(function () {
    'use strict';

    // ============================================================
    //  翻译字典（含公共 key）
    // ============================================================
    window.I18N_STRINGS = {
        'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
        'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

        'rdiv.doc.title':     { zh: '电阻分压计算器', en: 'Resistive Divider Calculator' },
        'rdiv.title':         { zh: '🧮 电阻分压计算器', en: '🧮 Resistive Divider Calculator' },
        'rdiv.subhead':       { zh: '🔹 常规电阻分压计算器：正向根据 Vin / R1 / R2 求输出电压，反向根据目标 Vout 求分压电阻，并给出 E24 标准电阻推荐。',
                                en: '🔹 Standard resistive divider calculator: forward Vout from Vin/R1/R2, reverse solve R for a target Vout, with E24 standard-value recommendation.' },

        'rdiv.p1.title':      { zh: '计算模式', en: 'Compute Mode' },
        'rdiv.p1.small':      { zh: '正向 / 反向求解', en: 'Forward / Reverse' },
        'rdiv.mode.forward':   { zh: '正向：求 Vout', en: 'Forward: Vout' },
        'rdiv.mode.reverseR2': { zh: '反向：求 R2', en: 'Reverse: R2' },
        'rdiv.mode.reverseR1': { zh: '反向：求 R1', en: 'Reverse: R1' },

        'rdiv.formula.forward':   { zh: 'Vout = Vin · R₂ / (R₁ + R₂)', en: 'Vout = Vin · R₂ / (R₁ + R₂)' },
        'rdiv.formula.reverseR2': { zh: 'R₂ = R₁ · Vout / (Vin − Vout)', en: 'R₂ = R₁ · Vout / (Vin − Vout)' },
        'rdiv.formula.reverseR1': { zh: 'R₁ = R₂ · (Vin − Vout) / Vout', en: 'R₁ = R₂ · (Vin − Vout) / Vout' },
        'rdiv.preset.title':      { zh: '常用分压预设', en: 'Common Presets' },

        'rdiv.p2.title':      { zh: '输入参数', en: 'Inputs' },
        'rdiv.p2.small':      { zh: '单位可切换 Ω/kΩ/MΩ', en: 'Units Ω/kΩ/MΩ' },
        'rdiv.label.vin':      { zh: '输入电压 Vin', en: 'Input Vin' },
        'rdiv.label.r1':       { zh: '上电阻 R1', en: 'Top R1' },
        'rdiv.label.r2':       { zh: '下电阻 R2', en: 'Bottom R2' },
        'rdiv.label.voutTarget': { zh: '目标 Vout', en: 'Target Vout' },
        'rdiv.label.rl':       { zh: '负载 RL', en: 'Load RL' },
        'rdiv.hint.rl':        { zh: '0 = 无负载', en: '0 = no load' },
        'rdiv.label.chartVar': { zh: '曲线变量', en: 'Chart Var' },
        'rdiv.chart.varR2':    { zh: 'R2 变化 (固定 R1)', en: 'R2 sweep (R1 fixed)' },
        'rdiv.chart.varR1':    { zh: 'R1 变化 (固定 R2)', en: 'R1 sweep (R2 fixed)' },
        'rdiv.label.range':    { zh: '曲线范围', en: 'Sweep Range' },
        'rdiv.btn.recommend':  { zh: '💡 推荐标准电阻组合', en: '💡 Recommend E24' },

        'rdiv.p3.title':      { zh: '计算结果', en: 'Results' },
        'rdiv.p3.small':      { zh: '实时计算', en: 'Live' },
        'rdiv.result.vout':    { zh: '输出电压 Vout', en: 'Vout' },
        'rdiv.result.ratio':   { zh: '分压比', en: 'Ratio' },
        'rdiv.result.current': { zh: '电流 I', en: 'Current I' },
        'rdiv.result.p1':      { zh: 'R1 功耗', en: 'R1 Power' },
        'rdiv.result.p2':      { zh: 'R2 功耗', en: 'R2 Power' },
        'rdiv.result.ptotal':  { zh: '总功耗', en: 'Total Power' },

        'rdiv.p4.title':      { zh: '分压曲线', en: 'Divider Curve' },
        'rdiv.p4.small':      { zh: 'Vout 随电阻变化', en: 'Vout vs R' },
        'rdiv.chart.yAxisVout': { zh: 'Vout (V)', en: 'Vout (V)' },
        'rdiv.chart.xAxisR2': { zh: 'R2 (Ω)', en: 'R2 (Ω)' },
        'rdiv.chart.xAxisR1': { zh: 'R1 (Ω)', en: 'R1 (Ω)' },

        'rdiv.p5.title':      { zh: '推荐标准电阻组合', en: 'E24 Recommendation' },
        'rdiv.p5.small':      { zh: 'E24 系列 · 按误差排序', en: 'E24 series · sorted by error' },
        'rdiv.table.thR1':     { zh: 'R1 (Ω)', en: 'R1 (Ω)' },
        'rdiv.table.thR2':     { zh: 'R2 (Ω)', en: 'R2 (Ω)' },
        'rdiv.table.thVout':   { zh: '实际 Vout (V)', en: 'Actual Vout (V)' },
        'rdiv.table.thErr':    { zh: '误差 (%)', en: 'Error (%)' },
        'rdiv.table.thPower':  { zh: '功耗 (mW)', en: 'Power (mW)' },

        'rdiv.footer':        { zh: '🧮 电阻分压计算器 · 正向求 Vout · 反向求 R1/R2 · E24 标准电阻推荐',
                                en: '🧮 Resistive Divider Calculator · Forward Vout · Reverse R1/R2 · E24 standard recommendation' },

        'rdiv.err.invalid':    { zh: '输入无效，请检查数值（电阻须为正数）', en: 'Invalid input, please check values (resistors must be positive)' },
        'rdiv.err.range':      { zh: '曲线范围无效（最小须小于最大）', en: 'Sweep range invalid (min must be < max)' },
        'rdiv.err.vinSmall':   { zh: 'Vin 须大于目标 Vout', en: 'Vin must exceed target Vout' },
        'rdiv.warn.noRecommend': { zh: '当前条件下无误差 < 10% 的 E24 组合', en: 'No E24 combo with error < 10% for current settings' },
        'rdiv.status.recommendHint': { zh: '切换到反向模式可查看推荐电阻', en: 'Switch to reverse mode to see recommendations' }
    };

    function tr(k) { return window.I18N.t(k); }

    // ============================================================
    //  E24 标准电阻系列
    // ============================================================
    var E24_BASE = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1];
    function generateE24(minVal, maxVal) {
        var values = [];
        for (var d = 0; d <= 7; d++) {
            var mult = Math.pow(10, d);
            for (var b = 0; b < E24_BASE.length; b++) {
                var v = E24_BASE[b] * mult;
                if (v >= minVal && v <= maxVal) values.push(v);
            }
        }
        return values;
    }

    // ============================================================
    //  DOM 引用
    // ============================================================
    var els = {};
    function getEls() {
        els.vin = document.getElementById('vin');
        els.r1 = document.getElementById('r1');
        els.r2 = document.getElementById('r2');
        els.r1Unit = document.getElementById('r1Unit');
        els.r2Unit = document.getElementById('r2Unit');
        els.rl = document.getElementById('rl');
        els.rlUnit = document.getElementById('rlUnit');
        els.voutTarget = document.getElementById('voutTarget');
        els.chartVar = document.getElementById('chartVar');
        els.rangeMin = document.getElementById('rangeMin');
        els.rangeMax = document.getElementById('rangeMax');
        els.r1Row = document.getElementById('r1Row');
        els.r2Row = document.getElementById('r2Row');
        els.voutRow = document.getElementById('voutRow');
        els.recommendBtn = document.getElementById('recommendBtn');
        els.voutResult = document.getElementById('voutResult');
        els.ratioResult = document.getElementById('ratioResult');
        els.currentResult = document.getElementById('currentResult');
        els.p1Result = document.getElementById('p1Result');
        els.p2Result = document.getElementById('p2Result');
        els.ptotalResult = document.getElementById('ptotalResult');
        els.statusMsg = document.getElementById('statusMsg');
        els.chartCanvas = document.getElementById('chartCanvas');
        els.chartWrapper = document.getElementById('chartWrapper');
        els.chartTooltip = document.getElementById('chartTooltip');
        els.recommendPanel = document.getElementById('recommendPanel');
        els.presetBar = document.getElementById('presetBar');
        els.formula = document.getElementById('modeFormula');
        els.recBody = document.getElementById('recBody');
    }

    // ============================================================
    //  状态
    // ============================================================
    var mode = 'forward';

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
    function fmtRes(r) {
        if (!isFinite(r)) return '--';
        var n;
        if (r >= 1e6) n = Math.round(r / 1e6 * 10) / 10 + 'M';
        else if (r >= 1e3) n = Math.round(r / 1e3 * 10) / 10 + 'k';
        else n = String(Math.round(r * 100) / 100);
        return n;
    }
    function computeVout(Vin, R1, R2, RL) {
        var R2eq = (RL === Infinity) ? R2 : (R2 * RL) / (R2 + RL);
        if (!isFinite(R2eq)) R2eq = R2;
        if (R1 + R2eq === 0) return 0;
        return Vin * R2eq / (R1 + R2eq);
    }

    // 图表状态（供悬浮复用）
    var chartState = null;

    function render() {
        var setup = ensureCanvas();
        var ctx = setup.ctx, W = setup.W, H = setup.H;
        if (W < 10 || H < 10) return;

        var bg = cssVar('--rdiv-chart-bg') || '#fff';
        var gridCol = cssVar('--rdiv-chart-grid') || '#e9edf4';
        var axisCol = cssVar('--rdiv-chart-axis') || '#94a3b8';
        var labelCol = cssVar('--rdiv-chart-label') || '#64748b';
        var lineCol = cssVar('--rdiv-chart-line') || '#6366f1';
        var fillCol = cssVar('--rdiv-chart-fill') || 'rgba(99,102,241,0.1)';
        var dotCol = cssVar('--rdiv-chart-dot') || '#ef4444';

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

        var Vin = parseFloat(els.vin.value) || 0;
        var R1 = getResistance(els.r1, els.r1Unit);
        var R2 = getResistance(els.r2, els.r2Unit);
        var RL = getResistance(els.rl, els.rlUnit);
        var RL_eff = (isNaN(RL) || RL <= 0) ? Infinity : RL;
        var varType = els.chartVar.value;
        var minVal = parseFloat(els.rangeMin.value);
        var maxVal = parseFloat(els.rangeMax.value);

        if (isNaN(minVal) || isNaN(maxVal) || minVal >= maxVal) {
            ctx.fillStyle = labelCol; ctx.font = '12px system-ui, sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(tr('rdiv.err.range'), W / 2, H / 2);
            chartState = null;
            return;
        }

        var fixed = (varType === 'R2') ? (R1 > 0 ? R1 : 10000) : (R2 > 0 ? R2 : 10000);
        var variableLabel = (varType === 'R2') ? tr('rdiv.chart.xAxisR2') : tr('rdiv.chart.xAxisR1');

        var N = 140;
        var pts = [];
        var vMax = 0;
        for (var i = 0; i <= N; i++) {
            var r = minVal + (maxVal - minVal) * i / N;
            var Req = (RL_eff === Infinity) ? r : r * RL_eff / (r + RL_eff);
            if (!isFinite(Req)) Req = r;
            var v = Vin * Req / (fixed + Req);
            pts.push({ r: r, v: v });
            if (v > vMax) vMax = v;
        }

        var pad = { l: 40, r: 18, t: 16, b: 38 };
        var plotW = W - pad.l - pad.r;
        var plotH = H - pad.t - pad.b;
        var x = looseLabel(minVal, maxVal, 7);
        var ymax = Math.max(vMax, 1e-4);
        var y = looseLabel(0, ymax, 5);

        function xToPx(rv) { return pad.l + (rv - x.min) / (x.max - x.min) * plotW; }
        function yToPx(vv) { return pad.t + (1 - (vv - y.min) / (y.max - y.min)) * plotH; }

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
        for (i = 0; i < x.ticks.length; i++) ctx.fillText(fmtRes(x.ticks[i]), xToPx(x.ticks[i]), pad.t + plotH + 6);
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        for (i = 0; i < y.ticks.length; i++) ctx.fillText(y.ticks[i].toFixed(y.step < 1 ? 2 : (y.step < 10 ? 1 : 0)), pad.l - 6, yToPx(y.ticks[i]));
        // X 轴标题
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText(variableLabel, pad.l + plotW / 2, H - 2);
        // Y 轴标题（旋转）
        ctx.save(); ctx.translate(12, pad.t + plotH / 2); ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(tr('rdiv.chart.yAxisVout'), 0, 0); ctx.restore();

        // 填充区域
        ctx.beginPath(); ctx.moveTo(xToPx(pts[0].r), yToPx(pts[0].v));
        for (i = 1; i < pts.length; i++) ctx.lineTo(xToPx(pts[i].r), yToPx(pts[i].v));
        ctx.lineTo(xToPx(pts[pts.length - 1].r), pad.t + plotH);
        ctx.lineTo(xToPx(pts[0].r), pad.t + plotH); ctx.closePath();
        ctx.fillStyle = fillCol; ctx.fill();

        // 曲线
        ctx.strokeStyle = lineCol; ctx.lineWidth = 2; ctx.beginPath();
        ctx.moveTo(xToPx(pts[0].r), yToPx(pts[0].v));
        for (i = 1; i < pts.length; i++) ctx.lineTo(xToPx(pts[i].r), yToPx(pts[i].v));
        ctx.stroke();

        // 当前工作点
        var curVar = (varType === 'R2') ? R2 : R1;
        if (curVar > 0 && curVar >= x.min && curVar <= x.max) {
            var Req2 = (RL_eff === Infinity) ? curVar : curVar * RL_eff / (curVar + RL_eff);
            if (!isFinite(Req2)) Req2 = curVar;
            var vv2 = Vin * Req2 / (fixed + Req2);
            ctx.fillStyle = dotCol; ctx.beginPath();
            ctx.arc(xToPx(curVar), yToPx(vv2), 4, 0, Math.PI * 2); ctx.fill();
        }

        chartState = { x: x, y: y, pad: pad, plotW: plotW, plotH: plotH, Vin: Vin, fixed: fixed, RL: RL_eff, varType: varType, W: W, H: H };
    }
    function drawChart() { render(); }

    // ============================================================
    //  输入 / 计算
    // ============================================================
    function getResistance(inputEl, unitEl) {
        var v = parseFloat(inputEl.value);
        var u = parseFloat(unitEl.value) || 1;
        if (isNaN(v)) return NaN;
        return Math.max(0, v * u);
    }

    function setResultsEmpty() {
        els.voutResult.textContent = '--';
        els.ratioResult.textContent = '--';
        els.currentResult.textContent = '--';
        els.p1Result.textContent = '--';
        els.p2Result.textContent = '--';
        els.ptotalResult.textContent = '--';
    }
    function showStatus(key, isWarn) {
        els.statusMsg.textContent = tr(key);
        els.statusMsg.className = isWarn ? 'status-warn' : 'status-error';
        els.statusMsg.style.display = 'block';
    }
    function hideStatus() { els.statusMsg.style.display = 'none'; }

    function fillResults(Vin, R1, R2, RL, Vout) {
        var R2eq = (RL === Infinity) ? R2 : (R2 * RL) / (R2 + RL);
        if (!isFinite(R2eq)) R2eq = R2;
        var Rtotal = R1 + R2eq;
        var I = (Rtotal === 0) ? 0 : Vin / Rtotal;
        var P1 = (R1 === 0) ? 0 : I * I * R1;
        var P2 = (R2 === 0) ? 0 : I * I * R2;
        var Ptotal = P1 + P2;
        var ratio = (R1 + R2eq === 0) ? 0 : R2eq / (R1 + R2eq);
        els.voutResult.textContent = Vout.toFixed(4);
        els.ratioResult.textContent = ratio.toFixed(4);
        els.currentResult.textContent = (I * 1000).toFixed(2);
        els.p1Result.textContent = (P1 * 1000).toFixed(2);
        els.p2Result.textContent = (P2 * 1000).toFixed(2);
        els.ptotalResult.textContent = (Ptotal * 1000).toFixed(2);
    }

    function switchMode(m) {
        mode = m;
        var tabs = document.querySelectorAll('.mode-tab');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.toggle('active', tabs[i].getAttribute('data-mode') === m);
        }
        els.r1Row.style.display = (m === 'forward' || m === 'reverseR2') ? '' : 'none';
        els.r2Row.style.display = (m === 'forward' || m === 'reverseR1') ? '' : 'none';
        els.voutRow.style.display = (m === 'reverseR2' || m === 'reverseR1') ? '' : 'none';
        if (m === 'reverseR2') els.chartVar.value = 'R2';
        else if (m === 'reverseR1') els.chartVar.value = 'R1';
        updateFormula();
        calculate();
    }

    function updateFormula() {
        if (!els.formula) return;
        var key = (mode === 'forward') ? 'rdiv.formula.forward'
                : (mode === 'reverseR2') ? 'rdiv.formula.reverseR2'
                : 'rdiv.formula.reverseR1';
        els.formula.textContent = tr(key);
    }

    function applyPreset(btn) {
        var vin = parseFloat(btn.getAttribute('data-vin'));
        var val = parseFloat(btn.getAttribute('data-val'));
        var vtarget = (btn.getAttribute('data-preset') === 'ratio') ? vin * val : val;
        els.vin.value = vin;
        els.voutTarget.value = Math.round(vtarget * 1000) / 1000;
        els.r1.value = 10000; els.r1Unit.value = '1';
        switchMode('reverseR2');
    }

    function calculate() {
        hideStatus();
        var Vin = parseFloat(els.vin.value);
        var R1 = getResistance(els.r1, els.r1Unit);
        var R2 = getResistance(els.r2, els.r2Unit);
        var RL = getResistance(els.rl, els.rlUnit);
        var Vtarget = parseFloat(els.voutTarget.value);
        var RL_eff = (isNaN(RL) || RL <= 0) ? Infinity : RL;

        if (isNaN(Vin) || Vin < 0) { showStatus('rdiv.err.invalid'); setResultsEmpty(); drawChart(); return; }

        if (mode === 'forward') {
            if (!(R1 > 0) || !(R2 > 0)) { showStatus('rdiv.err.invalid'); setResultsEmpty(); drawChart(); return; }
            var vout = computeVout(Vin, R1, R2, RL_eff);
            fillResults(Vin, R1, R2, RL_eff, vout);
            hideRecommend();
        } else if (mode === 'reverseR2') {
            if (!(R1 > 0)) { showStatus('rdiv.err.invalid'); setResultsEmpty(); drawChart(); return; }
            if (isNaN(Vtarget) || Vtarget <= 0 || Vin <= Vtarget) { showStatus('rdiv.err.vinSmall'); setResultsEmpty(); drawChart(); return; }
            var Req = R1 * Vtarget / (Vin - Vtarget);
            if (!(Req > 0)) { showStatus('rdiv.err.invalid'); setResultsEmpty(); drawChart(); return; }
            var R2c = (RL_eff === Infinity) ? Req : (RL_eff <= Req ? NaN : Req * RL_eff / (RL_eff - Req));
            if (isNaN(R2c) || !(R2c > 0)) { showStatus('rdiv.err.invalid'); setResultsEmpty(); drawChart(); return; }
            els.r2Unit.value = '1';
            els.r2.value = R2c;
            var vout2 = computeVout(Vin, R1, R2c, RL_eff);
            fillResults(Vin, R1, R2c, RL_eff, vout2);
            recommendResistors();
        } else if (mode === 'reverseR1') {
            if (!(R2 > 0)) { showStatus('rdiv.err.invalid'); setResultsEmpty(); drawChart(); return; }
            var R2eq = (RL_eff === Infinity) ? R2 : (R2 * RL_eff) / (R2 + RL_eff);
            if (!isFinite(R2eq)) R2eq = R2;
            if (!(R2eq > 0) || isNaN(Vtarget) || Vtarget <= 0 || Vin <= Vtarget) { showStatus('rdiv.err.vinSmall'); setResultsEmpty(); drawChart(); return; }
            var R1c = R2eq * (Vin / Vtarget - 1);
            if (!(R1c > 0)) { showStatus('rdiv.err.invalid'); setResultsEmpty(); drawChart(); return; }
            els.r1Unit.value = '1';
            els.r1.value = R1c;
            var vout1 = computeVout(Vin, R1c, R2, RL_eff);
            fillResults(Vin, R1c, R2, RL_eff, vout1);
            recommendResistors();
        }
        drawChart();
    }

    // ============================================================
    //  E24 推荐
    // ============================================================
    function hideRecommend() { if (els.recommendPanel) els.recommendPanel.style.display = 'none'; }

    function recommendResistors() {
        if (mode === 'forward') { hideRecommend(); return; }
        var Vin = parseFloat(els.vin.value) || 0;
        var Vtarget = parseFloat(els.voutTarget.value) || 0;
        if (Vin <= Vtarget || Vin <= 0 || Vtarget <= 0) { hideRecommend(); return; }
        var RL = getResistance(els.rl, els.rlUnit);
        var RL_eff = (isNaN(RL) || RL <= 0) ? Infinity : RL;
        var e24 = generateE24(1, 1e7);
        var candidates = [];

        if (mode === 'reverseR2') {
            var R1 = getResistance(els.r1, els.r1Unit);
            if (!(R1 > 0)) { hideRecommend(); return; }
            for (var i = 0; i < e24.length; i++) {
                var rr = e24[i];
                var Req = (RL_eff === Infinity) ? rr : rr * RL_eff / (rr + RL_eff);
                if (!isFinite(Req)) Req = rr;
                var v = Vin * Req / (R1 + Req);
                var err = Math.abs((v - Vtarget) / Vtarget) * 100;
                if (err < 10) {
                    var I = Vin / (R1 + Req);
                    candidates.push({ R1: R1, R2: rr, Vout: v, err: err, P: I * I * R1 * 1000 });
                }
            }
        } else { // reverseR1
            var R2 = getResistance(els.r2, els.r2Unit);
            if (!(R2 > 0)) { hideRecommend(); return; }
            for (var j = 0; j < e24.length; j++) {
                var r1v = e24[j];
                var Req2 = (RL_eff === Infinity) ? R2 : R2 * RL_eff / (R2 + RL_eff);
                if (!isFinite(Req2)) Req2 = R2;
                var v2 = Vin * Req2 / (r1v + Req2);
                var err2 = Math.abs((v2 - Vtarget) / Vtarget) * 100;
                if (err2 < 10) {
                    var I2 = Vin / (r1v + Req2);
                    candidates.push({ R1: r1v, R2: R2, Vout: v2, err: err2, P: I2 * I2 * r1v * 1000 });
                }
            }
        }

        candidates.sort(function (a, b) { return a.err - b.err; });
        candidates = candidates.slice(0, 8);
        if (candidates.length === 0) { hideRecommend(); showStatus('rdiv.warn.noRecommend', true); return; }

        var html = '';
        for (var k = 0; k < candidates.length; k++) {
            var c = candidates[k];
            html += '<tr><td>' + fmtRes(c.R1) + '</td><td>' + fmtRes(c.R2) + '</td><td>' +
                c.Vout.toFixed(4) + '</td><td>' + c.err.toFixed(2) + '%</td><td>' + c.P.toFixed(2) + '</td></tr>';
        }
        els.recBody.innerHTML = html;
        els.recommendPanel.style.display = '';
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
        var r = cs.x.min + frac * (cs.x.max - cs.x.min);
        if (r < 0) r = 0;
        var Req = (cs.RL === Infinity) ? r : r * cs.RL / (r + cs.RL);
        if (!isFinite(Req)) Req = r;
        var v = cs.Vin * Req / (cs.fixed + Req);
        render();
        var ctx = els.chartCanvas.getContext('2d');
        var xp = cs.pad.l + (r - cs.x.min) / (cs.x.max - cs.x.min) * cs.plotW;
        var yp = cs.pad.t + (1 - (v - cs.y.min) / (cs.y.max - cs.y.min)) * cs.plotH;
        ctx.strokeStyle = cssVar('--rdiv-chart-dot') || '#ef4444'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(xp, cs.pad.t); ctx.lineTo(xp, cs.pad.t + cs.plotH); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = cssVar('--rdiv-chart-dot') || '#ef4444'; ctx.beginPath(); ctx.arc(xp, yp, 4, 0, Math.PI * 2); ctx.fill();
        var tip = els.chartTooltip;
        tip.textContent = fmtRes(r) + 'Ω → ' + v.toFixed(4) + ' V';
        tip.style.left = Math.min(xp + 12, cs.W - 130) + 'px';
        tip.style.top = Math.max(yp - 30, 4) + 'px';
        tip.style.opacity = '1';
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    function bindEvents() {
        var tabs = document.querySelectorAll('.mode-tab');
        for (var i = 0; i < tabs.length; i++) {
            (function (t) { t.addEventListener('click', function () { switchMode(t.getAttribute('data-mode')); }); })(tabs[i]);
        }
        els.vin.addEventListener('input', calculate);
        els.r1.addEventListener('input', calculate);
        els.r2.addEventListener('input', calculate);
        els.r1Unit.addEventListener('change', calculate);
        els.r2Unit.addEventListener('change', calculate);
        els.rl.addEventListener('input', calculate);
        els.rlUnit.addEventListener('change', calculate);
        els.voutTarget.addEventListener('input', calculate);
        els.chartVar.addEventListener('change', drawChart);
        els.rangeMin.addEventListener('change', drawChart);
        els.rangeMax.addEventListener('change', drawChart);
        els.recommendBtn.addEventListener('click', function () {
            if (mode === 'forward') { showStatus('rdiv.status.recommendHint', true); return; }
            recommendResistors();
        });
        els.chartWrapper.addEventListener('mousemove', onChartHover);
        els.chartWrapper.addEventListener('mouseleave', hideTooltip);

        var pbtns = els.presetBar ? els.presetBar.querySelectorAll('.rd-preset-btn') : [];
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
        document.title = tr('rdiv.doc.title');
        updateFormula();
        calculate(); // 重算并重绘（轴标签用 tr 取最新语言）
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.addEventListener('DOMContentLoaded', function () {
        getEls();
        bindEvents();
        document.title = tr('rdiv.doc.title');
        switchMode('forward');
        calculate();
    });
})();
