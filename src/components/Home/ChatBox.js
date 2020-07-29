import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import BoxMessage from "./BoxMessage";
import "./ChatBox.css";

function ChatBox({ messages, name }) {
  if (messages.length > 0) {
    return (
      <ScrollToBottom
        className="chat-box--height chat-box"
        useAtBottom={true}
        useMode="bottom"
      >
        <div className="pb-2 chat-box">
          {messages.map((message, i) => (
            <div key={i} className="chat-box">
              <BoxMessage message={message} name={name} number={i} />
            </div>
          ))}
        </div>
      </ScrollToBottom>
    );
  } else {
    return (
      <ScrollToBottom
        className="chat-box--height chat-box"
        useAtBottom={true}
        useMode="bottom"
      >
        <div className="pb-2 chat-box">
          <h5>Chat Empty</h5>
        </div>
      </ScrollToBottom>
    );
  }
}

export default ChatBox;
