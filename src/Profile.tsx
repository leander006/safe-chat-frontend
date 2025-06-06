
import React, { useEffect } from "react";
import { GetUser } from "./context/UserProvider";
import NavBar from "./component/Navbar";
import { useSocket } from "./context/socketProvider";
import type { User } from "./utils/types";
const Profile: React.FC = () => {
    const user :User|any = GetUser();   
    const socket = useSocket();
     useEffect(() => {     
        socket.emit("user-login",user);
    }, [socket]);  
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar/>
      <div className="h-full w-full flex flex-col md:flex-row">
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="md:w-1/2 h-1/2 p-6 rounded-lg ">
            <div className="bg-[#5409DA] p-8 rounded-lg shadow-md">
              <h1 className="text-2xl text-[#BBFBFF] font-bold mb-4 text-center">User Profile</h1>
                <div className="flex justify-center m-2">
                    <img className="rounded-full w-12 h-12 md:w-32 md:h-32 border-2 bg-white" src={user?.profile} alt={user?.username} />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[#BBFBFF] mb-2">Name: {user?.username}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
