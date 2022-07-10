#!/usr/bin/env node

require('commander')
    .version(require('../package').version)
    .usage('<command> [options]')
    .command('init', '初始化项目')
    .command('run', '在当前目录启动一个lite-server服务器')
    .command('count', '计算当前目录代码行数')
    .command('gen', '生成工具包')
    .parse(process.argv);


