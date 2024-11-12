'use client';
import styles from "@/app/page.module.css";
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import axios from 'axios';
const Verification = () => {
    const [code1, setcode1] = useState('');
    const [code2, setcode2] = useState('');
    const [code3, setcode3] = useState('');
    const [code4, setcode4] = useState('');
    const [type, settype] = useState('send');
    const router = useRouter();
    // Redirect if already logged in
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.replace('/'); // Prevent going back to login with history
        }
    }, [router]);

    const handleResend = async (e) => {
        e.preventDefault();
        const email = sessionStorage.getItem('email');
        const username = sessionStorage.getItem('username');
        settype('resend');
        try {
            const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/sendotp/`, { email, username });
            if (status === 201) {
                const message = `OTP resent successfully to this email address - ${data.email}`;
                toast.success(message);
            } else {
                toast.error('Unsuccessful, please try again.');
            }

        } catch (err) {
            toast.error('Something went wrong, please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const forget = sessionStorage.getItem('forget');
            const email = sessionStorage.getItem('email');
            const code = code1 + code2 + code3 + code4;
            if (forget == 'yes' || forget != undefined) {
                const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/sendotp/`, {
                    params: { email, code ,forget}
                });
                if (data.data == 'matched' && status == 201) {
                    toast.success('Verified Successfully');
                    router.push('/resetpassword');
                } else if (data.data == 'unmatched' && status == 201) {
                    toast.error('OTP not matching - Try Again');
                }
            } else {
                const email = sessionStorage.getItem('email');
                const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/sendotp/`, {
                    params: { email, code }
                });

                if (data.data == 'matched' && status == 201) {
                        toast.success('Verified Successfully');
                        sessionStorage.clear();
                        router.push('/login');
                }
                else if (data.data == 'unmatched' && status == 201) {
                    toast.error('OTP not matching - Try Again');
                }
            }
        } catch (err) {
            toast.error('something went wrong - Try Again');
        }
    };

    return (
        <>
            <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center", flex: '1' }} >
                <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }} className='container-fluid'>
                    <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Verification Code</h2>
                    <p>We have sent the verification code to your email address</p>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "flex", justifyContent: "space-evenly", gap: "1vw" }}>
                            <div className="form-group">
                                {/* <label htmlFor="email">Email</label> */}
                                <input
                                    type="text"
                                    onChange={e => setcode1(e.target.value)}
                                    value={code1}
                                    className={classNames("form-control", styles.fontp)}
                                    id="code1"
                                    style={{ width: "8vw", height: "8vh" }}
                                    maxLength="1"
                                    required

                                />
                            </div><br />
                            <div className="form-group">
                                {/* <label htmlFor="password">Password</label> */}
                                <input
                                    type="text"
                                    onChange={e => setcode2(e.target.value)}
                                    value={code2}
                                    className={classNames("form-control", styles.fontp)}
                                    id="code2"
                                    style={{ width: "8vw", height: "8vh" }}
                                    maxLength="1"
                                    required
                                />
                            </div><br />
                            <div className="form-group">
                                {/* <label htmlFor="email">Email</label> */}
                                <input
                                    type="text"
                                    onChange={e => setcode3(e.target.value)}
                                    value={code3}
                                    className={classNames("form-control", styles.fontp)}
                                    id="code3"
                                    style={{ width: "8vw", height: "8vh" }}
                                    maxLength="1"
                                    required
                                />
                            </div><br />
                            <div className="form-group">
                                {/* <label htmlFor="password">Password</label> */}
                                <input
                                    type="text"
                                    onChange={e => setcode4(e.target.value)}
                                    value={code4}
                                    className={classNames("form-control", styles.fontp)}
                                    id="code4"
                                    style={{ width: "8vw", height: "8vh" }}
                                    maxLength="1"
                                    required

                                />
                            </div><br />
                        </div>
                        <br />

                        <button type="submit" className={classNames("btn btn-primary btn-block", styles.fonth)} style={{ width: "100%", borderRadius: "1.3vw" }}>
                            Continue
                        </button>
                        <br />
                        <br />
                        <p style={{ color: "blue", textAlign: "center", cursor: "pointer", textDecorationLine: "underline" }} className={styles.fontp} onClick={handleResend}>Resend Code?</p>
                    </form>

                </div>
            </div>

        </>
    );
}
export default Verification;