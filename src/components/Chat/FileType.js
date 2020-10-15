/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { showImage } from "../../redux/action";
import VideoThumbnail from "react-video-thumbnail";
import { useDispatch } from "react-redux";
import DocsIcon from "../../assets/google-docs.svg";

export default function FileType({ dataFile, text }) {
  const dispatch = useDispatch();

  const urlFile = `${process.env.REACT_APP_SOCKET_URL}/uploads/messages/${dataFile}`;
  const openModal = (e) => {
    e.preventDefault();
    dispatch(showImage(true, dataFile, text));
  };
  if (dataFile) {
    switch (dataFile.split(".").pop()) {
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

      case "docs":
      case "ppt":
      case "pptx":
      case "docx":
      case "pdf":
      case "zip":
      case "rar":
      case "csv":
      case "gzip":
      case "xls":
      case "xlxs":
      case "xlsx":
        return (
          <div className="flex items-center">
            <img
              src={DocsIcon}
              className="w-10 h-10 object-cover cursor-pointer text-white"
            />
            <div className="flex flex-col text-white">
              <label className="ml-3 text-sm">{dataFile}</label>
              <a
                href={urlFile}
                className="ml-3 text-sm cursor-pointer"
                style={{ fontSize: "10px" }}
              >
                Unduh
              </a>
            </div>
          </div>
        );

      case "jpg":
      case "png":
      case "jpeg":
      case "svg":
        return (
          <img
            src={`${urlFile}`}
            className="w-48 h-48 object-cover cursor-pointer"
            onClick={(e) => openModal(e)}
          />
        );

      default:
        return (
          <div className="flex items-center">
            <img
              src={DocsIcon}
              className="w-10 h-10 object-cover cursor-pointer"
            />
            <div className="flex flex-col">
              <label className="ml-3 text-sm text-white">{dataFile}</label>
              <a
                href={urlFile}
                className="ml-3 text-sm cursor-pointer"
                style={{ fontSize: "10px" }}
              >
                Unduh
              </a>
            </div>
          </div>
        );
    }
  }

  return null;
}
