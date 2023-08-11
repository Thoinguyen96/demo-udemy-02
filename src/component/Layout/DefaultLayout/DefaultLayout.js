import SideBar from "../../SideBar/SideBar";
import Header from "../../Header/Header";
import "./DefaultLayout.scss";
function DefaultLayout({ children }) {
    return (
        <div className="heading">
            <Header />
            <div className="wrap">
                <SideBar />
                <div>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
