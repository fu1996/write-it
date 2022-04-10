 class SyncLoopHook {
     constructor(args) {
        this.tasks = []
     }
     tap(name, task){
         this.tasks.push(task)
     }
     call(...args){
         this.tasks.forEach(function(task){
             let res
             do {
                res = task(...args)
             } while (res!== undefined);
         })
     }
 }

 let e = new SyncLoopHook(['name'])

 let total = 0;
 e.tap('java', (name) => {
    console.log('java', name)
})
e.tap('react', (name) => {
    console.log('react', name)
    return ++total === 3 ? undefined :'continue'
})

e.tap('node', (name) => {
    console.log('node', name)
})

e.call('fjk')