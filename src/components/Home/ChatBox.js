import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import BoxMessage from "./BoxMessage";
import "./ChatBox.css";
import _ from "underscore";
import moment from "moment";
function ChatBox({ messages, name }) {

  const messageGroup = _.groupBy(messages, function (item) {
    return moment(item.createdAt).calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "DD/MM/YYYY",
    });
  });

  var messageResult = _.map(messageGroup, function (group, day) {
    return {
      day: day,
      messages: group,
    };
  });

  if (messages.length > 0) {
    return (
      <ScrollToBottom
        className="chat-box--height chat-box"
        useAtBottom={true}
        useMode="bottom"
      >
        <div className="pb-2 pt-2 chat-box">
          {messageResult.map((item, i) => (
            <div key={i}>
              <div className="flex justify-center align-center">
                <div
                  className="p-2 px-5 rounded-full"
                  style={{ backgroundColor: "#E2F3FB" }}
                >
                  <label className="text-gray" style={{ fontSize: "12px" }}>
                    {item.day}
                  </label>
                </div>
              </div>
              {item.messages.map((message, key) => (
                <div key={key} className="chat-box">
                  <BoxMessage message={message} name={name} number={key} />
                </div>
              ))}
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
        <div className="flex justify-center align-bottom absolute w-full bottom-0 mb-5">
          <div
            className="p-2 px-5 rounded-full"
            style={{ backgroundColor: "#E2F3FB" }}
          >
            <h5 className="bottom-0 bg-">Start chat</h5>
          </div>
        </div>
      </ScrollToBottom>
    );
  }
}

export default ChatBox;
