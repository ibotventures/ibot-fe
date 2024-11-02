'use client';
import Image from "next/image";
import LandingCaurosal from "@/component/productcaurosal";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import classNames from 'classnames';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
    const [userdetails, setuserdetails] = useState(null);
    const [email, setemail] = useState('');
    const [state, setState] = useState('');
    const [username, setUsername] = useState('');
    const [first_name, setfirstname] = useState('');
    const [last_name, setlastname] = useState('');
    const [middle_name, setmiddlename] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState();
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [image, setimage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const router = useRouter();

    useEffect(() => {
        const handleDetail = async () => {
            try {
                const userId = Cookies.get('userid');
                if (!userId) {
                    toast.error("User ID not found in cookies.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://127.0.0.1:8000/app/getdetail`, {
                    params: { id: userId },
                });

                const data = response.data.data;
                setuserdetails(data);
                setemail(data.email || '');
                setUsername(data.username || '');
                setState(data.state || '');
                setCountry(data.country || '');
                setPincode(data.pincode || '');
                setCity(data.city || '');
                setNumber(data.mobile || '');
                setfirstname(data.first_name || '');
                setlastname(data.last_name || '');
                setmiddlename(data.middle_name || '');
                setAddress(data.address || '');
                setAge(data.age || '');
                if (data.profile) setProfileImageUrl(`http://127.0.0.1:8000${data.profile}`); // Use server-provided image URL if available

                setLoading(false);
            } catch (error) {
                console.error("Error details:", error);
                toast.error("Something went wrong while loading data.");
                setLoading(false);
            }
        };
        handleDetail();
    }, []);

    // Handle setting object URL when `image` changes
    useEffect(() => {
        if (image) {
            const newImageUrl = URL.createObjectURL(image);
            setProfileImageUrl(newImageUrl);

            return () => {
                URL.revokeObjectURL(newImageUrl); // Clean up the object URL
            };
        }
    }, [image]);

    const handlecancel = () => {
        router.push('/profile');
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (image) {
            const extension = image.name.split('.').pop().toLowerCase();
            if (!(['jpg', 'jpeg', 'png', 'gif'].includes(extension))) {
                toast.error(`Please upload Image file like jpg,jpeg,png but you have uploaded ${extension}`);
                return;
            }
        }
        const formData = new FormData();
        formData.append('id', Cookies.get('userid'));

        const fields = ['email', 'username', 'first_name', 'last_name', 'middle_name', 'age', 'address', 'pincode', 'city', 'country', 'phone', 'state', 'image'];
        fields.forEach(field => {
            if (eval(field) !== userdetails[field]) {
                formData.append(field, eval(field));
            }
        });

        try {
            const response = await axios.post(`http://127.0.0.1:8000/app/updatedetails/`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status === 200) {
                setuserdetails(response.data.data);
                toast.success('Updated successfully');
            }
        } catch (error) {
            console.error("Error details:", error);
            toast.error("Something went wrong while updating.");
        }
    };

    if (loading) {
        return <p>Loading....</p>;
    }

    return (
        <>
            <h1 style={{ fontSize: "3vw", margin: "2vw" }}>User Details</h1>
            <p style={{ fontSize: "1.5vw", margin: "2vw" }}>Update your personal details and photo here</p>

            <form className={styles.fontp} style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handlesubmit}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "2vw" }}>
                    <Image
                        src={`${profileImageUrl}` || '/profile.png'}
                        className="img-fluid"
                        alt="Profile Image"
                        width={150}
                        height={150}
                        style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            width: "150px",
                            height: "150px",
                        }}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setimage(e.target.files[0])}
                        style={{ display: "none" }}
                        id="fileUpload"
                    />

                    <label htmlFor="fileUpload" className="btn btn-primary" style={{ cursor: "pointer" }}>
                        Upload
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="email">First Name</label>
                    <input
                        type="text"
                        onChange={e => setfirstname(e.target.value)}
                        value={first_name}
                        className={classNames("form-control", styles.fontp)}
                        id="firstname"
                        placeholder="First Name"
                        style={{ padding: "0.5vw", width: "50vw" }}
                        required
                    />
                </div><br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="form-group" style={{ marginRight: "1.5vw" }}>

                        <label htmlFor="username">Middle Name</label>
                        <input
                            type="text"
                            onChange={e => setmiddlename(e.target.value)}
                            value={middle_name}
                            className={classNames("form-control", styles.fontp)}
                            id="middlename"
                            placeholder="Middle Name"
                            style={{ padding: "0.5vw", width: "24vw" }}
                        />
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="email">Last Name</label>
                        <input
                            type="text"
                            onChange={e => setlastname(e.target.value)}
                            value={last_name}
                            className={classNames("form-control", styles.fontp)}
                            id="lastname"
                            placeholder="Last Name"
                            style={{ padding: "0.5vw", width: "24vw" }}

                        />
                    </div><br />

                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        className={classNames("form-control", styles.fontp)}
                        id="username"
                        placeholder="Username"
                        style={{ padding: "0.5vw", width: "50vw" }}

                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="email"
                        onChange={e => setemail(e.target.value)}
                        value={email}
                        className={classNames("form-control", styles.fontp)}
                        id="email"
                        placeholder="Email"
                        style={{ padding: "0.5vw", width: "50vw" }}
                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Phone Number</label>
                    <input
                        type="text"
                        onChange={e => setNumber(e.target.value)}
                        value={phone}
                        className={classNames("form-control", styles.fontp)}
                        id="phone"
                        placeholder="Phone Number"
                        style={{ padding: "0.5vw", width: "50vw" }}
                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Age</label>
                    <input
                        type="text"
                        onChange={e => setAge(e.target.value)}
                        value={age}
                        className={classNames("form-control", styles.fontp)}
                        id="age"
                        placeholder="Age"
                        style={{ padding: "0.5vw", width: "50vw" }}
                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Address</label>
                    <input
                        type="text"
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                        className={classNames("form-control", styles.fontp)}
                        id="address"
                        placeholder="Address"
                        style={{ padding: "0.5vw", width: "50vw" }}
                    />
                </div><br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="form-group" style={{ marginRight: "1.5vw" }}>
                        <label htmlFor="username">State</label>
                        <input
                            type="text"
                            onChange={e => setState(e.target.value)}
                            value={state}
                            className={classNames("form-control", styles.fontp)}
                            id="state"
                            placeholder="State"
                            style={{ padding: "0.5vw", width: "24vw" }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">City</label>
                        <input
                            type="text"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            className={classNames("form-control", styles.fontp)}
                            id="city"
                            placeholder="City"
                            style={{ padding: "0.5vw", width: "24vw" }}
                        />
                    </div>
                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "space-between", width: "inherit" }}>
                    <div className="form-group" style={{ marginRight: "1.5vw" }}>
                        <label htmlFor="username">Country</label>
                        <input
                            type="text"
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                            className={classNames("form-control", styles.fontp)}
                            id="country"
                            placeholder="Country"
                            style={{ padding: "0.5vw", width: "24vw" }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Pincode</label>
                        <input
                            type="text"
                            onChange={e => setPincode(e.target.value)}
                            value={pincode}
                            placeholder="Pincode"
                            className={classNames("form-control", styles.fontp)}
                            id="pincode"
                            style={{ padding: "0.5vw", width: "24vw" }}
                        />
                    </div>
                </div>
                <br />
                <div style={{ display: "flex", width: "50vw", gap: "1vw" }}>
                    <button
                        type="button" // Prevent the button from submitting the form
                        className={classNames("btn btn-primary btn-block", styles.fontp)}
                        style={{ borderRadius: "1vw" }}
                        onClick={handlecancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={classNames("btn btn-primary btn-block", styles.fontp)}
                        style={{ borderRadius: "1vw" }}
                    >
                        Save
                    </button>
                </div>

                <br />
                <br />

            </form>


        </>

    );
}