'use client';
import styles from "@/app/page.module.css";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import classNames from 'classnames';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgetPass = () => {
    const [email, setemail] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the button is clicked
        try {
            const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/forget/`, { email });
            if (status === 201) {
                if (data.data.isexists === 'no') {
                    toast.error('This email address is not found in our database.');
                } else if (data.data.isexists === 'yes') {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('forget', 'yes');
                    toast.success('Reset email sent successfully!');
                    router.push('/verification');
                }
            } else {
                toast.error('Something went wrong, please try again.');
            }
        } catch (err) {
            toast.error('Something went wrong, please try again.');
        } finally {
            setLoading(false); // Set loading to false after the response
        }
    };

    return (
        <>
            <div className={classNames(styles.background)} style={{ display: "flex", justifyContent: "center" }}>
                <div className={classNames(styles.registerContainer, 'container-fluid')}>
                    <h2 style={{ paddingBottom: "2vw" }}>Forget Password?</h2>
                    <p>Enter your registered email address to change your password</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                onChange={e => setemail(e.target.value)}
                                value={email}
                                className={classNames("form-control")}
                                id="email"
                                placeholder="Email"
                                style={{ padding: "1vw" }}
                                required
                                disabled={loading} // Disable input if loading
                            />
                        </div><br />
                        <button
                            type="submit"
                            className={classNames("btn btn-primary btn-block")}
                            style={{ width: "100%", borderRadius: "1.3vw", display: "flex", alignItems: "center", justifyContent: "center" }}
                            disabled={loading} // Disable button if loading
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                "Send"
                            )}
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

