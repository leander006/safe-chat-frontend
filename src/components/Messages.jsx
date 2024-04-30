import React from "react";
import { GetUser } from "../context/UserProvider";

function Messages({ u }) {
  const { user } = GetUser();
  // console.log("u in message ",u.user);
  return (
    <div
      className={`flex my-2 ${
        user._id !== u?.user?._id ? "justify-start" : "justify-end"
      }`}
    >
      <div className="flex ml-2 text-white">
        <div>
        <img
        className="w-6 h-6 rounded-full"
        src={u?.user?.profile?.url?u?.user?.profile?.url:"https://res.cloudinary.com/dj-sanghvi-college/image/upload/v1697996657/noProfile_jjyqlm.jpg"}
        alt={u?.user?.username}
      />
        <h1 className="ml-1 mt-2 text-white">{u?.message}</h1>
        </div>
        <h1>{u?.user?.username}</h1>
      </div>

 
    </div>
  );
}

export default Messages;
