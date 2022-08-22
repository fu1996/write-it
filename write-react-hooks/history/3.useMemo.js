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

// useMemo useCallback 优化 ，防止数据不变重新渲染的问题


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


function Child({ data, onButtonClick }) {
  console.log('child click')
  return <div>{data.age} <button onClick={onButtonClick} >修改年龄</button></div>
}
Child = React.memo(Child); // 要比较两个属性 前后如果一致就不会更新了 shouldComponentUpdate

function App() {
  const [name, setName] = useState('jiang');
  const [age, setAge] = useState(13);

  const data = useMemo(() => ({ age }), [age]); // 这里看一下age如果没有变化 则使用第一次函数返回的结果
  const addClick = useCallback(() => setAge(age + 1), [age])
  return (
    <div>
      {name}
      <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
      <Child data={data} onButtonClick={addClick}></Child>
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