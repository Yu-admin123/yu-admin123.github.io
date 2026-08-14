// ============================================================
//  MqttTool.html 页面脚本
//  主题切换逻辑由 theme.js 提供，语言切换由 i18n.js 提供
// ============================================================

// ============================================================
//  静态文本翻译字典（供 data-i18n 属性 + 动态文本使用）
// ============================================================
window.I18N_STRINGS = {
    'common.lang.title':  { zh: '切换语言 / Switch Language', en: 'Switch Language / 切换语言' },
    'common.theme.title': { zh: '切换主题', en: 'Toggle theme' },
    'mqtt.doc.title':     { zh: 'MQTT 调试助手', en: 'MQTT Debug Helper' },
    'mqtt.page.title':    { zh: '📶 MQTT 调试助手', en: '📶 MQTT Debug Helper' },
    'mqtt.subhead':       { zh: '🔹 基于 MQTT over WebSocket · 支持订阅/发布 · 主题通配符 · 实时消息流', en: '🔹 MQTT over WebSocket · subscribe/publish · topic wildcards · realtime message stream' },
    'mqtt.p1.title':      { zh: '① 连接配置', en: '① Connection Config' },
    'mqtt.label.protocol':{ zh: '协议', en: 'Protocol' },
    'mqtt.hint.wss':      { zh: '建议使用 wss', en: 'wss recommended' },
    'mqtt.label.port':    { zh: '端口', en: 'Port' },
    'mqtt.gen.clientid':  { zh: '随机生成', en: 'Generate' },
    'mqtt.label.username':{ zh: '用户名', en: 'Username' },
    'mqtt.label.password':{ zh: '密码', en: 'Password' },
    'mqtt.ph.optional':   { zh: '(可选)', en: '(optional)' },
    'mqtt.unit.sec':      { zh: '秒', en: 's' },
    'mqtt.hint.keepalive':{ zh: '心跳间隔', en: 'Heartbeat interval' },
    'mqtt.connect':       { zh: '🔗 连接', en: '🔗 Connect' },
    'mqtt.disconnect':    { zh: '⛔ 断开', en: '⛔ Disconnect' },
    'mqtt.reconnect':     { zh: '🔄 重连', en: '🔄 Reconnect' },
    'mqtt.status.connected':    { zh: '● 已连接', en: '● Connected' },
    'mqtt.status.not.connected':{ zh: '● 未连接', en: '● Not connected' },
    'mqtt.status.connect.fail': { zh: '⚠️ 连接失败: {msg}', en: '⚠️ Connection failed: {msg}' },
    'mqtt.status.connect.except':{ zh: '⚠️ 连接异常: {msg}', en: '⚠️ Connection error: {msg}' },
    'mqtt.p2.title':      { zh: '② 订阅管理', en: '② Subscription' },
    'mqtt.label.topic':   { zh: '主题', en: 'Topic' },
    'mqtt.ph.subtopic':   { zh: '如 test/+ 或 #', en: 'e.g. test/+ or #' },
    'mqtt.subscribe':     { zh: '订阅', en: 'Subscribe' },
    'mqtt.unsubscribe':   { zh: '取消', en: 'Unsubscribe' },
    'mqtt.hint.sublist':  { zh: '当前订阅的主题列表，点击 ✕ 可取消', en: 'Current subscription list, click ✕ to cancel' },
    'mqtt.p3.title':      { zh: '③ 发布消息', en: '③ Publish Message' },
    'mqtt.label.retain':  { zh: '保留', en: 'Retain' },
    'mqtt.ph.payload':    { zh: '消息内容（支持文本或 JSON）', en: 'Message content (text or JSON)' },
    'mqtt.publish':       { zh: '📤 发布', en: '📤 Publish' },
    'mqtt.clear':         { zh: '清空', en: 'Clear' },
    'mqtt.p4.title':      { zh: '④ 消息日志', en: '④ Message Log' },
    'mqtt.log.waiting':   { zh: '(等待消息...)', en: '(waiting for messages...)' },
    'mqtt.log.empty':     { zh: '(暂无消息)', en: '(no messages)' },
    'mqtt.clear.log':     { zh: '清空日志', en: 'Clear Log' },
    'mqtt.export.log':    { zh: '导出日志', en: 'Export Log' },
    'mqtt.autoscroll':    { zh: '自动滚动', en: 'Auto Scroll' },
    'mqtt.footer':        { zh: '📶 MQTT 调试助手 · WebSocket MQTT · 支持通配符订阅 · 实时消息流', en: '📶 MQTT Debug Helper · WebSocket MQTT · wildcard subscription · realtime stream' },
    // 计数 / 统计
    'mqtt.count.zero':    { zh: '0 条', en: '0 items' },
    'mqtt.count.fmt':     { zh: '{n} 条', en: '{n} items' },
    'mqtt.log.truncate':  { zh: '... (截断)', en: '... (truncated)' },
    'mqtt.payload.empty': { zh: '(空)', en: '(empty)' },
    'mqtt.topic.system':  { zh: '(系统)', en: '(system)' },
    'mqtt.sublist.empty': { zh: '暂无订阅', en: 'No subscriptions' },
    'mqtt.hex.suffix':    { zh: ' (HEX)', en: ' (HEX)' },
    // 动态日志 / 提示文本
    'mqtt.log.no.export':       { zh: '没有日志可导出', en: 'No logs to export' },
    'mqtt.csv.header':          { zh: '时间,类型,主题,QoS,内容', en: 'Time,Type,Topic,QoS,Content' },
    'mqtt.log.not.connected':   { zh: '未连接到 Broker', en: 'Not connected to Broker' },
    'mqtt.log.sub.fail':        { zh: '订阅 {topic} 失败: {msg}', en: 'Subscribe {topic} failed: {msg}' },
    'mqtt.log.sub.success':     { zh: '订阅 {topic} (QoS {qos}) 成功', en: 'Subscribed {topic} (QoS {qos}) success' },
    'mqtt.log.unsub.fail':      { zh: '取消订阅 {topic} 失败: {msg}', en: 'Unsubscribe {topic} failed: {msg}' },
    'mqtt.log.unsub.success':   { zh: '取消订阅 {topic} 成功', en: 'Unsubscribed {topic} success' },
    'mqtt.log.pub.fail':        { zh: '发布到 {topic} 失败: {msg}', en: 'Publish to {topic} failed: {msg}' },
    'mqtt.log.pub.no.topic':    { zh: '请输入发布主题', en: 'Please enter a publish topic' },
    'mqtt.log.sub.no.topic':    { zh: '请输入订阅主题', en: 'Please enter a subscribe topic' },
    'mqtt.log.unsub.no.topic':  { zh: '请输入要取消订阅的主题', en: 'Please enter a topic to unsubscribe' },
    'mqtt.log.already.connected': { zh: '已经连接，如需重连请先断开', en: 'Already connected, disconnect first to reconnect' },
    'mqtt.log.connect.success': { zh: '连接成功 (ClientID: {id})', en: 'Connected (ClientID: {id})' },
    'mqtt.log.connect.error':   { zh: '连接错误: {msg}', en: 'Connection error: {msg}' },
    'mqtt.log.connect.except':  { zh: '连接异常: {msg}', en: 'Connection exception: {msg}' },
    'mqtt.log.disconnected':    { zh: '连接断开', en: 'Connection closed' },
    'mqtt.log.manually.disconnected': { zh: '已主动断开连接', en: 'Manually disconnected' },
    // 日志主题分类标签
    'mqtt.topic.subscribe':   { zh: '订阅', en: 'Subscribe' },
    'mqtt.topic.unsubscribe': { zh: '取消订阅', en: 'Unsubscribe' },
    'mqtt.topic.publish':     { zh: '发布', en: 'Publish' },
    'mqtt.topic.sys':         { zh: '系统', en: 'System' }
};

