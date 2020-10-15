/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import moment from "moment";
import FileType from "../Chat/FileType";

const styleText = {
  fontSize: "10px",
};

function BoxMessage({
  message: { to, from, message, createdAt, files },
  name,
  number,
}) {
  if (name === from.trim()) {
    return (
      <div className="sm:mx-auto md:mx-10 lg:mx-10 xl:mx-10">
        <div className="clearfix">
          <div
            className="float-right mx-4 my-2 p-2 rounded-lg clearfix text-white"
            style={{ backgroundColor: "#2E99FF" }}
          >
            {files !== undefined ? (
              <FileType dataFile={files} text={message} />
            ) : null}
            <div className="flex justify-between">
              <div
                className="whitespace-pre-line break-all text-sm mt-3 mr-5"
                style={{ maxWidth: "20rem" }}
              >
                {message}
              </div>
              <div className="text-gray-200" style={styleText}>
                {moment(createdAt).format("H:m")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (name === to.trim()) {
    return (
      <div className="sm:mx-auto md:mx-10 lg:mx-10 xl:mx-10">
        <div className="clearfix">
          <div className="bg-gray-300 float-left mx-4 my-2 p-2 rounded-lg">
            {files !== undefined ? (
              <FileType dataFile={files} text={message} />
            ) : null}
            <div
              className="whitespace-pre-line break-all mt-3"
              style={{ maxWidth: "20rem" }}
            >
              {message}
            </div>
            <div style={styleText}>{moment(createdAt).format("H:m")}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoxMessage;
