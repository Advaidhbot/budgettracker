import React from "react";
import "./Design/CustomLegend.css";

const CustomLegend = ({ payload }) => {
  return (
    <div className="custom-legend-container">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="custom-legend-item">
          <span
            className="custom-legend-dot"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;