import axios from "axios";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../context/UserProvider";
import { BASE_URL } from "../utils/service";
import toast from "react-hot-toast";
import { useSocket } from "../context/SocketProvider";
function UserList({ u }) {
  const { config, user } = GetUser();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const createRoom = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/room`,
        {
          user: u._id,
        },
        config
      );
      toast.success(`Notification send to ${u.username}`);
      socket.emit("send-notification", { userId: u, sender: user });
      navigate(`/meeting/${data.message._id}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <div
      onClick={createRoom}
      className="flex items-center p-2 border border-[#4229cb] hover:bg-[#6853e0] cursor-pointer hover:text-white"
    >
      <img
        className="w-6 h-6 rounded-full"
        src={u?.profile?.url}
        alt="userImage"
      />
      <h1 className="capitalize ml-2 font-Varela">{u?.username}</h1>
    </div>
  );
}

export default UserList;
