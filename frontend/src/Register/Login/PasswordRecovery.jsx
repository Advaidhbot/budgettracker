import React, { useState } from "react";
import axiosInstance from "../../utilis/axiosInstance";
import { API_PATHS } from "../../utilis/apiPaths";
import "./Design/PasswordRecovery.css";

const PasswordRecovery = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSendOTP = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.SEND_OTP, { email });
      setMessage(response.data.message || "OTP sent to your email.");
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (!otp || !newPassword) {
      setError("Enter OTP and new password");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_OTP_RESET, {
        email,
        otp,
        newPassword,
      });

      setMessage(response.data.message || "Password reset successful!");
      setStep("done");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Reset Password</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        {step === "email" && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="send-btn" onClick={handleSendOTP}>Send OTP</button>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="send-btn" onClick={handleResetPassword}>Reset Password</button>
          </>
        )}

        {step === "done" && (
          <button className="send-btn" onClick={onClose}>Close</button>
        )}
      </div>
    </div>
  );
};

export default PasswordRecovery;
