import VideoHome from "../../assets/Videos/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../configs/Configs";
function Home() {
    const isAuthenticalted = useSelector((state) => state.user.isAuthenticalted);
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <video className="video" autoPlay muted loop>
                <source src={VideoHome} type="video/mp4" />
            </video>
            <div className="home-container__wrap">
                <div className="home-content">
                    <h1 className="title">Forms that break the norm</h1>
                    <p className="desc">
                        Get more data—like signups, feedback, and anything else—with forms designed to be{" "}
                        <strong>refreshingly different</strong>.
                    </p>
                    {isAuthenticalted === false ? (
                        <button onClick={() => navigate(routes.login)} className="btn btn-primary">
                            Sign in to get started—free
                        </button>
                    ) : (
                        <button onClick={() => navigate(routes.user)} className="btn btn-primary">
                            Start Quiz Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
