#!/usr/bin/env node

const program = require('commander')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const progress = require('log-progress')
const fs = require('fs')
const chalk = require('chalk')

const gits = {
  'def': {
    url: 'github:theajack/ebuild-template-light',
    renderPackage: true,
    renderBuild: true,
    name: 'light (Recommended, only pure js + webpack + babel)',
  },
  'css': {
    url: 'github:theajack/ebuild-template-css',
    renderPackage: true,
    renderBuild: true,
    name: 'css (With css and less)',
  },
  'ts': {
    url: 'github:theajack/ts-demo',
    renderPackage: false,
    renderBuild: true,
    name: 'typescript (With typescript)',
  },
  'npm package': {
    url: 'github:theajack/ebuild-template-npm',
    renderPackage: false,
    renderBuild: false,
    name: 'npm package (typescript + less + jest + webpack)',
  },
  'npm package plus': {
    url: 'github:theajack/npm-ts-template',
    renderPackage: true,
    renderBuild: true,
    name: 'npm package (typescript + webpack)(buildauto)',
  },
  'vue': {
    url: 'github:theajack/ebuild-template-vue',
    renderPackage: true,
    renderBuild: true,
    name: 'vue (vue2.x + vue-router + vuex)',
  },
  'vue3': {
    url: 'https://github.com/theajack/vue3-ts',
    renderPackage: true,
    renderBuild: true,
    name: 'vue3 (vue3 + typescript + vue-router4 + vuex4)',
  },
  'react-ts': {
    url: 'github:theajack/react-ts',
    renderPackage: false,
    renderBuild: false,
    name: 'react (react17 + typescript + redux + sass)',
  },
  'node-es6': {
    url: 'github:theajack/node-es6-demo',
    renderPackage: false,
    renderBuild: false,
    name: 'node es6 (node + express + es6 + webpack)',
  },
  'origin': {
    url: 'github:theajack/ebuild-template',
    renderPackage: true,
    renderBuild: false,
    name: 'origin (Old version. Not recommended)',
  },
}

const choices = []

for(let k in gits){
  choices.push({
    name: gits[k].name,
    value: k
  })
}

const log = require('../lib/log')
const {formatName} = require('../lib/util')
let date = new Date() 

/** 
 * Settings.
 */

function main() {
program.usage('<name>')

program.on('--help', () => {
  log.n('  Examples:')
  log.n()
  log.n(chalk.gray('    # create a new project with an official template'))
  log.n('    $ ebuild init <project-name>')
  log.n()
  log.n()
})

log.n()

program.parse(process.argv)

if (program.args.length < 1) {
  return program.help()
} else {
  init(program.args[0])
}
}

function start() {
progress.start({
  title: 'Downloading ebuild template.',
  ontick: function(value, percent) {
    if (percent > 90) {
      this.pause(value)
    }
  },
  time: 100,
  total: 199
})
}

function init(name) {
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      default: name,
      message: 'Input project name'
    },
    {
      type: 'input',
      name: 'description',
      default: 'Ebuild project',
      message: 'Input description'
    },
    {
      type: 'input',
      name: 'author',
      default: 'author',
      message: 'Input author name'
    },
    {
      type: 'list',
      name: 'mode',
      message: 'Choice mode',
      choices
    }
  ])
  .then(answers => {
    answers.libName = formatName(answers.name);
    downloadProject(answers)
  })
}

function downloadProject(answers) {
  log.n()
  start()
  let object = gits[answers.mode]
  download(object.url, answers.name, err => {
    if (progress.isPause()) {
      progress.start()
    }

    if(object.renderPackage){
      render('package.json', answers);
    }

    if(object.renderBuild){
      render(object.buildFilePath || 'webpack-config/build.js', answers);
    }

    if (err) {
      progress.fail('Failed')
      log.n()
      log.red('Project creation failed')
    } else {
      progress.complete('Succeed')
      log.n()
      log.green('Project creation succeed! in ' + (new Date() - date) + ' ms.')
    }
    log.n()
  })
}

function render(file, answers){
const fileName = answers.name + '/' + file
const content = fs.readFileSync(fileName).toString()
const result = handlebars.compile(content)(answers)
fs.writeFileSync(fileName, result)
}

main()
