// ============================================================
//  MermaidDraw.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
//  此处仅处理流程图绘制业务逻辑
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + JS 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },

    'flowchart.doc.title':      { zh: '在线流程图', en: 'Flowchart Drawer' },
    'flowchart.page.title':     { zh: '📊 在线流程图', en: '📊 Flowchart Drawer' },
    'flowchart.subhead':        { zh: '🔹 基于 Mermaid · 支持在线/离线模式 · 嵌入式开发模板 · 左右分栏实时预览', en: '🔹 Powered by Mermaid · online/offline modes · embedded templates · split-pane live preview' },

    // 工具栏
    'flowchart.toolbar.mode':    { zh: '渲染模式', en: 'Render Mode' },
    'flowchart.mode.online':     { zh: '🌐 在线', en: '🌐 Online' },
    'flowchart.mode.offline':    { zh: '📦 离线', en: '📦 Offline' },
    'flowchart.toolbar.cat':     { zh: '分类', en: 'Category' },
    'flowchart.cat.embedded':    { zh: '嵌入式开发', en: 'Embedded Dev' },
    'flowchart.cat.mermaid':     { zh: 'Mermaid 模板', en: 'Mermaid' },
    'flowchart.toolbar.template':{ zh: '模板', en: 'Template' },
    'flowchart.toolbar.tpl':     { zh: '模板', en: 'Template' },
    'flowchart.btn.load':        { zh: '📥 加载', en: '📥 Load' },
    'flowchart.toolbar.zoom':    { zh: '缩放', en: 'Zoom' },
    'flowchart.title.zoomOut':   { zh: '缩小', en: 'Zoom out' },
    'flowchart.title.zoomIn':    { zh: '放大', en: 'Zoom in' },
    'flowchart.title.zoomReset': { zh: '重置', en: 'Reset' },
    'flowchart.quickbar.title': { zh: '快捷功能', en: 'Quick Tools' },
    'flowchart.quick.flowchart': { zh: '流程图', en: 'Flowchart' },
    'flowchart.quick.sequence':  { zh: '时序图', en: 'Sequence' },
    'flowchart.quick.state':     { zh: '状态图', en: 'State' },
    'flowchart.quick.class':     { zh: '类图', en: 'Class' },
    'flowchart.quick.gantt':     { zh: '甘特图', en: 'Gantt' },
    'flowchart.quick.pie':       { zh: '饼图', en: 'Pie' },
    'flowchart.quick.clear':     { zh: '🗑 清空', en: '🗑 Clear' },
    'flowchart.quick.format':    { zh: '🧹 格式化', en: '🧹 Format' },
    'flowchart.quick.formatDone':{ zh: '✓ 已格式化', en: '✓ Formatted' },
    'flowchart.quick.render':    { zh: '▶️ 渲染', en: '▶️ Render' },
    'flowchart.quick.clearWarn': { zh: '确定清空编辑器内容？', en: 'Clear editor content?' },

    // 分栏：拖动分隔条 + 全屏
    'flowchart.resizer.title':    { zh: '拖动调整编辑/预览宽度', en: 'Drag to resize editor/preview' },
    'flowchart.fs.editor':        { zh: '编辑器全屏', en: 'Editor fullscreen' },
    'flowchart.fs.preview':       { zh: '预览全屏', en: 'Preview fullscreen' },
    'flowchart.fs.editor.restore':{ zh: '退出编辑器全屏', en: 'Exit editor fullscreen' },
    'flowchart.fs.preview.restore':{ zh: '退出预览全屏', en: 'Exit preview fullscreen' },
    'flowchart.btn.copy':        { zh: '📋 复制代码', en: '📋 Copy code' },
    'flowchart.btn.exportPng':   { zh: '🖼 导出 PNG', en: '🖼 Export PNG' },
    'flowchart.btn.exportSvg':   { zh: '📐 导出 SVG', en: '📐 Export SVG' },
    'flowchart.btn.render':      { zh: '▶ 渲染', en: '▶ Render' },

    // 面板
    'flowchart.panel.code':      { zh: '📝 代码编辑', en: '📝 Code Editor' },
    'flowchart.panel.preview':   { zh: '📊 渲染预览', en: '📊 Preview' },
    'flowchart.editor.ph':       { zh: 'flowchart LR\n    A[开始] --> B[结束]', en: 'flowchart LR\n    A[Start] --> B[End]' },

    // 状态
    'flowchart.status.ready':    { zh: '就绪', en: 'Ready' },
    'flowchart.status.rendering':{ zh: '渲染中...', en: 'Rendering...' },
    'flowchart.status.error':    { zh: '错误', en: 'Error' },
    'flowchart.status.empty':    { zh: '在左侧输入 Mermaid 代码，点击渲染', en: 'Enter Mermaid code on the left to render' },

    // 动态消息
    'flowchart.msg.copied':      { zh: '✓ 已复制', en: '✓ Copied' },
    'flowchart.msg.copyFail':    { zh: '复制失败', en: 'Copy failed' },
    'flowchart.msg.pngFail':     { zh: 'PNG 导出失败，请重试', en: 'PNG export failed, please retry' },
    
    'flowchart.msg.loading':     { zh: '正在加载 Mermaid...', en: 'Loading Mermaid...' },
    'flowchart.msg.loaded':      { zh: 'Mermaid 已就绪', en: 'Mermaid ready' },
    'flowchart.msg.loadFail':    { zh: 'Mermaid 加载失败，请检查网络或切换到离线模式', en: 'Mermaid load failed. Check network or switch to offline mode.' },
    'flowchart.msg.renderErr':   { zh: '渲染错误', en: 'Render error' },
    'flowchart.msg.noMermaid':   { zh: 'Mermaid 尚未加载', en: 'Mermaid not loaded yet' },
    'flowchart.msg.offlineFallback': { zh: '离线模式使用本地 Mermaid 库', en: 'Offline mode using local Mermaid library' },

    // 模板名称
    'flowchart.tpl.embedded.mcu_init':    { zh: 'MCU 初始化流程', en: 'MCU Init Flow' },
    'flowchart.tpl.embedded.interrupt':   { zh: '中断处理流程', en: 'Interrupt Handler' },
    'flowchart.tpl.embedded.uart':        { zh: 'UART 通信流程', en: 'UART Comm Flow' },
    'flowchart.tpl.embedded.i2c':         { zh: 'I2C 读写流程', en: 'I2C R/W Flow' },
    'flowchart.tpl.embedded.spi':         { zh: 'SPI 传输流程', en: 'SPI Transfer' },
    'flowchart.tpl.embedded.adc':         { zh: 'ADC 采样流程', en: 'ADC Sampling' },
    'flowchart.tpl.embedded.rtos':        { zh: 'RTOS 任务调度', en: 'RTOS Task Sched' },
    'flowchart.tpl.embedded.watchdog':    { zh: '看门狗流程', en: 'Watchdog Flow' },
    'flowchart.tpl.embedded.ota':         { zh: 'OTA 升级流程', en: 'OTA Update Flow' },
    'flowchart.tpl.embedded.power':       { zh: '电源管理流程', en: 'Power Mgmt Flow' },
    'flowchart.tpl.mermaid.flowchart':    { zh: '流程图 (Flowchart)', en: 'Flowchart' },
    'flowchart.tpl.mermaid.sequence':     { zh: '时序图 (Sequence)', en: 'Sequence Diagram' },
    'flowchart.tpl.mermaid.class':        { zh: '类图 (Class)', en: 'Class Diagram' },
    'flowchart.tpl.mermaid.state':        { zh: '状态图 (State)', en: 'State Diagram' },
    'flowchart.tpl.mermaid.er':           { zh: 'ER 图 (Entity Relationship)', en: 'ER Diagram' },
    'flowchart.tpl.mermaid.gantt':        { zh: '甘特图 (Gantt)', en: 'Gantt Chart' },
    'flowchart.tpl.mermaid.pie':          { zh: '饼图 (Pie)', en: 'Pie Chart' },
    'flowchart.tpl.mermaid.git':          { zh: 'Git 分支图', en: 'Git Graph' },
    'flowchart.tpl.mermaid.mindmap':      { zh: '思维导图 (Mindmap)', en: 'Mindmap' },
    'flowchart.tpl.mermaid.timeline':     { zh: '时间线 (Timeline)', en: 'Timeline' },
    'flowchart.tpl.mermaid.quadrant':     { zh: '象限图 (Quadrant)', en: 'Quadrant Chart' },
    'flowchart.tpl.mermaid.sankey':       { zh: '桑基图 (Sankey)', en: 'Sankey Diagram' },
    'flowchart.tpl.mermaid.block':        { zh: '框图 (Block)', en: 'Block Diagram' },
    'flowchart.tpl.mermaid.xychart':      { zh: 'XY 图表 (XY Chart)', en: 'XY Chart' },
    'flowchart.tpl.mermaid.packet':       { zh: '数据包图 (Packet)', en: 'Packet Diagram' },
    'flowchart.tpl.mermaid.kanban':       { zh: '看板图 (Kanban)', en: 'Kanban Board' },
    'flowchart.tpl.mermaid.architecture': { zh: '架构图 (Architecture)', en: 'Architecture' },
    'flowchart.tpl.mermaid.c4':           { zh: 'C4 架构图', en: 'C4 Diagram' },
    'flowchart.tpl.mermaid.requirement':  { zh: '需求图 (Requirement)', en: 'Requirement' },
    'flowchart.tpl.mermaid.zenuml':       { zh: 'ZenUML 时序图', en: 'ZenUML Sequence' },
    'flowchart.tpl.mermaid.radar':        { zh: '雷达图 (Radar)', en: 'Radar Chart' },
    'flowchart.tpl.mermaid.eventmodel':   { zh: '事件建模图 (Event Modeling)', en: 'Event Modeling' },
    'flowchart.tpl.mermaid.tree':         { zh: '树视图 - 嵌入式项目', en: 'TreeView - Embedded' },
    'flowchart.tpl.mermaid.treeview':     { zh: '树视图 - 目录结构', en: 'TreeView - Directory' },
    'flowchart.tpl.mermaid.treemap':      { zh: '矩形树图 (Treemap)', en: 'Treemap' },
    'flowchart.tpl.mermaid.swimlane':     { zh: '泳道图 (Swimlane)', en: 'Swimlane' },
    'flowchart.tpl.mermaid.venn':         { zh: '维恩图 (近似)', en: 'Venn (approx.)' },
    'flowchart.tpl.mermaid.fishbone':     { zh: '石川图 (Ishikawa)', en: 'Ishikawa Diagram' },
    'flowchart.tpl.mermaid.wardley':      { zh: '沃德利图 (象限近似)', en: 'Wardley (quadrant)' },
    'flowchart.tpl.mermaid.cynefin':      { zh: 'Cynefin 框架', en: 'Cynefin Framework' },

    'flowchart.footer': { zh: '📊 在线流程图绘制 · 基于 Mermaid · 支持嵌入式开发模板与标准 Mermaid 图表', en: '📊 Flowchart Drawer · Powered by Mermaid · embedded & standard diagram templates' }
};

