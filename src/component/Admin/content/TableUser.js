// export function TableUser(props) {
//     const listUser = props.listUser;

//     return (
//         <>
//             <table className="table table-bordered table-hover">
//                 <thead>
//                     <tr>
//                         <th scope="col">ID</th>
//                         <th scope="col">UserName</th>
//                         <th scope="col">Email</th>
//                         <th scope="col">Role</th>
//                         <th scope="col">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {listUser &&
//                         listUser.length > 0 &&
//                         listUser.map((item, index) => {
//                             return (
//                                 <tr key={`No-${index}`}>
//                                     <th scope="row">{item.id}</th>
//                                     <td>{item.username}</td>
//                                     <td>{item.email}</td>
//                                     <td>{item.role}</td>
//                                     <td>
//                                         <button
//                                             onClick={() =>
//                                                 props.handleViewUser(item)
//                                             }
//                                             className="btn btn-info"
//                                         >
//                                             View
//                                         </button>
//                                         <button
//                                             onClick={() =>
//                                                 props.handleUpdateUser(item)
//                                             }
//                                             className="btn btn-warning mx-3"
//                                         >
//                                             Update
//                                         </button>
//                                         <button
//                                             onClick={() =>
//                                                 props.handleDeleteUser(item)
//                                             }
//                                             className="btn btn-danger"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                 </tbody>
//             </table>
//         </>
//     );
// }
