import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function ModalResult(props) {
    const { show, setShow, dataAnswersResult } = props;
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    countCorrect: <b>{dataAnswersResult.countCorrect}</b>
                </Modal.Body>
                <Modal.Body>
                    countTotal: <b>{dataAnswersResult.countTotal}</b>
                </Modal.Body>
                <Modal.Body>
                    Answer Correct: <b>{dataAnswersResult.countTotal}</b>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show answer
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
