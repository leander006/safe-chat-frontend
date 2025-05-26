
import React from "react";
import { NavBar } from "./component/Navbar";

const History: React.FC = () => {

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar/>
      <div className="h-[90%] w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-gray-200">
          <form className="md:w-3/4 h-1/2 p-6 rounded-lg ">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl text-[#4E71FF] font-bold mb-4 text-center">History</h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default History;
