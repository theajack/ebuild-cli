/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-09 07:49:16
 * @Description: Coding something
 */
const path = require('path');
const copydir = require('copy-dir');
const {writeJsonIntoFile} = require('../../scripts/scripts/ebuild/utils');
const count = require('count-code-line');

const server = require('lite-server');
const pkg = require('../../lib/getPackage');
const execSync = require('child_process').execSync;

function gen () {
    const currentPath = process.cwd();

    const binPath = __dirname;

    console.log(binPath, currentPath);

    copydir.sync(
        path.resolve(binPath, '../../scripts/.github'),
        path.resolve(currentPath, './.github'),
    );

    copydir.sync(
        path.resolve(binPath, '../../scripts/scripts'),
        path.resolve(currentPath, './scripts'),
    );
      
    const pkg = require(path.resolve(currentPath, './package.json'));

    if (!pkg.scripts) pkg.scripts = {};

    pkg.scripts['eb:build'] = 'node ./scripts/ebuild/build.js';
    pkg.scripts['eb:docs'] = 'node ./scripts/ebuild/build-docs.js';
    pkg.scripts['eb:release'] = 'node ./scripts/ebuild/push-release.js';
    pkg.scripts['eb:publish'] = 'node ./scripts/ebuild/publish.js';
    pkg.scripts['eb:purge'] = 'node ./scripts/ebuild/purge-cdn.js';
    pkg.scripts['eb:mono-init-pkg'] = 'node ./scripts/ebuild/init-packages-info.js';
    pkg.scripts['eb:mono-init-pkg-dev'] = 'node ./scripts/ebuild/init-packages-info.js dev';
    pkg.scripts['eb:mono-dep'] = 'node ./scripts/ebuild/init-learn-dep.js';

    writeJsonIntoFile(path.resolve(currentPath, './package.json', pkg));
}

function run () {
    try {
        if (pkg.scripts.dev) {
            execSync('npm run dev');
        } else {
            server.server();
        }
    } catch (err) {
        server.server();
    }
}

const fs = require('fs');

/**
 *
 * @param {{
*  name: string,
*  description: string,
*  author: string,
* }} answers
*/
function renderPkgJson (answers) {
    try {
        const fileName = answers.name + '/package.json';
        const json = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        Object.assign(json, {
            name: answers.name,
            description: answers.description,
            author: answers.author,
        });
        fs.writeFileSync(fileName, JSON.stringify(json, null, 4), 'utf-8');
    } catch (err) {
        
    }
}

module.exports = {
    renderPkgJson,
    gen,
    count,
    run
};