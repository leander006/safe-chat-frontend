import React, { createContext, useMemo, useContext, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/service";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children }) => {
  const Endpoint = `${BASE_URL}/`;
  const socket = useMemo(() => io(Endpoint), []);
  const [notification, setNotification] = useState(false);
  const [messages, setMessages] = useState([]);
  console.log("messages in ", messages);
  return (
    <SocketContext.Provider
      value={{ socket, notification, setNotification, messages, setMessages }}
    >
      {children}
    </SocketContext.Provider>
  );
};
