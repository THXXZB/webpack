# webpack
[学习视频](https://www.bilibili.com/video/BV1YU4y1g745)

## webpack 基础配置 study-demo

## package.json 
- 该文件中 "main": "index.js" 默认会去找 src 目录下的 index.js 文件

## 仅在项目中安装 webpack，打包命令：npx webpack (安装 npm 后可使用 npx); 全局安装 webpack 可直接使用 webpack 命令

- npx webpack --watch 实时更新编译

## htmlWebpackPlugin 
- 自动引入资源插件，此时打包的文件夹会多加一个 index.html 文件

## webpack-dev-server 
- 提供一个基本的 web server(默认运行 8080)，并且具有 live reloading 实时重新加载功能， 运行命令：npx webpack serve || npx webpack-dev-server 

## AssetModule资源模块
- 支持 webpack 打包其他资源文件，如字体图标文件等(使用AssetModuless可以接收并加载任何文件，然后将其输出到构建目录)；assetModuleType资源模块类型有四种：asset/resource, asset/inline, asset/source, asset

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

### 防止重复
- 使用Entry dependencies或者SplitChunksPlugin 去重和分离代码

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
- webpack开箱即用的terser-webpack-plugin js文件压缩插件未生效，因为配置了css压缩(CssMiniMizerPlugin)所以需要单独配置terser-webpack-plugin
### 拆分配置文件
- 背景：在一个文件区分两者的配置需要大量的判断，为了简化配置，分别使用
- 指定配置文件打包：npx webpack -c ./config/webpack.config.dev.js(开发环境)，打包完成后会在config文件夹下生成dist打包文件夹，需将output.path配置中的'./dist'改为'../dist'
- 启动webpack-dev-server服务：npx webpack serve -c ./config/webpack.config.dev.js

## npm 脚本
- 目的：简化输入命令
- 方式：在当前目录下新建一个独享的package.json并完成相关配置(study-demo目录下的package.json是所有子目录共享的)
  
## 提取公共配置
- 创建webpack.config.common.js，将开发和生成环境配置中相同部分提取放置到webpack.config.common.js
- 合并配置：创建webpack.config.js通过webpack-merge分别深合并开发和生成环境的配置同时需要修改npm脚本指定运行文件为webpack.config.js并写明相应环境



## 高级应用 study2-demo

## source-map

### 7种SourceMap模式
区别：是否eval()，是否生成一个SourceM文件，是否有dataUrl类型的SourceMap注释，是否可以精准定位到源文件，SourceMap文件是否记录列信息，SourceMap文件是否包含loader
#### eval (默认)
每个module会通过eval()来执行，并且会在末尾追加注释 //# sourceURL，可以精准定位到源文件具体位置
#### source-map
在末尾追加注释//# sourceMappingURL，同时会生成一个SourceMap文件，这个文件记录源代码的完整信息(包含行信息和列信息)，不包含loader，可以精准定位到源文件具体位置
#### hidden-source-map
和source-map一样，但不会在bundle末尾追加注释，也无法定位到源文件具体位置
#### inline-source-map
生成一个DataUrl形式的sourceMappingURL并以注释的形式存在于打包的js文件中，不会生成SourceMap文件，可以精准定位到源文件具体位置
#### eval-source-map
跟eval模式一样每个module会通过eval()来执行，并且会在末尾追加一个DataUrl形式的SourceMap注释,可以精准定位到源文件具体位置
#### cheap-source-map
生成一个没有列信息(column-mappings)的SourceMap文件，不包含loader的sourcemap(如：babel的sourcemap)。
即：跟source-map相似，可以精准定位到源文件具体位置，也会生成一个SourceMap文件，SourceMap文件也不包含loader，但这个文件没有记录源代码的列信息(列信息有时无需记录)，可已减小sourceMap文件的大小。
缺陷：使用其他loader(第三方库)时可能无法精确定位到源文件的具体行数，与源码的行数会有偏差
#### cheap-module-source-map (推荐)
生成一个没有列信息的SourceMap文件，同时loader的sourcemap也被简化为只包含对应行的
即：跟cheap-source-map基本一致，但生成的sourceMap文件包含了loader，弥补了cheap-source-map的缺陷，即使使用了module也可以精确定位到源码的具体位置

### 生产环境不开启source-map的原因
- 通过bundle和sourcemap文件，可以反编译出源码————也就意味着有暴露源码的风险
- sourceMap文件体积巨大，这与生产环境的追求相悖(生产环境追求更小更轻量的bundle)


## webpack-dev-server
### historyApiFallback
如果是SPA单页应用，当路由到/some等其他地址时(在导航栏直接输入)，浏览器会把这个路由当做静态资源的地址去请求，控制台会报错404，需要配置historyApiFallback来提供页面代替任何404的静态资源响应
### 开发服务器主机
当在开发环境中启动了一个devServer服务，并希望局域网内的其他人可以访问到，可以通过配置devServer.host来实现


## 模块热替换和热加载HMR
### 模块热替换
模块热替换(HMR-hot module replacement)功能会在应用程序运行过程中，替换、添加或删除模块，而无需重新加载整个页面，开启热加载只需配置devServer.hot为true即可，若要相应的js热替换还需在引入的文件中进行以下判断
![image](./study2-demo/01-dev-config/images/HMR.png)
注意：

### 热加载
文件更新时，自动刷新服务和页面，新版的webpack-dev-server默认开启热加载功能，对应的参数是devServer.liveReload(默认为true)。注意若想关闭热加载，除了将liveReload设置为false以外，还要关闭hot
