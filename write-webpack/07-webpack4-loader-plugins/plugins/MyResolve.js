const fs = require('fs');
const pathNode = require('path');
class MyResolve {
    constructor({ mode, rule }, c) {
        this.mode = mode || {}
        this.rule = rule || []
        this.source = 'resolve',
            this.target = 'parsed-resolve'
    }

    resolvePath(filename, workdir) {
        const that = this;
        let newPath = filename;
                const houzui = pathNode.extname(filename);
                console.log('houzui', houzui);
                if (this.rule.includes(houzui)) {
                    const resplaceHouzui = `.${this.mode}${houzui}`
                    console.log('resplaceHouzui', resplaceHouzui)
                    // path += '.' + mode;
                    newPath = newPath.replace(houzui, resplaceHouzui)
                    const absPath = pathNode.join(workdir,newPath)
                    console.log('absPath', absPath)
                    fs.exists(absPath, (exists) => {
                        if (exists) {
                            console.log('存在文件',newPath)
                            return newPath;
                        }
                    })
                }
                return filename
    }

    apply(resolver) {
        const resolve = resolver.ensureHook("resolve");
        const parsedResolve = resolver.ensureHook("parsedResolve");
        const describedResolve = resolver.ensureHook("describedResolve");
        const rawModule = resolver.ensureHook("rawModule");
        const module = resolver.ensureHook("module");
        const relative = resolver.ensureHook("relative");
        const describedRelative = resolver.ensureHook("describedRelative");
        const directory = resolver.ensureHook("directory");
        const existingDirectory = resolver.ensureHook("existingDirectory");
        const undescribedRawFile = resolver.ensureHook("undescribedRawFile");
        const rawFile = resolver.ensureHook("rawFile");
        const file = resolver.ensureHook("file");
        const existingFile = resolver.ensureHook("existingFile");
        console.log('ex', existingFile)
        // const target = resolver.ensureHook("file")
        // resolver.getHook('rawFile').tapAsync('MyPlugin', (request, resolveContext, callback) => {
        //     console.log('res', request)
        //     const parsed = resolver.parse(request.request)
        //     console.log('paresd', parsed)
        //     callback();
        // })
        // resolver.getHook('file').tapAsync('MyPlugin', (request, resolveContext, callback) => {
        //     console.log('res', request)
        //     const parsed = resolver.parse(request.request)
        //     console.log('paresd', parsed)
        //     callback();
        // })
        // const target =  resolver.ensureHook("undescribed-raw-file");
        // resolver.getHook("before-existing-directory").tapAsync("DirectoryNamedWebpackPlugin", (request, resolveContext, callback) => {
        //     console.log('request',request)
        // })
        const target = resolver.ensureHook(this.target);
        resolver
            .getHook(this.source) // newResolve
            .tapAsync("ParsePlugin", (request, resolveContext, callback) => {
                console.log('resolveContext',resolveContext)
                // 对 request 进行 parse，解析出 request, query 等信息
                const parsed = resolver.parse(this.resolvePath(request.request, request.path));
                const obj = Object.assign({}, request, parsed);
                console.log('obj', obj);
                if (request.query && !parsed.query) {
                    obj.query = request.query;
                }
                if (parsed && resolveContext.log) {
                    if (parsed.module) resolveContext.log("Parsed request is a module");
                    if (parsed.directory)
                        resolveContext.log("Parsed request is a directory");
                }
                // parsedResolve
                resolver.doResolve(target, obj, null, resolveContext, callback);
            });
            resolver
            .getHook('parsed-resolve') // newResolve
            .tapAsync("ParsePlugin", (request, resolveContext, callback) => {
                callback();
                // parsedResolve
            });
            resolver
            .getHook('resolved') // newResolve
            .tapAsync("ParsePlugin", (request, resolveContext, callback) => {
                callback();
                // parsedResolve
            });
        // resolver.hooks.file.tapAsync('MyResolve', (request, resolveContext, callback) => {
        //     const mode = this.mode;
        //     if (mode === 'h5') {
        //         let { path } = request;
        //         const houzui = pathNode.extname(path);
        //         console.log('houzui', houzui);
        //         if (this.rule.includes(houzui)) {
        //             const resplaceHouzui = `.${mode}${houzui}`
        //             console.log('resplaceHouzui', resplaceHouzui)
        //             // path += '.' + mode;
        //             path.replace(houzui, resplaceHouzui)
        //             fs.exists(path, (exists) => {
        //                 if (exists) {
        //                     request.path = path;
        //                 }
        //             })
        //         }

        //     }
        //     callback();
        // })
    }
}

module.exports = MyResolve;