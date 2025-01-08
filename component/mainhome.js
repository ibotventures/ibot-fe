'use client';
import Image from "next/image";
import Carousal from "@/component/carousal";
import { FaPlay, FaClock, FaGraduationCap, FaLaptopCode, FaRobot } from 'react-icons/fa';
import classNames from 'classnames';
import { useRouter } from "next/navigation";
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
                        <Image src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${courseimage}`} width={300} height={100} className="img-fluid" style={{ width: '40vw', maxHeight: '400px',maxWidth:'400px' }} alt="banners" unoptimized />

                    </div>
                ) : null}
                <br />
                <br />
                <div style={{ textAlign: "center", backgroundColor: "white", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", borderRadius: "2vw", display: 'flex', justifyContent: "center", flexDirection: 'column', alignItems: "center" }} className="res">
                    <h1 style={{ padding: "2vw" }}>Explore Us</h1>
                    <div style={{ display: "flex", justifyContent: "center", borderRadius: "2vw" }} className="res">
                        <div style={{ backgroundColor: "#6AC1FF", padding: "3vw", borderRadius: "0vw 0vw 0vw 2vw", gap: "2vw" }} className="res">
                            <h2 style={{ padding: "1vw" }}>BUY OUR PRODUCTS</h2>
                            <button className={classNames("btn btn-primary")} style={{ padding: "10px", borderRadius: "1.5vw", color: "black", backgroundColor: "whitesmoke", border: "none" }}><a href="/products" style={{ color: "black", textDecoration: "none" }}>OUR PRODUCTS</a></button>
                            <p style={{ marginTop: "1.6vw" }}>"Bring innovation to life with our cutting-edge robot-building kits! Perfect for all skill levels, our products make robotics fun, educational, and easy to explore. Start building your future today!"</p>
                        </div>
                        <div style={{ padding: "3vw", gap: "2vw" }} className="res">
                            <h2 style={{ padding: "1vw" }}>LEARN FROM OUR COURSES</h2>
                            <button className={classNames("btn btn-primary")} style={{ padding: "10px", borderRadius: "1.5vw", backgroundColor: "#6AC1FF", color: "black", border: "none" }}><a href="/courselist" style={{ color: "black", textDecoration: "none" }}>OUR COURSES</a></button>
                            <p style={{ marginTop: "1.6vw" }}>"Learn to build and program robots like a pro with our hands-on courses! Designed for all skill levels, we’ll guide you step-by-step in creating incredible robots using our premium kits."</p>
                        </div>
                    </div>
                </div>
                <br />
                <div style={{ margin: "3vw" }} className="res">
                    <h2 style={{ textAlign: "center" }}>Why Study With MiBOT</h2>
                    <p style={{ textAlign: "center" }}>You will definitely Buy Products and Courses</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: '20px' }} className="res">
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }} className="res">
                        <FaGraduationCap color='#16325B' style={{ marginBottom: "1vw", fontSize: '50px' }} />
                        <p>Learn With Experts</p>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }} className="res">
                        <FaLaptopCode color='#16325B' style={{ marginBottom: "1vw", fontSize: '50px' }} />
                        <p>Flexible Learning</p>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }} className="res">
                        <FaClock color='#16325B' style={{ marginBottom: "1vw", fontSize: '50px' }} />
                        <p>Lifetime Access</p>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }} className="res">
                        <FaRobot color='#16325B' style={{ marginBottom: "1vw", fontSize: '50px' }} />
                        <p>Learn Robotics</p>
                    </div>
                </div>
                <br />
                <br />

                <div style={{ display: "flex", justifyContent: "space-evenly", gap: "2vw", alignItems: "center" }} className="res">
                    <Image src={'/poster.jpeg'} width={500} height={400} style={{ minWidth: "40vw", minHeight: '20vh', maxHeight: '60vh' }} className="imager" alt="lottie" unoptimized />
                    <div style={{ width: "50vw" }} className="res">
                        <h2 className="res">Understand STEM through hands-on Learning</h2>
                        <div className="res">Immerse yourself in the world of STEM through our immersive short courses. Our courses are designed to make complex concepts simple by learning through hands-on activities.</div>
                        <div className="res">
                            <ul>
                                <li>Educational Contents</li>
                                <li>Hands-on Activity</li>
                                <li>Simplified complex STEM concepts</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <style jsx>{`
    @media (max-width: 768px) {
        .res {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2vw;
        }
        .res > .res {
            width: 90vw;  // Ensure text container has enough space on smaller screens
           
        }
        .imager {
            width: 100vw;  // Ensure the image resizes correctly on small screens
        }
    }
`}</style>

            </div>
        </>
    );
}

