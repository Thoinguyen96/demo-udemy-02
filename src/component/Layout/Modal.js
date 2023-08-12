import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label for="inputEmail4" className="form-label">
                                    Email
                                </label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label
                                    for="inputPassword4"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-6">
                                <label for="inputCity" className="form-label">
                                    User name
                                </label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label for="inputState" className="form-label">
                                    role
                                </label>
                                <select className="form-select">
                                    <option selected>User</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <div>
                                <label for="inputState" className="form-label">
                                    Image
                                </label>
                                <input type="file" className="form-control" />
                            </div>
                        </form>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
