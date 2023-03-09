/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-07 09:11:28
 * @Description: Coding something
 */
const downloadGit = require('download-git-repo');
const fs = require('fs');
const handlebars = require('handlebars');

function download (url, {
    name = '',
    description = '',
    author = '',
} = {}) {
    return new Promise(function (resolve, reject) {
        name = name || url.substr(url.lastIndexOf('/') + 1);
        // console.log(name, url);
        downloadGit(`github:${url}`, name, err => {
            // console.log('done');
            render('package.json', {
                name,
                description,
                author
            });
            if (err) {
                reject(err);
            } else {
                resolve('done');
            }
        });
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
function render (file, answers) {
    try {
        const fileName = answers.name + '/' + file;
        const content = fs.readFileSync(fileName).toString();
        const result = handlebars.compile(content)(answers);
        fs.writeFileSync(fileName, result);
    } catch (err) {
        
    }
}

module.exports = {
    download,
    render,
};