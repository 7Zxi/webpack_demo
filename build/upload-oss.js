class WebpackSuccessUploadOSS {
    apply(compiler) {

        /*compiler.hooks.afterEmit.tap('WebpackSuccessUploadOSS', (compilation, params) => {
            console.log('文件输出成功');
        })*/

        compiler.hooks.done.tap('WebpackSuccessUploadOSS', (compilation, params) => {
            console.log('打包完成');
        })

    }
}

module.exports = WebpackSuccessUploadOSS;
