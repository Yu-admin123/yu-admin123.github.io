// ============================================================
//  PowerCalculator.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    // 公共
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    // 文档标题与页面标题
    'power.doc.title':    { zh: '电池功耗计算器', en: 'Battery Power Calculator' },
    'power.page.title':   { zh: '🔋 电池功耗计算器', en: '🔋 Battery Power Calculator' },
    'power.subhead':      { zh: '🔹 根据电池估算设备可工作时长（天 / 周 / 月）', en: '🔹 Estimate device runtime from battery (days / weeks / months)' },

    // 模块1: 输入参数
    'power.p1.title':     { zh: '① 输入参数', en: '① Input Parameters' },
    'power.p1.small':     { zh: '电池与设备电流', en: 'Battery & device current' },
    'power.label.batteryType':  { zh: '电池类型', en: 'Battery Type' },
    'power.option.alkaline':    { zh: '碱性电池', en: 'Alkaline' },
    'power.option.carbon':      { zh: '碳电池', en: 'Carbon' },
    'power.option.lithium':     { zh: '锂电池', en: 'Lithium' },
    'power.hint.alkaline':      { zh: '碱性电池参考值', en: 'Alkaline reference' },
    'power.hint.carbon':        { zh: '碳性电池参考值', en: 'Carbon reference' },
    'power.hint.lithium':       { zh: 'CR 一次锂电（需输入容量）', en: 'CR primary lithium (enter capacity)' },
    'power.label.batterySize': { zh: '电池规格', en: 'Battery Size' },
    'power.option.AA':          { zh: '5号 (AA)', en: 'AA' },
    'power.option.AAA':         { zh: '7号 (AAA)', en: 'AAA' },
    'power.hint.sizeOnly':      { zh: '5号/7号仅碱性与碳电池有效', en: 'AA/AAA only valid for alkaline & carbon' },
    'power.label.capacity':     { zh: '电池容量', en: 'Capacity' },
    'power.placeholder.capacity': { zh: '请输入容量 mAh', en: 'Enter capacity mAh' },
    'power.label.cells':        { zh: '串联节数', en: 'Cells in Series' },
    'power.unit.cells':         { zh: '节', en: 'cells' },
    'power.hint.cells':         { zh: '串联升压，容量不变', en: 'Series raises voltage, capacity unchanged' },
    'power.label.minVoltage':   { zh: '设备最低工作电压', en: 'Min Operating Voltage' },
    'power.hint.minVoltage':    { zh: '用于容量补偿', en: 'For capacity compensation' },
    'power.label.avgCurrent':   { zh: '待机平均电流', en: 'Standby Avg Current' },
    'power.label.maxCurrent':   { zh: '待机最大电流', en: 'Standby Max Current' },
    'power.label.sleepCurrent': { zh: '待机睡眠电流', en: 'Standby Sleep Current' },
    'power.badge.voltage':      { zh: '标称 {nominal}V / 截止 {cutoff}V', en: 'Nominal {nominal}V / Cutoff {cutoff}V' },
    'power.badge.resist':       { zh: '内阻 {r}Ω', en: 'Internal R {r}Ω' },
    'power.calc.btn':           { zh: '▶ 计算时长', en: '▶ Calculate Runtime' },
    'power.preset.btn':         { zh: '🔄 重置示例', en: '🔄 Reset Example' },

    // 模块2: 工作时长估算
    'power.p2.title':     { zh: '② 工作时长估算', en: '② Runtime Estimate' },
    'power.p2.small':     { zh: '天 / 周 / 月', en: 'days / weeks / months' },
    'power.result.avgLabel':    { zh: '预估工作时长（按平均电流）', en: 'Estimated runtime (by avg current)' },
    'power.result.weeksLabel':  { zh: '折合周数', en: 'Weeks' },
    'power.result.weeksSub':    { zh: '7 天 / 周', en: '7 days / week' },
    'power.result.monthsLabel': { zh: '折合月数', en: 'Months' },
    'power.result.monthsSub':   { zh: '30 天 / 月', en: '30 days / month' },
    'power.result.sleepLabel':  { zh: '纯睡眠理论时长（参考上限）', en: 'Pure sleep theoretical runtime (upper bound)' },
    'power.unit.hours':   { zh: '小时', en: 'hours' },
    'power.unit.days':    { zh: '天', en: 'days' },
    'power.unit.weeks':   { zh: '周', en: 'weeks' },
    'power.unit.months':  { zh: '月', en: 'months' },
    'power.sleep.notEntered': { zh: '未输入睡眠电流', en: 'Sleep current not entered' },

    // 模块3: 计算明细
    'power.p3.title':     { zh: '计算明细', en: 'Calculation Details' },
    'power.detail.packV':     { zh: '电池组标称电压', en: 'Pack nominal voltage' },
    'power.detail.cutoffV':   { zh: '电池组截止电压', en: 'Pack cutoff voltage' },
    'power.detail.factorAvg': { zh: '基础电压补偿系数（平均电流）', en: 'Base voltage compensation factor (avg current)' },
    'power.detail.lowCurrent': { zh: '低电流放电修正', en: 'Low-current discharge correction' },
    'power.detail.vSag':      { zh: '峰值电流内阻压降', en: 'Peak current IR voltage drop' },
    'power.detail.factorPeak': { zh: '峰值电压补偿系数', en: 'Peak voltage compensation factor' },
    'power.detail.duty':      { zh: '峰值占空比（估算）', en: 'Peak duty cycle (estimated)' },
    'power.detail.factor':    { zh: '综合补偿系数', en: 'Combined compensation factor' },
    'power.detail.usable':    { zh: '有效可用容量', en: 'Effective usable capacity' },

    // 模块4: 计算模型说明
    'power.p4.title':     { zh: '③ 计算模型说明', en: '③ Calculation Model' },
    'power.p4.small':     { zh: '容量补偿逻辑', en: 'Capacity compensation logic' },
    'power.formula':      { zh: '有效容量 = 标称容量 × 综合补偿系数\n基础利用率 fv = 放电曲线查表(V最低/节 + I平均×R单节内阻)\n峰值利用率 fp = 放电曲线查表(V最低/节 + I最大×R单节内阻)\n低电流修正（当 I平均 < 50mA 时）：fv = fv + (1-fv) × k × scale\n  其中 scale = log₁₀(50/I) / 3，k 为电池类型系数（碱性0.38 / 碳性0.45 / 锂电0.20）\n峰值占空比 D = (I平均 - I睡眠) / (I最大 - I睡眠)  （自适应估算）\n综合补偿系数 = D × fp + (1-D) × fv\n工作时长(小时) = 有效容量(mAh) / 待机平均电流(mA)\n天 = 小时 / 24 ，  周 = 天 / 7 ，  月 = 天 / 30', en: 'Effective capacity = nominal capacity × combined factor\nBase utilization fv = discharge-curve lookup(Vmin/cell + Iavg×Rcell)\nPeak utilization fp = discharge-curve lookup(Vmin/cell + Imax×Rcell)\nLow-current correction (when Iavg < 50mA): fv = fv + (1-fv) × k × scale\n  where scale = log₁₀(50/I) / 3, k is a battery-type coefficient (alkaline 0.38 / carbon 0.45 / lithium 0.20)\nPeak duty cycle D = (Iavg - Isleep) / (Imax - Isleep)  (adaptive estimate)\nCombined factor = D × fp + (1-D) × fv\nRuntime(hours) = effective capacity(mAh) / standby avg current(mA)\nDays = hours / 24,  Weeks = days / 7,  Months = days / 30' },
    'power.hint.disclaimer': { zh: '⚠️ 放电曲线为基于南孚等典型电池中等电流(~50mA)的非线性经验模型。当平均电流远小于50mA时，电化学极化显著减小，相同电压下可释放出更多容量，因此引入低电流修正。实际仍受温度、自放电与新旧程度影响，结果仅供参考。碱性 / 碳电池默认为 AA 规格；锂电池需自行输入容量（如 CR2032≈220mAh，CR123A≈1500mAh，18650≈3000mAh）。', en: '⚠️ The discharge curve is a non-linear empirical model based on typical batteries (e.g. Nanfu) at medium current (~50mA). When the average current is far below 50mA, electrochemical polarization is significantly reduced, allowing more capacity to be released at the same voltage, hence the low-current correction. Actual results are still affected by temperature, self-discharge and battery age, so results are for reference only. Alkaline / carbon batteries default to AA size; lithium batteries require manual capacity input (e.g. CR2032≈220mAh, CR123A≈1500mAh, 18650≈3000mAh).' },

    // 页脚
    'power.footer': { zh: '🔋 电池功耗计算器 · 基于电压补偿与峰值电流补偿估算设备待机工作时长', en: '🔋 Battery Power Calculator · Estimates standby runtime via voltage & peak-current compensation' },

    // 动态状态/错误提示
    'power.err.capacity':     { zh: '⚠️ 请输入有效的电池容量（锂电池必填）', en: '⚠️ Please enter a valid battery capacity (required for lithium)' },
    'power.err.minVoltage':   { zh: '⚠️ 请输入设备最低工作电压', en: '⚠️ Please enter the min operating voltage' },
    'power.err.avgCurrent':   { zh: '⚠️ 请输入待机平均电流', en: '⚠️ Please enter the standby average current' },
    'power.err.maxCurrent':   { zh: '⚠️ 请输入待机最大电流', en: '⚠️ Please enter the standby max current' },
    'power.err.vMinTooHigh':  { zh: '⚠️ 设备最低工作电压 ({vMin}V) ≥ 电池组标称电压 ({packV}V)，设备无法启动', en: '⚠️ Min operating voltage ({vMin}V) ≥ pack nominal voltage ({packV}V), device cannot start' },
    'power.err.factorTooLow': { zh: '⚠️ 综合补偿系数过低 ({f}%)，峰值电流或最低电压使电池几乎不可用', en: '⚠️ Combined compensation factor too low ({f}%), peak current or min voltage makes battery nearly unusable' },
    'power.status.lowFactor': { zh: 'ℹ️ 容量利用率较低 ({f}%)，建议降低设备最低工作电压或减小峰值电流', en: 'ℹ️ Capacity utilization is low ({f}%), consider lowering min operating voltage or reducing peak current' },
    'power.status.ok':        { zh: '✅ 计算完成 · 有效容量 {cap} mAh · 利用率 {f}%{extra}', en: '✅ Done · Effective capacity {cap} mAh · Utilization {f}%{extra}' },
    'power.status.lowCurrentApplied': { zh: ' · 已应用低电流修正 (+{x}%)', en: ' · Low-current correction applied (+{x}%)' }
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

    // ============================================================
    //  电池预设
    // ============================================================
    const batteryPresets = {
        alkaline: {
            name: '碱性电池',
            nominalV: 1.5,
            cutoffV: 0.8,
            sizes: { AA: 2500, AAA: 1200 },
            internalR: { AA: 0.15, AAA: 0.2 },
            hint: 'power.hint.alkaline'
        },
        carbon: {
            name: '碳电池',
            nominalV: 1.5,
            cutoffV: 0.8,
            sizes: { AA: 800, AAA: 400 },
            internalR: { AA: 0.5, AAA: 0.6 },
            hint: 'power.hint.carbon'
        },
        lithium: {
            name: '锂电池',
            nominalV: 3.0,
            cutoffV: 2.0,
            capacity: 0,
            internalR: 0.1,
            hint: 'power.hint.lithium'
        }
    };

    // ============================================================
    //  放电曲线数据（基于南孚等典型电池小电流放电特性）
    //  u = 从 V截止 到 V最低 之间的可用容量占比
    // ============================================================
    const dischargeCurves = {
        alkaline: [
            {v: 1.50, u: 0.00}, {v: 1.45, u: 0.08}, {v: 1.40, u: 0.18},
            {v: 1.35, u: 0.32}, {v: 1.30, u: 0.48}, {v: 1.25, u: 0.62},
            {v: 1.20, u: 0.74}, {v: 1.15, u: 0.84}, {v: 1.10, u: 0.90},
            {v: 1.00, u: 0.97}, {v: 0.80, u: 1.00}
        ],
        carbon: [
            {v: 1.50, u: 0.00}, {v: 1.40, u: 0.12}, {v: 1.30, u: 0.28},
            {v: 1.20, u: 0.50}, {v: 1.10, u: 0.72}, {v: 1.00, u: 0.90},
            {v: 0.80, u: 1.00}
        ],
        lithium: [
            {v: 3.00, u: 0.00}, {v: 2.90, u: 0.08}, {v: 2.80, u: 0.18},
            {v: 2.70, u: 0.32}, {v: 2.60, u: 0.50}, {v: 2.50, u: 0.68},
            {v: 2.40, u: 0.82}, {v: 2.20, u: 0.95}, {v: 2.00, u: 1.00}
        ]
    };

    function getUtilization(vMinSingle, curve) {
        if (vMinSingle <= curve[curve.length - 1].v) return 1.0;
        if (vMinSingle >= curve[0].v) return 0.0;
        for (let i = 0; i < curve.length - 1; i++) {
            if (vMinSingle <= curve[i].v && vMinSingle >= curve[i + 1].v) {
                const ratio = (curve[i].v - vMinSingle) / (curve[i].v - curve[i + 1].v);
                return curve[i].u + ratio * (curve[i + 1].u - curve[i].u);
            }
        }
        return 1.0;
    }

    // ============================================================
    //  DOM 引用
    // ============================================================
    const batteryType = document.getElementById('batteryType');
    const batterySize = document.getElementById('batterySize');
    const sizeRow     = document.getElementById('sizeRow');
    const capacity    = document.getElementById('capacity');
    const cells       = document.getElementById('cells');
    const minVoltage  = document.getElementById('minVoltage');
    const avgCurrent  = document.getElementById('avgCurrent');
    const maxCurrent  = document.getElementById('maxCurrent');
    const sleepCurrent= document.getElementById('sleepCurrent');
    const batteryHint = document.getElementById('batteryHint');
    const voltageBadge= document.getElementById('voltageBadge');
    const resistBadge = document.getElementById('resistBadge');
    const calcBtn     = document.getElementById('calcBtn');
    const presetBtn   = document.getElementById('presetBtn');
    const statusMsg   = document.getElementById('statusMsg');

    // 电流单位下拉框
    const avgUnitSelect   = document.getElementById('avgUnitSelect');
    const maxUnitSelect   = document.getElementById('maxUnitSelect');
    const sleepUnitSelect = document.getElementById('sleepUnitSelect');

    // 电流单位状态 (true = uA, false = mA)
    let avgIsUa   = avgUnitSelect.value === 'uA';
    let maxIsUa   = maxUnitSelect.value === 'uA';
    let sleepIsUa = sleepUnitSelect.value === 'uA';

    const resDays     = document.getElementById('resDays');
    const resHours    = document.getElementById('resHours');
    const resWeeks    = document.getElementById('resWeeks');
    const resMonths   = document.getElementById('resMonths');
    const resSleepDays= document.getElementById('resSleepDays');
    const resSleepHours=document.getElementById('resSleepHours');

    const detPackV    = document.getElementById('detPackV');
    const detCutoffV  = document.getElementById('detCutoffV');
    const detFactorAvg= document.getElementById('detFactorAvg');
    const detVSag     = document.getElementById('detVSag');
    const detFactorPeak=document.getElementById('detFactorPeak');
    const detDuty      = document.getElementById('detDuty');
    const detFactor   = document.getElementById('detFactor');
    const detUsable   = document.getElementById('detUsable');
    const lowCurrentRow = document.getElementById('lowCurrentRow');
    const detLowCurrent = document.getElementById('detLowCurrent');

    // ============================================================
    //  工具函数
    // ============================================================
    function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
    function fmt(n, d) {
        if (!isFinite(n)) return '∞';
        d = (d === undefined) ? 2 : d;
        return n.toFixed(d);
    }
    function num(id) { return parseFloat(id.value); }

    // 仅刷新由 JS 控制的动态标签（hint / 电压内阻徽标 / placeholder），不改动输入值
    function refreshLabels() {
        const p = batteryPresets[batteryType.value];
        batteryHint.textContent = tr(p.hint);
        voltageBadge.textContent = tr('power.badge.voltage').replace('{nominal}', p.nominalV).replace('{cutoff}', p.cutoffV);
        if (batteryType.value === 'lithium') {
            resistBadge.textContent = tr('power.badge.resist').replace('{r}', p.internalR);
            capacity.placeholder = tr('power.placeholder.capacity');
        } else {
            const intR = p.internalR[batterySize.value];
            resistBadge.textContent = tr('power.badge.resist').replace('{r}', intR);
            capacity.placeholder = '';
        }
    }

    // 当电池类型变化时同步预设
    function applyPreset() {
        const p = batteryPresets[batteryType.value];
        // 显示/隐藏规格选择行
        if (batteryType.value === 'lithium') {
            sizeRow.style.display = 'none';
            capacity.value = '';
        } else {
            sizeRow.style.display = 'flex';
            const size = batterySize.value;
            capacity.value = p.sizes[size];
        }
        // 给出一个贴合该电池类型的最低工作电压默认值（单节）
        if (minVoltage.value === '' || parseFloat(minVoltage.value) <= 0) {
            minVoltage.value = (p.nominalV - (p.nominalV - p.cutoffV) * 0.4).toFixed(2);
        }
        refreshLabels();
    }

    // 电流单位转换函数（下拉框切换时调用）
    function convertUnit(inputEl, fromUnit, toUnit) {
        if (fromUnit === toUnit) return;
        const val = parseFloat(inputEl.value);
        if (isNaN(val)) return;
        if (fromUnit === 'mA' && toUnit === 'uA') {
            inputEl.value = (val * 1000).toFixed(2);
        } else if (fromUnit === 'uA' && toUnit === 'mA') {
            inputEl.value = (val / 1000).toFixed(4);
        }
    }

    // ============================================================
    //  低电流放电曲线修正
    //  当前放电曲线基于中等电流(~50mA)，对极低电流过于悲观
    //  原理：小电流下电化学极化更小，相同带载电压对应更深放电深度
    // ============================================================
    const lowCurrentCoeffs = {
        alkaline: 0.38,
        carbon: 0.45,
        lithium: 0.20
    };
    function correctUtilizationForLowCurrent(util, iMa, batteryTypeKey) {
        const I_REF = 50; // mA，参考电流
        if (iMa >= I_REF || util >= 1) return util;
        const ratio = Math.max(0.001, iMa / I_REF);
        // 电流越小，scale 越接近 1
        const scale = Math.log10(1 / ratio) / 3; // log10(1000)=3
        const coeff = lowCurrentCoeffs[batteryTypeKey] || 0.35;
        // 利用率越低，可修正空间越大；高利用率时修正较小
        const correction = (1 - util) * coeff * scale;
        return Math.min(1, util + correction);
    }

    // ============================================================
    //  核心计算
    // ============================================================
    function calculate() {
        const p = batteryPresets[batteryType.value];
        const capVal = num(capacity);
        const nCells = Math.max(1, parseInt(cells.value, 10) || 1);
        const vMin   = num(minVoltage);

        // 电流值转换：如果是 uA 则转为 mA
        let iAvg = num(avgCurrent);
        let iMax = num(maxCurrent);
        let iSleep = num(sleepCurrent);
        if (avgIsUa) iAvg = iAvg / 1000;
        if (maxIsUa) iMax = iMax / 1000;
        if (sleepIsUa) iSleep = iSleep / 1000;

        // 获取内阻
        let intR;
        if (batteryType.value === 'lithium') {
            intR = p.internalR;
        } else {
            intR = p.internalR[batterySize.value];
        }

        // 校验
        if (isNaN(capVal) || capVal <= 0) {
            showStatus('error', tr('power.err.capacity'));
            clearResults();
            return;
        }
        if (isNaN(vMin) || vMin <= 0) { showStatus('error', tr('power.err.minVoltage')); clearResults(); return; }
        if (isNaN(iAvg) || iAvg <= 0) { showStatus('error', tr('power.err.avgCurrent')); clearResults(); return; }
        if (isNaN(iMax) || iMax < 0)  { showStatus('error', tr('power.err.maxCurrent')); clearResults(); return; }

        const packNominalV = p.nominalV * nCells;
        const packCutoffV  = p.cutoffV  * nCells;
        const packR        = intR * nCells;

        detPackV.textContent   = `${fmt(packNominalV)} V`;
        detCutoffV.textContent = `${fmt(packCutoffV)} V`;

        // 设备最低电压高于标称 → 无法工作
        if (vMin >= packNominalV) {
            showStatus('error', tr('power.err.vMinTooHigh').replace('{vMin}', vMin).replace('{packV}', fmt(packNominalV)));
            clearResults();
            return;
        }

        // 容量利用率：基于放电曲线（南孚/典型电池特性），非线性
        let fvAvg, fvPeak, vSagAvg, vSagPeak;
        const curve = dischargeCurves[batteryType.value];
        const vMinSingleAvg  = (vMin / nCells) + (iAvg / 1000) * intR;
        const vMinSinglePeak = (vMin / nCells) + (iMax / 1000) * intR;
        vSagAvg  = (iAvg / 1000) * packR;
        vSagPeak = (iMax / 1000) * packR;

        let fvAvgRaw = fvAvg, fvPeakRaw = fvPeak;
        if (curve) {
            fvAvgRaw  = clamp(getUtilization(vMinSingleAvg,  curve), 0, 1);
            fvPeakRaw = clamp(getUtilization(vMinSinglePeak, curve), 0, 1);
            // 低电流修正：当前曲线基于~50mA，对极小电流过于悲观
            fvAvg  = correctUtilizationForLowCurrent(fvAvgRaw,  iAvg, batteryType.value);
            fvPeak = correctUtilizationForLowCurrent(fvPeakRaw, iMax, batteryType.value);
        } else {
            fvAvg = fvPeak = 1;
            fvAvgRaw = fvPeakRaw = 1;
        }

        // 峰值占空比自适应估算：D = (Iavg - Isleep) / (Imax - Isleep)
        // 综合系数 = D × fvPeak + (1-D) × fvAvg
        let dutyCycle = 0.3;
        if (iMax > iSleep && iAvg >= iSleep) {
            dutyCycle = clamp((iAvg - iSleep) / (iMax - iSleep), 0, 1);
        }
        const factor = dutyCycle * fvPeak + (1 - dutyCycle) * fvAvg;
        const usableCap = capVal * factor;

        detFactorAvg.textContent  = `${fmt(fvAvg * 100, 1)} %`;
        detVSag.textContent       = `${fmt(vSagPeak, 4)} V`;
        detFactorPeak.textContent = `${fmt(fvPeak * 100, 1)} %`;
        detDuty.textContent       = `${fmt(dutyCycle * 100, 2)} %`;
        detFactor.textContent     = `${fmt(factor * 100, 1)} %`;
        detUsable.textContent     = `${fmt(usableCap, 1)} mAh`;

        // 低电流修正明细    基础 ${fmt(fvAvgRaw*100,1)}% → 修正后 ${fmt(fvAvg*100,1)}% (+${fmt((fvAvg-fvAvgRaw)*100,1)}%)
        if (iAvg < 50 && fvAvg > fvAvgRaw) {
            lowCurrentRow.style.display = 'flex';
            detLowCurrent.textContent = `${fmt(fvAvg*100,1)}%`;
        } else {
            lowCurrentRow.style.display = 'none';
            detLowCurrent.textContent = '—';
        }

        // 工作时长
        const hours = usableCap / iAvg;
        const days  = hours / 24;
        const weeks = days / 7;
        const months= days / 30;

        resHours.textContent  = `${fmt(hours, 1)} ${tr('power.unit.hours')}`;
        resDays.textContent   = `${fmt(days, 1)} ${tr('power.unit.days')}`;
        resWeeks.textContent  = `${fmt(weeks, 2)} ${tr('power.unit.weeks')}`;
        resMonths.textContent = `${fmt(months, 2)} ${tr('power.unit.months')}`;

        // 纯睡眠参考
        if (!isNaN(iSleep) && iSleep > 0) {
            const sHours = usableCap / iSleep;
            resSleepDays.textContent  = `${fmt(sHours / 24, 1)} ${tr('power.unit.days')}`;
            resSleepHours.textContent = `${fmt(sHours, 1)} ${tr('power.unit.hours')}`;
        } else {
            resSleepDays.textContent  = '—';
            resSleepHours.textContent = tr('power.sleep.notEntered');
        }

        // 状态提示
        const lowCurrentHint = (iAvg < 50 && fvAvg > fvAvgRaw)
            ? tr('power.status.lowCurrentApplied').replace('{x}', fmt((fvAvg-fvAvgRaw)*100,1))
            : '';
        if (factor < 0.05) {
            showStatus('error', tr('power.err.factorTooLow').replace('{f}', fmt(factor*100,1)));
        } else if (factor < 0.3) {
            showStatus('ok', tr('power.status.lowFactor').replace('{f}', fmt(factor*100,1)));
        } else {
            showStatus('ok', tr('power.status.ok').replace('{cap}', fmt(usableCap,1)).replace('{f}', fmt(factor*100,1)).replace('{extra}', lowCurrentHint));
        }
    }

    function showStatus(type, msg) {
        if (type === 'error') statusMsg.innerHTML = `<span class="error-msg">${msg}</span>`;
        else statusMsg.innerHTML = `<span class="status-ok">${msg}</span>`;
    }

    function clearResults() {
        resDays.textContent = '—'; resHours.textContent = `— ${tr('power.unit.hours')}`;
        resWeeks.textContent = '—'; resMonths.textContent = '—';
        resSleepDays.textContent = '—'; resSleepHours.textContent = '—';
        detPackV.textContent = '—'; detCutoffV.textContent = '—';
        detFactorAvg.textContent = '—'; detVSag.textContent = '—';
        detFactorPeak.textContent = '—'; detDuty.textContent = '—'; detFactor.textContent = '—'; detUsable.textContent = '—';
        lowCurrentRow.style.display = 'none'; detLowCurrent.textContent = '—';
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    batteryType.addEventListener('change', applyPreset);
    batterySize.addEventListener('change', applyPreset);
    [capacity, cells, minVoltage, avgCurrent, maxCurrent, sleepCurrent].forEach(el => {
        el.addEventListener('input', calculate);
    });
    calcBtn.addEventListener('click', calculate);

    // 电流单位下拉框切换事件
    avgUnitSelect.addEventListener('change', function() {
        const newIsUa = avgUnitSelect.value === 'uA';
        convertUnit(avgCurrent, avgIsUa ? 'uA' : 'mA', newIsUa ? 'uA' : 'mA');
        avgIsUa = newIsUa;
        calculate();
    });
    maxUnitSelect.addEventListener('change', function() {
        const newIsUa = maxUnitSelect.value === 'uA';
        convertUnit(maxCurrent, maxIsUa ? 'uA' : 'mA', newIsUa ? 'uA' : 'mA');
        maxIsUa = newIsUa;
        calculate();
    });
    sleepUnitSelect.addEventListener('change', function() {
        const newIsUa = sleepUnitSelect.value === 'uA';
        convertUnit(sleepCurrent, sleepIsUa ? 'uA' : 'mA', newIsUa ? 'uA' : 'mA');
        sleepIsUa = newIsUa;
        calculate();
    });

    presetBtn.addEventListener('click', function() {
        batteryType.value = 'alkaline';
        batterySize.value = 'AAA';
        avgIsUa = true; maxIsUa = false; sleepIsUa = true;
        avgUnitSelect.value = 'uA';
        maxUnitSelect.value = 'mA';
        sleepUnitSelect.value = 'uA';
        applyPreset();
        cells.value = 2;
        minVoltage.value = 2.6;
        avgCurrent.value = 200;
        maxCurrent.value = 35;
        sleepCurrent.value = 120;
        calculate();
    });

    // 监听语言切换：更新动态文本并重新计算
    document.addEventListener('languagechange', function () {
        document.title = tr('power.doc.title');
        refreshLabels();
        calculate();
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.title = tr('power.doc.title');
    applyPreset();
    calculate();
})();
