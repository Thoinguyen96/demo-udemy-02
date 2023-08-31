import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

function ModalDeleteQuiz(props) {
    const { show, setShowModal, dataQuiz, fetchAllQuiz } = props;
    const handleClose = () => {
        setShowModal(false);
    };
    const handleDeleteSubmit = async () => {
        let res = await deleteQuiz(dataQuiz.id);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            setShowModal(false);

            fetchAllQuiz();
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete this user </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteSubmit}>
                        Delete confirmation
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;
