"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import axios from 'axios';
import { Input, Label } from 'reactstrap';
import Cookies from 'js-cookie';
const AddCourse = () => {
    const [vendor_Name, setName] = useState('');
    const [vendor_Contact_Name, setcontactName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [cus_Name, setcusName] = useState('');
    const [cus_contact_Name, setcuscontactName] = useState('');
    const [cusaddress, setcusaddress] = useState('');
    const [cuscontact, setcusContact] = useState('');
    const [cusemail, setcusemail] = useState('');
    const [productname, setproductname] = useState('');
    const [product_price, setproductprice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [term, setterm] = useState('');
    const [transac_id, settransacid] = useState('');
    const [orderid, setorderid] = useState('');
    const [toggle, settoggle] = useState(false);
    const [admin_pass, setadminpass] = useState('');
    const router = useRouter();

    const handlechange = (e) => {
        e.preventDefault();
        if (toggle === false) {
            settoggle(true);
        } else {
            settoggle(false);
        }

    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!productname) {
            toast.error('Please select the product name.');
            return;
        } else if (quantity === 0 || quantity === null || quantity < 0) {
            toast.error('customer should have buyed atleast 1 set of product');
            return;
        } else if (product_price === 0 || product_price < 0) {
            toast.error('price should not be zero or negative');
            return;
        } else if (!term) {
            toast.error('Please select the payment type');
            return;
        } else if (toggle == false) {
            toast.error('Accept the Note Box');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('vendor_name', vendor_Name);
            formData.append('vendor_contact_name', vendor_Contact_Name);
            formData.append('vendor_contact_number', contact);
            formData.append('vendor_email', email);
            formData.append('vendor_address', address);
            formData.append('customer_name', cus_Name);
            formData.append('customer_contact_name', cus_contact_Name);
            formData.append('customer_contact_number', cuscontact);
            formData.append('customer_email', cusemail);
            formData.append('customer_address', cusaddress);
            formData.append('payment_term', term);
            formData.append('order_id', orderid);
            formData.append('transaction_number', transac_id);
            formData.append('product_name', productname);
            formData.append('product_price', product_price);
            formData.append('product_quantity', quantity);
            formData.append('status', toggle);
<<<<<<< HEAD
            formData.append('email', Cookies.get('email'));
            formData.append('password', admin_pass);

=======
            formData.append('id', Cookies.get('userid'));
            formData.append('password', admin_pass);

            // const res = await axios.post('http://127.0.0.1:8000/app/offlinepurchase/', formData);
>>>>>>> 95b21899eb8bbe8c6f189d2f063bd10152d6a990
            const res = await axios.post('http://127.0.0.1:8000/app/offlinepurchase/', formData);
            if (res && res.data) {
                if (res.status === 200 || res.status === 201) {
                    toast.success('Successfully added the offline purchase bill');
                    router.push('/');
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


    }

    return (
        <>
            <div className={classNames(styles.background, styles.parafont)} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >

                <div className='container-fluid' style={{ margin: "20px" }}>

                    <form onSubmit={handlesubmit}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }}>
                                <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Vendor Details</h2>
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <input
                                        type="text"
                                        onChange={e => setName(e.target.value)}
                                        value={vendor_Name}
                                        className={classNames("form-control", styles.fontp)}
                                        id="vendor_name"
                                        placeholder="Name"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <input
                                        type="text"
                                        onChange={e => setcontactName(e.target.value)}
                                        value={vendor_Contact_Name}
                                        className={classNames("form-control", styles.fontp)}
                                        id="vendor_contact_name"
                                        placeholder="Vendor Contact Name"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <input
                                        type="text"
                                        onChange={e => setContact(e.target.value)}
                                        value={contact}
                                        className={classNames("form-control", styles.fontp)}
                                        id="contact"
                                        placeholder="Contact Number"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <Input
                                        type="email"
                                        onChange={e => setemail(e.target.value)}
                                        value={email}
                                        className={classNames("form-control", styles.fontp)}
                                        id="email"
                                        placeholder="Email"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="password">Password</label> */}
                                    <input
                                        type="textarea"
                                        onChange={e => setaddress(e.target.value)}
                                        value={address}
                                        className={classNames("form-control", styles.fontp)}
                                        id="address"
                                        placeholder="Address"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                            </div>
                            <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }}>
                                <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Customer Details</h2>
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <input
                                        type="text"
                                        onChange={e => setcusName(e.target.value)}
                                        value={cus_Name}
                                        className={classNames("form-control", styles.fontp)}
                                        id="cus_name"
                                        placeholder="Name"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <input
                                        type="text"
                                        onChange={e => setcuscontactName(e.target.value)}
                                        value={cus_contact_Name}
                                        className={classNames("form-control", styles.fontp)}
                                        id="cus_contact_name"
                                        placeholder="Customer Contact Name"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <input
                                        type="text"
                                        onChange={e => setcusContact(e.target.value)}
                                        value={cuscontact}
                                        className={classNames("form-control", styles.fontp)}
                                        id="cuscontact"
                                        placeholder="Contact Number"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <Input
                                        type="email"
                                        onChange={e => setcusemail(e.target.value)}
                                        value={cusemail}
                                        className={classNames("form-control", styles.fontp)}
                                        id="cusemail"
                                        placeholder="Email"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="password">Password</label> */}
                                    <input
                                        type="textarea"
                                        onChange={e => setcusaddress(e.target.value)}
                                        value={cusaddress}
                                        className={classNames("form-control", styles.fontp)}
                                        id="cusaddress"
                                        placeholder="Address"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                            </div>

                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }}>
                                <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Product Details</h2>
                                <div className="form-group">
                                    <Input
                                        type="select"
                                        name='select'
                                        onChange={e => setproductname(e.target.value)}
                                        value={productname}
                                        className={classNames("form-control", styles.fontp)}
                                        id="product_name"
                                        style={{ padding: "1vw" }}
                                        required
                                    >
                                        <option>Select Product</option>
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
                                    {/* <label htmlFor="email">Email</label> */}
                                    <input
                                        type="number"
                                        onChange={e => setproductprice(e.target.value)}
                                        value={product_price}
                                        className={classNames("form-control", styles.fontp)}
                                        id="product_price"
                                        placeholder="Product Price"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <Input
                                        type="number"
                                        onChange={e => setQuantity(e.target.value)}
                                        value={quantity}
                                        className={classNames("form-control", styles.fontp)}
                                        id="quantity"
                                        placeholder="Quantity"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                            </div>
                            <div style={{ backgroundColor: "whitesmoke", width: "50vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }}>
                                <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Payment Details</h2>
                                <div className="form-group">


                                    <Input
                                        type="select"
                                        name='select'
                                        onChange={e => setterm(e.target.value)}
                                        value={term}
                                        className={classNames("form-control", styles.fontp)}
                                        id="Payment Term"
                                        style={{ padding: "1vw" }}
                                        required
                                    >
                                        <option>Select Payment Type</option>
                                        <option>online</option>
                                        <option>offline</option>
                                        <option>cheque</option>
                                        <option>neft</option>

                                    </Input>

                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <input
                                        type="text"
                                        onChange={e => settransacid(e.target.value)}
                                        value={transac_id}
                                        className={classNames("form-control", styles.fontp)}
                                        id="transac_id"
                                        placeholder="Transaction ID"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <Input
                                        type="number"
                                        onChange={e => setorderid(e.target.value)}
                                        value={orderid}
                                        className={classNames("form-control", styles.fontp)}
                                        id="orderid"
                                        placeholder="Order ID"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                            </div>

                            <br />
                            <br />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ backgroundColor: "whitesmoke", width: "90vw", padding: "3vw", borderRadius: "20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", margin: "20px", height: "fit-content" }}>
                                <h2 style={{ paddingBottom: "2vw" }} className={styles.fonth}>Note</h2>
                                <div>
                                    <Input type="checkbox"
                                        onChange={handlechange}
                                        id="conform"
                                    />
                                    {' '}
                                    <Label check>
                                        The Above given Information are true and I ensure that the Customer has paid to the Product purchased
                                    </Label>
                                    <br />
                                </div>
                                <br />
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <Input
                                        type="password"
                                        onChange={e => setadminpass(e.target.value)}
                                        value={admin_pass}
                                        className={classNames("form-control", styles.fontp)}
                                        id="adpass"
                                        placeholder="Admin Password"
                                        style={{ padding: "1vw" }}
                                        required
                                    />
                                </div><br />
                                <button type="submit" className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

        </>
    );
}

export default AddCourse;