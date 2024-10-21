'use client';
import Image from "next/image";
import Carousal from "@/component/carousal";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { FaPlay, FaClock, FaGraduationCap, FaLaptopCode, FaRobot } from 'react-icons/fa';
import classNames from 'classnames';
import Cookies from 'js-cookie';
export default function Home() {
   
    return (
        <>
            
            <div style={{ padding: "3.5vw" }}>
                <Carousal />
                <br />
                <br/>
                <h2 className={styles.landfont}>Welcome, {Cookies.get('username')}</h2>
                <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", borderRadius: "2vw", padding: "2vw", alignItems: "center" }} className="container-fluid">
                    <div style={{ width: "50vw", padding: "2vw" }}>
                        <h1 style={{ fontSize: "2.5vw", paddingBottom: "1vw" }}>Pick Up where you left !</h1>
                        <button style={{ padding: "0.7vw", fontSize: "1.4vw" }} className={classNames("btn btn-primary btn-block")}><FaPlay className="mr-2" style={{ marginRight: "1vw", fontSize: "1.4vw" }} />Resume Me</button>
                    </div>

                    <Image src={'/coursecover.jpeg'} width={300} height={100} className="img-fluid" style={{ width: "50vw", height: "30vh" }} />


                </div>
                <br />
                <br/>
                <div style={{ textAlign: "center", backgroundColor: "white", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", borderRadius: "2vw" }}>
                    <h1 style={{ padding: "2vw" }} className={styles.landfont}>Explore Us</h1>
                    <div style={{ display: "flex", justifyContent: "center", borderRadius: "2vw" }}>
                        <div style={{ backgroundColor: "#6AC1FF", padding: "3vw", borderRadius: "0vw 0vw 0vw 2vw", gap: "2vw" }}>
                            <h2 className={styles.fonth} style={{ padding: "1vw" }}>FOR BUSINESS</h2>
                            <button className={classNames("btn btn-primary", styles.fonth)} style={{ padding: "1vw", borderRadius: "1.5vw", color: "black", backgroundColor: "whitesmoke", border: "none" }}><a href="/products" style={{color:"black",textDecoration:"none"}}>OUR PRODUCTS</a></button>
                            <p style={{ marginTop: "1.6vw" }} className={styles.fontp}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et d</p>
                        </div>
                        <div style={{ padding: "3vw", gap: "2vw" }}>
                            <h2 style={{ padding: "1vw" }} className={styles.fonth}>FOR LEARNERS</h2>
                            <button className={classNames("btn btn-primary", styles.fonth)} style={{ padding: "1vw", borderRadius: "1.5vw", backgroundColor: "#6AC1FF", color: "black", border: "none" }}><a href="/course-list" style={{color:"black",textDecoration:"none"}}>OUR COURSE</a></button>
                            <p style={{ marginTop: "1.6vw" }} className={styles.fontp}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et d</p>
                        </div>
                    </div>
                </div>
                <br/>
                <div style={{margin: "3vw"}}>
                    <h2 style={{ textAlign: "center", fontSize: "3vw" }}>Why Study With IBOT</h2>
                    <p className={styles.fontp} style={{ textAlign: "center" }}>Definitely Buy Products and Courses</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-evenly",flexWrap:"wrap" }}>

                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }}>
                        <FaGraduationCap size={'4vw'} color='#16325B' style={{ marginBottom: "1vw" }} />
                        <p className={styles.fontp}>Learn With Experts</p>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }}>

                        <FaLaptopCode size={'4vw'} color='#16325B' style={{ marginBottom: "1vw" }} />
                        <p className={styles.fontp}>Flexible Learning</p>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }}>
                        <FaClock size={'4vw'} color='#16325B' style={{ marginBottom: "1vw" }} />
                        <p className={styles.fontp}>Lifetime Access</p>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "1vw", padding: "2.7vw", textAlign: "center" }}>
                        <FaRobot size={'4vw'} color='#16325B' style={{ marginBottom: "1vw" }} />
                        <p className={styles.fontp}>Learn Robotics</p>
                    </div>

                </div>
                <br/>
                <br/>
                <div style={{display:"flex",justifyContent:"space-evenly",gap:"2vw",alignItems:"center"}} className={styles.fontp}>
                    <Image src={'/lottie.png'} width={300} height={400} style={{width:"50vw"}} className="img-fluid"/>
                    <div style={{width:"50vw"}}>
                        <h1 style={{fontSize:"3vw"}}>Understand STEM through hands-on Learning</h1>
                        <p>Immerse yourself in the world of STEM through our immersive short courses. Our courses are designed to make complex concepts simple by learning through hands-on activities.</p>
                        <ul>
                            <li>Educational Videos</li>
                            <li>Hands-on Activity</li>
                            <li>Simplified complex STEM concepts</li>
                        </ul>
                        
                    </div>
                </div>
            </div>

        </>

    );
}