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
import { purple } from "../../constants/color";


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
  },
    y: {
      beginAtZero: true,
     grid: {
       display: false,
     },
    },
  },
};
const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "Sales",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor:purple,
      tension: 0.1,
      backgroundColor: "rgba(75,12,192,0.2)",
    },
   ],
  };
  return <Line data={data} options={lineChartOptions}/>;

};

const DoughnutChart = () => {
  return <div>DoughnutChart</div>;
};
export { LineChart, DoughnutChart };
