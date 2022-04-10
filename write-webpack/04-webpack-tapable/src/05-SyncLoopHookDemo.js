const {SyncLoopHook} = require('tapable')
// 可以重复执行某个事件多次
class Lesson {
    constructor(){
        this.hooks = { 
            arch: new SyncLoopHook(['name'])// 该对象传递一个name 参数
        }
        this.index = 0
    }
    tap(){
        this.hooks.arch.tap('node', (data) => {
            console.log('node',data)
            return ++this.index === 3 ? undefined :'continue'
        })
        this.hooks.arch.tap('react', (name) => {
            console.log('react', name)
        })
        this.hooks.arch.tap('java', (data) => {
            console.log('java',data)
        })
    }
    start(){
        this.hooks.arch.call('fjk')
    }
}


let l = new Lesson()
l.tap() // 注册 两个时间
l.start() //启动钩子