const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 插件的生成
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 分析打包时间
const smp = new SpeedMeasurePlugin();
const webpack = require("webpack");


class A {
    apply(compiler) {
        console.log(this);
    }
}

module.exports = smp.wrap({
    mode: 'development',
    entry: {
        index: './src/index.js',
        other: './src/dynamic.js',
    },
    output: {
        filename: '[name]-[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        open: true,
        hot: true,// 开启热更新 webpack5 已经默认配置
    },
    module: {
        noParse: /jquery/, // 不去解析 jQuery的 依赖库 直接使用jQuery
        // noParse: /react/, // react 会报错 
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        }
                    },
                ]
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    path.resolve(__dirname, 'loaders/afterBabel'),
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        }
                    },
                    path.resolve(__dirname, 'loaders/customLoader')
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    optimization: {
        splitChunks: { // 分割代码库
            cacheGroups: { // 缓存组
                // commons: { // 公共模块
                //     chunks: 'initial', // 入口处抽离
                //     minSize: 0, // 大于0 字节 就被抽离
                //     minChunks: 2, // 2 次以上就被抽离
                // }
                // vendor: {
                //     priority: 1, //优先级大于上面的 公共模块
                //     chunks: 'initial', // 入口处抽离
                //     minSize: 0, // 大于0 字节 就被抽离
                //     minChunks: 2, // 2 次以上就被抽离
                // },
                // 以上为webpack 4 的用法
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    // cacheGroupKey here is `commons` as the key of the cacheGroup
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module
                            .identifier()
                            .split('/')
                            .reduceRight((item) => item);
                        const allChunksNames = chunks.map((item) => item.name).join('~');
                        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    },
                    chunks: 'all',
                },
            },
        }
    },
    plugins: [
        // new webpack.DllReferencePlugin({
        //     manifest: path.join(__dirname,'dist', 'antd-manifest.json'),
        // }),
        new A(),
        new webpack.IgnorePlugin({
            // 即使代码中写了导入 语言包 moment.locale('zh-CN') 也不会打包语言包
            contextRegExp: /moment/,
            resourceRegExp: /\.\/locale/,
        }),
        new HtmlWebpackPlugin({
            // 特别注意 此处的模板必须是dist目录下的
            template: './dist/index.html',
            filename: 'index.html',
        }),
        // 查找引用动态链接库的清单， 如果存在 就引用 没有的话 在执行打包
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname,'dist', 'manifest.json'),
        }),
    ],
})