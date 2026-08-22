/* ============================================================
   TextDiffMerge 业务逻辑
   主题切换（setTheme / themeToggle）由 theme.js 提供，
   语言切换由 i18n.js 提供。
   本文件通过监听 'themechange' / 'languagechange' 事件在切换后重渲染。
   ============================================================ */

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },
    'tdm.doc.title':      { zh: '文本对比与合并工具 · Diff & Merge', en: 'Text Diff & Merge Tool' },
    'tdm.page.title':     { zh: '📝 文本对比与合并工具', en: '📝 Text Diff & Merge Tool' },
    'tdm.subhead':        { zh: '🔹 实时对比 · 字符级对比 · 纯前端离线运行 · 文本不上传云端', en: '🔹 Realtime diff · char-level diff · offline · no cloud upload' },
    'tdm.sample':         { zh: '📄 示例', en: '📄 Sample' },
    'tdm.swap':           { zh: '🔄 交换', en: '🔄 Swap' },
    'tdm.clear':          { zh: '🗑 清空', en: '🗑 Clear' },
    'tdm.collapse.input': { zh: '📐 折叠输入', en: '📐 Collapse Input' },
    'tdm.collapse.input.title': { zh: '一键收起 / 展开两侧输入框', en: 'Collapse / expand both input panels' },
    'tdm.merge.base':     { zh: '合并基准', en: 'Merge Base' },
    'tdm.base.left':      { zh: '以左为底', en: 'Left as base' },
    'tdm.base.right':     { zh: '以右为底', en: 'Right as base' },
    'tdm.accept.all.left':{ zh: '« 全用左', en: '« All Left' },
    'tdm.accept.all.right':{ zh: '全用右 »', en: 'All Right »' },
    'tdm.reset.merge':    { zh: '↺ 重置合并', en: '↺ Reset Merge' },
    'tdm.opt.ignore.ws':  { zh: '忽略空白', en: 'Ignore whitespace' },
    'tdm.opt.trim.ws':    { zh: '去行尾空白', en: 'Trim trailing whitespace' },
    'tdm.opt.ignore.case':{ zh: '忽略大小写', en: 'Ignore case' },
    'tdm.opt.wrap':       { zh: '自动换行', en: 'Word wrap' },
    'tdm.opt.word.diff':  { zh: '字符级高亮', en: 'Char-level highlight' },
    'tdm.nav':            { zh: '导航', en: 'Navigation' },
    'tdm.overview.title': { zh: '点击彩色块跳转到对应改动 · 点击空白处按比例定位', en: 'Click a colored block to jump to the change · click blank area to position by ratio' },
    // 统计
    'tdm.stat.eq.zero':   { zh: '相等 0', en: 'Equal 0' },
    'tdm.stat.add.zero':  { zh: '新增 0', en: 'Added 0' },
    'tdm.stat.del.zero':  { zh: '删除 0', en: 'Deleted 0' },
    'tdm.stat.mod.zero':  { zh: '修改 0', en: 'Modified 0' },
    'tdm.stat.eq.fmt':    { zh: '相等 {n}', en: 'Equal {n}' },
    'tdm.stat.add.fmt':   { zh: '新增 {n}', en: 'Added {n}' },
    'tdm.stat.del.fmt':   { zh: '删除 {n}', en: 'Deleted {n}' },
    'tdm.stat.mod.fmt':   { zh: '修改 {n}', en: 'Modified {n}' },
    // 行数
    'tdm.linecount.zero': { zh: '0 行', en: '0 lines' },
    'tdm.linecount.fmt':  { zh: '{n} 行', en: '{n} lines' },
    // 编辑区
    'tdm.left.title':     { zh: '原始文本 · Left', en: 'Original · Left' },
    'tdm.right.title':    { zh: '修改文本 · Right', en: 'Modified · Right' },
    'tdm.collapse':       { zh: '收起', en: 'Collapse' },
    'tdm.expand.edit':    { zh: '展开编辑', en: 'Expand' },
    'tdm.collapse.edit':  { zh: '收起编辑', en: 'Collapse' },
    'tdm.open':           { zh: '📁 打开', en: '📁 Open' },
    'tdm.left.placeholder': { zh: '粘贴或输入原始文本… 支持拖拽文件到此处.', en: 'Paste or type original text… Drag files here.' },
    'tdm.right.placeholder': { zh: '粘贴或输入修改后的文本… 支持拖拽文件到此处.', en: 'Paste or type modified text… Drag files here.' },
    'tdm.collapse.expand.input': { zh: '📐 展开输入', en: '📐 Expand Input' },
    // 合并区
    'tdm.merge.area.title': { zh: '🧩 合并区 · 改动块导航与处理', en: '🧩 Merge Area · Change Block Navigation' },
    'tdm.merge.area.hint':  { zh: '— 高亮已同步显示在上方的编辑区', en: '— Highlights shown in the editor above' },
    'tdm.merged.title':     { zh: '✅ 合并结果', en: '✅ Merged Result' },
    'tdm.merged.hint':      { zh: '— 点击中间 « / » 决定每个改动块保留哪一侧', en: '— Click « / » to choose which side to keep for each block' },
    'tdm.merged.placeholder': { zh: '在两侧输入文本，合并结果会实时出现在这里…', en: 'Enter text on both sides, the merged result will appear here…' },
    'tdm.syntax':           { zh: '语法', en: 'Syntax' },
    'tdm.syntax.title':     { zh: '仅对合并结果应用语法高亮（不影响左右输入区）', en: 'Apply syntax highlighting to merged result only (does not affect input areas)' },
    'tdm.syntax.none':      { zh: '无', en: 'None' },
    'tdm.copy':             { zh: '📋 复制', en: '📋 Copy' },
    'tdm.download':         { zh: '⬇ 下载', en: '⬇ Download' },
    'tdm.resizer.title':    { zh: '拖拽调整合并结果高度 · 双击复位', en: 'Drag to resize merged result height · double-click to reset' },
    'tdm.footer':           { zh: '📝 文本对比与合并工具 · 纯前端离线运行，文本不会上传 · LCS 行级差异 + 字符级内联高亮', en: '📝 Text Diff & Merge Tool · offline · no cloud upload · LCS line diff + char-level inline highlight' },
    // 按钮 title
    'tdm.btn.use.left':     { zh: '此块采用左侧', en: 'Use left for this block' },
    'tdm.btn.use.right':    { zh: '此块采用右侧', en: 'Use right for this block' },
    'tdm.btn.use.left.short': { zh: '« 用左', en: '« Use Left' },
    'tdm.btn.use.right.short': { zh: '用右 »', en: 'Use Right »' },
    // hunk bar
    'tdm.hunk.bar.title':   { zh: '改动块 {n}', en: 'Change Block {n}' },
    // overview mark title
    'tdm.overview.mark':    { zh: '改动块 {n}  {type}', en: 'Change Block {n}  {type}' },
    'tdm.type.add':         { zh: '新增', en: 'Added' },
    'tdm.type.del':         { zh: '删除', en: 'Deleted' },
    'tdm.type.mod':         { zh: '修改', en: 'Modified' },
    // 导航计数
    'tdm.hunk.count.zero':  { zh: '0 / 0', en: '0 / 0' },
    'tdm.hunk.count.fmt':   { zh: '{cur} / {total}', en: '{cur} / {total}' },
    // 确认/提示
    'tdm.confirm.clear':    { zh: '清空两侧文本？', en: 'Clear both sides?' },
    'tdm.confirm.large':    { zh: '文本行数较多 ({n})，实时对比可能较慢，是否继续？（后续不再提示）', en: 'Large number of lines ({n}), realtime diff may be slow. Continue? (will not prompt again)' },
    // Toast
    'tdm.toast.all.left':   { zh: '已全部采用左侧', en: 'All left applied' },
    'tdm.toast.all.right':  { zh: '已全部采用右侧', en: 'All right applied' },
    'tdm.toast.reset':      { zh: '已重置合并选择', en: 'Merge selection reset' },
    'tdm.toast.copied':     { zh: '已复制到剪贴板', en: 'Copied to clipboard' },
    'tdm.toast.copied.short': { zh: '已复制', en: 'Copied' },
    'tdm.toast.copy.fail':  { zh: '复制失败', en: 'Copy failed' },
    'tdm.toast.reset.height': { zh: '已复位合并结果高度', en: 'Merged result height reset' },
    // 示例数据
    'tdm.sample.left.comment':  { zh: '// 配置文件示例', en: '// Config file example' },
    'tdm.sample.right.comment': { zh: '// 配置文件示例 (v2)', en: '// Config file example (v2)' }
};

