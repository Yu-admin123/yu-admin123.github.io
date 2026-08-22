// ============================================================
//  SignalPlotter.html 页面脚本
//  主题切换逻辑由 theme.js 提供（全局 setTheme + #themeToggle 点击绑定）
//  此处仅监听 'themechange' 事件，在主题切换时重绘 Canvas 图表
//  注意：因 HTML 使用内联 onclick，所有函数必须挂载到全局作用域
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性与 window.I18N.t 使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':   { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title':  { zh: '切换主题', en: 'Toggle theme' },

    // 文档标题
    'signal.doc.title':    { zh: '数据曲线可视化 - Yu_ToolBox', en: 'Signal Plotter - Yu_ToolBox' },

    // 页面标题 / 副标题
    'signal.page.title':   { zh: '📈 数据曲线可视化', en: '📈 Signal Plotter' },
    'signal.subhead':      { zh: '🔹 信号绘图 · FFT 变换 · 数字滤波分析工具',
                             en: '🔹 Signal Plotting · FFT · Digital Filter Analysis' },

    // ① 数据输入
    'signal.p1.title':     { zh: '数据输入', en: 'Data Input' },
    'signal.p1.small':     { zh: '原始数据或公式生成', en: 'Raw data or formula' },
    'signal.tab.raw':      { zh: '原始数据', en: 'Raw Data' },
    'signal.tab.formula':  { zh: '公式生成', en: 'Formula' },
    'signal.btn.addRow':   { zh: '+ 添加行', en: '+ Add Row' },
    'signal.btn.delRow':   { zh: '- 删除行', en: '- Del Row' },
    'signal.btn.clear':    { zh: '清空', en: 'Clear' },
    'signal.btn.importCsv':{ zh: '📁 导入 CSV', en: '📁 Import CSV' },
    'signal.hint.csvFmt':  { zh: '支持 .csv / .txt', en: 'Supports .csv / .txt' },
    'signal.btn.plotData': { zh: '绘制数据', en: 'Plot Data' },
    'signal.label.formula':{ zh: '公式（使用 x 作为变量）', en: 'Formula (use x as variable)' },
    'signal.placeholder.formula': { zh: '例如 sin(2*PI*x)', en: 'e.g. sin(2*PI*x)' },
    'signal.btn.sine':     { zh: '正弦波', en: 'Sine' },
    'signal.btn.mixed':    { zh: '混合频率', en: 'Mixed' },
    'signal.btn.decay':    { zh: '衰减振荡', en: 'Damped' },
    'signal.btn.noisy':    { zh: '含噪信号', en: 'Noisy' },
    'signal.label.xStart': { zh: 'X 起始', en: 'X Start' },
    'signal.label.xEnd':   { zh: 'X 结束', en: 'X End' },
    'signal.label.samples':{ zh: '采样点数', en: 'Samples' },
    'signal.btn.plotFormula': { zh: '生成并绘制', en: 'Generate & Plot' },

    // ② 时域波形
    'signal.p2.title':     { zh: '时域波形', en: 'Time Domain' },
    'signal.p2.small':     { zh: '原始信号与滤波后信号', en: 'Original & filtered signal' },
    'signal.legend.original': { zh: '原始信号', en: 'Original' },
    'signal.legend.filtered': { zh: '滤波后信号', en: 'Filtered' },
    'signal.btn.resetView': { zh: '复位视图', en: 'Reset View' },
    'signal.btn.exportOriginal': { zh: '导出原始 CSV', en: 'Export Original CSV' },
    'signal.btn.exportFiltered': { zh: '导出滤波 CSV', en: 'Export Filtered CSV' },

    // ③ FFT
    'signal.p3.title':     { zh: 'FFT 频谱分析', en: 'FFT Spectrum' },
    'signal.p3.small':     { zh: '幅度谱', en: 'Magnitude Spectrum' },
    'signal.btn.runFft':   { zh: '执行 FFT', en: 'Run FFT' },
    'signal.btn.exportFft':{ zh: '导出频谱 CSV', en: 'Export Spectrum CSV' },
    'signal.fftMode.stem': { zh: '茎叶图', en: 'Stem' },
    'signal.fftMode.bar':  { zh: '柱状图', en: 'Bar' },
    'signal.fftMode.line': { zh: '折线图', en: 'Line' },
    'signal.fftAxis.magnitude': { zh: '幅度', en: 'Magnitude' },
    'signal.fftAxis.dB':   { zh: 'dB', en: 'dB' },

    // ④ 数字滤波器
    'signal.p4.title':     { zh: '数字滤波器', en: 'Digital Filter' },
    'signal.p4.small':     { zh: '8种常用算法', en: '8 common algorithms' },
    'signal.label.filterAlgo': { zh: '滤波算法', en: 'Algorithm' },
    'signal.filter.movingAvg': { zh: '移动平均滤波', en: 'Moving Average' },
    'signal.filter.median': { zh: '中值滤波', en: 'Median' },
    'signal.filter.amplitudeLimit': { zh: '限幅滤波', en: 'Amplitude Limit' },
    'signal.filter.firLowpass': { zh: '低通滤波 (FIR)', en: 'Low-pass (FIR)' },
    'signal.filter.iir2Lowpass': { zh: '二阶 IIR 低通滤波', en: '2nd-order IIR Low-pass' },
    'signal.filter.kalman': { zh: '卡尔曼滤波', en: 'Kalman' },
    'signal.filter.limitAvg': { zh: '限幅平均滤波', en: 'Limit Average' },
    'signal.filter.midAvg': { zh: '中位值平均滤波', en: 'Median Average' },
    'signal.label.cutoffHz': { zh: '截止频率 (Hz)', en: 'Cutoff (Hz)' },
    'signal.label.filterOrder': { zh: '滤波器阶数', en: 'Filter Order' },
    'signal.label.windowSize': { zh: '窗口大小 (点数)', en: 'Window Size (pts)' },
    'signal.label.windowSizeMidAvg': { zh: '窗口大小 (点数，去掉最大最小后平均)', en: 'Window Size (trim max/min)' },
    'signal.label.limitValue': { zh: '最大偏差限幅值', en: 'Max Deviation' },
    'signal.label.kalmanQ': { zh: '过程噪声 Q', en: 'Process Noise Q' },
    'signal.label.kalmanR': { zh: '测量噪声 R', en: 'Measure Noise R' },
    'signal.btn.applyFilter': { zh: '应用滤波器', en: 'Apply Filter' },
    'signal.btn.clearFilter': { zh: '清除滤波', en: 'Clear Filter' },

    // 页脚
    'signal.footer':       { zh: '📈 信号绘图与频谱分析工具 · 支持数据/公式绘图、FFT 频谱分析、多种数字滤波算法',
                             en: '📈 Signal plotting & spectrum analysis · Supports data/formula plotting, FFT, multiple digital filters' },

    // ===== 动态文本（alert / stats / canvas 标签） =====
    'signal.dyn.noData':       { zh: '暂无数据', en: 'No data' },
    'signal.dyn.axisFreq':     { zh: '频率 (Hz)', en: 'Frequency (Hz)' },
    'signal.dyn.axisMag':      { zh: '幅度', en: 'Magnitude' },
    'signal.dyn.axisMagDb':    { zh: '幅度 (dB)', en: 'Magnitude (dB)' },
    'signal.dyn.zoomHint':     { zh: '双击重置', en: 'dbl-click to reset' },

    'signal.alert.noPoints':   { zh: '数据点不足，请至少输入2个有效数据点', en: 'Not enough data, please input at least 2 valid points' },
    'signal.alert.formulaIncomplete': { zh: '请填写完整的公式和参数', en: 'Please complete the formula and parameters' },
    'signal.alert.formulaFail': { zh: '公式计算失败，请检查表达式', en: 'Formula evaluation failed, please check the expression' },
    'signal.alert.drawFirst':  { zh: '请先绘制数据', en: 'Please plot data first' },
    'signal.alert.cutoffNeg':  { zh: '截止频率必须为非负数', en: 'Cutoff frequency must be non-negative' },
    'signal.alert.sampleRateInvalid': { zh: '采样率无效', en: 'Invalid sample rate' },
    'signal.alert.cutoffLtNyquist': { zh: '截止频率必须小于奈奎斯特频率', en: 'Cutoff must be less than Nyquist frequency' },
    'signal.alert.noOriginal': { zh: '没有原始数据', en: 'No original data' },
    'signal.alert.noFiltered': { zh: '没有滤波数据，请先应用滤波器', en: 'No filtered data, please apply a filter first' },
    'signal.alert.noFft':      { zh: '没有频谱数据，请先执行 FFT', en: 'No spectrum data, please run FFT first' },

    // FFT stats 片段
    'signal.stats.samples':   { zh: '采样点', en: 'Samples' },
    'signal.stats.zeroPad':   { zh: '补零至', en: 'zero-padded to' },
    'signal.stats.sampleRate':{ zh: '采样率', en: 'Sample rate' },
    'signal.stats.freqRes':   { zh: '频率分辨率', en: 'Freq resolution' },
    'signal.stats.nyquist':   { zh: '奈奎斯特', en: 'Nyquist' },
    'signal.stats.peak':      { zh: '主峰', en: 'Peak' },

    // 滤波器算法名称
    'signal.algo.movingAvg':  { zh: '移动平均滤波', en: 'Moving Average' },
    'signal.algo.median':     { zh: '中值滤波', en: 'Median' },
    'signal.algo.amplitudeLimit': { zh: '限幅滤波', en: 'Amplitude Limit' },
    'signal.algo.firLowpass': { zh: 'FIR 低通滤波', en: 'FIR Low-pass' },
    'signal.algo.iir2Lowpass':{ zh: '二阶 IIR 低通滤波', en: '2nd-order IIR Low-pass' },
    'signal.algo.kalman':     { zh: '卡尔曼滤波', en: 'Kalman' },
    'signal.algo.limitAvg':   { zh: '限幅平均滤波', en: 'Limit Average' },
    'signal.algo.midAvg':     { zh: '中位值平均滤波', en: 'Median Average' },

    // 滤波器 stats 片段
    'signal.stats.window':    { zh: '窗口', en: 'window' },
    'signal.stats.limit':     { zh: '限幅', en: 'limit' },
    'signal.stats.dataPoints':{ zh: '数据点', en: 'points' }
};

