import { useEffect, useState } from "react";
import { getAllDataQuiz, getAllUser } from "../../../../services/apiServices";
import Select from "react-select";

function AssignUser(props) {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);

    useEffect(() => {
        fetchAllQuiz();
        fetchAllUser();
    }, []);
    const fetchAllQuiz = async () => {
        const res = await getAllDataQuiz();
        if (res && res.EC === 0) {
            const data = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id}.  ${item.description}`,
                };
            });
            setListQuiz(data);
        }
    };
    const fetchAllUser = async () => {
        const res = await getAllUser();

        if (res && res.EC === 0) {
            const newRes = res.DT.map((user) => {
                return {
                    label: user.id + " -  " + user.email,
                    value: user.id,
                };
            });
            setListUser(newRes);
        }
    };

    return (
        <div className="Assign__user">
            <div className="row">
                <div className="col-6 mt-3">
                    <label>Select Quiz:</label>
                    <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
                </div>
                <div className="col-6 mt-3">
                    <label>Select User:</label>
                    <Select defaultValue={selectedUser} onChange={setSelectedUser} options={listUser} />
                </div>
            </div>
            <button className="btn btn-primary">Assign</button>
        </div>
    );
}

export default AssignUser;
