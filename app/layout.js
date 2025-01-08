"use client";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footers from "@/component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Example from "@/component/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { metadata } from "@/app/metadata";

const inter = Inter({ subsets: ["latin"] });
const robo = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${inter.className} ${robo.className}`}
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <header style={{ position: "fixed", width: "100%", zIndex: 1000 }}>
          <Example />
        </header>
        <section
          style={{
            flex: "1",
            backgroundColor: "rgba(106, 193, 255, 0.2)",
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            marginTop: "68px",
          }}
        >
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



