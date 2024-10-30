'use client';
import { useEffect, useState } from 'react';
import Landingpage from '@/component/landingpage';
import Mainhome from '@/component/mainhome';
import Cookies from 'js-cookie';

export default function Render() {
    const [token, setToken] = useState('');

    useEffect(() => {
        const cookieToken = Cookies.get('token');
        setToken(cookieToken || '');
    }, []);

    return (
        <>
            {(token) ? (
                <Mainhome />
            ) : (
                <Landingpage />
            )}
        </>
    );
}
