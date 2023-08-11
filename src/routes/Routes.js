import routes from "../configs/Configs";
// Layout

// Page
import Home from "../component/Home/Home";
import Admin from "../component/Admin/Admin";
import User from "../component/User/User";

const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.user, component: User },
    { path: routes.admin, component: Admin, layout: Admin },

    // { path: config.routes.search, component: Search, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
