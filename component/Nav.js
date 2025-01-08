'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import classNames from 'classnames';
import styls from '@/app/page.module.css';
import Cookies from 'js-cookie';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { FaShoppingCart } from 'react-icons/fa';

const Example = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState(null); // Store userId in state
    const router = useRouter();

    useEffect(() => {
        // This ensures the cookie check runs only on the client
        const id = Cookies.get('userid');
        setUserId(id || null);
    }, []);

    const toggle = () => setIsOpen(!isOpen);

    const handleSubmit = () => {
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('userid');
        sessionStorage.clear();
        router.push('/login');
        window.location.href = '/login';
    };

    return (
        <Navbar color="light" light expand="md" className="px-4 container-fluid d-flex justify-content-between">
            <NavbarBrand href="/">
                <Image src="/mibot.png" width={100} height={90} alt="Logo" className="img-fluid" unoptimized />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar className={styls.navalign}>
                <Nav navbar className="d-flex">
                    <NavItem>
                        <NavLink href="/courselist" className={classNames('mx-3')} style={{ fontSize: '15px' }}>Courses</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/products" className={classNames('mx-3')} style={{ fontSize: '15px' }}>
                            Product
                        </NavLink>
                    </NavItem>

                    {userId ? (
                        <>
                            <NavItem>
                                <NavLink href="/profile" className={classNames('mx-3')} style={{ fontSize: '15px' }}>
                                    Profile
                                </NavLink>
                            </NavItem>
                            <NavItem onClick={handleSubmit} style={{ cursor: "pointer" }}>
                                <NavLink className={classNames('mx-3')} style={{ fontSize: '15px' }}>Logout</NavLink>
                            </NavItem>
                        </>
                    ) : (
                        <NavItem>
                            <NavLink href="/login" className={classNames('mx-3')} style={{ fontSize: '15px' }}>Login</NavLink>
                        </NavItem>
                    )}
                </Nav>

                {userId ? (
                    <>
                        <Nav className="ml-auto">
                            <NavItem>
                                <NavLink href="/cart" className={classNames('mx-3')}>
                                    <FaShoppingCart size={24} />
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </>
                ) : null}


            </Collapse>
        </Navbar >
    );
};

export default Example;
