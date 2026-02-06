/*
 * @Author: tackchen
 * @Date: 2025-11-03 22:45:17
 * @Description: Coding something
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs-extra';
import path from 'path';
import { useCommonConfig } from './scripts/vite.config.base';

// https://vite.dev/config/
export default defineConfig(() => {
    initHTMLEntry();
    return useCommonConfig({
        plugins: [ vue() ],
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


function initHTMLEntry () {
    const htmlList: string[] = [];
    // 获取dev的入口html
    const entry = path.resolve(__dirname, './dev/entry');
    const files = fs.readdirSync(entry);
    htmlList.push(...files.filter(file => file.endsWith('.html')).map(file => path.join('/dev/entry', file)));

    htmlList.push(...findPkgFiles(path.resolve(__dirname, './packages')));
    console.log(htmlList);
    const content = fs.readFileSync(path.resolve(__dirname, './docs/index-template.html'), 'utf-8');
    fs.writeFileSync(
        path.resolve(__dirname, './index.html'),
        content.replace('{TEMPLATE}', htmlList.map(v => `<li><a href="${v.replace('index.html', '').replace('.html', '')}">${v}</a></li>`).join('\n')),
        'utf-8',
    );
}

function findPkgFiles (dirPath: string, paths: string[] = []): string[] {
    // 获取packages的入口html
    const pkgFiles = fs.readdirSync(dirPath);
    const isEnd = pkgFiles.includes('package.json');
    for (const name of pkgFiles) {
        console.log(dirPath, name);
        const filePath = path.join(dirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!isEnd) {
                // ! 如果已经是包了就不再递归遍历了
                findPkgFiles(filePath, paths);
            }
        } else if (stat.isFile() && name.endsWith('.html')) {
            paths.push(path.join(dirPath, name)
                .replace(__dirname, ''));
        }
    }
    return paths;
}
