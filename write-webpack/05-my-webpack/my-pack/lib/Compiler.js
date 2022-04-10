const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('@babel/traverse')
const t = require('@babel/types')
const generator = require('@babel/generator')
const ejs = require('ejs')
const {SyncHook} = require('tapable')

const print = a => console.log(JSON.stringify(a, null, 2))

// 解析语法树的 babel 工具
// babylon 把源码转发微 ast
// @babel/traverse
// @babel/types
// @babel/generator
class Compiler {
    constructor(config) {
        // 随时拿到配置
        this.config = config;
        // 保存入口文件的相对路径
        this.entryId = null;
        // 保存模块的依赖
        this.modules = {};

        // 入口 路径
        this.entry = config.entry;
        // 工作路径
        this.root = process.cwd();
        this.hooks = {
            entryOption:new SyncHook(),
            compile:new SyncHook(),
            afterCompile:new SyncHook(),
            afterPulgins:new SyncHook(),
            run:new SyncHook(),
            emit:new SyncHook(),
            done:new SyncHook()
          }
          // 如果传递了plugins参数
          let plugins = this.config.plugins;
          if(Array.isArray(plugins)){
            plugins.forEach(plugin => {
              plugin.apply(this);
            });
          }
          this.hooks.afterPulgins.call();
    }
    // parseLoader(source, modulePath) {
    //     const rules = this.config.module.rules;
    //     rules.forEach(rule => {
    //         const {test, use} = rule;
    //         let currentUse = use.length - 1;
    //         if (test.test(modulePath)) {
    //             // 获取对应的loader
    //             const loaderFunc = require(use[currentUse--])
    //             source = loaderFunc(source);
    //             if(currentUse > 0) {
    //                 source = loaderFunc(source);
    //             }
    //         }
    //     })
    //     return source;
    // }
    getSource(modulePath) {
        let source = fs.readFileSync(modulePath, 'utf8');
        // 对loader 进行匹配处理
        // source = this.parseLoader(source,modulePath);
        const rules = this.config.module.rules;
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let {test, use} = rule;
            let currentUse = use.length - 1;
            if (test.test(modulePath)) {
                function normallLoader() {
                    let loader = require(use[currentUse--])
                    source = loader(source)
                    if (currentUse >= 0) {
                        normallLoader()
                    }
                }
                normallLoader();
            }
        }

        return source;
    }
    // 对代码进行解析  解析语法树 https://astexplorer.net/
    parse(source, parentPath) {
        let ast = babylon.parse(source);
        // console.log(JSON.stringify(ast, null, 2));
        // console.log(traverse);
        let dependencies = []
        traverse.default(ast, {
            CallExpression(p) {
                // print(p)
                const {node} = p // 获取节点 并修改其 require 方法
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__'
                    let moduleName = node.arguments[0].value; // 取到模块的引用名字
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
                    moduleName = './' + path.join(parentPath, moduleName); // 'src/a.js
                    dependencies.push(moduleName); //放入 依赖
                    // 修改 原有代码
                    node.arguments = [t.stringLiteral(moduleName)]
                }
            }
        })
        // ast 解析完毕 获取 处理过的源码
        let sourceCode = generator.default(ast).code;
        return {dependencies, sourceCode}
    }
    // 对模块进行打包
    buildModule(modulePath, isEntry) {
        // 获取代码
        let source = this.getSource(modulePath);
        // 模块的id 相对于当前路径的 如： './src/index.js'
        // 模块id = modulePath - this.root
        let moduleName = './' + path.relative(this.root, modulePath);
        if (isEntry) {
            // 保存入口的名字
            this.entryId = moduleName;
        }
        // console.log('moduleName', moduleName, source);
        // 对source 源码进行解析
        const {
            sourceCode, dependencies
        } = this.parse(source, path.dirname(moduleName));
        // 把相对路径和模块中的内容进行 关联起来
        this.modules[moduleName] = sourceCode

        // 递归解析
        dependencies.forEach(deps => {
            this.buildModule(path.join(this.root, deps), false)
        })
    }

    emitFile() {
        // 有了模块依赖关系 和 模块的 入口 文件 可以进行依赖写入了
        // 1. 写入的目录
        const outputFile = path.join(this.config.output.path, this.config.output.filename)
        //  2. 读取 ejs 的模块文件
        const templateSource = this.getSource(path.join(__dirname, 'main.ejs'))
        let source = ejs.render(templateSource, {entryId: this.entryId, modules: this.modules})
        this.assets = {}
        this.assets[outputFile] = source;
        if (!fs.existsSync(this.config.output.path)) {
            fs.mkdirSync(this.config.output.path)
        }
        fs.writeFileSync(outputFile,this.assets[outputFile])

    }
    run() {
        this.hooks.run.call();
        // 执行
        // 1. 解析当前文件的依赖
        this.hooks.compile.call();
        this.buildModule(path.resolve(this.root, this.entry), true);
        this.hooks.afterCompile.call();
        // 2 发射一个打包后的文件
        this.emitFile()
        this.hooks.emit.call();
        this.hooks.done.call();
    }
}

module.exports = Compiler;