'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const RazorpayComponent = ({ email, username, contact, setsubscription,setShowDeleteModal }) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isClient, setIsClient] = useState(false); // Track client-side rendering
    const [subscribe, setsubscribe] = useState([]);
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

        const subscriptionget = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/getsubscription/`);
            setsubscribe(res.data.data);
        }

        loadRazorpayScript()
            .then(() => {
                subscriptionget();
            })
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/order/`, {
                user_id: user,
                amount: subscribe.amount * 100,  // Amount in INR
                currency: 'INR',
                receipt: `subscription_rcptid_${subscribe.receiptcount}`,
            })
            if (response.data.status.code === 200) {
                console.log('Order created');
            } else {
                console.error('Error creating order:', response.data.status.message);
                return;
            };

            const amt = response.data.data.amount;
            const rpt = response.data.data.receipt;
            const cur = response.data.data.currency;
            const options = {
                key: 'rzp_test_88QnZEgha1Ucxs',
                amount: response.data.data.amount,
                currency: 'INR',
                name: 'MiBOT Ventures',
                // description: 'Test Transaction',
                // image: 'https://example.com/your_logo',
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
                        // console.log('Order status response:', orderStatusResponse.data);
                        window.alert('Payment successful and subscription updated.');
                        setsubscription(true);
                        setShowDeleteModal(false);

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
                Get Subscription Now for Just {subscribe.amount} Rs!
            </button>
        </div>
    );
};

export default RazorpayComponent;
