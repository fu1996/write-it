 class SyncBailHook {
     constructor(args) {
        this.tasks = []
     }
     tap(name, task){
         this.tasks.push(task)
     }
     call(...args){
         let ret;
         let index = 0; //
         do {
             ret = this.tasks[index++](...args);
         } while (ret === undefined && index < this.tasks.length);
     }
 }

 let e = new SyncBailHook(['name'])
e.tap('react', (name) => {
    console.log('react', name)
    return '躺平了'
})

e.tap('node', (name) => {
    console.log('node', name)
})

e.call('fjk')