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
import { orange, purple, purpleLight } from "../../constants/color";
import { getLast7Days } from "../../lib/features";


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
const labels = getLast7Days();
const LineChart = ({value=[]}) => {
  const data = {
    labels: labels,
    datasets: [{
      label: "Sales",
      data: value,
      fill: true,
      borderColor:purple,
      tension: 0.1,
      backgroundColor: purpleLight,
  }]
};
  return <Line data={data} options={lineChartOptions}/>;

};


const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout:120,
};
const DoughnutChart = ({value=[],labels=[]}) => {
  const data = {
    labels: labels,
    datasets: [{
      label: "Total Chats vs Group Chats",
      data: value,
      fill: true,
      borderColor:[purple,orange],
      backgroundColor: [purpleLight,orange],
      offset:15
  }]
};
  return <Doughnut data={data} options={doughnutOptions}/>;
};
export { LineChart, DoughnutChart };
