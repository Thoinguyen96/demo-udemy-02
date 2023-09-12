import routes from "../configs/Configs";
// Layout

// Page
import Home from "../component/Home/Home";
import Admin from "../component/Admin/Admin";
import User from "../component/User/ListQuiz";

import ManageUser from "../component/pages/ManageUser";
import ConfigLayout from "../component/Layout/ConfigLayout";

import LogIn from "../component/pages/LogIn";
import SignUp from "../component/pages/SideUp";
import AuthLayout from "../component/Layout/AuthLayout";
import NotFound from "../component/pages/NotFound";
import DetailQuiz from "../component/User/DetailQuiz";
import QuizManage from "../component/Admin/content/quiz/QuizManage";
import ManageQuestion from "../component/Admin/content/question/ManageQuestion";
import PrivateLayout from "../component/Layout/PrivateLayout";
import DashBoard from "../component/Admin/content/DashBoard";
import DashBoardLayout from "../component/Layout/DashBoardLayout";

const publicRoutes = [
    { path: routes.manageUser, component: ManageUser, layout: ConfigLayout },
    { path: routes.quiz, component: QuizManage, layout: ConfigLayout },
    { path: routes.admin, component: Admin, layout: ConfigLayout },

    { path: routes.dashBoard, component: DashBoard, layout: DashBoardLayout },

    { path: routes.manageQuestion, component: ManageQuestion, layout: ConfigLayout },

    { path: routes.home, component: Home },
    { path: routes.user, component: User, layout: PrivateLayout }, //layout not logged in yet

    { path: routes.login, component: LogIn, layout: AuthLayout },
    { path: routes.signUp, component: SignUp, layout: AuthLayout },
    { path: routes.notFound, component: NotFound, layout: AuthLayout },
    { path: routes.detailQuiz, component: DetailQuiz, layout: AuthLayout },

    // { path: config.routes.search, component: Search, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
