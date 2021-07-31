import React, { useEffect,useRef} from "react";
import Chart from "chart.js/auto";
import { connect } from "react-redux";

Chart.defaults.font.size = 12;
Chart.defaults.font.weight = 500;
Chart.defaults.font.family = "'Trebuchet MS','Lucida Sans Unicode','Lucida Grande','Lucida Sans', Arial, sans-serif";


const BarChart = (props) => {
    const chartRef = useRef(null);
    let labels = [];
    let data = [];

    /* eslint-disable */
    useEffect(() => {
        /*Color chart ticks and lines based on theme chosen*/
        Chart.defaults.color = props.lightMode ? "#000" : "#FFF";
        Chart.defaults.borderColor = props.lightMode ? "#000" : "#FFF";
        
        if (props.sdg.length) {
            props.sdg.forEach((val) => {
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
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth:1,
                    categoryPercentage: data.length>15?0.8:0.5,
                    barPercentage: data.length>15?0.9:0.5,
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        type: 'category',
                        grid: {
                            display: false,
                        }
                    },
                    x: {
                        type:'linear',
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize:20
                        }
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
            /*Chart cleanup*/
            barChart.destroy();
        }
    }, [props]);
    /* eslint-enable */
    if (props.sdg.length) {
        return <canvas ref={chartRef} />;
    }
    else {
        return null;
    }
}
const mapStateToProps = (state) => {
  return {sdg:state.sdg.chartData,lightMode:state.sdg.lightMode};
}
export default connect(mapStateToProps)(BarChart);