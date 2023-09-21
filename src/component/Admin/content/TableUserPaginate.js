import ReactPaginate from "react-paginate";

export function TableUserPaginate(props) {
    const listUser = props.listUser;
    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);

        props.fetchListUsersWithPaginate(+event.selected + 1);
    };
    return (
        <>
            <table className="table table-bordered  table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
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
                                    <th scope="row">{item.id}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button onClick={() => props.handleViewUser(item)} className="btn btn-info">
                                            View
                                        </button>
                                        <button
                                            onClick={() => props.handleUpdateUser(item)}
                                            className="btn btn-warning mx-3"
                                        >
                                            Update
                                        </button>
                                        <button onClick={() => props.handleDeleteUser(item)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={+props.pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={+props.currentPage - 1}
            />
        </>
    );
}
