import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { GetUser } from "../context/UserProvider";
import { BASE_URL, CLIENT_URL } from "../utils/service";

function Create() {
  const [name, setName] = useState("");
  const [getUrl, setGeturl] = useState(null);
  const socket = useSocket();
  const { config, user } = GetUser();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/room`,
          {
            name: name,
          },
          config
        );
        const url = `${CLIENT_URL}/room/${data.message._id}`;
        setName("");
        socket.emit("room:create", { roomId: data.message._id, user });
      } catch (error) {
        console.log(error);
      }
    },
    [name, socket]
  );

  const handleJoinRoom = useCallback(
    ({ data }) => {
      const { roomId } = data;
      navigate(`/room/${roomId}`);
    },
    [navigate]
  );

  const handleRoom = useCallback(
    (e) => {
      socket.emit("room:join", { roomId: getUrl, user });
    },
    [getUrl]
  );

  useEffect(() => {
    socket.on("room:create", handleJoinRoom);
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:create", handleJoinRoom);
      socket.on("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom, handleRoom]);

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
          <div className="flex flex-col w-full p-5">
            <h1 className=" text-xl md:mb-3 text-[#4229cb]">Create Meeting</h1>
            <form
              className="flex justify-center flex-col item-center mt-4"
              onSubmit={handleSubmit}
            >
              <label className="mb-2 text-[#4229cb]">Name</label>
              <input
                className="w-full mb-3 h-12 rounded-md p-3 md:mb-8  border border-black"
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
              />
              {/* <div className="md:flex text-white lg:justify-around md:justify-between"> */}
              <button
                className="bg-[#4229cb] hover:bg-[#6851ed] mt-1 p-2 rounded-lg text-white"
                type="submit"
              >
                Create
              </button>
              {/* </div> */}
            </form>
            <h1 className="text-center my-2">------ or ------</h1>
            <label className="mb-2 text-[#4229cb]">Enter meet id to join</label>
            <input
              className="w-full mb-3 h-12 rounded-md p-3 md:mb-8  border border-black"
              onChange={(e) => setGeturl(e.target.value)}
              type="text"
              required
            />
            <button
              className="bg-[#4229cb] hover:bg-[#6851ed] mt-1 p-2 rounded-lg text-white"
              type="button"
              onClick={handleRoom}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
