import VideoHome from "../../assets/Videos/video-homepage.mp4";

function Home() {
    return (
        <div className="home-container">
            <video className="video" autoPlay muted loop>
                <source src={VideoHome} type="video/mp4" />
            </video>
            <div className="home-container__wrap">
                <div className="home-content">
                    <h1 className="title">Forms that break the norm</h1>
                    <p className="desc">
                        Get more data—like signups, feedback, and anything
                        else—with forms designed to be{" "}
                        <strong>refreshingly different</strong>.
                    </p>
                    <button className="btn-start">Get started—it's free</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
