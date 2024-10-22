'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import classNames from 'classnames';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
const LoginPage = () => {
    const [email, setemail] = useState('');
    const [password, setPass] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datas = await axios.post(
                'https://gm2gtb4x-8000.inc1.devtunnels.ms/app/signin/',
                { email, password }
            );
            const { session, data, status } = datas.data;
            const { token, refresh } = session;
            const statuscode = datas.status;
            if (statuscode === 200 && token) {
                Cookies.set('email', data.email, { expires: 7 });
                Cookies.set('username',data.username, {expires: 7});
                Cookies.set('token', token, { expires: 7 });
                Cookies.set('userid',data.id,{expires: 7});
                toast.success(`Logged in successfully`);
                router.push('/');
            } else {
                toast.error(`Check your details, login unsuccessful`);
            }
        } catch (err) {
            toast.error(`Login failed, please try again, check the email/password is correct or not or if you are a new user signup`);
        }
    };
    
    return (
        <>

            <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center" }} >
                <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }} className='container-fluid'>
                    <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Login</h2>
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
                        <a href='/forgetpassword'><p>Forget Password?</p></a>
                        <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }}>
                            Login
                        </button>
                        <br />
                        <br />

                        <p style={{ textAlign: "center" }}>Don&apos;t have an account?<a href='/signup'><span>Signup/Register</span></a></p>

                    </form>

                </div>
            </div>

        </>
    );
}
export default LoginPage;