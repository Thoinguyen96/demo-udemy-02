import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
export function Example(props) {
    // nhận qua Props 1 object chứa 2 phần tử show và setShow
    const { show, setShow } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("User");
    const [previewImage, setPreviewImage] = useState("");
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUserName("");
        setImage("");
        setRole("User");
        setPreviewImage("");
    };
    const handleSave = async () => {
        // let data = {
        //     email: email,
        //     password: password,
        //     username: userName,
        //     role: role,
        //     userImage: image,
        // };
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        data.append("username", userName);
        data.append("role", role);
        data.append("userImage", image);

        let res = await axios.post(
            "http://localhost:8081/api/v1/participant",
            data
        );
        console.log(res);
    };
    const handlePreviewImage = (even) => {
        // chỗ này chưa làm logic lỗi quay lại kiểm tra
        setPreviewImage(URL.createObjectURL(even.target.files[0]));
        setImage(even.target.files[0]);
    };

    return (
        <>
            <Modal show={show} onHide={setShow} backdrop="static" size="lg">
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Add new user</Modal.Title>
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
                                        <span>
                                            <FcAddImage />
                                            Preview Image
                                        </span>
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
