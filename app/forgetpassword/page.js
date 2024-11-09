'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import classNames from 'classnames';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgetPass = () => {
    const [email, setemail] = useState('');
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/forget/`, { email });

            if (status === 201) {
                if (data.data.isexists === 'no') {
                    toast.error('This email address is not found in our database.');
                } else if (data.data.isexists === 'yes') {
                    sessionStorage.setItem('email',email);
                    sessionStorage.setItem('forget','yes');
                    toast.success('Reset email sent successfully!');
                    router.push('/verification');
                }
            } else {
                toast.error('Something went wrong, please try again.');
            }
        } catch (err) {
            toast.error('Something went wrong, please try again.');
        }
    };

    return (
        <>
            <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }} className='container-fluid'>
                    <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Forget Password?</h2>
                    <p className={styles.fontp}>Enter your registered email address to change your password</p>
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
                        <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }}>
                            Send
                        </button>
                        <br />
                        <br />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgetPass;
