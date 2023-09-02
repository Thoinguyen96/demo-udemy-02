import { useEffect, useState } from "react";
import { BsPlusCircleFill, BsPatchMinusFill, BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import "./ManageQuestion.scss";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
function ManageQuestion() {
    const options = [
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
    ];
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState([]);
    const [previewDataImage, setPreviewDataImage] = useState({
        title: "",
        url: "",
    });
    const [question, setQuestion] = useState([
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answer: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                },
            ],
        },
    ]);

    const handleAddAnswer = (questionID) => {
        const questionClone = _.cloneDeep(question);
        const index = questionClone.findIndex((item) => item.id === questionID);
        const newAnswer = {
            id: uuidv4(),
            description: "",
            isCorrect: false,
        };
        questionClone[index].answer.push(newAnswer);
        setQuestion(questionClone);
    };
    const handleRemoveAnswer = (questionID, answerId) => {
        const questionClone = _.cloneDeep(question);
        const index = questionClone.findIndex((item) => item.id === questionID);
        const removeAnswer = questionClone[index].answer.filter((a) => {
            return a.id !== answerId;
        });
        questionClone[index].answer = removeAnswer;

        setQuestion(questionClone);
    };
    const handleAddQuestion = (ques, index) => {
        const newQuestion = {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answer: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                },
            ],
        };
        setQuestion([...question, newQuestion]);
    };
    const handleRemoveQuestion = (id) => {
        const questionClone = question.filter((item) => {
            return item.id !== id;
        });
        setQuestion(questionClone);
    };
    const handleQuestionValue = (event, questionId) => {
        const questionClone = _.cloneDeep(question);
        const index = questionClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            questionClone[index] = event.target.value;
            setQuestion(questionClone);
        }
    };
    const handleUploadFile = (event, questionId) => {
        const questionClone = _.cloneDeep(question);
        const index = questionClone.findIndex((item) => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0]; //get data image
            questionClone[index].imageName = event.target.files[0].name; //get name image

            setQuestion(questionClone);
        }
    };
    const handleCheckAnswer = (type, event, questionId, answerId) => {
        const questionClone = _.cloneDeep(question);
        const index = questionClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            questionClone[index].answer = questionClone[index].answer.map((answer) => {
                if (answer.id === answerId) {
                    if (type === "checkbox") {
                        answer.isCorrect = event;
                    }
                    if (type === "value") {
                        answer.description = event;
                    }
                }
                return answer;
            });
        }

        setQuestion(questionClone);
    };
    const handleSaveQuestion = () => {
        console.log(question);
    };
    const handlePreviewImage = (questionId) => {
        const questionClone = _.cloneDeep(question);
        const index = questionClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            setPreviewDataImage({
                url: questionClone[index].imageFile,
                title: questionClone[index].imageName,
            });
            setIsPreviewImage(true);
        }
    };

    return (
        <div>
            ManageQuestion page
            <div className="col-6 mt-3">
                <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={options} />
            </div>
            <div className="form__wrapper mt-3">
                <label>Add question</label>
                {question &&
                    question.length > 0 &&
                    question.map((ques, index) => {
                        console.log(ques.imageFile);

                        return (
                            <div key={index} className="question__wrapper">
                                <div className="mt-3 form__image">
                                    <form className="form-floating  col-6">
                                        <input
                                            onChange={(event) => handleQuestionValue(event, ques.id)}
                                            type="text"
                                            className="form-control"
                                            id="floatingInputValue"
                                            placeholder="name@example.com"
                                            value={question.description}
                                        />
                                        <label className="label_padding">Add question {index + 1}</label>
                                    </form>
                                    <input
                                        onChange={(event) => handleUploadFile(event, ques.id)}
                                        hidden
                                        id={`for ${ques.id}`}
                                        type="file"
                                    />
                                    <label className="image_file btn btn-outline-success" htmlFor={`for ${ques.id}`}>
                                        <BiImageAdd /> Choose file
                                    </label>
                                    <label>
                                        {ques.imageName ? (
                                            <span onClick={() => handlePreviewImage(ques.id)}>{ques.imageName}</span>
                                        ) : (
                                            "0 file upload"
                                        )}
                                    </label>
                                    <div className="wrapper__icon">
                                        <BsFillPlusSquareFill
                                            onClick={() => handleAddQuestion(ques.id, index)}
                                            className="icon__add"
                                        />
                                        {question.length > 1 && (
                                            <BsPatchMinusFill
                                                onClick={() => handleRemoveQuestion(ques.id, index)}
                                                className="icon__remove"
                                            />
                                        )}
                                    </div>
                                </div>

                                {ques.answer &&
                                    ques.answer.length > 0 &&
                                    ques.answer.map((a, key) => {
                                        return (
                                            <div key={a.id} className="question__answer">
                                                checked
                                                <input
                                                    onChange={(event) =>
                                                        handleCheckAnswer(
                                                            "checkbox",
                                                            event.target.checked,
                                                            ques.id,
                                                            a.id
                                                        )
                                                    }
                                                    checked={a.isCorrect}
                                                    type="checkbox"
                                                />
                                                <form className="form-floating col-6">
                                                    <input
                                                        onChange={(event) =>
                                                            handleCheckAnswer(
                                                                "value",
                                                                event.target.value,
                                                                ques.id,
                                                                a.id
                                                            )
                                                        }
                                                        type="text"
                                                        className="form-control"
                                                        id="floatingInputValue"
                                                        placeholder="name@example.com"
                                                    />
                                                    <label className="label_padding">Answer {key + 1} </label>
                                                </form>
                                                <BsPlusCircleFill
                                                    className="icon__add"
                                                    onClick={() => {
                                                        handleAddAnswer(ques.id);
                                                    }}
                                                />
                                                {ques.answer.length > 1 && (
                                                    <AiFillMinusCircle
                                                        onClick={() => handleRemoveAnswer(ques.id, a.id)}
                                                        className="icon__remove"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                <button onClick={handleSaveQuestion} className="btn btn-danger mt-3">
                                    Save
                                </button>
                            </div>
                        );
                    })}
            </div>
            {isPreviewImage === true && (
                <Lightbox
                    key={question.id}
                    image={URL.createObjectURL(previewDataImage.url)}
                    title={previewDataImage.title}
                    onClose={() => setIsPreviewImage(false)}
                ></Lightbox>
            )}
        </div>
    );
}

export default ManageQuestion;
