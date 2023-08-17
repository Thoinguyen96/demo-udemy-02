import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import _ from "lodash"; //thu vien giup kiem tra array rong
import { getAllUser } from "../../../services/apiServices";
export function ModalViewUser(props) {
    // nhận qua Props 1 object chứa 2 phần tử show và setShow
    const {
        showModalViewUser,
        setDataViewUser,
        setShowModalViewUser,
        dataViewUser,
    } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("User");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataViewUser)) {
            setEmail(dataViewUser.email);
            setUserName(dataViewUser.username);
            setImage(dataViewUser.image);
            setRole(dataViewUser.role);
            if (dataViewUser.image) {
                setPreviewImage(`data:image/png;base64,${dataViewUser.image}`);
            }
        }
    }, [dataViewUser]);
    const handleClose = async (props) => {
        setShowModalViewUser(false);
        setDataViewUser({});
        await getAllUser(dataViewUser.id, userName, role, image);
    };

    return (
        <>
            <Modal
                show={showModalViewUser}
                onHide={props.setCloseModalUpdate}
                backdrop="static"
                size="lg"
            >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label
                                    htmlFor="inputEmail4"
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <input
                                    disabled
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(even) =>
                                        setEmail(even.target.value)
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="inputPassword4"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    disabled
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(even) =>
                                        setPassword(even.target.value)
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="inputCity"
                                    className="form-label"
                                >
                                    User name
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    className="form-control"
                                    value={userName}
                                />
                            </div>
                            <div className="col-md-4">
                                <label
                                    htmlFor="inputState"
                                    className="form-label"
                                >
                                    role
                                </label>
                                <select
                                    disabled
                                    className="form-select"
                                    onChange={(even) =>
                                        setRole(even.target.value)
                                    }
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="wrap-preview-image">
                                <div className="wrap-preview-small">
                                    <label
                                        htmlFor="inputState"
                                        className="form-label-image"
                                    >
                                        Upload Image
                                    </label>
                                    <input
                                        disabled
                                        type="file"
                                        className="form-control"
                                        id="inputState"
                                        hidden
                                    />
                                </div>
                                <div className="preview-image">
                                    {previewImage ? (
                                        <img src={previewImage} />
                                    ) : (
                                        <span>Preview Image</span>
                                    )}
                                </div>
                            </div>
                        </form>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
