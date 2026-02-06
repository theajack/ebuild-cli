import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { getDirname, strToBase64, type IViteBuildConfig } from './utils';

const __dirname = getDirname(import.meta.url);

/**
构建全部
pnpm run build:lib
单个或多个构建
pnpm run build:lib libs/utils,libs/xxx
 */


const Root = path.resolve(__dirname, '../packages');

const args = process.argv.slice(2);

const names = args[0] ? args[0].split(',') : [];

if (names.length === 0) {
    names.push(...fs.readdirSync(Root).filter(item => fs.statSync(path.join(Root, item)).isDirectory()));
}

for (const name of names) {
    console.log('build lib name=', name);
    buildSingleApp(name);
}

function buildSingleApp (dirName: string) {
    const buildConfig: IViteBuildConfig = {
        dirName,
    };
    const cmd = [
        'npx vite build',
        '--config scripts/vite.build-lib.config.ts',
        '--',
        `${strToBase64(JSON.stringify(buildConfig))}`,
    ].join(' ');
    console.log('cmd=', cmd);
    const result = execSync(cmd);
    console.log(result.toString());
}
