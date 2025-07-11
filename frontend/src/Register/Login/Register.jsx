import React, { useContext, useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Inputs/Input";
import { validateEmail } from "../../utilis/helper";
import axiosInstance from "../../utilis/axiosInstance";
import { API_PATHS } from "../../utilis/apiPaths";
import { UserContext } from "../../Context";
import "./Design/Register.css";


const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
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
        <h3>Create an Account</h3>
        <p className="subtitle">Join us today by entering your details below.</p>

        <form onSubmit={handleSignUp} className="auth-form">
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />
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

          <button type="submit">SIGN UP</button>

          <p className="redirect">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
