'use client';
import styles from "@/app/page.module.css";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import classNames from 'classnames';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const LoginPage = () => {
    const [email, setemail] = useState('');
    const [password, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const router = useRouter();
    const handleactivate = async () => {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/activateaccount/`, {
            email: email
        });
        if (response.status == 200) {
            toast.success('Account activated. You can login now');
            setShowDeleteModal(false);
        }

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datas = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/app/signin/`,
                { email, password }
            );
            const { session, data, status } = datas.data;
            const { token, refresh } = session;
            const statuscode = datas.status;
            if (statuscode === 200 && token) {
                Cookies.set('username', data.username, { expires: 7 });
                Cookies.set('token', token, { expires: 7 });
                Cookies.set('userid', data.user_id, { expires: 7 });
                toast.success(`Logged in successfully`);
                router.push('/');
                window.location.href = '/';
            } else if (statuscode === 200) {
                if (data == 'inactive_user') {
                    setShowDeleteModal(true);
                    return;
                }
            }
            else {
                toast.error(`Check your details, login unsuccessful`);
            }
        } catch (err) {
            toast.error(`Login failed, please try again, check the email/password is correct or not or if you are a new user signup`);
        }
    };

    // Redirect if already logged in
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.replace('/'); // Prevent going back to login with history
        }
    }, [router]);

    return (
        <>

            <div className={classNames(styles.background)} style={{ display: "flex", justifyContent: "center" }} >
                <div className={classNames(styles.registerContainer, 'container-fluid')}>
                    <h2 style={{ paddingBottom: "2vw" }}>Login</h2>
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
                        <div className="form-group position-relative">
                            <input
                                type={showPassword ? "text" : "password"} // Toggle input type
                                onChange={e => setPass(e.target.value)}
                                value={password}
                                className={classNames("form-control")}
                                id="password"
                                placeholder="Password"
                                style={{ padding: "1vw" }}
                                required
                            />
                            {/* Eye icon for toggling */}
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
                        </div><br />
                        <a href='/forgetpassword'><p>Forget Password?</p></a>
                        <button type="submit" className={classNames("btn btn-primary btn-block")} style={{ width: "100%", borderRadius: "1.3vw" }}>
                            Login
                        </button>
                        <br />
                        <br />

                        <p style={{ textAlign: "center" }}>Don&apos;t have an account?<a href='/signup'><span>Register</span></a></p>

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
export default LoginPage;