import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../CARDS/TransactionInfoCard"
import moment from "moment";
import "./Design/ExpenseList.css";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="expense-list-card">
      <div className="expense-list-header">
        <h5 className="expense-list-title">All Expenses</h5>
        <button className="expense-list-download-btn" onClick={onDownload}>
          <LuDownload className="expense-list-download-icon" />
          Download
        </button>
      </div>
      <div className="expense-list-content">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;