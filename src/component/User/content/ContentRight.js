import { AiOutlineCheck } from "react-icons/ai";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
function ContentRight(props) {
    const { quizQuestion, handleFinish, setIndex, getQuestionQuizId } = props;
    const classRef = useRef([]);
    const [count, setCount] = useState(60); //60s
    const [time, setTime] = useState(3); //total time (phút)
    useEffect(() => {
        if (time === 0 && count === 0) {
            handleFinish();
            return () => {
                clearTimeout();
            };
        }

        const countDown = setTimeout(() => {
            setCount(count - 1);
            if (count - 1 < 0) {
                setTime(time - 1);
                setCount(59);
                return () => {
                    clearTimeout(countDown);
                };
            }
        }, 1000);

        return () => {
            clearTimeout(countDown);
        };
    }, [count, time]);

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
    const remakeQuiz = () => {
        setCount(59);
        setTime(3);
        getQuestionQuizId();
    };
    const handleMark = () => {
        handleFinish();
    };
    return (
        <div className="content__right-wrap">
            <div className="content__right">
                <div onClick={handleMark} className="content__right-icon">
                    <AiOutlineCheck />
                    <span>Chấm điểm</span>
                </div>
                <span>
                    {time} : {count}
                </span>
                <div onClick={remakeQuiz} className="content__right-icon">
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
