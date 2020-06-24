const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {mode} = require('../config/index');
let opt = [];
let filename = '';

if(mode === 'production'){
    opt = [new OptimizeCssAssetsPlugin()];
    filename = 'css/[name]-[contenthash:8].css';
}else{
    filename = 'css/[name].css';
}

opt.push(new MiniCssExtractPlugin({
    filename
}));

module.exports = opt;
