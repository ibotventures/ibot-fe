'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const RazorpayComponent = ({email,username,contact}) => {
    // const [isSubscribed, setIsSubscribed] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isClient, setIsClient] = useState(false); // Track client-side rendering

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

        loadRazorpayScript()
            .then(() => {
                setIsScriptLoaded(true);  // Razorpay script is loaded
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);  // This useEffect runs only once when the component mounts

    const handlePayment = async () => {
        if (!isScriptLoaded) {
            console.error('Razorpay script is not loaded yet.');
            return;
        }

        try {
            const user = Cookies.get('userid');

            const response = await axios.post('http://127.0.0.1:8000/app/order/', {
                user_id: user,
                amount: 10000,  // Amount in INR
                currency: 'INR',
                receipt: 'order_rcptid_11',
            })
            if (response.data.status.code === 200) {
                console.log('Order created:', response.data.data);
            } else {
                console.error('Error creating order:', response.data.status.message);
                return;
            };

            const orderId = response.data.data.id;
            localStorage.setItem('orderId', orderId);

            const options = {
                key: 'rzp_test_88QnZEgha1Ucxs',
                amount: '150000',
                currency: 'INR',
                name: 'Acme Corp',
                description: 'Test Transaction',
                image: 'https://example.com/your_logo',
                order_id: orderId,
                handler: async function (response) {
                    alert(`Payment ID: ${response.razorpay_payment_id}`);
                    alert(`Order ID: ${response.razorpay_order_id}`);
                    alert(`Signature: ${response.razorpay_signature}`);

                    localStorage.setItem('paymentId', response.razorpay_payment_id);
                    localStorage.setItem('signature', response.razorpay_signature);

                    try {
                        const orderStatusResponse = await axios.post('http://127.0.0.1:8000/app/orderStatus/', {
                            user_id: user,
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                        });
                        console.log('Order status response:', orderStatusResponse.data);

                        // sessionStorage.setItem('subscription', 'true');
                        // setIsSubscribed(true);
                        window.alert('Payment successful and subscription updated.');
                    } catch (statusError) {
                        console.error('Error sending order status:', statusError);
                        window.alert('Payment failed');
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
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    if (!isClient) {
        // Return null or a loading state while the component is being hydrated on the client
        return null;
    }

    return (
        <div>
            <button className="btn btn-primary" id="rzp-button1" onClick={handlePayment}>
                Buy Subscription 100 rs only
            </button>
            {/* <button id="rzp-button1" onClick={handlePayment}>
                Pay with Razorpay
            </button> */}
        </div>
    );
};

export default RazorpayComponent;
