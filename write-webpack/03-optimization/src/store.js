
import { createStore } from 'redux';
const defaultReducer = {
    text:"测试不同挂载节点的通信",
    show:true,
}

const reducer = (state = defaultReducer, action) => {
    switch (action.type) {
        case 'ADD':
          return state + action.payload;
        default: 
          return state;
      }
}
const store = createStore(reducer);

const state = store.getState();

export default state;