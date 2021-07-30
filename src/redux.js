import { createStore, combineReducers } from "redux";

import { filterData } from "./utils";
import { YEARS } from "./config";

/*Prepare initial state with all the years data in data folder using config*/
let data = {}
YEARS.map((year) => { data[year] = require(`./data/${year}.json`) }); 
const INITIAL_STATE = {
  data: [],
  goal: '',
  year: null,
  codeToSDG:null,
  allYearsData:data
}

function sdgReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH':
      let data = filterData(state.allYearsData, action.payload);
      return {
        ...state,
        goal: action.payload.goal,
        year: action.payload.year,
        data: data[0],
        codeToSDG: data[1]
      };
    case 'DISPOSE':
      return {
        ...state,
        goal: '',
        year:null,
        data: [],
        codeToSDG: null
      };
    default:
      return state;
  }
}

const allReducers  = combineReducers({
  sdg :sdgReducer,
});

export const store = createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());