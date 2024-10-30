'use client';
import Image from "next/image";

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import classNames from 'classnames';
export default function Home() {
    return (
        <>
            <h1 style={{fontSize:"3vw"}}>Delete Account</h1>
            <p className={styles.fontp}>We're sorry to see you go, but if you're sure you want to delete your account,then give reason:</p>
            <h3 className={styles.fonth}>Reason</h3>
            <textarea style={{border:"none",width:"40vw",height:"30vh"}}></textarea><br/>
            <br/>
            <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ borderRadius: "1vw" }}>
                Delete
                {/* {loading ? "Loading..." : "Login"} */}
            </button>



        </>

    );
}