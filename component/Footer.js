

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import Image from "next/image";
// import styles from "@/app/page.module.css";

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#384B70", color: "white", padding: "20px" }} className='container-fluid'>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px", paddingTop: '10px' }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", padding: '0 10px' }}>
                    {/* Logo Section */}
                    <div style={{ textAlign: "center", flex: 1, minWidth: "100px" }}>
                        <Image src="/IBOT.png" width={200} height={200} className='img-fluid' alt='logo' />
                        <h3>IBOT Ventures</h3>
                    </div>

                    {/* Contact Section */}
                    <div style={{ paddingTop: '10px', flex: 1, minWidth: "200px" }}>
                        <h4>CONTACT US</h4>
                        <p>6th Floor, Guna Complex,<br />
                            Teynampet, Chennai - 600018, INDIA</p>
                        <p>203/A, Hebbal Industrial Area,<br />
                            Belavadi Post, Mysore,KA 570018</p>
                    </div>

                    {/* Social Media Section */}
                    <div style={{ paddingTop: '10px', flex: 1, minWidth: "200px" }}>
                        <h4>Connect With Us</h4>
                        <div style={{ display: 'flex', gap: '10px', paddingTop: '1vw' }}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF color='white' />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter color='white' />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedinIn color="white" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube color='white' />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram color='white' />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div style={{ textAlign: "center" }}>
                    <p>COPYRIGHT © ibot.ventures. All rights reserved-2024</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
