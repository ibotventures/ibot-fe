'use client';
import styles from '@/app/page.module.css';
import LandingCaurosal from '@/component/productcaurosal';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "20px",
          flexWrap: 'wrap'
        }}
        className={`${styles.container} container-fluid`}
      >
        {/* Text Section */}
        <div className={styles.textSection}>
          <h1>CODE YOUR VISION BUILD THE FUTURE</h1>
          {/* <p>MiBot is a leading provider of STEM education products</p><br /> */}
          <p style={{textAlign:'justify'}}>MiBOT Ventures, part of the Astra Group of Companies, is an innovative edtech company revolutionizing robotics education and implementation in both the educational and industrial sectors. We develop step-by-step programs to foster critical thinking and creativity in students while applying robotics to drive innovation across industries.</p><br/>
          <div className={styles.landcarousal}>
          <LandingCaurosal />
          </div>
          
        </div>

        {/* Image Section */}
        <div className={styles.imageSection}>
          <Image
            src="/ro.png"
            width={500}
            height={600}
            style={{ maxWidth: "100%", height: "auto" }}
            alt="sample image"
          />
        </div>
      </div>
    </>
  );
}
