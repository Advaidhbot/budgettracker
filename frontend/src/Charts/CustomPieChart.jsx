import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./Design/CustomPieChart.css";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  showTextAnchor = true,
  colors,
}) => {
  // Use provided colors, or fallback to default palette
  const finalColors =
    colors && colors.length > 0
      ? colors
      : ["#A7F3D0", "#FDE68A", "#BFDBFE"]; // light green, yellow, blue fallback

  // Custom tooltip renderer
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-title">{payload[0].name}</p>
          <p className="tooltip-amount">${payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="custom-pie-chart-container">
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={finalColors[index % finalColors.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ fontSize: "14px" }}
          />

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-25}
                textAnchor="middle"
                fill="#666"
                fontSize="14px"
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor="middle"
                fill="#111827"
                fontSize="24px"
                fontWeight="600"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
