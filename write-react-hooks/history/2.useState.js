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
function Counter() {
  // 1) useState的目的就是在函数中可以 实现管理状态
  // 2) useState 有返回值 1） 状态  2） 状态更新
  let [number1, setNumber1] = useState(0);   // [0:number1,  1:number2]
  let [number2, setNumber2] = useState(1); // 序列 
  return (
    <div>
      {number1}
      <button onClick={() => setNumber1(number1 + 1)}>累加1</button>
      <hr></hr>
      {number2}
      <button onClick={() => setNumber2(number2 + 1)}>累加2</button>
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
function render() {
  hookIndex = 0; // 保证每次渲染的时候 都是从0的开始 进行匹配获取状态
  root.render(
    <Counter />
  );
}
render()

