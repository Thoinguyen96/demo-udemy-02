import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putEditQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import _ from "lodash";
function ModalEditQuiz(props) {
    const { show, dataQuiz, setShowModalEditQuiz, fetchAllQuiz } = props;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataQuiz)) {
            setName(dataQuiz.name);
            setDescription(dataQuiz.description);
            setType(dataQuiz.difficulty);
            if (dataQuiz.image) {
                setPreviewImage(`data:image/png;base64,${dataQuiz.image}`);
            }
        }
    }, [dataQuiz]);
    const handleClose = () => {
        setShowModalEditQuiz(false);
    };
    const handlePreviewImage = (even) => {
        setPreviewImage(URL.createObjectURL(even.target.files[0]));
        setImage(even.target.files[0]);

        // this.setState({[e.target.name]: URL.createObjectURL(e.target.files[0])})
    };
    const handleSave = async () => {
        let res = await putEditQuiz(dataQuiz.id, type, name, description, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setShowModalEditQuiz(false);

            await fetchAllQuiz();
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <>
            <Modal show={show} onHide={props.setCloseModalUpdate} backdrop="static" size="lg">
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(even) => setName(even.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    onChange={(even) => setDescription(even.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">
                                    User name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    onChange={(even) => setDescription(even.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputState" className="form-label">
                                    DIFFICULITY
                                </label>

                                <select
                                    className="form-select"
                                    onChange={(even) => setType(even.target.value)}
                                    aria-label="Default select example"
                                >
                                    <option className="option_label" disabled selected>
                                        {dataQuiz.difficulty === "undefined"
                                            ? "choose the difficulty of the test"
                                            : dataQuiz.difficulty}
                                    </option>

                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                            <div className="wrap-preview-image">
                                <div className="wrap-preview-small">
                                    <label htmlFor="inputState" className="form-label-image">
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="inputState"
                                        hidden
                                        onChange={(even) => handlePreviewImage(even)}
                                    />
                                </div>
                                <div className="preview-image">
                                    {previewImage ? <img src={previewImage} /> : <span>Preview Image</span>}
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

export default ModalEditQuiz;
