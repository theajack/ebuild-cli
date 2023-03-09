<!--
 * @Author: tackchen
 * @Date: 2022-09-30 23:25:39
 * @Description: Coding something
-->
# [ebuild-cli](https://github.com/theajack/ebuild-cli)

### 🚀一键搭建webpack、babel、eslint、less、commitlint、typescript、vue、react、lerna等开发环境

<p>
    <a href="https://www.npmjs.com/package/ebuild-cli"><img src="https://img.shields.io/npm/v/ebuild-cli.svg" alt="Version"></a>
    <a href="https://npmcharts.com/compare/ebuild-cli?minimal=true"><img src="https://img.shields.io/npm/dm/ebuild-cli.svg" alt="Downloads"></a>
    <a href="https://github.com/theajack/ebuild-cli/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/ebuild-cli.svg" alt="License"></a>
    <a href="https://github.com/theajack/ebuild-cli/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/ebuild-cli.svg" alt="TopLang"></a>
    <a href="https://github.com/theajack/ebuild-cli/issues"><img src="https://img.shields.io/github/issues-closed/theajack/ebuild-cli.svg" alt="issue"></a>
</p>

[English](https://github.com/theajack/ebuild-cli/blob/master/README.md)

## 1. 安装：

```
npm i -g ebuild-cli
```

## 2. 初始化

### 2.1 使用内置模板

在你希望创建项目的目录下运行一下命令

```
ebuild init <project name>

cd <project name>

npm install
```

安装过程中有以下模板可供选择

1. rollup: rollup npm project (ts + rollup + esbuild + github workflow)
2. lerna: lerna monorepo project (typescript + lerna + rollup)
3. webpack: 包含webpack、babel、eslint、commitlint
4. webpack css模式：默认模式 + css和less支持
5. webpack typescript：默认模式 + ts 支持
6. sener: 基于sener的http 服务其最佳实践
7. npm包定制版本2: typescript + webpack, 自动生成toc和npm目录
8. npm包定制版本: typescript + less + jest + webpack
9. vue: vue2.x + vue-router + vuex
10. vue3: vue3 + typescript + vue-router4 + vuex4
11. react: react17 + typescript + redux + sass
12. node-es6: node + express + es6 + webpac
13. 原始模式：不推荐

### 2.1 使用github仓库

```
ebuild init user/repo
cd repo
```

如：

```
ebuild init theajack/ebuild-cli
```

## 3. ebuild run

启动一个开发服务器

```
ebuild run
```

## 4. ebuild count

计算当前项目代码行

```
ebuild count
```

使用详情与配置文件请参考 [count-code-line](https://github.com/theajack/count-code-line)

## 5. ebuild gen

在当前项目生成一些工具

## 6. npm 安装使用

```
npm i ebuild-cli
```

```js
const {init, run, count, gen} = require('ebuild-cli');
```

### 6.1 init

init 方法只支持github仓库，第二参数为可选参数

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

使用详情与配置文件请参考 [count-code-line](https://github.com/theajack/count-code-line)

### 6.4 gen

```js
gen();
```

## QA

如在windos上遇到 C:\xxx\Roaming\npm\ebuild.ps1，因为在此系统上禁止运行脚本。

请CMD执行 set-ExecutionPolicy RemoteSigned