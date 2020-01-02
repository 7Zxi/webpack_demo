const fs = require('fs');
const path = require('path');
const dotEnv = require('dotenv').config().parsed;
const fileNameArray = fs.readdirSync(path.resolve('config/pageConf'));
let config = {
    pageName: dotEnv.PAGENAME,
    sourcePath: '',
    mode: process.env.NODE_ENV || 'development',
    devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : ''
};

if (config.mode === 'production' && config.pageName !== 'all') {
    if (fileNameArray.includes(`${config.pageName}_config.js`)) {
        const pageConfig = require(`./pageConf/${config.pageName}_config`);
        config = {...config, ...pageConfig}
    }
}

module.exports = config;
