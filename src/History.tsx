
import React, { useEffect, useState } from "react";
import NavBar  from "./component/Navbar";
import { useSocket } from "./context/socketProvider";
import { GetUser } from "./context/UserProvider";
import { BASE_URL } from "./utils/service";

// interface User {
//   id: string;
//   username: string;
// }
const History: React.FC = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketContext = useSocket();
  const userContext = GetUser();
  const user = userContext?.user;
  const socket = socketContext;

  const onlineUsersHandler = async() => {
    const data = await fetch(
      `${BASE_URL}/api/user/online-users`,
      {
        method: "GET",
      }
    )
    console.log(data);
    
    // setOnlineUsers(users);
  }
  useEffect(() => {
      // @ts-ignore
    socket.emit("request-update",{userId:user?.id});
    
    // Listen for user update notifications
  }, []);
  console.log("Online users in History:", onlineUsers);
  
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar/>
      <div className="h-full w-full flex flex-col md:flex-row">
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <form className="md:w-1/4 h-1/2 p-6 rounded-lg ">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl text-[#4E71FF] font-bold mb-4 text-center">History</h1>
              <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Online Users
          </h1>
          <ul className="text-lg text-gray-600">
            {onlineUsers.map((user) => (
              <li key={user.id} className="mb-2">
                <span className="font-semibold">{user.username}</span>
              </li>
            ))}
          </ul>
        </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default History;
