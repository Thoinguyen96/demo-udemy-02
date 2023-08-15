import { useState } from "react";
import { Example } from "../Admin/content/Modal";
import { TableUser } from "../Admin/content/TableUser";

function ManageUser() {
    const [showModal, setShowModal] = useState(false);
    const handleShows = () => {
        setShowModal(true);
    };

    return (
        <div>
            <div>ManageUser page</div>
            <button onClick={handleShows} className="btn-primary">
                Add user
            </button>
            <div>
                <TableUser />
            </div>
            <Example show={showModal} setShow={setShowModal} />
        </div>
    );
}

export default ManageUser;
