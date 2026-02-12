/*
 * @Author: tackchen
 * @Date: 2025-11-03 22:45:17
 * @Description: Coding something
 */
import { defineConfig } from 'vite';
import { useCommonConfig } from './scripts/vite.config.base';
import { initHTMLEntry } from './scripts/dev/build-entry';

// https://vite.dev/config/
export default defineConfig(() => {
    initHTMLEntry();
    return useCommonConfig({
        server: {
            host: '0.0.0.0',
            port: 8090,
            hmr: true,
            headers: { // 使用sharedArrayBuffer
                'Cross-Origin-Embedder-Policy': 'require-corp',
                'Cross-Origin-Opener-Policy': 'same-origin',
            },
        },
        publicDir: './public',
        resolve: {
            alias: {
            },
        },
    });
});
