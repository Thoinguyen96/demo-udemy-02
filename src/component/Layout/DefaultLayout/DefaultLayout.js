import Header from "../../Header/Header";

import "./DefaultLayout.scss";
function DefaultLayout({ children }) {
    return (
        <div className="heading">
            <Header />
            {children}
        </div>
    );
}

export default DefaultLayout;
