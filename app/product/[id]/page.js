'use client';
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useParams, useRouter } from 'next/navigation';
import styler from '@/app/coursepreview/course.module.css';
import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import classNames from 'classnames';
import Cookies from "js-cookie";
export default function Product() {
    const [yourreview, setyourreview] = useState([]);
    const [reviews, setReviews] = useState([]);
    const userCook = Cookies.get('userid');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [products, setProduct] = useState(null);
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const handledeletereview = async (id) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/delproductreview/${id}/`);
            if (res.status === 200) {
                const filteredReviews = reviews.filter(review => review.id !== id);
                setReviews(filteredReviews);
                const yourReview = yourreview.filter(review => review.id !== id);
                setyourreview(yourReview);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    }

    const fetchReviews = async () => {
        try {
            const username = Cookies.get('username');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/productreviews/`, {
                params: { id }
            }
            );
            if (response.status == 200) {
                setReviews(response.data.data);
                const yourReview = response.data.data.filter(review => review.username === username);
                setyourreview(yourReview);
            }
        } catch (error) {
            // console.error("Error loading reviews:", error.response?.data || error.message);
            toast.error("Something went wrong while loading reviews");
        }
    };

    const handlereview = async () => {
        if (!userCook) {
            toast.error('login to continue');
            router.push('/login');
            return;
        }
        if (!comment) {
            toast.error('comment is empty');
            return;
        }
        const username = Cookies.get('username');
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/productreviews/`,
            { 'user': userCook, 'product': products.id, 'review': comment, 'rating': rating },
        );
        if (response.status == 200) {
            setReviews(response.data.data);
            const yourReview = response.data.data.filter(review => review.username === username);
            setyourreview(yourReview);
            setComment("");
            setRating(0);
        }

    }

    const handlebuy = async () => {
        if (!userCook) {
            toast.error('login to continue');
            router.push('/login');
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/productcart/`, {
                product: products.id, user: userCook, amount: products.price
            });
            if (response.status === 200) {
                toast.success('Added product to cart successfully')
                router.push('/cart');
            }
        } catch (error) {
            // console.error("Error fetching product data:", error);
        }

    }

    const handleeditreview = async (ids,ratings,comments) => {
        const type = 'product';
        router.push(`/editreview/${id}/${ids}?type=${type}&ratings=${ratings}&comments=${comments}`);
    }

    useEffect(() => {
        const handleproduct = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/eachproduct/`, {
                    params: { productid: id }
                });

                if (response.status === 200) {
                    setProduct(response.data.data);
                }
            } catch (error) {
                // console.error("Error fetching product data:", error);
            }
        };
        handleproduct()
        fetchReviews();

    }, [id]);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
                <div style={{ width: '90vw' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image
                            src={products?.product_image ? `${process.env.NEXT_PUBLIC_BASE_API_URL}${products.product_image}` : 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE='}
                            width={500}
                            height={500}
                            alt="Product Image"
                            className="img-fluid"
                            style={{ width: '50vw', maxHeight: '500px', minHeight: '200px' }}
                            unoptimized
                        />
                    </div>

                    <br />
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2>{products?.product_name ? products.product_name : 'fetching...'}</h2>
                        <button
                            className="btn btn-primary"
                            onClick={handlebuy}
                            disabled={products?.product_name ? products.stocks <= 0 : true}
                        >
                            Buy Now Rs. {products?.product_name ? parseFloat(products.price).toFixed(0) : 'fetching...'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', fontSize: '30px' }}>
                        {Array.from({ length: products?.product_name ? products.rating : 0 }).map((_, index) => (
                            <FaStar key={index} style={{ color: 'gold' }} />
                        ))}

                    </div>
                    <br />
                    <div>
                        <h4>Product description</h4>
                        <p>{products?.product_name ? products.description : 'fetching...'}</p>
                        <h4>Product Details</h4>
                        <p><span style={{ fontWeight: 'bold' }}>Age category:</span> {products?.product_name ? products.category['start_age'] : 'fetching...'}-{products?.product_name ? products.category['end_age'] : 'fetching...'}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Level:</span> {products?.product_name ? products.category['level'] : 'fetching...'}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Made in:</span> {products?.product_name ? products.make : 'fetching...'}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Price:</span> Rs.{products?.product_name ? parseFloat(products.price).toFixed(0) : 'fetching...'} Only</p>
                        <p><span style={{ fontWeight: 'bold' }}>Stock Available:</span> {products?.product_name ? products.stocks : 'fetching...'}</p>
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
                                onClick={handlereview}
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </form>
                        <br />
                        <h2 className="mb-4">Your reviews</h2>
                        <Row>
                            {yourreview.length !== 0 ? (
                                yourreview.map((review, index) => (
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
                                                {/* <Button color="danger" outline size="sm" onClick={() => { handledeletereview(review.id) }}>
                                                    🗑️ Delete
                                                </Button> */}
                                                <Button color="danger" outline size="sm" onClick={() => { handleeditreview(review.id,review.rating,review.review) }}>
                                                    edit
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))
                            ) : (

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '100%', padding: '20px' }}>
                                    <Image
                                        src='/empty.png'
                                        className="img-fluid"
                                        alt="Profile Image"
                                        width={90}
                                        height={90}
                                        style={{
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            width: "150px",
                                            height: "150px",
                                        }}
                                    />
                                    <p>We are waiting for your reviews and ratings</p>
                                </div>
                            )}
                        </Row>
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
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))
                            ) : (

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '100%', padding: '20px' }}>
                                    <Image
                                        src='/empty.png'
                                        className="img-fluid"
                                        alt="Profile Image"
                                        width={90}
                                        height={90}
                                        style={{
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            width: "150px",
                                            height: "150px",
                                        }}
                                    />
                                    <p>We are waiting for your reviews and ratings</p>
                                </div>
                            )}
                        </Row>
                    </div>
                </div>
            </div>
            <br />
        </>
    );
}



