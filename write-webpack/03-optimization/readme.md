# webpack 优化项

## 0 做优化 首先知道瓶颈在哪里

https://blog.csdn.net/lunahaijiao/article/details/104191464 

## 1. module.noParse 属性

例：项目中引用了jQuery 但是jQuery这个库一般不会去引用别的库，就可以使用noParse 属性 不去解析jQuery的依赖关系

防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中 不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。

```js
    module: {
        noParse: /jquery/, // 不去解析 jQuery的 依赖库 直接使用jQuery
        // noParse: /react/, // react 会报错 
    }
```

## 2. 匹配规则 里面增加 exclude 或者 include 属性 也可以加快打包

## 3. 使用ignorePlugin

1. 未忽略之前

```js
 SMP  ⏱  
General output time took 3.99 secs

 SMP  ⏱  Plugins
HtmlWebpackPlugin took 0.007 secs

 SMP  ⏱  Loaders
babel-loader took 3.76 secs
  module count = 138
html-webpack-plugin took 0.012 secs
  module count = 1
modules with no loaders took 0.007 secs
  module count = 1



asset index-6ba28254.js 1.07 MiB [emitted] [immutable] (name: main)
asset index.html 331 bytes [emitted] [compared for emit]
```

2. 增加配置

```js
    plugins: [
        new webpack.IgnorePlugin({
            // 即使代码中写了导入 语言包 moment.locale('zh-CN') 也不会打包语言包
            contextRegExp: /moment/,
            resourceRegExp: /\.\/locale/,
        }),
    ]
```

结果：

```js
SMP  ⏱  
General output time took 2.048 secs

 SMP  ⏱  Plugins
HtmlWebpackPlugin took 0.009 secs
IgnorePlugin took 0 secs

 SMP  ⏱  Loaders
babel-loader took 1.92 secs
  module count = 3
html-webpack-plugin took 0.012 secs
  module count = 1
modules with no loaders took 0.007 secs
  module count = 1



asset index-54e2d6c5.js 474 KiB [emitted] [immutable] (name: main)
asset index.html 331 bytes [emitted] [compared for emit]
```


因为打包 不包含语言包 所以语言还是变为默认英文的了，直接使用按需导入语言包即可
```js
import moment from 'moment'

// 使用手动导入 【有效】
import 'moment/locale/zh-cn'

moment.locale('zh-CN') // 此导入【无效】 虽然写了导包语句 但是在webpack 中忽略了 还是不会被打包进去
```

## 4. 动态链接库 dllPlugin 适合将一些打的第三方库 进行打包为一个 dll 文件 在index.html 文件中直接引用

例：react项目中，因为react 和 react-dom 第三方库不用更改， 将其先抽离出来，在进行打包时候不进行打包。

1. 新建 webpack.config.react.js  用于使用webpack 打包dll 文件

```js
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
```
2. 执行命令 提取 dll 文件

```shell
webpack --config webpack.config.react.js
```

3. 此时 dist 目录下的 _dll_react.js 中 包含了 react， react-dom 和antd 的变量名为 **_dll_react** 的变量


## 5. happyPack 进行多线程打包 [百度即可]

## 6. webpack 中的自带优化

https://webpack.docschina.org/guides/build-performance/

### tree-shaking 【生产有效】
必须 使用 import 语法时候 会自动去除掉 无用的代码。
使用 require 语法 就无效了

### 作用域提升 【生产有效】

```js
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;
console.log('dddd', d);
// webpack 会自动省略代码
// npm run build 结果为

console.log("dddd",6);
```

## 7. 多页面下的 抽离公共代码


假设有页面 index 和 other，有模块a, b 两个文件

```js
// a.js 的内容
console.log('a____')
// b.js 的内容
console.log('b____')

// index.js 的内容
import a from './a'
import b from './b'

console.log('index--------')

// other.js 的内容
import a from './a'
import b from './b'

console.log('other--------')
```

修改webpack 为多页面以后 进行打包 npm run build

```js
// index.js
xxx.{console.log('a____)'}, xxx.{console.log('b____)'}, xxx.{console.log('index--------')}


// other.js
xxx.{console.log('a____)'}, xxx.{console.log('b____)'}, xxx.{console.log('other--------')}
```

可以发现两个页面中都含有 公共的代码

```js
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
```

## 8. 模块懒加载使用的 是 import('..'),热更新在webpack5 已经默认支持了