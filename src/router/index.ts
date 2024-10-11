/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-08 08:34:18
 * @Description: Coding something
 */
import { Router } from 'sener';
import user from './user';
import comment from './comment';

export default new Router({
    ...user,
    ...comment,
});