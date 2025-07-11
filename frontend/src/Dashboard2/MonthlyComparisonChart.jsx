import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./Design/MonthlyComparisonChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyComparisonChart = ({ data }) => {
  const months = data.map((entry) => entry.month);
  const incomes = data.map((entry) => entry.income);
  const expenses = data.map((entry) => entry.expense);
  const savings = data.map((entry) => entry.savings);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomes,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        fill: true,
      },
      {
        label: "Expense",
        data: expenses,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.2)",
        fill: true,
      },
      {
        label: "Savings",
        data: savings,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245,158,11,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Financial Comparison" },
    },
  };

  return (
    <div className="monthly-comparison-chart">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MonthlyComparisonChart;
