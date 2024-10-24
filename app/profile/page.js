'use client';
import { useState, useEffect } from "react";
import { Container, Offcanvas, Row, Col, Button } from "reactstrap";
import PurchasedCourse from '@/component/PurchasedCourse';
import EditDetails from '@/component/EditDetails';
import Footers from "@/component/Footer";
import Filter from "@/component/coursefilter";
import Caurosal from "@/component/carousal";
import Product from "@/component/productcaurosal";
import Delete from '@/component/DeleteAccount';
import { useRouter } from "next/navigation";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
const MyComponent = () => {
    const [selectedTask, setSelectedTask] = useState(null); // For displaying task content
    const [sidebarOpen, setSidebarOpen] = useState(false); // To handle sidebar visibility
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768); // For responsive handling

    useEffect(() => {
        // Update screen size on window resize
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
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
                <EditDetails />

            </>

        );

        switch (selectedTask) {
            case 'details':
                return (
                    <div className='container-fluid'>
                        <Product />
                    </div>
                );
            case 'delete':
                return (
                    <div className='container-fluid'>
                        <Delete/>
                    </div>
                );
            case 'purcourse':
                return (
                    <div>
                        <PurchasedCourse />
                    </div>
                );
            case 'purhistory':
                return (
                    <div>
                        <Caurosal />
                    </div>
                );
            case 'edit':
                return (
                    <div>
                        <EditDetails />
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
                    <Button
                        className="btn-toggle-sidebar"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle Sidebar"
                    >
                        &#9776; {/* Hamburger icon */}
                    </Button>
                )}

                {/* Off-canvas sidebar */}
                <Offcanvas
                    isOpen={sidebarOpen}
                    toggle={() => setSidebarOpen(!sidebarOpen)}
                    className="offcanvas-start"
                    scrollable
                >

                    <p onClick={() => handleTaskClick('details')}>Your Details</p>
                    <p onClick={() => handleTaskClick('purcourse')}>Purchased Courses</p>
                    <p onClick={() => handleTaskClick('purhistory')}>purchase history</p>
                    <p onClick={() => handleTaskClick('edit')}>Edit  Details</p>
                    <p onClick={() => handleTaskClick('delete')}>delete Account</p>
                </Offcanvas>

                <Row>
                    {/* Sidebar for large screens */}
                    {isLargeScreen && (
                        <Col xs="12" md="3" className="border-end" style={{ flex: "1", backgroundColor: "whitesmoke", width: "20vw", fontSize: "1.5vw" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Image alt='dum' width={160} height={170} src={'/profile.png'} className="img-fluid" />
                                <p style={{ fontSize: "1.8vw" }}>Username</p>
                            </div>

                            <br />
                            <p onClick={() => handleTaskClick('details')}>Your Details</p>
                            <p onClick={() => handleTaskClick('purcourse')}>Purchased Courses</p>
                            <p onClick={() => handleTaskClick('purhistory')}>purchase history</p>
                            <p onClick={() => handleTaskClick('edit')}>Edit  Details</p>
                            <p onClick={() => handleTaskClick('delete')}>delete Account</p>
                        </Col>
                    )}

                    {/* Main content area */}
                    <Col xs="12" md={isLargeScreen ? "9" : "12"} className="p-3" id='main-content'>
                        <div>
                            {renderContent()}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MyComponent;
