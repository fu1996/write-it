

const A = require("./plugins/A")
const MyExampleWebpackPlugin = require("./plugins/MyExampleWebpackPlugin")
const FileListPlugin = require('./plugins/FileListPlugin')
// const MyPlugin = require("./plugins/MyPlugin")
// const MyResolve = require("./plugins/MyResolve")
const ResolvePathPlugin = require("./plugins/ResolvePathPlugin")
const ResolvePlugin = require("./plugins/ResolvePlugin")


module.exports = {
    entry: './src/index.js',
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
        plugins:[new ResolvePathPlugin(true),new ResolvePlugin({honorIndex:true, includeFileSuffix: ['.js', '.jsx'], targetFileSuffix: 'h5'})]
    }
    // plugins: [
    //     new MyPlugin(),
    // ]
}