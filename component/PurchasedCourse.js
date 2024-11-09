
'use client';
import Image from "next/image";
import LandingCaurosal from "@/component/productcaurosal";
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { FaHourglass, FaFile, FaChartBar, FaCoins, FaListAlt } from 'react-icons/fa';
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';
export default function Home() {
    const [coursedata, setcoursedata] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseIdToDelete, setCourseIdToDelete] = useState('');
    const router = useRouter();
    const confirmDelete = (id) => {
        setCourseIdToDelete(id);
        setShowDeleteModal(true);
    };
    const handleDelete = async () => {
        if (!courseIdToDelete) return;

        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/deletecourse/${courseIdToDelete}/`);
            if (response.status === 200) {
                toast.success('Course deleted successfully');
                setcoursedata(prevData => prevData.filter(course => course.id !== courseIdToDelete));
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
    const handleClick = async (courseId) => {
        const userid = Cookies.get('userid');
        const access = 'yes';

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

    useEffect(() => {
        const handleCourse = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/uploadcourse/`);
                if (response.status === 200) {
                    if (response.data.data !== 'empty') {
                        const data = response.data.data;
                        setcoursedata(Array.isArray(data) ? data : [data]); // Wrap in array if single object
                    }

                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Something went wrong while loading course data.");
            }
        };

        handleCourse();
    }, []);

    return (
        <>
            <h1 style={{ fontSize: "3vw", margin: "2vw" }}>Courses not shown to users yet</h1>
            {coursedata.length ? (
                coursedata.map((course) => (
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
                <div>All courses are displayed to users nothing is left to confirm</div>
            )}
            <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}>
                <ModalHeader toggle={() => setShowDeleteModal(false)}>Confirm Deletion</ModalHeader>
                <ModalBody>Are you sure you want to delete this course?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDelete}>Yes</Button>
                    <Button color="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
