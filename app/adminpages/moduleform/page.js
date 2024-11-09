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
    const [module_name, setmodulename] = useState('');
    const [module_description, setmoduledescription] = useState('');
    const [assessment_ques_count, setquestioncount] = useState('');
    const [overview, setoverview] = useState('');
    const [content, setcontent] = useState('');
    const [activity, setactivity] = useState('');
    const [modcount, setModcount] = useState('');
    const router = useRouter();

    useEffect(() => {
        const initialModcount = parseInt(sessionStorage.getItem('modcount'), 10);
        if (initialModcount === null || initialModcount == 0) {
            const modcounts = parseInt(sessionStorage.getItem('module_count'), 10);
            sessionStorage.setItem('modcount', modcounts);
            setModcount(modcounts);
        } else {
            setModcount(initialModcount);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        };
        const extension = overview.name.split('.').pop().toLowerCase();
        const extension1 = content.name.split('.').pop().toLowerCase();
        const extension2 = activity.name.split('.').pop().toLowerCase();
        if (!overview || !content || !activity) {
            toast.error('Please upload all required files');
            return;
        }
        if (assessment_ques_count == 0 || assessment_ques_count < 0) {
            toast.error('Assessment question count should not be zero or negative');
            return;
        } else if (!['pdf', 'pptx', 'ppt'].includes(extension)) {
            toast.error(`Please upload Doc file like ppt but you have uploaded ${extension}`);
            return;
        } else if (!['pdf', 'pptx', 'ppt'].includes(extension1)) {
            toast.error(`Please upload Doc file like ppt but you have uploaded ${extension1}`);
            return;
        } else if (!['pdf', 'ppt', 'pptx'].includes(extension2)) {
            toast.error(`Please upload Doc file like ppt but you have uploaded ${extension2}`);
            return;
        }

        try {

            const courseid = sessionStorage.getItem('course');
            sessionStorage.setItem('assess_ques_count', assessment_ques_count);
            const formData1 = new FormData();
            formData1.append('course', courseid);
            formData1.append('module_name', module_name);
            formData1.append('module_description', module_description);
            formData1.append('intro', overview);
            formData1.append('content', content);
            formData1.append('activity', activity);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/uploadmodule/`, formData1, config);
            console.log(response.data.data);
            if (response.status === 200 || response.status === 201) {
                sessionStorage.setItem('modulename', module_name);
                sessionStorage.setItem('asscount', 0);
                const newModuleCount = sessionStorage.getItem('module_count') - 1;
                sessionStorage.setItem('module_count', newModuleCount);
                sessionStorage.setItem('module', response.data.data.id);
                toast.success("Module created successfully");
                setactivity('');
                setcontent('');
                setmodulename('');
                setmoduledescription('');
                setoverview('');
                setquestioncount('');
                console.log(response.data.data);
                router.push('/adminpages/assessmentform');
            }
        }
        catch (err) {
            toast.error('Some error occurred, try again');
        }

    };

    return (
        <>
            <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center" }} >
                <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }} className='container-fluid'>
                    <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>
                        {/* {sessionStorage.getItem('course_names')} - module {modcount - sessionStorage.getItem('module_count') + 1} of {modcount} */}
                        {sessionStorage.getItem('course_names')} - module {modcount - parseInt(sessionStorage.getItem('module_count'), 10) + 1} of {modcount}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                onChange={e => setmodulename(e.target.value)}
                                value={module_name}
                                className={classNames("form-control", styles.fontp)}
                                id="modulename"
                                placeholder="Module Name"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">



                            <Input
                                type="textarea"
                                onChange={e => setmoduledescription(e.target.value)}
                                value={module_description}
                                className={classNames("form-control", styles.fontp)}
                                id="moduledescription"
                                placeholder="Module Description"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />

                        <div className="form-group">
                            <label htmlFor="overview" style={{ paddingLeft: '1vw' }}>Upload Overview Doc of this module</label>
                            <Input
                                type="file"
                                name='file'
                                onChange={e => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setoverview(file);
                                        console.log('Selected Overview File:', file);
                                    } else {
                                        toast.error('Overview file is required');
                                    }
                                }}
                                className={classNames("form-control", styles.fontp)}
                                id="overview"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            <label htmlFor="content" style={{ paddingLeft: '1vw' }}>Upload main content Doc of this module</label>
                            <Input
                                type="file"
                                name='file'
                                onChange={e => setcontent(e.target.files[0])}
                                className={classNames("form-control", styles.fontp)}
                                id="main-content"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            <label htmlFor="activity" style={{ paddingLeft: '1vw' }}>Upload activity Doc of this module</label>
                            <Input
                                type="file"
                                name='file'
                                onChange={e => setactivity(e.target.files[0])}
                                className={classNames("form-control", styles.fontp)}
                                id="activity"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            <input
                                type="number"
                                onChange={e => setquestioncount(e.target.value)}
                                value={assessment_ques_count}
                                className={classNames("form-control", styles.fontp)}
                                id="ques_count"
                                placeholder="No. of questions you are going to create for this assessment"
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
