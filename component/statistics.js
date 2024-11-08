

import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import CourseBarChart from '@/component/coursebarchart';
import UserStatusReport from "@/component/userstatusreport";
import CourseReport from "@/component/coursereport";
import '@/app/page.module.css';

import { toast } from 'react-toastify';

const Statistics = () => {
    const [statdata, setstatdata] = useState(null); // Initialize as null

    useEffect(() => {
        const handlecount = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/app/statistics/');
                if (res.status === 200) {
                    console.log(res.data);
                    setstatdata(res.data.data); 
                }
            } catch (error) {  // Capture the error here
                console.error("Error:", error);  // Log the error
                toast.error("Something went wrong - try again");
            }
        };
        handlecount();
    }, []);

    // Prepare course data based on statdata
    const totalCourses = statdata?.total_courses || 0; // Default to 0 if statdata is null
    const beginnerCount = statdata?.courses_by_level?.Beginner || 0; // Use optional chaining
    const intermediateCount = statdata?.courses_by_level?.Intermediate || 0; // Use optional chaining
    const advancedCount = statdata?.courses_by_level?.Advanced || 0; // Use optional chaining

    const courseData = [
        { 
            percentage: totalCourses > 0 ? (beginnerCount / totalCourses) * 100 : 0, 
            value: beginnerCount, 
            label: 'Beginner', 
            color: '#F44336' 
        },
        { 
            percentage: totalCourses > 0 ? (intermediateCount / totalCourses) * 100 : 0, 
            value: intermediateCount, 
            label: 'Intermediate', 
            color: '#FF9800' 
        },
        { 
            percentage: totalCourses > 0 ? (advancedCount / totalCourses) * 100 : 0, 
            value: advancedCount, 
            label: 'Advanced', 
            color: '#FF9800' 
        },
    ];

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div className="chartContainer">

                    <UserStatusReport statdata={statdata} />
                </div>
                <div className="chartContainer">
                    <CourseReport courseData={courseData} />
                </div>
            </div>
            <br />
            <br />
            <div className="chartContainer">
                <CourseBarChart statdata={statdata} />
            </div>
        </>
    );
};

export default Statistics;


