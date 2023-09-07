import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

function Question(props) {
    const { quizQuestion, index, handleCheckbox } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);

    const quizQuestions = quizQuestion[index];
    if (_.isEmpty(quizQuestions)) {
        return;
    }
    console.log(quizQuestions);
    // const handleHandleCheckbox = (answerId, questionId) => {
    //     props.handleCheckbox(answerId, questionId);
    // };

    return (
        <div>
            {quizQuestions.image ? (
                <div className="image__question">
                    <img
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64,${quizQuestions.image}`}
                    />
                    {isPreviewImage === true && (
                        <Lightbox
                            image={`data:image/jpeg;base64,${quizQuestions.image}`}
                            title="image"
                            onClose={() => setIsPreviewImage(false)}
                        ></Lightbox>
                    )}
                </div>
            ) : (
                <div className="image__question"></div>
            )}

            <div className="answer__wrap">
                {
                    <span className="answer__question">
                        Question {index + 1}: {quizQuestions.questionDescription}?
                    </span>
                }
                {
                    <div className="answer__quiz">
                        {quizQuestions.answers &&
                            quizQuestions.answers.map((answer, index) => {
                                return (
                                    <div className="answer__selector" key={index}>
                                        <input
                                            onChange={() => {
                                                handleCheckbox(+answer.id, +quizQuestions.questionId);
                                            }}
                                            className="check-input"
                                            type="checkbox"
                                            checked={answer.isSelector}
                                            id={`check-answer${index}`}
                                        />
                                        <label className="answer-lb" htmlFor={`check-answer${index}`}>
                                            {answer.description}
                                        </label>
                                    </div>
                                );
                            })}
                    </div>
                }
            </div>
        </div>
    );
}

export default Question;
