/*
 * @Author: theajack
 * @Date: 2023-04-04 23:20:27
 * @Description: Coding something
 */
import {UserConfig, defineConfig} from 'vite';
import {babel} from '@rollup/plugin-babel';
import {resolve} from 'path';
import {version, ebuild, dependencies} from './package.json';
import {execSync} from 'child_process';
import upfs from 'up-fs';
import {writeFileSync} from 'fs';

const fileName = ebuild.fileName || ebuild.publish.name;
const pubVersion = ebuild.publish.version || version;

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const isDev = mode === 'development';
    console.log('defineConfig', mode, isDev);

    return {
        plugins: [
        ],
        define: {
            __DEV__: isDev,
            __VERSION__: `"${pubVersion}"`,
            __WIN__: 'window',
        },
        ...(isDev ? geneDevConfig() : geneBuildConfig())
    };
});
// ! Dev VApp 时的配置
function geneDevConfig (): UserConfig {
    return {
        plugins: [],
        server: {
            host: '0.0.0.0',
            port: 5173,
        },
    };
}

function geneBuildConfig (): UserConfig {
    return {
        plugins: [{
            name: 'generate-npm-stuff',
            writeBundle () {
                execSync(`npx dts-bundle-generator -o npm/${fileName}.es.min.d.ts src/index.ts`);
                generatePackage();
            }
        }],
        
        build: {
            minify: true,
            
            lib: {
                entry: resolve(__dirname, 'src/index.ts'), // 打包的入口文件
                name: ebuild.libName, // 包名
                formats: ['es', 'iife'], // 打包模式，默认是es和umd都打
                fileName: (format: string) => `${fileName}.${format}.min.js`,
            },
            rollupOptions: {
                // 不需要
                // external: [ ...Object.keys(deps.dependencies) ],
                plugins: [
                    babel({
                        exclude: 'node_modules/**',
                        extensions: ['.js', '.ts', 'tsx'],
                        configFile: resolve(__dirname, './build/babel.config.js'),
                    })
                ]
            },
            outDir: resolve(__dirname, 'npm'), // 打包后存放的目录文件
        },
    };
}

function generatePackage () {
    
    upfs.copyFile({
        src: './README.md',
        target: './npm/README.md',
    });
    upfs.copyFile({
        src: './LICENSE',
        target: './npm/LICENSE',
    });

    writeFileSync('./npm/package.json', JSON.stringify({
        ...ebuild.publish,
        dependencies,
        'main': `${fileName}.es.min.js`,
        'unpkg': `${fileName}.iife.min.js`,
        'jsdelivr': `${fileName}.iife.min.js`,
        'typings': `${fileName}.es.min.d.ts`,
    }, null, 2), 'utf8');
}