#!/usr/bin/env node

const server = require('lite-server');
const log = require('../lib/log');
const pkg = require('../lib/getPackage');
const execSync = require('child_process').execSync;

function runHttpServer () {
    log.n();
    log.green('--Running http server ...');
    server.server();
    log.n();
}

function main () {
    try {
        if (pkg.scripts.dev) {
            log.n();
            log.green(`--Running EBuild project ${pkg.name}...`);
            execSync('npm run dev');
        } else {
            runHttpServer();
        }
    } catch (err) {
        runHttpServer();
    }
}

main();


