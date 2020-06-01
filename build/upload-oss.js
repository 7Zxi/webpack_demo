const {mode, pageName, env} = require('../config/index');
const WebpackAliyunOss = require('webpack-aliyun-oss');
let OSS = [];

if(mode === 'production'){
    OSS = [
        new WebpackAliyunOss({
            from: ['./dist/**', '!./dist/**/*.html'],
            dist: `${pageName}/`,
            region: env.region,
            accessKeyId: env.accessKeyId,
            accessKeySecret: env.accessKeySecret,
            bucket: env.bucket,
            setOssPath(filePath) {
                return filePath.split('dist\\')[1];
            },
            setHeaders(filePath){
                return {'Cache-Control': 'max-age=31536000'}
            }
        })
    ]
}
module.exports = OSS;

