import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import routes from "../../configs/Configs";
import { useSelector } from "react-redux";

import Language from "./Language";
import { useTranslation } from "react-i18next";
import LogOut from "./LogOut";
import ModalProfile from "./ModalProfile";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/apiServices";

function Header() {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    // const [infoUser, setInfoUser] = useState(false);

    const isAuthenticalted = useSelector((state) => state.user.isAuthenticalted);
    const handleShowModalProfile = () => {
        setShow(true);
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="navbar-text" to={routes.home}>
                                {t("header.title1")}
                            </NavLink>
                            <NavLink className="navbar-text" to={routes.user}>
                                {t("header.title2")}
                            </NavLink>
                            <NavLink className="navbar-text" to={routes.admin}>
                                {t("header.title3")}
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
                                <div className="flex__menu">
                                    <LogOut handleShowModalProfile={handleShowModalProfile} />
                                    <Language />
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalProfile show={show} setShow={setShow} />
        </>
    );
}

export default Header;
