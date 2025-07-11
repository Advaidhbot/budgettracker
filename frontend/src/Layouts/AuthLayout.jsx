// src/Layouts/AuthLayout.jsx
import React from "react";
import Graph from "../Assets/Graph.png";
import { LuTrendingUpDown } from "react-icons/lu";
import "./Design/AuthLayout.css"

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-left">
        <h2>Budget Tracker</h2>

        <div className="stats-card">
          <div className="stats-icon">
            <LuTrendingUpDown />
          </div>
          <div className="stats-info">
            <h6>Track Your Income & Expenses</h6>
            <span>$430,000</span>
          </div>
        </div>

        <img src={Graph} className="auth-image" alt="Graph" />
      </div>

      <div className="auth-right">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
