import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../utilis/helper";
import "./Design/IncomeOverview.css"

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="income-overview-card">
      <div className="income-overview-header">
        <h5 className="income-overview-title">Income Overview</h5>
        <p className="income-overview-desc">
          Track your earnings over time and analyse your income trends.
        </p>
      </div>

      <button className="add-income-btn" onClick={onAddIncome}>
        <LuPlus className="add-income-icon" />
        Add Income
      </button>

      <div className="income-overview-chart">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;