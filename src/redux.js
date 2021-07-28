import { createStore, combineReducers,applyMiddleware,compose } from "redux";
import reduxThunk from 'redux-thunk';
import * as data from "./data";
import { filterData } from "./utils";

const INITIAL_STATE = {
  goal: '',
  year: '',
  data:[]
}

function sdgReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_GOAL':
      return { ...state, ['goal']: action.payload };
    case 'SET_YEAR':
      return { ...state, ['year']: action.payload };
    case 'FETCH':
      return { ...state, ['data']: filterData(data, action.payload) };
    case 'DISPOSE':
      return {...state, ['data']: [] };
    default:
      return state;
  }
}

const allReducers  = combineReducers({
  sdg :sdgReducer,
});

export const store = createStore(allReducers,
  compose(applyMiddleware(reduxThunk), window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()));