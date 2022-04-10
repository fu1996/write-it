# tapable 的使用

## 1.SyncHook 相当于 发布订阅对象

## 2. SyncBailHook 熔断性 如果注册的事件函数中 返回了非undefined 的形式 就中断执行了

## 3. SyncWaterfallHook 瀑布性事件 下一个阶段的事件可以获取到上个阶段的返回值

## 4. SyncLoopHook 