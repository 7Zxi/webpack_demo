const path = require('path');
const webpack = require('webpack');
const {sourcePath, webConf} = require('../config/index');
const entry = require('./entry');
const htmlPlugins = require('./plugin-html');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry,

    output: {
        filename: 'js/[name]-[hash:8].js',
        chunkFilename: 'js/[name]-chunk[contenthash:8].js',
        path: path.resolve('dist'),
        publicPath: sourcePath
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
                test: /\.css$/,
                use: [
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
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
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
                test: /\.(jpe?g|png|gif|webp)$/,
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
                test: /\.(eot|ttf|woff|svg|otf)$/,
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
                            ["@babel/preset-env"]
                        ],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    // 配置polyfill转换低版本浏览器不支持的api：promise、includes...
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                },
                include: path.resolve(__dirname, '../src'),// 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            },
            {
                test: /\.html$/,
                use: ['html-withimg-loader']
            },
            {
                test: /\.html$/,
                use: [
                    'html-withimg-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['audio:src', 'video:src']
                        }
                    }
                ]
            }
        ]
    },

    stats: "errors-only",

    plugins: [
        new CleanWebpackPlugin(),

        ...htmlPlugins,

        new webpack.DefinePlugin({//替换前端输出，前端可做线上线下接口环境区分。例：前端访问_config将替换成webConf
            '_config': JSON.stringify(webConf)
        }),

        new webpack.ProvidePlugin({ //向每个页面注入全局变量,不需要import或require导入
            $: [path.resolve(__dirname, '../src/lib/zepto.min'), 'default'],
            __publicMethod: [path.resolve(__dirname, '../src/lib/publicMethod'), 'default'],
        }),

    ],
}
