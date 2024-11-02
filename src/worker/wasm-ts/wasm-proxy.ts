/*
 * @Author: chenzhongsheng
 * @Date: 2024-11-02 09:16:57
 * @Description: Coding something
 */
/*
 * @Author: chenzhongsheng
 * @Date: 2023-12-01 17:49:27
 * @Description: Coding something
 */
import { logId } from './log';

import { getWasmUrl } from './import-wasm';

import initWasm, {
    init_shared_buffer,
    send_to_wasm,
    regist_js_onmessage,
    // init_shared_buffer_to_js,
} from '../wasm/pkg/ebuild_wasm';
import { withResolve } from '../../common/utils';
import { WasmMsgType } from '../../common/types/enum';

// console.log('localStorage.getItem("_test")', localStorage.getItem('__test'));

export interface IWasmExtra {
    extra1: number,
    extra2: number,
}

export class WasmProxy {
    sharedU8s!: Uint8Array;

    // receiveSharedU8s!: Uint8Array;

    maxSize = 0;

    wasm!: any;

    async init () {
        const wasm = await initWasm(getWasmUrl());
        this.wasm = wasm;

        const { ready, resolve } = withResolve();
        init_shared_buffer((buffer: Uint8Array) => {
            this.sharedU8s = buffer;
            this.maxSize = buffer.length;
            logId('wasm inited maxSize=', this.maxSize);
            resolve();
        });

        return ready;
    }

    // 主动向wasm发送数据
    sendData (msgType: WasmMsgType, arr?: Uint8Array) {
        logId('send_to_wasm', msgType, arr);

        if (!arr || arr.length === 0) {
            send_to_wasm(0, msgType); // , payloadType
        } else {
            this.shareData(arr, size => {
                if (!size) {return;}
                console.warn('send_to_wasm', size, msgType);
                send_to_wasm(size, msgType); // , payloadType
            });
        }
    }

    private async shareData (arr: Uint8Array, done: (size: number)=>void) {
        const size = arr.length;
        if (size > this.maxSize) {
            console.warn('WASM 发送数据超过最大长度，', this.maxSize);
            done(0);
            return 0;
        }
        if (this.sharedU8s.byteLength === 0) {
            init_shared_buffer((buffer: Uint8Array) => {
                this.sharedU8s = buffer;
                this.maxSize = buffer.length;
                logId('wasm reinited maxSize=', this.maxSize);
                this.sharedU8s.set(arr);
                done(size);
            });
            return size;
        } else {
            this.sharedU8s.set(arr);
            done(size);
        }
    }
    private getSharedDataFromWasm (size: number, ondata: (u8s: Uint8Array)=>void) {
        if (this.sharedU8s.byteLength === 0) {
            init_shared_buffer((buffer: Uint8Array) => {
                logId('【WASM 2】reinit receiveSharedU8s');
                this.sharedU8s = buffer;
                ondata(buffer.slice(0, size));
            });
        } else {
            ondata(this.sharedU8s.slice(0, size));
        }
    }
    onMessage (callback: (data: Uint8Array, extra: IWasmExtra)=>void) {
        regist_js_onmessage((size: number, str: string) => {
            // todo 修改这里的传输方式
            const arr = str.split(',');
            const extra: IWasmExtra = {
                extra1: parseInt(arr[0]),
                extra2: parseInt(arr[1]),
            };
            this.getSharedDataFromWasm(size, (u8s) => {
                callback(u8s, extra);
            });
        }, (id: string, msg: string) => {
            logId(`${id}`, msg);
        });
    }

    destroy () {
    }
}