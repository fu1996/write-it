# OSUI webpack config demo

# 自定义loader

## loader 的相关问题
1. loader是什么？【函数还是类？】
2. loader的作用是什么？【对符合条件的源代码做二次处理】
3. loader的执行顺序是什么？【列表中：从右向左，从下向上，链式调用】
4. 设计loader的原则是什么？【单一原则，输入和输出为源代码的字符串】

https://www.webpackjs.com/concepts/loaders/#loader-%E7%89%B9%E6%80%A7

## 如何手写一个loader

### 找到该loader

- 使用本地的js文件
- 指定loaders 所在的目录 【webpack 会按照顺序去查找】
- 通用方法 npm link

### 调试一个loader

1. 使用node 的 debug 模式 可使用 debug terminal
2. 然后在对应的代码行直接加断点

### 异步的loader


## loader 相关代码的演示

1. colorMap 实现自动将16进制的颜色值替换 为当前主题中的 变量【TODO：将定制化的能力作为通用的能力】
2. 异步loader的演示 实现自定义操作代码头部信息
3. loader 中信息的校验和获取



## 扩展: loader 提供了 操作 源代码的能力,发散思维做出一些提高效率的小东西吧

# webpack 相关资料

如何写一个loader： https://www.webpackjs.com/contribute/writing-a-loader/

loader中相关的接口：https://webpack.js.org/api/loaders/
