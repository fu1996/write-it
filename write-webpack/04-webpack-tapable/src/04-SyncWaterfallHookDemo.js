const {SyncWaterfallHook} = require('tapable')
// 下一个事件可以接受上一个事件的返回值
class Lesson {
    constructor(){
        this.hooks = { 
            arch: new SyncWaterfallHook(['name'])// 该对象传递一个name 参数
        }
    }
    tap(){
        this.hooks.arch.tap('node', function(data){
            console.log('node',data)
        })
        this.hooks.arch.tap('react', function(name){
            console.log('react', name)
            // 此处修改了
            return '躺平了'
        })
        this.hooks.arch.tap('java', function(data){
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