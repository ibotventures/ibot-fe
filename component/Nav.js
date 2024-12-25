'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import classNames from 'classnames';
// import styles from '@/app/page.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

const Example = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    // const [exists, setexists] = useState('');
    const router = useRouter();
    const userId = Cookies.get('userid');

    // useEffect(() => {
    //     const handleDetails = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/getdetail`, {
    //                 params: { id: userId }
    //             });
    //             if (response.status === 200) {
    //                 setexists(userId);
    //             }
    //         } catch (error) {

    //         }
    //     }
    //     handleDetails();
    // }, []);

    const handleSubmit = () => {
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('userid');
        // setexists('');
        sessionStorage.clear();
        router.push('/login');
        window.location.href = '/login';
    };

    return (
        <>
            <Navbar color="light" light expand="md" className="px-4 container-fluid">
                <NavbarBrand href="/">
                    <Image src="/IBOT.png" width={100} height={90} alt="Logo" className='img-fluid' unoptimized />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/courselist" className={classNames('mx-3')}>Courses</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/products" className={classNames('mx-3')}>
                                Product
                            </NavLink>
                        </NavItem>

                        {(userId) ? (
                            <>
                                <NavItem>
                                    <NavLink href="/profile" className={classNames('mx-3')}>
                                        Profile
                                    </NavLink>
                                </NavItem>
                                <NavItem onClick={handleSubmit} style={{ cursor: "pointer" }}>
                                    <NavLink className={classNames('mx-3')}>Logout</NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <NavItem>
                                <NavLink href="/login" className={classNames('mx-3')}>Login</NavLink>
                            </NavItem>
                        )}
                    </Nav>


                </Collapse>
            </Navbar >
        </>
    );
};

export default Example;
