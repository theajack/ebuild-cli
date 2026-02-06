import { defineConfig } from 'vite';
import fs from 'fs-extra';
import { base64ToStr, rootDir, type IViteBuildConfig } from './utils';
import { resolve } from 'path';
import { BuildPlugins, useCommonConfig } from './vite.config.base';

// npm run build:app demo

export default defineConfig(() => {
    const args = process.argv.slice(6);
    console.log(`${base64ToStr(args[0]!)}`);
    const {
        dirName,
    }: IViteBuildConfig = JSON.parse(base64ToStr(args[0]!));
    const appDir = resolve(rootDir, `./packages/${dirName}`);
    // console.log(`--------, ${process.argv.join(',')}`);

    return useCommonConfig({
        plugins: [
            ...BuildPlugins(),
            // ...todo
            {
                name: 'move-html',
                closeBundle () {
                    fs.moveSync(resolve(appDir, `dist/packages/${dirName}/index.html`), resolve(appDir, 'dist/index.html'));
                    fs.rmdirSync(resolve(appDir, 'dist/packages'), { recursive: true });
                },
            },
        ],
        // base: './',
        publicDir: resolve(rootDir, 'public'),
        build: {
            // outDir: resolve(appDir, 'dist'),
            rollupOptions: {

                input: {
                    index: resolve(appDir, 'index.html'),
                },
                output: {
                    dir: resolve(appDir, 'dist'),
                    // entryFileNames: 'assets/[name]-[hash].js',
                    // chunkFileNames: 'assets/[name]-[hash].js',
                    // assetFileNames: 'assets/[name]-[hash].[ext]',
                    // ''
                },
            },
        },
    });
});
