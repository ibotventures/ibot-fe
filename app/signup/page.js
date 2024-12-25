'use client';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
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
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/sendotp/`, { email, username, mobile, password, type });
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
                            <input
                                type="password"
                                onChange={e => setPass(e.target.value)}
                                value={password}
                                className={classNames("form-control")}
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
                                className={classNames("form-control")}
                                id="conf-password"
                                placeholder="Confirm Password"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />

                        <button type="submit" className={classNames("btn btn-primary btn-block")} style={{ width: "100%", borderRadius: "1.3vw" }}>
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




// 'use client';
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
// import axios from "axios";
// import classNames from 'classnames';
// import styles from "@/app/page.module.css";

// const SignUpPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confPassword, setConfPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [mobile, setMobile] = useState("");
//   const router = useRouter();

//   // Redirect if already logged in
//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (token) {
//       router.replace("/"); // Prevent going back to login
//     }
//   }, [router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (password !== confPassword) {
//         toast.error("Passwords do not match!");
//         return;
//       }

//       if (password.length < 6) {
//         toast.error("Password must be at least 6 characters long.");
//         return;
//       }

//       sessionStorage.setItem("email", email);
//       sessionStorage.setItem("username", username);
//       const type = "send";

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_API_URL}/app/sendotp/`,
//         { email, username, mobile, password, type }
//       );

//       const { data, status } = response;

//       if (data.data === "email_found") {
//         toast.error("This email already exists. Please use a different one.");
//         return;
//       }

//       if (data.data === "username_found") {
//         toast.error("This username is already taken. Please try another.");
//         return;
//       }

//       if ((status === 200 || status === 201) && data.data.isfound === "notfound") {
//         const message = `An email has been sent to ${data.data.email}. If you do not receive the OTP, click resend.`;
//         sessionStorage.setItem("type", type);
//         toast.success(message);
//         router.push("/verification");
//       }
//     } catch (err) {
//       const errorDetails = err.response?.data?.details || "An unknown error occurred";
//       toast.error(`Error: ${errorDetails}`);
//     }
//   };

//   // Styles as JavaScript objects
//   const styles = {
//     background: {
//       backgroundColor: "#f9f9f9",
//       minHeight: "100vh",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     registerContainer: {
//       backgroundColor: "whitesmoke",
//       padding: "2rem",
//       borderRadius: "20px",
//       boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
//       width: "50%",
//     },
//     formGroup: {
//       marginBottom: "1.5rem",
//     },
//     input: {
//       width: "100%",
//       padding: "1rem",
//       borderRadius: "5px",
//       border: "1px solid #ccc",
//     },
//     button: {
//       width: "100%",
//       padding: "1rem",
//       borderRadius: "5px",
//       backgroundColor: "#007bff",
//       color: "white",
//       border: "none",
//       fontWeight: "bold",
//     },
//     note: {
//       marginTop: "1rem",
//       fontSize: "0.9rem",
//       textAlign: "center",
//     },
//     link: {
//       color: "#007bff",
//       cursor: "pointer",
//     },
//     // Responsive styles
//     "@media (max-width: 768px)": {
//       registerContainer: {
//         width: "90%",
//         padding: "1.5rem",
//       },
//     },
//   };

//   return (
//     <div className={classNames(styles.background)}>
//       <div style={styles.registerContainer}>
//         <h2>Register</h2>
//         <p>
//           <b>Note:</b> If you purchased our product offline, use the same email and phone number.
//         </p>
//         <form onSubmit={handleSubmit}>
//           <div style={styles.formGroup}>
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               style={styles.input}
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <input
//               type="text"
//               onChange={(e) => setMobile(e.target.value)}
//               value={mobile}
//               style={styles.input}
//               placeholder="Phone Number"
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <input
//               type="text"
//               onChange={(e) => setUsername(e.target.value)}
//               value={username}
//               style={styles.input}
//               placeholder="Username"
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               style={styles.input}
//               placeholder="Password"
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <input
//               type="password"
//               onChange={(e) => setConfPassword(e.target.value)}
//               value={confPassword}
//               style={styles.input}
//               placeholder="Confirm Password"
//               required
//             />
//           </div>
//           <button type="submit" style={styles.button}>
//             Sign Up
//           </button>
//         </form>
//         <p style={styles.note}>
//           Already have an account?{" "}
//           <span style={styles.link} onClick={() => router.push("/login")}>
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