// ================= 主题切换时重绘图表 =================
document.addEventListener('themechange', function () {
  requestAnimationFrame(() => {
    drawChart(timeCanvas, currentData, filteredData, 'time');
    if (fftData.length) drawChart(fftCanvas, fftData, [], 'fft');
  });
});

// ================= Tab 切换 =================
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ================= 全局状态 =================
let currentData = []; // [{x, y}]
let filteredData = [];
let fftData = []; // [{x:freq, y:mag}]
let sampleRate = 1; // 自动计算
let fftDisplayMode = 'stem'; // 'stem' | 'bar' | 'line'
let fftYAxis = 'magnitude'; // 'magnitude' | 'dB'

// 用于语言切换时刷新动态文本的最近状态
let lastFftStats = null;   // { dataLen, n, sampleRate, df, peakFreq }
let lastFilterStats = null; // { algoNameKey, params: [{k,v}], sampleRate, dataLen }

// 缩放/平移状态（与串口工具一致）
const viewState = {
  time: { offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 },
  fft: { offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 }
};

const timeCanvas = document.getElementById('timeCanvas');
const fftCanvas = document.getElementById('fftCanvas');
const timeTooltip = document.getElementById('timeTooltip');
const fftTooltip = document.getElementById('fftTooltip');

function resetView(key) {
  const vs = viewState[key];
  vs.offsetX = 0; vs.offsetY = 0; vs.scaleX = 1; vs.scaleY = 1;
  if (key === 'time') {
    drawChart(timeCanvas, currentData, filteredData, 'time');
  } else {
    drawChart(fftCanvas, fftData, [], 'fft');
  }
}

