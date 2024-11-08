

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['U10 pro', 'U10 pro', 'U10 pro', 'U10 pro', 'U10 pro', 'U10 pro'],
  datasets: [
    {
      label: 'Started',
      data: [3000, 2000, 4000, 3500, 2800, 3100],
      backgroundColor: '#2b0e27',
    },
    {
      label: 'Ongoing',
      data: [2000, 1500, 3000, 2500, 2000, 2200],
      backgroundColor: '#d21d4d',
    },
    {
      label: 'Completed',
      data: [1500, 1000, 2500, 2000, 1700, 1800],
      backgroundColor: '#ec7b9d',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Project Status Overview',
    },
  },
};

const CustomBarChart = () => {
  return <Bar data={data} options={options} />;
};

export default CustomBarChart;


