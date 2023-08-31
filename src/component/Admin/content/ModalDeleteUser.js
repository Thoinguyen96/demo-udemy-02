import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

export function ModalDeleteUser(props) {
    const { show, setShow, dataDeleteUser, fetchListUsers } = props;

    const handleClose = () => setShow(false);
    const handleDeleteSubmit = async () => {
        let data = await deleteUser(dataDeleteUser.id);
        console.log(dataDeleteUser.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUsers();
            await props.fetchListUsersWithPaginate(1);
            props.setCurrentPage(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete this user {dataDeleteUser ? dataDeleteUser.email : ""}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteSubmit}>
                        Delete confirmation
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
