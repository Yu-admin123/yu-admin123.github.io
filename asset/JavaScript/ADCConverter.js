// ============================================================
//  ADCConverter.html 页面脚本
//  主题切换逻辑由 theme.js 提供（全局 setTheme + #themeToggle 点击绑定）
//  此处仅监听 'themechange' 事件，在主题切换时重绘 Canvas 图表
//  语言切换由 i18n.js 提供，监听 'languagechange' 重绘图表与动态文本
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    // 公共
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    // 文档标题与页面标题
    'adc.doc.title':  { zh: 'ADC / DAC 转换计算器', en: 'ADC / DAC Converter' },
    'adc.page.title':  { zh: '⚡ ADC / DAC 转换计算器', en: '⚡ ADC / DAC Converter' },
    'adc.subhead':     { zh: '🔹 支持原始值 (DEC/HEX) ↔ 电压值 ↔ 百分比 互转 · 8/10/12/16/24/32 位分辨率 · 可拖拽滑条 & 曲线图', en: '🔹 Raw (DEC/HEX) ↔ Voltage ↔ Percent conversion · 8/10/12/16/24/32-bit resolution · draggable slider & curve chart' },

    // 模块① 基本参数
    'adc.p1.title':          { zh: '① 基本参数', en: '① Basic Parameters' },
    'adc.p1.small':          { zh: '参考电压 & 分辨率', en: 'Vref & Resolution' },
    'adc.label.vref':        { zh: '参考电压 Vref', en: 'Reference Voltage Vref' },
    'adc.hint.vref':         { zh: 'DAC/ADC 的满量程参考电压', en: 'Full-scale reference voltage for DAC/ADC' },
    'adc.label.resolution': { zh: '分辨率', en: 'Resolution' },

    // 模块② 转换计算
    'adc.p2.title':       { zh: '② 转换计算', en: '② Conversion' },
    'adc.p2.small':       { zh: '输入任一值，其余自动联动', en: 'Enter any value, others update automatically' },
    'adc.label.rawDec':   { zh: '原始值 (DEC)', en: 'Raw (DEC)' },
    'adc.label.rawHex':   { zh: '原始值 (HEX)', en: 'Raw (HEX)' },
    'adc.label.voltage':  { zh: '电压值', en: 'Voltage' },
    'adc.label.percent':  { zh: '百分比', en: 'Percent' },
    'adc.btn.half':       { zh: '设为 50%', en: 'Set 50%' },
    'adc.btn.max':        { zh: '设为最大值', en: 'Set Max' },
    'adc.btn.min':        { zh: '设为 0', en: 'Set 0' },
    'adc.btn.mid':        { zh: '设为中位值', en: 'Set Mid' },
    'adc.result.bin':     { zh: '二进制 (BIN)', en: 'Binary (BIN)' },
    'adc.result.formula': { zh: '计算过程', en: 'Calculation' },
    'adc.result.lsb':     { zh: 'LSB 步进', en: 'LSB Step' },

    // 图表
    'adc.chart.title':    { zh: '转移特性曲线', en: 'Transfer Characteristic Curve' },
    'adc.chart.yVoltBtn':  { zh: 'Y: 电压', en: 'Y: Voltage' },
    'adc.chart.yPctBtn':   { zh: 'Y: 百分比', en: 'Y: Percent' },
    'adc.chart.xAxis':     { zh: '原始值 (Raw)', en: 'Raw value' },
    'adc.chart.yVolt':     { zh: '电压 (V)', en: 'Voltage (V)' },
    'adc.chart.yPct':      { zh: '百分比 (%)', en: 'Percent (%)' },

    // 模块③ 公式 & 快速参考
    'adc.p3.title':         { zh: '③ 转换公式 & 快速参考', en: '③ Formula & Quick Reference' },
    'adc.p3.small':         { zh: 'ADC / DAC 原理', en: 'ADC / DAC Principles' },
    'adc.formula.rawToV':   { zh: '原始值 → 电压', en: 'Raw → Voltage' },
    'adc.formula.vToRaw':    { zh: '电压 → 原始值', en: 'Voltage → Raw' },
    'adc.formula.rawToPct':  { zh: '原始值 → 百分比', en: 'Raw → Percent' },
    'adc.formula.pctToRaw':  { zh: '百分比 → 原始值', en: 'Percent → Raw' },
    'adc.formula.lsb':       { zh: 'LSB (步进电压)', en: 'LSB (step voltage)' },
    'adc.formula.levels':    { zh: '量化级数', en: 'Quantization Levels' },
    'adc.quick.title':       { zh: '各分辨率参数速查', en: 'Resolution Parameter Reference' },
    'adc.quick.small':       { zh: '基于当前 Vref', en: 'Based on current Vref' },
    'adc.quick.header':      { zh: '位数 │ 最大值      │ 级数        │ LSB (步进)', en: 'Bits │ Max         │ Levels      │ LSB (step)' },
    'adc.hint.typical':      { zh: '💡 典型应用：STM32 ADC 常用 12-bit (Vref=3.3V)、Arduino ADC 为 10-bit (Vref=5V)、高精度传感器常用 24-bit Delta-Sigma ADC。', en: '💡 Typical uses: STM32 ADC often 12-bit (Vref=3.3V), Arduino ADC 10-bit (Vref=5V), high-precision sensors often 24-bit Delta-Sigma ADC.' },

    // 徽标 / 单位 / 提示
    'adc.badge.max':         { zh: '最大值: ', en: 'Max: ' },
    'adc.badge.step':        { zh: '步进: ', en: 'Step: ' },
    'adc.unit.levels':       { zh: '级', en: 'levels' },
    'adc.hint.voltageRange': { zh: '范围: 0 ~ ', en: 'Range: 0 ~ ' },

    // 模块④ 批量转换
    'adc.p4.title':       { zh: '④ 批量转换', en: '④ Batch Conversion' },
    'adc.p4.small':       { zh: '快速查表', en: 'Quick Lookup' },
    'adc.label.batchMode': { zh: '输入方式', en: 'Input Mode' },
    'adc.option.rawToVolt': { zh: '原始值 → 电压', en: 'Raw → Voltage' },
    'adc.option.voltToRaw': { zh: '电压 → 原始值', en: 'Voltage → Raw' },
    'adc.option.pctToRaw':  { zh: '百分比 → 原始值', en: 'Percent → Raw' },
    'adc.label.range':     { zh: '范围', en: 'Range' },
    'adc.label.step':      { zh: '步长', en: 'Step' },
    'adc.btn.genTable':    { zh: '▶ 生成表格', en: '▶ Generate Table' },
    'adc.btn.copyTable':   { zh: '📋 复制表格', en: '📋 Copy Table' },
    'adc.batch.placeholder': { zh: '点击"生成表格"查看批量转换结果', en: 'Click "Generate Table" to view batch conversion results' },
    'adc.batch.err':       { zh: '❌ 请输入有效的范围和步长', en: '❌ Please enter a valid range and step' },
    'adc.batch.header.rawToVolt': { zh: '  原始值 (DEC)  │  原始值 (HEX)  │   电压值 (V)   │   百分比 (%)', en: '  Raw (DEC)     │  Raw (HEX)     │   Voltage (V)  │   Percent (%)' },
    'adc.batch.header.voltToRaw': { zh: '    电压值 (V)   │  原始值 (DEC)  │  原始值 (HEX)  │   百分比 (%)', en: '    Voltage (V)  │  Raw (DEC)     │  Raw (HEX)     │   Percent (%)' },
    'adc.batch.header.pctToRaw':  { zh: '   百分比 (%)    │  原始值 (DEC)  │  原始值 (HEX)  │   电压值 (V)', en: '   Percent (%)   │  Raw (DEC)     │  Raw (HEX)     │   Voltage (V)' },

    // 页脚
    'adc.footer': { zh: '⚡ ADC / DAC 转换计算器 · 支持 8/10/12/16/24/32 位分辨率与实时互转', en: '⚡ ADC / DAC Converter · supports 8/10/12/16/24/32-bit resolution & real-time conversion' }
};

