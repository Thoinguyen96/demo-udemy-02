import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function ModalDeleteUser(props) {
    const { show, setShow, dataDeleteUser } = props;

    const handleClose = () => setShow(false);
    const handleDeleteSubmit = () => {
        alert("secces");
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete this user{" "}
                    {dataDeleteUser ? dataDeleteUser.email : ""}
                </Modal.Body>
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
