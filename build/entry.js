const glob = require('glob');
const {pageName, mode} = require('../config/index');
const entry = {};
const pageArray = glob.sync('./src/page/*');

console.log(`当前环境：${mode}`);

if(!pageName || pageName === 'all'){
    pageArray.forEach((name) => {
        let uri = name.split('/');
        let param = uri[uri.length-1];
        entry[param] = `${name}/js/main.js`;
    });
    console.log(`开始打包全部页面：All`)
}else{
    entry[pageName] = `./src/page/${pageName}/js/main.js`;
    console.log(`开始打包页面：${pageName}`)
}

console.log(entry);

module.exports = entry;
