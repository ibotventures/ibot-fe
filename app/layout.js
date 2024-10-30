"use client";
import { Inter, Exo } from 'next/font/google';
import { useState, useEffect } from 'react'; 
import './globals.css';
import Footers from "@/component/Footer";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import Example from "@/component/Nav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { metadata } from '@/app/metadata'; 
const inter = Inter({ subsets: ['latin'] });
const exo = Exo({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export default function RootLayout({ children }) {
  const [token, setToken] = useState(''); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const cookieToken = Cookies.get('token');
    setToken(cookieToken || '');
    setLoading(false); 
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Loading...</title>
        </head>
        <body className={`${inter.className} ${exo.className}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div className="text-center">Loading...</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} ${exo.className}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{position:"fixed",width:"100%",zIndex:1000}}>
          <Example />
        </header>
        <section style={{
          flex: '1', backgroundColor: "rgba(106, 193, 255, 0.2)", display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
          marginTop:"99px"
        }}>
          <ToastContainer position="top-center" />
          {children}
        </section>
        <footer>
          <Footers />
        </footer>
      </body>
    </html>
  );
}
