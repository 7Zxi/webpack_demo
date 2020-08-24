const {smart} = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const {pageName} = require('../config/index');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = smart(baseConfig, {

    mode: 'development',

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        host: '0.0.0.0',
        port: '3007',
        open: false,
        progress: true, // 打包进度显示
        compress: true, // 打包压缩文件
        overlay: true, // 在页面上显示编译的错误
        //openPage: `./${pageName}.html`,
        hot: true,
        index: `${pageName}.html`
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new webpack.HotModuleReplacementPlugin(), //js热更新 配合入口文件module.hot.accept方法
    ]
})
