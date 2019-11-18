const HtmlWebpackPlugin = require('html-webpack-plugin');
const {pageName, mode} = require('../config/index');
const fs = require('fs');
const path = require('path');
let plugins = [];

if (!pageName || pageName === 'all') {
    fs.readdirSync(path.resolve('src/page')).forEach(value => {
        plugins.push(new HtmlWebpackPlugin(createParams(value)));
    })
} else {
    plugins.push(new HtmlWebpackPlugin(createParams(pageName)));
}

function createParams(pageName) {
    let params = {
        template: `./src/page/${pageName}/index.html`,
        filename: `${pageName}.html`,
        chunks: [pageName]
    };

    params.chunks.unshift('vendor', 'utils');

    if(mode === 'production'){
        params.minify = {
            removeComments: true, //清理html中的注释
            collapseWhitespace: true //清理html中的空格、换行符
        }
    }

    return params;
}

module.exports = plugins;
