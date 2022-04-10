 class SyncBailHook {
     constructor(args) {
        this.tasks = []
     }
     tap(name, task){
         this.tasks.push(task)
     }
     call(...args){
        const [firstTask, ...other] = this.tasks
        const res = firstTask(...args);
        other.reduce((a, b) => {
            return b(a)
        }, res);

        //  逻辑2
    //     let lastResult;
    //     this.tasks.forEach(task => {
    //         if (lastResult) {
    //             const res = task(lastResult)
    //             if (res) {
    //                 lastResult = res;
    //             }
    //             return;
    //         }
    //         const res = task(...args);
    //         if (res) {
    //             lastResult = res;
    //         }
    //     })
     }
 }

 let e = new SyncBailHook(['name'])
 e.tap('java', (name) => {
    console.log('java', name)
    return 'java'
})
e.tap('react', (name) => {
    console.log('react', name)
    return '躺平了'
})

e.tap('node', (name) => {
    console.log('node', name)
})

e.call('fjk')