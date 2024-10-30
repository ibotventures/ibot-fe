import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from '@/app/page.module.css'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const UserStatusReport = () => {
  const data = {
    labels: ['Purchased User', 'Course Subscriber', 'Visitor', 'Admin'],
    datasets: [
      {
        data: [20, 15, 25], // Example data for each category
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800', '#2196F3'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '70%', // For the donut effect
  };

  return (
    <div className={styles.reportCard}>
      <h3>User Status Report</h3>
      <div className={styles.chartContainer}>
        <Doughnut data={data} options={options} />
        <div className={styles.chartCenter}>
          <h2>64</h2>
          <p>Users</p>
        </div>
      </div>
      <div className={styles.legend}>
        <div>
          <span className={styles.green}></span> Purchased User
        </div>
        <div>
          <span className={styles.red}></span> Course Subscriber
        </div>
        <div>
          <span className={styles.orange}></span> Visitor
        </div>
      </div>
    </div>
  );
};

export default UserStatusReport;