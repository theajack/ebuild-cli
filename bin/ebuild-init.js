#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const progress = require('log-progress');
const chalk = require('chalk');
const {renderPkgJson} = require('./lib/utils');
const download = require('download-git-repo');

const gits = {
    'vite-monorepo-2': 'Vite Monorepo 2.0 (vite7 + vue3.5)',
    'vite-monorepo': 'Vite Monorepo (vite + typescript)',
    'vite-vue': 'Vite project (vite + vue3 + vue-router + pinia + ts)',
    'vite-npm': 'vite npm project (vite + typescript)',
    'rollup': 'rollup npm project (typescript + rollup + esbuild)',
    'rollup-node': 'rollup nodejs npm project (typescript + rollup + nodejs + esbuild)',
    'rust-wasm': 'rust wasm project (WebAssembly + Worker + Vite + ts)',
    'lerna-monorepo': 'lerna monorepo project (typescript + lerna + rollup)',
    'react-ts': 'react (react17 + typescript + redux + sass)',
    'sener': 'Sener http server project best practices',
    'alins': 'alins (alins + vite)',
    'node-es6': 'node es6 (node + express + es6 + webpack)',
    'webpack-ts': 'typescript (With typescript)',
    'webpack': 'light (js + webpack + babel)',
};

const choices = [];

for (const k in gits) {
    choices.push({
        name: gits[k],
        value: k
    });
}

const log = require('../lib/log');
const date = new Date();

/**
 * Settings.
 */

function main () {
    program.usage('<name>');

    program.on('--help', () => {
        log.n('  Examples:');
        log.n();
        log.n(chalk.gray('    # create a new project with an template'));
        log.n('    $ ebuild init <project-name> [repo name(github username/repo)]');
        log.n();
        log.n();
    });

    log.n();

    program.parse(process.argv);

    if (program.args.length < 1) {
        return program.help();
    } else {
        init(program.args[0], program.args[1]);
    }
}


function init (name, repo = '') {

    let url = '';
    if (repo) { url = `github:${repo}`;}

    const options = [
        {
            type: 'input',
            name: 'name',
            default: name,
            message: 'Input project name'
        },
        {
            type: 'input',
            name: 'description',
            default: 'Ebuild project',
            message: 'Input description'
        },
        {
            type: 'input',
            name: 'author',
            default: 'author',
            message: 'Input author name'
        }
    ];

    if (!url) {
        options.push({
            type: 'list',
            name: 'mode',
            message: 'Choice mode',
            choices
        });
    }

    inquirer.prompt(options).then(answers => {
        if (!url) {
            url = `github:theajack/ebuild-cli#tpl/${answers.mode}`;
        }
        downloadProject(url, answers);
    });
}

function start () {
    progress.start({
        title: 'Downloading ebuild template.',
        ontick: function (value, percent) {
            if (percent > 90) {
                this.pause(value);
            }
        },
        time: 100,
        total: 199
    });
}
/**
 *
 * @param {{
 *  name: string,
 *  description: string,
 *  author: string,
 * }} answers
 */
function downloadProject (url, answers) {
    log.n();
    start();
    console.log(url,  answers);
    download(url, answers.name, err => {
        if (progress.isPause()) {
            progress.start();
        }

        renderPkgJson(answers);

        if (err) {
            progress.fail('Failed');
            log.n();
            log.red(`Project creation failed: ${err.toString()}`);
        } else {
            progress.complete('Succeed');
            log.n();
            log.green('Project creation succeed! in ' + (new Date() - date) + ' ms.');
        }
        log.n();
    });
}

main();
 