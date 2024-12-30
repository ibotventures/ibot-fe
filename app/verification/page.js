'use client';
import styles from "@/app/page.module.css";
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useRouter } from "next/navigation";
import styler from '@/app/verification/verification.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const Verification = () => {
    const [code1, setcode1] = useState('');
    const [code2, setcode2] = useState('');
    const [code3, setcode3] = useState('');
    const [code4, setcode4] = useState('');
    const [type, settype] = useState('send');
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Loading state

    // Redirect if already logged in
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.replace('/'); // Prevent going back to login with history
        }
    }, [router]);

    const handleResend = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent multiple clicks during loading
        setLoading(true);

        const email = sessionStorage.getItem('email');
        const username = sessionStorage.getItem('username');
        settype('resend');
        try {
            const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/sendotp/`, { email, username });
            if (status === 201) {

                const message = `OTP resent successfully to this email address - ${data.data.email}`;
                toast.success(message);
            } else {
                toast.error('Unsuccessful, please try again.');
            }

        } catch (err) {
            toast.error('Something went wrong, please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent multiple clicks during loading
        setLoading(true);

        try {
            const forget = sessionStorage.getItem('forget');
            const email = sessionStorage.getItem('email');
            const code = code1 + code2 + code3 + code4;
            if (forget == 'yes' || forget != undefined) {
                const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/signup/`, {
                    email, code, forget
                });
                if (data.data == 'matched' && status == 201) {
                    toast.success('Verified Successfully');
                    router.push('/resetpassword');
                } else if (data.data == 'unmatched' && status == 201) {
                    toast.error('OTP not matching - Try Again');
                }
            } else {
                const email = sessionStorage.getItem('email');
                const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/signup/`, {
                    email, code
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={classNames(styles.background)} style={{ display: "flex", justifyContent: "center", flex: '1' }} >
                <div className={classNames(styles.registerContainer, 'container-fluid')}>
                    <h2 style={{ paddingBottom: "2vw" }}>Verification Code</h2>
                    <p>We have sent the verification code to your email address</p>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "flex", justifyContent: "space-evenly", gap: "1vw" }}>
                            {Array(4).fill('').map((_, idx) => (
                                <div className="form-group" key={idx}>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            if (idx === 0) setcode1(e.target.value);
                                            if (idx === 1) setcode2(e.target.value);
                                            if (idx === 2) setcode3(e.target.value);
                                            if (idx === 3) setcode4(e.target.value);
                                        }}
                                        value={[code1, code2, code3, code4][idx]}
                                        className={classNames("form-control", styler.code)}
                                        maxLength="1"
                                        required
                                        disabled={loading} // Disable inputs while loading
                                    />
                                </div>
                            ))}
                        </div>
                        <br />
                        <button
                            type="submit"
                            className={classNames("btn btn-primary btn-block")}
                            style={{ width: "100%", borderRadius: "1.3vw" }}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Processing...' : 'Continue'}
                        </button>
                        <br />
                        <br />
                        <p
                            style={{
                                color: loading ? 'gray' : 'blue',
                                textAlign: "center",
                                cursor: loading ? 'not-allowed' : 'pointer',
                                textDecorationLine: "underline"
                            }}
                            onClick={!loading ? handleResend : null} // Prevent clicks while loading
                        >
                            {loading ? 'Resending...' : 'Resend Code?'}
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Verification;
