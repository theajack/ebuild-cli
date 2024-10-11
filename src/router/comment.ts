/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-08 08:21:46
 * @Description: Coding something
 */
import { IRouter } from 'sener';

export default {
    'get:/comment': ({ query }) => {
        return { data: { list: [], query: query } };
    }
} as IRouter;