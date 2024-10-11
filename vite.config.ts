/*
 * @Author: theajack
 * @Date: 2023-04-04 23:20:27
 * @Description: Coding something
 */
import { defineConfig } from 'vite';
import alins from 'vite-plugin-alins';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ mode }) => {
    return {
        base: '/',
        plugins: [
            legacy({
                targets: [ 'defaults', 'not IE 11' ],
            }),
            alins(),
        ],
        define: {
            __DEV__: mode === 'development',
        },
    };
});
