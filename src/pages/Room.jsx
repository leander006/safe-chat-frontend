import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { GetUser } from "../context/UserProvider";
import ReactPlayer from "react-player";
import peer from "../utils/peer";

function Room() {
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const socket = useSocket();
  const { user } = GetUser();
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const urlRef = useRef(null);

  const copyUrlToClipboard = useCallback(() => {
    urlRef.current?.select();
    urlRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(url);
  }, [url]);

  const handleUserExists = useCallback(({ users, roomId }) => {
    console.log(`${user} joined room`);
    setRemoteSocketId(roomId);
  }, []);

  const handleUserJoined = useCallback(({ user, id }) => {
    console.log(`${user} joined room`);
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
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
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

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);
  useEffect(() => {
    setUrl(id);
    socket.emit("room:join", { roomId: id, user });
    socket.on("user:joined", handleUserJoined);
    socket.on("user:exists", handleUserExists);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("user:exists", handleUserExists);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
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
  ]);

  return (
    <div className="mt-12">
      <div className="flex flex-row w-fit ">
        <label className="mb-2 text-[#4229cb]">Url</label>
        <input
          className="h-12 rounded-md p-3   border border-black"
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          value={url}
          required
          ref={urlRef}
        />
        <button
          onClick={copyUrlToClipboard}
          className="hover:text-[#010106] cursor-pointer mt-1 p-2 rounded-lg text-white"
        >
          Copy
        </button>
      </div>

      <div className="text-center mt-3 text-white">
        {remoteSocketId ? <h1>Conntected</h1> : <h1>No one in room</h1>}
      </div>
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="500px"
            url={myStream}
          />
        </>
      )}

      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={remoteStream}
          />
        </>
      )}
    </div>
  );
}

export default Room;
