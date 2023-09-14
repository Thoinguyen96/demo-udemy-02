import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTranslation } from "react-i18next";

import "./Profile.scss";
import UserInfo from "./UserInfo";
import ChangePassWord from "./ChangePassWord";
function TabOnProfile() {
    const { t } = useTranslation();

    return (
        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" className="wrapper__tab-profile mb-3">
            <Tab eventKey="Main info" title={t("ModalProfile.infoUser")}>
                <UserInfo />
            </Tab>
            <Tab eventKey="Pass word" title={t("ModalProfile.pass")} className="input__tabs-profile">
                <ChangePassWord />
            </Tab>
            <Tab eventKey="History" title={t("ModalProfile.history")} className="input__tabs-profile">
                {t("ModalProfile.history")}
            </Tab>
        </Tabs>
    );
}

export default TabOnProfile;
