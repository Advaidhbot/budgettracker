import React from "react";
import "./Design/CustomTooltip.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{payload[0].name}</p>
        <p>
          Amount: <span>${payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;