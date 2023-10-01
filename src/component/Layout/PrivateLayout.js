import { Navigate } from "react-router-dom";
import routes from "../../configs/Configs";
import { useSelector } from "react-redux";

function PrivateLayout({ children }) {
    const isAuthenticalted = useSelector((state) => state.auth.isAuthenticalted);
    if (!isAuthenticalted) {
        return <Navigate to={routes.login}></Navigate>;
    }
    return <>{children}</>;
}

export default PrivateLayout;
