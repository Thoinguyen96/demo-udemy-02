import Modal from "react-bootstrap/Modal";
import "./ModalProfile";
import TabOnProfile from "./TabOnProfile";
import { useTranslation } from "react-i18next";

function ModalProfile(props) {
    const { t } = useTranslation();

    const { show, setShow } = props;
    return (
        <>
            <Modal
                size="xl"
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">{t("ModalProfile.info")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TabOnProfile />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalProfile;
