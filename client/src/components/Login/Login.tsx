import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/ciana-lighting-logo.png";
import "./style/login.scss";
import { AppProps } from "../../App";
import axios from "../../api/axios";

const Login: FC<AppProps> = ({ user, setUser }) => {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const navigate = useNavigate();

  function setInputs(email: string, password: string): void {
    if (email.length) {
      setEmailField(email);
    } else {
      setPasswordField(password);
    }
  }

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("/users/login/user", {
        email: emailField,
        password: passwordField,
      });
      setUser(response.data.User);
      setEmailField("");
      setPasswordField("");
      navigate("/dashboard/" + response.data.User.name);
    } catch (err) {
      console.log(err, "ERRORRRRR");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-bg-dark">
          <img src={logo} alt="ciana lighting logo" />
        </div>
        <div className="login-gold-accent" />

        <div className="login-form-container">
          <form>
            <header>Log in</header>
            <p>Welcome! Please enter your email and password.</p>

            <label>Email</label>
            <br />
            <input
              id="email"
              type="email"
              placeholder="Email address"
              onChange={(e) => setInputs(e.target.value, "")}
            />
            <br />
            <label>Password</label>
            <br />
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setInputs("", e.target.value)}
            />
            <a href="/forgot-password">Forgot Password?</a>
            <br />
            <div>
              <button onClick={(e) => handleLogin(e)}>Sign In</button>
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
