import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../CARDS/TransactionInfoCard";
import "./Design/RecentTransactions.css"

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="recent-transactions-card">
      <div className="recent-transactions-header">
        <h5 className="recent-transactions-title">Recent Transactions</h5>
        <button className="recent-transactions-btn" onClick={onSeeMore}>
          See All
          <LuArrowRight className="recent-transactions-arrow" />
        </button>
      </div>
      <div className="recent-transactions-list">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;