// ================= 数学表达式解析 =================
function evaluateFormula(expr, x) {
  // 处理 ^ 为幂运算
  let clean = expr.replace(/\^/g, '**');
  // 处理隐式乘法：数字后跟变量或括号，如 2x -> 2*x, 2( -> 2*(
  clean = clean.replace(/(\d)([xX(])/g, '$1*$2');
  // 处理闭括号后跟数字/变量，如 )x -> )*x, )2 -> )*2
  clean = clean.replace(/(\))([a-zA-Z0-9])/g, '$1*$2');
  // 处理变量 x 后跟括号，如 x( -> x*(
  clean = clean.replace(/\bx\b(\()/g, 'x*$1');
  // new Function 不闭包外部变量，必须在函数体内声明
  // 注意：不能在此 var 声明中包含 Math=Math，否则变量提升会使前面的 Math.xxx 全部为 undefined
  const preamble = 'var PI=' + Math.PI + ',E=' + Math.E
    + ',sin=Math.sin,cos=Math.cos,tan=Math.tan'
    + ',asin=Math.asin,acos=Math.acos,atan=Math.atan'
    + ',sinh=Math.sinh,cosh=Math.cosh,tanh=Math.tanh'
    + ',exp=Math.exp,sqrt=Math.sqrt,log=Math.log,log10=Math.log10'
    + ',abs=Math.abs,pow=Math.pow,floor=Math.floor,ceil=Math.ceil'
    + ',round=Math.round,min=Math.min,max=Math.max,random=Math.random;';
  return new Function('x', preamble + 'return ' + clean)(x);
}

// ================= 表格数据操作 =================
function getTableData() {
  const tbody = document.getElementById('dataTableBody');
  const rows = tbody.querySelectorAll('tr');
  const data = [];
  for (const row of rows) {
    const inputs = row.querySelectorAll('input');
    const x = parseFloat(inputs[0].value);
    const y = parseFloat(inputs[1].value);
    if (!isNaN(x) && !isNaN(y)) data.push({ x, y });
  }
  return data;
}

function addTableRow(xVal, yVal) {
  const tbody = document.getElementById('dataTableBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `<td><input type="text" value="${xVal !== undefined ? xVal : ''}"></td><td><input type="text" value="${yVal !== undefined ? yVal : ''}"></td>`;
  tbody.appendChild(tr);
}

function removeTableRow() {
  const tbody = document.getElementById('dataTableBody');
  if (tbody.children.length > 1) tbody.removeChild(tbody.lastElementChild);
}

function clearTable() {
  const tbody = document.getElementById('dataTableBody');
  tbody.innerHTML = '<tr><td><input type="text" value="0"></td><td><input type="text" value="0"></td></tr>';
}

function importFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.trim().split(/\r?\n/);
    const tbody = document.getElementById('dataTableBody');
    tbody.innerHTML = '';
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      const parts = line.split(/[,;\t\s]+/).map(Number).filter(n => !isNaN(n));
      if (parts.length >= 2) {
        addTableRow(parts[0], parts[1]);
      } else if (parts.length === 1) {
        addTableRow('', parts[0]);
      }
    }
    if (tbody.children.length === 0) clearTable();
  };
  reader.readAsText(file);
  event.target.value = '';
}

function plotTableData() {
  currentData = getTableData();
  if (currentData.length < 2) { alert(window.I18N.t('signal.alert.noPoints')); return; }
  computeSampleRate();
  filteredData = [];
  drawChart(timeCanvas, currentData, filteredData, 'time');
  fftData = [];
  drawChart(fftCanvas, fftData, [], 'fft');
}

// ================= 绘图引擎 =================
function resizeCanvas(canvas) {
  const wrap = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  const rect = wrap.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { width: rect.width, height: rect.height, ctx };
}

function getThemeColor() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  return dark ? {
    bg: '#1e1e1e', text: '#888888', grid: '#3d3d3d', axis: '#888888',
    line: '#7a9eff', line2: '#5ae0a0', tooltipBg: 'rgba(0,0,0,0.85)'
  } : {
    bg: '#ffffff', text: '#64748b', grid: '#e9edf4', axis: '#94a3b8',
    line: '#6366f1', line2: '#10b981', tooltipBg: 'rgba(15,23,42,0.9)'
  };
}

