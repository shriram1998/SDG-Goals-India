import React from "react";
import { GOALS_LIST } from "../../config";

export default function Goal({ goal,dispatch}) {
  return (
    <div className="goal">
      <select
        value={goal} onChange={(event) => dispatch({ type: 'SET_GOAL', payload: event.target.value })}>
        <option>Select Goal</option>
        {GOALS_LIST.map((goal) => (
          <option>{goal}</option>
        ))}
      </select>
    </div>
  );
}
