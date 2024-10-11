/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-08 07:12:52
 * @Description: Coding something
 */
import { Log } from 'sener-log';
import { Config } from 'sener-config';
import { Form } from 'sener-form';
import { Static } from 'sener-static';
import { Sener, Cors, Cookie, Session } from 'sener';
import router from './router';
import middlewares from './middleware';

new Sener({
    port: 9000,
    middlewares: [
        router,
        new Cookie(),
        new Session(),
        new Log(),
        new Config(),
        new Form(),
        new Cors(),
        new Static(),
        ...middlewares
    ]
});