// import React from 'react';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import styles from '@/app/page.module.css'; 

// const CourseReport = () => {
//   const data = [
//     { percentage: 38, value: 20, label: 'BASIC', color: '#F44336' },
//     { percentage: 62, value: 19, label: 'INTERMEDIATE', color: '#FF9800' },
//     { percentage: 62, value: 19, label: 'ADVANCE', color: '#FF9800' },
//   ];

//   return (
//     <div className={styles.reportCard}>
//       <h3>Course Report by Age Category</h3>
//       {data.map((item, index) => (
//         <div key={index} className={styles.reportItem}>
//           <div className={styles.progressWrapper}>
//             <CircularProgressbar
//               value={item.percentage}
//               text={`${item.percentage}%`}
//               styles={buildStyles({
//                 textSize: '24px',
//                 pathColor: item.color,
//                 textColor: '#333',
//                 trailColor: '#f0f0f0',
//               })}
//             />
//           </div>
//           <div className={styles.details}>
//             <h2 style={{ color: item.color }}>{item.value}</h2>
//             <p>{item.label}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseReport;


import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from '@/app/page.module.css'; 

const CourseReport = ({ courseData }) => {
  // Set default data if no courseData is provided
  const data = courseData || [
    { percentage: 0, value: 0, label: 'Beginner', color: '#F44336' },
    { percentage: 0, value: 0, label: 'Intermediate', color: '#FF9800' },
    { percentage: 0, value: 0, label: 'Advanced', color: '#FF9800' },
  ];

  return (
    <div className={styles.reportCard}>
      <h3>Course Report by Level</h3> {/* Updated title to reflect levels */}
      {data.map((item, index) => (
        <div key={index} className={styles.reportItem}>
          <div className={styles.progressWrapper}>
            <CircularProgressbar
              value={item.percentage}
              text={`${item.percentage}%`}
              styles={buildStyles({
                textSize: '24px',
                pathColor: item.color,
                textColor: '#333',
                trailColor: '#f0f0f0',
              })}
            />
          </div>
          <div className={styles.details}>
            <h2 style={{ color: item.color }}>{item.value}</h2>
            <p>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseReport;


