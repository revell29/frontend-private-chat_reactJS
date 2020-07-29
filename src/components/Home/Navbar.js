import React from "react";
import { clearStorage } from "../../utils/helpers";

export default function navbar({ user, cancelChat }) {
  const logout = (e) => {
    e.preventDefault();
    clearStorage("login");
    window.location.href = "/";
  };

  return (
    <div className="border-b px-5 py-4 bg-white w-full absolute z-50 rounded-t-lg shadow">
      <div className="flex justify-between">
        <h2>{user ? user : "WebChat"}</h2>
        {user && (
          <button
            className="text-sm rounded-full text-white px-1 py-1 hover:bg-gray-100 focus:outline-none"
            onClick={(e) => cancelChat(true)}
          >
            <svg height="26px" width="26px" viewBox="-4 -4 24 24">
              <line
                stroke="#bec2c9"
                stroke-linecap="round"
                stroke-width="2"
                x1="2"
                x2="14"
                y1="2"
                y2="14"
              ></line>
              <line
                stroke="#bec2c9"
                stroke-linecap="round"
                stroke-width="2"
                x1="2"
                x2="14"
                y1="14"
                y2="2"
              ></line>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
