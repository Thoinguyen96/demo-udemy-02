import { useState } from "react";
import { getAllDataQuiz, postCreateQuiz } from "../../../../services/apiServices";
import "./QuizManage.scss";
import Select from "react-select";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import { useEffect } from "react";
import ModalEditQuiz from "./ModalEditQuiz";
import UpdateQA from "./UpdateQA";
import AssignUser from "./AssignUser";
import { useTranslation } from "react-i18next";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
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
    const { t } = useTranslation();

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
        console.log(res);
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <div className="QuizManage__wrap">
            <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify>
                <Tab eventKey={t("QuizManage.title1")} title={t("QuizManage.title1")}>
                    <fieldset className="border p-2">
                        <legend className="float-none w-auto">{t("QuizManage.title1")}:</legend>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your name"
                                onChange={(event) => setName(event.target.value)}
                                value={name}
                            />
                            <label>{t("QuizManage.title4")}</label>
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
                            <label>{t("QuizManage.title5")}</label>
                        </div>
                        <div className="more__action">
                            <label>{t("QuizManage.title6")}</label>
                            <label htmlFor="Upload__file" className="btn btn-outline-primary">
                                Choose File
                            </label>

                            <input hidden id="Upload__file" type="file" onChange={(event) => handleChooseFile(event)} />
                            <div className="mt-3">
                                <Select
                                    defaultValue={type}
                                    onChange={setType}
                                    placeholder={t("QuizManage.title7")}
                                    options={options}
                                />
                            </div>
                            <button onClick={(event) => handleSaveManage(event)} className="btn btn-danger btn-lg mt-3">
                                {t("QuizManage.title8")}
                            </button>
                        </div>
                    </fieldset>
                    <div className="table__quiz">
                        <TableQuiz
                            listQuiz={listQuiz}
                            setShowModal={setShowModal}
                            setDataQuiz={setDataQuiz}
                            handleDeleteListQuiz={handleDeleteListQuiz}
                            setShowModalEditQuiz={setShowModalEditQuiz}
                        />
                    </div>
                </Tab>
                <Tab eventKey={t("QuizManage.title2")} title={t("QuizManage.title2")}>
                    <div>
                        <UpdateQA />
                    </div>
                </Tab>
                <Tab eventKey={t("QuizManage.title3")} title={t("QuizManage.title3")}>
                    <AssignUser />
                </Tab>
            </Tabs>
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
