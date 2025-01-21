'use client';
import classNames from 'classnames';
import styles from "@/app/page.module.css";
import React, { useState, useEffect } from 'react';
import Sidebar from '@/component/coursefilter';
import { Button, Offcanvas, OffcanvasBody, Spinner } from 'reactstrap';
import { FaHourglass, FaFile, FaListAlt } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import Image from 'next/image';
import Cookies from 'js-cookie';
import debounce from "lodash.debounce";
import RazorpayComponent from "@/component/RazorpayComponent";
import styler from '@/app/courselist/courselist.module.css'

export default function CourseList() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [access, setAccess] = useState('no');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [contact, setcontact] = useState('');
  const router = useRouter();
  // const user = Cookies.get('userid');
  // const [subscription, setsubscription] = useState(false);
  const [subscription, setsubscription] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Debounced function to update filters
  const updateFilter = debounce(async (updatedFilter) => {
    try {
      console.log("Updated Filters (debounced):", updatedFilter);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/coursescategory/`, {
        params: {
          category: updatedFilter.age,
          rating: updatedFilter.rating,
        }
      });

      if (res.status === 200) {
        setCourseData(res.data.data);
      }
    } catch (error) {
      // console.error("Error fetching filtered data:", error);
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
      // setLoading(true);
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
        console.log(courses.data.data);
        setCourseData(courses.data.data);

      } catch (error) {
        // console.error("Error:", error);
        toast.error("Something went wrong while loading course data.");
      }
      // finally {
      //   setLoading(false);
      // }
    };

    handleCourse();
  }, [subscription]);

  useEffect(() => {

    const getdetails = async () => {
      try {
        const userId = Cookies.get('userid');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/getdetail/`, {
          params: { id: userId },
        });

        const data = response.data.data;
        setemail(data.email || '');
        setusername(data.username || '');
        setcontact(data.mobile || '');
      } catch (error) {
        // console.error(error);
      }
    }
    getdetails();

  }, []);

  const handleClick = async (courseId) => {
    const userid = Cookies.get('userid');
    if (access === 'yes') {
      sessionStorage.setItem('course', courseId);
      router.push('/coursepreview');
    } else if (userid && access === 'no') {
      setShowDeleteModal(true);
    } else {
      toast.error("You haven't logged in yet");
      router.push('/login');
    }
  };

  // if (loading) {
  //   return (
  //       // <p>Loading...</p>
  //     <div className="d-flex align-items-center flex-column justify-content-center" style={{ width: '100vw', height: '90vh' }}>
  //       <Image
  //         src='/roboload.png'
  //         className="img-fluid"
  //         alt="Profile Image"
  //         width={300}
  //         height={300}
  //       />
  //       <h4 style={{textAlign:'center'}}>"Almost there! Your data is on its way..."</h4>
  //       <Spinner>
  //         Loading...
  //       </Spinner>
  //     </div>

  //   );
  // }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "3vw", paddingRight: '20px' }}>

        <div className={styles.occupy}>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ paddingLeft: '23px' }}>
              <h1>Courses</h1>
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
              <div key={course.id} style={{ marginBottom: "2rem", paddingLeft: '20px' }} className='container-fluid'>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    borderRadius: "2vw",
                    backgroundColor: "white",
                    cursor: "pointer"
                  }}
                  className={styler.courseresponsive}
                  onClick={() => handleClick(course.id)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${course.course_cover_image}`}
                    alt="Course Cover"
                    className={classNames('img-fluid', styler.courseImage)}
                    width={200} height={300}
                    unoptimized

                  />
                  <div className={styler.courseDetails}>
                    <div>
                      <h2>{course.course_name}</h2>
                      <div style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", gap: "0.5vw" }}>
                          <FaHourglass style={{ color: "orange" }} />
                          <p>{course.course_duration} hrs</p>
                        </div>
                        <div style={{ display: "flex", gap: "0.5vw" }}>
                          <FaFile style={{ color: "orange" }} />
                          <p>{course.module_count} Modules</p>
                        </div>
                        <div style={{ display: "flex", gap: "0.5vw" }}>
                          <FaListAlt style={{ color: "orange" }} />
                          <p>{course.category}</p>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "0.5vw" }}>
                        <h5 className="starability-result card-text"
                          data-rating={course.rating}>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : null
          // (
          //   // <div style={{ marginBottom: "2rem", paddingLeft: '20px' }}>
          //   //   {/* No data available */}
          //   //   <h4 style={{ textAlign: 'center' }}>&quot;Almost there! Our course data is on its way...&quot;</h4>
          //   //   <div style={{ display: 'flex', justifyContent: 'center' }}>
          //   //     <Spinner>
          //   //       Loading...
          //   //     </Spinner>
          //   //   </div>

          //   // </div>
          //   <p>no data found</p>
          // )
          }
        </div>

        <div className={classNames(styles.sidebar)}>
          {isMobile ? (
            <Offcanvas isOpen={isOpen} toggle={toggleSidebar} direction="right" style={{ height: "100%" }}>
              <OffcanvasBody className={classNames(styles.sidebar)} style={{ width: "80vw" }}>
                <Sidebar setFilters={setFilters} />
              </OffcanvasBody>
            </Offcanvas>
          ) : (
            <>
              <Sidebar setFilters={setFilters} />
            </>

          )}
        </div>
      </div>

      <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}>
        <ModalHeader toggle={() => setShowDeleteModal(false)}>Buy Subscription</ModalHeader>
        <div style={{ display: 'flex' }}>
          <Image
            src='/buy.png'
            className="img-fluid"
            alt="Profile Image"
            width={90}
            height={90}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              width: "150px",
              height: "150px",
            }}
          />
          <ModalBody>Elevate your skills and unlock your potential—subscribe now to access all our exclusive courses!</ModalBody>
        </div>

        <ModalFooter>
          <RazorpayComponent email={email} username={username} contact={contact} setsubscription={setsubscription} />
        </ModalFooter>
      </Modal>
    </>
  );
}
