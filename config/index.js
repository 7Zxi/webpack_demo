const fs = require('fs');
const path = require('path');
const dotEnv = require('dotenv').config().parsed;
const fileNameArray = fs.readdirSync(path.resolve('config/pageConf'));
let config = {
    pageName: dotEnv.PAGENAME,
    sourcePath: '',
    mode: process.env.NODE_ENV || 'development',
    env: dotEnv,
    devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : ''
};

if (config.pageName !== 'all') {
    if (fileNameArray.includes(`${config.pageName}_config.js`)) {
        const pageConfig = require(`./pageConf/${config.pageName}_config`);
        config = {
            ...config,
            sourcePath: pageConfig[config.mode].sourcePath,
            webConf: pageConfig[config.mode]
        }
    }
}

module.exports = config;
