
import React, { useState } from "react";
import NavBar  from "./component/Navbar";
import { useSocket } from "./context/socketProvider";

const Call: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const socketContext = useSocket();
  const socket = socketContext;

  const registerUser = (e:any) => {
    e.preventDefault(); // Prevent form submission
    localStorage.setItem("username", username); // Store username in localStorage
    console.log("Registering user with username:", username);
    if (socket&& username) {
      console.log("Registering user:", username);
      socket.emit("user-login", username); // Send username to server
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar/>
      <div className="h-full w-full flex flex-col md:flex-row">
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <form className="md:w-1/4 h-1/2 p-6 rounded-lg ">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl text-[#4E71FF] font-bold mb-4 text-center">Call</h1>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button onClick={registerUser}>Jion</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Call;
