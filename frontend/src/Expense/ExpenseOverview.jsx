import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../utilis/helper";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";
import "./Design/ExpenseOverview.css";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="expense-overview-card">
      <div className="expense-overview-header">
        <div>
          <h5 className="expense-overview-title">Expense Overview</h5>
          <p className="expense-overview-desc">
            Track your spending trends over time and get a better understanding
            of your financial habits.
          </p>
        </div>
        <button className="expense-overview-add-btn" onClick={onExpenseIncome}>
          <LuPlus className="expense-overview-add-icon" />
          Add Expense
        </button>
      </div>
      <div className="expense-overview-chart">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;