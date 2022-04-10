# webpack 配置相关

## 1 多页配置

## 2 devtool相关配置

1. source-map：增加映射文件 帮助调试代码
2. eval-source-map 不会产生单独文件 会显示 行 和列
3. cheap-module-source-map 不会产生列 是一个单独的映射文件
4. cheap-module-source-map 不 会产生文件 集成在打包后的文件中

## 3 webpack 实时打包

```js
// 实时打包
watch: true,
watchOptions: {
    poll: 1000, // 轮询的时间 
    aggregateTimeout: 500, // 防抖 的时间
    ignored: /node_modules/, //忽略文件
},
```

## 4 webpack 常用插件

1. cleanWebpackPlugin [清除上次打包残余]
2. copyWebpackPlugin [复制文件]
3. bannerPlugin [版权声明插件：js头部增加信息]

## 5 webpack devServer 问题

1. 解决跨域 【webpack.config.js】
2. 模拟数据  【webpack.config.js】
3. 前后端跑在同一个端口【推荐】见server-with-webpack

## 6 别名 

1. 配置查找包的路径
```js
    resolve: { // 解析 第三方包 node_mudules 查找规则 当前目录-》上级目录-》全局目录
        modules:[path.resolve(__dirname, 'node_modules')], // 指定查找目录
    }
```
2. 配置导入时候的查找路径

以bootstrap 为例 不设置别名的情况下 使用
```js
import 'bootstrap'
```
会导入 

node_modules/bootstrap/package.json 的 main 字段 【默认的规则】

node_modules/bootstrap/package.json 的部分内容如下
```json
  "main": "dist/js/bootstrap.js",
  "module": "dist/js/bootstrap.esm.js",
  "style": "dist/css/bootstrap.css",
```

而我们需要的只是css 样式而已 我们要重写 导入方法

```js
import 'bootstrap/dist/css/bootstrap.css';
```

3. 使用 webpack 的别名功能 实现 导入的别名化

```js
    resolve: { // 解析 第三方包 node_mudules 查找规则 当前目录-》上级目录-》全局目录
        modules:[path.resolve(__dirname, 'node_modules')], // 指定查找目录
        alias: {
            // 别名： 导入 bootstrap 实质上导入 bootstrap/dist/css/bootstrap.css
            // 不设置的 话 还会 导入 bootstrap js 等内容
            bootstrap: 'bootstrap/dist/css/bootstrap.css',
        },
    },
```

4. 通过修改查找规则 来修改 模块导入的默认查找规则 

```js
    resolve: { // 解析 第三方包 node_mudules 查找规则 当前目录-》上级目录-》全局目录
        modules:[path.resolve(__dirname, 'node_modules')], // 指定查找目录
        // 导入包的查找规则 先查找 被导入包的package.json 的 style 字段 为入口，找不到就找main字段
        mainFields: ['style', 'main'],
    },
```

5. 还可以直接指定入口文件的名字  mainFiels

mainFiels: [], // 入口文件名字

6. 省略 后缀的写法 extensions

extensions: ['.js', '.css', '.json'], // 默认扩展名

## 7 定义环境变量 【非运行时】

```js
        new webpack.DefinePlugin({
            // DEV: 'dev' // webpack 会默认执行 eval('dev') 方法 最后会去变成 dev 变量
            DEV: "'dev'", // 解决办法1
            ENV: JSON.stringify('env') // 解决办法2
        }),
```

index.js
```js
let url = ''

if (DEV === 'dev') {
    url = 'https://localhost:3000'
} else {
    url = 'http://baidu.com'
}
console.log('env', ENV)

console.log('uuuel', url)
```

npm run build 构建结果：
```js
console.log("env","env"),console.log("uuuel","https://localhost:3000");
```

## 8 webpack-merge来拆分环境变量

```shell
npm i webpack-merge
```

拆分为 webpack.prod.js webpack.base.js 

指定配置文件运行

npm run build -- --config webpack.prod.js



