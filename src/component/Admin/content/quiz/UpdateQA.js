import { useEffect, useState } from "react";
import { BsPlusCircleFill, BsPatchMinusFill, BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import _, { isEmpty } from "lodash";
import Lightbox from "react-awesome-lightbox";
import "./UpdateQA.scss";

import { toast } from "react-toastify";
import {
    getAllDataQuiz,
    getQuizWidthQA,
    postCreateNewAnswerForQuiz,
    postCreateNewQuestionForQuiz,
    postUpdateQuiz,
} from "../../../../services/apiServices";
function UpdateQA() {
    const initQuiz = [
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            isValidate: false,
            answers: [
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
    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWidthQA();
        }
    }, [selectedQuiz]);

    // return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        if (url.startsWith("data:")) {
            var arr = url.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then((res) => res.arrayBuffer())
            .then((buf) => new File([buf], filename, { type: mimeType }));
    }

    //Usage example:
    const fetchQuizWidthQA = async () => {
        const res = await getQuizWidthQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            const newDataQuiz = [];

            for (let i = 0; i < res.DT.qa.length; i++) {
                const q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `question-${q.id}.png`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `question-${q.id}.png`);
                }
                newDataQuiz.push(q);
            }
            setQuestion(newDataQuiz);
        }
    };

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
        questionClone[index].answers.push(newAnswer);
        setQuestion(questionClone);
    };
    const handleRemoveAnswer = (questionID, answerId) => {
        const questionClone = _.cloneDeep(question);
        const index = questionClone.findIndex((item) => item.id === questionID);
        const removeAnswer = questionClone[index].answers.filter((a) => {
            return a.id !== answerId;
        });
        questionClone[index].answers = removeAnswer;

        setQuestion(questionClone);
    };
    const handleAddQuestion = (ques, index) => {
        const newQuestion = {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [
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
            questionClone[index].answers = questionClone[index].answers.map((answers) => {
                if (event.length > 0) {
                    answers.isValidate = false;
                }
                if (answers.id === answerId) {
                    if (type === "checkbox") {
                        answers.isCorrect = event;
                    }
                    if (type === "value") {
                        answers.description = event;
                    }
                }

                return answers;
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
            for (let j = 0; j < question[i].answers.length; j++) {
                if (!question[i].answers[j].description) {
                    isValidateAnswer = false;
                    if (isValidateAnswer === false) {
                        question[i].answers[j].isValidate = true;
                        toast.error(`Please fill in the answers ${j + 1} to the question ${i + 1}`);
                        fetchAllQuiz();

                        return;
                    }
                }
            }
        }

        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });

        const questionClone = _.cloneDeep(question);
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
            }
        }
        const data = await postUpdateQuiz({
            quizId: selectedQuiz.value,
            questions: questionClone,
        });
        console.log(data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            fetchQuizWidthQA();
        }
    };

    return (
        <div>
            <label>Select Quiz</label>

            <div className="col-6 mt-3">
                <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
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
                                            onChange={(event) => handleQuestionValue(event.target.value, ques.id)}
                                            type="text"
                                            className={
                                                ques.isValidate === true ? "form-control is-invalid" : "form-control"
                                            }
                                            value={ques.description}
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

                                {ques.answers &&
                                    ques.answers.length > 0 &&
                                    ques.answers.map((a, key) => {
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
                                                        value={a.description}
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
                                                    <label className="label_padding">answers {key + 1} </label>
                                                </form>
                                                <BsPlusCircleFill
                                                    className="icon__add"
                                                    onClick={() => {
                                                        handleAddAnswer(ques.id);
                                                    }}
                                                />
                                                {ques.answers.length > 1 && (
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
                    Save
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

export default UpdateQA;
