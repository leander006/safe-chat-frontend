import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { GetUser } from "../context/UserProvider";
import ReactPlayer from "react-player";
import peer from "../utils/peer";
import Navbar from "../components/Navbar";
import Messages from "../components/Messages";
import toast from "react-hot-toast";
function Meeting() {
  const { id } = useParams();
  const { socket, messages, setMessages } = useSocket();
  const { user } = GetUser();
  const [myStream, setMyStream] = useState();
  const [remoteCamera, setRemoteCamera] = useState(false);
  const [myCamera, setMyCamera] = useState(false);
  const [remoteStream, setRemoteStream] = useState();
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    message: "",
    user: "",
    roomId: "",
    id: "",
  });
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  const handleUserExists = useCallback(({ users, roomId }) => {
    console.log(`${user} joined room`);
    setRemoteSocketId(roomId);
  }, []);

  const handleUserJoined = useCallback(({ user, id }) => {
    // console.log(`${user.username} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    setMyCamera(true);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      toast.success(`Incoming Call`);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    console.log(myStream);
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
    setRemoteCamera(true);
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );
  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      data.id = Math.random() * 100;
      data.message = message;
      data.user = user;
      data.roomId = id;
      setData({
        id: Math.random() * 100,
        message: message,
        user: user,
        roomId: id,
      });
      setMessages([...messages, data]);
      socket.emit("send_message", data);
      setMessage("");
    },
    [message]
  );

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  const handleMessage = useCallback(async (data) => {
    // console.log("send messages", messages.length, "data", data);
    setMessages(data);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.emit("room:join", { roomId: id, user });
  }, [socket]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("user:exists", handleUserExists);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("message_recieved", handleMessage);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("user:exists", handleUserExists);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.on("message_recieved", handleMessage);
    };
  }, [
    id,
    socket,
    handleUserJoined,
    handleUserExists,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
    handleMessage,
  ]);
  return (
    <>
      <Navbar />
      <div className="flex relative md:flex-row flex-col h-screen pb-1 pr-1 pt-16 md:space-y-0 space-y-4">
        <div className="lg:w-[60%] md:w-[50%] w-full md:mx-2 h-full flex flex-col justify-center bg-black/60 ">
          <div className="text-center mt-2 text-white">
            {remoteSocketId ? (
              <h1>User Conntected</h1>
            ) : (
              <h1>Wait for user to send call</h1>
            )}
          </div>
          {remoteCamera && (
            <h1
              className="hover:cursor-pointer top-20 left-2 absolute text-white ml-2 w-fit"
              onClick={sendStreams}
            >
              <i className="fa-solid fa-2xl fa-phone"></i>
            </h1>
          )}
          {remoteSocketId && !myCamera && (
            <h1
              className="hover:cursor-pointer top-20 left-2 absolute text-white ml-2 w-fit"
              onClick={handleCallUser}
            >
              <i className="fa-solid fa-2xl fa-phone"></i>
            </h1>
          )}
          <div className="lg:flex lg:flex-row justify-center lg:justify-evenly w-full">
            {myStream && (
              <div className="flex justify-center lg:mr-2">
                <ReactPlayer
                  playing
                  muted
                  height="200px"
                  width="200px"
                  url={myStream}
                />
              </div>
            )}
            {remoteStream && (
              <div className="flex justify-center">
                <ReactPlayer
                  playing
                  muted
                  height="200px"
                  width="200px"
                  url={remoteStream}
                />
              </div>
            )}
          </div>
        </div>
        <form
          onSubmit={sendMessage}
          className="lg:w-[40%] md:w-[50%] w-full h-screen md:h-full px-2 bg-black/60"
        >
          <div className="md:h-[calc(100vh-7.2rem)] h-[calc(100vh-17rem)] overflow-y-scroll">
            {messages?.map((u) => (
              <Messages key={u.id} u={u} />
            ))}
          </div>
          <div className="flex h-fit items-end">
            <input
              type="text"
              className="border w-full p-1 focus:outline-none rounded-sm"
              placeholder="Enter message"
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-xl ml-1 text-white cursor-pointer fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Meeting;
