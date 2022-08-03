/*
 * @Author: tackchen
 * @Date: 2022-08-03 21:32:38
 * @Description: Coding something
 */

const {resolveRootPath, writeStringIntoFile, exec} = require('./utils');

const map = require(resolveRootPath('scripts/ebuild/dependent-graph.json'));

function buildLearnAdd () {
    const addArr = [];
    for (const key in map) {
        const arr = map[key];

        arr.forEach((dep) => {
            addDep(dep, key, (str) => {
                console.log(str);
                addArr.push(str);
            });
        });
    }

    writeStringIntoFile('scripts/ebuild/lerna-add.txt', addArr.join('\n'));
}

async function addDep (dep, key, success) {
    const cmd = `lerna add ${dep} --scope=${key}`;
    await exec(cmd);
    success(`lerna add ${dep} --scope=${key}`);
}

buildLearnAdd();

