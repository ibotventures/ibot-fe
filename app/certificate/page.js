'use client';
import styles from '@/app/certificate/certifi.module.css';
import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Home() {
    const [name, setName] = useState('');
    const [coursename, setCourseName] = useState('');
    const invoiceRef = useRef(null);

    useEffect(() => {
        // Access sessionStorage on the client side
        const storedName = sessionStorage.getItem('name') || '';
        const storedCourseName = sessionStorage.getItem('course_name') || '';
        setName(storedName);
        setCourseName(storedCourseName);
    }, []);

    const downloadInvoice = () => {
        const downloadButton = document.querySelector(`.${styles.downloadBtn}`);
        if (downloadButton) {
            downloadButton.style.display = 'none';
        }

        const invoiceElement = invoiceRef.current;
        if (invoiceElement) {
            html2canvas(invoiceElement).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgWidth = 190;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let position = 10;

                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                pdf.save('certificate.pdf');

                if (downloadButton) {
                    downloadButton.style.display = 'block';
                }
            });
        }
    };

    return (
        <div className={styles.wanttohide}>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Tex+Gyre+Termes&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className={styles.full}>
                <h3>Download Your Certificate</h3>
                <p>Congratulations on completing your course! You can download your certificate below.</p>
                {/* <p>Click the button below to download your certificate and celebrate your achievement!</p> */}
                <button className={styles.downloadBtn} onClick={downloadInvoice}>
                    Download
                </button>
            </div>
            <div style={{ width: '565px', height: '800px' }}>
                <div className={styles.container} ref={invoiceRef}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.message}>
                        This is to certify that {name} has successfully completed the {coursename} at MiBOT Ventures
                    </div>
                </div>
            </div>
        </div>
    );
}