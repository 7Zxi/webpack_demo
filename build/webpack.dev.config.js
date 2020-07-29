const {smart} = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const {pageName} = require('../config/index');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = smart(baseConfig, {

    mode: 'development',

    devtool: 'eval-cheap-module-source-map',

    devServer: {
        host: '0.0.0.0',
        port: '3007',
        open: false,
        progress: true,
        compress: true,
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
