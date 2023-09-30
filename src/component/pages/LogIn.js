import { useState } from "react";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import routes from "../../configs/Configs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { doLogin } from "../../redux/action/userAction";
import { ImSpinner2 } from "react-icons/im";
import { delay } from "lodash";
import React, { useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { doLogin } from "../../reduxToolkit/userSlice";
function Login() {
    const ref = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleLogIn = async () => {
        ref.current.continuousStart();
        setLoading(true);
        const data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            navigate("/");
            setLoading(false);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setLoading(false);
        }
    };
    const handleKeydown = (e) => {
        if (e.key === "Enter") {
            handleLogIn();
        }
    };
    return (
        <div className="login__wrap  ">
            <LoadingBar color="#f11946" ref={ref} />
            <div className="login__header">
                <span className="header__title desc">Don't have an account yet?</span>
                <Link to={routes.signUp} className="desc btn btn-outline-secondary">
                    Sign Up
                </Link>
                <a className="header__help desc" href="#!">
                    Need help?
                </a>
            </div>
            <div className="login__content col-3 mx-auto">
                <Link to={routes.home} className="content__heading">
                    Typeform
                </Link>
                <span className="desc content__label">Hello, who’s this?</span>
                <div className="content__wrap">
                    <label className="desc">Email</label>
                    <input
                        className="desc content__input"
                        type="email"
                        value={email}
                        onChange={(even) => setEmail(even.target.value)}
                        placeholder="pruce@wayne.com"
                    />
                    <br></br>
                    <label className="desc">password</label>
                    <input
                        onKeyDown={(e) => handleKeydown(e)}
                        className="desc content__input"
                        type="password"
                        onChange={(even) => setPassword(even.target.value)}
                        placeholder="At least 8 characters"
                        value={password}
                    />
                    <a href="#!" className="forgot__password desc">
                        Forgot password?
                    </a>
                    <button onClick={handleLogIn} className="btn btn-dark" disabled={loading}>
                        {loading && <ImSpinner2 className="icon_loading" />}
                        <span>Login to Type form</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
