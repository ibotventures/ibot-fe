"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import axios from 'axios';
import { Input } from 'reactstrap';

const Module = () => {
    const [updatetask, setupdatetask] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const extension = updatetask.name.split('.').pop().toLowerCase();
        if (!updatetask) {
            toast.error('Please upload all required files');
            return;
        } else if (!['pdf', 'pptx', 'ppt'].includes(extension)) {
            toast.error(`Please upload a Doc file like ppt but you have uploaded ${extension}`);
            return;
        }

        const formData1 = new FormData();
        const type = sessionStorage.getItem('tasktype');
        const id = sessionStorage.getItem('modupdateid');

        // Append required fields
        formData1.append('file', updatetask);  // Append the actual file
        formData1.append('type', type);  // Append the type (content/overview/activity)
        formData1.append('id', id);  // Append the module ID
        formData1.append('extension', extension);  // Append the file extension

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',  // Ensure the content type is multipart
            }
        };

        try {
            const response = await axios.put('http://127.0.0.1:8000/app/uploadmodule/', formData1, config);
            if (response.status === 200 || response.status === 201) {
                toast.success("Updated successfully");
                router.push('/coursepreview');
            }
        } catch (err) {
            toast.error('Some error occurred, try again');
            console.error(err);
        }
    };


    return (
        <>
            <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center" }} >
                <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }} className='container-fluid'>
                    <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>
                        Update Task
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="overview" style={{ paddingLeft: '1vw' }}>Upload</label>
                            <Input
                                type="file"
                                name='file'
                                onChange={e => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setupdatetask(file);
                                        console.log('Selected File:', file);
                                    } else {
                                        toast.error('file is required');
                                    }
                                }}
                                className={classNames("form-control", styles.fontp)}
                                id="updatetask"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />

                        <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }}>
                            Save
                        </button>
                        <br />
                        <br />
                    </form>

                </div>
            </div>

        </>
    );
}

export default Module;