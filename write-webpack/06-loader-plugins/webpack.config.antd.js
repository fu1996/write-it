const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 插件的生成


module.exports = {
    mode: 'development',
    entry: {
        antd: ['antd'], // 打包的入口包 键为 打出来下面真正用的[name]属性
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library:'_dll_[name]', // 将打出来的包 进行变量命名
        // libraryTarget: 'commonjs', // 打包出来的 方式
    },
    plugins: [
        // 怎么找到链接库 动态链接库的打包地址
        new webpack.DllPlugin({
            // name === library
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', 'antd-manifest.json'),
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        })
    ],
}