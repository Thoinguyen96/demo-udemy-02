import { useState } from "react";
import { postCreateQuiz } from "../../../../services/apiServices";
import "./QuizManage.scss";
import Select from "react-select";
import { toast } from "react-toastify";
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

        // let response = await postCreateQuiz(description, image, type?.value, name);
        // if (response && response.EC === 0) {
        //     toast.success(response.EM);
        //     setImage(null);
        //     setType("");
        //     setName("");
        //     setDescription("");
        // } else {
        //     toast.error(response.EM);// part response.EM failed
        // }
        try {
            const res = await postCreateQuiz(description, image, type?.value, name);
            console.log(res);
            toast.success(res.EM);
            setImage(null);
            setType("");
            setName("");
            setDescription("");
        } catch {
            toast.error("No files were uploaded.");
        }
    };
    return (
        <div className="QuizManage__wrap">
            <h1>QuizManage</h1>
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
                    <label htmlFor="Upload__file" className="btn btn-outline-primary">
                        Choose File
                    </label>
                    <label>Upload image</label>
                    <input hidden id="Upload__file" type="file" onChange={(event) => handleChooseFile(event)} />
                    <div className="mt-3">
                        <Select defaultValue={type} onChange={setType} placeholder="Quiz type..." options={options} />
                    </div>
                    <button onClick={(event) => handleSaveManage(event)} className="btn btn-danger btn-lg mt-3">
                        Save
                    </button>
                </div>
            </fieldset>
        </div>
    );
}

export default QuizManage;
