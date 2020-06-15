/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showImage } from "../../redux/action";
import VideoPlayer from "simple-react-video-thumbnail";

function ModalImage({ dataFile, openImage }) {
    const stylesModal = {
        display: openImage ? "block" : "none",
        zIndex: "5",
    };
    const dispatch = useDispatch();

    const renderFile = () => {
        if (dataFile.url !== undefined) {
            let urlFile;
            let fileType = dataFile.url.split(".").pop();
            urlFile = `${process.env.REACT_APP_SOCKET_URL}/uploads/messages/${dataFile.url}`;
            if (fileType === "mp4" || fileType === "mov") {
                return <VideoPlayer videoUrl={urlFile} snapsotAt={10} />;
            } else {
                return <img src={urlFile} className="absolute max-h-full max-w-full object-cover p-20" />;
            }
        }
    };

    return (
        <div className={`bg-white h-full w-full absolute`} style={stylesModal}>
            <div className="h-full w-full">
                <div className="items-center w-full absolute justify-between px-5 top-0 flex">
                    <button className="">You</button>
                    <button type="button" className="p-3 focus:outline-none" onClick={() => dispatch(showImage(false))}>
                        X
                    </button>
                </div>
                <div className="h-full w-full overflow-auto">
                    <div className="flex items-center justify-center h-full p-20">{dataFile.url !== undefined ? renderFile() : ""}</div>
                </div>
                <div className="bg-white bottom-0 absolute w-full">
                    <p className="whitespace-pre-line break-all text-sm mt-3 text-center p-5">{dataFile.text}</p>
                </div>
            </div>
        </div>
    );
}
export default ModalImage;
