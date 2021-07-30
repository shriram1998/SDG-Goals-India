import React from "react";

export default function Select({ data_list, value, setvalue, label }) {
    /*Reusable selector*/
  return (
    <div className="selector">
      <select
        value={value} onChange={(event) => setvalue(event.target.value )}>
        <option className="options" selected="selected">{ label}</option>
        {data_list.map((data) => (
          <option className="options">{data}</option>
        ))}
      </select>
    </div>
  );
}
