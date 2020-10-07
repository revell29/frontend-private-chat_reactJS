import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import "./Emoji.css";

export default function EmojiModal({ openEmoji, message }) {
  return (
    <div className="absolute bottom-0 left-0 ml-10 mb-20 z-50">
      {openEmoji && (
        <>
          <Picker set="apple" onSelect={(e) => message(e.native)} />
        </>
      )}
    </div>
  );
}
