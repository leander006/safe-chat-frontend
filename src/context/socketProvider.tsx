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
  audio : boolean | false,
  setAudio : React.Dispatch<React.SetStateAction<boolean | false>>,
  setFrom : React.Dispatch<React.SetStateAction<User | null>>
}

export const ConnectionStatusContext = createContext<ConnectionContextType>({
  isConnected: true,
  error: false,
  from: null,
  to: null,
  setTo: () => {},
  audio: false,
  setAudio: () => {},
  setFrom: () => {}
});

const SocketContext = createContext<Socket | null>(null);


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
      reconnectionAttempts: 3,
      reconnectionDelay: 5000,
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
      setFrom(from);
      setAudio(true)
      navigate(`/incomingCall/${roomId}`);
    });

    socket.on("incoming:video", ({from,roomId}) => {
      setFrom(from);
      setAudio(false)
      navigate(`/incomingCall/${roomId}`);
    });

    socket.on("outgoing-call-rejected", () => {
      setFrom(null);
      setTo(null);
      navigate("/call");
    });

    socket.on("outgoing-video-call-accepted", ({roomId}) => {
      navigate("/video/"+roomId);
    });
    socket.on("outgoing-audio-call-accepted", ({roomId}) => {
      navigate("/audio/"+roomId);
    });

  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      <ConnectionStatusContext.Provider value={{ isConnected, error, from,to,setTo ,audio,setFrom,setAudio}}>
        {children}
      </ConnectionStatusContext.Provider>
    </SocketContext.Provider>
  );
};
