import { useState } from "react";
import { Example } from "../Layout/Modal";

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
            <div>content ManageUser </div>
            <Example show={showModal} setShow={setShowModal} />
        </div>
    );
}

export default ManageUser;
