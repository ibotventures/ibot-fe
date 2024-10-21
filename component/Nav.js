'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
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

    // On component mount, check session storage for the token
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        const cookieToken = Cookies.get('token');
        setToken(cookieToken || '');
    }, []);

    const handleSubmit = () => {
        Cookies.remove('token'); 
        Cookies.remove('email');
        Cookies.remove('username');
        Cookies.remove('userid');
        setToken(''); 
        router.push('/login');
    };

    return (
        <Navbar color="light" light expand="md" className="px-4 container-fluid">
            <NavbarBrand href="/">
                <Image src="/IBOT.png" width={100} height={90} alt="Logo" className='img-fluid' />
            </NavbarBrand>

            <NavbarToggler onClick={toggle} />

            <Collapse isOpen={isOpen} navbar>
                {/* <Nav className="mx-auto" navbar>
                    
                    <NavItem>
                        <NavLink href="/courses" className="mx-3">Courses</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/page" className="mx-3">
                            Product
                        </NavLink>
                    </NavItem>
                
                </Nav> */}

                <Nav navbar>

                    <NavItem>
                        <NavLink href="/course-list" className={classNames(styles.parafont, 'mx-3')}>Courses</NavLink>
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
                            <NavItem onClick={handleSubmit} style={{cursor:"pointer"}}>
                                <NavLink className={classNames(styles.parafont, 'mx-3')}>Logout / SignOut</NavLink>
                            </NavItem>

                        </>

                    ) : (
                        <NavItem>
                            <NavLink href="/login" className={classNames(styles.parafont, 'mx-3')}>Login / Register</NavLink>
                        </NavItem>
                    )}


                    {/* <NavItem>
                        <NavLink href="/search" className="mx-3">
                            <FaSearch size={20} />
                        </NavLink>
                    </NavItem> */}
                </Nav>
            </Collapse>
        </Navbar >
    );
};

export default Example;
