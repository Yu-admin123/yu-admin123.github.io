/*
 * zip-util.js — 零依赖的浏览器端 ZIP 读写（不引入任何第三方库）。
 * 使用原生 CompressionStream/DecompressionStream（deflate-raw）+ CRC32 生成标准 ZIP。
 * 若运行环境不支持 CompressionStream，则自动回退为「仅存储（store）」模式，仍产出可被任意解压工具识别的 zip。
 * 暴露全局：window.ZipUtil = { createZip, parseZip }。
 */
(function (global) {
    'use strict';

    var encoder = new TextEncoder();
    var decoder = new TextDecoder();

    // ---- CRC32（查表法） ----
    function crc32(buf) {
        var c, table = crc32.table;
        if (!table) {
            table = crc32.table = [];
            for (var n = 0; n < 256; n++) {
                c = n;
                for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
                table[n] = c >>> 0;
            }
        }
        var crc = 0xFFFFFFFF;
        for (var i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
        return (crc ^ 0xFFFFFFFF) >>> 0;
    }

    function concatBytes(arrs) {
        var total = 0, i;
        for (i = 0; i < arrs.length; i++) total += arrs[i].length;
        var out = new Uint8Array(total), off = 0;
        for (i = 0; i < arrs.length; i++) { out.set(arrs[i], off); off += arrs[i].length; }
        return out;
    }
    function u16(n) { var b = new Uint8Array(2); new DataView(b.buffer).setUint16(0, n & 0xFFFF, true); return b; }
    function u32(n) { var b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, n >>> 0, true); return b; }

    // 压缩：返回压缩后字节；环境不支持则返回 null（调用方回退 store）
    function compressRaw(bytes) {
        try {
            if (typeof CompressionStream === 'undefined') return Promise.resolve(null);
            var cs = new CompressionStream('deflate-raw');
            return new Response(new Blob([bytes]).stream().pipeThrough(cs)).arrayBuffer()
                .then(function (ab) { return new Uint8Array(ab); })
                .catch(function () { return null; });
        } catch (e) { return Promise.resolve(null); }
    }
    function inflateRaw(bytes) {
        if (typeof DecompressionStream === 'undefined') return Promise.reject(new Error('DecompressionStream 不可用'));
        var ds = new DecompressionStream('deflate-raw');
        return new Response(new Blob([bytes]).stream().pipeThrough(ds)).arrayBuffer()
            .then(function (ab) { return new Uint8Array(ab); });
    }

    /**
     * 创建 ZIP。
     * @param {Array<{name:string, data:Uint8Array}>} files
     * @returns {Promise<Blob>}
     */
    function createZip(files) {
        var localParts = [], central = [], offset = 0;
        var chain = Promise.resolve();
        files.forEach(function (f) {
            chain = chain.then(function () {
                var nameBytes = encoder.encode(f.name);
                var data = f.data instanceof Uint8Array ? f.data : encoder.encode(String(f.data));
                return compressRaw(data).then(function (comp) {
                    var method = 8, payload = comp;
                    if (!payload) { payload = data; method = 0; }
                    var crc = crc32(data);
                    localParts.push(concatBytes([
                        u32(0x04034b50), u16(20), u16(0x0800), u16(method),
                        u16(0), u16(0), u32(crc), u32(payload.length), u32(data.length),
                        u16(nameBytes.length), u16(0), nameBytes, payload
                    ]));
                    central.push(concatBytes([
                        u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(method),
                        u16(0), u16(0), u32(crc), u32(payload.length), u32(data.length),
                        u16(nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset),
                        nameBytes
                    ]));
                    offset += localParts[localParts.length - 1].length;
                });
            });
        });
        return chain.then(function () {
            var centralBuf = concatBytes(central);
            var end = concatBytes([
                u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length),
                u32(centralBuf.length), u32(offset), u16(0)
            ]);
            return new Blob([concatBytes(localParts.concat([centralBuf, end]))], { type: 'application/zip' });
        });
    }

    /**
     * 解析 ZIP。
     * @param {ArrayBuffer} arrayBuffer
     * @returns {Promise<Array<{name:string, bytes:Uint8Array}>>}
     */
    function parseZip(arrayBuffer) {
        var dv = new DataView(arrayBuffer);
        var eocd = -1;
        for (var i = arrayBuffer.byteLength - 22; i >= 0; i--) {
            if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
        }
        if (eocd < 0) return Promise.reject(new Error('不是有效的 zip 文件'));
        var entryCount = dv.getUint16(eocd + 10, true);
        var cdOffset = dv.getUint32(eocd + 16, true);
        var buf8 = new Uint8Array(arrayBuffer);
        var out = [];
        var chain = Promise.resolve();
        for (var e = 0; e < entryCount; e++) {
            (function () {
                var sig = dv.getUint32(cdOffset, true);
                if (sig !== 0x02014b50) { chain = chain.then(function () { throw new Error('中央目录损坏'); }); return; }
                var method = dv.getUint16(cdOffset + 10, true);
                var compSize = dv.getUint32(cdOffset + 20, true);
                var nameLen = dv.getUint16(cdOffset + 28, true);
                var extraLen = dv.getUint16(cdOffset + 30, true);
                var commentLen = dv.getUint16(cdOffset + 32, true);
                var localOffset = dv.getUint32(cdOffset + 42, true);
                var name = decoder.decode(buf8.subarray(cdOffset + 46, cdOffset + 46 + nameLen));
                var lNameLen = dv.getUint16(localOffset + 26, true);
                var lExtraLen = dv.getUint16(localOffset + 28, true);
                var dataStart = localOffset + 30 + lNameLen + lExtraLen;
                var comp = buf8.subarray(dataStart, dataStart + compSize);
                chain = chain.then(function () {
                    if (method === 0) { out.push({ name: name, bytes: new Uint8Array(comp) }); return; }
                    if (method === 8) {
                        return inflateRaw(comp).then(function (raw) { out.push({ name: name, bytes: raw }); });
                    }
                    throw new Error('不支持的压缩方式: ' + method);
                });
                cdOffset += 46 + nameLen + extraLen + commentLen;
            })();
        }
        return chain.then(function () { return out; });
    }

    global.ZipUtil = { createZip: createZip, parseZip: parseZip, crc32: crc32 };
})(typeof window !== 'undefined' ? window : globalThis);
