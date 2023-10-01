import VideoHome from "../../assets/Videos/video-homepage.mp4";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../configs/Configs";
import { useTranslation, Trans } from "react-i18next";
import { useEffect } from "react";
import { fetchAllUser } from "../../reduxToolkit/userSlice";
function Home() {
    const isAuthenticalted = useSelector((state) => state.auth.isAuthenticalted);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const disPatch = useDispatch();

    useEffect(() => {
        disPatch(fetchAllUser());
    }, []);
    return (
        <div className="home-container">
            <video className="video" autoPlay muted loop>
                <source src={VideoHome} type="video/mp4" />
            </video>
            <div className="home-container__wrap">
                <div className="home-content">
                    <h1 className="title">{t("home.title1")}</h1>
                    <p className="desc">
                        {t("home.title2")}
                        <strong>{t("home.title3")}</strong>.
                    </p>
                    {isAuthenticalted === false ? (
                        <button onClick={() => navigate(routes.login)} className="btn btn-primary">
                            {t("home.title4")}
                        </button>
                    ) : (
                        <button onClick={() => navigate(routes.user)} className="btn btn-primary">
                            {t("home.title5")}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
