import React, {
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("localhost:3001"), []);
  const [notification, setNotification] = useState(false);
  const [messages, setMessages] = useState([]);
  return (
    <SocketContext.Provider
      value={{ socket, notification, setNotification, messages, setMessages }}
    >
      {children}
    </SocketContext.Provider>
  );
};
