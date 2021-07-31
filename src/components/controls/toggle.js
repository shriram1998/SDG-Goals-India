import React from "react";

export default function Toggle({ data_list, value, togglevalue }) {
    /*Reusable toggle component*/
    return (
        <div className="toggleDiv">
            <span className="toggleSpan">{data_list[0]}</span>
            <label class="switch">
                <input type="checkbox" checked={value} onChange={() => { togglevalue(!value) }}/>
                <span class="slider round"></span>
            </label>
            <span className="toggleSpan">{data_list[1]}</span>
        </div>

    );
}