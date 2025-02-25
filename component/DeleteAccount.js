'use client';
import Image from "next/image";
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState } from "react";
export default function Home() {
    const [reason, setreason] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const router = useRouter();
    const handledelete = async () => {
        const userId = Cookies.get('userid');
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/deleteaccount/`, {
            id: userId, reason
        });
        if (response.status == 200) {
            Cookies.remove('token');
            Cookies.remove('username');
            Cookies.remove('userid');
            sessionStorage.clear();
            router.push('/login');
            window.location.href = '/login';
        }

    };
    const confirmDelete = () => {
        if (!reason || reason == '') {
            toast.error('Please enter your reason');
            return;
        }
        setShowDeleteModal(true);
    };

    return (
        <>
            <br />
            <h2>Do you want to Remove your account?</h2>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '100%', padding: '20px' }}>
                <Image
                    src='/del.png'
                    className="img-fluid"
                    alt="Profile Image"
                    width={90}
                    height={90}
                    style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        width: "200px",
                        height: "200px",
                    }}
                />
                <p>We value and care about your presence with us, so instead of permanent deletion, your account will be temporarily deactivated—ensuring that all your data will be safely restored if you decide to return.</p>
                <h5>Give reason why you want to remove your account</h5>
                <textarea className={styles.delarea} onChange={e => setreason(e.target.value)}
                    value={reason} ></textarea><br />
                <Button type="submit" className={classNames("btn btn-danger btn-block")} style={{ borderRadius: "0.5vw" }} onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete();
                }}>
                    Delete
                </Button>
            </div>

            <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}>
                <ModalHeader toggle={() => setShowDeleteModal(false)}>Confirm Deletion</ModalHeader>
                <ModalBody>Are you sure you want to delete your account?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handledelete}>Yes</Button>
                    <Button color="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
                </ModalFooter>
            </Modal>
        </>

    );
}