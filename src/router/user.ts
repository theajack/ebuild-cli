/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-08 08:21:46
 * @Description: Coding something
 */
import { IRouter } from 'sener';

export default {
    'get:/user': ({ query }) => {
        return { data: { name: query.name } };
    },
    // To facilitate debugging, get requests are used here for the time being
    'get:/user/regist': ({ query, write }) => {
        const { data, save } = write('user');
        data.push({ name: query.name });
        save();
        return { data: 'success' };
    }
} as IRouter;