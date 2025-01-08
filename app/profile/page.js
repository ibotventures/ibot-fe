'use client';
import { useState, useEffect, React } from "react";
import { Container, Offcanvas, Row, Col, Button, Spinner } from "reactstrap";
import EditDetails from '@/component/EditDetails';
import '@/app/page.module.css';
import Delete from '@/component/DeleteAccount';
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";
import Courses from "@/component/courses";
import { Table } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { MdMenuBook, MdDeleteForever } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';

const MyComponent = () => {
    const [selectedTask, setSelectedTask] = useState(null); // For displaying task content
    const [sidebarOpen, setSidebarOpen] = useState(false); // To handle sidebar visibility
    const [isLargeScreen, setIsLargeScreen] = useState(false); // Initial state without window.innerWidth
    const [upadteuser, setuser] = useState(Cookies.get('username'));
    const [emails, setemails] = useState();
    const [phones, setphones] = useState();
    const [profileimages, setProfileImage] = useState('/profile.png');
    const [updateprofile, setprofile] = useState('/profile.png');
    const userId = Cookies.get('userid');
    const router = useRouter();
    const [transac, settransac] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Only run the code after the component has mounted
        if (typeof window !== 'undefined') {
            setIsLargeScreen(window.innerWidth >= 768); // Update screen size
            window.addEventListener('resize', handleResize); // Add resize event listener
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize); // Cleanup on unmount
            }
        };
    }, []);

    const handleResize = () => {
        if (typeof window !== 'undefined') {
            setIsLargeScreen(window.innerWidth >= 870); // Update screen size on resize
        }
    };

    useEffect(() => {
        const user = Cookies.get('userid');
        const transactlist = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/transact/`, {
                params: {
                    user_id: user
                }
            })
            if (response.status == 200) {
                settransac(response.data.data);
            }
        };
        transactlist();
    }, []);

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
            setemails(response.data.data.email);
            setphones(response.data.data.mobile);
        };
        handledata();
    }, []);

    const handleviewsubscribe = (transaction) => {
        router.push('/invoicesubscribe');
        sessionStorage.setItem('invoicedata', JSON.stringify(transaction));
        sessionStorage.setItem('email', emails);
        sessionStorage.setItem('phone', phones);
    };

    const handleviewproduct = (transaction) => {
        router.push('/invoiceproduct');
        sessionStorage.setItem('invoicedata', JSON.stringify(transaction));
        sessionStorage.setItem('email', emails);
        sessionStorage.setItem('phone', phones);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task); // Set selected task to display content
    };
    function checkSubstring(mainString, sub) {
        // Split the string into an array of words
        const words = mainString.split("_");

        // Check if the substring is present in any of the words
        const isPresent = words.some((word) => word.includes(sub));

        return isPresent;
    }
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
                        <br />
                        <h2>Invoices</h2>
                        <br />
                        {transac.length > 0 ? (
                            <div className="table-responsive">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>

                                            <th>Receipt</th>
                                            <th>View</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transac.length > 0 ? (
                                            transac.map((transaction, index) => (
                                                <tr key={index}>
                                                    <td>{transaction.receipt}</td>
                                                    {checkSubstring(transaction.receipt, 'subscription') ? (
                                                        <td><Button onClick={() => { handleviewsubscribe(transaction); setLoading(true); }} disabled={loading}>
                                                            {loading ? (
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            ) : (
                                                                'view detail'
                                                            )}
                                                        </Button></td>
                                                    ) : (
                                                        <td><Button onClick={() => { handleviewproduct(transaction); setLoading(true); }} disabled={loading}>

                                                            {loading ? (
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            ) : (
                                                                'view detail'
                                                            )}
                                                        </Button></td>
                                                    )}

                                                </tr>
                                            ))
                                        ) : null}
                                    </tbody>
                                </Table>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '100%', padding: '20px' }}>
                                <Image
                                    src='/empty.png'
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
                                <p>Explore products</p>
                            </div>
                        )}
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
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <FaFileInvoiceDollar size={20} color="grey" title="Invoice" />
                        <p onClick={() => { handleTaskClick('purhistory'); setSidebarOpen(!sidebarOpen) }} style={{ fontSize: '18px', cursor: 'pointer' }}>Invoices</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <MdMenuBook size={20} color="grey" title="Courses" />
                        <p onClick={() => { handleTaskClick('courses'); setSidebarOpen(!sidebarOpen) }} style={{ fontSize: '18px', cursor: 'pointer' }}>Course Dashboard</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <AiOutlineUser size={20} color="grey" title="Basic Details" />
                        <p onClick={() => { handleTaskClick('edit'); setSidebarOpen(!sidebarOpen) }} style={{ fontSize: '18px', cursor: 'pointer' }}>View and Edit your Details</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <MdDeleteForever size={20} color="grey" title="Delete Account" />
                        <p onClick={() => { handleTaskClick('delete'); setSidebarOpen(!sidebarOpen) }} style={{ fontSize: '18px', cursor: 'pointer' }}>Delete Account</p>
                    </div>
                </Offcanvas>

                <Row style={{ display: "flex", flex: "1", minHeight: "100vh" }}>
                    {/* Sidebar for large screens */}
                    {isLargeScreen && (
                        <Col xs="12" md="3" className="border-end" style={{ backgroundColor: "whitesmoke", width: "22vw", fontSize: "1.5vw", flexGrow: "0", paddingLeft: '20px' }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <br />
                                <br />
                                <Image width={160} height={170} src={updateprofile || '/profile.png'} className="img-fluid" alt="Description of the image"

                                    style={{
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        width: "120px",
                                        height: "120px",
                                    }}
                                />
                                <p>{upadteuser}</p>
                            </div>

                            <br />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <FaFileInvoiceDollar size={20} color="grey" title="Invoice" />
                                <p onClick={() => handleTaskClick('purhistory')} style={{ fontSize: '18px', cursor: 'pointer' }}>Invoices</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <MdMenuBook size={20} color="grey" title="Courses" />
                                <p onClick={() => handleTaskClick('courses')} style={{ fontSize: '18px', cursor: 'pointer' }}>Course Dashboard</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <AiOutlineUser size={20} color="grey" title="Basic Details" />
                                <p onClick={() => handleTaskClick('edit')} style={{ fontSize: '18px', cursor: 'pointer' }}>View and Edit your Details</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <MdDeleteForever size={20} color="grey" title="Delete Account" />
                                <p onClick={() => handleTaskClick('delete')} style={{ fontSize: '18px', cursor: 'pointer' }}>Delete Account</p>
                            </div>
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


