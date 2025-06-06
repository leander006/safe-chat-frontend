import { useRef, useEffect, useCallback, useState } from "react";
import { useConnectionStatus, useSocket } from "../context/socketProvider";
import { useNavigate, useParams } from "react-router-dom";
import peer from "../utils/peer";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { GetUser } from "../context/UserProvider";
import NavBar from "./Navbar";
import CallAnimation from "./CallAnimation";
import type { User } from "../utils/types";


const AudioCallComponent = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [micOn, setmicOn] = useState(true)
  const { from,to,setTo ,setFrom} = useConnectionStatus();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const user:User|any = GetUser();

  const socketContext = useSocket();
  const socket = socketContext;

  const startMyVideo = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true});
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      if (socket) {
        socket.emit("join-room", { username:user.username, roomId });
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };


  const createPeerConnection = useCallback(async({ id }: { id: string }) => {  
    const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
    const remoteStream = new MediaStream();
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }

    localStream.getTracks().forEach((track) => {
      peer.peer?.addTrack(track, localStream)
    })

    if (peer.peer) {
      peer.peer.ontrack = (event: RTCTrackEvent) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
      };
    }

    if (peer.peer) {
      peer.peer.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (socket) {
          socket.emit("ice-candidate", { to: id, candidate: event.candidate });
        }
      };
    }
  },[socket]);

  const handleUserJoined = useCallback(async({id }: {id: string }) => {
    await createPeerConnection({ id });
    const offer =  await peer.getOffer();
    if(socket){
      socket.emit("user:offer", { to:id, offer });
    }

  }, [socket]);

  const handleIncomingCall = useCallback(async({ from, offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
    await createPeerConnection({ id:from });
    const answer = await peer.getAnswer(offer);    
    if(socket){
      socket.emit("user:answer", { to: from, answer });
    }
  }, [socket]);

  const handleIncomingAnswer = useCallback(async({ answer }: { answer: RTCSessionDescriptionInit }) => {
    peer.setLocalDescription(answer)
  }, []);

  const handleIceCandidates = useCallback(async({ candidate }: { candidate: RTCIceCandidate }) => {
    if (peer.peer) {
      await peer.peer.addIceCandidate(candidate);
    }
  }, []);

  const handleUserLeft = useCallback(async() => {
    const remoteStream = new MediaStream();
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
    setTo(null);
    setFrom(null); 
    navigate('/room');
  }, []);

  const endCall = useCallback(async() => {
    if(socket){
      socket.emit("user:leave", { username:user.username,roomId });
      const remoteStream = new MediaStream();
      const localStream = new MediaStream();
  
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      if(from){
        socket.emit("call-rejected", { to:from });
        setFrom(null); // Clear the 'from' state
      }
      if(to){
         setTo(null);
         console.log(`setting to undefined `,to);
         
      }
    }
    navigate('/call');
  }, []);

  const toggleMic = async () => {
    setmicOn(!micOn);
    if (localVideoRef.current) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  }

  useEffect(() => {
    startMyVideo();
    socket.on("user-joined", handleUserJoined);
    socket.on('incoming:offer',handleIncomingCall);
    socket.on('incoming:answer',handleIncomingAnswer);
    socket.on('incoming:candidate',handleIceCandidates)
    socket.on('user-left',handleUserLeft)

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off('incoming:offer',handleIncomingCall);
      socket.off('incoming:answer',handleIncomingAnswer);
      socket.off('incoming:candidate',handleIceCandidates)
      socket.off('user-left',handleUserLeft)
    };
  }, [handleIceCandidates, handleIncomingAnswer, handleIncomingCall, handleUserJoined, handleUserLeft,socket]);
    
  
  return (

    <div className="h-screen w-screen flex flex-col">
    <NavBar/>
    {/* <div className="h-full w-full flex flex-col"> */}
      <div className="w-full h-full flex justify-center bg-gray-200">
        <div className="p-6 rounded-lg flex flex-col justify-center">
          <div className="bg-[#5409DA] p-8 rounded-lg shadow-md h-[calc(100vh-8rem)] md:w-[500px] w-[calc(100vw-3rem)]  flex flex-col items-center space-y-4 justify-center">
              <audio ref={localVideoRef} autoPlay />
              <audio ref={remoteVideoRef} autoPlay />
              {from && 
                <CallAnimation user1={from}/>
              }
              {to && 
              <CallAnimation user1={to}/>
              }
              <div className="text-[#8DD8FF] flex space-x-2">
                  <div className="cursor-pointer" onClick={toggleMic}>
                  {!micOn ? (
                      <FaMicrophoneSlash fontSize={'32'}/>
                    ) : (
                      <FaMicrophone  fontSize={'32'} />
                  )}
                  </div>
                  <div onClick={endCall} className="cursor-pointer">
                    <MdCallEnd fontSize={"32"} />
                  </div>
              </div>
          </div>
        </div>
    </div>
  </div>

      
  );
};

export default AudioCallComponent;



