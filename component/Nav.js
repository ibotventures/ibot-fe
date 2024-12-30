'use client';
import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import classNames from 'classnames';
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

const Example = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const router = useRouter();
    const userId = Cookies.get('userid');

    const handleSubmit = () => {
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('userid');
        sessionStorage.clear();
        router.push('/login');
        window.location.href = '/login';
    };

    return (
        <>
            <Navbar color="light" light expand="md" className="px-4 container-fluid">
                <NavbarBrand href="/">
                    <Image src="/mibot.png" width={100} height={90} alt="Logo" className='img-fluid' unoptimized />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/courselist" className={classNames('mx-3')} style={{fontSize: '15px'}}>Courses</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/products" className={classNames('mx-3')} style={{fontSize: '15px'}}>
                                Product
                            </NavLink>
                        </NavItem>

                        {(userId) ? (
                            <>
                                <NavItem>
                                    <NavLink href="/profile" className={classNames('mx-3')} style={{fontSize: '15px'}}>
                                        Profile
                                    </NavLink>
                                </NavItem>
                                <NavItem onClick={handleSubmit} style={{ cursor: "pointer" }}>
                                    <NavLink className={classNames('mx-3')} style={{fontSize: '15px'}}>Logout</NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <NavItem>
                                <NavLink href="/login" className={classNames('mx-3')} style={{fontSize: '15px'}}>Login</NavLink>
                            </NavItem>
                        )}
                    </Nav>


                </Collapse>
            </Navbar >
        </>
    );
};

export default Example;
