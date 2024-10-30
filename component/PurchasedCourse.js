'use client';
import Image from "next/image";
import LandingCaurosal from "@/component/productcaurosal";
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { FaHourglass, FaFile, FaChartBar, FaCoins, FaListAlt } from 'react-icons/fa';

export default function Home() {
    const handleclick = () => {
        router.push('/courses');
      };
    return (
        <>

            <h1 style={{fontSize:"3vw",margin:"2vw"}}>Purchased Courses</h1>
            <div style={{ display: "flex", justifyContent: "space-between", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", borderRadius: "2vw", backgroundColor: "white", cursor: "pointer" }} onClick={handleclick}>
                <img src={'/coursecover.jpeg'} alt={'undefined'} style={{ width: "40vw", borderRadius: "2vw 0 0 2vw", height: "28vh" }} className='img-fluid' />
                <div style={{ width: "60vw", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2vw" }}>
                    <div>
                        <h2 style={{ fontSize: "2vw" }}>WhalesBot U10</h2>
                        <div style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5vw" }}>
                                <FaHourglass style={{ color: "orange" }} size={'1.5vw'} />
                                <p className={styles.fontp}>10hrs</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5vw" }}>
                                <FaFile style={{ color: "orange" }} size={'1.5vw'} />
                                <p className={styles.fontp}>10 Modules</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5vw" }}>
                                <FaChartBar style={{ color: "orange" }} size={'1.5vw'} />
                                <p style={{ textAlign: "center" }} className={styles.fontp}>Intermediate</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5vw" }}>
                                <FaListAlt style={{ color: "orange" }} size={'1.5vw'} />
                                <p style={{ textAlign: "center" }} className={styles.fontp}>Age 3-4</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: "0.5vw" }}>
                            <FaCoins style={{ color: "gold" }} size={'1.5vw'} />
                            <p className={styles.fontp}>500</p>
                        </div>
                        <button className={classNames("btn btn-primary btn-block")} style={{ width: "fit-content", fontSize: "1.4vw" }}>Buy</button>
                    </div>
                    {/* <p className={styles.fontp}>Unleash the power of robotics with hands-on learning. Build, code, and innovate for the future of automation!</p> */}
                    {/* <button className={classNames("btn btn-primary btn-block")} style={{ width:"fit-content", padding: "0.7vw", fontSize: "1.4vw" }}>Buy</button> */}
                </div>

            </div>

        </>

    );
}