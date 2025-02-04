'use client'
import styles from '@/app/certificate/certifi.module.css';
import Head from 'next/head';
import { useRef,useState,useEffect } from 'react';
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
        // Temporarily hide the download button
        const downloadButton = document.querySelector(`.${styles.downloadBtn}`);
        if (downloadButton) {
            downloadButton.style.display = 'none';
        }

        const invoiceElement = invoiceRef.current;
        if (invoiceElement) {
            html2canvas(invoiceElement).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgWidth = 190; // Fit width to A4
                const pageHeight = 297; // A4 page height
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let position = 10; // Starting Y position

                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                pdf.save('invoice.pdf');

                // Reset the button visibility after the PDF is generated
                if (downloadButton) {
                    downloadButton.style.display = 'block';
                }
                
            });
        }
    };

    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Tex+Gyre+Termes&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
                <div className={styles.container} ref={invoiceRef} >
                    <div className={styles.name}>{name}</div>
                    <div className={styles.message}>This is to certify that {name} has successfully completed the {coursename} at MiBOT Ventures</div>
                </div>

            </div>
            <button className={styles.downloadBtn} onClick={downloadInvoice}>
                Download
            </button>

        </>
    );
}