import React from "react";
import { YEARS } from "../../config";

export default function Year({ year,dispatch}) {
  return (
    <div className="goal">
      <select
        value={year}
        onChange={(event) => dispatch({ type: 'SET_YEAR', payload: event.target.value })}>
        <option>Select Year</option>
        {YEARS.map((goal) => (
          <option>{goal}</option>
        ))}
      </select>
    </div>
  );
}
