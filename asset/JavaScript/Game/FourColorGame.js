// ============================================================
//  FourColorGame.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
//  地图用 Voronoi 图生成（半平面裁剪法），天然是平面图，
//  因此四色定理保证任意一关都有解
//  画布为扁平色块风格：区域=地块，边界=分界线
//  交互反馈：填色中心扫光、冲突抖动+闪红、连击/冲突飘字、
//            通关成功光波（均为交互反馈，非页面背景）
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    // 公共
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    // 标题
    'fcg.page.title': { zh: '四色定理填色', en: 'Four Color Theorem' },
    'fcg.subhead': {
        zh: '🔹 任意一张地图，四种颜色一定够用 —— 生成随机地图，用最少的步数完成四色填色',
        en: '🔹 Any map can be colored with four colors — generate a random map and finish the four-color fill in as few moves as you can'
    },

    // ① 关卡
    'fcg.p1.title': { zh: '① 选择关卡', en: '① Pick a Level' },
    'fcg.p1.small': { zh: '区域越多越烧脑', en: 'More regions, more brain' },
    'fcg.level.n':  { zh: '第 {n} 关', en: 'Level {n}' },
    'fcg.level.size': { zh: '{n} 区', en: '{n} regions' },
    'fcg.custom.label': { zh: '自定义板块', en: 'Custom size' },
    'fcg.custom.go':    { zh: '生成', en: 'Generate' },
    'fcg.custom.start': { zh: '已生成 {n} 块地图', en: 'Generated a {n}-region map' },
    'fcg.custom.locked': { zh: '🔒 通关全部 14 关后解锁自定义', en: '🔒 Clear all 14 levels to unlock custom' },

    // 统一信息模块选项卡
    'fcg.tab.level': { zh: '关卡', en: 'Levels' },
    'fcg.tab.play':  { zh: '玩法', en: 'How' },
    'fcg.tab.best':  { zh: '记录', en: 'Records' },
    'fcg.tab.badge': { zh: '成就', en: 'Badges' },
    'fcg.tab.about': { zh: '关于', en: 'About' },

    // HUD
    'fcg.hud.level':    { zh: '关卡', en: 'Level' },
    'fcg.hud.progress': { zh: '进度', en: 'Progress' },
    'fcg.hud.time':     { zh: '用时', en: 'Time' },
    'fcg.hud.moves':    { zh: '步数', en: 'Moves' },
    'fcg.hud.score':    { zh: '积分', en: 'Score' },
    'fcg.hud.combo':    { zh: '连击', en: 'Combo' },

    // 工具
    'fcg.tool.undo':  { zh: '撤销', en: 'Undo' },
    'fcg.tool.hint':  { zh: '提示', en: 'Hint' },
    'fcg.tool.reset': { zh: '重来', en: 'Restart' },
    'fcg.tool.new':   { zh: '换图', en: 'New Map' },
    'fcg.tool.sound': { zh: '音效', en: 'Sound' },
    'fcg.tool.marks': { zh: '标记', en: 'Marks' },
    'fcg.tool.undo.title':  { zh: '撤销上一步（Z）', en: 'Undo last move (Z)' },
    'fcg.tool.hint.title':  { zh: '自动填对一个区域（H）', en: 'Auto-fill one region correctly (H)' },
    'fcg.tool.reset.title': { zh: '清空本关重新填色（R）', en: 'Clear the board and start over (R)' },
    'fcg.tool.new.title':   { zh: '重新生成一张地图（N）', en: 'Generate a brand new map (N)' },
    'fcg.tool.sound.title': { zh: '开关音效', en: 'Toggle sound' },
    'fcg.tool.marks.title': { zh: '开关色盲友好标记', en: 'Toggle color-blind friendly marks' },

    'fcg.hint.keys': { zh: '💡 快捷键：1~4 切换颜色 · Z 撤销 · H 提示 · R 重来 · N 换图',
                       en: '💡 Shortcuts: 1~4 pick color · Z undo · H hint · R restart · N new map' },


    // 提示浮字
    'fcg.msg.conflict':  { zh: '⚠ 相邻区域颜色撞了', en: '⚠ Neighbors share a color' },
    'fcg.msg.same':      { zh: '这一块已经是这个颜色了', en: 'Already this color' },
    'fcg.msg.nohint':    { zh: '提示次数用完了', en: 'No hints left' },
    'fcg.msg.hintdone':  { zh: '💡 帮你填了一块', en: '💡 Filled one for you' },
    'fcg.msg.reshuffle': { zh: '🔀 这块挡住了解，帮你换了色', en: '🔀 This one blocked the solution — recoloring for you' },
    'fcg.msg.noundo':    { zh: '没有可撤销的操作', en: 'Nothing to undo' },
    'fcg.msg.combo':     { zh: '连击 ×{n}!', en: 'Combo ×{n}!' },
    'fcg.msg.nearly':    { zh: '就差最后几块了', en: 'Almost there' },
    'fcg.msg.locked':    { zh: '🔒 通关上一关才能解锁', en: '🔒 Clear the previous level to unlock' },

    // 结算
    'fcg.win.title': { zh: '填色完成', en: 'Solved!' },
    'fcg.win.time':  { zh: '用时', en: 'Time' },
    'fcg.win.moves': { zh: '步数', en: 'Moves' },
    'fcg.win.score': { zh: '本关积分', en: 'Score' },
    'fcg.win.best':  { zh: '历史最佳', en: 'Best' },
    'fcg.btn.replay': { zh: '再来一次', en: 'Replay' },
    'fcg.btn.next':   { zh: '下一关', en: 'Next' },
    'fcg.btn.finish': { zh: '全部通关', en: 'All Clear' },
    'fcg.lock.tip':   { zh: '通关上一关即可解锁', en: 'Clear the previous level to unlock' },

    // 侧栏
    'fcg.p3.rules': { zh: '怎么玩', en: 'How to Play' },
    'fcg.p3.best':  { zh: '本关最佳', en: 'Level Best' },
    'fcg.p3.badges': { zh: '成就', en: 'Achievements' },
    'fcg.rule.1': { zh: '点击底部调色板选色，再点地图上的区域填色', en: 'Pick a color below, then click a region on the map to fill it' },
    'fcg.rule.2': { zh: '有公共边界的两个区域不能用同一种颜色', en: 'Two regions sharing a border cannot share a color' },
    'fcg.rule.3': { zh: '只在一个点相交不算相邻，可以同色', en: 'Touching at a single point is fine — same color allowed' },
    'fcg.rule.4': { zh: '填满且零冲突即通关，步数越少星级越高', en: 'Fill everything with no clash to win; fewer moves, more stars' },
    'fcg.best.stars':  { zh: '星级', en: 'Stars' },
    'fcg.best.total':  { zh: '累计积分', en: 'Total Score' },
    'fcg.best.none':   { zh: '暂无记录', en: 'No record yet' },

    // 成就
    'fcg.badge.first':   { zh: '初次通关', en: 'First Clear' },
    'fcg.badge.first.d': { zh: '完成任意一关', en: 'Clear any level' },
    'fcg.badge.perfect': { zh: '完美通关', en: 'Perfect' },
    'fcg.badge.perfect.d': { zh: '零冲突且每区只填一次拿到三星', en: 'Earn 3 stars with no clash, one pass per region' },
    'fcg.badge.clean':   { zh: '零失误', en: 'Flawless' },
    'fcg.badge.clean.d': { zh: '全程零冲突完成 17 区以上关卡', en: 'Clear a 17+ region level without a single clash' },
    'fcg.badge.speed':   { zh: '神速', en: 'Speedrun' },
    'fcg.badge.speed.d': { zh: '60 秒内完成 20 区以上关卡', en: 'Clear a 20+ region level within 60s' },
    'fcg.badge.brain':   { zh: '智多星', en: 'Brain' },
    'fcg.badge.brain.d': { zh: '累计 5 关不用提示通关', en: 'Clear 5 levels without using a hint' },
    'fcg.badge.vlsi':    { zh: '巨图征服', en: 'Grand' },
    'fcg.badge.vlsi.d':  { zh: '通关 48 区以上的超大地图', en: 'Clear a 48+ region mega map' },
    'fcg.badge.master':  { zh: '全制霸', en: 'Conqueror' },
    'fcg.badge.master.d': { zh: '通关全部 14 个关卡', en: 'Clear all 14 levels' },

    // 科普
    'fcg.p4.title': { zh: '④ 关于四色定理', en: '④ About the Four Color Theorem' },
    'fcg.p4.small': { zh: '困扰数学家 124 年的问题，如今藏在一张张地图里', en: 'A 124-year-old map-coloring puzzle, now hiding in every map' },
    'fcg.fact.year':    { zh: '提出时间', en: 'Conjectured' },
    'fcg.fact.yearVal': { zh: '1852 年，英国学生古德里在给地图填色时提出猜想', en: '1852 — British student Guthrie noticed it while coloring a map' },
    'fcg.fact.proof':    { zh: '证明时间', en: 'Proved' },
    'fcg.fact.proofVal': { zh: '1976 年，阿佩尔与哈肯用计算机穷举 1936 种构型完成证明', en: '1976 — Appel & Haken exhausted 1,936 configurations by computer' },
    'fcg.fact.meaning':    { zh: '它在说什么', en: 'What it says' },
    'fcg.fact.meaningVal': { zh: '任意一张画在平面或球面上的地图，四种颜色一定够用', en: 'Any map on a plane or sphere can be colored with four colors' },
    'fcg.fact.three':    { zh: '三种够吗', en: 'Are three enough?' },
    'fcg.fact.threeVal': { zh: '不够。四个两两相邻的区域构成反例，本游戏里经常出现', en: 'No. Four mutually adjacent regions are a counterexample — you will meet them often here' },
    'fcg.fact.planar':    { zh: '平面图', en: 'Planar Graph' },
    'fcg.fact.planarVal': { zh: '地图本质是平面图，本作用 Voronoi 图生成，天然满足定理前提', en: 'A map is a planar graph; this game generates Voronoi diagrams, which satisfy the premise by construction' },
    'fcg.fact.five':    { zh: '五色定理', en: 'Five Color Theorem' },
    'fcg.fact.fiveVal': { zh: '五色定理 1890 年已被手算证明，比四色早了 86 年', en: 'The five color theorem was proved by hand in 1890, 86 years earlier' },
    'fcg.fact.tip': { zh: '💡 试试看：当你卡住时，往往是因为某个区域被三种颜色包围了 —— 换个远处区域的颜色，连锁调整一下就通了。',
                      en: '💡 Stuck? Some region is probably boxed in by three colors — recolor something further away and cascade the fix.' },

    // 页脚
    'fcg.footer': { zh: '🔧 四色定理填色 · 随机地图生成 · 14 关 + 自定义 · 本地保存进度',
                    en: '🔧 Four Color Theorem · random maps · 14 levels + custom · progress saved locally' }
};

