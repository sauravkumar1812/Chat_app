import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  scales,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display:false,
    },  
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,

    },
    y: {
      beginAtZero: true,
     grid: {
       display: false,
     },
    },
  },
}
};
const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [1,2,3],
  };
  return <Line data={data} options={lineChartOptions}/>;

};

const DoughnutChart = () => {
  return <div>DoughnutChart</div>;
};
export { LineChart, DoughnutChart };
