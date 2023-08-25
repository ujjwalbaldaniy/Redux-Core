import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

// *** reducer *** //
const initialState = 1;
const employeeReducer = (state = initialState, action) => {
  if (action.type === "INIT") {
    return state + action.payload;
  }
  if (action.type === "INCREMENT") {
    return state + action.payload;
  }
  if (action.type === "DECREMENT") {
    return state - 1;
  }
  if (action.type === "INCREMENTBYAMOUNT") {
    return state + action.payload;
  }

  return state;
};

// *** Bonus Reducer *** //
const bonusState = 10;
const bonusReducer = (state = bonusState, action) => {
  if (action.type === "INCREMENT") {
    return state + action.payload;
  }
  return state;
};

// *** create store *** //
const store = createStore(
  combineReducers({ employeeReducer, bonusReducer }),
  applyMiddleware(logger.default, thunk.default)
);

// *** global state *** //
console.log(store.getState());

//  *** action creator  *** //
const getData = (id) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:4000/employee/${id}`);
    dispatch(init(data.price));
  };
};
const init = (value) => {
  return { type: "INIT", payload: value };
};
const increment = (value) => {
  return { type: "INCREMENT", payload: value };
};
const decrement = () => {
  return { type: "DECREMENT" };
};
const incrementByAmount = (num) => {
  return { type: "INCREMENTBYAMOUNT", payload: num };
};

//  *** useDispatch  *** //
// store.dispatch(getData(2));
// store.dispatch(incrementByAmount(4));
store.dispatch(increment(1));
// store.dispatch(decrement());

console.log(store.getState());
