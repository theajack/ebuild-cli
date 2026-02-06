import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { deepAssign } from './utils';
// import legacy from '@vitejs/plugin-legacy';
import { babel } from '@rollup/plugin-babel';
import { resolve } from 'path';

export function useCommonConfig (config: UserConfig): UserConfig {
    return deepAssign(config, CommonViteConfig);
}

export const CommonViteConfig: UserConfig = {
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@theme': resolve(__dirname, '../packages/ui/theme/src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@theme/theme.scss" as *;',
            },
        },
    },
};

export function BuildPlugins () {
    return [
    // legacy(),
        babel({
            exclude: 'node_modules/**',
            extensions: [ '.js', '.ts', 'tsx' ],
            configFile: resolve(__dirname, './babel.config.js'),
        }),
    ];
}
