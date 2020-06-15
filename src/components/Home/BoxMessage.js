/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { showImage } from "../../redux/action";
import VideoThumbnail from "react-video-thumbnail";

const styleText = {
  fontSize: "10px",
};

function BoxMessage({
  message: { to, from, message, createdAt, files },
  name,
  number,
}) {
  const dispatch = useDispatch();

  const renderFile = (dataFile, no, text) => {
    const urlFile = `${process.env.REACT_APP_SOCKET_URL}/uploads/messages/${dataFile}`;
    const openModal = (e) => {
      e.preventDefault();
      dispatch(showImage(true, dataFile, text));
    };
    if (files) {
      switch (files.split(".").pop()) {
        case "mp3":
          return (
            <audio controls src={urlFile} className="outline-none">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          );

        case "mov":
          return (
            <div
              className="h-auto w-56 cursor-pointer text-center"
              onClick={(e) => openModal(e)}
            >
              <VideoThumbnail videoUrl={urlFile} snapshotAt={10} />
              {/* <img src={PlayButton} className="h-10 w-10" style={{ top: "50%", left: "60%" }} /> */}
            </div>
          );

        case "mp4":
          return (
            <div
              className="h-auto w-56 cursor-pointer"
              onClick={(e) => openModal(e)}
            >
              <VideoThumbnail videoUrl={urlFile} snapshotAt={10} />
            </div>
          );

        default:
          return (
            <img
              src={`${urlFile}`}
              className="w-48 h-48 object-cover cursor-pointer"
              onClick={(e) => openModal(e)}
            />
          );
      }
    }
  };

  if (name === from.trim()) {
    return (
      <div className="sm:mx-auto md:mx-10 lg:mx-20 xl:mx-24">
        <div className="clearfix">
          <div className="bg-green-300 float-right mx-4 my-2 p-2 rounded-lg clearfix">
            {files !== undefined ? renderFile(files, number, message) : null}
            <p
              className="whitespace-pre-line break-all text-sm mt-3"
              style={{ maxWidth: "20rem" }}
            >
              {message}
            </p>
            <small className="text-gray-800" style={styleText}>
              {moment(createdAt).format("d/m/Y H:m")}
            </small>
          </div>
        </div>
      </div>
    );
  } else if (name === to.trim()) {
    return (
      <div className=" sm:mx-auto md:mx-10 lg:mx-20 xl:mx-24">
        <div className="clearfix">
          <div className="bg-gray-300 float-left mx-4 my-2 p-2 rounded-lg">
            {files !== undefined ? renderFile(files, number, message) : null}
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
