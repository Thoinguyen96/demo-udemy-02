import SideBar from "../SideBar/SideBar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ConfigLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <SideBar collapsed={collapsed} />
            <div className="content__wrap">
                <div className="content__wrap-show">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                    <span>{children}</span>
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
export default ConfigLayout;
