import { useParams, useLocation } from "react-router-dom";
import { getQuizId } from "../../services/apiServices";
import { useEffect, useState } from "react";
import _ from "lodash";
function DetailQuiz() {
    const location = useLocation();
    const [quizQuestion, setQuizQuestion] = useState([]);
    const [index, setIndex] = useState(0);
    const params = useParams();
    const quizId = params.id;
    const quizQuestions = quizQuestion[index];
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
                        answers.push(item.answers);
                    });
                    return { questionId: key, answers, questionDescription, image };
                })
                .value();

            setQuizQuestion(data);
        }
    };
    if (_.isEmpty(quizQuestions)) {
        return;
    }
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
    return (
        <div className="detail__wrap">
            <div className="detail__questions">
                <h2 className="question__title">
                    {" "}
                    Quiz: {quizId} {location?.state?.titleQuiz}.
                </h2>
                <div>
                    {quizQuestions.image ? (
                        <div className="image__question">
                            <img src={`data:image/jpeg;base64,${quizQuestions.image}`} />
                        </div>
                    ) : (
                        <div className="image__question"></div>
                    )}

                    <div className="answer__wrap">
                        <span className="answer__question">
                            Question {index + 1}: {quizQuestions.questionDescription}?
                        </span>
                        <div key={index} className="answer__quiz">
                            {quizQuestions.answers &&
                                quizQuestions.answers.map((answer, index) => {
                                    return (
                                        <div className="answer__selector" key={index}>
                                            <input
                                                className="check-input"
                                                type="checkbox"
                                                value=""
                                                id={`check-answer${index}`}
                                            />
                                            <label className="answer-lb" htmlFor={`check-answer${index}`}>
                                                {answer.description}
                                            </label>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
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
            </div>
            <div className="detail__answer">answer-right</div>
        </div>
    );
}

export default DetailQuiz;
