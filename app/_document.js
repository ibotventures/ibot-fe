// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add the Razorpay script here */}
          <script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="beforeInteractive" // Ensure it loads before the page is interactive
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;