function RevertTracePlugin(options) {
}

RevertTracePlugin.prototype.apply = function(compiler) {
  // compilation 被创建出来后触发
  compiler.hooks.thisCompilation.tap("RevertTracePlugin", function(compilation) {
    // 构建模块前触发
    compilation.hooks.buildModule.tap("RevertTracePlugin", (module) => {
      const stack = [];
      let current = module;
      // 向上遍历，找出所有引用者
      while (current.issuer) {
        stack.push(current.issuer.rawRequest);
        current = current.issuer;
      }
      if (stack.length > 0) {
        console.group(`资源 ${module.rawRequest} 引用链： `);
        console.log(stack.join("\n"));
        console.groupEnd();
        console.log();
      }
    });
  });
};

module.exports = RevertTracePlugin;