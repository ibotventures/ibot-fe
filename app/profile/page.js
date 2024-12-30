'use client';
import { useState, useEffect } from "react";
import { Container, Offcanvas, Row, Col, Button } from "reactstrap";
import Purchasedproduct from '@/component/purchasehistory';
import EditDetails from '@/component/EditDetails';
import '@/app/page.module.css';
import Delete from '@/component/DeleteAccount';
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import Courses from "@/component/courses";

const MyComponent = () => {
    const [selectedTask, setSelectedTask] = useState(null); // For displaying task content
    const [sidebarOpen, setSidebarOpen] = useState(false); // To handle sidebar visibility
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768); // For responsive handling
    const [upadteuser, setuser] = useState(Cookies.get('username'));
    const [profileimages, setProfileImage] = useState('/profile.png');
    const [updateprofile, setprofile] = useState('/profile.png');
    const userId = Cookies.get('userid');

    useEffect(() => {
        const handledata = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/getdetail/`, {
                params: { id: userId },
            });
            if (response.data.data.profile) {
                const profileUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}${response.data.data.profile}`;
                setProfileImage(profileUrl);
                setprofile(profileUrl);
            }

        };
        handledata();
    }, []);

    useEffect(() => {
        // Update screen size on window resize
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 870);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleTaskClick = (task) => {
        setSelectedTask(task); // Set selected task to display content
    };

    const renderContent = () => {

        if (!selectedTask) return (
            <>
                <EditDetails upadteuser={upadteuser} setuser={setuser} updateprofile={updateprofile} setprofile={setprofile} />
            </>
        );

        switch (selectedTask) {

            case 'delete':
                return (
                    <div className='container-fluid'>
                        <Delete />
                    </div>
                );
            case 'courses':
                return (
                    <div>
                        <Courses />
                    </div>
                );
            case 'purhistory':
                return (
                    <div>
                        <Purchasedproduct />
                    </div>
                );
            case 'edit':
                return (
                    <div>
                        <EditDetails upadteuser={upadteuser} setuser={setuser} updateprofile={updateprofile} setprofile={setprofile} />
                    </div>
                );
            default:
                return <p>Unknown task type.</p>;
        }

    };

    return (
        <>
            <Container fluid>
                {/* Toggle button for small screens */}

                {!isLargeScreen && (
                    <>
                        <br />
                        <Button
                            className="btn-toggle-sidebar"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label="Toggle Sidebar"
                        >
                            &#9776; {/* Hamburger icon */}
                        </Button>
                    </>
                )}

                {/* Off-canvas sidebar */}
                <Offcanvas
                    isOpen={sidebarOpen}
                    toggle={() => setSidebarOpen(!sidebarOpen)}
                    className="offcanvas-start"
                    style={{ overflowY: 'auto', paddingLeft: '20px' }}

                >

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <br />
                        <br />
                        <Image width={160} height={170} src={updateprofile || '/profile.png'} className="img-fluid" alt="Description of the image"

                            style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                                width: "130px",
                                height: "130px",
                            }}
                            unoptimized
                        />
                        <p>{upadteuser}</p>
                    </div>

                    <p onClick={() => { handleTaskClick('purhistory'); setSidebarOpen(!sidebarOpen) }} style={{ fontSize: '18px' }}>purchase history</p>
                    <p onClick={() => { handleTaskClick('courses'); setSidebarOpen(!sidebarOpen) }} style={{ fontSize: '18px' }}>Courses</p>
                    <p onClick={() => { handleTaskClick('edit'); setSidebarOpen(!sidebarOpen) }} style={{ fontSize: '18px' }}>Edit  Details</p>
                    <p onClick={() => { handleTaskClick('delete'); setSidebarOpen(!sidebarOpen) }} style={{ fontSize: '18px' }}>delete Account</p>

                </Offcanvas>

                <Row style={{ display: "flex", flex: "1", minHeight: "100vh" }}>
                    {/* Sidebar for large screens */}
                    {isLargeScreen && (
                        <Col xs="12" md="3" className="border-end" style={{ backgroundColor: "whitesmoke", width: "20vw", fontSize: "1.5vw", flexGrow: "0", paddingLeft: '20px' }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <br />
                                <br />
                                <Image width={160} height={170} src={updateprofile || '/profile.png'} className="img-fluid" alt="Description of the image"

                                    style={{
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        width: "130px",
                                        height: "130px",
                                    }}
                                />
                                <p>{upadteuser}</p>
                            </div>

                            <br />

                            <p onClick={() => handleTaskClick('purhistory')} style={{ fontSize: '18px' }}>purchase history</p>
                            <p onClick={() => handleTaskClick('courses')} style={{ fontSize: '18px' }}>Courses</p>
                            <p onClick={() => handleTaskClick('edit')} style={{ fontSize: '18px' }}>Edit  Details</p>
                            <p onClick={() => handleTaskClick('delete')} style={{ fontSize: '18px' }}>delete Account</p>

                        </Col>
                    )}

                    {/* Main content area */}
                    <Col xs="12" md={isLargeScreen ? "9" : "12"} className="p-3" id='main-content' style={{
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                            {renderContent()}
                        </div>
                    </Col>
                </Row >
            </Container >
        </>
    );
};
export default MyComponent;



