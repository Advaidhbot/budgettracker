import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";
import "./TransactionInfoCard.css";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income"
      ? "transaction-info-amount bg-green-50"
      : "transaction-info-amount bg-red-50";

  const isImageUrl = (str) => str?.startsWith("http") || str?.startsWith("/");

  return (
    <div className="transaction-info-card">
      <div className="transaction-info-icon">
        {icon ? (
          isImageUrl(icon) ? (
            <img
              src={icon}
              alt={title}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <span className="emoji-icon">{icon}</span>
          )
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="transaction-info-details">
        <div>
          <p className="transaction-info-title">{title}</p>
          <p className="transaction-info-date">{date}</p>
        </div>

        <div className="transaction-info-actions">
          {!hideDeleteBtn && (
            <button className="transaction-info-delete-btn" onClick={onDelete}>
              <LuTrash2 size={18} />
            </button>
          )}

          <div className={getAmountStyles()}>
            <h6 style={{ margin: 0 }}>
              {type === "income" ? "+" : "-"}${amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
