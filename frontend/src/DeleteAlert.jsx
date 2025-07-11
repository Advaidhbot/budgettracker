import React from "react";
import "./StyleOut/DeleteAlert.css";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="delete-alert-card">
      <p className="delete-alert-content">{content}</p>
      <div className="delete-alert-actions">
        <button type="button" className="delete-alert-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;