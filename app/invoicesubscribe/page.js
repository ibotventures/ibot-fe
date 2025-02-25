'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import styles from '@/app/invoice.module.css';
import Cookies from 'js-cookie';
import Image from "next/image";
const InvoiceDetails = () => {
  const router = useRouter();
  const invoiceRef = useRef(null);
  const [emails, setEmails] = useState('');
  const [phones, setPhones] = useState('');
  const [invoice, setInvoice] = useState([]); // State for parsed invoice data
  // const emails = sessionStorage.getItem('email');
  // const phones = sessionStorage.getItem('phone');
  // useEffect(() => {
  //   // Parse `invoicedata` from sessionStorage
  //   const invoicedata = sessionStorage.getItem('invoicedata');
  //   if (invoicedata) {
  //     setInvoice(JSON.parse(invoicedata)); // Parse and set the invoice object
  //   }
  // }, []);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const invoicedata = sessionStorage.getItem('invoicedata');
  //     if (invoicedata) {
  //       setInvoice(JSON.parse(invoicedata));
  //     }
  //   }
  // }, []);

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

  // const downloadInvoice = () => {
  //   // Temporarily hide the download button
  //   const downloadButton = document.querySelector(`.${styles.downloadBtn}`);
  //   if (downloadButton) {
  //     downloadButton.style.display = 'none';
  //   }

  //   const invoiceElement = invoiceRef.current;
  //   if (invoiceElement) {
  //     html2canvas(invoiceElement).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const imgWidth = 190; // Fit width to A4
  //       const pageHeight = 297; // A4 page height
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       let position = 10; // Starting Y position

  //       pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  //       pdf.save('invoice.pdf');

  //       // Reset the button visibility after the PDF is generated
  //       if (downloadButton) {
  //         downloadButton.style.display = 'block';
  //       }
  //       router.push('/profile');
  //     });
  //   }
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
        <h5>Subscription Information</h5>
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
        <p>Invoice was created on a computer and is valid without the signature and seal.</p>
      </footer>

      <button className={styles.downloadBtn} onClick={downloadInvoice}>
        Download Invoice
      </button>
    </div>
  );
};

export default InvoiceDetails;