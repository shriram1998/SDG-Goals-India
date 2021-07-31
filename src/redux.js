import { createStore, combineReducers } from "redux";

import { filterData } from "./utils";
import { YEARS } from "./config";

/*Prepare initial state with all the years data in data folder using config*/
let data = {}
YEARS.forEach((year) => { data[year] = require(`./data/${year}.json`) }); 
const INITIAL_STATE = {
  chartData: [],
  goal: '',
  year: null,
  codeToSDG:null,
  allYearsData: data,
  themeToggle:false
}

function sdgReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH':
      /*To add chart and geo data to state for rendering chart and map*/
      let data = filterData(state.allYearsData, action.payload);
      return {
        ...state,
        goal: action.payload.goal,
        year: action.payload.year,
        chartData: data[0],
        codeToSDG: data[1]
      };
    case 'DISPOSE':
      /*Cleanup data when inputs are invalid*/
      return {
        ...state,
        goal: '',
        year:null,
        chartData: [],
        codeToSDG: null
      };
    case 'TOGGLE_MODE':
      return {
        ...state,
        themeToggle:!state.themeToggle,
      }
    default:
      return state;
  }
}

const allReducers  = combineReducers({
  sdg :sdgReducer,
});

export const store = createStore(allReducers);