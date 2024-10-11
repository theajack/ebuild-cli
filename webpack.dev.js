const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
    /* 轮询文件内容 */
        'webpack/hot/poll?1000',
        path.resolve(__dirname, 'src/server.js')
    ],

    output: {
        filename: 'backend.js',
        path: path.resolve(__dirname, 'dist')
    },

    /* 指明编译方式为 node */
    target: 'async-node',

    plugins: [
    /* HMR plugin */
        new webpack.HotModuleReplacementPlugin(),

        /* 当 HMR 替换时在浏览器控制台输出对用户更友好的模块名字信息 */
        new webpack.NamedModulesPlugin()
    ]
};