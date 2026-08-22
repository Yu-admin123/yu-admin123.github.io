// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + JS 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    'unix.doc.title':      { zh: 'Unix 时间戳转换工具', en: 'Unix Timestamp Converter' },
    'unix.page.title':     { zh: '⏱️ Unix 时间戳转换工具', en: '⏱️ Unix Timestamp Converter' },
    'unix.subhead':        { zh: '🔹 时间戳 ↔ 日期时间 双向转换 · 支持毫秒/微秒 · 多时区 · 实时时钟 · 一键网络同步', en: '🔹 Timestamp ↔ Date-time bidirectional conversion · supports ms/µs · multi-timezone · live clock · one-click network sync' },
    'unix.p1.title':       { zh: '① 时间戳 → 日期时间', en: '① Timestamp → Date-time' },
    'unix.p1.small':       { zh: 'Unix 秒 / 毫秒 / 微秒', en: 'Unix s / ms / µs' },
    'unix.label.ts':       { zh: '时间戳', en: 'Timestamp' },
    'unix.label.tz':       { zh: '时区', en: 'Timezone' },
    'unix.label.dt':       { zh: '日期时间', en: 'Date-time' },
    'unix.label.outUnit':  { zh: '输出单位', en: 'Output unit' },
    'unix.label.unit':     { zh: '单位', en: 'Unit' },
    'unix.label.raw':      { zh: '原始', en: 'Raw' },
    'unix.label.preset':   { zh: '快速预设', en: 'Quick presets' },
    'unix.label.tsList':   { zh: '时间戳列表', en: 'Timestamp list' },
    'unix.tz.local':       { zh: '本地时间', en: 'Local time' },
    'unix.unit.s':         { zh: '秒 (s)', en: 'Seconds (s)' },
    'unix.unit.ms':        { zh: '毫秒 (ms)', en: 'Milliseconds (ms)' },
    'unix.unit.us':        { zh: '微秒 (µs)', en: 'Microseconds (µs)' },
    'unix.btn.convert':    { zh: '▶ 转换', en: '▶ Convert' },
    'unix.btn.sysSync':    { zh: '🔄 系统同步', en: '🔄 System sync' },
    'unix.btn.netSync':    { zh: '🌐 网络同步', en: '🌐 Network sync' },
    'unix.btn.copySec':    { zh: '📋 复制秒', en: '📋 Copy seconds' },
    'unix.btn.copyMs':     { zh: '📋 复制毫秒', en: '📋 Copy milliseconds' },
    'unix.btn.copyUs':     { zh: '📋 复制微秒', en: '📋 Copy microseconds' },
    'unix.btn.batchConvert': { zh: '▶ 批量转换', en: '▶ Batch convert' },
    'unix.btn.copyResult':   { zh: '📋 复制结果', en: '📋 Copy result' },
    'unix.result.label1':  { zh: '📅 转换结果', en: '📅 Result' },
    'unix.result.label2':  { zh: '⏱️ 转换结果', en: '⏱️ Result' },
    'unix.key.weekday':    { zh: '星期', en: 'Weekday' },
    'unix.key.dayOfYear':  { zh: '年内第几天', en: 'Day of year' },
    'unix.key.ms':         { zh: '毫秒 (ms)', en: 'Milliseconds (ms)' },
    'unix.key.us':         { zh: '微秒 (µs)', en: 'Microseconds (µs)' },
    'unix.key.hex':        { zh: '十六进制', en: 'Hexadecimal' },
    'unix.key.inputTime':  { zh: '输入时间', en: 'Input time' },
    'unix.p2.title':       { zh: '② 日期时间 → 时间戳', en: '② Date-time → Timestamp' },
    'unix.p2.small':       { zh: '输入日期时间', en: 'Enter date-time' },
    'unix.p3.title':       { zh: '③ 实时时钟', en: '③ Live clock' },
    'unix.p3.small':       { zh: '当前系统时间', en: 'Current system time' },
    'unix.live.unixSec':    { zh: 'Unix 秒', en: 'Unix seconds' },
    'unix.live.unixMs':     { zh: 'Unix 毫秒', en: 'Unix milliseconds' },
    'unix.live.unixUs':     { zh: 'Unix 微秒', en: 'Unix microseconds' },
    'unix.p4.title':       { zh: '④ 批量转换', en: '④ Batch conversion' },
    'unix.p4.small':       { zh: '时间戳列表 → 日期时间', en: 'Timestamp list → Date-time' },
    'unix.p5.title':       { zh: '⑤ 常见时间戳参考', en: '⑤ Common timestamp reference' },
    'unix.p5.small':       { zh: '点击填充到左侧', en: 'Click to fill left input' },
    'unix.tsList.placeholder': { zh: '每行一个时间戳，例如：\n1700000000\n1700000060\n1700000120', en: 'One timestamp per line, e.g.:\n1700000000\n1700000060\n1700000120' },
    'unix.ref.y2038':      { zh: '2038-01-19 03:14:07 (32-bit 溢出)', en: '2038-01-19 03:14:07 (32-bit overflow)' },
    'unix.ref.hint':       { zh: '💡 点击参考时间戳，自动填入左侧输入框并执行转换。', en: '💡 Click a reference timestamp to auto-fill the left input and run conversion.' },
    'unix.footer':         { zh: '⏱️ Unix 时间戳转换工具 · 支持秒/毫秒/微秒 · 多时区 · 实时时钟 · 一键网络同步', en: '⏱️ Unix Timestamp Converter · supports s/ms/µs · multi-timezone · live clock · one-click network sync' },
    'unix.preset.now':       { zh: '现在', en: 'Now' },
    'unix.preset.today':     { zh: '今天 00:00', en: 'Today 00:00' },
    'unix.preset.yesterday': { zh: '昨天 00:00', en: 'Yesterday 00:00' },
    'unix.preset.tomorrow':  { zh: '明天 00:00', en: 'Tomorrow 00:00' },

    // 动态文本
    'unix.err.emptyTs':     { zh: '❌ 请输入时间戳', en: '❌ Please enter a timestamp' },
    'unix.err.invalidInput': { zh: '无效输入', en: 'Invalid input' },
    'unix.err.invalidNum':  { zh: '❌ 无效数字', en: '❌ Invalid number' },
    'unix.err.enterValidNum': { zh: '请输入有效数字', en: 'Please enter a valid number' },
    'unix.err.invalidTs':   { zh: '❌ 无效时间戳', en: '❌ Invalid timestamp' },
    'unix.err.outOfRange':  { zh: '超出范围或无效', en: 'Out of range or invalid' },
    'unix.err.emptyDt':     { zh: '❌ 请选择日期时间', en: '❌ Please select a date-time' },
    'unix.err.invalidDate': { zh: '❌ 无效日期', en: '❌ Invalid date' },
    'unix.err.checkInput':  { zh: '请检查输入', en: 'Please check input' },
    'unix.day.unit':        { zh: '天', en: 'days' },
    'unix.sync.sysDone':    { zh: '✅ 已同步系统时间 (s)', en: '✅ Synced system time (s)' },
    'unix.sync.syncing':    { zh: '⏳ 同步中...', en: '⏳ Syncing...' },
    'unix.sync.netDone':    { zh: '✅ 已同步网络时间 (worldtimeapi.org)', en: '✅ Synced network time (worldtimeapi.org)' },
    'unix.sync.netFail':    { zh: '⚠️ 网络同步失败，回退至系统时间', en: '⚠️ Network sync failed, fell back to system time' },
    'unix.batch.empty':    { zh: '请输入时间戳列表（每行一个）', en: 'Please enter a timestamp list (one per line)' },
    'unix.batch.noValid':   { zh: '没有有效输入', en: 'No valid input' },
    'unix.batch.headerTs':  { zh: '时间戳', en: 'Timestamp' },
    'unix.batch.headerDt':  { zh: '日期时间', en: 'Date-time' },
    'unix.batch.invalid':   { zh: '无效', en: 'Invalid' },
    'unix.batch.outOfRange': { zh: '超出范围', en: 'Out of range' },
    'unix.copy.fail':       { zh: '复制失败，请手动复制', en: 'Copy failed, please copy manually' }
};

