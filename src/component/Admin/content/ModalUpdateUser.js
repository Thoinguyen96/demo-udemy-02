import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";

import _ from "lodash"; //thu vien giup kiem tra array rong
export function ModalUpdateUser(props) {
    // nhận qua Props 1 object chứa 2 phần tử show và setShow
    const { show, setShow, dataUserUpdate, setDataUserUpdate } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("User");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataUserUpdate)) {
            setEmail(dataUserUpdate.email);
            setUserName(dataUserUpdate.username);
            setImage("");
            setRole(dataUserUpdate.role);
            if (dataUserUpdate.image) {
                setPreviewImage(
                    `data:image/png;base64,${dataUserUpdate.image}`
                );
            }
        }
    }, [dataUserUpdate]);
    const handleClose = (props) => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUserName("");
        setImage("");
        setRole("User");
        setPreviewImage("");
        setDataUserUpdate({});
    };
    const handleSave = async () => {
        const isvalidateEmail = validateEmail(email);
        if (!isvalidateEmail && !password) {
            toast.error("Invalid Email and Password");
            return;
        } else if (!isvalidateEmail) {
            toast.error("Invalid Email");
            return;
        }

        let data = await putUpdateUser(
            dataUserUpdate.id,
            userName,
            role,
            image
        );
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUsers();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handlePreviewImage = (even) => {
        // chỗ này chưa làm logic lỗi quay lại kiểm tra
        setPreviewImage(URL.createObjectURL(even.target.files[0]));
        setImage(even.target.files[0]);
    };
    return (
        <>
            <Modal
                show={show}
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
                                    type="text"
                                    className="form-control"
                                    value={userName}
                                    onChange={(even) =>
                                        setUserName(even.target.value)
                                    }
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
                                        type="file"
                                        className="form-control"
                                        id="inputState"
                                        hidden
                                        onChange={(even) =>
                                            handlePreviewImage(even)
                                        }
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
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