function drawChart(canvas, data, overlay, type) {
  const { width, height, ctx } = resizeCanvas(canvas);
  const theme = getThemeColor();
  const padding = { top: 20, right: 20, bottom: 36, left: 56 };
  const cw = width - padding.left - padding.right;
  const ch = height - padding.top - padding.bottom;

  ctx.clearRect(0, 0, width, height);

  if (!data.length) {
    ctx.fillStyle = theme.text;
    ctx.font = '14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(window.I18N.t('signal.dyn.noData'), width / 2, height / 2);
    canvas._chartMeta = null;
    return;
  }

  // FFT dB 转换
  let displayData = data;
  if (type === 'fft' && fftYAxis === 'dB') {
    displayData = data.map(d => ({
      x: d.x,
      y: d.y > 0 ? 20 * Math.log10(d.y) : -200
    }));
  }

  // 计算范围
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of displayData) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  if (overlay && overlay.length) {
    for (const p of overlay) {
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
  }
  // 应用缩放与平移
  const vs = type === 'fft' ? viewState.fft : viewState.time;
  const padY = (maxY - minY) * 0.1 || 1;
  minY -= padY; maxY += padY;
  if (minY === maxY) { minY -= 1; maxY += 1; }

  // Y 方向缩放 + 平移
  const rangeY = maxY - minY;
  const displayRangeY = rangeY * vs.scaleY;
  const midY = (minY + maxY) / 2;
  const chartH = ch; // 绘图区高度（CSS像素）
  minY = midY - displayRangeY / 2 + vs.offsetY * (displayRangeY / chartH) * 0.5;
  maxY = midY + displayRangeY / 2 + vs.offsetY * (displayRangeY / chartH) * 0.5;

  // X 方向缩放 + 平移
  const rangeX = maxX - minX;
  const displayRangeX = rangeX * vs.scaleX;
  const midX = (minX + maxX) / 2;
  const chartW = cw;
  minX = midX - displayRangeX / 2 + vs.offsetX * (displayRangeX / chartW) * 0.5;
  maxX = midX + displayRangeX / 2 + vs.offsetX * (displayRangeX / chartW) * 0.5;

  // dB 模式下最小不低于 -120
  if (type === 'fft' && fftYAxis === 'dB' && minY < -120) minY = -120;

  function tx(x) { return padding.left + (x - minX) / (maxX - minX) * cw; }
  function ty(y) { return padding.top + (1 - (y - minY) / (maxY - minY)) * ch; }

  // 网格
  ctx.strokeStyle = theme.grid;
  ctx.lineWidth = 0.5;
  const yTickCount = type === 'fft' && fftYAxis === 'dB' ? 6 : 5;
  const xTickCount = type === 'fft' ? 8 : 5;
  ctx.beginPath();
  for (let i = 0; i <= yTickCount; i++) {
    const y = padding.top + ch * i / yTickCount;
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
  }
  for (let i = 0; i <= xTickCount; i++) {
    const x = padding.left + cw * i / xTickCount;
    ctx.moveTo(x, padding.top);
    ctx.lineTo(x, height - padding.bottom);
  }
  ctx.stroke();

  // 坐标轴
  ctx.strokeStyle = theme.axis;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, height - padding.bottom);
  ctx.lineTo(width - padding.right, height - padding.bottom);
  ctx.stroke();

  // 标签格式
  function fmtY(v) {
    if (type === 'fft' && fftYAxis === 'dB') return v.toFixed(0) + ' dB';
    if (Math.abs(v) >= 100) return v.toFixed(1);
    if (Math.abs(v) >= 1) return v.toFixed(2);
    return v.toFixed(4);
  }
  function fmtX(v) {
    if (type === 'fft') {
      if (v >= 1000) return (v / 1000).toFixed(1) + 'k';
      return v.toFixed(1);
    }
    return v.toFixed(2);
  }

  // 标签
  ctx.fillStyle = theme.text;
  ctx.font = '11px SF Mono, Fira Code, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (let i = 0; i <= xTickCount; i++) {
    const x = padding.left + cw * i / xTickCount;
    const xv = minX + (maxX - minX) * i / xTickCount;
    ctx.fillText(fmtX(xv), x, height - padding.bottom + 6);
  }
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= yTickCount; i++) {
    const y = padding.top + ch * (1 - i / yTickCount);
    const yv = minY + (maxY - minY) * i / yTickCount;
    ctx.fillText(fmtY(yv), padding.left - 6, y);
  }

  // 轴名称
  ctx.fillStyle = theme.text;
  ctx.font = '11px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  if (type === 'fft') {
    ctx.fillText(window.I18N.t('signal.dyn.axisFreq'), padding.left + cw / 2, height - 4);
    ctx.save();
    ctx.translate(12, padding.top + ch / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textBaseline = 'middle';
    ctx.fillText(fftYAxis === 'dB' ? window.I18N.t('signal.dyn.axisMagDb') : window.I18N.t('signal.dyn.axisMag'), 0, 0);
    ctx.restore();
  }

  // ===== 裁剪到绘图区域（防止缩放后曲线超出轴线） =====
  ctx.save();
  ctx.beginPath();
  ctx.rect(padding.left, padding.top, cw, ch);
  ctx.clip();

  // ===== 绘制数据 =====
  const lineColor = type === 'fft' ? '#6366f1' : '#4f46e5';
  const lineColor2 = '#10b981';
  const baseY = type === 'fft' ? ty(0) : null; // FFT 基线（0幅度处）

  // 绘制折线
  function drawLine(points, color, lineWidth = 2) {
    if (!points.length) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const x = tx(points[i].x);
      const y = ty(points[i].y);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // 茎叶图（FFT 标准显示）
  function drawStem(points, color) {
    if (!points.length) return;
    const by = baseY !== null ? baseY : padding.top + ch;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;
    for (const p of points) {
      const px = tx(p.x);
      const py = ty(p.y);
      // 茎
      ctx.beginPath();
      ctx.moveTo(px, by);
      ctx.lineTo(px, py);
      ctx.stroke();
      // 叶（小圆点）
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 柱状图
  function drawBars(points, color) {
    if (!points.length) return;
    const by = baseY !== null ? baseY : padding.top + ch;
    const barW = Math.max(1, cw / points.length * 0.8);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = color;
    for (const p of points) {
      const px = tx(p.x);
      const py = ty(p.y);
      const h = by - py;
      ctx.globalAlpha = 0.8;
      ctx.fillRect(px - barW / 2, py, barW, h);
      ctx.globalAlpha = 1;
    }
  }

  if (type === 'fft') {
    // FFT 绘制
    if (fftDisplayMode === 'stem') {
      drawStem(displayData, lineColor);
    } else if (fftDisplayMode === 'bar') {
      drawBars(displayData, lineColor);
    } else {
      drawLine(displayData, lineColor, 2);
    }
  } else {
    // 时域绘制
    drawLine(displayData, lineColor, 2);
    if (overlay && overlay.length) {
      drawLine(overlay, lineColor2, 2);
    }
  }

  // 恢复裁剪
  ctx.restore();

  // 缩放指示器
  if (vs.scaleX !== 1 || vs.scaleY !== 1) {
    ctx.fillStyle = theme.text;
    ctx.font = '11px system-ui';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`${vs.scaleX.toFixed(1)}x / ${vs.scaleY.toFixed(1)}x  ${window.I18N.t('signal.dyn.zoomHint')}`, width - padding.right - 4, height - 4);
  }

  // 存储映射用于 tooltip
  canvas._chartMeta = { minX, maxX, minY, maxY, padding, cw, ch, data: displayData, overlay, type };
}

// ================= Tooltip =================
function setupTooltip(canvas, tooltip, isOverlay = false) {
  const wrap = canvas.parentElement;
  wrap.addEventListener('mousemove', e => {
    const meta = canvas._chartMeta;
    if (!meta) return;
    const rect = wrap.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const { padding, cw, ch, minX, maxX, minY, maxY, data, overlay, type } = meta;

    if (mx < padding.left || mx > rect.width - padding.right || my < padding.top || my > rect.height - padding.bottom) {
      tooltip.style.opacity = 0;
      return;
    }

    const xVal = minX + (mx - padding.left) / cw * (maxX - minX);
    const yVal = minY + (1 - (my - padding.top) / ch) * (maxY - minY);

    // 找最近点
    let nearest = null;
    let minDist = Infinity;
    const all = isOverlay && overlay && overlay.length ? overlay : data;
    for (const p of all) {
      const dx = (p.x - xVal) / (maxX - minX);
      const dy = (p.y - yVal) / (maxY - minY);
      const d = dx * dx + dy * dy;
      if (d < minDist) { minDist = d; nearest = p; }
    }

    if (nearest && minDist < 0.01) {
      tooltip.style.opacity = 1;
      tooltip.style.left = (e.clientX + 12) + 'px';
      tooltip.style.top = (e.clientY - 12) + 'px';
      if (type === 'fft') {
        const unit = fftYAxis === 'dB' ? ' dB' : '';
        tooltip.textContent = `f=${nearest.x.toFixed(3)} Hz, A=${nearest.y.toFixed(4)}${unit}`;
      } else {
        tooltip.textContent = `x=${nearest.x.toFixed(4)}, y=${nearest.y.toFixed(4)}`;
      }
    } else {
      tooltip.style.opacity = 0;
    }
  });
  wrap.addEventListener('mouseleave', () => { tooltip.style.opacity = 0; });
}

setupTooltip(timeCanvas, timeTooltip);
setupTooltip(fftCanvas, fftTooltip);

// ================= 公式快捷设置 =================
function setFormula(expr) {
  document.getElementById('formulaInput').value = expr;
}

// ================= FFT 显示模式切换 =================
function setFFTMode(mode, btn) {
  fftDisplayMode = mode;
  document.querySelectorAll('.fft-mode-btn[data-mode]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (fftData.length) drawChart(fftCanvas, fftData, [], 'fft');
}
function setFFTAxis(axis, btn) {
  fftYAxis = axis;
  document.querySelectorAll('.fft-mode-btn[data-yaxis]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (fftData.length) drawChart(fftCanvas, fftData, [], 'fft');
}

// ================= 绘图触发 =================
function plotFormula() {
  const expr = document.getElementById('formulaInput').value;
  const x0 = parseFloat(document.getElementById('xStart').value);
  const x1 = parseFloat(document.getElementById('xEnd').value);
  const n = parseInt(document.getElementById('xSamples').value);
  if (!expr || isNaN(x0) || isNaN(x1) || n < 2) { alert(window.I18N.t('signal.alert.formulaIncomplete')); return; }
  currentData = [];
  for (let i = 0; i < n; i++) {
    const x = x0 + (x1 - x0) * i / (n - 1);
    try {
      const y = evaluateFormula(expr, x);
      if (isFinite(y)) currentData.push({ x, y });
    } catch (e) { /* ignore */ }
  }
  if (currentData.length < 2) { alert(window.I18N.t('signal.alert.formulaFail')); return; }
  computeSampleRate();
  filteredData = [];
  drawChart(timeCanvas, currentData, filteredData, 'time');
  fftData = [];
  drawChart(fftCanvas, fftData, [], 'fft');
}

function computeSampleRate() {
  if (currentData.length >= 2) {
    const dxs = [];
    for (let i = 1; i < currentData.length; i++) {
      dxs.push(currentData[i].x - currentData[i - 1].x);
    }
    const avgDx = dxs.reduce((a, b) => a + b, 0) / dxs.length;
    sampleRate = avgDx > 0 ? 1 / avgDx : 1;
  }
}

// ================= FFT (Cooley-Tukey) =================
function bitReverse(x, bits) {
  let y = 0;
  for (let i = 0; i < bits; i++) {
    y = (y << 1) | (x & 1);
    x >>= 1;
  }
  return y;
}

function fft(real, imag) {
  const n = real.length;
  if (n !== imag.length || (n & (n - 1)) !== 0) {
    throw new Error('FFT 长度必须是2的幂');
  }
  const bits = Math.log2(n);

  // 位反转重排
  for (let i = 0; i < n; i++) {
    const j = bitReverse(i, bits);
    if (j > i) {
      [real[i], real[j]] = [real[j], real[i]];
      [imag[i], imag[j]] = [imag[j], imag[i]];
    }
  }

  // 蝶形运算
  for (let size = 2; size <= n; size <<= 1) {
    const half = size >> 1;
    const wReal = Math.cos(2 * Math.PI / size);
    const wImag = -Math.sin(2 * Math.PI / size);
    for (let i = 0; i < n; i += size) {
      let uReal = 1, uImag = 0;
      for (let j = 0; j < half; j++) {
        const evenReal = real[i + j];
        const evenImag = imag[i + j];
        const oddReal = real[i + j + half] * uReal - imag[i + j + half] * uImag;
        const oddImag = real[i + j + half] * uImag + imag[i + j + half] * uReal;
        real[i + j] = evenReal + oddReal;
        imag[i + j] = evenImag + oddImag;
        real[i + j + half] = evenReal - oddReal;
        imag[i + j + half] = evenImag - oddImag;
        const nextReal = uReal * wReal - uImag * wImag;
        const nextImag = uReal * wImag + uImag * wReal;
        uReal = nextReal; uImag = nextImag;
      }
    }
  }
}

function runFFT() {
  if (!currentData.length) { alert(window.I18N.t('signal.alert.drawFirst')); return; }
  let n = 1;
  while (n < currentData.length) n <<= 1;
  const real = new Float64Array(n);
  const imag = new Float64Array(n);
  for (let i = 0; i < currentData.length; i++) real[i] = currentData[i].y;
  fft(real, imag);

  fftData = [];
  const df = sampleRate / n;
  // 只取前半部分（实信号频谱对称）
  for (let i = 0; i <= n / 2; i++) {
    const mag = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]) / (currentData.length);
    fftData.push({ x: i * df, y: mag });
  }
  drawChart(fftCanvas, fftData, [], 'fft');

  // 找峰值频率
  let peakIdx = 1, peakMag = 0;
  for (let i = 1; i < fftData.length; i++) {
    if (fftData[i].y > peakMag) { peakMag = fftData[i].y; peakIdx = i; }
  }
  lastFftStats = {
    dataLen: currentData.length,
    n: n,
    sampleRate: sampleRate,
    df: df,
    peakFreq: fftData[peakIdx].x
  };
  renderFftStats();
}

// 渲染 FFT 统计文本（语言切换时复用）
function renderFftStats() {
  if (!lastFftStats) return;
  const s = lastFftStats;
  const stats = document.getElementById('fftStats');
  stats.textContent =
    `${window.I18N.t('signal.stats.samples')}: ${s.dataLen} → ${window.I18N.t('signal.stats.zeroPad')} ${s.n} | ` +
    `${window.I18N.t('signal.stats.sampleRate')}: ${s.sampleRate.toFixed(3)} Hz | ` +
    `${window.I18N.t('signal.stats.freqRes')}: ${s.df.toFixed(4)} Hz | ` +
    `${window.I18N.t('signal.stats.nyquist')}: ${(s.sampleRate / 2).toFixed(2)} Hz | ` +
    `${window.I18N.t('signal.stats.peak')}: ${s.peakFreq.toFixed(2)} Hz`;
}

// ================= 滤波器参数联动 =================
const filterAlgoSelect = document.getElementById('filterAlgo');
const firParamsDiv = document.getElementById('firParams');
const commonParamsDiv = document.getElementById('commonParams');
const limitParamsDiv = document.getElementById('limitParams');
const iirParamsDiv = document.getElementById('iirParams');
const kalmanParamsDiv = document.getElementById('kalmanParams');
const commonParamLabel = document.getElementById('commonParamLabel');
const filterFormulaBox = document.getElementById('filterFormula');

const algoFormulas = {
  moving_avg: 'y[i] = (1/N) · Σ x[i+j],  j ∈ [-N/2, N/2]',
  median: 'y[i] = median{ x[i+j] | j ∈ [-N/2, N/2] }',
  amplitude_limit: 'if |x[i] - y[i-1]| ≤ A:  y[i] = x[i]\nelse:  y[i] = y[i-1] ± A',
  fir_lowpass: 'h[n] = 2fc · sinc(2fc·n) · w[n]\nw[n] = 0.5 + 0.5·cos(2πn/(N-1))  (汉宁窗)\ny = x * h  (线性卷积)',
  iir2_lowpass: '二阶巴特沃斯低通 (双线性变换法)\nK = tan(π·fc/(fs/2))\nnorm = 1 / (1 + √2·K + K²)\na0 = a2 = K²·norm,  a1 = 2·a0\nb1 = 2·(K²-1)·norm,  b2 = (1-√2·K+K²)·norm\ny[n] = a0·x[n] + a1·x[n-1] + a2·x[n-2] - b1·y[n-1] - b2·y[n-2]',
  kalman: '预测:  x⁻ = x,  P⁻ = P + Q\n更新:  K = P⁻ / (P⁻ + R)\n       x = x⁻ + K·(z - x⁻)\n       P = (1 - K)·P⁻',
  limit_avg: '窗口内去掉与当前点偏差 > A 的值，剩余求平均\ny[i] = mean{ x[i+j] | |x[i+j] - x[i]| ≤ A,  j ∈ [-N/2, N/2] }',
  mid_avg: '窗口排序后去掉最大值和最小值各 1 个，剩余求平均\ny[i] = mean{ sorted{x[i+j]}[1..N-2] | j ∈ [-N/2, N/2] }'
};

function updateFilterUI() {
  const v = filterAlgoSelect.value;
  firParamsDiv.style.display = 'none';
  commonParamsDiv.style.display = 'none';
  limitParamsDiv.style.display = 'none';
  iirParamsDiv.style.display = 'none';
  kalmanParamsDiv.style.display = 'none';

  if (v === 'fir_lowpass') {
    firParamsDiv.style.display = 'block';
  } else if (v === 'iir2_lowpass') {
    iirParamsDiv.style.display = 'block';
  } else if (v === 'kalman') {
    kalmanParamsDiv.style.display = 'block';
  } else if (v === 'amplitude_limit' || v === 'limit_avg') {
    limitParamsDiv.style.display = 'block';
  } else {
    commonParamsDiv.style.display = 'block';
    if (v === 'moving_avg') commonParamLabel.textContent = window.I18N.t('signal.label.windowSize');
    else if (v === 'median') commonParamLabel.textContent = window.I18N.t('signal.label.windowSize');
    else if (v === 'mid_avg') commonParamLabel.textContent = window.I18N.t('signal.label.windowSizeMidAvg');
  }

  // 显示当前算法公式
  if (algoFormulas[v]) {
    filterFormulaBox.textContent = algoFormulas[v];
    filterFormulaBox.style.display = 'block';
  } else {
    filterFormulaBox.style.display = 'none';
  }
}
filterAlgoSelect.addEventListener('change', updateFilterUI);
updateFilterUI();

// ================= FIR 低通滤波器 =================
function sinc(x) {
  return x === 0 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x);
}

