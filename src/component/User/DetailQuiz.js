import { useParams, useLocation } from "react-router-dom";
import { getQuizId } from "../../services/apiServices";
import { useEffect, useState } from "react";
import _ from "lodash";
import Question from "./Question";
function DetailQuiz() {
    const location = useLocation();
    const [quizQuestion, setQuizQuestion] = useState([]);
    const [index, setIndex] = useState(0);
    const params = useParams();
    const quizId = params.id;
    useEffect(() => {
        getQuestionQuizId();
    }, [quizId]);

    const getQuestionQuizId = async () => {
        const res = await getQuizId(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription,
                        image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelector = false;

                        answers.push(item.answers);
                    });
                    return { questionId: key, answers, questionDescription, image };
                })
                .value();

            setQuizQuestion(data);
        }
    };

    const handlePrev = () => {
        if (index - 1 < 0) {
            return;
        }
        setIndex(index - 1);
    };
    const handleNext = () => {
        if (index + 1 >= quizQuestion.length) {
            return;
        }
        setIndex(index + 1);
    };
    const handleFinish = () => {};
    const handleCheckbox = (answerId, questionId) => {
        // cách 1
        const dataQuizClone = _.cloneDeep(quizQuestion);
        let queId = [];
        let question = dataQuizClone.find((item) => {
            queId.push(+item.questionId);
            return +item.questionId === +questionId;
        });

        question.answers.forEach((item) => {
            if (+item.id === +answerId) {
                item.isSelector = !item.isSelector;
            }
        });
        setQuizQuestion(dataQuizClone);
        // cách 2
        // const dataQuizClone = _.cloneDeep(quizQuestion);
        // let queId = [];
        // let question = dataQuizClone.find((item) => {
        //     queId.push(+item.questionId);
        //     return +item.questionId === +questionId;
        // });

        // if (question && question.answers) {
        //     question.answers.forEach((item) => {
        //         if (+item.id === +answerId) {
        //             item.isSelector = !item.isSelector;
        //         }
        //     });
        // }

        // setQuizQuestion(dataQuizClone);
    };
    return (
        <div className="detail__wrap">
            <div className="detail__questions">
                <h2 className="question__title">
                    {" "}
                    Quiz: {quizId} {location?.state?.titleQuiz}.
                </h2>

                <Question quizQuestion={quizQuestion} index={index} handleCheckbox={handleCheckbox} />

                <div className="next__wrap">
                    <button onClick={handlePrev} className="btn btn-outline-danger btn-lg">
                        Back
                    </button>
                    <button onClick={handleNext} className="btn btn-outline-danger btn-lg">
                        Next
                    </button>
                    <button onClick={handleFinish} className="btn btn-danger btn-lg">
                        Finish
                    </button>
                </div>
            </div>
            <div className="detail__answer">answer-right</div>
        </div>
    );
}

export default DetailQuiz;
