/*
 * @Author: chenzhongsheng
 * @Date: 2024-11-02 07:35:00
 * @Description: Coding something
 */
import { WorkerMessageType } from './common/types/enum';
import { RenderProxy } from './render/render-proxy';

const renderProxy = new RenderProxy();

renderProxy.sendMessage({
    type: WorkerMessageType.Test,
    data: { a: 1 }
});