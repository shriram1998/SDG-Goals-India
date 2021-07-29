import React from "react";

export default function Select({ data_list,value,setvalue,label}) {
  return (
    <div className="goal">
      <select
        value={value} onChange={(event) => setvalue(event.target.value )}>
        <option>{ label}</option>
        {data_list.map((data) => (
          <option>{data}</option>
        ))}
      </select>
    </div>
  );
}
