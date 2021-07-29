import { connect } from 'react-redux';
import { useState,useEffect } from 'react';
import "./app.css";
import Select from "./components/controls/select";
import Chart from "./components/chart";
import Map from "./components/map";
import { GOALS_LIST, YEARS } from "./config";

const GOAL_LABEL = "Select Goal";
const YEAR_LABEL = "Select Year";

const App = (props) => {
  const [goal, setgoal] = useState(GOAL_LABEL);
  const [year, setyear] = useState(YEAR_LABEL);

  useEffect(() => {
    /*Call data fetch function when goal or year changes*/
    fetchData(goal,year);
  }, [goal,year]);

  const fetchData = (goal, year) => {
    /*Fetch data when all required input data is present and cleanup*/
    if (GOALS_LIST.includes(goal) && YEARS.includes(parseInt(year))) {
      props.dispatch({ type: 'FETCH', payload: { goal, year:parseInt(year) } });
    }
    else {
      if (props.sdg.length!==0) {
        props.dispatch({ type: 'DISPOSE' });
      }
    }
  }

  return (
    <div className="App">
      <div className="side">
        <div className="control">
          <Select data_list={ GOALS_LIST} value={goal} setvalue={setgoal} label={ GOAL_LABEL}/>
          <Select data_list={ YEARS} value={year} setvalue={setyear} label={ YEAR_LABEL}/>
        </div>
        <Chart />
      </div>
      <Map />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {sdg:state.sdg.data};
}
export default connect(mapStateToProps)(App);
