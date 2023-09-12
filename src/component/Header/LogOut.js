import NavDropdown from "react-bootstrap/NavDropdown";
import { postLogOut } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogOut } from "../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../configs/Configs";
function LogOut(props) {
    const account = useSelector((state) => state.user.account);
    console.log(account.refresh_token);

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
        <NavDropdown title="Setting" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.4">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
        </NavDropdown>
    );
}

export default LogOut;
