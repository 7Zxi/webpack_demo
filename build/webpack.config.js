const path = require('path');
const entry = require('./entry');
const htmlPlugins = require('./plugin-html');
const cssPlugins = require('./plugin-css');
const {sourcePath, mode, pageName} = require('../config/index');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    devtool: "none",

    mode: mode,

    stats: "errors-only",

    entry: entry,

    output: {
        filename: "js/[name]-[hash].js",
        path: path.resolve('dist'),
        publicPath: sourcePath
    },

    // 提取公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: { //抽离第三方插件
                    test: /node_modules/, //指定是node_modules下的第三方包
                    chunks: "initial",
                    name: 'vendor', //打包后的文件名，任意命名
                    priority: 10 //设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                },
                utils: { //抽离自己写的公共代码，utils这个名字可以随意起
                    test: /\.js$/,
                    chunks: "initial",
                    name: 'utils', // 任意命名
                    minSize: 0 // 只要超出0字节就生成一个新包
                }
            }
        }
    },

    resolve: {
        extensions: ['.js', '.less', '.css'],
        alias: {
            style: path.resolve(__dirname, '../src/style'),
            lib: path.resolve(__dirname, '../src/lib'),
            publicImage: path.resolve(__dirname, '../src/image')
        }
    },

    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                //use:[MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                use: [
                    {
                        loader: "css-hot-loader"
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,//还需要在plugins里面new一下
                        options: {
                            publicPath: '../' //为了解决css里面引入的图片和img标签引入图片路径冲突问题
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer") /*添加css3前缀*/
                            ]
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]

            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/', // 图片打包后存放的目录
                            publicPath: sourcePath ? (sourcePath + '/images/') : '',
                            name: '[name]-[contenthash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            outputPath: 'fonts/',
                            publicPath: sourcePath ? (sourcePath + '/fonts/') : '',
                            name: '[name]-[contenthash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(mp3|mp4)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            outputPath: 'medias/',
                            publicPath: sourcePath ? (sourcePath + '/medias/') : '',
                            name: '[name]-[contenthash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            },
            {
                test: /\.html$/,
                use: ['html-withimg-loader']
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options:{
                        attrs: ['audio:src', 'video:src']
                    }
                }]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        ...cssPlugins,

        ...htmlPlugins
    ],

    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: '3006',
        open: true,
        openPage: `./${pageName}.html`,
        hot: true
    }
};
