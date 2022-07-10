/*
 * @Author: tackchen
 * @Date: 2022-04-06 09:14:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-10 16:02:13
 * @FilePath: /cnchar/helper/push-release.js
 * @Description: Coding something
 */

const {exec} = require('../eb-utils');

async function delTag (tagName) {
    await exec(`git tag -d ${tagName}`);
    await exec(`git push origin :refs/tags/${tagName}`);
}

// 版本发布 del 表示需要覆盖上一个版本 一般不需要
// node ./helper/push-tag.js vx.x.x
// node ./helper/push-tag.js vx.x.x no-del
 
// npm run release -- vx.x.x
// npm run release -- vx.x.x no-del

async function main () {
    const argv = process.argv[2];
    const tagName = argv[0] || 'v1.0.0';
    if (argv[1] !== 'no-del') {
        console.log(`Start delete tag ${tagName}...`);
        await delTag(tagName);
    }
    console.log(`Start create tag ${tagName}...`);
    await exec(`git tag -m "version ${tagName}" ${tagName} master`);
    console.log(`Start push tag ${tagName}...`);
    await exec('git push --tags');
    console.log('Finished!');
}

main();