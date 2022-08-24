import React, { FC } from "react";

import "./style/login.scss";
const Login: FC = ({}) => {
  return (
    <>
      <div className="login-container">
        <div className="login-bg-dark" />
        <div className="login-gold-accent" />

        <div className="login-form-container">
          <form>
            <header>Log in</header>
            <p>Welcome! Please enter your email and password.</p>

            <label>Email</label>
            <br />
            <input id="email" type="email" placeholder="Email address" />
            <br />
            <label>Password</label>
            <br />
            <input id="password" type="password" placeholder="Password" />
            <a href="/forgot-password">Forgot Password?</a>
            <br />
            <div>
              <button>Sign In</button>
            </div>
          </form>
          <p className="login-sub-text">
            Trouble logging in?
            <br />
            Please contact your system administrator.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
