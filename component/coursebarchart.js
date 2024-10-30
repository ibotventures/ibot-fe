import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'U10 pro', Started: 4000, Ongoing: 2400, Completed: 2400 },
  { name: 'U10 pro', Started: 3000, Ongoing: 1398, Completed: 2210 },
  { name: 'U10 pro', Started: 2000, Ongoing: 9800, Completed: 2290 },
  { name: 'U10 pro', Started: 2780, Ongoing: 3908, Completed: 2000 },
  { name: 'U10 pro', Started: 1890, Ongoing: 4800, Completed: 2181 },
  { name: 'U10 pro', Started: 2390, Ongoing: 3800, Completed: 2500 },
  { name: 'U10 pro', Started: 3490, Ongoing: 4300, Completed: 2100 },
];

const CourseBarChart = () => {
  return (
    <div style={{ width: '100%', height: 400, backgroundColor: 'white', borderRadius: '15px', padding: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Started" stackId="a" fill="#331b28" />
          <Bar dataKey="Ongoing" stackId="a" fill="#c84e7c" />
          <Bar dataKey="Completed" stackId="a" fill="#ea9cb7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseBarChart;