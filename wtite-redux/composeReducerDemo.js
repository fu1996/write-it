import combineReducers from "./combineReducers";
import createStore from "./redux";
import todos from "./todos";
import counter from "./counter";

const reducer = combineReducers({
  todos,
  counter,
});

let store = createStore(reducer);
console.log(store.getState());
// {
// counter: 0,
// todos: []
// }

store.dispatch({
  type: "ADD_TODO",
  text: "Use Redux",
});
console.log(store.getState());
// {
// counter: 0,
// todos: [ 'Use Redux' ]
// }