(function() {
    /** 翻译快捷方法 */
    function t(key) { return window.I18N ? window.I18N.t(key) : ''; }
    /** 带占位符的翻译：tf('key', {n: 5}) → 替换 {n} */
    function tf(key, vars) {
        var s = t(key);
        if (vars) for (var k in vars) { s = s.split('{' + k + '}').join(vars[k]); }
        return s;
    }

    // ============================================================
    //  主题切换后重渲染（setTheme / themeToggle 已由 theme.js 提供）
    // ============================================================
    document.addEventListener('themechange', () => {
        if (lastDiff) renderDiff();
    });

    // ============================================================
    //  DOM 引用
    // ============================================================
    const leftEditor = document.getElementById('leftEditor');
    const rightEditor = document.getElementById('rightEditor');
    const leftPre = document.getElementById('leftPre');
    const rightPre = document.getElementById('rightPre');
    const liveLeft = document.getElementById('liveLeft');
    const liveRight = document.getElementById('liveRight');
    const leftFile = document.getElementById('leftFile');
    const rightFile = document.getElementById('rightFile');
    const leftFileBadge = document.getElementById('leftFileBadge');
    const rightFileBadge = document.getElementById('rightFileBadge');
    const leftClear = document.getElementById('leftClear');
    const rightClear = document.getElementById('rightClear');
    const sampleBtn = document.getElementById('sampleBtn');
    const swapBtn = document.getElementById('swapBtn');
    const clearBtn = document.getElementById('clearBtn');
    const baseSeg = document.getElementById('baseSeg');
    const optIgnoreWs = document.getElementById('optIgnoreWs');
    const optTrimWs = document.getElementById('optTrimWs');
    const optIgnoreCase = document.getElementById('optIgnoreCase');
    const optWrap = document.getElementById('optWrap');
    const optWordDiff = document.getElementById('optWordDiff');
    const prevHunk = document.getElementById('prevHunk');
    const nextHunk = document.getElementById('nextHunk');
    const hunkCounter = document.getElementById('hunkCounter');
    const statEq = document.getElementById('statEq');
    const statAdd = document.getElementById('statAdd');
    const statDel = document.getElementById('statDel');
    const statMod = document.getElementById('statMod');
    const leftLineCount = document.getElementById('leftLineCount');
    const rightLineCount = document.getElementById('rightLineCount');
    const diffStage = document.getElementById('diffStage');
    const diffBody = document.getElementById('diffBody');
    const diffLeft = document.getElementById('diffLeft');
    const diffRight = document.getElementById('diffRight');
    const mergeRail = document.getElementById('mergeRail');
    const editorMergeRail = document.getElementById('editorMergeRail');
    const overview = document.getElementById('overview');
    const overviewViewport = document.getElementById('overviewViewport');
    const mergedPanel = document.getElementById('mergedPanel');
    const mergedOutput = document.getElementById('mergedOutput');
    const mergedGutter = document.getElementById('mergedGutter');
    const mergedContent = document.getElementById('mergedContent');
    const mergedResizer = document.getElementById('mergedResizer');
    const copyMerged = document.getElementById('copyMerged');
    const downloadMerged = document.getElementById('downloadMerged');
    const mergeLangSel = document.getElementById('mergeLangSel');
    const acceptAllLeft = document.getElementById('acceptAllLeft');
    const acceptAllRight = document.getElementById('acceptAllRight');
    const resetMerge = document.getElementById('resetMerge');
    const toast = document.getElementById('toast');

    // ============================================================
    //  状态
    // ============================================================
    let lastDiff = null;      // { rows: [...], hunks: [...], aLines, bLines, perLineLeft/Right }
    let viewMode = 'split';   // 固定 split 视图（实时模式）
    let baseSide = 'left';    // left | right (合并基准)
    let hunkChoices = [];     // 每个 hunk: 'left' | 'right' | null
    let currentHunkIdx = -1;
    let diffTimer = null;     // 防抖

    // ============================================================
    //  工具函数
    // ============================================================
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
    }
    function escapeHtml(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // ============================================================
    //  语法高亮引擎（仅作用于合并结果，VSCode Light+/Dark+ 配色）
    //  支持合并分类：无 / C·C++·C# / Java / Python / JS·TS / HTML / CSS / JSON / Markdown / Matlab
    //  采用逐行扫描 + 跨行状态（块注释 / 模板字符串 / 三引号 / 代码围栏）。
    // ============================================================
    const SYNTAX_RULES = {
        c: {
            kw: 'int char float double void bool long short unsigned signed const static extern volatile auto register struct union enum class namespace using public private protected virtual override final new delete this return if else for while do switch case break continue default goto sizeof typedef typename template operator friend inline mutable explicit constexpr alignof alignas static_cast dynamic_cast reinterpret_cast const_cast co_await co_return co_yield concept requires module import ref out params is as delegate event lock checked unchecked fixed stackalloc unsafe base partial where yield async await var get set value'.split(' '),
            types: 'std string wstring vector map list array set unordered_map unordered_set bool int float double char void size_t uint8_t uint16_t uint32_t uint64_t int8_t int16_t int32_t int64_t stringstream ifstream ofstream ostream istream auto decltype nullptr_t'.split(' '),
            cons: ['true','false','nullptr'],
            preproc: true, template: false, lineComment: '//'
        },
        java: {
            kw: 'abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while var yield record sealed permits synchronized'.split(' '),
            types: 'String Integer Long Double Boolean Object Character Float Short Byte Void List Map Set ArrayList HashMap HashSet LinkedList TreeMap TreeSet Queue Deque ArrayDeque Comparable Iterable System Math Thread Runnable StringBuilder'.split(' '),
            cons: ['true','false','null'],
            preproc: false, template: false, lineComment: '//'
        },
        js: {
            kw: 'break case catch class const continue debugger default delete do else enum export extends finally for function if import in instanceof new return super switch this throw try typeof var void while with yield async await of as interface type implements let static public private protected readonly abstract declare namespace module from get set satisfies infer keyof is'.split(' '),
            types: 'string number boolean any void unknown never object symbol bigint undefined'.split(' '),
            cons: ['true','false','null','undefined','NaN','Infinity'],
            preproc: false, template: true, lineComment: '//'
        },
        matlab: {
            kw: 'function end if else elseif for while switch case otherwise return break continue global persistent classdef methods properties events try catch'.split(' '),
            types: 'double single int8 int16 int32 int64 uint8 uint16 uint32 uint64 logical char cell struct table'.split(' '),
            cons: ['true','false','nargin','nargout','varargin','varargout'],
            preproc: false, template: false, lineComment: '%'
        }
    };
    // 缓存 Set 提升查找性能
    Object.keys(SYNTAX_RULES).forEach(k => {
        const r = SYNTAX_RULES[k];
        r._kw = new Set(r.kw);
        r._types = new Set(r.types);
        r._cons = new Set(r.cons);
    });
    // Python 关键字/常量/类型集合（模块级缓存，避免逐行重建）
    const PY_KW = new Set('False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case'.split(' '));
    const PY_CONS = new Set(['True','False','None','NotImplemented','Ellipsis','__name__','__file__']);
    const PY_TYPES = new Set('int float str bool list dict tuple set bytes complex object type super'.split(' '));

    function createSyntaxState() {
        return { inBlock: false, inTemplate: false, pyStr: null,
                 mdFence: null, htmlComment: false, cssBlock: false, cssDepth: 0 };
    }

    // 在字符串 s 中从 0 查找未转义的反引号位置
    function findBacktick(s) {
        for (let k = 0; k < s.length; k++) {
            if (s[k] === '\\') { k++; continue; }
            if (s[k] === '`') return k;
        }
        return -1;
    }

    // C 系（C/C++/C#、Java、JS/TS、Matlab 复用）
    function tokenizeCLike(line, state, rule) {
        let out = '', i = 0;
        // 续行：块注释
        if (state.inBlock) {
            const idx = line.indexOf('*/');
            if (idx === -1) return '<span class="tok-comment">' + escapeHtml(line) + '</span>';
            out += '<span class="tok-comment">' + escapeHtml(line.slice(0, idx + 2)) + '</span>';
            i = idx + 2; state.inBlock = false;
        }
        // 续行：模板字符串
        if (state.inTemplate && rule.template) {
            const idx = findBacktick(line.slice(i));
            if (idx === -1) return out + '<span class="tok-string">' + escapeHtml(line.slice(i)) + '</span>';
            out += '<span class="tok-string">' + escapeHtml(line.slice(i, i + idx + 1)) + '</span>';
            i = i + idx + 1; state.inTemplate = false;
        }
        const lc = rule.lineComment;
        const re = new RegExp(
            '(' + lc + '[^\\n]*)' +             // 1 行注释
            '|(\\/\\*)' +                       // 2 块注释开始
            '|("(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\')' + // 3 字符串
            '|(`)' +                            // 4 模板字符串开始
            '|(#[A-Za-z_]\\w*)' +              // 5 预处理
            '|(0[xX][0-9a-fA-F]+|0[bB][01]+|\\d+\\.?\\d*(?:[eE][+-]?\\d+)?[fFdDlLuU]*)' + // 6 数字
            '|([A-Za-z_$][\\w$]*)' +           // 7 标识符
            '|([+\\-*/%=<>!&|^~?:.,;(){}\\[\\]@]+)' + // 8 运算符/标点
            '|(\\s+)' +                        // 9 空白
            '|(.)', 'g');                      // 10 兜底（任何未匹配单字符）
        let m;
        while ((m = re.exec(line)) !== null) {
            if (m[1]) {
                out += '<span class="tok-comment">' + escapeHtml(m[1]) + '</span>';
            } else if (m[2]) {
                const rest = line.slice(re.lastIndex);
                const end = rest.indexOf('*/');
                if (end === -1) {
                    out += '<span class="tok-comment">' + escapeHtml(line.slice(m.index)) + '</span>';
                    state.inBlock = true; break;
                }
                const full = m[2] + rest.slice(0, end + 2);
                out += '<span class="tok-comment">' + escapeHtml(full) + '</span>';
                re.lastIndex = m.index + full.length;
            } else if (m[3]) {
                out += '<span class="tok-string">' + escapeHtml(m[3]) + '</span>';
            } else if (m[4]) {
                if (!rule.template) { out += '<span class="tok-operator">' + escapeHtml(m[4]) + '</span>'; continue; }
                const rest = line.slice(re.lastIndex);
                const end = findBacktick(rest);
                if (end === -1) {
                    out += '<span class="tok-string">' + escapeHtml(line.slice(m.index)) + '</span>';
                    state.inTemplate = true; break;
                }
                const full = '`' + rest.slice(0, end + 1);
                out += '<span class="tok-string">' + escapeHtml(full) + '</span>';
                re.lastIndex = m.index + full.length;
            } else if (m[5]) {
                out += rule.preproc ? '<span class="tok-keyword">' + escapeHtml(m[5]) + '</span>' : escapeHtml(m[5]);
            } else if (m[6]) {
                out += '<span class="tok-number">' + escapeHtml(m[6]) + '</span>';
            } else if (m[7]) {
                const w = m[7];
                if (rule._cons.has(w)) out += '<span class="tok-constant">' + escapeHtml(w) + '</span>';
                else if (rule._kw.has(w)) out += '<span class="tok-keyword">' + escapeHtml(w) + '</span>';
                else if (rule._types.has(w)) out += '<span class="tok-type">' + escapeHtml(w) + '</span>';
                else if (line[re.lastIndex] === '(') out += '<span class="tok-function">' + escapeHtml(w) + '</span>';
                else if (/^[A-Z]/.test(w)) out += '<span class="tok-type">' + escapeHtml(w) + '</span>';
                else out += '<span class="tok-variable">' + escapeHtml(w) + '</span>';
            } else if (m[8]) {
                if (/^[.,;]$/.test(m[8])) out += '<span class="tok-punctuation">' + escapeHtml(m[8]) + '</span>';
                else out += '<span class="tok-operator">' + escapeHtml(m[8]) + '</span>';
            } else if (m[9]) {
                out += m[9];
            } else if (m[10]) {
                out += escapeHtml(m[10]);
            }
        }
        return out;
    }

    function tokenizePython(line, state) {
        if (state.pyStr) {
            const q = state.pyStr, idx = line.indexOf(q);
            if (idx === -1) return '<span class="tok-string">' + escapeHtml(line) + '</span>';
            const head = '<span class="tok-string">' + escapeHtml(line.slice(0, idx + 3)) + '</span>';
            state.pyStr = null;
            return head + tokenizePython(line.slice(idx + 3), state);
        }
        const kw = PY_KW, cons = PY_CONS, types = PY_TYPES;
        let out = '';
        const re = /(#[^\n]*)|("""|''')|([fFrRbBuU]{0,2}"(?:[^"\\]|\\.)*"|[fFrRbBuU]{0,2}'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*(?:[eEjJ][+-]?\d+)?\b)|([A-Za-z_]\w*)|([+\-*/%=<>!&|^~@.,;:(){}\[\]]+)|(\s+)|(.)/g;
        let m;
        while ((m = re.exec(line)) !== null) {
            if (m[1]) out += '<span class="tok-comment">' + escapeHtml(m[1]) + '</span>';
            else if (m[2]) {
                const rest = line.slice(re.lastIndex);
                const end = rest.indexOf(m[2]);
                if (end === -1) {
                    out += '<span class="tok-string">' + escapeHtml(m[2] + rest) + '</span>';
                    state.pyStr = m[2]; break;
                }
                const full = m[2] + rest.slice(0, end + 3);
                out += '<span class="tok-string">' + escapeHtml(full) + '</span>';
                re.lastIndex = m.index + full.length;
            } else if (m[3]) out += '<span class="tok-string">' + escapeHtml(m[3]) + '</span>';
            else if (m[4]) out += '<span class="tok-number">' + escapeHtml(m[4]) + '</span>';
            else if (m[5]) {
                const w = m[5];
                if (cons.has(w)) out += '<span class="tok-constant">' + escapeHtml(w) + '</span>';
                else if (kw.has(w)) out += '<span class="tok-keyword">' + escapeHtml(w) + '</span>';
                else if (types.has(w)) out += '<span class="tok-type">' + escapeHtml(w) + '</span>';
                else if (line[re.lastIndex] === '(') out += '<span class="tok-function">' + escapeHtml(w) + '</span>';
                else if (/^[A-Z]/.test(w)) out += '<span class="tok-type">' + escapeHtml(w) + '</span>';
                else out += '<span class="tok-variable">' + escapeHtml(w) + '</span>';
            } else if (m[6]) {
                if (/^[.,;:@]$/.test(m[6])) out += '<span class="tok-punctuation">' + escapeHtml(m[6]) + '</span>';
                else out += '<span class="tok-operator">' + escapeHtml(m[6]) + '</span>';
            } else if (m[7]) out += m[7];
            else if (m[8]) out += escapeHtml(m[8]);
        }
        return out;
    }

    function tokenizeHtml(line, state) {
        let out = '', i = 0;
        if (state.htmlComment) {
            const idx = line.indexOf('-->');
            if (idx === -1) return '<span class="tok-comment">' + escapeHtml(line) + '</span>';
            out += '<span class="tok-comment">' + escapeHtml(line.slice(0, idx + 3)) + '</span>';
            i = idx + 3; state.htmlComment = false;
        }
        while (i < line.length) {
            if (line.startsWith('<!--', i)) {
                const end = line.indexOf('-->', i + 4);
                if (end === -1) { out += '<span class="tok-comment">' + escapeHtml(line.slice(i)) + '</span>'; state.htmlComment = true; return out; }
                out += '<span class="tok-comment">' + escapeHtml(line.slice(i, end + 3)) + '</span>';
                i = end + 3; continue;
            }
            if (/^<!/i.test(line.slice(i))) {
                const end = line.indexOf('>', i);
                const seg = end === -1 ? line.slice(i) : line.slice(i, end + 1);
                out += '<span class="tok-doctype">' + escapeHtml(seg) + '</span>';
                i = end === -1 ? line.length : end + 1; continue;
            }
            if (line[i] === '<') {
                const m = /^<(\/?)([a-zA-Z][\w:-]*)/.exec(line.slice(i));
                if (m) {
                    out += '<span class="tok-punctuation">&lt;</span>';
                    if (m[1]) out += '<span class="tok-punctuation">/</span>';
                    out += '<span class="tok-tag">' + escapeHtml(m[2]) + '</span>';
                    i += m[0].length;
                    while (i < line.length && line[i] !== '>') {
                        const am = /^(\s+)([a-zA-Z_:][\w:.-]*)/.exec(line.slice(i));
                        if (am) {
                            out += am[1];
                            out += '<span class="tok-attr-name">' + escapeHtml(am[2]) + '</span>';
                            i += am[0].length;
                            const vm = /^(\s*=\s*)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[^\s>]+)/.exec(line.slice(i));
                            if (vm) {
                                out += vm[1];
                                out += '<span class="tok-attr-value">' + escapeHtml(vm[2]) + '</span>';
                                i += vm[0].length;
                            }
                        } else if (line[i] === '/') {
                            out += '<span class="tok-punctuation">/</span>'; i++;
                        } else {
                            out += escapeHtml(line[i]); i++;
                        }
                    }
                    if (i < line.length && line[i] === '>') { out += '<span class="tok-punctuation">&gt;</span>'; i++; }
                    continue;
                }
                out += '&lt;'; i++;
            } else {
                const next = line.indexOf('<', i);
                out += escapeHtml(next === -1 ? line.slice(i) : line.slice(i, next));
                i = next === -1 ? line.length : next;
            }
        }
        return out;
    }

    function tokenizeCss(line, state) {
        let out = '', i = 0;
        if (state.cssBlock) {
            const idx = line.indexOf('*/');
            if (idx === -1) return '<span class="tok-comment">' + escapeHtml(line) + '</span>';
            out += '<span class="tok-comment">' + escapeHtml(line.slice(0, idx + 2)) + '</span>';
            i = idx + 2; state.cssBlock = false;
        }
        const inBlock = state.cssDepth > 0;
        const re = /(\/\*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(@[\w-]+)|(-?\b\d+\.?\d*(?:px|em|rem|%|vh|vw|vmin|vmax|pt|pc|in|cm|mm|deg|rad|turn|s|ms|fr|ex|ch)?\b)|([#.][\w-]+)|([A-Za-z-][\w-]*)(\s*:)|([{};:])|(\s+)|(.)/g;
        let m;
        while ((m = re.exec(line)) !== null) {
            if (m[1]) {
                const rest = line.slice(re.lastIndex);
                const end = rest.indexOf('*/');
                if (end === -1) { out += '<span class="tok-comment">' + escapeHtml(line.slice(m.index)) + '</span>'; state.cssBlock = true; break; }
                const full = m[1] + rest.slice(0, end + 2);
                out += '<span class="tok-comment">' + escapeHtml(full) + '</span>';
                re.lastIndex = m.index + full.length;
            } else if (m[2]) out += '<span class="tok-string">' + escapeHtml(m[2]) + '</span>';
            else if (m[3]) out += '<span class="tok-keyword">' + escapeHtml(m[3]) + '</span>';
            else if (m[4]) out += '<span class="tok-number">' + escapeHtml(m[4]) + '</span>';
            else if (m[5]) out += '<span class="tok-type">' + escapeHtml(m[5]) + '</span>';
            else if (m[6] && m[7]) {
                if (inBlock) out += '<span class="tok-property">' + escapeHtml(m[6]) + '</span>' + m[7];
                else out += '<span class="tok-tag">' + escapeHtml(m[6]) + '</span>' + m[7];
            } else if (m[8]) {
                const p = m[8];
                if (p === '{') { state.cssDepth++; out += '<span class="tok-punctuation">{</span>'; }
                else if (p === '}') { state.cssDepth = Math.max(0, state.cssDepth - 1); out += '<span class="tok-punctuation">}</span>'; }
                else out += '<span class="tok-punctuation">' + escapeHtml(p) + '</span>';
            } else if (m[9]) out += m[9];
            else if (m[10]) out += escapeHtml(m[10]);
        }
        return out;
    }

    function tokenizeJson(line) {
        let out = '';
        const re = /("(?:[^"\\]|\\.)*")(\s*:)?|(\b-?\d+\.?\d*(?:[eE][+-]?\d+)?\b)|(\btrue\b|\bfalse\b|\bnull\b)|([{}\[\],:])|(\s+)|(.)/g;
        let m;
        while ((m = re.exec(line)) !== null) {
            if (m[1]) {
                if (m[2]) out += '<span class="tok-property">' + escapeHtml(m[1]) + '</span>' + m[2];
                else out += '<span class="tok-string">' + escapeHtml(m[1]) + '</span>';
            } else if (m[3]) out += '<span class="tok-number">' + escapeHtml(m[3]) + '</span>';
            else if (m[4]) out += '<span class="tok-constant">' + escapeHtml(m[4]) + '</span>';
            else if (m[5]) out += '<span class="tok-punctuation">' + escapeHtml(m[5]) + '</span>';
            else if (m[6]) out += m[6];
            else if (m[7]) out += escapeHtml(m[7]);
        }
        return out;
    }

    function tokenizeMarkdown(line, state) {
        if (state.mdFence) {
            const trimmed = line.trim();
            const ch = state.mdFence;
            if (trimmed[0] === ch && new RegExp('^[' + ch + ']{3,}').test(trimmed)) {
                state.mdFence = null;
                return '<span class="tok-punctuation">' + escapeHtml(line) + '</span>';
            }
            return '<span class="tok-code">' + escapeHtml(line) + '</span>';
        }
        const fm = /^(\s*)(`{3,}|~{3,})(.*)$/.exec(line);
        if (fm) {
            state.mdFence = fm[2][0];
            return '<span class="tok-punctuation">' + escapeHtml(fm[1] + fm[2]) + '</span><span class="tok-type">' + escapeHtml(fm[3]) + '</span>';
        }
        const head = /^(#{1,6})\s+(.*)$/.exec(line);
        if (head) return '<span class="tok-heading">' + escapeHtml(head[1]) + '</span> <span class="tok-heading">' + escapeHtml(head[2]) + '</span>';
        if (/^\s*[-*+]\s+/.test(line)) {
            // 列表项：高亮符号
            const lm = /^(\s*)([-*+])(\s+)(.*)$/.exec(line);
            if (lm) return '<span class="tok-punctuation">' + escapeHtml(lm[1]) + '</span><span class="tok-operator">' + escapeHtml(lm[2]) + '</span>' + lm[3] + mdInline(lm[4]);
        }
        if (/^\s*>\s?/.test(line)) {
            const bm = /^(\s*)(>)(\s?)(.*)$/.exec(line);
            if (bm) return '<span class="tok-punctuation">' + escapeHtml(bm[1]) + '</span><span class="tok-operator">' + escapeHtml(bm[2]) + '</span>' + bm[3] + mdInline(bm[4]);
        }
        return mdInline(line);
    }
    function mdInline(s) {
        let out = '';
        const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(__[^_]+__)|(\*[^*]+\*)|(_[^_]+_)|(\[[^\]]*\]\([^)]*\))|(\s+)|(.)/g;
        let m;
        while ((m = re.exec(s)) !== null) {
            if (m[1]) out += '<span class="tok-code">' + escapeHtml(m[1]) + '</span>';
            else if (m[2]) out += '<span class="tok-bold">' + escapeHtml(m[2]) + '</span>';
            else if (m[3]) out += '<span class="tok-bold">' + escapeHtml(m[3]) + '</span>';
            else if (m[4]) out += '<span class="tok-italic">' + escapeHtml(m[4]) + '</span>';
            else if (m[5]) out += '<span class="tok-italic">' + escapeHtml(m[5]) + '</span>';
            else if (m[6]) out += '<span class="tok-link">' + escapeHtml(m[6]) + '</span>';
            else if (m[7]) out += m[7];
            else if (m[8]) out += escapeHtml(m[8]);
        }
        return out;
    }

    function highlightSyntax(line, lang, state) {
        if (!line) return '';
        try {
            switch (lang) {
                case 'c':       return tokenizeCLike(line, state, SYNTAX_RULES.c);
                case 'java':    return tokenizeCLike(line, state, SYNTAX_RULES.java);
                case 'js':      return tokenizeCLike(line, state, SYNTAX_RULES.js);
                case 'matlab':  return tokenizeCLike(line, state, SYNTAX_RULES.matlab);
                case 'python':  return tokenizePython(line, state);
                case 'html':    return tokenizeHtml(line, state);
                case 'css':     return tokenizeCss(line, state);
                case 'json':    return tokenizeJson(line);
                case 'markdown':return tokenizeMarkdown(line, state);
                default:        return escapeHtml(line);
            }
        } catch (e) {
            return escapeHtml(line);
        }
    }
    function splitLines(text) {
        if (text === '') return [];
        // 保留尾部空行信息
        const arr = text.split(/\r\n|\r|\n/);
        return arr;
    }
    function normalizeLine(line, ignoreWs, trimWs, ignoreCase) {
        let s = line;
        if (trimWs) s = s.replace(/\s+$/, '');
        if (ignoreWs) s = s.replace(/\s+/g, '');
        if (ignoreCase) s = s.toLowerCase();
        return s;
    }

    // ============================================================
    //  LCS 行级差异
    //  返回 ops: [{type:'equal'|'delete'|'insert', a?:i, b?:j}]
    // ============================================================
    function diffLines(aLines, bLines, opts) {
        const la = aLines.map(x => normalizeLine(x, opts.ignoreWs, opts.trimWs, opts.ignoreCase));
        const lb = bLines.map(x => normalizeLine(x, opts.ignoreWs, opts.trimWs, opts.ignoreCase));
        const m = la.length, n = lb.length;
        // DP
        const dp = Array.from({length: m + 1}, () => new Int32Array(n + 1));
        for (let i = 1; i <= m; i++) {
            const li = la[i-1];
            const row = dp[i], prev = dp[i-1];
            for (let j = 1; j <= n; j++) {
                if (li === lb[j-1]) row[j] = prev[j-1] + 1;
                else row[j] = prev[j] >= row[j-1] ? prev[j] : row[j-1];
            }
        }
        const ops = [];
        let i = m, j = n;
        while (i > 0 && j > 0) {
            if (la[i-1] === lb[j-1]) {
                ops.push({type:'equal', a:i-1, b:j-1});
                i--; j--;
            } else if (dp[i-1][j] >= dp[i][j-1]) {
                ops.push({type:'delete', a:i-1});
                i--;
            } else {
                ops.push({type:'insert', b:j-1});
                j--;
            }
        }
        while (i > 0) { ops.push({type:'delete', a:i-1}); i--; }
        while (j > 0) { ops.push({type:'insert', b:j-1}); j--; }
        ops.reverse();
        return ops;
    }

    // ============================================================
    //  字符级差异（用于修改行的内联高亮）
    //  返回 segments: [{type:'eq'|'del'|'add', text}]
    // ============================================================
    function diffChars(aStr, bStr) {
        const a = Array.from(aStr);
        const b = Array.from(bStr);
        const m = a.length, n = b.length;
        if (m === 0) return [{type:'add', text: bStr}];
        if (n === 0) return [{type:'del', text: aStr}];

        const dp = Array.from({length: m + 1}, () => new Int32Array(n + 1));
        for (let i = 1; i <= m; i++) {
            const ai = a[i-1];
            const row = dp[i], prev = dp[i-1];
            for (let j = 1; j <= n; j++) {
                if (ai === b[j-1]) row[j] = prev[j-1] + 1;
                else row[j] = prev[j] >= row[j-1] ? prev[j] : row[j-1];
            }
        }
        const ops = [];
        let i = m, j = n;
        while (i > 0 && j > 0) {
            if (a[i-1] === b[j-1]) { ops.push({type:'eq', text:a[i-1]}); i--; j--; }
            else if (dp[i-1][j] >= dp[i][j-1]) { ops.push({type:'del', text:a[i-1]}); i--; }
            else { ops.push({type:'add', text:b[j-1]}); j--; }
        }
        while (i > 0) { ops.push({type:'del', text:a[i-1]}); i--; }
        while (j > 0) { ops.push({type:'add', text:b[j-1]}); j--; }
        ops.reverse();
        // 合并相邻同类型
        const merged = [];
        for (const op of ops) {
            const last = merged[merged.length - 1];
            if (last && last.type === op.type) last.text += op.text;
            else merged.push({type: op.type, text: op.text});
        }
        return merged;
    }

    // ============================================================
    //  将 ops 配对成可视行 + hunk 分组
    //  rows: [{type, leftLine?, rightLine?, leftSegs?, rightSegs?, hunkIdx?}]
    //  type: 'equal' | 'modify' | 'add' | 'del'
    // ============================================================
    function buildRows(ops, aLines, bLines, opts) {
        const rows = [];
        let i = 0;
        while (i < ops.length) {
            const op = ops[i];
            if (op.type === 'equal') {
                rows.push({type:'equal', leftIdx: op.a, rightIdx: op.b});
                i++;
                continue;
            }
            // 收集连续的非 equal 操作
            const dels = [], ins = [];
            while (i < ops.length && ops[i].type !== 'equal') {
                if (ops[i].type === 'delete') dels.push(ops[i].a);
                else ins.push(ops[i].b);
                i++;
            }
            // 配对为 modify
            const pairs = Math.min(dels.length, ins.length);
            for (let k = 0; k < pairs; k++) {
                const aLine = aLines[dels[k]];
                const bLine = bLines[ins[k]];
                let leftSegs = null, rightSegs = null;
                if (opts.wordDiff && aLine !== bLine) {
                    const segs = diffChars(aLine, bLine);
                    leftSegs = segs.filter(s => s.type !== 'add');
                    rightSegs = segs.filter(s => s.type !== 'del');
                }
                rows.push({type:'modify', leftIdx: dels[k], rightIdx: ins[k], leftSegs, rightSegs});
            }
            for (let k = pairs; k < dels.length; k++) {
                rows.push({type:'del', leftIdx: dels[k]});
            }
            for (let k = pairs; k < ins.length; k++) {
                rows.push({type:'add', rightIdx: ins[k]});
            }
        }
        // hunk 分组：连续的非 equal 行算一个 hunk
        const hunks = []; // {startRow, endRow(exclusive)}
        let s = -1;
        for (let r = 0; r < rows.length; r++) {
            const isChange = rows[r].type !== 'equal';
            if (isChange && s === -1) s = r;
            if ((!isChange || r === rows.length - 1) && s !== -1) {
                let end = isChange ? r + 1 : r;
                hunks.push({startRow: s, endRow: end});
                s = -1;
            }
        }
        return {rows, hunks};
    }

    // ============================================================
    //  渲染差异
    // ============================================================
    function renderDiff() {
        if (!lastDiff) return;
        const {rows, hunks} = lastDiff;
        const opts = currentOptions();
        const wrap = opts.wrap;

        // 合并区已合并到编辑区中间轨道：不再渲染 diffLeft/diffRight 文本
        // （编辑区 pre 层已实时显示差异高亮）
        diffLeft.innerHTML = '';
        diffRight.innerHTML = '';
        mergeRail.innerHTML = '';
        // 在编辑区中间轨道放置采用按钮
        placeEditorMergeButtons(hunks);
        renderOverview();
        updateHunkCounter();
        renderMerged();
        requestAnimationFrame(updateEditorRailPosition);
    }

    function segsToHtml(segs, addOrDel) {
        let html = '';
        for (const s of segs) {
            if (s.type === 'eq') html += escapeHtml(s.text);
            else if (s.type === 'del' && addOrDel === 'del') html += '<span class="cw-del">' + escapeHtml(s.text) + '</span>';
            else if (s.type === 'add' && addOrDel === 'add') html += '<span class="cw-add">' + escapeHtml(s.text) + '</span>';
        }
        return html;
    }

    function renderSplit(rows, hunks, wrap) {
        const aLines = lastDiff.aLines, bLines = lastDiff.bLines;
        const fragL = document.createDocumentFragment();
        const fragR = document.createDocumentFragment();
        for (let r = 0; r < rows.length; r++) {
            const row = rows[r];
            if (row.type === 'equal') {
                const html = escapeHtml(aLines[row.leftIdx] != null ? aLines[row.leftIdx] : '');
                fragL.appendChild(makeSplitRow('equal', html, row.leftIdx, wrap));
                fragR.appendChild(makeSplitRow('equal', html, row.rightIdx, wrap));
            } else if (row.type === 'modify') {
                const lh = (row.leftSegs && segsToHtml(row.leftSegs, 'del')) || escapeHtml(aLines[row.leftIdx] != null ? aLines[row.leftIdx] : '');
                const rh = (row.rightSegs && segsToHtml(row.rightSegs, 'add')) || escapeHtml(bLines[row.rightIdx] != null ? bLines[row.rightIdx] : '');
                fragL.appendChild(makeSplitRow('del', lh, row.leftIdx, wrap));
                fragR.appendChild(makeSplitRow('add', rh, row.rightIdx, wrap));
            } else if (row.type === 'del') {
                fragL.appendChild(makeSplitRow('del', escapeHtml(aLines[row.leftIdx] != null ? aLines[row.leftIdx] : ''), row.leftIdx, wrap));
                fragR.appendChild(makeSplitRow('empty', '', null, wrap));
            } else if (row.type === 'add') {
                fragL.appendChild(makeSplitRow('empty', '', null, wrap));
                fragR.appendChild(makeSplitRow('add', escapeHtml(bLines[row.rightIdx] != null ? bLines[row.rightIdx] : ''), row.rightIdx, wrap));
            }
        }
        diffLeft.appendChild(fragL);
        diffRight.appendChild(fragR);
        // 渲染合并按钮到 mergeRail（按 hunk）
        placeMergeButtons(hunks, rows, wrap);
    }

    // 单行构造（split 模式，每列一个行号格）
    function makeSplitRow(type, contentHtml, num, wrap) {
        const row = document.createElement('div');
        row.className = 'diff-row ' + type + (wrap ? ' wrap' : '');
        const ln = document.createElement('div');
        ln.className = 'ln';
        ln.textContent = num != null ? (num + 1) : '';
        const ct = document.createElement('div');
        ct.className = 'ct';
        ct.innerHTML = contentHtml || '&nbsp;';
        row.appendChild(ln);
        row.appendChild(ct);
        return row;
    }

    function renderUnified(rows, hunks, wrap) {
        // unified 模式：直接构建带 hunk 操作条的整体结构
        placeHunkBarsUnified(hunks, rows, wrap);
    }

    function makeUnifiedRow(type, contentHtml, leftNum, rightNum, wrap) {
        const row = document.createElement('div');
        row.className = 'diff-row ' + type + (wrap ? ' wrap' : '');
        const ln1 = document.createElement('div');
        ln1.className = 'ln';
        ln1.textContent = leftNum != null ? (leftNum + 1) : '';
        const ln2 = document.createElement('div');
        ln2.className = 'ln';
        ln2.textContent = rightNum != null ? (rightNum + 1) : '';
        const ct = document.createElement('div');
        ct.className = 'ct';
        ct.innerHTML = contentHtml || '&nbsp;';
        row.appendChild(ln1);
        row.appendChild(ln2);
        row.appendChild(ct);
        return row;
    }

    // split 模式：在 mergeRail 上为每个 hunk 放置 « / » 按钮
    function placeMergeButtons(hunks, rows, wrap) {
        mergeRail.innerHTML = '';
        if (!hunks.length) return;
        const leftRows = diffLeft.children;
        const bodyRect = diffBody.getBoundingClientRect();
        for (let h = 0; h < hunks.length; h++) {
            const hk = hunks[h];
            const firstRowEl = leftRows[hk.startRow];
            if (!firstRowEl) continue;
            const r = firstRowEl.getBoundingClientRect();
            const baseTop = r.top - bodyRect.top;
            const btnL = document.createElement('button');
            btnL.className = 'merge-btn left';
            btnL.innerHTML = '«';
            btnL.title = t('tdm.btn.use.left');
            btnL.dataset.baseTop = baseTop;
            btnL.dataset.hunk = h;
            btnL.dataset.side = 'left';
            btnL.style.top = baseTop + 'px';
            btnL.addEventListener('click', onHunkPick);

            const btnR = document.createElement('button');
            btnR.className = 'merge-btn right';
            btnR.innerHTML = '»';
            btnR.title = t('tdm.btn.use.right');
            btnR.dataset.baseTop = baseTop;
            btnR.dataset.hunk = h;
            btnR.dataset.side = 'right';
            btnR.style.top = baseTop + 'px';
            btnR.addEventListener('click', onHunkPick);

            mergeRail.appendChild(btnL);
            mergeRail.appendChild(btnR);
        }
        refreshHunkButtonStates();
        updateMergeRailPosition();
    }

    // 滚动时让合并按钮跟随行（按钮位于 diffBody 坐标系，需减去滚动量）
    function updateMergeRailPosition() {
        const st = diffRight.scrollTop;
        mergeRail.querySelectorAll('.merge-btn').forEach(btn => {
            const baseTop = parseFloat(btn.dataset.baseTop) || 0;
            btn.style.top = (baseTop - st) + 'px';
        });
    }

    // ============================================================
    //  编辑区中间采用按钮轨道（替代独立合并区）
    //  按钮通过 getBoundingClientRect 定位到 hunk 代表行，随编辑器滚动更新
    // ============================================================
    // 取 hunk 在编辑器内的代表行元素（优先左侧差异行，纯 add 用右侧）
    function getHunkRepLineEl(hunkIdx) {
        if (!lastDiff) return null;
        const hk = lastDiff.hunks[hunkIdx];
        if (!hk) return null;
        for (let r = hk.startRow; r < hk.endRow && r < lastDiff.rows.length; r++) {
            const row = lastDiff.rows[r];
            if (row.leftIdx != null && row.type !== 'equal') return leftPre.children[row.leftIdx] || null;
        }
        for (let r = hk.startRow; r < hk.endRow && r < lastDiff.rows.length; r++) {
            const row = lastDiff.rows[r];
            if (row.rightIdx != null && row.type !== 'equal') return rightPre.children[row.rightIdx] || null;
        }
        return null;
    }
    // 在编辑区中间轨道放置每个 hunk 的 « / » 按钮
    function placeEditorMergeButtons(hunks) {
        editorMergeRail.innerHTML = '';
        if (!hunks || !hunks.length) return;
        for (let h = 0; h < hunks.length; h++) {
            const btnL = document.createElement('button');
            btnL.className = 'merge-btn left';
            btnL.innerHTML = '«';
            btnL.title = t('tdm.btn.use.left');
            btnL.dataset.hunk = h;
            btnL.dataset.side = 'left';
            btnL.addEventListener('click', onHunkPick);

            const btnR = document.createElement('button');
            btnR.className = 'merge-btn right';
            btnR.innerHTML = '»';
            btnR.title = t('tdm.btn.use.right');
            btnR.dataset.hunk = h;
            btnR.dataset.side = 'right';
            btnR.addEventListener('click', onHunkPick);

            editorMergeRail.appendChild(btnL);
            editorMergeRail.appendChild(btnR);
        }
        refreshHunkButtonStates();
        requestAnimationFrame(updateEditorRailPosition);
    }
    // 按钮跟随编辑器滚动重新定位（用行元素 rect 相对轨道 rect）
    let _railRafPending = false;
    function updateEditorRailPosition() {
        if (!lastDiff) return;
        const railRect = editorMergeRail.getBoundingClientRect();
        if (railRect.width === 0) return; // 收起/隐藏时跳过
        const viewRect = liveLeft.getBoundingClientRect();
        editorMergeRail.querySelectorAll('.merge-btn').forEach(btn => {
            const h = parseInt(btn.dataset.hunk, 10);
            const lineEl = getHunkRepLineEl(h);
            if (!lineEl) { btn.style.display = 'none'; return; }
            const lineRect = lineEl.getBoundingClientRect();
            // 对应行完全不在编辑器可视范围 → 隐藏按钮（不再强制夹到边缘）
            if (lineRect.bottom < viewRect.top || lineRect.top > viewRect.bottom) {
                btn.style.display = 'none';
                return;
            }
            const btnH = btn.offsetHeight || 22;
            const top = lineRect.top - railRect.top + (lineRect.height - btnH) / 2;
            btn.style.top = top + 'px';
            btn.style.display = '';
        });
    }
    function scheduleRailUpdate() {
        if (_railRafPending) return;
        _railRafPending = true;
        requestAnimationFrame(() => {
            _railRafPending = false;
            updateEditorRailPosition();
            updateOverviewViewport();
            syncMergedByEditorRatio();
        });
    }
    // 左右编辑器按比例同步滚动（差异行数不同无法逐行对齐，比例同步最稳）
    function onEditorScroll(source) {
        const src = source === 'left' ? leftEditor : rightEditor;
        const dst = source === 'left' ? rightEditor : leftEditor;
        const srcMax = src.scrollHeight - src.clientHeight;
        const dstMax = dst.scrollHeight - dst.clientHeight;
        if (srcMax > 0 && dstMax > 0) {
            const target = (src.scrollTop / srcMax) * dstMax;
            // 阈值避免来回反馈震荡
            if (Math.abs(dst.scrollTop - target) > 1) dst.scrollTop = target;
        }
        scheduleRailUpdate();
    }
    function syncMergedByEditorRatio() {
        if (!lastDiff) return;
        const srcMax = leftEditor.scrollHeight - leftEditor.clientHeight;
        const maxMerged = mergedOutput.scrollHeight - mergedOutput.clientHeight;
        if (srcMax > 0 && maxMerged > 0) {
            mergedOutput.scrollTop = (leftEditor.scrollTop / srcMax) * maxMerged;
        }
    }

    // unified 模式：每个 hunk 前插入操作条
    function placeHunkBarsUnified(hunks, rows, wrap) {
        // 重新构造：清空并按 rows + hunk bars 渲染
        const frag = document.createDocumentFragment();
        let r = 0;
        for (let h = 0; h < hunks.length; h++) {
            const hk = hunks[h];
            // 先渲染 hunk 之前的 equal 行
            while (r < hk.startRow) {
                frag.appendChild(buildUnifiedRowFromRow(rows[r], wrap));
                r++;
            }
            // 插入 hunk 操作条
            const bar = document.createElement('div');
            bar.className = 'hunk-bar';
            bar.dataset.hunkBar = h;
            const nDel = countInHunk(rows, hk, 'del') + countInHunk(rows, hk, 'modify');
            const nAdd = countInHunk(rows, hk, 'add') + countInHunk(rows, hk, 'modify');
            bar.innerHTML = `<span>${tf('tdm.hunk.bar.title', {n: h+1})}</span>
                <span class="hunk-apply-btns">
                    <button data-hunk="${h}" data-side="left" title="${t('tdm.btn.use.left')}">${t('tdm.btn.use.left.short')}</button>
                    <button data-hunk="${h}" data-side="right" title="${t('tdm.btn.use.right')}">${t('tdm.btn.use.right.short')}</button>
                </span>
                <span style="color:var(--text-muted)">−${nDel} +${nAdd}</span>`;
            frag.appendChild(bar);
            while (r < hk.endRow) {
                frag.appendChild(buildUnifiedRowFromRow(rows[r], wrap));
                r++;
            }
        }
        while (r < rows.length) {
            frag.appendChild(buildUnifiedRowFromRow(rows[r], wrap));
            r++;
        }
        diffRight.innerHTML = '';
        diffRight.appendChild(frag);
        // 绑定按钮
        diffRight.querySelectorAll('.hunk-apply-btns button').forEach(btn => {
            btn.addEventListener('click', onHunkPick);
        });
        refreshHunkButtonStates();
    }

    function buildUnifiedRowFromRow(row, wrap) {
        const aLines = lastDiff.aLines, bLines = lastDiff.bLines;
        if (row.type === 'equal') return makeUnifiedRow('equal', escapeHtml(aLines[row.leftIdx] != null ? aLines[row.leftIdx] : ''), row.leftIdx, row.rightIdx, wrap);
        if (row.type === 'modify') {
            const lh = (row.leftSegs && segsToHtml(row.leftSegs, 'del')) || escapeHtml(aLines[row.leftIdx] != null ? aLines[row.leftIdx] : '');
            const a = makeUnifiedRow('del', lh, row.leftIdx, null, wrap);
            const rh = (row.rightSegs && segsToHtml(row.rightSegs, 'add')) || escapeHtml(bLines[row.rightIdx] != null ? bLines[row.rightIdx] : '');
            const b = makeUnifiedRow('add', rh, null, row.rightIdx, wrap);
            const frag = document.createDocumentFragment();
            frag.appendChild(a);
            frag.appendChild(b);
            return frag;
        }
        if (row.type === 'del') return makeUnifiedRow('del', escapeHtml(aLines[row.leftIdx] != null ? aLines[row.leftIdx] : ''), row.leftIdx, null, wrap);
        return makeUnifiedRow('add', escapeHtml(bLines[row.rightIdx] != null ? bLines[row.rightIdx] : ''), null, row.rightIdx, wrap);
    }

    function countInHunk(rows, hk, type) {
        let c = 0;
        for (let i = hk.startRow; i < hk.endRow; i++) if (rows[i].type === type) c++;
        return c;
    }

    function onHunkPick(e) {
        const h = parseInt(e.currentTarget.dataset.hunk, 10);
        const side = e.currentTarget.dataset.side;
        hunkChoices[h] = side;
        refreshHunkButtonStates();
        renderMerged(h); // 闪烁这个 hunk 对应的结果行
    }

    function refreshHunkButtonStates() {
        // split buttons（旧合并区，已隐藏，保留兼容）
        mergeRail.querySelectorAll('.merge-btn').forEach(btn => {
            const h = parseInt(btn.dataset.hunk, 10);
            const side = btn.dataset.side;
            btn.classList.toggle('picked', hunkChoices[h] === side);
        });
        // 编辑区中间轨道按钮
        editorMergeRail.querySelectorAll('.merge-btn').forEach(btn => {
            const h = parseInt(btn.dataset.hunk, 10);
            const side = btn.dataset.side;
            btn.classList.toggle('picked', hunkChoices[h] === side);
        });
        // unified hunk bars
        diffRight.querySelectorAll('.hunk-apply-btns button').forEach(btn => {
            const h = parseInt(btn.dataset.hunk, 10);
            const side = btn.dataset.side;
            btn.classList.toggle('picked', hunkChoices[h] === side);
        });
        // hunk bar target highlight (current nav)
        diffRight.querySelectorAll('.hunk-bar').forEach((bar, idx) => {
            bar.classList.toggle('is-target', idx === currentHunkIdx);
        });
    }

    // ============================================================
    //  合并结果计算
    //  baseSide 决定默认行；对每个 hunk，若 choice==='left' 用左、'right' 用右，
    //  未决定则用 baseSide
    // ============================================================
    function computeMerged() {
        if (!lastDiff) return '';
        const {rows, hunks} = lastDiff;
        const aLines = lastDiff.aLines, bLines = lastDiff.bLines;
        // 建立 row->hunk 映射
        const rowHunk = new Array(rows.length).fill(-1);
        hunks.forEach((hk, idx) => {
            for (let i = hk.startRow; i < hk.endRow; i++) rowHunk[i] = idx;
        });
        const out = [];
        for (let r = 0; r < rows.length; r++) {
            const row = rows[r];
            const h = rowHunk[r];
            if (row.type === 'equal') {
                out.push(aLines[row.leftIdx]);
            } else if (h !== -1 && r === hunks[h].startRow) {
                // 在 hunk 起始处一次性输出本 hunk 选定侧的内容
                const choice = hunkChoices[h] || baseSide;
                const hk = hunks[h];
                for (let i = hk.startRow; i < hk.endRow; i++) {
                    const rr = rows[i];
                    if (rr.type === 'equal') continue;
                    if (rr.type === 'modify') {
                        out.push(choice === 'left' ? aLines[rr.leftIdx] : bLines[rr.rightIdx]);
                    } else if (rr.type === 'del') {
                        if (choice === 'left') out.push(aLines[rr.leftIdx]);
                    } else if (rr.type === 'add') {
                        if (choice === 'right') out.push(bLines[rr.rightIdx]);
                    }
                }
                r = hk.endRow - 1;
            }
        }
        return out.join('\n');
    }

    function renderMerged(flashHunkIdx = -1) {
        mergedPanel.classList.remove('hidden');
        const wrapCls = optWrap.checked ? ' wrap' : '';
        mergedOutput.className = 'merged-output' + wrapCls;
        mergedContent.className = 'merged-content' + wrapCls;

        // 语法高亮：仅作用于合并结果（按选择的语言逐行扫描，跨行保持状态）
        const mergeLang = mergeLangSel ? mergeLangSel.value : 'none';
        const useSyntax = mergeLang !== 'none';
        const synState = useSyntax ? createSyntaxState() : null;
        const renderText = (text) => useSyntax
            ? highlightSyntax(text == null ? '' : text, mergeLang, synState)
            : escapeHtml(text == null ? '' : text);

        let html = '';
        let gutterHtml = '';
        let outHunkMarks = [];

        if (!lastDiff) {
            const leftT = leftEditor.value;
            const rightT = rightEditor.value;
            if (leftT === '' && rightT === '') {
                mergedGutter.textContent = '';
                mergedContent.textContent = '';
                mergedContent.innerHTML = '<span style="color:var(--text-muted)">' + t('tdm.merged.placeholder') + '</span>';
                mergedContent.dataset.hunkMarks = '[]';
                return;
            }
            const text = (baseSide === 'right') ? rightT : leftT;
            const lines = text.split('\n');
            for (let i = 0; i < lines.length; i++) {
                gutterHtml += `<span class="g-line">${i + 1}</span>`;
                html += `<span class="m-line">${renderText(lines[i])}</span>`;
            }
            mergedGutter.innerHTML = gutterHtml;
            mergedContent.innerHTML = html;
            mergedContent.dataset.hunkMarks = JSON.stringify(new Array(lines.length).fill(-1));
            return;
        }

        // 有 diff：生成带 hunk 标记的行
        const {rows, hunks} = lastDiff;
        const aLines = lastDiff.aLines, bLines = lastDiff.bLines;
        const rowHunk = new Array(rows.length).fill(-1);
        hunks.forEach((hk, idx) => {
            for (let i = hk.startRow; i < hk.endRow; i++) rowHunk[i] = idx;
        });

        const outLines = [];
        outHunkMarks = [];
        for (let r = 0; r < rows.length; r++) {
            const row = rows[r];
            const h = rowHunk[r];
            if (row.type === 'equal') {
                outLines.push(aLines[row.leftIdx]);
                outHunkMarks.push(-1);
            } else if (h !== -1 && r === hunks[h].startRow) {
                const choice = hunkChoices[h] || baseSide;
                const hk = hunks[h];
                for (let i = hk.startRow; i < hk.endRow; i++) {
                    const rr = rows[i];
                    if (rr.type === 'equal') continue;
                    if (rr.type === 'modify') {
                        outLines.push(choice === 'left' ? aLines[rr.leftIdx] : bLines[rr.rightIdx]);
                        outHunkMarks.push(h);
                    } else if (rr.type === 'del') {
                        if (choice === 'left') { outLines.push(aLines[rr.leftIdx]); outHunkMarks.push(h); }
                    } else if (rr.type === 'add') {
                        if (choice === 'right') { outLines.push(bLines[rr.rightIdx]); outHunkMarks.push(h); }
                    }
                }
                r = hk.endRow - 1;
            }
        }

        // 渲染每行（包成 span，记录 data-hunk 用于定位闪烁）
        for (let i = 0; i < outLines.length; i++) {
            const h = outHunkMarks[i];
            const dataAttr = h >= 0 ? ` data-hunk="${h}"` : '';
            const lineText = outLines[i] === undefined ? '' : outLines[i];
            gutterHtml += `<span class="g-line"${dataAttr}>${i + 1}</span>`;
            html += `<span class="m-line"${dataAttr}>${renderText(lineText)}</span>`;
        }
        mergedGutter.innerHTML = gutterHtml;
        mergedContent.innerHTML = html;

        // 存储行→hunk 映射用于跳转
        mergedContent.dataset.hunkMarks = JSON.stringify(outHunkMarks);

        // 渲染后如果有指定闪烁的 hunk，触发
        if (flashHunkIdx >= 0) {
            requestAnimationFrame(() => flashMergedLines(flashHunkIdx));
        }
    }

    // 只闪烁合并结果中对应 hunk 的那几行（不闪整个面板）
    let _flashLineTimer = null;
    function flashMergedLines(hunkIdx) {
        // 先清理旧闪烁
        const oldContentFlash = mergedContent.querySelectorAll('.m-line.flash-line');
        oldContentFlash.forEach(el => el.classList.remove('flash-line'));
        const oldGutterFlash = mergedGutter.querySelectorAll('.g-line.flash-line');
        oldGutterFlash.forEach(el => el.classList.remove('flash-line'));

        if (hunkIdx < 0) return;

        const targets = mergedContent.querySelectorAll(`.m-line[data-hunk="${hunkIdx}"]`);
        const gutterTargets = mergedGutter.querySelectorAll(`.g-line[data-hunk="${hunkIdx}"]`);
        if (!targets.length) return;

        // 重新触发动画：强制 reflow
        targets.forEach(el => {
            el.classList.remove('flash-line');
            void el.offsetWidth;
            el.classList.add('flash-line');
        });
        gutterTargets.forEach(el => {
            el.classList.remove('flash-line');
            void el.offsetWidth;
            el.classList.add('flash-line');
        });

        // 滚动合并结果让闪烁行进入可视区（顶部 1/3 处）
        const firstEl = targets[0];
        if (firstEl && typeof firstEl.offsetTop !== 'undefined') {
            const targetTop = firstEl.offsetTop - mergedOutput.clientHeight / 3;
            mergedOutput.scrollTop = Math.max(0, targetTop);
        }

        if (_flashLineTimer) clearTimeout(_flashLineTimer);
        _flashLineTimer = setTimeout(() => {
            targets.forEach(el => el.classList.remove('flash-line'));
            gutterTargets.forEach(el => el.classList.remove('flash-line'));
        }, 1200);
    }

    // ============================================================
    //  概览 minimap
    // ============================================================
    function renderOverview() {
        overview.innerHTML = '';
        overview.appendChild(overviewViewport);
        if (!lastDiff || !lastDiff.hunks.length) {
            // 无差异时显示一个灰色占位（不隐藏，避免布局抖动）
            overviewViewport.style.display = 'none';
            return;
        }
        overviewViewport.style.display = '';
        const total = lastDiff.rows.length || 1;
        for (let hi = 0; hi < lastDiff.hunks.length; hi++) {
            const hk = lastDiff.hunks[hi];
            const mark = document.createElement('div');
            mark.className = 'mark';
            let hunkType = 'mod';
            const hasDel = hasTypeInHunk(hk, 'del') || hasTypeInHunk(hk, 'modify');
            const hasAdd = hasTypeInHunk(hk, 'add') || hasTypeInHunk(hk, 'modify');
            if (hasDel && hasAdd) hunkType = 'mod';
            else if (hasAdd) hunkType = 'add';
            else hunkType = 'del';
            mark.style.background = hunkType === 'add' ? 'var(--diff-overview-add)' : (hunkType === 'del' ? 'var(--diff-overview-del)' : 'var(--diff-overview-mod)');
            mark.style.left = (hk.startRow / total * 100) + '%';
            mark.style.width = (Math.max(0.5, hk.endRow - hk.startRow) / total * 100) + '%';
            mark.dataset.hunkIdx = hi;
            const typeLabel = hunkType === 'add' ? t('tdm.type.add') : (hunkType === 'del' ? t('tdm.type.del') : t('tdm.type.mod'));
            mark.title = tf('tdm.overview.mark', { n: (hi + 1), type: typeLabel });
            overview.appendChild(mark);
        }
        updateOverviewViewport();
    }
    function hasTypeInHunk(hk, type) {
        for (let i = hk.startRow; i < hk.endRow; i++) if (lastDiff.rows[i].type === type) return true;
        return false;
    }
    function updateOverviewViewport() {
        const sc = leftEditor;
        const max = sc.scrollHeight - sc.clientHeight;
        if (max <= 0) { overviewViewport.style.display = 'none'; return; }
        overviewViewport.style.display = '';
        const left = sc.scrollTop / (sc.scrollHeight || 1) * 100;
        const w = sc.clientHeight / (sc.scrollHeight || 1) * 100;
        overviewViewport.style.left = left + '%';
        overviewViewport.style.width = Math.max(1.5, w) + '%';
    }

    // ============================================================
    //  当前选项
    // ============================================================
    function currentOptions() {
        return {
            ignoreWs: optIgnoreWs.checked,
            trimWs: optTrimWs.checked,
            ignoreCase: optIgnoreCase.checked,
            wrap: optWrap.checked,
            wordDiff: optWordDiff.checked
        };
    }

    // ============================================================
    //  统计
    // ============================================================
    function computeStats(rows) {
        let eq = 0, add = 0, del = 0, mod = 0;
        for (const r of rows) {
            if (r.type === 'equal') eq++;
            else if (r.type === 'add') add++;
            else if (r.type === 'del') del++;
            else if (r.type === 'modify') mod++;
        }
        return {eq, add, del, mod};
    }

    // ============================================================
    //  对比主流程（实时：编辑时自动触发）
    // ============================================================
    function runDiffNow() {
        const aText = leftEditor.value;
        const bText = rightEditor.value;
        const opts = currentOptions();
        const aLines = splitLines(aText);
        const bLines = splitLines(bText);

        if (aText === '' && bText === '') {
            lastDiff = null;
            hunkChoices = [];
            currentHunkIdx = -1;
            statEq.textContent = t('tdm.stat.eq.zero'); statAdd.textContent = t('tdm.stat.add.zero');
            statDel.textContent = t('tdm.stat.del.zero'); statMod.textContent = t('tdm.stat.mod.zero');
            hunkCounter.textContent = t('tdm.hunk.count.zero');
            leftLineCount.textContent = t('tdm.linecount.zero');
            rightLineCount.textContent = t('tdm.linecount.zero');
            renderLivePre(null);
            renderMerged();
            // 清空底部 diff 视图 + 编辑区中间轨道
            diffLeft.innerHTML = ''; diffRight.innerHTML = '';
            mergeRail.innerHTML = '';
            editorMergeRail.innerHTML = '';
            renderOverview();
            return;
        }
        const LIMIT = 8000;
        if (aLines.length > LIMIT || bLines.length > LIMIT) {
            if (!runDiffNow._warnedShown) {
                runDiffNow._warnedShown = true;
                if (!confirm(tf('tdm.confirm.large', { n: Math.max(aLines.length, bLines.length) }))) {
                    runDiffNow._warnedShown = false;
                    return;
                }
            }
        }
        const ops = diffLines(aLines, bLines, opts);
        const {rows, hunks} = buildRows(ops, aLines, bLines, opts);
        lastDiff = {rows, hunks, aLines, bLines, opts};
        hunkChoices = new Array(hunks.length).fill(null);
        if (currentHunkIdx < 0 || currentHunkIdx >= hunks.length) {
            currentHunkIdx = hunks.length ? 0 : -1;
        }

        const s = computeStats(rows);
        statEq.textContent = tf('tdm.stat.eq.fmt', { n: s.eq });
        statAdd.textContent = tf('tdm.stat.add.fmt', { n: (s.add + s.mod) });
        statDel.textContent = tf('tdm.stat.del.fmt', { n: (s.del + s.mod) });
        statMod.textContent = tf('tdm.stat.mod.fmt', { n: s.mod });
        leftLineCount.textContent = tf('tdm.linecount.fmt', { n: aLines.length });
        rightLineCount.textContent = tf('tdm.linecount.fmt', { n: bLines.length });

        renderLivePre(lastDiff);
        renderDiff();
        renderMerged();
    }

    // 输入法（IME）组合输入期间的防抖守卫：防止中文候选字时按一下重绘一次
    // 导致候选窗口跳走 / 光标错位（Windows 典型问题）
    let composing = 0;
    function attachCompositionGuard(ta) {
        ta.addEventListener('compositionstart', () => { composing++; clearTimeout(diffTimer); });
        ta.addEventListener('compositionend', () => {
            composing = Math.max(0, composing - 1);
            if (composing === 0) scheduleDiff(false);
        });
    }
    function scheduleDiff(immediate) {
        if (composing > 0) return; // 组合输入中，等待 compositionend 再触发
        if (diffTimer) clearTimeout(diffTimer);
        if (immediate) { diffTimer = null; runDiffNow(); }
        else diffTimer = setTimeout(runDiffNow, 180);
    }

    // ============================================================
    //  在两侧编辑器的 pre 层渲染行级 + 字符级就地高亮
    // ============================================================
    function renderLivePre(diff) {
        // 写 innerHTML 前先记住 textarea 的滚动位置，防止重绘把 pre 滚回 0
        const ls = {top: leftEditor.scrollTop, left: leftEditor.scrollLeft};
        const rs = {top: rightEditor.scrollTop, left: rightEditor.scrollLeft};
        renderOnePre(leftPre, leftEditor, 'left', diff);
        renderOnePre(rightPre, rightEditor, 'right', diff);
        // 下一帧把 pre 层的滚动位置强制对齐到用户正在操作的 textarea 当前位置
        requestAnimationFrame(() => {
            if (leftPre.scrollTop !== ls.top) leftPre.scrollTop = ls.top;
            if (leftPre.scrollLeft !== ls.left) leftPre.scrollLeft = ls.left;
            if (rightPre.scrollTop !== rs.top) rightPre.scrollTop = rs.top;
            if (rightPre.scrollLeft !== rs.left) rightPre.scrollLeft = rs.left;
        });
        syncWrapMode();
    }
    function renderOnePre(pre, ta, side, diff) {
        if (!diff) {
            // 空态：显示纯文本 placeholder 式内容（与 textarea 内容一致，透明底色）
            const text = ta.value;
            const lines = splitLines(text);
            // 注意：每个 .le-line 已 display:block 自带换行，join 用空串，
            //       不能用 \n，否则 whitespace:pre 会再插一行造成行距翻倍
            pre.innerHTML = (lines.length ? lines.map(l => {
                const inner = l === '' ? '<br>' : escapeHtml(l);
                return '<span class="le-line eq">' + inner + '</span>';
            }).join('') : '') || '<span class="le-line eq"><br></span>';
            return;
        }
        const {rows} = diff;
        const lineCount = side === 'left' ? diff.aLines.length : diff.bLines.length;
        const lineInfos = new Array(lineCount).fill(null); // {cls, segs}
        for (const r of rows) {
            if (side === 'left') {
                if (r.leftIdx == null) continue;
                let cls = 'eq', segs = null;
                if (r.type === 'modify') { cls = 'del'; segs = r.leftSegs; }
                else if (r.type === 'del') cls = 'del';
                else if (r.type === 'add') continue;
                lineInfos[r.leftIdx] = {cls, segs};
            } else {
                if (r.rightIdx == null) continue;
                let cls = 'eq', segs = null;
                if (r.type === 'modify') { cls = 'add'; segs = r.rightSegs; }
                else if (r.type === 'add') cls = 'add';
                else if (r.type === 'del') continue;
                lineInfos[r.rightIdx] = {cls, segs};
            }
        }
        const lines = side === 'left' ? diff.aLines : diff.bLines;
        // join('')：display:block 已经强制每行换行，不要再用 \n 插额外空行
        pre.innerHTML = lines.map((l, i) => {
            const info = lineInfos[i] || {cls: 'eq', segs: null};
            let inner;
            if (info.segs) {
                inner = segsToHtml(info.segs, side === 'left' ? 'del' : 'add');
                if (!inner) inner = l === '' ? '<br>' : escapeHtml(l);
            } else {
                inner = l === '' ? '<br>' : escapeHtml(l);
            }
            return '<span class="le-line ' + info.cls + '">' + inner + '</span>';
        }).join('');
    }

    // textarea → pre 单向滚动同步（rAF 节流，避免和输入/IME 冲突）
    function syncScrollBetweenLayer(ta, pre) {
        let pending = false;
        ta.addEventListener('scroll', () => {
            if (pending) return;
            pending = true;
            requestAnimationFrame(() => {
                pending = false;
                if (pre.scrollTop !== ta.scrollTop) pre.scrollTop = ta.scrollTop;
                if (pre.scrollLeft !== ta.scrollLeft) pre.scrollLeft = ta.scrollLeft;
            });
        });
        // pre 是 pointer-events:none，理论上不会被用户滚，但做个冗余保护也用 rAF
        pre.addEventListener('scroll', () => {
            if (pending) return;
            pending = true;
            requestAnimationFrame(() => {
                pending = false;
                if (ta.scrollTop !== pre.scrollTop) ta.scrollTop = pre.scrollTop;
                if (ta.scrollLeft !== pre.scrollLeft) ta.scrollLeft = pre.scrollLeft;
            });
        });
    }
    syncScrollBetweenLayer(leftEditor, leftPre);
    syncScrollBetweenLayer(rightEditor, rightPre);

    // 当用户拖动 .live-editor 右下角 resize 手柄时，强制内层同步外部高度
    // （虽然 height:100% 会跟着变，但 ResizeObserver 能保证 rAF 后做一次滚动对齐）
    function setupLiveResizeSync(editorEl, ta, pre) {
        if (!('ResizeObserver' in window)) return;
        const ro = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                if (pre.scrollTop !== ta.scrollTop) pre.scrollTop = ta.scrollTop;
                if (pre.scrollLeft !== ta.scrollLeft) pre.scrollLeft = ta.scrollLeft;
            });
        });
        ro.observe(editorEl);
    }
    const liveLeftEl = document.getElementById('liveLeft');
    const liveRightEl = document.getElementById('liveRight');
    if (liveLeftEl) setupLiveResizeSync(liveLeftEl, leftEditor, leftPre);
    if (liveRightEl) setupLiveResizeSync(liveRightEl, rightEditor, rightPre);

    // 绑定 IME 守卫（定义见上方 scheduleDiff 附近）
    attachCompositionGuard(leftEditor);
    attachCompositionGuard(rightEditor);

    function syncWrapMode() {
        const wrap = optWrap.checked;
        [leftPre, rightPre, leftEditor, rightEditor].forEach(el => {
            el.classList.toggle('wrap', wrap);
        });
    }

    // ============================================================
    //  输入即时清除旧高亮（最优解配套）
    //  · 正在编辑的黑色大字已经由 textarea 自己显示，不需要任何同步
    //  · 但是旧的红绿背景条在 debounce 触发前会停留在错误的行上，
    //    所以每次 input/paste/cut 后立刻：把 pre 重置为「全部 eq 无背景色」
    //    等 180ms 停手后，再由 runDiffNow 重新计算并上色。
    // ============================================================
    function resetPreHighlights(pre, ta, side) {
        // 直接复用 renderOnePre 的 diff=null 分支
        // 它输出纯 .le-line.eq 透明字符 + 无背景色
        renderOnePre(pre, ta, side, null);
    }

    // ============================================================
    //  Hunk 导航
    // ============================================================
    function updateHunkCounter() {
        const n = lastDiff ? lastDiff.hunks.length : 0;
        hunkCounter.textContent = tf('tdm.hunk.count.fmt', { cur: (n ? (currentHunkIdx + 1) : 0), total: n });
        refreshHunkButtonStates();
    }
    function scrollToHunk(idx) {
        if (!lastDiff || !lastDiff.hunks.length) return;
        currentHunkIdx = (idx + lastDiff.hunks.length) % lastDiff.hunks.length;
        const hk = lastDiff.hunks[currentHunkIdx];

        // ---- 编辑器 (live-editor) 滚动 + 聚焦（合并区已并入编辑区） ----
        const {aLines, bLines} = lastDiff;
        const lineHeight = parseFloat(getComputedStyle(leftEditor).lineHeight);
        // 根据 hunk 内每行的 leftIdx/rightIdx 找到需要高亮的行号
        const leftHighlights = new Set();
        const rightHighlights = new Set();
        for (let r = hk.startRow; r < hk.endRow && r < lastDiff.rows.length; r++) {
            const row = lastDiff.rows[r];
            if (row.leftIdx != null) leftHighlights.add(row.leftIdx);
            if (row.rightIdx != null) rightHighlights.add(row.rightIdx);
        }
        // 清除之前的聚焦
        leftPre.querySelectorAll('.focus-row').forEach(el => el.classList.remove('focus-row'));
        rightPre.querySelectorAll('.focus-row').forEach(el => el.classList.remove('focus-row'));
        // 给对应行的 .le-line 添加聚焦类
        const leftLines = leftPre.querySelectorAll(':scope > .le-line');
        const rightLines = rightPre.querySelectorAll(':scope > .le-line');
        leftHighlights.forEach(li => { if (leftLines[li]) leftLines[li].classList.add('focus-row'); });
        rightHighlights.forEach(ri => { if (rightLines[ri]) rightLines[ri].classList.add('focus-row'); });
        // 滚动 textarea 让第一个差异行可见
        const firstLeftRow = [...leftHighlights].sort((a,b)=>a-b)[0];
        const firstRightRow = [...rightHighlights].sort((a,b)=>a-b)[0];
        if (firstLeftRow != null) {
            const targetTop = firstLeftRow * lineHeight - leftEditor.clientHeight / 3;
            leftEditor.scrollTop = Math.max(0, targetTop);
            leftPre.scrollTop = leftEditor.scrollTop;
        }
        if (firstRightRow != null) {
            const targetTop = firstRightRow * lineHeight - rightEditor.clientHeight / 3;
            rightEditor.scrollTop = Math.max(0, targetTop);
            rightPre.scrollTop = rightEditor.scrollTop;
        }

        // ---- 在 minimap 上高亮当前 hunk（active 标记） ----
        overview.querySelectorAll('.mark.active').forEach(el => el.classList.remove('active'));
        const activeMark = overview.querySelector('.mark[data-hunk-idx="' + currentHunkIdx + '"]');
        if (activeMark) activeMark.classList.add('active');

        // ---- 合并结果区滚动到对应行 ----
        scrollMergedToHunk(currentHunkIdx);

        // ---- 编辑区中间轨道按钮重新定位 ----
        requestAnimationFrame(updateEditorRailPosition);

        setTimeout(() => {
            leftPre.querySelectorAll('.focus-row').forEach(el => el.classList.remove('focus-row'));
            rightPre.querySelectorAll('.focus-row').forEach(el => el.classList.remove('focus-row'));
        }, 1800);
        updateHunkCounter();
        updateOverviewViewport();
    }

    // 合并结果滚动到指定 hunk 对应行
    function scrollMergedToHunk(hunkIdx) {
        if (!lastDiff || !lastDiff.hunks.length) return;
        let marks;
        try { marks = JSON.parse(mergedContent.dataset.hunkMarks || '[]'); } catch(_) { return; }
        if (!marks.length) return;
        // 找到第一个属于该 hunk 的行
        let targetLine = -1;
        for (let i = 0; i < marks.length; i++) {
            if (marks[i] === hunkIdx) { targetLine = i; break; }
        }
        if (targetLine < 0) return;
        const lineHeight = parseFloat(getComputedStyle(mergedContent).lineHeight);
        const targetTop = targetLine * lineHeight - mergedOutput.clientHeight / 3;
        mergedOutput.scrollTop = Math.max(0, targetTop);
    }

    prevHunk.addEventListener('click', () => scrollToHunk(currentHunkIdx - 1));
    nextHunk.addEventListener('click', () => scrollToHunk(currentHunkIdx + 1));

    // ============================================================
    //  事件绑定
    // ============================================================
    baseSeg.querySelectorAll('button').forEach(b => {
        b.addEventListener('click', () => {
            baseSeg.querySelectorAll('button').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            baseSide = b.dataset.base;
            if (lastDiff) renderMerged();
        });
    });
    [optIgnoreWs, optTrimWs, optIgnoreCase, optWordDiff].forEach(c => {
        c.addEventListener('change', () => scheduleDiff(true));
    });
    optWrap.addEventListener('change', () => {
        syncWrapMode();
        scheduleDiff(true);
    });
    // 语法选择：仅重绘合并结果（不影响左右输入区与 diff 计算）
    if (mergeLangSel) {
        mergeLangSel.addEventListener('change', () => renderMerged());
    }

    // 输入时：立即清除旧的彩色高亮（避免停在错误的行上），
    //         正在编辑的黑色大字由 textarea 本身显示（不再需要跨层同步）。
    //         debounce 结束后再跑 runDiffNow 重新上色 + 更新统计/合并
    leftEditor.addEventListener('input', () => {
        resetPreHighlights(leftPre, leftEditor, 'left');
        scheduleDiff(false);
    });
    rightEditor.addEventListener('input', () => {
        resetPreHighlights(rightPre, rightEditor, 'right');
        scheduleDiff(false);
    });
    // 粘贴/剪切后：先立刻清除旧高亮，再立即重跑完整 diff（不再防抖）
    leftEditor.addEventListener('paste', () => setTimeout(() => {
        resetPreHighlights(leftPre, leftEditor, 'left');
        scheduleDiff(true);
    }, 0));
    rightEditor.addEventListener('paste', () => setTimeout(() => {
        resetPreHighlights(rightPre, rightEditor, 'right');
        scheduleDiff(true);
    }, 0));
    leftEditor.addEventListener('cut', () => setTimeout(() => {
        resetPreHighlights(leftPre, leftEditor, 'left');
        scheduleDiff(true);
    }, 0));
    rightEditor.addEventListener('cut', () => setTimeout(() => {
        resetPreHighlights(rightPre, rightEditor, 'right');
        scheduleDiff(true);
    }, 0));

    // 文件加载
    function loadFileInto(input, editor, badge) {
        input.addEventListener('change', e => {
            const f = e.target.files[0];
            if (!f) return;
            const rd = new FileReader();
            rd.onload = () => {
                editor.value = rd.result;
                badge.textContent = '📄 ' + f.name;
                badge.style.display = '';
                scheduleDiff(true);
            };
            rd.readAsText(f);
        });
    }
    loadFileInto(leftFile, leftEditor, leftFileBadge);
    loadFileInto(rightFile, rightEditor, rightFileBadge);

    leftClear.addEventListener('click', () => {
        leftEditor.value = ''; leftFileBadge.style.display = 'none';
        scheduleDiff(true);
    });
    rightClear.addEventListener('click', () => {
        rightEditor.value = ''; rightFileBadge.style.display = 'none';
        scheduleDiff(true);
    });

    // 拖拽
    function setupDrop(editor, badge) {
        editor.addEventListener('dragover', e => { e.preventDefault(); });
        editor.addEventListener('drop', e => {
            e.preventDefault();
            const f = e.dataTransfer.files[0];
            if (!f) return;
            const rd = new FileReader();
            rd.onload = () => {
                editor.value = rd.result;
                badge.textContent = '📄 ' + f.name;
                badge.style.display = '';
                scheduleDiff(true);
            };
            rd.readAsText(f);
        });
    }
    setupDrop(leftEditor, leftFileBadge);
    setupDrop(rightEditor, rightFileBadge);

    // 交换
    swapBtn.addEventListener('click', () => {
        const t = leftEditor.value;
        leftEditor.value = rightEditor.value;
        rightEditor.value = t;
        const b = leftFileBadge.textContent;
        leftFileBadge.textContent = rightFileBadge.textContent;
        rightFileBadge.textContent = b;
        const ls = leftFileBadge.style.display;
        leftFileBadge.style.display = rightFileBadge.style.display;
        rightFileBadge.style.display = ls;
        scheduleDiff(true);
    });

    clearBtn.addEventListener('click', () => {
        if (!confirm(t('tdm.confirm.clear'))) return;
        leftEditor.value = ''; rightEditor.value = '';
        leftFileBadge.style.display = 'none'; rightFileBadge.style.display = 'none';
        scheduleDiff(true);
    });

    // ===== 输入框收起 / 展开（两侧同步） =====
    const editorWrap = document.getElementById('editorWrap');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    const editorCards = editorWrap.querySelectorAll('.editor-card');

    function setAllCollapsed(collapsed) {
        editorCards.forEach(card => card.classList.toggle('collapsed', collapsed));
        // 同步左右两个折叠按钮的显示文字
        document.querySelectorAll('.editor-card .collapse-btn').forEach(btn => {
            btn.innerHTML = collapsed
                ? '<span class="arrow">▸</span> ' + t('tdm.expand.edit')
                : '<span class="arrow">▾</span> ' + t('tdm.collapse.edit');
        });
        editorWrap.classList.toggle('all-collapsed', collapsed);
        collapseAllBtn.textContent = collapsed ? t('tdm.collapse.expand.input') : t('tdm.collapse.input');
        if (lastDiff) requestAnimationFrame(updateEditorRailPosition);
    }
    // 任意一个折叠按钮（左/右/工具栏）点击都同步收起/展开两侧
    const toggleAllCollapsed = () => {
        const anyExpanded = Array.from(editorCards).some(c => !c.classList.contains('collapsed'));
        setAllCollapsed(anyExpanded);
    };
    document.querySelectorAll('.collapse-btn').forEach(btn => {
        btn.addEventListener('click', toggleAllCollapsed);
    });
    collapseAllBtn.addEventListener('click', toggleAllCollapsed);

    // 合并操作
    acceptAllLeft.addEventListener('click', () => {
        if (!lastDiff) return;
        hunkChoices = hunkChoices.map(() => 'left');
        refreshHunkButtonStates();
        // 批量：闪第一个有左侧输出的 hunk（用于定位）
        let firstHunk = -1;
        for (let h = 0; h < lastDiff.hunks.length; h++) {
            const hk = lastDiff.hunks[h];
            for (let i = hk.startRow; i < hk.endRow; i++) {
                const rr = lastDiff.rows[i];
                if (rr.type === 'equal') continue;
                if (rr.type === 'modify' || rr.type === 'del') { firstHunk = h; break; }
            }
            if (firstHunk >= 0) break;
        }
        renderMerged(firstHunk);
        showToast(t('tdm.toast.all.left'));
    });
    acceptAllRight.addEventListener('click', () => {
        if (!lastDiff) return;
        hunkChoices = hunkChoices.map(() => 'right');
        refreshHunkButtonStates();
        let firstHunk = -1;
        for (let h = 0; h < lastDiff.hunks.length; h++) {
            const hk = lastDiff.hunks[h];
            for (let i = hk.startRow; i < hk.endRow; i++) {
                const rr = lastDiff.rows[i];
                if (rr.type === 'equal') continue;
                if (rr.type === 'modify' || rr.type === 'add') { firstHunk = h; break; }
            }
            if (firstHunk >= 0) break;
        }
        renderMerged(firstHunk);
        showToast(t('tdm.toast.all.right'));
    });
    resetMerge.addEventListener('click', () => {
        if (!lastDiff) return;
        hunkChoices = hunkChoices.map(() => null);
        refreshHunkButtonStates(); renderMerged();
        showToast(t('tdm.toast.reset'));
    });

    copyMerged.addEventListener('click', () => {
        const text = mergedContent.textContent;
        navigator.clipboard.writeText(text).then(() => showToast(t('tdm.toast.copied')))
            .catch(() => {
                const ta = document.createElement('textarea');
                ta.value = text; document.body.appendChild(ta); ta.select();
                try { document.execCommand('copy'); showToast(t('tdm.toast.copied.short')); } catch(_) { showToast(t('tdm.toast.copy.fail')); }
                document.body.removeChild(ta);
            });
    });
    downloadMerged.addEventListener('click', () => {
        const text = mergedContent.textContent;
        const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'merged.txt';
        document.body.appendChild(a); a.click();
        document.body.removeChild(a); URL.revokeObjectURL(url);
    });

    // 同步滚动：左右编辑器联动 + 编辑区中间按钮跟随 + overview + 合并结果联动
    // （合并区已并入编辑区，diffRight 不再滚动）
    leftEditor.addEventListener('scroll', () => onEditorScroll('left'));
    rightEditor.addEventListener('scroll', () => onEditorScroll('right'));

    // 合并结果：内容可滚时拦截滚轮，避免冒泡到外层；到边界放行
    mergedOutput.addEventListener('wheel', (e) => {
        const max = mergedOutput.scrollHeight - mergedOutput.clientHeight;
        if (max <= 0) return;
        const atTop = mergedOutput.scrollTop <= 0 && e.deltaY < 0;
        const atBottom = mergedOutput.scrollTop >= max && e.deltaY > 0;
        if (atTop || atBottom) return;
        e.stopPropagation();
    }, { passive: true });

    // 合并结果手动拉高手柄：上下拖拽调整 max-height，双击复位
    (function bindMergedResizer() {
        const MIN_H = 180, MAX_H = Math.max(560, window.innerHeight * 0.85);
        const DEFAULT_H = 520;
        function currentH() {
            const v = parseFloat(mergedOutput.style.maxHeight);
            return isNaN(v) ? DEFAULT_H : v;
        }
        let dragging = false, startY = 0, startH = 0;
        mergedResizer.addEventListener('mousedown', (e) => {
            dragging = true;
            startY = e.clientY;
            startH = currentH();
            mergedResizer.classList.add('dragging');
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });
        window.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            const delta = e.clientY - startY;
            const h = Math.min(MAX_H, Math.max(MIN_H, startH + delta));
            mergedOutput.style.maxHeight = h + 'px';
        });
        window.addEventListener('mouseup', () => {
            if (!dragging) return;
            dragging = false;
            mergedResizer.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        });
        // 双击复位到默认高度
        mergedResizer.addEventListener('dblclick', () => {
            mergedOutput.style.maxHeight = DEFAULT_H + 'px';
            showToast(t('tdm.toast.reset.height'));
        });
    })();
    // 工具栏总 minimap 点击交互（拖拽 + 点击彩色块跳转）
    (function bindToolbarMinimap() {
        let dragging = false;
        function syncByRatio(ratio) {
            // 滚动左侧编辑器（右侧由 onEditorScroll 按比例联动）
            const leftMax = leftEditor.scrollHeight - leftEditor.clientHeight;
            if (leftMax > 0) leftEditor.scrollTop = ratio * leftMax;
            // 合并结果按比例联动
            const maxMerged = mergedOutput.scrollHeight - mergedOutput.clientHeight;
            if (maxMerged > 0) {
                mergedOutput.scrollTop = ratio * maxMerged;
            }
        }
        function handle(e) {
            if (!lastDiff) return;
            if (e.target.classList.contains('mark')) {
                const idx = parseInt(e.target.dataset.hunkIdx, 10);
                scrollToHunk(idx);
                return;
            }
            const rect = overview.getBoundingClientRect();
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            syncByRatio(ratio);
        }
        overview.addEventListener('click', handle);
        overview.addEventListener('mousedown', e => {
            dragging = true;
            handle(e);
        });
        document.addEventListener('mousemove', e => {
            if (!dragging) return;
            if (!lastDiff) return;
            const rect = overview.getBoundingClientRect();
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            syncByRatio(ratio);
        });
        document.addEventListener('mouseup', () => { dragging = false; });
    })();

    // 键盘快捷键
    document.addEventListener('keydown', e => {
        if (e.altKey && e.key === 'ArrowLeft') { e.preventDefault(); prevHunk.click(); }
        else if (e.altKey && e.key === 'ArrowRight') { e.preventDefault(); nextHunk.click(); }
    });

    // 窗口缩放重排编辑区中间按钮位置
    let resizeT;
    window.addEventListener('resize', () => {
        clearTimeout(resizeT);
        resizeT = setTimeout(() => { if (lastDiff) { placeEditorMergeButtons(lastDiff.hunks); } }, 150);
    });

    // ============================================================
    //  示例数据
    // ============================================================
    sampleBtn.addEventListener('click', () => {
        leftEditor.value = [
            t('tdm.sample.left.comment'),
            'const config = {',
            '  host: "127.0.0.1",',
            '  port: 8080,',
            '  debug: true,',
            '  timeout: 3000,',
            '  features: [',
            '    "auth",',
            '    "logging",',
            '    "cache"',
            '  ],',
            '  retries: 3',
            '};',
            '',
            'function start() {',
            '  console.log("server starting");',
            '}'
        ].join('\n');
        rightEditor.value = [
            t('tdm.sample.right.comment'),
            'const config = {',
            '  host: "0.0.0.0",',
            '  port: 8443,',
            '  debug: false,',
            '  timeout: 5000,',
            '  features: [',
            '    "auth",',
            '    "logging",',
            '    "cache",',
            '    "metrics"',
            '  ],',
            '  retries: 5,',
            '  env: "production"',
            '};',
            '',
            'function start() {',
            '  console.log("server starting on", config.port);',
            '}'
        ].join('\n');
        leftFileBadge.style.display = 'none';
        rightFileBadge.style.display = 'none';
        scheduleDiff(true);
    });

    // 启动后：应用 wrap 选项 + 空态 pre / merged 占位渲染
    syncWrapMode();
    renderLivePre(null);
    renderMerged();
    // 初始聚焦
    leftEditor.focus();

    // 初始化文档标题
    document.title = t('tdm.doc.title');

    // ============================================================
    //  语言切换：更新动态文本
    // ============================================================
    document.addEventListener('languagechange', function () {
        document.title = t('tdm.doc.title');
        // 如果有差异结果，重渲染以刷新所有动态文本（hunk bar、按钮 title、mark title 等）
        if (lastDiff) {
            renderDiff();
            renderMerged();
            renderOverview();
            updateHunkCounter();
            // 刷新统计/行数
            const s = computeStats(lastDiff.rows);
            statEq.textContent = tf('tdm.stat.eq.fmt', { n: s.eq });
            statAdd.textContent = tf('tdm.stat.add.fmt', { n: (s.add + s.mod) });
            statDel.textContent = tf('tdm.stat.del.fmt', { n: (s.del + s.mod) });
            statMod.textContent = tf('tdm.stat.mod.fmt', { n: s.mod });
            leftLineCount.textContent = tf('tdm.linecount.fmt', { n: lastDiff.aLines.length });
            rightLineCount.textContent = tf('tdm.linecount.fmt', { n: lastDiff.bLines.length });
        } else {
            // 空态：刷新占位文本
            statEq.textContent = t('tdm.stat.eq.zero');
            statAdd.textContent = t('tdm.stat.add.zero');
            statDel.textContent = t('tdm.stat.del.zero');
            statMod.textContent = t('tdm.stat.mod.zero');
            hunkCounter.textContent = t('tdm.hunk.count.zero');
            leftLineCount.textContent = t('tdm.linecount.zero');
            rightLineCount.textContent = t('tdm.linecount.zero');
            renderMerged();
        }
        // 刷新折叠按钮文字
        const collapsed = editorWrap.classList.contains('all-collapsed');
        document.querySelectorAll('.editor-card .collapse-btn').forEach(btn => {
            btn.innerHTML = collapsed
                ? '<span class="arrow">▸</span> ' + t('tdm.expand.edit')
                : '<span class="arrow">▾</span> ' + t('tdm.collapse.edit');
        });
        collapseAllBtn.textContent = collapsed ? t('tdm.collapse.expand.input') : t('tdm.collapse.input');
    });
})();