(function() {
    'use strict';

    /** 翻译快捷方法 */
    function t(key) { return window.I18N ? window.I18N.t(key) : ''; }
    /** 带占位符的翻译：tf('key', {n: 5}) → 替换 {n} */
    function tf(key, vars) {
        var s = t(key);
        if (vars) for (var k in vars) { s = s.split('{' + k + '}').join(vars[k]); }
        return s;
    }

    // ============================================================
    //  DOM 引用
    // ============================================================
    const connectBtn = document.getElementById('connectBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    const reconnectBtn = document.getElementById('reconnectBtn');
    const connStatus = document.getElementById('connStatus');
    const mqttHost = document.getElementById('mqttHost');
    const mqttPort = document.getElementById('mqttPort');
    const mqttProtocol = document.getElementById('mqttProtocol');
    const mqttClientId = document.getElementById('mqttClientId');
    const mqttUsername = document.getElementById('mqttUsername');
    const mqttPassword = document.getElementById('mqttPassword');
    const mqttKeepalive = document.getElementById('mqttKeepalive');
    const genClientIdBtn = document.getElementById('genClientIdBtn');

    const subTopic = document.getElementById('subTopic');
    const subQos = document.getElementById('subQos');
    const subBtn = document.getElementById('subBtn');
    const unsubBtn = document.getElementById('unsubBtn');
    const subList = document.getElementById('subList');

    const pubTopic = document.getElementById('pubTopic');
    const pubQos = document.getElementById('pubQos');
    const pubRetain = document.getElementById('pubRetain');
    const pubPayload = document.getElementById('pubPayload');
    const pubBtn = document.getElementById('pubBtn');
    const clearPubBtn = document.getElementById('clearPubBtn');

    const logDisplay = document.getElementById('logDisplay');
    const logCount = document.getElementById('logCount');
    const rxCount = document.getElementById('rxCount');
    const txCount = document.getElementById('txCount');
    const clearLogBtn = document.getElementById('clearLogBtn');
    const exportLogBtn = document.getElementById('exportLogBtn');
    const autoScrollLog = document.getElementById('autoScrollLog');

    // ============================================================
    //  状态变量
    // ============================================================
    let client = null;
    let isConnected = false;
    let subscriptions = [];
    let logs = [];
    let rxCounter = 0;
    let txCounter = 0;
    const MAX_LOG = 500;
    let reconnectTimer = null;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 5;
    // 当前连接状态（供语言切换时刷新 connStatus）
    let currentConnState = 'disconnected'; // 'connected' | 'disconnected' | 'fail' | 'exception'
    let currentConnErrorMsg = '';

    /** 刷新连接状态显示（依据当前状态 + 当前语言） */
    function refreshConnStatus() {
        if (currentConnState === 'connected') {
            connStatus.innerHTML = '<span class="status-ok">' + t('mqtt.status.connected') + '</span>';
        } else if (currentConnState === 'fail') {
            connStatus.innerHTML = '<span class="status-error">' + tf('mqtt.status.connect.fail', { msg: currentConnErrorMsg }) + '</span>';
        } else if (currentConnState === 'exception') {
            connStatus.innerHTML = '<span class="status-error">' + tf('mqtt.status.connect.except', { msg: currentConnErrorMsg }) + '</span>';
        } else {
            connStatus.textContent = t('mqtt.status.not.connected');
        }
    }

    // ============================================================
    //  Client ID 生成
    // ============================================================
    function generateClientId() {
        return 'web_' + Math.random().toString(16).substring(2, 10) + '_' + Date.now().toString(36);
    }
    genClientIdBtn.addEventListener('click', () => {
        mqttClientId.value = generateClientId();
    });
    mqttClientId.value = generateClientId();

    // ============================================================
    //  连接状态 UI
    // ============================================================
    function updateConnUI(connected) {
        isConnected = connected;
        connectBtn.disabled = connected;
        disconnectBtn.disabled = !connected;
        reconnectBtn.disabled = !connected;
        subBtn.disabled = !connected;
        unsubBtn.disabled = !connected;
        pubBtn.disabled = !connected;
        currentConnState = connected ? 'connected' : 'disconnected';
        currentConnErrorMsg = '';
        refreshConnStatus();
        if (!connected) {
            reconnectAttempts = 0;
            if (reconnectTimer) {
                clearTimeout(reconnectTimer);
                reconnectTimer = null;
            }
        }
    }

    // ============================================================
    //  日志系统（安全渲染，防止特殊字符破坏 DOM）
    // ============================================================
    function addLog(type, topic, content, qos) {
        const now = new Date();
        const timeStr = now.toTimeString().slice(0, 8) + '.' + String(now.getMilliseconds()).padStart(3, '0');

        // 处理 payload 显示（安全转义）
        let displayContent = content;
        if (typeof content === 'string') {
            // 如果内容过长，截断显示
            if (content.length > 2000) {
                displayContent = content.substring(0, 2000) + t('mqtt.log.truncate');
            }
        }

        const entry = {
            type: type,
            topic: topic || '',
            content: displayContent,
            qos: qos !== undefined ? qos : '',
            time: timeStr
        };
        logs.push(entry);
        if (logs.length > MAX_LOG) logs.shift();

        // 更新计数器
        if (type === 'received') rxCounter++;
        if (type === 'sent') txCounter++;
        rxCount.textContent = rxCounter;
        txCount.textContent = txCounter;

        renderLogs();
        logCount.textContent = tf('mqtt.count.fmt', { n: logs.length });
    }

    function renderLogs() {
        if (logs.length === 0) {
            logDisplay.innerHTML = '<span style="color:var(--text-light);">' + t('mqtt.log.empty') + '</span>';
            return;
        }

        // 使用文档片段批量构建，提升性能
        const fragment = document.createDocumentFragment();
        for (const entry of logs) {
            const div = document.createElement('div');
            div.className = 'log-entry';

            // 时间
            const timeSpan = document.createElement('span');
            timeSpan.className = 'log-time';
            timeSpan.textContent = entry.time;
            div.appendChild(timeSpan);

            // 类型标签
            const typeSpan = document.createElement('span');
            typeSpan.className = 'log-type ' + entry.type;
            const labels = { received: 'RECV', sent: 'SEND', error: 'ERR', info: 'INFO' };
            typeSpan.textContent = labels[entry.type] || entry.type.toUpperCase();
            div.appendChild(typeSpan);

            // 主题
            const topicSpan = document.createElement('span');
            topicSpan.className = 'log-topic';
            topicSpan.textContent = entry.topic || t('mqtt.topic.system');
            div.appendChild(topicSpan);

            // QoS
            if (entry.qos !== '' && entry.qos !== undefined) {
                const qosSpan = document.createElement('span');
                qosSpan.className = 'log-qos';
                qosSpan.textContent = 'QoS' + entry.qos;
                div.appendChild(qosSpan);
            }

            // 内容（安全文本节点）
            const payloadSpan = document.createElement('span');
            payloadSpan.className = 'log-payload';
            payloadSpan.textContent = entry.content || t('mqtt.payload.empty');
            div.appendChild(payloadSpan);

            fragment.appendChild(div);
        }

        logDisplay.innerHTML = '';
        logDisplay.appendChild(fragment);

        if (autoScrollLog.checked) {
            logDisplay.scrollTop = logDisplay.scrollHeight;
        }
    }

    function clearLogs() {
        logs = [];
        rxCounter = 0;
        txCounter = 0;
        rxCount.textContent = '0';
        txCount.textContent = '0';
        renderLogs();
        logCount.textContent = t('mqtt.count.zero');
    }

    function exportLogs() {
        if (logs.length === 0) { alert(t('mqtt.log.no.export')); return; }
        let text = t('mqtt.csv.header') + '\n';
        for (const entry of logs) {
            const type = entry.type.toUpperCase();
            const qos = entry.qos !== '' ? entry.qos : '';
            const content = String(entry.content).replace(/,/g, ';').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
            text += `${entry.time},${type},${entry.topic},${qos},${content}\n`;
        }
        const blob = new Blob(['\uFEFF' + text], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `mqtt_log_${Date.now()}.csv`;
        a.click();
    }

    // ============================================================
    //  订阅管理
    // ============================================================
    function doSubscribe(topic, qos) {
        if (!client || !isConnected) {
            addLog('error', t('mqtt.topic.subscribe'), t('mqtt.log.not.connected'));
            return;
        }
        client.subscribe(topic, { qos: qos }, function(err, granted) {
            if (err) {
                addLog('error', t('mqtt.topic.subscribe'), tf('mqtt.log.sub.fail', { topic: topic, msg: err.message }));
            } else {
                addLog('info', t('mqtt.topic.subscribe'), tf('mqtt.log.sub.success', { topic: topic, qos: qos }));
                const exists = subscriptions.find(s => s.topic === topic && s.qos === qos);
                if (!exists) {
                    subscriptions.push({ topic, qos });
                    renderSubList();
                }
            }
        });
    }

    function doUnsubscribe(topic) {
        if (!client || !isConnected) {
            addLog('error', t('mqtt.topic.unsubscribe'), t('mqtt.log.not.connected'));
            return;
        }
        client.unsubscribe(topic, function(err) {
            if (err) {
                addLog('error', t('mqtt.topic.unsubscribe'), tf('mqtt.log.unsub.fail', { topic: topic, msg: err.message }));
            } else {
                addLog('info', t('mqtt.topic.unsubscribe'), tf('mqtt.log.unsub.success', { topic: topic }));
                subscriptions = subscriptions.filter(s => s.topic !== topic);
                renderSubList();
            }
        });
    }

    function renderSubList() {
        subList.innerHTML = '';
        if (subscriptions.length === 0) {
            const span = document.createElement('span');
            span.className = 'hint-text';
            span.textContent = t('mqtt.sublist.empty');
            subList.appendChild(span);
            return;
        }
        for (const sub of subscriptions) {
            const tag = document.createElement('span');
            tag.className = 'sub-tag';
            const text = document.createTextNode(`${sub.topic}  QoS${sub.qos}  `);
            tag.appendChild(text);
            const remove = document.createElement('span');
            remove.className = 'sub-remove';
            remove.textContent = '✕';
            remove.dataset.topic = sub.topic;
            remove.addEventListener('click', function(e) {
                const t = this.dataset.topic;
                doUnsubscribe(t);
            });
            tag.appendChild(remove);
            subList.appendChild(tag);
        }
    }

    // ============================================================
    //  发布消息
    // ============================================================
    function publishMessage() {
        if (!client || !isConnected) {
            addLog('error', t('mqtt.topic.publish'), t('mqtt.log.not.connected'));
            return;
        }
        const topic = pubTopic.value.trim();
        if (!topic) { addLog('error', t('mqtt.topic.publish'), t('mqtt.log.pub.no.topic')); return; }
        const qos = parseInt(pubQos.value);
        const retain = pubRetain.checked;
        let payload = pubPayload.value;
        if (payload === '') payload = '';

        client.publish(topic, payload, { qos, retain }, function(err) {
            if (err) {
                addLog('error', t('mqtt.topic.publish'), tf('mqtt.log.pub.fail', { topic: topic, msg: err.message }));
            } else {
                addLog('sent', topic, payload || t('mqtt.payload.empty'), qos);
            }
        });
    }

    // ============================================================
    //  MQTT 连接 / 断开 / 重连
    // ============================================================
    function connectMqtt() {
        if (isConnected) {
            addLog('info', t('mqtt.topic.sys'), t('mqtt.log.already.connected'));
            return;
        }

        const protocol = mqttProtocol.value;
        const host = mqttHost.value.trim() || 'broker.emqx.io';
        const port = parseInt(mqttPort.value) || 8084;
        const clientId = mqttClientId.value.trim() || generateClientId();
        const username = mqttUsername.value.trim() || undefined;
        const password = mqttPassword.value.trim() || undefined;
        const keepalive = parseInt(mqttKeepalive.value) || 60;

        const brokerUrl = `${protocol}://${host}:${port}/mqtt`;

        const options = {
            clientId: clientId,
            keepalive: keepalive,
            reconnectPeriod: 0,
            connectTimeout: 30 * 1000,
            clean: true,
        };
        if (username) options.username = username;
        if (password) options.password = password;

        try {
            // 如果已有 client，先清理
            if (client) {
                try { client.end(true); } catch (e) {}
                client = null;
            }

            client = mqtt.connect(brokerUrl, options);

            client.on('connect', function(connack) {
                updateConnUI(true);
                addLog('info', t('mqtt.topic.sys'), tf('mqtt.log.connect.success', { id: clientId }));
                // 重新订阅之前的主题
                for (const sub of subscriptions) {
                    doSubscribe(sub.topic, sub.qos);
                }
                reconnectAttempts = 0;
            });

            client.on('error', function(err) {
                addLog('error', t('mqtt.topic.sys'), tf('mqtt.log.connect.error', { msg: err.message }));
                if (!isConnected) {
                    currentConnState = 'fail';
                    currentConnErrorMsg = err.message;
                    refreshConnStatus();
                }
            });

            client.on('close', function() {
                if (isConnected) {
                    updateConnUI(false);
                    addLog('error', t('mqtt.topic.sys'), t('mqtt.log.disconnected'));
                }
            });

            client.on('message', function(topic, payload, packet) {
                const qos = packet.qos || 0;
                let payloadStr;
                try {
                    // 尝试 UTF-8 解码
                    payloadStr = payload.toString('utf8');
                    // 如果包含不可打印字符（除了换行/回车/制表），显示为 HEX
                    if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(payloadStr)) {
                        const hex = payload.toString('hex');
                        payloadStr = hex.match(/.{2}/g).join(' ') + t('mqtt.hex.suffix');
                    }
                    // 如果内容过长，保留完整（在 addLog 中截断显示）
                } catch (e) {
                    payloadStr = payload.toString('hex').match(/.{2}/g).join(' ') + t('mqtt.hex.suffix');
                }
                addLog('received', topic, payloadStr, qos);
            });

        } catch (e) {
            currentConnState = 'exception';
            currentConnErrorMsg = e.message;
            refreshConnStatus();
            addLog('error', t('mqtt.topic.sys'), tf('mqtt.log.connect.except', { msg: e.message }));
        }
    }

    function disconnectMqtt() {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
        reconnectAttempts = 0;
        if (client) {
            client.end(true, function() {
                // 回调
            });
            client = null;
        }
        updateConnUI(false);
        addLog('info', t('mqtt.topic.sys'), t('mqtt.log.manually.disconnected'));
    }

    function reconnectMqtt() {
        if (!isConnected) {
            connectMqtt();
            return;
        }
        // 如果已连接，先断开再重连
        disconnectMqtt();
        // 延迟重新连接
        setTimeout(() => {
            connectMqtt();
        }, 500);
    }

    // ============================================================
    //  事件绑定
    // ============================================================
    connectBtn.addEventListener('click', connectMqtt);
    disconnectBtn.addEventListener('click', disconnectMqtt);
    reconnectBtn.addEventListener('click', reconnectMqtt);

    subBtn.addEventListener('click', function() {
        const topic = subTopic.value.trim();
        if (!topic) { addLog('error', t('mqtt.topic.subscribe'), t('mqtt.log.sub.no.topic')); return; }
        const qos = parseInt(subQos.value);
        doSubscribe(topic, qos);
    });

    unsubBtn.addEventListener('click', function() {
        const topic = subTopic.value.trim();
        if (!topic) { addLog('error', t('mqtt.topic.unsubscribe'), t('mqtt.log.unsub.no.topic')); return; }
        doUnsubscribe(topic);
    });

    subTopic.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') subBtn.click();
    });

    pubBtn.addEventListener('click', publishMessage);
    pubPayload.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            pubBtn.click();
        }
    });
    pubTopic.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') pubBtn.click();
    });

    clearPubBtn.addEventListener('click', function() {
        pubPayload.value = '';
    });

    clearLogBtn.addEventListener('click', clearLogs);
    exportLogBtn.addEventListener('click', exportLogs);

    window.addEventListener('beforeunload', function() {
        if (client) {
            try { client.end(true); } catch (e) {}
        }
    });

    // ============================================================
    //  初始化
    // ============================================================
    updateConnUI(false);
    renderSubList();
    renderLogs();
    logCount.textContent = t('mqtt.count.zero');
    rxCount.textContent = '0';
    txCount.textContent = '0';

    // 初始化文档标题
    document.title = t('mqtt.doc.title');

    // ============================================================
    //  语言切换：更新动态文本
    // ============================================================
    document.addEventListener('languagechange', function () {
        document.title = t('mqtt.doc.title');
        // 刷新连接状态显示
        refreshConnStatus();
        // 刷新日志计数
        logCount.textContent = logs.length === 0 ? t('mqtt.count.zero') : tf('mqtt.count.fmt', { n: logs.length });
        // 刷新订阅列表空态
        if (subscriptions.length === 0) renderSubList();
        // 刷新日志空态
        if (logs.length === 0) renderLogs();
    });

    console.log('📶 MQTT 调试助手已加载。请先连接 Broker。');
})();
