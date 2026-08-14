/* ============================================================
   Yu_ToolBox 共用主题切换 theme.js
   提供全局 setTheme 函数，并通过 'themechange' 事件通知页面
   页面可监听 document.addEventListener('themechange', fn) 来
   执行主题切换后的自定义逻辑（如重绘图表）
   ============================================================ */

/**
 * 设置主题
 * @param {string} theme - 'light' 或 'dark'
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.textContent = (theme === 'dark') ? '🌙' : '☀️';
    }
    localStorage.setItem('toolbox-theme', theme);
    // 派发主题变更事件，页面可监听此事件重绘图表等
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
}

document.addEventListener('DOMContentLoaded', function () {
    var themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
    // 页面加载时根据当前 data-theme 同步主题图标（解决跨页面跳转图标不继承的问题）
    var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    var themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.textContent = (currentTheme === 'dark') ? '🌙' : '☀️';
    }
});
