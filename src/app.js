import { connect } from "react-redux";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./app.css";
import Select from "./components/controls/select";
import Toggle from "./components/controls/toggle";
import Map from "./components/map/map";
import BarChart from "./components/chart/barChart";
import { GOALS_LIST, YEARS } from "./config";

const GOAL_LABEL = "Select Goal";
const YEAR_LABEL = "Select Year";

const App = (props) => {
  const [goal, setgoal] = useState(GOAL_LABEL);
  const [year, setyear] = useState(YEAR_LABEL);
  const [toggleUT, settoggleUT] = useState(false);
  const [toggleLight, settoggleLight] = useState(false);
  /* eslint-disable */
  useEffect(() => {
    /*Dispatching fetch and cleanup*/
    if (GOALS_LIST.includes(goal) && YEARS.includes(parseInt(year))) {
      props.dispatch({ type: 'FETCH', payload: { goal, toggleUT,year:parseInt(year) } });
    }
    else {
      if (props.sdg.length) {
        props.dispatch({ type: 'DISPOSE' });
      }
    }
  }, [goal,year,toggleUT]);
  
  useEffect(() => {
    /*Dispatch theme mode to modify chart colors*/
    props.dispatch({ type: 'TOGGLE_MODE'});
  }, [toggleLight]);
  /* eslint-enable */

  return (
    <div className="App" data-theme={ toggleLight===false?"dark":"light"}>
      <div className="side">
        <div className="control centeredDiv">
          <p className="title"><span className="titleSpan">SDG</span> India</p>
        </div>
        <hr className="line"/>
        <div className="control justifiedDiv">
          <div className="label">Goal</div>
          <div className="label">Year</div>
        </div>
        <div className="control">
          <Select data_list={ GOALS_LIST} value={goal} setvalue={setgoal} label={ GOAL_LABEL}/>
          <Select data_list={ YEARS} value={year} setvalue={setyear} label={ YEAR_LABEL}/>
        </div>
        <div className="control justifiedDiv">
          <Toggle data_list={['States', 'UT']} value={toggleUT} togglevalue={ settoggleUT}/>
          <Toggle data_list={['🌜', '☀️']} value={toggleLight} togglevalue={ settoggleLight}/>
        </div>
        <hr className="line"/>
        <div className="chart">
          <BarChart/>
        </div>
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {sdg:state.sdg.chartData};
}
export default connect(mapStateToProps)(App);
