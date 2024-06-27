import React from 'react'
import  {Line,Doughnut} from 'react-chartjs-2'
 import { Chart as ChartJS } from 'chart.js'


ChartJS.register();
const LineChart = () => {
  return (
   <Line data={{}}/>
  )
}

const DoughnutChart =() => {
    return (
        <div>DoughnutChart</div>
    )
}
export  {LineChart,DoughnutChart}