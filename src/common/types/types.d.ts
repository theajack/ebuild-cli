/*
 * @Author: chenzhongsheng
 * @Date: 2024-11-02 09:01:09
 * @Description: Coding something
 */
import { WorkerMessageType } from './enum';

export interface IWorkerMessage {
    type: WorkerMessageType,
    data?: object,
}