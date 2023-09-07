import { AiOutlineCheck } from "react-icons/ai";
import { BsArrowCounterclockwise } from "react-icons/bs";

function ContentRight(props) {
    const { quizQuestion } = props;
    console.log(quizQuestion);
    return (
        <div className="content__right-wrap">
            <div className="content__right">
                <div className="content__right-icon">
                    <AiOutlineCheck />
                    <span>Chấm điểm</span>
                </div>
                <span>10:10:10</span>
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
                            <span key={index} className="answer">
                                {index + 1}
                            </span>
                        );
                    })}
            </div>
        </div>
    );
}

export default ContentRight;
