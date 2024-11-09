
'use client';
import { useState, useEffect } from "react";
import { Container, Offcanvas, Row, Col, Button } from "reactstrap";
import PurchasedCourse from '@/component/PurchasedCourse';
import EditDetails from '@/component/EditDetails';
import Statistics from "@/component/statistics.js";
import '@/app/page.module.css';
import Delete from '@/component/DeleteAccount';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import Caurosal from "@/component/carousal";
const MyComponent = () => {
    const [selectedTask, setSelectedTask] = useState(null); // For displaying task content
    const [sidebarOpen, setSidebarOpen] = useState(false); // To handle sidebar visibility
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768); // For responsive handling
    const [isadmin, setisadmin] = useState('');
    const [upadteuser, setuser] = useState(Cookies.get('username'));
    
    useEffect(() => {
        const username = Cookies.get('username');
        setisadmin(username);
    }, []);



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
        if (isadmin != 'Administrator') {
            if (!selectedTask) return (
                <>
                    <EditDetails upadteuser={upadteuser} setuser={setuser} />
                </>
            );

            switch (selectedTask) {

                case 'delete':
                    return (
                        <div className='container-fluid'>
                            <Delete />
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
                            <EditDetails upadteuser={upadteuser} setuser={setuser} />
                        </div>
                    );
                default:
                    return <p>Unknown task type.</p>;
            }
        } else {
            if (!selectedTask) return (
                <>
                    <EditDetails upadteuser={upadteuser} setuser={setuser} />
                </>

            );
            switch (selectedTask) {

                case 'coursedetails':
                    return (
                        <div>
                            <PurchasedCourse />
                        </div>
                    );
                case 'statistics':
                    return (
                        <div>
                            <Statistics />
                        </div>
                    );
                case 'edit':
                    return (
                        <div>
                            <EditDetails upadteuser={upadteuser} setuser={setuser} />
                        </div>
                    );
                default:
                    return <p>Unknown task type.</p>;
            }

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

                    {isadmin == 'Administrator' ? (
                        <>

                            <p onClick={() => handleTaskClick('edit')}>Edit your Details</p>
                            <p onClick={() => handleTaskClick('statistics')}>Statistics</p>
                            <p onClick={() => handleTaskClick('coursedetails')}>Course details</p>

                        </>
                    ) : (
                        <>

                           
                            <p onClick={() => handleTaskClick('purhistory')}>purchase history</p>
                            <p onClick={() => handleTaskClick('edit')}>Edit  Details</p>
                            <p onClick={() => handleTaskClick('delete')}>delete Account</p>
                        </>
                    )}
                </Offcanvas>

                <Row>
                    {/* Sidebar for large screens */}
                    {isLargeScreen && (
                        <Col xs="12" md="3" className="border-end" style={{ flex: "1", backgroundColor: "whitesmoke", width: "20vw", fontSize: "1.5vw" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Image width={160} height={170} src={'/profile.png'} className="img-fluid" alt="Description of the image" />
                                <p style={{ fontSize: "1.8vw" }}>{upadteuser}</p>
                            </div>

                            <br />
                            {isadmin == 'Administrator' ? (
                                <>

                                    <p onClick={() => handleTaskClick('edit')}>Edit your Details</p>
                                    <p onClick={() => handleTaskClick('statistics')}>Statistics</p>
                                    <p onClick={() => handleTaskClick('coursedetails')}>Course details</p>

                                </>
                            ) : (
                                <>

                                  
                                    <p onClick={() => handleTaskClick('purhistory')}>purchase history</p>
                                    <p onClick={() => handleTaskClick('edit')}>Edit  Details</p>
                                    <p onClick={() => handleTaskClick('delete')}>delete Account</p>
                                </>
                            )}

                        </Col>
                    )}

                    {/* Main content area */}
                    <Col xs="12" md={isLargeScreen ? "9" : "12"} className="p-3" id='main-content'>
                        <div>
                            {renderContent()}
                        </div>
                    </Col>
                </Row >

            </Container >

        </>
    );
};

export default MyComponent;



