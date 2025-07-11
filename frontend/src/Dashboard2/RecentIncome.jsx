import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../CARDS/TransactionInfoCard";
import moment from "moment";
import "./Design/RecentIncome.css";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="recent-income-card">
      <div className="recent-income-header">
        <h5 className="recent-income-title">Income</h5>
        <button className="recent-income-seeall-btn" onClick={onSeeMore}>
          See All
          <LuArrowRight className="recent-income-arrow" />
        </button>
      </div>

      <div className="recent-income-list">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;