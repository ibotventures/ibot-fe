

'use client';
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import styler from '@/app/coursepreview/course.module.css';
import classNames from 'classnames';
export default function Product() {
    const [source1, setSource1] = useState('https://static.wixstatic.com/media/b71048_383a88c72a9a4982b0a67cac0a72ce50~mv2.png/v1/fill/w_384,h_437,al_c,lg_1,q_85,enc_auto/Picture28.png');
    const [rating, setRating] = useState(0); // State to store selected rating
    const [comment, setComment] = useState("");
    const handleImage = (source) => {
        setSource1(source);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',margin:'20px' }}>
                <div>
                    <Image
                        src='https://static.wixstatic.com/media/b71048_18a9a376102c4a95aee105370a14fc9d~mv2.jpg'
                        width={50}
                        height={50}
                        alt="Image 1"
                        style={{ width: '90vw', height: '40vh' }}
                        onClick={() => handleImage('https://static.wixstatic.com/media/b71048_18a9a376102c4a95aee105370a14fc9d~mv2.jpg')}
                    />
                    <br />
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2>Product Name</h2>
                        <button className="btn btn-primary">Buy Now 100rs</button>
                    </div>
                    <div style={{ display: 'flex', fontSize: '30px' }}>

                        <FaStar

                            style={{
                                color: "gold"
                            }}
                        />
                        <FaStar

                            style={{
                                color: "gold"
                            }}
                        />
                        <FaStar

                            style={{
                                color: "gold"
                            }}
                        />
                        <FaStar

                            style={{
                                color: "gold"
                            }}
                        />


                    </div>
                    <br />
                    <div>
                        <h4>Product description</h4>
                        <p>hfbvenf svn rb vberv  vbe vwbe ebv fwe wevc wgec wec we cweg cwec wec wc wecf f wefcwe gfvwhegfwegruyewgtuwygvwhvehfygfy</p>
                        <h4>Product Details</h4>
                        <p><span style={{ fontWeight: 'bold' }}>Age category:</span> 3-5</p>
                        <p><span style={{ fontWeight: 'bold' }}>Level:</span> Beginner</p>
                        <p><span style={{ fontWeight: 'bold' }}>Made in:</span>China</p>
                        <p><span style={{ fontWeight: 'bold' }}>Price:</span>100rs Only</p>
                    </div>
                    <div>

                        <h3>Review</h3>
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
                                // onClick={handlereview}
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </form>
                    </div>


                </div>
            </div>
            <br />
        </>
    );
}
