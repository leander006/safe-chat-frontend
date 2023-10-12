import React from "react";
import { GetUser } from "../context/UserProvider";

function Messages({ u }) {
  const { user } = GetUser();
  return (
    <div
      className={`flex my-2 items-center ${
        user._id !== u?.user?._id ? "justify-start" : "justify-end"
      }`}
    >
      <img
        className="w-6 h-6 rounded-full"
        src={u?.user?.profile?.url}
        alt={u?.user?.username}
      />
      <h1 className="ml-1 text-white">{u?.message}</h1>
    </div>
  );
}

export default Messages;
