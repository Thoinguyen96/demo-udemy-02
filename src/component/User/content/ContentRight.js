import { AiOutlineCheck } from "react-icons/ai";
import { BsArrowCounterclockwise } from "react-icons/bs";
import CountDown from "./CountDown";
import { useRef } from "react";
function ContentRight(props) {
    const { quizQuestion, handleFinish, setIndex } = props;
    const classRef = useRef([]);
    const handleClassSelector = (ques) => {
        if (ques.answers && ques.answers.length > 0) {
            const isClass = ques.answers.find((item) => item.isSelector === true);

            if (isClass) {
                return "question__each selected";
            }
        }
        return "question__each";
    };
    const handleIndexQuestion = (ques, index) => {
        setIndex(index);
        if (classRef.current) {
            classRef.current.forEach((item) => {
                if (item && item.className === "question__each click") {
                    item.className = "question__each";
                }
                if (item && item.className === "question__each click_on-selected") {
                    item.className = "question__each selected";
                }
            });
        }

        if (ques && ques.answers.length > 0) {
            const isClassAnswer = ques.answers.find((item) => item.isSelector === true);
            if (isClassAnswer) {
                classRef.current[index].className = "question__each click_on-selected";
            } else {
                classRef.current[index].className = "question__each click";
            }
        }
    };
    return (
        <div className="content__right-wrap">
            <div className="content__right">
                <div className="content__right-icon">
                    <AiOutlineCheck />
                    <span>Chấm điểm</span>
                </div>
                <CountDown handleFinish={handleFinish} />
                <div className="content__right-icon">
                    <BsArrowCounterclockwise />
                    <span>Làm lại</span>
                </div>
            </div>
            <div className="question">
                {quizQuestion &&
                    quizQuestion.length > 0 &&
                    quizQuestion.map((ques, index) => {
                        return (
                            <span
                                ref={(element) => (classRef.current[index] = element)}
                                onClick={() => handleIndexQuestion(ques, index)}
                                key={index}
                                className={handleClassSelector(ques)}
                            >
                                {index + 1}
                            </span>
                        );
                    })}
            </div>
        </div>
    );
}

export default ContentRight;
