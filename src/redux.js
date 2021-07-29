import { createStore, combineReducers,applyMiddleware,compose } from "redux";
import reduxThunk from 'redux-thunk';
import * as data from "./data";
import { filterData } from "./utils";

function sdgReducer(state = [], action) {
  switch (action.type) {
    case 'FETCH':
      return filterData(data, action.payload);
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