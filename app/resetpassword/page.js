'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import axios from 'axios';
const ResetPass = () => {
    const [password, setPass] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password === confPassword) {
                const email = localStorage.getItem('forgetemail');
                const { data, status } = await axios.post('http://127.0.0.1:8000/app/updatepassword/', { email, password });

                if (status == 201 || status == 200) {
                    toast.success('Password successfully updated');
                    localStorage.removeItem('forgetemail'); 
                    router.push('/login');
                } else {
                    toast.error('Something went wrong, please try again');
                }
            } else {
                toast.error("The password and confirm password do not match.");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <>

            <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center" }} >
                <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }} className='container-fluid'>
                    <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Reset password</h2>
                    <form onSubmit={handleSubmit}>

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
                            reset password
                        </button>
                        <br />
                        <br />
                    </form>

                </div>
            </div>

        </>
    );
}

export default ResetPass;