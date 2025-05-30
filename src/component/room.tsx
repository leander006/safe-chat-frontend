import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import { useSocket } from '../context/socketProvider';
import { GetUser } from '../context/UserProvider';

function Room() {
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();
    const userContext = GetUser();
    const user = userContext?.user;
    const socketContext = useSocket();
    const socket = socketContext;
  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 15);
    navigate(`/room/${newRoomId}`);
  }

const joinRoom = () => {
  if (roomId) {
      navigate(`/room/${roomId}`);
    } else {
      alert("Please enter a valid Room ID");
    }
  }
  useEffect(() => { 
    const isAlreadyLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isAlreadyLoggedIn) {
      socket.emit("user-login", {user});
      localStorage.setItem("isLoggedIn", "true");
    }
  }, [socket]);  
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar/>
      <div className="h-full w-full flex flex-col md:flex-row">
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <form className="md:w-[50vw] xl:w-[40vw] h-1/2 p-6 rounded-lg ">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl text-[#4E71FF] font-bold mb-4 text-center">Welcome to Video Call App</h1>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  createRoom();
                }}
                className="w-full bg-[#5409DA] cursor-pointer text-white py-2 px-4 rounded hover:bg-[rgba(89,9,218,0.9)]"
              >
                Create Room
              </button>
              <div className="my-4 ">
                <input 
                  type="text" 
                  placeholder="Enter Room ID" 
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)} 
                  className="w-full p-2 border border-gray-300 rounded"
                />
                </div>
              <button 
                onClick={joinRoom} 
                className="w-full bg-[#5409DA] cursor-pointer text-white py-2 px-4 rounded hover:bg-[rgba(89,9,218,0.9)]"
              >
                Join Room
              </button>
            </div>
          </form>
        </div>
      
      </div>
    </div>
  )
}

export default Room