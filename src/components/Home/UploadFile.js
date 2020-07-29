/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

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

  useEffect(() => {
    if (!active) {
      setThumbnail("");
    }
  }, [active]);

  const handleFile = (e) => {
    if (e.target.files || e.target.files.length > 0) {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
      selectFile(e.target.files[0]);
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
      <div className="bg-white z-50 rounded-lg">
        <div className="flex items-center justify-center">
          <label className="w-64 flex flex-col items-center px-4 py-6 text-blue cursor-pointer hover:text-blue-600">
            {thumbnail ? (
              progress > 0 ? (
                <div className="text-center">
                  <ClipLoader size={25} color={"#123abc"} loading={loading} />
                  <p>File uploaded {progress}%</p>
                </div>
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
        </div>
        <div className="flex items-center mt-12 mx-2 my-2">
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
