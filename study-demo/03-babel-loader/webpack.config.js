// 当前目录没有安装webpack的时候会向上查找依赖，此处找到study-demo中安装的webpack
// 然后根据当前文件夹中的webpack.config.js文件进行打包

// 自定义webpack 打包配置文件，当前文件是webpack自动读取的，文件名不可更改

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

const toml = require('toml')
const yaml = require('yaml')
const json5 = require('json5')

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
        clean: true,
        assetModuleFilename: 'images/[contenthash][ext].png',   // 配置资源文件打包地址，contenthash:根据文件内容生成hash值作为文件名，ext:扩展名
    },

    mode: 'development',   // 模式: development(开发模式)，production(发布模式)

    devtool: 'inline-source-map',  // 编译代码映射回源代码(开发代码)，调试时可精准定位到报错的开发源代码而非编译后的代码

    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',  // 按src中的index.html为模板生成html文件(可生成指定title的html文件)
            filename: 'assetModule.html',  // 生成的html文件的文件名
            inject: 'body',  // 自动引入的js文件放在body标签内部
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[contenthash].css'   // 自定义文件名
        })
    ],

    // 优化配置
    optimization: {
        minimizer: [
            // new CssMinimizerWebpackPlugin()   // 需要将mode设置为production
        ]
    },

    // 热更新；webpack-dev-server配置
    devServer: {
        static: './dist' // 告知dev server将dist目录下的文件作为web服务的根目录
    },

    // 资源模块
    module: {
        rules: [{
            test: /\.png$/,   // 加载文件的类型
            type: 'asset/resource',   // 导出url，以前通过file-loader实现
            generator: {    // generator的优先级比output中assetModuleFilename的优先级高
                filename: 'images/tt[contenthash][ext]'
            }
        },
        {
            test: /\.jpeg$/,
            type: 'asset/inline'   // 导出资源的data URI，之前通过url-loader实现
        },
        {
            test: /\.txt$/,
            type: 'asset/source'  //导出资源的源代码
        },
        {
            test: /\.gif$/,
            type: 'asset',     // 通用类型：默认当资源文件 > 8kb就会选择resource，反之则采用inline
            parser: {
                dataUrlCondition: {
                    maxSize: 4 * 1024 * 1024    // 配置资源体积临界值
                }
            }
        },

        // 加载字体文件
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: 'asset/resource'
        },

        // loader 资源加载器
        // {
        //     test: /\.(css|less)$/,
        //     use: ['style-loader', 'css-loader', 'less-loader']   //顺序不可颠倒，webpack执行顺序是逆序的，先执行css-loader再执行style-loader
        // },

        // 使用mini-css-extract-plugin插件时，style-loader无效，需使用该插件自带的loader
        {
            test: /\.(css|less)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']   //顺序不可颠倒，webpack执行顺序是逆序的，先执行css-loader再执行style-loader
        },

        // 加载数据
        {
            test: /\.(csv|tsv)$/,
            use: 'csv-loader'
        },
        {
            test: /\.xml$/,
            use: 'xml-loader'
        },


        // babel-loader 转化js文件 es6 -> es5（webpack自带js文件加载功能）
        // 注意：项目中除了加载本地的js文件外，一般还会加载node_modules中的js文件
        // 而node_modules中的js文件是不需要编译转化的，因此需要排除
        {
            test: /\.js$/,
            exclude: /node_modules/,   // 排除node_modules中的js文件
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        [
                            '@babel/plugin-transform-runtime'
                        ]
                    ]
                }
            }
        },

        // 自定义JSON模块
        {
            test: /\.toml$/,
            type: 'json',
            parser: {   // 解析器
                parse: toml.parse
            }
        },
        {
            test: /\.yaml$/,
            type: 'json',
            parser: {   // 解析器
                parse: yaml.parse
            }
        },
        {
            test: /\.json5$/,
            type: 'json',
            parser: {   // 解析器
                parse: json5.parse
            }
        }
        
        ]
    }



}
