
"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import axios from 'axios';

const Assessment = () => {
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answer, setAnswer] = useState('');
    const [questions, setQuestions] = useState([]); // Store all questions
    const router = useRouter();

    const handleAddQuestion = (e) => {
        e.preventDefault();

        // Validation for unique options and correct answer
        if (!(answer === option1 || answer === option2 || answer === option3 || answer === option4)) {
            toast.error('Your answer should match one of the options');
            return;
        }
        if (new Set([option1, option2, option3, option4]).size < 4) {
            toast.error('Options must be unique');
            return;
        }

        // Add the new question to the questions list
        const newQuestion = { question, option1, option2, option3, option4, answer };
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

        // Clear the input fields
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setAnswer('');

        toast.success('Question added successfully!');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add the last question to the questions list before submission
        const finalQuestions = [...questions];
        if (question && option1 && option2 && option3 && option4 && answer) {
            // Validate the last question
            if (!(answer === option1 || answer === option2 || answer === option3 || answer === option4)) {
                toast.error('Your answer should match one of the options');
                return;
            }
            if (new Set([option1, option2, option3, option4]).size < 4) {
                toast.error('Options must be unique');
                return;
            }

            // Add the last question
            finalQuestions.push({ question, option1, option2, option3, option4, answer });
        }

        const payload = {
            course_id: sessionStorage.getItem('course'),
            certification: {
                name: sessionStorage.getItem('course_names'),
                description: sessionStorage.getItem('description'),
                duration: sessionStorage.getItem('course_duration'),
                questions: finalQuestions, // Include all questions including the last one
            },
        };

        try {
            // Send payload to backend
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/certifications/`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Certification created successfully!');
            setQuestions([]); // Clear all questions
            setQuestion('');
            setOption1('');
            setOption2('');
            setOption3('');
            setOption4('');
            setAnswer('');
            router.push('/coursepreview');
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        }
    };


    return (
        <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
                backgroundColor: "whitesmoke",
                width: "50vw",
                padding: "3vw",
                borderRadius: "20px",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                margin: "20px",
                height: "fit-content",
            }}
                className="container-fluid">
                <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>
                    Add Questions to Certification
                </h2>
                <form onSubmit={handleAddQuestion}>
                    <input
                        type="text"
                        onChange={(e) => setQuestion(e.target.value)}
                        value={question}
                        className={classNames("form-control", styles.fontp)}
                        placeholder="Question"
                        style={{ padding: "1vw" }}
                        required
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setOption1(e.target.value)}
                        value={option1}
                        className={classNames("form-control", styles.fontp)}
                        placeholder="Option 1"
                        style={{ padding: "1vw" }}
                        required
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setOption2(e.target.value)}
                        value={option2}
                        className={classNames("form-control", styles.fontp)}
                        placeholder="Option 2"
                        style={{ padding: "1vw" }}
                        required
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setOption3(e.target.value)}
                        value={option3}
                        className={classNames("form-control", styles.fontp)}
                        placeholder="Option 3"
                        style={{ padding: "1vw" }}
                        required
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setOption4(e.target.value)}
                        value={option4}
                        className={classNames("form-control", styles.fontp)}
                        placeholder="Option 4"
                        style={{ padding: "1vw" }}
                        required
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setAnswer(e.target.value)}
                        value={answer}
                        className={classNames("form-control", styles.fontp)}
                        placeholder="Answer"
                        style={{ padding: "1vw" }}
                        required
                    />
                    <br />
                    <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }}>
                        Add Question
                    </button>
                </form>
                <br />
                <button onClick={handleSubmit} className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }}>
                    Submit Certification
                </button>
            </div>
        </div>
    );
};

export default Assessment;
