import React, { useContext, useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Inputs/Input";
import { validateEmail } from "../../utilis/helper";
import axiosInstance from "../../utilis/axiosInstance";
import { API_PATHS } from "../../utilis/apiPaths";
import { UserContext } from "../../Context";
import PasswordRecovery from "./PasswordRecovery";
import "./Design/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Something went wrong"
      );
    }
  };

  return (
    <AuthLayout>
      <div className="auth-form-container">
        <h3>Welcome Back</h3>
        <p className="subtitle">Please enter your details to login</p>

        <form onSubmit={handleLogin} className="auth-form">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">LOGIN</button>
          <div className="form-footer">
            <span className="forgot-link" onClick={() => setShowModal(true)}>
              Forgot Password?
            </span>
            <span className="separator">|</span>
            <span className="signup-redirect">
              Don't have an account? <Link to="/">Sign Up</Link>
            </span>

            <PasswordRecovery
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
