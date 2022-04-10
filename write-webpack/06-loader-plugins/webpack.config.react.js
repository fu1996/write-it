const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 插件的生成


module.exports = {
    mode: 'development',
    entry: {
        //TODO：  打包的入口包 本不想 放入 antd，如果将antd 拆分为另外一个 动态dll 库 会有报错
        react: ['react', 'react-dom', 'antd'], 
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
            path: path.resolve(__dirname, 'dist', 'manifest.json'),
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        })
    ],
}