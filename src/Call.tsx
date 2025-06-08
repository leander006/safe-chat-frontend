
import React, { useCallback, useEffect, useState } from "react";
import NavBar  from "./component/Navbar";
import { useSocket } from "./context/socketProvider";
import { GetUser } from "./context/UserProvider";
import UserInfo from "./component/User";
import type { User } from "./utils/types";


const Call: React.FC = () => {
  const [updatedusers, setupdatedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user :User|any = GetUser();   
  const socket = useSocket();

  useEffect(() => {     
    socket.emit("user-login",user);
    socket.emit('get-update',user);
}, [socket]);  


const handleUpdatedList = useCallback(async( users:User[] ) => {
  setLoading(true);
  setupdatedUsers(users);
  setLoading(false);
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
            {!loading?<div className="bg-[#5409DA] p-1 rounded-lg shadow-md">
              {updatedusers.length ===1 && updatedusers[0].id === user?.id 
              && (
                <h1 className="text-2xl text-[#BBFBFF] font-bold text-center my-2">No users available for call</h1> 
              )
             }
              <div className=" m-4">
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
            </div>:
                  <div className="text-2xl h-16 animate-pulse bg-[#5409DA] rounded-lg shadow-md">
                            
                  </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Call;
