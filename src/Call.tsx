
import React, { useCallback, useEffect, useState } from "react";
import NavBar  from "./component/Navbar";
import { useConnectionStatus, useSocket } from "./context/socketProvider";
import { GetUser } from "./context/UserProvider";
import UserInfo from "./component/User";
import type { User } from "./utils/types";


const Call: React.FC = () => {
  const [updatedusers, setupdatedUsers] = useState<User[]>([]);
  const userContext = GetUser();
  const user = userContext?.user;
  const { isConnected } = useConnectionStatus();
  const socketContext = useSocket();
  const socket = socketContext;
  useEffect(() => {     
    socket.emit("user-login",user);
    socket.emit('get-update',user);
}, [socket]);  


//@ts-ignore
const handleUpdatedList = useCallback(async( users ) => {
  setupdatedUsers(users as User[]);
}, [socket]);

useEffect(() => {
  socket.on("updateUserList",handleUpdatedList)
  return () =>{
    socket.off("updateUserList",handleUpdatedList)
  }
}, []);



  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar/>
      <div className="h-full w-full flex flex-col md:flex-row">
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="md:w-2/3 h-1/2 p-0.5 rounded-lg ">
            <div className="bg-[#5409DA] p-5 rounded-lg shadow-md">
              {updatedusers.length ===1 && updatedusers[0].id === user?.id 
              && (
                <h1 className="text-2xl text-[#BBFBFF] font-bold mb-4 text-center">No users available for call</h1>
              )}
              <div className="mb-4">
                {updatedusers.length > 0 && (
                  <ul className="text-lg text-gray-600">
                    {updatedusers.map((u) => (
                      <li key={u.id} className="mb-2">
                       {u.id !== user?.id && 
                       <UserInfo user={u} />
                       }
                      </li>
                    ))}
                  </ul>
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Call;
