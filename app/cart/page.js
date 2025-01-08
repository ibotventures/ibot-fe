"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RazorpayComponent from "@/component/productrazorpay";

const CartPage = () => {
    const [data, setData] = useState([]);
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [contact, setcontact] = useState('');
    const [reload, setreload] = useState(true);
    const [total, settotal] = useState(0);
    const router = useRouter();
    const handle = () => {
        router.push('/products');
    };

    useEffect(() => {
        const cartget = async () => {
            const user = Cookies.get('userid');
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_API_URL}/app/productcart/`,
                    { params: { user_id: user } }
                );
                if (res.status === 200) {
                    setData(res.data.data);
                    // Calculate the total amount
                    const totalAmount = res.data.data.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                    );
                    settotal(totalAmount); // Set the total amount
                    setreload(false);
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };
        cartget();
    },[reload]);

    useEffect(() => {

        const getdetails = async () => {
            try {
                const userId = Cookies.get('userid');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/getdetail/`, {
                    params: { id: userId },
                });

                const data = response.data.data;
                setemail(data.email || '');
                setusername(data.username || '');
                setcontact(data.mobile || '');
            } catch (error) {

            }
        }
        getdetails();

    }, []);

    const handleremove = async (cartid) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/delcart/${cartid}/`);
            if (res.status === 200) {
                setreload(true);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const handlesub = async (cartid) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/productcart/`, { id: cartid, type: 'sub' });
            if (res.status === 200) {
                setreload(true);
            }
        } catch (error) {
            // console.error("Error fetching cart data:", error);
        }
    };

    const handleadd = async (cartid) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/productcart/`, { id: cartid, type: 'add' });
            if (res.status === 200) {
                setreload(true);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    return (
        <Container fluid className="mt-4">
            {data.length > 0 ? (
                <Row>
                    {/* Cart Items */}
                    <Col md={8}>
                        {data.map((productsselected, index) => (
                            <Card className="mb-3" key={index}>
                                <Card.Body>
                                    <Row>
                                        <Col xs={4}>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${productsselected.product.product_image}`}
                                                alt="Product"
                                                className="img-fluid"
                                                style={{ maxHeight: "200px", minHeight: "110px" }}
                                            />
                                        </Col>
                                        <Col xs={8}>
                                            <h5>{productsselected.product.product_name}</h5>
                                            <div style={{ display: "flex", fontSize: "30px" }}>
                                                {Array.from({ length: productsselected.product.rating }).map((_, idx) => (
                                                    <FaStar key={idx} style={{ color: "gold" }} />
                                                ))}
                                            </div>
                                            <p>Made in: {productsselected.product.make}</p>
                                            <p>Price: ₹{productsselected.product.price}</p>
                                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                <div className="d-flex align-items-center">
                                                    <Button variant="outline-secondary" size="sm" onClick={() => { handlesub(productsselected.id) }}>
                                                        -
                                                    </Button>
                                                    <Form.Control
                                                        type="number"
                                                        value={productsselected.quantity}
                                                        className="mx-2"
                                                        style={{ width: "50px" }}
                                                        onChange={(e) => {
                                                            const updatedQuantity = e.target.value;
                                                            setData((prevData) =>
                                                                prevData.map((item, idx) =>
                                                                    idx === index ? { ...item, quantity: Number(updatedQuantity) } : item
                                                                )
                                                            );
                                                        }}
                                                    />

                                                    <Button variant="outline-secondary" size="sm" onClick={() => { handleadd(productsselected.id) }}>
                                                        +
                                                    </Button>
                                                </div>
                                                <div className="mt-2">
                                                    <Button variant="link" className="text-danger" onClick={() => { handleremove(productsselected.id) }}>
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))}
                        <div style={{ backgroundColor: 'white', padding: '10px' }}>
                            <Button variant="warning" className="w-100 mt-3" onClick={handle}>Buy more products</Button>
                        </div>
                        <br />
                    </Col>

                    {/* Price Details */}
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <h5>Price Details</h5>
                                <hr />
                                <p>
                                    Price ({data.length} items):{" "}
                                    <span className="float-end">
                                        ₹
                                        {data.reduce(
                                            (total, item) =>
                                                total + item.product.price * item.quantity,
                                            0
                                        )}
                                    </span>
                                </p>
                                <p>
                                    Delivery Charges:{" "}
                                    <span className="float-end text-success">Free</span>
                                </p>
                                <hr />
                                <h6>
                                    Total Amount:{" "}
                                    <span className="float-end">
                                        ₹
                                        {data.reduce(
                                            (total, item) =>
                                                total + item.product.price * item.quantity,
                                            0
                                        )}
                                    </span>
                                </h6>
                                <RazorpayComponent email={email} username={username} contact={contact} total={total} />
                            </Card.Body>
                        </Card>
                        <br/>
                    </Col>
                </Row>
            ) : (

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                    <Image src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png' width={500}
                        height={500}
                        alt="Product Image"
                        className="img-fluid"
                        style={{ width: '30vw', maxHeight: '500px', minHeight: '200px' }}
                        unoptimized />
                    <Button variant="warning" onClick={handle}>Explore products</Button>
                    <br />
                    <br />

                </div>

            )}
        </Container>
    );
};

export default CartPage;

