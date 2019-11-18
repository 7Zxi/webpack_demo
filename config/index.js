const fs = require('fs');
const path = require('path');
const PAGENAME = require('./pageName');
const fileNameArray = fs.readdirSync(path.resolve('config/pageConf'));
let config = {
    pageName: PAGENAME,
    sourcePath: '',
    mode : process.env.NODE_ENV || 'development'
};

if(config.mode === 'production' && config.pageName !== 'all'){
    if(fileNameArray.includes(`${config.pageName}_config.js`)){
        const pageConfig = require(`./pageConf/${config.pageName}_config`);
        config = {...config, ...pageConfig}
    }
}

module.exports = config;
