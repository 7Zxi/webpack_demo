const fs = require('fs');
const path = require('path');
const dotEnv = require('dotenv').config().parsed;
const fileNameArray = fs.readdirSync(path.resolve('config/pageConf'));

let config = {
    pageName: dotEnv.PAGENAME,
    sourcePath: '',
    env: dotEnv,
};

if (config.pageName !== 'all') {
    if (fileNameArray.includes(`${config.pageName}_config.js`)) {
        const pageConfig = require(`./pageConf/${config.pageName}_config`);
        if(config.devtool === 'production'){
            config.sourcePath = pageConfig[config.mode].sourcePath
        }
        config = {
            ...config,
            webConf: pageConfig[config.mode]
        }
    }
}

module.exports = config;
