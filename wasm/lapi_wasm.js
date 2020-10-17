let imports = {};
let wasm;
import { Buffer } from 'https://deno.land/std/node/buffer.ts';

/**
* @param {number} x
* @returns {number}
*/
const square = function(x) {
    var ret = wasm.square(x);
    return ret;
};
export { square };

let WASM_VECTOR_LEN = 0;

let cachegetNodeBufferMemory0 = null;
function getNodeBufferMemory0() {
    if (cachegetNodeBufferMemory0 === null || cachegetNodeBufferMemory0.buffer !== wasm.memory.buffer) {
        cachegetNodeBufferMemory0 = Buffer.from(wasm.memory.buffer);
    }
    return cachegetNodeBufferMemory0;
}

function passStringToWasm0(arg, malloc) {

    const len = Buffer.byteLength(arg);
    const ptr = malloc(len);
    getNodeBufferMemory0().write(arg, ptr, len);
    WASM_VECTOR_LEN = len;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
* @param {string} password
* @param {string} salt
* @returns {string}
*/
const hash = function(password, salt) {
    try {
        var ptr0 = passStringToWasm0(password, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(salt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.hash(8, ptr0, len0, ptr1, len1);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_free(r0, r1);
    }
};
export { hash };

/**
* @param {string} password
* @param {string} hash
* @returns {boolean}
*/
const verify = function(password, hash) {
    var ptr0 = passStringToWasm0(password, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.verify(ptr0, len0, ptr1, len1);
    return ret !== 0;
};
export { verify };

import * as path from 'https://deno.land/std/path/mod.ts';
import WASI from 'https://deno.land/std/wasi/snapshot_preview1.ts';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const wasi = new WASI({
    args: Deno.args,
    env: Deno.env.toObject(),
    preopens: {
        '/': __dirname
    }
});
imports = { wasi_snapshot_preview1: wasi.exports };

const p = path.join(__dirname, 'lapi_wasm_bg.wasm');
const bytes = Deno.readFileSync(p);
const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;

wasi.memory = wasmInstance.exports.memory;

