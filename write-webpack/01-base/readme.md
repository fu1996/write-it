# webpack 安装

# webpack 的配置


## webpack 配置 js 解析 为了使用高级语法

babel 相关的包
```shell
yarn add -D babel-loader @babel/preset-env @babel/core
```

https://babeljs.io/docs/en/babel-polyfill
https://babeljs.io/docs/en/babel-plugin-transform-runtime
https://babeljs.io/docs/en/babel-preset-env

## 配置eslint 校验语法规范

https://eslint.bootcss.com/
```
yarn add eslint eslint-loader
```

# 全局方法的配置
## 给window 对象绑定全局方法

yarn add expose-loader

## 在每个模块中 默认注入某些包

      new webpack.ProvidePlugin({ // 每个模块的头部默认导入
          $: 'jquery',
      })

## 忽略 某些文件的打包 [适用于引用了某些CDN的包]

externals : {
    jquery: '$'
}

# webpack 打包图片

1. js 创建图片
2. 在 css 中使用background('url')
3. 使用 img 标签

## file-loader url-loader 处理 图片等资源 【webpack5 以下才会使用】
url-loader 可以使用options: {outputPath: 'img', publicPath: 'http://www.google.com'} 指定输出目录 和CDN 地址

webpack5 最新的loader: https://webpack.docschina.org/guides/asset-modules/

## html-withimg-loader 解析 html 中 img 标签引入的图片