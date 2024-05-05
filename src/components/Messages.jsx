import React from "react";
import { GetUser } from "../context/UserProvider";

function Messages({ u }) {
  const { user } = GetUser();
  return (
    <div
      className={`flex my-2 ${
        user._id !== u?.user?._id ? "justify-start" : "justify-end"
      }`}
    >
      <div className="flex flex-col ml-2 text-white">
        <div className="flex items-center space-x-2 mx-2">
          <img
            className="w-6 h-6 rounded-full"
            src={
              u?.user?.profile?.url
                ? u?.user?.profile?.url
                : "https://res.cloudinary.com/dj-sanghvi-college/image/upload/v1697996657/noProfile_jjyqlm.jpg"
            }
            alt={u?.user?.username}
          />
          <h1 className=" capitalize font-bold">{u?.user?.username}</h1>
        </div>
        <h1 className="mx-2 mt-2 text-white">{u?.message}</h1>
      </div>
    </div>
  );
}

export default Messages;
