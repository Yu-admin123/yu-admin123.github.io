// ============================================================
//  时序秒表 Timing_lab.html 页面脚本
//  主题切换由 theme.js 提供（全局 setTheme + #themeToggle 绑定），
//  此处监听 'themechange' 在主题切换时重绘 Canvas 波形图
//  语言切换由 i18n.js 提供（全局 window.I18N），
//  此处监听 'languagechange' 更新全部动态文本并重绘图表
//  模块：① 主秒表  ② 事件时间线  ③ 脉宽测量（可缩放波形图）
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    // 公共
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    // 文档标题
    'timing.doc.title': { zh: '时序秒表', en: 'Timing Lab' },

    // 页面标题
    'timing.page.title': { zh: '⏲️ 时序秒表', en: '⏲️ Timing Lab' },
    'timing.subhead':    { zh: '🔹 时序测量秒表 · 脉宽测量与打点分析 · 基于 performance.now 微秒级分辨率', en: '🔹 Timing measurement stopwatch · pulse-width & lap analysis · µs resolution via performance.now' },

    // 模块① 主秒表
    'timing.p1.title':  { zh: '① 主秒表', en: '① Main Stopwatch' },
    'timing.p1.small':  { zh: 'performance.now · 微秒级分辨率', en: 'performance.now · µs resolution' },
    'timing.main.start':  { zh: '▶ 启动', en: '▶ Start' },
    'timing.main.pause':  { zh: '⏸ 暂停', en: '⏸ Pause' },
    'timing.main.resume': { zh: '▶ 继续', en: '▶ Resume' },
    'timing.main.lap':    { zh: '🏁 打点', en: '🏁 Lap' },
    'timing.main.reset':  { zh: '⟳ 复位', en: '⟳ Reset' },
    'timing.main.ready':   { zh: '○ 就绪', en: '○ Ready' },
    'timing.main.running': { zh: '● 计时中', en: '● Running' },
    'timing.main.paused':  { zh: '⏸ 已暂停', en: '⏸ Paused' },
    'timing.main.lapsPrefix': { zh: '🏁 打点: ', en: '🏁 Laps: ' },

    // 统计标签（模块①/③ 共用）
    'timing.stats.avg': { zh: '平均间隔', en: 'Avg Interval' },
    'timing.stats.min': { zh: '最小间隔', en: 'Min Interval' },
    'timing.stats.max': { zh: '最大间隔', en: 'Max Interval' },
    'timing.stats.atLap': { zh: '第 {n} 次打点', en: 'Lap #{n}' },

    // 键盘提示
    'timing.hint.keys': { zh: '⌨️ W 启动 · S 暂停 · 空格 启停 · E 打点 · R 复位(含脉宽) · A 上升沿 · D 下降沿', en: '⌨️ W start · S pause · Space toggle · E lap · R reset(+pulse) · A rising · D falling' },

    // 模块② 事件时间线
    'timing.p2.title': { zh: '② 事件时间线', en: '② Event Timeline' },
    'timing.p2.small': { zh: '全部事件按时间顺序 · 显示与上次相差与累计时间', en: 'All events in order · with delta & cumulative time' },
    'timing.tl.clear': { zh: '🧹 清空', en: '🧹 Clear' },
    'timing.tl.empty': { zh: '(暂无事件)', en: '(No events)' },
    'timing.tl.colTime':  { zh: '累计时间', en: 'Cumulative' },
    'timing.tl.colDelta': { zh: '与上次相差', en: 'Delta' },
    'timing.tl.colEvent': { zh: '事件', en: 'Event' },

    // 时间线事件文本
    'timing.ev.main.start':  { zh: '主秒表 · 启动', en: 'Main · Start' },
    'timing.ev.main.pause':  { zh: '主秒表 · 暂停', en: 'Main · Pause' },
    'timing.ev.main.resume': { zh: '主秒表 · 继续', en: 'Main · Resume' },
    'timing.ev.main.lap':    { zh: '主秒表 · 打点 #{n}', en: 'Main · Lap #{n}' },
    'timing.ev.main.reset':  { zh: '主秒表 · 复位', en: 'Main · Reset' },
    'timing.ev.pw.rise':  { zh: '脉宽 · ↑ 上升沿', en: 'Pulse · ↑ Rising' },
    'timing.ev.pw.fall':  { zh: '脉宽 · ↓ 下降沿', en: 'Pulse · ↓ Falling' },
    'timing.ev.pw.reset': { zh: '脉宽 · 复位', en: 'Pulse · Reset' },

    // 模块③ 脉宽测量
    'timing.p3.title': { zh: '③ 脉宽测量', en: '③ Pulse Width' },
    'timing.p3.small': { zh: '上升沿 / 下降沿 → 高电平持续时间', en: 'Rising / falling edges → high-level duration' },
    'timing.pw.rising':  { zh: '↑ 上升沿', en: '↑ Rising' },
    'timing.pw.falling': { zh: '↓ 下降沿', en: '↓ Falling' },
    'timing.pw.high':    { zh: '高电平(最后)', en: 'High (last)' },
    'timing.pw.highAvg': { zh: '高电平(平均)', en: 'High (avg)' },
    'timing.pw.period':  { zh: '周期', en: 'Period' },
    'timing.pw.freq':    { zh: '频率', en: 'Frequency' },
    'timing.pw.duty':    { zh: '占空比', en: 'Duty Cycle' },
    'timing.pw.count':   { zh: '脉冲数', en: 'Pulses' },
    'timing.pw.empty':   { zh: '等待输入（A/↑ 上升沿 · D/↓ 下降沿 · E 打点）', en: 'Waiting for input (A/↑ rising · D/↓ falling · E lap)' },
    'timing.pw.levelHigh': { zh: '高', en: 'High' },
    'timing.pw.levelLow':  { zh: '低', en: 'Low' },
    'timing.pw.legendWave': { zh: '波形', en: 'Waveform' },
    'timing.pw.legendLap':  { zh: '打点', en: 'Laps' },
    'timing.pw.zoomHint':   { zh: '🖱️ 滚轮缩放 · 拖拽平移 · 双击复位视图', en: '🖱️ Scroll to zoom · Drag to pan · Double-click to fit' },
    'timing.pw.hint':       { zh: '💡 边沿输入：A/↑ 上升沿 · D/↓ 下降沿（或主秒表面板按钮）· 打点以尖峰形式叠加显示 · 复位与主秒表共用', en: '💡 Edges: A/↑ rising · D/↓ falling (or Main panel buttons) · laps overlaid as spikes · reset shared with main stopwatch' },
    'timing.pw.measureHint': { zh: '💡 点击波形放置测量光标 T0/T1（自动捕捉边沿）· 右键或按钮清除', en: '💡 Click the waveform to place cursors T0/T1 (snap to edges) · right-click or button to clear' },
    'timing.pw.clearCursors': { zh: '⨯ 清除光标', en: '⨯ Clear Cursors' },
    'timing.pw.tipMain': { zh: '主秒表', en: 'Main sw' },
    'timing.pw.tipHigh': { zh: '高电平', en: 'High level' },
    'timing.pw.tipLap':  { zh: '打点', en: 'Lap' },

    // 页脚
    'timing.footer': { zh: '⏲️ 时序秒表 · 脉宽测量与打点分析工具 · 面向嵌入式开发的时间测量与信号分析', en: '⏲️ Timing Lab · pulse-width & lap analysis · timing measurement for embedded development' }
};

