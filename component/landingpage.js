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
          <h1>CODE  YOUR  VISION  BUILD  THE   FUTURE</h1>
          <p>IBOT is a leading provider of STEM education products</p><br />
          <LandingCaurosal />
        </div>
        
        {/* Image Section */}
        <div className={styles.imageSection}>
          <Image 
            src="/image.png" 
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
