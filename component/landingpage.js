'use client';
import styles from '@/app/page.module.css';
import LandingCaurosal from '@/component/productcaurosal';
import Image from 'next/image';
import { useEffect } from 'react';
export default function LandingPage() {

  return (

    <>
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", padding: "20px" }} className="container-fluid">
        <div style={{ width: "60%", color: "#1C59B3", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", padding: "20px" }}>
          <h1 className={styles.landfont}>CODE  YOUR  VISION  BUILD  THE   FUTURE</h1>
          <p style={{ color: "black", textShadow: "none" }} className={styles.parafont}>IBOT is a leading provider of STEM education products</p><br />
          <LandingCaurosal />
        </div>
        <div style={{ width: "40%" }}>
          <Image src="/image.png" width={500} height={600} style={{ padding: "20px" }} className="img-fluid" alt='sample image'></Image>
        </div>
      </div >

    </>

  );
}