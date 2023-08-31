function TableQuiz(props) {
    const { setDataQuiz, setShowModalEditQuiz, setShowModal, listQuiz } = props;
    const handleEditListQuiz = (quiz) => {
        setDataQuiz(quiz);
        setShowModalEditQuiz(true);
    };
    const handleDeleteQuiz = (quiz) => {
        setDataQuiz(quiz);
        setShowModal(true);
    };
    return (
        <div className="wrapper__list-quiz ">
            <table className="table table-hover table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
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
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteQuiz(quiz)}>
                                            Delete
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

export default TableQuiz;
