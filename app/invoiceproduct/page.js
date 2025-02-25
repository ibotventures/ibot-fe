'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import styles from '@/app/invoice.module.css';
import Cookies from 'js-cookie';
import Image from "next/image";

const InvoiceDetails = () => {
    const router = useRouter();
    const invoiceRef = useRef(null);
    const [invoice, setInvoice] = useState([]);
    const [product, setProduct] = useState([]);
    const [total, setTotal] = useState(0);
    const [emails, setEmails] = useState('');
    const [phones, setPhones] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Access sessionStorage safely inside useEffect
            const invoicedata = sessionStorage.getItem('invoicedata');
            const email = sessionStorage.getItem('email');
            const phone = sessionStorage.getItem('phone');

            if (invoicedata) {
                setInvoice(JSON.parse(invoicedata));
            }
            if (email) {
                setEmails(email);
            }
            if (phone) {
                setPhones(phone);
            }
        }
    }, []);

    useEffect(() => {
        const prodetail = async () => {
            if (invoice.id) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/getprodetail/`, {
                        params: { id: invoice.id },
                    });
                    if (response.status === 200) {
                        const products = response.data.data;
                        setProduct(products);

                        // Calculate total from response data
                        const calculatedTotal = products.reduce((sum, pro) => sum + pro.total, 0);
                        setTotal(calculatedTotal);
                    }
                } catch (error) {
                    // console.error('Error fetching product details:', error);
                }
            }
        };

        prodetail();
    }, [invoice.id]);

    // const downloadInvoice = () => {
    //     // Temporarily hide the download button
    //     const downloadButton = document.querySelector(`.${styles.downloadBtn}`);
    //     if (downloadButton) {
    //         downloadButton.style.display = 'none';
    //     }

    //     const invoiceElement = invoiceRef.current;
    //     if (invoiceElement) {
    //         html2canvas(invoiceElement).then((canvas) => {
    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new jsPDF('p', 'mm', 'a4');
    //             const imgWidth = 190; // Fit width to A4
    //             const pageHeight = 297; // A4 page height
    //             const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //             let position = 10; // Starting Y position

    //             pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    //             pdf.save('invoice.pdf');

    //             // Reset the button visibility after the PDF is generated
    //             if (downloadButton) {
    //                 downloadButton.style.display = 'block';
    //             }
    //             router.push('/profile');
    //         });
    //     }
    // };

    const downloadInvoice = () => {
        const downloadButton = document.querySelector(`.${styles.downloadBtn}`);
        if (downloadButton) downloadButton.style.display = 'none';

        const invoiceElement = invoiceRef.current;

        if (invoiceElement) {
            html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgWidth = 190; // A4 width (with margin)
                const pageHeight = 297; // A4 height in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let position = 0;

                let remainingHeight = imgHeight;

                while (remainingHeight > 0) {
                    const pageCanvas = document.createElement('canvas');
                    pageCanvas.width = canvas.width;
                    pageCanvas.height = Math.min(canvas.height, (pageHeight * canvas.width) / imgWidth);

                    const pageCtx = pageCanvas.getContext('2d');
                    pageCtx.drawImage(
                        canvas,
                        0,
                        position * (canvas.height / imgHeight),
                        canvas.width,
                        pageCanvas.height,
                        0,
                        0,
                        pageCanvas.width,
                        pageCanvas.height
                    );

                    const pageData = pageCanvas.toDataURL('image/png');
                    pdf.addImage(pageData, 'PNG', 10, 0, imgWidth, (pageCanvas.height * imgWidth) / canvas.width);

                    remainingHeight -= pageHeight;
                    position += pageHeight;

                    if (remainingHeight > 0) {
                        pdf.addPage();
                    }
                }

                pdf.save('invoice.pdf');

                if (downloadButton) downloadButton.style.display = 'block';
                router.push('/profile');
            });
        }
    };

    return (
        <div ref={invoiceRef} className={styles.invoiceContainer}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src="/mibot.png" width={100} height={90} alt="Logo" className="img-fluid" unoptimized />
            </div>
            <br />
            <div className={styles.invoiceHeader}>
                <h1>Invoice</h1>
                <p><strong>Receipt:</strong> {invoice.receipt}</p>
            </div>

            <div className={styles.invoiceDetails}>
                <div className={styles.customerInfo}>
                    <h5 style={{ marginBottom: '15px' }}>Customer Details</h5>
                    <p><strong>Username:</strong> {Cookies.get('username')}</p>
                    <p><strong>Contact:</strong> {phones}</p>
                    <p><strong>Email:</strong> {emails}</p>
                </div>
            </div>

            <div className={styles.productInfo}>
                <h5>Product Details</h5>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price(each)</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((data, index) => (
                            <tr key={index}>
                                <td>{data.product_name}</td>
                                <td>{data.price}</td>
                                <td>{data.quantity}</td>
                                <td>{data.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.invoiceFooter}>
                <p><strong>Total Amount:</strong> {total}</p>
                <p><strong>Status:</strong> Paid</p>
            </div>

            <footer className={styles.invoiceFooter}>
                <p>Invoice was created on a computer and is valid without the signature and seal.</p>
            </footer>

            <button className={styles.downloadBtn} onClick={downloadInvoice}>
                Download Invoice
            </button>
        </div>
    );
};

export default InvoiceDetails;
