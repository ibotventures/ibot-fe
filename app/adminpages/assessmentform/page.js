"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import axios from 'axios';
import { Input } from 'reactstrap';
const Assessment = () => {
    const [question, setquestion] = useState('');
    const [option1, setoption1] = useState('');
    const [option2, setoption2] = useState('');
    const [option3, setoption3] = useState('');
    const [option4, setoption4] = useState('');
    const [answer, setanswer] = useState('');
    const [asscount, setAsscount] = useState('');
    const router = useRouter();

    useEffect(() => {
        const initialAsscount = sessionStorage.getItem('asscount');
        if (initialAsscount === null || initialAsscount == 0) {
            const asscounts = sessionStorage.getItem('assess_ques_count');
            sessionStorage.setItem('asscount', asscounts);
            setAsscount(asscounts);
        } else {
            setAsscount(initialAsscount);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!(answer == option1 || answer == option2 || answer == option3 || answer == option4)) {
                toast.error('Your answer should match any one of the options');
                return;
            } else if (option1 == option2 || option2 == option3 || option4 == option1 || option3 == option4) {
                toast.error('Give unique options, your have given repeated options');
                return;
            }

            const Mymodule = sessionStorage.getItem('module');
            const formData = new FormData();
            formData.append('question', question);
            formData.append('option1', option1);
            formData.append('option2', option2);
            formData.append('option3', option3);
            formData.append('option4', option4);
            formData.append('answer', answer);
            formData.append('module', Mymodule);
            // formData.append('module_id', Mymodule);

            const res = await axios.post('http://127.0.0.1:8000/app/assessmentquestion/', formData);
            if (res && res.data) {
                if (res.status === 200 || res.status === 201) {
                    const count = sessionStorage.getItem('assess_ques_count') - 1;
                    sessionStorage.setItem('assess_ques_count', count);
                    const module_count = sessionStorage.getItem('module_count');
                    toast.success('Created successfully');

                    if (count > 0) {
                        setanswer('');
                        setoption1('');
                        setoption2('');
                        setoption3('');
                        setoption4('');
                        setquestion('');
                        router.push('/adminpages/assessmentform');
                    } else {
                        if (module_count > 0) {
                            sessionStorage.setItem('asscount', 0);
                            router.push('/adminpages/moduleform');
                        } else {
                            sessionStorage.setItem('modcount', 0);
                            router.push('/coursepreview');
                        }
                    }
                }
            }
        } catch (e) {
            toast.error('something went wrong');
        }


    };


    return (
        <>
            <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center" }} >
                <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }} className='container-fluid'>
                    <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>{sessionStorage.getItem('modulename')} - question {asscount - sessionStorage.getItem('assess_ques_count') + 1} of {asscount}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {/* <label htmlFor="email">Email</label> */}
                            <input
                                type="text"
                                onChange={e => setquestion(e.target.value)}
                                value={question}
                                className={classNames("form-control", styles.fontp)}
                                id="coursename"
                                placeholder="Question"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="text"
                                onChange={e => setoption1(e.target.value)}
                                value={option1}
                                className={classNames("form-control", styles.fontp)}
                                id="courseduration"
                                placeholder="Option 1"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="text"
                                onChange={e => setoption2(e.target.value)}
                                value={option2}
                                className={classNames("form-control", styles.fontp)}
                                id="courseduration"
                                placeholder="Option 2"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="text"
                                onChange={e => setoption3(e.target.value)}
                                value={option3}
                                className={classNames("form-control", styles.fontp)}
                                id="courseduration"
                                placeholder="Option 3"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="text"
                                onChange={e => setoption4(e.target.value)}
                                value={option4}
                                className={classNames("form-control", styles.fontp)}
                                id="courseduration"
                                placeholder="Option 4"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="text"
                                onChange={e => setanswer(e.target.value)}
                                value={answer}
                                className={classNames("form-control", styles.fontp)}
                                id="courseduration"
                                placeholder="Answer"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />


                        <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }}>
                            Create assessment
                        </button>
                        <br />
                        <br />
                    </form>

                </div>
            </div>

        </>
    );
}

export default Assessment;