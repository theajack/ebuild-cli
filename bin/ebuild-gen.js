// const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');
const {writeJsonIntoFile} = require('../scripts/eb-bin/utils');
 

function main () {
    const currentPath = process.cwd();

    const binPath = __dirname;

    console.log(binPath, currentPath);

    copydir.sync(
        path.resolve(binPath, '../scripts/github-workflow/eb-docs.yml'),
        path.resolve(binPath, './.github/workflows'),
    );

    copydir.sync(
        path.resolve(binPath, '../scripts/github-workflow/eb-release.yml'),
        path.resolve(binPath, './.github/workflows'),
    );

    copydir.sync(
        path.resolve(binPath, '../scripts/github-workflow/release-drafter.yml'),
        path.resolve(binPath, './.github'),
    );

    copydir.sync(
        path.resolve(binPath, '../scripts/eb-bin'),
        path.resolve(binPath, './scripts'),
    );

      
    const pkg = require(path.resolve(currentPath, './package.json'));

    if (!pkg) pkg.scripts = {};

    pkg.scripts['eb:build'] = 'node ./scripts/eb-bin/build.js';
    pkg.scripts['eb:docs'] = 'node ./scripts/eb-bin/build-docs.js';
    pkg.scripts['eb:release'] = 'node ./scripts/eb-bin/push-release.js';
    pkg.scripts['eb:publish'] = 'node ./scripts/eb-bin/publish.js';
    pkg.scripts['eb:purge'] = 'node ./scripts/eb-bin/purge-cdn.js';
    pkg.scripts['eb:mono-init-pkg'] = 'node ./scripts/eb-bin/init-packages-info.js';
    pkg.scripts['eb:mono-init-pkg-dev'] = 'node ./scripts/eb-bin/init-packages-info.js dev';
    pkg.scripts['eb:mono-dep'] = 'node ./scripts/eb-bin/init-learn-dep.js';

    writeJsonIntoFile(pkg, path.resolve(currentPath, './package.json'));
}

main();
