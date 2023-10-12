import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RoomList from "../components/RoomList";
import { useSocket } from "../context/SocketProvider";
import { GetUser } from "../context/UserProvider";
import { BASE_URL } from "../utils/service";
import toast from "react-hot-toast"
function Room() {
  const [room, setRoom] = useState([]);
  const { socket } = useSocket();

  const { config, user,setConfig } = GetUser();
  const { notification } = useSocket();
  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/room`, config);
      setRoom(data);
    } catch (error) {
      if(error?.response?.status === 404){
        toast.error("Please login again")
      }
      console.log(error);
    }
  }, [config, notification]);

  useEffect(() => {
    fetchData();
  }, [fetchData, notification]);

  useEffect(() => {
    socket?.emit("join-socket", { userId: user?._id });
  }, []);

  return (
    <div className="flex justify-center">
      <Navbar />
      <div className=" w-[95vw] flex mt-20 flex-col">
        <div className="h-[420px] overflow-y-scroll">
          {room.length !== 0 ? (
            room.map((r) => <RoomList key={r?._id} room={r} />)
          ) : (
            <div className="flex justify-center text-white">
              No meeting invites
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Room;
