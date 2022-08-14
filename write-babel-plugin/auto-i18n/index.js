const {declare} = require('@babel/helper-plugin-utils')

/** unicode cjk 中日韩文 范围 */
const DOUBLE_BYTE_REGEX = /[\u4E00-\u9FFF]/g;

// 对每一个 要翻译的文字 给一个唯一的key
let intlIndex = 0;
function nextIntlKey() {
    ++intlIndex;
    return `intl${intlIndex}`;
}


module.exports = declare((api, options, dirname) => {
    api.assertVersion(7);
    const {targetPackage = 'intl', disableCode = 'i18n-disable'} = options;
    return {
        pre(file) {
            console.log('pre')
            // this.cache = new Map();
            this.cache = [];
        },
        visitor: {
            // `Identifier() { ... }` 是 `Identifier: { enter() { ... } }` 的简写
            // Program(path, state) {
            //     this.cache.set('a', '123')
            // },
            // 1. 判断当前程序 有没有 引入 targetPackage，如果没有引入就给唯一标识并且引入
            Program: {
                // 进入此 监听
                enter(path, state) {
                    // this.cache.set('a', '123')
                    // 进入主程序 先对 主程序 进行处理
                    let imported = false;
                    // 对导入的包进行 分析 看是否引入了 targetPackage
                    path.traverse({
                        // 对引入的进行监听
                        ImportDeclaration(path, state) {
                            console.log('遍历开始')
                            // 判断被导入的包
                            const importPackageName = path.node.source.value;
                            if (importPackageName === targetPackage) {
                                imported = true;
                                // console.log('skip 跳过当前路径的子路径')
                                // path.skip();
                                console.log('stop 终止当前程序')
                                path.stop();
                            }
                        }
                    })
                    // 如果没有引入包 则 通过ast 进入 引入
                    if (!imported) {
                        const uid = path.scope.generateUid(targetPackage);
                        // 生成导入的语法
                        const importAst = api.template.ast(`import ${uid} from '${targetPackage}'`);
                        // 将此 语法 放入 程序的首位
                        path.node.body.unshift(importAst);
                        // 将此id 放入 state 中 后面再用
                        state.inilUid = uid;
                    }
                    // 判断哪些节点是 不需要 进行翻译的 带有 /*i18n-disable*/的注释
                    path.traverse({
                        'StringLiteral|TemplateLiteral'(path, state) {
                            // 如果是 被导入的节点的话
                            if(path.findParent(p => p.isImportDeclaration())) {
                                path.node.skipTransform = true;
                                return;
                            }
                            // 判断注释块 是否存在
                            if (path.node.leadingComments) {
                                // 对 含有 disableCode 的 节点 进行 标记
                                path.node.leadingComments = path.node.leadingComments.filter((comment, index) => {
                                    if (comment.value.includes(disableCode)) {
                                        // 人工做的 跳过的标识
                                        path.node.skipTransform = true;
                                        // 官方api
                                        // 让其父节点直接跳过 (失败了)
                                        // const parentNode = path.findParent(p => p.isVariableDeclaration());
                                        // if (parentNode) {
                                        //     parentNode.shouldSkip = true
                                        // }
                                        return false;
                                    }
                                    return true;
                                })
                            }
                        }
                    })
                },
                // 退出此 监听
                exit(path, state) {
                    // 验证一下是否绑定上了
                    console.log('exit state', state.inilUid)
                }
            },
            StringLiteral(path, state) {
                if (path.node.skipTransform) {
                    return;
                }
                const key = nextIntlKey();
                const value = path.node.value;
                // 判断是不是中文
                if (value.match(DOUBLE_BYTE_REGEX)) {
                    this.cache.push({key, value});
                }
            },
            TemplateLiteral(path, state) {
                console.log('TemplateLiteral', path.node.skipTransform)
            }
        },
        post(file) {
            console.log('post', this.cache)
        }
    }
})