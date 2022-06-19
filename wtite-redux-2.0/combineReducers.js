function combineReducers(reducers) {
  return newReducer;
  // reducer 都是接受 两个函数 一个 参数是 state 另外一个是action。返回新的 reducer 作为state
  function newReducer(state = {}, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key].call(this, state[key], action);
      return nextState;
    }, {});
  }
}

// 方法二
function combineReducers2(reducers) {
  let keys = Object.keys(reducers);
  return function (state = {}, action) {
    keys.reduce((newState, key) => {
      newState[key] = reducers[key](state[key], action);
      return newState;
    }, {});
  };
}

export default combineReducers;
