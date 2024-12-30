'use client';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
export default function Home() {

    const router = useRouter();

    return (
        <>
            <h1>Purchase History</h1>
            <br/>
            <div style={{
                backgroundColor: "white", padding: '20px', borderRadius: '20px',width:'fit-content'
            }}>
                <p>product_name</p>
                <p>orderid:6723t23ghfehf4</p>
                <button>
                    download
                </button>
            </div>
        </>
    );
}