

import React from 'react';
import ReactDOM from 'react-dom/client';


let hookStates = []; // 保存所有状态的数组
let hookIndex = 0; // 默认 从第一个开始保存状态


function useMemo(factory, dependencies) {
  if (hookStates[hookIndex]) { // // { age }    [age]
    // 缓存过对象了
    let [lastMemo, lastDependencies] = hookStates[hookIndex];
    // 此时我们需要比较一下  dependencies 和 lastDependencies 值有没有变化 ，如果没有变化则说明返回原来的对象即可
    // 如果有变化 则产生一个最新的对象缓存起来
    let same = dependencies.every((item, index) => item === lastDependencies[index]);
    if (same) {
      hookIndex++;
      return lastMemo
    } else {
      let newMemo = factory()
      hookStates[hookIndex++] = [newMemo, dependencies];
      return newMemo
    }
  } else {
    // 没有缓存过对象
    let newMemo = factory()
    hookStates[hookIndex++] = [newMemo, dependencies]; // 将第一次的结果缓存起来
    return newMemo
  }
}
function useCallback(callback, dependencies) {
  if (hookStates[hookIndex]) { // // { age }    [age]
    // 缓存过对象了
    let [lastCallback, lastDependencies] = hookStates[hookIndex];
    // 此时我们需要比较一下  dependencies 和 lastDependencies 值有没有变化 ，如果没有变化则说明返回原来的对象即可
    // 如果有变化 则产生一个最新的对象缓存起来
    let same = dependencies.every((item, index) => item === lastDependencies[index]);
    if (same) {
      hookIndex++;
      return lastCallback
    } else {
      hookStates[hookIndex++] = [callback, dependencies];
      return callback
    }
  } else {
    // 没有缓存过对象
    hookStates[hookIndex++] = [callback, dependencies]; // 将第一次的结果缓存起来
    return callback
  }
}
function useEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    let [lastDestroy, lastDependencies] = hookStates[hookIndex];
    let same = false;
    if (lastDependencies) {
      same = dependencies.every((item, index) => item === lastDependencies[index])
    }
    if (same) {
      hookIndex++;
    } else {
      lastDestroy && lastDestroy(); // 如果需要销毁 则调用上一次的销毁
      let arr = [, dependencies]
      setTimeout(() => {
        arr[0] = callback();
      })
      hookStates[hookIndex++] = arr
    }
  } else {
    let arr = [, dependencies]
    setTimeout(() => {
      arr[0] = callback();
    })
    hookStates[hookIndex++] = arr
  }
  // 1) 第一次执行的时候 需要将销毁函数缓存起来，下次执行的时候 先调用销毁函数
}
function useLayoutEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    let [lastDestroy, lastDependencies] = hookStates[hookIndex];
    let same = false;
    if (lastDependencies) {
      same = dependencies.every((item, index) => item === lastDependencies[index])
    }
    if (same) {
      hookIndex++;
    } else {
      lastDestroy && lastDestroy(); // 如果需要销毁 则调用上一次的销毁
      let arr = [, dependencies]
      queueMicrotask(() => {
        arr[0] = callback();
      })
      hookStates[hookIndex++] = arr
    }
  } else {
    let arr = [, dependencies]
    queueMicrotask(() => {
      arr[0] = callback();
    })
    hookStates[hookIndex++] = arr
  }
  // 1) 第一次执行的时候 需要将销毁函数缓存起来，下次执行的时候 先调用销毁函数
}
function useRef(initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || { current: initialState };
  return hookStates[hookIndex++]
}
function useState(initialState) {
  return useReducer(null, initialState)
}
function useReducer(reducer, initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function dispatch(action) {
    // 这里只是基于了一个函数 来实现了状态初始化
    hookStates[currentIndex] = reducer ? reducer(hookStates[currentIndex], action) : action
    render();
  }
  return [hookStates[hookIndex++], dispatch]
}
function useContext(context) { // 内部使用Provider的时候 会将提供的数据 挂在到ConuterContext 上
  return context._currentValue
}
// Provider Consumer 提供数据的  消费数据的

function useImperativeHandle(ref, handle) {
  ref.current = handle(); // 将函数执行后的结果赋予到current上
}
const ConuterContext = React.createContext();// 创建一个上下文组件


//  父组件 想拿到子组建的dom元素 
// 类组件中可以通过ref拿到组件的实例，但是函数式组件是没有实力的

function Child(props, inputRef) {

  // 可以将组件到处的变量数据 都放在里面
  useImperativeHandle(inputRef, () => ({
    focus() {
      console.log('ok')
    },
    blur() {
      console.log('blur')
    }
  }))
  return <input type="text" ></input>
}

const ForwardChild = React.forwardRef(Child)
function App() {
  const inputRef = useRef();

  function getFoucus() {
    console.log(inputRef.current)
    // inputRef.current.focus()
  }
  return <div>

    <ForwardChild ref={inputRef}></ForwardChild>
    <button onClick={getFoucus}>获取焦点</button>

  </div>
}






const root = ReactDOM.createRoot(document.getElementById('root'));
function render() {
  hookIndex = 0; // 保证每次渲染的时候 都是从0的开始 进行匹配获取状态
  root.render(
    <App />
  );
}
render()


// 1) useState 我们将useState的状态 管理到数组里， 将索引和状态关联起来
// 2) 每次更新状态的时候 通过索引获取对应的状态，并进行更新