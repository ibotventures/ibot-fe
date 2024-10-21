import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import Image from "next/image";
import styles from "@/app/page.module.css";
const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#384B70", color: "white", padding: "20px" }} className='container-fluid'>

            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px" }} >
                <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", gap: "20px",flexWrap:"wrap" }}>
                    <div style={{textAlign:"center"}}>
                        <Image src="/IBOT.png" width={200} height={200} className='img-fluid'></Image>
                        <h3>IBOT Ventures</h3>
                    </div>
                    <div style={{ padding: "10px" }} className={styles.fontp}>
                        <h4 className={styles.fonth}>CONTACT US</h4><br />
                        <p>6th Floor, Guna Complex,<br />
                            Teynampet, Chennai - 600018, INDIA</p>
                        <p>203/A, Hebbal Industrial Area,<br />
                            Belavadi Post, Mysore,KA 570018</p>
                    </div>
                    <div>
                        <h4 className={styles.fonth}>Connect With Us</h4>
                        <div style={{ display: 'flex', gap: '10px',paddingTop:'1vw' }}>

                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF size={'1.5vw'} color='white' />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter size={'1.5vw'} color='white' />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedinIn size={'1.5vw'} color="white" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube size={'1.5vw'} color='white' />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={'1.5vw'} color='white' />
                            </a>
                        </div>
                    </div>

                </div>

                <div style={{ textAlign: "center" }} className={styles.parafont}>
                    <p>COPYRIGHT © ibot.ventures. All rights reserved-2024</p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;