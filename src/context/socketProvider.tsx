import {
  createContext,
  useMemo,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, type Socket } from "socket.io-client";
import { BASE_URL } from "../utils/service";

// Create a context with a default value of null
const SocketContext = createContext<Socket | null>(null);
const ConnectionStatusContext = createContext({
  isConnected: true,
  error: false,
  onlineUser:[]
});

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
  const [onlineUser, setOnlineUser] = useState([])

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
    socket.on("updated-users", (users) => {
      console.log("Online users received:",users);
      setOnlineUser(users);
    });
    socket.on("update-user", (message) => {
      console.log("message is ", message);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      <ConnectionStatusContext.Provider value={{ isConnected, error, onlineUser}}>
        {children}
      </ConnectionStatusContext.Provider>
    </SocketContext.Provider>
  );
};
