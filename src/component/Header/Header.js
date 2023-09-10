import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import routes from "../../configs/Configs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogOut } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogOut } from "../../redux/action/userAction";
function Header() {
    const account = useSelector((state) => state.user.account);
    const isAuthenticalted = useSelector((state) => state.user.isAuthenticalted);
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
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Thoi Nguyen</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="navbar-text" to={routes.home}>
                            Home
                        </NavLink>
                        <NavLink className="navbar-text" to={routes.user}>
                            User
                        </NavLink>
                        <NavLink className="navbar-text" to={routes.admin}>
                            Admin
                        </NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticalted === false ? (
                            <>
                                <NavLink to={routes.login} className="btn btn-info">
                                    Log-in
                                </NavLink>

                                <NavLink to={routes.signUp} className="btn btn-dark">
                                    Sign up
                                </NavLink>
                            </>
                        ) : (
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.4">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
