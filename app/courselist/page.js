
'use client';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import React, { useState, useEffect } from 'react';
import Sidebar from '@/component/coursefilter';
import { Button, Offcanvas, OffcanvasBody } from 'reactstrap';
import { FaHourglass, FaFile, FaChartBar, FaCoins, FaListAlt } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import axios from 'axios';
import Image from 'next/image';
import Cookies from 'js-cookie';
import debounce from "lodash.debounce";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function CourseList() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [backupcourse,setbackupcourse] = useState([]);
  const [access, setAccess] = useState('no');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState('');
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Debounced function to update filters
  const updateFilter = debounce(async (updatedFilter) => {
    try {
      console.log("Updated Filters (debounced):", updatedFilter);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/courses/`, {
        params: {
          age_category: updatedFilter.age,
          level: updatedFilter.level,
          rating: updatedFilter.rating,
        }
      });

      if (res.status === 200) {
        console.log("Filtered Data:", res.data.data);
        setCourseData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  }, 200);

  const setFilters = (updatedFilter) => {
    // Call the debounced update function
    updateFilter(updatedFilter);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleCourse = async () => {
      setLoading(true);
      try {
        const courses = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/courselist/`);
        const userid = Cookies.get('userid');

        if (userid) {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/canaccesscourse/`, {
            params: { userid }
          });

          if (res.status === 200 && res.data.data === 'allow') {
            setAccess('yes');
          }
        }

        setCourseData(courses.data.data);
        setbackupcourse(courses.data.data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong while loading course data.");
      } finally {
        setLoading(false);
      }
    };

    handleCourse();
  }, []);

  const handleClick = async (courseId) => {
    const userid = Cookies.get('userid');
    if (access === 'yes') {
      sessionStorage.setItem('course', courseId);
      router.push('/coursepreview');
    } else if (userid && access === 'no') {
      toast.error('Get subscription to access course');
    } else {
      toast.error("You haven't logged in yet");
      router.push('/login');
    }
  };

  const handleclearfilter = async () =>{
    setCourseData(backupcourse);
  }

  const handleDelete = async () => {
    if (!courseIdToDelete) return;

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/deletecourse/${courseIdToDelete}/`);
      if (response.status === 200) {
        toast.success('Course deleted successfully');
        setCourseData(prevData => prevData.filter(course => course.id !== courseIdToDelete));
      } else {
        toast.error("Unable to delete");
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error("An error occurred while deleting the course");
    } finally {
      setShowDeleteModal(false);
      setCourseIdToDelete('');
    }
  };

  const confirmDelete = (id) => {
    setCourseIdToDelete(id);
    setShowDeleteModal(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "3.5vw" }}>
        <div className={styles.occupy}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h1 className={styles.landfont}>Our Courses</h1>
              {access === 'no' && (
                <>
                  <p>You haven&apos;t got a Subscription yet. Buy one to access all of our courses.</p>
                  <button className="btn btn-primary" style={{ fontSize: "1.4vw" }}>
                    Buy Subscription
                  </button>
                </>
              )}
            </div>

            {isMobile && (
              <Button onClick={toggleSidebar} className={styles.sidebartoggle}>
                Filter
              </Button>
            )}
          </div>

          <br />
          {courseData.length ? (
            courseData.map((course) => (
              <div key={course.id} style={{ marginBottom: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    borderRadius: "2vw",
                    backgroundColor: "white",
                    cursor: "pointer"
                  }}
                  onClick={() => handleClick(course.id)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${course.course_cover_image}`}
                    alt="Course Cover"
                    style={{ width: "40vw", borderRadius: "2vw 0 0 2vw", height: "28vh" }}
                    className="img-fluid"
                    width={500} height={300}
                  />
                  <div style={{ width: "60vw", padding: "2vw", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h2 style={{ fontSize: "2vw" }}>{course.course_name}</h2>
                      <div style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", gap: "0.5vw" }}>
                          <FaHourglass style={{ color: "orange" }} size="1.5vw" />
                          <p className={styles.fontp}>{course.course_duration} hrs</p>
                        </div>
                        <div style={{ display: "flex", gap: "0.5vw" }}>
                          <FaFile style={{ color: "orange" }} size="1.5vw" />
                          <p className={styles.fontp}>{course.module_count} Modules</p>
                        </div>
                        <div style={{ display: "flex", gap: "0.5vw" }}>
                          <FaChartBar style={{ color: "orange" }} size="1.5vw" />
                          <p className={styles.fontp}>{course.level}</p>
                        </div>
                        <div style={{ display: "flex", gap: "0.5vw" }}>
                          <FaListAlt style={{ color: "orange" }} size="1.5vw" />
                          <p className={styles.fontp}>{course.age_category}</p>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "0.5vw" }}>
                        <FaCoins style={{ color: "gold" }} size="1.5vw" />
                        <p className={styles.fontp}>{course.course_price}$</p>
                      </div>
                      {Cookies.get('username') === 'Administrator' ? (
                        <button
                          className="btn btn-primary"
                          style={{ fontSize: "1.4vw" }}
                          onClick={(e) => {
                            e.stopPropagation();  // Prevents navigation
                            confirmDelete(course.id);
                          }}
                        >
                          Delete
                        </button>
                      ) : null}

                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No data available</div>
          )}
        </div>

        <div className={classNames(styles.fontp, styles.sidebar)}>
          {isMobile ? (
            <Offcanvas isOpen={isOpen} toggle={toggleSidebar} direction="right" style={{ height: "100%" }}>
              <OffcanvasBody className={classNames(styles.fontp, styles.sidebar)} style={{ width: "40vw" }}>
                <Sidebar setFilters={setFilters} />
              </OffcanvasBody>
            </Offcanvas>
          ) : (
            <>
              <Sidebar setFilters={setFilters} />
            </>

          )}
        </div>

        <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}>
          <ModalHeader toggle={() => setShowDeleteModal(false)}>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete this course?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDelete}>Yes</Button>
            <Button color="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
