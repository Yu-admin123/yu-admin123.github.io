// ============================================================
//  NtcCounter.html 页面脚本
//  主题切换由 theme.js 提供；语言切换由 i18n.js 提供
//  此处仅监听 'themechange' / 'languagechange' 事件
// ============================================================

// ============================================================
//  翻译字典
// ============================================================
window.I18N_STRINGS = {
    // 公共
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    // 文档 & 页面标题
    'ntc.doc.title':  { zh: 'NTC 电阻计算器', en: 'NTC Resistor Calculator' },
    'ntc.page.title': { zh: '🔥 NTC 电阻计算器', en: '🔥 NTC Resistor Calculator' },
    'ntc.subhead':    { zh: '🔹 B 值快速模式 & 三点标定模式 & 两点算 B · 电阻↔温度双向互算 · 分压 & ADC 查表',
                         en: '🔹 B-value mode & 3-point calibration & 2-point B calc · R↔T bidirectional · V-divider & ADC lookup' },

    // Tab
    'ntc.tab.bmode': { zh: '📌 B 值模式', en: '📌 B-Value Mode' },
    'ntc.tab.calib': { zh: '📐 三点标定', en: '📐 3-Point Calib' },
    'ntc.tab.calcb': { zh: '🧮 两点算B值', en: '🧮 2-Point B-Value' },

    // ① 计算模式（B 值 / 三点标定 / 两点算 B）
    'ntc.p1.title':     { zh: '① 计算模式', en: '① Compute Mode' },
    'ntc.p1.small':     { zh: 'B 值 / 三点标定 / 两点算 B', en: 'B-Value / 3-Point / 2-Point' },
    'ntc.label.r25':    { zh: 'R₂₅ (Ω)', en: 'R₂₅ (Ω)' },
    'ntc.label.bvalue': { zh: 'B 值 (K)', en: 'B-Value (K)' },
    'ntc.btn.applyB':   { zh: '✅ 应用参数', en: '✅ Apply' },
    'ntc.label.preset': { zh: '常用型号', en: 'Preset' },
    'ntc.preset.custom':{ zh: '— 自定义 —', en: '— Custom —' },
    'ntc.status.applied':{ zh: '✅ 已应用', en: '✅ Applied' },

    // 三点标定
    'ntc.btn.calcCoeff':  { zh: '📊 计算并应用', en: '📊 Compute & Apply' },
    'ntc.btn.resetDefault': { zh: '↺ 默认数据', en: '↺ Default' },

    // 两点算 B
    'ntc.btn.calcB':       { zh: '🧮 计算 B 值', en: '🧮 Compute B' },
    'ntc.btn.applyResult': { zh: '→ 应用到模型', en: '→ Apply to Model' },
    'ntc.result.bcalc':    { zh: 'B =', en: 'B =' },
    'ntc.status.bApplied': { zh: '✅ 已应用到模型', en: '✅ Applied to model' },

    // 通用参数
    'ntc.p4.title':          { zh: '② 通用参数', en: '② Common Params' },
    'ntc.p4.small':          { zh: '供电电压与温度范围', en: 'Vcc & Temp Range' },
    'ntc.label.tempRange':   { zh: '温度范围', en: 'Temp Range' },
    'ntc.btn.update':        { zh: '🔄 更新', en: '🔄 Update' },

    // 双向互算
    'ntc.p5.title':          { zh: '③ 电阻 ↔ 温度', en: '③ R ↔ T Calc' },
    'ntc.p5.small':          { zh: '双向互算 · 分压 & ADC', en: 'Bidirectional · V-divider & ADC' },
    'ntc.label.reverseMode': { zh: '模式', en: 'Mode' },
    'ntc.option.r2t':        { zh: 'R → T', en: 'R → T' },
    'ntc.option.t2r':        { zh: 'T → R', en: 'T → R' },
    'ntc.label.resistance':  { zh: '电阻 (Ω)', en: 'R (Ω)' },
    'ntc.label.temperature': { zh: '温度 (°C)', en: 'T (°C)' },
    'ntc.label.adcBits':     { zh: 'ADC', en: 'ADC' },
    'ntc.btn.reverseCalc':   { zh: '▶ 计算', en: '▶ Calc' },
    'ntc.result.temp':       { zh: 'T =', en: 'T =' },
    'ntc.result.res':        { zh: 'R =', en: 'R =' },
    'ntc.result.volt':       { zh: 'V =', en: 'V =' },
    'ntc.result.adc':        { zh: 'ADC =', en: 'ADC =' },

    // 图表
    'ntc.viz.title':      { zh: '特性曲线 & 数据表', en: 'R-T Curve & Table' },
    'ntc.viz.small':      { zh: '电阻 / 分压随温度', en: 'R & Vout vs Temp' },
    'ntc.chart.title':      { zh: 'R-T 特性曲线', en: 'R-T Characteristic Curve' },
    'ntc.chart.xAxis':      { zh: '温度 (°C)', en: 'Temperature (°C)' },
    'ntc.chart.yAxis1':     { zh: '电阻 (kΩ)', en: 'Resistance (kΩ)' },
    'ntc.chart.yAxis2':     { zh: '分压 (V)', en: 'Vout (V)' },
    'ntc.chart.legendRes':  { zh: '电阻 R(T)', en: 'Resistance R(T)' },
    'ntc.chart.legendVolt': { zh: '分压 Vout', en: 'Vout' },

    // 表格
    'ntc.table.title':    { zh: '数据表', en: 'Data Table' },
    'ntc.btn.copyTable':  { zh: '📋 复制', en: '📋 Copy' },
    'ntc.btn.exportCsv':  { zh: '💾 CSV', en: '💾 CSV' },
    'ntc.table.thTemp':   { zh: '温度 (°C)', en: 'Temp (°C)' },
    'ntc.table.thRes':    { zh: '电阻 (Ω)', en: 'R (Ω)' },
    'ntc.table.thVolt':   { zh: '分压 Vout (V)', en: 'Vout (V)' },
    'ntc.table.thAdc':    { zh: 'ADC (12‑bit)', en: 'ADC (12-bit)' },
    'ntc.copy.done':      { zh: '✅ 表格已复制到剪贴板', en: '✅ Table copied to clipboard' },
    'ntc.copy.fail':      { zh: '❌ 复制失败，请手动选中复制', en: '❌ Copy failed, please select manually' },
    'ntc.export.filename': { zh: 'NTC数据表', en: 'NTC_DataTable' },

    // 公式说明
    'ntc.p6.title':      { zh: '⑤ 公式说明', en: '⑤ Formulas' },
    'ntc.formula.bmodel': { zh: 'B 值模型', en: 'B-Model' },
    'ntc.formula.bcalc':  { zh: '两点法', en: '2-Point' },
    'ntc.formula.div':    { zh: '分压', en: 'Divider' },
    'ntc.hint.note1':     { zh: '💡 <b>B 值模式</b>：直接输入 R₂₅ 和 B 值，点击「应用」后生效。',
                             en: '💡 <b>B-Value Mode</b>: Enter R₂₅ and B, click Apply.' },
    'ntc.hint.note2':     { zh: '💡 <b>标定模式</b>：输入三组 (R, T)，计算各点对 B 值（B₁₂/B₁₃/B₂₃），B₁₂ 自动应用。',
                             en: '💡 <b>Calibration</b>: Three (R,T) points → B values for each pair (B₁₂/B₁₃/B₂₃), B₁₂ auto-applied.' },
    'ntc.hint.note3':     { zh: '💡 <b>两点算 B</b>：通过任意两点快速算出 B 值，可一键应用到模型。',
                             en: '💡 <b>2-Point B</b>: Two (R,T) points → B value, one-click apply.' },
    'ntc.hint.note4':     { zh: '💡 <b>互算区</b>：电阻↔温度双向，同时给出分压与 ADC 读数（8/12/16/24 位）。',
                             en: '💡 <b>Bidirectional</b>: R↔T with V-divider voltage & ADC reading (8/12/16/24-bit).' },

    // 错误
    'ntc.err.invalidInput': { zh: '❌ 请输入有效的数值', en: '❌ Please enter valid numbers' },
    'ntc.err.invalidRT':    { zh: '❌ 请输入有效的 R 和 T 值（R>0）', en: '❌ Please enter valid R>0 and T' },
    'ntc.err.sameTemp':     { zh: '❌ 两个温度点不能相同', en: '❌ Two temperature points must differ' },
    'ntc.err.invalidRange': { zh: '❌ 温度范围无效（Tmin ≤ Tmax）', en: '❌ Invalid temp range (Tmin ≤ Tmax required)' },

    // 页脚
    'ntc.footer': { zh: '🔥 NTC 热敏电阻计算器 · B 值模型 · 三点标定 · 双向互算',
                     en: '🔥 NTC Thermistor Calculator · B-Model · 3-Point Calibration · Bidirectional Calc' }
};

