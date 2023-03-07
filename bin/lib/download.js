/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-07 09:11:28
 * @Description: Coding something
 */
const progress = require('log-progress');

/**
 * @typedef {{
*  name: string,
*  description: string,
*  author: string,
*  mode: string,
*  libName: string,
* }} Answer
 */

/**
 * 
 * @param {Answer} answers 
*/
function downloadProject (url, answers) {
   log.n();
   start();
   const object = gits[answers.mode];
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
   const fileName = answers.name + '/' + file;
   const content = fs.readFileSync(fileName).toString();
   const result = handlebars.compile(content)(answers);
   fs.writeFileSync(fileName, result);
}

module.exports = {
    download,
    render,
}