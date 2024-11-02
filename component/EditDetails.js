'use client';
import Image from "next/image";
import LandingCaurosal from "@/component/productcaurosal";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import classNames from 'classnames';
import { useState } from "react";
export default function Home() {
    const [email, setemail] = useState('xyz@gmail.com');
    const [state, setState] = useState('tamilnadu');
    const [fullname, setname] = useState('anonymous');
    const [username, setUsername] = useState('anonymous');
    const [age, setAge] = useState('age');
    const [address, setAddress] = useState('address street');
    const [pincode, setPincode] = useState('600001');
    const [city, setCity] = useState('chennai');
    const [country, setCountry] = useState('india');
    const [phone, setNumber] = useState('1234567890');
    return (
        <>
            <h1 style={{ fontSize: "3vw", margin: "2vw" }}>Edit Details</h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "2vw" }}>

                <Image width={200} height={200} src={'/profile.png'} className="img-fluid" alt="Description of the image" />
            </div>


            <form className={styles.fontp} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="form-group" style={{ marginRight: "1.5vw" }}>
                        <label htmlFor="username">FullName</label>
                        <input
                            type="text"
                            onChange={e => setname(e.target.value)}
                            value={fullname}
                            className={classNames("form-control", styles.fontp)}
                            id="fullname"
                            placeholder="FullName"
                            style={{ padding: "0.5vw", width: "24vw" }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            className={classNames("form-control", styles.fontp)}
                            id="username"
                            placeholder="Username"
                            style={{ padding: "0.5vw", width: "24vw" }}

                        />
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="email"
                        onChange={e => setemail(e.target.value)}
                        value={email}
                        className={classNames("form-control", styles.fontp)}
                        id="email"
                        placeholder="Email"
                        style={{ padding: "0.5vw", width: "50vw" }}
                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Phone Number</label>
                    <input
                        type="text"
                        onChange={e => setNumber(e.target.value)}
                        value={phone}
                        className={classNames("form-control", styles.fontp)}
                        id="phone"
                        placeholder="Phone Number"
                        style={{ padding: "0.5vw", width: "50vw" }}
                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Age</label>
                    <input
                        type="text"
                        onChange={e => setAge(e.target.value)}
                        value={age}
                        className={classNames("form-control", styles.fontp)}
                        id="age"
                        placeholder="Age"
                        style={{ padding: "0.5vw", width: "50vw" }}
                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Address</label>
                    <input
                        type="text"
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                        className={classNames("form-control", styles.fontp)}
                        id="address"
                        placeholder="Address"
                        style={{ padding: "0.5vw", width: "50vw" }}
                    />
                </div><br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="form-group" style={{ marginRight: "1.5vw" }}>
                        <label htmlFor="username">State</label>
                        <input
                            type="text"
                            onChange={e => setState(e.target.value)}
                            value={state}
                            className={classNames("form-control", styles.fontp)}
                            id="state"
                            placeholder="State"
                            style={{ padding: "0.5vw", width: "24vw" }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">City</label>
                        <input
                            type="text"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            className={classNames("form-control", styles.fontp)}
                            id="city"
                            placeholder="City"
                            style={{ padding: "0.5vw", width: "24vw" }}
                        />
                    </div>
                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "space-between", width: "inherit" }}>
                    <div className="form-group" style={{ marginRight: "1.5vw" }}>
                        <label htmlFor="username">Country</label>
                        <input
                            type="text"
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                            className={classNames("form-control", styles.fontp)}
                            id="country"
                            placeholder="Country"
                            style={{ padding: "0.5vw", width: "24vw" }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Pincode</label>
                        <input
                            type="text"
                            onChange={e => setPincode(e.target.value)}
                            value={pincode}
                            placeholder="Pincode"
                            className={classNames("form-control", styles.fontp)}
                            id="pincode"
                            style={{ padding: "0.5vw", width: "24vw" }}
                        />
                    </div>
                </div>
                <br />
                <div style={{ display: "flex", width: "50vw", gap: "1vw" }}>
                    <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ borderRadius: "1vw" }}>
                        Cancel
                        {/* {loading ? "Loading..." : "Login"} */}
                    </button>
                    <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ borderRadius: "1vw" }}>
                        Save
                        {/* {loading ? "Loading..." : "Login"} */}
                    </button>
                </div>

                <br />
                <br />

            </form>


        </>

    );
}