import React from "react";
import Avatar from "react-avatar";

function UserList({ item, number, activeIndex, userClick }) {
  return (
    <div
      className={`flex flex-start items-center p-2 mt-2 w-full cursor-pointer ${
        activeIndex === number ? "bg-gray-300" : null
      }`}
      key={item.id}
      onClick={(e) => userClick(e, item._id, item.username, number)}
    >
      <Avatar
        googleId="118096717852922241760"
        name={item.username}
        size="50"
        round={true}
      />
      <div className="flex flex-col ml-4">
        <div className="w-full">{item.username}</div>
        <small>Online</small>
      </div>
    </div>
  );
}

export default UserList;
