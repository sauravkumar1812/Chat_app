import React from 'react'
import  {Line,Doughnut} from 'react-chartjs-2'
 import { Chart as ChartJS } from 'chart.js'


ChartJS.register();
const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
        },
    ],
};
  return (
   <Line data={{data}}/>
  )
}

const DoughnutChart =() => {
    return (
        <div>DoughnutChart</div>
    )
}
export  {LineChart,DoughnutChart}