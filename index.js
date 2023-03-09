/*
 * @Author: chenzhongsheng
 * @Date: 2022-09-30 23:25:39
 * @Description: Coding something
 */
const {download} = require('./bin/lib/download');
const {run, count, gen} = require('./bin/lib/utils');

// console.log(`
// Ebuild (v${require('./package.json').version})

// ----

// Use the command:
// ebuild init
// ebuild run
// ebuild count
// ebuild gen
// `);

module.exports = {
    init: download,
    run,
    count,
    gen,
};