(function () {
    'use strict';

    // ============================================================
    //  翻译回退
    // ============================================================
    function tr(key, vars) {
        var v = null;
        if (window.I18N && window.I18N.t) v = window.I18N.t(key);
        if (v === null || v === undefined) {
            var entry = (window.I18N_STRINGS || {})[key];
            v = entry ? entry.zh : key;
        }
        if (vars) {
            Object.keys(vars).forEach(function (k) {
                v = v.replace('{' + k + '}', vars[k]);
            });
        }
        return v;
    }

    function lang() {
        return (window.I18N && window.I18N.getLang && window.I18N.getLang() === 'en') ? 'en' : 'zh';
    }

    // ============================================================
    //  常量
    // ============================================================
    // 14 个难度关卡，区域数递增（单一「四色填色」模块）
    var LEVELS = [8, 11, 14, 17, 20, 24, 28, 32, 36, 40, 44, 48, 52, 58];

    var BW = 400, BH = 300;          // 地图逻辑尺寸（4:3）
    var MIN_EDGE = 2.4;              // 共享边小于此长度视为仅点接触
    var HINTS_PER_LEVEL = 3;
    var MARKS = ['●', '▲', '■', '★'];


        // 画布配色从主题变量读取（见 readTheme），随站点明/暗主题切换


    var BADGES = [
        { id: 'first',  icon: '⚡' },
        { id: 'perfect', icon: '💎' },
        { id: 'clean',  icon: '🛠️' },
        { id: 'speed',  icon: '🚀' },
        { id: 'brain',  icon: '🧩' },
        { id: 'vlsi',   icon: '🔬' },
        { id: 'master', icon: '👑' }
    ];

    // ============================================================
    //  存档
    // ============================================================
    var PKEY = 'toolbox-game-fourcolor-progress';
    var SKEY = 'toolbox-game-fourcolor-settings';

    function loadJSON(key, fallback) {
        try {
            var raw = localStorage.getItem(key);
            if (raw) {
                var obj = JSON.parse(raw);
                if (obj && typeof obj === 'object') return obj;
            }
        } catch (e) {}
        return fallback;
    }

    function saveJSON(key, obj) {
        try { localStorage.setItem(key, JSON.stringify(obj)); } catch (e) {}
    }

    var progress = loadJSON(PKEY, null) || { unlocked: 1, levels: {}, custom: null, badges: [], noHintClears: 0 };
    if (!progress.levels) progress.levels = {};
    if (!progress.custom) progress.custom = null;
    if (!progress.badges) progress.badges = [];
    if (typeof progress.noHintClears !== 'number') progress.noHintClears = 0;
    if (typeof progress.unlocked !== 'number' || progress.unlocked < 1) progress.unlocked = 1;

    var settings = loadJSON(SKEY, null) || { sound: true, marks: true };
    if (typeof settings.sound !== 'boolean') settings.sound = true;
    if (typeof settings.marks !== 'boolean') settings.marks = true;

    // ============================================================
    //  随机数（可复现：同一张图在重开时保持一致）
    // ============================================================
    function makeRng(seed) {
        var s = seed >>> 0 || 1;
        return function () {
            s ^= s << 13; s >>>= 0;
            s ^= s >> 17;
            s ^= s << 5;  s >>>= 0;
            return s / 4294967296;
        };
    }

    // ============================================================
    //  Voronoi：半平面裁剪法
    // ============================================================
    function clipHalfPlane(poly, ax, ay, c) {
        var out = [], n = poly.length, i;
        for (i = 0; i < n; i++) {
            var p = poly[i], q = poly[(i + 1) % n];
            var fp = ax * p[0] + ay * p[1] - c;
            var fq = ax * q[0] + ay * q[1] - c;
            if (fp <= 0) out.push(p);
            if ((fp < 0 && fq > 0) || (fp > 0 && fq < 0)) {
                var t = fp / (fp - fq);
                out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]);
            }
        }
        return out;
    }

    function polyArea(poly) {
        var a = 0;
        for (var i = 0, n = poly.length; i < n; i++) {
            var p = poly[i], q = poly[(i + 1) % n];
            a += p[0] * q[1] - q[0] * p[1];
        }
        return Math.abs(a) / 2;
    }

    function polyCentroid(poly) {
        var cx = 0, cy = 0, a = 0;
        for (var i = 0, n = poly.length; i < n; i++) {
            var p = poly[i], q = poly[(i + 1) % n];
            var f = p[0] * q[1] - q[0] * p[1];
            a += f; cx += (p[0] + q[0]) * f; cy += (p[1] + q[1]) * f;
        }
        if (Math.abs(a) < 1e-9) {
            return [poly[0][0], poly[0][1]];
        }
        return [cx / (3 * a), cy / (3 * a)];
    }

    // 两条线段落在同一直线上时的重叠长度
    function overlapLen(p1, p2, q1, q2) {
        var d1x = p2[0] - p1[0], d1y = p2[1] - p1[1];
        var d2x = q2[0] - q1[0], d2y = q2[1] - q1[1];
        var l1 = Math.sqrt(d1x * d1x + d1y * d1y);
        var l2 = Math.sqrt(d2x * d2x + d2y * d2y);
        if (l1 < 1e-6 || l2 < 1e-6) return 0;
        var cross = d1x * d2y - d1y * d2x;
        if (Math.abs(cross) > 1e-6 * l1 * l2) return 0;
        var dist = Math.abs((q1[0] - p1[0]) * d1y - (q1[1] - p1[1]) * d1x) / l1;
        if (dist > 0.8) return 0;
        var ux = d1x / l1, uy = d1y / l1;
        var s1 = (q1[0] - p1[0]) * ux + (q1[1] - p1[1]) * uy;
        var s2 = (q2[0] - p1[0]) * ux + (q2[1] - p1[1]) * uy;
        var lo = Math.max(0, Math.min(s1, s2));
        var hi = Math.min(l1, Math.max(s1, s2));
        return hi > lo ? hi - lo : 0;
    }

    function sharedEdgeLen(A, B) {
        var total = 0;
        for (var a = 0; a < A.length; a++) {
            var p1 = A[a], p2 = A[(a + 1) % A.length];
            for (var b = 0; b < B.length; b++) {
                total += overlapLen(p1, p2, B[b], B[(b + 1) % B.length]);
                if (total >= MIN_EDGE) return total;
            }
        }
        return total;
    }

    function pointInConvex(poly, x, y) {
        var sign = 0;
        for (var i = 0, n = poly.length; i < n; i++) {
            var p = poly[i], q = poly[(i + 1) % n];
            var c = (q[0] - p[0]) * (y - p[1]) - (q[1] - p[1]) * (x - p[0]);
            if (Math.abs(c) < 1e-9) continue;
            var s = c > 0 ? 1 : -1;
            if (sign === 0) sign = s;
            else if (sign !== s) return false;
        }
        return true;
    }

    function buildCells(sites) {
        var n = sites.length, cells = [], i, j;
        for (i = 0; i < n; i++) {
            var poly = [[0, 0], [BW, 0], [BW, BH], [0, BH]];
            for (j = 0; j < n && poly.length; j++) {
                if (i === j) continue;
                var ax = 2 * (sites[j].x - sites[i].x);
                var ay = 2 * (sites[j].y - sites[i].y);
                var c = (sites[j].x * sites[j].x + sites[j].y * sites[j].y) -
                        (sites[i].x * sites[i].x + sites[i].y * sites[i].y);
                poly = clipHalfPlane(poly, ax, ay, c);
            }
            cells.push({ poly: poly, center: [0, 0], area: 0, adj: [], maxR: 60 });
        }
        for (i = 0; i < n; i++) {
            if (cells[i].poly.length < 3) { cells[i].area = 0; continue; }
            cells[i].center = polyCentroid(cells[i].poly);
            cells[i].area = polyArea(cells[i].poly);
            for (j = i + 1; j < n; j++) {
                if (cells[j].poly.length < 3) continue;
                if (sharedEdgeLen(cells[i].poly, cells[j].poly) >= MIN_EDGE) {
                    cells[i].adj.push(j);
                    cells[j].adj.push(i);
                }
            }
        }
        return cells;
    }

    // 生成站点：抖动网格 + 一次 Lloyd 松弛，让区域大小更自然
    function generateMap(count, rng) {
        var cols = Math.max(2, Math.round(Math.sqrt(count * BW / BH)));
        var rows = Math.ceil(count / cols);
        var cw = BW / cols, chh = BH / rows;
        var sites = [], i, j;

        for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
                if (sites.length >= count) break;
                sites.push({
                    x: Math.min(BW - 8, Math.max(8, (j + 0.5 + (rng() - 0.5) * 0.66) * cw)),
                    y: Math.min(BH - 8, Math.max(8, (i + 0.5 + (rng() - 0.5) * 0.66) * chh))
                });
            }
        }

        var cells = buildCells(sites);
        for (i = 0; i < sites.length; i++) {
            if (cells[i] && cells[i].area > 1) {
                sites[i].x = Math.min(BW - 4, Math.max(4, cells[i].center[0]));
                sites[i].y = Math.min(BH - 4, Math.max(4, cells[i].center[1]));
            }
        }
        cells = buildCells(sites);

        // 丢掉退化单元（理论上不会出现，保险起见）
        var kept = [], keptSites = [];
        for (i = 0; i < cells.length; i++) {
            if (cells[i].poly.length >= 3 && cells[i].area > 4) {
                kept.push(cells[i]);
                keptSites.push(sites[i]);
            }
        }
        // 重新编号邻接
        var map = [];
        for (i = 0; i < cells.length; i++) {
            map.push(kept.indexOf(cells[i]));
        }
        for (i = 0; i < kept.length; i++) {
            kept[i].adj = kept[i].adj.map(function (x) { return map[x]; })
                                     .filter(function (x) { return x >= 0; });
            kept[i].adj = kept[i].adj.filter(function (v, k, arr) { return arr.indexOf(v) === k; });
        }
        return kept;
    }

    // ============================================================
    //  四色求解（回溯 + 度数降序）
    // ============================================================
    function solveColors(cells, fixed) {
        var n = cells.length;
        var color = new Array(n), i, k;
        for (i = 0; i < n; i++) color[i] = -1;

        // 采纳玩家已填且互不冲突的部分（先出现者优先）
        for (i = 0; i < n; i++) {
            if (fixed && fixed[i] >= 0) {
                var ok = true;
                for (k = 0; k < cells[i].adj.length; k++) {
                    if (color[cells[i].adj[k]] === fixed[i]) { ok = false; break; }
                }
                if (ok) color[i] = fixed[i];
            }
        }

        function canUse(v, c) {
            for (var m = 0; m < cells[v].adj.length; m++) {
                if (color[cells[v].adj[m]] === c) return false;
            }
            return true;
        }

        // MRV：每步挑可选颜色最少、度数最大的区域先染，平面图下几十步内收敛
        var guard = 0;
        function bt() {
            if (++guard > 200000) return false;
            var best = -1, bestOpts = 5, bestDeg = -1;
            for (var v = 0; v < n; v++) {
                if (color[v] >= 0) continue;
                var opts = 0;
                for (var c = 0; c < 4; c++) if (canUse(v, c)) opts++;
                if (opts < bestOpts || (opts === bestOpts && cells[v].adj.length > bestDeg)) {
                    best = v; bestOpts = opts; bestDeg = cells[v].adj.length;
                }
            }
            if (best < 0) return true;
            if (bestOpts === 0) return false;
            for (var c2 = 0; c2 < 4; c2++) {
                if (!canUse(best, c2)) continue;
                color[best] = c2;
                if (bt()) return true;
                color[best] = -1;
            }
            return false;
        }

        return bt() ? color : null;
    }

    // 提示用的参考解：整局固定一份，绝不在中途重算。
    function blankColors(n) {
        var a = new Array(n), i;
        for (i = 0; i < n; i++) a[i] = -1;
        return a;
    }

    // ============================================================
    //  游戏状态
    // ============================================================
    var state = {
        level: 0,
        customCount: 0,          // >0 时为自定义关卡
        cells: [],
        colors: [],
        history: [],
        hintsLeft: HINTS_PER_LEVEL,
        moves: 0,
        combo: 0,
        comboMax: 0,
        startTime: 0,
        elapsed: 0,
        running: false,
        timer: null,
        conflictsEver: 0,
        solved: false,
        seed: 1,
        selected: 0,
        hover: -1,
        locked: false,
        revealStart: 0,
        solution: null,
        // 交互特效
        anim: {},                 // regionIndex -> {from,to,t0,dur}
        flash: [],                // 冲突红闪 [{i,t0}]
        floats: [],               // 飘字 [{x,y,text,color,t0,dur}]
        winWave: 0,               // 通关成功光波起点
        shakeUntil: 0,            // 冲突时整块板抖动截止时刻
    };

    var ripples = [];
    var confetti = [];
    var lastFrame = 0;
    var needsDraw = true;

    // ============================================================
    //  DOM
    // ============================================================
    var board = document.getElementById('board');
    var fx = document.getElementById('fx');
    var bctx = board.getContext('2d');
    var fctx = fx.getContext('2d');
    var canvasWrap = document.getElementById('canvasWrap');
    var paletteEl = document.getElementById('palette');
    var levelListEl = document.getElementById('levelList');
    var badgeListEl = document.getElementById('badgeList');
    var toastEl = document.getElementById('toast');
    var winOverlay = document.getElementById('winOverlay');
    var lockOverlay = document.getElementById('lockOverlay');
    var comboBox = document.getElementById('comboBox');
    var customInput = document.getElementById('customCount');
    var btnCustom = document.getElementById('btnCustom');

    var statLevel = document.getElementById('statLevel');
    var statProgress = document.getElementById('statProgress');
    var statTime = document.getElementById('statTime');
    var statMoves = document.getElementById('statMoves');
    var statScore = document.getElementById('statScore');
    var statCombo = document.getElementById('statCombo');
    var progressFill = document.getElementById('progressFill');
    var hintLeft = document.getElementById('hintLeft');

    var btnUndo = document.getElementById('btnUndo');
    var btnHint = document.getElementById('btnHint');
    var btnReset = document.getElementById('btnReset');
    var btnNew = document.getElementById('btnNew');
    var btnSound = document.getElementById('btnSound');
    var btnMarks = document.getElementById('btnMarks');

    var bestTime = document.getElementById('bestTime');
    var bestMoves = document.getElementById('bestMoves');
    var bestScore = document.getElementById('bestScore');
    var bestStars = document.getElementById('bestStars');
    var totalScoreEl = document.getElementById('totalScore');
    var badgeCountEl = document.getElementById('badgeCount');

    var winEmoji = document.getElementById('winEmoji');
    var winStars = document.getElementById('winStars');
    var winTime = document.getElementById('winTime');
    var winMoves = document.getElementById('winMoves');
    var winScore = document.getElementById('winScore');
    var winBest = document.getElementById('winBest');
    var winBadges = document.getElementById('winBadges');
    var winNext = document.getElementById('winNext');

    // ============================================================
    //  主题色读取
    // ============================================================
    var theme = {};

    function readTheme() {
        var cs = getComputedStyle(document.documentElement);
        function v(name, fallback) {
            var s = cs.getPropertyValue(name).trim();
            return s || fallback;
        }
        // 颜色全部来自站点 CSS 变量（明/暗主题各有一套），切换系统主题即生效
        theme.colors = [
            v('--fcg-c1', '#ef4444'),
            v('--fcg-c2', '#3b82f6'),
            v('--fcg-c3', '#22c55e'),
            v('--fcg-c4', '#f59e0b')
        ];
        theme.empty = v('--fcg-empty', '#e8edf5');
        theme.line = v('--fcg-line', '#b9c3d4');
        theme.hover = v('--fcg-hover', '#94a3b8');
        theme.label = v('--fcg-label', '#334155');
        theme.labelInv = v('--fcg-label-inv', '#ffffff');
        theme.conflict = v('--fcg-conflict', '#dc2626');
        theme.boardBg = v('--fcg-board', theme.empty);
        theme.labelFill = '#ffffff';
    }

    // ============================================================
    //  音效（Web Audio 合成，无外部资源）
    // ============================================================
    var actx = null;

    function tone(freq, dur, type, gain, delay) {
        if (!settings.sound) return;
        try {
            var AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            if (!actx) actx = new AC();
            if (actx.state === 'suspended') actx.resume();
            var t0 = actx.currentTime + (delay || 0);
            var osc = actx.createOscillator();
            var g = actx.createGain();
            osc.type = type || 'sine';
            osc.frequency.setValueAtTime(freq, t0);
            g.gain.setValueAtTime(0.0001, t0);
            g.gain.exponentialRampToValueAtTime(gain || 0.05, t0 + 0.012);
            g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
            osc.connect(g);
            g.connect(actx.destination);
            osc.start(t0);
            osc.stop(t0 + dur + 0.02);
        } catch (e) {}
    }

    var SFX = {
        fill:  function (n) { tone(420 + n * 70, 0.09, 'sine', 0.05); },
        undo:  function () { tone(300, 0.07, 'triangle', 0.04); },
        bad:   function () { tone(170, 0.2, 'square', 0.035); },
        hint:  function () { tone(880, 0.12, 'sine', 0.045); },
        win:   function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.26, 'sine', 0.05, i * 0.1); }); }
    };

    // ============================================================
    //  Canvas 尺寸
    // ============================================================
    var dpr = 1, cssW = 0, cssH = 0;

    function resizeCanvas() {
        dpr = window.devicePixelRatio || 1;
        cssW = canvasWrap.clientWidth;
        cssH = canvasWrap.clientHeight;
        if (!cssW || !cssH) return;
        [board, fx].forEach(function (cv) {
            cv.width = Math.round(cssW * dpr);
            cv.height = Math.round(cssH * dpr);
        });
        bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        needsDraw = true;
    }

    // ============================================================
    //  绘制辅助
    // ============================================================
    function pathCell(cell, sx, sy) {
        bctx.beginPath();
        bctx.moveTo(cell.poly[0][0] * sx, cell.poly[0][1] * sy);
        for (var k = 1; k < cell.poly.length; k++) {
            bctx.lineTo(cell.poly[k][0] * sx, cell.poly[k][1] * sy);
        }
        bctx.closePath();
    }

        // 区域填充与描边在 draw() 内完成（常规地图皮肤，无螺丝/焊盘/引脚装饰）


    

    // 返回某区块当前应显示的颜色动画状态；无动画返回 null
    function cellAnim(i, now) {
        var a = state.anim[i];
        if (!a) return null;
        var p = (now - a.t0) / a.dur;
        if (p >= 1) { state.anim[i] = null; return null; }
        return { from: a.from, to: a.to, e: 1 - Math.pow(1 - p, 3) };
    }

    // ============================================================
    //  绘制（扁平色块 + 交互反馈）
    // ============================================================
        function draw() {
        if (!cssW || !cssH) return;
        var sx = cssW / BW, sy = cssH / BH;
        var now = performance.now();

        var reveal = Math.max(0, Math.min(1, (now - state.revealStart) / 620));
        var ease = 1 - Math.pow(1 - reveal, 3);

        var shx = 0, shy = 0;
        if (state.shakeUntil > now) {
            var k = (state.shakeUntil - now) / 260;
            var amp = 3 * k;
            shx = Math.sin(now / 18) * amp;
            shy = Math.cos(now / 15) * amp;
        }

        bctx.clearRect(0, 0, cssW, cssH);
        bctx.save();
        bctx.translate(shx, shy);

        // ===== 画布底板：干净的浅/深色（随主题切换） =====
        bctx.fillStyle = theme.boardBg;
        bctx.fillRect(-12, -12, cssW + 24, cssH + 24);

        var conflicts = findConflicts();
        var conflictSet = {};
        conflicts.forEach(function (p) { conflictSet[p[0]] = 1; conflictSet[p[1]] = 1; });

        // ===== 区域：扁平实色填充（无渐变高光） =====
        for (var i = 0; i < state.cells.length; i++) {
            var cell = state.cells[i];
            if (cell.poly.length < 3) continue;
            var a = cellAnim(i, now);
            var baseCol = a ? a.from : state.colors[i];
            pathCell(cell, sx, sy);
            if (baseCol >= 0) {
                bctx.fillStyle = theme.colors[baseCol];
                bctx.fill();
            } else {
                bctx.fillStyle = theme.empty;   // 裸板
                bctx.fill();
            }
            if (a) {
                var r = (a.to >= 0 ? a.e : (1 - a.e)) * (cell.maxR || 60);
                if (r > 0.5) {
                    bctx.save();
                    bctx.beginPath();
                    bctx.arc(cell.center[0] * sx, cell.center[1] * sy, r, 0, Math.PI * 2);
                    bctx.clip();
                    pathCell(cell, sx, sy);
                    bctx.fillStyle = theme.colors[(a.to >= 0 ? a.to : a.from)];
                    bctx.fill();
                    bctx.restore();
                }
            }
        }

        // ===== 区块沉边：单一深线，扁平分隔 =====
        for (i = 0; i < state.cells.length; i++) {
            var cell2 = state.cells[i];
            if (cell2.poly.length < 3) continue;
            pathCell(cell2, sx, sy);
            bctx.save();
            bctx.lineJoin = 'round';
            bctx.strokeStyle = theme.line;
            bctx.lineWidth = 1.6;
            bctx.stroke();
            bctx.restore();
        }

        // 冲突呼吸高亮
        if (conflicts.length) {
            var pulse = 0.55 + 0.45 * Math.sin(now / 190);
            bctx.save();
            bctx.strokeStyle = theme.conflict;
            bctx.lineWidth = 3;
            bctx.globalAlpha = pulse;
            Object.keys(conflictSet).forEach(function (key) {
                var idx = parseInt(key, 10);
                var cc = state.cells[idx];
                if (!cc || cc.poly.length < 3) return;
                pathCell(cc, sx, sy);
                bctx.stroke();
            });
            bctx.restore();
        }

        // 冲突红闪（一次性，渐隐）
        state.flash = state.flash.filter(function (f) { return now - f.t0 < 360; });
        state.flash.forEach(function (f) {
            var cc = state.cells[f.i];
            if (!cc || cc.poly.length < 3) return;
            var al = 0.5 * (1 - (now - f.t0) / 360);
            pathCell(cc, sx, sy);
            bctx.save();
            bctx.fillStyle = 'rgba(220,38,38,' + al + ')';
            bctx.fill();
            bctx.restore();
        });

        // 填色信号涟漪
        ripples = ripples.filter(function (r) { return now - r.t0 < 560; });
        ripples.forEach(function (r) {
            var p = (now - r.t0) / 560;
            var cell = state.cells[r.i];
            if (!cell) return;
            var cx = cell.center[0] * sx, cy = cell.center[1] * sy;
            for (var ring = 0; ring < 2; ring++) {
                var pp = p - ring * 0.18;
                if (pp < 0 || pp > 1) continue;
                bctx.save();
                bctx.globalAlpha = (1 - pp) * 0.6;
                bctx.strokeStyle = theme.colors[r.c];
                bctx.lineWidth = 3 * (1 - pp) + 0.6;
                bctx.beginPath();
                bctx.arc(cx, cy, (8 + pp * Math.max(cssW, cssH) * 0.34), 0, Math.PI * 2);
                bctx.stroke();
                bctx.restore();
            }
        });

        // 区域视觉：去掉文字标签，仅保留色盲友好标记（形状符号，非文字）
        for (i = 0; i < state.cells.length; i++) {
            var cl = state.cells[i];
            if (cl.poly.length < 3 || cl.area < 120) continue;
            var cx2 = cl.center[0] * sx, cy2 = cl.center[1] * sy;
            var cIdx = state.colors[i];
            if (settings.marks && cIdx >= 0) {
                bctx.save();
                bctx.globalAlpha = 0.9 + 0.1 * ease;
                bctx.fillStyle = theme.labelFill;
                bctx.shadowColor = 'rgba(0,0,0,0.35)';
                bctx.shadowBlur = 2;
                bctx.font = '700 ' + Math.max(10, Math.min(14, Math.sqrt(cl.area) * 0.24)) + 'px system-ui, sans-serif';
                bctx.textAlign = 'center';
                bctx.textBaseline = 'middle';
                bctx.fillText(MARKS[cIdx], cx2, cy2);
                bctx.restore();
            }
        }

        // 悬停高亮（用主题色，温和提示当前区域）
        if (state.hover >= 0 && state.cells[state.hover]) {
            var hc = state.cells[state.hover];
            if (hc.poly.length >= 3) {
                pathCell(hc, sx, sy);
                bctx.save();
                bctx.fillStyle = theme.hover;
                bctx.globalAlpha = 0.16;
                bctx.fill();
                bctx.restore();
                bctx.save();
                bctx.strokeStyle = theme.hover;
                bctx.lineWidth = 2;
                pathCell(hc, sx, sy);
                bctx.stroke();
                bctx.restore();
            }
        }

        // 通关成功光波（从中心向外扩散的亮带）
        if (state.winWave) {
            var bcx = BW / 2, bcy = BH / 2;
            var wnow = now - state.winWave;
            for (i = 0; i < state.cells.length; i++) {
                var cc2 = state.cells[i];
                if (cc2.poly.length < 3) continue;
                var dx = cc2.center[0] - bcx, dy = cc2.center[1] - bcy;
                var dist = Math.sqrt(dx * dx + dy * dy);
                var t = wnow - dist * 1.6;
                if (t > 0 && t < 700) {
                    var ap = Math.sin((t / 700) * Math.PI) * 0.5;
                    pathCell(cc2, sx, sy);
                    bctx.save();
                    bctx.fillStyle = 'rgba(255,255,255,' + ap + ')';
                    bctx.fill();
                    bctx.restore();
                }
            }
        }

        bctx.restore();
    }
    // 浮层画布：彩屑 + 飘字
    function drawFx() {
        fctx.clearRect(0, 0, cssW, cssH);
        var i;
        for (i = 0; i < confetti.length; i++) {
            var p = confetti[i];
            fctx.save();
            fctx.globalAlpha = Math.max(0, Math.min(1, p.life));
            fctx.translate(p.x, p.y);
            fctx.rotate(p.r);
            fctx.fillStyle = theme.colors[p.c % 4];
            fctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
            fctx.restore();
        }
        var now = performance.now();
        state.floats = state.floats.filter(function (f) { return now - f.t0 < f.dur; });
        for (i = 0; i < state.floats.length; i++) {
            var f = state.floats[i];
            var pr = (now - f.t0) / f.dur;
            var y = f.y - pr * 46;
            var al = 1 - pr;
            fctx.save();
            fctx.globalAlpha = Math.max(0, al);
            fctx.fillStyle = f.color;
            fctx.font = '800 18px system-ui, sans-serif';
            fctx.textAlign = 'center';
            fctx.textBaseline = 'middle';
            fctx.fillText(f.text, f.x, y);
            fctx.restore();
        }
    }

    function stepConfetti(dt) {
        if (!confetti.length) return;
        for (var i = confetti.length - 1; i >= 0; i--) {
            var p = confetti[i];
            p.vy += 0.26 * dt * 60;
            p.x += p.vx * dt * 60;
            p.y += p.vy * dt * 60;
            p.r += p.vr * dt * 60;
            p.life -= dt / 2.6;
            if (p.life <= 0 || p.y > cssH + 40) confetti.splice(i, 1);
        }
    }

    function burst() {
        for (var i = 0; i < 150; i++) {
            confetti.push({
                x: cssW / 2 + (Math.random() - 0.5) * cssW * 0.6,
                y: cssH * (0.3 + Math.random() * 0.2),
                vx: (Math.random() - 0.5) * 7,
                vy: -Math.random() * 9 - 2,
                s: 4 + Math.random() * 7,
                r: Math.random() * Math.PI,
                vr: (Math.random() - 0.5) * 0.32,
                c: Math.floor(Math.random() * 4),
                life: 1
            });
        }
    }

    // ============================================================
    //  动画循环
    // ============================================================
    function loop(ts) {
        var dt = lastFrame ? Math.min(0.05, (ts - lastFrame) / 1000) : 0.016;
        lastFrame = ts;
        var now = performance.now();

        var revealing = (now - state.revealStart) < 650;
        var animating = confetti.length > 0 || state.floats.length > 0 || state.flash.length > 0 ||
                        (state.shakeUntil > now) || revealing || (state.winWave > now - 2200) ||
                        Object.keys(state.anim).length > 0 || findConflicts().length > 0;
        if (animating) stepConfetti(dt);
        if (needsDraw || animating) {
            draw();
            needsDraw = false;
        }
        drawFx();
        requestAnimationFrame(loop);
    }

    // ============================================================
    //  游戏逻辑
    // ============================================================
    function findConflicts() {
        var out = [];
        for (var i = 0; i < state.cells.length; i++) {
            var ci = state.colors[i];
            if (ci < 0) continue;
            for (var k = 0; k < state.cells[i].adj.length; k++) {
                var j = state.cells[i].adj[k];
                if (j > i && state.colors[j] === ci) out.push([i, j]);
            }
        }
        return out;
    }

    function filledCount() {
        var n = 0;
        for (var i = 0; i < state.colors.length; i++) if (state.colors[i] >= 0) n++;
        return n;
    }

    function fmtTime(sec) {
        var m = Math.floor(sec / 60), s = sec % 60;
        return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }

    function toast(msg, kind) {
        toastEl.textContent = msg;
        toastEl.className = 'fcg-toast show' + (kind ? ' ' + kind : '');
        clearTimeout(toastEl._t);
        toastEl._t = setTimeout(function () {
            toastEl.className = 'fcg-toast';
        }, 1500);
    }

    function pushFloat(region, text, color) {
        var cell = state.cells[region];
        if (!cell) return;
        var sx = cssW / BW, sy = cssH / BH;
        state.floats.push({
            x: cell.center[0] * sx,
            y: cell.center[1] * sy,
            text: text,
            color: color,
            t0: performance.now(),
            dur: 900
        });
    }

    function newMap(seed) {
        state.seed = seed || (Date.now() ^ Math.floor(Math.random() * 0xffffff)) >>> 0;
        var rng = makeRng(state.seed);
        var count = state.customCount > 0 ? state.customCount : LEVELS[state.level];
        state.cells = generateMap(count, rng);
        state.colors = new Array(state.cells.length);
        for (var i = 0; i < state.colors.length; i++) state.colors[i] = -1;

        // 预计算每个区块到最远顶点的半径（用于扫光动画范围）
        for (i = 0; i < state.cells.length; i++) {
            var cell = state.cells[i];
            var m = 0;
            for (var k = 0; k < cell.poly.length; k++) {
                var dx = cell.poly[k][0] - cell.center[0];
                var dy = cell.poly[k][1] - cell.center[1];
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d > m) m = d;
            }
            cell.maxR = m;
        }

        state.history = [];
        state.hintsLeft = HINTS_PER_LEVEL;
        state.moves = 0;
        state.combo = 0;
        state.comboMax = 0;
        state.conflictsEver = 0;
        state.solved = false;
        state.elapsed = 0;
        state.startTime = 0;
        state.running = false;
        state.revealStart = performance.now();
        state.solution = solveColors(state.cells, blankColors(state.cells.length));
        state.anim = {};
        state.flash = [];
        state.floats = [];
        state.winWave = 0;
        state.shakeUntil = 0;
        ripples = [];
        confetti = [];
        winOverlay.classList.remove('show');
        stopTimer();
        updateHUD();
        needsDraw = true;
    }

    function startTimer() {
        if (state.running) return;
        state.running = true;
        state.startTime = Date.now() - state.elapsed * 1000;
        stopTimer();
        state.timer = setInterval(function () {
            state.elapsed = Math.floor((Date.now() - state.startTime) / 1000);
            statTime.textContent = fmtTime(state.elapsed);
        }, 250);
    }

    function stopTimer() {
        if (state.timer) { clearInterval(state.timer); state.timer = null; }
    }

    function paint(region, color) {
        if (region < 0 || region >= state.cells.length || state.solved) return;
        if (state.colors[region] === color) {
            toast(tr('fcg.msg.same'));
            return;
        }

        startTimer();
        var prev = state.colors[region];
        state.history.push({ items: [{ i: region, prev: prev }] });
        state.colors[region] = color;
        state.moves++;

        // 中心扫光动画
        state.anim[region] = { from: prev, to: color, t0: performance.now(), dur: 380 };
        ripples.push({ i: region, c: color, t0: performance.now() });

        var before = findConflicts().length;
        if (before > 0) {
            state.combo = 0;
            state.conflictsEver++;
            SFX.bad();
            state.shakeUntil = performance.now() + 260;
            state.flash.push({ i: region, t0: performance.now() });
            state.cells[region].adj.forEach(function (jj) { state.flash.push({ i: jj, t0: performance.now() }); });
            toast(tr('fcg.msg.conflict'), 'bad');
            pushFloat(region, '冲突!', '#ff6b6b');
        } else {
            state.combo++;
            if (state.combo > state.comboMax) state.comboMax = state.combo;
            SFX.fill(color);
            if (state.combo >= 2) pushFloat(region, '×' + state.combo, '#fbbf24');
            if (state.combo >= 3) toast(tr('fcg.msg.combo', { n: state.combo }), 'good');
        }

        updateHUD();
        needsDraw = true;
        checkWin();
    }

    function undo() {
        if (state.solved || !state.history.length) {
            toast(tr('fcg.msg.noundo'));
            return;
        }
        var last = state.history.pop();
        for (var i = 0; i < last.items.length; i++) {
            var it = last.items[i];
            state.anim[it.i] = { from: state.colors[it.i], to: it.prev, t0: performance.now(), dur: 340 };
            state.colors[it.i] = it.prev;
        }
        state.moves++;
        state.combo = 0;
        SFX.undo();
        updateHUD();
        needsDraw = true;
    }

    // 判断把 group 全部按参考解对齐后，group 边界上会不会产生新冲突
    function groupClashes(test, group) {
        var inGroup = {}, i, k;
        for (i = 0; i < group.length; i++) inGroup[group[i]] = 1;
        for (i = 0; i < group.length; i++) {
            var g = group[i];
            for (k = 0; k < state.cells[g].adj.length; k++) {
                var j = state.cells[g].adj[k];
                if (!inGroup[j] && test[j] >= 0 && test[j] === test[g]) return true;
            }
        }
        return false;
    }

    // 计算一次提示要改哪些区域。策略：
    //   ① 优先补空格 / 修冲突，颜色取「当前邻居没占用」的色，绝不主动引入冲突
    //   ② 只有当目标被四种颜色堵死时，才按固定参考解局部重排，并向外扩展
    //      到边界不再产生冲突为止 —— 这样每次提示都让局面严格向解收敛
    function computeHint() {
        var n = state.cells.length, i, k, c;
        var ref = state.solution;
        if (!ref) return null;

        var target = -1;
        for (i = 0; i < n; i++) {
            if (state.colors[i] < 0) { target = i; break; }
        }
        var conf = findConflicts();
        if (target < 0 && conf.length) target = conf[0][1];
        if (target < 0) return null;

        var used = {};
        for (k = 0; k < state.cells[target].adj.length; k++) {
            var nc = state.colors[state.cells[target].adj[k]];
            if (nc >= 0) used[nc] = 1;
        }
        var avail = [];
        for (c = 0; c < 4; c++) if (!used[c]) avail.push(c);

        if (avail.length) {
            var pick = (avail.indexOf(ref[target]) >= 0) ? ref[target] : avail[0];
            return [{ i: target, to: pick }];
        }

        // 被四色堵死：局部重排，必要时向外扩一圈
        var group = [target];
        var seen = {};
        seen[target] = 1;
        for (var round = 0; round < n; round++) {
            var next = group.slice();
            for (i = 0; i < group.length; i++) {
                var adj = state.cells[group[i]].adj;
                for (k = 0; k < adj.length; k++) {
                    if (!seen[adj[k]]) { seen[adj[k]] = 1; next.push(adj[k]); }
                }
            }
            var test = state.colors.slice();
            for (i = 0; i < next.length; i++) test[next[i]] = ref[next[i]];
            if (!groupClashes(test, next) || next.length >= n) {
                var changed = [];
                for (i = 0; i < next.length; i++) {
                    if (state.colors[next[i]] !== ref[next[i]]) {
                        changed.push({ i: next[i], to: ref[next[i]] });
                    }
                }
                return changed.length ? changed : null;
            }
            group = next;
        }
        return null;
    }

    function hint() {
        if (state.solved) return;
        if (state.hintsLeft <= 0) {
            toast(tr('fcg.msg.nohint'));
            return;
        }
        var changed = computeHint();
        if (!changed) { toast(tr('fcg.msg.nohint')); return; }

        startTimer();
        state.hintsLeft--;
        var items = [];
        for (var i = 0; i < changed.length; i++) {
            items.push({ i: changed[i].i, prev: state.colors[changed[i].i] });
            state.anim[changed[i].i] = { from: state.colors[changed[i].i], to: changed[i].to, t0: performance.now(), dur: 380 };
            state.colors[changed[i].i] = changed[i].to;
            ripples.push({ i: changed[i].i, c: changed[i].to, t0: performance.now() });
        }
        state.history.push({ items: items });
        state.moves++;
        state.combo = 0;
        SFX.hint();
        toast(tr(changed.length > 1 ? 'fcg.msg.reshuffle' : 'fcg.msg.hintdone'), 'good');
        updateHUD();
        needsDraw = true;
        checkWin();
    }

    function checkWin() {
        var n = state.cells.length;
        for (var i = 0; i < n; i++) {
            if (state.colors[i] < 0) {
                if (filledCount() === n - 3) toast(tr('fcg.msg.nearly'));
                return;
            }
        }
        if (findConflicts().length) return;
        win();
    }

    function calcStars(moves, n) {
        if (moves === n && state.hintsLeft === HINTS_PER_LEVEL && state.conflictsEver === 0) return 3;
        if (moves <= Math.ceil(n * 1.4) && state.hintsLeft >= HINTS_PER_LEVEL - 1) return 2;
        return 1;
    }

    function calcScore(stars, n) {
        var hintsUsed = HINTS_PER_LEVEL - state.hintsLeft;
        var s = n * 100
              + (stars === 3 ? 500 : stars === 2 ? 250 : 0)
              + Math.max(0, Math.round((n * 12 - state.elapsed) * 8))
              + state.comboMax * 20
              - hintsUsed * 120
              - state.conflictsEver * 30;
        return Math.max(60, s);
    }

    function win() {
        state.solved = true;
        stopTimer();
        var n = state.cells.length;
        var stars = calcStars(state.moves, n);
        var score = calcScore(stars, n);
        var hintsUsed = HINTS_PER_LEVEL - state.hintsLeft;
        var custom = state.customCount > 0;

        // 记录（自定义关卡单独存，不污染 14 关进度）
        if (!custom) {
            var key = String(state.level);
            var prev = progress.levels[key] || null;
            if (!prev || score > prev.score) {
                progress.levels[key] = { time: state.elapsed, moves: state.moves, score: score, stars: stars };
            } else if (stars > prev.stars) {
                prev.stars = stars;
            }
            if (state.level + 1 >= progress.unlocked && state.level + 1 < LEVELS.length) {
                progress.unlocked = state.level + 2;
            }
        } else {
            var cp = progress.custom;
            if (!cp || score > cp.score) {
                progress.custom = { time: state.elapsed, moves: state.moves, score: score, stars: stars, n: n };
            }
        }
        if (hintsUsed === 0) progress.noHintClears++;

        // 成就
        var got = [];
        function award(id) {
            if (progress.badges.indexOf(id) === -1) {
                progress.badges.push(id);
                got.push(id);
            }
        }
        award('first');
        if (stars === 3) award('perfect');
        if (state.conflictsEver === 0 && n >= 17) award('clean');
        if (state.elapsed <= 60 && n >= 20) award('speed');
        if (progress.noHintClears >= 5) award('brain');
        if (n >= 48) award('vlsi');
        if (!custom && Object.keys(progress.levels).length >= LEVELS.length) award('master');

        saveJSON(PKEY, progress);

        // 结算面板
        winEmoji.textContent = stars === 3 ? '🏆' : (stars === 2 ? '🎉' : '👍');
        winStars.innerHTML = [0, 1, 2].map(function (i) {
            return i < stars ? '★' : '<span class="off">★</span>';
        }).join('');
        winTime.textContent = fmtTime(state.elapsed);
        winMoves.textContent = state.moves;
        winScore.textContent = score;
        var bestKey = custom ? progress.custom : progress.levels[String(state.level)];
        winBest.textContent = bestKey ? (bestKey.score + ' · ' + fmtTime(bestKey.time)) : '--';
        winBadges.innerHTML = got.map(function (id) {
            var b = BADGES.filter(function (x) { return x.id === id; })[0];
            if (!b) return '';
            return '<span class="fcg-win-badge">' + b.icon + ' ' + tr('fcg.badge.' + id) + '</span>';
        }).join('');
        winNext.textContent = custom ? tr('fcg.btn.replay')
                                    : (state.level + 1 < LEVELS.length ? tr('fcg.btn.next') : tr('fcg.btn.finish'));

        setTimeout(function () { winOverlay.classList.add('show'); }, 260);
        state.winWave = performance.now();
        burst();
        SFX.win();

        renderLevels();
        renderBadges();
        renderBest();
        updateHUD();
    }

    // ============================================================
    //  HUD 与面板渲染
    // ============================================================
    function updateHUD() {
        var n = state.cells.length;
        var filled = filledCount();
        statLevel.textContent = state.customCount > 0 ? (lang() === 'en' ? 'Custom' : '自定义') : (state.level + 1);
        statProgress.textContent = filled + '/' + n;
        statTime.textContent = fmtTime(state.elapsed);
        statMoves.textContent = state.moves;
        statScore.textContent = liveScore();
        statCombo.textContent = '×' + state.combo;
        comboBox.classList.toggle('hot', state.combo >= 3);
        progressFill.style.width = (n ? (filled / n * 100) : 0) + '%';
        hintLeft.textContent = state.hintsLeft;
    }

    function liveScore() {
        if (state.solved) {
            var rec = state.customCount > 0 ? progress.custom : progress.levels[String(state.level)];
            return rec ? rec.score : 0;
        }
        var n = state.cells.length;
        var hintsUsed = HINTS_PER_LEVEL - state.hintsLeft;
        return Math.max(60, n * 100 + state.comboMax * 20
            + Math.max(0, Math.round((n * 12 - state.elapsed) * 8))
            - hintsUsed * 120 - state.conflictsEver * 30);
    }

    function renderPalette() {
        paletteEl.innerHTML = '';
        theme.colors.forEach(function (color, i) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'fcg-swatch' + (i === state.selected ? ' active' : '');
            b.style.setProperty('--c', color);
            b.innerHTML = '<span class="fcg-chip" style="background:' + color + '">' + MARKS[i] + '</span>' +
                          '<span class="fcg-key">' + (i + 1) + '</span>';
            b.addEventListener('click', function () {
                state.selected = i;
                renderPalette();
            });
            paletteEl.appendChild(b);
        });
    }

    function allCleared() {
        return Object.keys(progress.levels).length >= LEVELS.length;
    }

    function renderLevels() {
        levelListEl.innerHTML = '';
        LEVELS.forEach(function (count, i) {
            var locked = (i + 1) > progress.unlocked;
            var rec = progress.levels[String(i)];
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'fcg-level-btn' + (i === state.level && !state.customCount ? ' active' : '') + (locked ? ' locked' : '');
            b.title = (lang() === 'en' ? 'Level ' : '第 ') + (i + 1) +
                      (lang() === 'en' ? ' · ' : ' 关 · ') + count + (lang() === 'en' ? ' regions' : ' 区');
            b.innerHTML =
                '<span class="fcg-level-num">' + (i + 1) + '</span>' +
                '<span class="fcg-level-size">' + count + '</span>' +
                '<span class="fcg-level-stars">' + (rec ? new Array(rec.stars + 1).join('★') : '') + '</span>';
            b.addEventListener('click', function () { selectLevel(i); });
            levelListEl.appendChild(b);
        });
        // 自定义按钮：通关全部 14 关后才解锁
        var customLocked = !allCleared();
        var cbtn = document.createElement('button');
        cbtn.type = 'button';
        cbtn.className = 'fcg-level-btn custom' + (state.customCount > 0 ? ' active' : '') + (customLocked ? ' locked' : '');
        if (customLocked) {
            cbtn.title = tr('fcg.custom.locked');
            cbtn.innerHTML = '<span class="fcg-level-num">🔒</span><span class="fcg-level-size"></span><span class="fcg-level-stars"></span>';
            cbtn.addEventListener('click', function () { toast(tr('fcg.custom.locked')); });
        } else {
            cbtn.title = lang() === 'en' ? 'Custom board size' : '自定义板块数';
            cbtn.innerHTML = '<span class="fcg-level-num">✨</span>' +
                             '<span class="fcg-level-size">' + (state.customCount || '') + '</span>' +
                             '<span class="fcg-level-stars"></span>';
            cbtn.addEventListener('click', startCustom);
        }
        levelListEl.appendChild(cbtn);

        // 输入框行随锁定态禁用
        var crow = document.querySelector('.fcg-custom');
        if (crow) crow.classList.toggle('locked', customLocked);
    }

    function renderBadges() {
        badgeListEl.innerHTML = '';
        BADGES.forEach(function (b) {
            var got = progress.badges.indexOf(b.id) !== -1;
            var d = document.createElement('div');
            d.className = 'fcg-badge' + (got ? ' got' : '');
            d.innerHTML = '<span class="fcg-badge-icon">' + (got ? b.icon : '🔒') + '</span>' +
                          '<span class="fcg-badge-text">' + tr('fcg.badge.' + b.id) +
                          '<small>' + tr('fcg.badge.' + b.id + '.d') + '</small></span>';
            badgeListEl.appendChild(d);
        });
        badgeCountEl.textContent = progress.badges.length + '/' + BADGES.length;
    }

    function renderBest() {
        var rec = state.customCount > 0 ? progress.custom : progress.levels[String(state.level)];
        var none = tr('fcg.best.none');
        bestTime.textContent = rec ? fmtTime(rec.time) : none;
        bestMoves.textContent = rec ? rec.moves : none;
        bestScore.textContent = rec ? rec.score : none;
        bestStars.textContent = rec ? new Array(rec.stars + 1).join('★') : none;
        var total = 0;
        Object.keys(progress.levels).forEach(function (k) { total += progress.levels[k].score; });
        totalScoreEl.textContent = total;
    }

    function startCustom() {
        if (!allCleared()) { toast(tr('fcg.custom.locked')); return; }
        var v = parseInt(customInput.value, 10);
        if (isNaN(v)) v = 20;
        v = Math.max(4, Math.min(80, v));
        customInput.value = v;
        state.customCount = v;
        lockOverlay.classList.remove('show');
        newMap();
        renderLevels();
        renderBest();
        toast(tr('fcg.custom.start', { n: v }), 'good');
    }

    function selectLevel(i) {
        if (i + 1 > progress.unlocked) {
            toast(tr('fcg.msg.locked'));
            return;
        }
        state.customCount = 0;
        state.level = i;
        lockOverlay.classList.toggle('show', false);
        newMap();
        renderLevels();
        renderBest();
    }

    // ============================================================
    //  交互
    // ============================================================
    function toLogic(evt) {
        var rect = board.getBoundingClientRect();
        var cx = (evt.touches ? evt.touches[0].clientX : evt.clientX) - rect.left;
        var cy = (evt.touches ? evt.touches[0].clientY : evt.clientY) - rect.top;
        return [(cx / rect.width) * BW, (cy / rect.height) * BH];
    }

    function hitTest(lx, ly) {
        for (var i = 0; i < state.cells.length; i++) {
            if (state.cells[i].poly.length >= 3 && pointInConvex(state.cells[i].poly, lx, ly)) return i;
        }
        return -1;
    }

    board.addEventListener('click', function (e) {
        if (state.solved) return;
        var p = toLogic(e);
        paint(hitTest(p[0], p[1]), state.selected);
    });

    board.addEventListener('mousemove', function (e) {
        var p = toLogic(e);
        var idx = hitTest(p[0], p[1]);
        if (idx !== state.hover) {
            state.hover = idx;
            needsDraw = true;
        }
    });

    board.addEventListener('mouseleave', function () {
        state.hover = -1;
        needsDraw = true;
    });

    btnUndo.addEventListener('click', undo);
    btnHint.addEventListener('click', hint);
    btnReset.addEventListener('click', function () {
        var seed = state.seed;
        newMap(seed);
    });
    btnNew.addEventListener('click', function () { newMap(); });

    btnSound.addEventListener('click', function () {
        settings.sound = !settings.sound;
        btnSound.classList.toggle('off', !settings.sound);
        saveJSON(SKEY, settings);
        if (settings.sound) SFX.fill(0);
    });

    btnMarks.addEventListener('click', function () {
        settings.marks = !settings.marks;
        btnMarks.classList.toggle('off', !settings.marks);
        saveJSON(SKEY, settings);
        needsDraw = true;
    });

    if (btnCustom) {
        btnCustom.addEventListener('click', startCustom);
        customInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); startCustom(); }
        });
    }

    document.getElementById('winReplay').addEventListener('click', function () {
        newMap();
    });

    winNext.addEventListener('click', function () {
        if (state.customCount > 0) { newMap(); return; }
        if (state.level + 1 < LEVELS.length) selectLevel(state.level + 1);
        else newMap();
    });

    document.addEventListener('keydown', function (e) {
        if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
        var k = e.key.toLowerCase();
        if (k >= '1' && k <= '4') {
            state.selected = parseInt(k, 10) - 1;
            renderPalette();
        } else if (k === 'z') { undo(); }
        else if (k === 'h') { hint(); }
        else if (k === 'r') { newMap(state.seed); }
        else if (k === 'n') { newMap(); }
    });

    window.addEventListener('resize', function () {
        resizeCanvas();
    });

    // ============================================================
    //  统一信息模块：选项卡切换
    // ============================================================
    function setupTabs() {
        var tabs = document.querySelectorAll('#infoTabs .fcg-tab');
        var panes = document.querySelectorAll('.fcg-tab-pane');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var name = tab.getAttribute('data-tab');
                tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
                panes.forEach(function (p) {
                    p.classList.toggle('active', p.getAttribute('data-pane') === name);
                });
            });
        });
    }

    // ============================================================
    //  主题 / 语言
    // ============================================================
    document.addEventListener('themechange', function () {
        readTheme();
        renderPalette();
        needsDraw = true;
    });

    document.addEventListener('languagechange', function () {
        renderLevels();
        renderBadges();
        renderBest();
        needsDraw = true;
    });

    // ============================================================
    //  初始化
    // ============================================================
    function init() {
        readTheme();
        resizeCanvas();
        btnSound.classList.toggle('off', !settings.sound);
        btnMarks.classList.toggle('off', !settings.marks);
        newMap();
        renderPalette();
        renderLevels();
        renderBadges();
        renderBest();
        setupTabs();
        requestAnimationFrame(loop);
        // 字体/布局稳定后再量一次尺寸
        setTimeout(resizeCanvas, 120);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
