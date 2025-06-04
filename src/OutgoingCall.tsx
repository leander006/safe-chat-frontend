import { useNavigate, useParams } from "react-router";
import NavBar from "./component/Navbar";
import { useConnectionStatus, useSocket } from "./context/socketProvider";
import AudioCallAnimation from "./component/AudioCallAnimation";
import { GetUser } from "./context/UserProvider";
import { MdCallEnd } from "react-icons/md";
import { use, useCallback, useEffect } from "react";


function OutgoingCall() {
    const { to ,setTo} = useConnectionStatus();
    const navigate = useNavigate();
    const userContext = GetUser();
    const socketContext = useSocket();
    const socket = socketContext;

    const endCall = useCallback(() => {
      console.log("Ending call");
      socket.emit("call-rejected", { to });
      setTo(null); // Clear the 'to' state
      console.log("Navigating to /room after ending call ",to);
      navigate("/room");
  }, []);

  useEffect(() => { 
    const timeoutId = setTimeout(() => {
      console.log("Call not answered. Ending call...");
      socket.emit("call-rejected", { to });
      setTo(null); // Clear the 'to' state
      console.log("Navigating to /call after timeout ",to);
      navigate("/call");
    }, 10000); // Set timeout duration (e.g., 10 seconds)

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timeoutId);
      console.log("Timeout cleared as component unmounted or dependencies changed.");
    };
  }, [to]);
  return (
    <div className="h-screen w-screen flex flex-col">
    <NavBar/>
      <div className="w-full h-full flex justify-center bg-gray-200">
        <div className="p-6 rounded-lg flex flex-col justify-center">
          <div className="bg-[#5409DA] text-[#8DD8FF] p-8 rounded-lg shadow-md h-[calc(100vh-20rem)] md:w-[500px] w-[calc(100vw-3rem)]  flex flex-col items-center space-y-4 justify-center">
            <h1 className=" py-12">Outgoing call to ......</h1>
            {/* <h1 className="text-[#8DD8FF] text-lg">{to.username}</h1> */}
            <AudioCallAnimation user1={userContext?.user} user2={to}/>
            <div onClick={endCall} className="cursor-pointer">
                <MdCallEnd fontSize={"32"} />
                </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default OutgoingCall