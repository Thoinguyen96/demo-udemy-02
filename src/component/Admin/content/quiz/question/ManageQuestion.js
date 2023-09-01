import { useEffect, useState } from "react";
import { BsPlusCircleFill, BsPatchMinusFill, BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import "./ManageQuestion.scss";
import _ from "lodash";
function ManageQuestion() {
    const options = [
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState([]);
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
            description: `question ${index + 1}`,
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
                        return (
                            <div key={index} className="question__wrapper">
                                <div className="mt-3 form__image">
                                    <form className="form-floating  col-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInputValue"
                                            placeholder="name@example.com"
                                            // value="test@example.com"
                                        />
                                        <label className="label_padding">Add question {index + 1}</label>
                                    </form>
                                    <input hidden id="file_img" type="file" />
                                    <label className="image_file btn btn-outline-success" htmlFor="file_img">
                                        <BiImageAdd /> Choose file
                                    </label>
                                    <label>0 file upload</label>
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
                                                <input type="checkbox" />
                                                <form className="form-floating col-6">
                                                    <input
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
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default ManageQuestion;
