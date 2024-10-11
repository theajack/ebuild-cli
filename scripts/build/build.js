/*
 * @Author: tackchen
 * @Date: 2022-10-23 20:12:31
 * @Description: Coding something
 */

const execa = require('execa');
const { resolveRootPath } = require('../helper/utils');

async function build () {
    await execa(
        resolveRootPath('node_modules/rollup/dist/bin/rollup'),
        [
            '-c',
            resolveRootPath('scripts/build/rollup.config.js'),
            '--environment',
            [
                `NODE_ENV:production`,
            ],
        ],
        { stdio: 'inherit' },
    );
}

build();


