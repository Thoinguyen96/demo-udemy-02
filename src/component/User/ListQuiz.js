import { useState, useEffect } from "react";
import { getListQuizByUser } from "../../services/apiServices";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
function ListQuiz() {
    const navigate = useNavigate();
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        apiListQuiz();
    }, []);
    const apiListQuiz = async () => {
        const res = await getListQuizByUser();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    return (
        <div className="list__quiz">
            {listQuiz &&
                listQuiz.map((quiz, index) => {
                    return (
                        <div className="card" key={quiz.id}>
                            <img
                                className="card-img-top"
                                src={`data:image/jpeg;base64,${quiz.image}`}
                                alt="Card image cap"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{`Quiz   ${index + 1}`}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button
                                    onClick={() =>
                                        navigate(`quiz/${quiz.id}`, { state: { titleQuiz: quiz.description } })
                                    }
                                    className="btn btn-primary"
                                >
                                    Start now
                                </button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default ListQuiz;
