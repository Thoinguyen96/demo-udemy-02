import { Example } from "../Admin/content/Modal";
import { TableUser } from "../Admin/content/TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/apiServices";
import { ModalUpdateUser } from "../Admin/content/ModalUpdateUser";
import { ModalViewUser } from "../Admin/content/ModalViewUser";
import { ModalDeleteUser } from "../Admin/content/ModalDeleteUser";
function ManageUser() {
    const [listUser, setListUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataUserUpdate, setDataUserUpdate] = useState({});
    const [dataViewUser, setDataViewUser] = useState({});
    const [dataDeleteUser, setDataDeleteUser] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    const handleShows = () => {
        setShowModal(true);
    };

    const handleUpdateUser = (item) => {
        setShowModalUpdateUser(true);
        setDataUserUpdate(item);
    };
    const handleViewUser = (item) => {
        setShowModalViewUser(true);
        setDataViewUser(item);
    };
    const handleDeleteUser = (item) => {
        setShowModalDeleteUser(true);
        setDataDeleteUser(item);
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
                    handleViewUser={handleViewUser}
                    handleDeleteUser={handleDeleteUser}
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
            <ModalViewUser
                showModalViewUser={showModalViewUser}
                dataViewUser={dataViewUser}
                setShowModalViewUser={setShowModalViewUser}
                setDataViewUser={setDataViewUser}
            />
            <ModalDeleteUser
                fetchListUsers={fetchListUsers}
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDeleteUser={dataDeleteUser}
            />
        </div>
    );
}

export default ManageUser;
