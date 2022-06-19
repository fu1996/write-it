import compose from './compose'

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

