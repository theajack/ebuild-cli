/*
 * @Author: chenzhongsheng
 * @Date: 2024-11-02 09:15:44
 * @Description: Coding something
 */
import { Messenger } from '../common/messenger';
import { WasmMsgType, WorkerMessageType } from '../common/types/enum';
import { IWorkerMessage } from '../common/types/types';
import { withResolve } from '../common/utils';
import { IWasmExtra, WasmProxy } from './wasm-ts/wasm-proxy';

export class WorkerProxy {
    messenger: Messenger;
    wasm: WasmProxy;
    ready: Promise<void>;
    constructor () {
        this.messenger = new Messenger(globalThis);
        this.wasm = new WasmProxy();
        const { ready, resolve } = withResolve();
        this.init(resolve);
        this.ready = ready;
    }

    private async init (resolve: ()=>void) {
        await this.wasm.init();

        this.messenger.onMessage(this.onRenderMessage.bind(this));
        this.wasm.onMessage(this.onWasmMessage.bind(this));

        resolve();
    }

    private onWasmMessage (data: Uint8Array, extra: IWasmExtra) {
        // 收到来自wasm的消息
        console.log('data from wasm', data, extra);
        this.sendMessage({
            type: WorkerMessageType.Test,
            data: { data, extra }
        });
    }
    private onRenderMessage (msg: IWorkerMessage) {
        // 收到来自主线程的消息
        console.log('data from render', msg);
        // test
        this.wasm.sendData(WasmMsgType.Test, new Uint8Array([ 3, 2, 1 ]));
    }
    sendMessage (data: IWorkerMessage) {
        this.messenger.send(data);
    }
}
