import { useEffect, useState } from "react";
import { BsPlusCircleFill, BsPatchMinusFill, BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import "./ManageQuestion.scss";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from "react-i18next";

import {
    getAllDataQuiz,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
function ManageQuestion() {
    const { t } = useTranslation();

    const initQuiz = [
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            isValidate: false,
            answer: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                    isValidate: false,
                },
            ],
        },
    ];
    const [listQuiz, setListQuiz] = useState([]);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState([]);
    const [previewDataImage, setPreviewDataImage] = useState({
        title: "",
        url: "",
    });
    const [question, setQuestion] = useState(initQuiz);

    useEffect(() => {
        fetchAllQuiz();
    }, []);
    const fetchAllQuiz = async () => {
        const res = await getAllDataQuiz();
        if (res && res.EC === 0) {
            const data = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id}.  ${item.name}`,
                };
            });
            setListQuiz(data);
        }
    };

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
            if (event.length > 0) {
                questionClone[index].isValidate = false;
            }
            questionClone[index].description = event;
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

    const handleCheckAndValueAnswer = (type, event, questionId, answerId) => {
        const questionClone = _.cloneDeep(question);
        const index = questionClone.findIndex((item) => item.id === questionId);

        if (index > -1) {
            questionClone[index].answer = questionClone[index].answer.map((answer) => {
                if (event.length > 0) {
                    answer.isValidate = false;
                }
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
            setQuestion(questionClone);
        }
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

    //for of giúp chạy tuần tự

    const handleSaveQuestion = async () => {
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a quiz!");
            return;
        }
        // code theo video
        // let isValidateAnswer = true;
        // let indexQ = 0;
        // let indexA = 0;
        // for (let i = 0; i < question.length; i++) {
        //     for (let j = 0; j < question[i].answer.length; j++) {
        //         if (!question[i].answer[j].description) {
        //             isValidateAnswer = false;
        //             indexA = j;
        //             break;
        //         }
        //     }
        //     indexQ = i;
        //     if (isValidateAnswer === false) {
        //         break;
        //     }
        // }
        // if (isValidateAnswer === false) {
        //     toast.error(`Please choose answer ${indexA + 1} on question ${indexQ + 1}`);
        //     return;
        // }

        // let isValidateQuestion = true;
        // let indexQ1 = 0;
        // for (let i = 0; i < question.length; i++) {
        //     if (!question[i].description) {
        //         isValidateQuestion = false;
        //         indexQ1 = i;
        //         break;
        //     }
        // }
        // if (isValidateQuestion === false) {
        //     toast.error(`Please choose question ${indexQ1 + 1}`);
        //     return;
        // }

        // if (isValidateAnswer === false) {
        //     toast.error(`Please choose answer ${indexA + 1} on question ${indexQ + 1}`);
        //     return;
        // }

        // if (isValidateQuestion === false) {
        //     toast.error(`Please choose question ${indexQ + 1}`);
        //     return;
        // }
        // if (isValidateQuestion === false && isValidateAnswer === false) {
        //     toast.error(`Please choose question ${indexQ + 1} and answer  ${indexA + 1}`);
        //     return;
        // }
        /////////////////////////////////////////////

        let isValidateAnswer = true;
        let isValidateQuestion = true;

        for (let i = 0; i < question.length; i++) {
            if (!question[i].description) {
                isValidateQuestion = false;
                if (isValidateQuestion === false) {
                    question[i].isValidate = true;
                    toast.error(`Please fill in the question ${i + 1}`);

                    fetchAllQuiz();

                    return;
                }
            }
            for (let j = 0; j < question[i].answer.length; j++) {
                if (!question[i].answer[j].description) {
                    isValidateAnswer = false;
                    if (isValidateAnswer === false) {
                        question[i].answer[j].isValidate = true;
                        toast.error(`Please fill in the answer ${j + 1} to the question ${i + 1}`);
                        fetchAllQuiz();

                        return;
                    }
                }
            }
        }

        for (const ques of question) {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, ques.description, ques.imageFile);
            for (const answer of ques.answer) {
                await postCreateNewAnswerForQuiz(answer.description, answer.isCorrect, q.DT.id);
            }
        }
        toast.success(`Save quiz success `);
        setQuestion(initQuiz);
    };

    return (
        <div>
            <h2> {t("ManageQues.manage")}</h2>
            <div className="col-6 mt-3">
                <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
            </div>
            <div className="form__wrapper mt-3">
                <label>{t("ManageQues.addQues")}</label>
                {question &&
                    question.length > 0 &&
                    question.map((ques, index) => {
                        return (
                            <div key={index} className="question__wrapper">
                                <div className="mt-3 form__image">
                                    <form className="form-floating  col-6">
                                        <input
                                            onChange={(event) => handleQuestionValue(event.target.value, ques.id)}
                                            type="text"
                                            className={
                                                ques.isValidate === true ? "form-control is-invalid" : "form-control"
                                            }
                                            value={ques.description}
                                        />
                                        <label className="label_padding">
                                            {t("ManageQues.addQues")} {index + 1}
                                        </label>
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
                                            <span>0 {t("ManageQues.upload")}</span>
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
                                                        handleCheckAndValueAnswer(
                                                            "checkbox",
                                                            event.target.checked,
                                                            ques.id,
                                                            a.id
                                                        )
                                                    }
                                                    checked={a.isCorrect}
                                                    type="checkbox"
                                                    value={a.description}
                                                />
                                                <form className="form-floating col-6">
                                                    <input
                                                        onChange={(event) =>
                                                            handleCheckAndValueAnswer(
                                                                "value",
                                                                event.target.value,
                                                                ques.id,
                                                                a.id
                                                            )
                                                        }
                                                        type="text"
                                                        className={
                                                            a.isValidate === true
                                                                ? "is-invalid form-control"
                                                                : "form-control"
                                                        }
                                                        id="floatingInputValue"
                                                    />
                                                    <label className="label_padding">
                                                        {t("ManageQues.answer")} {key + 1}{" "}
                                                    </label>
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
                <button onClick={handleSaveQuestion} className="btn btn-danger mt-3">
                    {t("ManageQues.save")}
                </button>
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
