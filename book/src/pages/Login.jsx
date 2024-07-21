// src/pages/Login.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      toast.error("Login failed: " + error.message);
      console.error(error);
    }
  };

  return (
    <>
      <div className="loginPage">
        <div className="loginHeader"></div>
        <div className="loginMain">
          <div className="loginBanner">
            <img src="../../images/download (10).png" alt="" />
            <h1>Book social network</h1>
            <h2>To begin, enter your details</h2>
          </div>
          <div className="line"></div>
          <div className="users">
            <form className="inputs" onSubmit={handleLogin}>
              <label htmlFor="email">Enter your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <label htmlFor="password">Type your password</label>
              <div className="submit">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button type="submit"></button>
              </div>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>

        <div className="loginFooter">
          <div className="backControls">
            <div className="back">
              <Link to="/">
                <span>
                  <img
                    style={{ transform: "rotate(180deg)", width: "20px" }}
                    src="../images/download (8).png"
                    alt=""
                  />
                </span>{" "}
                Back to homepage
              </Link>
            </div>
            <div className="text">
              <p>After you log on, you can add or edit books</p>
              <p>Just go to Manage books and click Edit buttons</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
