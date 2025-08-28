import React from "react";
import "./InfoCard.css";

const InfoCard = ({ icon, label, value, color, iconColor }) => {
  return (
    <div className="info-card">
      <div className={`info-card__icon ${color}`}>
        <div style={{ color: iconColor }}>{icon}</div>
      </div>
      <div className="info-card__details">
        <p className="info-card__label">{label}</p>
        <h4 className="info-card__value">₹ {value}</h4>
      </div>
    </div>
  );
};

export default InfoCard