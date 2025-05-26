
import React from "react";
import { NavBar } from "./component/Navbar";

const Profile: React.FC = () => {

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar/>
      <div className="h-[90%] w-full flex flex-col md:flex-row">
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <form className="md:w-3/4 h-1/2 p-6 rounded-lg ">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl text-[#4E71FF] font-bold mb-4 text-center">User Profile</h1>
              <p className="text-gray-600 mb-6 text-center">Please sign in to continue</p>
              <button 
                // onClick={google} 
                className="w-full bg-[#5409DA] cursor-pointer text-white py-2 px-4 rounded hover:bg-[rgba(89,9,218,0.9)]"
              >
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
