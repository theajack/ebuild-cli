/*
 * @Author: chenzhongsheng
 * @Date: 2024-07-01 16:32:04
 * @Description: Coding something
 */
const fs = require('fs');
const path = require('path');

function main () {
    const data = fs.readFileSync(path.resolve(__dirname, './pkg/ebuild_wasm_bg.wasm'));
    const base64 = data.toString('base64');
    fs.writeFileSync(path.resolve(__dirname, './lib/ebuild_wasm_bg.min.js'), `export default \`${base64}\``, 'utf8');
}

main();