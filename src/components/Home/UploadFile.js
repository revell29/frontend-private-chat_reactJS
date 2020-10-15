/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import DocsIcon from "../../assets/google-docs.svg";

export default function UploadFile({
  selectFile,
  active,
  progress,
  loading,
  message,
  onSendMessage,
  dataMessage,
  onCancel,
}) {
  const [thumbnail, setThumbnail] = useState("");

  const [filename, setFilename] = useState("");
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    if (!active) {
      setThumbnail("");
      setFilename("");
      setFileType("");
    }
  }, [active]);

  const handleFile = (e) => {
    if (e.target.files || e.target.files.length > 0) {
      let source = URL.createObjectURL(e.target.files[0]);
      setThumbnail(source);
      setFileType(source.split(".").pop());
      selectFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  return (
    <div
      className={`h-full w-full rounded-lg z-50 flex items-center justify-center absolute ${
        active ? "block" : "hidden"
      }`}
      style={{ bottom: "0" }}
    >
      <div
        className="bg-black opacity-50 h-full w-full absolute"
        onClick={(e) => onCancel(false)}
      ></div>
      <div className="bg-white z-50 rounded-lg flex flex-col">
        <div className="flex flex-col items-center justify-center h-full">
          <label className="w-64 flex flex-col items-center px-4 py-6 text-blue cursor-pointer hover:text-blue-600">
            {thumbnail ? (
              progress > 0 ? (
                <div className="text-center">
                  <ClipLoader size={25} color={"#123abc"} loading={loading} />
                  <p>File uploaded {progress}%</p>
                </div>
              ) : fileType !== "jpg" &&
                fileType !== "png" &&
                fileType !== "jpeg" ? (
                <img src={DocsIcon} className="w-10 h-10 object-cover" />
              ) : (
                <img src={thumbnail} className="h-auto w-auto object-cover" />
              )
            ) : (
              <>
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Select a file
                </span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              onClick={(e) => (e.target.value = null)}
              onChange={(e) => handleFile(e)}
            />
          </label>
          <label className="text-gray-600 text-sm px-3">{filename}</label>
        </div>
        <div className="flex items-center py-3 px-3">
          <input
            onKeyPress={(e) => onSendMessage(e)}
            type="text"
            value={dataMessage}
            onChange={({ target: { value } }) => message(value)}
            className="rounded-lg p-2 w-full bg-gray-300 focus:outline-none text-sm"
            placeholder="Add a caption"
          />
        </div>
      </div>
    </div>
  );
}
