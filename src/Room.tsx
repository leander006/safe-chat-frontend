import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from './component/Navbar';
import { useSocket } from './context/socketProvider';
import { GetUser } from './context/UserProvider';
import type { User } from './utils/types';
import { toast } from 'react-toastify';

function Room() {
  const [url, setUrl] = useState<string>("");
  const navigate = useNavigate();
  const user :User|any = GetUser();   
  const socket = useSocket();
  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 15);
    navigate(`/video/${newRoomId}`);
  }

const joinRoom = (e:any) => {
    e.preventDefault();
    const roomId = url.split("/").pop();  
    console.log("Joining room with ID:", roomId);
    socket.emit('check-room',{roomId:roomId, username:user.username});
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const checkRoomExists = useCallback(({exist,roomId}:{exist:boolean,roomId:string}) => {
    console.log("Checking if room exists:", exist,roomId);
      if (!exist) {
        toast.error("Room does not exist");
        return; 
      }else{
        navigate(`/video/${roomId}`);
      }
    },[])

    
  useEffect(() => {     
      socket.emit("user-login",user);
      socket.on('availability-response',checkRoomExists)

      return () => {
        socket.off('availability-response',checkRoomExists)
      }
  }, [socket]);  
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar/>
      <div className="h-full w-full flex flex-col md:flex-row">
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="md:w-[50vw] xl:w-[40vw] h-1/2 p-6 rounded-lg ">
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
              <form onSubmit={joinRoom} className="my-4 space-y-4 ">
                <input 
                  type="text" 
                  placeholder="Enter meeting url" 
                  value={url}
                  required
                  onChange={handleChange} 
                  className="w-full p-2 border border-gray-300 rounded"
                />
              <button 
                className="w-full bg-[#5409DA] cursor-pointer text-white py-2 px-4 rounded hover:bg-[rgba(89,9,218,0.9)]"
              >
                Join Room
              </button>
              </form>

            </div>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default Room