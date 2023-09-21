import SideBar from "../SideBar/SideBar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import PrivateLayout from "./PrivateLayout";
const ConfigLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <SideBar collapsed={collapsed} />
            <div className="content__wrap">
                <div className="content__wrap-show">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                    <PrivateLayout>{children}</PrivateLayout>
                </div>
            </div>
        </div>
    );
};
export default ConfigLayout;
