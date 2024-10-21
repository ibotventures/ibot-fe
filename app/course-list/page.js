'use client';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import React, { useState, useEffect } from 'react';
import Sidebar from '@/component/coursefilter';
import { Button, Offcanvas, OffcanvasBody } from 'reactstrap'
import { FaHourglass, FaFile, FaChartBar, FaCoins, FaListAlt } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import axios from 'axios';
export default function CourseList() {

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Handle window resize to detect screen width and toggle the mobile view
  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsOpen(false); // Close sidebar on larger screens
      }
    };

    window.addEventListener("resize", handleResize);

    // Set initial state based on window width
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handlecourse = async () => {

      try {
        const courses = await axios.get('http://127.0.0.1:8000/app/course-list/');
        setCourseData(courses.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong while loading course data.");
        setLoading(false);
      }
    }
    handlecourse()
  }, []);

  const handleclick = (courseid) => {
    sessionStorage.setItem('course', courseid)
    router.push('/course-preview');

  };
  const router = useRouter();

  if (loading) {
    return <p>Loading....</p>;
  }

  return (

    <>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "3.5vw" }}>
        <div className={styles.occupy}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className={styles.landfont}>Our Courses</h1>
            {/* Sidebar toggle button for mobile */}
            {isMobile && (
              <Button onClick={toggleSidebar} className={styles.sidebartoggle}>
                Filter
              </Button>
            )}
          </div>

          <br />

          {courseData ? (
            courseData.map((course, index) => (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", borderRadius: "2vw", backgroundColor: "white", cursor: "pointer" }} onClick={() => handleclick(course.id)}>
                  <Image src={`http://127.0.0.1:8000${course.course_cover_image}`} alt={'undefined'} style={{ width: "40vw", borderRadius: "2vw 0 0 2vw", height: "28vh" }} className='img-fluid' />
                  <div style={{ width: "60vw", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2vw" }}>
                    <div>
                      <h2 style={{ fontSize: "2vw" }}>{course.course_name}</h2>
                      <div style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5vw" }}>
                          <FaHourglass style={{ color: "orange" }} size={'1.5vw'} />
                          <p className={styles.fontp}>{course.course_duration} hrs</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5vw" }}>
                          <FaFile style={{ color: "orange" }} size={'1.5vw'} />
                          <p className={styles.fontp}>{course.module_count} Modules</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5vw" }}>
                          <FaChartBar style={{ color: "orange" }} size={'1.5vw'} />
                          <p style={{ textAlign: "center" }} className={styles.fontp}>{course.level}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5vw" }}>
                          <FaListAlt style={{ color: "orange" }} size={'1.5vw'} />
                          <p style={{ textAlign: "center" }} className={styles.fontp}>Age {course.age_category}</p>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", justifyContent: "center", gap: "0.5vw" }}>
                        <FaCoins style={{ color: "gold" }} size={'1.5vw'} />
                        <p className={styles.fontp}>{course.course_price}$</p>
                      </div>
                      <button className={classNames("btn btn-primary btn-block")} style={{ width: "fit-content", fontSize: "1.4vw" }}>Buy</button>
                    </div>
                  </div>

                </div>
                <br />
                <br />
              </>

            ))
          ) : (
            <div>
              Empty data
            </div>
          )}

        </div>

        <div className={classNames(styles.fontp, styles.sidebar)}>
          {/* Offcanvas sidebar for mobile, visible sidebar for larger screens */}
          {isMobile ? (
            <Offcanvas isOpen={isOpen} toggle={toggleSidebar} direction="right" style={{ height: "100%" }}>
              <OffcanvasBody className={classNames(styles.fontp, styles.sidebar)} style={{ width: "40vw" }}>
                <Sidebar></Sidebar>
              </OffcanvasBody>
            </Offcanvas>
          ) : (
            <>
              <Sidebar></Sidebar>
            </>
          )}
        </div>
      </div>

    </>

  );
}


