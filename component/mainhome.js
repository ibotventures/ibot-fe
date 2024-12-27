
'use client';
import Image from "next/image";
import Carousal from "@/component/carousal";
// import styles from "@/app/page.module.css";
import { FaPlay, FaClock, FaGraduationCap, FaLaptopCode, FaRobot } from 'react-icons/fa';
import classNames from 'classnames';
import { useRouter, useParams } from "next/navigation";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import axios from "axios";
export default function Home() {
    const username = Cookies.get('username') || 'Guest';
    const userid = Cookies.get('userid');
    const router = useRouter();
    const [courseimage, setcourseimage] = useState('');
    const [modtrack, setmodtrack] = useState('');
    const [courseid, setcourseid] = useState('');
    const [is404, setis404] = useState('no');
    useEffect(() => {
        const handlepickup = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/pickup/`, {
                    params: {
                        user: userid
                    }
                }
                );
                if (response.status == 200) {
                    setcourseid(response.data.data.course);
                    setmodtrack(response.data.data.module);
                    setcourseimage(response.data.data.image);
                }
                setis404('yes')
            } catch {
                setis404('no')
            }


        };
        handlepickup();

    }, []);

    const handleresume = () => {
        sessionStorage.setItem('course', courseid);
        sessionStorage.setItem('moduletrack', modtrack);
        router.push('/coursepreview');
    };

    return (
        <>
            <div style={{ padding: "3vw" }}>
                <Carousal />
                <br />
                <br />
                <h1>Welcome, {username}</h1>
                {is404 == 'yes' ? (
                    <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", borderRadius: "2vw", padding: "2vw", alignItems: "center" }} className="container-fluid">
                        <div style={{ width: "50vw", padding: "2vw" }}>
                            <h2 style={{ paddingBottom: "1vw" }}>Pick Up where you left !</h2>
                            <button style={{ padding: "8px" }} className={classNames("btn btn-primary btn-block")} onClick={() => handleresume()}><FaPlay className="mr-2" style={{ marginRight: "1vw" }} />Resume Me</button>
                        </div>
                        <Image src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${courseimage}`} width={300} height={100} className="img-fluid" style={{ width: '40vw', maxHeight: '300px' }} alt="banners" unoptimized />

                    </div>
                ) : null}
                <br />
                <br />
                <div style={{ textAlign: "center", backgroundColor: "white", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", borderRadius: "2vw" }}>
                    <h1 style={{ padding: "2vw" }}>Explore Us</h1>
                    <div style={{ display: "flex", justifyContent: "center", borderRadius: "2vw" }}>
                        <div style={{ backgroundColor: "#6AC1FF", padding: "3vw", borderRadius: "0vw 0vw 0vw 2vw", gap: "2vw" }}>
                            <h2 style={{ padding: "1vw" }}>FOR BUSINESS</h2>
                            <button className={classNames("btn btn-primary")} style={{ padding: "10px", borderRadius: "1.5vw", color: "black", backgroundColor: "whitesmoke", border: "none" }}><a href="/products" style={{ color: "black", textDecoration: "none" }}>OUR PRODUCTS</a></button>
                            <p style={{ marginTop: "1.6vw" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et d</p>
                        </div>
                        <div style={{ padding: "3vw", gap: "2vw" }}>
                            <h2 style={{ padding: "1vw" }}>FOR LEARNERS</h2>
                            <button className={classNames("btn btn-primary")} style={{ padding: "10px", borderRadius: "1.5vw", backgroundColor: "#6AC1FF", color: "black", border: "none" }}><a href="/courselist" style={{ color: "black", textDecoration: "none" }}>OUR COURSE</a></button>
                            <p style={{ marginTop: "1.6vw" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et d</p>
                        </div>
                    </div>
                </div>
                <br />
                <div style={{ margin: "3vw" }}>
                    <h2 style={{ textAlign: "center" }}>Why Study With IBOT</h2>
                    <p style={{ textAlign: "center" }}>Definitely Buy Products and Courses</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: '20px' }}>
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }}>
                        <FaGraduationCap color='#16325B' style={{ marginBottom: "1vw", fontSize: '50px' }} />
                        <p>Learn With Experts</p>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }}>
                        <FaLaptopCode color='#16325B' style={{ marginBottom: "1vw", fontSize: '50px' }} />
                        <p>Flexible Learning</p>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }}>
                        <FaClock color='#16325B' style={{ marginBottom: "1vw", fontSize: '50px' }} />
                        <p>Lifetime Access</p>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }}>
                        <FaRobot color='#16325B' style={{ marginBottom: "1vw", fontSize: '50px' }} />
                        <p>Learn Robotics</p>
                    </div>
                </div>
                <br />
                <br />

                <div style={{ display: "flex", justifyContent: "space-evenly", gap: "2vw", alignItems: "center" }}>
                    {/* <Image
                        src={'/lottie.png'}
                        width={300}
                        height={400}
                        style={{ Width: '50vw' }}
                        className="img-fluid image"
                        alt="lottie"
                    /> */}
                    <Image src={'/lottie.png'} width={300} height={400} style={{ width: "50vw" }} className="img-fluid" alt="lottie" />
                    <div style={{ width: "50vw" }}>
                        <h1>Understand STEM through hands-on Learning</h1>
                        <p>Immerse yourself in the world of STEM through our immersive short courses. Our courses are designed to make complex concepts simple by learning through hands-on activities.</p>
                        <ul>
                            <li>Educational Videos</li>
                            <li>Hands-on Activity</li>
                            <li>Simplified complex STEM concepts</li>
                        </ul>
                    </div>
                </div>

                <style jsx>{`
    @media (max-width: 768px) {
        div {
            flex-direction: column;
            // align-items: center;
        }
        div > div {
            width: 90vw;  // Ensure text container has enough space on smaller screens
           
        }
        img {
            max-width: 100%;  // Ensure the image resizes correctly on small screens
        }
    }
`}</style>

            </div>
        </>
    );
}

