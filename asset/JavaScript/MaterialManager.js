// ============================================================
//  MaterialManager.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
//  物料管家：盒子/物料的增删改查、批量编辑、搜索过滤、
//            低库存预警、CSV/JSON 导入导出、localStorage 持久化
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    // 公共
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    // 文档标题 / 页面标题
    'mat.doc.title':  { zh: '物料管理', en: 'Material Manager' },
    'mat.page.title': { zh: '📦 物料管理', en: '📦 Material Manager' },
    'mat.subhead':    { zh: '🔹 嵌入式电子物料的入库、盘点与低库存预警', en: '🔹 Track electronic components, stocktake and low-stock alerts' },

    // 顶部操作 + 工具栏
    'mat.btn.addBox':    { zh: '➕ 新建物料盒', en: '➕ New Box' },
    'mat.btn.exportCsv': { zh: '📤 导出 CSV', en: '📤 Export CSV' },
    'mat.btn.backup':    { zh: '💾 备份 JSON', en: '💾 Backup JSON' },
    'mat.btn.importCsv': { zh: '📥 导入 CSV', en: '📥 Import CSV' },
    'mat.btn.restore':   { zh: '🔄 恢复 JSON', en: '🔄 Restore JSON' },
    'mat.btn.print':     { zh: '🖨️ 打印清单', en: '🖨️ Print List' },
    'mat.btn.resetDemo': { zh: '🔄 重置示例', en: '🔄 Reset Demo' },
    'mat.btn.clearAll':  { zh: '🗑️ 清空全部', en: '🗑️ Clear All' },
    'mat.search.ph':     { zh: '🔍 搜索名称/型号/位置...', en: '🔍 Search name/model/location...' },
    'mat.stat.low':      { zh: '低库存', en: 'Low Stock' },
    'mat.stat.boxes':    { zh: '物料盒', en: 'Boxes' },
    'mat.stat.kinds':    { zh: '物料种类', en: 'Kinds' },
    'mat.stat.cat':      { zh: '分类数', en: 'Categories' },
    'mat.alerts.title':  { zh: '⚠️ 低库存预警', en: '⚠️ Low Stock Alerts' },
    'mat.ok.located':    { zh: '已定位：{name}', en: 'Located: {name}' },
    'mat.filter.catAll': { zh: '📂 全部分类', en: '📂 All Categories' },
    'mat.filter.stockAll': { zh: '📊 全部库存', en: '📊 All Stock' },
    'mat.filter.stockLow': { zh: '⚠️ 低库存预警', en: '⚠️ Low Stock' },
    'mat.filter.stockNormal': { zh: '✅ 库存正常', en: '✅ In Stock' },
    'mat.btn.addItem':   { zh: '➕ 添加物料', en: '➕ Add Item' },
    'mat.btn.batch':     { zh: '☑️ 批量编辑', en: '☑️ Batch Edit' },
    'mat.btn.viewTable': { zh: '📋 切换表格', en: '📋 Table View' },
    'mat.btn.viewBox':   { zh: '📊 盒子视图', en: '📊 Box View' },

    // 批量栏
    'mat.batch.info':    { zh: '已选 {n} 项', en: 'Selected {n}' },
    'mat.batch.label':   { zh: '批量操作：', en: 'Batch:' },
    'mat.batch.setCat':  { zh: '应用分类', en: 'Apply' },
    'mat.batch.clearLoc':{ zh: '清空位置', en: 'Clear Loc.' },
    'mat.batch.delete':  { zh: '删除选中', en: 'Delete' },
    'mat.batch.cancel':  { zh: '取消', en: 'Cancel' },
    'mat.batch.selectCat': { zh: '设置分类...', en: 'Set category...' },

    // 表格表头
    'mat.th.id':     { zh: '编号', en: 'ID' },
    'mat.th.name':   { zh: '名称', en: 'Name' },
    'mat.th.model':  { zh: '型号', en: 'Model' },
    'mat.th.qty':    { zh: '数量', en: 'Qty' },
    'mat.th.cat':    { zh: '分类', en: 'Category' },
    'mat.th.loc':    { zh: '位置', en: 'Location' },
    'mat.th.thr':    { zh: '阈值', en: 'Threshold' },
    'mat.th.note':   { zh: '备注', en: 'Note' },
    'mat.th.op':     { zh: '操作', en: 'Actions' },

    // 物料弹窗
    'mat.item.title.add':   { zh: '添加物料', en: 'Add Item' },
    'mat.item.title.edit':  { zh: '编辑物料', en: 'Edit Item' },
    'mat.item.title.addTo': { zh: '添加物料到 {loc}', en: 'Add Item to {loc}' },
    'mat.label.name':       { zh: '名称 *', en: 'Name *' },
    'mat.label.model':      { zh: '型号 *', en: 'Model *' },
    'mat.label.qty':        { zh: '数量 *', en: 'Qty *' },
    'mat.label.threshold':  { zh: '低库存阈值', en: 'Low-stock threshold' },
    'mat.label.category':   { zh: '分类', en: 'Category' },
    'mat.label.location':   { zh: '位置 (盒号-格号)', en: 'Location (box-cell)' },
    'mat.label.note':       { zh: '备注', en: 'Note' },
    'mat.btn.cancel':       { zh: '取消', en: 'Cancel' },
    'mat.btn.save':         { zh: '保存', en: 'Save' },

    // 盒子弹窗
    'mat.box.title.add':  { zh: '新建物料盒', en: 'New Box' },
    'mat.box.title.edit': { zh: '编辑物料盒', en: 'Edit Box' },
    'mat.label.boxName':  { zh: '盒子名称 *', en: 'Box name *' },
    'mat.label.rows':     { zh: '行数 (Rows) *', en: 'Rows *' },
    'mat.label.cols':     { zh: '列数 (Cols) *', en: 'Cols *' },

    // 空状态 / 单元格
    'mat.empty.noBox':   { zh: '还没有物料盒，点击「新建物料盒」开始', en: 'No box yet — click "New Box" to start' },
    'mat.empty.noMatch': { zh: '没有匹配的物料', en: 'No matching items' },
    'mat.empty.noItem':  { zh: '暂无物料', en: 'No items yet' },
    'mat.cell.empty':    { zh: '空', en: 'Empty' },
    'mat.badge.lowGrid': { zh: '⚠️ 低库存', en: '⚠️ Low' },
    'mat.badge.lowTbl':  { zh: '⚠️ 低', en: '⚠️ Low' },
    'mat.box.badge':     { zh: '{rows}×{cols} · {n} 个物料', en: '{rows}×{cols} · {n} items' },

    // 页脚
    'mat.footer': { zh: '📦 物料管理 · 嵌入式电子物料的入库、盘点与低库存预警，数据保存在本地浏览器', en: '📦 Material Manager · Track components locally in your browser' },

    // ===== 动态提示 / 错误（I18N.t 使用） =====
    'mat.err.fillNameModel': { zh: '请填写名称和型号', en: 'Please fill in name and model' },
    'mat.err.qtyNeg':        { zh: '数量不能为负数', en: 'Quantity cannot be negative' },
    'mat.err.locOccupied':   { zh: '位置 {loc} 已被占用', en: 'Location {loc} is already occupied' },
    'mat.err.csvInvalid':    { zh: 'CSV 格式无效', en: 'Invalid CSV format' },
    'mat.err.csvMissingCols':{ zh: 'CSV 缺少 "名称" 或 "型号" 列', en: 'CSV misses "name" or "model" column' },
    'mat.err.csvEmpty':      { zh: '没有有效数据被导入', en: 'No valid data imported' },
    'mat.err.jsonInvalid':   { zh: 'JSON 格式无效', en: 'Invalid JSON format' },
    'mat.err.rowsColsRange': { zh: '行列数请设置在 1~10 之间', en: 'Rows/cols must be between 1 and 10' },
    'mat.err.boxName':       { zh: '请输入盒子名称', en: 'Please enter a box name' },
    'mat.err.noDataExport':  { zh: '没有物料可导出', en: 'No items to export' },
    'mat.err.popup':        { zh: '浏览器拦截了打印窗口，请允许弹出窗口', en: 'Popup blocked; please allow popups' },
    'mat.err.selectCat':     { zh: '请选择分类', en: 'Please select a category' },
    'mat.err.selectItem':    { zh: '请先选择物料', en: 'Please select items first' },

    'mat.ok.itemAdded':   { zh: '✅ 物料已添加', en: '✅ Item added' },
    'mat.ok.itemUpdated': { zh: '✅ 物料已更新', en: '✅ Item updated' },
    'mat.ok.itemDeleted': { zh: '已删除物料', en: 'Item deleted' },
    'mat.ok.boxCreated':  { zh: '✅ 盒子已创建', en: '✅ Box created' },
    'mat.ok.boxUpdated':  { zh: '✅ 盒子已更新', en: '✅ Box updated' },
    'mat.ok.boxDeleted':  { zh: '已删除盒子', en: 'Box deleted' },
    'mat.ok.csvExport':   { zh: '📤 CSV 导出成功', en: '📤 CSV exported' },
    'mat.ok.jsonBackup':  { zh: '💾 数据备份成功', en: '💾 Backup saved' },
    'mat.ok.importCsv':   { zh: '📥 成功导入 {n} 条物料', en: '📥 Imported {n} items' },
    'mat.ok.jsonRestore': { zh: '🔄 成功恢复 {n} 个物料', en: '🔄 Restored {n} items' },
    'mat.ok.batchCat':    { zh: '✅ 已为 {n} 个物料设置分类为 "{cat}"', en: '✅ Set category "{cat}" for {n} items' },
    'mat.ok.batchClear':  { zh: '✅ 已清空 {n} 个物料的位置', en: '✅ Cleared location of {n} items' },
    'mat.ok.resetDemo':   { zh: '🔄 已重置为示例数据', en: '🔄 Reset to demo data' },
    'mat.ok.cleared':     { zh: '🗑️ 已清空全部数据', en: '🗑️ All data cleared' },
    'mat.ok.listEmpty':   { zh: '暂无可打印的物料', en: 'No items to print' },

    'mat.confirm.deleteItem':  { zh: '确定删除该物料吗？', en: 'Delete this item?' },
    'mat.confirm.batchClear':  { zh: '确定清空 {n} 个物料的位置吗？', en: 'Clear location of {n} items?' },
    'mat.confirm.batchDelete': { zh: '确定删除选中的 {n} 个物料吗？', en: 'Delete {n} selected items?' },
    'mat.confirm.jsonRestore': { zh: '将导入 {n} 个物料和 {m} 个盒子，当前数据将被覆盖。确定吗？', en: 'Import {n} items and {m} boxes, overwriting current data. Continue?' },
    'mat.confirm.deleteBox':   { zh: '确定删除盒子 "{name}" 吗？', en: 'Delete box "{name}"?' },
    'mat.confirm.deleteBoxRefs': { zh: '盒子 "{name}" 中有 {n} 个物料，删除后这些物料将失去位置绑定。确定删除吗？', en: 'Box "{name}" holds {n} items; they will lose their location. Delete anyway?' },
    'mat.confirm.resetDemo': { zh: '将用示例数据覆盖当前所有物料和盒子，确定吗？', en: 'Replace all current data with demo data?' },
    'mat.confirm.clearAll':  { zh: '确定清空全部物料和盒子吗？此操作不可撤销！', en: 'Clear ALL items and boxes? This cannot be undone!' }
};

