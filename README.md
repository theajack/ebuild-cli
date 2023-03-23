<!--
  * @Author: tackchen
  * @Date: 2022-09-30 23:25:39
  * @Description: Coding something
-->
# [ebuild-cli](https://github.com/theajack/ebuild-cli)

### 🚀 Build webpack, babel, eslint, less, commitlint, typescript, vue, react, lerna and other development environments with one click

<p>
     <a href="https://www.npmjs.com/package/ebuild-cli"><img src="https://img.shields.io/npm/v/ebuild-cli.svg" alt=" Version"></a>
     <a href="https://npmcharts.com/compare/ebuild-cli?minimal=true"><img src="https://img.shields.io/npm/dm/ebuild-cli.svg" alt ="Downloads"></a>
     <a href="https://github.com/theajack/ebuild-cli/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/ebuild-cli.svg " alt="License"></a>
     <a href="https://github.com/theajack/ebuild-cli/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/ebuild-cli.svg" alt="TopLang"></a>
     <a href="https://github.com/theajack/ebuild-cli/issues"><img src="https://img.shields.io/github/issues-closed/theajack/ebuild-cli.svg " alt="issue"></a>
</p>

[English](https://github.com/theajack/ebuild-cli/blob/master/README.md)

## 1. Installation:

```
npm i -g ebuild-cli
```

## 2. Initialization

### 2.1 Using built-in templates

Run the command in the directory where you want to create the project

```
ebuild init <project name>

cd <project name>

npm install
```

The following templates are available for selection during installation

1. rollup: rollup npm project (ts + rollup + esbuild + github workflow)
2. lerna: lerna monorepo project (typescript + lerna + rollup)
3. webpack: Contains webpack, babel, eslint, commitlint
4. webpack css mode: default mode + css and less support
5. webpack typescript: default mode + ts support
6. sener: the best practice of sener-based http service
7. Npm package customization version 2: typescript + webpack, automatically generate toc and npm directories
8. Customized version of npm package: typescript + less + jest + webpack
9. vue: vue2.x + vue-router + vuex
10. vue3: vue3 + typescript + vue-router4 + vuex4
11. react: react17 + typescript + redux + sass
12. node-es6: node + express + es6 + webpac
13. Raw mode: not recommended

### 2.1 Using the github repository

```
ebuild init user/repo
cd repo
```

like:

```
ebuild init theajack/ebuild-cli
```

## 3. ebuild run

Start a development server

```
ebuild run
```

## 4. ebuild count

Count current project lines of code

```
ebuild count
```

For usage details and configuration files, please refer to [count-code-line](https://github.com/theajack/count-code-line)

## 5. ebuild gen

Generate some tools in the current project

## 6. npm installation and use

```
npm i ebuild-cli
```

```js
const {init, run, count, gen} = require('ebuild-cli');
```

### 6.1 init

The init method only supports github repositories, and the second parameter is optional

```js
init('theajack/ebuild-cli');

init('theajack/ebuild-cli', {
     name: '',
     description: '',
     author: '',
});
```

### 6.2 run

```js
run();
```

### 6.3 count

```js
count();
count({
     //...
});
```

For usage details and configuration files, please refer to [count-code-line](https://github.com/theajack/count-code-line)

### 6.4 gen

```js
gen();
```

## QA

For example, C:\xxx\Roaming\npm\ebuild.ps1 is encountered on windos, because running scripts is prohibited on this system.

Please CMD execute set-ExecutionPolicy RemoteSigned