(function() {
    // ============================================================
    //  翻译安全包装
    // ============================================================
    function tr(key) {
        if (window.I18N && window.I18N.t) {
            var v = window.I18N.t(key);
            return (v === null || v === undefined) ? key : v;
        }
        var entry = (window.I18N_STRINGS || {})[key];
        return entry ? entry.zh : key;
    }

    // ============================================================
    //  数学工具
    // ============================================================
    function cToK(c) { return c + 273.15; }

    // B 值模型：温度 → 电阻
    function resB(tempC, R25, Bval) {
        var Tk = cToK(tempC);
        return R25 * Math.exp(Bval * (1 / Tk - 1 / 298.15));
    }

    // 电阻 → 温度（牛顿迭代，B 值模型解析反解）
    function tempFromResistance(R, R25, Bval) {
        // B 值模型可直接反解：1/T = 1/298.15 + ln(R/R25) / B
        var lnRatio = Math.log(R / R25);
        var invT = 1 / 298.15 + lnRatio / Bval;
        return 1 / invT - 273.15;
    }

    // 两点算 B 值
    function computeB(R1, T1, R2, T2) {
        var T1k = cToK(T1), T2k = cToK(T2);
        if (T1k === T2k) return NaN;
        return Math.log(R1 / R2) / (1 / T1k - 1 / T2k);
    }

    // ============================================================
    //  全局状态
    // ============================================================
    var state = { R25: 10000, Bval: 3380.13 };
    var lastData = null;

    // ============================================================
    //  DOM 引用
    // ============================================================
    var els = {};
    function getEls() {
        els.tabs = document.querySelectorAll('.mode-tab');
        els.panelB = document.getElementById('panelB');
        els.panelCalib = document.getElementById('panelCalib');
        els.panelCalcB = document.getElementById('panelCalcB');

        els.r25Input = document.getElementById('r25Input');
        els.bInput = document.getElementById('bInput');
        els.applyBbtn = document.getElementById('applyBbtn');
        els.bPreset = document.getElementById('bPreset');
        els.applyBStatus = document.getElementById('applyBStatus');
        els.bPrev0  = document.getElementById('bPrev0');
        els.bPrev25 = document.getElementById('bPrev25');
        els.bPrev50 = document.getElementById('bPrev50');

        els.r1 = document.getElementById('r1'); els.t1 = document.getElementById('t1');
        els.r2 = document.getElementById('r2'); els.t2 = document.getElementById('t2');
        els.r3 = document.getElementById('r3'); els.t3 = document.getElementById('t3');
        els.calcBtn = document.getElementById('calcBtn');
        els.resetDefault = document.getElementById('resetDefault');
        els.b12 = document.getElementById('b12');
        els.b13 = document.getElementById('b13');
        els.b23 = document.getElementById('b23');

        els.cb_r1 = document.getElementById('cb_r1'); els.cb_t1 = document.getElementById('cb_t1');
        els.cb_r2 = document.getElementById('cb_r2'); els.cb_t2 = document.getElementById('cb_t2');
        els.calcBbtn = document.getElementById('calcBbtn');
        els.applyBtoModel = document.getElementById('applyBtoModel');
        els.calcBResult = document.getElementById('calcBResult');
        els.calcBStatus = document.getElementById('calcBStatus');

        els.vcc = document.getElementById('vcc');
        els.rpullup = document.getElementById('rpullup');
        els.tmin = document.getElementById('tmin');
        els.tmax = document.getElementById('tmax');
        els.updateBtn = document.getElementById('updateBtn');

        els.reverseMode = document.getElementById('reverseMode');
        els.reverseInput = document.getElementById('reverseInput');
        els.reverseInputLabel = document.getElementById('reverseInputLabel');
        els.reverseBtn = document.getElementById('reverseBtn');
        els.adcBits = document.getElementById('adcBits');
        els.resTemp = document.getElementById('resTemp');
        els.resRes = document.getElementById('resRes');
        els.resVolt = document.getElementById('resVolt');
        els.resAdc = document.getElementById('resAdc');

        els.chartWrapPanel = document.getElementById('chartWrapPanel');
        els.tableWrapPanel = document.getElementById('tableWrapPanel');
        els.tableBody = document.getElementById('tableBody');
        els.chartCanvas = document.getElementById('chartCanvas');
        els.chartWrapper = document.getElementById('chartWrapper');
        els.chartTooltip = document.getElementById('chartTooltip');
        els.copyTableBtn = document.getElementById('copyTableBtn');
        els.exportCsvBtn = document.getElementById('exportCsvBtn');
    }

    // ============================================================
    //  模式切换
    // ============================================================
    function switchMode(mode) {
        els.tabs.forEach(function(tab) {
            var active = tab.dataset.mode === mode;
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        els.panelB.classList.toggle('active', mode === 'B');
        els.panelCalib.classList.toggle('active', mode === 'calib');
        els.panelCalcB.classList.toggle('active', mode === 'calcB');
    }

    function parseFloatOr(v, fallback) {
        var n = parseFloat(v);
        return isNaN(n) ? fallback : n;
    }

    // ============================================================
    //  B 值模式
    // ============================================================
    // 关键温度点：0 / 25 / 50 ℃（工业常见锚点）
    var B_PREVIEW_TEMPS = [0, 25, 50];
    var bPreviewIds = null;

    function formatOhms(r) {
        if (!isFinite(r)) return '--';
        if (r >= 1e6) return (r / 1e6).toFixed(2) + ' M';
        if (r >= 1e3) return (r / 1e3).toFixed(2) + ' k';
        return r.toFixed(1);
    }

    // 实时刷新 B 值模式的 5 个温度点电阻预览（不依赖"应用"）
    function updateBPreview() {
        if (!bPreviewIds) {
            bPreviewIds = {
                '0': els.bPrev0, '25': els.bPrev25, '50': els.bPrev50
            };
        }
        var r25 = parseFloat(els.r25Input.value);
        var b = parseFloat(els.bInput.value);
        if (isNaN(r25) || isNaN(b) || r25 <= 0 || b <= 0) {
            Object.keys(bPreviewIds).forEach(function(k) { bPreviewIds[k].textContent = '--'; });
            return;
        }
        B_PREVIEW_TEMPS.forEach(function(t) {
            bPreviewIds[String(t)].textContent = formatOhms(resB(t, r25, b));
        });
    }

    function applyBParams() {
        var r25 = parseFloat(els.r25Input.value);
        var b = parseFloat(els.bInput.value);
        if (isNaN(r25) || isNaN(b) || r25 <= 0 || b <= 0) {
            alert(tr('ntc.err.invalidInput'));
            return;
        }
        state.R25 = r25;
        state.Bval = b;
        refreshAll();
        updateBPreview();
        // 同步预设下拉为匹配项（找不到则显示"自定义"）
        var matched = false;
        var opts = els.bPreset.options;
        for (var i = 0; i < opts.length; i++) {
            var parts = (opts[i].value || '').split(':');
            if (parts.length === 2 && parseFloat(parts[0]) === r25 && Math.abs(parseFloat(parts[1]) - b) < 0.01) {
                els.bPreset.value = opts[i].value;
                matched = true; break;
            }
        }
        if (!matched) els.bPreset.value = 'custom';
        // 短暂显示"已应用"提示
        var s = els.applyBStatus;
        s.textContent = tr('ntc.status.applied');
        s.style.display = 'inline-block';
        clearTimeout(els._applyBTimer);
        els._applyBTimer = setTimeout(function() { s.style.display = 'none'; }, 1800);
    }

    // ============================================================
    //  三点标定：计算三对 B 值
    // ============================================================
    function computeCoefficients() {
        var r1 = parseFloat(els.r1.value), t1 = parseFloat(els.t1.value);
        var r2 = parseFloat(els.r2.value), t2 = parseFloat(els.t2.value);
        var r3 = parseFloat(els.r3.value), t3 = parseFloat(els.t3.value);
        if (isNaN(r1) || isNaN(t1) || isNaN(r2) || isNaN(t2) || isNaN(r3) || isNaN(t3) ||
            r1 <= 0 || r2 <= 0 || r3 <= 0) {
            alert(tr('ntc.err.invalidRT'));
            return;
        }
        var b12 = computeB(r1, t1, r2, t2);
        var b13 = computeB(r1, t1, r3, t3);
        var b23 = computeB(r2, t2, r3, t3);
        if (!isFinite(b12)) { alert(tr('ntc.err.sameTemp')); return; }

        els.b12.textContent = isFinite(b12) ? b12.toFixed(4) : '--';
        els.b13.textContent = isFinite(b13) ? b13.toFixed(4) : '--';
        els.b23.textContent = isFinite(b23) ? b23.toFixed(4) : '--';

        // 以 B₁₂（通常为 B₂₅/₅₀）作为应用值
        state.R25 = r1;
        state.Bval = b12;
        refreshAll();
    }

    function resetDefaultData() {
        els.r1.value = '10000'; els.t1.value = '25';
        els.r2.value = '4160';  els.t2.value = '50';
        els.r3.value = '1451';  els.t3.value = '85';
        computeCoefficients();
    }

    // ============================================================
    //  两点算 B
    // ============================================================
    var lastCalcB = NaN, lastCalcR25 = NaN;
    function calcBFromTwoPoints() {
        var r1 = parseFloat(els.cb_r1.value), t1 = parseFloat(els.cb_t1.value);
        var r2 = parseFloat(els.cb_r2.value), t2 = parseFloat(els.cb_t2.value);
        if (isNaN(r1) || isNaN(t1) || isNaN(r2) || isNaN(t2) || r1 <= 0 || r2 <= 0) {
            alert(tr('ntc.err.invalidRT'));
            return;
        }
        var b = computeB(r1, t1, r2, t2);
        if (!isFinite(b)) {
            alert(tr('ntc.err.sameTemp'));
            return;
        }
        lastCalcB = b;
        lastCalcR25 = (Math.abs(t1 - 25) < Math.abs(t2 - 25)) ? r1 : r2;
        els.calcBResult.textContent = b.toFixed(4);
        els.calcBStatus.style.display = 'none';
    }
    function applyCalcBResult() {
        if (!isFinite(lastCalcB) || !isFinite(lastCalcR25)) {
            alert(tr('ntc.err.invalidInput'));
            return;
        }
        state.R25 = lastCalcR25;
        state.Bval = lastCalcB;
        els.r25Input.value = String(lastCalcR25);
        els.bInput.value = String(lastCalcB.toFixed(4));
        var status = els.calcBStatus;
        status.textContent = tr('ntc.status.bApplied');
        status.style.display = 'inline-block';
        setTimeout(function() { status.style.display = 'none'; }, 2500);
        refreshAll();
    }

    // ============================================================
    //  生成数据
    // ============================================================
    function buildData() {
        var vcc = parseFloatOr(els.vcc.value, 3.3);
        var rPullup = parseFloatOr(els.rpullup.value, 10000);
        var tMin = parseFloatOr(els.tmin.value, -40);
        var tMax = parseFloatOr(els.tmax.value, 125);
        if (tMin > tMax) { alert(tr('ntc.err.invalidRange')); return null; }
        var temps = [];
        for (var t = Math.round(tMin); t <= Math.round(tMax); t++) temps.push(t);
        var data = temps.map(function(temp) {
            var r = resB(temp, state.R25, state.Bval);
            var v = vcc * r / (rPullup + r);
            var adc = Math.round((v / vcc) * 4095);
            return { temp: temp, resistance: r, voltage: v, adc: adc };
        });
        lastData = { data: data, vcc: vcc, rPullup: rPullup };
        return lastData;
    }

    // ============================================================
    //  表格渲染
    // ============================================================
    function renderTable() {
        var pkg = lastData;
        if (!pkg) return;
        var html = '';
        for (var i = 0; i < pkg.data.length; i++) {
            var row = pkg.data[i];
            html += '<tr><td>' + row.temp +
                '</td><td>' + row.resistance.toFixed(2) +
                '</td><td>' + row.voltage.toFixed(4) +
                '</td><td>' + row.adc + '</td></tr>';
        }
        els.tableBody.innerHTML = html;
    }

    // ============================================================
    //  Canvas 图表
    // ============================================================
    var chartHovIdx = -1;
    var chart = {};

    function cssVar(name) {
        return (getComputedStyle(document.documentElement).getPropertyValue(name) || '').trim();
    }

    function setupCanvasDPR(canvas) {
        var dpr = window.devicePixelRatio || 1;
        var rect = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        var ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { ctx: ctx, w: rect.width, h: rect.height };
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
        var niceMin = Math.floor(min / step) * step;
        var niceMax = Math.ceil(max / step) * step;
        var ticks = [];
        for (var v = niceMin; v <= niceMax + step / 2; v += step) ticks.push(+v.toFixed(10));
        return { min: niceMin, max: niceMax, step: step, ticks: ticks };
    }

    function drawChart() {
        var pkg = lastData;
        var canvas = els.chartCanvas;
        if (!pkg || !canvas) return;
        var setup = setupCanvasDPR(canvas);
        var ctx = setup.ctx, W = setup.w, H = setup.h;
        if (W < 10 || H < 10) return;

        var pad = { l: 54, r: 54, t: 20, b: 36 };
        var plotW = W - pad.l - pad.r;
        var plotH = H - pad.t - pad.b;

        var bg = cssVar('--ntc-chart-bg') || '#fff';
        var gridCol = cssVar('--ntc-chart-grid') || '#e9edf4';
        var axisCol = cssVar('--ntc-chart-axis') || '#94a3b8';
        var labelCol = cssVar('--ntc-chart-label') || '#64748b';
        var lineRes = cssVar('--ntc-chart-line') || '#6366f1';
        var lineVolt = cssVar('--ntc-chart-line-volt') || '#e67e22';
        var fillCol = cssVar('--ntc-chart-fill') || 'rgba(99,102,241,0.08)';
        var dotCol = cssVar('--ntc-chart-dot') || '#ef4444';

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        var data = pkg.data;
        if (data.length < 2) return;

        var xMin = data[0].temp, xMax = data[data.length - 1].temp;
        var rMin = Infinity, rMax = -Infinity, vMin = Infinity, vMax = -Infinity;
        for (var i = 0; i < data.length; i++) {
            if (data[i].resistance < rMin) rMin = data[i].resistance;
            if (data[i].resistance > rMax) rMax = data[i].resistance;
            if (data[i].voltage < vMin) vMin = data[i].voltage;
            if (data[i].voltage > vMax) vMax = data[i].voltage;
        }
        var rMinK = rMin / 1000, rMaxK = rMax / 1000;
        var x = looseLabel(xMin, xMax, 8);
        chart._xMin = x.min; chart._xMax = x.max;
        var y1 = looseLabel(Math.max(0, rMinK * 0.9), rMaxK * 1.1, 6);
        var y2 = looseLabel(Math.max(0, vMin * 0.9), vMax * 1.1, 6);

        function xToPx(v) { return pad.l + (v - x.min) / (x.max - x.min) * plotW; }
        function y1ToPx(v) { return pad.t + (1 - (v - y1.min) / (y1.max - y1.min)) * plotH; }
        function y2ToPx(v) { return pad.t + (1 - (v - y2.min) / (y2.max - y2.min)) * plotH; }

        // 网格
        ctx.strokeStyle = gridCol; ctx.lineWidth = 1;
        ctx.beginPath();
        for (i = 0; i < x.ticks.length; i++) { var xp = xToPx(x.ticks[i]); ctx.moveTo(xp, pad.t); ctx.lineTo(xp, pad.t + plotH); }
        for (i = 0; i < y1.ticks.length; i++) { var yp = y1ToPx(y1.ticks[i]); ctx.moveTo(pad.l, yp); ctx.lineTo(pad.l + plotW, yp); }
        ctx.stroke();

        // 轴
        ctx.strokeStyle = axisCol; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, pad.t + plotH); ctx.lineTo(pad.l + plotW, pad.t + plotH);
        ctx.moveTo(pad.l + plotW, pad.t); ctx.lineTo(pad.l + plotW, pad.t + plotH);
        ctx.stroke();

        // 刻度标签
        ctx.fillStyle = labelCol;
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        for (i = 0; i < x.ticks.length; i++) ctx.fillText(String(x.ticks[i]), xToPx(x.ticks[i]), pad.t + plotH + 6);
        ctx.save();
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText(tr('ntc.chart.xAxis'), pad.l + plotW / 2, H - 2);
        ctx.restore();

        // Y1 左轴
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        for (i = 0; i < y1.ticks.length; i++)
            ctx.fillText(y1.ticks[i].toFixed(y1.step < 1 ? 2 : (y1.step < 10 ? 1 : 0)), pad.l - 6, y1ToPx(y1.ticks[i]));
        ctx.save();
        ctx.translate(12, pad.t + plotH / 2); ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(tr('ntc.chart.yAxis1'), 0, 0);
        ctx.restore();

        // Y2 右轴
        ctx.textAlign = 'left';
        for (i = 0; i < y2.ticks.length; i++)
            ctx.fillText(y2.ticks[i].toFixed(y2.step < 0.1 ? 3 : (y2.step < 1 ? 2 : 1)), pad.l + plotW + 6, y2ToPx(y2.ticks[i]));
        ctx.save();
        ctx.translate(W - 12, pad.t + plotH / 2); ctx.rotate(Math.PI / 2);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = lineVolt;
        ctx.fillText(tr('ntc.chart.yAxis2'), 0, 0);
        ctx.restore();

        // 填充电压区域
        ctx.beginPath();
        ctx.moveTo(xToPx(data[0].temp), y2ToPx(data[0].voltage));
        for (i = 1; i < data.length; i++) ctx.lineTo(xToPx(data[i].temp), y2ToPx(data[i].voltage));
        ctx.lineTo(xToPx(data[data.length - 1].temp), pad.t + plotH);
        ctx.lineTo(xToPx(data[0].temp), pad.t + plotH);
        ctx.closePath();
        ctx.fillStyle = fillCol; ctx.fill();

        // 电阻线
        ctx.strokeStyle = lineRes; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xToPx(data[0].temp), y1ToPx(data[0].resistance / 1000));
        for (i = 1; i < data.length; i++) ctx.lineTo(xToPx(data[i].temp), y1ToPx(data[i].resistance / 1000));
        ctx.stroke();

        // 电压线
        ctx.strokeStyle = lineVolt; ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(xToPx(data[0].temp), y2ToPx(data[0].voltage));
        for (i = 1; i < data.length; i++) ctx.lineTo(xToPx(data[i].temp), y2ToPx(data[i].voltage));
        ctx.stroke();
        ctx.setLineDash([]);

        // 图例
        drawLegend(ctx, pad.l + 8, pad.t + 4, lineRes, 'solid', tr('ntc.chart.legendRes'));
        drawLegend(ctx, pad.l + 8, pad.t + 22, lineVolt, 'dash', tr('ntc.chart.legendVolt'));

        // Hover 点
        if (chartHovIdx >= 0 && chartHovIdx < data.length) {
            var p = data[chartHovIdx];
            var px = xToPx(p.temp);
            ctx.strokeStyle = cssVar('--ntc-chart-crosshair') || 'rgba(99,102,241,0.3)';
            ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
            ctx.beginPath(); ctx.moveTo(px, pad.t); ctx.lineTo(px, pad.t + plotH); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = dotCol;
            ctx.beginPath(); ctx.arc(px, y1ToPx(p.resistance / 1000), 4, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(px, y2ToPx(p.voltage), 4, 0, Math.PI * 2); ctx.fill();
        }

        chart._xToPx = xToPx; chart._y1ToPx = y1ToPx; chart._y2ToPx = y2ToPx;
    }

    function drawLegend(ctx, x, y, color, dash, text) {
        ctx.save();
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        if (dash === 'dash') ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(x, y + 6); ctx.lineTo(x + 18, y + 6); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = cssVar('--ntc-chart-label') || '#64748b';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(text, x + 24, y + 6);
        ctx.restore();
    }

    function showTooltip(evt) {
        var pkg = lastData;
        if (!pkg || !pkg.data.length) return;
        var rect = els.chartCanvas.getBoundingClientRect();
        var mx = evt.clientX - rect.left;
        var my = evt.clientY - rect.top;
        var pad = { l: 54, r: 54 };
        var plotW = rect.width - pad.l - pad.r;
        if (mx < pad.l || mx > pad.l + plotW) { hideTooltip(); return; }
        var data = pkg.data;
        var n = data.length;
        // 用绘图同款 x 范围（美化刻度范围）把鼠标像素反算成温度，再取最近数据点
        var xMinR = (typeof chart._xMin === 'number') ? chart._xMin : data[0].temp;
        var xMaxR = (typeof chart._xMax === 'number') ? chart._xMax : data[n - 1].temp;
        var frac = (mx - pad.l) / plotW;
        var tempMouse = xMinR + frac * (xMaxR - xMinR);
        var tMin = data[0].temp, tMax = data[n - 1].temp;
        var idx = Math.max(0, Math.min(n - 1, Math.round((tempMouse - tMin) / (tMax - tMin) * (n - 1))));
        chartHovIdx = idx;
        var p = data[idx];
        var tip = els.chartTooltip;
        tip.innerHTML =
            '<b>' + tr('ntc.chart.xAxis') + ':</b> ' + p.temp + ' °C<br>' +
            '<b>R:</b> ' + p.resistance.toFixed(2) + ' Ω<br>' +
            '<b>Vout:</b> ' + p.voltage.toFixed(4) + ' V<br>' +
            '<b>ADC:</b> ' + p.adc + ' / 4095';
        tip.classList.add('visible');
        var tipRect = tip.getBoundingClientRect();
        var wrapRect = els.chartWrapper.getBoundingClientRect();
        var tx = mx + 12, ty = my - 10;
        if (tx + tipRect.width > wrapRect.width) tx = mx - tipRect.width - 12;
        if (ty < 0) ty = 4;
        if (ty + tipRect.height > wrapRect.height) ty = wrapRect.height - tipRect.height - 4;
        tip.style.left = tx + 'px'; tip.style.top = ty + 'px';
        drawChart();
    }
    function hideTooltip() {
        chartHovIdx = -1;
        els.chartTooltip.classList.remove('visible');
        drawChart();
    }

    // ============================================================
    //  互算区
    // ============================================================
    function updateReverseInputLabel() {
        var mode = els.reverseMode.value;
        els.reverseInputLabel.textContent = (mode === 'RtoT') ? tr('ntc.label.resistance') : tr('ntc.label.temperature');
    }

    function reverseCalc() {
        var mode = els.reverseMode.value;
        var inputVal = parseFloat(els.reverseInput.value);
        if (isNaN(inputVal)) { alert(tr('ntc.err.invalidInput')); return; }
        var vcc = parseFloatOr(els.vcc.value, 3.3);
        var rPullup = parseFloatOr(els.rpullup.value, 10000);
        var bits = parseInt(els.adcBits.value, 10) || 12;
        var maxAdc = (1 << bits) - 1;

        var temp, res, volt, adc;
        if (mode === 'RtoT') {
            if (inputVal <= 0) { alert(tr('ntc.err.invalidRT')); return; }
            res = inputVal;
            temp = tempFromResistance(res, state.R25, state.Bval);
            res = resB(temp, state.R25, state.Bval);
            volt = vcc * res / (rPullup + res);
            adc = Math.round((volt / vcc) * maxAdc);
        } else {
            temp = inputVal;
            res = resB(temp, state.R25, state.Bval);
            volt = vcc * res / (rPullup + res);
            adc = Math.round((volt / vcc) * maxAdc);
        }
        els.resTemp.textContent = temp.toFixed(2);
        els.resRes.textContent = res.toFixed(2);
        els.resVolt.textContent = volt.toFixed(4);
        els.resAdc.textContent = String(adc);
    }

    // ============================================================
    //  复制 & 导出
    // ============================================================
    function copyTable() {
        var pkg = lastData;
        if (!pkg) { alert(tr('ntc.err.invalidInput')); return; }
        var lines = [tr('ntc.table.thTemp') + '\t' + tr('ntc.table.thRes') + '\t' + tr('ntc.table.thVolt') + '\t' + tr('ntc.table.thAdc')];
        for (var i = 0; i < pkg.data.length; i++) {
            var row = pkg.data[i];
            lines.push(row.temp + '\t' + row.resistance.toFixed(2) + '\t' + row.voltage.toFixed(4) + '\t' + row.adc);
        }
        var text = lines.join('\n');
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function() { alert(tr('ntc.copy.done')); }).catch(function() { fallbackCopy(text); });
        } else { fallbackCopy(text); }
    }
    function fallbackCopy(text) {
        try {
            var ta = document.createElement('textarea');
            ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select(); document.execCommand('copy');
            document.body.removeChild(ta); alert(tr('ntc.copy.done'));
        } catch (e) { alert(tr('ntc.copy.fail')); }
    }
    function exportCsv() {
        var pkg = lastData;
        if (!pkg) { alert(tr('ntc.err.invalidInput')); return; }
        var esc = function(s) { return '"' + String(s).replace(/"/g, '""') + '"'; };
        var lines = [esc(tr('ntc.table.thTemp')) + ',' + esc(tr('ntc.table.thRes')) + ',' + esc(tr('ntc.table.thVolt')) + ',' + esc(tr('ntc.table.thAdc'))];
        for (var i = 0; i < pkg.data.length; i++) {
            var row = pkg.data[i];
            lines.push(row.temp + ',' + row.resistance.toFixed(2) + ',' + row.voltage.toFixed(4) + ',' + row.adc);
        }
        var csv = '\uFEFF' + lines.join('\r\n');
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = tr('ntc.export.filename') + '.csv';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(url); }, 2000);
    }

    // ============================================================
    //  总刷新
    // ============================================================
    function refreshAll() {
        if (buildData()) { renderTable(); drawChart(); reverseCalc(); }
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    function bindEvents() {
        els.tabs.forEach(function(tab) {
            tab.addEventListener('click', function() { switchMode(tab.dataset.mode); });
        });
        els.applyBbtn.addEventListener('click', applyBParams);
        // 预设下拉：自动填入 R25 / B，并实时刷新预览
        els.bPreset.addEventListener('change', function() {
            var v = els.bPreset.value;
            if (v && v !== 'custom') {
                var parts = v.split(':');
                if (parts.length === 2) {
                    els.r25Input.value = parts[0];
                    els.bInput.value = parts[1];
                    updateBPreview();
                }
            }
        });
        // R25 / B 任一变化实时更新预览（不点应用也能看到结果）
        els.r25Input.addEventListener('input', updateBPreview);
        els.bInput.addEventListener('input', updateBPreview);
        els.calcBtn.addEventListener('click', computeCoefficients);
        els.resetDefault.addEventListener('click', resetDefaultData);
        els.calcBbtn.addEventListener('click', calcBFromTwoPoints);
        els.applyBtoModel.addEventListener('click', applyCalcBResult);
        els.updateBtn.addEventListener('click', refreshAll);
        els.adcBits.addEventListener('change', reverseCalc);
        els.reverseMode.addEventListener('change', updateReverseInputLabel);
        els.reverseBtn.addEventListener('click', reverseCalc);

        document.querySelectorAll('input, select').forEach(function(el) {
            el.addEventListener('keydown', function(e) {
                if (e.key !== 'Enter') return;
                if (el.closest('#panelB')) applyBParams();
                else if (el.closest('#panelCalib')) computeCoefficients();
                else if (el.closest('#panelCalcB')) calcBFromTwoPoints();
                else if (el.closest('#panelReverse')) reverseCalc();
                else refreshAll();
            });
        });

        var canvas = els.chartCanvas;
        canvas.addEventListener('mousemove', showTooltip);
        canvas.addEventListener('mouseleave', hideTooltip);
        canvas.addEventListener('touchmove', function(e) { if (e.touches && e.touches[0]) showTooltip(e.touches[0]); }, { passive: true });
        canvas.addEventListener('touchend', hideTooltip);

        els.copyTableBtn.addEventListener('click', copyTable);
        els.exportCsvBtn.addEventListener('click', exportCsv);

        var resizeTimer;
        window.addEventListener('resize', function() { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawChart, 80); });
    }

    // ============================================================
    //  主题 & 语言 监听
    // ============================================================
    document.addEventListener('themechange', function() { drawChart(); });
    document.addEventListener('languagechange', function() {
        document.title = tr('ntc.doc.title');
        updateReverseInputLabel();
        drawChart();
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        getEls();
        bindEvents();
        document.title = tr('ntc.doc.title');
        resetDefaultData();
        switchMode('B');
        els.reverseInput.value = '5000';
        reverseCalc();
        updateBPreview();
    });
})();
