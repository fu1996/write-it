# webpack 5.52.0 源码分析



## 0.第三方工具方便源码分析

[使用patch-package 将webpack 源码的注释给保留在代码里](https://www.cnblogs.com/jydeng/p/14120348.html)



webpack 中的 事件触发相关第三方库： tapable

webpack 中的 依赖文件分析第三方库：enhanced-resolve





## 1. hook调用顺序

调用顺序从上向下执行

```javascript
// hook 调用顺序 start

// createCompiler方法中
	// 调用 环境相关的hook
	compiler.hooks.environment.call();
	compiler.hooks.afterEnvironment.call();
	// 初始化webpack完成后 调用 initialize
	compiler.hooks.initialize.call();


// Compiler 中
			// Compiler 正式启动前的 hook 
			this.hooks.beforeRun.callAsync(this, err => {
      this.hooks.run.callAsync(this, err => {
        
			// compiler 函数中
      // 触发 编译开始之前 的 hook
			this.hooks.beforeCompile.callAsync(params, err => {
      // 调用 compile hook 并传入参数
			this.hooks.compile.call(params);
        
            // newCompilation 函数中 创建 compilation 对象
            // compilation 里的 thisCompilation 的hook
            this.hooks.thisCompilation.call(compilation, params);
            // compilation 的 hook
            this.hooks.compilation.call(compilation, params);
        
			// 回到 compiler 函数中 调用 make 的 hook
			this.hooks.make.callAsync(compilation, err => {
      // 调用 finishMake 的 hook
			this.hooks.finishMake.callAsync(compilation, err => {
        
```

## 2.调用方法顺序



```
首先调用 Compiler 的 run


最后调用Compiler 的 close
```

