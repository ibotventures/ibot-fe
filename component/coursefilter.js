
'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { useState, useEffect } from 'react';
import Sidebar from '@/component/filtercourse';
import Cookies from 'js-cookie';
export default function CourseFilter() {
    const [isadmin, setisadmin] = useState('');
    useEffect(() => {
        setisadmin(Cookies.get('username'));
    }, []);
    return (
        <>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5vw" }} className={styles.fontp}>
                {isadmin == 'Administrator' ? (
                    <>
                        <a href='/adminpages/addcourse'><button className='btn btn-primary'>Create new Course</button></a>
                        <Sidebar />
                    </>
                ) : (
                    <>
                        <Sidebar />
                    </>
                )}

            </div>

        </>

    );
}