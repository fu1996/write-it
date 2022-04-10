 class SyncHook {
     constructor(args) {
        this.tasks = []
     }
     tap(name, task){
         this.tasks.push(task)
     }
     call(...args){
         this.tasks.forEach(task => task(...args))
     }
 }

 let e = new SyncHook(['name'])
e.tap('react', (name) => {
    console.log('react', name)
})

e.call('fjk')