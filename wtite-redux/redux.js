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

export default createStore
