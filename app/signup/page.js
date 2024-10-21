'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import axios from 'axios';
const SignUpPage = () => {
    const [email, setemail] = useState('');
    const [password, setPass] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password === confPassword) {
                if (!(password.length < 6)) {


                    sessionStorage.setItem('password', password);
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('username', username);

                    const response = await axios.post('http://127.0.0.1:8000/app/sendotp/', { email, username });
                    const { data, status } = response;

                    if (data.data === 'email_found') {
                        toast.error("This email already exists. Please try a different email.");
                        return;
                    }

                    if (data.data === 'username_found') {
                        toast.error("This username is already taken. Please try a different username.");
                        return;
                    }


                    if (status === 201 && data.data.isfound === 'notfound') {
                        const message = `Email sent to ${data.data.email}. If this email is wrong, go back and sign up again, or if the OTP is not received, click resend OTP.`;
                        sessionStorage.setItem('otp', data.data.otp);
                        toast.success(message);
                        router.push('/verification');
                    } else {
                        toast.error(`Email does not exist. Status: ${status}`);
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
                    <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>SignUp</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {/* <label htmlFor="email">Email</label> */}
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
                            {/* <label htmlFor="password">Password</label> */}
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
                            {/* <label htmlFor="password">Password</label> */}
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
                            {/* <label htmlFor="password">Password</label> */}
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




