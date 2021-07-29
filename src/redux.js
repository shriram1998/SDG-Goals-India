import { createStore, combineReducers } from "redux";

import { filterData } from "./utils";
import { YEARS } from "./config";

/*Prepare initial state with all the years data in data folder using config*/
let data = {}
YEARS.map((year) => { data[year] = require(`./data/${year}.json`) }); 
const INITIAL_STATE = {
  data:[],
  allYearsData:data
}

function sdgReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH':
      return { ...state, ['data']: filterData(state.allYearsData, action.payload) };
    case 'DISPOSE':
      return {...state, ['data']: [] };
    default:
      return state;
  }
}

const allReducers  = combineReducers({
  sdg :sdgReducer,
});

export const store = createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());