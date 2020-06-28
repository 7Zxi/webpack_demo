const HtmlWebpackPlugin = require('html-webpack-plugin');
const {mode, pageName} = require('../config/index');
const path = require('path');
const entry = require('./entry');
let plugins = [];

Object.keys(entry).forEach(data => {
    let template = path.join(entry[data].split(data)[0],`${data}/index.html`);
    let dirPath = entry[data].split('\\');
    let startIndex = dirPath.indexOf(pageName);
    let endIndex = dirPath.indexOf('js');
    let filename = `html/${dirPath.slice(startIndex, endIndex).join('/')}.html`;

    plugins.push(new HtmlWebpackPlugin(createParams(template, filename, data)));
})

function createParams(template, filename, chunk) {
    let params = {
        template,
        filename,
        //hash: true,
        //cache: true,
        chunks: ['vendor', 'utils', chunk]
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
