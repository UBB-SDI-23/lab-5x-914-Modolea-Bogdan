import React, { useEffect, useState } from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function ChartFans() {
    const serverLink = 'http://localhost:8080/fans';

    const[fans, setFans] = useState([]);
    const[currentData, setData] = useState([]);
    const[futureData, setFutureData] = useState([]);

    useEffect(() => {
        loadPredictFans();
    }, []);

    const loadPredictFans = async () => {
        const result = await axios.get(serverLink + `/predict-fans`);
        // console.log(result.data);

        const newFans = await axios.get(serverLink + `/get-fans-counter`);
        // console.log(newFans.data);
        setFans(newFans.data);

        console.log(result.data);

        generateData(newFans.data, result.data);
        generateFutureData(newFans.data, result.data);
    }

    const generateData = (fans, result) => {
        const data = [];
        fans.map((fan) => { 
            data.push({x: fan.year, y: fan.counter});
        })
        setData(data);
    }

    const generateFutureData = (fans, result) => {
        const data = [];
        fans.map((fan) => {
            data.push({x: fan.year, y: fan.counter});
        })
        data.push({x: 2024, y: result[0]});
        data.push({x: 2025, y: result[1]});
        data.push({x: 2026, y: result[2]});
        setFutureData(data);
    }


    const options = {
        animationEnabled: true,	
        title:{
            text: "Estimated Number of Fans"
        },
        axisY : {
            title: "Number of Fans",
        },
        toolTip: {
            shared: true
        },
        data: [{
            type: "line",
            name: "Expected Data",
            showInLegend: true,
            dataPoints: futureData
        },
        {
            type: "line",
            name: "Current Data",
            xValueFormatString: "YYYY",
            showInLegend: true,
            dataPoints: currentData
        }]
}

    // console.log(currentData);

    return (
        <div>
            <CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
        </div>
    )
}

