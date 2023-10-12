import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { GetUser } from "../context/UserProvider";
import { BASE_URL } from "../utils/service";
function RoomList({ room }) {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { config, user } = GetUser();
  const createRoom = useCallback(() => {
    navigate(`/meeting/${room._id}`);
  }, []);
  const deleteRoom = useCallback(async () => {
    try {
      await axios.delete(`${BASE_URL}/api/room/${room._id}`, config);
      socket.emit("room_delete", { roomId: room._id });
      navigate("/");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  console.log(room);
  return (
    <div className="w-[95vw] flex items-center justify-between my-2 p-2 rounded-md bg-white text-[#4229cb]">
      <div onClick={createRoom} className="flex items-center cursor-pointer">
        <img
          className="w-6 h-6 rounded-full"
          src={room?.owner?.profile?.url}
          alt="roomOnwer"
        />
        <h1 className="ml-2 cursor-pointer w-fit">
          {room?.owner?.username == user?.username
            ? "You"
            : room?.owner?.username}
        </h1>
      </div>

      <div className="flex items-center">
        {user?._id === room?.owner?._id && (
          <h1
            onClick={deleteRoom}
            className="ml-2 bg-[#4229cb] rounded-lg text-white p-2 cursor-pointer"
          >
            Diseable
          </h1>
        )}
      </div>
    </div>
  );
}

export default RoomList;
