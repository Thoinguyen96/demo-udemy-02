import SideBar from "../SideBar/SideBar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateLayout from "./PrivateLayout";
import Language from "../Header/Language";
import LogOut from "../Header/LogOut";
import ModalProfile from "../Header/ModalProfile";

const DashBoardLayout = ({ children }) => {
    const [show, setShow] = useState(false);

    const [collapsed, setCollapsed] = useState(false);
    const handleShowModalProfile = () => {
        setShow(true);
    };
    return (
        <div className="admin-container">
            <SideBar collapsed={collapsed} />
            <div className="content__wrap">
                <div className="header__dash-board">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                    <div className="flex__menu">
                        <LogOut handleShowModalProfile={handleShowModalProfile} />
                        <ModalProfile show={show} setShow={setShow} />

                        <Language />
                    </div>
                </div>
                <div className="content__wrap-show">
                    <PrivateLayout>{children}</PrivateLayout>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </div>
    );
};
export default DashBoardLayout;
