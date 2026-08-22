// ============================================================
//  PID 调试仿真工具 PIDemulator.html 页面脚本
//  主题切换逻辑由 theme.js 提供（全局 setTheme + #themeToggle 点击绑定）
//  此处监听 'themechange' 事件，在主题切换时重绘 Canvas 图表
//  （drawChart 会重新读取 CSS 变量，因此切换主题后需重绘）
//  语言切换由 i18n.js 提供，监听 'languagechange' 更新动态文本与图表
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    // 公共
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    // 文档标题与页面标题
    'pid.doc.title':   { zh: 'PID 调试仿真工具', en: 'PID Tuning Simulator' },
    'pid.page.title':  { zh: '🎯 PID 调试仿真工具', en: '🎯 PID Tuning Simulator' },
    'pid.subhead':     { zh: '🔹 位置式 PID 控制器 · 一阶惯性+纯滞后对象 · 实时曲线 · 性能指标 · 参数预设 · 🖱️ 滚轮缩放 · 拖拽平移 · 双击重置', en: '🔹 Positional PID controller · First-order inertia + pure delay · Real-time curve · Performance metrics · Presets · 🖱️ Scroll to zoom · Drag to pan · Double-click to reset' },

    // 模块① 控制器参数
    'pid.p1.title': { zh: '① 控制器参数', en: '① Controller Parameters' },

    // 模块② 被控对象
    'pid.p2.title':        { zh: '② 被控对象', en: '② Plant' },
    'pid.p2.small':        { zh: '一阶惯性 + 纯滞后', en: 'First-order inertia + pure delay' },
    'pid.label.gain':       { zh: '增益 K', en: 'Gain K' },
    'pid.label.timeConst':  { zh: '时间常数 T', en: 'Time Constant T' },
    'pid.label.delay':      { zh: '滞后 L', en: 'Delay L' },

    // 模块③ 仿真控制
    'pid.p3.title':        { zh: '③ 仿真控制', en: '③ Simulation Control' },
    'pid.label.setpoint':   { zh: '设定值', en: 'Setpoint' },
    'pid.label.speed':      { zh: '速度', en: 'Speed' },
    'pid.hint.speed':       { zh: '仿真加速', en: 'Simulation speed' },
    'pid.label.duration':   { zh: '仿真时长', en: 'Duration' },
    'pid.unit.sec':         { zh: '秒', en: 's' },
    'pid.hint.duration':    { zh: '20~600s (10分钟)', en: '20~600s (10 min)' },
    'pid.btn.start':        { zh: '▶ 启动', en: '▶ Start' },
    'pid.btn.pause':        { zh: '⏸ 暂停', en: '⏸ Pause' },
    'pid.btn.resume':       { zh: '▶ 继续', en: '▶ Resume' },
    'pid.btn.reset':        { zh: '⟳ 重置', en: '⟳ Reset' },
    'pid.status.ready':     { zh: '● 就绪', en: '● Ready' },
    'pid.status.running':   { zh: '▶ 运行中', en: '▶ Running' },
    'pid.status.paused':    { zh: '⏸ 已暂停', en: '⏸ Paused' },
    'pid.status.done':      { zh: '✅ 仿真完成', en: '✅ Simulation Complete' },

    // 模块④ 实时曲线
    'pid.p4.title':         { zh: '④ 实时曲线', en: '④ Real-time Curve' },
    'pid.p4.small':         { zh: '设定值 · 实际值 · 输出', en: 'Setpoint · Process · Output' },
    'pid.chart.title':      { zh: 'PID 响应曲线', en: 'PID Response Curve' },
    'pid.legend.setpoint':  { zh: '设定值', en: 'Setpoint' },
    'pid.legend.process':   { zh: '实际值', en: 'Process' },
    'pid.legend.output':    { zh: '输出', en: 'Output' },
    'pid.hint.zoom':        { zh: '🖱️ 滚轮缩放 · 拖拽平移', en: '🖱️ Scroll to zoom · Drag to pan' },
    'pid.display.time':       { zh: '时间: 0.00 s', en: 'Time: 0.00 s' },
    'pid.display.steps':       { zh: '步数: 0', en: 'Steps: 0' },
    'pid.display.target':      { zh: '目标: 20 s', en: 'Target: 20 s' },
    'pid.display.timePrefix':  { zh: '时间: ', en: 'Time: ' },
    'pid.display.stepsPrefix': { zh: '步数: ', en: 'Steps: ' },
    'pid.display.targetPrefix':{ zh: '目标: ', en: 'Target: ' },

    // 模块⑤ 性能指标
    'pid.p5.title':          { zh: '⑤ 性能指标', en: '⑤ Performance Metrics' },
    'pid.p5.small':          { zh: '响应品质评价', en: 'Response quality evaluation' },
    'pid.metric.overshoot':   { zh: '超调量', en: 'Overshoot' },
    'pid.metric.riseTime':    { zh: '上升时间', en: 'Rise Time' },
    'pid.metric.settleTime':  { zh: '调节时间 (±2%)', en: 'Settling Time (±2%)' },
    'pid.metric.steadyError': { zh: '稳态误差', en: 'Steady-state Error' },
    'pid.metric.peakTime':    { zh: '峰值时间', en: 'Peak Time' },
    'pid.metric.iae':         { zh: '积分绝对误差 (IAE)', en: 'Integral Absolute Error (IAE)' },
    'pid.hint.metrics':      { zh: '💡 指标在仿真结束后自动计算 · 调节时间指进入 ±2% 误差带的时间', en: '💡 Metrics are auto-calculated after simulation · Settling time is when entering ±2% error band' },

    // 模块⑥ 参数预设
    'pid.p6.title':    { zh: '⑥ 参数预设', en: '⑥ Presets' },
    'pid.p6.small':    { zh: '快速加载典型 PID 参数', en: 'Quickly load typical PID parameters' },
    'pid.preset.p1':   { zh: 'P 控制', en: 'P Control' },
    'pid.preset.p2':   { zh: 'PI 控制', en: 'PI Control' },
    'pid.preset.p3':   { zh: 'PID 控制', en: 'PID Control' },
    'pid.preset.p4':   { zh: '快速响应', en: 'Fast Response' },
    'pid.preset.p5':   { zh: '强阻尼', en: 'Strong Damping' },
    'pid.preset.p6':   { zh: '积分主导', en: 'Integral Dominant' },
    'pid.hint.preset': { zh: '点击预设将自动加载 Kp, Ki, Kd 参数', en: 'Click a preset to auto-load Kp, Ki, Kd parameters' },

    // 模块⑦ 数据导出
    'pid.p7.title':         { zh: '⑦ 数据导出', en: '⑦ Data Export' },
    'pid.p7.small':         { zh: '仿真数据 CSV', en: 'Simulation Data CSV' },
    'pid.btn.exportCsv':     { zh: '📤 导出 CSV', en: '📤 Export CSV' },
    'pid.btn.copyCsv':       { zh: '📋 复制 CSV', en: '📋 Copy CSV' },
    'pid.btn.clearData':     { zh: '🧹 清空数据', en: '🧹 Clear Data' },
    'pid.csv.placeholder':   { zh: '(仿真数据将显示在这里)', en: '(Simulation data will be shown here)' },
    'pid.csv.noData':        { zh: '(无数据)', en: '(No data)' },
    'pid.csv.rowsTotal':     { zh: '... (共 {n} 行)', en: '... ({n} rows total)' },
    'pid.csv.header':        { zh: '时间(s),设定值(%),实际值(%),输出(%)', en: 'Time(s),Setpoint(%),Process(%),Output(%)' },
    'pid.err.noExportData':  { zh: '没有数据可导出', en: 'No data to export' },
    'pid.err.noCopyData':    { zh: '没有数据可复制', en: 'No data to copy' },
    'pid.err.copyFailed':   { zh: '复制失败，请手动复制', en: 'Copy failed, please copy manually' },

    // 图表轴标签
    'pid.chart.xAxis': { zh: '时间 (s)', en: 'Time (s)' },
    'pid.chart.yAxis': { zh: '值 (%)', en: 'Value (%)' },

    // 页脚
    'pid.footer': { zh: '🎯 PID 调试仿真工具 · 位置式 PID · 一阶惯性+纯滞后模型 · 实时响应分析', en: '🎯 PID Tuning Simulator · Positional PID · First-order inertia + pure delay model · Real-time response analysis' }
};

