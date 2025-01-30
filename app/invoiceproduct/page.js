'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import styles from '@/app/invoice.module.css';
import Cookies from 'js-cookie';

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
                    console.error('Error fetching product details:', error);
                }
            }
        };

        prodetail();
    }, [invoice.id]);

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
                router.push('/profile');
            });
        }
    };

    return (
        <div ref={invoiceRef} className={styles.invoiceContainer}>
            <div className={styles.invoiceHeader}>
                <h1>Invoice</h1>
                <p><strong>Receipt:</strong> {invoice.receipt}</p>
            </div>

            <div className={styles.invoiceDetails}>
                <div className={styles.customerInfo}>
                    <h3>Customer Details</h3>
                    <p><strong>Username:</strong> {Cookies.get('username')}</p>
                    <p><strong>Contact:</strong> {phones}</p>
                    <p><strong>Email:</strong> {emails}</p>
                </div>
            </div>

            <div className={styles.productInfo}>
                <h3>Product Details</h3>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
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
                <p>Invoice was created on a computer and is valid without the signature and seals.</p>
            </footer>

            <button className={styles.downloadBtn} onClick={downloadInvoice}>
                Download Invoice
            </button>
        </div>
    );
};

export default InvoiceDetails;
