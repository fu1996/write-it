const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 插件的生成
const  { CleanWebpackPlugin }  =  require ( 'clean-webpack-plugin' ) ;
const webpack = require( 'webpack');

module.exports = {
    mode: 'production',
    // 多入口
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    // devtool的几种配置
    // 1. source-map：增加映射文件 帮助调试代码
    // 2. eval-source-map 不会产生单独文件 会显示 行 和列
    // 3. cheap-module-source-map 不会产生列 是一个单独的映射文件
    // 4. cheap-module-source-map 不 会产生文件 集成在打包后的文件中
    devtool: 'source-map',
    // 实时打包
    watch: true,
    watchOptions: {
        poll: 1000, // 轮询的时间 
        aggregateTimeout: 500, // 防抖 的时间
        ignored: /node_modules/, //忽略文件
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: { // 解析 第三方包 node_mudules 查找规则 当前目录-》上级目录-》全局目录
        modules:[path.resolve(__dirname, 'node_modules')], // 指定查找目录
        // alias: {
        //     // 别名： 导入 bootstrap 实质上导入 bootstrap/dist/css/bootstrap.css
        //     // 不设置的 话 还会 导入 bootstrap js 等内容
        //     bootstrap: 'bootstrap/dist/css/bootstrap.css',
        // },
        // 导入包的查找规则 先查找 被导入包的package.json 的 style 字段 为入口，找不到就找main字段
        mainFields: ['style', 'main'],
        // mainFiels: [], // 入口文件名字
        extensions: ['.js', '.css', '.json'], // 默认扩展名
    },
    // 配置跨域等问题
    devServer: {
        // proxy: {
        //     // 1. 以api 开头的 转发去 3030端口
        //     // '/api': 'https://localhost:3030'
        //     // 2. 重写路径  请求/api/user 开头的 转换为 http://localhost:3030/user
        //     '/api': {
        //         target: 'http://localhost:3030',
        //         pathRewrite: {'/api': ''}
        //     }
        // },
        // 3, 使用钩子 mock服务 服务启动前的钩子 [v5 版本存在问题]
        // before(app) {
        //     app.get('/user', function(req, res) {
        //         res.json({name: 'fjk'})
        //     })
        // }
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // DEV: 'dev' // webpack 会默认执行 eval('dev') 方法 最后会去变成 dev 变量
            DEV: "'dev'", // 解决办法1
            ENV: JSON.stringify('env') // 解决办法2
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // chunks 决定了 那些 js 文件被打包进 html 文件中 默认是 所有的 可以通过入口名称配置
            chunks: ['home'],
        }),
        new HtmlWebpackPlugin({
            filename: 'other.html',
            template: './index.html',
            // chunks 决定了 那些 js 文件被打包进 html 文件中 默认是 所有的 可以通过入口名称配置
            chunks: ['home', 'other'],
        }),
        new CleanWebpackPlugin({
            dry:true,
            cleanStaleWebpackAssets: true,
        })
    ]

}