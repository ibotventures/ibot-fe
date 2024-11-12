'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import classNames from 'classnames';
import styles from '@/app/page.module.css';
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
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        const cookieToken = Cookies.get('token');
        setToken(cookieToken || '');
    }, []);
    const [isadmin, setisadmin] = useState('');
    useEffect(() => {
        setisadmin(Cookies.get('username'));
    }, []);

    const handleSubmit = () => {
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('userid');
        setToken('');
        router.push('/login');
    };

    return (

        <>
            <Navbar color="light" light expand="md" className="px-4 container-fluid">
                <NavbarBrand href="/">
                    <Image src="/IBOT.png" width={100} height={90} alt="Logo" className='img-fluid' />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {isadmin == 'Administrator' ? (
                        <>
                            <Nav className="mx-auto" navbar>
                                <NavItem>
                                    <NavLink href="/courselist" className={classNames(styles.parafont, 'mx-3')}>Courses</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/products" className={classNames(styles.parafont, 'mx-3')}>
                                        Product
                                    </NavLink>
                                </NavItem>
                                {(token) ? (
                                    <>
                                        <NavItem>
                                            <NavLink href="/profile" className={classNames(styles.parafont, 'mx-3')}>
                                                Profile
                                            </NavLink>
                                        </NavItem>
                                        <NavItem onClick={handleSubmit} style={{ cursor: "pointer" }}>
                                            <NavLink className={classNames(styles.parafont, 'mx-3')}>Logout</NavLink>
                                        </NavItem>
                                    </>
                                ) : (
                                    <NavItem>
                                        <NavLink href="/login" className={classNames(styles.parafont, 'mx-3')}>Login</NavLink>
                                    </NavItem>
                                )}
                            </Nav>
                            {(token) ? (
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink href="/adminpages/offlinebillform" className="mx-3">
                                            <button className='btn btn-primary'>Offline Bill Form</button>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            ) : null}
                        </>
                    ) : (
                        <>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink href="/courselist" className={classNames(styles.parafont, 'mx-3')}>Courses</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/products" className={classNames(styles.parafont, 'mx-3')}>
                                        Product
                                    </NavLink>
                                </NavItem>
                                {(token) ? (
                                    <>
                                        <NavItem>
                                            <NavLink href="/profile" className={classNames(styles.parafont, 'mx-3')}>
                                                Profile
                                            </NavLink>
                                        </NavItem>
                                        <NavItem onClick={handleSubmit} style={{ cursor: "pointer" }}>
                                            <NavLink className={classNames(styles.parafont, 'mx-3')}>Logout</NavLink>
                                        </NavItem>
                                    </>
                                ) : (
                                    <NavItem>
                                        <NavLink href="/login" className={classNames(styles.parafont, 'mx-3')}>Login</NavLink>
                                    </NavItem>
                                )}
                            </Nav>
                        </>
                    )}
                </Collapse>
            </Navbar >
        </>
    );
};

export default Example;
