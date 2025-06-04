import { useNavigate, useParams } from "react-router";
import NavBar from "./component/Navbar";
import { useConnectionStatus, useSocket } from "./context/socketProvider";
import { IoMdCall } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
import { useCallback } from "react";
import { GetUser } from "./context/UserProvider";
import AudioCallAnimation from "./component/AudioCallAnimation";


function IncomingCall() {
    const { roomId } = useParams<{ roomId: string }>();
    const { from,audio,setFrom } = useConnectionStatus();
    const navigate = useNavigate();
    const userContext = GetUser();
    const socketContext = useSocket();
    const socket = socketContext;

    const handleCall = useCallback(() => {
        console.log("Accepting call ",roomId);
        console.log("audio in handleCall", audio);
        if(audio){
            socket.emit("audio-call-accepted", { to:from ,roomId});
            navigate(`/audio/${roomId}`)
        }else{
            socket.emit("video-call-accepted", { to:from ,roomId});
            navigate(`/video/${roomId}`)
        }
    }, []);

    const endCall = useCallback(() => {
        console.log("Ending call");
        socket.emit("call-rejected", { to:from });
        setFrom(null); // Clear the 'from' state
        navigate("/room");
    }, []);

  return (
    <div className="h-screen w-screen flex flex-col">
    <NavBar/>
    {/* <div className="h-full w-full flex flex-col"> */}
      <div className="w-full h-full flex justify-center bg-gray-200">
        <div className="p-6 rounded-lg flex flex-col justify-center">
          <div className="bg-[#5409DA] p-8 rounded-lg shadow-md h-[calc(100vh-20rem)] md:w-[500px] w-[calc(100vw-3rem)]  flex flex-col items-center space-y-4 justify-center">
            <h1 className="text-[#8DD8FF] pt-6 pb-12">Incoming call from ......</h1>
            <AudioCallAnimation user1={userContext?.user} user2={from}/>
            <div className="text-[#8DD8FF] flex  items-center space-x-6">
                <div onClick={handleCall} className="cursor-pointer">
                <IoMdCall fontSize={"32"}/>

                </div>
                <div onClick={endCall} className="cursor-pointer">
                <MdCallEnd fontSize={"32"} />

                </div>
            </div>
            <div>
      </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default IncomingCall