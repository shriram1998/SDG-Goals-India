import React, { useEffect,useRef} from 'react';
import Chart from 'chart.js/auto';
import { connect } from "react-redux";

const BarChart = (props) => {
    const chartRef = useRef(null);
    let labels = [];
    let data = [];

    useEffect(() => {
        if (props.sdg.length) {
            props.sdg.map((val) => {
                if (val.chartdata !== null) {
                    /*Skip states with null values for score*/
                    labels.push(val.area_name);
                    data.push(val.chartdata);
                }
            });
        }
        let barChart = new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: "#73BFB8",
                    categoryPercentage: data.length>15?0.8:0.5,
                    barPercentage: data.length>15?0.9:0.5,
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        min: 0,
                        max: 100
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        return () => {
            barChart.destroy();
        }
    }, [props.sdg]);

    if (props.sdg.length) {
        return <canvas ref={chartRef} />;
    }
    else {
        return null;
    }
}
const mapStateToProps = (state) => {
  return {sdg:state.sdg.data};
}
export default connect(mapStateToProps)(BarChart);