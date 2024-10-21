'use client';
import styles from '@/app/page.module.css';
import { useEffect, useState } from 'react';
import Landingpage from '@/component/landingpage';
import Mainhome from '@/component/mainhome';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Input } from 'reactstrap';
import axios from 'axios';
export default function Render() {
  const [token, setToken] = useState('');
  useEffect(() => {
    const cookieToken = Cookies.get('token');
    setToken(cookieToken || '');

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    };

  

    const formData1 = new FormData();
    formData1.append('video', videos);


    try {
  
      const response = await axios.post('http://127.0.0.1:8000/app/upload-video/', formData1, config);

      if (response.status === 200 || response.status === 201) {
        toast.success(`something ${response.data.data.video}`)
        router.push('/');
      }
    } catch (err) {
      toast.error('Some error occurred, try again');
    }
  };

  return (

    <>
      {(token) ? (
        <>
          <Mainhome />
        </>
      ) : (
        <Landingpage />
      )}

    </>

  );
}
