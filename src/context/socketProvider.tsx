import React, {
  createContext,
  useMemo,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, type Socket } from "socket.io-client";
import { BASE_URL } from "../utils/service";
import { useNavigate } from "react-router";
import type { User } from "../utils/types";

// Create a context with a default value of null

interface ConnectionContextType {
  isConnected: true | boolean,
  error: false | boolean,
  from: User | null,
  to: User | null,
  setTo: React.Dispatch<React.SetStateAction<User | null>>
  audio : false | boolean,
  setFrom : React.Dispatch<React.SetStateAction<User | null>>
}

export const ConnectionStatusContext = createContext<ConnectionContextType>({
  isConnected: true,
  error: false,
  from: null,
  to: null,
  setTo: () => {},
  audio: false,
  setFrom: () => {}
});

const SocketContext = createContext<Socket | null>(null);
// const ConnectionStatusContext = createContext({
//   isConnected: true,
//   error: false,
//   from: null as User | null,
//   to: null as User | null,
//   setTo: (user: User) => {},
//   audio : false,
//   setFrom : (user:User) => {},
// });

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export const useConnectionStatus = () => {
  return useContext(ConnectionStatusContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const Endpoint = `${BASE_URL}/`;
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState(false);
  const [to, setTo] = useState<User | null>(null);
  const [from, setFrom] = useState<User | null>(null);
  const [audio,setAudio] = useState<boolean>(false);
  const navigate = useNavigate()
  const socket = useMemo(() => {
    const newSocket = io(Endpoint, {
      reconnectionAttempts: 3, // Attempt to reconnect 3 times
      reconnectionDelay: 5000, // Retry every 5 seconds
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      setError(false);
      console.log("Connected to WebSocket server");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      setError(true);
      console.log("Disconnected from WebSocket server");
    });

    newSocket.on("connect_error", (err) => {
      setIsConnected(false);
      setError(true);
      console.error("Connection error:", err);
    });

    return newSocket;
  }, [Endpoint]);

  useEffect(() => {
    socket.on("incoming:audio", ({from,roomId}) => {
      console.log("incoming audio call:",roomId);
      setFrom(from);
      setAudio(true)
      navigate(`/incomingCall/${roomId}`);
    });

    socket.on("incoming:video", ({from,roomId}) => {
      console.log("incoming video call:",roomId);
      setFrom(from);
      navigate(`/incomingCall/${roomId}`);
    });

    socket.on("outgoing-call-rejected", () => {
      console.log("Outgoing call rejected");
      setFrom(null);
      setTo(null);
      console.log("Navigating to room",from,to);
      
      navigate("/room");
    });

    socket.on("outgoing-video-call-accepted", ({roomId}) => {
      console.log("Outgoing call accepted, navigating to room:", roomId);
      navigate("/video/"+roomId);
    });
    socket.on("outgoing-audio-call-accepted", ({roomId}) => {
      console.log("Outgoing call accepted, navigating to room:", roomId);
      navigate("/audio/"+roomId);
    });

  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      <ConnectionStatusContext.Provider value={{ isConnected, error, from,to,setTo ,audio,setFrom}}>
        {children}
      </ConnectionStatusContext.Provider>
    </SocketContext.Provider>
  );
};
