'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import Cookies from 'js-cookie';

const RazorpayComponent = ({ email, username, contact, total }) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isClient, setIsClient] = useState(false); // Track client-side rendering
    const [isProcessing, setIsProcessing] = useState(false); // Track payment processing state
    const [buycount, setbuyercount] = useState(0);

    useEffect(() => {
        setIsClient(true); // Ensure client-side rendering

        // Dynamically load Razorpay script
        const loadRazorpayScript = () => {
            return new Promise((resolve, reject) => {
                if (window.Razorpay) {
                    resolve(true);  // Razorpay already loaded
                } else {
                    const script = document.createElement('script');
                    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                    script.onload = () => resolve(true);
                    script.onerror = (error) => reject('Error loading Razorpay script: ' + error);
                    document.body.appendChild(script);
                }
            });
        };

        const fetchBuyerCount = async () => {
            const userid = Cookies.get('userid');
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/buyercount/`, {
                    user: userid
                });
                if (response.status === 200) {
                    setbuyercount(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching buyer count:', error);
            }
        };

        loadRazorpayScript()
            .then(() => fetchBuyerCount())
            .then(() => {
                setIsScriptLoaded(true);  // Razorpay script is loaded
            })
            .catch((error) => {
                console.error(error);
            });
    }, []); // This useEffect runs only once when the component mounts

    const handlecart = async (transacid) => {
        const userid = Cookies.get('userid');
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/usercart/`, {
                user: userid,
                transact: transacid
            });
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handlePayment = async () => {
        if (!isScriptLoaded) {
            console.error('Razorpay script is not loaded yet.');
            return;
        }

        setIsProcessing(true); // Start loading state
        try {
            const user = Cookies.get('userid');
            const first = user.slice(0, 5);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/order/`, {
                user_id: user,
                amount: total * 100,  // Amount in INR
                currency: 'INR',
                receipt: `product_rcptid_${first}${buycount}`,
            });

            if (response.data.status.code !== 200) {
                console.error('Error creating order:', response.data.status.message);
                setIsProcessing(false); // Stop loading state
                return;
            }

            const amt = response.data.data.amount;
            const rpt = response.data.data.receipt;
            const cur = response.data.data.currency;
            const options = {
                key: 'rzp_test_88QnZEgha1Ucxs',
                amount: response.data.data.amount,
                currency: 'INR',
                name: 'MiBot Ventures',
                order_id: response.data.data.id,
                handler: async function (response) {
                    try {
                        const orderStatusResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/orderStatus/`, {
                            user_id: user,
                            amount: amt,
                            currency: cur,
                            receipt: rpt,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        window.alert('Payment successful and subscription updated.');
                        handlecart(orderStatusResponse.data.data.id);
                        window.location.href = '/cart';
                    } catch (statusError) {
                        console.error('Error sending order status:', statusError);
                        window.alert('Payment failed');
                    } finally {
                        setIsProcessing(false); // Stop loading state
                    }
                },
                prefill: {
                    name: username,
                    email: email,
                    contact: contact,
                },
                notes: {
                    address: 'Razorpay Corporate Office',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            if (window.Razorpay) {
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                console.error('Razorpay is not available.');
                setIsProcessing(false); // Stop loading state
            }
        } catch (error) {
            console.error('Error creating order:', error);
            setIsProcessing(false); // Stop loading state
        }
    };

    if (!isClient) {
        return null; // Ensure rendering on the client
    }

    return (
        <div>
            <Button
                variant="warning"
                className="w-100 mt-3"
                id="rzp-button1"
                onClick={handlePayment}
                disabled={isProcessing || !isScriptLoaded}
            >
                {isProcessing ? (
                    <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Processing...
                    </>
                ) : (
                    'Proceed to Pay'
                )}
            </Button>
        </div>
    );
};

export default RazorpayComponent;
