import _ from "lodash";

function Question(props) {
    const { quizQuestion, index, handleCheckbox } = props;
    console.log(quizQuestion);

    const quizQuestions = quizQuestion[index];
    if (_.isEmpty(quizQuestions)) {
        return;
    }

    // const handleHandleCheckbox = (answerId, questionId) => {
    //     props.handleCheckbox(answerId, questionId);
    // };
    return (
        <div>
            {quizQuestions.image ? (
                <div className="image__question">
                    <img src={`data:image/jpeg;base64,${quizQuestions.image}`} />
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
