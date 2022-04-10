// 一个 JavaScript 类
class MyExampleWebpackPlugin {
    // 在插件函数的 prototype 上定义一个 `apply` 方法，以 compiler 为参数。
    apply(compiler) {
      // 指定一个挂载到 webpack 自身的事件钩子。
      compiler.hooks.emit.tapAsync(
        'MyExampleWebpackPlugin',
        (compilation, callback) => {
          console.log('这是一个示例插件！');
          console.log(
            '这里表示了资源的单次构建的 `compilation` 对象：',
            compilation
          );
  
          // 用 webpack 提供的插件 API 处理构建过程
        //   compilation.addModule(/* ... */);
  
          callback();
        }
      );
    }
  }

module.exports = MyExampleWebpackPlugin;