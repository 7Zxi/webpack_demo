const path = require('path');
const webpack = require('webpack');
const entry = require('./entry');
const htmlPlugins = require('./plugin-html');
const cssPlugins = require('./plugin-css');
const {sourcePath, mode, pageName, devtool, webConf} = require('../config/index');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OSS = require('./upload-oss');


module.exports = {
    devtool,

    mode,

    stats: "errors-only",

    entry,

    output: {
        filename: 'js/[name]-[hash:8].js',
        chunkFilename: 'js/[name]-chunk[contenthash:8].js',
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
                    minChunks: 2,   // 被引用过两次才抽离
                    minSize: 0 // 只要超出0字节就生成一个新包
                }
            }
        }
    },

    resolve: {
        modules: [path.resolve('node_modules')],
        extensions: ['.js', '.less', '.css'],
        alias: {
            style: path.resolve(__dirname, '../src/style'),
            lib: path.resolve(__dirname, '../src/lib'),
            resource: path.resolve(__dirname, '../src/image')
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
                            name: '[name]-[contenthash:8].[ext]'
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
                            name: '[name]-[contenthash:8].[ext]'
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
                            name: '[name]-[contenthash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            // 配置polyfill转换低版本浏览器不支持的api：promise、includes...
                            ["@babel/preset-env", {useBuiltIns: 'usage'}]
                        ],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),// 只转化src目录下的js
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
                    options: {
                        attrs: ['audio:src', 'video:src']
                    }
                }]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        ...cssPlugins,

        ...htmlPlugins,

        new webpack.DefinePlugin({//替换前端输出，前端可做线上线下接口环境区分。例：前端访问_config将替换成webConf
            '_config': JSON.stringify(webConf)
        }),

        new webpack.ProvidePlugin({ //向每个页面注入全局变量,不需要import或require导入
            $: path.resolve(__dirname, '../src/lib/zepto.min.js'),
            __publicMethod: path.resolve(__dirname, '../src/lib/publicMethod')
        }),

        new webpack.HotModuleReplacementPlugin(), //js热更新 配合入口文件module.hot.accept方法

        ...OSS
    ],

    devServer: {
        host: '0.0.0.0',
        port: '3007',
        open: false,
        progress: true,
        compress: true,
        //openPage: `./${pageName}.html`,
        hot: true,
        index: `${pageName}.html`
    }
};
