import { Example } from "../Admin/content/Modal";
import { TableUser } from "../Admin/content/TableUser";
import { useEffect, useState } from "react";
import { getAllUser, getPaginationUser } from "../../services/apiServices";
import { ModalUpdateUser } from "../Admin/content/ModalUpdateUser";
import { ModalViewUser } from "../Admin/content/ModalViewUser";
import { ModalDeleteUser } from "../Admin/content/ModalDeleteUser";
import { TableUserPaginate } from "../Admin/content/TableUserPaginate";
function ManageUser() {
    const [listUser, setListUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataUserUpdate, setDataUserUpdate] = useState({});
    const [dataViewUser, setDataViewUser] = useState({});
    const [dataDeleteUser, setDataDeleteUser] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const LIMIT_USER = 5;
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
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsers = async () => {
        const res = await getAllUser();
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    };
    const fetchListUsersWithPaginate = async (page) => {
        const res = await getPaginationUser(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };
    return (
        <div>
            <div>ManageUser page</div>
            <button onClick={handleShows} className="btn btn-primary mb-3">
                Add user
            </button>
            <div>
                {/* <TableUser
                    listUser={listUser}
                    handleUpdateUser={handleUpdateUser}
                    handleViewUser={handleViewUser}
                    handleDeleteUser={handleDeleteUser}
                /> */}
                <TableUserPaginate
                    pageCount={pageCount}
                    listUser={listUser}
                    handleUpdateUser={handleUpdateUser}
                    handleViewUser={handleViewUser}
                    handleDeleteUser={handleDeleteUser}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <Example
                getPaginationUser={getPaginationUser}
                show={showModal}
                setShow={setShowModal}
                fetchListUsers={fetchListUsers}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateUser
                setDataUserUpdate={setDataUserUpdate}
                fetchListUsers={fetchListUsers}
                dataUserUpdate={dataUserUpdate}
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalViewUser
                showModalViewUser={showModalViewUser}
                dataViewUser={dataViewUser}
                setShowModalViewUser={setShowModalViewUser}
                setDataViewUser={setDataViewUser}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalDeleteUser
                fetchListUsers={fetchListUsers}
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDeleteUser={dataDeleteUser}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default ManageUser;