(function () {
    'use strict';

    function tr(key) {
        if (window.I18N && window.I18N.t) {
            var v = window.I18N.t(key);
            return (v === null || v === undefined) ? key : v;
        }
        var entry = (window.I18N_STRINGS || {})[key];
        return entry ? entry.zh : key;
    }
    function tf(key, map) {
        var s = tr(key);
        if (map) {
            Object.keys(map).forEach(function (k) {
                s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), map[k]);
            });
        }
        return s;
    }

    // ============================================================
    //  DOM 引用
    // ============================================================
    var boxCardContainer = document.getElementById('boxCardContainer');
    var tableView        = document.getElementById('tableView');
    var tableBody        = document.getElementById('tableBody');
    var searchInput      = document.getElementById('searchInput');
    var clearSearchBtn   = document.getElementById('clearSearchBtn');
    var categoryFilter   = document.getElementById('categoryFilter');
    var stockFilter      = document.getElementById('stockFilter');
    var toggleViewBtn    = document.getElementById('toggleViewBtn');
    var batchBar         = document.getElementById('batchBar');
    var batchInfo        = document.getElementById('batchInfo');
    var selectAllTable   = document.getElementById('selectAllTable');

    var itemModal   = document.getElementById('itemModal');
    var boxModal    = document.getElementById('boxModal');
    var toastEl      = document.getElementById('toast');

    // ============================================================
    //  数据层
    // ============================================================
    var items = [];
    var boxes = [];
    var nextItemId = 1;
    var nextBoxId = 1;
    var currentBoxIndex = 0;
    var showTable = false;
    var batchMode = false;
    var selectedItems = new Set();
    var STORAGE_KEY = 'material_manager_pro_data';

    var PRESET_CATEGORIES = ['电阻', '电容', 'IC', '接插件', '晶体', '二极管', '三极管', '电感', '其他'];

    function initSampleData() {
        boxes = [
            { id: 1, name: 'A1 主料盒', rows: 3, cols: 4 },
            { id: 2, name: 'B2 电容盒', rows: 2, cols: 3 },
            { id: 3, name: 'C3 芯片盒', rows: 2, cols: 4 }
        ];
        items = [
            { id: 1, name: '贴片电阻', model: '0603-10kΩ', qty: 200, category: '电阻', location: 'A1-1', note: '5%精度', threshold: 20 },
            { id: 2, name: '电解电容', model: '100µF/25V', qty: 45, category: '电容', location: 'A1-2', note: '105°C', threshold: 10 },
            { id: 3, name: 'STM32F103', model: 'C8T6', qty: 12, category: 'IC', location: 'B2-1', note: 'LQFP48', threshold: 5 },
            { id: 4, name: '贴片电阻', model: '0603-1kΩ', qty: 300, category: '电阻', location: 'A1-3', note: '', threshold: 30 },
            { id: 5, name: 'AMS1117', model: '3.3V', qty: 8, category: 'IC', location: 'C3-2', note: 'SOT-223', threshold: 3 }
        ];
        nextItemId = 6;
        nextBoxId = 4;
    }

    function loadData() {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                var parsed = JSON.parse(raw);
                items = parsed.items || [];
                boxes = parsed.boxes || [];
                nextItemId = parsed.nextItemId || (items.length ? Math.max.apply(null, items.map(function (i) { return i.id; })) + 1 : 1);
                nextBoxId = parsed.nextBoxId || (boxes.length ? Math.max.apply(null, boxes.map(function (b) { return b.id; })) + 1 : 1);
            } catch (e) {
                initSampleData();
            }
        } else {
            initSampleData();
        }
        if (boxes.length === 0) {
            boxes = [{ id: nextBoxId++, name: '默认物料盒', rows: 3, cols: 4 }];
        }
        if (currentBoxIndex >= boxes.length) currentBoxIndex = 0;
        items.forEach(function (it) { if (it.threshold === undefined) it.threshold = 10; });
        saveToLocal();
        renderAll();
    }

    function saveToLocal() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: items, boxes: boxes, nextItemId: nextItemId, nextBoxId: nextBoxId }));
    }

    // ============================================================
    //  工具函数
    // ============================================================
    function escHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"]/g, function (m) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[m] || m;
        });
    }
    function getAllCategories() {
        var cats = new Set();
        items.forEach(function (it) { if (it.category) cats.add(it.category); });
        return Array.from(cats).sort();
    }
    function isItemMatch(item, keyword) {
        if (!keyword) return true;
        var k = keyword.toLowerCase();
        return (item.name && item.name.toLowerCase().indexOf(k) !== -1) ||
            (item.model && item.model.toLowerCase().indexOf(k) !== -1) ||
            (item.location && item.location.toLowerCase().indexOf(k) !== -1) ||
            (item.note && item.note.toLowerCase().indexOf(k) !== -1) ||
            (item.category && item.category.toLowerCase().indexOf(k) !== -1);
    }
    function isLowStock(item) {
        return item.qty <= (item.threshold || 10);
    }
    function getFilteredItems() {
        var keyword = searchInput.value.trim();
        var category = categoryFilter.value;
        var stockVal = stockFilter.value;
        return items.filter(function (it) {
            if (keyword && !isItemMatch(it, keyword)) return false;
            if (category && it.category !== category) return false;
            if (stockVal === 'low' && !isLowStock(it)) return false;
            if (stockVal === 'normal' && isLowStock(it)) return false;
            return true;
        });
    }

    // ============================================================
    //  渲染
    // ============================================================
    function renderAll() {
        renderCategoryFilters();
        var keyword = searchInput.value.trim();
        renderCurrentBox(keyword);
        renderTable(keyword);
        renderOverview();
        updateNavButtons();
        updateClearButton(keyword);
        toggleViewBtn.textContent = showTable ? tr('mat.btn.viewBox') : tr('mat.btn.viewTable');
        updateBatchBar();
    }

    function renderOverview() {
        var lowItems = items.filter(isLowStock);
        var kinds = new Set();
        items.forEach(function (it) { kinds.add((it.name || '') + '|' + (it.model || '')); });
        document.getElementById('statLow').textContent = lowItems.length;
        document.getElementById('statBoxes').textContent = boxes.length;
        document.getElementById('statKinds').textContent = kinds.size;
        document.getElementById('statCat').textContent = getAllCategories().length;

        var alertsBox = document.getElementById('alertsBox');
        var alertsList = document.getElementById('alertsList');
        if (lowItems.length === 0) {
            alertsBox.hidden = true;
            alertsList.innerHTML = '';
            return;
        }
        alertsBox.hidden = false;
        alertsList.innerHTML = lowItems.map(function (it) {
            return '<span class="mm-alert-chip" data-id="' + it.id + '">' +
                escHtml(it.name) + ' · ' + escHtml(it.model) +
                ' <b>' + it.qty + '</b>/' + (it.threshold || 10) + '</span>';
        }).join('');
    }

    function locateItem(id) {
        var it = items.filter(function (x) { return x.id === id; })[0];
        if (!it) return;
        searchInput.value = it.name || '';
        categoryFilter.value = '';
        stockFilter.value = '';
        showTable = false;
        renderAll();
        showToast(tf('mat.ok.located', { name: it.name }), 'success');
    }


    function updateNavButtons() {
        var total = boxes.length;
        var ind = document.getElementById('pageIndicator');
        if (ind) ind.textContent = total > 0 ? (currentBoxIndex + 1) + ' / ' + total : '0 / 0';
        var prev = document.getElementById('prevBtn');
        var next = document.getElementById('nextBtn');
        if (prev) prev.disabled = total === 0 || currentBoxIndex === 0;
        if (next) next.disabled = total === 0 || currentBoxIndex === total - 1;
    }

    function updateClearButton(keyword) {
        clearSearchBtn.classList.toggle('visible', keyword.length > 0);
    }

    function clearSearch() {
        searchInput.value = '';
        renderAll();
        searchInput.focus();
    }

    function applyFilters() {
        renderAll();
    }

    function renderCategoryFilters() {
        var cats = getAllCategories();
        var current = categoryFilter.value;
        categoryFilter.innerHTML = '';
        var optAll = document.createElement('option');
        optAll.value = '';
        optAll.textContent = tr('mat.filter.catAll');
        categoryFilter.appendChild(optAll);
        cats.forEach(function (c) {
            var o = document.createElement('option');
            o.value = c; o.textContent = c;
            categoryFilter.appendChild(o);
        });
        categoryFilter.value = current;

        // datalist（物料弹窗分类输入建议）
        var datalist = document.getElementById('categoryList');
        if (datalist) {
            datalist.innerHTML = '';
            PRESET_CATEGORIES.concat(cats.filter(function (c) { return PRESET_CATEGORIES.indexOf(c) === -1; }))
                .forEach(function (c) {
                    var o = document.createElement('option');
                    o.value = c;
                    datalist.appendChild(o);
                });
        }

        // 批量分类下拉
        var batchSelect = document.getElementById('batchCategorySelect');
        if (batchSelect) {
            var bval = batchSelect.value;
            batchSelect.innerHTML = '';
            var bo = document.createElement('option');
            bo.value = ''; bo.textContent = tr('mat.batch.selectCat');
            batchSelect.appendChild(bo);
            PRESET_CATEGORIES.concat(cats.filter(function (c) { return PRESET_CATEGORIES.indexOf(c) === -1; }))
                .forEach(function (c) {
                    var o = document.createElement('option');
                    o.value = c; o.textContent = c;
                    batchSelect.appendChild(o);
                });
            batchSelect.value = bval;
        }
    }

    // ----- 盒子视图 -----
    function renderCurrentBox(keyword) {
        if (boxes.length === 0) {
            boxCardContainer.innerHTML =
                '<div class="mm-boxcard"><div class="mm-empty-state"><span class="mm-emoji">📭</span>' +
                escHtml(tr('mat.empty.noBox')) + '</div></div>';
            return;
        }

        var box = boxes[currentBoxIndex];
        var totalCells = box.rows * box.cols;
        var filteredItems = getFilteredItems();

        var html = '<div class="mm-boxcard">';
        html += '<div class="mm-boxheader">';
        html += '<div class="mm-boxtitle">📦 ' + escHtml(box.name) +
            ' <span class="mm-badge">' +
            tf('mat.box.badge', {
                rows: box.rows, cols: box.cols,
                n: filteredItems.filter(function (it) { return it.location && it.location.indexOf(box.name + '-') === 0; }).length
            }) + '</span></div>';
        html += '<div class="mm-boxactions">';
        html += '<button class="btn btn-outline btn-sm" data-box-act="edit" data-box-id="' + box.id + '">✏️</button>';
        html += '<button class="btn btn-outline btn-sm" data-box-act="delete" data-box-id="' + box.id + '">🗑️</button>';
        html += '</div></div>';

        html += '<div class="mm-nav">';
        html += '<button class="mm-navbtn" data-nav="prev">‹</button>';
        html += '<span class="mm-pageind" id="pageIndicator"></span>';
        html += '<button class="mm-navbtn" data-nav="next">›</button>';
        html += '</div>';

        html += '<div class="mm-grid" style="grid-template-columns: repeat(' + box.cols + ', 1fr);">';

        for (var i = 1; i <= totalCells; i++) {
            var cellKey = box.name + '-' + i;
            var item = items.find(function (it) { return it.location === cellKey; });
            var inFiltered = item ? filteredItems.some(function (f) { return f.id === item.id; }) : false;
            var isSelected = item ? selectedItems.has(item.id) : false;
            var low = item ? isLowStock(item) : false;

            if (item && inFiltered) {
                var cat = item.category ? '<span class="mm-cat">' + escHtml(item.category) + '</span>' : '';
                var cls = 'mm-cell has-item' + (low ? ' low-stock' : '') + (batchMode ? ' batch-select' : '') + (isSelected ? ' selected' : '');
                var act = batchMode ? 'toggle' : 'edit';
                html += '<div class="' + cls + '" data-cell-act="' + act + '" data-item-id="' + item.id + '" title="' +
                    escHtml(item.model + ' | ' + item.name + ' | ×' + item.qty + (low ? ' ⚠️低库存' : '')) + '">' +
                    (low ? '<span class="mm-lowbadge">' + escHtml(tr('mat.badge.lowGrid')) + '</span>' : '') +
                    (batchMode ? '<span class="mm-check">' + (isSelected ? '☑' : '☐') + '</span>' : '') +
                    '<span class="mm-model">' + escHtml(item.model) + '</span>' +
                    '<span class="mm-name">' + escHtml(item.name) + '</span>' +
                    '<span class="mm-qty">×' + item.qty + '</span>' +
                    cat +
                    '<span class="mm-index">#' + i + '</span>' +
                    '</div>';
            } else if (!item && !keyword) {
                var emptyCls = 'mm-cell' + (batchMode ? ' batch-select' : '');
                var emptyAct = batchMode ? '' : ' data-cell-act="add" data-loc="' + escHtml(cellKey) + '"';
                var emptyTitle = batchMode ? tr('mat.batch.label') : tr('mat.cell.empty');
                html += '<div class="' + emptyCls + '"' + emptyAct + ' title="' + escHtml(emptyTitle) + '">' +
                    '<span class="mm-empty">' + (batchMode ? '☐' : escHtml(tr('mat.cell.empty'))) + '</span>' +
                    '<span class="mm-index">#' + i + '</span></div>';
            } else {
                html += '<div class="mm-cell" style="opacity:0.2;cursor:default;">' +
                    '<span class="mm-empty">' + (item ? '⊘' : escHtml(tr('mat.cell.empty'))) + '</span>' +
                    '<span class="mm-index">#' + i + '</span></div>';
            }
        }
        html += '</div></div>';
        boxCardContainer.innerHTML = html;
        updateNavButtons();
    }

    // ----- 表格视图 -----
    function renderTable(keyword) {
        var filtered = getFilteredItems();
        if (filtered.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="10"><div class="mm-empty-state">' +
                escHtml(keyword ? tr('mat.empty.noMatch') : tr('mat.empty.noItem')) + '</div></td></tr>';
            return;
        }
        var html = '';
        filtered.forEach(function (it) {
            var low = isLowStock(it);
            html += '<tr>' +
                '<td><input type="checkbox" class="table-checkbox" data-id="' + it.id + '"' + (selectedItems.has(it.id) ? ' checked' : '') + '></td>' +
                '<td>#' + it.id + '</td>' +
                '<td>' + escHtml(it.name) + '</td>' +
                '<td>' + escHtml(it.model) + '</td>' +
                '<td>' + it.qty + (low ? ' <span class="mm-lowbadge">' + escHtml(tr('mat.badge.lowTbl')) + '</span>' : '') + '</td>' +
                '<td>' + (it.category ? '<span class="mm-catbadge">' + escHtml(it.category) + '</span>' : '—') + '</td>' +
                '<td><span class="mm-loc">' + escHtml(it.location || tr('mat.empty.noItem')) + '</span></td>' +
                '<td>' + (it.threshold || 10) + '</td>' +
                '<td>' + escHtml(it.note || '—') + '</td>' +
                '<td>' +
                '<button class="btn btn-sm" data-tbl-act="edit" data-tbl-id="' + it.id + '">✏️</button> ' +
                '<button class="btn btn-outline btn-sm" data-tbl-act="delete" data-tbl-id="' + it.id + '">🗑️</button>' +
                '</td></tr>';
        });
        tableBody.innerHTML = html;
    }

    // ============================================================
    //  批量编辑
    // ============================================================
    function toggleBatchMode() {
        batchMode = !batchMode;
        if (!batchMode) {
            selectedItems.clear();
            batchBar.classList.remove('active');
        } else {
            batchBar.classList.add('active');
            if (!showTable) toggleTableView();
        }
        renderAll();
        updateBatchBar();
    }

    function toggleSelectItem(id) {
        if (!batchMode) return;
        if (selectedItems.has(id)) selectedItems.delete(id);
        else selectedItems.add(id);
        renderAll();
        updateBatchBar();
    }

    function toggleSelectAllTable() {
        var checked = selectAllTable.checked;
        getFilteredItems().forEach(function (it) {
            if (checked) selectedItems.add(it.id);
            else selectedItems.delete(it.id);
        });
        renderAll();
        updateBatchBar();
    }

    function updateBatchBar() {
        batchInfo.textContent = tf('mat.batch.info', { n: selectedItems.size });
        var filtered = getFilteredItems();
        var allChecked = filtered.length > 0 && filtered.every(function (it) { return selectedItems.has(it.id); });
        selectAllTable.checked = allChecked;
    }

    function batchSetCategory() {
        var cat = document.getElementById('batchCategorySelect').value;
        if (!cat) { showToast(tr('mat.err.selectCat'), 'error'); return; }
        if (selectedItems.size === 0) { showToast(tr('mat.err.selectItem'), 'error'); return; }
        selectedItems.forEach(function (id) {
            var it = items.find(function (i) { return i.id === id; });
            if (it) it.category = cat;
        });
        saveToLocal();
        renderAll();
        showToast(tf('mat.ok.batchCat', { n: selectedItems.size, cat: cat }), 'success');
    }

    function batchClearLocation() {
        if (selectedItems.size === 0) { showToast(tr('mat.err.selectItem'), 'error'); return; }
        if (!confirm(tf('mat.confirm.batchClear', { n: selectedItems.size }))) return;
        selectedItems.forEach(function (id) {
            var it = items.find(function (i) { return i.id === id; });
            if (it) it.location = '';
        });
        saveToLocal();
        renderAll();
        showToast(tf('mat.ok.batchClear', { n: selectedItems.size }), 'success');
    }

    function batchDelete() {
        if (selectedItems.size === 0) { showToast(tr('mat.err.selectItem'), 'error'); return; }
        if (!confirm(tf('mat.confirm.batchDelete', { n: selectedItems.size }))) return;
        items = items.filter(function (i) { return !selectedItems.has(i.id); });
        selectedItems.clear();
        saveToLocal();
        renderAll();
        showToast(tr('mat.ok.itemDeleted'), 'success');
    }

    // ============================================================
    //  盒子切换
    // ============================================================
    function prevBox() { if (currentBoxIndex > 0) { currentBoxIndex--; renderAll(); } }
    function nextBox() { if (currentBoxIndex < boxes.length - 1) { currentBoxIndex++; renderAll(); } }

    // ============================================================
    //  视图切换
    // ============================================================
    function toggleTableView() {
        showTable = !showTable;
        if (showTable) {
            boxCardContainer.classList.add('hidden');
            tableView.classList.remove('hidden');
            renderTable(searchInput.value.trim());
        } else {
            boxCardContainer.classList.remove('hidden');
            tableView.classList.add('hidden');
            renderCurrentBox(searchInput.value.trim());
        }
        toggleViewBtn.textContent = showTable ? tr('mat.btn.viewBox') : tr('mat.btn.viewTable');
    }

    // ============================================================
    //  物料 CRUD
    // ============================================================
    function openAddItemModal() {
        document.getElementById('itemModalTitle').textContent = tr('mat.item.title.add');
        document.getElementById('editItemId').value = '';
        document.getElementById('fName').value = '';
        document.getElementById('fModel').value = '';
        document.getElementById('fQty').value = 1;
        document.getElementById('fThreshold').value = 10;
        document.getElementById('fCategory').value = '';
        document.getElementById('fLocation').value = '';
        document.getElementById('fNote').value = '';
        itemModal.classList.add('active');
        document.getElementById('fName').focus();
    }

    function openAddItemToCell(location) {
        document.getElementById('itemModalTitle').textContent = tf('mat.item.title.addTo', { loc: location });
        document.getElementById('editItemId').value = '';
        document.getElementById('fName').value = '';
        document.getElementById('fModel').value = '';
        document.getElementById('fQty').value = 1;
        document.getElementById('fThreshold').value = 10;
        document.getElementById('fCategory').value = '';
        document.getElementById('fLocation').value = location;
        document.getElementById('fNote').value = '';
        itemModal.classList.add('active');
        document.getElementById('fName').focus();
    }

    function editItem(id) {
        var it = items.find(function (i) { return i.id === id; });
        if (!it) return;
        document.getElementById('itemModalTitle').textContent = tr('mat.item.title.edit');
        document.getElementById('editItemId').value = id;
        document.getElementById('fName').value = it.name;
        document.getElementById('fModel').value = it.model;
        document.getElementById('fQty').value = it.qty;
        document.getElementById('fThreshold').value = it.threshold || 10;
        document.getElementById('fCategory').value = it.category || '';
        document.getElementById('fLocation').value = it.location || '';
        document.getElementById('fNote').value = it.note || '';
        itemModal.classList.add('active');
    }

    function saveItem() {
        var name = document.getElementById('fName').value.trim();
        var model = document.getElementById('fModel').value.trim();
        var qty = parseInt(document.getElementById('fQty').value, 10) || 0;
        var threshold = parseInt(document.getElementById('fThreshold').value, 10) || 10;
        var category = document.getElementById('fCategory').value.trim();
        var location = document.getElementById('fLocation').value.trim();
        var note = document.getElementById('fNote').value.trim();
        var editId = document.getElementById('editItemId').value;

        if (!name || !model) { showToast(tr('mat.err.fillNameModel'), 'error'); return; }
        if (qty < 0) { showToast(tr('mat.err.qtyNeg'), 'error'); return; }

        if (editId) {
            var idx = items.findIndex(function (i) { return i.id === parseInt(editId, 10); });
            if (idx !== -1) {
                var oldLocation = items[idx].location;
                if (location && location !== oldLocation) {
                    var conflict = items.find(function (i) { return i.location === location && i.id !== parseInt(editId, 10); });
                    if (conflict) { showToast(tf('mat.err.locOccupied', { loc: location }), 'error'); return; }
                }
                items[idx] = Object.assign({}, items[idx], { name: name, model: model, qty: qty, threshold: threshold, category: category, location: location, note: note });
                showToast(tr('mat.ok.itemUpdated'), 'success');
            }
        } else {
            if (location) {
                var c2 = items.find(function (i) { return i.location === location; });
                if (c2) { showToast(tf('mat.err.locOccupied', { loc: location }), 'error'); return; }
            }
            items.push({ id: nextItemId++, name: name, model: model, qty: qty, threshold: threshold, category: category, location: location, note: note });
            showToast(tr('mat.ok.itemAdded'), 'success');
        }
        saveToLocal();
        renderAll();
        closeModal('itemModal');
    }

    function deleteItem(id) {
        if (!confirm(tr('mat.confirm.deleteItem'))) return;
        items = items.filter(function (i) { return i.id !== id; });
        selectedItems.delete(id);
        saveToLocal();
        renderAll();
        showToast(tr('mat.ok.itemDeleted'), 'success');
    }

    // ============================================================
    //  盒子 CRUD
    // ============================================================
    function openAddBoxModal() {
        document.getElementById('boxModalTitle').textContent = tr('mat.box.title.add');
        document.getElementById('editBoxId').value = '';
        document.getElementById('fBoxName').value = '';
        document.getElementById('fRows').value = 3;
        document.getElementById('fCols').value = 4;
        boxModal.classList.add('active');
        document.getElementById('fBoxName').focus();
    }

    function editBox(id) {
        var box = boxes.find(function (b) { return b.id === id; });
        if (!box) return;
        document.getElementById('boxModalTitle').textContent = tr('mat.box.title.edit');
        document.getElementById('editBoxId').value = id;
        document.getElementById('fBoxName').value = box.name;
        document.getElementById('fRows').value = box.rows;
        document.getElementById('fCols').value = box.cols;
        boxModal.classList.add('active');
    }

    function saveBox() {
        var name = document.getElementById('fBoxName').value.trim();
        var rows = parseInt(document.getElementById('fRows').value, 10) || 3;
        var cols = parseInt(document.getElementById('fCols').value, 10) || 4;
        var editId = document.getElementById('editBoxId').value;

        if (!name) { showToast(tr('mat.err.boxName'), 'error'); return; }
        if (rows < 1 || cols < 1 || rows > 10 || cols > 10) {
            showToast(tr('mat.err.rowsColsRange'), 'error');
            return;
        }

        if (editId) {
            var idx = boxes.findIndex(function (b) { return b.id === parseInt(editId, 10); });
            if (idx !== -1) {
                var oldName = boxes[idx].name;
                boxes[idx] = Object.assign({}, boxes[idx], { name: name, rows: rows, cols: cols });
                if (oldName !== name) {
                    items.forEach(function (it) {
                        if (it.location && it.location.indexOf(oldName + '-') === 0) {
                            it.location = name + it.location.substring(oldName.length);
                        }
                    });
                }
                showToast(tr('mat.ok.boxUpdated'), 'success');
            }
        } else {
            boxes.push({ id: nextBoxId++, name: name, rows: rows, cols: cols });
            currentBoxIndex = boxes.length - 1;
            showToast(tr('mat.ok.boxCreated'), 'success');
        }
        saveToLocal();
        renderAll();
        closeModal('boxModal');
    }

    function deleteBox(id) {
        var box = boxes.find(function (b) { return b.id === id; });
        if (!box) return;
        var refs = items.filter(function (it) { return it.location && it.location.indexOf(box.name + '-') === 0; });
        if (refs.length > 0) {
            if (!confirm(tf('mat.confirm.deleteBoxRefs', { name: box.name, n: refs.length }))) return;
            refs.forEach(function (it) { it.location = ''; });
        } else {
            if (!confirm(tf('mat.confirm.deleteBox', { name: box.name }))) return;
        }
        boxes = boxes.filter(function (b) { return b.id !== id; });
        if (currentBoxIndex >= boxes.length) currentBoxIndex = Math.max(0, boxes.length - 1);
        saveToLocal();
        renderAll();
        showToast(tr('mat.ok.boxDeleted'), 'success');
    }

    // ============================================================
    //  导入导出
    // ============================================================
    function exportCSV() {
        if (items.length === 0) { showToast(tr('mat.err.noDataExport'), 'error'); return; }
        var csv = '﻿编号,名称,型号,数量,分类,位置,阈值,备注\n';
        items.forEach(function (it) {
            csv += it.id + ',"' + it.name + '","' + it.model + '",' + it.qty + ',"' + (it.category || '') + '","' + (it.location || '') + '",' + (it.threshold || 10) + ',"' + (it.note || '') + '"\n';
        });
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = '物料库存_' + new Date().toISOString().slice(0, 10) + '.csv';
        link.click();
        URL.revokeObjectURL(link.href);
        showToast(tr('mat.ok.csvExport'), 'success');
    }

    function importCSV(event) {
        var file = event.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var text = e.target.result;
                var lines = text.split(/\r?\n/).filter(function (l) { return l.trim() !== ''; });
                if (lines.length < 2) { showToast(tr('mat.err.csvInvalid'), 'error'); return; }
                var header = parseCSVLine(lines[0]);
                var nameIdx = header.findIndex(function (h) { return h.indexOf('名称') !== -1 || h.toLowerCase().indexOf('name') !== -1; });
                var modelIdx = header.findIndex(function (h) { return h.indexOf('型号') !== -1 || h.toLowerCase().indexOf('model') !== -1; });
                var qtyIdx = header.findIndex(function (h) { return h.indexOf('数量') !== -1 || h.toLowerCase().indexOf('qty') !== -1; });
                var catIdx = header.findIndex(function (h) { return h.indexOf('分类') !== -1 || h.toLowerCase().indexOf('category') !== -1; });
                var locIdx = header.findIndex(function (h) { return h.indexOf('位置') !== -1 || h.toLowerCase().indexOf('location') !== -1; });
                var thIdx = header.findIndex(function (h) { return h.indexOf('阈值') !== -1 || h.toLowerCase().indexOf('threshold') !== -1; });
                var noteIdx = header.findIndex(function (h) { return h.indexOf('备注') !== -1 || h.toLowerCase().indexOf('note') !== -1; });
                if (nameIdx === -1 || modelIdx === -1) { showToast(tr('mat.err.csvMissingCols'), 'error'); return; }

                var imported = 0;
                for (var i = 1; i < lines.length; i++) {
                    var cols = parseCSVLine(lines[i]);
                    if (cols.length < Math.max(nameIdx, modelIdx) + 1) continue;
                    var name = (cols[nameIdx] || '').trim();
                    var model = (cols[modelIdx] || '').trim();
                    if (!name || !model) continue;
                    var qty = parseInt(cols[qtyIdx], 10) || 0;
                    var category = (catIdx !== -1 && cols[catIdx]) ? cols[catIdx].trim() : '';
                    var location = (locIdx !== -1 && cols[locIdx]) ? cols[locIdx].trim() : '';
                    var threshold = (thIdx !== -1 && cols[thIdx]) ? (parseInt(cols[thIdx], 10) || 10) : 10;
                    var note = (noteIdx !== -1 && cols[noteIdx]) ? cols[noteIdx].trim() : '';
                    items.push({ id: nextItemId++, name: name, model: model, qty: qty, category: category, location: location, threshold: threshold, note: note });
                    imported++;
                }
                if (imported === 0) { showToast(tr('mat.err.csvEmpty'), 'error'); }
                else {
                    saveToLocal();
                    renderAll();
                    showToast(tf('mat.ok.importCsv', { n: imported }), 'success');
                }
            } catch (err) {
                showToast(tr('mat.err.csvInvalid'), 'error');
            }
            event.target.value = '';
        };
        reader.readAsText(file, 'UTF-8');
    }

    function exportJSON() {
        var data = { items: items, boxes: boxes, nextItemId: nextItemId, nextBoxId: nextBoxId, exportedAt: new Date().toISOString() };
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = '物料备份_' + new Date().toISOString().slice(0, 10) + '.json';
        link.click();
        URL.revokeObjectURL(link.href);
        showToast(tr('mat.ok.jsonBackup'), 'success');
    }

    function importJSON(event) {
        var file = event.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var data = JSON.parse(e.target.result);
                if (!data.items || !data.boxes) { showToast(tr('mat.err.jsonInvalid'), 'error'); return; }
                if (!confirm(tf('mat.confirm.jsonRestore', { n: data.items.length, m: data.boxes.length }))) return;
                items = data.items;
                boxes = data.boxes;
                nextItemId = data.nextItemId || (items.length ? Math.max.apply(null, items.map(function (i) { return i.id; })) + 1 : 1);
                nextBoxId = data.nextBoxId || (boxes.length ? Math.max.apply(null, boxes.map(function (b) { return b.id; })) + 1 : 1);
                saveToLocal();
                renderAll();
                showToast(tf('mat.ok.jsonRestore', { n: items.length }), 'success');
            } catch (err) {
                showToast(tr('mat.err.jsonInvalid'), 'error');
            }
            event.target.value = '';
        };
        reader.readAsText(file);
    }

    function printList() {
        if (items.length === 0) { showToast(tr('mat.ok.listEmpty'), 'error'); return; }
        var dateStr = new Date().toLocaleString();
        var totalQty = items.reduce(function (s, it) { return s + (Number(it.qty) || 0); }, 0);
        var lowCount = items.filter(isLowStock).length;
        var html = '<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"><title>物料清单</title>'
            + '<style>body{font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;color:#222;padding:24px;max-width:900px;margin:0 auto;}'
            + 'h1{font-size:20px;margin:0 0 4px;} .meta{color:#666;font-size:12px;margin-bottom:8px;}'
            + 'h3{font-size:15px;margin:18px 0 6px;border-left:4px solid #557;padding-left:8px;}'
            + 'table{width:100%;border-collapse:collapse;font-size:13px;} th,td{border:1px solid #ddd;padding:6px 8px;text-align:left;}'
            + 'th{background:#f5f5f5;} .low{color:#c0392b;font-weight:600;} .tag{background:#eef;color:#335;border-radius:4px;padding:1px 6px;font-size:11px;}'
            + '@media print{body{padding:0;}}</style></head><body>';
        html += '<h1>📦 物料清单</h1>';
        html += '<div class="meta">生成时间：' + escHtml(dateStr) + ' ｜ 物料种类：' + items.length
            + ' ｜ 总数量：' + totalQty + ' ｜ 低库存：' + lowCount + '</div>';
        var grouped = {};
        boxes.forEach(function (b) { grouped[b.name] = []; });
        var unassigned = [];
        items.forEach(function (it) {
            var prefix = (it.location || '').split('-')[0];
            var box = boxes.find(function (b) { return b.name.indexOf(prefix) === 0; });
            if (box) grouped[box.name].push(it); else unassigned.push(it);
        });
        Object.keys(grouped).forEach(function (bname) {
            if (grouped[bname].length === 0) return;
            html += sectionHtml(bname, grouped[bname]);
        });
        if (unassigned.length) html += sectionHtml('未分配位置', unassigned);
        html += '</body></html>';
        var w = window.open('', '_blank');
        if (!w) { showToast(tr('mat.err.popup'), 'error'); return; }
        w.document.open();
        w.document.write(html);
        w.document.close();
        w.focus();
        setTimeout(function () { w.print(); }, 350);
    }

    function sectionHtml(title, list) {
        var h = '<h3>📦 ' + escHtml(title) + '（' + list.length + '）</h3>';
        h += '<table><thead><tr><th>名称</th><th>型号</th><th>数量</th><th>分类</th><th>位置</th><th>阈值</th><th>备注</th></tr></thead><tbody>';
        list.forEach(function (it) {
            var low = isLowStock(it);
            h += '<tr' + (low ? ' class="low"' : '') + '>'
                + '<td>' + escHtml(it.name) + '</td>'
                + '<td>' + escHtml(it.model) + '</td>'
                + '<td>' + it.qty + (low ? ' ⚠️' : '') + '</td>'
                + '<td>' + (it.category ? '<span class="tag">' + escHtml(it.category) + '</span>' : '—') + '</td>'
                + '<td>' + escHtml(it.location || '—') + '</td>'
                + '<td>' + (it.threshold || 10) + '</td>'
                + '<td>' + escHtml(it.note || '') + '</td></tr>';
        });
        h += '</tbody></table>';
        return h;
    }

    function resetDemo() {
        if (!confirm(tr('mat.confirm.resetDemo'))) return;
        initSampleData();
        currentBoxIndex = 0;
        saveToLocal();
        renderAll();
        showToast(tr('mat.ok.resetDemo'), 'success');
    }

    function clearAll() {
        if (!confirm(tr('mat.confirm.clearAll'))) return;
        items = [];
        boxes = [{ id: nextBoxId++, name: '默认物料盒', rows: 3, cols: 4 }];
        currentBoxIndex = 0;
        batchMode = false;
        selectedItems.clear();
        saveToLocal();
        renderAll();
        showToast(tr('mat.ok.cleared'), 'success');
    }

    function parseCSVLine(line) {
        var result = [], current = '', inQuotes = false;
        for (var i = 0; i < line.length; i++) {
            var ch = line[i];
            if (inQuotes) {
                if (ch === '"' && (i + 1 < line.length && line[i + 1] === '"')) { current += '"'; i++; }
                else if (ch === '"') { inQuotes = false; }
                else { current += ch; }
            } else {
                if (ch === '"') { inQuotes = true; }
                else if (ch === ',') { result.push(current); current = ''; }
                else { current += ch; }
            }
        }
        result.push(current);
        return result;
    }

    // ============================================================
    //  模态框 & Toast
    // ============================================================
    function closeModal(id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('active');
    }

    var toastTimer = null;
    function showToast(msg, type) {
        toastEl.textContent = msg;
        toastEl.className = 'mm-toast' + (type ? ' ' + type : '');
        void toastEl.offsetWidth;
        toastEl.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2800);
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    // 顶部 / 工具栏（静态元素）
    document.getElementById('addBoxBtn').addEventListener('click', openAddBoxModal);
    document.getElementById('exportCsvBtn').addEventListener('click', exportCSV);
    document.getElementById('backupJsonBtn').addEventListener('click', exportJSON);
    document.getElementById('printListBtn').addEventListener('click', printList);
    document.getElementById('resetDemoBtn').addEventListener('click', resetDemo);
    document.getElementById('clearAllBtn').addEventListener('click', clearAll);
    document.getElementById('addItemBtn').addEventListener('click', openAddItemModal);
    document.getElementById('batchBtn').addEventListener('click', toggleBatchMode);
    document.getElementById('saveItemBtn').addEventListener('click', saveItem);
    document.getElementById('saveBoxBtn').addEventListener('click', saveBox);
    document.getElementById('statLowPill').addEventListener('click', function () {
        stockFilter.value = 'low';
        applyFilters();
    });
    document.getElementById('alertsList').addEventListener('click', function (e) {
        var chip = e.target.closest('[data-id]');
        if (chip) locateItem(Number(chip.dataset.id));
    });
    toggleViewBtn.addEventListener('click', toggleTableView);
    searchInput.addEventListener('input', renderAll);
    categoryFilter.addEventListener('change', applyFilters);
    stockFilter.addEventListener('change', applyFilters);
    clearSearchBtn.addEventListener('click', clearSearch);
    document.getElementById('fileInput').addEventListener('change', importCSV);
    document.getElementById('jsonFileInput').addEventListener('change', importJSON);

    // 批量栏
    document.getElementById('batchApplyCat').addEventListener('click', batchSetCategory);
    document.getElementById('batchClearLoc').addEventListener('click', batchClearLocation);
    document.getElementById('batchDelete').addEventListener('click', batchDelete);
    document.getElementById('batchCancel').addEventListener('click', toggleBatchMode);

    // 盒子视图：事件委托
    boxCardContainer.addEventListener('click', function (e) {
        var navBtn = e.target.closest('[data-nav]');
        if (navBtn) { navBtn.dataset.nav === 'prev' ? prevBox() : nextBox(); return; }
        var boxBtn = e.target.closest('[data-box-act]');
        if (boxBtn) {
            var bid = parseInt(boxBtn.dataset.boxId, 10);
            if (boxBtn.dataset.boxAct === 'edit') editBox(bid); else deleteBox(bid);
            return;
        }
        var cell = e.target.closest('.mm-cell');
        if (cell) {
            var act = cell.dataset.cellAct;
            if (act === 'edit') editItem(parseInt(cell.dataset.itemId, 10));
            else if (act === 'toggle') toggleSelectItem(parseInt(cell.dataset.itemId, 10));
            else if (act === 'add') openAddItemToCell(cell.dataset.loc);
        }
    });

    // 表格视图：事件委托（按钮 + 行复选框）
    tableBody.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-tbl-act]');
        if (!btn) return;
        var id = parseInt(btn.dataset.tblId, 10);
        if (btn.dataset.tblAct === 'edit') editItem(id);
        else if (btn.dataset.tblAct === 'delete') deleteItem(id);
    });
    tableBody.addEventListener('change', function (e) {
        var cb = e.target.closest('.table-checkbox');
        if (cb) toggleSelectItem(parseInt(cb.dataset.id, 10));
    });
    selectAllTable.addEventListener('change', toggleSelectAllTable);

    // 模态框：取消按钮（委托）+ 点击遮罩关闭
    document.addEventListener('click', function (e) {
        var closeBtn = e.target.closest('[data-close]');
        if (closeBtn) { closeModal(closeBtn.dataset.close); return; }
        if (e.target.classList.contains('mm-overlay')) e.target.classList.remove('active');
    });

    // 键盘快捷键
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.mm-overlay.active').forEach(function (el) { el.classList.remove('active'); });
            if (batchMode) toggleBatchMode();
        }
        if (!showTable && !document.querySelector('.mm-overlay.active') &&
            !e.target.closest('.mm-search') && !e.target.closest('.mm-toolbar')) {
            if (e.key === 'ArrowLeft') { e.preventDefault(); prevBox(); }
            if (e.key === 'ArrowRight') { e.preventDefault(); nextBox(); }
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'k')) {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    });

    // 语言切换：重算所有动态文案并重新渲染
    document.addEventListener('languagechange', function () {
        document.title = tr('mat.doc.title');
        renderAll();
    });

    // ============================================================
    //  初始化
    // ============================================================
    document.title = tr('mat.doc.title');
    loadData();
})();
