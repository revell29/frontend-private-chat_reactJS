import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import BoxMessage from "./BoxMessage";
import "./ChatBox.css";

const ChatBox = ({ messages, name }) => {
    if (messages.length > 0) {
        return (
            <ScrollToBottom className="chat-box--height">
                <div className="pb-2">
                    {messages.map((message, i) => (
                        <div key={i}>
                            <BoxMessage message={message} name={name} />
                        </div>
                    ))}
                </div>
            </ScrollToBottom>
        );
    } else {
        return (
            <ScrollToBottom className="chat-box--height">
                <div className="pb-2">
                    <h5>Chat Empty</h5>
                </div>
            </ScrollToBottom>
        );
    }
};

export default ChatBox;
