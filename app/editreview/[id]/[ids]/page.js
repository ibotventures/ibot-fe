'use client';
import styles from "@/app/page.module.css";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import axios from 'axios';
import styler from '@/app/coursepreview/course.module.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const SignUpPage = () => {
    const router = useRouter();
    const params = useParams();
    const searchparams = useSearchParams();
    const { id, ids } = params;
    const ratings = searchparams.get('ratings');
    const comments = searchparams.get('comments');
    const [rating, setRating] = useState(ratings);
    const [comment, setComment] = useState(comments);
    const type = searchparams.get('type');
    const [isLoading, setIsLoading] = useState(false); // Loading state


    const handlereview = async () => {
        try {
            if (comment == "") {
                toast.error("you can't leave empty");
                return;
            }
            if (type == 'product') {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/productreviews/`, { ids, rating, comment });
                if (res.status === 200) {
                    router.push(`/product/${id}`);
                    toast.success('Updated successfully');

                }
            } else if (type == 'course') {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/reviews/`, { ids, rating, comment });
                if (res.status === 200) {
                    sessionStorage.setItem('course', id);
                    router.push('/coursepreview');
                    toast.success('Updated successfully');

                }
            }else{
                toast.error('Something went wrong');
            }

        } catch (error) {
            // console.error("Error fetching cart data:", error);
        }

    }

    return (
        <>
            <div className={classNames(styles.background)} style={{ display: "flex", justifyContent: "center" }} >
                <div className={classNames(styles.registerContainer, 'container-fluid')}>
                    <h2 style={{ paddingBottom: "2vw" }}>Edit Review</h2>
                    <form>
                        <fieldset className="starability-slot">
                            <input
                                type="checkbox"
                                id="no-rate"
                                className="input-no-rate"
                                name="review[rating]"
                                value="1"
                                checked
                                onChange={(e) => setRating(e.target.value)}
                                aria-label="No rating."
                            />

                            <input
                                type="checkbox"
                                id="first-rate1"
                                name="review[rating]"
                                value="1"
                                checked={rating >= 1}
                                onChange={(e) => setRating(e.target.value)}
                            />
                            <label htmlFor="first-rate1" title="Terrible">1 star</label>

                            <input
                                type="checkbox"
                                id="first-rate2"
                                name="review[rating]"
                                value="2"
                                checked={rating >= 2}
                                onChange={(e) => setRating(e.target.value)}
                            />
                            <label htmlFor="first-rate2" title="Not good">2 stars</label>

                            <input
                                type="checkbox"
                                id="first-rate3"
                                name="review[rating]"
                                value="3"
                                checked={rating >= 3}
                                onChange={(e) => setRating(e.target.value)}
                            />
                            <label htmlFor="first-rate3" title="Average">3 stars</label>

                            <input
                                type="checkbox"
                                id="first-rate4"
                                name="review[rating]"
                                value="4"
                                checked={rating >= 4}
                                onChange={(e) => setRating(e.target.value)}
                            />
                            <label htmlFor="first-rate4" title="Very good">4 stars</label>

                            <input
                                type="checkbox"
                                id="first-rate5"
                                name="review[rating]"
                                value="5"
                                checked={rating >= 5}
                                onChange={(e) => setRating(e.target.value)}
                            />
                            <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                        </fieldset>
                        <div style={{ fontWeight: "bold", fontSize: "large" }}>Comments</div>
                        <br />
                        <textarea
                            id="reviews"
                            name="review[comment]"
                            required
                            className={classNames('form-control', styler.comment)}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <br />
                        <button
                            type='button'
                            onClick={handlereview}
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </form>

                </div>
            </div>

        </>
    );
}

export default SignUpPage;