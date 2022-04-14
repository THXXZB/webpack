// 自定义webpack 打包配置文件，当前文件是webpack自动读取的，文件名不可更改

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 定义配置对象
module.exports = {
    // 指定入口文件
    entry: './src/index.js',

    // 指定出口文件
    output: {
        filename: 'bundle.js',
        // path: './dist' X   // 需要是绝对路径
        path: path.resolve(__dirname, './dist'),
        // 清理dist文件夹中上一次打包的残留文件
        clean: true
    },

    mode: 'none',   // 模式

    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',  // 按src中的index.html为模板生成html文件(可生成指定title的html文件)
            filename: 'app.html',  // 生成的html文件的文件名
            inject: 'body',  // 自动引入的js文件放在body标签内部
        })
        
    ]
}
