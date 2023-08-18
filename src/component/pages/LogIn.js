import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogIn = () => {
        alert(1235);
    };
    return (
        <div className="login__wrap  ">
            <div className="login__header">
                <span className="header__title desc">
                    Don't have an account yet?
                </span>
                <a href="#!" className="desc btn btn-outline-secondary">
                    Sign Up
                </a>
                <a className="header__help desc" href="#!">
                    Need help?
                </a>
            </div>
            <div className="login__content col-3 mx-auto">
                <h2 className="content__heading">Typeform</h2>
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
                        className="desc content__input"
                        type="password"
                        onChange={(even) => setPassword(even.target.value)}
                        placeholder="At least 8 characters"
                        value={password}
                    />
                    <a href="#!" className="forgot__password desc">
                        Forgot password?
                    </a>
                    <button onClick={handleLogIn} className="btn btn-dark">
                        Login to Type form
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
