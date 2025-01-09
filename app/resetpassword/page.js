'use client';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPass = () => {
    const [password, setPass] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
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
        setLoading(true); // Set loading state to true
        try {
            if (password === confPassword) {
                if (!(password.length < 6)) {
                    const email = sessionStorage.getItem('email');
                    const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/updatepassword/`, { email, password });
                    if (status === 201 || status === 200) {
                        toast.success('Password successfully updated');
                        sessionStorage.clear();
                        router.push('/login');
                    } else {
                        toast.error('Something went wrong, please try again');
                    }
                } else {
                    toast.error("The password should be at least 6 characters long");
                }
            } else {
                toast.error("The password and confirm password do not match.");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false); // Set loading state to false after the response
        }
    };

    return (
        <>
            <div className={classNames(styles.background)} style={{ display: "flex", justifyContent: "center" }}>
                <div className={classNames(styles.registerContainer, 'container-fluid')}>
                    <h2 style={{ paddingBottom: "2vw" }}>Reset password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    onChange={e => setPass(e.target.value)}
                                    value={password}
                                    className={classNames("form-control")}
                                    id="password"
                                    placeholder="Password"
                                    style={{ padding: "1vw" }}
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer"
                                    }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div><br />
                        <div className="form-group">
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showConfPassword ? "text" : "password"}
                                    onChange={e => setConfPassword(e.target.value)}
                                    value={confPassword}
                                    className={classNames("form-control")}
                                    id="conf-password"
                                    placeholder="Confirm Password"
                                    style={{ padding: "1vw" }}
                                    required
                                />
                                <span
                                    onClick={() => setShowConfPassword(!showConfPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer"
                                    }}
                                >
                                    {showConfPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div><br />

                        <button
                            type="submit"
                            className={classNames("btn btn-primary btn-block")}
                            style={{ width: "100%", borderRadius: "1.3vw", display: "flex", alignItems: "center", justifyContent: "center" }}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                "Reset Password"
                            )}
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
