import { useState } from "react";
import { getAllDataQuiz, postCreateQuiz } from "../../../../services/apiServices";
import "./QuizManage.scss";
import Select from "react-select";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import { useEffect } from "react";
import ModalEditQuiz from "./ModalEditQuiz";

const options = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
];

function QuizManage(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalEditQuiz, setShowModalEditQuiz] = useState(false);
    const [dataQuiz, setDataQuiz] = useState([]);
    const [listQuiz, setListQuiz] = useState([]);
    const handleChooseFile = (event) => {
        if (event.target || (event.target.files && event.target.files[0])) {
            setImage(event.target.files[0]);
        }
    };
    const handleSaveManage = async () => {
        if (!description && !name) {
            toast.error("Name/description is require");
            return;
        }

        let response = await postCreateQuiz(description, image, type?.value, name);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            setImage(null);
            setType("");
            setName("");
            setDescription("");
            fetchAllQuiz();
        } else {
            toast.error(response.EM);
        }
    };
    const handleDeleteListQuiz = () => {
        setShowModal(true);
    };
    useEffect(() => {
        fetchAllQuiz();
    }, []);
    const fetchAllQuiz = async () => {
        const res = await getAllDataQuiz();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <div className="QuizManage__wrap">
            <Accordion accordion="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add new quiz</Accordion.Header>
                    <Accordion.Body>
                        <fieldset className="border p-2">
                            <legend className="float-none w-auto">Add new quiz:</legend>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Your name"
                                    onChange={(event) => setName(event.target.value)}
                                    value={name}
                                />
                                <label>Name</label>
                            </div>
                            <br />
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Description"
                                    onChange={(event) => setDescription(event.target.value)}
                                    value={description}
                                />
                                <label>Description</label>
                            </div>
                            <div className="more__action">
                                <label>Upload image</label>
                                <label htmlFor="Upload__file" className="btn btn-outline-primary">
                                    Choose File
                                </label>
                                {/* <label>{image.name}</label> */}

                                <input
                                    hidden
                                    id="Upload__file"
                                    type="file"
                                    onChange={(event) => handleChooseFile(event)}
                                />
                                <div className="mt-3">
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        placeholder="Quiz type..."
                                        options={options}
                                    />
                                </div>
                                <button
                                    onClick={(event) => handleSaveManage(event)}
                                    className="btn btn-danger btn-lg mt-3"
                                >
                                    Save
                                </button>
                            </div>
                        </fieldset>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className="table__quiz">
                <TableQuiz
                    listQuiz={listQuiz}
                    setShowModal={setShowModal}
                    setDataQuiz={setDataQuiz}
                    handleDeleteListQuiz={handleDeleteListQuiz}
                    setShowModalEditQuiz={setShowModalEditQuiz}
                />
            </div>
            <div className="edit__quiz">
                <ModalEditQuiz
                    dataQuiz={dataQuiz}
                    show={showModalEditQuiz}
                    fetchAllQuiz={fetchAllQuiz}
                    setShowModalEditQuiz={setShowModalEditQuiz}
                />
            </div>
            <div className="delete__quiz">
                <ModalDeleteQuiz
                    show={showModal}
                    setShowModal={setShowModal}
                    dataQuiz={dataQuiz}
                    fetchAllQuiz={fetchAllQuiz}
                />
            </div>
        </div>
    );
}

export default QuizManage;
