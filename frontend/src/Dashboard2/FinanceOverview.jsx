import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import "./Design/FinanceOverview.css";

const COLORS = ["#16a34a", "#e11d48", "#facc15", "#0ea5e9"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Savings", amount: totalIncome-totalExpense}
  ];
  return (
    <div className="finance-overview-card">
      <div className="finance-overview-header">
        <h5 className="finance-overview-title">Financial Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;