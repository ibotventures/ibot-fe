'use client';
import Image from "next/image";
import styler from "@/app/page.module.css";
import classNames from 'classnames';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home({ upadteuser, setuser, updateprofile, setprofile }) {
    const [userdetails, setuserdetails] = useState(null);
    const [email, setemail] = useState('');
    const [state, setState] = useState('');
    const [username, setUsername] = useState(upadteuser);
    const [first_name, setfirstname] = useState('');
    const [last_name, setlastname] = useState('');
    const [middle_name, setmiddlename] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState();
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [mobile, setNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [profile, setimage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(updateprofile || '/profile.png');
    const router = useRouter();

    useEffect(() => {
        const handleDetail = async () => {
            try {
                const userId = Cookies.get('userid');
                if (!userId) {
                    toast.error("User not found");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/getdetail/`, {
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
                if (data.profile != '' && data.profile != null) {
                    setProfileImageUrl(`${process.env.NEXT_PUBLIC_BASE_API_URL}${data.profile}`);
                } else {
                    setProfileImageUrl('/profile.png');
                }
                setLoading(false);
            } catch (error) {
                toast.error("Something went wrong while loading data.");
                setLoading(false);
            }
        };
        handleDetail();
    }, []);
    useEffect(() => {
        setUsername(upadteuser); // Initialize the username if it changes
    }, [upadteuser]);

    // Handle setting object URL when `image` changes
    useEffect(() => {
        if (profile) {
            const newImageUrl = URL.createObjectURL(profile);
            setProfileImageUrl(newImageUrl);
            return () => {
                URL.revokeObjectURL(newImageUrl); // Clean up the object URL
            };
        }
    }, [profile]);

    const handlecancel = () => {
        router.push('/profile');
        window.location.href = '/profile';
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (profile) {
            const extension = profile.name.split('.').pop().toLowerCase();
            if (!(['jpg', 'jpeg', 'png', 'gif'].includes(extension))) {
                toast.error(`Please upload an image file in jpg, jpeg, or png format. You uploaded a ${extension} file.`);
                return;
            }
        }
        const formData = new FormData();
        formData.append('id', Cookies.get('userid'));

        const fields = ['email', 'username', 'first_name', 'last_name', 'middle_name', 'age', 'address', 'pincode', 'city', 'country', 'mobile', 'state', 'profile'];
        fields.forEach(field => {
            if (eval(field) !== userdetails[field] && eval(field) != null) {
                formData.append(field, eval(field));
            }
        });

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/updatedetails/`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status === 200) {
                setuserdetails(response.data.data);
                Cookies.set('username', username);
                setuser(username);
                setprofile(profileImageUrl);
                toast.success('Updated successfully');
            }
        } catch (error) {
            toast.error("Something went wrong while updating.");
        } finally {
            setLoading(false); // Set loading to false after the response
        }
    };

    if (loading) {
        return <p>Loading....</p>;
    }

    return (
        <>
            <h1 style={{ margin: "1.5vw" }}>User Details</h1>
            <p style={{ marginLeft: "1.5vw" }}>Update your personal details and photo here</p>

            <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handlesubmit}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "2vw" }}>
                    <Image
                        src={profileImageUrl}
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
                        accept="profile/*"
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
                        className={classNames("form-control", styler.singlefield)}
                        id="firstname"
                        placeholder="First Name"
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
                            className={classNames("form-control", styler.doublefield)}
                            id="middlename"
                            placeholder="Middle Name"
                        />
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="email">Last Name</label>
                        <input
                            type="text"
                            onChange={e => setlastname(e.target.value)}
                            value={last_name}
                            className={classNames("form-control", styler.doublefield)}
                            id="lastname"
                            placeholder="Last Name"
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
                        className={classNames("form-control", styler.singlefield)}
                        id="username"
                        placeholder="Username"

                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="email"
                        onChange={e => setemail(e.target.value)}
                        value={email}
                        className={classNames("form-control", styler.singlefield)}
                        id="email"
                        placeholder="Email"

                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Phone Number</label>
                    <input
                        type="text"
                        onChange={e => setNumber(e.target.value)}
                        value={mobile}
                        className={classNames("form-control", styler.singlefield)}
                        id="mobile"
                        placeholder="Phone Number"

                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Age</label>
                    <input
                        type="text"
                        onChange={e => setAge(e.target.value)}
                        value={age}
                        className={classNames("form-control", styler.singlefield)}
                        id="age"
                        placeholder="Age"

                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="username">Address</label>
                    <input
                        type="text"
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                        className={classNames("form-control", styler.singlefield)}
                        id="address"
                        placeholder="Address"

                    />
                </div><br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="form-group" style={{ marginRight: "1.5vw" }}>
                        <label htmlFor="username">State</label>
                        <input
                            type="text"
                            onChange={e => setState(e.target.value)}
                            value={state}
                            className={classNames("form-control", styler.doublefield)}
                            id="state"
                            placeholder="State"

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">City</label>
                        <input
                            type="text"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            className={classNames("form-control", styler.doublefield)}
                            id="city"
                            placeholder="City"

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
                            className={classNames("form-control", styler.doublefield)}
                            id="country"
                            placeholder="Country"

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Pincode</label>
                        <input
                            type="text"
                            onChange={e => setPincode(e.target.value)}
                            value={pincode}
                            placeholder="Pincode"
                            className={classNames("form-control", styler.doublefield)}
                            id="pincode"

                        />
                    </div>
                </div>
                <br />
                <div className={styler.editbtn}>
                    <button
                        type="button"
                        className={classNames("btn btn-primary btn-block")}
                        style={{ borderRadius: "1vw" }}
                        onClick={handlecancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={classNames("btn btn-primary btn-block")}
                        style={{ borderRadius: "1vw" }}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            "Save"
                        )}
                    </button>
                </div>
                <br />
                <br />
            </form>
        </>

    );
}