
// const webpack = require('webpack');

// class MyPlugin {
//     apply(compiler) {
//         // compiler.hooks.beforeCompile.tapAsync('MyPlugin', (a,c,v) => {
//         //     console.log('beforeCompile')
//         // })
//         // compiler.hooks.compile.tap('MyPlugin', (a,c,v) => {
//         //     console.log('compile')
//         // })
//         // compiler.hooks.thisCompilation.tap('MyPlugin', (a,c,v) => {
//         //     console.log('thisCompilation')
//         // })
//         // compiler.hooks.compilation.tap('MyPlugin', (a,c,v) => {
//         //     console.log('compilation')
//         // })
//         // compiler.hooks.done.tapAsync('webpack-bundle-analyzer', (stats, callback) => {
//         //     console.log('a', stats)
//         //     callback();
//         // });
//         // compiler.hooks.emit.tap('A', (compilation) => {
//         //     console.log('aa', compilation)
//         //     const {assets, assetsInfo, buildDependencies, modules, contextDependencies, entries, fileDependencies, modules:{dependencies}, moduleGraph, builtModules} = compilation;
//         //     console.log('aaa', assetsInfo, assets, buildDependencies, modules, contextDependencies, entries, fileDependencies, dependencies, moduleGraph, builtModules);
//         //     entries.forEach(entry => {
//         //         entry.dependencies.forEach(dependency =>{
//         //             console.log('de', dependency)
//         //         })
//         //     })
//         // })
//             /**
//      * 订阅 compiler.hooks.make 事件
//      * 这个事件非常非常重要，是webpack打包的真正起点
//      * compilation： 是每次打包都要创建的实例，它里面可以说是包括了打包过程生产的所有的资源
//      * callback ：entry 编译完成回调
//      * 
//      * 等待 make 被触发
//      */
//     compiler.hooks.make.tapAsync('singleEntryPlugin', (compilation, callback) => {
//         const { name, entry, context } = this
//         compilation.addEntry(context, entry, name, callback)
//       })
//         // compiler.hooks.normalModuleFactory.tap('my', (normalModuleFactory) => {
//         //     console.log('normalModuleFactory', normalModuleFactory);
//         // })
//         // compiler.hooks.contextModuleFactory.tap('my', (contextModuleFactory) => {
//         //     console.log('contextModuleFactory', contextModuleFactory);
//         // })
//         // compiler.hooks.beforeCompile.tap('my', (beforeCompile) => {
//         //     console.log('beforeCompile', beforeCompile);
//         //     beforeCompile.contextModuleFactory.hooks.afterResolve.tap('Myplugin', (ContextModuleFactory) => {
//         //         console.log('ContextModuleFactory', ContextModuleFactory);
//         //         // AsyncSeriesWaterfallHook
//         //         ContextModuleFactory.hooks.beforeResolve.tapPromise('beforeResolve', data => {
//         //             console.log('beforeResolve', data)
//         //         })
//         //         // SyncWaterfallHook
//         //         ContextModuleFactory.hooks.contextModuleFiles.tap('contextModuleFiles', data => {
//         //             console.log('contextModuleFiles', data)
//         //         })
//         //         // AsyncSeriesWaterfallHook
//         //         ContextModuleFactory.hooks.alternativeRequests.tapPromise('alternativeRequests', data => {
//         //             console.log('alternativeRequests', data)
//         //         })
    
//         //     })
//         // })
//         // compiler.hooks.contextModuleFactory.tap('Myplugin', (ContextModuleFactory) => {
//         //     console.log('ContextModuleFactory', ContextModuleFactory);
//         //     // AsyncSeriesWaterfallHook
//         //     ContextModuleFactory.hooks.beforeResolve.tapPromise('beforeResolve', data => {
//         //         console.log('beforeResolve', data)
//         //     })
//         //     // SyncWaterfallHook
//         //     ContextModuleFactory.hooks.contextModuleFiles.tap('contextModuleFiles', data => {
//         //         console.log('contextModuleFiles', data)
//         //     })
//         //     // AsyncSeriesWaterfallHook
//         //     ContextModuleFactory.hooks.alternativeRequests.tapPromise('alternativeRequests', data => {
//         //         console.log('alternativeRequests', data)
//         //     })

//         // })
//         // compiler.resolverFactory.hooks.resolver
//         // .for('[type]')
//         // .tap('name', (resolver) => {
//         //     // you can tap into resolver.hooks now
//         //     resolver.hooks.result.tap('MyPlugin', (result) => {
//         //     return result;
//         //     });
//         // });

//         // compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
//         //     console.log('ContextModuleFactory')
//         //     // Explore each chunk (build output):
//         //     // 测试 getAssets
//         //     compilation.getAssets().forEach(asset => {
//         //         console.log('assets', asset);
//         //     })
//         //     compilation.hooks.beforeModuleAssets.tap('MyPlugin', () => {
//         //         console.log('module', this);
//         //     })
//         //     compilation.hooks.additionalAssets.tapAsync('MyPlugin', (callback) => {
//         //         download('https://img.shields.io/npm/v/webpack.svg', function (resp) {
//         //             if (resp.status === 200) {
//         //                 compilation.assets['webpack-version.svg'] = toAsset(resp);
//         //                 callback();
//         //             } else {
//         //                 callback(
//         //                     new Error('[webpack-example-plugin] Unable to download the image')
//         //                 );
//         //             }
//         //         });
//         //     });

//         //     compilation.chunks.forEach((chunk) => {
//         //         // Explore each module within the chunk (built inputs):
//         //         chunk.getModules().forEach((module) => {
//         //             // Explore each source file path that was included into the module:
//         //             module.buildInfo &&
//         //                 module.buildInfo.fileDependencies &&
//         //                 module.buildInfo.fileDependencies.forEach((filepath) => {
//         //                     console.log('filepath', filepath);
//         //                     // we've learned a lot about the source structure now...
//         //                 });
//         //         });

//         //         // Explore each asset filename generated by the chunk:
//         //         chunk.files.forEach((filename) => {
//         //             // Get the asset source for each file generated by the chunk:
//         //             var source = compilation.assets[filename].source();
//         //         });
//         //     });

//         //     callback();
//         // });
//     }
// }
// module.exports = MyPlugin;