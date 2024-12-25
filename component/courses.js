
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardBody, CardImg, CardGroup, CardTitle, Progress } from "reactstrap";
import { FaEye, FaCheck } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
// import { useRouter } from "next/navigation";

const MyComponent = () => {
    const [data, setData] = useState({
        course_started: 0,
        completed_course_count: 0,
        ongoing_courses: []
    });

    useEffect(() => {
        const handleCourses = async () => {
            const userid = Cookies.get('userid');
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/userstartedcourses/`, {
                    params: { id: userid }
                });
                if (response.status === 200) {
                    setData(response.data.data);
                }
            } catch (error) {
                // console.error("Failed to fetch courses:", error);
            }
        };
        handleCourses();
    }, []);


    return (
        <>
            <div style={{ display: "flex" }}>
                <div>
                    <Image
                        src={'/profile.png'}
                        className="img-fluid"
                        alt="Profile Image"
                        width={90}
                        height={90}
                        style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            width: "90px",
                            height: "90px",
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <p style={{ padding: "0", margin: "0", fontWeight: "bold" }}>Welcome Jack</p>
                    <p style={{ padding: "0", margin: "0" }}>Your Courses Dashboard</p>
                </div>
            </div>
            <br />
            <div style={{ display: "flex", gap: "10px", flexWrap: 'wrap' }}>
                <div style={{
                    backgroundColor: "white", padding: '20px', borderRadius: '20px',
                    width: '480px',
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4>Courses started to view</h4>
                        <div style={{ backgroundColor: "black", borderRadius: '8px', padding: "8px" }}>
                            <FaEye style={{ color: "white" }} />
                        </div>
                    </div>
                    <p>{data.course_started}</p>
                </div>
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: '20px', width: '480px' }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3>Completed Courses</h3>
                        <div style={{ backgroundColor: "black", borderRadius: '8px', padding: "8px" }}>
                            <FaCheck style={{ color: "white" }} />
                        </div>
                    </div>
                    <p>{data.completed_course_count}</p>
                </div>
            </div>
            <br />
            <div>
                <h2>Ongoing Courses by You</h2>
                <br />
                <CardGroup style={{ gap: "20px" }}>
                    {data.ongoing_courses.length > 0 ? (
                        data.ongoing_courses.map((course, index) => (
                            <Card key={index} style={{
                                height: "200px", minWidth: '210px',
                                maxWidth: '250px'
                            }}>
                                <CardImg
                                    alt="Card image cap"
                                    height="90px"
                                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${course.course_image}`}
                                    top
                                    width="100%"
                                />
                                <CardBody>
                                    <CardTitle tag="h5">{course.course_name}</CardTitle>
                                    <div>
                                        <Progress
                                            max={course.total_module}
                                            value={course.completed_module}
                                        />
                                        <p>{course.completed_module}/{course.total_module} modules</p>
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                    ) : (
                        <p>You haven't started any courses yet</p>
                    )}
                </CardGroup>
            </div>
            <br />
        </>
    );
};

export default MyComponent;
