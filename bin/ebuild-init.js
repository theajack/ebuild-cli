#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const progress = require('log-progress');
const chalk = require('chalk');
const {render} = require('./lib/download');
const download = require('download-git-repo');

const gits = {
    'vite-npm': {
        url: 'github:theajack/ebuild-vite-npm',
        name: 'vite npm project (vite + typescript)',
    },
    'rollup': {
        url: 'github:theajack/ebuild-template-rollup',
        name: 'rollup npm project (typescript + rollup + esbuild)',
    },
    'lerna monorepo': {
        url: 'github:theajack/ebuild-template-lerna',
        name: 'lerna monorepo project (typescript + lerna + rollup)',
    },
    'rollup-node': {
        url: 'github:theajack/ebuild-template-node-npm',
        name: 'rollup nodejs npm project (typescript + rollup + nodejs + esbuild)',
    },
    'vite': {
        url: 'github:theajack/ebuild-vite-vue3',
        name: 'Vite project (vite + vue3 + vue-router + pinia + ts)',
    },
    'webpack': {
        url: 'github:theajack/ebuild-template-light',
        renderPackage: true,
        renderBuild: true,
        name: 'light (Recommended, only pure js + webpack + babel)',
    },
    'webpack css': {
        url: 'github:theajack/ebuild-template-css',
        renderPackage: true,
        renderBuild: true,
        name: 'css (With css and less)',
    },
    'webpack ts': {
        url: 'github:theajack/ts-demo',
        renderPackage: false,
        renderBuild: true,
        name: 'typescript (With typescript)',
    },
    'sener': {
        url: 'github:theajack/sener-best-practice',
        renderPackage: false,
        renderBuild: false,
        name: 'Sener http server project best practices',
    },
    'npm package v2': {
        url: 'github:theajack/npm-ts-template',
        renderPackage: true,
        renderBuild: true,
        name: 'webpack npm package (typescript + webpack)(buildauto)',
    },
    'npm package v1': {
        url: 'github:theajack/ebuild-template-npm',
        renderPackage: false,
        renderBuild: false,
        name: 'webpack npm package (typescript + less + jest + webpack)',
    },
    'alins': {
        url: 'github:alinsjs/ebuild-template-alins',
        renderPackage: true,
        renderBuild: true,
        name: 'alins (alins + vite)',
    },
    'vue': {
        url: 'github:theajack/ebuild-template-vue',
        renderPackage: true,
        renderBuild: true,
        name: 'vue (vue2.x + vue-router + vuex)',
    },
    'vue3': {
        url: 'github:theajack/vue3-ts',
        renderPackage: true,
        renderBuild: true,
        name: 'vue3 (vue3 + typescript + vue-router4 + vuex4)',
    },
    'react-ts': {
        url: 'github:theajack/react-ts',
        renderPackage: false,
        renderBuild: false,
        name: 'react (react17 + typescript + redux + sass)',
    },
    'node-es6': {
        url: 'github:theajack/node-es6-demo',
        renderPackage: false,
        renderBuild: false,
        name: 'node es6 (node + express + es6 + webpack)',
    },
    'origin': {
        url: 'github:theajack/ebuild-template',
        renderPackage: true,
        renderBuild: false,
        name: 'origin (Old version. Not recommended)',
    },
};

const choices = [];

for (const k in gits) {
    choices.push({
        name: gits[k].name,
        value: k
    });
}

const log = require('../lib/log');
const {formatName} = require('../lib/util');
const date = new Date();

/**
 * Settings.
 */

function main () {
    program.usage('<name>');

    program.on('--help', () => {
        log.n('  Examples:');
        log.n();
        log.n(chalk.gray('    # create a new project with an official template'));
        log.n('    $ ebuild init <project-name>');
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


function init (name, url = '') {
    if (name.includes('/')) {
        url = `github:${name}`;
        name = name.substr(name.lastIndexOf('/') + 1);
    }

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

        if (gits[url]) {
            answers.mode = url;
            url = '';
        }

        answers.libName = formatName(answers.name);
        const object = (!url) ? gits[answers.mode] : {
            url,
            renderPackage: true,
            renderBuild: false,
            name,
        };
        downloadProject(answers, object);
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
 *  mode: string,
 *  libName: string,
 * }} answers
 */
function downloadProject (answers, object) {
    log.n();
    start();
    download(object.url, answers.name, err => {
        if (progress.isPause()) {
            progress.start();
        }

        if (object.renderPackage) {
            render('package.json', answers);
        }

        if (object.renderBuild) {
            render(object.buildFilePath || 'webpack-config/build.js', answers);
        }

        if (err) {
            progress.fail('Failed');
            log.n();
            log.red('Project creation failed');
        } else {
            progress.complete('Succeed');
            log.n();
            log.green('Project creation succeed! in ' + (new Date() - date) + ' ms.');
        }
        log.n();
    });
}

main();
 