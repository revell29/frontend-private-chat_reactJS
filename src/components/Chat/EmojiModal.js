import React from "react";
import EmojiPicker from "emojione-picker";

export default function EmojiModal({ openEmoji }) {
  return (
    <div className="absolute bottom-0 left-0 mb-10">
      {openEmoji && (
        <EmojiPicker
          onChange={function (data) {
            console.log("Emoji chosen", data);
          }}
        />
      )}
    </div>
  );
}
