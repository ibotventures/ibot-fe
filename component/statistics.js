import React from 'react';
import CourseBarChart from '@/component/coursebarchart';
import UserStatusReport from "@/component/userstatusreport";
import CourseReport from "@/component/coursereport";
import '@/app/page.module.css';
const Statistics = () => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div className="chartContainer">
                    <UserStatusReport />
                </div>
                <div className="chartContainer">
                    <CourseReport />
                </div>
            </div>
            <br/>
            <br/>
            <div className="chartContainer">
                <CourseBarChart />
            </div>
        </>
    );

};

export default Statistics;