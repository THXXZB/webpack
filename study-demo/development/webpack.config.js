// 当前目录没有安装webpack的时候会向上查找依赖，此处找到study-demo中安装的webpack
// 然后根据当前文件夹中的webpack.config.js文件进行打包

// 自定义webpack 打包配置文件，当前文件是webpack自动读取的，文件名不可更改

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 定义配置对象
module.exports = {
    // 指定入口文件
    entry: './src/index.js',

    // 指定出口文件
    output: {
        filename: 'index.js',
        // path: './dist' X   // 需要是绝对路径
        path: path.resolve(__dirname, './dist'),
        // 清理dist文件夹中上一次打包的残留文件
        clean: true
    },

    mode: 'development',   // 开发模式

    devtool: 'inline-source-map',  // 编译代码映射回源代码(开发代码)，调试时可精准定位到报错的开发源代码而非编译后的代码

    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',  // 按src中的iwenndex.html为模板生成html文件(可生成指定title的html文件)
            filename: 'development.html',  // 生成的html文件的文件名
            inject: 'body',  // 自动引入的js文件放在body标签内部
        })
    ],

    // 热更新；webpack-dev-server配置
    devServer: {
        static: './dist' // 告知dev server将dist目录下的文件作为web服务的根目录
    },
}
