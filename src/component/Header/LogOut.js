import NavDropdown from "react-bootstrap/NavDropdown";
import { postLogOut } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogOut } from "../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../configs/Configs";
import { useTranslation } from "react-i18next";

function LogOut(props) {
    const { handleShowModalProfile } = props;
    const account = useSelector((state) => state.user.account);
    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        let res = await postLogOut(account.email, account.refresh_token);

        if (res && res.EC === 0) {
            dispatch(doLogOut());
            navigate(routes.login);
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <NavDropdown title={t("logOut.title1")} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleShowModalProfile}>{t("logOut.title2")}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>{t("logOut.title3")}</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default LogOut;
