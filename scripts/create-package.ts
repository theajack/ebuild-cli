/*
 * @Author: tackchen
 * @Date: 2025-11-28 11:07:23
 * @Description: Coding something
 */
import fs from 'fs-extra';
import path from 'path';
import { getDirname } from './utils';

// pnpm create-pkg {dir/pkgName} {dep1,dep2,...}
// pnpm create-pkg libs/utils test

const PREFIX = 'ebuild-';

const root = getDirname(import.meta.url);

const argv = process.argv.slice(2);

const pkgDirName = argv[0];
const deps = (argv[1] || '').split(',');

let pkgName = pkgDirName;
if (pkgDirName?.includes('/')) {
    pkgName = pkgDirName.split('/').pop()!;
}

console.log(
    'create package: ',
    pkgDirName,
    pkgName,
    deps,
);

fs.copySync(path.resolve(root, '../docs/package-template'), `packages/${pkgDirName}`, {
    filter: (src) => {
        if (src.includes('node_modules')) return false;
        return true;
    },
});

const pkg = fs.readJSONSync(`packages/${pkgDirName}/package.json`);
pkg.name = `${PREFIX}-${pkgName}`;
const finalDeps = deps.filter(dep => !!dep);
if (finalDeps.length) {
    pkg.dependencies = finalDeps.reduce((acc: any, dep: string) => {
        acc[`${PREFIX}-${dep}`] = 'workspace:*';
        return acc;
    }, {});
}
fs.writeFileSync(`packages/${pkgDirName}/package.json`, JSON.stringify(pkg, null, 2), 'utf-8');


