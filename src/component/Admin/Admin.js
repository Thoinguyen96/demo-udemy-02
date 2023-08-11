import SideBar from "../SideBar/SideBar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <SideBar collapsed={collapsed} />
            <div className="content__wrap">
                <div className="content__wrap-show">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                    <span>Content Go here</span>
                </div>
            </div>
        </div>
    );
};
export default Admin;