function designFIRLowpass(order, cutoff, sr) {
  const N = order;
  const h = new Float64Array(N);
  const fc = cutoff / sr;
  for (let i = 0; i < N; i++) {
    const n = i - (N - 1) / 2;
    const ideal = 2 * fc * sinc(2 * fc * n);
    const w = 0.5 + 0.5 * Math.cos((2 * Math.PI * i) / (N - 1)); // 汉宁窗
    h[i] = ideal * w;
  }
  return h;
}

function convolve(signal, kernel) {
  const result = new Float64Array(signal.length);
  const half = Math.floor(kernel.length / 2);
  for (let i = 0; i < signal.length; i++) {
    let sum = 0;
    for (let j = 0; j < kernel.length; j++) {
      const idx = i - j + half;
      if (idx >= 0 && idx < signal.length) sum += signal[idx] * kernel[j];
    }
    result[i] = sum;
  }
  return result;
}

// ================= 移动平均滤波 =================
function filterMovingAvg(signal, winSize) {
  const N = signal.length;
  const result = new Float64Array(N);
  const half = Math.floor(winSize / 2);
  for (let i = 0; i < N; i++) {
    let sum = 0, count = 0;
    for (let j = -half; j <= half; j++) {
      const idx = i + j;
      if (idx >= 0 && idx < N) { sum += signal[idx]; count++; }
    }
    result[i] = sum / count;
  }
  return result;
}