(function() {
    // 翻译函数（i18n.js 提供 window.I18N.t，此处做安全回退）
    function tr(key) {
        if (window.I18N && window.I18N.t) {
            var v = window.I18N.t(key);
            return (v === null || v === undefined) ? key : v;
        }
        var entry = (window.I18N_STRINGS || {})[key];
        return entry ? entry.zh : key;
    }

    // 主题切换时重绘图表（setTheme / themeToggle 由 theme.js 处理）
    document.addEventListener('themechange', function(e) {
        if (typeof drawChart === 'function') drawChart();
    });

    // ============================================================
    //  状态
    // ============================================================
    let currentBits = 12;
    let chartYAxis = 'voltage'; // 'voltage' | 'percent'
    let currentRaw = 2048; // 统一状态
    let batchGenerated = false; // 批量表格是否已生成（用于语言切换时决定重算或显示占位提示）

    // ============================================================
    //  DOM 引用
    // ============================================================
    const vrefInput = document.getElementById('vref');
    const resGroup = document.getElementById('resGroup');
    const rangeBadge = document.getElementById('rangeBadge');
    const stepsBadge = document.getElementById('stepsBadge');
    const levelsTag = document.getElementById('levelsTag');

    const rawDecInput = document.getElementById('rawDec');
    const rawHexInput = document.getElementById('rawHex');
    const rawDecMax = document.getElementById('rawDecMax');
    const rawHexMax = document.getElementById('rawHexMax');
    const voltageInput = document.getElementById('voltageInput');
    const percentInput = document.getElementById('percentInput');
    const voltageHint = document.getElementById('voltageHint');

    const sliderTrack = document.getElementById('sliderTrack');
    const sliderFill = document.getElementById('sliderFill');
    const sliderThumb = document.getElementById('sliderThumb');
    const sliderMinLabel = document.getElementById('sliderMinLabel');
    const sliderCurLabel = document.getElementById('sliderCurLabel');
    const sliderMaxLabel = document.getElementById('sliderMaxLabel');

    const outBin = document.getElementById('outBin');
    const outBinBits = document.getElementById('outBinBits');
    const outFormula = document.getElementById('outFormula');
    const outFormulaPct = document.getElementById('outFormulaPct');
    const outLsb = document.getElementById('outLsb');
    const outLsbSub = document.getElementById('outLsbSub');

    const formulaLsb = document.getElementById('formulaLsb');
    const formulaLevels = document.getElementById('formulaLevels');
    const quickRef = document.getElementById('quickRef');

    const batchMode = document.getElementById('batchMode');
    const batchStart = document.getElementById('batchStart');
    const batchEnd = document.getElementById('batchEnd');
    const batchStep = document.getElementById('batchStep');
    const batchOutput = document.getElementById('batchOutput');

    const chartCanvas = document.getElementById('chartCanvas');
    const chartTooltip = document.getElementById('chartTooltip');
    const chartWrapper = document.getElementById('chartWrapper');

    // ============================================================
    //  核心计算
    // ============================================================
    const getMaxRaw = bits => bits >= 32 ? 0xFFFFFFFF : (1 << bits) - 1;
    const getLevels = bits => bits >= 32 ? 0x100000000 : (1 << bits);
    const getLsb = (vref, bits) => vref / getMaxRaw(bits);
    const rawToVoltage = (raw, vref, bits) => (raw / getMaxRaw(bits)) * vref;
    const voltageToRaw = (v, vref, bits) => Math.round((v / vref) * getMaxRaw(bits));
    const rawToPercent = (raw, bits) => (raw / getMaxRaw(bits)) * 100;
    const percentToRaw = (p, bits) => Math.round((p / 100) * getMaxRaw(bits));
    function toHex(raw, bits) { return '0x' + raw.toString(16).toUpperCase().padStart(Math.ceil(bits / 4), '0'); }
    function clampRaw(raw, bits) { return Math.max(0, Math.min(getMaxRaw(bits), Math.round(raw))); }
    function formatVoltage(v) {
        if (v === 0) return '0 V';
        const a = Math.abs(v);
        if (a >= 100) return v.toFixed(2) + ' V';
        if (a >= 10) return v.toFixed(3) + ' V';
        if (a >= 1) return v.toFixed(5) + ' V';
        if (a >= 0.001) return v.toFixed(6) + ' V';
        return v.toPrecision(4) + ' V';
    }
    function formatPercent(p) {
        if (p >= 100) return '100.000%';
        if (p <= 0) return '0.000%';
        return p >= 10 ? p.toFixed(3) + '%' : p.toFixed(4) + '%';
    }

    // ============================================================
    //  统一计算核心 — 从 currentRaw 出发更新所有 UI
    // ============================================================
    function updateAll() {
        const vref = parseFloat(vrefInput.value) || 3.3;
        const maxRaw = getMaxRaw(currentBits);
        const raw = clampRaw(currentRaw, currentBits);
        currentRaw = raw;
        const voltage = rawToVoltage(raw, vref, currentBits);
        const percent = rawToPercent(raw, currentBits);
        const hex = toHex(raw, currentBits);
        const lsb = getLsb(vref, currentBits);

        // 同步输入框（跳过触发源，避免光标跳动）
        if (_updateSource !== 'dec') rawDecInput.value = raw;
        if (_updateSource !== 'hex') rawHexInput.value = hex;
        if (_updateSource !== 'voltage') voltageInput.value = voltage.toPrecision(6);
        if (_updateSource !== 'percent') percentInput.value = percent.toFixed(3);

        // 补充信息
        const binStr = raw.toString(2).padStart(currentBits, '0').replace(/(.{4})/g, '$1 ').trim();
        outBin.textContent = binStr;
        outBinBits.textContent = currentBits + '-bit';
        outFormula.textContent = raw + ' \u00d7 ' + vref + ' / ' + maxRaw + ' = ' + formatVoltage(voltage);
        outFormulaPct.textContent = raw + ' / ' + maxRaw + ' \u00d7 100 = ' + formatPercent(percent);
        outLsb.textContent = lsb >= 0.001 ? lsb.toFixed(5) + ' V' : lsb.toPrecision(4) + ' V';
        outLsbSub.textContent = 'Vref / (2^' + currentBits + ' - 1)';

        // 滑条
        const pct = Math.min(100, Math.max(0, percent));
        sliderFill.style.width = pct + '%';
        sliderThumb.style.left = pct + '%';
        sliderCurLabel.textContent = raw + ' (' + formatVoltage(voltage) + ' / ' + percent.toFixed(1) + '%)';

        // 图表
        drawChart();
    }

    // ============================================================
    //  参数更新
    // ============================================================
    function updateParams() {
        const vref = parseFloat(vrefInput.value) || 3.3;
        const maxRaw = getMaxRaw(currentBits);
        const levels = getLevels(currentBits);
        const lsb = getLsb(vref, currentBits);

        rangeBadge.textContent = tr('adc.badge.max') + maxRaw.toLocaleString();
        stepsBadge.textContent = tr('adc.badge.step') + (lsb >= 0.001 ? lsb.toFixed(5) : lsb.toPrecision(4)) + ' V';
        levelsTag.textContent = levels.toLocaleString() + ' ' + tr('adc.unit.levels');

        rawDecMax.textContent = '(0 ~ ' + maxRaw + ')';
        rawDecInput.max = maxRaw;
        rawHexInput.placeholder = '0x0 ~ 0x' + maxRaw.toString(16).toUpperCase();
        rawHexMax.textContent = '(0x0 ~ 0x' + maxRaw.toString(16).toUpperCase() + ')';
        voltageHint.textContent = tr('adc.hint.voltageRange') + vref + ' V';
        voltageInput.max = vref;

        sliderMinLabel.textContent = '0 (0 V / 0%)';
        sliderMaxLabel.textContent = maxRaw + ' (' + vref + ' V / 100%)';

        formulaLsb.innerHTML = 'Vref / (2<sup>' + currentBits + '</sup> - 1) = ' + formatVoltage(lsb);
        formulaLevels.innerHTML = '2<sup>' + currentBits + '</sup> = ' + levels.toLocaleString() + ' ' + tr('adc.unit.levels');

        // 速查表
        const bitOptions = [8, 10, 12, 16, 24, 32];
        let lines = [tr('adc.quick.header')];
        lines.push('─────┼─────────────┼─────────────┼──────────────────');
        for (let b of bitOptions) {
            const m = getMaxRaw(b), l = getLevels(b), s = getLsb(vref, b);
            const marker = (b === currentBits) ? ' ◄' : '';
            lines.push(' ' + b + '-bit │ ' + m.toLocaleString().padEnd(11) + ' │ ' + l.toLocaleString().padEnd(11) + ' │ ' + formatVoltage(s).padEnd(18) + marker);
        }
        quickRef.textContent = lines.join('\n');
    }

    // ============================================================
    //  从各输入框读取 → currentRaw
    // ============================================================
    // 每个输入框有自己的 "来源标识"，updateAll 根据谁触发来决定
    // 用一个标记 _source 避免循环更新
    let _updateSource = '';

    function readDec() {
        const raw = parseInt(rawDecInput.value);
        if (!isNaN(raw)) currentRaw = clampRaw(raw, currentBits);
    }
    function readHex() {
        const h = rawHexInput.value.trim();
        if (h) { const raw = parseInt(h, 16); if (!isNaN(raw)) currentRaw = clampRaw(raw, currentBits); }
    }
    function readVoltage() {
        const vref = parseFloat(vrefInput.value) || 3.3;
        const v = parseFloat(voltageInput.value);
        if (!isNaN(v)) currentRaw = clampRaw(voltageToRaw(v, vref, currentBits), currentBits);
    }
    function readPercent() {
        const p = parseFloat(percentInput.value);
        if (!isNaN(p)) currentRaw = clampRaw(percentToRaw(p, currentBits), currentBits);
    }

    // ============================================================
    //  图表绘制 (Canvas)
    // ============================================================
    const DPR = window.devicePixelRatio || 1;
    const CHART_H = 280; // CSS pixels
    const PAD = { top: 20, right: 56, bottom: 42, left: 62 };

    function resizeChart() {
        const w = chartWrapper.clientWidth;
        chartCanvas.style.height = CHART_H + 'px';
        chartCanvas.width = w * DPR;
        chartCanvas.height = CHART_H * DPR;
    }

    function drawChart() {
        resizeChart();
        const ctx = chartCanvas.getContext('2d');
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        const W = chartCanvas.width / DPR;
        const H = chartCanvas.height / DPR;
        const vref = parseFloat(vrefInput.value) || 3.3;
        const maxRaw = getMaxRaw(currentBits);
        const plotW = W - PAD.left - PAD.right;
        const plotH = H - PAD.top - PAD.bottom;
        const isVoltage = chartYAxis === 'voltage';
        const yMax = isVoltage ? vref : 100;

        // 读取 CSS 变量
        const cs = getComputedStyle(document.documentElement);
        const cBg = cs.getPropertyValue('--chart-bg').trim();
        const cGrid = cs.getPropertyValue('--chart-grid').trim();
        const cAxis = cs.getPropertyValue('--chart-axis').trim();
        const cLabel = cs.getPropertyValue('--chart-label').trim();
        const cLine = cs.getPropertyValue('--chart-line').trim();
        const cDot = cs.getPropertyValue('--chart-dot-fill').trim();
        const cDotS = cs.getPropertyValue('--chart-dot-stroke').trim();
        const cCross = cs.getPropertyValue('--chart-crosshair').trim();

        ctx.clearRect(0, 0, W, H);

        // 背景
        ctx.fillStyle = cBg;
        ctx.fillRect(0, 0, W, H);

        // 网格
        ctx.strokeStyle = cGrid;
        ctx.lineWidth = 0.5;
        const xTicks = niceScale(0, maxRaw, 8);
        const yTicks = niceScale(0, yMax, 6);
        for (let t of xTicks) {
            const x = PAD.left + (t / maxRaw) * plotW;
            ctx.beginPath(); ctx.moveTo(x, PAD.top); ctx.lineTo(x, PAD.top + plotH); ctx.stroke();
        }
        for (let t of yTicks) {
            const y = PAD.top + plotH - (t / yMax) * plotH;
            ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(PAD.left + plotW, y); ctx.stroke();
        }

        // 轴线
        ctx.strokeStyle = cAxis;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(PAD.left, PAD.top);
        ctx.lineTo(PAD.left, PAD.top + plotH);
        ctx.lineTo(PAD.left + plotW, PAD.top + plotH);
        ctx.stroke();

        // 轴标签
        ctx.fillStyle = cLabel;
        ctx.font = '10px SF Mono, Fira Code, monospace';
        ctx.textAlign = 'center';
        for (let t of xTicks) {
            const x = PAD.left + (t / maxRaw) * plotW;
            ctx.fillText(t >= 1000 ? (t / 1000).toFixed(t % 1000 === 0 ? 0 : 1) + 'k' : '' + t, x, PAD.top + plotH + 16);
        }
        ctx.textAlign = 'right';
        for (let t of yTicks) {
            const y = PAD.top + plotH - (t / yMax) * plotH;
            ctx.fillText(isVoltage ? t.toFixed(2) : t.toFixed(1) + '%', PAD.left - 8, y + 3);
        }

        // X 轴名称
        ctx.textAlign = 'center';
        ctx.fillStyle = cLabel;
        ctx.font = '11px system-ui, sans-serif';
        ctx.fillText(tr('adc.chart.xAxis'), PAD.left + plotW / 2, H - 4);

        // Y 轴名称
        ctx.save();
        ctx.translate(12, PAD.top + plotH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(isVoltage ? tr('adc.chart.yVolt') : tr('adc.chart.yPct'), 0, 0);
        ctx.restore();

        // 阶梯线 (量化特性) — 对高位数只画直线
        if (currentBits <= 12) {
            ctx.strokeStyle = cCross;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let r = 0; r <= maxRaw; r++) {
                const x = PAD.left + (r / maxRaw) * plotW;
                const yVal = isVoltage ? rawToVoltage(r, vref, currentBits) : rawToPercent(r, currentBits);
                const y = PAD.top + plotH - (yVal / yMax) * plotH;
                if (r === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // 理想直线
        ctx.strokeStyle = cLine;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(PAD.left, PAD.top + plotH);
        ctx.lineTo(PAD.left + plotW, PAD.top);
        ctx.stroke();

        // 当前点
        const raw = currentRaw;
        const px = PAD.left + (raw / maxRaw) * plotW;
        const pyVal = isVoltage ? rawToVoltage(raw, vref, currentBits) : rawToPercent(raw, currentBits);
        const py = PAD.top + plotH - (pyVal / yMax) * plotH;

        // 十字准线
        ctx.strokeStyle = cCross;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(px, PAD.top + plotH); ctx.lineTo(px, py); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(PAD.left, py); ctx.lineTo(px, py); ctx.stroke();
        ctx.setLineDash([]);

        // 点
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = cDot;
        ctx.fill();
        ctx.strokeStyle = cDotS;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 标注
        ctx.fillStyle = cDot;
        ctx.font = 'bold 10px SF Mono, Fira Code, monospace';
        ctx.textAlign = 'left';
        const labelX = px + 10;
        const labelY = py - 10;
        const labelText = 'Raw=' + raw + '  ' + (isVoltage ? formatVoltage(pyVal) : formatPercent(pyVal));
        // 背景
        const tm = ctx.measureText(labelText);
        ctx.fillStyle = cBg;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(labelX - 3, labelY - 10, tm.width + 6, 14);
        ctx.globalAlpha = 1;
        ctx.fillStyle = cDot;
        ctx.fillText(labelText, labelX, labelY);
    }

    // 生成美观的刻度值
    function niceScale(min, max, maxTicks) {
        const range = max - min;
        if (range <= 0) return [min];
        const roughStep = range / maxTicks;
        const mag = Math.pow(10, Math.floor(Math.log10(roughStep)));
        const norm = roughStep / mag;
        let step;
        if (norm <= 1.5) step = 1 * mag;
        else if (norm <= 3) step = 2 * mag;
        else if (norm <= 7) step = 5 * mag;
        else step = 10 * mag;
        step = Math.max(step, 1);
        const ticks = [];
        for (let v = 0; v <= max + step * 0.001; v += step) {
            ticks.push(Math.round(v));
            if (v >= max) break;
        }
        if (ticks[ticks.length - 1] < max) ticks.push(max);
        return ticks;
    }

    // ============================================================
    //  图表交互 (点击/拖拽设置当前点)
    // ============================================================
    let chartDragging = false;
    function chartPctFromEvent(e) {
        const rect = chartCanvas.getBoundingClientRect();
        const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const xPct = (cx - PAD.left) / (rect.width - PAD.left - (PAD.right / (DPR)));
        return Math.max(0, Math.min(1, xPct));
    }
    function chartApplyEvent(e) {
        const pct = chartPctFromEvent(e);
        const maxRaw = getMaxRaw(currentBits);
        currentRaw = clampRaw(Math.round(pct * maxRaw), currentBits);
        updateAll();
    }
    chartCanvas.addEventListener('mousedown', e => { chartDragging = true; chartApplyEvent(e); });
    document.addEventListener('mousemove', e => { if (chartDragging) chartApplyEvent(e); });
    document.addEventListener('mouseup', () => { chartDragging = false; });
    chartCanvas.addEventListener('touchstart', e => { e.preventDefault(); chartDragging = true; chartApplyEvent(e); }, { passive: false });
    document.addEventListener('touchmove', e => { if (chartDragging) chartApplyEvent(e); }, { passive: false });
    document.addEventListener('touchend', () => { chartDragging = false; });

    // 图表悬停 tooltip
    chartCanvas.addEventListener('mousemove', function(e) {
        if (chartDragging) { chartTooltip.classList.remove('visible'); return; }
        const rect = chartCanvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const plotW = rect.width - PAD.left - PAD.right;
        const plotH = rect.height - PAD.top - PAD.bottom;
        if (cx < PAD.left || cx > PAD.left + plotW || cy < PAD.top || cy > PAD.top + plotH) {
            chartTooltip.classList.remove('visible'); return;
        }
        const vref = parseFloat(vrefInput.value) || 3.3;
        const maxRaw = getMaxRaw(currentBits);
        const xPct = (cx - PAD.left) / plotW;
        const raw = clampRaw(Math.round(xPct * maxRaw), currentBits);
        const yPct = 1 - (cy - PAD.top) / plotH;
        const yMax = chartYAxis === 'voltage' ? vref : 100;
        const yVal = yPct * yMax;

        const actualY = chartYAxis === 'voltage' ? rawToVoltage(raw, vref, currentBits) : rawToPercent(raw, currentBits);
        const text = 'Raw: ' + raw + ' (' + toHex(raw, currentBits) + ')\n' +
                     (chartYAxis === 'voltage' ? 'V: ' + formatVoltage(actualY) + '  %: ' + rawToPercent(raw, currentBits).toFixed(1) + '%' : '%: ' + formatPercent(actualY) + '  V: ' + formatVoltage(rawToVoltage(raw, vref, currentBits)));

        chartTooltip.textContent = text;
        chartTooltip.style.left = Math.min(cx + 12, rect.width - 180) + 'px';
        chartTooltip.style.top = Math.max(cy - 50, 4) + 'px';
        chartTooltip.classList.add('visible');
    });
    chartCanvas.addEventListener('mouseleave', () => { chartTooltip.classList.remove('visible'); });

    // ============================================================
    //  滑条拖拽
    // ============================================================
    let sliderDragging = false;
    function sliderPctFromEvent(e) {
        const rect = sliderTrack.getBoundingClientRect();
        const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        return Math.max(0, Math.min(100, (cx / rect.width) * 100));
    }
    function sliderApply(e) {
        const pct = sliderPctFromEvent(e);
        const maxRaw = getMaxRaw(currentBits);
        currentRaw = clampRaw(Math.round((pct / 100) * maxRaw), currentBits);
        updateAll();
    }
    sliderThumb.addEventListener('mousedown', e => { e.preventDefault(); sliderDragging = true; sliderThumb.classList.add('dragging'); });
    sliderTrack.addEventListener('mousedown', e => { e.preventDefault(); sliderDragging = true; sliderThumb.classList.add('dragging'); sliderApply(e); });
    document.addEventListener('mousemove', e => { if (sliderDragging) sliderApply(e); });
    document.addEventListener('mouseup', () => { if (sliderDragging) { sliderDragging = false; sliderThumb.classList.remove('dragging'); } });
    sliderThumb.addEventListener('touchstart', e => { e.preventDefault(); sliderDragging = true; sliderThumb.classList.add('dragging'); }, { passive: false });
    sliderTrack.addEventListener('touchstart', e => { e.preventDefault(); sliderDragging = true; sliderThumb.classList.add('dragging'); sliderApply(e); }, { passive: false });
    document.addEventListener('touchmove', e => { if (sliderDragging) sliderApply(e); }, { passive: false });
    document.addEventListener('touchend', () => { if (sliderDragging) { sliderDragging = false; sliderThumb.classList.remove('dragging'); } });

    // ============================================================
    //  事件绑定
    // ============================================================

    // 分辨率
    resGroup.addEventListener('click', e => {
        const btn = e.target.closest('.res-btn');
        if (!btn) return;
        resGroup.querySelectorAll('.res-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentBits = parseInt(btn.dataset.bits);
        currentRaw = clampRaw(currentRaw, currentBits);
        updateParams();
        updateAll();
    });

    // Vref
    vrefInput.addEventListener('input', () => { updateParams(); updateAll(); });

    // 四个输入框联动
    rawDecInput.addEventListener('input', () => { _updateSource = 'dec'; readDec(); updateAll(); });
    rawDecInput.addEventListener('change', () => { _updateSource = 'dec'; readDec(); updateAll(); });
    rawHexInput.addEventListener('input', () => { _updateSource = 'hex'; readHex(); updateAll(); });
    rawHexInput.addEventListener('change', () => { _updateSource = 'hex'; readHex(); updateAll(); });
    voltageInput.addEventListener('input', () => { _updateSource = 'voltage'; readVoltage(); updateAll(); });
    voltageInput.addEventListener('change', () => { _updateSource = 'voltage'; readVoltage(); updateAll(); });
    percentInput.addEventListener('input', () => { _updateSource = 'percent'; readPercent(); updateAll(); });
    percentInput.addEventListener('change', () => { _updateSource = 'percent'; readPercent(); updateAll(); });

    // 快捷按钮
    document.getElementById('setHalfBtn').addEventListener('click', () => { currentRaw = clampRaw(Math.round(getMaxRaw(currentBits) / 2), currentBits); updateAll(); });
    document.getElementById('setMaxBtn').addEventListener('click', () => { currentRaw = getMaxRaw(currentBits); updateAll(); });
    document.getElementById('setMinBtn').addEventListener('click', () => { currentRaw = 0; updateAll(); });
    document.getElementById('setMidBtn').addEventListener('click', () => { currentRaw = clampRaw(1 << (currentBits - 1), currentBits); updateAll(); });

    // 图表 Y 轴切换
    document.querySelectorAll('.chart-axis-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-axis-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            chartYAxis = this.dataset.yaxis;
            drawChart();
        });
    });

    // 批量转换
    function calcBatch() {
        batchGenerated = true;
        const vref = parseFloat(vrefInput.value) || 3.3;
        const mode = batchMode.value;
        const start = parseFloat(batchStart.value), end = parseFloat(batchEnd.value), step = parseFloat(batchStep.value);
        if (isNaN(start) || isNaN(end) || isNaN(step) || step <= 0) { batchOutput.textContent = tr('adc.batch.err'); return; }
        const maxRaw = getMaxRaw(currentBits);
        let lines = [];
        if (mode === 'raw_to_voltage') {
            lines.push(tr('adc.batch.header.rawToVolt'));
            lines.push('───────────────┼─────────────────┼────────────────┼──────────────');
            for (let i = start; i <= end; i += step) {
                const r = clampRaw(Math.round(i), currentBits);
                lines.push(('' + r).padStart(14) + ' │ ' + toHex(r, currentBits).padEnd(15) + ' │ ' + formatVoltage(rawToVoltage(r, vref, currentBits)).padEnd(14) + ' │ ' + formatPercent(rawToPercent(r, currentBits)).padEnd(12));
            }
        } else if (mode === 'voltage_to_raw') {
            lines.push(tr('adc.batch.header.voltToRaw'));
            lines.push('────────────────┼────────────────┼─────────────────┼──────────────');
            for (let i = start; i <= end + step * 0.001; i += step) {
                const v = Math.max(0, Math.min(vref, i));
                const r = clampRaw(voltageToRaw(v, vref, currentBits), currentBits);
                lines.push(formatVoltage(v).padEnd(16) + ' │ ' + ('' + r).padStart(14) + ' │ ' + toHex(r, currentBits).padEnd(15) + ' │ ' + formatPercent(rawToPercent(r, currentBits)).padEnd(12));
            }
        } else {
            lines.push(tr('adc.batch.header.pctToRaw'));
            lines.push('────────────────┼────────────────┼─────────────────┼──────────────');
            for (let i = start; i <= end + step * 0.001; i += step) {
                const p = Math.max(0, Math.min(100, i));
                const r = clampRaw(percentToRaw(p, currentBits), currentBits);
                lines.push(formatPercent(p).padEnd(16) + ' │ ' + ('' + r).padStart(14) + ' │ ' + toHex(r, currentBits).padEnd(15) + ' │ ' + formatVoltage(rawToVoltage(r, vref, currentBits)).padEnd(14));
            }
        }
        batchOutput.textContent = lines.join('\n');
    }
    document.getElementById('batchCalcBtn').addEventListener('click', calcBatch);
    document.getElementById('copyBatchBtn').addEventListener('click', function() {
        const text = batchOutput.textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => { const o = this.textContent; this.textContent = '✓'; setTimeout(() => this.textContent = o, 800); });
        } else {
            const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px'; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta);
        }
    });

    // 窗口大小变化重绘图表
    window.addEventListener('resize', drawChart);

    // 监听语言切换：更新动态文本并重绘图表 / 重算批量表
    document.addEventListener('languagechange', function () {
        document.title = tr('adc.doc.title');
        updateParams();
        updateAll();
        if (batchGenerated) calcBatch();
    });

    // ============================================================
    //  初始化
    // ============================================================
    // 同步主题图标（data-theme 已由 head 内联脚本设置；setTheme 来自 theme.js）
    setTheme(localStorage.getItem('toolbox-theme') || 'light');
    document.title = tr('adc.doc.title');
    updateParams();
    updateAll();
})();
