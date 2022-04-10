const {SyncHook} = require('tapable')
// 1.SyncHook 相当于 发布订阅对象
class Lesson {
    constructor(){
        this.hooks = { 
            arch: new SyncHook(['name'])// 该对象传递一个name 参数
        }
    }
    tap(){
        this.hooks.arch.tap('react', function(name){
            console.log('react', name)
        })
        this.hooks.arch.tap('node', function(name){
            console.log('node',name)
        })
    }
    start(){
        this.hooks.arch.call('fjk')
    }
}


let l = new Lesson()
l.tap() // 注册 两个时间
l.start() //启动钩子