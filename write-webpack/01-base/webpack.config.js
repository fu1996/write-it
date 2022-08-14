// webpack 是 node 写出来的 支持node 配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 插件的生成
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css为单独文件的插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 压缩抽离的css 体积
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 压缩抽离的js 体积
const webpack = require("webpack")

const cssLoaderConfig = (() => ({
    test: /\.css$/,
    // css-loader: 处理css 模块 合并模块 解析 @import 语法
    // style-loader: 把 css 插入到head 中
    // loader 的执行顺序 从右向左 从下向上
    // loader 还可以使用对象形式
    use: [
        MiniCssExtractPlugin.loader, // 抽离为单独的css
        // {
        //     loader: 'style-loader', // 
        //     options: {
        //         // insert: 'head', // 处理插入 元素的位置
        //         // 使用函数 插入 head 的顶部
        //         insert: function insertAtTop(element) {
        //             var parent = document.querySelector("head");
        //             // eslint-disable-next-line no-underscore-dangle
        //             var lastInsertedElement =
        //               window._lastElementInsertedByStyleLoader;
    
        //             if (!lastInsertedElement) {
        //               parent.insertBefore(element, parent.firstChild);
        //             } else if (lastInsertedElement.nextSibling) {
        //               parent.insertBefore(element, lastInsertedElement.nextSibling);
        //             } else {
        //               parent.appendChild(element);
        //             }
    
        //             // eslint-disable-next-line no-underscore-dangle
        //             window._lastElementInsertedByStyleLoader = element;
        //         },
        //     }
        // },
        'css-loader',
        'postcss-loader',
    ]
}))()

module.exports = {
    entry: './src/index.js',
    mode: 'development', // 模式 分为生产 production 和 开发环境 development
    output: {
        filename: 'bundle.[hash:8].js', // 输出的文件名
        path: path.resolve(__dirname, 'build'), // 此路径必须为绝对路径
    },
    devServer: { // 开发服务器配置  https://webpack.js.org/configuration/dev-server/#devserver
        port: 3001, // 本地服务端口
        // progress: true, // 显示进度
        compress: true,
        client: {
            progress: true,
          },
        // contentBase[<4.0的版本] 和 static [>=4.0]
        // contentBase: path.join(__dirname, 'build'), // 开发服务器使用的 资源目录 推荐绝对路径
        static: path.join(__dirname, 'build'), // 开发服务器使用的 资源目录 推荐绝对路径
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'My App',
        template: 'public/index.html', // 模板存放位置
        filename: 'index.html', // 输出的HTML 文件名
        minify: {
            removeAttributeQuotes: true, //删除双引号
            collapseWhitespace: true, // 删除空格
        },
        hash: true, // 产生hash 戳
      }),
      new MiniCssExtractPlugin({
          filename: 'main.css', // 抽离处理的文件名
      }),
      new webpack.ProvidePlugin({ // 每个模块的头部默认导入
          $: 'jquery',
      })
    ],
    module: {
        // loader
        rules: [
            {
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                  exposes: ["$", "jQuery"],
                },
              },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'eslint-loader', // babel 把es6 转为 es5
            //         options: {
            //             enforce: 'pre', // loader 的 优先级 最前 改变了 loader的执行顺序
            //         }
            //     },
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // babel 把es6 转为 es5
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-transform-runtime", [require('./babel-plugins/test'), {IMPORT_NAME: 'b', SOURCE: path.join(__dirname, './src/b')}]]
                    }
                }
            },
            cssLoaderConfig,
            {
                test: /\.less$/,
                // css-loader: 处理css 模块 合并模块 解析 @import 语法
                // style-loader: 把 css 插入到head 中
                // loader 的执行顺序 从右向左 从下向上
                // loader 还可以使用对象形式
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // insert: 'head', // 处理插入 元素的位置
                            // 使用函数 插入 head 的顶部
                            insert: function insertAtTop(element) {
                                var parent = document.querySelector("head");
                                // eslint-disable-next-line no-underscore-dangle
                                var lastInsertedElement =
                                  window._lastElementInsertedByStyleLoader;
                
                                if (!lastInsertedElement) {
                                  parent.insertBefore(element, parent.firstChild);
                                } else if (lastInsertedElement.nextSibling) {
                                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                                } else {
                                  parent.appendChild(element);
                                }
                
                                // eslint-disable-next-line no-underscore-dangle
                                window._lastElementInsertedByStyleLoader = element;
                            },
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader', // less 转换为 css
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            // new UglifyJsPlugin({
            //     cache: true,
            //     parallel: true, //并发打包
            //     sourceMap: true, // 开启映射
            // }),
            new CssMinimizerPlugin(),
        ],
      },
}