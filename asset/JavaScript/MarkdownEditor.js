// ============================================================
//  MarkdownEditor.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
//  此处处理：实时预览 / VSCode 风格编辑器高亮 / 在线·离线渲染切换
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + JS 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    'markdown.doc.title':       { zh: 'Markdown 编辑器', en: 'Markdown Editor' },
    'markdown.page.title':      { zh: '📝 Markdown 编辑器', en: '📝 Markdown Editor' },
    'markdown.subhead':         { zh: '🔹 实时预览 · VSCode 风格代码高亮 · 在线/离线双模式渲染 · 左右分栏', en: '🔹 Live preview · VSCode-style code highlight · online/offline rendering · split-pane' },

    // 工具栏
    'markdown.toolbar.insert':  { zh: '插入', en: 'Insert' },
    'markdown.toolbar.mode':    { zh: '渲染模式', en: 'Render Mode' },
    'markdown.mode.online':     { zh: '🌐 在线', en: '🌐 Online' },
    'markdown.mode.offline':    { zh: '📦 离线', en: '📦 Offline' },
    'markdown.resizer.title':   { zh: '拖动调整编辑/预览宽度', en: 'Drag to resize editor/preview' },
    'markdown.fs.editor':        { zh: '编辑器全屏', en: 'Editor fullscreen' },
    'markdown.fs.preview':       { zh: '预览全屏', en: 'Preview fullscreen' },
    'markdown.fs.editor.restore':{ zh: '退出编辑器全屏', en: 'Exit editor fullscreen' },
    'markdown.fs.preview.restore':{ zh: '退出预览全屏', en: 'Exit preview fullscreen' },
    'markdown.btn.copyMd':      { zh: '📋 复制 MD', en: '📋 Copy MD' },
    'markdown.btn.copyHtml':    { zh: '📄 复制 HTML', en: '📄 Copy HTML' },
    'markdown.btn.exportMd':    { zh: '💾 导出 .md', en: '💾 Export .md' },
    'markdown.btn.exportHtml':  { zh: '📦 导出 HTML', en: '📦 Export HTML' },
    'markdown.btn.sample':      { zh: '✨ 示例', en: '✨ Sample' },
    'markdown.btn.clear':       { zh: '🗑 清空', en: '🗑 Clear' },
    'markdown.btn.exportPdf':   { zh: '📑 导出 PDF', en: '📑 Export PDF' },
    'markdown.btn.toc':         { zh: '📑 目录', en: '📑 TOC' },

    // 快捷插入
    'markdown.q.h1':       { zh: 'H1', en: 'H1' },
    'markdown.q.h2':       { zh: 'H2', en: 'H2' },
    'markdown.q.bold':     { zh: 'B', en: 'B' },
    'markdown.q.italic':   { zh: 'I', en: 'I' },
    'markdown.q.code':     { zh: '代码', en: 'Code' },
    'markdown.q.codeblock':{ zh: '代码块', en: 'Code Block' },
    'markdown.q.link':     { zh: '🔗 链接', en: '🔗 Link' },
    'markdown.q.image':    { zh: '🖼 图片', en: '🖼 Image' },
    'markdown.q.list':     { zh: '列表', en: 'List' },
    'markdown.q.quote':    { zh: '❝ 引用', en: '❝ Quote' },
    'markdown.q.table':    { zh: '表格', en: 'Table' },
    'markdown.q.hr':       { zh: '— 分隔', en: '— HR' },
    'markdown.q.h3':       { zh: 'H3', en: 'H3' },
    'markdown.q.task':     { zh: '任务', en: 'Task' },
    'markdown.q.strike':   { zh: '删除线', en: 'Strike' },
    'markdown.q.mark':     { zh: '高亮', en: 'Mark' },
    'markdown.q.footnote': { zh: '脚注', en: 'Footnote' },
    'markdown.q.details':  { zh: '折叠', en: 'Details' },
    'markdown.q.sup':      { zh: '上标', en: 'Sup' },
    'markdown.q.date':     { zh: '日期', en: 'Date' },

    // 面板
    'markdown.panel.editor': { zh: '📝 Markdown 编辑', en: '📝 Markdown Editor' },
    'markdown.panel.preview':{ zh: '👁 实时预览', en: '👁 Live Preview' },
    'markdown.editor.ph':    { zh: '# 标题\n输入 **Markdown** 文本，右侧实时预览', en: '# Heading\nType **Markdown** here, live preview on the right' },

    // 状态
    'markdown.status.ready':   { zh: '就绪', en: 'Ready' },
    'markdown.status.loading': { zh: '加载中...', en: 'Loading...' },
    'markdown.status.error':   { zh: '错误', en: 'Error' },
    'markdown.status.empty':   { zh: '在左侧输入 Markdown，右侧将实时渲染预览', en: 'Type Markdown on the left to render live preview' },

    // 动态消息
    'markdown.msg.copiedMd':     { zh: '✓ 已复制 Markdown', en: '✓ Markdown copied' },
    'markdown.msg.copiedHtml':   { zh: '✓ 已复制 HTML', en: '✓ HTML copied' },
    'markdown.msg.copyFail':     { zh: '复制失败', en: 'Copy failed' },
    'markdown.msg.loading':      { zh: '正在加载渲染引擎...', en: 'Loading render engine...' },
    'markdown.msg.loaded':       { zh: '渲染引擎就绪', en: 'Render engine ready' },
    'markdown.msg.loadFail':     { zh: '在线加载失败，已切换到离线模式', en: 'Online load failed, switched to offline' },
    'markdown.msg.offlineReady': { zh: '离线模式：使用本地渲染库', en: 'Offline: using local render library' },
    'markdown.msg.renderErr':    { zh: '渲染出错', en: 'Render error' },
    'markdown.msg.savedMd':      { zh: '✓ 已导出 .md', en: '✓ .md exported' },
    'markdown.msg.savedHtml':    { zh: '✓ 已导出 HTML', en: '✓ HTML exported' },
    'markdown.msg.clearWarn':    { zh: '确定清空编辑器内容？', en: 'Clear editor content?' },
    'markdown.msg.noContent':    { zh: '内容为空', en: 'Content is empty' },
    'markdown.title.count':      { zh: '字符 / 词 / 行', en: 'Chars / Words / Lines' },
    'markdown.msg.pdfHint':      { zh: '已打开打印窗口，选择“另存为 PDF”即可', en: 'Print dialog opened — choose "Save as PDF"' },
    'markdown.msg.tocEmpty':     { zh: '没有可生成目录的标题', en: 'No headings found for TOC' },
    'markdown.msg.tocDone':      { zh: '✓ 已插入目录', en: '✓ TOC inserted' },

    // 拖拽导入
    'markdown.drop.hint':       { zh: '📂 拖放文件到此处以导入', en: '📂 Drop files here to import' },
    'markdown.msg.imported':    { zh: '✓ 已导入 {n} 个文件', en: '✓ Imported {n} file(s)' },
    'markdown.msg.importFail':  { zh: '读取文件失败', en: 'Failed to read file' },
    'markdown.msg.fileSkipped': { zh: '仅支持文本文件（.md/.txt/.json 等）', en: 'Only text files supported (.md/.txt/.json, etc.)' },

    'markdown.footer': { zh: '📝 Markdown 编辑器 · 实时预览 · VSCode 风格代码高亮 · 在线(CDN)/离线(本地)双模式', en: '📝 Markdown Editor · live preview · VSCode-style code highlight · online(CDN)/offline(local) modes' }
};

