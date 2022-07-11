# ebuild-cli

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

在你希望创建项目的目录下运行一下命令

```
ebuild init <project name>

cd <project name>

npm install
```

安装过程中有以下模板可供选择

1. 默认模式：包含webpack、babel、eslint、commitlint
2. css模式：默认模式 + css和less支持
3. typescript：默认模式 + ts 支持
4. npm包定制版本: typescript + less + jest + webpack
5. npm包定制版本2: typescript + webpack, 自动生成toc和npm目录
6. lerna: lerna monorepo project (typescript + lerna + rollup)
6. vue: vue2.x + vue-router + vuex
7. vue3: vue3 + typescript + vue-router4 + vuex4
8. react: react17 + typescript + redux + sass
9. node-es6: node + express + es6 + webpac
10. 原始模式：不推荐

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

## QA

如在windos上遇到 C:\xxx\Roaming\npm\ebuild.ps1，因为在此系统上禁止运行脚本。

请CMD执行 set-ExecutionPolicy RemoteSigned