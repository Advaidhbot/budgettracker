import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../utilis/helper";
import CustomBarChart from "../Charts/CustomBarChart";
import "./Design/Last30DaysExpenses.css"

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("Last 30 Days Expense Raw Data:", data);
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

return (
  <div className="last30days-expenses-card">
    <div>
      <h5>Last 30 Days Expenses</h5>
    </div>
    <CustomBarChart data={chartData} />
  </div>
)
};

export default Last30DaysExpenses;