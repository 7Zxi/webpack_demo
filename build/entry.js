const glob = require('glob');
const {pageName, mode} = require('../config/index');
const entry = {};
const pageArray = glob.sync('./src/page/*');

console.log(`当前环境：${mode}`);

if (!pageName || pageName === 'all') {
    pageArray.forEach((name) => {
        let uri = name.split('/');
        let param = uri[uri.length - 1];
        let src = `${name}/js/main.js`;
        if (glob.sync(src).length > 0) {
            entry[param] = src;
        } else {
            console.log(`${param}页面 请添加入口main.js文件`);
        }
    });
    console.log(`开始打包全部页面：All`)
} else {
    let src = `./src/page/${pageName}/js/main.js`;
    if (glob.sync(src).length > 0) {
        entry[pageName] = src;
        console.log(`开始打包页面：${pageName}`)
    } else {
        console.log(`${pageName}页面 请添加入口main.js文件`);
    }
}

console.log(entry);

module.exports = entry;
