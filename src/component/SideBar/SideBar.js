import { LogoHome, LogoRact } from "../../assets/Icons/icon";
import "react-pro-sidebar/dist/css/styles.css";
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, BiLogoReact, FaReact } from "react-icons/fa";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import sidebarBg from "../../assets/bg2.jpg";
import { Link } from "react-router-dom";
import routes from "../../configs/Configs";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <Link
                        to={"/"}
                        style={{
                            padding: "24px",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: 14,
                            letterSpacing: "1px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "#fff",
                            textDecoration: "none",
                        }}
                    >
                        <FaReact className="navbar-icon-react" />
                        NGUYỄN VĂN THỜI
                    </Link>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaTachometerAlt />} suffix={<span className="badge red">New</span>}>
                            dashboard
                            <Link to={routes.dashBoard} />
                        </MenuItem>
                        <MenuItem icon={<FaGem />}> components </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu suffix={<span className="badge yellow">Tính Năng</span>} icon={<FaRegLaughWink />}>
                            <MenuItem>
                                Quản lý Users
                                <Link to={routes.manageUser} />
                            </MenuItem>
                            <MenuItem>
                                <Link to={routes.quiz} />
                                Quảng lý bài quiz
                            </MenuItem>
                            <MenuItem>
                                <Link to={routes.manageQuestion} />
                                Quản lý câu hỏi
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: "center" }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: "20px 24px",
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span
                                style={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                            >
                                viewSource
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
};

export default SideBar;
