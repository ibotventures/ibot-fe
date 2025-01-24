'use client';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const SignUpPage = () => {
    const [email, setemail] = useState('');
    const [password, setPass] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [mobile, setmobile] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.replace('/'); // Prevent going back to login with history
        }
    }, [router]);

    const handleactivate = async () => {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/activateaccount/`, {
            email: email
        });
        if (response.status == 200) {
            toast.success('Account activated. You can login now');
            setShowDeleteModal(false);
            router.push('/login');
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true
        try {
            if (password === confPassword) {
                if (!(password.length < 6)) {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('username', username);
                    const type = 'send';
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/sendotp/`, { email, username, mobile, password, type });
                    const { data, status } = response;
                    if (data.data === 'inactive_user') {
                        setShowDeleteModal(true);
                        return;
                    }
                    if (data.data === 'email_found') {
                        toast.error("This email already exists. Please try a different email.");
                        setIsLoading(false); // Reset loading
                        return;
                    }

                    if (data.data === 'username_found') {
                        toast.error("This username is already taken. Please try a different username.");
                        setIsLoading(false); // Reset loading
                        return;
                    }

                    if (data.data === 'inactive_user') {
                        setShowDeleteModal(true);
                        return;
                    }

                    if ((status === 200 || status === 201) && data.data.isfound === 'notfound') {
                        const message = `Email sent to ${data.data.email}. If this email is wrong, go back and sign up again, or if the OTP is not received, click resend OTP.`;
                        sessionStorage.setItem('type', type);
                        toast.success(message);
                        router.push('/verification');
                    }
                } else {
                    toast.error("The password should be at least 6 characters long");
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
        } finally {
            setIsLoading(false); // Reset loading state in any case
        }
    };

    return (
        <>
            <div className={classNames(styles.background)} style={{ display: "flex", justifyContent: "center" }} >
                <div className={classNames(styles.registerContainer, 'container-fluid')}>
                    <h2 style={{ paddingBottom: "2vw" }}>Register</h2>
                    <p><b>Note:</b> If you have purchased our product then please enter the same mobile number and email address that you have given while purchasing our product offline</p>
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
                            />
                        </div><br />
                        <div className="form-group">

                            <input
                                type="text"
                                onChange={e => setmobile(e.target.value)}
                                value={mobile}
                                className={classNames("form-control")}
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
                                className={classNames("form-control")}
                                id="username"
                                placeholder="Username"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
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
                                        cursor: "pointer",
                                        zIndex:'200'
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
                                        cursor: "pointer",
                                        zIndex:'200'
                                    }}
                                >
                                    {showConfPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div><br />
                        <button
                            type="submit"
                            className={classNames("btn btn-primary btn-block")}
                            style={{ width: "100%", borderRadius: "1.3vw" }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'SignUp'}
                        </button>
                        <br />
                        <br />
                        <p style={{ textAlign: "center" }}>Already have an account?<a href='/login'><span>Login</span></a></p>
                    </form>
                </div>
            </div>
            <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}>
                <ModalHeader toggle={() => setShowDeleteModal(false)}>Your account is inactive</ModalHeader>
                <ModalBody>You have deactivated your account. Activate your account to continue login</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleactivate}>Activate account</Button>
                    <Button color="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default SignUpPage;
