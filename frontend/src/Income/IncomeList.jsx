import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../CARDS/TransactionInfoCard";
import moment from "moment";
import "./Design/IncomeList.css";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="income-list-card">
      <div className="income-list-header">
        <h5 className="income-list-title">Income Sources</h5>
        <button className="income-list-download-btn" onClick={onDownload}>
          <LuDownload className="income-list-download-icon" />
          Download
        </button>
      </div>

      <div className="income-list-content">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;