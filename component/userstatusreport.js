import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from '@/app/page.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserStatusReport = ({ statdata }) => {
  // Initialize data values to default values in case statdata is not yet available
  const purchasedUsers = statdata && statdata.purchased_users ? statdata.purchased_users : 0;
  const subscribedUsers = statdata && statdata.subscribed_users ? statdata.subscribed_users : 0;
  const visitors = statdata && statdata.users_by_role ? statdata.users_by_role.visitor : 0;
  const admins = statdata && statdata.users_by_role ? statdata.users_by_role.admin : 0;

  const data = {
    labels: ['Purchased User', 'Course Subscriber', 'Visitor', 'Admin'],
    datasets: [
      {
        data: [purchasedUsers, subscribedUsers, visitors, admins], // Use the initialized values
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
          <h2>{statdata ? statdata.total_users : 0}</h2> {/* Display total users or default to 0 */}
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
        <div>
          <span className={styles.blue}></span> Admin
        </div>
      </div>
    </div>
  );
};

export default UserStatusReport;


