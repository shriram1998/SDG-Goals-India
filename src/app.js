import { connect } from 'react-redux';
import { useEffect } from 'react';
import "./app.css";
import Goal from "./components/controls/goal";
import Year from "./components/controls/year";
import Chart from "./components/chart";
import Map from "./components/map";
import { GOALS_LIST,YEARS } from "./config";
const App = (props) => {

  useEffect(() => {
    /*To prevent dispatch racearound*/
    fetchData(props.sdg.goal, props.sdg.year);
  }, [props.sdg.goal, props.sdg.year]);

  const fetchData = (goal, year) => {
    /*Fetch data when all required input data is present*/
    if (GOALS_LIST.includes(goal) && YEARS.includes(parseInt(year))) {
      props.dispatch({ type: 'FETCH', payload: { goal, year } });
    }
    else {
      props.dispatch({ type: 'DISPOSE'});
    }
  }

  return (
    <div className="App">
      <div className="side">
        <div className="control">
          <Goal goal={props.sdg.goal} dispatch={props.dispatch}/>
          <Year year={props.sdg.year} dispatch={props.dispatch}/>
        </div>
        <Chart />
      </div>
      <Map />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {sdg:state.sdg};
}
export default connect(mapStateToProps)(App);
