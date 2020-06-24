const HtmlWebpackPlugin = require('html-webpack-plugin');
const {mode} = require('../config/index');
const path = require('path');
const entry = require('./entry');
let plugins = [];

Object.keys(entry).forEach(data => {
    let src = path.join(entry[data].split(data)[0],`${data}/index.html`);
    plugins.push(new HtmlWebpackPlugin(createParams(src, data)));
})

function createParams(src, pageName) {
    let params = {
        template: src,
        filename: `${pageName}.html`,
        hash: true,
        //cache: true,
        chunks: ['vendor', 'utils', pageName]
    };

    if (mode === 'production') {
        params.minify = {
            removeComments: true, //清理html中的注释
            collapseWhitespace: true //清理html中的空格、换行符
        }
    }

    return params;
}

module.exports = plugins;
