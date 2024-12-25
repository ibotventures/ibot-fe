'use client';
import Landingpage from '@/component/landingpage';
import Mainhome from '@/component/mainhome';
import Cookies from 'js-cookie';

export default function Render() {
    const userId = Cookies.get('userid');
    if (userId) {
        return <Mainhome />;
    }
    return <Landingpage />;
}
