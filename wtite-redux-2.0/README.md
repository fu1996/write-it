
# redux设计模式

## 再认识数组的 reducer 函数

- **reduce函数**是一个非常强大的函数，可以从现有的数据结合中构建出新的数据集
- **reduce函数**是一个高阶函数[在不影响原函数内部代码的情况下对原函数进行修饰，添加新功能]，**reduce**接受两个参数：一个纯函数和一个初始状态，纯函数使用当前列表项和前一个状态参数做递归计算。**MDN [文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)**
- 补充纯函数：纯函数的概念：一个函数的返回结果只依赖其参数，并且执行过程中没有副作用。[纯函数的参考文档](https://blog.csdn.net/qq_42497250/article/details/93625668)

```javascript
var initialState = 0;

var sum = [1,2,3,4,5].reduce(add, initialState); // => 15

function add(a, b) {
    // the reduce method with apply arguments to this method as follows:
    // `a` the previous state
    // `b` the current item in the list
    return a + b;
}

// when `.reduce` is called `add` is recursively evaluated as follows:
// add(0, 1)  => 1
// add(1, 2)  => 3
// add(3, 3)  => 6
// add(6, 4)  => 10
// add(10, 5) => 15
```

**PS:**在redux中使用reduce来为store创建一个可管理的状态容器。在上面的示例中，每次`add`执行以后否会返回递归过程中的当前状态，在redux中`add`方法被称为`reducer`，列表中的元素可以被看做是`action`，每次action执行的结果可以看做是当前程序的状态。

**PS**: 还有一个数组的 reduceRight 的api 是从右侧开始传递数据的，下面会有相关的涉及。



## 复合函数

复合函数是将一个函数的结果作为另外一个函数的参数的一种方式，可以让我们通过此方法来组合其他函数创建新的函数，在redux中 使用复合函数来创建的中间件。貌似也只有此种方法才能修改redux的单向数据流。

```javascript
function f(x) { return x*x }
function g(x) { return x*2 }
function h(x) { return x+1 }

f(g(h(2))) // => [2+1=3] => [3*2 = 6] => [6*6 = 36]
```

## 开始实现redux

利用目前对`reduce`函数组合的了解，让我们来从头开始实现 **redux**中的一些常用方法



### 1. 创建store

**store**是redux中的核心存储，一个简单的 Redux的存储有以下部分：

- store的状态
- dispatch方法：派发action到store
- listener方法：监听状态的改变
- reducer：一个纯函数，根据dispatch的action 来改变store的状态
- getState方法：返回存储的当前状态

开始搞：

```javascript
function createStore(reducer) {
    let state; //存储 数据
    const listeners = []; // 监听的函数列表
    
    function getState() {
      return state;
    }
    
    // 订阅 事件
    function subscribe(listener) {
      listeners.push(listener)
      // 取消订阅
      return function unsubscribe() {
        const index = listeners.indexOf(listener)
        listeners.splice(listener)
      }
    }
    
    // 派发 action
    function dispatch(action) {
      //1. 新的state 是通过reducer处理旧的state和action 的结果
      //2. reducer是纯函数，无副作用，其结果只依赖于参数，该函数返回了一个新的state对象。该对象作为redux的当前状态
      state = reducer(state, action)
      
      listeners.forEach(listener => listener())
    }
    
    // 初始化 state
    dispatch({})
    
    return {
      dispatch,
      subscribe,
      getState,
    }
  }
```

### 2. combineReducers [组合多个reducer]

使用单个的reducer适用于大部分简单的应用，但是随着业务体量的增加我们一般需要使用多个reducer 进行状态的管理。

```javascript
const state = {
	foo: [],
  bar: null,
}

const rootReducer = combinReducers({
  foo:fooReducer,
  bar:barReducer,
})
```

该 **combineReducers** 接受一个键值映射的参数，该参数是子reducer，然后 **combineReducers** 会将子 reducer 映射到 stare 字段并返回一个新的 reducer。

实现它：

```javascript
function combineReducers(reducers) {
  return newReducer;
  // reducer 都是接受 两个函数 一个 参数是 state 另外一个是action。返回新的 reducer 作为state
  function newReducer(state,action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key].call(this, state[key], action)
      return nextState
    }, {})
  }
}

// 方法二
	function combineReducers2(reducers) {
		let keys = Object.keys(reducers)
		return function (state = {}, action) {
			keys.reduce((newState, key) => {
				newState[key] = reducers[key](state[key], action)
				return newState
			}, {})
		}
	}
```

### 3. redux 的中间件

redux 中的中间件的原理还是 之前的 **复合函数的**概念

实现一个 **compose**函数来对中间件进行函数组合

```javascript
function compose(...funcs) {
    return function(...args) {
        const lastFn = funcs[funcs.length - 1];
        const fns = funcs.slice(0, funcs.length - 1);
        return fns.reduceRight((result, fn) => 
        fn(result),
        lastFn(...args));
    }
}

function f(x) { console.log(f); return x*x }
function g(x) { console.log(g); return x*2 }
function h(x) { console.log(h); return x+1 }


const res = compose(f,g,h)(2)

console.log('res: ', res); // 36
```

### 4. 创建中间件

**applyMiddleware**将创建中间件，该中间件 在 **dispatch**和  **action** 之间，所以数据流是：

```
// [Dispatch action] --> [Middleware functions] --> [Store's reducer]
```

Demo: 

```javascript
import { createStore, applyMiddleware } from 'redux'
import todos from './reducers'

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }
}

let createStoreWithMiddleware = applyMiddleware(logger)(createStore)
let store = createStoreWithMiddleware(todos, [ 'Use Redux' ])

store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
})
// (将打印如下信息:)
// will dispatch: { type: 'ADD_TODO', text: 'Understand the middleware' }
// state after dispatch: [ 'Use Redux', 'Understand the middleware' ]
```

开始搞 **applyMiddleware**：

```javascript
const compose = require('./compose');

function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, initialState) => {
      const store = createStore(reducer, initialState)
      let {dispatch, getState, subscribe} = store;
      
      const api = {
        getState,
        dispatch,
      }
      // 将 需要的api 传递给 中间件
      const chain = middlewares.map((middleware) => middleware(api))
      // 构造出新的 dispatch
      dispatch = compose(...chain)(dispatch)
      // 返回新的 dispatch
      return {
        subscribe,
        getState,
        dispatch,
      }
    }
  }

export default applyMiddleware;


```



## 参考文章


[博客地址](https://lhwz666.gitee.io/2022/04/09/react/redux/01-%E6%B7%B1%E5%85%A5redux/)


[redux的设计模式](http://paulserraino.com/redux-design-patterns)
