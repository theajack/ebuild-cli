const path = require('path');
// const webpack = require('webpack');
const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules')
    .filter( (catalogue) => {
        return ['.bin'].indexOf(catalogue) === -1;
    })
    .forEach( (mod) => {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/server.js')
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    /* 告知 webpack 为 node 服务，并忽略 externals 中的模块 */
    target: 'node',
    externals: nodeModules,

    /* __dirname 和 __filename 指向原始地址 */
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    }
};