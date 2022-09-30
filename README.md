<!--
 * @Author: tackchen
 * @Date: 2022-09-30 23:25:39
 * @Description: Coding something
-->
# ebuild-cli

### 🚀 One-click to build development environments such as webpack, babel, eslint, less, commitlint, typescript, vue, react, lerna etc.

<p>
    <a href="https://www.npmjs.com/package/ebuild-cli"><img src="https://img.shields.io/npm/v/ebuild-cli.svg" alt=" Version"></a>
    <a href="https://npmcharts.com/compare/ebuild-cli?minimal=true"><img src="https://img.shields.io/npm/dm/ebuild-cli.svg" alt ="Downloads"></a>
    <a href="https://github.com/theajack/ebuild-cli/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/ebuild-cli.svg " alt="License"></a>
    <a href="https://github.com/theajack/ebuild-cli/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/ebuild -cli.svg" alt="TopLang"></a>
    <a href="https://github.com/theajack/ebuild-cli/issues"><img src="https://img.shields.io/github/issues-closed/theajack/ebuild-cli.svg " alt="issue"></a>
</p>

[English](https://github.com/theajack/ebuild-cli/blob/master/README.md)

## 1. Install:

````
npm i -g ebuild-cli
````

## 2. Initialize

Run the command in the directory where you want to create the project

````
ebuild init <project name>

cd <project name>

npm install
````

The following templates are available during installation

1. Default mode: includes webpack, babel, eslint, commitlint
2. css mode: default mode + css and less support
3. typescript: default mode + ts support
4. Custom version of npm package: typescript + less + jest + webpack
5. npm package customization version 2: typescript + webpack, automatically generate toc and npm directories
6. lerna: lerna monorepo project (typescript + lerna + rollup)
7. rollup: rollup npm project (ts + rollup + esbuild + github workflow)
8. vue: vue2.x + vue-router + vuex
9. vue3: vue3 + typescript + vue-router4 + vuex4
10. react: react17 + typescript + redux + sass
11. node-es6: node + express + es6 + webpac
12. Raw mode: Not recommended

## 3. ebuild run

Start a development server

````
ebuild run
````

## 4. ebuild count

Calculate the current project line of code

````
ebuild count
````

For usage details and configuration files, please refer to [count-code-line](https://github.com/theajack/count-code-line)

## 5. ebuild gen

Generate some tools in the current project

##QA

Such as encountering C:\xxx\Roaming\npm\ebuild.ps1 on windos, because running scripts is forbidden on this system.

Please CMD execute set-ExecutionPolicy RemoteSigned