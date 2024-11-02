
/*
 * @Author: chenzhongsheng
 * @Date: 2023-12-05 15:10:36
 * @Description: Coding something
 */

import { SharedBuffer } from './shared-buffer';
import type { IWorkerMessage } from './types/types';

export class Messenger {
    encoder = new TextEncoder();
    decoder = new TextDecoder();
    buffer: SharedBuffer;
    client: Worker|typeof globalThis;

    constructor (client: Worker|typeof globalThis) {
        this.buffer = new SharedBuffer();
        this.client = client;
    }
    // packages/vecore/plugins/webts-engine/main/webts.ts
    send (data: IWorkerMessage) {
        this.client.postMessage(data);
    }

    onMessage (listener: (d: IWorkerMessage)=>void) {
        // @ts-ignore
        this.client.addEventListener('message', (e: {data: any}) => {
            listener(e.data);
        });
    }

    destroy () {
        // @ts-ignore
        this.client.terminate?.();
    }
}