(function() {
    'use strict';

    // 翻译函数（i18n.js 提供 window.I18N.t，此处做安全回退）
    function tr(key) {
        if (window.I18N && window.I18N.t) {
            var v = window.I18N.t(key);
            return (v === null || v === undefined) ? key : v;
        }
        var entry = (window.I18N_STRINGS || {})[key];
        return entry ? entry.zh : key;
    }

    // ===== 主题切换后重绘图表 =====
    document.addEventListener('themechange', function() {
        drawChart();
    });

    // ============================================================
    //  DOM 引用
    // ============================================================
    const kpSlider = document.getElementById('kpSlider');
    const kiSlider = document.getElementById('kiSlider');
    const kdSlider = document.getElementById('kdSlider');
    const kpInput = document.getElementById('kpInput');
    const kiInput = document.getElementById('kiInput');
    const kdInput = document.getElementById('kdInput');

    const plantK = document.getElementById('plantK');
    const plantT = document.getElementById('plantT');
    const plantL = document.getElementById('plantL');

    const setpointSlider = document.getElementById('setpointSlider');
    const setpointInput = document.getElementById('setpointInput');
    const simSpeed = document.getElementById('simSpeed');
    const simDuration = document.getElementById('simDuration');
    const durationDisplay = document.getElementById('durationDisplay');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const simStatus = document.getElementById('simStatus');
    const simTimeDisplay = document.getElementById('simTimeDisplay');
    const sampleCountDisplay = document.getElementById('sampleCountDisplay');

    const chartCanvas = document.getElementById('chartCanvas');
    const chartTooltip = document.getElementById('chartTooltip');
    const chartWrapper = document.getElementById('chartWrapper');
    const zoomStatusEl = document.getElementById('zoomStatus');

    const metricOvershoot = document.getElementById('metricOvershoot');
    const metricRiseTime = document.getElementById('metricRiseTime');
    const metricSettleTime = document.getElementById('metricSettleTime');
    const metricSteadyError = document.getElementById('metricSteadyError');
    const metricPeakTime = document.getElementById('metricPeakTime');
    const metricIAE = document.getElementById('metricIAE');

    const presetGrid = document.getElementById('presetGrid');
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const copyCsvBtn = document.getElementById('copyCsvBtn');
    const clearDataBtn = document.getElementById('clearDataBtn');
    const csvPreview = document.getElementById('csvPreview');

    // ============================================================
    //  状态变量
    // ============================================================
    let isRunning = false;
    let isPaused = false;
    let simTime = 0;
    let stepCount = 0;
    const DT = 0.01;
    let maxSimTime = 20;

    let processValue = 0;
    let prevProcessValue = 0;
    let controllerOutput = 0;
    let prevControllerOutput = 0;
    let integral = 0;
    let prevError = 0;
    let delayBuffer = [];
    let delaySteps = 0;
    let dataLog = [];
    let metrics = {};

    // ===== 缩放/平移状态 =====
    let zoomState = {
        xMin: null, // null 表示全范围
        xMax: null
    };

    // ===== 拖拽状态 =====
    let dragState = {
        isDragging: false,
        startX: 0,
        startXMin: 0,
        startXMax: 0
    };

    const CHART_H = 420;
    const PAD = { top: 24, right: 44, bottom: 46, left: 52 };
    const DPR = window.devicePixelRatio || 1;

    // 更新时长显示
    function updateDurationDisplay() {
        const val = parseInt(simDuration.value) || 20;
        const clamped = Math.max(20, Math.min(600, val));
        if (clamped !== val) simDuration.value = clamped;
        maxSimTime = clamped;
        durationDisplay.textContent = tr('pid.display.targetPrefix') + maxSimTime + ' s';
    }
    simDuration.addEventListener('change', updateDurationDisplay);
    simDuration.addEventListener('input', updateDurationDisplay);
    updateDurationDisplay();

    // ============================================================
    //  PID 参数同步
    // ============================================================
    function syncPID() {
        kpInput.value = parseFloat(kpSlider.value);
        kiInput.value = parseFloat(kiSlider.value);
        kdInput.value = parseFloat(kdSlider.value);
    }

    kpSlider.addEventListener('input', syncPID);
    kiSlider.addEventListener('input', syncPID);
    kdSlider.addEventListener('input', syncPID);

    kpInput.addEventListener('input', () => {
        let v = parseFloat(kpInput.value) || 0;
        v = Math.max(0, Math.min(20, v));
        kpSlider.value = v;
        kpInput.value = v;
    });
    kiInput.addEventListener('input', () => {
        let v = parseFloat(kiInput.value) || 0;
        v = Math.max(0, Math.min(10, v));
        kiSlider.value = v;
        kiInput.value = v;
    });
    kdInput.addEventListener('input', () => {
        let v = parseFloat(kdInput.value) || 0;
        v = Math.max(0, Math.min(5, v));
        kdSlider.value = v;
        kdInput.value = v;
    });

    setpointSlider.addEventListener('input', () => {
        setpointInput.value = setpointSlider.value;
    });
    setpointInput.addEventListener('input', () => {
        let v = parseFloat(setpointInput.value) || 0;
        v = Math.max(0, Math.min(100, v));
        setpointSlider.value = v;
        setpointInput.value = v;
    });

    // ============================================================
    //  预设参数
    // ============================================================
    const PRESETS = {
        p1: { kp: 2.0, ki: 0, kd: 0, label: 'P 控制' },
        p2: { kp: 1.5, ki: 0.8, kd: 0, label: 'PI 控制' },
        p3: { kp: 2.0, ki: 0.5, kd: 0.1, label: 'PID 控制' },
        p4: { kp: 4.0, ki: 1.2, kd: 0.3, label: '快速响应' },
        p5: { kp: 1.0, ki: 0.3, kd: 0.05, label: '强阻尼' },
        p6: { kp: 0.8, ki: 2.0, kd: 0.0, label: '积分主导' },
    };

    function applyPreset(name) {
        const p = PRESETS[name];
        if (!p) return;
        kpSlider.value = p.kp;
        kiSlider.value = p.ki;
        kdSlider.value = p.kd;
        syncPID();
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.toggle('active', b.dataset.preset === name));
    }

    presetGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.preset-btn');
        if (!btn) return;
        applyPreset(btn.dataset.preset);
    });
    document.querySelector('.preset-btn[data-preset="p3"]')?.classList.add('active');

    // ============================================================
    //  模型与仿真
    // ============================================================
    function initPlant() {
        const K = parseFloat(plantK.value) || 1.0;
        const T = parseFloat(plantT.value) || 1.0;
        const L = parseFloat(plantL.value) || 0.0;
        delaySteps = Math.round(L / DT);
        delayBuffer = new Array(delaySteps + 1).fill(0);
        processValue = 0;
        prevProcessValue = 0;
        controllerOutput = 0;
        prevControllerOutput = 0;
        integral = 0;
        prevError = 0;
        return { K, T, L };
    }

    function stepPlant(u, dt, K, T) {
        let uDelayed = u;
        if (delaySteps > 0) {
            delayBuffer.push(u);
            if (delayBuffer.length > delaySteps) {
                uDelayed = delayBuffer.shift();
            } else {
                uDelayed = 0;
            }
        }
        const y = processValue;
        const dy = (dt / T) * (K * uDelayed - y);
        const yNew = y + dy;
        prevProcessValue = y;
        processValue = yNew;
        return yNew;
    }

    function pidCompute(setpoint, process, dt, Kp, Ki, Kd) {
        const error = setpoint - process;
        integral += error * dt;
        const INTEGRAL_LIMIT = 100;
        integral = Math.max(-INTEGRAL_LIMIT, Math.min(INTEGRAL_LIMIT, integral));
        const derivative = (error - prevError) / dt;
        let output = Kp * error + Ki * integral + Kd * derivative;
        const OUTPUT_LIMIT = 100;
        output = Math.max(-OUTPUT_LIMIT, Math.min(OUTPUT_LIMIT, output));
        prevError = error;
        return output;
    }

    let simTimer = null;

    // 重置缩放状态
    function resetZoom() {
        zoomState.xMin = null;
        zoomState.xMax = null;
        updateZoomStatus();
    }

    function updateZoomStatus() {
        if (zoomState.xMin !== null && zoomState.xMax !== null) {
            const range = zoomState.xMax - zoomState.xMin;
            zoomStatusEl.textContent = `🔍 ${zoomState.xMin.toFixed(2)} ~ ${zoomState.xMax.toFixed(2)} s (${range.toFixed(2)}s)`;
            zoomStatusEl.className = 'visible';
        } else {
            zoomStatusEl.textContent = '';
            zoomStatusEl.className = '';
        }
    }

    // 更新动态显示文本（语言切换后调用）
    function updateDynamicTexts() {
        if (isRunning && !isPaused) {
            simStatus.innerHTML = '<span class="status-ok">' + tr('pid.status.running') + '</span>';
        } else if (isPaused) {
            simStatus.innerHTML = '<span class="status-info">' + tr('pid.status.paused') + '</span>';
        } else if (dataLog.length > 0) {
            simStatus.innerHTML = '<span class="status-ok">' + tr('pid.status.done') + '</span>';
        } else {
            simStatus.textContent = tr('pid.status.ready');
        }
        simTimeDisplay.textContent = tr('pid.display.timePrefix') + simTime.toFixed(2) + ' s';
        sampleCountDisplay.textContent = tr('pid.display.stepsPrefix') + stepCount;
        durationDisplay.textContent = tr('pid.display.targetPrefix') + maxSimTime + ' s';
        startBtn.textContent = tr('pid.btn.start');
        pauseBtn.textContent = isPaused ? tr('pid.btn.resume') : tr('pid.btn.pause');
    }

    function resetSimulation() {
        if (simTimer) {
            clearInterval(simTimer);
            simTimer = null;
        }
        isRunning = false;
        isPaused = false;
        simTime = 0;
        stepCount = 0;
        dataLog = [];
        metrics = {};
        integral = 0;
        prevError = 0;
        processValue = 0;
        prevProcessValue = 0;
        controllerOutput = 0;
        prevControllerOutput = 0;
        const K = parseFloat(plantK.value) || 1.0;
        const T = parseFloat(plantT.value) || 1.0;
        const L = parseFloat(plantL.value) || 0.0;
        delaySteps = Math.round(L / DT);
        delayBuffer = new Array(delaySteps + 1).fill(0);

        // 重置缩放
        resetZoom();

        updateDurationDisplay();

        startBtn.disabled = false;
        startBtn.textContent = tr('pid.btn.start');
        pauseBtn.disabled = true;
        pauseBtn.textContent = tr('pid.btn.pause');
        simStatus.textContent = tr('pid.status.ready');
        simTimeDisplay.textContent = tr('pid.display.timePrefix') + '0.00 s';
        sampleCountDisplay.textContent = tr('pid.display.stepsPrefix') + '0';

        clearMetrics();
        drawChart();
        csvPreview.textContent = tr('pid.csv.placeholder');
    }

    function clearMetrics() {
        metricOvershoot.textContent = '—';
        metricRiseTime.textContent = '—';
        metricSettleTime.textContent = '—';
        metricSteadyError.textContent = '—';
        metricPeakTime.textContent = '—';
        metricIAE.textContent = '—';
        ['metricOvershoot', 'metricRiseTime', 'metricSettleTime', 'metricSteadyError', 'metricPeakTime',
            'metricIAE'
        ].forEach(id => {
            document.getElementById(id).className = 'metric-value';
        });
    }

    function startSimulation() {
        if (isRunning && !isPaused) return;

        if (!isRunning) {
            resetSimulation();
            updateDurationDisplay();
            const K = parseFloat(plantK.value) || 1.0;
            const T = parseFloat(plantT.value) || 1.0;
            const L = parseFloat(plantL.value) || 0.0;
            delaySteps = Math.round(L / DT);
            delayBuffer = new Array(delaySteps + 1).fill(0);
            processValue = 0;
            prevProcessValue = 0;
            controllerOutput = 0;
            prevControllerOutput = 0;
            integral = 0;
            prevError = 0;
            dataLog = [];
            simTime = 0;
            stepCount = 0;
            isRunning = true;
            isPaused = false;
        } else if (isPaused) {
            isPaused = false;
            pauseBtn.textContent = tr('pid.btn.pause');
            simStatus.innerHTML = '<span class="status-ok">' + tr('pid.status.running') + '</span>';
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            const speed = parseFloat(simSpeed.value) || 1;
            const intervalMs = DT * 1000 / speed;
            if (simTimer) clearInterval(simTimer);
            simTimer = setInterval(simulationStep, intervalMs);
            return;
        }

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        pauseBtn.textContent = tr('pid.btn.pause');
        simStatus.innerHTML = '<span class="status-ok">' + tr('pid.status.running') + '</span>';

        const speed = parseFloat(simSpeed.value) || 1;
        const intervalMs = DT * 1000 / speed;
        if (simTimer) clearInterval(simTimer);
        simTimer = setInterval(simulationStep, intervalMs);
    }

    function pauseSimulation() {
        if (!isRunning || isPaused) return;
        isPaused = true;
        pauseBtn.textContent = tr('pid.btn.resume');
        simStatus.innerHTML = '<span class="status-info">' + tr('pid.status.paused') + '</span>';
        if (simTimer) {
            clearInterval(simTimer);
            simTimer = null;
        }
    }

    function simulationStep() {
        if (isPaused) return;

        const setpoint = parseFloat(setpointInput.value) || 0;
        const Kp = parseFloat(kpInput.value) || 0;
        const Ki = parseFloat(kiInput.value) || 0;
        const Kd = parseFloat(kdInput.value) || 0;
        const K = parseFloat(plantK.value) || 1.0;
        const T = parseFloat(plantT.value) || 1.0;

        const u = pidCompute(setpoint, processValue, DT, Kp, Ki, Kd);
        controllerOutput = u;
        const yNew = stepPlant(u, DT, K, T);
        processValue = yNew;

        dataLog.push({
            time: simTime,
            setpoint: setpoint,
            process: processValue,
            output: controllerOutput
        });

        stepCount++;
        simTime += DT;

        simTimeDisplay.textContent = tr('pid.display.timePrefix') + simTime.toFixed(2) + ' s';
        sampleCountDisplay.textContent = tr('pid.display.stepsPrefix') + stepCount;

        drawChart();

        if (simTime >= maxSimTime) {
            finishSimulation();
            return;
        }

        if (dataLog.length > 5000) {
            const newLog = [];
            for (let i = 0; i < dataLog.length; i += 2) {
                newLog.push(dataLog[i]);
            }
            dataLog = newLog;
        }
    }

    function finishSimulation() {
        if (simTimer) {
            clearInterval(simTimer);
            simTimer = null;
        }
        isRunning = false;
        isPaused = false;
        startBtn.disabled = false;
        startBtn.textContent = tr('pid.btn.start');
        pauseBtn.disabled = true;
        pauseBtn.textContent = tr('pid.btn.pause');
        simStatus.innerHTML = '<span class="status-ok">' + tr('pid.status.done') + '</span>';

        calculateMetrics();
        updateMetricsDisplay();
        updateCsvPreview();
        drawChart();
    }

    // ============================================================
    //  性能指标
    // ============================================================
    function calculateMetrics() {
        if (dataLog.length < 2) {
            metrics = {};
            return;
        }

        const setpoint = dataLog[dataLog.length - 1].setpoint;
        const finalValue = dataLog[dataLog.length - 1].process;
        const times = dataLog.map(d => d.time);
        const values = dataLog.map(d => d.process);

        let maxVal = -Infinity;
        let maxIdx = 0;
        let peakTime = 0;
        for (let i = 0; i < values.length; i++) {
            if (values[i] > maxVal) {
                maxVal = values[i];
                maxIdx = i;
                peakTime = times[i];
            }
        }
        const overshoot = ((maxVal - setpoint) / setpoint) * 100;

        let riseTime = 0;
        const p10 = setpoint * 0.1;
        const p90 = setpoint * 0.9;
        let t10 = -1,
            t90 = -1;
        for (let i = 0; i < values.length; i++) {
            if (t10 < 0 && values[i] >= p10) t10 = times[i];
            if (t90 < 0 && values[i] >= p90) t90 = times[i];
            if (t10 >= 0 && t90 >= 0) break;
        }
        if (t10 >= 0 && t90 >= 0 && t90 > t10) {
            riseTime = t90 - t10;
        } else {
            const p63 = setpoint * 0.632;
            for (let i = 0; i < values.length; i++) {
                if (values[i] >= p63) { riseTime = times[i]; break; }
            }
        }

        let settleTime = 0;
        const errorBand = setpoint * 0.02;
        let settled = false;
        let settleStart = -1;
        for (let i = values.length - 1; i >= 0; i--) {
            if (Math.abs(values[i] - setpoint) <= errorBand) {
                if (!settled) {
                    settled = true;
                    settleStart = times[i];
                }
            } else {
                if (settled) {
                    settleTime = times[i + 1] || 0;
                    settled = false;
                    break;
                }
            }
        }
        if (settled && settleStart >= 0) {
            settleTime = settleStart;
        }
        if (settleTime === 0 && settled) {
            for (let i = 0; i < values.length; i++) {
                if (Math.abs(values[i] - setpoint) <= errorBand) {
                    settleTime = times[i];
                    break;
                }
            }
        }

        const steadyError = Math.abs(finalValue - setpoint) / setpoint * 100;
        if (peakTime === 0 && maxIdx > 0) peakTime = times[maxIdx];

        let iae = 0;
        for (let i = 1; i < values.length; i++) {
            const dt = times[i] - times[i - 1];
            const error = Math.abs(setpoint - values[i - 1]);
            iae += error * dt;
        }

        metrics = {
            overshoot: overshoot,
            riseTime: riseTime,
            settleTime: settleTime,
            steadyError: steadyError,
            peakTime: peakTime,
            iae: iae,
            setpoint: setpoint,
            finalValue: finalValue,
            maxValue: maxVal
        };
    }

    function updateMetricsDisplay() {
        if (!metrics || Object.keys(metrics).length === 0) {
            clearMetrics();
            return;
        }

        const { overshoot, riseTime, settleTime, steadyError, peakTime, iae } = metrics;

        metricOvershoot.textContent = isFinite(overshoot) ? overshoot.toFixed(1) + '%' : '—';
        metricOvershoot.className = 'metric-value' + (isFinite(overshoot) ?
            (overshoot < 10 ? ' good' : overshoot < 30 ? ' warn' : ' bad') : '');

        metricRiseTime.textContent = isFinite(riseTime) && riseTime > 0 ? riseTime.toFixed(2) + 's' : '—';

        metricSettleTime.textContent = isFinite(settleTime) && settleTime > 0 ? settleTime.toFixed(2) + 's' : '—';
        metricSettleTime.className = 'metric-value' + (isFinite(settleTime) && settleTime > 0 ?
            (settleTime < 3 ? ' good' : settleTime < 8 ? ' warn' : ' bad') : '');

        metricSteadyError.textContent = isFinite(steadyError) ? steadyError.toFixed(2) + '%' : '—';
        metricSteadyError.className = 'metric-value' + (isFinite(steadyError) ?
            (steadyError < 1 ? ' good' : steadyError < 5 ? ' warn' : ' bad') : '');

        metricPeakTime.textContent = isFinite(peakTime) && peakTime > 0 ? peakTime.toFixed(2) + 's' : '—';

        metricIAE.textContent = isFinite(iae) ? iae.toFixed(2) : '—';
    }

    // ============================================================
    //  图表绘制 (支持缩放 + 平移)
    // ============================================================
    function resizeChart() {
        const w = chartWrapper.clientWidth;
        chartCanvas.style.height = CHART_H + 'px';
        chartCanvas.width = w * DPR;
        chartCanvas.height = CHART_H * DPR;
    }

    function getDataRange() {
        const dataMinTime = 0;
        const dataMaxTime = Math.max(simTime, 1);

        let xMin, xMax;
        if (zoomState.xMin !== null && zoomState.xMax !== null) {
            xMin = Math.max(dataMinTime, zoomState.xMin);
            xMax = Math.min(dataMaxTime, zoomState.xMax);
            if (xMax - xMin < 0.01) {
                const mid = (xMin + xMax) / 2;
                xMin = mid - 0.005;
                xMax = mid + 0.005;
            }
        } else {
            xMin = dataMinTime;
            xMax = dataMaxTime;
        }
        return { xMin, xMax, dataMinTime, dataMaxTime };
    }

    function drawChart() {
        resizeChart();
        const ctx = chartCanvas.getContext('2d');
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        const W = chartCanvas.width / DPR;
        const H = chartCanvas.height / DPR;
        const plotW = W - PAD.left - PAD.right;
        const plotH = H - PAD.top - PAD.bottom;

        const cs = getComputedStyle(document.documentElement);
        const cBg = cs.getPropertyValue('--chart-bg').trim();
        const cGrid = cs.getPropertyValue('--chart-grid').trim();
        const cAxis = cs.getPropertyValue('--chart-axis').trim();
        const cLabel = cs.getPropertyValue('--chart-label').trim();
        const cSetpoint = cs.getPropertyValue('--chart-line-setpoint').trim();
        const cProcess = cs.getPropertyValue('--chart-line-process').trim();
        const cOutput = cs.getPropertyValue('--chart-line-output').trim();

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = cBg;
        ctx.fillRect(0, 0, W, H);

        // ---- 确定 X 轴范围 ----
        const range = getDataRange();
        const { xMin, xMax, dataMinTime, dataMaxTime } = range;

        // ---- 筛选可见数据 ----
        const visibleData = dataLog.filter(d => d.time >= xMin && d.time <= xMax);

        // ---- 确定 Y 轴范围 ----
        let yMin = 0,
            yMax = 100;
        if (visibleData.length > 0) {
            let minVal = Infinity,
                maxVal = -Infinity;
            for (const d of visibleData) {
                minVal = Math.min(minVal, d.process, d.setpoint, d.output);
                maxVal = Math.max(maxVal, d.process, d.setpoint, d.output);
            }
            if (maxVal - minVal < 0.001) {
                minVal = Math.min(minVal - 5, -5);
                maxVal = Math.max(maxVal + 5, 5);
            }
            const margin = Math.max((maxVal - minVal) * 0.15, 5);
            yMin = Math.max(minVal - margin, -10);
            yMax = Math.max(maxVal + margin, 10);
        } else {
            yMin = -5;
            yMax = 105;
        }

        // ---- 绘制网格 ----
        ctx.strokeStyle = cGrid;
        ctx.lineWidth = 0.5;
        const yTicks = niceScale(yMin, yMax, 6);
        const xTicks = niceScale(xMin, xMax, 8);
        for (const t of yTicks) {
            const y = PAD.top + plotH - ((t - yMin) / (yMax - yMin)) * plotH;
            ctx.beginPath();
            ctx.moveTo(PAD.left, y);
            ctx.lineTo(PAD.left + plotW, y);
            ctx.stroke();
        }
        for (const t of xTicks) {
            const x = PAD.left + ((t - xMin) / (xMax - xMin)) * plotW;
            ctx.beginPath();
            ctx.moveTo(x, PAD.top);
            ctx.lineTo(x, PAD.top + plotH);
            ctx.stroke();
        }

        // ---- 轴线 ----
        ctx.strokeStyle = cAxis;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(PAD.left, PAD.top);
        ctx.lineTo(PAD.left, PAD.top + plotH);
        ctx.lineTo(PAD.left + plotW, PAD.top + plotH);
        ctx.stroke();

        // ---- 轴标签 ----
        ctx.fillStyle = cLabel;
        ctx.font = '9px SF Mono, Fira Code, monospace';
        ctx.textAlign = 'center';
        for (const t of xTicks) {
            const x = PAD.left + ((t - xMin) / (xMax - xMin)) * plotW;
            ctx.fillText(t.toFixed(1) + 's', x, PAD.top + plotH + 16);
        }
        ctx.textAlign = 'right';
        for (const t of yTicks) {
            const y = PAD.top + plotH - ((t - yMin) / (yMax - yMin)) * plotH;
            ctx.fillText(t.toFixed(1), PAD.left - 8, y + 3);
        }
        ctx.textAlign = 'center';
        ctx.fillStyle = cLabel;
        ctx.font = '10px system-ui, sans-serif';
        ctx.fillText(tr('pid.chart.xAxis'), PAD.left + plotW / 2, H - 4);
        ctx.save();
        ctx.translate(12, PAD.top + plotH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(tr('pid.chart.yAxis'), 0, 0);
        ctx.restore();

        // ---- 绘制数据曲线 ----
        if (visibleData.length < 2) {
            ctx.fillStyle = cLabel;
            ctx.font = '12px system-ui, sans-serif';
            ctx.textAlign = 'center';
        //    ctx.fillText('📊 数据不足，请运行仿真', PAD.left + plotW / 2, PAD.top + plotH / 2);
        } else {
            const lines = [
                { key: 'setpoint', color: cSetpoint, dash: [6, 4], width: 1.5 },
                { key: 'process', color: cProcess, dash: [], width: 2 },
                { key: 'output', color: cOutput, dash: [], width: 2 }
            ];

            for (const line of lines) {
                ctx.strokeStyle = line.color;
                ctx.lineWidth = line.width;
                ctx.setLineDash(line.dash);
                ctx.beginPath();
                let started = false;
                for (let i = 0; i < visibleData.length; i++) {
                    const d = visibleData[i];
                    const x = PAD.left + ((d.time - xMin) / (xMax - xMin)) * plotW;
                    const y = PAD.top + plotH - ((d[line.key] - yMin) / (yMax - yMin)) * plotH;
                    const clampedY = Math.max(PAD.top - 10, Math.min(PAD.top + plotH + 10, y));
                    if (!started) {
                        ctx.moveTo(x, clampedY);
                        started = true;
                    } else {
                        ctx.lineTo(x, clampedY);
                    }
                }
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }

        // ---- 更新缩放状态显示 ----
        updateZoomStatus();

        // ---- 保存当前绘图范围用于交互 ----
        window._lastDrawRange = { xMin, xMax, yMin, yMax, dataMinTime, dataMaxTime };
    }

    // ============================================================
    //  图表交互 (滚轮缩放 + 拖拽平移 + 十字准线)
    // ============================================================

    // ---- 滚轮缩放 ----
    chartCanvas.addEventListener('wheel', function(e) {
        e.preventDefault();
        if (dataLog.length < 2) return;

        const rect = chartCanvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const W = chartCanvas.width / DPR;
        const plotW = W - PAD.left - PAD.right;

        if (cx < PAD.left || cx > PAD.left + plotW) return;

        // 获取当前X轴范围
        const range = getDataRange();
        let curXMin = range.xMin;
        let curXMax = range.xMax;

        // 计算鼠标位置对应的实际时间
        const xPct = (cx - PAD.left) / plotW;
        const center = curXMin + xPct * (curXMax - curXMin);

        // 缩放因子
        const factor = e.deltaY > 0 ? 1.1 : 0.9;
        let halfRange = (curXMax - curXMin) / 2 * factor;

        if (halfRange < 0.025) halfRange = 0.025;

        let newMin = center - halfRange;
        let newMax = center + halfRange;

        const dataMin = range.dataMinTime;
        const dataMax = range.dataMaxTime;
        if (newMin < dataMin) {
            newMin = dataMin;
            newMax = Math.min(dataMax, newMin + halfRange * 2);
        }
        if (newMax > dataMax) {
            newMax = dataMax;
            newMin = Math.max(dataMin, newMax - halfRange * 2);
        }
        if (newMax - newMin < 0.01) {
            const mid = (newMin + newMax) / 2;
            newMin = mid - 0.005;
            newMax = mid + 0.005;
        }

        zoomState.xMin = newMin;
        zoomState.xMax = newMax;

        drawChart();
    }, { passive: false });

    // ---- 拖拽平移 ----
    chartCanvas.addEventListener('mousedown', function(e) {
        if (dataLog.length < 2) return;
        // 仅当左键
        if (e.button !== 0) return;

        const rect = chartCanvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const W = chartCanvas.width / DPR;
        const plotW = W - PAD.left - PAD.right;

        if (cx < PAD.left || cx > PAD.left + plotW) return;

        const range = getDataRange();
        dragState.isDragging = true;
        dragState.startX = cx;
        dragState.startXMin = range.xMin;
        dragState.startXMax = range.xMax;

        chartWrapper.classList.add('grabbing');
        chartCanvas.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function(e) {
        if (!dragState.isDragging) return;

        const rect = chartCanvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const W = chartCanvas.width / DPR;
        const plotW = W - PAD.left - PAD.right;

        // 计算偏移量 (像素 -> 时间)
        const dxPixels = cx - dragState.startX;
        const dxTime = (dxPixels / plotW) * (dragState.startXMax - dragState.startXMin);

        let newMin = dragState.startXMin - dxTime;
        let newMax = dragState.startXMax - dxTime;

        // 限制不超出数据范围
        const range = getDataRange();
        const dataMin = range.dataMinTime;
        const dataMax = range.dataMaxTime;

        if (newMin < dataMin) {
            newMax = newMax + (dataMin - newMin);
            newMin = dataMin;
        }
        if (newMax > dataMax) {
            newMin = newMin - (newMax - dataMax);
            newMax = dataMax;
        }
        // 确保范围有效
        if (newMax - newMin < 0.01) {
            const mid = (newMin + newMax) / 2;
            newMin = mid - 0.005;
            newMax = mid + 0.005;
        }

        zoomState.xMin = newMin;
        zoomState.xMax = newMax;

        drawChart();
    });

    document.addEventListener('mouseup', function() {
        if (dragState.isDragging) {
            dragState.isDragging = false;
            chartWrapper.classList.remove('grabbing');
            chartCanvas.style.cursor = 'crosshair';
        }
    });

    // ---- 双击重置缩放 ----
    chartCanvas.addEventListener('dblclick', function(e) {
        resetZoom();
        drawChart();
    });

    // ---- 鼠标移出时隐藏 tooltip ----
    chartCanvas.addEventListener('mouseleave', () => {
        chartTooltip.classList.remove('visible');
    });

    // ---- 鼠标移动: tooltip + 十字准线 ----
    chartCanvas.addEventListener('mousemove', function(e) {
        // 拖拽时不显示tooltip
        if (dragState.isDragging) {
            chartTooltip.classList.remove('visible');
            return;
        }

        const rect = chartCanvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const W = chartCanvas.width / DPR;
        const H = chartCanvas.height / DPR;
        const plotW = W - PAD.left - PAD.right;
        const plotH = H - PAD.top - PAD.bottom;

        const range = window._lastDrawRange || { xMin: 0, xMax: Math.max(simTime, 1), yMin: -5, yMax: 105 };

        if (cx < PAD.left || cx > PAD.left + plotW || cy < PAD.top || cy > PAD.top + plotH || dataLog.length < 2) {
            chartTooltip.classList.remove('visible');
            drawChart();
            return;
        }

        const xPct = (cx - PAD.left) / plotW;
        const time = range.xMin + xPct * (range.xMax - range.xMin);

        let closest = null;
        let closestDist = Infinity;
        for (const d of dataLog) {
            const dist = Math.abs(d.time - time);
            if (dist < closestDist) {
                closestDist = dist;
                closest = d;
            }
        }

        if (!closest) {
            chartTooltip.classList.remove('visible');
            return;
        }

        chartTooltip.textContent =
            `t=${closest.time.toFixed(2)}s  SP=${closest.setpoint.toFixed(1)}  PV=${closest.process.toFixed(1)}  OUT=${closest.output.toFixed(1)}`;
        chartTooltip.style.left = Math.min(cx + 12, rect.width - 200) + 'px';
        chartTooltip.style.top = Math.max(cy - 40, 4) + 'px';
        chartTooltip.classList.add('visible');

        drawChart();
        const ctx = chartCanvas.getContext('2d');
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        const cs = getComputedStyle(document.documentElement);
        const cCross = cs.getPropertyValue('--chart-crosshair').trim();

        const xPos = PAD.left + ((closest.time - range.xMin) / (range.xMax - range.xMin)) * plotW;
        const yPos = PAD.top + plotH - ((closest.process - range.yMin) / (range.yMax - range.yMin)) * plotH;

        ctx.strokeStyle = cCross;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(xPos, PAD.top);
        ctx.lineTo(xPos, PAD.top + plotH);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(PAD.left, yPos);
        ctx.lineTo(PAD.left + plotW, yPos);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(xPos, yPos, 4, 0, Math.PI * 2);
        ctx.fillStyle = cCross;
        ctx.fill();
    });

    // ============================================================
    //  辅助函数
    // ============================================================
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
        step = Math.max(step, 0.001);
        const ticks = [];
        let start = Math.floor(min / step) * step;
        if (start < min) start += step;
        for (let v = start; v <= max + step * 0.001; v += step) {
            ticks.push(parseFloat(v.toFixed(10)));
            if (v >= max) break;
        }
        if (ticks.length === 0) ticks.push(min);
        if (ticks[ticks.length - 1] < max) ticks.push(max);
        return ticks;
    }

    // ============================================================
    //  CSV 导出
    // ============================================================
    function generateCsv() {
        if (dataLog.length === 0) return '';
        const header = tr('pid.csv.header');
        const rows = dataLog.map(d =>
            `${d.time.toFixed(3)},${d.setpoint.toFixed(2)},${d.process.toFixed(2)},${d.output.toFixed(2)}`
        );
        return [header, ...rows].join('\n');
    }

    function updateCsvPreview() {
        const csv = generateCsv();
        if (csv) {
            const lines = csv.split('\n');
            const preview = lines.slice(0, 10).join('\n') + (lines.length > 10 ? tr('pid.csv.rowsTotal').replace('{n}', lines.length) : '');
            csvPreview.textContent = preview;
        } else {
            csvPreview.textContent = tr('pid.csv.noData');
        }
    }

    function exportCsv() {
        const csv = generateCsv();
        if (!csv) { alert(tr('pid.err.noExportData')); return; }
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `pid_sim_${Date.now()}.csv`;
        a.click();
    }

    function copyCsv() {
        const csv = generateCsv();
        if (!csv) { alert(tr('pid.err.noCopyData')); return; }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(csv).then(() => {
                const orig = copyCsvBtn.textContent;
                copyCsvBtn.textContent = '✓';
                setTimeout(() => copyCsvBtn.textContent = orig, 800);
            }).catch(() => fallbackCopy(csv));
        } else {
            fallbackCopy(csv);
        }
    }

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { alert(tr('pid.err.copyFailed')); }
        document.body.removeChild(ta);
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    startBtn.addEventListener('click', startSimulation);
    pauseBtn.addEventListener('click', () => {
        if (isPaused) {
            startSimulation();
        } else {
            pauseSimulation();
        }
    });
    resetBtn.addEventListener('click', resetSimulation);

    [kpSlider, kiSlider, kdSlider, kpInput, kiInput, kdInput,
        plantK, plantT, plantL, setpointSlider, setpointInput
    ].forEach(el => {
        el.addEventListener('change', () => {
            if (!isRunning && dataLog.length > 0) {
                resetSimulation();
            } else if (!isRunning) {
                drawChart();
            }
        });
        el.addEventListener('input', () => {
            if (!isRunning) drawChart();
        });
    });

    simSpeed.addEventListener('change', () => {
        if (isRunning && !isPaused) {
            if (simTimer) {
                clearInterval(simTimer);
                simTimer = null;
            }
            const speed = parseFloat(simSpeed.value) || 1;
            const intervalMs = DT * 1000 / speed;
            simTimer = setInterval(simulationStep, intervalMs);
        }
    });

    simDuration.addEventListener('change', () => {
        updateDurationDisplay();
        if (!isRunning) {
            durationDisplay.textContent = tr('pid.display.targetPrefix') + maxSimTime + ' s';
            drawChart();
        }
    });

    exportCsvBtn.addEventListener('click', exportCsv);
    copyCsvBtn.addEventListener('click', copyCsv);
    clearDataBtn.addEventListener('click', resetSimulation);
    window.addEventListener('resize', drawChart);

    // 监听语言切换：更新动态文本并重绘图表
    document.addEventListener('languagechange', function () {
        document.title = tr('pid.doc.title');
        updateDynamicTexts();
        if (dataLog.length > 0) {
            updateCsvPreview();
        }
        drawChart();
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.title = tr('pid.doc.title');
    resetSimulation();
    applyPreset('p3');
    drawChart();
    setTimeout(() => { drawChart(); }, 100);

    window.resetSim = resetSimulation;
    window.startSim = startSimulation;
    window.pauseSim = pauseSimulation;

})();
