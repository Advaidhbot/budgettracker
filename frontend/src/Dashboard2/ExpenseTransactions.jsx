import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../CARDS/TransactionInfoCard";
import moment from "moment";
import "./Design/ExpenseTransactions.css"; 

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="expense-transactions-container">
      <div className="expense-transactions-header">
        <h5 className="expense-title">Recent Expenses</h5>
        <button className="see-all-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="arrow-icon" />
        </button>
      </div>

      <div className="transaction-list">
        {transactions?.slice(0, 5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
