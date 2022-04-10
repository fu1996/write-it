class A {
    apply(compiler) {
        console.log(this);
 
        compiler.hooks.environment.tap('A', () => {
            console.log('0.environment');
        })
        compiler.hooks.initialize.tap('A', () => {
            console.log('1.当编译器对象被初始化时调用');
        })
        compiler.hooks.thisCompilation.tap('A', (compilation) => {
            compilation.hooks.afterOptimizeChunks.tap('A',chunks => {
                console.log('afterOptimizeChunks', chunks);
                chunks.forEach(chunk => {
                    console.log('afterOptimizeChunks', chunk)
                })
            })
        })
        compiler.hooks.compilation.tap('A', (compilation) => {
            console.log('compilation');
            compilation.processModuleDependencies(module, (err, module) => {
                console.log('processModuleDependencies', err, module);
            })
            compilation.hooks.buildModule.tap(
                'A',
                (module) => {
                  module.useSourceMap = true;
                }
              );
            compilation.hooks.succeedModule.tap('A', (module)=> {
                console.log('succeedModule');
            })
              
        })
        compiler.hooks.beforeCompile.tapAsync('A', (params, callback) => {
            // params['MyPlugin - data'] = 'important stuff my plugin will use later';
            console.log('2.在创建 compilation parameter 之后执行。')
            callback();
          });
          
    }
}

module.exports = A;