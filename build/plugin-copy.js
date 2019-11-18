const {pageName} = require('../config/index');
const fs = require('fs');
const path = require('path');
let copyContent = [];

fs.readdirSync(path.resolve(`src/page/${pageName}`)).forEach(value => {
    if(value.includes('media')){
        copyContent.push({
            from: path.resolve(`src/page/${pageName}/media`),
            to: path.resolve('dist/media')
        })
    }
});

module.exports = copyContent;
