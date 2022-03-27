# ebuild-cli

### 🚀 One-click build webpack, babel, eslint, less, commitlint, typescript, vue, react and other development environments

<p>
    <a href="https://www.npmjs.com/package/ebuild-cli"><img src="https://img.shields.io/npm/v/ebuild-cli.svg" alt="Version"></a>
    <a href="https://npmcharts.com/compare/ebuild-cli?minimal=true"><img src="https://img.shields.io/npm/dm/ebuild-cli.svg" alt="Downloads"></a>
    <a href="https://github.com/theajack/ebuild-cli/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/ebuild-cli.svg" alt="License"></a>
    <a href="https://github.com/theajack/ebuild-cli/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/ebuild-cli.svg" alt="TopLang"></a>
    <a href="https://github.com/theajack/ebuild-cli/issues"><img src="https://img.shields.io/github/issues-closed/theajack/ebuild-cli.svg" alt="issue"></a>
</p>

[中文](https://github.com/theajack/ebuild-cli/blob/master/README.cn.md)

## 1. Installation:

```
npm i -g ebuild-cli
```

## 2. Initialization

Run the following command in the directory where you want to create the project

```
ebuild init <project name>

cd <project name>

npm install
```

There are some templates to choose from during the installation process

1. Default mode: including webpack, babel, eslint, commitlint
2. css mode: default mode + css and less support
3. typescript: default mode + ts support
4. npm package version: typescript + less + jest + webpack
5. npm package plus version: typescript + webpack with auto build and toc
6. vue: vue2.x + vue-router + vuex
7. vue3: vue3 + typescript + vue-router4 + vuex4
8. react: react17 + typescript + redux + sass
9. node-es6: node + express + es6 + webpac
10. Original mode: not recommended

----

Additional function: start a development server

```
ebuild run
```

## QA

If you encounter C:\xxx\Roaming\npm\ebuild.ps1 on windos, it is forbidden to run scripts on this system.

Please CMD execute set-ExecutionPolicy RemoteSigned