// webpack 是 node 写出来的 支持node 配置
const path = require('path');

class P {
    apply(compiler) {
        compiler.hooks.emit.tap('emit', function(params) {
            console.log('emit');
        })
    }
}

module.exports = {
    entry: './src/index.js',
    mode: 'development', // 模式 分为生产 production 和 开发环境 development
    output: {
        filename: 'bundle.js', // 输出的文件名
        path: path.resolve(__dirname, 'dist'), // 此路径必须为绝对路径
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, 'loader', 'style-loader'),
                    path.resolve(__dirname, 'loader', 'less-loader')
                ]
            }
        ]
    },
    plugins: [
        new P(),
    ]
}