// ================= 中值滤波 =================
function filterMedian(signal, winSize) {
  const N = signal.length;
  const result = new Float64Array(N);
  const half = Math.floor(winSize / 2);
  for (let i = 0; i < N; i++) {
    const buf = [];
    for (let j = -half; j <= half; j++) {
      const idx = i + j;
      if (idx >= 0 && idx < N) buf.push(signal[idx]);
    }
    buf.sort((a, b) => a - b);
    result[i] = buf[Math.floor(buf.length / 2)];
  }
  return result;
}

// ================= 限幅滤波 =================
function filterAmplitudeLimit(signal, limit) {
  const N = signal.length;
  const result = new Float64Array(N);
  result[0] = signal[0];
  for (let i = 1; i < N; i++) {
    const diff = signal[i] - result[i - 1];
    if (Math.abs(diff) <= limit) {
      result[i] = signal[i];
    } else {
      result[i] = result[i - 1] + (diff > 0 ? limit : -limit);
    }
  }
  return result;
}

// ================= 二阶 IIR 低通滤波 =================
function filterIIR2Lowpass(signal, cutoff, sr) {
  const N = signal.length;
  const result = new Float64Array(N);
  const fc = cutoff / (sr / 2); // 归一化频率
  const K = Math.tan(Math.PI * fc);
  const norm = 1 / (1 + Math.SQRT2 * K + K * K);
  const a0 = K * K * norm;
  const a1 = 2 * a0;
  const a2 = a0;
  const b1 = 2 * (K * K - 1) * norm;
  const b2 = (1 - Math.SQRT2 * K + K * K) * norm;

  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < N; i++) {
    const y = a0 * signal[i] + a1 * x1 + a2 * x2 - b1 * y1 - b2 * y2;
    x2 = x1; x1 = signal[i];
    y2 = y1; y1 = y;
    result[i] = y;
  }
  return result;
}

