/* ============================================================
   Yu_ToolBox 共用语言切换 i18n.js
   提供全局 setLang / toggleLang 函数，通过 'languagechange'
   事件通知页面。页面文本使用 data-i18n 属性标记，切换时
   自动更新；动态文本由页面 JS 监听 languagechange 事件更新。
   翻译字典由各页面定义在 window.I18N_STRINGS 上。
   ============================================================ */

(function () {
    var STORAGE_KEY = 'toolbox-lang';
    var SUPPORTED_LANGS = ['zh', 'en'];
    var DEFAULT_LANG = 'zh';

    /** 获取当前语言 */
    function getLang() {
        var saved = localStorage.getItem(STORAGE_KEY);
        return (SUPPORTED_LANGS.indexOf(saved) !== -1) ? saved : DEFAULT_LANG;
    }

    /** 根据 key + 语言获取翻译文本 */
    function getTranslation(key, lang) {
        var dict = window.I18N_STRINGS || {};
        var entry = dict[key];
        if (!entry) return null;
        if (typeof entry === 'string') return entry;
        return entry[lang] || entry['zh'] || null;
    }

    /** 应用所有 data-i18n 标记的元素翻译 */
    function applyTranslations(lang) {
        // 普通文本
        var nodes = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < nodes.length; i++) {
            var key = nodes[i].getAttribute('data-i18n');
            var text = getTranslation(key, lang);
            if (text !== null) nodes[i].textContent = text;
        }
        // placeholder
        var phNodes = document.querySelectorAll('[data-i18n-placeholder]');
        for (var j = 0; j < phNodes.length; j++) {
            var phKey = phNodes[j].getAttribute('data-i18n-placeholder');
            var phText = getTranslation(phKey, lang);
            if (phText !== null) phNodes[j].setAttribute('placeholder', phText);
        }
        // title 属性
        var tNodes = document.querySelectorAll('[data-i18n-title]');
        for (var k = 0; k < tNodes.length; k++) {
            var tKey = tNodes[k].getAttribute('data-i18n-title');
            var tText = getTranslation(tKey, lang);
            if (tText !== null) tNodes[k].setAttribute('title', tText);
        }
    }

    /** 更新切换按钮显示 */
    function updateLangToggle(lang) {
        var toggle = document.getElementById('langToggle');
        if (!toggle) return;
        var label = toggle.querySelector('.lang-label');
        if (label) {
            // 显示“另一种语言”的名称：当前中文则显示 EN，当前英文则显示 中文
            label.textContent = (lang === 'zh') ? 'EN' : '中文';
        }
    }

    /** 设置语言并派发事件 */
    function setLang(lang) {
        if (SUPPORTED_LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
        applyTranslations(lang);
        updateLangToggle(lang);
        document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
    }

    /** 切换中英文 */
    function toggleLang() {
        setLang(getLang() === 'zh' ? 'en' : 'zh');
    }

    document.addEventListener('DOMContentLoaded', function () {
        var lang = getLang();
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
        applyTranslations(lang);
        updateLangToggle(lang);
        var toggle = document.getElementById('langToggle');
        if (toggle) {
            toggle.addEventListener('click', toggleLang);
        }
    });

    // 暴露 API
    window.I18N = {
        getLang: getLang,
        setLang: setLang,
        toggleLang: toggleLang,
        applyTranslations: applyTranslations,
        /** 翻译函数，供页面 JS 动态文本使用 */
        t: function (key) {
            return getTranslation(key, getLang());
        }
    };
})();
