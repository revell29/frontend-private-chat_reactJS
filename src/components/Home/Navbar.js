/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { clearStorage } from "../../utils/helpers";
import SettingIcon from "../../assets/setting.svg";
import Avatar from "react-avatar";

export default function navbar({ user, cancelChat }) {
  const logout = (e) => {
    e.preventDefault();
    clearStorage("login");
    window.location.href = "/";
  };

  return (
    <div className="border-b px-5 py-4 bg-white z-50 rounded-t-lg border-b">
      <div className="flex justify-between">
        <div>
          <Avatar
            googleId="118096717852922241760"
            name={user}
            size="40"
            round={true}
          />
          <label className="ml-3">{user}</label>
        </div>
        <img src={SettingIcon} />
      </div>
    </div>
  );
}
