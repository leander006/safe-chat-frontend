import { useRef, useEffect, useCallback, useState } from "react";
import { useSocket } from "../context/socketProvider";
import { useNavigate, useParams } from "react-router-dom";
import peer from "../utils/peer";
import { FiCameraOff } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import { AiTwotoneCamera } from "react-icons/ai";
import { FaMicrophoneSlash } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { GetUser } from "../context/UserProvider";


const VideoCallComponent = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [userStream, setuserStream] = useState(false);
  const [micOn, setmicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const userContext = GetUser();

  // @ts-ignore
  const username = userContext ? userContext.user?.username : null;

  const socketContext = useSocket();
  const socket = socketContext;

  const startMyVideo = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      if (socket) {
        socket.emit("join-room", { username, roomId });
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };


  const createPeerConnection = useCallback(async({ id }: { id: string }) => {  
    const localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }

    setuserStream(true);
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

  const handleUserJoined = useCallback(async({ username, id }: { username: string; id: string }) => {
    console.log(`user ${username} joined room ${id}`);
    await createPeerConnection({ id });
    setuserStream(true)
    const offer =  await peer.getOffer();
    if(socket){
      socket.emit("user:offer", { to:id, offer });
    }

  }, [socket]);

  const handleIncomingCall = useCallback(async({ from, offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
    console.log(`user ${from} calling with offer`);
    await createPeerConnection({ id:from });
    const answer = await peer.getAnswer(offer);    
    if(socket){
      socket.emit("user:answer", { to: from, answer });
    }
  }, [socket]);

  const handleIncomingAnswer = useCallback(async({ from, answer }: { from: string; answer: RTCSessionDescriptionInit }) => {
    peer.setLocalDescription(answer)
  }, []);

  const handleIceCandidates = useCallback(async({ from, candidate }: { from: string; candidate: RTCIceCandidate }) => {
    console.log(`user ${from} sending ice candidate `);
    if (peer.peer) {
      await peer.peer.addIceCandidate(candidate);
    }
  }, []);

  const handleUserLeft = useCallback(async({ username, id }: { username: string; id: string }) => {
    console.log(`user ${username} left with socket id  ${id} `);
    setuserStream(false);
    const remoteStream = new MediaStream();
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
    navigate('/room');
  }, []);

  const handleRoomFull = useCallback(async({ message}: { message: string}) => {
    console.log(` ${message} `);
    alert(message);
    navigate('/room');

  }, []);

  const endCall = useCallback(async() => {
    console.log(`user ${username} leaving room ${roomId}`);
    if(socket){
      socket.emit("user:leave", { username,roomId });
      const remoteStream = new MediaStream();
      const localStream = new MediaStream();
  
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
    }
    navigate('/room');
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

  const toggleCamera = async () => {
    setCameraOn(!cameraOn);
    if (localVideoRef.current) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach((track) => {
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
    socket.on('room-full',handleRoomFull)

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off('incoming:offer',handleIncomingCall);
      socket.off('incoming:answer',handleIncomingAnswer);
      socket.off('incoming:candidate',handleIceCandidates)
      socket.off('user-left',handleUserLeft)
      socket.off('room-full',handleRoomFull)


    };
  }, [handleIceCandidates, handleIncomingAnswer, handleIncomingCall, handleUserJoined, handleUserLeft,socket]);
  
  
  return (

      <div className="flex flex-col items-center">

        <div className="grid  ">
          <div className={`${userStream ? "absolute w-24 h-24 md:w-52 md:h-52 lg:w-64 lg:h-64" : "absolute w-full h-full top-0 left-0"} top-0 left-0`}>
            <div className="w-full h-full">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover">
              </video>
            </div>
          </div>
          <div className={` w-screen h-screen top-0 left-0`}>
            <div className="w-full h-full">
            <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover">
            </video>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-12 absolute bottom-2">
          <div className="cursor-pointer" onClick={toggleMic}>
          {!micOn ? (
            <FaMicrophoneSlash color="blue" fontSize={'32'}/>
          ) : (
            <FaMicrophone color="blue"  fontSize={'32'} />
          )}
          </div>
          <div className="cursor-pointer" onClick={toggleCamera}>
          {!cameraOn ? (
            <FiCameraOff color="blue"  fontSize={'38'}/>
          ) : (
            <AiTwotoneCamera color="blue"  fontSize={'38'}/>
         )}
        </div>
         <div onClick={endCall} className=" cursor-pointer">
         <MdCallEnd color="blue" fontSize={'38'} />
         </div>
        </div>
      </div>

      
  );
};

export default VideoCallComponent;



