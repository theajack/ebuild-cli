/*
 * @Author: chenzhongsheng
 * @Date: 2024-11-02 14:03:14
 * @Description: Coding something
 */
import { Messenger } from '../common/messenger';
import { SharedBuffer } from '../common/shared-buffer';
import ClientWorker from '../worker/index?worker&inline';
import { IWorkerMessage } from '../common/types/types';

export class RenderProxy {
    messenger: Messenger;
    buffer: SharedBuffer;
    constructor () {
        const worker = new ClientWorker();
        this.messenger = new Messenger(worker);
        this.buffer = new SharedBuffer();
        this.messenger.onMessage(this.onWorkerMessage.bind(this));
    }


    private onWorkerMessage (msg: IWorkerMessage) {
        // 收到来自worker的消息
        console.log('data from worker', msg);
    }

    sendMessage (data: IWorkerMessage) {
        this.messenger.send(data);
    }

    destory () {
        this.messenger.destroy();
    }

}