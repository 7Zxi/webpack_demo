const glob = require('glob');
const fs = require('fs');
const path = require('path');
const {pageName, mode} = require('../config/index');
let entry = {};
let startPath = null;

console.log(`当前环境：${mode}`);
console.log('打包入口：');

if(pageName && pageName !== 'all'){
    startPath = path.resolve(`src/page/${pageName}`);
    addEntry(startPath, pageName);
}else{
    startPath = path.resolve('src/page')
    addEntry(startPath);
}

function addEntry(src, param) {
    const list = glob.sync(path.join(src, '/*'));
    if (list.length === 0) return console.log('请输入正确的打包路径');

    list.forEach(data => {
        const filterArr = ['js', 'css', 'image', 'images', 'media', 'font'];
        let finalPath = data.split('/').pop();
        if (fs.statSync(data).isFile()) {
            if(finalPath === 'index.html'){
                let jsPath = path.join(src, '/js/main.js');
                if(glob.sync(jsPath).length > 0){
                    entry[param] = jsPath;
                    console.log(jsPath);
                }else{
                    console.log(`${param}页面 请添加入口main.js文件`)
                }
            }
        } else if (fs.statSync(data).isDirectory()) {
            if (filterArr.indexOf(finalPath) < 0) {
                addEntry(data, finalPath);
            }
        }
    })
}

module.exports = entry;
