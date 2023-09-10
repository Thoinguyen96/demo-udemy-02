import { useState } from "react";
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import routes from "../../configs/Configs";
import { useNavigate } from "react-router-dom";
function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const handleRegister = async () => {
        const data = await postRegister(email, password, userName);
        console.log(data);
        const isvalidateEmail = validateEmail(email);
        if (!isvalidateEmail && !password) {
            toast.error("Invalid Email and Password");
            return;
        } else if (!isvalidateEmail) {
            toast.error("Invalid Email");
            return;
        }
        if (!password) {
            toast.error("Invalid password");
            return;
        }

        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate(routes.login);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleKeydownSignUp = (event) => {
        if (event.key === "Enter") {
            handleRegister();
        }
    };
    return (
        <div className="login__wrap  ">
            <div className="login__header">
                <span className="header__title desc">Don't have an account yet?</span>
                <Link to={routes.login} className="desc btn btn-outline-secondary">
                    Log in
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
                    <label className="desc">Email&#40;*&#41; </label>
                    <input
                        className="desc content__input"
                        type="email"
                        value={email}
                        onChange={(even) => setEmail(even.target.value)}
                        placeholder="pruce@wayne.com"
                    />
                    <br></br>
                    <label className="desc">password &#40;*&#41;</label>
                    <input
                        className="desc content__input"
                        type="password"
                        onChange={(even) => setPassword(even.target.value)}
                        placeholder="At least 8 characters"
                        value={password}
                        onKeyDown={(e) => handleKeydownSignUp(e)}
                    />
                    <br></br>
                    <label className="desc">Confirm password &#40;*&#41;</label>
                    <input
                        className="desc content__input"
                        type="password"
                        onChange={(even) => setPassword(even.target.value)}
                        placeholder="At least 8 characters"
                        value={password}
                        onKeyDown={(e) => handleKeydownSignUp(e)}
                    />
                    <br />
                    <label className="desc">Username </label>
                    <input
                        className="desc content__input"
                        type="text"
                        onChange={(even) => setUserName(even.target.value)}
                        placeholder="At least 8 characters"
                        value={userName}
                        onKeyDown={(e) => handleKeydownSignUp(e)}
                    />

                    <button onClick={handleRegister} className="btn btn-dark">
                        Confirm sign up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
