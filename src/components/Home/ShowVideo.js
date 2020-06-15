/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showImage } from "../../redux/action";
import VideoPlayer from "simple-react-video-thumbnail";

function ShowImage() {
    const openImage = useSelector((state) => state.openModal);
    const files = useSelector((state) => state.url);
    const urlFile = `${process.env.REACT_APP_SOCKET_URL}/uploads/messages/${files}`;
    const dispatch = useDispatch();

    const stylesModal = {
        display: openImage ? "block" : "none",
        zIndex: "5",
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
                    <div className="flex items-center justify-center h-full p-20">
                        <VideoPlayer videoUrl={urlFile} />
                    </div>
                </div>
                <div className="bg-white bottom-0 absolute w-full">
                    <p className="whitespace-pre-line break-all text-sm mt-3 text-center p-5">
                        lorem ipsum al;sdjasdjls;jfl;sdjfl;sjdfl;jdsl;fjl;dasdasdkhsalfkhdsklfhsdlkfhklsdhflksdhflhklfshd;sdjf;jsd;fj;sjfl;sdjl;fjsl;jfl;sjfl;sjfl;jsld;fjl;sdj
                    </p>
                </div>
            </div>
        </div>
    );
}
export default ShowImage;
