import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import "./Design/RecentIncomeWithChart.css";

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#ef4444",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#eab308",
    "#6366f1",
    "#f97316",
  ];

  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item, index) => ({
      name: `${item?.source} #${index + 1}`,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

// eslint-disable-next-line react-hooks/exhaustive-deps
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
