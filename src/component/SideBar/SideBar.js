import { LogoHome, LogoRact } from "../../assets/Icons/icon";
import "react-pro-sidebar/dist/css/styles.css";
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, BiLogoReact, FaReact } from "react-icons/fa";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import sidebarBg from "../../assets/bg2.jpg";
import { Link } from "react-router-dom";
import routes from "../../configs/Configs";
import { useTranslation } from "react-i18next";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
    const { t } = useTranslation();

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
                        <span className="logo__name">NGUYỄN VĂN THỜI</span>
                    </Link>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaTachometerAlt />}>
                            {t("sidebar.title1")}
                            <Link to={routes.dashBoard} />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            suffix={<span className="badge yellow"> {t("sidebar.title2")}</span>}
                            icon={<FaRegLaughWink />}
                        >
                            <MenuItem>
                                {t("sidebar.title3")}

                                <Link to={routes.manageUser} />
                            </MenuItem>
                            <MenuItem>
                                <Link to={routes.quiz} />
                                {t("sidebar.title4")}
                            </MenuItem>
                            <MenuItem>
                                <Link to={routes.manageQuestion} />
                                {t("sidebar.title5")}
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
