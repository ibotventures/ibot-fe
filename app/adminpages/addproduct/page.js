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
    const [product_image, setimage] = useState('');
    const [product_name, setproductname] = useState('');
    const [product_description, setproductdescription] = useState('');
    const [product_price, setproductprice] = useState('');
    const [product_number, setproductnumber] = useState('');
    const [age_category, setagecategory] = useState('');
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
            const extension = product_image.name.split('.').pop().toLowerCase();

            if (product_price === 0 || product_price < 0) {
                toast.error('Price Should not be zero or negative');
                return;
            } else if (!(['jpg', 'jpeg', 'png', 'gif'].includes(extension))) {
                toast.error(`Please upload Image file like jpg,jpeg,png but you have uploaded ${extension}`);
                return;
            } else if (!age_category) {
                toast.error('Please select the Age Category');
            }

            const formData = new FormData();
            formData.append('product_name', product_name);
            formData.append('product_description', product_description);
            formData.append('product_price', product_price);
            formData.append('product_number', product_number);
            formData.append('age_category', age_category);
            formData.append('product_cover_image', product_image);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/addproduct/`, formData, config);

            if (res && res.data) {
                if (res.status === 200 || res.status === 201) {
                    // const { id } = res.data.data;
                    toast.success('Product initialized successfully');
                    console.log(res.data.data);
                    router.push('/products');
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
                                onChange={e => setproductnumber(e.target.value)}
                                value={product_number}
                                className={classNames("form-control", styles.fontp)}
                                id="productnumber"
                                placeholder="Product Number"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="email">Email</label> */}
                            <input
                                type="text"
                                onChange={e => setproductname(e.target.value)}
                                value={product_name}
                                className={classNames("form-control", styles.fontp)}
                                id="productname"
                                placeholder="Product Name"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="email">Email</label> */}
                            <Input
                                type="textarea"
                                onChange={e => setproductdescription(e.target.value)}
                                value={product_description}
                                className={classNames("form-control", styles.fontp)}
                                id="productdescription"
                                placeholder="Product Description"
                                style={{ padding: "1vw" }}
                                required
                            />
                        </div><br />
                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="number"
                                onChange={e => setproductprice(e.target.value)}
                                value={product_price}
                                className={classNames("form-control", styles.fontp)}
                                id="productprice"
                                placeholder="Product price"
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
                                <option>Age 9-15</option>
                            </Input>

                        </div><br />

                        <div className="form-group">
                            <label htmlFor="image" style={{ paddingLeft: "1vw" }}>Upload Product Cover Image</label>
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
                            Add product
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