(function() {
    'use strict';

    // ============================================================
    //  通用工具函数
    // ============================================================
    function tr(key) {
        if (window.I18N && window.I18N.t) {
            var v = window.I18N.t(key);
            return (v === null || v === undefined) ? key : v;
        }
        var entry = (window.I18N_STRINGS || {})[key];
        if (!entry) return key;
        return (typeof entry === 'string') ? entry : (entry.zh || key);
    }

    /** 带占位符的翻译：fmt('key', {n: 3}) → 替换 {n} */
    function fmt(key, vars) {
        var s = tr(key);
        for (var k in vars) {
            if (Object.prototype.hasOwnProperty.call(vars, k)) {
                s = s.split('{' + k + '}').join(String(vars[k]));
            }
        }
        return s;
    }

    function pad(n, len) {
        var s = String(Math.floor(n));
        while (s.length < len) s = '0' + s;
        return s;
    }

    /** 秒表格式：HH:MM:SS.xxxx（时分秒 + 4 位小数，100µs 分辨率） */
    function formatStopwatch(ms) {
        var total = Math.max(0, ms);
        var hours = Math.floor(total / 3600000);
        var minutes = Math.floor((total - hours * 3600000) / 60000);
        var seconds = Math.floor((total - hours * 3600000 - minutes * 60000) / 1000);
        var frac = total - hours * 3600000 - minutes * 60000 - seconds * 1000; // ms 小数部分
        var frac4 = Math.floor(frac * 10); // 秒的 4 位小数（0..9999）
        return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + '.' + pad(frac4, 4);
    }

    /** 自适应单位的时间格式化（µs / ms / s / min） */
    function formatAuto(ms) {
        var v = Math.abs(ms);
        if (v < 0.001) return (ms * 1000).toFixed(1) + ' µs';
        if (v < 1) return (ms * 1000).toFixed(1) + ' µs';
        if (v < 1000) return ms.toFixed(3) + ' ms';
        if (v < 60000) return (ms / 1000).toFixed(3) + ' s';
        return (ms / 60000).toFixed(2) + ' min';
    }

    /** 频率自适应单位（Hz / kHz / MHz） */
    function formatFreq(hz) {
        var v = Math.abs(hz);
        if (v >= 1e6) return (hz / 1e6).toFixed(2) + ' MHz';
        if (v >= 1e3) return (hz / 1e3).toFixed(2) + ' kHz';
        return hz.toFixed(2) + ' Hz';
    }

    /** 逻辑分析仪风格高精度时间：自动单位（µs / ms / s / min） */
    function fmtPrecise(ms) {
        var v = Math.abs(ms);
        if (v < 1) return (ms * 1000).toFixed(3) + ' µs';
        if (v < 1000) return ms.toFixed(6) + ' ms';
        if (v < 60000) return (ms / 1000).toFixed(6) + ' s';
        return (ms / 60000).toFixed(3) + ' min';
    }

    /** 由打点序列计算 平均/最小/最大 间隔（ms），并记录对应打点序号。
        打点元素为 {t, abs}；间隔 d = laps[i].t - laps[i-1].t 归属第 i+1 次打点 */
    function computeIntervals(laps) {
        if (!laps || laps.length < 2) return null;
        var sum = 0, min = Infinity, max = -Infinity;
        var minIdx = -1, maxIdx = -1;
        for (var i = 1; i < laps.length; i++) {
            var d = laps[i].t - laps[i - 1].t;
            sum += d;
            if (d < min) { min = d; minIdx = i; }
            if (d > max) { max = d; maxIdx = i; }
        }
        return { avg: sum / (laps.length - 1), min: min, max: max, minIdx: minIdx, maxIdx: maxIdx };
    }

    /** 读取页面 CSS 变量值（Canvas 绘图用） */
    function cssVar(name) {
        var v = getComputedStyle(document.documentElement).getPropertyValue(name);
        return v ? v.trim() : '';
    }

    // ============================================================
    //  DOM 引用
    // ============================================================
    const mainDisplay    = document.getElementById('mainDisplay');
    const mainStatus     = document.getElementById('mainStatus');
    const mainLapCount   = document.getElementById('mainLapCount');
    const mainToggleBtn  = document.getElementById('mainToggleBtn');
    const mainLapBtn     = document.getElementById('mainLapBtn');
    const mainResetBtn   = document.getElementById('mainResetBtn');
    const mainAvg        = document.getElementById('mainAvg');
    const mainMin        = document.getElementById('mainMin');
    const mainMax        = document.getElementById('mainMax');

    const pwChartWrapper = document.getElementById('pwChartWrapper');
    const pwCanvas       = document.getElementById('pwCanvas');
    const pwTooltip      = document.getElementById('pwTooltip');
    const pwRiseBtn      = document.getElementById('pwRiseBtn');
    const pwFallBtn      = document.getElementById('pwFallBtn');
    const pwHigh         = document.getElementById('pwHigh');
    const pwHighAvg      = document.getElementById('pwHighAvg');
    const pwPeriod       = document.getElementById('pwPeriod');
    const pwFreq         = document.getElementById('pwFreq');
    const pwDuty         = document.getElementById('pwDuty');
    const pwCount        = document.getElementById('pwCount');

    const timelineBox    = document.getElementById('timelineBox');
    const timelineClearBtn = document.getElementById('timelineClearBtn');

    const pwMeasure      = document.getElementById('pwMeasure');
    const pwClearCurBtn  = document.getElementById('pwClearCurBtn');

    // ============================================================
    //  主秒表状态（打点记录 {t: 相对时间, abs: 绝对时间戳}）
    // ============================================================
    const main = { state: 'ready', startTime: 0, acc: 0, laps: [] };

    function mainTime() {
        if (main.state === 'running') return main.acc + (performance.now() - main.startTime);
        return main.acc;
    }

    // ============================================================
    //  脉宽测量状态
    // ============================================================
    const MAX_EDGES = 800;
    const pw = { t0: performance.now(), edges: [], highs: [], periods: [], prevRiseT: null };

    // 主秒表时间参照点（用于悬浮提示中“主秒表累计时间”插值）
    // 元素：{abs: performance.now(), mainT: 主秒表累计时间}
    let mainRefs = [];

    // ============================================================
    //  事件时间线
    // ============================================================
    const TIMELINE_MAX = 500;
    let timelineEvents = [];

    // ============================================================
    //  主秒表操作
    // ============================================================
    /** 启动 / 继续（W 键与按钮共用）；已运行时忽略 */
    function mainStart() {
        if (main.state === 'running') return;
        if (main.state === 'ready') {
            main.state = 'running';
            main.startTime = performance.now();
            addTimelineEvent('main.start', {});
        } else {
            main.state = 'running';
            main.startTime = performance.now();
            addTimelineEvent('main.resume', {});
        }
        updateMainUi();
    }

    /** 暂停（S 键与按钮共用）；未运行时忽略 */
    function mainPause() {
        if (main.state !== 'running') return;
        main.state = 'paused';
        main.acc += performance.now() - main.startTime;
        addTimelineEvent('main.pause', {});
        updateMainUi();
    }

    /** 启停切换（空格键 / 按钮） */
    function mainToggle() {
        if (main.state === 'running') mainPause();
        else mainStart();
    }

    function mainLap() {
        if (main.state === 'ready') return;
        var t = mainTime();
        var abs = performance.now();
        main.laps.push({ t: t, abs: abs });
        mainRefs.push({ abs: abs, mainT: t });
        addTimelineEvent('main.lap', { n: main.laps.length });
        updateMainUi();
        // 打点尖峰需要同步绘制到脉宽波形图，并自动滚动跟随
        pwFollowLatest();
        drawPulseChart();
    }

    function mainReset() {
        main.state = 'ready';
        main.acc = 0;
        main.startTime = 0;
        main.laps = [];
        addTimelineEvent('main.reset', {});
        updateMainUi();
        // 复位与主秒表共用：同时复位脉宽测量
        pwReset();
    }

    // ============================================================
    //  脉宽测量操作
    // ============================================================
    function pwRise() {
        // 未开始计时（就绪）时不允许记录边沿，避免异常
        if (main.state === 'ready') return;
        var t = performance.now() - pw.t0;
        if (pw.prevRiseT !== null) {
            pw.periods.push(t - pw.prevRiseT);
        }
        pw.prevRiseT = t;
        pw.edges.push({ t: t, type: 'rise' });
        trimEdges();
        mainRefs.push({ abs: performance.now(), mainT: mainTime() });
        addTimelineEvent('pw.rise', {});
        updatePwStats();
        pwFollowLatest();
        drawPulseChart();
    }

    function pwFall() {
        // 未开始计时（就绪）时不允许记录边沿，避免异常
        if (main.state === 'ready') return;
        var t = performance.now() - pw.t0;
        var last = pw.edges[pw.edges.length - 1];
        // 忽略无上升沿配对的下降沿
        if (last && last.type === 'rise') {
            pw.highs.push(t - last.t);
            pw.edges.push({ t: t, type: 'fall' });
            trimEdges();
            mainRefs.push({ abs: performance.now(), mainT: mainTime() });
            addTimelineEvent('pw.fall', {});
            updatePwStats();
            pwFollowLatest();
            drawPulseChart();
        }
    }

    function pwReset() {
        pw.t0 = performance.now();
        pw.edges = [];
        pw.highs = [];
        pw.periods = [];
        pw.prevRiseT = null;
        mainRefs = [];
        // 数据清空后复位视图缩放状态与测量光标，下次绘制自动适配
        pwView.xMin = null;
        pwView.xMax = null;
        viewManual = false;
        pwCursors[0] = null;
        pwCursors[1] = null;
        updatePwMeasure();
        pwTooltip.classList.remove('visible');
        addTimelineEvent('pw.reset', {});
        updatePwStats();
        drawPulseChart();
    }

    /** 限制边沿数量，超出时丢弃最旧边沿（仅影响波形显示，不影响统计） */
    function trimEdges() {
        while (pw.edges.length > MAX_EDGES) pw.edges.shift();
    }

    // ============================================================
    //  时间线
    // ============================================================
    function addTimelineEvent(type, params) {
        timelineEvents.push({ t: performance.now(), type: type, params: params || {} });
        if (timelineEvents.length > TIMELINE_MAX) {
            timelineEvents.splice(0, timelineEvents.length - TIMELINE_MAX);
        }
        renderTimeline();
    }

    function eventText(ev) {
        switch (ev.type) {
            case 'main.start':  return tr('timing.ev.main.start');
            case 'main.pause':  return tr('timing.ev.main.pause');
            case 'main.resume': return tr('timing.ev.main.resume');
            case 'main.lap':    return fmt('timing.ev.main.lap', { n: ev.params.n });
            case 'main.reset':  return tr('timing.ev.main.reset');
            case 'pw.rise':     return tr('timing.ev.pw.rise');
            case 'pw.fall':     return tr('timing.ev.pw.fall');
            case 'pw.reset':    return tr('timing.ev.pw.reset');
            default:            return ev.type;
        }
    }

    /** 渲染时间线：累计时间 | 与上次相差 | 事件 */
    function renderTimeline() {
        timelineBox.innerHTML = '';
        if (!timelineEvents.length) {
            var empty = document.createElement('div');
            empty.className = 'timeline-empty';
            empty.textContent = tr('timing.tl.empty');
            timelineBox.appendChild(empty);
            return;
        }
        var frag = document.createDocumentFragment();
        var firstT = timelineEvents[0].t;
        var prevT = timelineEvents[0].t;
        for (var i = 0; i < timelineEvents.length; i++) {
            var ev = timelineEvents[i];
            var row = document.createElement('div');
            row.className = 'timeline-item tl-' + ev.type.split('.')[0];

            var cum = document.createElement('span');
            cum.className = 'tl-time';
            cum.textContent = formatStopwatch(ev.t - firstT);

            var delta = document.createElement('span');
            delta.className = 'tl-delta';
            delta.textContent = (i === 0) ? '—' : formatStopwatch(ev.t - prevT);

            var text = document.createElement('span');
            text.className = 'tl-text';
            text.textContent = eventText(ev);

            row.appendChild(cum);
            row.appendChild(delta);
            row.appendChild(text);
            frag.appendChild(row);
            prevT = ev.t;
        }
        timelineBox.appendChild(frag);
        timelineBox.scrollTop = timelineBox.scrollHeight;
    }

    // ============================================================
    //  UI 更新（动态文本全部走 tr()/fmt()）
    // ============================================================
    function updateMainUi() {
        var stateKey = (main.state === 'ready') ? 'timing.main.ready'
                    : (main.state === 'running') ? 'timing.main.running'
                    : 'timing.main.paused';
        mainStatus.textContent = tr(stateKey);

        var btnKey = (main.state === 'ready') ? 'timing.main.start'
                   : (main.state === 'running') ? 'timing.main.pause'
                   : 'timing.main.resume';
        mainToggleBtn.textContent = tr(btnKey);

        mainLapCount.textContent = tr('timing.main.lapsPrefix') + main.laps.length;

        // 未开始计时时禁用打点/上升沿/下降沿按钮
        var ready = (main.state === 'ready');
        mainLapBtn.disabled = ready;
        pwRiseBtn.disabled = ready;
        pwFallBtn.disabled = ready;

        var s = computeIntervals(main.laps);
        mainAvg.textContent = s ? formatAuto(s.avg) : '—';
        mainMin.textContent = s ? formatAuto(s.min) + ' (#' + (s.minIdx + 1) + ')' : '—';
        mainMax.textContent = s ? formatAuto(s.max) + ' (#' + (s.maxIdx + 1) + ')' : '—';
        mainMin.title = s ? fmt('timing.stats.atLap', { n: s.minIdx + 1 }) : '';
        mainMax.title = s ? fmt('timing.stats.atLap', { n: s.maxIdx + 1 }) : '';
    }

    function updatePwStats() {
        var lastHigh = pw.highs.length ? pw.highs[pw.highs.length - 1] : null;
        var avgHigh = null;
        if (pw.highs.length) {
            var sum = 0;
            for (var i = 0; i < pw.highs.length; i++) sum += pw.highs[i];
            avgHigh = sum / pw.highs.length;
        }
        var lastPeriod = pw.periods.length ? pw.periods[pw.periods.length - 1] : null;

        pwHigh.textContent    = lastHigh !== null ? formatAuto(lastHigh) : '—';
        pwHighAvg.textContent = avgHigh !== null ? formatAuto(avgHigh) : '—';
        pwPeriod.textContent  = lastPeriod !== null ? formatAuto(lastPeriod) : '—';
        pwFreq.textContent    = (lastPeriod !== null && lastPeriod > 0) ? formatFreq(1000 / lastPeriod) : '—';
        pwDuty.textContent    = (lastHigh !== null && lastPeriod !== null && lastPeriod > 0)
                              ? ((lastHigh / lastPeriod) * 100).toFixed(1) + '%' : '—';
        pwCount.textContent   = pw.highs.length;
    }

    // ============================================================
    //  实时刷新循环（requestAnimationFrame 驱动主秒表显示）
    // ============================================================
    function tick() {
        mainDisplay.textContent = formatStopwatch(mainTime());
        mainDisplay.classList.toggle('running', main.state === 'running');
        requestAnimationFrame(tick);
    }

    // ============================================================
    //  脉宽波形图（Canvas：缩放 / 平移 / 悬浮提示 / 打点尖峰）
    // ============================================================
    const PW_MIN_SPAN = 0.05;      // 最小视图跨度 0.05ms（50µs）
    const PW_MAX_MULT = 4;         // 最大视图跨度 = 数据范围 × 4

    // 视图状态：xMin/xMax 为 null 时表示自动适配全部数据
    const pwView = { xMin: null, xMax: null };

    const panState = { dragging: false, startX: 0, startMin: 0, startMax: 0, moved: false };

    // 自动跟随模式：记录新数据（边沿/打点）时视图自动滚动到最新点；
    // 鼠标悬停到画布上时暂停跟随（此时可滚轮缩放/拖拽平移），移开鼠标恢复跟随
    let followMode = true;
    let viewManual = false;   // 视图跨度是否为用户手动设置（缩放/平移过）
    let pwCursorX = null;     // 当前悬浮位置的 x（用于绘制虚线光标）

    // 测量光标（T0/T1）：点击波形放置，自动捕捉到边沿
    const pwCursors = [null, null];

    /** 画布绘图区几何信息 */
    function getPlotRect() {
        var rect = pwCanvas.getBoundingClientRect();
        var W = rect.width, H = rect.height;
        var mL = 46, mR = 14, mT = 10, mB = 24;
        return {
            W: W, H: H,
            plotL: mL, plotR: W - mR, plotT: mT, plotB: H - mB,
            plotW: W - mL - mR, plotH: H - mT - mB
        };
    }

    /** 数据范围（脉宽边沿 + 打点尖峰），单位 ms，相对 pw.t0 */
    function pwDataBounds() {
        var min = 0, max = 0;
        if (pw.edges.length) {
            min = pw.edges[0].t;
            max = pw.edges[pw.edges.length - 1].t;
        }
        for (var i = 0; i < main.laps.length; i++) {
            var x = main.laps[i].abs - pw.t0;
            if (x < min) min = x;
            if (x > max) max = x;
        }
        return { min: min, max: max };
    }

    /** 自动适配视图范围 */
    function pwAutoFit() {
        viewManual = false;
        var b = pwDataBounds();
        var pad = Math.max((b.max - b.min) * 0.05, 50);
        pwView.xMin = Math.max(0, b.min - pad);
        pwView.xMax = b.max + pad;
        if (pwView.xMax - pwView.xMin <= 0) {
            pwView.xMin = 0;
            pwView.xMax = 100;
        }
    }

    function pwEnsureView() {
        if (pwView.xMin === null || pwView.xMax === null) pwAutoFit();
    }

    /** 跟随模式下的视图跨度：手动缩放过则保留该跨度，否则按最近事件间隔自适应（0.2ms ~ 2000ms） */
    function pwFollowSpan() {
        if (viewManual) {
            var s = pwView.xMax - pwView.xMin;
            if (s > 0) return s;
        }
        var n = mainRefs.length;
        if (n >= 2) {
            var d1 = mainRefs[n - 1].abs - mainRefs[n - 2].abs;
            var d2 = (n >= 3) ? mainRefs[n - 2].abs - mainRefs[n - 3].abs : d1;
            var span = ((d1 + d2) / 2) * 4;
            return Math.min(Math.max(span, 0.2), 2000);
        }
        return 2000;
    }

    /** 自动滚动：视图右端跟随最新数据点（打点/边沿记录时调用） */
    function pwFollowLatest() {
        if (!followMode) return;
        var b = pwDataBounds();
        if (b.max <= 0 && b.min <= 0) return;
        var span = pwFollowSpan();
        var xMax = b.max + span * 0.02;
        var xMin = xMax - span;
        if (xMin < 0) xMin = 0;
        pwView.xMin = xMin;
        pwView.xMax = xMax;
    }

    /** 由边沿序列计算高电平区间 [{start, end, dur}] */
    function pwHighSegments() {
        var segs = [];
        var riseT = null;
        for (var i = 0; i < pw.edges.length; i++) {
            var e = pw.edges[i];
            if (e.type === 'rise') {
                riseT = e.t;
            } else if (riseT !== null) {
                segs.push({ start: riseT, end: e.t, dur: e.t - riseT });
                riseT = null;
            }
        }
        return segs;
    }

    /** 悬浮位置 x 处的高电平持续时间（ms），不在高电平区间则返回 null */
    function highAtTime(x) {
        var segs = pwHighSegments();
        for (var i = 0; i < segs.length; i++) {
            if (x >= segs[i].start && x <= segs[i].end) return segs[i].dur;
        }
        return null;
    }

    /** 悬浮位置 x 处的主秒表累计时间（由参照点线性插值），无参照点返回 null */
    function mainAtTime(x) {
        if (!mainRefs.length) return null;
        var abs = pw.t0 + x;
        if (abs <= mainRefs[0].abs) return mainRefs[0].mainT;
        var last = mainRefs[mainRefs.length - 1];
        if (abs >= last.abs) return last.mainT;
        for (var i = 1; i < mainRefs.length; i++) {
            if (mainRefs[i].abs >= abs) {
                var a = mainRefs[i - 1], b = mainRefs[i];
                if (b.abs === a.abs) return b.mainT;
                return a.mainT + (abs - a.abs) / (b.abs - a.abs) * (b.mainT - a.mainT);
            }
        }
        return last.mainT;
    }

    /** 悬浮位置 x 之前最近一次事件（边沿或打点）的时间（ms），无则返回 null */
    function prevEventTime(x) {
        var best = null;
        for (var i = 0; i < pw.edges.length; i++) {
            if (pw.edges[i].t >= x) break;
            best = pw.edges[i].t;
        }
        for (var j = 0; j < main.laps.length; j++) {
            var lt = main.laps[j].abs - pw.t0;
            if (lt < x && (best === null || lt > best)) best = lt;
        }
        return best;
    }

    /** 悬浮位置附近（10px 内）的打点信息 {n, d}，无则返回 null */
    function nearestLapInfo(x, plot) {
        if (!main.laps.length) return null;
        var span = pwView.xMax - pwView.xMin;
        var tol = 10 / plot.plotW * span;
        var best = null, bestD = tol;
        for (var i = 0; i < main.laps.length; i++) {
            var lx = main.laps[i].abs - pw.t0;
            var d = Math.abs(lx - x);
            if (d <= bestD) {
                bestD = d;
                best = {
                    n: i + 1,
                    d: (i === 0) ? main.laps[0].t : main.laps[i].t - main.laps[i - 1].t
                };
            }
        }
        return best;
    }

    // ============================================================
    //  测量光标 T0/T1（点击放置，自动捕捉到边沿）
    // ============================================================

    /** 捕捉：吸附到当前视图内最近的边沿或打点尖峰；视图内均无则使用点击位置 */
    function snapToEdge(x) {
        var best = null, bestD = Infinity;
        for (var i = 0; i < pw.edges.length; i++) {
            var t = pw.edges[i].t;
            if (t < pwView.xMin || t > pwView.xMax) continue;
            var d = Math.abs(t - x);
            if (d < bestD) {
                bestD = d;
                best = t;
            }
        }
        for (var j = 0; j < main.laps.length; j++) {
            var lt = main.laps[j].abs - pw.t0;
            if (lt < pwView.xMin || lt > pwView.xMax) continue;
            var ld = Math.abs(lt - x);
            if (ld < bestD) {
                bestD = ld;
                best = lt;
            }
        }
        return best !== null ? best : x;
    }

    /** 光标所在位置的事件信息：边沿 'rise'/'fall' 或打点 {type:'lap', n}，无则 null */
    function eventInfoAt(t) {
        for (var i = 0; i < pw.edges.length; i++) {
            if (pw.edges[i].t === t) return { type: pw.edges[i].type, n: null };
        }
        for (var j = 0; j < main.laps.length; j++) {
            if (main.laps[j].abs - pw.t0 === t) return { type: 'lap', n: j + 1 };
        }
        return null;
    }

    /** 放置测量光标：T0 → T1 → 再点击则重新开始（新 T0） */
    function placeCursor(x) {
        if (pwCursors[0] === null) {
            pwCursors[0] = x;
        } else if (pwCursors[1] === null) {
            pwCursors[1] = x;
        } else {
            pwCursors[0] = x;
            pwCursors[1] = null;
        }
        updatePwMeasure();
        drawPulseChart();
    }

    /** 清除测量光标 */
    function clearCursors() {
        pwCursors[0] = null;
        pwCursors[1] = null;
        updatePwMeasure();
        drawPulseChart();
    }

    /** 更新测量读数条：T0 / T1 / ΔT / f */
    function updatePwMeasure() {
        if (pwCursors[0] === null && pwCursors[1] === null) {
            pwMeasure.textContent = tr('timing.pw.measureHint');
            pwMeasure.classList.remove('active');
            return;
        }
        pwMeasure.classList.add('active');
        var parts = [];
        for (var i = 0; i < 2; i++) {
            if (pwCursors[i] === null) continue;
            var info = eventInfoAt(pwCursors[i]);
            var marker = '';
            if (info) {
                if (info.type === 'rise') marker = '↑';
                else if (info.type === 'fall') marker = '↓';
                else marker = '#' + info.n; // 打点序号
            }
            parts.push('T' + i + ' ' + marker + ' ' + fmtPrecise(pwCursors[i]));
        }
        if (pwCursors[0] !== null && pwCursors[1] !== null) {
            var dt = Math.abs(pwCursors[1] - pwCursors[0]);
            parts.push('ΔT ' + fmtPrecise(dt));
            if (dt > 0) parts.push('f ' + formatFreq(1000 / dt));
        }
        pwMeasure.textContent = parts.join('   ');
    }

    function niceTicks(min, max, count) {
        var span = max - min;
        if (span <= 0) return [min];
        var rough = span / count;
        var mag = Math.pow(10, Math.floor(Math.log10(rough)));
        var norm = rough / mag;
        var step;
        if (norm < 1.5) step = 1;
        else if (norm < 3.5) step = 2;
        else if (norm < 7.5) step = 5;
        else step = 10;
        step *= mag;
        var ticks = [];
        for (var v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) ticks.push(v);
        return ticks;
    }

    function fmtTick(v, unitS, ticks) {
        if (unitS) return (v / 1000).toFixed(2) + 's';
        var step = ticks.length > 1 ? ticks[1] - ticks[0] : 1;
        return (step < 1 ? v.toFixed(1) : v.toFixed(0)) + 'ms';
    }

    function drawPulseChart() {
        var canvas = pwCanvas;
        var rect = canvas.getBoundingClientRect();
        var W = rect.width, H = rect.height;
        if (W <= 0 || H <= 0) return;
        var dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        var ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        var bg     = cssVar('--chart-bg') || '#ffffff';
        var grid   = cssVar('--chart-grid') || '#e9edf4';
        var axis   = cssVar('--chart-axis') || '#94a3b8';
        var line   = cssVar('--chart-line') || '#6366f1';
        var fill   = cssVar('--chart-fill') || 'rgba(99,102,241,0.16)';
        var riseC  = cssVar('--chart-rise') || '#22c55e';
        var fallC  = cssVar('--chart-fall') || '#f87171';
        var lapC   = cssVar('--chart-lap') || '#f59e0b';

        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        var plot = getPlotRect();
        var plotL = plot.plotL, plotR = plot.plotR;
        var plotT = plot.plotT, plotB = plot.plotB;
        var plotW = plot.plotW, plotH = plot.plotH;

        // 空状态提示
        if (!pw.edges.length && !main.laps.length) {
            ctx.fillStyle = axis;
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(tr('timing.pw.empty'), W / 2, H / 2);
            return;
        }

        pwEnsureView();
        var xMin = pwView.xMin, xMax = pwView.xMax;
        var xSpan = xMax - xMin;
        if (xSpan <= 0) xSpan = 1;

        function toX(t) { return plotL + (t - xMin) / xSpan * plotW; }
        function toY(level) { return plotB - level * plotH; }

        // 垂直网格 + 时间刻度
        ctx.strokeStyle = grid;
        ctx.lineWidth = 1;
        ctx.font = '10px "SF Mono", "Fira Code", monospace';
        ctx.fillStyle = axis;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        var unitS = xSpan >= 2000;
        var ticks = niceTicks(xMin, xMax, 6);
        for (var i = 0; i < ticks.length; i++) {
            var v = ticks[i];
            var x = toX(v);
            ctx.beginPath();
            ctx.moveTo(x, plotT);
            ctx.lineTo(x, plotB);
            ctx.stroke();
            ctx.fillText(fmtTick(v, unitS, ticks), x, plotB + 4);
        }

        // 水平网格 + 电平标签（高 / 低）
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        var levels = [0, 1];
        for (var li = 0; li < levels.length; li++) {
            var y = toY(levels[li]);
            ctx.beginPath();
            ctx.moveTo(plotL, y);
            ctx.lineTo(plotR, y);
            ctx.stroke();
            ctx.fillText(levels[li] === 1 ? tr('timing.pw.levelHigh') : tr('timing.pw.levelLow'), plotL - 6, y);
        }

        // 波形阶梯路径（高电平区域填充）
        ctx.beginPath();
        var level = 0;
        ctx.moveTo(toX(xMin), toY(level));
        for (var j = 0; j < pw.edges.length; j++) {
            var e = pw.edges[j];
            var x1 = toX(e.t);
            ctx.lineTo(x1, toY(level));
            level = level === 1 ? 0 : 1;
            ctx.lineTo(x1, toY(level));
        }
        ctx.lineTo(toX(xMax), toY(level));

        ctx.save();
        ctx.lineTo(toX(xMax), toY(0));
        ctx.lineTo(toX(xMin), toY(0));
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();

        // 波形描边
        ctx.beginPath();
        level = 0;
        ctx.moveTo(toX(xMin), toY(level));
        for (var k = 0; k < pw.edges.length; k++) {
            var e2 = pw.edges[k];
            var x2 = toX(e2.t);
            ctx.lineTo(x2, toY(level));
            level = level === 1 ? 0 : 1;
            ctx.lineTo(x2, toY(level));
        }
        ctx.lineTo(toX(xMax), toY(level));
        ctx.strokeStyle = line;
        ctx.lineWidth = 2;
        ctx.stroke();

        // 边沿标记（上升沿绿 / 下降沿红）
        for (var m = 0; m < pw.edges.length; m++) {
            var ed = pw.edges[m];
            var mx = toX(ed.t);
            var my = ed.type === 'rise' ? toY(1) : toY(0);
            ctx.beginPath();
            ctx.arc(mx, my, 3, 0, Math.PI * 2);
            ctx.fillStyle = ed.type === 'rise' ? riseC : fallC;
            ctx.fill();
            ctx.strokeStyle = bg;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // 打点尖峰（叠加显示，不同颜色）
        ctx.strokeStyle = lapC;
        ctx.lineWidth = 1.5;
        for (var li2 = 0; li2 < main.laps.length; li2++) {
            var lx = toX(main.laps[li2].abs - pw.t0);
            if (lx < plotL || lx > plotR) continue;
            ctx.beginPath();
            ctx.moveTo(lx, plotB);
            ctx.lineTo(lx, plotT);
            ctx.stroke();
            // 顶部小三角
            ctx.beginPath();
            ctx.moveTo(lx - 4, plotT + 9);
            ctx.lineTo(lx, plotT + 1);
            ctx.lineTo(lx + 4, plotT + 9);
            ctx.closePath();
            ctx.fillStyle = lapC;
            ctx.fill();
        }

        // 悬浮虚线光标（逻辑分析仪风格）
        if (pwCursorX !== null) {
            var cxx = toX(pwCursorX);
            if (cxx >= plotL && cxx <= plotR) {
                ctx.save();
                ctx.setLineDash([4, 3]);
                ctx.strokeStyle = cssVar('--chart-cursor') || 'rgba(15, 23, 42, 0.55)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(cxx, plotT);
                ctx.lineTo(cxx, plotB);
                ctx.stroke();
                ctx.restore();
            }
        }

        // 测量光标 T0 / T1（实线 + 顶部标签）
        var curColors = [cssVar('--chart-cur0') || '#dc2626', cssVar('--chart-cur1') || '#0284c7'];
        for (var ci = 0; ci < 2; ci++) {
            var ct = pwCursors[ci];
            if (ct === null) continue;
            var ccx = toX(ct);
            if (ccx < plotL || ccx > plotR) continue;
            ctx.strokeStyle = curColors[ci];
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(ccx, plotT);
            ctx.lineTo(ccx, plotB);
            ctx.stroke();
            ctx.fillStyle = curColors[ci];
            ctx.font = 'bold 10px "SF Mono", "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('T' + ci, ccx, plotT + 2);
        }
    }

    // ============================================================
    //  脉宽波形图交互：滚轮缩放 / 拖拽平移 / 双击复位 / 悬浮提示
    // ============================================================
    pwCanvas.addEventListener('wheel', function(e) {
        e.preventDefault();
        pwEnsureView();
        viewManual = true; // 用户手动缩放后，跟随模式保留该跨度
        var plot = getPlotRect();
        var canvasRect = pwCanvas.getBoundingClientRect();
        var fx = (e.clientX - canvasRect.left - plot.plotL) / plot.plotW;
        fx = Math.min(Math.max(fx, 0), 1);
        var span = pwView.xMax - pwView.xMin;
        var b = pwDataBounds();
        var dataSpan = Math.max(b.max - b.min, 1);
        var factor = e.deltaY > 0 ? 1.25 : 0.8;
        var newSpan = span * factor;
        newSpan = Math.min(Math.max(newSpan, PW_MIN_SPAN), dataSpan * PW_MAX_MULT);
        var xCursor = pwView.xMin + fx * span;
        pwView.xMin = xCursor - fx * newSpan;
        pwView.xMax = pwView.xMin + newSpan;
        drawPulseChart();
    }, { passive: false });

    pwCanvas.addEventListener('pointerdown', function(e) {
        pwEnsureView();
        viewManual = true; // 拖拽平移同样视为手动视图
        followMode = false;
        pwCursorX = null;
        pwTooltip.classList.remove('visible');
        panState.dragging = true;
        panState.startX = e.clientX;
        panState.startMin = pwView.xMin;
        panState.startMax = pwView.xMax;
        panState.moved = false;
        pwCanvas.setPointerCapture(e.pointerId);
        pwCanvas.classList.add('panning');
    });

    pwCanvas.addEventListener('pointermove', function(e) {
        // 拖拽平移
        if (panState.dragging) {
            if (Math.abs(e.clientX - panState.startX) > 4) panState.moved = true;
            var plot = getPlotRect();
            var dx = e.clientX - panState.startX;
            var span = panState.startMax - panState.startMin;
            var dt = -dx / plot.plotW * span;
            pwView.xMin = panState.startMin + dt;
            pwView.xMax = panState.startMax + dt;
            drawPulseChart();
            return;
        }
        // 悬浮提示
        var canvasRect = pwCanvas.getBoundingClientRect();
        var wrapperRect = pwChartWrapper.getBoundingClientRect();
        var mx = e.clientX - canvasRect.left;
        var my = e.clientY - canvasRect.top;
        var p = getPlotRect();
        if (mx < p.plotL || mx > p.plotR || my < p.plotT || my > p.plotB) {
            if (pwCursorX !== null) {
                pwCursorX = null;
                drawPulseChart();
            }
            pwTooltip.classList.remove('visible');
            return;
        }
        pwEnsureView();
        var x = pwView.xMin + (mx - p.plotL) / p.plotW * (pwView.xMax - pwView.xMin);
        pwCursorX = x;
        drawPulseChart();

        // 逻辑分析仪（ATK-Logic）风格信息框：T / ΔT / f / 高电平 / 主秒表 / 打点
        function tipLine(k, v) {
            return '<span class="tip-k">' + k + '</span><span class="tip-v">' + v + '</span>';
        }
        var rows = [];
        rows.push(tipLine('T', fmtPrecise(x))); // 累计计时时间
        var prevT = prevEventTime(x);
        if (prevT !== null) {
            var dt = x - prevT;
            rows.push(tipLine('ΔT', fmtPrecise(dt))); // 与上一次事件相差
            rows.push(tipLine('f', dt > 0 ? formatFreq(1000 / dt) : '—')); // 1/ΔT 频率
        } else {
            rows.push(tipLine('ΔT', '—'));
            rows.push(tipLine('f', '—'));
        }
        var high = highAtTime(x);
        rows.push(tipLine(tr('timing.pw.tipHigh'), high !== null ? formatAuto(high) : '—')); // 高电平时间
        var mainT = mainAtTime(x);
        rows.push(tipLine(tr('timing.pw.tipMain'), mainT !== null ? formatStopwatch(mainT) : '—')); // 主秒表累计
        var lap = nearestLapInfo(x, p);
        if (lap) {
            rows.push(tipLine(tr('timing.pw.tipLap') + ' #' + lap.n, formatAuto(lap.d))); // 打点
        }
        pwTooltip.innerHTML = rows.join('');

        var tx = e.clientX - wrapperRect.left + 12;
        var ty = e.clientY - wrapperRect.top - 10;
        var tw = pwTooltip.offsetWidth;
        if (tx + tw > wrapperRect.width - 8) {
            tx = e.clientX - wrapperRect.left - tw - 12;
        }
        if (ty < 4) ty = 4;
        pwTooltip.style.left = tx + 'px';
        pwTooltip.style.top = ty + 'px';
        pwTooltip.classList.add('visible');
    });

    function endPan() {
        if (!panState.dragging) return;
        panState.dragging = false;
        pwCanvas.classList.remove('panning');
        // 拖拽结束后鼠标若已离开画布，恢复自动跟随
        if (!pwCanvas.matches(':hover')) {
            followMode = true;
            pwCursorX = null;
            pwFollowLatest();
            drawPulseChart();
        }
    }
    pwCanvas.addEventListener('pointerup', endPan);
    pwCanvas.addEventListener('pointercancel', endPan);

    // 鼠标悬停到画布 → 暂停自动跟随（手动缩放/平移）；移开 → 恢复跟随
    pwCanvas.addEventListener('mouseenter', function() {
        followMode = false;
    });
    pwCanvas.addEventListener('mouseleave', function() {
        pwTooltip.classList.remove('visible');
        pwCursorX = null;
        if (!panState.dragging) {
            followMode = true;
            pwFollowLatest();
            drawPulseChart();
        }
    });

    // 双击复位视图（同时取消挂起的单击放置）
    let pwClickTimer = null;
    pwCanvas.addEventListener('dblclick', function() {
        if (pwClickTimer !== null) {
            clearTimeout(pwClickTimer);
            pwClickTimer = null;
        }
        pwAutoFit();
        drawPulseChart();
    });

    // 单击放置测量光标（自动捕捉到边沿；延迟以区分双击）
    pwCanvas.addEventListener('click', function(e) {
        if (panState.moved) return; // 拖拽平移后的 click 不放置光标
        var canvasRect = pwCanvas.getBoundingClientRect();
        var mx = e.clientX - canvasRect.left;
        var plot = getPlotRect();
        if (mx < plot.plotL || mx > plot.plotR) return;
        pwEnsureView();
        var x = pwView.xMin + (mx - plot.plotL) / plot.plotW * (pwView.xMax - pwView.xMin);
        var snapped = snapToEdge(x);
        if (pwClickTimer !== null) clearTimeout(pwClickTimer);
        pwClickTimer = setTimeout(function() {
            pwClickTimer = null;
            placeCursor(snapped);
        }, 220);
    });

    // 右键清除测量光标
    pwCanvas.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        clearCursors();
    });

    // ============================================================
    //  键盘快捷键：W 启动 · S 暂停 · 空格 启停 · E 打点 · R 复位
    //              A/↑ 上升沿 · D/↓ 下降沿
    // ============================================================
    document.addEventListener('keydown', function(e) {
        if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
        var target = e.target;
        if (target) {
            var tag = target.tagName || '';
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) return;
        }
        if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            mainToggle();
        } else if (e.code === 'KeyW' || e.key === 'w' || e.key === 'W') {
            e.preventDefault();
            mainStart();
        } else if (e.code === 'KeyS' || e.key === 's' || e.key === 'S') {
            e.preventDefault();
            mainPause();
        } else if (e.code === 'KeyE' || e.key === 'e' || e.key === 'E') {
            e.preventDefault();
            mainLap();
        } else if (e.code === 'KeyR' || e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            mainReset();
        } else if (e.code === 'KeyA' || e.key === 'a' || e.key === 'A') {
            e.preventDefault();
            pwRise();
        } else if (e.code === 'KeyD' || e.key === 'd' || e.key === 'D') {
            e.preventDefault();
            pwFall();
        } else if (e.code === 'ArrowUp') {
            e.preventDefault();
            pwRise();
        } else if (e.code === 'ArrowDown') {
            e.preventDefault();
            pwFall();
        }
    });

    // ============================================================
    //  事件绑定
    // ============================================================
    mainToggleBtn.addEventListener('click', mainToggle);
    mainLapBtn.addEventListener('click', mainLap);
    mainResetBtn.addEventListener('click', mainReset);

    pwRiseBtn.addEventListener('click', pwRise);
    pwFallBtn.addEventListener('click', pwFall);

    timelineClearBtn.addEventListener('click', function() {
        timelineEvents = [];
        renderTimeline();
    });

    pwClearCurBtn.addEventListener('click', clearCursors);

    // 主题切换 → 重绘波形图（读取最新 CSS 变量）
    document.addEventListener('themechange', function() {
        drawPulseChart();
    });

    // 语言切换 → 更新动态文本 + 重绘波形图轴标签
    document.addEventListener('languagechange', function() {
        document.title = tr('timing.doc.title');
        updateMainUi();
        updatePwStats();
        updatePwMeasure();
        renderTimeline();
        drawPulseChart();
    });

    // 窗口尺寸变化 → 重绘波形图
    window.addEventListener('resize', function() {
        drawPulseChart();
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.title = tr('timing.doc.title');
    updateMainUi();
    updatePwStats();
    updatePwMeasure();
    renderTimeline();
    drawPulseChart();
    requestAnimationFrame(tick);
})();
