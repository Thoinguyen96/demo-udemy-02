import { Example } from "../Admin/content/Modal";
import { TableUser } from "../Admin/content/TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/apiServices";
import { ModalUpdateUser } from "../Admin/content/ModalUpdateUser";
function ManageUser() {
    const [listUser, setListUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUserUpdate, setDataUserUpdate] = useState({});

    const handleShows = () => {
        setShowModal(true);
    };

    const handleUpdateUser = (item) => {
        setShowModalUpdateUser(true);
        setDataUserUpdate(item);
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
                <TableUser
                    listUser={listUser}
                    handleUpdateUser={handleUpdateUser}
                />
            </div>
            <Example
                show={showModal}
                setShow={setShowModal}
                fetchListUsers={fetchListUsers}
            />

            <ModalUpdateUser
                setDataUserUpdate={setDataUserUpdate}
                fetchListUsers={fetchListUsers}
                dataUserUpdate={dataUserUpdate}
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
            />
        </div>
    );
}

export default ManageUser;
