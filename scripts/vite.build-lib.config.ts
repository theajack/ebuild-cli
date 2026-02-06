import { defineConfig } from 'vite';
import { base64ToStr, rootDir, type IViteBuildConfig } from './utils';
import { resolve } from 'path';
import { BuildPlugins, useCommonConfig } from './vite.config.base';
import dts from 'unplugin-dts/vite';
import fs from 'fs-extra';

// pnpm build:lib demo

// https://vite.dev/config/
export default defineConfig(() => {
    const args = process.argv.slice(6);
    console.log(`${base64ToStr(args[0]!)}`);
    const {
        dirName,
    }: IViteBuildConfig = JSON.parse(base64ToStr(args[0]!));
    const appDir = resolve(rootDir, `./packages/${dirName}`);

    return useCommonConfig({
        worker: {
            format: 'iife',
        },
        // base: './',
        plugins: [ dts({
            bundleTypes: true,
            tsconfigPath: resolve(rootDir, './tsconfig.app.json'),
        }), ...BuildPlugins(), {
            name: '',
            closeBundle () {
                // ! 删除无用文件
                [ 'dev', 'docs', 'scripts' ].forEach(dir => fs.rmdirSync(resolve(appDir, `dist/${dir}`), { recursive: true }));
                [ 'vite.config.d.ts', 'vitest.workspace.d.ts', 'vite.svg' ].forEach(file => fs.rmSync(resolve(appDir, `dist/${file}`)));
            },
        } ],
        publicDir: resolve(rootDir, 'public'),
        build: {
            outDir: resolve(appDir, 'dist'),
            minify: true,
            lib: {
                entry: resolve(appDir, 'src/index.ts'), // 打包的入口文件
                name: `start_${dirName.replaceAll('/', '_')}`, // 包名
                formats: [ 'es', 'umd', 'iife' ], // 目前暂不支持 iife 和 es/umd 同时打包，有需要可以增加
                fileName: (format: string) => {
                    console.log('fileName format',  `${appDir}.${format}.min.js`);
                    return `${dirName.replaceAll('/', '-')}.${format}.min.js`;
                },
            },
            rollupOptions: {
                // 不需要
                external: [],
                plugins: BuildPlugins(),
                output: {
                    extend: true,
                },
            },
        },
    });
});
