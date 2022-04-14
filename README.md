# webpack

webpack 入门

## package.json 文件中 "main": "index.js" 默认会去找 src 目录下的 index.js 文件

## 仅在项目中安装 webpack，打包命令：npx webpack (安装 npm 后可使用 npx); 全局安装 webpack 可直接使用 webpack 命令

- npx webpack --watch 实时更新编译

## htmlWebpackPlugin 自动引入资源插件，此时打包的文件夹会多加一个 index.html 文件

## webpack-dev-server 提供一个基本的 web server(默认运行 8080)，并且具有 live reloading 实时重新加载功能

## AssetModule资源模块，支持 webpack 打包其他资源文件，如字体图标文件等(使用AssetModuless可以接收并加载任何文件，然后将其输出到构建目录)；asset module type 资源模块类型有四种：asset/resource, asset/inline, asset/source, asset

- webpack4 的时候以及之前，通常是使用 file-loader和url-loader 来帮助我们加载其他资源类型。

- asset/resource:可以发送一个单独的文件并导出 url （原：file-loader）
  resource会在dist文件夹中打包出资源文件
- asset/inline: 导出data URI  （原：url-loader）
- asset/source: 导出资源源代码  （原：raw-loader）
- asset(通用资源类型):在导出data URI和发送一个单独的文件之间自动选择，即在asset/inline和asset/resource之间自动选择 （原：url-loader + 配置资源体积限制）

## css 加载抽离压缩
- 加载：style-loader\css-loader\less-loader
- 抽离：mini-css-extract-plugin（该插件基于webpack5构建），css文件抽离成一个单独的文件(默认是main.css)
- 压缩：css-minimizer-webpack-plugin，便于在生产环境中节省加载时间

## font 字体加载
- 使用资源模块asset/resource加载本地的字体文件

## 加载数据文件（如JSON、CSV、TSV和XML文件）
- json文件是内置的，默认可正常加载
- CSV、TSV和XML需要使用csv-loader和xml-loader来加载

## babel-loader 将js文件中的ES6代码转换成ES5代码（若浏览器支持es6，无需bel-loader也能正常运行）
- babel-loader: 在webpack里应用babel解析ES6的桥梁
- @babel/core: babel核心模块
- @babel/preset-env: babel预设，一组babel插件的集合
- 发现报错：Uncaught ReferenceError:regeneratorRuntime is not defined；regeneratorRuntime是webpack打包生成的全局辅助函数，由babel生成，用于兼容async/await的语法；
- 解决方法：安装并配置插件@babel/runtime 和 @babel/plugin-transform-runtime

## 代码分离
- 代码分离可以将代码分离到不同的bundle（打包分离出来的文件）中，然后通过按需加载或并行加载来运行项目。代码分离可以让用户获取更小的bundle并控制资源加载的优先级，合理使用代码分离可以极大的影响到加载时间，常用的代码分离有三种：入口起点、防止重复、动态导入
### 入口起点：使用entry配置手动地分离代码
- 存在问题：若存在多个入口，那不同入口共享的文件会在各自的包里面重复打包

### 防止重复：使用Entry dependencies或者SplitChunksPlugin 去重和分离代码

### 动态导入：通过模块的内联函数来分离代码
- import (lodash) 动态导入lodash模块
#### 动态导入应用场景：懒加载、预获取/预加载
- 懒加载: 当用户进行某些操作(如点击按钮)后再加载相应模块，好处是加快应用的初始加载速度，减轻总体体积
- webpack v4.6.0+增加了对预获取和预加载的支持，在声明import时，
  使用内置指令让webpack输出'resource hint(资源提示)'，来告知浏览器：
  1.prefetch(预获取)：将来某些导航下可能需要的资源，优于懒加载的地方就是会指示浏览器加载完其他资源空闲时再去加载指定预获取的文件，打包文件会生成<link rel="prefetch" href="xxx.js">并追加到html文件头部
  2.preload(预加载)：当前导航下可能需要的资源，可实现页面模块的并行加载 


## 缓存
- 配置文件名，每次文件修改后文件名更新，根据浏览器缓存特性通过判断文件名前后是否一致决定是使用缓存还是重新请求

## 拆分开发环境和生成环境配置
- 背景：许多配置在生产和开发环境中存在不一致的情况。比如开发环境无需配置缓存，而生产环境需要配置公共路径
- 命令行手动输入相应环境，mode动态配置，如：npx webpack --env production
- terser-webpack-plugin js文件压缩插件

