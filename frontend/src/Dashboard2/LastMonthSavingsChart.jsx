import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import "./Design/LastMonthSavingsChart.css";

const LastMonthSavingsChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      const pieFormatted = [
        { name: "Income", amount: data.income },
        { name: "Expenses", amount: data.expense },
        { name: "Savings", amount: data.savings },
      ];
      setChartData(pieFormatted);
    }
  }, [data]);

  const colors = ["#34d399", "#fb923c", "#60a5fa"];

  return (
    <div className="last-month-savings-pie-card">
      <h5 className="last-month-title">Last Month's Financial Summary</h5>
      <CustomPieChart
        data={chartData}
        label="Savings"
        totalAmount={`$${data?.savings ?? 0}`}
        colors={colors}
        showTextAnchor={true}
      />
    </div>
  );
};

export default LastMonthSavingsChart;
