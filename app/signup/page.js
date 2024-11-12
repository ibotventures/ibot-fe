'use client';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import axios from 'axios';
const SignUpPage = () => {
    const [email, setemail] = useState('');
    const [password, setPass] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setmobile] = useState('');
    const router = useRouter();
    // Redirect if already logged in
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.replace('/'); // Prevent going back to login with history
        }
    }, [router]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password === confPassword) {
                if (!(password.length < 6)) {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('username', username);
                    const type = 'send';
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/sendotp/`, { email,username,mobile,password,type });
                    const { data, status } = response;

                    if (data.data === 'email_found') {
                        toast.error("This email already exists. Please try a different email.");
                        return;
                    }

                    if (data.data === 'username_found') {
                        toast.error("This username is already taken. Please try a different username.");
                        return;
                    }

                    if ((status === 200 || status === 201) && data.data.isfound === 'notfound') {
                        const message = `Email sent to ${data.data.email}. If this email is wrong, go back and sign up again, or if the OTP is not received, click resend OTP.`;
                        sessionStorage.setItem('type', type);
                        toast.success(message);
                        router.push('/verification');
                    } 
                } else {
                    toast.error("The password should be atleast 6 characters long");
                }
            } else {
                toast.error("The password and confirm password do not match.");
            }
        } catch (err) {
            if (err.response) {
                // Show specific SMTP error details
                const errorDetails = err.response.data.details;
                toast.error(`Error: ${errorDetails ? errorDetails : "An unknown error occurred"}`);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center" }} >
                <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }} className='container-fluid'>
                    <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Register</h2>
                    <p><b>Note:</b> If you have purchased our product then please enter the same mobile number and email address that you have given while purchasing our product offline</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                onChange={e => setemail(e.target.value)}
                                value={email}
                                className={classNames("form-control", styles.fontp)}
                                id="email"
                                placeholder="Email"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">

                            <input
                                type="text"
                                onChange={e => setmobile(e.target.value)}
                                value={mobile}
                                className={classNames("form-control", styles.fontp)}
                                id="mobile"
                                placeholder="Phone Number"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">

                            <input
                                type="text"
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                                className={classNames("form-control", styles.fontp)}
                                id="username"
                                placeholder="Username"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            <input
                                type="password"
                                onChange={e => setPass(e.target.value)}
                                value={password}
                                className={classNames("form-control", styles.fontp)}
                                id="password"
                                placeholder="Password"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            <input
                                type="password"
                                onChange={e => setConfPassword(e.target.value)}
                                value={confPassword}
                                className={classNames("form-control", styles.fontp)}
                                id="conf-password"
                                placeholder="Confirm Password"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />

                        <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }}>
                            SignUp
                        </button>
                        <br />
                        <br />
                        <p style={{ textAlign: "center" }}>Already have an account?<a href='/login'><span>Login</span></a></p>
                    </form>

                </div>
            </div>

        </>
    );
}

export default SignUpPage;




