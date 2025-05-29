
import React from "react";
import { GetUser } from "./context/UserProvider";
import NavBar from "./component/Navbar";
const Profile: React.FC = () => {
     const userContext = GetUser();
     const user = userContext?.user;
     console.log("user in profile", user);
    
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar/>
      <div className="h-full w-full flex flex-col md:flex-row">
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="md:w-1/2 h-1/2 p-6 rounded-lg ">
            <div className="bg-[#5409DA] p-8 rounded-lg shadow-md">
              <h1 className="text-2xl text-[#BBFBFF] font-bold mb-4 text-center">User Profile</h1>
                <div className="flex justify-center m-2">
                    <img className="rounded-full w-12 h-12 md:w-32 md:h-32 border-2 bg-[#BBFBFF]" src={user?.profile} alt={user?.name} />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[#BBFBFF] mb-2">Name: {user?.name}</p>
                    <p className="text-[#BBFBFF] mb-2">Email: {user?.email}</p>
                    <p className="text-[#BBFBFF] mb-2">Status: {user?.status}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
