import { Example } from "../Admin/content/Modal";
import { TableUser } from "../Admin/content/TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/apiServices";
function ManageUser() {
    const [listUser, setListUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleShows = () => {
        setShowModal(true);
    };

    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        const res = await getAllUser();
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    };
    return (
        <div>
            <div>ManageUser page</div>
            <button onClick={handleShows} className="btn-primary">
                Add user
            </button>
            <div>
                <TableUser listUser={listUser} />
            </div>
            <Example
                show={showModal}
                setShow={setShowModal}
                fetchListUsers={fetchListUsers}
            />
        </div>
    );
}

export default ManageUser;
