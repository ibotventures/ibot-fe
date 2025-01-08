'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import styles from '@/app/invoice.module.css';
import Cookies from 'js-cookie';
const InvoiceDetails = () => {
  const router = useRouter();
  const invoiceRef = useRef(null);
  const [invoice, setInvoice] = useState([]); // State for parsed invoice data
  // const emails = sessionStorage.getItem('email');
  // const phones = sessionStorage.getItem('phone');
  const emails = typeof window !== "undefined" ? sessionStorage.getItem('email') : null;
  const phones = typeof window !== "undefined" ? sessionStorage.getItem('phone') : null;
  // useEffect(() => {
  //   // Parse `invoicedata` from sessionStorage
  //   const invoicedata = sessionStorage.getItem('invoicedata');
  //   if (invoicedata) {
  //     setInvoice(JSON.parse(invoicedata)); // Parse and set the invoice object
  //   }
  // }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const invoicedata = sessionStorage.getItem('invoicedata');
      if (invoicedata) {
        setInvoice(JSON.parse(invoicedata));
      }
    }
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
        <h3>Subscription Information</h3>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Receipt</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{invoice['receipt']}</td>
              <td>
                {invoice.amount ? (invoice.amount / 100).toFixed(2) : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.invoiceFooter}>
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