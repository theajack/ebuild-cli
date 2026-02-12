import fs from 'fs-extra';
import path from 'path';

const Root = path.resolve(__dirname, '../../');

export function initHTMLEntry () {
    const htmlList: string[] = [];
    // 获取dev的入口html
    const entry = path.resolve(Root, 'dev/entry');
    const files = fs.readdirSync(entry);
    htmlList.push(...files.filter(file => file.endsWith('.html')).map(file => path.join('/dev/entry', file)));

    htmlList.push(...findPkgFiles(path.resolve(Root, 'packages')));
    console.log(htmlList);
    const content = fs.readFileSync(path.resolve(Root, 'docs/index-template.html'), 'utf-8');
    fs.writeFileSync(
        path.resolve(Root, 'index.html'),
        content.replace('{TEMPLATE}', buildGroupedHTML(htmlList)),
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
            // ! 如果已经是包了就不再递归遍历了, dev目录下的都会继续遍历
            if (name === 'dev' || !isEnd) {
                findPkgFiles(filePath, paths);
            }
        } else if (stat.isFile() && name.endsWith('.html')) {
            paths.push(path.join(dirPath, name)
                .replace(Root, ''));
        }
    }
    return paths;
}

function buildGroupedHTML (htmlList: string[]): string {
    const groups: Record<string, string[]> = {};
    for (const filePath of htmlList) {
        const parts = filePath.split('/').filter(Boolean);
        // group key: first two meaningful segments, e.g. "dev/entry", "packages/agent"
        let groupKey: string;
        if (parts[0] === 'packages' && parts.length >= 2) {
            groupKey = parts[1]!; // package name as group
        } else {
            groupKey = parts.slice(0, 2).join('/');
        }
        if (!groups[groupKey]) groups[groupKey] = [];
        // @ts-ignore
        groups[groupKey].push(filePath);
    }

    const indent = '      ';
    let html = '';
    for (const [ group, files ] of Object.entries(groups)) {
        html += `${indent}<div class="group">\n`;
        html += `${indent}  <div class="group-title">${group}</div>\n`;
        html += `${indent}  <ul class="group-list">\n`;
        for (const f of files) {
            const href = f.replace('index.html', '').replace('.html', '');
            // short label: remove common prefix, keep meaningful part
            const parts = f.split('/').filter(Boolean);
            let label: string;
            if (parts[0] === 'packages' && parts.length >= 2) {
                label = parts.slice(2).join('/') || 'index';
            } else {
                label = parts.slice(2).join('/') || parts[parts.length - 1]!;
            }
            label = label.replace('.html', '') || 'index';
            html += `${indent}    <li><a href="${href}"><span class="label">${label}</span><span class="path">${f}</span></a></li>\n`;
        }
        html += `${indent}  </ul>\n`;
        html += `${indent}</div>\n`;
    }
    return html;
}