// 翻译辅助
function tt(key) { return window.I18N.t(key) || ''; }

(function () {
    'use strict';

    // ============================================================
    //  DOM 引用
    // ============================================================
    var editor           = document.getElementById('codeEditor');
    var codeGutter       = document.getElementById('codeGutter');
    var codeHighlight    = document.getElementById('codeHighlight');
    var codeHighlightCode = document.getElementById('codeHighlightCode');
    var mdHScroll        = document.getElementById('mdHScroll');
    var mdHScrollThumb   = document.getElementById('mdHScrollThumb');
    var preview       = document.getElementById('preview');
    var previewWrap   = document.getElementById('previewWrap');
    var emptyState    = document.getElementById('emptyState');
    var renderStatus  = document.getElementById('renderStatus');
    var modeOnline    = document.getElementById('modeOnline');
    var modeOffline   = document.getElementById('modeOffline');

    var copyMdBtn     = document.getElementById('copyMdBtn');
    var copyHtmlBtn   = document.getElementById('copyHtmlBtn');
    var exportMdBtn   = document.getElementById('exportMdBtn');
    var exportHtmlBtn = document.getElementById('exportHtmlBtn');
    var sampleBtn     = document.getElementById('sampleBtn');
    var clearBtn      = document.getElementById('clearBtn');
    var quickbar      = document.querySelector('.md-quickbar');
    var mdMain        = document.querySelector('.md-main');
    var mdResizer     = document.getElementById('mdResizer');
    var editorPanel   = document.querySelector('.md-editor-panel');
    var previewPanel  = document.querySelector('.md-preview-panel');
    var fsEditorBtn   = document.getElementById('fsEditorBtn');
    var fsPreviewBtn  = document.getElementById('fsPreviewBtn');
    var exportPdfBtn  = document.getElementById('exportPdfBtn');
    var tocBtn        = document.getElementById('tocBtn');
    var wordCount     = document.getElementById('wordCount');
    var dropOverlay   = document.getElementById('dropOverlay');
    var editorWrap    = document.querySelector('.md-editor-wrap');

    // ============================================================
    //  状态
    // ============================================================
    var currentMode  = 'online';     // 'online' | 'offline'
    var markedReady  = false;
    var hljsReady    = false;
    var libsLoadedFor = null;        // 已为本模式加载完毕的标记
    var previewTimer = null;
    var syncingScroll = false;

    // 在线 CDN / 离线本地 资源地址
    var LIB_URLS = {
        online: {
            marked: 'https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js',
            hljs:   'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/highlight.min.js'
        },
        offline: {
            marked: '../asset/lib/marked.min.js',
            hljs:   '../asset/lib/highlight.min.js'
        }
    };

    // ============================================================
    //  状态徽章
    // ============================================================
    function setStatus(cls, key) {
        if (!renderStatus) return;
        renderStatus.className = 'status-badge ' + cls;
        renderStatus.textContent = tt(key);
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ============================================================
    //  编辑器 VSCode 风格语法高亮（纯前端，离线可用，两模式通用）
    //  textarea 文字透明，下层 <pre> 实时着色，行号栏独立
    // ============================================================
    // 行内元素：行内代码 → 粗体 → 斜体 → 链接/图片
    var INLINE_RE = /(`[^`]+`)|(\*\*[^*]+\*\*)|(__[^_]+__)|(\*[^*\n]+\*)|(_[^_\n]+_)|(!?\[[^\]]*\]\([^)\s]*\))/g;

    function highlightLink(tok) {
        var m = tok.match(/^(!?)\[([^\]]*)\]\(([^)\s]*)\)$/);
        if (!m) return '<span class="md-link">' + escapeHtml(tok) + '</span>';
        var pre = m[1];          // '!' 或 ''
        var text = m[2];
        var url = m[3];
        return (pre ? '<span class="md-emph">!</span>' : '') +
               '<span class="md-link">[' + escapeHtml(text) + ']</span>' +
               '<span class="md-url">(' + escapeHtml(url) + ')</span>';
    }

    function highlightInline(str) {
        var out = '';
        var last = 0;
        var m;
        INLINE_RE.lastIndex = 0;
        while ((m = INLINE_RE.exec(str)) !== null) {
            if (m.index > last) out += escapeHtml(str.slice(last, m.index));
            var tok = m[0];
            if (m[1] !== undefined) {                       // 行内代码
                out += '<span class="md-code">' + escapeHtml(tok) + '</span>';
            } else if (m[2] !== undefined) {                // 粗体 **
                out += '<span class="md-emph">**</span><span class="md-bold">' +
                    escapeHtml(tok.slice(2, -2)) + '</span><span class="md-emph">**</span>';
            } else if (m[3] !== undefined) {                // 粗体 __
                out += '<span class="md-emph">__</span><span class="md-bold">' +
                    escapeHtml(tok.slice(2, -2)) + '</span><span class="md-emph">__</span>';
            } else if (m[4] !== undefined) {                // 斜体 *
                out += '<span class="md-emph">*</span><span class="md-italic">' +
                    escapeHtml(tok.slice(1, -1)) + '</span><span class="md-emph">*</span>';
            } else if (m[5] !== undefined) {                // 斜体 _
                out += '<span class="md-emph">_</span><span class="md-italic">' +
                    escapeHtml(tok.slice(1, -1)) + '</span><span class="md-emph">_</span>';
            } else if (m[6] !== undefined) {                // 链接/图片
                out += highlightLink(tok);
            }
            last = m.index + tok.length;
        }
        if (last < str.length) out += escapeHtml(str.slice(last));
        return out;
    }

    // 将表格行中的分隔符 `|` 着色
    function highlightTableRow(line) {
        // 先整体做行内高亮，再把独立的 | 包成 md-table
        var html = highlightInline(line);
        html = html.replace(/\|/g, '<span class="md-table">|</span>');
        return html;
    }

    function renderHighlight() {
        if (!editor || !codeHighlightCode || !codeGutter) return;
        var text = editor.value;
        var lines = text.split('\n');
        var html = '';
        var inFence = false;
        var i, line, inner;
        for (i = 0; i < lines.length; i++) {
            line = lines[i];
            if (inFence) {
                if (/^\s*```/.test(line)) {
                    inFence = false;
                    inner = '<span class="md-fence">' + escapeHtml(line) + '</span>';
                } else {
                    inner = '<span class="md-code">' + escapeHtml(line) + '</span>';
                }
            } else if (/^\s*```/.test(line)) {
                inFence = true;
                inner = '<span class="md-fence">' + escapeHtml(line) + '</span>';
            } else if (/^\s{0,3}#{1,6}(\s.*)?$/.test(line)) {
                inner = '<span class="md-heading">' + escapeHtml(line) + '</span>';
            } else if (/^\s*([*\-_])(\s*\1){2,}\s*$/.test(line)) {
                inner = '<span class="md-hr">' + escapeHtml(line) + '</span>';
            } else if (/^\s*>/.test(line)) {
                inner = '<span class="md-quote">' + highlightInline(line.replace(/^\s*>/, '> ')) + '</span>';
            } else if (/^\s*([-*+]|\d+[.)])(\s+)/.test(line)) {
                // 列表标记着色 + 列表内容行内高亮
                inner = line.replace(/^(\s*)([-*+]|(\d+[.)]))(\s+)([\s\S]*)$/, function (_, sp, mk, num, ws, content) {
                    return escapeHtml(sp) + '<span class="md-list">' + escapeHtml(num ? num : mk) + '</span>' +
                        escapeHtml(ws) + highlightInline(content);
                });
            } else if (line.indexOf('|') !== -1 && /\|/.test(line)) {
                inner = highlightTableRow(line);
            } else {
                inner = highlightInline(line);
            }
            html += '<span class="line">' + inner + '</span>\n';
        }
        codeHighlightCode.innerHTML = html;

        // 行号
        codeGutter.textContent = '';
        for (i = 1; i <= lines.length; i++) {
            codeGutter.textContent += i + '\n';
        }
    }

    function syncEditorScroll() {
        if (!editor || !codeHighlight || !codeGutter) return;
        codeHighlight.style.transform =
            'translate(' + (-editor.scrollLeft) + 'px, ' + (-editor.scrollTop) + 'px)';
        codeGutter.style.transform =
            'translateY(' + (-editor.scrollTop) + 'px)';
        syncHScroll();
    }

    // ===== 底部横向滚动条 =====
    function syncHScroll() {
        if (!editor || !mdHScroll || !mdHScrollThumb) return;
        var scrollable = editor.scrollWidth - editor.clientWidth;
        if (scrollable <= 1) {
            mdHScroll.style.display = 'none';
            return;
        }
        mdHScroll.style.display = 'block';
        var track = mdHScroll.clientWidth || 1;
        var thumbW = Math.max(28, track * (editor.clientWidth / editor.scrollWidth));
        mdHScrollThumb.style.width = thumbW + 'px';
        var maxLeft = Math.max(0, track - thumbW);
        var left = maxLeft * (editor.scrollLeft / scrollable);
        mdHScrollThumb.style.left = left + 'px';
    }

    function initHScrollDrag() {
        if (!mdHScroll || !mdHScrollThumb || !editor) return;
        var dragging = false, startX = 0, startLeft = 0, scrollable = 0;

        function onDown(e) {
            if ((mdHScroll.style.display === 'none')) return;
            scrollable = editor.scrollWidth - editor.clientWidth;
            if (scrollable <= 1) return;
            e.preventDefault();
            dragging = true;
            startX = (e.clientX !== undefined ? e.clientX : e.touches[0].clientX);
            startLeft = parseFloat(mdHScrollThumb.style.left) || 0;
            mdHScrollThumb.classList.add('dragging');
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
            document.addEventListener('touchmove', onMove, { passive: false });
            document.addEventListener('touchend', onUp);
        }
        function onMove(e) {
            if (!dragging) return;
            e.preventDefault();
            var x = (e.clientX !== undefined ? e.clientX : e.touches[0].clientX);
            var track = mdHScroll.clientWidth;
            var thumbW = mdHScrollThumb.offsetWidth;
            var maxLeft = Math.max(0, track - thumbW);
            var left = Math.min(maxLeft, Math.max(0, startLeft + (x - startX)));
            mdHScrollThumb.style.left = left + 'px';
            // 换算为 textarea 的 scrollLeft
            var ratio = (scrollable > 0) ? (left / maxLeft) * scrollable : 0;
            editor.scrollLeft = ratio;
            editor.dispatchEvent(new Event('scroll', { bubbles: true }));
        }
        function onUp() {
            if (!dragging) return;
            dragging = false;
            mdHScrollThumb.classList.remove('dragging');
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onUp);
        }
        mdHScroll.addEventListener('mousedown', onDown);
        mdHScroll.addEventListener('touchstart', onDown, { passive: false });
    }

    // ============================================================
    //  加载 marked + highlight.js（在线 CDN / 离线本地）
    // ============================================================
    function loadScript(id, src, onload, onerror) {
        var old = document.getElementById(id);
        if (old) {
            // 同地址已加载
            if (old.getAttribute('src') === src && window.marked && window.hljs) { onload(); return; }
            old.parentNode.removeChild(old);
        }
        var s = document.createElement('script');
        s.id = id;
        s.src = src;
        s.onload = onload;
        s.onerror = onerror;
        document.body.appendChild(s);
    }

    function loadLibs() {
        if (libsLoadedFor === currentMode && markedReady && hljsReady) {
            renderPreview();
            return;
        }
        setStatus('rendering', 'markdown.msg.loading');
        var urls = LIB_URLS[currentMode];

        // marked
        loadScript('mdLibMarked', urls.marked,
            function () { markedReady = true; tryReady(); },
            function () { if (currentMode === 'online') setMode('offline'); }
        );
        // highlight.js
        loadScript('mdLibHljs', urls.hljs,
            function () { hljsReady = true; tryReady(); },
            function () { if (currentMode === 'online') setMode('offline'); }
        );
    }

    function tryReady() {
        if (markedReady && hljsReady) {
            libsLoadedFor = currentMode;
            setStatus('ready', currentMode === 'offline' ? 'markdown.msg.offlineReady' : 'markdown.msg.loaded');
            renderPreview();
        }
    }

    // ============================================================
    //  实时预览渲染
    // ============================================================
    function renderPreview() {
        if (!editor || !preview) return;
        var text = editor.value;

        // 空内容：显示空状态
        if (!text.trim()) {
            if (emptyState) emptyState.classList.add('show');
            preview.innerHTML = '';
            return;
        }
        if (emptyState) emptyState.classList.remove('show');

        try {
            if (typeof window.marked === 'undefined') {
                setStatus('rendering', 'markdown.msg.loading');
                return;
            }
            var html = window.marked.parse(text, { gfm: true, breaks: true });
            preview.innerHTML = html;
            assignHeadingIds(preview);

            // VSCode 风格代码高亮（仅在 hljs 就绪时）
            if (window.hljs) {
                var blocks = preview.querySelectorAll('pre code');
                for (var i = 0; i < blocks.length; i++) {
                    try { window.hljs.highlightElement(blocks[i]); } catch (e) { /* 跳过单块异常 */ }
                }
            }
        } catch (e) {
            preview.innerHTML = '<div class="md-error-msg">' + escapeHtml(tt('markdown.msg.renderErr') + ': ' + e.message) + '</div>';
            setStatus('error', 'markdown.msg.renderErr');
        }
    }

    // 为标题生成锚点 id（供「目录」链接跳转）
    function slugify(text) {
        return text.trim().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\u4e00-\u9fa5-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || 'section';
    }
    function assignHeadingIds(root) {
        var heads = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
        var seen = {};
        for (var i = 0; i < heads.length; i++) {
            var base = slugify(heads[i].textContent);
            var id = base, n = 2;
            while (seen[id]) { id = base + '-' + n; n++; }
            seen[id] = true;
            heads[i].id = id;
        }
    }

    function schedulePreview() {
        clearTimeout(previewTimer);
        previewTimer = setTimeout(renderPreview, 140);
    }

    // ============================================================
    //  编辑器输入处理
    // ============================================================
    function onEditorInput() {
        renderHighlight();
        syncEditorScroll();
        schedulePreview();
        updateCount();
    }

    function handleEditorTab(e) {
        if (e.key !== 'Tab') return;
        e.preventDefault();
        var s = editor.selectionStart, end = editor.selectionEnd;
        editor.value = editor.value.slice(0, s) + '    ' + editor.value.slice(end);
        editor.selectionStart = editor.selectionEnd = s + 4;
        onEditorInput();
    }

    // ============================================================
    //  模式切换（参考流程图工具）
    // ============================================================
    function setMode(mode) {
        if (currentMode === mode && libsLoadedFor === mode) return;
        currentMode = mode;
        modeOnline.classList.toggle('active', mode === 'online');
        modeOffline.classList.toggle('active', mode === 'offline');
        // 重新加载渲染引擎
        markedReady = false;
        hljsReady = false;
        libsLoadedFor = null;
        // 清理旧脚本以避免缓存干扰
        var oldM = document.getElementById('mdLibMarked'); if (oldM) oldM.parentNode.removeChild(oldM);
        var oldH = document.getElementById('mdLibHljs'); if (oldH) oldH.parentNode.removeChild(oldH);
        loadLibs();
    }

    // ============================================================
    //  快捷插入
    // ============================================================
    function wrapSelection(before, after, placeholder) {
        var s = editor.selectionStart, e = editor.selectionEnd;
        var sel = editor.value.slice(s, e) || placeholder;
        editor.value = editor.value.slice(0, s) + before + sel + after + editor.value.slice(e);
        editor.selectionStart = s + before.length;
        editor.selectionEnd = s + before.length + sel.length;
        editor.focus();
        onEditorInput();
    }

    function lineStartIndex() {
        return editor.value.lastIndexOf('\n', editor.selectionStart - 1) + 1;
    }

    function insertAtLineStart(prefix) {
        var ls = lineStartIndex();
        editor.value = editor.value.slice(0, ls) + prefix + editor.value.slice(ls);
        editor.selectionStart = editor.selectionEnd = ls + prefix.length;
        editor.focus();
        onEditorInput();
    }

    function insertAtCursor(text, cursorOffset) {
        var s = editor.selectionStart, e = editor.selectionEnd;
        editor.value = editor.value.slice(0, s) + text + editor.value.slice(e);
        var pos = s + (cursorOffset !== undefined ? cursorOffset : text.length);
        editor.selectionStart = editor.selectionEnd = pos;
        editor.focus();
        onEditorInput();
    }

    var TABLE_SAMPLE =
        '\n| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| A | B | C |\n| 1 | 2 | 3 |\n';
    var CODEBLOCK_SAMPLE =
        '\n```js\nfunction hello() {\n  console.log("Hello, Yu_ToolBox");\n}\n```\n';

    function handleQuick(kind) {
        switch (kind) {
            case 'h1': insertAtLineStart('# '); break;
            case 'h2': insertAtLineStart('## '); break;
            case 'bold': wrapSelection('**', '**', tt('markdown.q.bold')); break;
            case 'italic': wrapSelection('*', '*', tt('markdown.q.italic')); break;
            case 'code': wrapSelection('`', '`', 'code'); break;
            case 'codeblock': insertAtCursor(CODEBLOCK_SAMPLE, CODEBLOCK_SAMPLE.indexOf('console')); break;
            case 'link': wrapSelection('[', '](https://)', tt('markdown.q.link')); break;
            case 'image': wrapSelection('![', '](https://)', 'alt'); break;
            case 'list': insertAtLineStart('- '); break;
            case 'quote': insertAtLineStart('> '); break;
            case 'table': insertAtCursor(TABLE_SAMPLE); break;
            case 'hr': insertAtCursor('\n---\n'); break;
            case 'h3': insertAtLineStart('### '); break;
            case 'task': insertAtLineStart('- [ ] '); break;
            case 'strike': wrapSelection('~~', '~~', tt('markdown.q.strike')); break;
            case 'mark': wrapSelection('<mark>', '</mark>', tt('markdown.q.mark')); break;
            case 'footnote': insertAtCursor('\n[^1] 参考文字\n\n[^1]: 脚注说明\n'); break;
            case 'details': insertAtCursor('\n<details>\n<summary>' + tt('markdown.q.details') + '</summary>\n\n内容\n\n</details>\n'); break;
            case 'sup': wrapSelection('<sup>', '</sup>', tt('markdown.q.sup')); break;
            case 'date': {
                var d = new Date();
                var ds = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
                insertAtCursor(ds);
                break;
            }
            default: break;
        }
    }

    // ============================================================
    //  复制 / 导出
    // ============================================================
    function copyText(text, okKey, failKey) {
        if (!text) { flashStatus('error', 'markdown.msg.noContent'); return; }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(
                function () { flashStatus('ready', okKey); },
                function () { fallbackCopy(text, okKey, failKey); }
            );
        } else {
            fallbackCopy(text, okKey, failKey);
        }
    }

    function fallbackCopy(text, okKey, failKey) {
        try {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            flashStatus('ready', okKey);
        } catch (e) {
            flashStatus('error', failKey);
        }
    }

    // 临时提示后恢复渲染状态
    var statusTimer = null;
    function showMsg(cls, text) {
        if (!renderStatus) return;
        renderStatus.className = 'status-badge ' + cls;
        renderStatus.textContent = text;
    }
    function scheduleStatusReset() {
        clearTimeout(statusTimer);
        statusTimer = setTimeout(function () {
            showMsg('ready', tt(currentMode === 'offline' ? 'markdown.msg.offlineReady' : 'markdown.msg.loaded'));
        }, 1600);
    }
    function flashStatus(cls, key) {
        showMsg(cls, tt(key));
        scheduleStatusReset();
    }
    function flashStatusText(cls, text) {
        showMsg(cls, text);
        clearTimeout(statusTimer);
        statusTimer = setTimeout(function () {
            showMsg('ready', tt(currentMode === 'offline' ? 'markdown.msg.offlineReady' : 'markdown.msg.loaded'));
        }, 2200);
    }

    function downloadFile(filename, content, mime) {
        var blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    function exportHtml() {
        var body = preview.innerHTML;
        var theme = document.documentElement.getAttribute('data-theme');
        var doc =
            '<!DOCTYPE html>\n<html lang="zh-CN" data-theme="' + (theme || 'light') + '">\n' +
            '<head><meta charset="UTF-8"><title>Markdown Export</title>' +
            '<style>body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;' +
            'max-width:860px;margin:40px auto;padding:0 20px;line-height:1.75;color:#1f2933;}' +
            'pre{background:#f6f8fa;border-radius:10px;padding:14px 16px;overflow:auto;}' +
            'code{font-family:Consolas,monospace;background:#f1f3f7;padding:.15em .4em;border-radius:5px;}' +
            'pre code{background:transparent;padding:0;}blockquote{border-left:4px solid #cbd5e1;' +
            'padding:.4em 1em;color:#52606d;margin:.8em 0;}table{border-collapse:collapse;width:100%;}' +
            'th,td{border:1px solid #e2e8f0;padding:7px 12px;}img{max-width:100%;}' +
            'a{color:#1672c7;}</style></head>\n<body>\n' + body + '\n</body>\n</html>';
        downloadFile('markdown-export.html', doc, 'text/html;charset=utf-8');
        flashStatus('ready', 'markdown.msg.savedHtml');
    }

    // 实时字数统计（字符 / 词 / 行）
    function updateCount() {
        if (!wordCount || !editor) return;
        var v = editor.value;
        var chars = v.replace(/\s/g, '').length;
        var words = v.trim() ? v.trim().split(/\s+/).length : 0;
        var lines = v.length ? v.split('\n').length : 0;
        wordCount.textContent = chars + ' 字符 · ' + words + ' 词 · ' + lines + ' 行';
    }

    // 生成目录（基于当前标题，链接到渲染后的锚点）
    function insertToc() {
        var lines = editor.value.split('\n');
        var items = [];
        for (var i = 0; i < lines.length; i++) {
            var m = /^(#{1,6})\s+(.*)$/.exec(lines[i]);
            if (m) {
                var level = m[1].length;
                var text = m[2].trim();
                var indent = '';
                for (var k = 0; k < level - 1; k++) indent += '  ';
                items.push(indent + '- [' + text + '](#' + slugify(text) + ')');
            }
        }
        if (!items.length) { flashStatus('error', 'markdown.msg.tocEmpty'); return; }
        var toc = '## 目录\n\n' + items.join('\n') + '\n';
        insertAtCursor('\n' + toc + '\n');
        flashStatus('ready', 'markdown.msg.tocDone');
    }

    // 导出 PDF：调用浏览器打印，在对话框中选择“另存为 PDF”
    function exportPdf() {
        if (!preview.innerHTML.trim()) { flashStatus('error', 'markdown.msg.noContent'); return; }
        window.print();
        flashStatus('ready', 'markdown.msg.pdfHint');
    }

    // ============================================================
    //  示例 / 清空
    // ============================================================
    var SAMPLE = [
        '# 📝 Yu_ToolBox Markdown 示例',
        '',
        '这是一个 **加粗**、*斜体* 与 `行内代码` 的演示。',
        '',
        '## 代码高亮（VSCode 风格）',
        '',
        '```javascript',
        'function greet(name) {',
        '  const msg = `Hello, ${name}!`;',
        '  console.log(msg);',
        '  return msg.length;',
        '}',
        '```',
        '',
        '```python',
        'def fib(n):',
        '    a, b = 0, 1',
        '    for _ in range(n):',
        '        a, b = b, a + b',
        '    return a',
        '```',
        '',
        '## 列表',
        '',
        '- 支持无序列表',
        '- 支持 **嵌套** 与 `代码`',
        '  - 子项 A',
        '  - 子项 B',
        '',
        '1. 有序列表一',
        '2. 有序列表二',
        '',
        '- [x] 已完成任务',
        '- [ ] 待办任务',
        '',
        '> 引用：嵌入式开发中，工具链的效率直接影响开发体验。',
        '',
        '## 表格',
        '',
        '| 外设 | 接口 | 速率 |',
        '| --- | --- | --- |',
        '| UART | 异步 | 115200 |',
        '| I2C | 同步 | 400kHz |',
        '| SPI | 同步 | 10MHz |',
        '',
        '## 链接与图片',
        '',
        '访问 [Yu_ToolBox](https://yu-admin123.github.io) 了解更多。',
        '',
        '---',
        '',
        '> 提示：切换右上角「在线 / 离线」可对比两种渲染模式。'
    ].join('\n');

    function loadSample() {
        editor.value = SAMPLE;
        onEditorInput();
        flashStatus('ready', 'markdown.msg.loaded');
    }

    function clearEditor() {
        if (!editor.value) return;
        if (!confirm(tt('markdown.msg.clearWarn'))) return;
        editor.value = '';
        onEditorInput();
    }

    // ============================================================
    //  滚动联动（编辑器 ↔ 预览）
    // ============================================================
    function syncScroll(src) {
        if (syncingScroll) return;
        syncingScroll = true;
        if (src === 'editor') {
            var ratio = editor.scrollTop / ((editor.scrollHeight - editor.clientHeight) || 1);
            previewWrap.scrollTop = ratio * (previewWrap.scrollHeight - previewWrap.clientHeight);
        } else {
            var r = previewWrap.scrollTop / ((previewWrap.scrollHeight - previewWrap.clientHeight) || 1);
            editor.scrollTop = r * (editor.scrollHeight - editor.clientHeight);
        }
        requestAnimationFrame(function () { syncingScroll = false; });
    }

    // ============================================================
    //  左右分栏拖动调整宽度（持久化到 localStorage）
    // ============================================================
    var SPLIT_KEY = 'md-split-ratio';

    function applySplit(ratio) {
        ratio = Math.max(20, Math.min(80, ratio));   // 限制 20%~80% 之间
        if (editorPanel) editorPanel.style.flexBasis = ratio + '%';
        if (mdMain) mdMain.style.setProperty('--md-split', ratio);
    }

    (function initSplit() {
        var saved = parseFloat(localStorage.getItem(SPLIT_KEY));
        if (!isNaN(saved)) applySplit(saved);
    })();

    if (mdResizer && mdMain && editorPanel) {
        var dragging = false;
        mdResizer.addEventListener('pointerdown', function (e) {
            e.preventDefault();
            dragging = true;
            mdResizer.classList.add('active');
            document.body.classList.add('md-resizing');
            if (mdResizer.setPointerCapture) {
                try { mdResizer.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
            }
        });
        window.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var rect = mdMain.getBoundingClientRect();
            if (!rect.width) return;
            var x = e.clientX - rect.left;
            var ratio = x / rect.width * 100;
            applySplit(ratio);
        });
        window.addEventListener('pointerup', function () {
            if (!dragging) return;
            dragging = false;
            mdResizer.classList.remove('active');
            document.body.classList.remove('md-resizing');
            var cur = parseFloat(editorPanel.style.flexBasis);
            if (!isNaN(cur)) localStorage.setItem(SPLIT_KEY, cur);
        });
        // 双击分隔条：恢复 50/50
        mdResizer.addEventListener('dblclick', function () {
            applySplit(50);
            localStorage.setItem(SPLIT_KEY, 50);
        });
    }

    // ============================================================
    //  全屏切换（某一框占满 / 再次点击复原对称布局）
    // ============================================================
    var fsState = 'none';   // 'none' | 'editor' | 'preview'

    function currentRatio() {
        var b = parseFloat(editorPanel.style.flexBasis);
        return isNaN(b) ? 50 : b;
    }

    function updateFsButtons() {
        var eActive = fsState === 'editor';
        var pActive = fsState === 'preview';
        if (fsEditorBtn) {
            fsEditorBtn.classList.toggle('active', eActive);
            fsEditorBtn.setAttribute('title', tt(eActive ? 'markdown.fs.editor.restore' : 'markdown.fs.editor'));
        }
        if (fsPreviewBtn) {
            fsPreviewBtn.classList.toggle('active', pActive);
            fsPreviewBtn.setAttribute('title', tt(pActive ? 'markdown.fs.preview.restore' : 'markdown.fs.preview'));
        }
    }

    function setFullscreen(target) {
        fsState = target;
        mdMain.classList.toggle('fs-editor', target === 'editor');
        mdMain.classList.toggle('fs-preview', target === 'preview');
        // 清除内联 flex-basis，避免覆盖全屏 CSS（flex:1 1 0）
        editorPanel.style.flexBasis = '';
        previewPanel.style.flexBasis = '';
        if (target === 'none') {
            applySplit(50);                 // 复原两边对称布局
            localStorage.setItem(SPLIT_KEY, 50);
        }
        updateFsButtons();
    }

    if (fsEditorBtn) {
        fsEditorBtn.addEventListener('click', function () {
            setFullscreen(fsState === 'editor' ? 'none' : 'editor');
        });
    }
    if (fsPreviewBtn) {
        fsPreviewBtn.addEventListener('click', function () {
            setFullscreen(fsState === 'preview' ? 'none' : 'preview');
        });
    }

    // ============================================================
    //  拖拽文件导入（将文件内容导入编辑器）
    // ============================================================
    var dragDepth = 0;   // 计数处理子元素 enter/leave，避免遮罩闪烁

    // 仅接受文本类文件（含常见标记语言/数据格式扩展名兜底）
    function isTextFile(file) {
        if (file.type && file.type.indexOf('text/') === 0) return true;
        return /\.(md|markdown|mdx?|txt|json|csv|tsv|yml|yaml|tex|rst|adoc|org|html?|xml)$/i.test(file.name);
    }

    function readFileText(file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () {
                resolve({ name: file.name, text: String(reader.result || '') });
            };
            reader.onerror = function () { reject(file.name); };
            reader.readAsText(file);
        });
    }

    // 将导入文本写入编辑器：当前为空则直接放置，否则追加并空行分隔
    function insertImported(text) {
        if (!editor) return;
        var cur = editor.value;
        if (!cur.trim()) {
            editor.value = text;
        } else {
            editor.value = cur.replace(/\s+$/, '') + '\n\n' + text;
        }
        editor.selectionStart = editor.selectionEnd = editor.value.length;
        editor.focus();
        onEditorInput();
    }

    async function handleDrop(e) {
        e.preventDefault();
        dragDepth = 0;
        if (dropOverlay) dropOverlay.classList.remove('show');
        var files = e.dataTransfer && e.dataTransfer.files;
        if (!files || !files.length) return;
        var list = Array.prototype.slice.call(files);
        var textFiles = list.filter(isTextFile);
        if (!textFiles.length) {
            flashStatus('error', 'markdown.msg.fileSkipped');
            return;
        }
        try {
            var results = await Promise.all(textFiles.map(readFileText));
            // 多个文件用空行分隔拼接
            var importText = results.map(function (r) { return r.text; }).join('\n\n');
            insertImported(importText);
            var label = tt('markdown.msg.imported').replace(/\{n\}/g, String(results.length));
            flashStatusText('ready', label);
        } catch (err) {
            flashStatus('error', 'markdown.msg.importFail');
        }
    }

    function bindDragImport() {
        if (!editorWrap) return;
        var hasFiles = function (dt) {
            return dt && Array.prototype.indexOf.call(dt.types || [], 'Files') !== -1;
        };
        editorWrap.addEventListener('dragenter', function (e) {
            if (!hasFiles(e.dataTransfer)) return;
            e.preventDefault();
            dragDepth++;
            if (dropOverlay) dropOverlay.classList.add('show');
        });
        editorWrap.addEventListener('dragover', function (e) {
            if (!hasFiles(e.dataTransfer)) return;
            e.preventDefault();
            if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        });
        editorWrap.addEventListener('dragleave', function () {
            dragDepth = Math.max(0, dragDepth - 1);
            if (dragDepth === 0 && dropOverlay) dropOverlay.classList.remove('show');
        });
        editorWrap.addEventListener('drop', handleDrop);
    }
    bindDragImport();

    // 阻止在页面其它区域误拖文件时浏览器直接打开文件（仅对文件拖拽生效）
    document.addEventListener('dragover', function (e) {
        if (e.dataTransfer && Array.prototype.indexOf.call(e.dataTransfer.types || [], 'Files') !== -1) e.preventDefault();
    });
    document.addEventListener('drop', function (e) {
        if (e.dataTransfer && Array.prototype.indexOf.call(e.dataTransfer.types || [], 'Files') !== -1) e.preventDefault();
    });

    // ============================================================
    //  事件绑定
    // ============================================================
    if (editor) {
        editor.addEventListener('input', onEditorInput);
        editor.addEventListener('scroll', function () { syncEditorScroll(); syncScroll('editor'); });
        editor.addEventListener('keydown', handleEditorTab);
    }
    if (previewWrap) {
        previewWrap.addEventListener('scroll', function () { syncScroll('preview'); });
    }

    if (modeOnline) modeOnline.addEventListener('click', function () { setMode('online'); });
    if (modeOffline) modeOffline.addEventListener('click', function () { setMode('offline'); });

    if (quickbar) {
        quickbar.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-quick]');
            if (btn) handleQuick(btn.getAttribute('data-quick'));
        });
    }

    if (copyMdBtn) copyMdBtn.addEventListener('click', function () {
        copyText(editor.value, 'markdown.msg.copiedMd', 'markdown.msg.copyFail');
    });
    if (copyHtmlBtn) copyHtmlBtn.addEventListener('click', function () {
        copyText(preview.innerHTML, 'markdown.msg.copiedHtml', 'markdown.msg.copyFail');
    });
    if (exportMdBtn) exportMdBtn.addEventListener('click', function () {
        downloadFile('document.md', editor.value, 'text/markdown;charset=utf-8');
        flashStatus('ready', 'markdown.msg.savedMd');
    });
    if (exportHtmlBtn) exportHtmlBtn.addEventListener('click', exportHtml);
    if (sampleBtn) sampleBtn.addEventListener('click', loadSample);
    if (clearBtn) clearBtn.addEventListener('click', clearEditor);
    if (exportPdfBtn) exportPdfBtn.addEventListener('click', exportPdf);
    if (tocBtn) tocBtn.addEventListener('click', insertToc);

    // 主题切换：重渲染预览（代码块 VSCode 主题随 CSS 变量自动切换，重渲染确保一致）
    document.addEventListener('themechange', function () {
        renderPreview();
    });

    // 语言切换：刷新动态文本并重新渲染
    document.addEventListener('languagechange', function () {
        document.title = tt('markdown.doc.title');
        setStatus('ready', currentMode === 'offline' ? 'markdown.msg.offlineReady' : 'markdown.msg.loaded');
        updateFsButtons();
        renderPreview();
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.title = tt('markdown.doc.title');
    renderHighlight();
    syncEditorScroll();
    initHScrollDrag();
    updateCount();
    if (emptyState) emptyState.classList.toggle('show', !editor.value.trim());
    loadLibs();
})();
