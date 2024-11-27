"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import axios from 'axios';
import { Input } from 'reactstrap';
const AddCourse = () => {
    const [course_cover_image, setimage] = useState('');
    const [module_count, setmodulecount] = useState('');
    const [course_duration, setcourseduration] = useState('');
    const [course_name, setcoursename] = useState('');
    const [course_description, setcoursedescription] = useState('');
    const [course_price, setcourseprice] = useState('');
    const [level, setlevel] = useState('');
    const [age_category, setagecategory] = useState('');
    const [product_model,setproductmodel] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        };

        try {
            const extension = course_cover_image.name.split('.').pop().toLowerCase();

            if (!level) {
                toast.error('Please select the level.');
                return;
            } else if (module_count === 0 || module_count === null || module_count < 0) {
                toast.error('At least one module should be present in the course.');
                return;
            } else if (course_duration === 0 || course_duration < 0) {
                toast.error('Duration should not be zero or negative');
                return;
            } else if (course_price === 0 || course_price < 0) {
                toast.error('Price Should not be zero or negative');
                return;
            } else if (!(['jpg', 'jpeg', 'png', 'gif'].includes(extension))) {
                toast.error(`Please upload Image file like jpg,jpeg,png but you have uploaded ${extension}`);
                return;
            } else if (!age_category) {
                toast.error('Please select the Age Category');
                return;
            }else if(!product_model){
                toast.error('Please select the Product model used in this course');
                return;
            }

            const formData = new FormData();
            formData.append('course_name', course_name);
            formData.append('course_description', course_description);
            formData.append('course_duration', course_duration);
            formData.append('course_price', course_price);
            formData.append('age_category', age_category);
            formData.append('level', level);
            formData.append('module_count', module_count);
            formData.append('course_cover_image', course_cover_image);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/uploadcourse/`, formData, config);

            if (res && res.data) {
                if (res.status === 200 || res.status === 201) {
                    const { id } = res.data.data;
                    sessionStorage.setItem('course', id);
                    sessionStorage.setItem('module_count', module_count);
                    sessionStorage.setItem('course_names', course_name);
                    sessionStorage.setItem('description',course_description);
                    sessionStorage.setItem('course_duration',course_duration);
                    sessionStorage.setItem('modcount', 0);
                    toast.success('Course initialized successfully. Proceed to create modules.');
                    console.log(res.data.data);
                    router.push('/adminpages/moduleform');
                } else {
                    toast.error(`Error: ${res.status}`);
                }
            } else {
                toast.error('Empty response from server.');
            }
        } catch (err) {
            if (err.response) {
                toast.error(`Server Error: ${err.response.data.error || err.response.statusText}`);
            } else if (err.request) {
                toast.error('No response from server.');
            } else {
                toast.error(`Error: ${err.message}`);
            }
        }
    };


    return (
        <>
            <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center" }} >
                <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }} className='container-fluid'>
                    <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Create Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {/* <label htmlFor="email">Email</label> */}
                            <input
                                type="text"
                                onChange={e => setcoursename(e.target.value)}
                                value={course_name}
                                className={classNames("form-control", styles.fontp)}
                                id="coursename"
                                placeholder="Course Name"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="email">Email</label> */}
                            <Input
                                type="textarea"
                                onChange={e => setcoursedescription(e.target.value)}
                                value={course_description}
                                className={classNames("form-control", styles.fontp)}
                                id="coursedescription"
                                placeholder="Course Description"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="number"
                                onChange={e => setcourseduration(e.target.value)}
                                value={course_duration}
                                className={classNames("form-control", styles.fontp)}
                                id="courseduration"
                                placeholder="Course Duration in hrs"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="number"
                                onChange={e => setcourseprice(e.target.value)}
                                value={course_price}
                                className={classNames("form-control", styles.fontp)}
                                id="courseprice"
                                placeholder="Course price"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            <Input
                                type="select"
                                name='select'
                                onChange={e => setagecategory(e.target.value)}
                                value={age_category}
                                className={classNames("form-control", styles.fontp)}
                                id="Age Category"
                                style={{ padding: "1vw" }}
                                required
                            >
                                <option>Select Age Category</option>
                                <option>Age 3-5</option>
                                <option>Age 5-9</option>
                                <option>Age 9+</option>
                            </Input>

                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <Input
                                type="select"
                                name='select'
                                onChange={e => setlevel(e.target.value)}
                                value={level}
                                className={classNames("form-control", styles.fontp)}
                                id="level"
                                style={{ padding: "1vw" }}
                                required
                            >
                                <option>Select Level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </Input>
                        </div><br />
                        <div className="form-group">
                            <Input
                                type="select"
                                name='select'
                                onChange={e => setproductmodel(e.target.value)}
                                value={product_model}
                                className={classNames("form-control", styles.fontp)}
                                id="product_model"
                                style={{ padding: "1vw" }}
                                required
                            >
                                <option>Select Product Model</option>
                                <option>U10 pro</option>
                                <option>U20 pro</option>
                                <option>A1</option>
                                <option>A3</option>
                                <option>S30</option>
                                <option>S40</option>
                                <option>D3 pro</option>
                                <option>AI MODULE 1S</option>
                                <option>AI MODULE 5S</option>
                                <option>AI MODULE 3S</option>
                                <option>E7 pro</option>
                            </Input>

                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="number"
                                onChange={e => setmodulecount(e.target.value)}
                                value={module_count}
                                className={classNames("form-control", styles.fontp)}
                                id="modulecount"
                                placeholder="Module Count"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            <label htmlFor="image" style={{ paddingLeft: "1vw" }}>Upload Course Cover Image</label>
                            <Input
                                type="file"
                                name='file'
                                onChange={e => setimage(e.target.files[0])}
                                className={classNames("form-control", styles.fontp)}
                                id="image"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />

                        <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }}>
                            Create course
                        </button>
                        <br />
                        <br />
                    </form>

                </div>
            </div>

        </>
    );
}

export default AddCourse;