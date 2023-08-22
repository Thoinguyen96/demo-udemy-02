import routes from "../configs/Configs";
// Layout

// Page
import Home from "../component/Home/Home";
import Admin from "../component/Admin/Admin";
import User from "../component/User/ListQuiz";
import DashBoard from "../component/pages/DashBoard";
import ManageUser from "../component/pages/ManageUser";
import ConfigLayout from "../component/Layout/ConfigLayout";
import ManageQuestion from "../component/pages/ManageQuestion";
import ManageQuiz from "../component/pages/ManageQuiz";
import LogIn from "../component/pages/LogIn";
import SignUp from "../component/pages/SideUp";
import AuthLayout from "../component/Layout/AuthLayout";

const publicRoutes = [
    { path: routes.dashBoard, component: DashBoard, layout: ConfigLayout },
    { path: routes.manageUser, component: ManageUser, layout: ConfigLayout },
    { path: routes.quiz, component: ManageQuiz, layout: ConfigLayout },
    { path: routes.home, component: Home },
    { path: routes.user, component: User },
    { path: routes.login, component: LogIn, layout: AuthLayout },
    { path: routes.signUp, component: SignUp, layout: AuthLayout },

    { path: routes.admin, component: Admin, layout: ConfigLayout },
    {
        path: routes.manageQuestion,
        component: ManageQuestion,
        layout: ConfigLayout,
    },

    // { path: config.routes.search, component: Search, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
