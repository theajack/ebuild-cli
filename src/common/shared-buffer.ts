/*
 * @Author: chenzhongsheng
 * @Date: 2023-12-05 14:49:17
 * @Description: Coding something
 */
export const MAX_BUFFER_SIZE = 1000; // js 与 worker 内存共享最大size

export function supportSharedBuffer () {
    return false;
    // return !!globalThis.SharedArrayBuffer && globalThis.crossOriginIsolated;
}

export class SharedBuffer {
    buffer!: SharedArrayBuffer|ArrayBuffer;

    arr!: Uint8Array;
    maxSize = MAX_BUFFER_SIZE;
    supported = supportSharedBuffer();
    constructor () {
        if (this.supported) {
            this.buffer = new SharedArrayBuffer(this.maxSize);
            this.arr = new Uint8Array(this.buffer);
        }
    }
    share (arr: Uint8Array): SharedArrayBuffer|ArrayBuffer {
        if (this.supported) {
            this.arr.set(arr);
            return this.buffer;
        }
        return arr.buffer;
    }
}