// ================= 卡尔曼滤波 =================
function filterKalman(signal, Q, R) {
  const N = signal.length;
  const result = new Float64Array(N);
  let x = signal[0]; // 状态估计
  let P = 1; // 误差协方差
  for (let i = 0; i < N; i++) {
    // 预测
    const xPred = x;
    const PPred = P + Q;
    // 更新
    const K = PPred / (PPred + R);
    x = xPred + K * (signal[i] - xPred);
    P = (1 - K) * PPred;
    result[i] = x;
  }
  return result;
}

// ================= 限幅平均滤波 =================
function filterLimitAvg(signal, limit, winSize) {
  const N = signal.length;
  const result = new Float64Array(N);
  const half = Math.floor(winSize / 2);
  for (let i = 0; i < N; i++) {
    const buf = [];
    for (let j = -half; j <= half; j++) {
      const idx = i + j;
      if (idx >= 0 && idx < N) buf.push(signal[idx]);
    }
    // 限幅：去掉与当前点偏差超过 limit 的值
    const center = signal[i];
    const valid = buf.filter(v => Math.abs(v - center) <= limit);
    result[i] = valid.length > 0 ? valid.reduce((a, b) => a + b, 0) / valid.length : center;
  }
  return result;
}

// ================= 中位值平均滤波 =================
function filterMidAvg(signal, winSize) {
  const N = signal.length;
  const result = new Float64Array(N);
  const half = Math.floor(winSize / 2);
  for (let i = 0; i < N; i++) {
    const buf = [];
    for (let j = -half; j <= half; j++) {
      const idx = i + j;
      if (idx >= 0 && idx < N) buf.push(signal[idx]);
    }
    buf.sort((a, b) => a - b);
    // 去掉最大和最小各一个，剩余求平均
    if (buf.length > 2) {
      const trimmed = buf.slice(1, buf.length - 1);
      result[i] = trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
    } else {
      result[i] = buf.reduce((a, b) => a + b, 0) / buf.length;
    }
  }
  return result;
}

// ================= 统一应用滤波器 =================
function applyFilter() {
  if (!currentData.length) { alert(window.I18N.t('signal.alert.drawFirst')); return; }
  const algo = filterAlgoSelect.value;
  const signal = currentData.map(d => d.y);
  let filtered;
  let algoNameKey = '';
  let formula = '';
  let params = []; // [{k, v}] 用于 stats 显示

  if (algo === 'moving_avg') {
    const ws = parseInt(document.getElementById('windowSize').value);
    filtered = filterMovingAvg(signal, ws);
    algoNameKey = 'signal.algo.movingAvg';
    params = [{ k: 'signal.stats.window', v: ws }];
    formula = `y[i] = (1/N) * Σ x[i+j], j ∈ [-N/2, N/2]`;
  } else if (algo === 'median') {
    const ws = parseInt(document.getElementById('windowSize').value);
    filtered = filterMedian(signal, ws);
    algoNameKey = 'signal.algo.median';
    params = [{ k: 'signal.stats.window', v: ws }];
    formula = `y[i] = median{ x[i+j] | j ∈ [-N/2, N/2] }`;
  } else if (algo === 'amplitude_limit') {
    const limit = parseFloat(document.getElementById('limitValue').value);
    filtered = filterAmplitudeLimit(signal, limit);
    algoNameKey = 'signal.algo.amplitudeLimit';
    params = [{ k: 'signal.stats.limit', v: limit }];
    formula = `if |x[i] - y[i-1]| ≤ A: y[i] = x[i]\nelse: y[i] = y[i-1] ± A`;
  } else if (algo === 'fir_lowpass') {
    const c1 = parseFloat(document.getElementById('cutoff1').value);
    const order = parseInt(document.getElementById('filterOrder').value);
    if (isNaN(c1) || c1 < 0) { alert(window.I18N.t('signal.alert.cutoffNeg')); return; }
    if (sampleRate <= 0) { alert(window.I18N.t('signal.alert.sampleRateInvalid')); return; }
    const nyquist = sampleRate / 2;
    if (c1 >= nyquist) { alert(`${window.I18N.t('signal.alert.cutoffLtNyquist')} ${nyquist.toFixed(2)} Hz`); return; }
    const kernel = designFIRLowpass(order, c1, sampleRate);
    filtered = convolve(signal, kernel);
    algoNameKey = 'signal.algo.firLowpass';
    params = [{ k: 'fc', v: c1 + 'Hz' }, { k: 'order', v: order }];
    formula = `h[n] = 2fc · sinc(2fc·n) · w[n],  w[n]=0.5+0.5cos(2πn/(N-1))\ny = x * h (卷积)`;
  } else if (algo === 'iir2_lowpass') {
    const c1 = parseFloat(document.getElementById('iirCutoff').value);
    if (isNaN(c1) || c1 < 0) { alert(window.I18N.t('signal.alert.cutoffNeg')); return; }
    if (sampleRate <= 0) { alert(window.I18N.t('signal.alert.sampleRateInvalid')); return; }
    const nyquist = sampleRate / 2;
    if (c1 >= nyquist) { alert(`${window.I18N.t('signal.alert.cutoffLtNyquist')} ${nyquist.toFixed(2)} Hz`); return; }
    filtered = filterIIR2Lowpass(signal, c1, sampleRate);
    algoNameKey = 'signal.algo.iir2Lowpass';
    params = [{ k: 'fc', v: c1 + 'Hz' }];
    formula = `y[n] = a0·x[n] + a1·x[n-1] + a2·x[n-2] - b1·y[n-1] - b2·y[n-2]`;
  } else if (algo === 'kalman') {
    const Q = parseFloat(document.getElementById('kalmanQ').value);
    const R = parseFloat(document.getElementById('kalmanR').value);
    filtered = filterKalman(signal, Q, R);
    algoNameKey = 'signal.algo.kalman';
    params = [{ k: 'Q', v: Q }, { k: 'R', v: R }];
    formula = `预测: x⁻ = x,  P⁻ = P + Q\n更新: K = P⁻/(P⁻+R),  x = x⁻ + K(z-x⁻),  P = (1-K)P⁻`;
  } else if (algo === 'limit_avg') {
    const limit = parseFloat(document.getElementById('limitValue').value);
    const ws = parseInt(document.getElementById('windowSize').value);
    filtered = filterLimitAvg(signal, limit, ws);
    algoNameKey = 'signal.algo.limitAvg';
    params = [{ k: 'signal.stats.limit', v: limit }, { k: 'signal.stats.window', v: ws }];
    formula = `窗口内去掉与当前点偏差>A的值，剩余求平均`;
  } else if (algo === 'mid_avg') {
    const ws = parseInt(document.getElementById('windowSize').value);
    filtered = filterMidAvg(signal, ws);
    algoNameKey = 'signal.algo.midAvg';
    params = [{ k: 'signal.stats.window', v: ws }];
    formula = `窗口排序后去掉最大最小各1个，剩余求平均`;
  }

  filteredData = currentData.map((d, i) => ({ x: d.x, y: filtered[i] }));
  drawChart(timeCanvas, currentData, filteredData, 'time');

  filterFormulaBox.textContent = formula;
  filterFormulaBox.style.display = 'block';
  lastFilterStats = {
    algoNameKey: algoNameKey,
    params: params,
    sampleRate: sampleRate,
    dataLen: currentData.length
  };
  renderFilterStats();
}

