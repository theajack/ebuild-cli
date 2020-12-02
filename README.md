# ebuild-cli

### 🚀一键搭建webpack、babel、eslint、less、commitlint、typescript等开发环境

## 1. 安装：

```
npm i -g ebuild-cli
```

## 2. 初始化

在你希望创建项目的目录下运行一下命令

```
ebuild init <项目名称>
```

```
cd <项目名称>
```

```
npm install
```

安装过程中有以下四种模式可供选择

1. 默认模式：包含webpack、babel、eslint、commitlint
2. css模式：默认模式 + css和less支持
3. typescript：默认模式 + ts 支持
4. 原始模式：不推荐

----

附加功能: 启动一个开发服务器

```
ebuild run
```

## QA

如在windos上遇到 C:\xxx\Roaming\npm\ebuild.ps1，因为在此系统上禁止运行脚本。

请CMD执行 set-ExecutionPolicy RemoteSigned