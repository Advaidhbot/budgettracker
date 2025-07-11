import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";
import "./StyleOut/EmojiPickerPopup.css";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="emoji-picker-popup">
      <div className="emoji-picker-trigger" onClick={() => setIsOpen(true)}>
        {icon ? (
          <span className="emoji-picker-icon-img">{icon}</span>
        ) : (
          <span className="emoji-picker-icon-placeholder">
            <LuImage />
          </span>
        )}
        <span className="emoji-picker-trigger-text">
          {icon ? "Change Icon" : "Pick Icon"}
        </span>
      </div>

      {isOpen && (
        <div className="emoji-picker-popup-panel">
          <button
            className="emoji-picker-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <LuX />
          </button>
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
