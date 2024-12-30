import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram,FaMailBulk } from 'react-icons/fa';
import Image from "next/image";

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#384B70", color: "white", padding: "20px 0" }} className='container-fluid'>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", textAlign: "center" }}>
                {/* Main Footer Content */}
                <div style={{ display: "flex", justifyContent: "space-evenly", gap: "20px", flexWrap: "wrap", width: "100%", maxWidth: "1200px" }}>
                    {/* Logo Section */}
                    <div style={{ flex: "1 1 300px", padding: "10px",textAlign:'left' }}>
                        <Image src="/mibot.png" width={100} height={100} className='img-fluid' alt='logo' />
                        <p style={{ paddingTop: '10px' }}>miBot Learning Management System</p>
                    </div>

                    {/* Contact Section */}
                    <div style={{ flex: "1 1 300px", padding: "10px",textAlign:'left' }}>
                        <h6>CONTACT US</h6>
                        <p style={{ fontSize: '12px', lineHeight: '1.5' }}>
                            6th Floor, Guna Complex,<br />
                            Teynampet, Chennai - 600018, INDIA
                        </p>
                        <p style={{ fontSize: '12px', lineHeight: '1.5' }}>
                            203/A, Hebbal Industrial Area,<br />
                            Belavadi Post, Mysore, KA 570018
                        </p>
                    </div>

                    {/* Social Media Section */}
                    <div style={{ flex: "1 1 300px", padding: "10px",textAlign:'left' }}>
                        <h6>CONNECT WITH US</h6>
                        <div style={{ display: 'flex',  gap: '15px', marginTop: '10px' }}>
                            {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF color='white' size={20} />
                            </a> */}
                            <a href="mailto:info@mi-bot.com" target="_blank" rel="noopener noreferrer">
                                <FaMailBulk color='white' size={20} />
                            </a>
                            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter color='white' size={20} />
                            </a> */}
                            <a href="https://www.linkedin.com/company/mibotventures" target="_blank" rel="noopener noreferrer">
                                <FaLinkedinIn color="white" size={20} />
                            </a>
                            <a href="https://www.youtube.com/@ibotVentures" target="_blank" rel="noopener noreferrer">
                                <FaYoutube color='white' size={20} />
                            </a>
                            <a href="https://www.instagram.com/mibotventures" target="_blank" rel="noopener noreferrer">
                                <FaInstagram color='white' size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div style={{ textAlign: "center",  width: "100%", paddingTop: '10px' }}>
                    <p style={{fontSize: '12px'}}>COPYRIGHT © mibot.in. All rights reserved - 2024</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