(function() {
    'use strict';

    // ============================================================
    //  DOM 引用
    // ============================================================
    const timestampInput = document.getElementById('timestampInput');
    const tsUnit = document.getElementById('tsUnit');
    const tsTimezone = document.getElementById('tsTimezone');
    const tsOffsetHint = document.getElementById('tsOffsetHint');
    const tsToDateBtn = document.getElementById('tsToDateBtn');
    const tsSyncBtn = document.getElementById('tsSyncBtn');
    const tsSyncNtpBtn = document.getElementById('tsSyncNtpBtn');
    const tsResultDate = document.getElementById('tsResultDate');
    const tsResultSub = document.getElementById('tsResultSub');
    const tsIso = document.getElementById('tsIso');
    const tsRfc = document.getElementById('tsRfc');
    const tsWeekday = document.getElementById('tsWeekday');
    const tsDayOfYear = document.getElementById('tsDayOfYear');

    const dtInput = document.getElementById('dtInput');
    const dtTimezone = document.getElementById('dtTimezone');
    const dtUnit = document.getElementById('dtUnit');
    const dtToTsBtn = document.getElementById('dtToTsBtn');
    const dtResultTs = document.getElementById('dtResultTs');
    const dtResultSub = document.getElementById('dtResultSub');
    const dtMs = document.getElementById('dtMs');
    const dtUs = document.getElementById('dtUs');
    const dtHex = document.getElementById('dtHex');
    const dtInputDisplay = document.getElementById('dtInputDisplay');

    const liveClock = document.getElementById('liveClock');
    const liveDate = document.getElementById('liveDate');
    const liveWeekday = document.getElementById('liveWeekday');
    const liveTimezone = document.getElementById('liveTimezone');
    const liveTsSec = document.getElementById('liveTsSec');
    const liveTsMs = document.getElementById('liveTsMs');
    const liveTsUs = document.getElementById('liveTsUs');

    const batchTsInput = document.getElementById('batchTsInput');
    const batchUnit = document.getElementById('batchUnit');
    const batchTimezone = document.getElementById('batchTimezone');
    const batchConvertBtn = document.getElementById('batchConvertBtn');
    const batchCopyBtn = document.getElementById('batchCopyBtn');
    const batchResult = document.getElementById('batchResult');

    const refContainer = document.getElementById('refContainer');

    const copyLiveTsSec = document.getElementById('copyLiveTsSec');
    const copyLiveTsMs = document.getElementById('copyLiveTsMs');
    const copyLiveTsUs = document.getElementById('copyLiveTsUs');

    // ============================================================
    //  工具函数
    // ============================================================
    function getTimezoneOffset(tz) {
        if (tz === 'local') return 0;
        if (tz === 'UTC') return 0;
        const map = {
            'Asia/Shanghai': 480,
            'America/New_York': -300,
            'Europe/London': 0,
            'Asia/Tokyo': 540,
            'Australia/Sydney': 660,
        };
        return map[tz] || 0;
    }

    function getTimezoneLabel(tz) {
        if (tz === 'local') return window.I18N.t('unix.tz.local');
        if (tz === 'UTC') return 'UTC';
        const map = {
            'Asia/Shanghai': 'UTC+8',
            'America/New_York': 'UTC-5',
            'Europe/London': 'UTC+0',
            'Asia/Tokyo': 'UTC+9',
            'Australia/Sydney': 'UTC+11',
        };
        return map[tz] || tz;
    }

    function formatDateStr(date, tz) {
        if (tz === 'local') {
            const pad = n => String(n).padStart(2, '0');
            return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        }
        if (tz === 'UTC') {
            const pad = n => String(n).padStart(2, '0');
            return `${date.getUTCFullYear()}-${pad(date.getUTCMonth()+1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
        }
        const fmt = new Intl.DateTimeFormat('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: tz,
        });
        return fmt.format(date);
    }

    function getWeekday(date, tz) {
        const d = (tz === 'local') ? date : new Date(date.toLocaleString('zh-CN', { timeZone: tz }));
        const weekdays = (window.I18N.getLang() === 'en')
            ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            : ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return weekdays[d.getDay()];
    }

    function getDayOfYear(date, tz) {
        const d = (tz === 'local') ? date : new Date(date.toLocaleString('zh-CN', { timeZone: tz }));
        const start = new Date(d.getFullYear(), 0, 0);
        const diff = d - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    function formatLocalDateTimeInput(date) {
        const pad = n => String(n).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }

    // ============================================================
    //  ① 时间戳 → 日期时间
    // ============================================================
    function tsToDate() {
        const raw = timestampInput.value.trim();
        if (!raw) {
            tsResultDate.textContent = window.I18N.t('unix.err.emptyTs');
            tsResultSub.textContent = window.I18N.t('unix.err.invalidInput');
            tsIso.textContent = '—';
            tsRfc.textContent = '—';
            tsWeekday.textContent = '—';
            tsDayOfYear.textContent = '—';
            return;
        }
        const unit = tsUnit.value;
        const tz = tsTimezone.value;
        let num = parseFloat(raw);
        if (isNaN(num) || !isFinite(num)) {
            tsResultDate.textContent = window.I18N.t('unix.err.invalidNum');
            tsResultSub.textContent = window.I18N.t('unix.err.enterValidNum');
            return;
        }
        let ts = num;
        if (unit === 'ms') ts = num / 1000;
        else if (unit === 'us') ts = num / 1000000;

        const date = new Date(ts * 1000);
        if (isNaN(date.getTime())) {
            tsResultDate.textContent = window.I18N.t('unix.err.invalidTs');
            tsResultSub.textContent = window.I18N.t('unix.err.outOfRange');
            return;
        }

        const dateStr = formatDateStr(date, tz);
        tsResultDate.textContent = dateStr;

        const tzLabel = getTimezoneLabel(tz);
        tsResultSub.textContent = window.I18N.t('unix.label.tz') + ': ' + tzLabel + ' · ' + window.I18N.t('unix.label.raw') + ': ' + raw + ' ' + unit;

        tsIso.textContent = date.toISOString();
        tsRfc.textContent = date.toUTCString();
        tsWeekday.textContent = getWeekday(date, tz);
        tsDayOfYear.textContent = getDayOfYear(date, tz) + ' ' + window.I18N.t('unix.day.unit');

        tsOffsetHint.textContent = tzLabel;
    }

    // ============================================================
    //  ② 日期时间 → 时间戳
    // ============================================================
    function dtToTs() {
        const val = dtInput.value;
        if (!val) {
            dtResultTs.textContent = window.I18N.t('unix.err.emptyDt');
            dtResultSub.textContent = window.I18N.t('unix.err.invalidInput');
            return;
        }
        const tz = dtTimezone.value;
        const unit = dtUnit.value;

        let date;
        if (tz === 'local') {
            date = new Date(val);
        } else if (tz === 'UTC') {
            const parts = val.split('T');
            const datePart = parts[0];
            const timePart = parts[1] || '00:00:00';
            const [y, m, d] = datePart.split('-').map(Number);
            const [h, min, sec] = timePart.split(':').map(Number);
            date = new Date(Date.UTC(y, m - 1, d, h || 0, min || 0, sec || 0));
        } else {
            const parts = val.split('T');
            const datePart = parts[0];
            const timePart = parts[1] || '00:00:00';
            const [y, m, d] = datePart.split('-').map(Number);
            const [h, min, sec] = timePart.split(':').map(Number);
            const localDate = new Date(y, m - 1, d, h || 0, min || 0, sec || 0);
            const offset = getTimezoneOffset(tz);
            const utc = localDate.getTime() - localDate.getTimezoneOffset() * 60000;
            date = new Date(utc + offset * 60000);
        }

        if (isNaN(date.getTime())) {
            dtResultTs.textContent = window.I18N.t('unix.err.invalidDate');
            dtResultSub.textContent = window.I18N.t('unix.err.checkInput');
            return;
        }

        let ts = date.getTime() / 1000;
        let displayTs = ts;
        let unitLabel = window.I18N.t('unix.unit.s');
        if (unit === 'ms') { displayTs = ts * 1000;
            unitLabel = window.I18N.t('unix.unit.ms'); } else if (unit === 'us') { displayTs = ts * 1000000;
            unitLabel = window.I18N.t('unix.unit.us'); }

        const displayStr = Number.isInteger(displayTs) ? displayTs.toString() : displayTs.toFixed(3);
        dtResultTs.textContent = displayStr;
        dtResultSub.textContent = window.I18N.t('unix.label.unit') + ': ' + unitLabel + ' · ' + window.I18N.t('unix.label.tz') + ': ' + getTimezoneLabel(tz);

        dtMs.textContent = (ts * 1000).toString();
        dtUs.textContent = (ts * 1000000).toString();
        dtHex.textContent = '0x' + Math.floor(ts).toString(16).toUpperCase();
        dtInputDisplay.textContent = formatDateStr(date, 'local');
    }

    // ============================================================
    //  ③ 实时时钟
    // ============================================================
    function updateLiveClock() {
        const now = new Date();
        const pad = n => String(n).padStart(2, '0');
        const hours = pad(now.getHours());
        const mins = pad(now.getMinutes());
        const secs = pad(now.getSeconds());
        liveClock.textContent = `${hours}:${mins}:${secs}`;
        if (window.I18N.getLang() === 'en') {
            liveDate.textContent = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
        } else {
            liveDate.textContent = `${now.getFullYear()}年${pad(now.getMonth()+1)}月${pad(now.getDate())}日`;
        }
        const weekdays = (window.I18N.getLang() === 'en')
            ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            : ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        liveWeekday.textContent = weekdays[now.getDay()];
        const tzOffset = -now.getTimezoneOffset() / 60;
        const tzStr = tzOffset >= 0 ? `UTC+${tzOffset}` : `UTC${tzOffset}`;
        liveTimezone.textContent = tzStr;

        const ts = Math.floor(now.getTime() / 1000);
        liveTsSec.textContent = ts;
        liveTsMs.textContent = now.getTime();
        liveTsUs.textContent = now.getTime() * 1000;
    }

    // ============================================================
    //  时间同步功能
    // ============================================================
    function syncSystemTime() {
        const now = Math.floor(Date.now() / 1000);
        // 更新左侧
        timestampInput.value = now;
        tsUnit.value = 's';
        tsToDate();

        // 更新右侧日期输入框（本地时间）
        const date = new Date(now * 1000);
        dtInput.value = formatLocalDateTimeInput(date);
        // 确保右侧时区为 local，保持一致
        dtTimezone.value = 'local';
        dtToTs();

        tsResultSub.textContent = window.I18N.t('unix.sync.sysDone');
    }

    async function syncWithNtp() {
        const btn = tsSyncNtpBtn;
        const origText = btn.textContent;
        btn.textContent = window.I18N.t('unix.sync.syncing');
        btn.disabled = true;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC', {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error('API error');
            const data = await response.json();
            const unixtime = data.unixtime;
            if (!unixtime) throw new Error('No unixtime');

            // 更新左侧
            timestampInput.value = unixtime;
            tsUnit.value = 's';
            tsToDate();

            // 更新右侧
            const date = new Date(unixtime * 1000);
            dtInput.value = formatLocalDateTimeInput(date);
            dtTimezone.value = 'local';
            dtToTs();

            tsResultSub.textContent = window.I18N.t('unix.sync.netDone');
        } catch (e) {
            console.warn('NTP sync failed, fallback to system time.', e);
            tsResultSub.textContent = window.I18N.t('unix.sync.netFail');
            syncSystemTime();
        } finally {
            btn.textContent = origText;
            btn.disabled = false;
        }
    }

    // ============================================================
    //  ④ 批量转换
    // ============================================================
    function batchConvert() {
        const raw = batchTsInput.value.trim();
        if (!raw) {
            batchResult.textContent = window.I18N.t('unix.batch.empty');
            return;
        }
        const unit = batchUnit.value;
        const tz = batchTimezone.value;
        const lines = raw.split(/\n/).filter(s => s.trim() !== '');
        if (lines.length === 0) {
            batchResult.textContent = window.I18N.t('unix.batch.noValid');
            return;
        }

        const results = [];
        const header = window.I18N.t('unix.batch.headerTs') + ' (' + unit + ')  →  ' + window.I18N.t('unix.batch.headerDt') + ' (' + getTimezoneLabel(tz) + ')';
        results.push(header);
        results.push('─'.repeat(Math.max(header.length, 40)));

        for (let line of lines) {
            const val = parseFloat(line.trim());
            if (isNaN(val) || !isFinite(val)) {
                results.push('❌ ' + window.I18N.t('unix.batch.invalid') + ': ' + line.trim());
                continue;
            }
            let ts = val;
            if (unit === 'ms') ts = val / 1000;
            else if (unit === 'us') ts = val / 1000000;

            const date = new Date(ts * 1000);
            if (isNaN(date.getTime())) {
                results.push('❌ ' + window.I18N.t('unix.batch.outOfRange') + ': ' + line.trim());
                continue;
            }
            const dateStr = formatDateStr(date, tz);
            results.push(`${line.trim()}  →  ${dateStr}`);
        }
        batchResult.textContent = results.join('\n');
    }

    // ============================================================
    //  复制工具
    // ============================================================
    function copyText(text, btn) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                const orig = btn.textContent;
                btn.textContent = '✓';
                setTimeout(() => btn.textContent = orig, 800);
            }).catch(() => fallbackCopy(text));
        } else { fallbackCopy(text); }
    }

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { alert(window.I18N.t('unix.copy.fail')); }
        document.body.removeChild(ta);
    }

    // ============================================================
    //  事件绑定
    // ============================================================

    // ① 时间戳 → 日期
    tsToDateBtn.addEventListener('click', tsToDate);
    timestampInput.addEventListener('keydown', e => { if (e.key === 'Enter') tsToDate(); });
    tsUnit.addEventListener('change', tsToDate);
    tsTimezone.addEventListener('change', tsToDate);

    // 同步按钮
    tsSyncBtn.addEventListener('click', syncSystemTime);
    tsSyncNtpBtn.addEventListener('click', syncWithNtp);

    // ② 日期 → 时间戳
    dtToTsBtn.addEventListener('click', dtToTs);
    dtInput.addEventListener('change', dtToTs);
    dtTimezone.addEventListener('change', dtToTs);
    dtUnit.addEventListener('change', dtToTs);

    // 日期预设
    document.querySelectorAll('.format-preset').forEach(el => {
        el.addEventListener('click', function() {
            const key = this.dataset.dt;
            const now = new Date();
            let target;
            switch (key) {
                case 'now':
                    target = now;
                    break;
                case 'today':
                    target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
                    break;
                case 'yesterday':
                    target = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
                    break;
                case 'tomorrow':
                    target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
                    break;
                case 'epoch':
                    target = new Date(1970, 0, 1, 0, 0, 0);
                    break;
                default:
                    return;
            }
            dtInput.value = formatLocalDateTimeInput(target);
            dtToTs();
        });
    });

    // 初始化日期输入框
    (function initDtInput() {
        const now = new Date();
        dtInput.value = formatLocalDateTimeInput(now);
        dtToTs();
    })();

    // ③ 实时时钟
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    // 复制实时时钟
    copyLiveTsSec.addEventListener('click', function() {
        copyText(liveTsSec.textContent, this);
    });
    copyLiveTsMs.addEventListener('click', function() {
        copyText(liveTsMs.textContent, this);
    });
    copyLiveTsUs.addEventListener('click', function() {
        copyText(liveTsUs.textContent, this);
    });

    // ④ 批量转换
    batchConvertBtn.addEventListener('click', batchConvert);
    batchCopyBtn.addEventListener('click', function() {
        copyText(batchResult.textContent, this);
    });

    // ⑤ 参考时间戳
    refContainer.addEventListener('click', function(e) {
        const target = e.target.closest('button');
        if (target && target.dataset.ts) {
            timestampInput.value = target.dataset.ts;
            tsUnit.value = 's';
            tsToDate();
            timestampInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.title = window.I18N.t('unix.doc.title');
    tsOffsetHint.textContent = getTimezoneLabel(tsTimezone.value);
    tsToDate();

    tsTimezone.addEventListener('change', function() {
        tsOffsetHint.textContent = getTimezoneLabel(this.value);
    });

    batchTsInput.value = `1700000000\n1700000060\n1700000120\n1700000180`;
    batchConvert();

    // ============================================================
    //  语言切换：更新动态文本并重新执行计算
    // ============================================================
    document.addEventListener('languagechange', function () {
        document.title = window.I18N.t('unix.doc.title');
        tsOffsetHint.textContent = getTimezoneLabel(tsTimezone.value);
        tsToDate();
        dtToTs();
        updateLiveClock();
        batchConvert();
    });

})();
