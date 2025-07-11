import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import "./Design/RecentIncomeWithChart.css";

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  // 🎨 Use a more colorful palette (not just green)
  const COLORS = [
    "#3b82f6", // Blue
    "#10b981", // Emerald
    "#ef4444", // Red
    "#f59e0b", // Amber
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#14b8a6", // Teal
    "#eab308", // Yellow
    "#6366f1", // Indigo
    "#f97316", // Orange
  ];

  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item, index) => ({
      // Force uniqueness by adding index so Recharts doesn't merge
      name: `${item?.source} #${index + 1}`,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className="card">
      <div>
        <h5 className="section-title">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
