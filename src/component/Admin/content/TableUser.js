import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiServices";

export function TableUser() {
    const [listUser, setListUser] = useState([]);
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
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`No-${index}`}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <button className="btn btn-info">
                                        View
                                    </button>
                                    <button className="btn btn-warning mx-3">
                                        Update
                                    </button>
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
}
