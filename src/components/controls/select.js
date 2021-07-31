import React from "react";

export default function Select({ data_list, value, setvalue, label }) {
    /*Reusable selector*/
  return (
    <div className="selector">
      <select
        value={value} onChange={(event) => setvalue(event.target.value )}>
        <option key="0" className="options">{ label}</option>
        {data_list.map((data,ix) => (
          <option key={ix+1} className="options">{data}</option>
        ))}
      </select>
    </div>
  );
}
