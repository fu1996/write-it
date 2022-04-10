const {SyncBailHook} = require('tapable')
class Lesson {
    constructor(){
        this.hooks = { 
            arch: new SyncBailHook(['name'])// 该对象传递一个name 参数
        }
    }
    tap(){
        this.hooks.arch.tap('react', function(name){
            console.log('react', name)
            // 此处修改了
            return '躺平了'
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