

'use client';
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useParams } from 'next/navigation';
import styler from '@/app/coursepreview/course.module.css';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import classNames from 'classnames';
import Cookies from "js-cookie";
export default function Product() {
    const [reviews, setReviews] = useState([]);
    const userCook = Cookies.get('userid');
    const [rating, setRating] = useState(0); // State to store selected rating
    const [comment, setComment] = useState("");
    // const [product,setproduct] = useState("");
    const [products, setProduct] = useState(null);
    const params = useParams();
    const { id } = params;

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/productreviews/`, {
                params: { id }
            }
            );
            if (response.status == 200) {
                setReviews(response.data.data);
            }
            // setLoading(false);
        } catch (error) {
            console.error("Error loading reviews:", error.response?.data || error.message);
            toast.error("Something went wrong while loading reviews");
            // setLoading(false);
        }
    };

    const handlereview = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/productreviews/`,
            { 'user': userCook, 'product': products.id, 'review': comment, 'rating': rating },
        );
        if (response.status == 200) {
            setReviews(response.data.data);
            setComment("");
            setRating(0);
        }

    }

    useEffect(() => {
        const handleproduct = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/eachproduct/`, {
                    params: { productid: id }
                });

                if (response.status === 200) {
                    setProduct(response.data.data);
                    console.log("Product Image URL:", `${process.env.NEXT_PUBLIC_BASE_API_URL}${response.data.data.product_image}`);
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        handleproduct()
        fetchReviews();

    }, [id]);

    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
                <div style={{ width: '90vw' }}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${products.product_image}`}
                        width={500}
                        height={500}
                        alt="Product Image"
                        className="img-fluid"
                        style={{ width: '90vw', maxHeight: '40vh' }}
                        unoptimized
                    />
                    <br />
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2>{products.product_name}</h2>
                        <button className="btn btn-primary">Buy Now {products.price}rs</button>
                    </div>
                    <div style={{ display: 'flex', fontSize: '30px' }}>
                        {Array.from({ length: products.rating }).map((_, index) => (
                            <FaStar key={index} style={{ color: 'gold' }} />
                        ))}

                    </div>
                    <br />
                    <div>
                        <h4>Product description</h4>
                        <p>{products.description}</p>
                        <h4>Product Details</h4>
                        <p><span style={{ fontWeight: 'bold' }}>Age category:</span> {products.category['start_age']}-{products.category['end_age']}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Level:</span> {products.category['level']}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Made in:</span> {products.make}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Price:</span> {products.price}rs Only</p>
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
                                // className="form-control"
                                className={classNames('form-control', styler.comment)}
                                // style={{
                                //   width: "80%",
                                //   height: "200px",
                                //   borderRadius: "10px",
                                //   border: "none",
                                //   boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                //   padding: "20px",
                                //   fontFamily: "'Rubik Doodle Shadow', sans-serif",
                                //   wordSpacing: "3px",
                                //   fontSize: "large",
                                // }}
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
                        <br />
                        <h2 className="mb-4">Ratings and Reviews</h2>
                        <Row>
                            {reviews.length !== 0 ? (
                                reviews.map((review, index) => (
                                    <Col key={index} md="6" lg="4" className="mb-4">
                                        <Card className="shadow-sm">
                                            <CardBody>
                                                <div className="d-flex align-items-center mb-3">
                                                    {/* Star Rating */}
                                                    {Array(5)
                                                        .fill()
                                                        .map((_, i) => (
                                                            <span
                                                                key={i}
                                                                className={`me-1 ${i < review.rating ? 'text-warning' : 'text-muted'
                                                                    }`}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                </div>
                                                <CardTitle tag="h5">{review.review}</CardTitle>
                                                <CardText className="text-muted">
                                                    <strong>createdBy:</strong> {review.username}
                                                </CardText>
                                                <CardText>
                                                    <small className="text-muted">
                                                        createdAt: {new Date(review.createdAt).toUTCString()}
                                                    </small>
                                                </CardText>
                                                {/* <Button color="danger" outline size="sm">
                                🗑️ Delete
                              </Button> */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <p>No reviews available</p>
                            )}
                        </Row>
                    </div>


                </div>
            </div>
            <br />
        </>
    );
}