// 翻译辅助：支持 {占位符} 替换
function tt(key, vars) {
    var s = window.I18N.t(key);
    if (vars) {
        for (var k in vars) {
            s = s.split('{' + k + '}').join(vars[k]);
        }
    }
    return s;
}

(function() {
    'use strict';

    // ============================================================
    //  模板数据
    // ============================================================
    var EMBEDDED_TEMPLATES = {
        'mcu_init': {
            nameKey: 'flowchart.tpl.embedded.mcu_init',
            code: [
                'flowchart TD',
                '    A[系统上电] --> B[复位向量]',
                '    B --> C[初始化堆栈指针]',
                '    C --> D[SystemInit]',
                '    D --> E[配置系统时钟]',
                '    E --> F[初始化外设总线]',
                '    F --> G[配置 GPIO]',
                '    G --> H[初始化 UART/I2C/SPI]',
                '    H --> I[初始化定时器]',
                '    I --> J[配置中断向量表]',
                '    J --> K[使能全局中断]',
                '    K --> L[进入主循环]',
                '    L --> M{任务调度}',
                '    M -->|传感器| N[读取传感器数据]',
                '    M -->|通信| O[处理通信协议]',
                '    M -->|控制| P[执行控制逻辑]',
                '    N --> L',
                '    O --> L',
                '    P --> L'
            ].join('\n')
        },
        'interrupt': {
            nameKey: 'flowchart.tpl.embedded.interrupt',
            code: [
                'flowchart TD',
                '    A[中断触发] --> B[硬件保存上下文]',
                '    B --> C[进入中断向量表]',
                '    C --> D[执行 ISR 入口]',
                '    D --> E{判断中断源}',
                '    E -->|定时器| F[Timer_IRQHandler]',
                '    E -->|串口| G[UART_IRQHandler]',
                '    E -->|外部| H[EXTI_IRQHandler]',
                '    E -->|DMA| I[DMA_IRQHandler]',
                '    F --> J[清除中断标志]',
                '    G --> J',
                '    H --> J',
                '    I --> J',
                '    J --> K[处理中断逻辑]',
                '    K --> L[恢复上下文]',
                '    L --> M[返回主程序]'
            ].join('\n')
        },
        'uart': {
            nameKey: 'flowchart.tpl.embedded.uart',
            code: [
                'flowchart TD',
                '    A[初始化 UART] --> B[配置波特率 115200]',
                '    B --> C[配置数据位 8N1]',
                '    C --> D[使能发送/接收]',
                '    D --> E{操作类型}',
                '    E -->|发送| F[填充 TX 缓冲区]',
                '    F --> G[启动 DMA 发送]',
                '    G --> H[等待 TC 完成标志]',
                '    H --> I[发送完成回调]',
                '    E -->|接收| J[开启 RX 中断]',
                '    J --> K[接收字节到 FIFO]',
                '    K --> L{帧头检测}',
                '    L -->|匹配| M[解析协议帧]',
                '    L -->|不匹配| N[丢弃并继续]',
                '    M --> O[校验 CRC]',
                '    O --> P{CRC 正确?}',
                '    P -->|是| Q[处理数据包]',
                '    P -->|否| R[请求重传]',
                '    N --> J',
                '    R --> J'
            ].join('\n')
        },
        'i2c': {
            nameKey: 'flowchart.tpl.embedded.i2c',
            code: [
                'flowchart TD',
                '    A[配置 I2C 主机] --> B[生成 START 条件]',
                '    B --> C[发送从机地址+W]',
                '    C --> D{收到 ACK?}',
                '    D -->|是| E[发送寄存器地址]',
                '    D -->|否| F[错误处理]',
                '    E --> G{收到 ACK?}',
                '    G -->|是| H{读写方向}',
                '    G -->|否| F',
                '    H -->|写| I[发送数据字节]',
                '    H -->|读| J[生成 RESTART]',
                '    I --> K{收到 ACK?}',
                '    K -->|是| L[继续发送/完成]',
                '    K -->|否| F',
                '    J --> M[发送从机地址+R]',
                '    M --> N[读取数据字节]',
                '    N --> O[发送 NACK]',
                '    L --> P[生成 STOP 条件]',
                '    O --> P',
                '    F --> P',
                '    P --> Q[释放总线]'
            ].join('\n')
        },
        'spi': {
            nameKey: 'flowchart.tpl.embedded.spi',
            code: [
                'flowchart TD',
                '    A[配置 SPI 主机] --> B[设置 CPOL/CPHA]',
                '    B --> C[设置时钟分频]',
                '    C --> D[拉低 CS 片选]',
                '    D --> E[写入 TXDR 寄存器]',
                '    E --> F[等待 TXE 标志]',
                '    F --> G[SCK 时钟输出数据]',
                '    G --> H[同时 MISO 采样]',
                '    H --> I{传输完成?}',
                '    I -->|否| E',
                '    I -->|是| J[等待 BUSY 清零]',
                '    J --> K[读取 RXDR 数据]',
                '    K --> L[拉高 CS 片选]',
                '    L --> M[数据处理]'
            ].join('\n')
        },
        'adc': {
            nameKey: 'flowchart.tpl.embedded.adc',
            code: [
                'flowchart TD',
                '    A[配置 ADC] --> B[选择采样通道]',
                '    B --> C[设置采样时间]',
                '    C --> D[选择触发源]',
                '    D --> E{触发模式}',
                '    E -->|单次| F[软件触发 ADSTART]',
                '    E -->|连续| G[开启连续模式]',
                '    E -->|定时器| H[配置定时器触发]',
                '    F --> I[等待 EOC 标志]',
                '    G --> I',
                '    H --> I',
                '    I --> J[读取 DR 寄存器]',
                '    J --> K[数字滤波]',
                '    K --> L[转换为实际值]',
                '    L --> M{需要 DMA?}',
                '    M -->|是| N[DMA 搬运到缓冲区]',
                '    M -->|否| O[直接使用]',
                '    N --> P[缓冲区满回调]',
                '    O --> Q[应用处理]',
                '    P --> Q'
            ].join('\n')
        },
        'rtos': {
            nameKey: 'flowchart.tpl.embedded.rtos',
            code: [
                'flowchart TD',
                '    A[启动 RTOS] --> B[创建空闲任务]',
                '    B --> C[创建用户任务]',
                '    C --> D[启动调度器]',
                '    D --> E{SysTick 中断}',
                '    E --> F[保存当前任务上下文]',
                '    F --> G[选择最高优先级就绪任务]',
                '    G --> H[恢复目标任务上下文]',
                '    H --> I[执行目标任务]',
                '    I --> J{任务状态变化}',
                '    J -->|阻塞| K[加入等待队列]',
                '    J -->|就绪| L[加入就绪队列]',
                '    J -->|挂起| M[从调度移除]',
                '    K --> N[触发调度]',
                '    L --> N',
                '    M --> N',
                '    N --> E'
            ].join('\n')
        },
        'watchdog': {
            nameKey: 'flowchart.tpl.embedded.watchdog',
            code: [
                'flowchart TD',
                '    A[系统初始化] --> B[配置看门狗超时]',
                '    B --> C[使能看门狗]',
                '    C --> D[主循环开始]',
                '    D --> E[执行任务1]',
                '    E --> F[执行任务2]',
                '    F --> G[喂狗 WDG_Refresh]',
                '    G --> H{任务正常?}',
                '    H -->|是| D',
                '    H -->|异常| I[任务卡死]',
                '    I --> J[看门狗超时]',
                '    J --> K[系统复位]',
                '    K --> L[检查复位原因]',
                '    L --> M{RCC_CSR 标志}',
                '    M -->|IWDG| N[记录看门狗复位]',
                '    M -->|其他| O[正常启动]',
                '    N --> P[进入安全模式]',
                '    P --> D'
            ].join('\n')
        },
        'ota': {
            nameKey: 'flowchart.tpl.embedded.ota',
            code: [
                'flowchart TD',
                '    A[设备运行] --> B[收到升级指令]',
                '    B --> C[连接 OTA 服务器]',
                '    C --> D[获取固件版本信息]',
                '    D --> E{需要升级?}',
                '    E -->|否| F[继续正常运行]',
                '    E -->|是| G[下载固件包]',
                '    G --> H[校验 MD5/SHA256]',
                '    H --> I{校验通过?}',
                '    I -->|否| J[重新下载]',
                '    J --> G',
                '    I -->|是| K[写入升级分区]',
                '    K --> L[设置升级标志]',
                '    L --> M[软件复位]',
                '    M --> N[Bootloader 启动]',
                '    N --> O{检查升级标志}',
                '    O -->|有效| P[搬运新固件到 APP 区]',
                '    O -->|无效| Q[跳转旧固件]',
                '    P --> R[清除升级标志]',
                '    R --> S[跳转新固件]',
                '    S --> T[新固件运行]'
            ].join('\n')
        },
        'power': {
            nameKey: 'flowchart.tpl.embedded.power',
            code: [
                'flowchart TD',
                '    A[设备上电] --> B[全速运行模式]',
                '    B --> C{检测空闲时间}',
                '    C -->|空闲>1s| D[降低主频]',
                '    C -->|空闲>5s| E[进入睡眠模式]',
                '    C -->|空闲>30s| F[进入停止模式]',
                '    C -->|空闲>5min| G[进入待机模式]',
                '    D --> H[关闭不必要外设]',
                '    H --> I[等待唤醒事件]',
                '    I --> J[恢复外设时钟]',
                '    J --> B',
                '    E --> K[CPU 停止/外设运行]',
                '    K --> L[任意中断唤醒]',
                '    L --> B',
                '    F --> M[关闭 HSI/HSE]',
                '    M --> N[仅 LSI/LSE 运行]',
                '    N --> O[外部中断唤醒]',
                '    O --> B',
                '    G --> P[仅备份域供电]',
                '    P --> Q[WKUP 引脚唤醒]',
                '    Q --> R[系统复位重启]',
                '    R --> B'
            ].join('\n')
        }
    };

    var MERMAID_TEMPLATES = {
        'flowchart': {
            nameKey: 'flowchart.tpl.mermaid.flowchart',
            code: [
                'flowchart TD',
                '    A[开始] --> B{判断条件}',
                '    B -->|条件1| C[处理分支1]',
                '    B -->|条件2| D[处理分支2]',
                '    C --> E[汇总]',
                '    D --> E',
                '    E --> F[结束]'
            ].join('\n')
        },
        'sequence': {
            nameKey: 'flowchart.tpl.mermaid.sequence',
            code: [
                'sequenceDiagram',
                '    participant 客户端',
                '    participant 服务器',
                '    participant 数据库',
                '    客户端->>服务器: 发送请求',
                '    服务器->>数据库: 查询数据',
                '    数据库-->>服务器: 返回结果',
                '    服务器-->>客户端: 响应数据',
                '    客户端->>客户端: 渲染界面'
            ].join('\n')
        },
        'class': {
            nameKey: 'flowchart.tpl.mermaid.class',
            code: [
                'classDiagram',
                '    class Device {',
                '        +String name',
                '        +int id',
                '        +init()',
                '        +read()',
                '        +write()',
                '    }',
                '    class Sensor {',
                '        +float value',
                '        +calibrate()',
                '        +sample()',
                '    }',
                '    class Actuator {',
                '        +int position',
                '        +moveTo()',
                '        +stop()',
                '    }',
                '    Device <|-- Sensor',
                '    Device <|-- Actuator'
            ].join('\n')
        },
        'state': {
            nameKey: 'flowchart.tpl.mermaid.state',
            code: [
                'stateDiagram-v2',
                '    [*] --> 空闲',
                '    空闲 --> 运行 : 启动命令',
                '    运行 --> 暂停 : 暂停命令',
                '    暂停 --> 运行 : 恢复命令',
                '    运行 --> 错误 : 故障检测',
                '    错误 --> 空闲 : 复位',
                '    运行 --> [*] : 停止命令',
                '    空闲 --> [*] : 关机'
            ].join('\n')
        },
        'er': {
            nameKey: 'flowchart.tpl.mermaid.er',
            code: [
                'erDiagram',
                '    MCU ||--o{ Peripheral : has',
                '    MCU {',
                '        string model',
                '        int flash_size',
                '        int ram_size',
                '    }',
                '    Peripheral {',
                '        string name',
                '        string type',
                '        int address',
                '    }',
                '    Peripheral ||--o{ Register : contains',
                '    Register {',
                '        string name',
                '        int offset',
                '        int reset_value',
                '    }'
            ].join('\n')
        },
        'gantt': {
            nameKey: 'flowchart.tpl.mermaid.gantt',
            code: [
                'gantt',
                '    title 嵌入式项目开发计划',
                '    dateFormat  YYYY-MM-DD',
                '    section 硬件设计',
                '    原理图设计     :a1, 2024-01-01, 14d',
                '    PCB 布局       :a2, after a1, 10d',
                '    打样验证       :a3, after a2, 7d',
                '    section 固件开发',
                '    驱动层开发     :b1, after a2, 14d',
                '    应用层开发     :b2, after b1, 21d',
                '    集成测试       :b3, after b2, 7d',
                '    section 测试',
                '    功能测试       :c1, after b3, 7d',
                '    可靠性测试     :c2, after c1, 14d'
            ].join('\n')
        },
        'pie': {
            nameKey: 'flowchart.tpl.mermaid.pie',
            code: [
                'pie title MCU 外设功耗占比',
                '    "CPU 核心" : 45',
                '    "SRAM" : 15',
                '    "Flash" : 10',
                '    "GPIO" : 8',
                '    "UART/SPI/I2C" : 12',
                '    "定时器/PWM" : 5',
                '    "ADC/DAC" : 5'
            ].join('\n')
        },
        'git': {
            nameKey: 'flowchart.tpl.mermaid.git',
            code: [
                'gitGraph',
                '    commit id: "初始提交"',
                '    branch develop',
                '    checkout develop',
                '    commit id: "添加驱动"',
                '    branch feature/uart',
                '    commit id: "UART 驱动"',
                '    commit id: "UART DMA"',
                '    checkout develop',
                '    merge feature/uart',
                '    branch feature/i2c',
                '    commit id: "I2C 驱动"',
                '    checkout develop',
                '    merge feature/i2c',
                '    checkout main',
                '    merge develop tag: "v1.0"'
            ].join('\n')
        },
        'mindmap': {
            nameKey: 'flowchart.tpl.mermaid.mindmap',
            code: [
                'mindmap',
                '  root((嵌入式开发))',
                '    硬件设计',
                '      原理图',
                '      PCB 布局',
                '      EMC 设计',
                '    固件开发',
                '      BSP 驱动',
                '      RTOS',
                '      应用逻辑',
                '    调试工具',
                '      示波器',
                '      逻辑分析仪',
                '      JTAG/SWD',
                '    测试验证',
                '      单元测试',
                '      集成测试',
                '      压力测试'
            ].join('\n')
        },
        'timeline': {
            nameKey: 'flowchart.tpl.mermaid.timeline',
            code: [
                'timeline',
                '    title MCU 启动时间线',
                '    t=0ms : 上电复位',
                '           : 晶振起振',
                '    t=1ms : 内部 RC 就绪',
                '           : 复位向量跳转',
                '    t=2ms : SystemInit',
                '           : 配置 PLL',
                '    t=5ms : 外设时钟使能',
                '           : GPIO 初始化',
                '    t=10ms : 外设初始化',
                '            : 中断配置',
                '    t=15ms : 进入 main()',
                '            : 应用就绪'
            ].join('\n')
        },
        'quadrant': {
            nameKey: 'flowchart.tpl.mermaid.quadrant',
            code: [
                'quadrantChart',
                '    title MCU 选型决策矩阵',
                '    x-axis 低性能 --> 高性能',
                '    y-axis 低功耗 --> 高功耗',
                '    quadrant-1 高性能低功耗',
                '    quadrant-2 高性能高功耗',
                '    quadrant-3 低性能低功耗',
                '    quadrant-4 低性能高功耗',
                '    STM32L4: [0.6, 0.3]',
                '    STM32H7: [0.85, 0.7]',
                '    ESP32: [0.55, 0.55]',
                '    nRF52: [0.35, 0.2]',
                '    MSP430: [0.15, 0.1]',
                '    STM32F4: [0.5, 0.4]'
            ].join('\n')
        },
        'sankey': {
            nameKey: 'flowchart.tpl.mermaid.sankey',
            code: [
                'sankey-beta',
                '',
                'Power Source,MCU Core,45',
                'Power Source,Peripherals,30',
                'Power Source,Communication,15',
                'Power Source,Storage,10',
                'MCU Core,Compute,30',
                'MCU Core,Idle,15',
                'Peripherals,GPIO,10',
                'Peripherals,Timer,8',
                'Peripherals,ADC,12',
                'Communication,UART,5',
                'Communication,SPI,5',
                'Communication,I2C,5',
                'Storage,SRAM,6',
                'Storage,Flash,4'
            ].join('\n')
        },
        'block': {
            nameKey: 'flowchart.tpl.mermaid.block',
            code: [
                'block-beta',
                '    columns 3',
                '    block:MCU:3',
                '        columns 3',
                '        CPU 内核',
                '        SRAM',
                '        Flash',
                '    end',
                '    space',
                '    block:总线:3',
                '        columns 1',
                '        AHB 总线',
                '        APB1 总线',
                '        APB2 总线',
                '    end',
                '    space',
                '    GPIO["GPIO"]  UART["UART"]  SPI["SPI"]',
                '    I2C["I2C"]  ADC["ADC"]  TIM["定时器"]'
            ].join('\n')
        },
        'xychart': {
            nameKey: 'flowchart.tpl.mermaid.xychart',
            code: [
                'xychart-beta',
                '    title "MCU 功耗 vs 频率"',
                '    x-axis "频率 (MHz)" [8, 16, 32, 48, 72, 96, 120, 168]',
                '    y-axis "功耗 (mA)" 0 --> 100',
                '    line "STM32F4" [5, 8, 12, 18, 25, 35, 45, 60]',
                '    line "STM32L4" [2, 3, 5, 7, 10, 14, 19, 25]',
                '    line "ESP32"   [8, 12, 18, 25, 35, 48, 60, 80]'
            ].join('\n')
        },
        'packet': {
            nameKey: 'flowchart.tpl.mermaid.packet',
            code: [
                'packet-beta',
                '    title UART 数据帧',
                '    0-7:   "帧头 (0xAA)"',
                '    8-15:  "设备地址"',
                '    16-23: "命令码"',
                '    24-31: "数据长度"',
                '    32-63: "数据负载"',
                '    64-79: "CRC16 校验"',
                '    80-87: "帧尾 (0x55)"'
            ].join('\n')
        },
        'kanban': {
            nameKey: 'flowchart.tpl.mermaid.kanban',
            code: [
                'kanban',
                '    Embedded Dev Board',
                '    Todo',
                '        id1[驱动移植 · 待认领]',
                '        id2[Bootloader · 设计中]',
                '    In Progress',
                '        id3[UART 驱动 · 编码中 ⚙️]',
                '        id4[RTOS 移植 · 集成测试]',
                '        id5[OTA 功能 · 开发中]',
                '    Review',
                '        id6[I2C 驱动 · 等待评审]',
                '    Done',
                '        id7[GPIO 驱动 · 已验证 ✅]',
                '        id8[LED 闪烁 · 已验证 ✅]'
            ].join('\n')
        },
        'architecture': {
            nameKey: 'flowchart.tpl.mermaid.architecture',
            code: [
                'architecture-beta',
                '    group api(cloud)[API]',
                '    group web(server)[Web] in api',
                '    group mobile(disk)[Mobile] in api',
                '    service db(database)[Database] in api',
                '    service auth(server)[Auth] in api',
                '    group embedded(server)[Embedded]',
                '    service mcu(server)[MCU] in embedded',
                '    service sensor(server)[Sensor] in embedded',
                '    service actuator(server)[Actuator] in embedded',
                '    db:T -- B:mcu',
                '    mcu:R -- L:sensor',
                '    mcu:L -- R:actuator',
                '    auth:B -- T:db'
            ].join('\n')
        },
        'c4': {
            nameKey: 'flowchart.tpl.mermaid.c4',
            code: [
                'C4Context',
                '    title 嵌入式系统上下文图',
                '    Person(user, "用户", "操作设备")',
                '    System(embedded, "嵌入式设备", "MCU + 传感器")',
                '    System_Ext(cloud, "云平台", "数据存储与分析")',
                '    System_Ext(mobile, "手机 APP", "远程控制")',
                '    Rel(user, embedded, "物理操作")',
                '    Rel(embedded, cloud, "上传数据", "MQTT")',
                '    Rel(mobile, embedded, "控制指令", "BLE/WiFi")'
            ].join('\n')
        },
        'requirement': {
            nameKey: 'flowchart.tpl.mermaid.requirement',
            code: [
                'requirementDiagram',
                '',
                '    requirement diag_req {',
                '        id: 1',
                '        text: "嵌入式系统需求"',
                '        risk: medium',
                '    }',
                '    functionalRequirement func_req {',
                '        id: 1.1',
                '        text: "传感器数据采集"',
                '        risk: high',
                '    }',
                '    functionalRequirement func_req2 {',
                '        id: 1.2',
                '        text: "通信协议实现"',
                '        risk: high',
                '    }',
                '    performanceRequirement perf_req {',
                '        id: 2.1',
                '        text: "采样率 >= 1kHz"',
                '        risk: medium',
                '    }',
                '    interfaceRequirement if_req {',
                '        id: 3.1',
                '        text: "UART 波特率 115200"',
                '        risk: low',
                '    }',
                '    diag_req - contains -> func_req',
                '    diag_req - contains -> func_req2',
                '    diag_req - contains -> perf_req',
                '    diag_req - contains -> if_req'
            ].join('\n')
        },
        'zenuml': {
            nameKey: 'flowchart.tpl.mermaid.zenuml',
            code: [
                'sequenceDiagram',
                '    autonumber',
                '    actor 用户',
                '    participant 设备',
                '    participant 服务器',
                '    用户->>设备: 开机',
                '    设备->>设备: 自检初始化',
                '    设备->>服务器: 注册连接',
                '    服务器-->>设备: 返回配置',
                '    用户->>设备: 发起操作',
                '    设备->>服务器: 上报数据',
                '    服务器-->>设备: 响应指令',
                '    设备-->>用户: 显示结果'
            ].join('\n')
        },
        'radar': {
            nameKey: 'flowchart.tpl.mermaid.radar',
            code: [
                'radar-beta',
                '    axis Performance',
                '    axis Power',
                '    axis Cost',
                '    axis Peripherals',
                '    axis Storage',
                '    curve STM32F4 { 8, 5, 6, 9, 7 }',
                '    curve ESP32   { 7, 6, 8, 8, 6 }',
                '    curve nRF52   { 5, 9, 5, 6, 4 }'
            ].join('\n')
        },
        'eventmodel': {
            nameKey: 'flowchart.tpl.mermaid.eventmodel',
            code: [
                'eventmodeling',
                '    tf 001 command placeOrder',
                '    tf 002 event orderPlaced',
                '    tf 003 command payOrder',
                '    tf 004 event paymentConfirmed',
                '    entity Order',
                '    entity Payment'
            ].join('\n')
        },
        'tree': {
            nameKey: 'flowchart.tpl.mermaid.tree',
            code: [
                'treeView-beta',
                '    my-embedded-project/',
                '        src/',
                '            main.c',
                '            bsp/',
                '                gpio.c',
                '                uart.c',
                '            app/',
                '                task.c',
                '        inc/',
                '            config.h',
                '            bsp.h',
                '        lib/',
                '            FreeRTOS/',
                '            CMSIS/',
                '        tools/',
                '            Makefile',
                '        docs/',
                '            README.md'
            ].join('\n')
        },
        'venn': {
            nameKey: 'flowchart.tpl.mermaid.venn',
            code: [
                'flowchart LR',
                '    subgraph A["嵌入式硬件"]',
                '        a1["MCU"]',
                '        a2["传感器"]',
                '        a3["PCB"]',
                '    end',
                '    subgraph B["软件开发"]',
                '        b1["固件"]',
                '        b2["驱动"]',
                '        b3["RTOS"]',
                '    end',
                '    subgraph C["调试工具"]',
                '        c1["JTAG"]',
                '        c2["逻辑分析仪"]',
                '        c3["串口助手"]',
                '    end',
                '    A -.- B',
                '    B -.- C',
                '    A -.- C',
                '    a1 -.-> b1',
                '    a2 -.-> b2',
                '    b3 -.-> c1'
            ].join('\n')
        },
        'fishbone': {
            nameKey: 'flowchart.tpl.mermaid.fishbone',
            code: [
                'ishikawa-beta',
                '    title MCU 异常复位原因分析',
                '    MCU 异常复位',
                '    硬件原因',
                '        电源电压不稳',
                '        晶振故障',
                '        看门狗误触发',
                '    软件原因',
                '        栈溢出',
                '        空指针访问',
                '        HardFault 未处理',
                '    环境原因',
                '        EMC 干扰',
                '        温度过高',
                '        静电放电'
            ].join('\n')
        },
        'wardley': {
            nameKey: 'flowchart.tpl.mermaid.wardley',
            code: [
                'quadrantChart',
                '    title 嵌入式技术演化 (沃德利近似)',
                '    x-axis 起源 --> 商品化',
                '    y-axis 不可见 --> 可见',
                '    quadrant-1 定制构建',
                '    quadrant-2 产品/服务',
                '    quadrant-3 商品/工具',
                '    quadrant-4 新兴技术',
                '    "ARM Cortex-M": [0.8, 0.5]',
                '    "RISC-V MCU": [0.3, 0.6]',
                '    "FreeRTOS": [0.85, 0.3]',
                '    "Zephyr OS": [0.4, 0.5]',
                '    "Matter 协议": [0.2, 0.7]',
                '    "MQTT": [0.9, 0.25]',
                '    "TinyML": [0.15, 0.6]',
                '    "UART": [0.95, 0.15]'
            ].join('\n')
        },
        'cynefin': {
            nameKey: 'flowchart.tpl.mermaid.cynefin',
            code: [
                'cynefin-beta',
                '    title 嵌入式故障决策框架',
                '    clear',
                '        "GPIO 初始化失败"',
                '        "串口波特率不匹配"',
                '    complicated',
                '        "RTOS 死锁分析"',
                '        "DMA 配置错误"',
                '    complex',
                '        "EMC 偶发干扰"',
                '        "内存泄漏排查"',
                '    chaotic',
                '        "未知 HardFault"',
                '    clear --> complicated: "升级复杂度"',
                '    complicated --> complex: "偶发问题"',
                '    chaotic --> clear: "建立规范"'
            ].join('\n')
        },
        'treeview': {
            nameKey: 'flowchart.tpl.mermaid.treeview',
            code: [
                'treeView-beta',
                '    "项目根目录"',
                '        "src"',
                '            "main.c"',
                '            "utils"',
                '                "crc16.c"',
                '                "ringbuf.c"',
                '        "tests"',
                '            "test_main.c"',
                '        "build"',
                '            "output.bin"',
                '        "README.md"'
            ].join('\n')
        },
        'treemap': {
            nameKey: 'flowchart.tpl.mermaid.treemap',
            code: [
                'treemap-beta',
                '    "Flash 占用分布"',
                '        "代码段"',
                '            "应用逻辑": 120',
                '            "驱动": 80',
                '            "中间件": 60',
                '        "数据段"',
                '            "全局变量": 30',
                '            "缓冲区": 50',
                '        "只读数据"',
                '            "字符串表": 20',
                '            "常量": 15'
            ].join('\n')
        },
        'swimlane': {
            nameKey: 'flowchart.tpl.mermaid.swimlane',
            code: [
                'swimlane-beta',
                '    subgraph 用户',
                '        A[发起请求]',
                '    end',
                '    subgraph 设备',
                '        B[接收指令]',
                '        C[执行操作]',
                '    end',
                '    subgraph 服务器',
                '        D[处理请求]',
                '    end',
                '    A --> D',
                '    D --> B',
                '    B --> C',
                '    C --> A'
            ].join('\n')
        }
    };

    // ============================================================
    //  DOM 引用
    // ============================================================
    var modeOnline   = document.getElementById('modeOnline');
    var modeOffline  = document.getElementById('modeOffline');
    var templateCat  = document.getElementById('templateCat');
    var templateSelect = document.getElementById('templateSelect');
    var loadTemplateBtn = document.getElementById('loadTemplateBtn');
    var codeEditor   = document.getElementById('codeEditor');
    var previewWrap  = document.getElementById('previewWrap');
    var previewInner = document.getElementById('previewInner');
    var emptyState   = document.getElementById('emptyState');
    var renderStatus = document.getElementById('renderStatus');
    var zoomLevel    = document.getElementById('zoomLevel');
    var exportPngBtn = document.getElementById('exportPngBtn');
    var exportSvgBtn = document.getElementById('exportSvgBtn');
    var copyBtn      = document.getElementById('copyBtn');
    var codeGutter   = document.getElementById('codeGutter');
    var codeHighlight = document.getElementById('codeHighlight');
    var codeHighlightCode = document.getElementById('codeHighlightCode');
    var flowchartHScroll = document.getElementById('flowchartHScroll');
    var flowchartHScrollThumb = document.getElementById('flowchartHScrollThumb');
    var quickbar     = document.querySelector('.flowchart-quickbar');

    // 分栏：拖动分隔条 + 全屏
    var flowchartMain    = document.querySelector('.flowchart-main');
    var flowchartResizer = document.getElementById('flowchartResizer');
    var editorPanel      = document.querySelector('.flowchart-editor-panel');
    var previewPanel     = document.querySelector('.flowchart-preview-panel');
    var fsEditorBtn      = document.getElementById('fsEditorBtn');
    var fsPreviewBtn     = document.getElementById('fsPreviewBtn');

    // ============================================================
    //  状态
    // ============================================================
    var currentMode = 'online';  // 'online' | 'offline'
    var currentZoom = 1.0;
    var panX = 0, panY = 0;           // 平移偏移量
    var isDragging = false;            // 是否正在拖拽
    var dragStartX = 0, dragStartY = 0;
    var panStartX = 0, panStartY = 0;
    var mermaidReady = false;
    var mermaidInitialized = false;
    var renderTimer = null;
    // 平滑缩放动画状态
    var targetZoom = 1.0;      // 目标缩放值
    var zoomAnimId = null;     // requestAnimationFrame id
    var zoomAnchor = null;     // 缩放锚点（保持鼠标下的点不动）

    // ============================================================
    //  模式切换
    // ============================================================
    function setMode(mode) {
        if (currentMode === mode && mermaidReady) return;
        currentMode = mode;
        modeOnline.classList.toggle('active', mode === 'online');
        modeOffline.classList.toggle('active', mode === 'offline');

        // 重新加载 Mermaid
        mermaidReady = false;
        mermaidInitialized = false;
        loadMermaid();
    }

    function loadMermaid() {
        setStatus('rendering', 'flowchart.msg.loading');

        // 移除旧脚本
        var oldScript = document.getElementById('mermaidScript');
        if (oldScript) oldScript.parentNode.removeChild(oldScript);

        var script = document.createElement('script');
        script.id = 'mermaidScript';

        if (currentMode === 'online') {
            script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
        } else {
            script.src = '../asset/lib/mermaid.min.js';
        }

        script.onload = function() {
            initMermaid();
        };
        script.onerror = function() {
            setStatus('error', 'flowchart.msg.loadFail');
            if (currentMode === 'online') {
                // 在线模式失败，自动尝试离线
                setMode('offline');
            }
        };

        document.body.appendChild(script);
    }

    function initMermaid() {
        try {
            mermaid.initialize({
                startOnLoad: false,
                theme: getMermaidTheme(),
                securityLevel: 'loose',
                // 解析失败时不让 mermaid 渲染红色炸弹 SVG，统一由我们的 .catch() 显示错误信息
                suppressErrorRendering: true,
                flowchart: { useMaxWidth: true, htmlLabels: true },
                sequence: { useMaxWidth: true },
                gantt: { useMaxWidth: true },
                journey: { useMaxWidth: true },
                timeline: { useMaxWidth: true },
                mindmap: { useMaxWidth: true }
            });
            mermaidReady = true;
            mermaidInitialized = true;
            setStatus('ready', 'flowchart.msg.loaded');
            autoRender();
        } catch (e) {
            setStatus('error', 'flowchart.msg.loadFail');
        }
    }

    function getMermaidTheme() {
        var theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? 'dark' : 'default';
    }

    // ============================================================
    //  SVG 主题适配（追加覆盖样式，不替换 Mermaid 原有样式）
    // ============================================================
    function fixSvgTheme() {
        var svg = previewInner.querySelector('svg');
        if (!svg) return;
        var theme = document.documentElement.getAttribute('data-theme');
        // 查找或创建主题覆盖 style 节点
        var overrideStyle = svg.querySelector('#mermaid-theme-override');
        if (!overrideStyle) {
            overrideStyle = document.createElementNS('http://www.w3.org/2000/svg', 'style');
            overrideStyle.setAttribute('id', 'mermaid-theme-override');
            svg.appendChild(overrideStyle);
        }
        if (theme === 'dark') {
            overrideStyle.textContent =
                '.label, .nodeLabel, .edgeLabel, .messageText, .noteText, .loopText, .labelText { ' +
                'fill: #e6e6e6 !important; } ' +
                '.node rect, .node circle, .node ellipse, .node polygon, .node path { ' +
                'stroke: #4a4a4a !important; } ' +
                '.edgePath .path { stroke: #7a9eff !important; } ' +
                '.cluster rect { stroke: #4a4a4a !important; } ' +
                // treeView (v11.14+)
                '.treeView-node-label, .treeView-node-description { ' +
                'fill: #e6e6e6 !important; } ' +
                '.treeView-node-line { stroke: #7a9eff !important; } ' +
                '.treeView-highlight-bg { fill: rgba(255,193,7,0.15) !important; } ' +
                // ishikawa (v11.17)
                '.ishikawa-head-label, .ishikawa-label-group, .ishikawa-label-box { ' +
                'fill: #e6e6e6 !important; } ' +
                '.ishikawa-spine, .ishikawa-branch, .ishikawa-sub-branch { ' +
                'stroke: #7a9eff !important; } ' +
                // cynefin (v11.17)
                '.cynefin-labels, .cynefin-subtitles, .cynefin-items { ' +
                'fill: #e6e6e6 !important; }';
        } else {
            overrideStyle.textContent = '';
        }
    }

    // ============================================================
    //  模板系统
    // ============================================================
    function populateTemplates() {
        var cat = templateCat.value;
        var templates = cat === 'embedded' ? EMBEDDED_TEMPLATES : MERMAID_TEMPLATES;
        templateSelect.innerHTML = '';
        for (var key in templates) {
            if (templates.hasOwnProperty(key)) {
                var opt = document.createElement('option');
                opt.value = key;
                opt.textContent = window.I18N.t(templates[key].nameKey);
                templateSelect.appendChild(opt);
            }
        }
        templateSelect.selectedIndex = 0;
    }

    function loadTemplate() {
        var key = templateSelect.value;
        var cat = templateCat.value;
        var templates = cat === 'embedded' ? EMBEDDED_TEMPLATES : MERMAID_TEMPLATES;
        if (templates[key]) {
            codeEditor.value = templates[key].code;
            renderHighlight();
            autoRender();
        }
    }

    // ============================================================
    //  渲染
    // ============================================================
    function autoRender() {
        if (renderTimer) clearTimeout(renderTimer);
        renderTimer = setTimeout(doRender, 300);
    }

    function doRender() {
        if (!mermaidReady) {
            setStatus('error', 'flowchart.msg.noMermaid');
            return;
        }

        var code = codeEditor.value.trim();
        if (!code) {
            showEmpty();
            setStatus('ready', 'flowchart.status.ready');
            return;
        }

        setStatus('rendering', 'flowchart.status.rendering');
        hideEmpty();

        // 使用唯一 ID
        var id = 'mermaid-svg-' + Date.now();
        previewInner.innerHTML = '<div class="mermaid-container" id="' + id + '"></div>';

        mermaid.render('mermaid-render-' + Date.now(), code).then(function(result) {
            var svgStr = (typeof result === 'string') ? result : (result && result.svg) || '';
            // 新渲染时重置平移
            panX = 0;
            panY = 0;
            previewInner.innerHTML = svgStr;
            applyZoom();
            fixSvgTheme();
            setStatus('ready', 'flowchart.status.ready');
        }).catch(function(err) {
            var errMsg = err.message || String(err);
            previewInner.innerHTML = '<div class="flowchart-error-msg">' + escapeHtml(errMsg) + '</div>';
            setStatus('error', 'flowchart.msg.renderErr');
        });
    }

    function showEmpty() {
        previewInner.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
    }

    function hideEmpty() {
        if (emptyState) emptyState.style.display = 'none';
    }

    function setStatus(cls, key) {
        renderStatus.className = 'status-badge ' + cls;
        renderStatus.textContent = window.I18N.t(key) || '';
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ============================================================
    //  Mermaid 语法高亮（VSCode 风格配色，纯前端离线实现）
    //  textarea 文字透明，下层 <pre> 实时渲染着色，行号栏独立
    // ============================================================
    var HL_KEYWORDS = [
        // 图类型（含连字符的排前面，避免被前缀截断）
        'stateDiagram-v2', 'xychart-beta', 'block-beta', 'sankey-beta',
        'flowchart', 'graph', 'sequenceDiagram', 'classDiagram', 'stateDiagram',
        'erDiagram', 'gantt', 'pie', 'journey', 'timeline',
        'mindmap', 'requirementDiagram', 'gitGraph',
        'quadrantChart',
        // 方向
        'LR', 'RL', 'TB', 'BT', 'TD',
        // 通用
        'subgraph', 'end', 'direction', 'linkStyle', 'classDef', 'class', 'style',
        'click', 'accTitle', 'accDescr',
        // sequence
        'participant', 'actor', 'as', 'activate', 'deactivate', 'note', 'over',
        'loop', 'alt', 'else', 'opt', 'par', 'and', 'critical', 'break', 'rect',
        'autonumber',
        // class / state / gantt / pie / mindmap
        'interface', 'namespace', 'state', 'fork', 'join', 'choice', 'transition',
        'dateFormat', 'axisFormat', 'excludes', 'section', 'milestone', 'done',
        'active', 'crit', 'showData', 'root'
    ];

    // 按顺序匹配：注释 → 指令 → 字符串 → 边/箭头 → 边标签 → 关键字 → 数字 → 分隔符 → 节点 ID
    // 长分支必须在前（如 --> 在 -- 之前），否则会被短分支抢先截断
    var HL_RE = new RegExp(
        '(%%\\{init[^\\n]*?\\}%%)' +                       // 1 init 指令
        '|(%%[^\\n]*)' +                                   // 2 注释
        '|("[^"\\n]*"|\'[^\'\\n]*\')' +                    // 3 字符串
        // 4 边/箭头（er 关系符号 + sequence 箭头 + 通用箭头，长符号在前）
        '|(\\|\\|--o\\{|\\|\\|--o\\||\\|o--\\|\\||\\}o--\\|\\||' +
        '\\|\\|--\\|\\{|\\|o--o\\||\\}o--o\\{|\\}o--\\|\\{|' +
        '<<->>|<<-->>|<->>|-->>|--x|--\\)|->>|-\\.->|==>|-\\)|-x|' +
        '<--|-->|---|--|=>|\\.\\.|==|<-|&)' +
        '|(\\|[^|\\n]*\\|)' +                              // 5 边标签 |...|
        '|(\\b(?:' + HL_KEYWORDS.join('|') + ')\\b)' +     // 6 关键字
        '|(\\b\\d+(?:\\.\\d+)?\\b)' +                      // 7 数字
        '|([\\[\\](){}])' +                                // 8 分隔符
        '|(\\b[A-Za-z_][A-Za-z0-9_]*(?=\\s*[\\[({]))',     // 9 节点 ID
        'g'
    );

    function renderHighlight() {
        if (!codeEditor || !codeHighlightCode || !codeGutter) return;
        var text = codeEditor.value;
        var lines = text.split('\n');
        var html = '';
        var i, line;
        for (i = 0; i < lines.length; i++) {
            line = lines[i];
            html += '<span class="line">' + highlightLine(line) + '</span>\n';
        }
        codeHighlightCode.innerHTML = html;
        codeGutter.textContent = '';
        for (i = 1; i <= lines.length; i++) {
            codeGutter.textContent += i + '\n';
        }
    }

    function highlightLine(line) {
        var out = '';
        var last = 0;
        var m;
        HL_RE.lastIndex = 0;
        while ((m = HL_RE.exec(line)) !== null) {
            if (m.index > last) out += escapeHtml(line.slice(last, m.index));
            var cls;
            if (m[1] !== undefined) cls = 'hl-string';       // init 指令按字符串色
            else if (m[2] !== undefined) cls = 'hl-comment'; // 注释
            else if (m[3] !== undefined) cls = 'hl-string';  // 字符串
            else if (m[4] !== undefined) cls = 'hl-edge';    // 边/箭头
            else if (m[5] !== undefined) cls = 'hl-string';  // 边标签 |...|
            else if (m[6] !== undefined) cls = 'hl-keyword'; // 关键字
            else if (m[7] !== undefined) cls = 'hl-number';  // 数字
            else if (m[8] !== undefined) cls = 'hl-bracket'; // 分隔符
            else if (m[9] !== undefined) cls = 'hl-nodeid';  // 节点 ID
            out += '<span class="' + cls + '">' + escapeHtml(m[0]) + '</span>';
            last = m.index + m[0].length;
        }
        if (last < line.length) out += escapeHtml(line.slice(last));
        return out;
    }

    function syncEditorScroll() {
        if (!codeEditor || !codeHighlight || !codeGutter) return;
        codeHighlight.style.transform =
            'translate(' + (-codeEditor.scrollLeft) + 'px, ' + (-codeEditor.scrollTop) + 'px)';
        codeGutter.style.transform =
            'translateY(' + (-codeEditor.scrollTop) + 'px)';
        syncHScroll();
    }

    // ===== 底部横向滚动条 =====
    function syncHScroll() {
        if (!codeEditor || !flowchartHScroll || !flowchartHScrollThumb) return;
        var scrollable = codeEditor.scrollWidth - codeEditor.clientWidth;
        if (scrollable <= 1) {
            flowchartHScroll.style.display = 'none';
            return;
        }
        flowchartHScroll.style.display = 'block';
        var track = flowchartHScroll.clientWidth || 1;
        var thumbW = Math.max(28, track * (codeEditor.clientWidth / codeEditor.scrollWidth));
        flowchartHScrollThumb.style.width = thumbW + 'px';
        var maxLeft = Math.max(0, track - thumbW);
        var left = maxLeft * (codeEditor.scrollLeft / scrollable);
        flowchartHScrollThumb.style.left = left + 'px';
    }

    function initFlowHScrollDrag() {
        if (!flowchartHScroll || !flowchartHScrollThumb || !codeEditor) return;
        var dragging = false, startX = 0, startLeft = 0, scrollable = 0;

        function onDown(e) {
            if (flowchartHScroll.style.display === 'none') return;
            scrollable = codeEditor.scrollWidth - codeEditor.clientWidth;
            if (scrollable <= 1) return;
            e.preventDefault();
            dragging = true;
            startX = (e.clientX !== undefined ? e.clientX : e.touches[0].clientX);
            startLeft = parseFloat(flowchartHScrollThumb.style.left) || 0;
            flowchartHScrollThumb.classList.add('dragging');
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
            document.addEventListener('touchmove', onMove, { passive: false });
            document.addEventListener('touchend', onUp);
        }
        function onMove(e) {
            if (!dragging) return;
            e.preventDefault();
            var x = (e.clientX !== undefined ? e.clientX : e.touches[0].clientX);
            var track = flowchartHScroll.clientWidth;
            var thumbW = flowchartHScrollThumb.offsetWidth;
            var maxLeft = Math.max(0, track - thumbW);
            var left = Math.min(maxLeft, Math.max(0, startLeft + (x - startX)));
            flowchartHScrollThumb.style.left = left + 'px';
            var ratio = (scrollable > 0) ? (left / maxLeft) * scrollable : 0;
            codeEditor.scrollLeft = ratio;
            codeEditor.dispatchEvent(new Event('scroll', { bubbles: true }));
        }
        function onUp() {
            if (!dragging) return;
            dragging = false;
            flowchartHScrollThumb.classList.remove('dragging');
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onUp);
        }
        flowchartHScroll.addEventListener('mousedown', onDown);
        flowchartHScroll.addEventListener('touchstart', onDown, { passive: false });
    }

    // Tab 键插入四个空格（保持缩进输入体验，与格式化后的 4 空格缩进一致）
    function handleEditorTab(e) {
        if (e.key !== 'Tab') return;
        e.preventDefault();
        var s = codeEditor.selectionStart;
        var end = codeEditor.selectionEnd;
        codeEditor.value =
            codeEditor.value.slice(0, s) + '    ' + codeEditor.value.slice(end);
        codeEditor.selectionStart = codeEditor.selectionEnd = s + 4;
        renderHighlight();
        autoRender();
    }

    // ============================================================
    //  缩放（含平滑动画）
    // ============================================================
    function applyZoom() {
        previewInner.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + currentZoom + ')';
        previewInner.style.transformOrigin = 'top left';
        zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
    }

    // 停止缩放动画，把目标值对齐到当前值
    function stopZoomAnim() {
        if (zoomAnimId) {
            cancelAnimationFrame(zoomAnimId);
            zoomAnimId = null;
        }
        zoomAnchor = null;
        targetZoom = currentZoom;
    }

    // 启动平滑缩放动画（每帧向目标值逼近，指数插值）
    function startZoomAnim() {
        if (zoomAnimId) return;
        zoomAnimId = requestAnimationFrame(zoomTick);
    }

    function zoomTick() {
        var diff = targetZoom - currentZoom;
        if (Math.abs(diff) < 0.0008) {
            // 到达目标：收尾并复位锚点
            currentZoom = targetZoom;
            zoomAnimId = null;
            zoomAnchor = null;
            applyZoom();
            return;
        }
        // 指数平滑：每帧移动剩余差距的一部分，速度感自然且不会过冲
        currentZoom += diff * 0.32;
        if (zoomAnchor) {
            // 始终保持锚点（鼠标指向的点）在缩放前后位于同一视图位置
            var ratio = currentZoom / zoomAnchor.zoom;
            panX = zoomAnchor.mouseX - zoomAnchor.baseX - ratio * (zoomAnchor.mouseX - zoomAnchor.baseX - zoomAnchor.panX);
            panY = zoomAnchor.mouseY - zoomAnchor.baseY - ratio * (zoomAnchor.mouseY - zoomAnchor.baseY - zoomAnchor.panY);
        }
        applyZoom();
        zoomAnimId = requestAnimationFrame(zoomTick);
    }

    function zoomIn(step) {
        stopZoomAnim();
        step = step || 0.1;
        currentZoom = Math.min(3.0, currentZoom + step);
        applyZoom();
    }

    function zoomOut(step) {
        stopZoomAnim();
        step = step || 0.1;
        currentZoom = Math.max(0.2, currentZoom - step);
        applyZoom();
    }

    function zoomReset() {
        stopZoomAnim();
        currentZoom = 1.0;
        panX = 0;
        panY = 0;
        applyZoom();
    }

    // ============================================================
    //  PNG 导出（在线/离线模式均可用）
    // ============================================================
    function exportPng() {
        var svg = previewInner.querySelector('svg');
        if (!svg) {
            alert(window.I18N.t('flowchart.msg.noMermaid'));
            return;
        }

        try {
            // ---- 1. 准备可独立渲染的 SVG 副本 ----
            var clone = svg.cloneNode(true);
            // 根节点补 xmlns（个别浏览器序列化后缺失会导致图片解码失败）
            clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

            // 关键修复：移除所有 foreignObject（<img> 不渲染其中的 HTML 文字，
            // 且部分浏览器会因 foreignObject 导致整张 SVG 解码失败）。
            // 这些文字稍后由 drawForeignObjectText 手动补画到画布上。
            var cloneFos = clone.querySelectorAll('foreignObject');
            for (var fi = 0; fi < cloneFos.length; fi++) {
                var cloneFo = cloneFos[fi];
                if (cloneFo.parentNode) cloneFo.parentNode.removeChild(cloneFo);
            }

            // Mermaid 输出的是 width="100%" + viewBox，作为 <img> 加载时没有固有尺寸，
            // 部分浏览器会解码失败或得到 0×0，导致导出无反应/空白。
            // 这里从 viewBox 取出明确的宽高，再写回 SVG。
            var imgW = 0, imgH = 0;
            var vb = clone.getAttribute('viewBox');
            if (vb) {
                var parts = vb.trim().split(/[\s,]+/).map(parseFloat);
                if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
                    imgW = parts[2];
                    imgH = parts[3];
                    clone.setAttribute('width', imgW);
                    clone.setAttribute('height', imgH);
                    clone.removeAttribute('style'); // 去掉 max-width 内联样式干扰
                }
            }
            if (!imgW || !imgH) {
                // 没有 viewBox 时退回使用 DOM 布局尺寸
                var r = svg.getBoundingClientRect();
                imgW = r.width || 800;
                imgH = r.height || 600;
                clone.setAttribute('width', imgW);
                clone.setAttribute('height', imgH);
            }

            var svgData = new XMLSerializer().serializeToString(clone);

            // ---- 2. 绘制到 canvas ----
            // 自适应缩放：大图自动降为 1x，避免 canvas 超过浏览器尺寸上限
            // （超出后 toBlob 会返回 null 导致"导出失败"）
            var scale = Math.min(2, 8000 / Math.max(imgW, imgH));
            if (scale < 0.5) scale = 0.5;
            var canvas = document.createElement('canvas');
            canvas.width = Math.round(imgW * scale);
            canvas.height = Math.round(imgH * scale);
            var ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Canvas 2D context unavailable');
            ctx.scale(scale, scale);

            // ---- 3. 加载 SVG 图像（blob URL 失败时自动回退 data URL） ----
            loadSvgAsImage(svgData, function(img) {
                try {
                    var theme = document.documentElement.getAttribute('data-theme');
                    ctx.fillStyle = theme === 'dark' ? '#2c2c2c' : '#ffffff';
                    ctx.fillRect(0, 0, imgW, imgH);
                    ctx.drawImage(img, 0, 0, imgW, imgH);
                    // <img> 不渲染 foreignObject，这里把其中的 HTML 文字手动补画上去；
                    // 文字补画独立 try/catch：个别节点异常也不阻断导出
                    try {
                        drawForeignObjectText(ctx, svg, imgW, imgH);
                    } catch (te) {
                        console.error('[MermaidDraw] 文字补画失败（不影响导出）:', te);
                    }
                    finishPngExport(canvas);
                } catch (e) {
                    console.error('[MermaidDraw] PNG 导出失败:', e);
                    alert(window.I18N.t('flowchart.msg.pngFail'));
                }
            }, function(err) {
                console.error('[MermaidDraw] SVG 图像解码失败:', err);
                alert(window.I18N.t('flowchart.msg.pngFail'));
            });
        } catch (e) {
            console.error('[MermaidDraw] PNG 导出失败:', e);
            alert(window.I18N.t('flowchart.msg.pngFail'));
        }
    }

    // 将 SVG 字符串加载为 Image：优先 blob URL，失败自动回退 data URL
    // （file:// 或受限 iframe 等环境下 blob URL 可能加载失败）
    function loadSvgAsImage(svgData, onLoad, onError) {
        var img = new Image();
        var blobUrl = null;

        function tryDataUrl() {
            try {
                img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
            } catch (e2) {
                onError(e2);
            }
        }

        img.onload = function() {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
                blobUrl = null;
            }
            onLoad(img);
        };
        img.onerror = function(e) {
            if (blobUrl) {
                // blob 加载失败 → 清掉后改用 data URL 再试一次
                URL.revokeObjectURL(blobUrl);
                blobUrl = null;
                tryDataUrl();
            } else {
                onError(e);
            }
        };

        try {
            var blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            blobUrl = URL.createObjectURL(blob);
            img.src = blobUrl;
        } catch (e) {
            tryDataUrl();
        }
    }

    // 将 foreignObject 内的 HTML 文字补画到 canvas（以 viewBox 坐标系绘制）
    function drawForeignObjectText(ctx, svg, vbW, vbH) {
        // 临时去掉缩放/平移变换，确保测量基于未变换的布局坐标，
        // 否则缩放 ≠ 100% 时文字会错位或大小错误
        var hadTransform = previewInner.style.transform;
        var hadOrigin = previewInner.style.transformOrigin;
        previewInner.style.transform = 'none';
        previewInner.style.transformOrigin = 'top left';
        try {
            var svgRect = svg.getBoundingClientRect();
            if (!svgRect.width || !svgRect.height) return;
            // viewBox 单位 / 布局像素
            var kx = vbW / svgRect.width;
            var ky = vbH / svgRect.height;

            var fos = svg.querySelectorAll('foreignObject');
            for (var i = 0; i < fos.length; i++) {
                var fo = fos[i];
                var div = fo.querySelector('div');
                if (!div) continue;
                var text = div.innerText || div.textContent || '';
                if (!text.trim()) continue;

                var foRect = fo.getBoundingClientRect();
                var x = (foRect.left - svgRect.left) * kx;
                var y = (foRect.top - svgRect.top) * ky;
                var w = foRect.width * kx;
                var h = foRect.height * ky;
                if (w <= 0 || h <= 0) continue;

                var cs = window.getComputedStyle(div);
                var fontSize = (parseFloat(cs.fontSize) || 14) * kx;
                if (!isFinite(fontSize) || fontSize <= 0) fontSize = 14 * kx;
                var fontWeight = cs.fontWeight || 'normal';
                var fontFamily = cs.fontFamily || 'sans-serif';

                ctx.save();
                ctx.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;
                ctx.fillStyle = cs.color || '#333333';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                var lines = text.split('\n');
                var lineHeight = fontSize * 1.5;
                var startY = y + (h - lines.length * lineHeight) / 2 + lineHeight / 2;
                for (var j = 0; j < lines.length; j++) {
                    ctx.fillText(lines[j], x + w / 2, startY + j * lineHeight);
                }
                ctx.restore();
            }
        } finally {
            previewInner.style.transform = hadTransform;
            previewInner.style.transformOrigin = hadOrigin;
        }
    }

    // 触发 PNG 文件下载（兼容不支持 canvas.toBlob 的旧浏览器）
    function finishPngExport(canvas) {
        var filename = 'flowchart_' + new Date().toISOString().slice(0, 10) + '.png';
        var a = document.createElement('a');
        a.download = filename;
        document.body.appendChild(a);

        if (canvas.toBlob) {
            canvas.toBlob(function(blob) {
                if (!blob) {
                    document.body.removeChild(a);
                    console.error('[MermaidDraw] canvas.toBlob 返回 null（canvas 可能过大或内存不足）');
                    alert(window.I18N.t('flowchart.msg.pngFail'));
                    return;
                }
                var downloadUrl = URL.createObjectURL(blob);
                a.href = downloadUrl;
                a.click();
                document.body.removeChild(a);
                setTimeout(function() { URL.revokeObjectURL(downloadUrl); }, 1000);
            }, 'image/png');
        } else {
            // 旧浏览器回退：toDataURL
            a.href = canvas.toDataURL('image/png');
            a.click();
            document.body.removeChild(a);
        }
    }

    // ============================================================
    //  SVG 导出（在线/离线均可用）
    // ============================================================
    function exportSvg() {
        var svg = previewInner.querySelector('svg');
        if (!svg) {
            alert(window.I18N.t('flowchart.msg.noMermaid'));
            return;
        }

        try {
            // 克隆 SVG 避免污染预览
            var clone = svg.cloneNode(true);
            // 移除主题覆盖 style（避免内联样式干扰）
            var override = clone.querySelector('#mermaid-theme-override');
            if (override) override.remove();

            var svgData = new XMLSerializer().serializeToString(clone);
            var blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'flowchart_' + new Date().toISOString().slice(0, 10) + '.svg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (e) {
            alert(window.I18N.t('flowchart.msg.copyFail'));
        }
    }

    // ============================================================
    //  复制代码
    // ============================================================
    function copyCode() {
        var code = codeEditor.value;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(function() {
                var orig = copyBtn.textContent;
                copyBtn.textContent = window.I18N.t('flowchart.msg.copied');
                setTimeout(function() { copyBtn.textContent = orig; }, 1500);
            }).catch(function() {
                fallbackCopy(code);
            });
        } else {
            fallbackCopy(code);
        }
    }

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
    }

    // ============================================================
    //  快捷工具栏处理
    // ============================================================
    function handleQuickAction(action, btn) {
        switch (action) {
            case 'clear':
                if (codeEditor.value.trim() && !confirm(window.I18N.t('flowchart.quick.clearWarn'))) return;
                codeEditor.value = '';
                renderHighlight();
                autoRender();
                break;
            case 'format':
                codeEditor.value = formatMermaid(codeEditor.value);
                renderHighlight();
                autoRender();
                flashButton(btn, window.I18N.t('flowchart.quick.formatDone'));
                break;
            case 'render':
                doRender();
                break;
            default:
                // 图表模板：先从 MERMAID_TEMPLATES 查找，再从 EMBEDDED_TEMPLATES
                var tpl = MERMAID_TEMPLATES[action] || EMBEDDED_TEMPLATES[action];
                if (tpl) {
                    codeEditor.value = tpl.code;
                    renderHighlight();
                    autoRender();
                }
                break;
        }
    }

    function formatMermaid(code) {
        if (!code) return code;
        var lines = code.split('\n');
        var clean = [];
        var prevEmpty = false;
        var i, line;

        // 1) 去末尾空白 + 合并连续空行
        for (i = 0; i < lines.length; i++) {
            line = lines[i].replace(/\s+$/, '');
            if (line === '') {
                if (!prevEmpty) { clean.push(''); prevEmpty = true; }
            } else {
                clean.push(line);
                prevEmpty = false;
            }
        }
        // 去首尾空行
        while (clean.length > 0 && clean[clean.length - 1] === '') clean.pop();
        while (clean.length > 0 && clean[0] === '') clean.shift();

        // 2) 逐行规范化：缩进（tab=2 空格，每 2 空格一级）+ 行内空白/箭头间距
        var result = [];
        for (i = 0; i < clean.length; i++) {
            line = clean[i];
            if (line === '') {
                result.push('');
                continue;
            }
            var leading = line.match(/^(\s*)/)[1];
            var content = line.slice(leading.length);
            // 缩进级别：tab 记 4 空格、普通空格记 1，四舍五入到 4 空格一级，最多 6 级
            var total = 0;
            for (var k = 0; k < leading.length; k++) {
                total += (leading[k] === '\t') ? 4 : 1;
            }
            var level = Math.min(6, Math.round(total / 4));
            result.push('    '.repeat(level) + normalizeMermaidLine(content));
        }
        return result.join('\n');
    }

    // Mermaid 箭头符号（长符号在前，避免被短符号截断）
    var MERMAID_ARROW_RE = /<<-->>|<<->>|<-->|--->|-->>|\.->|--x|--\||-->|-\.-|o--o|==>|->>|-\)|-x|---|-o|o--|===|=>|<->|<-|->|--/g;

    // 含箭头子串的复合符号（ER 关系、类图关系等），必须整体保护，避免被拆散
    var MERMAID_COMPOSITE_RE = /\|\|--o\{|\|\|--o\|\||\|o--\|\||\}o--\|\||\|\|--\|\{|\|o--o\||\}o--o\{|\}o--\|\||\|\|--\|\||--\|>|<\|--|\*--|\.\.\|>|<\|\.\.|\.\.>/g;

    // 行内规范化：压缩引号/注释外的连续空白，箭头两侧补单空格（不破坏 |label| 紧贴写法）
    function normalizeMermaidLine(str) {
        // 先截出 %% 注释（到行尾），其余部分处理
        var comment = '';
        var ci = str.indexOf('%%');
        if (ci >= 0) {
            comment = str.slice(ci);
            str = str.slice(0, ci);
        }

        // 保护引号内容（占位还原，避免压缩空格破坏 "标签 文字"）
        var placeholders = [];
        str = str.replace(/("[^"\n]*"|'[^'\n]*')/g, function(q) {
            placeholders.push(q);
            return '\u0001Q' + (placeholders.length - 1) + '\u0002';
        });

        // 保护 ER/类图等复合符号（如 ||--o{、--|>、*--），先于箭头处理
        str = str.replace(new RegExp(MERMAID_COMPOSITE_RE.source, 'g'), function(m) {
            placeholders.push(m);
            return '\u0001E' + (placeholders.length - 1) + '\u0002';
        });

        // 箭头占位（仅处理不在引号/方括号内、且不在注释里的箭头）
        str = str.replace(new RegExp(MERMAID_ARROW_RE.source, 'g'), function(m, offset) {
            if (isInsideQuotesOrBrackets(str, offset)) return m;
            placeholders.push(m);
            return '\u0001A' + (placeholders.length - 1) + '\u0002';
        });

        // 压缩引号外的连续空白为单空格
        str = str.replace(/[ \t]{2,}/g, ' ');

        // 还原箭头并补单空格（箭头与 |label| 边标签保持紧贴，如 -->|label|）
        var arrowRe = /\u0001A(\d+)\u0002/g;
        var out = '';
        var last = 0;
        var m2;
        while ((m2 = arrowRe.exec(str)) !== null) {
            out += str.slice(last, m2.index);
            var prevCh = out.length ? out[out.length - 1] : '';
            var nextCh = str[m2.index + m2[0].length] || '';
            var arrow = placeholders[+m2[1]];
            // 前导空格：行首 / 已有空格 / 紧贴 | 时不加
            out += (prevCh === '' || prevCh === ' ' || prevCh === '|') ? arrow : ' ' + arrow;
            // 尾随空格：紧贴 |（边标签）、行尾 / 已有空格时不加
            out += (nextCh === '|' || nextCh === '' || nextCh === ' ') ? '' : ' ';
            last = m2.index + m2[0].length;
        }
        str = out + str.slice(last);

        // 还原复合符号
        str = str.replace(/\u0001E(\d+)\u0002/g, function(m, idx) {
            return placeholders[+idx];
        });

        // 还原引号
        str = str.replace(/\u0001Q(\d+)\u0002/g, function(m, idx) {
            return placeholders[+idx];
        });

        if (comment) str = (str ? str.replace(/\s+$/, '') + ' ' : '') + comment;
        return str;
    }

    // 判断 offset 位置是否处于引号内或方括号/圆括号/花括号内（这些区域不处理箭头）
    function isInsideQuotesOrBrackets(line, index) {
        var inQuote = null;
        var depth = 0;
        for (var i = 0; i < index; i++) {
            var c = line[i];
            if (inQuote) {
                if (c === inQuote) inQuote = null;
                continue;
            }
            if (c === '"' || c === "'") { inQuote = c; continue; }
            if (c === '[' || c === '(' || c === '{') depth++;
            else if (c === ']' || c === ')' || c === '}') depth = Math.max(0, depth - 1);
        }
        return depth !== 0 || inQuote !== null;
    }

    // 按钮瞬时反馈：短暂显示"✓ 已格式化"后还原
    function flashButton(btn, text) {
        if (!btn) return;
        var orig = btn.textContent;
        btn.textContent = text;
        if (btn._flashTimer) clearTimeout(btn._flashTimer);
        btn._flashTimer = setTimeout(function() { btn.textContent = orig; }, 1200);
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    modeOnline.addEventListener('click', function() { setMode('online'); });
    modeOffline.addEventListener('click', function() { setMode('offline'); });
    templateCat.addEventListener('change', populateTemplates);
    loadTemplateBtn.addEventListener('click', loadTemplate);
    templateSelect.addEventListener('dblclick', loadTemplate);
    // 快捷工具栏按钮
    if (quickbar) {
        quickbar.addEventListener('click', function(e) {
            var btn = e.target.closest('[data-quick]');
            if (!btn) return;
            var action = btn.getAttribute('data-quick');
            if (action) handleQuickAction(action, btn);
        });
    }
    // 输入时同步更新高亮与自动渲染
    codeEditor.addEventListener('input', function() {
        renderHighlight();
        autoRender();
        syncHScroll();   // 内容变化后更新底部横向滚动条
    });
    // 滚动时同步高亮层与行号栏
    codeEditor.addEventListener('scroll', syncEditorScroll);
    // 缩放：+/- 按钮已移除，滚轮缩放不变；点击百分比徽章重置为 100%
    zoomLevel.addEventListener('click', zoomReset);
    exportPngBtn.addEventListener('click', exportPng);
    exportSvgBtn.addEventListener('click', exportSvg);
    copyBtn.addEventListener('click', copyCode);

    // 预览区滚轮缩放：滚动量 → 平滑动画，以鼠标位置为中心缩放
    previewWrap.addEventListener('wheel', function(e) {
        var deltaY = e.deltaY;
        if (deltaY === 0) return;   // 纯横向手势交给浏览器，不拦截

        e.preventDefault();

        var wrapRect = previewWrap.getBoundingClientRect();
        var mouseX = e.clientX - wrapRect.left;
        var mouseY = e.clientY - wrapRect.top;

        // 元素盒原点（含当前 translate）在容器坐标系中的位置，
        // 扣除平移得到静态基准偏移（如 flex 居中带来的偏移）
        var innerRect = previewInner.getBoundingClientRect();
        var baseX = innerRect.left - wrapRect.left - panX;
        var baseY = innerRect.top - wrapRect.top - panY;

        // 归一化滚动量：pixel / line / page → 统一按像素换算
        var delta = deltaY;
        if (e.deltaMode === 1) delta *= 16;      // 行模式：1 行 ≈ 16px
        else if (e.deltaMode === 2) delta *= 120; // 页模式：1 页 ≈ 120px

        // 步进与滚动量成正比（约每 100px 缩 6%），并限制单次事件最大 15%。
        // 标准鼠标一格 ≈ 100~120px，换算后约 6~7%，动画平滑推进；
        // 之前系数 0.002 会把一格算成 20%+，连续滚动时就是明显的"抽搐"。
        var step = Math.abs(delta) * 0.0006;
        step = Math.max(0.002, Math.min(0.15, step));

        var newZoom = currentZoom + (delta < 0 ? step : -step);
        newZoom = Math.max(0.2, Math.min(3.0, newZoom));
        if (newZoom === currentZoom) return;

        // 记录锚点：以当前视图状态为基准，动画过程中保持该点不动
        zoomAnchor = {
            mouseX: mouseX,
            mouseY: mouseY,
            baseX: baseX,
            baseY: baseY,
            zoom: currentZoom,
            panX: panX,
            panY: panY
        };
        targetZoom = newZoom;
        startZoomAnim();
    }, { passive: false });

    // 预览区鼠标拖拽平移
    previewWrap.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;  // 仅左键拖拽
        stopZoomAnim();              // 拖拽前先停掉缩放动画，避免两者争抢 pan 值
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        panStartX = panX;
        panStartY = panY;
        previewWrap.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        panX = panStartX + (e.clientX - dragStartX);
        panY = panStartY + (e.clientY - dragStartY);
        applyZoom();
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            previewWrap.style.cursor = '';
        }
    });

    // 鼠标离开预览区时恢复光标（拖拽中退出再进入也保持正确）
    previewWrap.addEventListener('mouseleave', function() {
        if (isDragging) previewWrap.style.cursor = '';
    });
    previewWrap.addEventListener('mouseenter', function() {
        if (isDragging) previewWrap.style.cursor = 'grabbing';
    });

    // 防止拖拽时选中文字
    previewWrap.addEventListener('selectstart', function(e) {
        if (isDragging) e.preventDefault();
    });

    // 键盘快捷键：Ctrl+Enter 渲染 / Tab 缩进
    codeEditor.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            doRender();
            return;
        }
        handleEditorTab(e);
    });

    // ============================================================
    //  左右分栏拖动调整宽度（持久化到 localStorage）
    // ============================================================
    var SPLIT_KEY = 'flowchart-split-ratio';

    function applySplit(ratio) {
        ratio = Math.max(20, Math.min(80, ratio));   // 限制 20%~80% 之间
        if (editorPanel) editorPanel.style.flexBasis = ratio + '%';
        if (flowchartMain) flowchartMain.style.setProperty('--fc-split', ratio);
    }

    (function initSplit() {
        var saved = parseFloat(localStorage.getItem(SPLIT_KEY));
        if (!isNaN(saved)) applySplit(saved);
    })();

    if (flowchartResizer && flowchartMain && editorPanel) {
        var fcDragging = false;
        flowchartResizer.addEventListener('pointerdown', function (e) {
            e.preventDefault();
            fcDragging = true;
            flowchartResizer.classList.add('active');
            document.body.classList.add('flowchart-resizing');
            if (flowchartResizer.setPointerCapture) {
                try { flowchartResizer.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
            }
        });
        window.addEventListener('pointermove', function (e) {
            if (!fcDragging) return;
            var rect = flowchartMain.getBoundingClientRect();
            if (!rect.width) return;
            var x = e.clientX - rect.left;
            var ratio = x / rect.width * 100;
            applySplit(ratio);
        });
        window.addEventListener('pointerup', function () {
            if (!fcDragging) return;
            fcDragging = false;
            flowchartResizer.classList.remove('active');
            document.body.classList.remove('flowchart-resizing');
            var cur = parseFloat(editorPanel.style.flexBasis);
            if (!isNaN(cur)) localStorage.setItem(SPLIT_KEY, cur);
        });
        // 双击分隔条：恢复 50/50
        flowchartResizer.addEventListener('dblclick', function () {
            applySplit(50);
            localStorage.setItem(SPLIT_KEY, 50);
        });
    }

    // ============================================================
    //  全屏切换（某一框占满 / 再次点击复原对称布局）
    // ============================================================
    var fsState = 'none';   // 'none' | 'editor' | 'preview'

    function updateFsButtons() {
        var eActive = fsState === 'editor';
        var pActive = fsState === 'preview';
        if (fsEditorBtn) {
            fsEditorBtn.classList.toggle('active', eActive);
            fsEditorBtn.setAttribute('title', tt(eActive ? 'flowchart.fs.editor.restore' : 'flowchart.fs.editor'));
        }
        if (fsPreviewBtn) {
            fsPreviewBtn.classList.toggle('active', pActive);
            fsPreviewBtn.setAttribute('title', tt(pActive ? 'flowchart.fs.preview.restore' : 'flowchart.fs.preview'));
        }
    }

    function setFullscreen(target) {
        fsState = target;
        flowchartMain.classList.toggle('fs-editor', target === 'editor');
        flowchartMain.classList.toggle('fs-preview', target === 'preview');
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
    //  主题切换：重绘图表
    // ============================================================
    document.addEventListener('themechange', function() {
        if (mermaidReady) {
            // 重新初始化 Mermaid 主题
            mermaid.initialize({
                startOnLoad: false,
                theme: getMermaidTheme(),
                securityLevel: 'loose',
                // 解析失败时不让 mermaid 渲染红色炸弹 SVG，统一由我们的 .catch() 显示错误信息
                suppressErrorRendering: true,
                flowchart: { useMaxWidth: true, htmlLabels: true },
                sequence: { useMaxWidth: true },
                gantt: { useMaxWidth: true },
                journey: { useMaxWidth: true },
                timeline: { useMaxWidth: true },
                mindmap: { useMaxWidth: true }
            });
            doRender();
        }
    });

    // ============================================================
    //  语言切换：更新动态文本
    // ============================================================
    document.addEventListener('languagechange', function() {
        document.title = window.I18N.t('flowchart.doc.title');
        // 更新模板下拉列表
        populateTemplates();
        // 更新 placeholder
        codeEditor.placeholder = window.I18N.t('flowchart.editor.ph');
        // 更新状态文本
        var statusCls = renderStatus.className.replace('status-badge ', '');
        var statusKey = '';
        if (statusCls === 'ready') statusKey = 'flowchart.status.ready';
        else if (statusCls === 'error') statusKey = 'flowchart.status.error';
        else if (statusCls === 'rendering') statusKey = 'flowchart.status.rendering';
        if (statusKey) renderStatus.textContent = window.I18N.t(statusKey);
        // 更新空状态
        var emptySpan = emptyState ? emptyState.querySelector('span') : null;
        if (emptySpan) emptySpan.textContent = window.I18N.t('flowchart.status.empty');
        // 更新全屏按钮标题
        updateFsButtons();
    });

    // ============================================================
    //  初始化
    // ============================================================
    function init() {
        populateTemplates();
        // 默认加载第一个模板
        var firstKey = templateSelect.value;
        if (firstKey) {
            var cat = templateCat.value;
            var templates = cat === 'embedded' ? EMBEDDED_TEMPLATES : MERMAID_TEMPLATES;
            if (templates[firstKey]) {
                codeEditor.value = templates[firstKey].code;
            }
        }
        // 首次渲染语法高亮
        renderHighlight();
        // 初始化底部横向滚动条，并按当前内容更新显示
        initFlowHScrollDrag();
        syncHScroll();
        // 加载 Mermaid
        setMode('online');
    }

    init();
})();