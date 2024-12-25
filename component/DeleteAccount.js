'use client';
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
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
            <h1>Delete Account</h1>
            <p>We're sorry to see you go, but if you're sure you want to delete your account,then give reason:</p>
            <h3>Reason</h3>
            <textarea className={styles.delarea} onChange={e => setreason(e.target.value)}
                value={reason} ></textarea><br />
            <br />
            <button type="submit" className={classNames("btn btn-primary btn-block")} style={{ borderRadius: "1vw" }} onClick={(e) => {
                e.stopPropagation();
                confirmDelete();
            }}>
                Delete
            </button>

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