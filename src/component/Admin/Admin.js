import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuiz } from "../../reduxToolkit/userSlice";

function Admin(props) {
    const { t } = useTranslation();
    const listQuiz = useSelector((state) => state.user.listQuiz);
    const disPatch = useDispatch();
    console.log(listQuiz);
    const { setDataQuiz, setShowModalEditQuiz, setShowModal } = props;
    const handleEditListQuiz = (quiz) => {
        setDataQuiz(quiz);
        setShowModalEditQuiz(true);
    };
    const handleDeleteQuiz = (quiz) => {
        setDataQuiz(quiz);
        setShowModal(true);
    };
    useEffect(() => {
        disPatch(fetchAllQuiz());
    }, []);

    return (
        <div className="wrapper__list-quiz ">
            <table className="table table-hover table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t("TableQuiz.name")}</th>
                        <th scope="col">{t("TableQuiz.description")}</th>
                        <th scope="col">{t("TableQuiz.type")}</th>
                        <th scope="col">{t("TableQuiz.action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz &&
                        listQuiz.length > 0 &&
                        listQuiz.map((quiz, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{quiz.id}</th>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty === "undefined" ? "" : quiz.difficulty}</td>
                                    <td className="wrap__btn">
                                        <button className="btn btn-info" onClick={() => handleEditListQuiz(quiz)}>
                                            {t("TableQuiz.edit")}
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteQuiz(quiz)}>
                                            {t("TableQuiz.delete")}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
