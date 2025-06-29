import { useNavigate } from "react-router";
import NavBar from "./component/Navbar";
import { useConnectionStatus, useSocket } from "./context/socketProvider";
import AudioCallAnimation from "./component/AudioCallAnimation";
import { GetUser } from "./context/UserProvider";
import { MdCallEnd } from "react-icons/md";
import { useCallback, useEffect, useRef } from "react";
import type { User } from "./utils/types";


function OutgoingCall() {
    const { to ,setTo} = useConnectionStatus();
    const outgoingAudioRef = useRef<HTMLAudioElement | null>(null);

    const navigate = useNavigate();
    const user :User|any = GetUser();   
    const socket = useSocket();

    const endCall = useCallback(() => {
      socket.emit("call-rejected", { to });
      setTo(null); 
      navigate("/call");
  }, []);

  useEffect(() => { 
    const timeoutId = setTimeout(() => {
      socket.emit("call-rejected", { to });
      setTo(null); 
      navigate("/call");
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [to]);

  useEffect(() => {
    // Play the audio when the component mounts
    if (outgoingAudioRef.current) {
      outgoingAudioRef.current.loop = true; // Loop until the call is answered
      outgoingAudioRef.current.play().catch((err) => console.log("Audio Error:", err));
    }

    return () => {
      // Pause and reset audio when the component unmounts
      if (outgoingAudioRef.current) {
        outgoingAudioRef.current.pause();
        outgoingAudioRef.current.currentTime = 0;
      }
    };
  }, []);


  return (
    <div className="h-screen w-screen flex flex-col">
    <NavBar/>
      <div className="w-full h-full flex justify-center bg-gray-200">
      <audio ref={outgoingAudioRef} src="/outGoingCall.mp3" />
        <div className="p-6 rounded-lg flex flex-col justify-center">
          <div className="bg-[#5409DA] text-[#8DD8FF] p-8 rounded-lg shadow-md h-[calc(100vh-20rem)] md:w-[500px] w-[calc(100vw-3rem)]  flex flex-col items-center space-y-4 justify-center">
              <h1 className=" py-12">Outgoing call to ......</h1>
              {to && <AudioCallAnimation user1={user} user2={to}/>}
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