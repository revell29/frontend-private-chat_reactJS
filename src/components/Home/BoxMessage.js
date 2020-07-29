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
      <div className="sm:mx-auto md:mx-10 lg:mx-20 xl:mx-24">
        <div className="clearfix">
          <div className="bg-indigo-500 float-right mx-4 my-2 p-2 rounded-lg clearfix text-white">
            {files !== undefined ? (
              <FileType dataFile={files} text={message} />
            ) : null}
            <p
              className="whitespace-pre-line break-all text-sm mt-3"
              style={{ maxWidth: "20rem" }}
            >
              {message}
            </p>
            <small className="text-gray-200" style={styleText}>
              {moment(createdAt).format("d/m/Y H:m")}
            </small>
          </div>
        </div>
      </div>
    );
  } else if (name === to.trim()) {
    return (
      <div className="sm:mx-auto md:mx-10 lg:mx-20 xl:mx-24">
        <div className="clearfix">
          <div className="bg-gray-300 float-left mx-4 my-2 p-2 rounded-lg">
            {files !== undefined ? (
              <FileType dataFile={files} text={message} />
            ) : null}
            <p
              className="whitespace-pre-line break-all mt-3"
              style={{ maxWidth: "20rem" }}
            >
              {message}
            </p>
            <small style={styleText}>
              {moment(createdAt).format("d/m/Y H:m")}
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default BoxMessage;
