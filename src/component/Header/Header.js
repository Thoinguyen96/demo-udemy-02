import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import routes from "../../configs/Configs";
function Header() {
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
                        <NavLink to={routes.login} className="btn btn-info">
                            Log-in
                        </NavLink>
                        <NavLink to={routes.signUp} className="btn btn-dark">
                            Sign up
                        </NavLink>

                        {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Log in
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Log out
                            </NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Profile
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
