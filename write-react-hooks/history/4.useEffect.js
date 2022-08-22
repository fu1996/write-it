import React from 'react';
import ReactDOM from 'react-dom/client';


let hookStates = []; // 保存所有状态的数组
let hookIndex = 0; // 默认 从第一个开始保存状态

function useState(initialState) {
  // 将当前的状态保存到数组中  1 ： 1
  hookStates[hookIndex] = hookStates[hookIndex] || initialState
  // 这里应该将hookIndex 先进行保留 ，保证setState时拿到的是自己的索引
  let currentIndex = hookIndex;
  function setState(newState) {
    hookStates[currentIndex] = newState;
    render();
  }
  return [hookStates[hookIndex++], setState]
}
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
      const destroy = callback();
      hookStates[hookIndex++] = [destroy, dependencies]
    }
  } else {
    const destroy = callback();
    hookStates[hookIndex++] = [destroy, dependencies]
  }
  // 1) 第一次执行的时候 需要将销毁函数缓存起来，下次执行的时候 先调用销毁函数
}
// useEffect 解决的问题是什么？  在函数式组件中 不能绑定事件， 操作dom，定时器。。。。 副作用
// 有一个入口 可以进入到函数式编程中
// useEffect componentDidMount  componentDidUpdate  componentWillUpdate
function App() {
  const [name, setName] = useState('jiang');
  const [number, setNumber] = useState(0);
  useEffect(() => {
    console.log('ok')
    // let timer = setInterval(() => {
    //   setNumber(number + 1)
    // }, 1000);

    // return () => { // destroy
    //   clearTimeout(timer)
    // }
  }, []); // 空数组意味着只执行一次


  return (
    <div>
      {name}  <br />
      {number}
      <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
      <button onClick={() => setNumber(number + 1)}> +</button>
    </div>
  )
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


