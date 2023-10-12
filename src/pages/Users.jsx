import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
import { useSocket } from "../context/SocketProvider";
import { GetUser } from "../context/UserProvider";
import { BASE_URL } from "../utils/service";

function Users() {
  // Define a memoized callback function using useCallback
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { config,user,setConfig } = GetUser();
  const {socket} = useSocket()
  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/user?name=${search}`,
        config
      );
      socket?.emit("join-socket", { userId: user?._id });
      setUsers(data);
      console.log(users);
    } catch (error) {
      if(error?.response?.status === 404){
        toast.error("Please login again")
      }
      console.error(error);
    }
  }, [config, search,socket]);

  useEffect(() => {
    fetchData();
  }, [fetchData, config, search]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen text-white pt-12">
        <h1 className="text-center font-VarelaRound my-6 lg:text-3xl md:text-2xl text-xl">
          Click on any username for creating a personal room
        </h1>
        <div className="md:w-[400px] w-[95vw] flex flex-col bg-white text-[#4229cb]">
          <div className="p-1">
            <input
              className="w-full border focus:outline-none border-[#4229cb] p-2"
              type="text"
              placeholder="Search user "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="h-[420px] overflow-y-scroll">
            {users.length !== 0 ? (
              users.map((u) => <UserList key={u?._id} u={u} />)
            ) : (
              <div className="flex justify-center">No users found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
