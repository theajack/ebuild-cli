// const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');
const {writeJsonIntoFile} = require('../scripts/eb-bin/utils');
 

function main () {
    const currentPath = process.cwd();

    const binPath = __dirname;

    console.log(binPath, currentPath);

    copydir.sync(
        path.resolve(binPath, '../scripts/.github'),
        path.resolve(currentPath, './.github'),
    );

    copydir.sync(
        path.resolve(binPath, '../scripts/eb-bin'),
        path.resolve(currentPath, './scripts/ebuild'),
    );
      
    const pkg = require(path.resolve(currentPath, './package.json'));

    if (!pkg) pkg.scripts = {};

    pkg.scripts['eb:build'] = 'node ./scripts/ebuild/build.js';
    pkg.scripts['eb:docs'] = 'node ./scripts/ebuild/build-docs.js';
    pkg.scripts['eb:release'] = 'node ./scripts/ebuild/push-release.js';
    pkg.scripts['eb:publish'] = 'node ./scripts/ebuild/publish.js';
    pkg.scripts['eb:purge'] = 'node ./scripts/ebuild/purge-cdn.js';
    pkg.scripts['eb:mono-init-pkg'] = 'node ./scripts/ebuild/init-packages-info.js';
    pkg.scripts['eb:mono-init-pkg-dev'] = 'node ./scripts/ebuild/init-packages-info.js dev';
    pkg.scripts['eb:mono-dep'] = 'node ./scripts/ebuild/init-learn-dep.js';

    writeJsonIntoFile(pkg, path.resolve(currentPath, './package.json'));
}

main();
