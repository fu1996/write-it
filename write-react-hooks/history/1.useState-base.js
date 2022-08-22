import React from 'react';
import ReactDOM from 'react-dom/client';


let lastState; // 记录我们上次的状态
function useState(initialState) {
  lastState = lastState || initialState; // 如果保存过状态责采用上次的 否则采用默认状态
  function setState(newState) {
    lastState = newState;
    render()
  }
  return [lastState, setState]
}
function Counter() {
  // 1) useState的目的就是在函数中可以 实现管理状态
  // 2) useState 有返回值 1） 状态  2） 状态更新
  let [number, setNumber] = useState(0)
  return (
    <div>
      {number}
      <button onClick={() => setNumber(number + 1)}>累加</button>
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
function render() {
  root.render(
    <Counter />
  );
}
render()