// 渲染滤波器统计文本（语言切换时复用）
function renderFilterStats() {
  if (!lastFilterStats) return;
  const s = lastFilterStats;
  const parts = [window.I18N.t(s.algoNameKey)];
  for (const p of s.params) {
    const labelKey = p.k;
    // 仅翻译以 signal. 开头的 key，其他直接使用原文
    const label = labelKey.indexOf('signal.') === 0 ? window.I18N.t(labelKey) : labelKey;
    parts.push(`${label}=${p.v}`);
  }
  const paramStr = parts.join(', ');
  const stats = document.getElementById('filterStats');
  stats.textContent =
    `${paramStr} | ${window.I18N.t('signal.stats.sampleRate')}=${s.sampleRate.toFixed(3)} Hz | ` +
    `${window.I18N.t('signal.stats.dataPoints')}=${s.dataLen}`;
}

function clearFilter() {
  filteredData = [];
  drawChart(timeCanvas, currentData, filteredData, 'time');
  document.getElementById('filterStats').textContent = '';
  document.getElementById('filterFormula').style.display = 'none';
  lastFilterStats = null;
}

// ================= 导出功能 =================
function exportData(kind) {
  let csv = '';
  let filename = '';
  if (kind === 'original') {
    if (!currentData.length) { alert(window.I18N.t('signal.alert.noOriginal')); return; }
    csv = 'x,y\n' + currentData.map(d => `${d.x},${d.y}`).join('\n');
    filename = 'original_data.csv';
  } else if (kind === 'filtered') {
    if (!filteredData.length) { alert(window.I18N.t('signal.alert.noFiltered')); return; }
    csv = 'x,y_filtered\n' + filteredData.map(d => `${d.x},${d.y}`).join('\n');
    filename = 'filtered_data.csv';
  } else if (kind === 'fft') {
    if (!fftData.length) { alert(window.I18N.t('signal.alert.noFft')); return; }
    csv = 'frequency_hz,magnitude\n' + fftData.map(d => `${d.x},${d.y}`).join('\n');
    filename = 'fft_spectrum.csv';
  }
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ================= 初始化 =================
window.addEventListener('resize', () => {
  drawChart(timeCanvas, currentData, filteredData, 'time');
  if (fftData.length) drawChart(fftCanvas, fftData, [], 'fft');
});

// 拖拽状态
let isDragging = false, dragStartX = 0, dragStartY = 0;
let dragStartOffsetX = 0, dragStartOffsetY = 0;

[timeCanvas, fftCanvas].forEach((cvs, idx) => {
  const zKey = idx === 0 ? 'time' : 'fft';
  const wrap = cvs.parentElement;

  // 滚轮缩放
  cvs.addEventListener('wheel', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? 1.1 : 0.9;
    const vs = viewState[zKey];
    vs.scaleX = Math.max(0.1, Math.min(50, vs.scaleX * delta));
    vs.scaleY = Math.max(0.1, Math.min(50, vs.scaleY * delta));
    const meta = cvs._chartMeta;
    if (meta) drawChart(cvs, meta.type === 'fft' ? fftData : currentData,
              meta.type === 'fft' ? [] : filteredData, meta.type);
  }, { passive: false });

  // 拖拽平移
  cvs.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    const vs = viewState[zKey];
    dragStartOffsetX = vs.offsetX;
    dragStartOffsetY = vs.offsetY;
    wrap.style.cursor = 'grabbing';
  });

  // 双击重置
  cvs.addEventListener('dblclick', () => {
    const vs = viewState[zKey];
    vs.offsetX = 0;
    vs.offsetY = 0;
    vs.scaleX = 1;
    vs.scaleY = 1;
    const meta = cvs._chartMeta;
    if (meta) drawChart(cvs, meta.type === 'fft' ? fftData : currentData,
              meta.type === 'fft' ? [] : filteredData, meta.type);
  });
});

// 全局拖拽移动
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;
  for (const key of ['time', 'fft']) {
    viewState[key].offsetX = dragStartOffsetX - dx;
    viewState[key].offsetY = dragStartOffsetY + dy;
  }
  const meta1 = timeCanvas._chartMeta;
  const meta2 = fftCanvas._chartMeta;
  if (meta1) drawChart(timeCanvas, currentData, filteredData, 'time');
  if (meta2 && fftData.length) drawChart(fftCanvas, fftData, [], 'fft');
});

window.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    [timeCanvas, fftCanvas].forEach(c => {
      c.parentElement.style.cursor = 'grab';
    });
  }
});

// 同步主题图标（data-theme 已由 head 内联脚本设置；setTheme 来自 theme.js）
setTheme(localStorage.getItem('toolbox-theme') || 'light');

// 默认使用公式生成示例信号：1Hz + 3Hz 混合正弦波
document.getElementById('formulaInput').value = 'sin(2*PI*x) + 0.5*sin(6*PI*x)';
document.getElementById('xStart').value = '0';
document.getElementById('xEnd').value = '2';
document.getElementById('xSamples').value = '256';
plotFormula();

// ================= 语言切换时刷新动态内容 =================
document.addEventListener('languagechange', function () {
  document.title = window.I18N.t('signal.doc.title');
  // 刷新 Canvas 上的文本标签（坐标轴、缩放提示、空数据提示）
  drawChart(timeCanvas, currentData, filteredData, 'time');
  if (fftData.length) drawChart(fftCanvas, fftData, [], 'fft');
  // 刷新动态 stats
  renderFftStats();
  renderFilterStats();
  // 刷新滤波器参数联动标签（窗口大小等）
  updateFilterUI();
});
document.title = window.I18N.t('signal.doc.title');
