/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Home from "./Home";
import { useDispatch } from "react-redux";
import { showImage } from "../redux/action";

function index(props) {
  const [visible, setVisible] = useState(false);

  const showChat = (e) => {
    e.preventDefault();
    setVisible((prevState) => !prevState);
  };

  return (
    <div className="h-screen w-screen bg-gray-500 sm:bg-red-500 md:bg-green-400 lg:bg-yellow-500 xl:bg-purple-500">
      {visible && (
        <div
          className="absolute right-0 bottom-0 m-10 mb-20 shadow-md rounded-lg w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-3/12"
          style={{ height: "50rem" }}
        >
          <Home />
        </div>
      )}
      <button
        className="bg-blue-500 p-3 absolute bottom-0 mb-5 right-0 mr-20 rounded-full text-white focus:outline-none"
        onClick={(e) => showChat(e)}
      >
        Chat
      </button>
    </div>
  );
}

export default index;
